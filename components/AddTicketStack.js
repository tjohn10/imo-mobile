import React from "react";
import {View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Ticket1Screen from "./screen/Transport-Ticket/Ticket1Screen";
import TicketSummaryScreen from "./screen/Transport-Ticket/TicketSummaryScreen";
import TransportOrderScreen from "./screen/Transport Emblem/TransportOrderScreen";
import TicketPaymentScreen from "./screen/Transport-Ticket/TicketPaymentScreen";
import TicketConfirmationScreen from "./screen/Transport-Ticket/TicketConfirmationScreen";
import backLogo from "../assets/back.png";
import PayWIthEnumScreen from "./screen/Transport-Ticket/PayWIthEnumScreen";
import TicketPayOptions from "./screen/Transport-Ticket/TicketPayOptions";

const Stack = createNativeStackNavigator()
export default function AddTicketStack(){
    return(
        <Stack.Navigator screenOptions={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
                color: '#071827',
                fontFamily: 'DMSans_400Regular',
                fontSize: 14,
            },
            headerTitle: 'Transport Ticket',
            headerBackImageSource: backLogo
        }}>

            <Stack.Screen name="Pay Options" component={TicketPayOptions} />
            <Stack.Screen name="Order" component={Ticket1Screen} />
            <Stack.Screen name="Enum ID" component={PayWIthEnumScreen} />
            <Stack.Screen name="Summary" component={TicketSummaryScreen} />
            <Stack.Screen name="Done" component={TicketConfirmationScreen} />
        </Stack.Navigator>
    )
}
