import {combineReducers} from "@reduxjs/toolkit";
import SafeAreaSlice from "./slices/safeAreaSlice";
import CommonSlice from "./slices/commonSlice";
import WorkoutSlice from "./slices/workoutSlice";
import WorkoutPlanSlice from "./slices/workoutPlanSlice";


export default combineReducers({
    safeAreaReducer: SafeAreaSlice,
    commonReducer: CommonSlice,
    workoutProcessReducer: WorkoutSlice,
    workoutReducer: WorkoutPlanSlice,
});
