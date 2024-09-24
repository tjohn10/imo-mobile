import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AddTransportEmblemStack from "./AddTransportEmblemStack";
import AddTicketStack from "./AddTicketStack";
import AddMarketStack from "./AddMarketStack";
import backLogo from "../assets/back.png";
import AllTicketsScreen from "./screen/Transport-Ticket/AllTicketsScreen";
import TransferHistoryScreen from "./screen/Transport-Ticket/TransferHistoryScreen";
import DriverPresumptiveTax from "./screen/Transport-Ticket/DriverPresumptiveTax";
import CorporateTransportScreen from "./screen/Transport-Ticket/CorporateTransportScreen";
import TransferHistoryDetailScreen from "./screen/Transport-Ticket/TransferHistoryDetailScreen";
import ConcessionaireStack from "./ConcessionaireStack";


const Stack = createNativeStackNavigator()
export default function TicketsStack(){
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
            <Stack.Screen name="All Tickets" component={AllTicketsScreen}/>
            <Stack.Screen name="Transports" component={AddTransportEmblemStack} options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name="Tickets"
                title="Tickets"
                component={AddTicketStack} options={{
                headerTitle: 'Add Transport Ticket',
                headerShown: false,
                headerTitleStyle: {
                    color: '#071827',
                    fontFamily: 'DMSans_400Regular',
                    fontSize: 14,
                }
            }}/>
            <Stack.Screen name="Market" component={AddMarketStack} options={{
                headerTitle: 'Add Market Ticket',
                headerShown: false
            }}/>
            <Stack.Screen name="Transport" component={AddTransportEmblemStack} options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name="Transfer"
                component={TransferHistoryScreen}
                options={{
                    headerTitle: 'Transfer History'
                }}
            />
            <Stack.Screen
                name="Concessionaire"
                component={ConcessionaireStack}
                options={{
                    headerTitle: 'Concessionaires',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Transfer Details"
                component={TransferHistoryDetailScreen}
            />
            <Stack.Screen
                name="Corporate"
                component={CorporateTransportScreen}
                options={{
                    headerTitle: 'Corporate Transport Ticket',
                    headerShown: true,
                    headerTitleStyle: {
                        color: '#071827',
                        fontFamily: 'DMSans_400Regular',
                        fontSize: 14,
                    }
                }}
            />
            <Stack.Screen
                name="Presumptive"
                component={DriverPresumptiveTax}
                options={{
                    headerTitle: 'Drivers Presumptive Tax',
                    headerShown: true,
                    headerTitleStyle: {
                        color: '#071827',
                        fontFamily: 'DMSans_400Regular',
                        fontSize: 14,
                    }
                }}
            />
        </Stack.Navigator>
    )
}
