import React, {createRef, useContext, useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, TextInput, Dimensions, ScrollView, Alert, ActivityIndicator} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Button} from "react-native-elements";
import {useForm, Controller} from "react-hook-form";
import {AuthStore, TicketStore, WalletStore} from "../../../store";
import {useIsFocused} from "@react-navigation/native";
import {Modal, PaperProvider, Portal} from "react-native-paper";
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";
import {AuthContext} from "../../../context/AuthContext";
import {FUNNY_API, merchant_key, MOBILE_API, OTHER_API} from "../../../config";

export default function CorporateTransportScreen({navigation, route}){
    const [ticketType, setTicketType] = useState()
    const [abssinType, setAbssinType] = useState()
    const [abssin, setAbssin] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [noOfVehicles, setNoOfVehicles] = useState('')
    const [paymentDescription, setPaymentDescription] = useState('')
    const [paymentMethod, setPaymentMethod] = useState()
    const [amount, setAmount] = useState('')
    const [paymentPeriod, setPaymentPeriod] = useState()
    const [collectionType, setCollectionType] = useState([])
    const [walletBalance, setWalletBalance] = useState([])
    const [vehicleType, setVehicleType] = useState([])
    const [response, setResponse] = useState([])
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20, width: Dimensions.get('screen').width - 40, marginLeft:20, marginRight: 20};
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ defaultValues: TicketStore.useState((s) => s) });
    const userInfo = AuthStore.useState()

    const {userToken} = useContext(AuthContext)
    const isFocused = useIsFocused();

    useEffect(() => {
        getCollectionType()
        getVehicleType()
        getWalletDetails()
    }, [isFocused]);

    const getCollectionType = () => {
        fetch(`${FUNNY_API}agent/payment-method`, {
            headers:{
                'content-type': 'application/json',
                'accept': 'application/json'
            },
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setCollectionType(responseJson)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const getVehicleType = () => {
        fetch(`${FUNNY_API}agent/product-code`, {
            headers:{
                'content-type': 'application/json',
            },
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setVehicleType(responseJson)
            })
            .catch((e) => {
                console.log(e)
                Alert.alert('Error Encountered', e.message)
            })
    }

    const getUserDetails = () => {
        setLoading(true)
        fetch(`${OTHER_API}fetchUserData`, {
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "userType": abssinType,
                    "userID": abssin
                }
            ),
            method: 'POST'
        }).then((res)  => res.json())
            .then((resJson) => {
                setLoading(false)
                setName(resJson.TaxpayerName)
                setPhoneNumber(resJson.TaxpayerPhone)
                setEmail(resJson.TaxpayerEmail)
            })
    }
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
                setWalletBalance(responseJson)
                console.log(walletBalance)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const getIncomeAmount = () => {
        setLoading(true)
        fetch(`${OTHER_API}businessRate`, {
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "incomeCategory": ticketType,
                    "totalNumber": noOfVehicles,
                    "paymentPeriod": paymentPeriod
                }
            ),
            method: 'POST'
        }).then((res) => res.json())
            .then((resJson) => {
                setLoading(false)
                setAmount(resJson.incomeAmount)
            })
    }
    const onSubmit = () => {
        setErrorText('')
        setLoading(true)
        showModal()
        fetch(`${MOBILE_API}transport/create-corporate-ticket`, {
            headers:{
                'Content-type': 'application/json',
                'Authorization': 'Bearer' + userToken
            },
            body: JSON.stringify(
                {
                    "abssin_type": abssinType,
                    "abssin": abssin,
                    "taxpayer_name": name,
                    "taxpayer_phone": phoneNumber,
                    "taxpayer_email": email,
                    "vehicle_type": ticketType,
                    "number_of_vehicles": noOfVehicles,
                    "payment_period": paymentPeriod,
                    "ticket_price": amount,
                    "payment_method": paymentMethod,
                    "merchant_key": merchant_key
                }
            ),
            method: 'POST'
        }).then((res)  => res.json())
            .then((resJson) => {
                setLoading(false)
                setResponse(resJson)
                console.log(resJson)
            })

        WalletStore.update((w) => {
            w.walletBalance = walletBalance.wallet_balance
            w.id = walletBalance.wallet_id
            w.name = walletBalance.name
            w.currentEarnings = walletBalance.current_earnings
        })
    };

    return(
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.container}
        >
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        {
                            loading ? <ActivityIndicator color="#09893E" size="large" /> : (
                                <View style={{marginTop: 10, marginLeft: 16}}>
                                    {
                                        response.response_code === '00' ? (
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
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    fontSize: 14,
                                                    fontWeight: '600'
                                                }}>{response.response_message}</Text>
                                                <Text style={{
                                                    marginLeft: 20,
                                                    fontSize: 14,
                                                    fontWeight: '600'
                                                }}>Payment Ref: {response.payment_ref}</Text>
                                                <Button
                                                    title="Show Receipt"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.navigate("Done", {params: response})}
                                                    buttonStyle={styles.modalButton} />
                                                <Button
                                                    title="Create new Ticket"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.navigate("Order")}
                                                    buttonStyle={styles.modalButton} />
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
                                                <Text>{response.response_message}</Text>
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
                {/*<Controller render={({onChange, value})}>*/}
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>ABSSIN Type</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={abssinType}
                        onValueChange={(itemValue, itemIndex) =>
                            setAbssinType(itemValue)
                        }>
                        <Picker.Item label="ABSSIN Type" value="" />
                        <Picker.Item label="Individual" value="Individual" />
                        <Picker.Item label="Business" value="Business" />
                    </Picker>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>ABSSIN</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ABSSIN"
                        placeholderTextColor="#C4C4C4"
                        value={abssin}
                        maxLength={10}
                        returnKeyType="next"
                        onSubmitEditing={() => getUserDetails()}
                        blurOnSubmit={false}
                        onChangeText={text => setAbssin(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Taxpayer Name</Text>
                    <TextInput
                        style={styles.disabledInput}
                        placeholder="Taxpayer Name"
                        placeholderTextColor="#000"
                        value={name}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        editable={false}
                        selectTextOnFocus={false}
                        onChangeText={text => setName(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Taxpayer Phone No</Text>
                    <TextInput
                        style={styles.disabledInput}
                        placeholder="Taxpayer Phone No"
                        placeholderTextColor="#000"
                        value={phoneNumber}
                        keyboardType="phone-pad"
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        editable={false}
                        selectTextOnFocus={false}
                        maxLength={11}
                        onChangeText={text => setPhoneNumber(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Taxpayer Email</Text>
                    <TextInput
                        style={styles.disabledInput}
                        placeholder="Taxpayer Email"
                        placeholderTextColor="#000"
                        value={email}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        editable={false}
                        selectTextOnFocus={false}
                        keyboardType="email-address"
                        autoComplete="email"
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Vehicle Type</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={ticketType}
                        onValueChange={(itemValue, itemIndex) => {
                            setTicketType(itemValue)
                        }}>
                        <Picker.Item label="Vehicle Type" value="" />
                        {
                            vehicleType.map((item, index) =>{
                                return   <Picker.Item key={index} label={item.productName} value={item.productCode} />
                            })
                        }
                    </Picker>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Payment Period</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={paymentPeriod}
                        onValueChange={(itemValue, itemIndex) =>
                            setPaymentPeriod(itemValue)
                        }>
                        <Picker.Item label="1 Month" value="1Month" />
                        <Picker.Item label="2 Months" value="2Month" />
                        <Picker.Item label="3 Months" value="3Month" />
                        <Picker.Item label="4 Months" value="4Month" />
                        <Picker.Item label="5 Months" value="5Month" />
                        <Picker.Item label="6 Months" value="6Month" />
                        <Picker.Item label="7 Months" value="7Month" />
                        <Picker.Item label="8 Months" value="8Month" />
                        <Picker.Item label="9 Months" value="9Month" />
                        <Picker.Item label="10 Months" value="10Month" />
                        <Picker.Item label="11 Months" value="11Month" />
                        <Picker.Item label="12 Months" value="12Month" />
                    </Picker>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>No of Vehicles</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="No of Vehicles"
                        placeholderTextColor="#C4C4C4"
                        returnKeyType="next"
                        keyboardType='numeric'
                        underlineColorAndroid="#f000"
                        onSubmitEditing={() => getIncomeAmount()}
                        blurOnSubmit={false}
                        value={noOfVehicles}
                        onChangeText={text => setNoOfVehicles(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.disabledInput}
                        placeholder="Amount"
                        placeholderTextColor="#C4C4C4"
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        value={amount}
                        onChangeText={text => setAmount(text)}
                        editable={false}
                        selectTextOnFocus={false}

                    />
                </View>


                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Payment Method</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={paymentMethod}
                        onValueChange={(itemValue, itemIndex) =>
                            setPaymentMethod(itemValue)
                        }>
                        {
                            collectionType.map((item, index) =>{
                                return   <Picker.Item key={index} label={item.name} value={item.name} />
                            })
                        }

                    </Picker>
                </View>
                {errorText !== '' ? (
                    <Text style={styles.errorTextStyle}>
                        {errorText}
                    </Text>
                ) : null}
                <View>
                    {
                        walletBalance.wallet_balance >= amount ? (
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
                                    buttonStyle={styles.nextBtnStyle}/>
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
                                    buttonStyle={styles.nextBtnStyle}/>
                            </View>
                        )}
                </View>
                {/*</Controller>*/}
            </PaperProvider>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F9FAFC'
    },
    input: {
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
        backgroundColor: '#fff',
        borderColor: '#09893E',
        marginLeft: 16
    },
    disabledInput: {
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
        backgroundColor: '#fcfcfc',
        color: '#000',
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
        width: 300,
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
        fontFamily: 'DMSans_400Regular',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
})

