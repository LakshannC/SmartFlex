import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isNetworkRequestProcessing: false,
};

export const commonSlice = createSlice({
    name: 'commonSlice',
    initialState: initialState,
    reducers: {
        setNetworkRequestProcessing: (state, action) => {
            state.isNetworkRequestProcessing = action.payload;
        }
    }
});

export const {
    setNetworkRequestProcessing

} = commonSlice.actions;

export default commonSlice.reducer;
