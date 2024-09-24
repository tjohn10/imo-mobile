import React from "react";
import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";
import {Card, Divider} from "react-native-paper";
import Moment from "moment";
import {Button} from "react-native-elements";

export default function TransferHistoryDetailScreen({navigation, route}){
    const transferDetails = route.params.params.item
    return(
        <ScrollView style={styles.container}>
            <View style={{marginTop: 5}}>
                <Text style={styles.title}>More Transaction Details</Text>
                <Card style={styles.card}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Status:</Text>
                        <Text style={styles.status}>{transferDetails.paymentStatus}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Transaction Date:</Text>
                        <Text style={styles.rowData}>{Moment(transferDetails.createTime).format('d MMM yyyy')}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Transaction Reference:</Text>
                        <Text style={styles.rowData}>{transferDetails.sessionId}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Payer Account Number:</Text>
                        <Text style={styles.rowData}>{transferDetails.payer_accountNumber}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Payer Account Name:</Text>
                        <Text style={styles.rowData}>{transferDetails.payer_accountName}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Payer Bank:</Text>
                        <Text style={styles.rowData}>{transferDetails.payer_bankCode}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        <Text style={styles.rowLabel}>Amount:</Text>
                        <Text style={styles.rowData}>{transferDetails.payer_amountPaid}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Merchant Account Number:</Text>
                        <Text style={styles.rowData}>{transferDetails.merchant_accountNumber}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Merchant Bank:</Text>
                        <Text style={styles.rowData}>{transferDetails.merchant_bankName}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        <Text style={styles.rowLabel}>Customer Email:</Text>
                        <Text style={styles.rowData}>{transferDetails.customer_email}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Customer Name:</Text>
                        <Text style={styles.rowData}>{transferDetails.customer_name}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Transaction type:</Text>
                        <Text style={styles.rowData}>{transferDetails.type}</Text>
                    </View>
                </Card>
                <View>
                    <Button
                        title="Back to All"
                        titleStyle={styles.btnText}
                        onPress={() => navigation.navigate('Transfer')}
                        buttonStyle={styles.nextBtnStyle} />

                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
    status: {
        color: '#09893E',
        width: 150,
        textAlign: 'right',
        marginRight: 17,
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '900',
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
