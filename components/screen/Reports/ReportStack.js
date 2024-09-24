import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AllReportsScreen from "./AllReportsScreen";
import ViewTaxpayersScreen from "../Abssin/ViewTaxpayersScreen";
import ViewTransactionsScreen from "../Transport-Ticket/ViewTransactionsScreen";
import TransferHistoryScreen from "../Transport-Ticket/TransferHistoryScreen";
import ViewIndividual from "../Identity/ViewIndividual";
import ViewEnumScreen from "../Enumeration/ViewEnumScreen";
import backLogo from "../../../assets/back.png";
import ManageAgentsScreen from "../Agents/ManageAgentsScreen";
import AgentDetailScreen from "../Agents/AgentDetailScreen";

const Stack = createNativeStackNavigator()
export default function ReportStack(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle:{
                    fontWeight: '600',
                    fontSize: 18,
                    color: '#071827'
                },
                headerBackImageSource: backLogo
            }}
        >
            <Stack.Screen name="All Reports" component={AllReportsScreen}/>
            <Stack.Screen name="Ticket Report" component={ViewTransactionsScreen} />
            <Stack.Screen name="Transport Report" component={ViewTransactionsScreen}/>
            <Stack.Screen name="Transfer Report" component={TransferHistoryScreen}/>
            <Stack.Screen name="ABSSIN Report" component={ViewIndividual}/>
            <Stack.Screen name="Enumeration Report" component={ViewEnumScreen}/>
            <Stack.Screen name="Agents Report" component={ManageAgentsScreen}/>
            <Stack.Screen name="Detail" component={AgentDetailScreen}/>
        </Stack.Navigator>
    )
}
