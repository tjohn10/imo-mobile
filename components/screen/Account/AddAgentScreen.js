import React, {useEffect, useState} from "react";
import {Text, StyleSheet, View, TextInput, Dimensions, Alert} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {Button} from "react-native-elements";

export default function AddAgentScreen(){
    const [firstName, setFirstName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [bvn, setBVN] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [lga, setLga] = useState()
    const [collectionType, setCollectionType] = useState()
    const [loading , setLoading] = useState(null)
    const [data, setData] = useState([])

    useEffect(() => {
        getCollectionType()
        getLga()
    }, []);
    const RegisterAgent = () => {
        const url = 'https://portalapi.sandbox.abiapay.com/api/v1/agent/signup'
        setLoading(true)
        fetch(url, {
                method: "POST",
                headers:{
                    "X-IBM-Client-Id": "26e9ccd3bc07c0dc1627609afcf4699d",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastname,
                    email: email,
                    password: password,
                    lga: lga,
                    bvn: bvn,
                    collection_type: collectionType
                })
            }).then((response) => response.json())
            .then((responseJson) => {
                setLoading(false)
                setData(responseJson.data)
            })
            .catch((e) => {
                console.log(e)
                Alert.alert('Error Processing request', e.message)
            })
    }
    const getLga = () => {
        fetch('https://rgw.awtom8.africa/abia/sandbox/v1',{
            headers:{
                'X-IBM-Client-Id': '26e9ccd3bc07c0dc1627609afcf4699d'
            },
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setLga(responseJson.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }
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
    return(
        <View style={styles.container}>
            <Text style={styles.addTitle}>
                Add Agent
            </Text>
            <View>
                <TextInput
                    label="Firstname"
                    style={styles.input}
                    placeholder="Firstname"
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                />
                <TextInput
                    label="lastname"
                    style={styles.input}
                    placeholder="Lastname"
                    value={lastname}
                    onChangeText={text => setLastname(text)}
                />
                <TextInput
                    label="BVN"
                    style={styles.input}
                    placeholder="BVN"
                    value={bvn}
                    onChangeText={text => setBVN(text)}
                />
                <TextInput
                    label="Email"
                    style={styles.input}
                    placeholder="email@email.com"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    label="Phone Number"
                    style={styles.input}
                    placeholder="080XXXXXXXX"
                    value={phone}
                    onChangeText={text => setPhone(text)}
                />
            </View>
            <Picker
                style={styles.input}
                selectedValue={lga}
                onValueChange={(itemValue, itemIndex) =>
                    setLga(itemValue)
                }>
                <Picker.Item label="Select LGA" value="" />
                <Picker.Item label="Aba North" value="aba_north" />
                <Picker.Item label="Aba South" value="aba_south" />
                <Picker.Item label="Isiala Ngwa North" value="isiala_ugwa_north" />
                <Picker.Item label="Isiala Ngwa South" value="isiala_ugwa_south" />
                <Picker.Item label="Ukwa West" value="ukwa_west" />
            </Picker>
            <Picker
                style={styles.input}
                selectedValue={collectionType}
                onValueChange={(itemValue, itemIndex) =>
                    setCollectionType(itemValue)
                }>
                <Picker.Item label="Select Collection Type" value="" />
                <Picker.Item label="Aba North" value="aba_north" />
                <Picker.Item label="Aba South" value="aba_south" />
            </Picker>
            <View>
                <TextInput
                    label="Password"
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
            </View>
            <View>
                <Button
                    title="Register Agent"
                    onPress={RegisterAgent}
                    buttonStyle={styles.button} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    addTitle:{
        color: '#071931',
        fontFamily: 'DMSans_700Bold',
        fontSize: 16,
        marginLeft: 16,
        marginTop: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 24
    },
    input: {
        width: Dimensions.get('screen').width - 32,
        height: 48,
        top: 14,
        marginTop: 11,
        marginRight: 16,
        borderRadius: 8,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 24,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: '#E1E1E1',
        marginLeft: 18
    },
    button:{
        width: Dimensions.get('screen').width - 32,
        marginTop: 40,
        height: 48,
        backgroundColor: '#09893E',
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})
