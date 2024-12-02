import React from "react";
import {View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TransportEnumeration1Screen from "./screen/Transport-Enumeration/TransportEnumeration1Screen";
import TransportEnumerationSummaryScreen from "./screen/Transport-Enumeration/TransportEnumerationSummaryScreen";
import TransportEnumeration2Screen from "./screen/Transport-Enumeration/TransportEnumeration2Screen";
import TransportEnumeration3Screen from "./screen/Transport-Enumeration/TransportEnumeration3Screen";
import TransportEnumerationConfirmationScreen
    from "./screen/Transport-Enumeration/TransportEnumerationConfirmationScreen";
import AllTicketsScreen from "./screen/Transport-Ticket/AllTicketsScreen";
import VehicleInformation from "./screen/Transport-Enumeration/VehicleInformation";
import AllEnumerationScreen from "./screen/Transport-Enumeration/AllTransportEnumerationScreen";

const Stack = createNativeStackNavigator()
export default function AddTransportEnumerationStack(){
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Order" component={TransportEnumeration1Screen} />
            <Stack.Screen name="Order2" component={TransportEnumeration2Screen} />
            <Stack.Screen name="Order3" component={TransportEnumeration3Screen} />
            <Stack.Screen name="Done" component={TransportEnumerationConfirmationScreen} />
            <Stack.Screen name="All Tickets" component={AllEnumerationScreen} />
            <Stack.Screen name="Vehicle Info" component={VehicleInformation} />
        </Stack.Navigator>
    )
}
