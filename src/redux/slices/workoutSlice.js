import {createSlice} from "@reduxjs/toolkit";
import {workout_states} from "../../configuration/workoutData";

const initialState = {
    workoutType:'home',
    workoutState:workout_states.TYPE_SELECTION,
    currentWorkout:null,
    currentSet:1,
    exercisesList:[],
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
        setCurrentWorkout:(state,action)=>{
          state.currentWorkout = action.payload;
        },
        startWorkout:(state,action)=>{
          state.exercisesList = action.payload;
          state.currentExerciseIndex = 0;
          state.currentSet = 1;
          state.workoutState = workout_states.START;
        },
        nextSet:(state,action)=>{
            const currentExercise = state.exercisesList[state.currentExerciseIndex];
            if(!currentExercise)return;
            if(state.currentSet<currentExercise.sets){
                state.currentSet += 1;
                state.workoutState = workout_states.REST;
            }else{
                state.currentSet = 1;

                const isLastExercise = state.currentExerciseIndex>=currentExercise.sets.length - 1;
                if(isLastExercise){
                    state.workoutState = workout_states.COMPLETE;
                }else{
                    state.currentExerciseIndex += 1;
                    state.workoutState= workout_states.IN_PROGRESS;
                }
            }
        },
        skipCurrentExercise:(state,action)=>{
          const totalExercises = state.exercisesList?.length || 0;
          if(state.currentExerciseIndex<totalExercises){
              state.currentExerciseIndex += 1;
              state.currentSet = 1;
              state.workoutState = workout_states.IN_PROGRESS;
          }else{
              state.workoutState = workout_states.COMPLETE;
          }
        },
        endRest:(state)=>{
            state.workoutState = workout_states.IN_PROGRESS;
        },
        resetWorkoutState: () => initialState,



    }
});

export const {
    updateWorkoutType,
    updateWorkoutState,
    setCurrentWorkout,
    startWorkout,
    nextSet,
    skipCurrentExercise,
    endRest,
    resetWorkoutState
} = workoutSlice.actions;

export default workoutSlice.reducer;