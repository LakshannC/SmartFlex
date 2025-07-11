import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    age: null,
    gender: null,
    current_weight: null,
    goal_weight: null,
    height: null,
    isLoading: false,
    error: null
};

const workoutPlanSlice = createSlice({
    name: 'workoutPlan',
    initialState,
    reducers: {
        setPlanData: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetPlanData: () => initialState,
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setPlanData, resetPlanData, setLoading, setError } = workoutPlanSlice.actions;
export default workoutPlanSlice.reducer;