import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AddTransportEmblemStack from "./AddTransportEmblemStack";
import AddTicketStack from "./AddTicketStack";
import AddMarketStack from "./AddMarketStack";
import backLogo from "../assets/back.png";
import AllTicketsScreen from "./screen/Transport-Ticket/AllTicketsScreen";
import AllIDsScreen from "./screen/Identity/AllIDsScreen";
import CreateILIDScreen from "./screen/Identity/CreateILIDScreen";
import CreateBusinessScreen from "./screen/Identity/CreateBusinessScreen";
import ManageStateID from "./screen/Identity/ManageStateID";
import PendingStateID from "./screen/Identity/PendingStateID";
import GenerateIDsScreen from "./screen/Identity/GenerateIDsScreen";
import ViewIndividual from "./screen/Identity/ViewIndividual";
import IndividualDetail from "./screen/Identity/IndividualDetail";
import BusinessList from "./screen/Identity/BusinessList";
import BusinesDetailScreen from "./screen/Identity/BusinesDetailScreen";
import CreateILIDStack from "./screen/Identity/CreateILIDStack";

const Stack = createNativeStackNavigator()
export default function IdentityStack(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle:{
                    fontWeight: '700',
                    fontSize: 14,
                    color: '#071827'
                },
                headerBackImageSource: backLogo
            }}
        >
            <Stack.Screen name="All IDs" component={AllIDsScreen}/>
            <Stack.Screen name="Create" component={CreateILIDStack}/>
            <Stack.Screen
                name="Create Business"
                component={CreateBusinessScreen} options={{
                headerTitle: 'Add Business',
                headerShown: true,
                headerTitleStyle: {
                    color: '#071827',
                    fontFamily: 'DMSans_400Regular',
                    fontWeight: '900',
                    fontSize: 14,
                }
            }}/>
            <Stack.Screen name="View Business" component={BusinessList} options={{
                headerTitle: 'Businesses'
            }}/>
            <Stack.Screen name="View Individual" component={ViewIndividual}/>
            <Stack.Screen name="Individual Details" component={IndividualDetail}/>
            <Stack.Screen name="Business Details" component={BusinesDetailScreen}/>
            <Stack.Screen name="Generate" component={GenerateIDsScreen}/>
        </Stack.Navigator>
    )
}
