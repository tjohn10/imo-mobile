import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    Dimensions,
    Alert,
    Image,
    ActivityIndicator,
    ScrollView, TextInput, ImageBackground
} from "react-native";
import abia from '../../../assets/abia-new.png'
import {Button} from "react-native-elements";
import {useForm} from "react-hook-form";
import {AuthStore, TicketStore, TransportEnumerationStore} from "../../../store";
import {useIsFocused} from "@react-navigation/native";
import {Card, Divider, MD3Colors, Modal, PaperProvider, Portal, ProgressBar} from "react-native-paper";
import ticket from "../../../assets/icons/ticket1.png";
import abs from "../../../assets/icons/abssin.png";
import enumeration from "../../../assets/icons/enum.png";
import {merchant_key, MOBILE_API} from "../../../config";
import {Picker} from "@react-native-picker/picker";
import {AuthContext} from "../../../context/AuthContext";
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";
import Moment from "moment";
import QRCode from "react-native-qrcode-svg";
import background from "../../../assets/background.png";

export default function TransportEnumeration3Screen({navigation, route}){
    const [loading, setLoading] = useState(false)
    const [revenueYear, setRevenueYear] = useState()
    const [location, setLocation] = useState()
    const [dailyTicket, setDailyTicket] = useState('')
    const [enumFee, setEnumFee] = useState('')
    const [email, setEmail] = useState('')
    const [driverName, setDriverName] = useState('')
    const [driverAbssin, setDriverAbssin] = useState('')
    const [driverPhone, setDriverPhone] = useState('')
    const [image, setImage] = useState()

    const [lga, setLga] = useState([]);


    const [visible, setVisible] = useState(false)
    const [taxpayerCategory, setTaxpayerCategory] = useState()
    const [enumResponse, setEnumResponse] = useState([])

    const response = route.params.params.response
    const plate = route.params.params.plateNumber
    const name = response.vehicle_owner.ownerName
    const address = response.vehicle_owner.ownerAddress
    const abssin = response.vehicle_owner.abssin

    const data = TransportEnumerationStore.useState()

    useEffect(() => {
        if (response.driver.photoUrl !== null){
            setImage( response.driver.photoUrl)
        }else if(response.driver.photoUrl === "") {
            setImage('https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=')
        }
        getLocalGovernments()
        setDriverPhone(response.driver.phoneNumber)
        setDriverName(response.driver.driverName)
        setDriverAbssin(response.driver.abssin)
    }, []);

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
    } = useForm({ defaultValues: TicketStore.useState((s) => s) });
    const isFocused = useIsFocused();

    const agentInfo = AuthStore.useState()
    const info = TicketStore.useState()

    const {userToken} = useContext(AuthContext)


    const getLocalGovernments = useCallback(async () => {
        const url = `${MOBILE_API}state/lga`;
        await fetch(url, {
            headers: {
                Authorization: "Bearer" + userToken,
            },
            method: "POST",
        })
            .then((res) => res.json())
            .then((responseJson) => {
                // console.log(responseJson.data, "lga GVRNMT");
                setLga(responseJson.data);
            })
            .catch((e) => {
                console.error(e, "lga ERROR");
            });
    }, []);


    const revYear = Moment(Date.now()).year()


    const yearsArray = [];
    for (let year = 2023; year <= 2024; year++) {
        yearsArray.push(year.toString());
    }
    const onSubmit = () => {
        showModal()
        setLoading(true)
        fetch(`${MOBILE_API}contact/save`, {
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                Authorization: "Bearer" + userToken,
            },
            method: 'POST',
            body: JSON.stringify({
                "email": email,
                "name": driverName,
                "phone": driverPhone,
                "contact_type": 'driver',
                "plate_number": plate,
                "merchant_key": merchant_key
            })
        })
            .then((res) => res.json())
            .then(() => {
                fetch(`${MOBILE_API}enumeration/create-transport-enumeration`, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: "Bearer" + userToken
                    },
                    body: JSON.stringify({
                        "taxpayer_category": 'Individual',
                        "abssin": driverAbssin,
                        "vehicle_plate_number": plate,
                        "taxpayer_name": driverName,
                        "taxpayer_phone": driverPhone,
                        "revenue_year": revYear,
                        "taxpayer_location": location,
                        "operating_park": data.park,
                        "trade_union": data.union,
                        "vehicle_category": data.vehicleCategory,
                        "owner_name": name,
                        "owner_address": address,
                        "daily_ticket_amount": data.dailyAmount,
                        "enumeration_fee": data.enumFee,
                        "merchant_key": merchant_key
                    }),
                    method: 'POST'
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        setLoading(false);
                        setEnumResponse(responseJson)
                        console.log(enumResponse, 'enumeration')

                    })
                    .catch((e) => {
                        Alert.alert('Error Occurred', e.message)
                    })
            })
    };
    const qrValue = `https://app.abiapay.com/enumerationTStatus?success&enumID=${enumResponse.enumeration_id}`
    return(
        <ScrollView style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{marginTop: 10, fontSize: 14, fontWeight: '600', marginLeft: 16, color: '#b9d7d9'}}>1. Vehicle Data</Text>
                <Text style={{marginTop: 10, fontSize: 14, fontWeight: '600', marginLeft: 15, color: '#b9d7d9'}}>2. Owner's Data</Text>
                <Text style={{marginTop: 10, fontSize: 16, fontWeight: '600', marginLeft: 10}}>3. Driver's Data</Text>
            </View>
            <ProgressBar progress={1.0} color="green" style={{width: Dimensions.get('screen').width -32, marginLeft: 16}}/>
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} dismissable={false} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        {
                            loading ? <ActivityIndicator color="#09893E" size="large" /> : (
                                <View style={{marginTop: 10}}>
                                    {
                                        enumResponse.response_code === '00' ? (
                                            <ImageBackground source={abia} resizeMode="contain" imageStyle={{opacity: 0.2}}>
                                            <View>

                                                    <View>
                                                        <View style={{justifyContent: 'center'}}>
                                                            <Image style={{width: 60, height: 60, marginTop: -10, alignSelf: 'center'}} source={abia} />
                                                        </View>
                                                        <View>
                                                            <Text style={{fontWeight: 'bold', color: '#367443', textAlign: 'center', fontSize: 19, marginTop: 0}}>ABIA STATE GOVERNMENT</Text>
                                                            <Text style={{fontWeight: 'bold', color: '#367443', fontSize: 13, textAlign: 'center', marginTop: 0}}>MINISTRY OF TRANSPORT</Text>
                                                            <Text style={{fontWeight: 'bold', color: '#000', fontSize: 12, textAlign: 'center', marginTop: 0}}>ENUMERATION</Text>
                                                        </View>

                                                    </View>
                                                    <View style={{width: '100%'}}>
                                                        <Text style={{
                                                            fontStyle:'normal',
                                                            fontWeight: '800',
                                                            fontSize: 28,
                                                            marginTop: 5,
                                                            letterSpacing: 1,
                                                            color: '#414141',
                                                            textAlign: 'center'
                                                        }}>{enumResponse.assetCode}</Text>
                                                        <View style={{width: containerStyle.width, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                                            <Text style={{color: '#eb2026',fontSize: 15, letterSpacing: 3, transform: 'rotate(-90deg)'}}>COMMERCIAL VEHICLE</Text>
                                                            <View style={{marginLeft: '-15%', marginRight: '25%'}}>
                                                                <QRCode
                                                                    size={150}
                                                                    value={qrValue}
                                                                />
                                                            </View>
                                                                <Text style={{fontWeight: 'bold', color: '#eb2026', fontSize: 16, marginTop: 15, marginRight: -20, letterSpacing: 3, transform: 'rotate(-90deg)'}}>{data.vehicleCategory.toUpperCase()}</Text>
                                                        </View>
                                                        <Text style={{
                                                            fontStyle:'normal',
                                                            fontWeight: '700',
                                                            fontSize: 15,
                                                            letterSpacing: 2,
                                                            color: '#494949',
                                                            textAlign: 'center'
                                                        }}>{enumResponse.enumeration_id}</Text>
                                                        <Text style={{
                                                            fontStyle:'normal',
                                                            fontWeight: '500',
                                                            fontSize: 17,
                                                            letterSpacing: 2,
                                                            marginTop: 10,
                                                            color: '#494949',
                                                            textAlign: 'center'
                                                        }}>PLATE NUMBER</Text>
                                                        <Text style={{
                                                            fontStyle:'normal',
                                                            fontWeight: '700',
                                                            fontSize: 24,
                                                            marginTop: -5,
                                                            letterSpacing: 3,
                                                            color: '#494949',
                                                            textAlign: 'center'
                                                        }}>{plate}</Text>
                                                    </View>
                                                <View style={{flexDirection: 'row', marginLeft:-10, justifyContent: 'space-between', marginRight: 10}}>
                                                    <Button
                                                        title="Create New"
                                                        titleStyle={styles.btnText}
                                                        onPress={() => navigation.navigate('Order')}
                                                        buttonStyle={styles.modalButton} />
                                                    <Button
                                                        title="Done"
                                                        titleStyle={styles.btnText}
                                                        onPress={() => navigation.navigate('All Tickets')}
                                                        buttonStyle={[styles.modalButton, {marginLeft: 5}]} />
                                                </View>
                                            </View>
                                            </ImageBackground>
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
                                                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{enumResponse.response_message}</Text>
                                                <Button
                                                    title="Try Again"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => hideModal()}
                                                    buttonStyle={styles.modalNewButton} />
                                            </View>
                                        )
                                    }

                                </View>
                            )
                        }
                    </Modal>
                </Portal>

            <View>
                <View style={{marginTop: 15, justifyContent: 'center'}}>
                    <Image style={{width: 150, height: 150, alignSelf: 'center' }} source={{uri: image}} />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#C4C4C4"
                        value={email}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>ABSSIN</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ABSSIN"
                        placeholderTextColor="#C4C4C4"
                        value={driverAbssin}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onChangeText={(text) => setDriverAbssin(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Driver's Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Driver's Name"
                        placeholderTextColor="#C4C4C4"
                        value={driverName}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onChangeText={(text) => setDriverName(text)}
                    />
                </View>

                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Driver's Phone</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Driver's Phone"
                        placeholderTextColor="#C4C4C4"
                        value={driverPhone}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onChangeText={(text) => setDriverPhone(text)}
                    />
                </View>


                <View style={{ marginTop: 5 }}>
                    <Text style={styles.label}>Location </Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={location}
                        onValueChange={(itemValue, itemIndex) => {
                            setLocation(itemValue)
                        }}
                    >
                        <Picker.Item label="Select Location" value="" />
                        {lga.map((item, index) => {
                            return (
                                <Picker.Item key={index} label={item.lgaName} value={item.lgaID} />
                            );
                        })}
                    </Picker>
                </View>

                <View>
                    <Button
                        title="Process Enumeration"
                        titleStyle={styles.btnText}
                        onPress={handleSubmit(onSubmit)}
                        buttonStyle={styles.nextBtnStyle}
                    />
                </View>
            </View>
            </PaperProvider>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
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
        backgroundColor: "#EAFFF3",
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
    horizontalView: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: "space-between"
    },
    modalButton: {
        width: 150,
        height: 48,
        padding: 10,
        marginTop: 10,
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
        backgroundColor: '#09893E',
        flexShrink: 0
    },
    newBtnText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
        fontWeight: '700'
    },
    topCard:{
        // width: Dimensions.get("screen").width - 40,
        width: 350,
        borderRadius: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#fff',
        backgroundColor: '#09893E',
        shadowColor: 'rgba(0, 0, 0, 0.07)'
    },
    card: {
        marginTop: 18,
        marginBottom: 10,
        marginLeft: 16,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 8,
        backgroundColor: '#fff'
    },
    title: {
        color: '#071827',
        fontFamily: 'DMSans_500Medium',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '900',
        marginTop: 15,
        marginLeft: 17,
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
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
        fontWeight: '700'
    },
    rowLabel: {
        color: '#979797',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        marginLeft: 17,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    wallet:{
        color: '#fff',
        alignSelf: 'stretch',
        fontFamily: 'Mulish_400Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16
    },
    amount:{
        color: '#fff',
        fontFamily: 'Mulish_800ExtraBold',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 32
    },
    id:{
        color: '#fff',
        fontFamily: 'DMSans_400Regular',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: 0.1
    },
    rowData: {
        color: '#071827',
        width: 150,
        textAlign: 'right',
        marginRight: 17,
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    }
})
