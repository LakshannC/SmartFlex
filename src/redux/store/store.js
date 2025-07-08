import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "../rootReducer";
import SafeAreaSlice from "../slices/safeAreaSlice";
import CommonSlice from "../slices/commonSlice";

export const store = configureStore({
    reducer: rootReducer,
    safeAreaReducer: SafeAreaSlice,
    commonReducer: CommonSlice,
});
