import {createSlice} from "@reduxjs/toolkit";
import {workout_states} from "../../configuration/workoutData";

const initialState = {
    workoutType:'home',
    workoutState:workout_states.REST,
    currentWorkout:null,
    currentExerciseIndex:0,
    activeExerciseDuration:0.00,
}

export const workoutSlice = createSlice({
    name:'workout',
    initialState: initialState,
    reducers:{
        updateWorkoutType: (state, action) => {
            state.workoutType = action.payload;
        },
        updateWorkoutState: (state, action) => {
            state.workoutState = action.payload;
        },
        startWorkout:(state,action)=>{
          state.currentWorkout = action.payload;
          state.currentExerciseIndex = 0;
          state.currentSet = 1;
          state.status = workout_states.IN_PROGRESS;
        },
        nextSet:(state,action)=>{
            const currentExercise = state.currentWorkout.exercise[state.currentExerciseIndex];
            if(state.currentSet<currentExercise.sets){
                state.currentSet += 1;
                state.status = workout_states.REST;
            }else{
                state.currentSet = 1;
                state.currentExerciseIndex += 1;
                state.status = workout_states.IN_PROGRESS;
            }
        },
        skipCurrentExercise:(state,action)=>{
          const totalExercises = state.currentWorkout?.exercises?.length || 0;
          if(state.currentExerciseIndex){
              state.currentExerciseIndex += 1;
              state.currentSet = 1;
              state.status = workout_states.IN_PROGRESS;
          }else{
              state.status = workout_states.COMPLETE;
          }
        },
        endRest:(state)=>{
            state.status = workout_states.IN_PROGRESS;
        }



    }
});

export const {
    updateWorkoutType,
    updateWorkoutState,
    startWorkout,
    nextSet,
    skipCurrentExercise,
    endRest
} = workoutSlice.actions;

export default workoutSlice.reducer;