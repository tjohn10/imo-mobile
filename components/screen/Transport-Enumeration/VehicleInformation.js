import React, {useContext, useEffect, useState} from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Platform, Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import {Modal, PaperProvider, Portal} from "react-native-paper";
import {merchant_key, MOBILE_API, PORTAL_API} from "../../../config";
import {Picker} from "@react-native-picker/picker";
import {Button} from "react-native-elements";
import {AuthContext} from "../../../context/AuthContext";
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function VehicleInformation({navigation}) {
    const [ownerPhone, setOwnerPhone] = useState('')
    const [vehicleMake, setVehicleMake] = useState('')
    const [vehicleModel, setVehicleModel] = useState('')
    const [plateNumber, setPlateNumber] = useState('')
    const [engineNumber, setEngineNumber] = useState('')
    const [chassisNumber, setChassisNumber] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [ownerAddress, setOwnerAddress] = useState('')
    const [vehicleStatus, setVehicleStatus] = useState()
    const [vehicleColor, setVehicleColor] = useState('')
    const [registrationState, setRegistrationState] = useState()
    const [states, setStates] = useState([])
    const [response, setResponse] = useState([])
    const [expiryDate, setExpiryDate] = useState(Date())
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(new Date())
    const [visible, setVisible] = useState(false)
    const [showPicker, setShowPicker] = useState(false)

    const {userToken} = useContext(AuthContext)
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 10,
        marginLeft: 16}

    const toggleDatePicker1 = () => {
        setShowPicker(!showPicker)
    }
    const onChange = ({type}, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate
            setDate(currentDate)

            if (Platform.OS === "android") {
                toggleDatePicker1()
                setExpiryDate(currentDate.toDateString())
            }

        } else {
            toggleDatePicker1()
        }
    }

    const getStates = () => {
        fetch(`${PORTAL_API}state`, {
            headers:{
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            method: 'post'
        }).then((res) => res.json())
            .then((resJson) => {
                setStates(resJson.data)
            })
    }
    useEffect(() => {
        getStates()
    }, []);

    const saveDetails = async () => {
        showModal()
        setLoading(true)
       await fetch(`${MOBILE_API}vehicle/save-vehicle-details`, {
            headers:{
                'accept': 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer' + userToken
            },
            method: 'post',
            body: JSON.stringify({
                "plate_number": plateNumber,
                "owner_phone_number": ownerPhone,
                "vehicle_make": vehicleMake,
                "vehicle_model": vehicleModel,
                "engine_number": engineNumber,
                "chassis_number": chassisNumber,
                "owner_name": ownerName,
                "owner_address": ownerAddress,
                "vehicleStatus": vehicleStatus,
                "vehicle_color": vehicleColor,
                "state_of_registration": registrationState,
                "expiry_date": expiryDate,
                "merchant_key": merchant_key
            })
        }).then((res) => res.json())
            .then((responseJson) => {
                setLoading(false)
                console.log(responseJson)
                setResponse(responseJson)
            })
    }

    return (
        <ScrollView style={styles.container}>
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} dismissable={false} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        {
                            loading ? <ActivityIndicator color="#09893E" size="large" /> : (
                                <View style={{marginTop: 10, marginLeft: 16}}>
                                    {
                                        response.response === '00' ? (
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
                                                <Button
                                                    title="Continue"
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
                <View>
                    <View style={{marginTop: 5}}>
                        <Text style={styles.label}>Plate Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Plate Number"
                            placeholderTextColor="#C4C4C4"
                            value={plateNumber}
                            autoCapitalize={'characters'}
                            maxLength={8}
                            returnKeyType="next"
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                            onChangeText={(text) => setPlateNumber(text)}
                        />
                    </View>
                    <View style={{marginTop: 5}}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            placeholderTextColor="#C4C4C4"
                            value={ownerPhone}
                            keyboardType={'numeric'}
                            maxLength={11}
                            returnKeyType="next"
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                            onChangeText={(text) => setOwnerPhone(text)}
                        />
                    </View>
                    <View style={{marginTop: 5}}>
                        <Text style={styles.label}>Owner Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Owner Name"
                            placeholderTextColor="#C4C4C4"
                            value={ownerName}
                            returnKeyType="next"
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                            onChangeText={(text) => setOwnerName(text)}
                        />
                    </View>
                    <View style={{marginTop: 5}}>
                        <Text style={styles.label}>Owner Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Owner address"
                            placeholderTextColor="#C4C4C4"
                            value={ownerAddress}
                            returnKeyType="next"
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                            onChangeText={(text) => setOwnerAddress(text)}
                        />
                    </View>
                    <View style={{marginTop: 5}}>
                        <Text style={styles.label}>Vehicle Make</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Vehicle Make"
                            placeholderTextColor="#C4C4C4"
                            value={vehicleMake}
                            returnKeyType="next"
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                            onChangeText={(text) => setVehicleMake(text)}
                        />
                    </View>
                    <View style={{marginTop: 5}}>
                        <Text style={styles.label}>Vehicle Model</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Vehicle Model"
                            placeholderTextColor="#C4C4C4"
                            value={vehicleModel}
                            maxLength={11}
                            returnKeyType="next"
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                            onChangeText={(text) => setVehicleModel(text)}
                        />
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={styles.label}>Vehicle Status </Text>
                        <Picker
                            style={styles.dropdown}
                            selectedValue={vehicleStatus}
                            onValueChange={(itemValue, itemIndex) => {
                                setVehicleStatus(itemValue)
                            }}>
                            <Picker.Item label="Select Vehicle Status" value="" />
                            <Picker.Item label="Active" value="active" />
                            <Picker.Item label="Default" value="default" />
                        </Picker>
                    </View>
                    <View style={{marginTop: 5}}>
                        <Text style={styles.label}>Vehicle Color</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Vehicle Color"
                            placeholderTextColor="#C4C4C4"
                            value={vehicleColor}
                            returnKeyType="next"
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                            onChangeText={(text) => setVehicleColor(text)}
                        />
                    </View>
                    <View style={{marginTop: 5}}>
                        <Text style={styles.label}>Engine Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Engine Number"
                            placeholderTextColor="#C4C4C4"
                            value={engineNumber}
                            maxLength={11}
                            returnKeyType="next"
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                            onChangeText={(text) => setEngineNumber(text)}
                        />
                    </View>
                    <View style={{marginTop: 5}}>
                        <Text style={styles.label}>Chassis Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Chassis Number"
                            placeholderTextColor="#C4C4C4"
                            value={chassisNumber}
                            returnKeyType="next"
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                            onChangeText={(text) => setChassisNumber(text)}
                        />
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={styles.label}>Registration State </Text>
                        <Picker
                            style={styles.dropdown}
                            selectedValue={registrationState}
                            onValueChange={(itemValue, itemIndex) => {
                                setRegistrationState(itemValue)
                            }}>
                            <Picker.Item label="Select Registration State" value="" />
                            {states.map((item, index) => {
                                return (
                                    <Picker.Item key={index} label={item.state} value={item.state} />
                                );
                            })}
                        </Picker>
                    </View>
                    <View>
                        <Text style={styles.label}>Registration Expiry Date</Text>
                        {showPicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="spinner"
                                onChange={onChange}
                            />
                        )}

                        {!showPicker && (
                            <Pressable
                                onPress={toggleDatePicker1}
                            >
                                <TextInput
                                    label="Date"
                                    style={styles.input}
                                    placeholder="Date"
                                    placeholderTextColor="#e1e1e1"
                                    editable={false}
                                    value={expiryDate}
                                    onChangeText={text => setExpiryDate(text)}
                                    onPressIn={toggleDatePicker1}
                                />
                            </Pressable>
                        )}
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            title="Save Vehicle Details"
                            titleStyle={styles.btnText}
                            onPress={saveDetails}
                            buttonStyle={styles.nextBtnStyle}
                        />
                    </View>
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
})
