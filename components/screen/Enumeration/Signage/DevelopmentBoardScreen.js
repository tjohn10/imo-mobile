import React, {useEffect, useState} from "react";
import {SafeAreaView, Text, StyleSheet, ScrollView, View, TextInput, Dimensions} from "react-native";
import {Button} from "react-native-elements";
import {Picker} from "@react-native-picker/picker";
import {FUNNY_API, OTHER_API} from "../../../../config";

export default function DevelopmentBoardScreen({navigation}){
    const [abssin, setAbssin] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [amount, setAmount] = useState('')
    const [paymentPeriod, setPaymentPeriod] = useState()
    const [paymentMethod, setPaymentMethod] = useState()
    const [collectionType, setCollectionType] = useState([])
    const [meter, setMeter] = useState()
    const [type, setType] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getCollectionType()
    }, []);

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
    const getUserData = () => {
        setLoading(true)
        fetch(`${OTHER_API}fetchUserData`, {
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "userType": 'Individual',
                    "userID": abssin
                }
            ),
            method: 'POST'
        }).then((res)  => res.json())
            .then((resJson) => {
                setLoading(false)
                setName(resJson.TaxpayerName)
                setPhone(resJson.TaxpayerPhone)
                setEmail(resJson.TaxpayerEmail)
            })
    }
    return(
        <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Area in SQM</Text>
                <Picker
                    style={styles.dropdown}
                    selectedValue={meter}
                    onValueChange={(itemValue, itemIndex) =>
                        setMeter(itemValue)
                    }>
                    <Picker.Item label="Select Area" value="" />
                    <Picker.Item label="Wall Drapes/Banners" value="Wall Drapes/Banners" />
                    <Picker.Item label="Parasols" value="smallshop" />
                    <Picker.Item label="Flags" value="Flags" />
                    <Picker.Item label="Gazebos" value="Gazebos" />
                    <Picker.Item label="Feathers" value="Feathers" />
                    <Picker.Item label="T-Shirts" value="T-Shirts" />
                    <Picker.Item label="City Walker" value="City Walker" />
                    <Picker.Item label="Floor Mats" value="Floor Mats" />
                    <Picker.Item label="Trolleys" value="Trolleys" />
                    <Picker.Item label="Kiosks" value="Kiosks" />
                    <Picker.Item label="Road Shows (Bulk Applications)" value="Road Shows (Bulk Applications)" />
                    <Picker.Item label="Road Shows (Bulk Applications + POS)" value="Road Shows (Bulk Applications + POS)" />
                </Picker>
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Abssin</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Zone/Line"
                    placeholderTextColor="#C4C4C4"
                    value={abssin}
                    maxLength={8}
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    onChangeText={text => setAbssin(text)}
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
                <Text style={styles.label}>Taxpayer Phone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Taxpayer Phone"
                    placeholderTextColor="#C4C4C4"
                    value={phone}
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    onChangeText={text => setPhone(text)}
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
                    onChangeText={text => setEmail(text)}
                />
            </View>

            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    placeholderTextColor="#C4C4C4"
                    value={amount}
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    onChangeText={text => setAmount(text)}
                />
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Payment Duration</Text>
                <Picker
                    style={styles.dropdown}
                    selectedValue={paymentPeriod}
                    onValueChange={(itemValue, itemIndex) =>
                        setPaymentPeriod(itemValue)
                    }>
                    <Picker.Item label="Daily" value="Daily" />
                    <Picker.Item label="Weekly" value="Weekly" />
                    <Picker.Item label="Annually" value="Annually" />
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
                    title="Pay Now"
                    titleStyle={styles.btnText}
                    onPress={() => {}}
                    buttonStyle={styles.nextBtnStyle} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
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
    }
})

