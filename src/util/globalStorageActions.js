import {getAppTokens} from "./asyncStorageActions";


export const setupGlobalStorageData = async () => {
    const {accessToken, refreshToken, userID} = await getAppTokens();
    global.ACCESS_TOKEN = accessToken;
    global.REFRESH_TOKEN = refreshToken;
    global.USER_ID = userID;
};

export const clearGlobalStorageData = async () => {
    global.ACCESS_TOKEN = null;
    global.REFRESH_TOKEN = null;
    global.USER_ID = null;
}
