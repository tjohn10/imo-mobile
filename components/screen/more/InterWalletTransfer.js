import React, {useContext, useEffect, useState} from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Button} from "react-native-elements";
import RecentTransfersScreen from "./transfer/RecentTransfersScreen";
import BeneficiaryScreen from "./transfer/BeneficiaryScreen";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {merchant_key, MOBILE_API} from "../../../config";
import {AuthContext} from "../../../context/AuthContext";
import {Modal, PaperProvider, Portal} from "react-native-paper";
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";

const Tab = createMaterialTopTabNavigator()
export default function InterWalletTransfer({navigation}){
    const [wallet, setWallet] = useState()
    const [walletId, setWalletId] = useState('')
    const [accessAmount, setAccessAmount] = useState('')
    const [fidelityAmount, setFidelityAmount] = useState('')
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState('')
    const [response, setResponse] = useState([])
    const [visible, setVisible] = useState(false)

    const options = {  maximumFractionDigits: 2   }
    const {userToken} = useContext(AuthContext)

    const getWalletDetails = async () => {
        setLoading(true);
        const url = `${MOBILE_API}dashboard/data`;
        await fetch(url, {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: "Bearer" + userToken,
            },
            method: "POST",
        })
            .then((res) => res.json())
            .then((responseJson) => {
                setLoading(false);
                setAccessAmount(responseJson.access.wallet_balance);
                setFidelityAmount(responseJson.fidelity.balance)
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 10,
        marginLeft: 16}
    ;

    useEffect(() => {
        getWalletDetails()
    }, []);
    const processTransfer = async () => {
        console.log(wallet)
        console.log(amount)
        console.log(wallet)
        if (wallet === 'access'){
            showModal()
            setLoading(true)
            await fetch(`${MOBILE_API}wallet/access-wallet-to-wallet-transfer`,{
                headers: {
                    'accept': 'application/json',
                    Authorization: "Bearer" + userToken,
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify({
                    "merchant_key": merchant_key,
                    "recipient_wallet_no": walletId,
                    "amount": parseInt(amount),
                    "desc": "string"
                })
            }).then((res) => res.json())
                .then((responseJson) => {
                    setLoading(false)
                    setResponse(responseJson)
                    console.log(responseJson, 'wallet transfer')
                })
        } else if ( wallet === 'fidelity') {
            showModal()
            setLoading(true)
            await fetch(`${MOBILE_API}wallet/fidelity-wallet-to-wallet-transfer`,{
                headers: {
                    'accept': 'application/json',
                    Authorization: "Bearer" + userToken,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    "merchant_key": merchant_key,
                    "recipient_wallet_no": walletId,
                    "amount": amount,
                    "desc": description
                })
            }).then((res) => res.json())
                .then((responseJson) => {
                    setLoading(false)
                    setResponse(responseJson)
                    console.log(responseJson, 'wallet transfer')
                })
        }
    }
    // const accessTransfer = () => {
    //
    // }
    return(
        <ScrollView style={styles.container}>
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} dismissable={false} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        {
                            loading ? <ActivityIndicator color="#09893E" size="large" /> : (
                                <View style={{marginTop: 10, marginLeft: 16}}>
                                    {
                                        response.response_code === '00' ? (
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
                                                    title="Done"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.navigate('More')}
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
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Wallet</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={wallet}
                        onValueChange={(itemValue, itemIndex) => {
                            setWallet(itemValue)
                        }}>
                        <Picker.Item label="Select Wallet" value=""/>
                        <Picker.Item label={'Access - ' + Intl.NumberFormat("en-US",options).format(accessAmount)} value="access"/>
                        <Picker.Item label={"Fidelity - " + Intl.NumberFormat("en-US",options).format(fidelityAmount)} value="fidelity"/>
                    </Picker>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Wallet ID</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Wallet ID"
                        placeholderTextColor="#C4C4C4"
                        value={walletId}
                        keyboardType="phone-pad"
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        maxLength={10}
                        onChangeText={text => setWalletId(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        placeholderTextColor="#C4C4C4"
                        value={amount}
                        keyboardType="numeric"
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onChangeText={text => setAmount(text)}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        placeholderTextColor="#C4C4C4"
                        value={description}
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        onChangeText={text => setDescription(text)}
                    />
                </View>

                <View style={{marginTop: 20}}>
                    <Button
                        title="Transfer Funds"
                        titleStyle={styles.btnText}
                        onPress={processTransfer}
                        buttonStyle={styles.nextBtnStyle}/>
                </View>
            </PaperProvider>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    modalButton: {
        width: 260,
        marginRight: 'auto',
        marginLeft: 'auto',
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
        marginRight: 'auto',
        marginLeft: 'auto',
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
    btnText: {
        color: '#fff',
        fontFamily: 'DMSans_400Regular',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    input: {
        width: Dimensions.get('screen').width - 32,
        color: '#000',
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
    }
})
