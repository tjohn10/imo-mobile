import React, {useContext, useEffect, useState} from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    Dimensions,
    ScrollView,
    TextInput,
    Alert,
    ActivityIndicator, Image
} from "react-native";
import {Button} from "react-native-elements";
import {useForm} from "react-hook-form";
import {AuthStore, TransportStore} from "../../../store";
import {useIsFocused} from "@react-navigation/native";
import {Picker} from "@react-native-picker/picker";
import {AuthContext} from "../../../context/AuthContext";
import {FUNNY_API, merchant_key, MOBILE_API} from "../../../config";
import Moment from "moment/moment";
import {Modal, PaperProvider, Portal} from "react-native-paper";
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";

export default function TransportOrderScreen({navigation}) {
    const [emblemType, setEmblemType] = useState()
    const [plateNo, setPlateNo] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [amount, setAmount] = useState('')
    const [paymentDescription, setPaymentDescription] = useState('')
    const [paymentMethod, setPaymentMethod] = useState()
    const [walletType, setWalletType] = useState()
    const [paymentPeriod, setPaymentPeriod] = useState()
    const [collectionType, setCollectionType] = useState([])
    const [vehicleType, setVehicleType] = useState([])
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)


    const info = TransportStore.useState()
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = {backgroundColor: 'white', padding: 20,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 10,
        marginLeft: 16}
    ;


    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ defaultValues: TransportStore.useState((s) => s) });
    const isFocused = useIsFocused();

    const {userToken} = useContext(AuthContext)
    useEffect(() => {
        isFocused &&
        TransportStore.update((s) => {
            s.progress = 0;
        });
        navigation.addListener('focus', () => {
            console.log("reloaded");
            setEmblemType()
            setPlateNo('')
            setPhoneNumber('')
            setPaymentDescription('')
            setAmount(0)
            setName('')
            setEmail('')
            setWalletType('fidelity')
        });
        getVehicleType()

    }, [isFocused]);

    const clearAndReset = () => {
        hideModal()
        setEmblemType()
        setPlateNo('')
        setPhoneNumber('')
        setPaymentDescription('')
        setAmount(0)
        setName('')
        setEmail('')
        setWalletType('fidelity')
    }
    const userInfo = AuthStore.useState()
    const ticketInfo = TransportStore.useState()

    const onSubmit = async () => {
        TransportStore.update((t) => {
            t.progress = 33;
            t.emblemType = emblemType.productCode;
            t.plateNo = plateNo;
            t.email = email;
            t.emblemPrice = emblemType.emblem;
            t.name = name;
            t.phoneNumber = phoneNumber;
            t.paymentDescription = paymentDescription;
            t.paymentPeriod = paymentPeriod;
            t.paymentMethod = 'Pay Cash';
        });
        showModal()
        setLoading(true)
        await fetch(`${MOBILE_API}transport/create-transport-emblem`,{
            headers: {
                Authorization: "Bearer" + userToken,
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({
                "customer_name": name,
                "customer_email": email,
                "taxpayer_phone": phoneNumber,
                "amount": amount,
                "product_code": emblemType.productCode,
                "payment_method": "Pay Cash",
                "merchant_key": merchant_key,
                "payment_period": paymentPeriod,
                "description": paymentDescription,
                "plate_number": plateNo,
                "lga": "1",
                "wallet_type": walletType
            })
        }).then((res) => res.json())
            .then((resJson) => {
                setLoading(false)
                setResponse(resJson)
                console.log(resJson, "transport")
            })
    };

    const getVehicleType = () => {
        fetch(`${MOBILE_API}transport/emblem-product-code`, {
            headers:{
                Authorization: "Bearer" + userToken,
                "Content-Type": "application/json"
            },
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setVehicleType(responseJson.data)
            })
            .catch((e) => {
                console.log(e)
                Alert.alert('Error Encountered', e.message)
            })
    }
    const getVehicleOwnerDetails = () => {
        setLoading(true)
        fetch(`${MOBILE_API}transport/get-plate-number-info`, {
            headers:{
                'accept': 'application/json',
                Authorization: "Bearer" + userToken,
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({
                'plate_number': plateNo
            })
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setResponse(responseJson)
                console.log(responseJson, 'plate number')
                setPhoneNumber(responseJson.data.Phone)
                setName(responseJson.data.Name)
                setEmail(responseJson.data.Email)
            })
            .catch((e) => {
                console.log(e)
                Alert.alert('Error Encountered', e.message)
            })
    }
    const getEmblemAmount = (item) =>{
        setAmount(item.emblem)
    }
    return(
        <ScrollView style={styles.container}>
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
                                                    fontStyle:'normal',
                                                    fontWeight: '700',
                                                    fontSize: 16,
                                                    textAlign: 'center'
                                                }}>{response.response_message}</Text>
                                                <Text style={{
                                                    fontStyle:'normal',
                                                    fontWeight: '700',
                                                    fontSize: 14,
                                                }}>Payment Ref: {response.payment_ref}</Text>
                                                <Text style={{
                                                    fontStyle:'normal',
                                                    fontWeight: '700',
                                                    fontSize: 14,
                                                }}>Next Payment Date: {response.next_expiration_date}</Text>
                                                <Button
                                                    title="Show Receipt"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.navigate("Done", {params: response})}
                                                    buttonStyle={styles.modalButton} />
                                                <Button
                                                    title="Create New"
                                                    titleStyle={styles.newBtnText}
                                                    onPress={clearAndReset}
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
                                                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{response.response_message}</Text>
                                                <Button
                                                    title="Try Again"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => hideModal()}
                                                    buttonStyle={styles.modalButton} />
                                            </View>
                                        )
                                    }

                                </View>
                            )
                        }
                    </Modal>
                </Portal>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Emblem Type</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={emblemType}
                        onValueChange={(itemValue, itemIndex) =>{
                            setEmblemType(itemValue)
                            getEmblemAmount(itemValue)
                        }}>
                        {
                            vehicleType.map((item, index) =>{
                                return   <Picker.Item key={index} label={item.productName} value={item} />
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
                        autoCapitalize={'characters'}
                        maxLength={8}
                        returnKeyType="next"
                        onEndEditing={() => getVehicleOwnerDetails()}
                        onSubmitEditing={() => getVehicleOwnerDetails()}
                        onChangeText={text => setPlateNo(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Taxpayer Phone No</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Taxpayer Phone No"
                        placeholderTextColor="#C4C4C4"
                        value={phoneNumber}
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
                        onChangeText={text => setName(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Taxpayer Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Taxpayer Email"
                        placeholderTextColor="#C4C4C4"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Payment Description</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Payment Description"
                        placeholderTextColor="#C4C4C4"
                        value={paymentDescription}
                        onChangeText={text => setPaymentDescription(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Emblem Price</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        keyboardType="numeric"
                        placeholderTextColor="#C4C4C4"
                        value={amount}
                        onChangeText={(text) => setAmount(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Payment Period</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={paymentPeriod}
                        onValueChange={(itemValue, itemIndex) =>
                            setPaymentPeriod(itemValue)
                        }>
                        <Picker.Item label="2023" value="2023" />
                        <Picker.Item label="2024" value="2024" />
                    </Picker>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Wallet Type</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={walletType}
                        onValueChange={(itemValue, itemIndex) => {
                            setWalletType(itemValue)
                        }}>
                        <Picker.Item label="Fidelity" value="fidelity"/>
                        <Picker.Item label="Access" value="access"/>
                    </Picker>
                </View>
                <View style={{marginTop: 20}}>
                    <Button
                        title="Process Now"
                        titleStyle={styles.btnText}
                        onPress={handleSubmit(onSubmit)}
                        buttonStyle={styles.nextBtnStyle} />
                </View>
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
    btnText: {
        color: '#fff'
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
})

