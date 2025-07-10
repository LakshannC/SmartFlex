import {httpDELETE, httpGET, httpPOST} from "../networkConfig/service";
import {showErrorToast} from "../../util/toastActions";
import {PLAN_API} from "../apiEndPoints/planApi";

export const generatePlanRequest = async (data) => {
    const result = await httpPOST({
        url: PLAN_API.GENERATE_PLAN_URL,
        data,
    });

    if (result?.code === 200) {
        return result;
    } else {
        if (result?.error?.message) {
            showErrorToast(result?.error?.message);
        } else {
            showErrorToast();
        }
    }
}


export const generateTempPlanRequest = async (data) => {
    const result = await httpPOST({
        url: PLAN_API.GENERATE_TEMP_PLAN_URL,
        data,
    });

    if (result?.code === 200) {
        return result;
    } else {
        if (result?.error?.message) {
            showErrorToast(result?.error?.message);
        } else {
            showErrorToast();
        }
    }
}


export const getAllPlansRequest = async () => {
    const result = await httpGET({
        url: PLAN_API.GET_ALL_PLANS_URL
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


export const getPlanDetailsRequest = async (planID) => {
    const result = await httpGET({
        url: `${PLAN_API.GET_PLAN_BY_ID_URL}/${planID}`
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


export const deletePlanRequest = async (planID) => {
    const result = await httpDELETE({
        url: `${PLAN_API.DELETE_PLAN_BY_ID_URL}/${planID}`
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