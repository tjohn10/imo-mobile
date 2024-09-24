import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AddAgentScreen from "./screen/Account/AddAgentScreen";
import ChangePasswordScreen from "./screen/Auth/ChangePasswordScreen";
import MoreScreen from "./screen/more/MoreScreen";
import backLogo from "../assets/back.png";
import AboutScreen from "./screen/more/AboutScreen";
import ChangeDataScreen from "./screen/more/ChangeDataScreen";
import SupportScreen from "./screen/more/SupportScreen";
import RegisterAbsScreen from "./screen/Abssin/RegisterAbsScreen";
import FeedbackScreen from "./screen/more/FeedbackScreen";
import AddTransportEmblemStack from "./AddTransportEmblemStack";
import AddMarketStack from "./AddMarketStack";
import LoginScreen from "./screen/Auth/LoginScreen";
import AuthStack from "./AuthStack";
import OtherServicesScreen from "./screen/more/OtherServicesScreen";
import Chat from "./screen/more/ChatScreen";

const Stack = createNativeStackNavigator()
export default function MoreStack(){
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
           <Stack.Screen name="More" component={MoreScreen} options={{
               headerBackVisible: false
           }}/>
           <Stack.Screen name="Add Agents" component={AddAgentScreen}/>
           <Stack.Screen name="Password" component={ChangePasswordScreen}/>
           <Stack.Screen name="About" component={AboutScreen}/>
           <Stack.Screen name="Transport" component={AddTransportEmblemStack}/>
           <Stack.Screen name="Market" component={AddMarketStack}/>
           <Stack.Screen name="Feedback" component={FeedbackScreen}/>
           <Stack.Screen name="Concessionaire" component={FeedbackScreen}/>
           <Stack.Screen name="Change Data" component={ChangeDataScreen}/>
           <Stack.Screen name="Support" component={SupportScreen}/>
           <Stack.Screen name="Other Services" component={OtherServicesScreen}/>
           <Stack.Screen name="Abssin" component={RegisterAbsScreen}/>
           <Stack.Screen name="Chat" component={Chat}/>
       </Stack.Navigator>
   )
}
