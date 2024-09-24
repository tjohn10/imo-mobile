import React, {createRef, useContext, useEffect, useState} from "react";
import {View, Text, StyleSheet, SafeAreaView, TextInput, Dimensions, ScrollView, Alert} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Button} from "react-native-elements";
import {useForm, Controller} from "react-hook-form";
import {AuthStore, MarketStore, TicketStore, WalletStore} from "../../../store";
import {useIsFocused} from "@react-navigation/native";
import {FUNNY_API, MOBILE_API, PORTAL_API} from "../../../config";
import {AuthContext} from "../../../context/AuthContext";

export default function MarketOrderScreen({navigation, route}){
    const [marketType, setMarketType] = useState()
    const [zone, setZone] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [shopNumber, setShopNumber] = useState('')
    const [shopCategory, setShopCategory] = useState()
    const [businessType, setBusinessType] = useState()
    const [businessList, setBusinessList] = useState([])
    const [revenueType, setRevenueType] = useState()
    const [paymentMethod, setPaymentMethod] = useState()
    const [amount, setAmount] = useState('')
    const [revenueList, setRevenueList] = useState([])
    const [paymentPeriod, setPaymentPeriod] = useState()
    const [collectionType, setCollectionType] = useState([])
    const [walletBalance, setWalletBalance] = useState([])
    const [marketName, setMarketName] = useState([])
    const [errorText, setErrorText] = useState('');

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ defaultValues: MarketStore.useState((s) => s) });
    const userInfo = AuthStore.useState()

    const isFocused = useIsFocused();
    const {userToken} = useContext(AuthContext)

    useEffect(() => {
        isFocused &&
        MarketStore.update((s) => {
            s.progress = 0;
            s.paymentPeriod = '2024'
        });
        getCollectionType()
        getMarketName()
        getWalletDetails()
        getBusinessTypes()
        getMarketFees()
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
    const getMarketName = () => {
        fetch(`${MOBILE_API}market`, {
            headers:{
                'Authorization': 'Bearer' + userToken
            },
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setMarketName(responseJson.data)
            })
            .catch((e) => {
                console.log(e)
                Alert.alert('Error Encountered', e.message)
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
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const getBusinessTypes =  () => {
        const url = `${MOBILE_API}user/business-type`
        fetch(url, {
            headers:{
                'Authorization': 'Bearer' + userToken
            },
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setBusinessList(responseJson.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const getMarketFees =  () => {
        const url = `${MOBILE_API}market/market-fees`
        fetch(url, {
            headers:{
                'Authorization': 'Bearer' + userToken
            },
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setRevenueList(responseJson.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const setMarketAmount = (item) =>{
        setAmount(item.amount)
    }
    const onSubmit = () => {
        setErrorText('')
        MarketStore.update((s) => {
            s.marketName = marketType;
            s.shopNumber = shopNumber;
            s.zone = zone
            s.name = name;
            s.email = email
            s.amount = amount
            s.phone = phoneNumber;
            s.shopCategory = shopCategory;
            s.revenueItem = revenueType.item;
            s.businessType = businessType;
            s.paymentPeriod = paymentPeriod;
            s.paymentMethod = paymentMethod;
        })

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
                <Text style={styles.label}>Market Type</Text>
                <Picker
                    style={styles.dropdown}
                    selectedValue={marketType}
                    onValueChange={(itemValue, itemIndex) => {
                        setMarketType(itemValue)
                    }}>
                    <Picker.Item label="Market Name" value="" />
                    {
                        marketName.map((item, index) =>{
                            return   <Picker.Item key={index} label={item.market} value={item.market} />
                        })
                    }
                </Picker>
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Zone/Line</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Zone/Line"
                    placeholderTextColor="#C4C4C4"
                    value={zone}
                    maxLength={8}
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    onChangeText={text => setZone(text)}
                />
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Shop Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Shop Number"
                    placeholderTextColor="#C4C4C4"
                    value={shopNumber}
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    onChangeText={text => setShopNumber(text)}
                />
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Business Type</Text>
                <Picker
                    style={styles.dropdown}
                    selectedValue={businessType}
                    onValueChange={(itemValue, itemIndex) => {
                        setBusinessType(itemValue)
                    }}>
                    <Picker.Item label="Business Type" value="" />
                    {
                        businessList.map((item, index) =>{
                            return   <Picker.Item key={index} label={item.business_type} value={item.business_type} />
                        })
                    }
                </Picker>
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Shop Category</Text>
                <Picker
                    style={styles.dropdown}
                    selectedValue={shopCategory}
                    onValueChange={(itemValue, itemIndex) => {
                        setShopCategory(itemValue)
                    }}>
                    <Picker.Item label="Shop Category" value="" />
                    <Picker.Item label="Single" value="Single" />
                    <Picker.Item label="Double" value="Double" />
                    <Picker.Item label="Street Market" value="StreetMarket" />
                </Picker>
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Revenue Item Type</Text>
                <Picker
                    style={styles.dropdown}
                    selectedValue={revenueType}
                    onValueChange={(itemValue, itemIndex) => {
                        setRevenueType(itemValue)
                        setMarketAmount(itemValue)
                    }}>
                    <Picker.Item label="Revenue Item Type" value="" />
                    {
                        revenueList.map((item, index) =>{
                            return   <Picker.Item key={index} label={item.item} value={item} />
                        })
                    }
                </Picker>
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
                    autoComplete="email"
                    value={email}
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    onChangeText={text => setEmail(text)}
                />
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
                    value={amount}
                    onChangeText={text => setAmount(text)}
                    editable={false}
                    selectTextOnFocus={false}
                />
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Revenue Year</Text>
                <Picker
                    style={styles.dropdown}
                    selectedValue={paymentPeriod}
                    onValueChange={(itemValue, itemIndex) =>
                        setPaymentPeriod(itemValue)
                    }>
                    <Picker.Item label="2021" value="2021" />
                    <Picker.Item label="2022" value="2022" />
                    <Picker.Item label="2023" value="2023" />
                    <Picker.Item label="2024" value="2024" />
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
        backgroundColor: '#fff'
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

