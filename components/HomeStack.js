import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./screen/HomeScreen";
import RegisterAbsScreen from "./screen/Abssin/RegisterAbsScreen";
import ViewEnumScreen from "./screen/Enumeration/ViewEnumScreen";
import ViewTransactionsScreen from "./screen/Transport-Ticket/ViewTransactionsScreen";
import ViewTaxpayersScreen from "./screen/Abssin/ViewTaxpayersScreen";
import backLogo from "../assets/back.png";
import AddTransportEmblemStack from "./AddTransportEmblemStack";
import AddTicketStack from "./AddTicketStack";
import AddMarketStack from "./AddMarketStack";
import TransactionDetailScreen from "./screen/Transport-Ticket/TransactionDetailScreen";
import TicketsStack from "./TicketsStack";
import AllTicketsScreen from "./screen/Transport-Ticket/AllTicketsScreen";
import IdentityStack from "./IdentityStack";
import ReportStack from "./screen/Reports/ReportStack";
import EnforcementStack from "./EnforcementStack";
import EnumerationStack from "./EnumerationStack";
import ViewIndividual from "./screen/Identity/ViewIndividual";
import IndividualDetail from "./screen/Identity/IndividualDetail";
import JoinGroupScreen from "./screen/JoinGroupScreen";

const Stack = createNativeStackNavigator()
export default function HomeStack(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle:{
                    fontWeight: '400',
                    fontSize: 14,
                    color: '#071827'
                },
                headerBackImageSource: backLogo
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="Register Abssin" component={RegisterAbsScreen}/>
            <Stack.Screen name="Transport" component={AddTransportEmblemStack}/>
            <Stack.Screen name="Ticket" component={TicketsStack} options={{
                headerTitle: 'Tickets',
                headerShown: false,
                headerTitleStyle: {
                    color: '#071827',
                    fontFamily: 'DMSans_400Regular',
                    fontSize: 14,
                }
            }}/>
            <Stack.Screen name="Identity" component={IdentityStack} options={{
                headerShown: false,
                headerTitleStyle: {
                    color: '#071827',
                    fontFamily: 'DMSans_400Regular',
                    fontSize: 14,
                }
            }}/>
            <Stack.Screen name="Reports" component={ReportStack} options={{
                headerShown: false,
                headerTitleStyle: {
                    color: '#071827',
                    fontFamily: 'DMSans_400Regular',
                    fontSize: 14,
                }
            }}/>

            <Stack.Screen name="Transactions" component={ViewTransactionsScreen}/>
            <Stack.Screen name="Enforcement" component={EnforcementStack} options={{
                headerShown: false,
                headerTitleStyle: {
                    color: '#071827',
                    fontFamily: 'DMSans_400Regular',
                    fontSize: 14,
                }
            }}/>
            <Stack.Screen name="Transaction Detail" component={TransactionDetailScreen}/>
            <Stack.Screen name="TaxPayers" component={ViewIndividual}/>
            <Stack.Screen name="Join" component={JoinGroupScreen}/>
            <Stack.Screen name="Individual Details" component={IndividualDetail}/>
            <Stack.Screen name="Enumeration" component={EnumerationStack} options={{
                headerShown: false,
                headerTitleStyle: {
                    color: '#071827',
                    fontFamily: 'DMSans_400Regular',
                    fontSize: 14,
                }
            }}/>
        </Stack.Navigator>
    )
}
