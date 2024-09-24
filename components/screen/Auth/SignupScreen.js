import React, {useEffect, useState} from "react";
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
// import logo from "../../assets/android/mipmap-xxhdpi/ic_launcher_foreground.png";
import {TextInput} from "react-native-paper";
import forgot from '../../../assets/forgot.png'
import {Button} from "react-native-elements";
import {Picker} from "@react-native-picker/picker";

export default function SignupScreen({navigation}){
    const [bvn, setBVN] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastName] = useState("")
    const [bankName, setBankName] = useState("")
    const [bankAccountNumber, setBankAccountNumber] = useState("")
    const [lga, setLga] = useState("")
    const [collectionType, setCollectionType] = useState()
    const [password, setPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [collection, setCollection] = useState([])
    const [lgaList, setLgaList] = useState([])
    const [errorText, setErrorText] = useState('')

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
                setCollection(responseJson)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const getLga = () => {
        fetch('https://rgw.awtom8.africa/abia/sandbox/v1/GetLGAs', {
            headers:{
                'X-IBM-Client-Id': '26e9ccd3bc07c0dc1627609afcf4699d',
                'content-type': 'application/json',
                'accept': 'application/json'
            },
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setLgaList(responseJson)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    useEffect(() => {
        getCollectionType()
        getLga()
    }, []);

    const SignUp = () => {
        setErrorText('');
        if (!bvn) {
            alert('Please fill BVN');
            return;
        }
        if (!email) {
            alert('Please fill Email');
            return;
        }
        if (!firstname) {
            alert('Please fill First name');
            return;
        }
        if (!lastname) {
            alert('Please fill Last name');
            return;
        }
        if (!password) {
            alert('Please fill Password');
            return;
        }
        fetch('https://mobileapi.sandbox.abiapay.com/api/v1/agent/signup', {
            headers:{
                'X-IBM-Client-Id': '26e9ccd3bc07c0dc1627609afcf4699d',
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                bvn: bvn,
                phone: phone,
                email: email,
                first_name: firstname,
                last_name: lastname,
                bank_name: bankName,
                bank_account_number: bankAccountNumber,
                password: password,
                collection_type: collectionType,
                lga: lga
            })
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setLgaList(responseJson)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    return(
        <ScrollView style={styles.container}>
            <Image source={forgot} style={styles.image} />
            <Text style={styles.title}>Registration</Text>
            <View>
                <Text style={styles.emailLBL}>BVN</Text>
                <TextInput
                    style={styles.input}
                    placeholder="2232*********"
                    value={bvn}
                    onChangeText={text => setBVN(text)}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                />
            </View>
            <View>
                <Text style={styles.emailLBL}>Phone NUmber</Text>
                <TextInput
                    style={styles.input}
                    placeholder="080*********"
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                />
            </View>
            <View>
                <Text style={styles.emailLBL}>First Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ade"
                    value={firstname}
                    onChangeText={text => setFirstname(text)}
                    autoCapitalize="none"
                    keyboardType="name-phone-pad"
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                />
            </View>
            <View>
                <Text style={styles.emailLBL}>Last name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="User"
                    value={lastname}
                    onChangeText={text => setLastName(text)}
                />
            </View>
            <View>
                <Text style={styles.emailLBL}>Bank Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="bank"
                    value={bankName}
                    onChangeText={text => setBankName(text)}
                />
            </View>
            <View>
                <Text style={styles.emailLBL}>Bank Account Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="012*******"
                    value={bankAccountNumber}
                    onChangeText={text => setBankAccountNumber(text)}
                />
            </View>
            <View>
                <Text style={styles.emailLBL}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="adeoluadamu@gmail.com"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.emailLBL}>Collection Type</Text>
                <Picker
                    style={styles.dropdown}
                    selectedValue={collectionType}
                    onValueChange={(itemValue, itemIndex) =>
                        setCollectionType(itemValue)
                    }>
                    {
                        collection.map((item, index) =>{
                            return   <Picker.Item key={index} label={item.name} value={item.name} />
                        })
                    }

                </Picker>
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.emailLBL}>Select LGA</Text>
                <Picker
                    style={styles.dropdown}
                    selectedValue={lga}
                    onValueChange={(itemValue, itemIndex) =>
                        setLga(itemValue)
                    }>
                    {
                        lgaList.map((item, index) =>{
                            return   <Picker.Item key={index} label={item.lgaName} value={item.lgaID} />
                        })
                    }

                </Picker>
            </View>
            <View>
                <Text style={styles.emailLBL}>Password</Text>
                <TextInput
                    label="Email"
                    style={styles.input}
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)}  icon="eye"/>}
                />
            </View>
            {errorText !== '' ? (
                <Text style={styles.errorTextStyle}>
                    {errorText}
                </Text>
            ) : null}
            <View>
                <Button
                    title="Sign Up"
                    onPress={() => SignUp()}
                    buttonStyle={styles.button} />
            </View>
            <View>
                <Text style={styles.subtext}>
                    Already have an account?
                    <Text style={styles.signup} onPress={() => navigation.navigate('Login')}>Sign In</Text>
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('screen').height,
        backgroundColor: '#fff',
    },
    image: {
        width: 200,
        height: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 91,
    },
    title:{
        fontSize: 24,
        fontWeight: "700",
        color: '#333',
        marginTop: 20,
        lineHeight: 26,
        letterSpacing: 0,
        textAlign: "center"
    },
    emailLBL: {
        color: '#020614',
        marginTop: 42,
        marginLeft: 24,
        fontSize: 14,
        textAlign: 'left',
        fontStyle: 'normal',
        fontWeight: '400',
    },
    input: {
        width: Dimensions.get('screen').width - 32,
        height: 48,
        top: 14,
        marginTop: 11,
        marginRight: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#09893E',
        backgroundColor: '#fff',
        marginLeft: 16
    },
    button:{
        width: Dimensions.get('screen').width - 32,
        marginTop: 37,
        height: 48,
        marginBottom: 10,
        backgroundColor: '#09893E',
        borderRadius: 8,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    forgot:{
        color: '#C4C4C4',
        fontSize: 12,
        fontStyle: 'normal',
        marginTop: 18,
        marginRight: 31,
        textAlign: 'right',
        fontWeight: '500'
    },
    subtext:{
        color: '#999',
        textAlign: 'center',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        marginBottom: 20
    },
    signup:{
        color: '#09893E',
        fontSize: 14,
        marginLeft: 15,
        paddingLeft: 10,
        fontStyle: 'normal',
        fontWeight: '700'
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
})
