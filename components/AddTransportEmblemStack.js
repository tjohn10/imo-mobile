import React from "react";
import {View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Ticket1Screen from "./screen/Transport-Ticket/Ticket1Screen";
import TicketSummaryScreen from "./screen/Transport-Ticket/TicketSummaryScreen";
import TransportOrderScreen from "./screen/Transport Emblem/TransportOrderScreen";
import TicketPaymentScreen from "./screen/Transport-Ticket/TicketPaymentScreen";
import TransportConfirmationScreen from "./screen/Transport Emblem/TransportConfirmationScreen";
import TransportSummaryScreen from "./screen/Transport Emblem/TransportSummaryScreen";
import backLogo from "../assets/back.png";

const Stack = createNativeStackNavigator()
export default function AddTransportEmblemStack(){
    return(
        <Stack.Navigator screenOptions={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
                color: '#071827',
                fontFamily: 'DMSans_400Regular',
                fontSize: 14,
            },
            headerBackImageSource: backLogo
        }}>
            <Stack.Screen name="Order" component={TransportOrderScreen} />
            <Stack.Screen name="Summary" component={TransportSummaryScreen} />
            <Stack.Screen name="Payment" component={TicketPaymentScreen} />
            <Stack.Screen name="Done" component={TransportConfirmationScreen} />
        </Stack.Navigator>
    )
}
