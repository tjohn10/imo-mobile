import React, {useContext, useEffect, useState} from "react";
import {View, StyleSheet, Text, TextInput, Dimensions, SafeAreaView, ActivityIndicator, Image} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Button} from "react-native-elements";
import {AuthContext} from "../../../context/AuthContext";
import {merchant_key, MOBILE_API} from "../../../config";
import {Modal, PaperProvider, Portal} from "react-native-paper";
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";


export default function BankTransferScreen({navigation}){
    const [bank, setBank] = useState();
    const [wallet, setWallet] = useState()
    const [account, setAccount] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [banks, setBanks] = useState([]);
    const [response, setResponse] = useState([]);
    const [visible, setVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = {
            backgroundColor: 'white', padding: 20,
            width: Dimensions.get('screen').width - 32,
            borderRadius: 10,
            marginLeft: 16
        }
    ;

    const {userToken} = useContext(AuthContext)
    const getBanks = () => {
        fetch(`${MOBILE_API}banks`, {
            method: 'POST',
            headers: {
                "accept": "application/json",
                "authorization": "Bearer" + userToken,
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
            .then((responseJson) => {
                setBanks(responseJson.response_data)
            })
    }
    const transferFund = async () => {
        if (wallet === 'Access'){
            showModal()
            setLoading(true)
            await fetch(`${MOBILE_API}wallet/access-wallet-to-bank-transfer`, {
                headers: {
                    "accept": "application/json",
                    "authorization": "Bearer" + userToken,
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify({
                    "merchant_key": merchant_key,
                    "bank_code": bank || '044',
                    "bank_account": account || accountDetails.wallet_id,
                    "amount": amount,
                    "desc": description || 'Wallet Transfer'
                })
            }).then((res) => res.json())
                .then((responseJson) => {
                    setLoading(false)
                    setResponse(responseJson)
                    console.log(responseJson)
                })
        } else if( wallet === 'Fidelity') {
            showModal()
            setLoading(true)
            await fetch(`${MOBILE_API}wallet/fidelity-wallet-to-bank-transfer`, {
                headers: {
                    "accept": "application/json",
                    "authorization": "Bearer" + userToken,
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify({
                    "merchant_key": merchant_key,
                    "bank_code": bank,
                    "bank_account": account,
                    "amount": amount,
                    "desc": description
                })
            }).then((res) => res.json())
                .then((responseJson) => {
                    setLoading(false)
                    setResponse(responseJson)
                    console.log(responseJson)
                })
        }
    }
    useEffect(() => {
        getBanks()
    }, []);
    return(
        <SafeAreaView style={styles.container}>
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} dismissable={false} onDismiss={hideModal}
                           contentContainerStyle={containerStyle}>
                        {
                            loading ? <ActivityIndicator color="#09893E" size="large"/> : (
                                <View style={{marginTop: 10, marginLeft: 16}}>
                                    {
                                        response.response_code === '00' ? (
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
                                                    textAlign: 'center'
                                                }}>{'Payment Successful' || response.message}</Text>
                                                <Button
                                                    title="Back to Menu"
                                                    type="outline"
                                                    titleStyle={styles.newBtnText}
                                                    onPress={() => navigation.goBack()}
                                                    buttonStyle={styles.modalNewButton}/>
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
                                                <Text>{response.response_message || response.message}</Text>
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
                <View>
                    <View style={{marginTop: 5}}>
                        <Text style={styles.label}>Wallet</Text>
                        <Picker
                            style={styles.dropdown}
                            selectedValue={wallet}
                            onValueChange={(itemValue, itemIndex) => {
                                setWallet(itemValue)
                            }}>
                            <Picker.Item label="Select Wallet" value=""/>
                            <Picker.Item label="Access" value="Access"/>
                            <Picker.Item label="Fidelity" value="Fidelity"/>
                        </Picker>
                    </View>

                    <View style={{marginTop: 5}}>
                        <Text style={styles.label}>Bank</Text>
                        <Picker
                            style={styles.dropdown}
                            selectedValue={bank}
                            onValueChange={(itemValue, itemIndex) => {
                                setBank(itemValue)
                            }}>
                            <Picker.Item label="Select Bank" value=""/>
                            {
                                banks.map((item, index) => {
                                    return <Picker.Item key={index} label={item.name} value={item.code}/>
                                })
                            }
                        </Picker>
                    </View>
                    <View style={{marginTop: 5}}>
                        <Text style={styles.label}>Account Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Account Number"
                            placeholderTextColor="#C4C4C4"
                            value={account}
                            keyboardType="phone-pad"
                            returnKeyType="next"
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                            maxLength={10}
                            onChangeText={text => setAccount(text)}
                        />
                    </View>
                    <View style={{marginTop: 5}}>
                        <Text style={styles.label}>Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Amount"
                            placeholderTextColor="#C4C4C4"
                            value={amount.toString()}
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
                            title="Process Transfer"
                            titleStyle={styles.btnText}
                            onPress={transferFund}
                            buttonStyle={styles.nextBtnStyle}/>
                    </View>
                </View>
            </PaperProvider>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
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
})
