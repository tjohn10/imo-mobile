import React, {createRef, useEffect, useState} from "react";
import {View, Text, StyleSheet, SafeAreaView, TextInput, Dimensions, ScrollView, Alert} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Button} from "react-native-elements";
import {useForm, Controller} from "react-hook-form";
import {AuthStore, TicketStore, WalletStore} from "../../../store";
import {useIsFocused} from "@react-navigation/native";

export default function DriverPresumptiveTax({navigation, route}){
    const [ticketType, setTicketType] = useState()
    const [plateNo, setPlateNo] = useState('')
    const [abssin, setAbssin] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [paymentDescription, setPaymentDescription] = useState('')
    const [paymentMethod, setPaymentMethod] = useState()
    const [amount, setAmount] = useState(0)
    const [paymentPeriod, setPaymentPeriod] = useState()
    const [collectionType, setCollectionType] = useState([])
    const [walletBalance, setWalletBalance] = useState([])
    const [vehicleType, setVehicleType] = useState([])
    const [errorText, setErrorText] = useState('');

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ defaultValues: TicketStore.useState((s) => s) });
    const userInfo = AuthStore.useState()

    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused &&
        TicketStore.update((s) => {
            s.progress = 0;
            s.paymentPeriod = '1Day'
        });
        getCollectionType()
        getVehicleType()
        getWalletDetails()
    }, [isFocused]);

    const getCollectionType = () => {
        fetch('https://rgw.awtom8.africa/abia/sandbox/v1/CollectionType', {
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
        fetch('https://rgw.awtom8.africa/abia/sandbox/v1/ProductCodes', {
            headers:{
                'X-IBM-Client-Id': '26e9ccd3bc07c0dc1627609afcf4699d',
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


    const getWalletDetails =  () => {
        const url = 'https://mobileapi.sandbox.abiapay.com/api/v1/dashboard/data'
        fetch(url, {
            headers:{
                'Authorization': 'Bearer' + userInfo.token
            },
            method: 'POST'
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setWalletBalance(responseJson)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const setTaxRate = () => {
        const selectedVehicle = ticketType.productCode
        setAmount(selectedVehicle.presumptivetax)
    }
    const onSubmit = () => {
        setErrorText('')
        if (ticketType === "") {
            setErrorText('Ticket Type Required')
        }

        const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
        if (plateNo === alphanumericRegex.test(plateNo)){
            setErrorText('Please Enter only alphanumeric characters')
        }
        WalletStore.update((w) => {
            w.walletBalance = walletBalance.wallet_balance
            w.id = walletBalance.wallet_id
            w.name = walletBalance.name
            w.currentEarnings = walletBalance.current_earnings
        })
        navigation.navigate("Summary");
    };

    return(
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.container}
        >
            {/*<Controller render={({onChange, value})}>*/}
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Vehicle Type</Text>
                <Picker
                    style={styles.dropdown}
                    selectedValue={ticketType}
                    onValueChange={(itemValue, itemIndex) => {
                        setTicketType(itemValue)
                        setTaxRate(itemValue.presumptivetax)
                        setAmount(itemValue.presumptivetax)
                    }}>
                    <Picker.Item label="Ticket Type" value="" />
                    {
                        vehicleType.map((item, index) =>{
                            return   <Picker.Item key={index} label={item.productName} value={item} />
                        })
                    }
                </Picker>
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>ABSSIN</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ABSSIN"
                    placeholderTextColor="#C4C4C4"
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    value={abssin}
                    onChangeText={(text) => setAbssin(text)}
                />
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
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
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
                <Text style={styles.label}>Taxpayer Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Taxpayer Email"
                    placeholderTextColor="#C4C4C4"
                    value={email}
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    keyboardType="email-address"
                    autoComplete="email"
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Payment Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Payment Description"
                    placeholderTextColor="#C4C4C4"
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    value={paymentDescription}
                    onChangeText={text => setPaymentDescription(text)}
                />
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Presumptive Tax Rate</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Rate"
                    placeholderTextColor="#C4C4C4"
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    value={amount}
                    editable={false}
                    selectTextOnFocus={false}

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
            {errorText !== '' ? (
                <Text style={styles.errorTextStyle}>
                    {errorText}
                </Text>
            ) : null}
            <View style={{marginTop: 20}}>
                <Button
                    title="Save & Continue"
                    titleStyle={styles.btnText}
                    onPress={handleSubmit(onSubmit)}
                    buttonStyle={styles.nextBtnStyle} />
            </View>
            {/*</Controller>*/}

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
        color: '#fff',
        fontFamily: 'DMSans_400Regular',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
})

