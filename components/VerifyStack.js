import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import VerifyTicketScreen from "./screen/Enforcement/VerifyTicketScreen";

const Stack = createNativeStackNavigator()
export default function VerifyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="verify" component={VerifyTicketScreen} options={{
                headerShown: true,
                headerTitle: 'Verify Tickets'
            }} />
        </Stack.Navigator>
    )
}
