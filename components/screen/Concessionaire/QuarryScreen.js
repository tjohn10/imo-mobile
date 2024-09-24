import React, {useContext, useEffect, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
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

export default function QuarryScreen(){
    const [vehicleList, setVehicleList] = useState([])
    const [penalty, setPenalty] = useState()
    const [tonnage, setTonnage] = useState()
    const [content, setContent] = useState('')
    const [total, setTotal] = useState('1')
    const [plateNumber, setPlateNumber] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [collectionPoint, setCollectionPoint] = useState('')
    const [amount, setAmount] = useState('')
    const [errorText, setErrorText] = useState('')
    const [walletType, setWalletType] = useState()
    const [paymentMethod, setPaymentMethod] = useState()
    const [payments, setPayments] = useState([])
    const [paymentResponse, setPaymentResponse] = useState([])
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');

    const sendNotification = async () => {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Quarry Ticket' + ' - ' + plateNumber,
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
        }).then()
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
        getVehicleType()
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
        }).catch((e) => console.log(e))
        getCollectionType()
    }, []);

    const clearAndRefresh = () => {
        hideModal()
        setPenalty()
        setAmount('')
        setPhone('')
        setName('')
        setContent('')
        setCollectionPoint('')
        setPlateNumber('')
        setTonnage()
    }
    const getVehicleType = () => {
        fetch(`${CENTRAL_API}agent/concessionaires-product-codes?category=QuarrySites`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setVehicleList(responseJson)
            })
            .catch((e) => {
                console.log(e)
                Alert.alert('Error Encountered', e.message)
            })
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
    const populateAmount = () => {
        fetch(`${OTHER_API}calculateTicket`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "RevenueItem": "QuarrySites",
                "PenaltyStatus": "No-Penalty",
                "VehicleTonnage": tonnage,
                "TotalNumber": "1"
            })
        }).then((res) => res.json())
            .then((resJson) => {
                setAmount(resJson.incomeAmount)
                console.log(amount, 'Amount')
            })
    }
    const processQuarry= () =>{
        if(content === '' || tonnage === null || plateNumber === '' || name === '' || phone === '' || collectionPoint === '') {
            setErrorText('Please enter all fields')
            Alert.alert('Error', 'Please enter all fields')
        }
        else {
            ConcessionStore.update((s) => {
                s.penalty = "No-Penalty";
                s.tonnage = tonnage
                s.vehicleContent = content
                s.collectionPoint = collectionPoint
                s.plateNumber = plateNumber
                s.totalNumber = ''
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
                    "vehicle_content": content,
                    "product_code": tonnage,
                    "category": "QuarrySites",
                    "taxPayerPhone": phone,
                    "taxPayerName": name,
                    "plateNumber": plateNumber,
                    "collection_point": content,
                    "payment_period": "1Day",
                    "amount": amount,
                    
                })
            })
                .then((res) => res.json())
                .then((responseJson) => {
                    setLoading(false)
                    setPaymentResponse(responseJson)
                    console.log(responseJson)
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
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>{paymentResponse.response_message || paymentResponse.message}</Text>
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
                    <Text style={styles.label}>Vehicle Tonnage</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Picker
                            style={{
                                width: Dimensions.get('screen').width - 65,
                                height: 48,
                                marginTop: 11,
                                marginRight: 5,
                                borderRadius: 8,
                                paddingTop: 12,
                                paddingLeft: 16,
                                paddingRight: 24,
                                paddingBottom: 12,
                                borderWidth: 1,
                                backgroundColor: '#EAFFF3',
                                borderColor: '#09893E',
                                marginLeft: 16
                            }}
                        selectedValue={tonnage}
                        onValueChange={(itemValue, itemIndex) => {
                            setTonnage(itemValue)
                        }}>
                        <Picker.Item label="Vehicle Tonnage" value="" />
                        {
                            vehicleList.map((item, index) =>{
                                return   <Picker.Item key={index} label={item.productName} value={item.productCode} />
                            })
                        }
                    </Picker>
                        <TouchableOpacity onPress={() => populateAmount()}>
                            <Image style={{width: 30, height: 30, marginRight: 16, marginTop: 20}} source={success}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    tonnage === 'QuarryPerTon' ? (
                        <View style={{marginTop: 5}}>
                            <Text style={styles.label}>Total Ton</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Total tons"
                                placeholderTextColor="#C4C4C4"
                                value={total}
                                returnKeyType="next"
                                underlineColorAndroid="#f000"
                                onEndEditing={() => populateAmount()}
                                blurOnSubmit={false}
                                onChangeText={text => setTotal(text)}
                            />
                        </View>
                    ): null
                }

                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Vehicle Content</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Vehicle Content"
                        placeholderTextColor="#C4C4C4"
                        value={content}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onChangeText={text => setContent(text)}
                    />
                </View>

                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Vehicle Plate Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Vehicle Plate Number"
                        placeholderTextColor="#C4C4C4"
                        value={plateNumber}
                        maxLength={8}
                        autoCapitalize = {"characters"}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onSubmitEditing={() => {
                            getPlateNumberInfo()
                        }}
                        onEndEditing={() => {
                            getPlateNumberInfo()
                        }}
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
                        placeholder="Vehicle Content"
                        placeholderTextColor="#C4C4C4"
                        value={amount.toString()}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onChangeText={text => setAmount(text)}
                    />
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
                        onPress={()=>processQuarry()}
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
})
