import {combineReducers} from "@reduxjs/toolkit";
import SafeAreaSlice from "./slices/safeAreaSlice";
import CommonSlice from "./slices/commonSlice";
import WorkoutSlice from "./slices/workoutSlice";


export default combineReducers({
    safeAreaReducer: SafeAreaSlice,
    commonReducer: CommonSlice,
    workoutReducer: WorkoutSlice,
});
