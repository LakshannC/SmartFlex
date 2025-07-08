import {colors} from "../../configuration/constants";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    color: colors.appBackground,
    removeTopSafeArea: false,
}

export const safeAreaSlice = createSlice({
    name: 'safeAreaSlice',
    initialState: initialState,
    reducers: {
        changeColor: (state, action) => {
            state.color = action.payload;
        },
        removeTopSafeArea: (state, action) => {
            state.removeTopSafeArea = action.payload;
        }
    }
});

export const {changeColor, removeTopSafeArea} = safeAreaSlice.actions;

export default safeAreaSlice.reducer;
