import React, {useContext, useEffect, useState} from "react";
import {ActivityIndicator, Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {CENTRAL_API, FUNNY_API, merchant_key, MOBILE_API, OTHER_API} from "../../../config";
import {AuthContext} from "../../../context/AuthContext";
import {useIsFocused} from "@react-navigation/native";
import {Button} from "react-native-elements";
import {Modal, PaperProvider, Portal} from "react-native-paper";
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";
import {ConcessionStore} from "../../../store";
import {registerForPushNotificationsAsync} from "../../../AppNav";

export default function BaggageBasketScreen({navigation}){
    const [collection, setCollection] = useState()
    const [plateNumber, setPlateNumber] = useState('')
    const [penalty, setPenalty] = useState()
    const [total, setTotal] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [collectionPoint, setCollectionPoint] = useState('')
    const [amount, setAmount] = useState('')
    const [errorText, setErrorText] = useState('')
    const [loading, setLoading] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('Pay Cash')
    const [walletType, setWalletType] = useState()
    const [payments, setPayments] = useState([])
    const [paymentResponse, setPaymentResponse] = useState([])
    const [baggageList, setBaggageList] = useState([])

    const [visible, setVisible] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');

    const sendNotification = async () => {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Baggage Basket' + ' - ' + plateNumber,
            body: paymentResponse.response_message
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

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = {
            backgroundColor: 'white', padding: 20,
            width: Dimensions.get('screen').width - 32,
            borderRadius: 10,
            marginLeft: 16
        }
    ;
    const {userToken} = useContext(AuthContext)
    const isFocused = useIsFocused();
    useEffect(() => {
        getCollectionType()
        getBaggage()
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
        }).catch((e) => console.log(e))
    }, []);

    const getCollectionType = () => {
        fetch(`${FUNNY_API}agent/payment-method`, {
            headers:{
                'content-type': 'application/json',
                'accept': 'application/json'
            },
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setPayments(responseJson)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const getBaggage = () => {
        fetch(`${CENTRAL_API}agent/concessionaires-product-codes?category=Baggage_Basket`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json())
            .then((resJson) => {
                setBaggageList(resJson)
            })
    }
    const populateAmount = () => {
        fetch(`${OTHER_API}calculateTicket`, {
            method: 'POST',
            headers:{
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "RevenueItem": "Baggage_Basket",
                "PenaltyStatus": "No-Penalty",
                "VehicleTonnage": collection,
                "TotalNumber": total
            })
        }).then((res) => res.json())
            .then((resJson) => {
                setAmount(resJson.incomeAmount)
                setCollectionPoint(resJson.incomeAmount)
                console.log(amount, 'Amount')
            })
    }
    const clearAndRefresh = () => {
        hideModal()
        setPenalty()
        setAmount('')
        setPhone('')
        setName('')
        setCollection('')
        setCollectionPoint('')
        setPlateNumber('')
        setTotal('')
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
                "plate_number": plateNumber
            })
        }).then((res) => res.json())
            .then((resJson) => {
                setName(resJson.data.Name)
                setPhone(resJson.data.Phone)
            })

    }
    const processTicket = () =>{
        if(total === '' || collection === null || plateNumber === '' || name === '' || phone === '' || collectionPoint === '') {
            setErrorText('Please enter all fields')
            Alert.alert('Error', 'Please enter all fields')
        }
        else {
            ConcessionStore.update((s) => {
                s.penalty = "No-Penalty";
                s.tonnage = collection
                s.vehicleContent = " "
                s.collectionPoint = collectionPoint
                s.plateNumber = plateNumber
                s.name = name
                s.phone = phone
                s.amount = amount
                s.paymentMethod = paymentMethod
                s.paymentPeriod = '1Day'
            })
            showModal()
            setLoading(true)
            fetch(`${MOBILE_API}transport/create-haulage`, {
                headers: {
                    'accept': 'application/json',
                    Authorization: "Bearer" + userToken,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    "merchant_key": merchant_key,
                    "penalty_status": "No-Penalty",
                    "total_number": total,
                    "vehicle_content": "Baggage",
                    "product_code": collection,
                    "category": "Baggage_Basket",
                    "taxPayerPhone": phone,
                    "taxPayerName": name,
                    "plateNumber": plateNumber,
                    "collection_point": collectionPoint,
                    "payment_period": "1Day",
                    "amount": amount,
                    
                })
            })
                .then((res) => res.json())
                .then((responseJson) => {
                    setLoading(false)
                    setPaymentResponse(responseJson)
                    sendNotification()
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }
    return(
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.container}>
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        {
                            loading ? <ActivityIndicator color="#09893E" size="large"/> : (
                                <View style={{marginTop: 10, marginLeft: 16}}>
                                    {
                                        paymentResponse.response_code === '00' || paymentResponse.response_code === '01' ? (
                                            <View>
                                                <Image style={{
                                                    width: 100,
                                                    height: 100,
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    marginTop: 6,
                                                    marginBottom: 6,
                                                }} source={success}/>
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>{paymentResponse.response_message || 'Payment Successful'}</Text>
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>REF: {paymentResponse.payment_ref}</Text>
                                                <Button
                                                    title="Show Receipt"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.navigate("Done", {params: paymentResponse})}
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
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>{paymentResponse.response_message}</Text>
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
                {/*<View style={{marginTop: 5}}>*/}
                {/*    <Text style={styles.label}>Penalty Status</Text>*/}
                {/*    <Picker*/}
                {/*        style={styles.dropdown}*/}
                {/*        selectedValue={penalty}*/}
                {/*        onValueChange={(itemValue, itemIndex) => {*/}
                {/*            setPenalty(itemValue)*/}
                {/*        }}>*/}
                {/*        <Picker.Item label="No Penalty" value="No-Penalty" />*/}
                {/*        <Picker.Item label="Penalty" value="Penalty" />*/}
                {/*    </Picker>*/}
                {/*</View>*/}
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Ticket Type</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={collection}
                        onValueChange={(itemValue, itemIndex) => {
                            setCollection(itemValue)
                        }}>
                        <Picker.Item label="Ticket Type" value="" />
                        {
                            baggageList.map((item, index) =>{
                                return   <Picker.Item key={index} label={item.productName} value={item.productCode} />
                            })
                        }
                    </Picker>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Total Number of Baggage/Baskets</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Total Baggage/Baskets"
                        placeholderTextColor="#C4C4C4"
                        value={total}
                        keyboardType="numeric"
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        onEndEditing={() => populateAmount()}
                        onSubmitEditing={() => populateAmount()}
                        blurOnSubmit={false}
                        onChangeText={text => setTotal(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Vehicle Plate Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Vehicle Plate Number"
                        placeholderTextColor="#C4C4C4"
                        value={plateNumber}
                        returnKeyType="next"
                        onEndEditing={() => getPlateNumberInfo()}
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        maxLength={11}
                        onChangeText={text => setPlateNumber(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Taxpayer Phone No</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Taxpayer Phone No"
                        placeholderTextColor="#C4C4C4"
                        value={phone}
                        keyboardType="phone-pad"
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        maxLength={11}
                        onChangeText={text => setPhone(text)}
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
                    <Text style={styles.label}>Collection Point</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Collection Point"
                        placeholderTextColor="#C4C4C4"
                        value={collectionPoint}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onChangeText={text => setCollectionPoint(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        placeholderTextColor="#C4C4C4"
                        value={amount.toString()}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onChangeText={text => setAmount(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    {/*<Text style={styles.label}>Choose Wallet</Text>*/}
                    <Picker
                        style={styles.dropdown}
                        selectedValue={walletType}
                        onValueChange={(itemValue, itemIndex) => {
                            setWalletType(itemValue)
                        }}>
                        <Picker.Item label="Select Wallet" value=""/>
                        <Picker.Item label="Access" value="access"/>
                        <Picker.Item label="Fidelity" value="fidelity"/>
                    </Picker>
                </View>
                {errorText !== '' ? (
                    <Text style={styles.errorTextStyle}>
                        {errorText}
                    </Text>
                ) : null}
                <View style={{marginTop: 20}}>
                    <Button
                        title="Pay Now"
                        titleStyle={styles.btnText}
                        onPress={()=> processTicket()}
                        buttonStyle={styles.nextBtnStyle} />
                </View>
            </PaperProvider>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    newBtnText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
        fontWeight: '700'
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
    input:{
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
        fontFamily: 'DMSans_400Regular',
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
    }
})
