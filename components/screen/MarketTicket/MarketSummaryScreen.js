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
import {AuthStore, MarketStore, TicketStore, WalletStore} from "../../../store";
import cancel from '../../../assets/cancel.png'
import success from '../../../assets/success.png'
import {useIsFocused} from "@react-navigation/native";
import {merchant_key, MOBILE_API} from "../../../config";
import Moment from "moment/moment";
import {AuthContext} from "../../../context/AuthContext";
import {registerForPushNotificationsAsync} from "../../../AppNav";

export default function MarketSummaryScreen({navigation}) {
    const [paymentResponse, setPaymentResponse] = useState([])
    const [loading, setLoading] = useState(false)
    const [ticketError, setTicketError] = useState('')
    const [response, setResponse] = useState([])
    const [expoPushToken, setExpoPushToken] = useState('');
    let nextPayment = useState()
    const [walletResponse, setWalletResponse] = useState([])
    const [errorText, setErrorText] = useState('Insufficient Balance. Please recharge your wallet')
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ defaultValues: MarketStore.useState((s) => s) });
    const isFocused = useIsFocused();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
        }).catch((e) => console.log(e))
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
    }, []);
    const info = MarketStore.useState()
    const userInfo = AuthStore.useState()
    const {userToken} = useContext(AuthContext)
    const walletInfo = WalletStore.useState()
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const sendNotification = async () => {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Market Ticket' + ' - ' + info.marketName,
            body: 'Payment Successful'
        }
        console.log(message, 'message')
        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                host: "exp.host",
                accept: "application/json",
                "accept-encoding": "gzip, deflate",
                "content-type": "application/json"
            },
            body: JSON.stringify(message)
        })
    }

    const containerStyle = {backgroundColor: 'white', padding: 20,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 10,
        marginLeft: 16}
    ;
    const onSubmit = async () => {
        showModal()
        setLoading(true)
        const url = `${MOBILE_API}market/market-ticket`
        await fetch(url,{
            headers: {
                Authorization: "Bearer" + userToken,
                'Content-type': 'application/json',
                'accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                taxpayer_name: info.name,
                taxpayer_email: info.email,
                taxpayer_phone: info.phone,
                revenue_item: info.revenueItem,
                agency: "Abia",
                agent_user: userInfo.email,
                trans_date: Moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                amount: info.amount,
                trans_channel: "mobile",
                status: "Paid",
                trans_type: info.marketName,
                zone_line: info.zone,
                payment_method: info.paymentMethod,
                shop_number: info.shopNumber,
                payment_period: info.paymentPeriod,
                merchant_key: merchant_key
            })
        }) .then((res) => res.json())
            .then((resJson) => {
                setLoading(false)
                setResponse(resJson)
                sendNotification()
                console.log(response)
            })
            .catch((e) => {
                console.log(e)
                Alert.alert('Error Processing Payment', e.message)
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
                                        response.status === true  ? (
                                            <View>
                                                <Image style={{
                                                    width:100,
                                                    height:100,
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    marginTop: 6,
                                                    marginBottom: 6,
                                                }} source={success} />
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>Payment Successful</Text>
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>Item: {response.data.revenue_item}</Text>
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>Amount: {response.data.amount}</Text>
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>Name: {response.data.taxpayer_name}</Text>
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>Phone Number: {response.data.taxpayer_phone}</Text>
                                                <Button
                                                    title="Show Receipt"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.navigate("Done", {params: response})}
                                                    buttonStyle={styles.modalButton} />
                                                <Button
                                                    title="Create New"
                                                    type="outline"
                                                    titleStyle={styles.newBtnText}
                                                    onPress={() => navigation.navigate("Order")}
                                                    buttonStyle={styles.modalNewButton}/>
                                            </View>
                                        )  : (
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
                            <Text style={styles.rowLabel}>Market Name:</Text>
                            <Text style={styles.rowData}>{info.marketName}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22,}}>
                            <Text style={styles.rowLabel}>Zone:</Text>
                            <Text style={styles.rowData}>{info.zone}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22,}}>
                            <Text style={styles.rowLabel}>Payment Method:</Text>
                            <Text style={styles.rowData}>{info.paymentMethod}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                            <Text style={styles.rowLabel}>
                                Payment Period:
                            </Text>
                            <Text style={styles.rowData}>{info.paymentPeriod}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                            <Text style={styles.rowLabel}>Tax Payer Name:</Text>
                            <Text style={styles.rowData}>{info.name}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22, marginBottom: 22}}>
                            <Text style={styles.rowLabel}>Tax Payers Phone No:</Text>
                            <Text style={styles.rowData}>{info.phone}</Text>
                        </View>
                    </Card>
                    <Card style={styles.card}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                            <Text style={styles.amount}>&#8358; {
                                info.amount
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
                        walletResponse.wallet_balance >= info.amount ? (
                            <View>
                                {
                                    paymentResponse.response_code !== '00' ? (
                                        <Text style={styles.errorTextStyle}>
                                            {paymentResponse.response_message}
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
                                    onPress={handleSubmit(onSubmit)}
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
    modalNewButton: {
        width: 260,
        height: 48,
        padding: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
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
        width: 260,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 48,
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
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
