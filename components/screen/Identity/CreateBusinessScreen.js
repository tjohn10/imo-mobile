import React, {useCallback, useContext, useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Dimensions,
    ScrollView,
    Alert,
    Platform,
    Pressable, ActivityIndicator, Image
} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Button} from "react-native-elements";
import {useForm, Controller} from "react-hook-form";
import {useIsFocused} from "@react-navigation/native";
import {AuthStore, TicketStore, ILIDStore, AbssinStore} from "../../../store";
import {ProgressStep, ProgressSteps} from "react-native-progress-steps";
import {Card, Divider, Modal, PaperProvider, Portal} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {MOBILE_API, PORTAL_API, OTHER_API} from '../../../config'
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";
import {AuthContext} from "../../../context/AuthContext";

export default function CreateBusinessScreen({navigation}) {


    const [categories, setCategories] = useState()
    const [categoryList, setCategoryList] = useState([])
    const [sectorList, setSectorList] = useState([])
    const [businessName, setBusinessName] = useState('')
    const [businessNumber, setBusinessNumber] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [abssin, setAbssin] = useState('')
    const [organisationType, setOrganisationType] = useState()
    const [sector, setSector] = useState()
    const [state, setState] = useState()
    const [stateList, setStateList] = useState([])
    const [TIN, setTIN] = useState('')
    const [houseNo, setHouse] = useState('')
    const [street, setStreet] = useState('')
    const [area, setArea] = useState('')
    const [enterpriseRegNo, setEnterpriseRegNo] = useState('')
    const [rcNumber, setRcNumber] = useState('')
    const [typeOfOrganisation, setTypeOfOrganisation] = useState()
    const [lga, setLga] = useState()
    const [lgaList, setLgaList] = useState([])
    const [businessLine, setBusinessLine] = useState()
    const [businessLineList, setBusinessLineList] = useState([])
    const businessCategories = [{categoryName: 'Hotel'}, {categoryName: 'Corporate'}]
    const [errorText, setErrorText] = useState('')
    const [firstName, setFirstName] = useState('')
    const [date, setDate] = useState(new Date())
    const [date1, setDate1] = useState(new Date())
    const [lastName, setLastName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [showPicker, setShowPicker] = useState(false)
    const [showPicker1, setShowPicker1] = useState(false)
    const [incorporationDate, setIncorporationDate] = useState(Date())
    const [commenceDate, setCommenceDate] = useState(Date())
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')
    const [taxOffice, setTaxOffice] = useState()
    const [taxOfficeList, setTaxOfficeList] = useState([])
    const [directorID, setDirectorID] = useState('')
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [response, setResponse] = useState([])

    const {handleSubmit, control, formState: {errors}} = useForm({defaultValues: ILIDStore.useState((item) => item)});
    const userInfo = AuthStore.useState()
    const busInfo = AbssinStore.useState()
    const isFocused = useIsFocused();

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const statusStyle = {backgroundColor: '#fF0000'}
    const containerStyle = {
        backgroundColor: 'white',
        padding: 20,
        width: Dimensions.get('screen').width - 40,
        marginLeft: 20
    };

    const toggleDatePicker1 = () => {
        setShowPicker(!showPicker)
    }
    const onChange = ({type}, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate
            setDate(currentDate)

            if (Platform.OS === "android") {
                toggleDatePicker1()
                setIncorporationDate(currentDate.toDateString())
            }

        } else {
            toggleDatePicker1()
        }
    }
    const toggleDatePicker2 = () => {
        setShowPicker1(!showPicker1)
    }
    const onChanges = ({type}, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate
            setDate(currentDate)

            if (Platform.OS === "android") {
                toggleDatePicker2()
                setCommenceDate(currentDate.toDateString())
            }

        } else {
            toggleDatePicker2()
        }
    }

    const getUserDetails = () => {
        setLoading(true)
        fetch(`${OTHER_API}fetchUserData`, {
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "userType": 'Individual',
                    "userID": directorID
                }
            ),
            method: 'POST'
        }).then((res)  => res.json())
            .then((resJson) => {
                setLoading(false)
                console.log(resJson, "data")
                setFirstName(resJson.TaxpayerName)
                setPhoneNumber(resJson.TaxpayerPhone)
                setEmail(resJson.TaxpayerEmail)
            })
    }
    const getLocalGovernments = () => {
        fetch(`${MOBILE_API}state/lga`, {
            headers: {
                'Authorization': 'Bearer' + userInfo.token,
                'accept': 'application/json'
            },
            method: 'POST'
        })
            .then((res) => res.json())
            .then((responseJson) => {
                setLgaList(responseJson.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const getStates = () => {
        fetch(`${MOBILE_API}state`, {
            headers: {
                'Authorization': 'Bearer' + userInfo.token,
                'accept': 'application/json'
            },
            method: 'POST'
        })
            .then((res) => res.json())
            .then((responseJson) => {
                setStateList(responseJson.data);
            })
            .catch((e) => {
                console.log(e, "States");
            });
    };
    const getCategories = () => {
        fetch(`${PORTAL_API}user/sector`, {
            headers: {
                'accept': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((responseJson) => {
                setCategoryList(responseJson.data);
            })
            .catch((e) => {
                console.log(e, "sector");
            });
    }
    const getBusinessType = () => {
        fetch(`${PORTAL_API}user/business-type`, {
            headers: {
                'accept': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((responseJson) => {
                setBusinessLineList(responseJson.data);
            })
            .catch((e) => {
                console.log(e, "sec");
            });
    }
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
    const getTaxOffice = () => {
        fetch(`${PORTAL_API}user/station`, {
            headers: {
                'accept': 'application/json'
            },
            method: 'POST'
        })
            .then((res) => res.json())
            .then((responseJson) => {
                setTaxOfficeList(responseJson.data);
            })
            .catch((e) => {
                console.log(e, "sector");
            });
    }

    useEffect(() => {
        isFocused &&
        AbssinStore.update((s) => {
            s.progress = 0;
            s.coyName = ''
        });
        getLocalGovernments()
        getBusinessType()
        getCategories()
        getStates()
        getSectors()
        getTaxOffice()
    }, []);
    const {userToken} = useContext(AuthContext)
    const onSubmit =  () => {
        setLoading(true)
        showModal()
        console.log(busInfo, "info")
        try {
            const url = `${MOBILE_API}abssin/register-abssin-business`
            fetch(url,
                {
                    headers: {
                        'Authorization': 'Bearer' + userToken,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "coy_name": businessName,
                        "regist_name": businessName,
                        "companytin": TIN,
                        "rcno": rcNumber,
                        "enterprise_reg_no": enterpriseRegNo,
                        "category": categories,
                        "mobile_no": phoneNumber,
                        "e_mail": email,
                        "city": area,
                        "type_of_organisation": busInfo.type_of_organisation,
                        "line_of_business": businessLine,
                        "date_of_incorporation": incorporationDate,
                        "sector": sector,
                        "phone_no": phoneNumber,
                        "house_no": houseNo,
                        "street": street,
                        "lga": lga,
                        "ward": "string",
                        "state": state,
                        "date_of_commencement": commenceDate,
                        "tax_office": taxOffice,
                        "cdn_category_id": 1,
                        "password": otp,
                        "enter_by": userInfo.email
                    }),
                    method: 'POST'
                })
                .then((res) => res.json())
                .then((responseJson) => {
                    setLoading(false)
                    setResponse(responseJson)
                    console.log('responseJson', responseJson)
                })
                .catch((e) => {
                    console.log(e)
                })
        } catch (error) {
            Alert.alert("Error Handling request", error)
        }


    }

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.container}
        >
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        {
                            loading ? <ActivityIndicator color="#09893E" size="large"/> : (
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
                                                <Text style={{fontWeight: '700'}}>{response.message}</Text>
                                                <Button
                                                    title="Create New"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.navigate("Create Business")}
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
                                                <Text>{response.message}</Text>
                                                <Button
                                                    title="Try Again"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.goBack()}
                                                    buttonStyle={styles.modalButton}/>
                                            </View>
                                        )
                                    }

                                </View>
                            )
                        }
                    </Modal>
                </Portal>
            <View style={{flex: 1}}>
                <ProgressSteps>
                    <ProgressStep
                        label="Basic"
                        onNext={() => AbssinStore.update((s) => {
                            s.coy_name = businessName;
                            s.category = categories;
                            s.tax_office = taxOffice;
                            s.regist_name = firstName + ' ' + lastName;
                            s.email = email
                        })}
                    >
                        <View style={{alignItems: 'center'}}>
                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>Business Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Business Name"
                                    placeholderTextColor="#C4C4C4"
                                    value={businessName}
                                    maxLength={8}
                                    returnKeyType="next"
                                    underlineColorAndroid="#f000"
                                    blurOnSubmit={false}
                                    onChangeText={text => setBusinessName(text)}
                                />
                            </View>

                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>Business Categories</Text>
                                <Picker
                                    style={styles.dropdown}
                                    selectedValue={categories}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setCategories(itemValue)
                                    }
                                >
                                    <Picker.Item label="Business Category" value=""/>
                                    <Picker.Item label="Luxury Private Parks" value="Luxury Private Parks"/>
                                    <Picker.Item label="Medical Laboratory" value="Medical Laboratory"/>
                                    <Picker.Item label="Building" value="Building"/>
                                    <Picker.Item label="Commercial Bank Urban" value="Commercial Bank Urban"/>
                                    <Picker.Item label="Hospital and clinic" value="Hospital and clinic"/>
                                    <Picker.Item label="Hotel" value="Hotel"/>
                                    <Picker.Item label="Secondary Schools" value="Secondary Schools"/>
                                    <Picker.Item label="Lotto License" value="Lotto License"/>
                                    <Picker.Item label="Gaming License" value="Gaming License"/>
                                    <Picker.Item label="Corporate" value="Corporate"/>
                                    <Picker.Item label="Restaurant" value="Restaurant"/>
                                    <Picker.Item label="Pool" value="Pool"/>
                                    <Picker.Item label="Ict and Business Center" value="Ict and Business Center"/>
                                    <Picker.Item label="Supermarket" value="Supermarket"/>
                                    <Picker.Item label="Gaming" value="Gaming"/>
                                    <Picker.Item label="Big Shop" value="Big Shop"/>
                                    <Picker.Item label="Small Shop" value="Small Shop"/>
                                    <Picker.Item label="Manufacturing Small" value="Manufacturing Small"/>
                                    <Picker.Item label="Bakery" value="Bakery"/>
                                    <Picker.Item label="Radio and TV Station" value="Radio and TV Station"/>
                                    <Picker.Item label="Construction and Mining and Excavation" value="Construction and Mining and Excavation"/>
                                    <Picker.Item label="Nursery" value="Nursery"/>
                                    <Picker.Item label="Nursery Primary and Secondary" value="Nursery Primary and Secondary"/>
                                    <Picker.Item label="Nursery Primary" value="Nursery Primary"/>
                                    <Picker.Item label="Nursery Primary Rural" value="Nursery Primary Rural"/>
                                    <Picker.Item label="Primary and Secondary" value="Primary and Secondary"/>
                                    <Picker.Item label="Secondary School Rural" value="Secondary School Rural"/>
                                    <Picker.Item label="Primary School Rural" value="Primary School Rural"/>
                                    <Picker.Item label="Multinational" value="Multinational"/>
                                    <Picker.Item label="Aluminum Profile" value="Aluminum Profile"/>
                                    <Picker.Item label="Warehouse" value="Warehouse"/>
                                    <Picker.Item label="Microfinance Bank Rural" value="Microfinance Bank Rural"/>
                                    <Picker.Item label="Microfinance Bank urban" value="Microfinance Bank urban"/>
                                    <Picker.Item label="Water Packaging" value="Water Packaging"/>
                                    <Picker.Item label="Private Parks" value="Private Parks"/>
                                    <Picker.Item label="Mortuary" value="Mortuary"/>
                                    <Picker.Item label="Industries" value="Industries"/>
                                    <Picker.Item label="Eatery" value="Eatery"/>
                                    <Picker.Item label="Night Clubs" value="Night Clubs"/>
                                    <Picker.Item label="Pharmacy" value="Pharmacy"/>
                                    <Picker.Item label="Gas Station" value="Gas Station"/>
                                    <Picker.Item label="Primary School" value="Primary School"/>
                                    <Picker.Item label="Petrol and Gas Station" value="Petrol and Gas Station"/>
                                    <Picker.Item label="Petrol Station" value="Petrol Station"/>
                                    <Picker.Item label="Mortgage Bank" value="Mortgage Bank"/>
                                    <Picker.Item label="Commercial Banks Rural" value="Commercial Banks Rural"/>
                                </Picker>
                            </View>
                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>Tax Office</Text>
                                <Picker
                                    style={styles.dropdown}
                                    selectedValue={taxOffice}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setTaxOffice(itemValue)
                                    }
                                >
                                    <Picker.Item label="Select Tax Office" value=""/>
                                    {
                                        taxOfficeList.map((item, index) => {
                                            return <Picker.Item key={index} label={item.name}
                                                                value={item.name}/>
                                        })
                                    }
                                </Picker>
                            </View>

                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>Enter Director ABSSIN</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Director ABSSIN"
                                    placeholderTextColor="#C4C4C4"
                                    returnKeyType="next"
                                    underlineColorAndroid="#f000"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => {
                                        getUserDetails()
                                    }}
                                    value={directorID}
                                    onChangeText={text => setDirectorID(text)}
                                />
                            </View>


                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>Title</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Title"
                                    placeholderTextColor="#C4C4C4"
                                    value={title}
                                    returnKeyType="next"
                                    underlineColorAndroid="#f000"
                                    blurOnSubmit={false}
                                    onChangeText={text => setTitle(text)}
                                />
                            </View>

                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>FirstName</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="FirstName"
                                    placeholderTextColor="#C4C4C4"
                                    value={firstName}
                                    returnKeyType="next"
                                    underlineColorAndroid="#f000"
                                    blurOnSubmit={false}
                                    onChangeText={text => setFirstName(text)}
                                />
                            </View>

                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>MiddleName</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="MiddleName"
                                    placeholderTextColor="#C4C4C4"
                                    value={middleName}
                                    returnKeyType="next"
                                    underlineColorAndroid="#f000"
                                    blurOnSubmit={false}
                                    onChangeText={text => setMiddleName(text)}
                                />
                            </View>

                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>LastName</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="LastName"
                                    placeholderTextColor="#C4C4C4"
                                    value={lastName}
                                    returnKeyType="next"
                                    underlineColorAndroid="#f000"
                                    blurOnSubmit={false}
                                    onChangeText={text => setLastName(text)}
                                />
                            </View>

                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>Phone Number</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone Number"
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
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
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
                        </View>
                    </ProgressStep>
                    <ProgressStep
                        label="Business"
                        onNext={() => AbssinStore.update((s) => {
                            s.type_of_organisation = organisationType;
                            s.sector = sector;
                            s.line_of_business = businessLine;
                            s.companyTin = TIN;
                            s.date_of_incorporation = incorporationDate;
                            s.date_of_commencement = commenceDate;
                            s.rcno = rcNumber;
                            s.phone_no = phoneNumber;
                            s.enterprise_reg_no = enterpriseRegNo;
                        })}
                    >
                        <View style={{alignItems: 'center'}}>
                            <Card style={styles.card}>
                                <Card.Content>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text>Business:</Text>
                                        <Text>{businessName}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text>My ABSSIN:</Text>
                                        <Text>{directorID}</Text>
                                    </View>
                                </Card.Content>
                            </Card>
                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>Organization type</Text>
                                <Picker
                                    style={styles.dropdown}
                                    selectedValue={organisationType}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setOrganisationType(itemValue)
                                    }
                                >
                                    <Picker.Item label="Select Oganisation Type" value=""/>
                                    <Picker.Item label="BUSINESS NAME - SOLE PROPRIETOR" value="BUSINESS NAME - SOLE PROPRIETOR"/>
                                    <Picker.Item label="INCORPORATED TRUSTEE" value="INCORPORATED TRUSTEE"/>
                                    <Picker.Item label="PRIVATE COMPANY LIMITED BY SHARES" value="PRIVATE COMPANY LIMITED BY SHARES"/>
                                    <Picker.Item label="PRIVATE UNLIMITED COMPANY" value="PRIVATE UNLIMITED COMPANY"/>
                                    <Picker.Item label="PUBLIC COMPANY LIMITED BY SHARES" value="PUBLIC COMPANY LIMITED BY SHARES"/>
                                    <Picker.Item label="PUBLIC UNLIMITED COMPANY" value="PUBLIC UNLIMITED COMPANY"/>
                                    <Picker.Item label="PRIVATE COMPANY LIMITED BY GUARANTEE" value="PRIVATE COMPANY LIMITED BY GUARANTEE"/>
                                    <Picker.Item label="PUBLIC COMPANY LIMITED BY GUARANTEE" value="PUBLIC COMPANY LIMITED BY GUARANTEE"/>
                                    <Picker.Item label="BUSINESS NAME - PARTNERSHIP" value="BUSINESS NAME - PARTNERSHIP"/>
                                    <Picker.Item label="LIMITED LIABILITY PARTNERSHIP" value="LIMITED LIABILITY PARTNERSHIP"/>
                                    <Picker.Item label="LIMITED PARTNERSHIP" value="LIMITED PARTNERSHIP"/>
                                </Picker>
                            </View>
                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>Sector</Text>
                                <Picker
                                    style={styles.dropdown}
                                    selectedValue={sector}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSector(itemValue)
                                    }
                                >
                                    <Picker.Item label="Select Sector" value=""/>
                                    {
                                        sectorList.map((item, index) => {
                                            return <Picker.Item key={index} label={item.sector_name}
                                                                value={item.sector_name}/>
                                        })
                                    }
                                </Picker>
                            </View>
                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>Line of Business</Text>
                                <Picker
                                    style={styles.dropdown}
                                    selectedValue={businessLine}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setBusinessLine(itemValue)
                                    }
                                >
                                    <Picker.Item label="Select Line of Business" value=""/>
                                    {
                                        businessLineList.map((item, index) => {
                                            return <Picker.Item key={index} label={item.business_type}
                                                                value={item.business_type}/>
                                        })
                                    }
                                </Picker>
                            </View>

                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>TIN</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Company TIN"
                                    placeholderTextColor="#C4C4C4"
                                    returnKeyType="next"
                                    underlineColorAndroid="#f000"
                                    blurOnSubmit={false}
                                    value={TIN}
                                    onChangeText={text => setTIN(text)}
                                />
                            </View>

                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>RC Number</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="RC Number"
                                    placeholderTextColor="#C4C4C4"
                                    returnKeyType="next"
                                    underlineColorAndroid="#f000"
                                    blurOnSubmit={false}
                                    value={rcNumber}
                                    onChangeText={text => setRcNumber(text)}
                                />
                            </View>


                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>Business Phone</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Business Phone"
                                    placeholderTextColor="#C4C4C4"
                                    value={phoneNumber}
                                    returnKeyType="next"
                                    underlineColorAndroid="#f000"
                                    blurOnSubmit={false}
                                    onChangeText={text => setPhoneNumber(text)}
                                />
                            </View>

                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>Enterprise Reg No</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enterprise Reg No"
                                    placeholderTextColor="#C4C4C4"
                                    value={enterpriseRegNo}
                                    returnKeyType="next"
                                    underlineColorAndroid="#f000"
                                    blurOnSubmit={false}
                                    onChangeText={text => setEnterpriseRegNo(text)}
                                />
                            </View>
                            <View>
                                <Text style={styles.label}>Date of Incorporation</Text>
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
                                            value={incorporationDate}
                                            onChangeText={text => setIncorporationDate(text)}
                                            onPressIn={toggleDatePicker1}
                                        />
                                    </Pressable>
                                )}
                            </View>
                            <View>
                                <Text style={styles.label}>Date of Commencement</Text>
                                {showPicker && (
                                    <DateTimePicker
                                        value={date1}
                                        mode="date"
                                        display="spinner"
                                        onChange={onChanges}
                                    />
                                )}

                                {!showPicker && (
                                    <Pressable
                                        onPress={toggleDatePicker2}
                                    >
                                        <TextInput
                                            label="Date"
                                            style={styles.input}
                                            placeholder="Date"
                                            placeholderTextColor="#e1e1e1"
                                            editable={false}
                                            value={commenceDate}
                                            onChangeText={text => setCommenceDate(text)}
                                            onPressIn={toggleDatePicker2}
                                        />
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    </ProgressStep>
                    <ProgressStep
                        label="Address"
                        onNext={() => AbssinStore.update((s) => {
                            s.state = state;
                            s.lga = lga;
                            s.area = area;
                            s.house_no = houseNo;
                            s.street = street;
                        })}
                    >
                        <View style={{alignItems: 'center'}}>
                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>State</Text>
                                <Picker
                                    style={styles.dropdown}
                                    selectedValue={state}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setState(itemValue)
                                    }
                                >
                                    <Picker.Item label="Select State" value=""/>
                                    {
                                        stateList.map((item, index) => {
                                            return <Picker.Item key={index} label={item.state}
                                                                value={item.state}/>
                                        })
                                    }
                                </Picker>
                            </View>
                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>Business LGA</Text>
                                <Picker
                                    style={styles.dropdown}
                                    selectedValue={lga}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setLga(itemValue)
                                    }
                                >
                                    <Picker.Item label="Select LGA" value=""/>
                                    {
                                        lgaList.map((item, index) => {
                                            return <Picker.Item key={index} label={item.lgaName}
                                                                value={item.lgaID}/>
                                        })
                                    }
                                </Picker>
                            </View>
                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>Area</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Area"
                                    placeholderTextColor="#C4C4C4"
                                    value={area}
                                    returnKeyType="next"
                                    underlineColorAndroid="#f000"
                                    blurOnSubmit={false}
                                    onChangeText={text => setArea(text)}
                                />
                            </View>

                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>House No</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="House No"
                                    placeholderTextColor="#C4C4C4"
                                    value={houseNo}
                                    keyboardType="phone-pad"
                                    returnKeyType="next"
                                    underlineColorAndroid="#f000"
                                    blurOnSubmit={false}
                                    onChangeText={text => setHouse(text)}
                                />
                            </View>
                            <View style={{marginTop: 5}}>
                                <Text style={styles.label}>Street</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Strret"
                                    placeholderTextColor="#C4C4C4"
                                    value={street}
                                    returnKeyType="next"
                                    underlineColorAndroid="#f000"
                                    blurOnSubmit={false}
                                    autoComplete="email"
                                    onChangeText={text => setStreet(text)}
                                />
                            </View>

                        </View>
                    </ProgressStep>
                    <ProgressStep label="ABBSIN">
                        <View style={{marginLeft: 16, marginRight: 16}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.rowLabel}>Fullname:</Text>
                                <Text style={styles.rowData}>{firstName + '' + lastName}</Text>
                            </View>
                            <Divider/>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.rowLabel}>Your ABBSIN:</Text>
                                <Text style={styles.rowData}>{directorID}</Text>
                            </View>
                            <Divider/>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.rowLabel}>Business Name:</Text>
                                <Text style={styles.rowData}>{businessName}</Text>
                            </View>
                            <Divider/>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.rowLabel}>Category:</Text>
                                <Text style={styles.rowData}>{categories}</Text>
                            </View>
                            <Divider/>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.rowLabel}>Sector:</Text>
                                <Text style={styles.rowData}>{sector}</Text>
                            </View>
                            <Divider/>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.rowLabel}>Organisation Type:</Text>
                                <Text style={styles.rowData}>{organisationType}</Text>
                            </View>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.label}>OTP</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="OTP"
                                placeholderTextColor="#C4C4C4"
                                value={otp}
                                returnKeyType="next"
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                                keyboardType="number-pad"
                                autoComplete="sms-otp"
                                onChangeText={text => setOtp(text)}
                            />
                        </View>
                        {errorText !== '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errorText}
                            </Text>
                        ) : null}
                        <View style={{marginTop: 10}}>
                            <Button
                                title="Start Business Setup"
                                titleStyle={styles.btnText}
                                onPress={handleSubmit(onSubmit)}
                                buttonStyle={styles.nextBtnStyle}/>
                        </View>
                    </ProgressStep>
                </ProgressSteps>
            </View>
            </PaperProvider>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
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
        marginRight: 10,
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
    card: {
        marginTop: 8,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        width: Dimensions.get('screen').width - 20,
        borderRadius: 10,
        backgroundColor: '#fff'
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
    rowData: {
        color: '#071827',
        width: 150,
        textAlign: 'right',
        marginRight: 17,
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22,
        marginTop: 15
    },
    rowLabel: {
        color: '#979797',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        marginLeft: 17,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22,
        marginTop: 15
    },
    modalButton: {
        width: 280,
        height: 48,
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#09893E',
        flexShrink: 0
    },
})


