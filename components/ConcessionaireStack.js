import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AllConcessionaireScreen from "./screen/Concessionaire/AllConcessionaireScreen";
import NewConcessionaireScreen from "./screen/Concessionaire/NewConcessionaireScreen";
import PalmProduceScreen from "./screen/Concessionaire/PalmProduceScreen";
import VeterinaryScreen from "./screen/Concessionaire/VeterinaryScreen";
import backLogo from "../assets/back.png";
import QuarryScreen from "./screen/Concessionaire/QuarryScreen";
import StoneSitesScreen from "./screen/Concessionaire/StoneSitesScreen";
import ForestryScreen from "./screen/Concessionaire/ForestryScreen";
import InterStateHaulageScreen from "./screen/Concessionaire/InterStateHaulageScreen";
import MarketDailyScreen from "./screen/Concessionaire/MarketDailyScreen";
import BaggageBasketScreen from "./screen/Concessionaire/BaggageBasketScreen";
import GatePassScreen from "./screen/Concessionaire/GatePassScreen";
import ScrapMetalScreen from "./screen/Concessionaire/ScrapMetalScreen";
import ConcessionReceipt from "./screen/Concessionaire/ConcessionReceipt";
import SandBeachesScreen from "./screen/Concessionaire/SandBeachesScreen";
import LoadingScreen from "./screen/Concessionaire/LoadingScreen";

const Stack = createNativeStackNavigator()
export default function ConcessionaireStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle:{
                    fontWeight: '600',
                    fontSize: 16,
                    color: '#071827'
                },
                headerBackImageSource: backLogo
            }}
        >
            <Stack.Screen name="All" component={AllConcessionaireScreen} options={{
                headerTitle: 'Flying Revenue Tickets'
            }}/>
            <Stack.Screen name="Done" component={ConcessionReceipt} options={{
                headerTitle: 'Receipt'
            }}/>
            <Stack.Screen name="New" component={NewConcessionaireScreen} options={{
                headerTitle: 'Produce'
            }}/>
            <Stack.Screen name="Scrap" component={ScrapMetalScreen} options={{
                headerTitle: 'Scrap Metal'
            }}/>
            <Stack.Screen name="Palm Produce" component={PalmProduceScreen} options={{
                headerTitle: 'Palm Produce'
            }}/>
            <Stack.Screen name="Quarry" component={QuarryScreen} options={{
                headerTitle: 'Quarry Sites'
            }}/>
            <Stack.Screen name="Stone" component={StoneSitesScreen} options={{
                headerTitle: 'Stone Sites'
            }}/>
            <Stack.Screen name="Forestry" component={ForestryScreen} options={{
                headerTitle: 'Forestry'
            }}/>
            <Stack.Screen name="Gate" component={GatePassScreen} options={{
                headerTitle: 'Gate Pass'
            }}/>
            <Stack.Screen name="Beach" component={SandBeachesScreen} options={{
                headerTitle: 'Sand Beaches'
            }}/>
            <Stack.Screen name="Inter State" component={InterStateHaulageScreen} options={{
                headerTitle: 'Inter State Haulage'
            }}/>
            <Stack.Screen name="Market" component={MarketDailyScreen} options={{
                headerTitle: 'Market Daily Tolls'
            }}/>
            <Stack.Screen name="Loading" component={LoadingScreen} options={{
                headerTitle: 'Loading & OffLoading'
            }}/>
            <Stack.Screen name="Baggage" component={BaggageBasketScreen} options={{
                headerTitle: 'Baggage & basket Handling Charge'
            }}/>
            <Stack.Screen name="Veterinary" component={VeterinaryScreen} options={{
                headerTitle: 'Veterinary/Abattoir Fees'
            }}/>
        </Stack.Navigator>
    )
}
