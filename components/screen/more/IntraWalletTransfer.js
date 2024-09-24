import React, {useContext, useState} from "react";
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {AuthContext} from "../../../context/AuthContext";
import {Button} from "react-native-elements";

export default function IntraWalletTransfer(){
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [response, setResponse] = useState([])

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
    return(
        <SafeAreaView style={styles.container}>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Wallet</Text>
                <Picker
                    style={styles.dropdown}
                    selectedValue={from}
                    onValueChange={(itemValue, itemIndex) => {
                        setFrom(itemValue)
                    }}>
                    <Picker.Item label="Select Wallet" value=""/>
                    <Picker.Item label="Access" value="Access"/>
                    <Picker.Item label="Fidelity" value="Fidelity"/>
                </Picker>
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Wallet</Text>
                <Picker
                    style={styles.dropdown}
                    selectedValue={to}
                    onValueChange={(itemValue, itemIndex) => {
                        setTo(itemValue)
                    }}>
                    <Picker.Item label="Select Wallet" value=""/>
                    <Picker.Item label="Access" value="Access"/>
                    <Picker.Item label="Fidelity" value="Fidelity"/>
                </Picker>
            </View>
            <View style={{marginTop: 20}}>
                <Button
                    title="Transfer Funds"
                    titleStyle={styles.btnText}
                    onPress={() => {}}
                    buttonStyle={styles.nextBtnStyle}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
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
    }
})
