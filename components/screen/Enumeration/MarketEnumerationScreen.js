import React, {useContext, useEffect, useState} from "react";
import {
    SafeAreaView,
    Text,
    StyleSheet,
    ScrollView,
    View,
    TextInput,
    Dimensions,
    ActivityIndicator,
    Image, Alert
} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Button} from "react-native-elements";
import {AuthStore, MarketEnumStore, TicketStore} from "../../../store";
import {useForm} from "react-hook-form";
import Moment from "moment";
import {Modal, PaperProvider, Portal} from "react-native-paper";
import success from "../../../assets/success.png";
import {FUNNY_API, MOBILE_API, OTHER_API} from "../../../config";
import cancel from "../../../assets/cancel.png";
import {AuthContext} from "../../../context/AuthContext";

export default function MarketEnumerationScreen({navigation, route}){
    const [category, setCategory] = useState()
    const [availability, setAvailability] = useState()
    const [abssin, setAbssin] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [ownerPhone, setOwnerPhone] = useState('')
    const [location, setLocation] = useState()
    const [LGA, setLGA] = useState([])
    const [year, setYear] = useState('2023')
    const [shopCategory, setShopCategory] = useState()
    const [zone, setZone] = useState('')
    const [market, setMarket] = useState()
    const [marketList, setMarketList] = useState([])
    const [loading, setLoading] = useState(true)
    const [shopNumber, setShopNumber] = useState('')
    const [income, setIncome] = useState('')
    const [ownerAmount, setOwnerAmount] = useState('')
    const [occupantAmount, setOccupantAmount] = useState('')
    const [enumFee, setEnumFee] = useState('')
    const [errorText, setErrorText] = useState('')
    const [paymentMethod, setPaymentMethod] = useState()
    const [collectionType, setCollectionType] = useState([])


    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: 'white',
        padding: 20,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 10,
        marginLeft: 16};

    const userInfo = AuthStore.useState();
    const {userToken} = useContext(AuthContext)

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ defaultValues: MarketEnumStore.useState((s) => s) });

    const getLocalGovernments = () => {
        fetch(`${MOBILE_API}state/lga`, {
            headers: {
                'Authorization': 'Bearer' + userToken,
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            method: "POST"
        })
            .then((res) => res.json())
            .then((responseJson) => {
                setLGA(responseJson.data);
                console.log(LGA, "LGAs")
            })
            .catch((e) => {
                console.log(e, "LOCAL GOVERNMENT ERROR");
            });
    };
    const getMarketName = () => {
        fetch(`${MOBILE_API}market`, {
            headers:{
                'Authorization': 'Bearer' + userToken,
                // 'content-type': 'application/json',
                // 'accept': 'application/json'
            },
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setMarketList(responseJson.data)
            })
            .catch((e) => {
                console.log(e)
                Alert.alert('Error Encountered', "Couldn't get Market List")
            })
    }
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

    const getMarketRate = () => {
        fetch('https://demo.paytax.ng/api/fetchMarketRates',{
            method: 'POST',
            headers:{
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                "shopCategory": shopCategory
            })
        }).then((res) => res.json())
            .then((resJson) => {
                setOwnerAmount(resJson.AnnualTicket)
                setOccupantAmount(resJson.incomeAmount)
                setEnumFee(resJson.EnumerationFees)
            })
    }
    const getUserDetails = () => {
        setLoading(true)
        fetch(`${OTHER_API}fetchUserData`, {
            headers:{
                'Content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(
                {
                    "userType": category,
                    "userID": abssin
                }
            ),
            method: 'POST'
        }).then((res)  => res.json())
            .then((resJson) => {
                setLoading(false)
                setOwnerName(resJson.TaxpayerName)
                setOwnerPhone(resJson.TaxpayerPhone)
                console.log(resJson)
            })
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log("reloaded");
            setMarket()
            setAvailability()
            setAbssin('')
            setOwnerPhone('')
            setOwnerName('')
            setOwnerAmount('')
            setLocation()
            setZone('')
            setShopNumber('')
            setMarket()
            setIncome('')
            setEnumFee('')
            setShopCategory()
            getLocalGovernments()
            getMarketName()
            getCollectionType()
        });
        getLocalGovernments()
        getMarketName()
        getCollectionType()
    }, [navigation]);

    const onSubmit = () => {
        MarketEnumStore.update((s) => {
            s.category = category;
            s.availability = availability;
            s.abssin = abssin
            s.ownerName = ownerName;
            s.ownerPhone = ownerPhone
            s.location = location.lgaID;
            s.year = year;
            s.shopCategory = shopCategory;
            s.zone = zone;
            s.market = market
            s.shopNumber = shopNumber
            s.income = income
            s.ownerAmount = ownerAmount
            s.occupantAmount = occupantAmount
            s.enumFee = enumFee
            s.paymentMethod = paymentMethod
        });
        navigation.navigate('Summary')
    }
    return(
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.container}
        >
            <PaperProvider>

                {/*<Controller render={({onChange, value})}>*/}
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>TaxPayer Category</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={category}
                        onValueChange={(itemValue, itemIndex) => {
                            setCategory(itemValue)
                        }}>
                        <Picker.Item label="Select Taxpayer Category" value="" />
                        <Picker.Item label="Individual Taxpayer" value="Individual" />
                        <Picker.Item label="Non-Individual Taxpayer" value="Non-Individual" />
                    </Picker>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Shop Owner ABSSIN Available</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={availability}
                        onValueChange={(itemValue, itemIndex) => {
                            setAvailability(itemValue)
                        }}>
                        <Picker.Item label="Shop Owner ABSSIN Available" value="" />
                        <Picker.Item label="Yes" value="Yes" />
                        <Picker.Item label="No" value="No" />
                    </Picker>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>ABSSIN</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ABSSIN"
                        placeholderTextColor="#C4C4C4"
                        value={abssin}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onSubmitEditing={() => getUserDetails()}
                        onEndEditing={() => getUserDetails()}
                        onChangeText={text => setAbssin(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Shop Owner Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Shop Owner Name"
                        placeholderTextColor="#C4C4C4"
                        value={ownerName}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onChangeText={text => setOwnerName(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Shop Owner Phone</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Shop Owner Phone No"
                        placeholderTextColor="#C4C4C4"
                        value={ownerPhone}
                        keyboardType="phone-pad"
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        maxLength={11}
                        onChangeText={text => setOwnerPhone(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Location</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={location}
                        onValueChange={(itemValue, itemIndex) =>
                            setLocation(itemValue)
                        }>
                        <Picker.Item label="Select LGA" value="" />
                        {
                            LGA.map((item, index) =>{
                                return   <Picker.Item key={index} label={item.lgaName} value={item} />
                            })
                        }

                    </Picker>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Revenue Year</Text>
                    <TextInput
                        style={styles.disabledInput}
                        placeholder="Revenue Year"
                        placeholderTextColor="#000"
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        editable={false}
                        selectTextOnFocus={false}
                        value={year}
                        onChangeText={text => setYear(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Shop Category</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={shopCategory}
                        onValueChange={(itemValue, itemIndex) => {
                            setShopCategory(itemValue)
                            getMarketRate()
                        }
                        }>
                        <Picker.Item label="Shop Category" value="" />
                        <Picker.Item label="Single" value="Single" />
                        <Picker.Item label="Double" value="Double" />
                        <Picker.Item label="Street Market" value="StreetMarket" />
                    </Picker>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Market</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={market}
                        onValueChange={(itemValue, itemIndex) => {
                            setMarket(itemValue)
                        }}>
                        <Picker.Item label="Market Name" value="" />
                        {
                            marketList.map((item, index) =>{
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
                    <Text style={styles.label}>Monthly Income Range</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={income}
                        onValueChange={(itemValue, itemIndex) =>
                            setIncome(itemValue)
                        }>
                        <Picker.Item label="Monthly Income Range" value="" />
                        <Picker.Item label="Less than 10,000" value="Less than 10,000" />
                        <Picker.Item label="10,000 - 50,000" value="10,000 - 50,000" />
                        <Picker.Item label="50,001 -  100,000" value="50,001 -  100,000" />
                        <Picker.Item label="100,001 -  200,000" value="100,001 -  200,000" />
                        <Picker.Item label="200,001 -  300,000" value="200,001 -  300,000" />
                        <Picker.Item label="300,001 -  500,000" value="300,001 -  500,000" />
                        <Picker.Item label="500,001 -  1,000,000" value="500,001 -  1,000,000" />
                        <Picker.Item label="1,000,001 -  3,000,000" value="1,000,001 -  3,000,000" />
                        <Picker.Item label="3,000,001 -  5,000,000" value="3,000,001 -  5,000,000" />
                        <Picker.Item label="5,000,001 -  10,000,000" value="5,000,001 -  10,000,000" />
                        <Picker.Item label="Above 10,000,000" value="Above 10,000,000" />
                    </Picker>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Annual Shop Ticket Amount (Shop Owner)</Text>
                    <TextInput
                        style={styles.disabledInput}
                        placeholder="Annual Shop Ticket Amount"
                        placeholderTextColor="#000"
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        editable={false}
                        selectTextOnFocus={false}
                        value={ownerAmount}
                        onChangeText={text => setOwnerAmount(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Annual Ticket Amount (Per Occupant)</Text>
                    <TextInput
                        style={styles.disabledInput}
                        placeholder="Annual Ticket Amount (Per Occupant)"
                        placeholderTextColor="#000"
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        editable={false}
                        selectTextOnFocus={false}
                        value={occupantAmount}
                        onChangeText={text => setOccupantAmount(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Shop Enumeration Fee</Text>
                    <TextInput
                        style={styles.disabledInput}
                        placeholder="Shop Enumeration Fee"
                        placeholderTextColor="#000"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        editable={false}
                        selectTextOnFocus={false}
                        value={enumFee}
                        onChangeText={text => setEnumFee(text)}
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
                <View style={{marginTop: 20}}>
                    <Button
                        title="Continue"
                        titleStyle={styles.btnText}
                        onPress={handleSubmit(onSubmit)}
                        buttonStyle={styles.nextBtnStyle} />
                </View>
                {/*</Controller>*/}
            </PaperProvider>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFC",
    },
    input: {
        width: Dimensions.get("screen").width - 32,
        height: 48,
        marginTop: 11,
        marginRight: 16,
        borderRadius: 8,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 24,
        paddingBottom: 12,
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: "#09893E",
        marginLeft: 16,
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
        backgroundColor: '#bdc3c7',
        borderColor: '#09893E',
        marginLeft: 16
    },
    dropdown: {
        width: Dimensions.get("screen").width - 32,
        height: 48,
        marginTop: 11,
        marginRight: 16,
        borderRadius: 8,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 24,
        paddingBottom: 12,
        borderWidth: 1,
        backgroundColor: "#DEDEDE",
        // backgroundColor: "pink",
        borderColor: "#09893E",
        marginLeft: 16,
    },
    label: {
        height: 22,
        color: "#071931",
        fontFamily: "DMSans_400Regular",
        fontSize: 14,
        marginLeft: 16,
        marginTop: 10,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 22,
    },
    nextBtnStyle: {
        width: Dimensions.get("screen").width - 32,
        height: 48,
        padding: 10,
        marginLeft: 16,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#09893E",
        flexShrink: 0,
    },
    btnText: {
        color: "#fff",
        fontFamily: "DMSans_400Regular",
    },
    errorTextStyle: {
        color: "red",
        textAlign: "center",
        fontSize: 14,
    },
});
