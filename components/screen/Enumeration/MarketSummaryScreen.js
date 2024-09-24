import React, {useContext, useEffect, useState} from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    Alert,
    Image
} from "react-native";
import {Card, Modal, PaperProvider, Portal} from "react-native-paper";
import {Button} from "react-native-elements";
import {useForm} from "react-hook-form";
import {AuthStore, MarketEnumStore, TicketStore, WalletStore} from "../../../store";
import cancel from '../../../assets/cancel.png'
import success from '../../../assets/success.png'
import {useIsFocused} from "@react-navigation/native";
import axios from 'axios'
import Moment from "moment";
import {merchant_key, MOBILE_API} from "../../../config";
import {AuthContext} from "../../../context/AuthContext";

export default function MarketSummaryScreen({navigation}) {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState([])
    const [ticketError, setTicketError] = useState('')
    const [walletResponse, setWalletResponse] = useState([])
    const [errorText, setErrorText] = useState('Insufficient Balance. Please recharge your wallet')
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ defaultValues: MarketEnumStore.useState((s) => s) });
    const isFocused = useIsFocused();

    const info = MarketEnumStore.useState()
    const {userToken} = useContext(AuthContext)
    const userInfo = AuthStore.useState()
    const walletInfo = WalletStore.useState()
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 10,
        marginLeft: 16}
    ;
    const getWalletDetails =  () => {
        const url = `${MOBILE_API}dashboard/data`
        fetch(url, {
            headers:{
                'Authorization': 'Bearer' + userToken
            },
            method: 'POST'
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setWalletResponse(responseJson)
                console.log(walletResponse)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    useEffect(() => {
        getWalletDetails()
    }, []);
    const onSubmit = async () => {
        showModal()
        setLoading(true)
        setErrorText("");
        fetch(`${MOBILE_API}market/market-enumeration`, {
            headers:{
                Authorization: "Bearer" + userToken,
                'Content-type': 'application/json',
                'accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                taxpayer_category: info.category,
                abssin: info.abssin,
                shop_owner_name: info.ownerName,
                shop_owner_phone: info.ownerPhone,
                shop_number: info.shopNumber,
                shop_category: info.shopCategory,
                revenue_year: info.year,
                zone_line: info.zone,
                market: info.market,
                monthly_income_range: info.income,
                enumeration_fee: info.enumFee,
                ticket_amount_shop_owner: info.ownerAmount,
                ticket_amount_per_occupant: info.occupantAmount,
                lga: info.location,
                payment_method: info.paymentMethod,
                merchant_key: merchant_key
            })
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setLoading(false)
                setResponse(responseJson)
                console.log(responseJson)
            })
            .catch((e) => {
                console.log(e)
            })
    };

    return (
        <ScrollView style={styles.container}>
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        {
                            loading ? <ActivityIndicator color="#09893E" size="large" /> : (
                                <View style={{marginTop: 10, marginLeft: 16}}>
                                    {
                                        response.status === true ? (
                                            <View>
                                                <Image style={{
                                                    width:100,
                                                    height:100,
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    marginTop: 6,
                                                    marginBottom: 6,
                                                }} source={success} />
                                                <Text style={{
                                                    fontStyle:'normal',
                                                    fontWeight: '700',
                                                    fontSize: 16,
                                                    textAlign: 'center'
                                                }}>Payment Successful</Text>
                                                <Text style={{
                                                    fontStyle:'normal',
                                                    fontWeight: '700',
                                                    fontSize: 14,
                                                }}>Amount: {response.data.amount}</Text>
                                                <Text style={{
                                                    fontStyle:'normal',
                                                    fontWeight: '700',
                                                    fontSize: 14,
                                                }}>Name: {response.data.taxpayer_name}</Text>
                                                <Text style={{
                                                    fontStyle:'normal',
                                                    fontWeight: '700',
                                                    fontSize: 14,
                                                }}>Ref: {response.data.payment_ref}</Text>
                                                <Button
                                                    title="Show Receipt"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.navigate("Done", {params: response})}
                                                    buttonStyle={styles.modalButton} />
                                                <Button
                                                    title="Create New"
                                                    titleStyle={styles.newBtnText}
                                                    onPress={() => navigation.navigate('Order')}
                                                    buttonStyle={styles.modalNewButton} />
                                            </View>
                                        ) : (
                                            <View>
                                                <Image style={{
                                                    width:100,
                                                    height:100,
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    marginTop: 6,
                                                    marginBottom: 6,
                                                }} source={cancel} />
                                                <Text>{response.message}</Text>
                                                <Button
                                                    title="Try Again"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.goBack()}
                                                    buttonStyle={styles.modalButton} />
                                            </View>
                                        )
                                    }

                                </View>
                            )
                        }
                    </Modal>
                </Portal>

                <View style={{marginTop: 16}}>
                    <Card style={styles.card}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 14}}>
                            <Text style={styles.rowLabel}>Category:</Text>
                            <Text style={styles.rowData}>{info.category}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22,}}>
                            <Text style={styles.rowLabel}>ABSSIN:</Text>
                            <Text style={styles.rowData}>{info.abssin}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22,}}>
                            <Text style={styles.rowLabel}>Owner Name:</Text>
                            <Text style={styles.rowData}>{info.ownerName}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                            <Text style={styles.rowLabel}>
                                Owner Phone:
                            </Text>
                            <Text style={styles.rowData}>{info.ownerPhone}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                            <Text style={styles.rowLabel}>Market:</Text>
                            <Text style={styles.rowData}>{info.market}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                            <Text style={styles.rowLabel}>Shop Number:</Text>
                            <Text style={styles.rowData}>{info.shopNumber}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22, marginBottom: 22}}>
                            <Text style={styles.rowLabel}>Payment Method:</Text>
                            <Text style={styles.rowData}>{info.paymentMethod}</Text>
                        </View>
                    </Card>
                    <Card style={styles.card}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                            <Text style={styles.amount}>&#8358; {
                                info.enumFee
                            }</Text>
                            <Text style={styles.labelData}>Payment Amount</Text>
                        </View>
                    </Card>
                    <Card style={styles.card}>
                        <Text style={styles.reminderTitle}>Collection Reminder:</Text>
                        <Text style={styles.reminderText}>
                            Kindly ensure that cash has been collected from TaxPayer before completing this Transaction as
                            your Wallet will be debited for the collection amount.
                        </Text>
                    </Card>
                </View>
                <View>
                    {
                        walletResponse.wallet_balance >= info.enumFee ? (
                            <View>
                                {
                                    response.response_code !== '00' ? (
                                        <Text style={styles.errorTextStyle}>
                                            {response.response_message}
                                        </Text>
                                    ) : null
                                }
                                <Button
                                    title="Confirm Cash Payment"
                                    titleStyle={styles.btnText}
                                    onPress={handleSubmit(onSubmit)}
                                    buttonStyle={styles.nextBtnStyle} />
                            </View>
                        ) : (
                            <View>
                                {errorText !== '' ? (
                                    <Text style={styles.errorTextStyle}>
                                        Insufficient Balance. Please recharge your wallet
                                    </Text>
                                ) : (
                                    <Text style={styles.errorTextStyle}>
                                        {errorText}
                                    </Text>
                                )}
                                <Button
                                    disabled
                                    title="Confirm Cash Payment"
                                    titleStyle={styles.btnText}
                                    onPress={() => onSubmit}
                                    buttonStyle={styles.nextBtnStyle} />
                            </View>
                        )}
                </View>
            </PaperProvider>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFC'
    },
    card: {
        marginTop: 18,
        marginBottom: 10,
        marginLeft: 16,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 8,
        backgroundColor: '#fff'
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
    title: {
        color: '#071827',
        fontFamily: 'DMSans_500Medium',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        marginLeft: 17,
        lineHeight: 22
    },
    modalNewButton: {
        width: 300,
        height: 48,
        padding: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#09893E',
        backgroundColor: '#fff',
        flexShrink: 0
    },
    rowData: {
        color: '#071827',
        textAlign: 'right',
        marginRight: 17,
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    newBtnText: {
        color: '#09893E',
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
        fontWeight: '700'
    },
    amount: {
        color: '#219653',
        textAlign: 'right',
        fontFamily: 'DMSans_700Bold',
        marginLeft: 17,
        padding: 10,
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 16
    },
    labelData: {
        color: '#071827',
        fontFamily: 'DMSans_500Medium',
        fontSize: 14,
        padding: 10,
        marginRight: 17,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 22
    },
    reminderTitle:{
        color: '#071827',
        padding: 12,
        fontFamily: 'DMSans_500Medium',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 22
    },
    reminderText:{
        color: '#FD0D1B',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        padding: 10,
        fontWeight: '400',
        lineHeight: 18
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
    modalButton: {
        width: 300,
        height: 48,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#09893E',
        flexShrink: 0
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
        fontWeight: '700'
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    }
})
