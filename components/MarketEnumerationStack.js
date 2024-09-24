import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import backLogo from "../assets/back.png";
import MarketEnumerationScreen from "./screen/Enumeration/MarketEnumerationScreen";
import MarketSummaryScreen from "./screen/Enumeration/MarketSummaryScreen";

const Stack = createNativeStackNavigator()
export default function MarketEnumerationStack(){
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
            <Stack.Screen name="Order" component={MarketEnumerationScreen} />
            <Stack.Screen name="Summary" component={MarketSummaryScreen} />
        </Stack.Navigator>
    )
}
