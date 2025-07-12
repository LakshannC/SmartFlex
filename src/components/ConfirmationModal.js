import {Modal, View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {colors, dimensions, fontSizes} from "../configuration/constants";

const ConfirmationModal = ({visible = false,onAccept,onCancel,title,message}) => {
    return (
        <View>

            <Modal
                visible={visible}
                onCancel={onCancel}
                transparent={true}
                animationType={"slide"}
            >

                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>{title ?? 'Confirmation!'}</Text>
                        <Text style={styles.modalMessage}>
                            {message ?? 'Are you sure you want to delete this workout?' }
                        </Text>
                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={onCancel}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={onAccept}
                            >
                                <Text style={styles.confirmButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


            </Modal>

        </View>
    )
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        width: '100%',
        maxWidth: 350,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize:fontSizes.fontLarge,
        fontWeight:'bold',
        marginBottom: dimensions.heightLevel3,
        textAlign:'center',
    },
    modalMessage:{
        fontSize:fontSizes.fontMedium,
        color:colors.primary,
        textAlign:'center',
        marginBottom:dimensions.paddingLevel4,
    },
    modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: colors.white,
    },
    confirmButton: {
        backgroundColor: colors.danger,
    },
    cancelButtonText: {
        color: colors.black,
        fontWeight: 'bold',
    },
    confirmButtonText: {
        color: colors.white,
        fontWeight: 'bold',
    },




});

export default ConfirmationModal;