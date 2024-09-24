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

export default function SandBeachesScreen({navigation}){
    const [penalty, setPenalty] = useState()
    const [tonnage, setTonnage] = useState()
    const [tonnageList, setTonnageList] = useState([])
    const [content, setContent] = useState('')
    const [plateNumber, setPlateNumber] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [collectionPoint, setCollectionPoint] = useState('')
    const [amount, setAmount] = useState('')
    const [errorText, setErrorText] = useState('')
    const [walletType, setWalletType] = useState()
    const [paymentMethod, setPaymentMethod] = useState()
    const [payments, setPayments] = useState([])
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');

    const sendNotification = async () => {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Concessionaire' + ' - ' + plateNumber,
            body: response.response_message
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

    const requestBody = {
        penalty,
        tonnage,
        content,
        plateNumber,
        name,
        phone,
        collectionPoint,
        amount
    }
    const {userToken} = useContext(AuthContext)
    useEffect(() => {
        navigation.addListener('focus', () => {
            setPenalty()
            setTonnage()
            setPlateNumber('')
            setName('')
            setPhone('')
            setCollectionPoint('')
            setAmount('')
        })
        getCollectionType()
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
        }).catch((e) => console.log(e))
        getTonnage()
    }, []);
    const getIncomeAmount = (value) => {
        setAmount(value.amount)
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
    const getTonnage = () => {
        fetch(`${CENTRAL_API}agent/concessionaires-product-codes?category=SandBeaches`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json())
            .then((resJson) => {
                setTonnageList(resJson)
            })
    }
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
    const processTicket = () =>{
        if(content === '' || tonnage === null || plateNumber === '' || name === '' || phone === '' || collectionPoint === '') {
            setErrorText('Please enter all fields')
            Alert.alert('Error', 'Please enter all fields')
        }
        else {
            ConcessionStore.update((s) => {
                s.penalty = "No-Penalty";
                s.tonnage = tonnage.productCode
                s.vehicleContent = content
                s.collectionPoint = collectionPoint
                s.plateNumber = plateNumber
                s.totalNumber = 1
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
                    "total_number": "1",
                    "vehicle_content": content,
                    "product_code": tonnage.productCode,
                    "category": "SandBeaches",
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
                    setResponse(responseJson)
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
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>{response.response_message || 'Payment Successful'}</Text>
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>REF: {response.payment_ref}</Text>
                                                <Button
                                                    title="Show Receipt"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.navigate("Done", {params: response})}
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
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>{response.response_message || response.message}</Text>
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
                        selectedValue={tonnage}
                        onValueChange={(itemValue, itemIndex) => {
                            setTonnage(itemValue)
                            getIncomeAmount(itemValue)
                        }}>
                        <Picker.Item label="Ticket Type" value="" />
                        {
                            tonnageList.map((item, index) =>{
                                return   <Picker.Item key={index} label={item.productName} value={item} />
                            })
                        }
                    </Picker>
                </View>
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
                        placeholder="Amount"
                        placeholderTextColor="#C4C4C4"
                        value={amount.toString()}
                        editable={false}
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
                        title="Pay Ticket"
                        titleStyle={styles.btnText}
                        onPress={()=>processTicket()}
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
        color: '#000',
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
})
