import {createRef} from "react";

export const navigationRef = createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function reset(name, params) {
    navigationRef.current?.reset({
        index: 0,
        routes: [{name, params}]
    });
}

export function goBack() {
    navigationRef.current?.goBack();
}

export function getCurrentNavigation() {
    return navigationRef?.current;
}
