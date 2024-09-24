import React, {useContext, useEffect, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions, Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import {FUNNY_API, merchant_key, MOBILE_API} from "../../../config";
import {Button} from "react-native-elements";
import {Divider, MD3Colors, Modal, PaperProvider, Portal, ProgressBar} from "react-native-paper";
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";
import {AuthContext} from "../../../context/AuthContext";

export default function TransportEnumeration2Screen({navigation, route}) {
    const [email, setEmail] = useState('')
    const [image, setImage] = useState()
    const [plateNumber, setPlateNumber] = useState('')
    const [abssin, setAbssin] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [ownerPhone, setOwnerPhone] = useState('')
    const [vehicleType, setVehicleType] = useState([]);
    const [saveResponse, setSaveResponse] = useState([]);

    const plate = route.params.params.plateNumber
    const response = route.params.params.plateNumberResponse.response_data

    console.log(response, 'plate Number')

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 10,
        marginLeft: 16}
    ;

    useEffect(() => {
        if (response !== null) {
            setEmail('')
            if (response.vehicle_owner.photoUrl !== null){
                setImage( response.vehicle_owner.photoUrl)
            }else {
                setImage('https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=')
            }
            setPlateNumber(plate)
            setAbssin(response.vehicle_owner.abssin)
            setOwnerPhone(response.vehicle_owner.phoneNumber)
            setOwnerName(response.vehicle_owner.ownerName)
        } else {
            setEmail('')
            setOwnerName('')
            setOwnerPhone('')
            setPlateNumber(plate)
        }
    }, []);
    const {userToken} = useContext(AuthContext)

    const saveContact = () => {
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
                "name": ownerName,
                "phone": ownerPhone,
                "contact_type": 'Owner',
                "plate_number": plateNumber,
                "merchant_key": merchant_key
            })
        })
            .then((res) => res.json())
            .then((responseJson) => {
                setLoading(false)
                setSaveResponse(responseJson)
                // hideModal()
                console.log(responseJson, "response")
            })
            .catch((e) => {
                Alert.alert('Error Encountered', e.message)
            })
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{marginTop: 10, fontSize: 14, fontWeight: '600', marginLeft: 16, color: '#b9d7d9'}}>1. Vehicle Data</Text>
                <Text style={{marginTop: 10, fontSize: 16, fontWeight: '600', marginLeft: 13,}}>2. Owner's Data</Text>
                <Text style={{marginTop: 10, fontSize: 14, fontWeight: '600', marginLeft: 10, color: '#b9d7d9'}}>3. Driver's Data</Text>
            </View>

            <ProgressBar progress={0.67} color={MD3Colors.error50} style={{width: Dimensions.get('screen').width -32, marginLeft: 16}}/>
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} dismissable={false} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        {
                            loading ? <ActivityIndicator color="#09893E" size="large" /> : (
                                <View style={{marginTop: 10, marginLeft: 16}}>
                                    {
                                        saveResponse.response_code === '00' ? (
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
                                                }}>{saveResponse.response_message}</Text>
                                                <Button
                                                    title="Continue"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.navigate('Order3',{params: {response, plateNumber}})}
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
                                                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{saveResponse.response_message}</Text>
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
                <View style={{marginTop: 15, justifyContent: 'center'}}>
                    <Image style={{width: 150, height: 150, alignSelf: 'center' }} source={{uri: image}} />
                </View>
                <View style={{marginTop: 15, flexDirection: 'row'}}>
                    <Text style={[styles.label, {fontWeight: '800'}]}>PlateNumber: </Text>
                    <Text style={styles.label}>{plateNumber}</Text>
                </View>
                <Divider style={{
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 10,
                    borderWidth: 0.5,
                    borderColor: '#09893E'
                }}/>

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
                        value={abssin}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onChangeText={(text) => setAbssin(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Vehicle Owner Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Vehicle Owner Name"
                        placeholderTextColor="#C4C4C4"
                        value={ownerName}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onChangeText={(text) => setOwnerName(text)}
                    />
                </View>

                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Vehicle Owner Phone</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Vehicle Owner Phone"
                        placeholderTextColor="#C4C4C4"
                        value={ownerPhone}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onChangeText={(text) => setOwnerPhone(text)}
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <Button
                        title="Save & Continue"
                        titleStyle={styles.btnText}
                        onPress={saveContact}
                        // onPress={() => navigation.navigate('Order3', {params: {abssin, plateNumber, ownerName, ownerPhone}})}
                        buttonStyle={styles.nextBtnStyle}
                    />
                </View>

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
})
