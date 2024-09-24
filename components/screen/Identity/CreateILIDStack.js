import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {View} from "react-native";
import CreateILIDScreen from "./CreateILIDScreen";
import IDStatusScreen from "./IDStatusScreen";
import OTPScreen from "./OTPScreen";
import UserDetailsScreen from "./UserDetailsScreen";

const Stack = createNativeStackNavigator()
export default function CreateILIDStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Status" component={IDStatusScreen}/>
            <Stack.Screen name="OTP" component={OTPScreen}/>
            <Stack.Screen name="User" component={UserDetailsScreen}/>
        </Stack.Navigator>
    )}
