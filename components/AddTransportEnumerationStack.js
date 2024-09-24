import React from "react";
import {View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TransportEnumeration1Screen from "./screen/Transport-Enumeration/TransportEnumeration1Screen";
import TransportEnumerationSummaryScreen from "./screen/Transport-Enumeration/TransportEnumerationSummaryScreen";

const Stack = createNativeStackNavigator()
export default function AddTransportEnumerationStack(){
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Order" component={TransportEnumeration1Screen} />
            <Stack.Screen name="Summary" component={TransportEnumerationSummaryScreen} />
            <Stack.Screen name="Payment" component={TransportEnumeration1Screen} />
            <Stack.Screen name="Done" component={TransportEnumeration1Screen} />
        </Stack.Navigator>
    )
}
