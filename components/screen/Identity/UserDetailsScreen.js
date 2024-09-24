import React, {useContext, useEffect, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Button} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from "@react-native-community/datetimepicker";
import {ProgressStep, ProgressSteps} from "react-native-progress-steps";
import {MOBILE_API, PORTAL_API} from "../../../config";
import {AuthContext} from "../../../context/AuthContext";
import {AuthStore} from "../../../store";
import * as ImagePicker from "expo-image-picker";
import {CameraType} from "expo-image-picker";
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";
import {Divider, Modal, PaperProvider, Portal} from "react-native-paper";
import Moment from "moment";
import dayjs from "dayjs";

export default function UserDetailsScreen({navigation, route}) {
    const [image, setImage] = useState('data:image/png;base64,' + '');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [title, setTitle] = useState()
    const [unit, setUnit] = useState()
    const [type, setType] = useState()
    const [email, setEmail] = useState('')
    const [occupation, setOccupation] = useState('')
    const [bvn, setBvn] = useState('')
    const [nin, setNin] = useState('')
    const [phone, setPhone] = useState('')
    const [birthPlace, setBirthPlace] = useState('')
    const [category, setCategory] = useState()
    const [categoryList, setCategoryList] = useState([])
    const [showPicker, setShowPicker] = useState(false)
    const [sector, setSector] = useState()
    const [sectorList, setSectorList] = useState([])
    const [income, setIncome] = useState('')
    const [tin, setTin] = useState('')
    const [nationality, setNationality] = useState('')
    const [state, setState] = useState()
    const [stateList, setStateList] = useState([])
    const [lga, setLga] = useState()
    const [lgaList, setLgaList] = useState([])
    const [residenceState, setResidenceState] = useState()
    const [residenceLga, setResidenceLga] = useState()
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [houseNo, setHouseNo] = useState('')
    const [password, setPassword] = useState('')
    const [ward, setWard] = useState()
    const [allWards, setAllWards] = useState([])
    const [maritalStatus, setMaritalStatus] = useState('')
    const [mobile, setMobile] = useState('')
    const [gender, setGender] = useState('')
    const [date, setDate] = useState(new Date())
    const [dateOfBirth, setDateOfBirth] = useState(Date())
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [response, setResponse] = useState([])
    const [bvnResponse, setBvnResponse] = useState([])
    const [visible, setVisible] = React.useState(false);

    const details = route.params.params
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = {
        backgroundColor: 'white',
        padding: 20,
        width: Dimensions.get('screen').width - 40,
        marginLeft: 20,
        marginTop: 200
    };

    const {userToken} = useContext(AuthContext)
    const agentInfo = AuthStore.useState()
    const getSectors = () => {
        fetch(`${PORTAL_API}user/sector`, {
            headers: {
                'accept': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((responseJson) => {
                setSectorList(responseJson.data);
            })
            .catch((e) => {
                console.log(e, "sector");
            });
    }


    const getWards = () => {
        fetch(`${PORTAL_API}state/ward`, {
            headers: {
                'Authorization': 'Bearer' + userToken
            },
        })
            .then((res) => res.json())
            .then((responseJson) => {
                setAllWards(responseJson.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }


    const getUserDetails = () => {
        setFirstName(details.firstname)
        setMiddleName(details.middlename)
        setLastName(details.lastname)
        setDateOfBirth(details.birthdate)
        setGender(details.gender)
        setPhone(details.phone)
        setImage(details.photo)
        setLga(details.lga_of_origin || details.residence.lga)
        setResidenceLga(details.lga_of_residence || details.residence.lga)
        setMaritalStatus(details.marital_status || ' ')
        setNationality(details.nationality || 'Nigerian')
        setStreet(details.residential_address || details.residence.address1)
        setState(details.state_of_origin || details.residence.state)
        setResidenceState(details.state_of_residence || details.residence.state)
        setEmail(details.email)
        setNin(details.nin)
        setBvn(details.bvn)

        if(details.gender === 'm') {
            setGender('Male')
        } else if (details.gender === 'f') {
            setGender('Female')
        }
        if(details.photo.startsWith('data:image/jpg;base64,') === true){
            setImage(details.photo)
        } else if (details.photo.startsWith('data:image/png;base64,') === false){
            setImage('data:image/png;base64,' + details.photo)
        }
    }
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
                setLgaList(responseJson.data);
            })
            .catch((e) => {
                console.log(e, "LOCAL GOVERNMENT ERROR");
            });
    };
    const getStates = () => {
        fetch(`${MOBILE_API}state`, {
            headers: {
                'Authorization': 'Bearer' + userToken,
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            method: "POST"
        })
            .then((res) => res.json())
            .then((responseJson) => {
                setStateList(responseJson.data);
            })
            .catch((e) => {
                console.log(e, "State Error");
            });
    };
    const showDatePicker = () => {
        setShow(true)
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const toggleDatePicker1 = () => {
        setShowPicker(!showPicker)
    }
    const onChange = ({type}, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate
            setDate(currentDate)

            if (Platform.OS === "android") {
                toggleDatePicker1()
                setDateOfBirth(currentDate.toDateString())
            }

        } else {
            toggleDatePicker1()
        }
    }
    useEffect(() => {
        getLocalGovernments()
        getUserDetails()
        getSectors()
        getWards()
        getStates()
    }, []);

    const onSubmit = () => {
        if (firstName === '' || lastName === '' || dateOfBirth === null || email === ''
            || gender === '' || bvn === ''
            || nationality === '' || state === '' || maritalStatus === '' || ward === '' || phone === '') {
            Alert.alert('Incomplete Fields', 'Please Input all required fields')
        } else {
            showModal()
            setModalLoading(true)
            fetch(`${MOBILE_API}abssin/register-abssin-individual`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer' + userToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "indv_title": title,
                    "first_name": firstName,
                    "middle_name": middleName,
                    "surname": lastName,
                    "birth_date": dateOfBirth,
                    "birth_place": birthPlace,
                    "email": email || 'No Email found',
                    "gender": gender,
                    "category": category,
                    "nationality": nationality,
                    "state_of_origin": state,
                    "state_of_residence": residenceState,
                    "marital_status": maritalStatus,
                    "bvn": bvn,
                    "ward": ward,
                    "address": street,
                    "lga": lga,
                    "phone_number": phone,
                    "mobile_number": mobile,
                    "unit": unit,
                    "indv_type": type,
                    "image": image,
                    "enter_by": agentInfo.email
                })
            }).then((res) => res.json())
                .then((resJson) => {
                    setModalLoading(false)
                    setResponse(resJson)
                    console.log(resJson)
                })
        }
    }
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.container}>
            {
                loading ? <ActivityIndicator color="#09893E" size="large"/> : (
                    <PaperProvider>
                        <ProgressSteps>
                            <ProgressStep label="Personal">
                                <View>
                                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                        {image && <Image source={{uri: image}}
                                                         style={{width: 200, height: 200}}/>}
                                        <View style={{flexDirection: 'row'}}>
                                            <Button
                                                disabled
                                                buttonStyle={{backgroundColor: '#09893E'}}
                                                icon={<Icon
                                                    name="camera"
                                                    size={15}
                                                    color="white"
                                                />}
                                                onPress={takePicture}/>
                                        </View>
                                    </View>
                                    <View style={{marginTop: 5}}>
                                        <Text style={styles.label}>Title</Text>
                                        <Picker
                                            style={styles.dropdown}
                                            selectedValue={title}
                                            onValueChange={(itemValue, itemIndex) => setTitle(itemValue)}
                                        >
                                            <Picker.Item label="Select Title" value=""/>
                                            <Picker.Item label="Mr." value="Mr"/>
                                            <Picker.Item label="Miss" value="Miss"/>
                                            <Picker.Item label="Mrs." value="Mrs"/>
                                        </Picker>
                                    </View>
                                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                                        <Text style={[styles.label, {fontWeight: '800'}]}>Firstname: </Text>
                                        <Text style={styles.label}>{firstName}</Text>
                                    </View>
                                    <Divider style={{
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#2980b9'
                                    }}/>

                                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                                        <Text style={[styles.label, {fontWeight: '800'}]}>Middlename: </Text>
                                        <Text style={styles.label}>{middleName}</Text>
                                    </View>
                                    <Divider style={{
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#2980b9'
                                    }}/>

                                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                                        <Text style={[styles.label, {fontWeight: '800'}]}>Lastname: </Text>
                                        <Text style={styles.label}>{lastName}</Text>
                                    </View>
                                    <Divider style={{
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#2980b9'
                                    }}/>

                                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                                        <Text style={[styles.label, {fontWeight: '800'}]}>Marital Status: </Text>
                                        <Text style={styles.label}>{maritalStatus}</Text>
                                    </View>
                                    <Divider style={{
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#2980b9'
                                    }}/>

                                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                                        <Text style={[styles.label, {fontWeight: '800'}]}>Gender: </Text>
                                        <Text style={styles.label}>{gender}</Text>
                                    </View>
                                    <Divider style={{
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#2980b9'
                                    }}/>
                                </View>
                            </ProgressStep>
                            <ProgressStep label="User">
                                <View>
                                    {/*<View style={{marginTop: 5}}>*/}
                                    {/*    <Text style={styles.label}>Occupation</Text>*/}
                                    {/*    <TextInput*/}
                                    {/*        style={styles.input}*/}
                                    {/*        placeholder="Occupation"*/}
                                    {/*        placeholderTextColor="#C4C4C4"*/}
                                    {/*        value={occupation}*/}
                                    {/*        returnKeyType="next"*/}
                                    {/*        underlineColorAndroid="#f000"*/}
                                    {/*        blurOnSubmit={false}*/}
                                    {/*        onChangeText={(text) => setOccupation(text)}*/}
                                    {/*    />*/}
                                    {/*</View>*/}
                                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                                        <Text style={[styles.label, {fontWeight: '800'}]}>Date of Birth: </Text>
                                        <Text style={styles.label}>{dateOfBirth}</Text>
                                    </View>
                                    <Divider style={{
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#2980b9'
                                    }}/>

                                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                                        <Text style={[styles.label, {fontWeight: '800'}]}>Nin: </Text>
                                        <Text style={styles.label}>{nin}</Text>
                                    </View>
                                    <Divider style={{
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#2980b9'
                                    }}/>
                                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                                        <Text style={[styles.label, {fontWeight: '800'}]}>BVN: </Text>
                                        <Text style={styles.label}>{bvn}</Text>
                                    </View>
                                    <Divider style={{
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#2980b9'
                                    }}/>

                                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                                        <Text style={[styles.label, {fontWeight: '800'}]}>Phone Number: </Text>
                                        <Text style={styles.label}>{phone}</Text>
                                    </View>
                                    <Divider style={{
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#2980b9'
                                    }}/>
                                    <View style={{marginTop: 5}}>
                                        <Text style={styles.label}>Email</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Email"
                                            placeholderTextColor="#C4C4C4"
                                            returnKeyType="next"
                                            underlineColorAndroid="#f000"
                                            blurOnSubmit={false}
                                            value={email}
                                            onChangeText={(text) => setEmail(text)}
                                        />
                                    </View>

                                    <View style={{marginTop: 5}}>
                                        <Text style={styles.label}>Mobile Number</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Mobile Number"
                                            placeholderTextColor="#C4C4C4"
                                            returnKeyType="next"
                                            underlineColorAndroid="#f000"
                                            blurOnSubmit={false}
                                            value={mobile}
                                            onChangeText={(text) => setMobile(text)}
                                        />
                                    </View>

                                    <View style={{marginTop: 5}}>
                                        <Text style={styles.label}>Type</Text>
                                        <Picker
                                            style={styles.dropdown}
                                            selectedValue={type}
                                            onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                                        >
                                            {/*<Picker.Item label="Select Type" value=""/>*/}
                                            <Picker.Item label="Okada" value="Okada"/>
                                            <Picker.Item label="Tricycle (Keke)" value="Keke"/>
                                            <Picker.Item label="Market" value="Market"/>
                                        </Picker>
                                    </View>
                                    <View style={{marginTop: 5}}>
                                        <Text style={styles.label}>Unit</Text>
                                        <Picker
                                            style={styles.dropdown}
                                            selectedValue={unit}
                                            onValueChange={(itemValue, itemIndex) => setUnit(itemValue)}
                                        >
                                            <Picker.Item label="Select Unit" value=""/>
                                            <Picker.Item label="Abijo Unit" value="Abijo Unit"/>
                                            <Picker.Item label="Abijo new road Unit" value="Abijo new road Unit"/>
                                            <Picker.Item label="UBA Unit" value="UBA Unit"/>
                                            <Picker.Item label="Elegufe Units" value="Elegufe Units"/>
                                            <Picker.Item label="Awoyaya Unit" value="Awoyaya Unit"/>
                                            <Picker.Item label="Abule Parapo Unit" value="Abule Parapo Unit"/>
                                            <Picker.Item label="Gbetu Road Unit" value="Gbetu Road Unit"/>
                                            <Picker.Item label="Eputu Unit" value="Eputu Unit"/>
                                            <Picker.Item label="Oribanwa Unit" value="Oribanwa Unit"/>
                                            <Picker.Item label="Oribanwa phase2 Unit" value="Oribanwa phase2 Unit"/>
                                            <Picker.Item label="Lakowe Unit" value="Lakowe Unit"/>
                                            <Picker.Item label="Adeba Unit" value="Adeba Unit"/>
                                            <Picker.Item label="Onishan Unit" value="Onishan Unit"/>
                                            <Picker.Item label="Kajola Unit" value="Kajola Unit"/>
                                            <Picker.Item label="Otunla Unit" value="Otunla Unit"/>
                                            <Picker.Item label="Bogije Unit " value="Bogije Unit "/>
                                            <Picker.Item label="Elemoro Unit" value="Elemoro Unit"/>
                                            <Picker.Item label="Imaletalafia Unit" value="Imaletalafia Unit"/>
                                            <Picker.Item label="Shapati Unit " value="Shapati Unit "/>
                                            <Picker.Item label="Bankole Unit" value="Bankole Unit"/>
                                            <Picker.Item label="Onishan Unit" value="Onishan Unit"/>
                                            <Picker.Item label="Igando Unit" value="Igando Unit"/>
                                            <Picker.Item label="Ayeteju Unit" value="Ayeteju Unit"/>
                                            <Picker.Item label="Baba Adisa Unit" value="Baba Adisa Unit"/>
                                            <Picker.Item label="Eleko Unit" value="Eleko Unit"/>
                                            <Picker.Item label="Ibeju Unit" value="Ibeju Unit"/>
                                            <Picker.Item label="Costal Unit" value="Costal Unit"/>
                                            <Picker.Item label="Onosa Unit" value="Onosa Unit"/>
                                            <Picker.Item label="Desa Unit" value="Desa Unit"/>
                                            <Picker.Item label="Elerangbe Unit" value="Elerangbe Unit"/>
                                            <Picker.Item label="Okegun Unit" value="Okegun Unit"/>
                                        </Picker>
                                    </View>

                                </View>
                            </ProgressStep>
                            {/*<ProgressStep label="Professional">*/}
                            {/*    <View>*/}
                            {/*        /!*<View style={{marginTop: 5}}>*!/*/}
                            {/*        /!*    <Text style={styles.label}>Tax Office</Text>*!/*/}
                            {/*        /!*    <Picker*!/*/}
                            {/*        /!*        style={styles.dropdown}*!/*/}
                            {/*        /!*        selectedValue={taxOffice}*!/*/}
                            {/*        /!*        onValueChange={(itemValue, itemIndex) => setTaxOffice(itemValue)}*!/*/}
                            {/*        /!*    >*!/*/}
                            {/*        /!*        <Picker.Item label="Select Tax Office" value=""/>*!/*/}
                            {/*        /!*        <Picker.Item label="Male" value="Male"/>*!/*/}
                            {/*        /!*        <Picker.Item label="Female" value="Female"/>*!/*/}
                            {/*        /!*    </Picker>*!/*/}
                            {/*        /!*</View>*!/*/}
                            {/*        <View style={{marginTop: 5}}>*/}
                            {/*            <Text style={styles.label}>Employee Name</Text>*/}
                            {/*            <TextInput*/}
                            {/*                style={styles.input}*/}
                            {/*                placeholder="Employee Name"*/}
                            {/*                placeholderTextColor="#C4C4C4"*/}
                            {/*                value={employeeName}*/}
                            {/*                returnKeyType="next"*/}
                            {/*                underlineColorAndroid="#f000"*/}
                            {/*                blurOnSubmit={false}*/}
                            {/*                onChangeText={(text) => setEmployeeName(text)}*/}
                            {/*            />*/}
                            {/*        </View>*/}

                            {/*        <View style={{marginTop: 5}}>*/}
                            {/*            <Text style={styles.label}>Sector</Text>*/}
                            {/*            <Picker*/}
                            {/*                style={styles.dropdown}*/}
                            {/*                selectedValue={sector}*/}
                            {/*                onValueChange={(itemValue, itemIndex) => setSector(itemValue)}*/}
                            {/*            >*/}
                            {/*                <Picker.Item label="Select Sector" value=""/>*/}
                            {/*                {*/}
                            {/*                    sectorList.map((item, index) => {*/}
                            {/*                        return <Picker.Item key={index} label={item.sector_name}*/}
                            {/*                                            value={item.sector_name}/>*/}
                            {/*                    })*/}
                            {/*                }*/}
                            {/*            </Picker>*/}
                            {/*        </View>*/}
                            {/*        <View style={{marginTop: 5}}>*/}
                            {/*            <Text style={styles.label}>Income Source</Text>*/}
                            {/*            <TextInput*/}
                            {/*                style={styles.input}*/}
                            {/*                placeholder="Income Source"*/}
                            {/*                placeholderTextColor="#C4C4C4"*/}
                            {/*                value={income}*/}
                            {/*                returnKeyType="next"*/}
                            {/*                underlineColorAndroid="#f000"*/}
                            {/*                blurOnSubmit={false}*/}
                            {/*                onChangeText={(text) => setIncome(text)}*/}
                            {/*            />*/}
                            {/*        </View>*/}
                            {/*        <View style={{marginTop: 5}}>*/}
                            {/*            <Text style={styles.label}>Employee TIN</Text>*/}
                            {/*            <TextInput*/}
                            {/*                style={styles.input}*/}
                            {/*                placeholder="Employee TIN"*/}
                            {/*                placeholderTextColor="#C4C4C4"*/}
                            {/*                value={tin}*/}
                            {/*                returnKeyType="next"*/}
                            {/*                underlineColorAndroid="#f000"*/}
                            {/*                blurOnSubmit={false}*/}
                            {/*                onChangeText={(text) => setTin(text)}*/}
                            {/*            />*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*</ProgressStep>*/}
                            <ProgressStep label="Origin" nextBtnDisabled>
                                <View>
                                    <Portal>
                                        <Modal visible={visible} onDismiss={hideModal}
                                               contentContainerStyle={containerStyle}>
                                            {
                                                modalLoading ? <ActivityIndicator color="#09893E" size="large"/> : (
                                                    <View style={{marginTop: 10, marginLeft: 16}}>
                                                        {
                                                            response.status === true ? (
                                                                <View>
                                                                    <Image style={{
                                                                        width: 100,
                                                                        height: 100,
                                                                        marginLeft: 'auto',
                                                                        marginRight: 'auto',
                                                                        marginTop: 6,
                                                                        marginBottom: 6,
                                                                    }} source={success}/>
                                                                    <Text style={{
                                                                        fontWeight: '700',
                                                                        textAlign: 'center',
                                                                        fontSize: 16,
                                                                        lineHeight: 22
                                                                    }}>{response.message}</Text>
                                                                    <Button
                                                                        title="Create New IbejuID"
                                                                        titleStyle={styles.btnText}
                                                                        onPress={() => navigation.navigate("All IDs")}
                                                                        buttonStyle={styles.modalButton}/>
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
                                                                    <Text style={{
                                                                        fontWeight: '700',
                                                                        textAlign: 'center',
                                                                        fontSize: 16,
                                                                        lineHeight: 22
                                                                    }}>{response.response_message || response.message}</Text>
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
                                    {/*    <Text style={styles.label}>Nationality</Text>*/}
                                    {/*    <TextInput*/}
                                    {/*        style={styles.input}*/}
                                    {/*        placeholder="Nationality"*/}
                                    {/*        placeholderTextColor="#C4C4C4"*/}
                                    {/*        value={nationality}*/}
                                    {/*        returnKeyType="next"*/}
                                    {/*        underlineColorAndroid="#f000"*/}
                                    {/*        blurOnSubmit={false}*/}
                                    {/*        onChangeText={(text) => setNationality(text)}*/}
                                    {/*    />*/}
                                    {/*</View>*/}
                                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                                        <Text style={[styles.label, {fontWeight: '800'}]}>Nationality: </Text>
                                        <Text style={styles.label}>{nationality || 'Nigerian'}</Text>
                                    </View>
                                    <Divider style={{
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#2980b9'
                                    }}/>

                                    {/*<View style={{marginTop: 5}}>*/}
                                    {/*    <Text style={styles.label}>State of Origin</Text>*/}
                                    {/*    <Picker*/}
                                    {/*        style={styles.dropdown}*/}
                                    {/*        selectedValue={state}*/}
                                    {/*        onValueChange={(itemValue, itemIndex) => setState(itemValue)}*/}
                                    {/*    >*/}
                                    {/*        <Picker.Item label="Select State" value=""/>*/}
                                    {/*        {*/}
                                    {/*            stateList.map((item, index) => {*/}
                                    {/*                return <Picker.Item key={index} label={item.state} value={item}/>*/}
                                    {/*            })*/}
                                    {/*        }*/}
                                    {/*    </Picker>*/}
                                    {/*</View>*/}
                                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                                        <Text style={[styles.label, {fontWeight: '800'}]}>State of Origin: </Text>
                                        <Text style={styles.label}>{state}</Text>
                                    </View>
                                    <Divider style={{
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#2980b9'
                                    }}/>

                                    {/*<View style={{marginTop: 5}}>*/}
                                    {/*    <Text style={styles.label}>LGA</Text>*/}
                                    {/*    <Picker*/}
                                    {/*        style={styles.dropdown}*/}
                                    {/*        selectedValue={lga}*/}
                                    {/*        onValueChange={(itemValue, itemIndex) => setLga(itemValue)}*/}
                                    {/*    >*/}
                                    {/*        <Picker.Item label="Select LGA" value=""/>*/}
                                    {/*        {*/}
                                    {/*            lgaList.map((item, index) => {*/}
                                    {/*                return <Picker.Item key={index} label={item.lgaName} value={item}/>*/}
                                    {/*            })*/}
                                    {/*        }*/}
                                    {/*    </Picker>*/}
                                    {/*</View>*/}
                                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                                        <Text style={[styles.label, {fontWeight: '800'}]}>LGA of Origin: </Text>
                                        <Text style={styles.label}>{lga}</Text>
                                    </View>
                                    <Divider style={{
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#2980b9'
                                    }}/>

                                    <Text style={{fontWeight: '700', fontSize: 17, marginLeft: 16, marginTop: 10}}>Residence
                                        Information</Text>

                                    {/*<View style={{marginTop: 5}}>*/}
                                    {/*    <Text style={styles.label}>State of Residence</Text>*/}
                                    {/*    <Picker*/}
                                    {/*        style={styles.dropdown}*/}
                                    {/*        selectedValue={residenceState}*/}
                                    {/*        onValueChange={(itemValue, itemIndex) => setResidenceState(itemValue)}*/}
                                    {/*    >*/}
                                    {/*        <Picker.Item label="Select State" value=""/>*/}
                                    {/*        {*/}
                                    {/*            stateList.map((item, index) => {*/}
                                    {/*                return <Picker.Item key={index} label={item.state} value={item}/>*/}
                                    {/*            })*/}
                                    {/*        }*/}
                                    {/*    </Picker>*/}
                                    {/*</View>*/}
                                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                                        <Text style={[styles.label, {fontWeight: '800'}]}>State of Residence: </Text>
                                        <Text style={styles.label}>{residenceState}</Text>
                                    </View>
                                    <Divider style={{
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#2980b9'
                                    }}/>
                                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                                        <Text style={[styles.label, {fontWeight: '800'}]}>LGA of Residence: </Text>
                                        <Text style={styles.label}>{residenceLga}</Text>
                                    </View>
                                    <Divider style={{
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#2980b9'
                                    }}/>

                                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                                        <Text style={[styles.label, {fontWeight: '800'}]}>Address: </Text>
                                        <Text style={[styles.label, {width: 300, height: 50}]}>{street}</Text>
                                    </View>
                                    <Divider style={{
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#2980b9'
                                    }}/>

                                    <View style={{marginTop: 5}}>
                                        <Text style={styles.label}>Ward*</Text>
                                        <Picker
                                            style={styles.dropdown}
                                            selectedValue={ward}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setWard(itemValue)
                                            }}>
                                            <Picker.Item label="Select Ward" value=""/>
                                            {
                                                allWards.map((item, index) => {
                                                    return <Picker.Item key={index} label={item.name}
                                                                        value={item.name}/>
                                                })
                                            }
                                        </Picker>
                                    </View>

                                    {/*<View style={{marginTop: 5}}>*/}
                                    {/*    <Text style={styles.label}>Street*</Text>*/}
                                    {/*    <TextInput*/}
                                    {/*        style={styles.input}*/}
                                    {/*        placeholder="Street"*/}
                                    {/*        placeholderTextColor="#C4C4C4"*/}
                                    {/*        returnKeyType="next"*/}
                                    {/*        underlineColorAndroid="#f000"*/}
                                    {/*        blurOnSubmit={false}*/}
                                    {/*        value={street}*/}
                                    {/*        onChangeText={(text) => setStreet(text)}*/}
                                    {/*    />*/}
                                    {/*</View>*/}

                                    {/*<View style={{marginTop: 5}}>*/}
                                    {/*    <Text style={styles.label}>City*</Text>*/}
                                    {/*    <TextInput*/}
                                    {/*        style={styles.input}*/}
                                    {/*        placeholder="City"*/}
                                    {/*        placeholderTextColor="#C4C4C4"*/}
                                    {/*        returnKeyType="next"*/}
                                    {/*        underlineColorAndroid="#f000"*/}
                                    {/*        blurOnSubmit={false}*/}
                                    {/*        value={city}*/}
                                    {/*        onChangeText={(text) => setCity(text)}*/}
                                    {/*    />*/}
                                    {/*</View>*/}
                                    {/*<View style={{marginTop: 5}}>*/}
                                    {/*    <Text style={styles.label}>House No*</Text>*/}
                                    {/*    <TextInput*/}
                                    {/*        style={styles.input}*/}
                                    {/*        placeholder="Street"*/}
                                    {/*        placeholderTextColor="#C4C4C4"*/}
                                    {/*        returnKeyType="next"*/}
                                    {/*        underlineColorAndroid="#f000"*/}
                                    {/*        blurOnSubmit={false}*/}
                                    {/*        value={houseNo}*/}
                                    {/*        onChangeText={(text) => setHouseNo(text)}*/}
                                    {/*    />*/}
                                    {/*</View>*/}
                                    {/*<View style={{marginTop: 5}}>*/}
                                    {/*    <Text style={styles.label}>Password*</Text>*/}
                                    {/*    <TextInput*/}
                                    {/*        style={styles.input}*/}
                                    {/*        placeholder="Password"*/}
                                    {/*        secureTextEntry*/}
                                    {/*        placeholderTextColor="#C4C4C4"*/}
                                    {/*        returnKeyType="next"*/}
                                    {/*        underlineColorAndroid="#f000"*/}
                                    {/*        blurOnSubmit={false}*/}
                                    {/*        value={password}*/}
                                    {/*        onChangeText={(text) => setPassword(text)}*/}
                                    {/*    />*/}
                                    {/*</View>*/}
                                </View>
                                <View style={{marginTop: 20}}>
                                    <Button
                                        title="Submit"
                                        titleStyle={styles.btnText}
                                        onPress={() => onSubmit()}
                                        buttonStyle={styles.nextBtnStyle}
                                    />
                                </View>
                            </ProgressStep>
                        </ProgressSteps>
                    </PaperProvider>
                )
            }
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
        color: '#000',
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
    errorTextStyle: {
        color: "red",
        textAlign: "center",
        fontSize: 14,
        marginTop: 12
    },
    modalButton: {
        marginTop: 37,
        height: 48,
        backgroundColor: '#09893E',
        borderRadius: 8,
        marginLeft: 16,
        marginRight: 16
    },
})
