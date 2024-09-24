import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LazyScreen from "./screen/Auth/LazyScreen";
import WelcomeScreen from "./screen/Auth/WelcomeScreen";
import SignupScreen from "./screen/Auth/SignupScreen";
import LoginScreen from "./screen/Auth/LoginScreen";
import AppStack from "./AppStack";
import ChangePasswordScreen from "./screen/Auth/ChangePasswordScreen";


const Stack = createNativeStackNavigator();
export default function AuthStack(){
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            {/*<Stack.Screen name="Lazy" component={LazyScreen} />*/}
            {/*<Stack.Screen name="Welcome" component={WelcomeScreen} />*/}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Forgot" component={ChangePasswordScreen} options={{
                headerShown: true,
                headerTitle: 'Change Password',
                headerTitleAlign: 'center'
            }}/>
            <Stack.Screen name="App" component={AppStack} />
        </Stack.Navigator>
    )
}
