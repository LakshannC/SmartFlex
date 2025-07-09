import { httpPOST} from "../networkConfig/service";
import {AUTH_API} from "../apiEndPoints/authApi";
import {showErrorToast, showSuccessToast} from "../../util/toastActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {clearGlobalStorageData, setupGlobalStorageData} from "../../util/globalStorageActions";
import * as Actions from "../../navigation/NavActions";
import {RouteNames} from "../../navigation/AppRoutes";
import {storeUserAuthData} from "../../util/asyncStorageActions";

export const userLoginRequest = async (data) => {
    const result = await httpPOST({
        url: AUTH_API.SIGN_IN_URL,
        data
    });
    if (result?.code === 200) {
        const data = {
            accessToken: result?.data?.data?.tokens?.accessToken ?? null,
        };
        await handleSuccessAuthentication(data);
        return result;
    } else {
        if (result?.error) {
            showErrorToast(result?.error?.message);
        } else {
            showErrorToast();
        }
    }
}

export const userRegisterRequest = async (data) => {
    const result = await httpPOST({
        url: AUTH_API.SIGN_UP_URL,
        data,
    });

    if (result?.code === 200) {
        return result;
    } else {
        if (result?.error?.data?.email.length > 0) {
            showErrorToast(result?.error?.data?.email[0]);
        } else if (result?.error?.message) {
            showErrorToast(result?.error?.message);
        } else {
            showErrorToast();
        }
    }

}

export const expireUserSession = async (isTokenExpired, goToLogin = true) => {
    if (!isTokenExpired) {
        const result = await httpPOST({
            url: AUTH_API.SIGN_OUT_URL
        });
        if (result?.code === 200) {
            showSuccessToast(result?.data?.message);
        }
    }
    await AsyncStorage.clear();
    await clearGlobalStorageData();
    if (goToLogin === true) {
        showErrorToast('Login to your account first');
        Actions.reset(RouteNames.LOGIN_SCREEN);
    }
}

export const handleSuccessAuthentication = async (data) => {
    await storeUserAuthData({
        accessToken: data.accessToken,
        refreshToken: data.accessToken
    });
    await setupGlobalStorageData();
}

export const handleFailedAuthentication = async () => {
    showErrorToast('Please login to your account first');
    await expireUserSession(true);
}