import Snackbar from "react-native-snackbar";
import {colors} from "../configuration/constants";

export const showSuccessToast = (message) => {
    Snackbar.dismiss();
    Snackbar.show({
        text: message ?? 'Success',
        backgroundColor: colors.success,
        duration: Snackbar.LENGTH_LONG,
        textColor: colors.white
    });
};

export const showErrorToast = (message) => {
    Snackbar.dismiss();
    Snackbar.show({
        text: message ?? 'Something went wrong',
        backgroundColor: colors.danger,
        duration: Snackbar.LENGTH_LONG,
        textColor: colors.white
    });
};

export const showInfoToast = (message) => {
    Snackbar.dismiss();
    Snackbar.show({
        text: message ?? '&lt;INFO&gt;',
        backgroundColor: colors.gray,
        duration: Snackbar.LENGTH_LONG,
        textColor: colors.black
    });
};
