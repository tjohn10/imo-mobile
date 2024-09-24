import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SignageEnumerationScreen from "./screen/Enumeration/Signage/SignageEnumerationScreen";
import FirstPartySignsScreen from "./screen/Enumeration/Signage/FirstPartySignsScreen";
import SpecialAdvertScreen from "./screen/Enumeration/Signage/SpecialAdvertScreen";
import TemporarySignsScreen from "./screen/Enumeration/Signage/TemporarySignsScreen";
import backLogo from "../assets/back.png";
import FreestandingScreen from "./screen/Enumeration/Signage/FreestandingScreen";
import DevelopmentBoardScreen from "./screen/Enumeration/Signage/DevelopmentBoardScreen";
import MobileAdvertScreen from "./screen/Enumeration/Signage/MobileAdvertScreen";

const Stack = createNativeStackNavigator()
export default function SignageEnumerationStack(){
    return(
        <Stack.Navigator screenOptions={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
                color: '#071827',
                fontFamily: 'DMSans_400Regular',
                fontSize: 16,
                fontWeight: '700'
            },
            headerBackImageSource: backLogo
        }}>
            <Stack.Screen name="All Signage" component={SignageEnumerationScreen} />
            <Stack.Screen name="First Party" component={FirstPartySignsScreen} options={{
                headerTitle: 'First Party Signs'
            }} />
            <Stack.Screen
                name="Special"
                component={SpecialAdvertScreen}
                options={{
                    headerTitle: 'Special Advertisements'
                }}
            />
            <Stack.Screen
                name="Temporary"
                component={TemporarySignsScreen}
                options={{
                    headerTitle: 'Temporary Signs'
                }}
            />
            <Stack.Screen
                name="Freestanding"
                component={FreestandingScreen}
                options={{
                    headerTitle: 'Freestanding or Sky Signs'
                }}
            />
            <Stack.Screen
                name="Development"
                component={DevelopmentBoardScreen}
                options={{
                    headerTitle: 'Development Board Fare'
                }}
            />
            <Stack.Screen
                name="Mobile"
                component={MobileAdvertScreen}
                options={{
                    headerTitle: 'Mobile Advertisement'
                }}
            />
        </Stack.Navigator>
    )
}
