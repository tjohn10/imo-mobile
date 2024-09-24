import React, {useEffect, useState} from 'react'
import {View, StyleSheet, SafeAreaView, Text, Dimensions, Alert, Image, ActivityIndicator} from "react-native";
import {Button} from "react-native-elements";
import {useForm} from "react-hook-form";
import {AuthStore, TicketStore} from "../../../store";
import {useIsFocused} from "@react-navigation/native";
import {Card} from "react-native-paper";
import ticket from "../../../assets/icons/ticket1.png";
import abs from "../../../assets/icons/abssin.png";
import enumeration from "../../../assets/icons/enum.png";

export default function TicketPaymentScreen({navigation, route}){
    const [loading, setLoading] = useState(false)
    const [walletBalance, setWalletBalance] = useState([])
    const [walletResponse, setWalletResponse] = useState([])
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ defaultValues: TicketStore.useState((s) => s) });
    const isFocused = useIsFocused();

    const agentInfo = AuthStore.useState()
    const info = TicketStore.useState()
    const paymentDetails = route.params.params


    const getWalletDetails =  async () => {
        setLoading(true)
        const url = 'https://mobileapi.sandbox.abiapay.com/api/v1/dashboard/data'
        await fetch(url, {
            headers:{
                'Authorization': 'Bearer' + agentInfo.token
            },
            method: 'POST'
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setLoading(false)
                setWalletBalance(responseJson)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    useEffect(() => {
        getWalletDetails()
    }, []);
    // const onSubmit = () => {
    //     fetch('https://sandboxapi.abssin.com/api/v1/wallet/sandbox-debit-account', {
    //         body: JSON.stringify({
    //             "agent_email": agentInfo.email,
    //             "narration": info.paymentDescription,
    //             "merchant_key": "LFQ6ID8KX3",
    //             "payment_ref": paymentDetails.payment_reference
    //         }),
    //         method: 'POST'
    //     })
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             setLoading(false);
    //             setWalletResponse(responseJson)
    //             console.log(walletResponse)
    //         })
    //         .catch((e) => {
    //            Alert.alert('Error Occurred', e.message)
    //         })
    //     navigation.navigate("Done", {params: paymentDetails});
    // };
    return(
        <SafeAreaView style={styles.container}>
            {
                loading ? <ActivityIndicator color="#09893E" size="large" /> : (
                    <View>
                        <View style={{marginTop: 10}}>
                            <Card style={styles.topCard}>
                                <Card.Content>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                        <View>
                                            <Text style={styles.wallet}>Wallet Balance</Text>
                                            <Text style={styles.amount}>&#8358; {walletBalance.wallet_balance || 0}</Text>
                                            <Text style={styles.id}>Wallet ID: {walletBalance.wallet_id}</Text>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>
                        <View style={{marginTop: 5}}>
                            <Text style={styles.title}>Payment</Text>
                            <Card style={styles.card}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                                    <Text style={styles.rowLabel}>Payment Reference:</Text>
                                    <Text style={styles.rowData}>{paymentDetails.payment_reference}</Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                                    <Text style={styles.rowLabel}>Reference Message:</Text>
                                    <Text style={styles.rowData}>{paymentDetails.response_message}</Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                                    <Text style={styles.rowLabel}>Next Payment Date:</Text>
                                    <Text style={styles.rowData}>{paymentDetails.next_payment}</Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginBottom: 20}}>
                                    <Text style={styles.rowLabel}>Payment Duration:</Text>
                                    <Text style={styles.rowData}>{paymentDetails.no_of_days} days</Text>
                                </View>
                            </Card>
                            <Text></Text>
                        </View>
                        <View>
                            <Button
                                title="Pay & Continue"
                                titleStyle={styles.btnText}
                                onPress={handleSubmit(onSubmit)}
                                buttonStyle={styles.nextBtnStyle} />
                        </View>
                    </View>

                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    topCard:{
        // width: Dimensions.get("screen").width - 40,
        width: 350,
        borderRadius: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#fff',
        backgroundColor: '#09893E',
        shadowColor: 'rgba(0, 0, 0, 0.07)'
    },
    card: {
        marginTop: 18,
        marginBottom: 10,
        marginLeft: 16,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 8,
        backgroundColor: '#fff'
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
    wallet:{
        color: '#fff',
        alignSelf: 'stretch',
        fontFamily: 'Mulish_400Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16
    },
    amount:{
        color: '#fff',
        fontFamily: 'Mulish_800ExtraBold',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 32
    },
    id:{
        color: '#fff',
        fontFamily: 'DMSans_400Regular',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: 0.1
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
    }
})
