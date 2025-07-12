import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ImageBackground, Image } from "react-native";
import Carousel from "../../components/Carousel";
import {colors, dimensions, fontFamilies, fontSizes} from "../../../configuration/constants";
import LinearGradient from 'react-native-linear-gradient';
import GridView from "../../components/GridView";
import MiniCard from "../../components/MiniCard";
import * as Actions from "../../../navigation/NavActions";
import {RouteNames} from "../../../navigation/AppRoutes";

const customIcons = {
    genPlan: require('../../../assets/images/icon_add.webp'),
    plan: require('../../../assets/images/tabs/icon_plan_active.webp'),
    strength: require('../../../assets/images/categories/icon_strength.webp'),
    cardio: require('../../../assets/images/categories/icon_cardio.webp'),
    yoga: require('../../../assets/images/categories/icon_yoga.webp'),
    crossfit: require('../../../assets/images/categories/icon_crossfit.webp'),
};

const images = [
    require("../../../assets/images/slider/slider1.webp"),
    require("../../../assets/images/slider/slider2.webp"),
    require("../../../assets/images/slider/slider3.webp"),
    require("../../../assets/images/slider/slider4.webp"),
];

const HomeScreen = ({ navigation }) => {

    const workoutCategories = [
        { id: 1, name: "Strength", icon: customIcons.strength},
        { id: 2, name: "Cardio", icon: customIcons.cardio},
        { id: 3, name: "Yoga", icon: customIcons.yoga},
        { id: 4, name: "CrossFit", icon: customIcons.crossfit },
    ];

    const featuredClasses = [
        { id: 1, title: "HIIT Burn", duration: "30 min", level: "Advanced", image: require("../../../assets/images/categories/image_hiit_burn.webp") },
        { id: 2, title: "Morning Yoga", duration: "45 min", level: "Beginner", image: require("../../../assets/images/categories/image_yoga.webp") },
        { id: 3, title: "Power Lifting", duration: "60 min", level: "Intermediate", image: require("../../../assets/images/categories/image_power_lifting.webp") },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.sliderContainer}>
                <Carousel images={images} interval={4000} />
            </View>

            <View style={styles.headerContainer}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>Welcome Back, </Text>
                    <Text style={styles.userName}>Fitness Warrior!</Text>
                </View>
                {/*<Text style={styles.motivationText}>Today is a great day for a workout!</Text>*/}
            </View>

            <View style={styles.quickActionsContainer}>
                <TouchableOpacity style={styles.quickAction} onPress={() =>Actions.reset(RouteNames.GENDER_SELECTION_SCREEN)}>
                    <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.quickActionGradient}>
                        <Image source={customIcons.genPlan} style={styles.icon} />
                        <Text style={styles.quickActionText}>Generate Plan</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickAction} onPress={() =>Actions.reset(RouteNames.PLAN_TAB)}>
                    <LinearGradient colors={[colors.txtField, colors.background]} style={styles.quickActionGradient}>
                        <Image source={customIcons.plan} style={styles.icon} />
                        <Text style={styles.quickActionText}>My Plan</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Workout Categories</Text>
                <GridView
                    data={workoutCategories}
                    renderItem={(item) => (
                        <MiniCard
                            id={item.id}
                            name={item.name}
                            icon={item.icon}
                            layout='square'
                        />
                    )}
                    alignItems={'center'}
                    cols={4}
                />
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Featured Classes</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {featuredClasses.map((classItem) => (
                        <TouchableOpacity key={classItem.id} style={styles.classCard}>
                            <ImageBackground source={classItem.image} style={styles.classImage} imageStyle={{ borderRadius: 12 }}>
                                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.classGradient}>
                                    <Text style={styles.classTitle}>{classItem.title}</Text>
                                    <View style={styles.classInfo}>
                                        <Text style={styles.classDetail}>{classItem.duration}</Text>
                                        <Text style={styles.classDetail}>•</Text>
                                        <Text style={styles.classDetail}>{classItem.level}</Text>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.sectionTitle}>Today's Workout</Text>
                <TouchableOpacity style={styles.todaysWorkoutCard}>
                    <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.todaysWorkoutGradient}>
                        <Text style={styles.todaysWorkoutTitle}>Upper Body Blast</Text>
                        <Text style={styles.todaysWorkoutSubtitle}>5 exercises • 45 minutes</Text>
                        <View style={styles.startButton}>
                            <Text style={styles.startButtonText}>START NOW</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    innerContainer: {
        flex: 1,
        width: '95%',
    },
    sliderContainer: {
        marginTop: dimensions.heightLevel1 / 2,
    },
    headerContainer: {
        paddingVertical: dimensions.heightLevel1 / 2,
        paddingHorizontal: dimensions.heightLevel1 / 3,
    },
    welcomeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: fontSizes.fontXLarge,
        color: colors.white,
        fontFamily: fontFamilies.RobotoBold,
    },
    userName: {
        fontSize: fontSizes.fontXXXLarge,
        color: colors.primary,
        fontFamily: fontFamilies.RobotoBold,
    },

    quickActionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: dimensions.heightLevel1/2,
    },
    quickAction: {
        width: '48%',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
    },
    quickActionGradient: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: colors.white,
        marginBottom: dimensions.heightLevel1/2,
    },
    quickActionText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: fontSizes.fontMedium,
    },
    sectionContainer: {
        marginTop: dimensions.heightLevel1/2,
    },
    bottomContainer:{
       marginTop: dimensions.heightLevel1,
       marginBottom:dimensions.heightLevel2,
    },
    sectionTitle: {
        fontSize: fontSizes.fontXXXLarge,
        fontFamily: fontFamilies.RobotoBold,
        color: colors.white,
        marginBottom: dimensions.heightLevel1/2,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: dimensions.heightLevel1 / 3,
    },
    classCard: {
        width: 220,
        height: 150,
        marginRight: 15,
        borderRadius: 12,
    },
    classImage: {
        width: '100%',
        height: '100%',
    },
    classGradient: {
        flex: 1,
        borderRadius: 12,
        padding: 15,
        justifyContent: 'flex-end',
    },
    classTitle: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 5,
    },
    classInfo: {
        flexDirection: 'row',
    },
    classDetail: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        marginRight: 8,
    },
    todaysWorkoutCard: {
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        height: 160,
    },
    todaysWorkoutGradient: {
        padding: 20,
        height: '100%',
        justifyContent: 'center',
    },
    todaysWorkoutTitle: {
        color: colors.white,
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 5,
    },
    todaysWorkoutSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 16,
        marginBottom: 20,
    },
    startButton: {
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'flex-start',
    },
    startButtonText: {
        color: colors.primary,
        fontWeight: '700',
    },
});

export default HomeScreen;