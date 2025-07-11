import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "../rootReducer";
import SafeAreaSlice from "../slices/safeAreaSlice";
import CommonSlice from "../slices/commonSlice";
import WorkoutSlice from "../slices/workoutSlice";

export const store = configureStore({
    reducer: rootReducer,
    safeAreaReducer: SafeAreaSlice,
    commonReducer: CommonSlice,
    workoutReducer: WorkoutSlice,
});
