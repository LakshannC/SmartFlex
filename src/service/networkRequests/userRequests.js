import {httpGET, httpPUT} from "../networkConfig/service";
import {USER_API} from "../apiEndPoints/userApi";
import {showErrorToast} from "../../util/toastActions";

export const getUserDetailsRequest = async () => {
    const result = await httpGET({
        url: USER_API.USER_DETAILS_URL
    });
    if (result?.code === 200) {
        return result;
    } else {
        if (result) {
            showErrorToast(result?.message);
        } else {
            showErrorToast();
        }
    }
}

export const updateProfileRequest = async (data) => {
    const result = await httpPUT({
        url: USER_API.UPDATE_PROFILE_URL,
        data
    });
    if (result?.code === 200) {
        return result;
    } else {
        if (result?.error) {
            showErrorToast(result?.error?.message);
        } else {
        showErrorToast();
        }
    }
}
