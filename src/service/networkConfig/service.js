import AxiosInstance from "./interceptor";
import {
    BASE_URL,
    getRequestConfig,
    REQUEST_SUCCESS,
    REQUEST_SUCCESS_OTHER,
    REQUEST_SUCCESS_OTHER1
} from "./basicConfig";

const handleSuccessPath = (response, url) => {
    if (response.status === REQUEST_SUCCESS || response.status === REQUEST_SUCCESS_OTHER || response.status === REQUEST_SUCCESS_OTHER1) {
        return {code: 200, data: response?.data, url: BASE_URL + url};
    } else {
        console.log(`PROBLEM IN RESPONSE : ${response?.status}, ${response?.data}`);
        return null;
    }
};

const handleErrorPath = (error, url) => {
    // return {code: 500, error, url: BASE_URL + url};
    return {code: error?.code ?? 500, error, url: BASE_URL + url};
};

export const httpGET = async ({url, requestConfig}) => {
    return AxiosInstance.get(url, requestConfig ?? getRequestConfig())
        .then((response) => handleSuccessPath(response, url))
        .catch((error) => handleErrorPath(error, url));
};

export const httpPOST = async ({url, data, requestConfig, isFormData}) => {
    return AxiosInstance.post(url, data, requestConfig ?? getRequestConfig(isFormData))
        .then((response) => handleSuccessPath(response, url))
        .catch((error) => handleErrorPath(error, url));
};

export const httpPUT = async ({url, data, requestConfig, isFormData}) => {
    return AxiosInstance.put(url, data, requestConfig ?? getRequestConfig(isFormData))
        .then((response) => handleSuccessPath(response, url))
        .catch((error) => handleErrorPath(error, url));
};

export const httpPATCH = async ({url, data, requestConfig, isFormData}) => {
    return AxiosInstance.patch(url, data, requestConfig ?? getRequestConfig(isFormData))
        .then((response) => handleSuccessPath(response, url))
        .catch((error) => handleErrorPath(error, url));
};

export const httpDELETE = async ({url, requestConfig}) => {
    return AxiosInstance.delete(url, requestConfig ?? getRequestConfig())
        .then((response) => handleSuccessPath(response, url))
        .catch((error) => handleErrorPath(error, url));
};
