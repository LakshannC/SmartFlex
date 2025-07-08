import AsyncStorage from "@react-native-async-storage/async-storage";

export let ACCESS_TOKEN = 'accessToken';
export let REFRESH_TOKEN = 'refreshToken';
export let USER_ID = 'userID';


export const storeUserAuthData = async (data) => {
    for (const key of Object.keys(data)) {
        await AsyncStorage.setItem(key, data[key]);
    }
};


export const getAppTokens = async () => {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);
    const userID = await AsyncStorage.getItem(USER_ID);
    return {accessToken, refreshToken, userID};
};


export const getUserData = async () => {
    const userID = await AsyncStorage.getItem(USER_ID);
    return {userID};
};
