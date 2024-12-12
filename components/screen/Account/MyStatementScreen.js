import React, {useContext, useEffect, useState} from "react";
import {View, Text, StyleSheet, ScrollView, Dimensions, Alert, ActivityIndicator} from "react-native";
import {Card} from "react-native-paper";
import {AuthStore} from "../../../store";
import {CENTRAL_API, MOBILE_API} from "../../../config";
import {AuthContext} from "../../../context/AuthContext";
import {Button} from "react-native-elements";

export default function MyStatementScreen({navigation}){
    const [loading, setLoading] = useState(false)
    const [statement, setStatement] = useState([])
    const [fidelity, setFidelity] = useState([])

    const info = AuthStore.useState()
    const {userToken} = useContext(AuthContext)

    const getFidelityEarnings = () => {
        setLoading(true)
        fetch(`${CENTRAL_API}paygate/get-balance`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                "email": info.email
            })
        }).then((res) => res.json())
            .then((responseJson) => {
                setLoading(false)
                setFidelity(responseJson)
            })
    }

    const getStatement = () => {
        setLoading(true)
        fetch(`${MOBILE_API}wallet/my-statement`, {
            headers:{
                'Authorization': 'Bearer' + userToken
            },
            method: 'POST'
        }).then((res) => res.json())
            .then((resJson) => {
                setLoading(false)
                setStatement(resJson.data)
                console.log(resJson, "statement")
            })
            .catch((e) => {
                setLoading(false)
                Alert.alert('Error Occurred', e.message)
            })
    }

    useEffect(() => {
        getStatement()
        getFidelityEarnings()
    }, []);
    return(
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.title}>Account Statement</Text>
                <Text style={styles.subtitle}>Account Statement Details</Text>
            </View>
            {
                loading ? <ActivityIndicator colorTransport="#09893E" size="large" /> : (
                    <View style={{marginTop: 10}}>
                        <Card style={styles.card}>
                            <Text style={styles.name}>{statement.fullname}'s Statement</Text>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>Full Name:</Text>
                                <Text style={styles.rowData}>{statement.fullname}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>User Category:</Text>
                                <Text style={styles.rowData}>{statement.user_cat}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>Agent Code:</Text>
                                <Text style={styles.rowData}>{statement.agent_code}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>Phone Number:</Text>
                                <Text style={styles.rowData}>{statement.phone_number}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>Email:</Text>
                                <Text style={styles.rowData}>{statement.email}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>LGA:</Text>
                                <Text style={styles.rowData}>{statement.lga}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>Account Status:</Text>
                                <Text style={styles.rowData}>{statement.account_status}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>Pending Transactions:</Text>
                                <Text style={{color: '#071827',fontSize: 10}}><Text style={{ fontSize: 14, color: '#09893E', fontWeight: '700'}}>₦{statement.pending_transactions}</Text> ({statement.pending_transactions_count} Transactions)</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>Total Transactions:</Text>
                                <Text style={{color: '#071827',fontSize: 10}}><Text style={{ fontSize: 14, color: '#09893E', fontWeight: '700'}}>₦{statement.total_transactions}</Text> ({statement.total_transactions_count} Transactions)</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>Total Transactions Today:</Text>
                                <Text style={{color: '#071827',fontSize: 10}}><Text style={{ fontSize: 14, color: '#09893E', fontWeight: '700'}}>₦{statement.total_transactions_today}</Text> ({statement.total_transactions_today_count} Transactions)</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>Wallet Balance:</Text>
                                <Text style={styles.other}>₦{statement.wallet_balance}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>Total Wallet Credit:</Text>
                                <Text style={styles.other}>₦{statement.total_wallet_credit}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>Earnings</Text>
                                <Text style={styles.other}>₦{statement.earning}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>Fidelity Earnings</Text>
                                <Text style={styles.other}>₦{fidelity.earnings}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>Total Earnings:</Text>
                                <Text style={styles.other}>₦{parseInt(statement.earning) + parseInt(fidelity.earnings)}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.rowLabel}>Creation Date:</Text>
                                <Text style={styles.rowData}>{statement.creation_date}</Text>
                            </View>
                        </Card>
                        <Card style={styles.card}>
                            <Text style={styles.otherTitle}>Payout Reminder:</Text>
                            <Text style={styles.otherText}>Payout request will be activated  when your Current Earnings are ₦100 and above.</Text>
                            <View style={{marginTop: 20}}>
                                <Button
                                    title="Fidelity Cash Out"
                                    titleStyle={styles.btnText}
                                    onPress={() => navigation.navigate('Cash Out',{params: parseInt(fidelity.earnings)})}
                                    buttonStyle={styles.nextBtnStyle}/>
                            </View>
                            <View>
                                <Button
                                    title="Access Cash Out"
                                    titleStyle={styles.btnText}
                                    onPress={() => navigation.navigate('Cashout',{params: parseInt(statement.earning)})}
                                    buttonStyle={styles.nextBtnStyle}/>
                            </View>
                        </Card>
                    </View>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFC'
    },
    title: {
        color: '#071931',
        fontSize: 24,
        marginTop: 25,
        marginLeft: 16,
        fontFamily: 'DMSans_700Bold',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 32
    },
    subtitle:{
        color: '#5B5B5B',
        marginLeft: 16,
        marginTop: 12,
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    btnText: {
        color: '#fff',
        fontFamily: 'DMSans_400Regular',
    },
    card: {
        width: Dimensions.get('screen').width - 32,
        marginTop: 10,
        borderRadius: 10,
        marginLeft: 16,
        marginBottom: 20,
        backgroundColor: '#ffffff',
        elevation: 5,
        // shadowColor: 'rgba(15, 13, 35, 0.04)'
    },
    name: {
        marginTop: 10,
        marginLeft: 17,
        color: '#071827',
        fontFamily: 'DMSans_500Medium',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22
    },
    rowLabel: {
        color: '#979797',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        marginLeft: 5,
        marginBottom: 22,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    rowData: {
        color: '#071827',
        textAlign: 'right',
        marginRight: 10,
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        marginBottom: 22,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    other: {
        color: '#09893E',
        textAlign: 'right',
        marginRight: 10,
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        marginBottom: 22,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    textView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 17,
        marginTop: 12,
        marginRight: 17
    },
    otherTitle:{
        color: '#071827',
        fontFamily: 'DMSans_500Medium',
        marginTop: 10,
        marginLeft: 17,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 22
    },
    otherText:{
        color: '#FD0D1B',
        fontFamily: 'DMSans_500Medium',
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 17,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 18
    },
    nextBtnStyle: {
        width: 300,
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
})
