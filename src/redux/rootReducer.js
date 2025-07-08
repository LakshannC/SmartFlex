import {combineReducers} from "@reduxjs/toolkit";
import SafeAreaSlice from "./slices/safeAreaSlice";
import CommonSlice from "./slices/commonSlice";


export default combineReducers({
    safeAreaReducer: SafeAreaSlice,
    commonReducer: CommonSlice,
});
