import {ENVIRONMENT_URL} from "@env";
export const REQUEST_SUCCESS = 200;
export const REQUEST_SUCCESS_OTHER = 201;
export const REQUEST_SUCCESS_OTHER1 = 202;
export const REQUEST_UNAUTHORIZED = 401;
export const REQUEST_TIMEOUT = 40000;
export const BASE_URL = ENVIRONMENT_URL;




export const unauthorizedErrorIgnoredURL = [];

const formHeaders = {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
}

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

export const getRequestConfig = (isFormData) => {
    return {
        headers: isFormData ? formHeaders : defaultHeaders,
    };
}
