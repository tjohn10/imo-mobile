import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AllEnforcementsScreen from "./screen/Enforcement/AllEnforcementsScreen";
import ValidateScreen from "./screen/Account/ValidateScreen";
import backLogo from "../assets/back.png";
import ViewTransactionsScreen from "./screen/Transport-Ticket/ViewTransactionsScreen";
import VerifyTicketScreen from "./screen/Enforcement/VerifyTicketScreen";


const Stack = createNativeStackNavigator()
export default function EnforcementStack(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle:{
                    fontWeight: '600',
                    fontSize: 16,
                    color: '#071827'
                },
                headerBackImageSource: backLogo
            }}
        >
            <Stack.Screen name="All" component={AllEnforcementsScreen} />
            <Stack.Screen name="Verify Ticket" component={VerifyTicketScreen} />
            <Stack.Screen name="History" component={ViewTransactionsScreen} />
        </Stack.Navigator>
    )
}
