import React, {createRef, useContext, useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Dimensions,
    ScrollView,
    Alert,
    ActivityIndicator, Image
} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Button} from "react-native-elements";
import {useForm, Controller} from "react-hook-form";
import {AuthStore, TicketStore, WalletStore} from "../../../store";
import {useIsFocused} from "@react-navigation/native";
import {FUNNY_API, merchant_key, MOBILE_API, OTHER_API} from "../../../config";
import {AuthContext} from "../../../context/AuthContext";
import Moment from "moment/moment";
import {Timeout} from "../../../timeout";
import {Modal, PaperProvider, Portal} from "react-native-paper";
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";
import {registerForPushNotificationsAsync} from "../../../AppNav";

export default function Ticket1Screen({navigation, route}) {
    const [ticketType, setTicketType] = useState()
    const [plateNo, setPlateNo] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [paymentDescription, setPaymentDescription] = useState('')
    const [paymentMethod, setPaymentMethod] = useState()
    const [walletType, setWalletType] = useState()
    const [amount, setAmount] = useState('')
    const [paymentPeriod, setPaymentPeriod] = useState()
    const [invoiceId, setInvoiceId] = useState('')
    const [collectionType, setCollectionType] = useState([])
    const [walletBalance, setWalletBalance] = useState([])
    const [vehicleType, setVehicleType] = useState([])
    const [errorText, setErrorText] = useState('')
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(false)
    const [expoPushToken, setExpoPushToken] = useState('');
    let nextPayment = useState()
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = {
            backgroundColor: 'white', padding: 20,
            width: Dimensions.get('screen').width - 32,
            borderRadius: 10,
            marginLeft: 16
        }
    ;

    const sendNotification = async () => {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Transport Ticket' + ' - ' + plateNo,
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
    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm({defaultValues: TicketStore.useState((s) => s)});
    const userInfo = AuthStore.useState()
    const ticket = TicketStore.useState()

    const {userToken} = useContext(AuthContext)
    const isFocused = useIsFocused();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
            console.log('ticket token', token)
        }).catch((e) => console.log(e))
        isFocused &&
        TicketStore.update((s) => {
            s.progress = 0;
            s.paymentPeriod = '1Day'
        });
        navigation.addListener('focus', () => {
            setTicketType()
            setPlateNo('')
            setName('')
            setPhoneNumber('')
            setPaymentDescription('')
            setAmount('')
            setEmail('')
        });
        getCollectionType()
        getVehicleType()
        generateRandomString()
    }, [isFocused]);

    const generateRandomString = () => {
        const random = Math.floor(Math.random() * 8999999 + 1000000);
        const randomString = 'IN' + random
        return setInvoiceId(randomString);
    }

    const getPlateNumberInfo = () => {
        fetch(`${MOBILE_API}transport/get-plate-number-info`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                Authorization: "Bearer" + userToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "plate_number": plateNo
            })
        }).then((res) => res.json())
            .then((resJson) => {
                console.log(resJson)
                setName(resJson.data.Name)
                setPhoneNumber(resJson.data.Phone)
                setEmail(resJson.data.Email)
            })
    }
    const getCollectionType = () => {
        fetch(`${FUNNY_API}agent/payment-method`, {
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((responseJson) => {
                setCollectionType(responseJson)
                console.log(responseJson, 'collection')
            })
            .catch((e) => {
                console.log(e, 'collect')
            })
    }
    const getVehicleType = () => {
        fetch(`${FUNNY_API}agent/product-code`, {
            headers: {
                'content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((responseJson) => {
                setVehicleType(responseJson)
                console.log(vehicleType, 'vehicle type')
            })
            .catch((e) => {
                console.log(e, 'v error')
                Alert.alert('Error Encountered', e.message)
            })
    }
    const populateTicketAmount = (value) => {
        setAmount(ticketType.dailyAmount)
        if (value === "1Month") {
            ticket.amount = ticketType.monthlyAmount
            setAmount(ticketType.monthlyAmount)
        } else if (value === "1Week") {
            ticket.amount = ticketType.weeklyAmount
            setAmount(ticketType.weeklyAmount)
        } else {
            ticket.amount = ticketType.dailyAmount
            setAmount(ticketType.dailyAmount)
        }
    }

    const clearAndRefresh = () => {
        hideModal()
        navigation.addListener('focus', () => {
            console.log("reloaded");
            setTicketType()
            setPlateNo('')
            setName('')
            setPhoneNumber('')
            setPaymentDescription('')
            setAmount('')
            setEmail('')
            setPlateNo('')
        });
        setTicketType()
        setPlateNo('')
        setName('')
        setPhoneNumber('')
        setPaymentDescription('')
        setAmount('')
        setEmail('')
        setPlateNo('')
    }
    const onSubmit = async () => {
        const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
        if (ticketType === null || plateNo === '' || name === '' || phoneNumber === "" || email === '') {
            setErrorText('Please Enter all fields')
            Alert.alert('Error', 'Please enter all fields')
        } else if (plateNo === alphanumericRegex.test(plateNo)) {
            setErrorText('Please Enter only alphanumeric characters')
            Alert.alert('Error', 'Please Enter only alphanumeric characters')
        } else {
            TicketStore.update((s) => {
                s.progress = 33;
                s.ticketType = ticketType.productCode;
                s.plateNo = plateNo.toUpperCase();
                s.vehicleInfo = ticketType
                s.name = name;
                s.email = email
                s.phoneNumber = phoneNumber;
                s.paymentDescription = paymentDescription;
                s.paymentPeriod = paymentPeriod || '1Day';
                s.paymentMethod = paymentMethod;
                s.invoiceId = invoiceId

                if (s.paymentPeriod === "1Month") {
                    s.amount = ticketType.monthlyAmount
                    setAmount(ticketType.monthlyAmount)
                } else if (s.paymentPeriod === "1Week") {
                    s.amount = ticketType.weeklyAmount
                    setAmount(ticketType.weeklyAmount)
                } else {
                    s.amount = ticketType.dailyAmount
                    setAmount(ticketType.dailyAmount)
                }
            });
            if (ticket.paymentPeriod === '1Day') {
                const current = new Date()
                nextPayment = new Date(new Date(current).setDate(current.getDate() + 1)).toDateString();
            } else if (info.paymentPeriod === '1Week') {
                const current = new Date()
                nextPayment = new Date(new Date(current).setDate(current.getDate() + 7)).toDateString();
            } else {
                const current = new Date()
                nextPayment = new Date(new Date(current).setDate(current.getDate() + 30)).toDateString();
            }
            TicketStore.update((s) => {
                s.nextPayment = nextPayment
            })
            setLoading(true)
            showModal()
            const url = `${MOBILE_API}transport/create-ticket`
            await fetch(url, {
                headers: {
                    Authorization: "Bearer" + userToken,
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify({
                    merchant_key: merchant_key,
                    lga: 1,
                    transaction_date: Moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                    invoice_id: invoiceId,
                    agentEmail: userInfo.email,
                    plateNumber: plateNo,
                    paymentPeriod: paymentPeriod,
                    productCode: ticketType.productCode,
                    taxPayerPhone: phoneNumber,
                    taxPayerName: name,
                    next_expiration_date: nextPayment,
                    no_of_days: ticket.paymentPeriod,
                    amount: amount,
                    // wallet_type: walletType
                }),
                signal: Timeout(25).signal
            },).then((res) => res.json())
                .then((resJson) => {
                    sendNotification()
                    setLoading(false)
                    setResponse(resJson)
                })
                .catch((e) => {
                    console.log(e)
                    Alert.alert('Error Processing Payment', e.message)
                })
            WalletStore.update((w) => {
                w.walletBalance = walletBalance.wallet_balance
                w.id = walletBalance.wallet_id
                w.name = walletBalance.name
                w.currentEarnings = walletBalance.current_earnings
            })
        }
    };

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.container}
        >
            {/*<Controller render={({onChange, value})}>*/}
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        {
                            loading ? <ActivityIndicator color="#09893E" size="large"/> : (
                                <View style={{marginTop: 10, marginLeft: 16}}>
                                    {
                                        response.response_code === '00' || response.response_code === '01' ? (
                                            <View>
                                                <Image style={{
                                                    width: 100,
                                                    height: 100,
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    marginTop: 6,
                                                    marginBottom: 6,
                                                }} source={success}/>
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>{'Payment Successful' || response.message}</Text>
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>REF: {response.payment_ref}</Text>
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>Valid For: {ticket.paymentPeriod}</Text>
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>Payment For: {ticket.ticketType}</Text>
                                                <Button
                                                    title="Show Receipt"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.navigate("Done", {params: response, nextPayment})}
                                                    buttonStyle={styles.modalButton}/>
                                                <Button
                                                    title="Create New"
                                                    type="outline"
                                                    titleStyle={styles.newBtnText}
                                                    onPress={() => clearAndRefresh()}
                                                    buttonStyle={styles.modalNewButton}/>
                                            </View>
                                        ) : (
                                            <View>
                                                <Image style={{
                                                    width: 100,
                                                    height: 100,
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    marginTop: 6,
                                                    marginBottom: 6,
                                                }} source={cancel}/>
                                                <Text>{response.response_message || response.message}</Text>
                                                <Button
                                                    title="Try Again"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => hideModal()}
                                                    buttonStyle={styles.modalButton}/>
                                            </View>

                                        )
                                    }

                                </View>
                            )
                        }
                    </Modal>
                </Portal>
                <View style={{marginTop: 5}}>
                    {/*<Text style={styles.label}>Ticket Type</Text>*/}
                    <Picker
                        style={styles.dropdown}
                        selectedValue={ticketType}
                        onValueChange={(itemValue, itemIndex) => {
                            setTicketType(itemValue)
                        }}>
                        <Picker.Item label="Ticket Type" value=""/>
                        {
                            vehicleType.map((item, index) => {
                                return <Picker.Item key={index} label={item.productName} value={item}/>
                            })
                        }
                    </Picker>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Vehicle Plate Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Vehicle Plate Number"
                        placeholderTextColor="#C4C4C4"
                        value={plateNo}
                        maxLength={8}
                        autoCapitalize={"characters"}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onSubmitEditing={() => {
                            getPlateNumberInfo()
                        }}
                        onEndEditing={() => {
                            getPlateNumberInfo()
                        }}
                        onChangeText={text => setPlateNo(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Taxpayer Phone No</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Taxpayer Phone No"
                        placeholderTextColor="#C4C4C4"
                        value={phoneNumber}
                        keyboardType="phone-pad"
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        maxLength={11}
                        onChangeText={text => setPhoneNumber(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Taxpayer Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Taxpayer Name"
                        placeholderTextColor="#C4C4C4"
                        value={name}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onChangeText={text => setName(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Payment Period</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={paymentPeriod}
                        onValueChange={(itemValue, itemIndex) => {
                            setPaymentPeriod(itemValue)
                            populateTicketAmount(itemValue)
                        }}>
                        <Picker.Item label="Payment Period" value=""/>
                        <Picker.Item label="1 Day" value="1Day"/>
                        <Picker.Item label="1 Week" value="1Week"/>
                        <Picker.Item label="1 Month" value="1Month"/>
                    </Picker>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        placeholderTextColor="#C4C4C4"
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        value={amount.toString()}
                        onChangeText={text => setAmount(text)}
                        editable={false}
                        selectTextOnFocus={false}

                    />
                </View>
                {/*<View style={{marginTop: 5}}>*/}
                {/*    <Text style={styles.label}>Payment Method</Text>*/}
                {/*    <Picker*/}
                {/*        style={styles.dropdown}*/}
                {/*        selectedValue={paymentMethod}*/}
                {/*        onValueChange={(itemValue, itemIndex) =>*/}
                {/*            setPaymentMethod(itemValue)*/}
                {/*        }>*/}
                {/*        {*/}
                {/*            collectionType.map((item, index) => {*/}
                {/*                return <Picker.Item key={index} label={item.name} value={item.name}/>*/}
                {/*            })*/}
                {/*        }*/}

                {/*    </Picker>*/}
                {/*</View>*/}
                {/*<View style={{marginTop: 5}}>*/}
                {/*    <Text style={styles.label}>Choose Wallet</Text>*/}
                {/*    <Picker*/}
                {/*        style={styles.dropdown}*/}
                {/*        selectedValue={walletType}*/}
                {/*        onValueChange={(itemValue, itemIndex) => {*/}
                {/*            setWalletType(itemValue)*/}
                {/*        }}>*/}
                {/*        <Picker.Item label="Access" value="access"/>*/}
                {/*        <Picker.Item label="Fidelity" value="fidelity"/>*/}
                {/*    </Picker>*/}
                {/*</View>*/}
                {errorText !== '' ? (
                    <Text style={styles.errorTextStyle}>
                        {errorText}
                    </Text>
                ) : null}
                <View style={{marginTop: 20}}>
                    <Button
                        title="Process Ticket"
                        titleStyle={styles.btnText}
                        onPress={handleSubmit(onSubmit)}
                        buttonStyle={styles.nextBtnStyle}/>
                </View>
            </PaperProvider>

            {/*</Controller>*/}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFC'
    },
    input: {
        width: Dimensions.get('screen').width - 32,
        color: '#000',
        height: 48,
        marginTop: 11,
        marginRight: 16,
        borderRadius: 8,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 24,
        paddingBottom: 12,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#09893E',
        marginLeft: 16
    },
    dropdown: {
        width: Dimensions.get('screen').width - 32,
        height: 48,
        marginTop: 11,
        marginRight: 16,
        borderRadius: 8,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 24,
        paddingBottom: 12,
        borderWidth: 1,
        backgroundColor: '#EAFFF3',
        borderColor: '#09893E',
        marginLeft: 16
    },
    label: {
        height: 22,
        color: '#071931',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        marginLeft: 16,
        marginTop: 10,
        fontStyle: 'normal',
        fontWeight: '600',
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
    modalButton: {
        width: 260,
        marginRight:'auto',
        marginLeft:'auto',
        height: 48,
        padding: 10,
        marginTop: 20,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#09893E',
        flexShrink: 0
    },
    modalNewButton: {
        width: 260,
        marginRight:'auto',
        marginLeft:'auto',
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
    newBtnText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
        fontWeight: '700'
    },
    btnText: {
        color: '#fff',
        fontFamily: 'DMSans_400Regular',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
})

