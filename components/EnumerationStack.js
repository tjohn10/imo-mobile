import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import backLogo from "../assets/back.png";
import TransportEnumerationScreen from "./screen/Enumeration/TransportEnumerationScreen";
import MarketEnumerationScreen from "./screen/Enumeration/MarketEnumerationScreen";
// import AllEnumerationScreen from "./screen/Enumeration/AllEnumerationScreen";

import AddTransportEnumerationStack from "./AddTransportEnumerationStack";
import AllTransportEnumerationScreen from "./screen/Transport-Enumeration/AllTransportEnumerationScreen";
import ViewEnumScreen from "./screen/Enumeration/ViewEnumScreen";
import MarketEnumerationStack from "./MarketEnumerationStack";
import EnumDetailsScreen from "./screen/Enumeration/EnumDetailsScreen";
import SignageEnumerationStack from "./SignageEnumerationStack";

const Stack = createNativeStackNavigator();
export default function EnumerationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "400",
          fontSize: 14,
          color: "#071827",
        },
        headerBackImageSource: backLogo,
      }}
    >
      <Stack.Screen
        name="All Enumeration"
        component={AllTransportEnumerationScreen}
      />
      <Stack.Screen
        name="Transport Enumeration"
        component={AddTransportEnumerationStack}
      />
      <Stack.Screen
        name="Market Enumeration"
        component={MarketEnumerationStack}
        options={{
            headerShown: false,
        }}
      />
        <Stack.Screen
        name="Signage Enumeration"
        component={SignageEnumerationStack}
        options={{
            headerShown: false,
        }}
      />
     <Stack.Screen
            name="Manage Enumeration"
            component={ViewEnumScreen}
          />
        <Stack.Screen
            name="Details"
            component={EnumDetailsScreen}
          />
    </Stack.Navigator>
  );
}
