import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ViewEnumScreen from "./screen/Enumeration/ViewEnumScreen";
import ViewTransactionsScreen from "./screen/Transport-Ticket/ViewTransactionsScreen";
import ViewTaxpayersScreen from "./screen/Abssin/ViewTaxpayersScreen";
import AccountScreen from "./screen/Account/AccountScreen";
import AddAgentScreen from "./screen/Account/AddAgentScreen";
import backLogo from '../assets/back.png'
import ValidateScreen from "./screen/Account/ValidateScreen";
import MyStatementScreen from "./screen/Account/MyStatementScreen";
import PendingAbssinScreen from "./screen/Abssin/PendingAbssinScreen";
import TransferHistoryScreen from "./screen/Transport-Ticket/TransferHistoryScreen";
import WalletAuditScreen from "./screen/Account/WalletAuditScreen";
import WalletDetailScreen from "./screen/Account/WalletDetailScreen";
import TransactionDetailScreen from "./screen/Transport-Ticket/TransactionDetailScreen";
import PendingTransactionsScreen from "./screen/Account/PendingTransactionsScreen";
import ProcessDebitLaterScreen from "./screen/Account/ProcessDebitLaterScreen";

const Stack = createNativeStackNavigator()
export default function AccountStack(){
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
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="Statement" component={MyStatementScreen}/>
            <Stack.Screen name="View Enumeration" component={ViewEnumScreen}/>
            <Stack.Screen name="Transactions" component={ViewTransactionsScreen}/>
            <Stack.Screen name="Debit" component={PendingTransactionsScreen} options={{
                headerTitle: 'Debit Later Transactions'
            }}/>
            <Stack.Screen name="Details" component={ProcessDebitLaterScreen} options={{
                headerTitle: 'Transaction Details'
            }}/>
            <Stack.Screen name="Transaction Detail" component={TransactionDetailScreen}/>
            <Stack.Screen name="Transfer History" component={TransferHistoryScreen}/>
            <Stack.Screen name="Pending Abssin" component={PendingAbssinScreen}/>
            <Stack.Screen name="Wallet Audit" component={WalletAuditScreen}/>
            <Stack.Screen name="Wallet Detail" component={WalletDetailScreen}/>
            <Stack.Screen name="View Taxpayers" component={ViewTaxpayersScreen}/>
        </Stack.Navigator>
    )
}
