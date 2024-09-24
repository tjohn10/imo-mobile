import {Alert} from "react-native";
import {AuthContext, AuthProvider} from "./context/AuthContext";
import messaging from '@react-native-firebase/messaging';
import AppNav from "./AppNav";

import {PermissionsAndroid} from 'react-native';
import {useEffect} from "react";
import {useFonts} from "expo-font";
import {Mulish_400Regular, Mulish_500Medium, Mulish_800ExtraBold} from "@expo-google-fonts/mulish";
import {DMSans_400Regular, DMSans_500Medium, DMSans_700Bold} from "@expo-google-fonts/dm-sans";
import {Inter_400Regular, Inter_500Medium, Inter_700Bold} from "@expo-google-fonts/inter";
export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        Mulish_400Regular,
        Mulish_500Medium,
        Mulish_800ExtraBold,
        DMSans_400Regular,
        DMSans_500Medium,
        DMSans_700Bold,
        Inter_700Bold,
        Inter_500Medium,
        Inter_400Regular
    });
    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <AuthProvider>
          <AppNav />
        </AuthProvider>
    );
}
