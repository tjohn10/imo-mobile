import React, {useState} from "react";
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
    Pressable, Platform
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AbsseinP1Screen from "./AbsseinP1Screen";
import AbsseinP2Screen from "./AbsseinP2Screen";
import AbsseinP3Screen from "./AbsseinP3Screen";
import AbsseinP4Screen from "./AbsseinP4Screen";


const Stack = createStackNavigator()
export default function RegisterAbsScreen() {

    return (
            <Stack.Navigator initialRouteName="Step1" screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Step1" component={AbsseinP1Screen} />
                <Stack.Screen name="Step2" component={AbsseinP2Screen} />
                <Stack.Screen name="Step3" component={AbsseinP3Screen} />
                <Stack.Screen name="Confirmation" component={AbsseinP4Screen} />
            </Stack.Navigator>
    )
}
