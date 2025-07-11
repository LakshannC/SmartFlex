import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors, dimensions, fontFamilies, fontSizes} from "../../../configuration/constants";

const TipsScreen = (navigation) =>{

    const samplePlans = [
        {
            id: '1',
            name: 'Upper Body Power',
            level: 'Intermediate',
            duration: '40-50 min',
            calories: '250 kcal',
            image: require('../../../assets/images/icon_homeworkout.webp'),
        },
        {
            id: '2',
            name: 'Upper Body Power',
            level: 'Intermediate',
            duration: '40-50 min',
            calories: '250 kcal',
            image: require('../../../assets/images/icon_homeworkout.webp'),
        }
    ];


    return (
        <View style={styles.container}>

            {/* Header Section */}
            <View style={styles.profileCard}>
                <View style={styles.weightInfo}>
                    <Text style={styles.profileName}>Lakshan</Text>
                    <Text style={styles.profileName}>Chathuranga</Text>
                </View>

                <View style={styles.weightInfo}>
                    <Text style={styles.weightText}>Current weight: <Text style={styles.weightValue}>70kg</Text></Text>
                    <Text style={styles.weightText}>Goal weight: <Text style={styles.weightValue}>75kg</Text></Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Active Plans</Text>
            <View style={styles.hr} />

            <View style={styles.workoutList}>
                <FlatList
                    data={samplePlans}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
                            <View style={styles.cardDetails}>
                                <Text style={styles.planName}>{item.name}</Text>
                                <Text style={styles.planInfo}>Level: {item.level}</Text>
                                <Text style={styles.planInfo}>Duration: {item.duration}</Text>
                                <Text style={styles.planInfo}>Target Calories: {item.calories}</Text>
                                <View style={styles.cardButtons}>
                                    <TouchableOpacity style={styles.viewButton}>
                                        <Text style={styles.viewButtonText}>View</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.deleteButton}>
                                        <Text style={styles.deleteButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>



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
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
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
        flex:1,
        backgroundColor: colors.primary,
        borderRadius: 16,
        flexDirection: 'row',
        padding: dimensions.paddingLevel2,
        marginBottom: dimensions.heightLevel2,
        alignItems: 'center',
        justifyContent:'space-evenly',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    cardImage: {
        width: 90,
        height: 90,
        marginRight: 12,
    },
    cardDetails: {

    },
    planName: {
        color: 'black',
        fontSize: fontSizes.fontXLarge,
        fontFamily: fontFamilies.RobotoBold,
        marginBottom: 4,
    },
    planInfo: {
        color:'black',
        fontSize: fontSizes.fontSmall,
        marginBottom: 2,
    },
    cardButtons: {
        flexDirection: 'row',
        marginTop: 10,
    },
    viewButton: {
        backgroundColor: colors.secondary ?? '#1e90ff',
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
        marginVertical:2,
        width: '100%',
    },
    workoutList:{
        flex:1,
        marginTop:dimensions.heightLevel2/2,
    }
});

export default TipsScreen;