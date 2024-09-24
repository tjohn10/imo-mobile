import React from "react";
import {View, StyleSheet, Text, Dimensions, ScrollView} from "react-native";
import {Card} from "react-native-paper";
import {Button} from "react-native-elements";

export default function WalletDetailScreen({navigation, route}) {
    const walletDetails = route.params.params
    return (
        <ScrollView style={styles.container}>
            <View style={{marginTop: 5}}>
                <Text style={styles.title}>Wallet Audit Detail</Text>
                <Card style={styles.card}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Merchant Key:</Text>
                        <Text style={styles.rowData}>{walletDetails.merchant_key}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Payment Reference:</Text>
                        <Text style={styles.rowData}>{walletDetails.payment_ref}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Email:</Text>
                        <Text style={styles.rowData}>{walletDetails.email}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        <Text style={styles.rowLabel}>Transaction Description:</Text>
                        <Text style={styles.rowData}>{walletDetails.transaction_desc}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Total Credit:</Text>
                        <Text style={styles.rowData}>&#8358;{walletDetails.total_credit}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Total Debit:</Text>
                        <Text style={styles.rowData}>&#8358;{walletDetails.total_debit}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        <Text style={styles.rowLabel}>Available Balance:</Text>
                        <Text style={styles.rowData}>&#8358;{walletDetails.available_balance}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Net Balance:</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Earnings:</Text>
                        <Text style={styles.rowData}>{walletDetails.hold_balance}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Last Transaction:</Text>
                        <Text style={styles.rowData}>{walletDetails.last_transaction_amount}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Created At:</Text>
                        <Text style={styles.rowData}>{walletDetails.created_at}</Text>
                    </View>
                </Card>
                <View>
                    <Button
                        title="Back to All"
                        titleStyle={styles.btnText}
                        onPress={() => navigation.navigate('Wallet Audit')}
                        buttonStyle={styles.nextBtnStyle} />
                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        marginTop: 18,
        marginBottom: 10,
        marginLeft: 16,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    rowData: {
        color: '#071827',
        width: 150,
        textAlign: 'right',
        marginRight: 17,
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    title: {
        color: '#071827',
        fontFamily: 'DMSans_500Medium',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '900',
        marginTop: 15,
        marginLeft: 17,
        lineHeight: 22
    },
    nextBtnStyle: {
        width: Dimensions.get('screen').width - 32,
        height: 48,
        padding: 10,
        marginLeft: 16,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#09893E',
        flexShrink: 0
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
        fontWeight: '700'
    },
    rowLabel: {
        color: '#979797',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        marginLeft: 17,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
})
