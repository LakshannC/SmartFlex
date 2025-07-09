import Axios from "axios";
import {
    BASE_URL,
    REQUEST_TIMEOUT,
    REQUEST_UNAUTHORIZED,
    unauthorizedErrorIgnoredURL
} from "./basicConfig";
import {LOADER_IGNORED_URLS} from "../../util/loaderActions";
import {store} from "../../redux/store/store";
import {setNetworkRequestProcessing} from "../../redux/slices/commonSlice";

import {handleFailedAuthentication} from "../networkRequests/authRequests";

const AxiosInstance = Axios.create();
let isRefreshing = false;
let failedQueue = [];
let requestQueue = [];


AxiosInstance.interceptors.request.use(
    async function (config) {
        const token = global.ACCESS_TOKEN;
        config.timeout = REQUEST_TIMEOUT;
        config.baseURL = BASE_URL;

        console.log('#========================REQUEST SENDING========================#');
        console.log('URL : ' + config?.baseURL + config?.url);
        console.log('REQUEST BODY : ' + JSON.stringify(config?.data));

        if (token && !config?.headers?.authorization) {
            config.headers.authorization = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


AxiosInstance.interceptors.response.use(
    function (response) {
        popRequestQueue(response.request.responseURL);

        console.log('#========================SUCCESS========================#');
        console.log('DATA : ' + JSON.stringify(response.data));
        console.log('STATUS : ' + response.status);
        console.log('URL : ' + response.request.responseURL);

        return response;

    },
    function (error) {
        popRequestQueue(error?.config?.url);

        const config = error?.config;
        const status = error?.response?.status;
        const data = error?.response?.data;

        const originalRequest = config;

        console.log('#========================ERROR========================#');
        console.log('STATUS : ' + status);
        console.log('URL : ' + config?.baseURL + config?.url);
        console.log('MESSAGE : ' + JSON.stringify(data));

        if (status === REQUEST_UNAUTHORIZED && !originalRequest?._retry) {
            if (!isRefreshing && !unauthorizedErrorIgnoredURL.includes(config?.url)) {

                console.log('UNAUTHORIZED ERROR :: ');
                processQueue(error, null);
                handleFailedAuthentication();
                return Promise.reject({status, data});

            } else {

                if (unauthorizedErrorIgnoredURL.includes(config?.url)) {
                    return Promise.reject({status, data});
                } else {

                    return new Promise((resolve, reject) => {
                        failedQueue.push({resolve, reject});
                    })
                        .then(() => {
                            return AxiosInstance(originalRequest);
                        })
                        .catch((error) => {
                            return Promise.reject(error);
                        });

                }

            }
        } else {
            return Promise.reject(data);
        }

    }
);



const popRequestQueue = (requestUrl) => {
    let urlContent = requestUrl.replace(BASE_URL, '');
    urlContent = urlContent.split('?')[0];
    if (!LOADER_IGNORED_URLS.includes(urlContent)) {
        requestQueue.pop();
        if (requestQueue.length === 0) {
            store.dispatch(setNetworkRequestProcessing(false));
        }
    }
}

const processQueue = (error, token = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });
    failedQueue = [];
}

export default AxiosInstance;
