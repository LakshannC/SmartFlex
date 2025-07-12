import {Dimensions, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors, dimensions, fontFamilies, fontSizes} from "../../../configuration/constants";
import {useCallback, useEffect, useState} from "react";
import {deletePlanRequest, getAllPlansRequest} from "../../../service/networkRequests/planRequests";
import workoutImg from "../../../assets/images/icon_dumbell.png";
import {useDispatch, useSelector} from "react-redux";
import {resetWorkoutState, setCurrentWorkout} from "../../../redux/slices/workoutSlice";
import {showErrorToast, showSuccessToast} from "../../../util/toastActions";
import * as Action from "../../../navigation/NavActions";
import {RouteNames} from "../../../navigation/AppRoutes";
import ConfirmationModal from "../../../components/ConfirmationModal";
import {getAppTokens} from "../../../util/asyncStorageActions";
import {getUserDetailsRequest} from "../../../service/networkRequests/userRequests";

const PlanScreen = (navigation) => {

    const dispatch = useDispatch();
    const selectedWorkout = useSelector(state => state.workoutProcessReducer.currentWorkout);
    const [pendingWorkout, setPendingWorkout] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [selectedId,setSelectedId] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [workoutPlans, setWorkoutPlans] = useState([]);

    useEffect(() => {
        getAllWorkoutPlans();
    }, []);



    const getAllWorkoutPlans = async () => {

        const result = await getAllPlansRequest();
        if (result) {
            setWorkoutPlans(result?.data?.data);
        } else {
            console.log("a");
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            const {accessToken} = await getAppTokens();
            if (accessToken) {
                await fetchUserDetails();
            }
        };

        fetchData();

    }, []);

    const fetchUserDetails = async () => {
        const result = await getUserDetailsRequest();
        if (result) {
            setFirstName(result?.data?.data?.firstName);
            setLastName(result?.data?.data?.lastName);
        }
    };

    const deleteWorkoutPlan = async (id) => {
        console.log("selected Id delete", id);

        const result = await deletePlanRequest(id);
        console.log("RESULT DELETE", result);

        if (result) {
            showSuccessToast("Plan deleted Successfully");
            setConfirmDelete(false);
            setSelectedId(0);
            getAllWorkoutPlans();
        } else {
            showErrorToast();
        }

        dispatch(resetWorkoutState());

    };

    const viewWorkoutPlan = useCallback((item) => {
        dispatch(resetWorkoutState());
        if (item) {
            setPendingWorkout(item);
            dispatch(setCurrentWorkout(item));
        } else {
            showErrorToast("Workout not found");
        }
    }, [dispatch]);

    useEffect(() => {
        if (pendingWorkout && selectedWorkout?._id === pendingWorkout._id) {
            Action.navigate(RouteNames.WORKOUT_START_SCREEN);
            setPendingWorkout(null);
        } else if (pendingWorkout) {
            showErrorToast("Workout Not Selected Properly");
            setPendingWorkout(null);
        }
    }, [selectedWorkout, pendingWorkout]);


    return (
        <View style={styles.container}>

            <View style={styles.profileCard}>
                <View style={styles.weightInfo}>
                    <Text style={styles.profileName}>{firstName}</Text>
                    <Text style={styles.profileName}>{lastName}</Text>
                </View>

                <View style={styles.weightInfo}>
                    <Text style={styles.weightText}>Current weight: <Text style={styles.weightValue}>70kg</Text></Text>
                    <Text style={styles.weightText}>Goal weight: <Text style={styles.weightValue}>75kg</Text></Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Active Plans</Text>
            <View style={styles.hr}/>

            <View style={styles.workoutList}>
                <FlatList
                    data={workoutPlans}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({item,id}) => (
                        <View style={styles.card}>
                            <Image source={workoutImg} style={styles.cardImage} resizeMode="contain"/>
                            <View style={styles.cardDetails}>
                                <Text style={styles.planName}>{item.title}</Text>
                                <Text style={styles.planInfo}>Level: {item.difficulty}</Text>
                                <Text style={styles.planInfo}>Duration: {item.duration}</Text>
                                <Text style={styles.planInfo}>Target Calories: {item.estimatedCalories}</Text>
                                <View style={styles.cardButtons}>
                                    <TouchableOpacity style={styles.viewButton}
                                       onPress={()=>{
                                           console.log("Current Workout",item);
                                           viewWorkoutPlan(item);
                                       }}
                                    >
                                        <Text style={styles.viewButtonText}>View</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.deleteButton} onPress={()=>{
                                        setSelectedId(item?._id);
                                        setConfirmDelete(true);
                                    }}>
                                        <Text style={styles.deleteButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>

           <ConfirmationModal visible={confirmDelete}
                              onAccept={()=>deleteWorkoutPlan(selectedId)}
                              onCancel={()=>{setConfirmDelete(false);}}
                              title={'Delete Workout Confirmation'}
                              message={'Are you sure you want to delete this workout?'}
           />

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: dimensions.paddingLevel2,
    },
    profileCard: {
        backgroundColor: colors.secondary,
        borderRadius: 12,
        padding: dimensions.paddingLevel3,
        marginVertical: dimensions.heightLevel2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    profileName: {
        color: colors.white,
        fontSize: fontSizes.fontXLarge,
        fontFamily: fontFamilies.RobotoBold,
    },
    weightInfo: {
        flexDirection: 'column',
    },
    weightText: {
        color: colors.white,
        fontSize: fontSizes.fontSmallPlus,
    },
    weightValue: {
        fontWeight: 'bold',
        color: colors.white,
    },
    sectionTitle: {
        color: colors.white,
        fontSize: fontSizes.fontXXLarge,
        fontFamily: fontFamilies.RobotoBold,
        marginVertical: dimensions.heightLevel2,
        alignSelf: 'center',
    },
    listContainer: {
        paddingBottom: dimensions.heightLevel3,
    },
    card: {
        flex: 1,
        width:"100%",
        backgroundColor: colors.txtField,
        borderRadius: 16,
        flexDirection: 'row',
        padding: dimensions.paddingLevel2,
        marginBottom: dimensions.heightLevel2,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    cardImage: {
        width: 90,
        height: 90,
        marginRight: 12,
        tintColor: colors.white,
    },
    cardDetails: {},
    planName: {
        color: colors.white,
        fontSize: fontSizes.fontMedium,
        fontFamily: fontFamilies.RobotoBold,
        marginBottom: 4,
    },
    planInfo: {
        color: colors.white,
        fontSize: fontSizes.fontSmall,
        marginBottom: 2,
    },
    cardButtons: {
        flexDirection: 'row',
        marginTop: 10,
    },
    viewButton: {
        backgroundColor: colors.primary ?? '#1e90ff',
        paddingVertical: 6,
        paddingHorizontal: 18,
        borderRadius: 8,
        marginRight: 10,
    },
    viewButtonText: {
        color: colors.white,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 6,
        paddingHorizontal: 18,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: colors.white,
        fontWeight: 'bold',
    },
    hr: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 2,
        width: '100%',
    },
    workoutList: {
        flex: 1,
        marginTop: dimensions.heightLevel2 / 2,
    },
    modalContainer:{
        width:"70%",
        height: dimensions.heightLevel10,
        backgroundColor: colors.white,
    }
});

export default PlanScreen;