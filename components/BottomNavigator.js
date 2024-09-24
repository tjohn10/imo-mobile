import React from "react";
import {Image} from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from "./screen/HomeScreen";
import VerifyTicketScreen from "./screen/Enforcement/VerifyTicketScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import verify from "../assets/icons/verify.png"
import HomeStack from "./HomeStack";
import AccountStack from "./AccountStack";
import MoreScreen from "./screen/more/MoreScreen";
import MoreStack from "./MoreStack";

const Tab = createMaterialBottomTabNavigator()
export default function BottomNavigator(){
    return(
       <Tab.Navigator>
           <Tab.Screen
               name="Homes"
               component={HomeStack}
               options={{
                   tabBarLabel: 'Home',
                   headerShown: false,
                   tabBarIcon: () => (
                   <Ionicons name="home-outline" color="#09893E" size={24}/>
                   )
               }}
           />
           <Tab.Screen
               name="Verify"
               component={VerifyTicketScreen}
               options={{
                   tabBarLabel: 'Verify Ticket',
                   headerShown: true,
                   headerTitle: 'Verify Ticket',
                   tabBarIcon: ({color}) => (
                       <Image source={verify} style={{width: 24, height: 24}} />
                   )
               }}
           />
           <Tab.Screen
               name="Accounts"
               component={AccountStack}
               options={{
                   tabBarLabel: 'Account',
                   headerShown: true,
                   tabBarIcon: ({color}) => (
                       <Ionicons name="person-outline" color="#09893E" size={24}/>
                   )
               }}
           />
           <Tab.Screen
               name="Mores"
               component={MoreStack}
               options={{
                   tabBarLabel: 'More',
                   headerShown: true,
                   headerTitle: 'More',
                   tabBarIcon: ({color}) => (
                       <Ionicons name="ellipsis-horizontal-outline" color="#09893E" size={26}/>
                   )
               }}
           />
       </Tab.Navigator>
    )
}
