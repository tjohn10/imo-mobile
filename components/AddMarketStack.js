import React from "react";
import {View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MarketOrderScreen from "./screen/MarketTicket/MarketOrderScreen";
import MarketSummaryScreen from "./screen/MarketTicket/MarketSummaryScreen";
import MarketTicketReceipt from "./screen/MarketTicket/MarketTicketReceipt";
import backLogo from "../assets/back.png";

const Stack = createNativeStackNavigator()
export default function AddMarketStack(){
    return(
        <Stack.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
                color: '#071827',
                fontFamily: 'DMSans_400Regular',
                fontSize: 14,
            },
            headerBackImageSource: backLogo
        }}>
            <Stack.Screen name="Order" component={MarketOrderScreen} />
            <Stack.Screen name="Summary" component={MarketSummaryScreen} />
            <Stack.Screen name="Done" component={MarketTicketReceipt} />
        </Stack.Navigator>
    )
}
