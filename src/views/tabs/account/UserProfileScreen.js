import { Keyboard, ScrollView, StyleSheet, Text, View} from "react-native";
import NavigationBar from "../../../components/NavigationBar";
import {colors, dimensions, fontFamilies, fontSizes} from "../../../configuration/constants";
import React, {useCallback, useEffect, useState} from "react";
import TextField from "../../../components/TextField";
import ButtonField from "../../../components/ButtonField";
import DropdownField from "../../../components/DropdownField";

import {getUserDetailsRequest, updateProfileRequest} from "../../../service/networkRequests/userRequests";
import {showErrorToast, showSuccessToast} from "../../../util/toastActions";

const UserProfileScreen = ({navigation}) => {

    const genderData = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
    ];

    const [displayName, setDisplayName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');


    useEffect(() => {
        fetchUserDetails();
    }, [])

    const fetchUserDetails = async () => {
        const userDetails = await getUserDetailsRequest();
        console.log('User details:', userDetails);
        if (userDetails) {
            const userData = userDetails?.data?.data;
            const name = userData?.firstName + " " + userData?.lastName;

            setDisplayName(name);
            setFirstName(userData?.firstName);
            setLastName(userData?.lastName);
            setEmail(userData?.email);
            setSelectedGender(userData?.gender);
            setAge(userData?.age?.toString() || '');
            setHeight(userData?.height?.toString() || '');
        }
    };

    const onReset = async () => {
        await fetchUserDetails();
    }

    const onUpdateProfile = async () => {
        Keyboard.dismiss();

        const userData = {
            firstName: firstName,
            lastName: lastName,
            gender: selectedGender,
            age: age,
            height: height,
        }

        const result = await updateProfileRequest(userData);
        if(result?.code === 200) {
            showSuccessToast('Profile is updated');
            fetchUserDetails();
        } else{
            showErrorToast('Something went wrong');
        }

    }


    const validateInputFields = () => {
        return (!firstName || !lastName || !email || !selectedGender || !age || !height);
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <NavigationBar
                    title={'Edit Profile'}/>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                >

                    <View style={styles.dpText}>
                        <Text style={styles.dpName}>{displayName}</Text>
                    </View>

                    <View style={styles.inputInfo}>
                        <View style={styles.info}>
                            <TextField
                                layout={'classic'}
                                label={'First Name'}
                                value={firstName}
                                onChangeText={setFirstName}/>
                        </View>

                        <View style={styles.info}>
                            <TextField
                                layout={'classic'}
                                label={'Last Name'}
                                value={lastName}
                                onChangeText={setLastName}/>
                        </View>


                        <View style={styles.info}>
                            <TextField
                                layout={'classic'}
                                label={'Email Address'}
                                value={email} enabled={false}/>
                        </View>

                        <View style={styles.info}>
                            <DropdownField
                                data={genderData}
                                label={'Gender'}
                                placeholder={'Select'}
                                value={selectedGender}
                                onChange={(item) => setSelectedGender(item.value)}
                            />
                        </View>

                        <View style={styles.info}>
                            <TextField
                                layout={'classic'}
                                label={'Age'}
                                isNumeric={true}
                                value={age || ''}
                                onChangeText={setAge}/>
                        </View>


                        <View style={styles.info}>
                            <TextField
                                layout={'classic'}
                                label={'Height'}
                                isNumeric={true}
                                value={height || ''}
                            onChangeText={setHeight}/>
                        </View>

                    </View>
                </ScrollView>

            </View>
            <View style={{flexDirection: 'row', padding: dimensions.heightLevel2 / 2}}>
                <View style={{flex: 1}}>
                    <ButtonField
                        rounded
                        label={'Reset'}
                        labelColor={colors.white}
                        bgColor={colors.black}
                        buttonHeight={dimensions.heightLevel4}
                        size={'medium'}
                        onPress={() => onReset()}
                    />
                </View>
                <View style={{width: 10}}></View>
                <View style={{flex: 1}}>
                    <ButtonField
                        rounded
                        label={'Update Info'}
                        labelColor={colors.white}
                        bgColor={colors.primary}
                        buttonHeight={dimensions.heightLevel4}
                        size={'medium'}
                        disabled={validateInputFields()}
                        onPress={
                            useCallback(onUpdateProfile, [firstName, lastName, selectedGender, age, height])
                        }
                    />
                </View>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    innerContainer: {
        flex: 1,
        width: '95%',
    },
    inputInfo: {
        alignItems: "center",
        paddingHorizontal: dimensions.heightLevel1 / 3,
        marginTop: dimensions.heightLevel2,
        marginBottom: dimensions.heightLevel2,

    },
    info: {
        marginBottom: dimensions.heightLevel1,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: dimensions.heightLevel10,
        paddingHorizontal: dimensions.heightLevel8
    },

    dpText: {
        marginTop:dimensions.heightLevel3,
        alignItems: 'center'
    },
    dpName: {
        fontSize: fontSizes.fontMedium,
        color: colors.white,
        fontFamily: fontFamilies.RobotoBold,
    },
});
export default UserProfileScreen;
