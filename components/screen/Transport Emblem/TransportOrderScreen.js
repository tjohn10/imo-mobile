import React, {useContext, useEffect, useState} from 'react'
import {View, StyleSheet, SafeAreaView, Text, Dimensions, ScrollView, TextInput, Alert} from "react-native";
import {Button} from "react-native-elements";
import {useForm} from "react-hook-form";
import {AuthStore, TransportStore} from "../../../store";
import {useIsFocused} from "@react-navigation/native";
import {Picker} from "@react-native-picker/picker";
import {AuthContext} from "../../../context/AuthContext";
import {FUNNY_API, MOBILE_API} from "../../../config";

export default function TransportOrderScreen({navigation}) {
    const [emblemType, setEmblemType] = useState()
    const [plateNo, setPlateNo] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [amount, setAmount] = useState()
    const [paymentDescription, setPaymentDescription] = useState('')
    const [paymentMethod, setPaymentMethod] = useState()
    const [paymentPeriod, setPaymentPeriod] = useState()
    const [collectionType, setCollectionType] = useState([])
    const [vehicleType, setVehicleType] = useState([])
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(false)

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
        });
        getVehicleType()
        getCollectionType()

    }, [isFocused]);
    const userInfo = AuthStore.useState()
    const ticketInfo = TransportStore.useState()

    const onSubmit = () => {
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
            t.paymentMethod = paymentMethod;
        });
        navigation.navigate("Summary");
    };

    const getCollectionType = () => {
        fetch(`${FUNNY_API}CollectionType`, {
            headers:{
                'X-IBM-Client-Id': '26e9ccd3bc07c0dc1627609afcf4699d',
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
        fetch(`${MOBILE_API}transport/emblem-product-code`, {
            headers:{
                Authorization: "Bearer" + userToken,
                "Content-Type": "application/json"
            },
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                console.log(responseJson.data)
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
                setResponse(responseJson.data)
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
        console.log("Amount", amount)
    }
    return(
        <ScrollView style={styles.container}>
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
                    maxLength={8}
                    returnKeyType="next"
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
                    editable={false}
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
                    onChangeText={text => setAmount(text)}
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
                    <Picker.Item label="2022" value="2022" />
                    <Picker.Item label="2023" value="2023" />
                </Picker>
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
            <View style={{marginTop: 20}}>
                <Button
                    title="Save & Continue"
                    titleStyle={styles.btnText}
                    onPress={handleSubmit(onSubmit)}
                    buttonStyle={styles.nextBtnStyle} />
            </View>
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
    }
})

