import React, {useEffect, useState} from "react";
import {
    ActivityIndicator,
    Dimensions, FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput, TouchableOpacity,
    View
} from "react-native";
import {Button} from "react-native-elements";
import QR from '../../../assets/icons/img.png'
import sync from '../../../assets/icons/sync.png'
import {Picker} from "@react-native-picker/picker";
import {AuthStore} from "../../../store";
import {Card, Modal, PaperProvider, Portal} from "react-native-paper";
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";
import {OTHER_API} from "../../../config";

export default function VerifyTicketScreen({navigation}) {
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [referenceType, setReferenceType] = useState()
    const [referenceId, setReferenceId] = useState(" ")
    const [response, setResponse] = useState([])
    const [status, setStatus] = useState("INACTIVE")
    const [visible, setVisible] = React.useState(false);

    const userInfo = AuthStore.useState()
    const submit = () => {
        setLoading(true)
        fetch(`${OTHER_API}verifyTicket`, {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                agentEmail: userInfo.email,
                referenceID: referenceId
            })
        })
            .then((res) => res.json())
            .then((resJson) => {
                setLoading(false)
                setResponse(resJson)
                setVisible(true)
                if (resJson.response_code === '00') {
                    setStatus('ACTIVE')
                } else {
                    setStatus('INACTIVE')
                }
                console.log(resJson)
            })
    }
    useEffect(() => {
        navigation.addListener('focus', () => {
            setStatus('')
            setReferenceId('')
            setResponse([])
        })
    }, [navigation]);
    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Select Reference Type</Text>
                <Picker
                    style={styles.dropdown}
                    selectedValue={referenceType}
                    onValueChange={(itemValue, itemIndex) =>
                        setReferenceType(itemValue)
                    }>
                    <Picker.Item label="Plate Number" value="Plate Number"/>
                    <Picker.Item label="Payment Reference" value="Payment reference"/>
                </Picker>
            </View>

            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Enter Reference</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Reference Number"
                    placeholderTextColor="#C4C4C4"
                    value={referenceId}
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    onChangeText={text => setReferenceId(text)}
                />
            </View>
            <View>
                {
                    loading ? <ActivityIndicator size="small" color="#09893E"/> : (
                        <Button
                            title="Verify Ticket"
                            onPress={submit}
                            buttonStyle={styles.button}/>
                    )
                }

            </View>
            {
                visible === false ? null: (
                    <TouchableOpacity>
                        <Card style={styles.card}>
                            <Card.Content>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={styles.ref}>{referenceId} - {response.driver_phone}</Text>
                                    <Text style={styles.qrText}>{response.no_of_days} </Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={styles.qrText}>{response.response_message} ₦({response.ticket_rate})</Text>
                                    <Text style={styles.type}>{response.vehicle_type}</Text>

                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={styles.qrText}>Ref:{response.last_ticket_ref}</Text>
                                    <Text   style={{
                                        backgroundColor: status === 'ACTIVE' ? 'green' : 'red',
                                        color: '#ffffff',
                                        fontFamily: 'DMSans_700Bold',
                                        padding: 5,
                                        fontSize: 12,
                                        borderRadius: 8,
                                        textAlign: 'right',
                                        fontStyle: 'normal',
                                        fontWeight: '600',
                                        lineHeight: 22
                                    }}>{status}</Text>
                                </View>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )
            }

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFC'
    },
    title: {
        fontSize: 24,
        color: '#071931',
        fontStyle: 'normal',
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 25,
        lineHeight: 32
    },
    card: {
        marginTop: 18,
        marginBottom: 10,
        marginLeft: 16,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 8,
        backgroundColor: '#fff'
    },
    select: {
        color: '#071931',
        marginTop: 25,
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'DMSans_700Bold',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 32
    },
    label: {
        marginTop: 25,
        marginLeft: 16,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    input: {
        width: Dimensions.get("screen").width - 32,
        height: 48,
        top: 14,
        padding: 10,
        marginTop: 11,
        fontWeight: '600',
        marginRight: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#09893E',
        marginLeft: 16
    },
    dropdown: {
        width: Dimensions.get("screen").width - 32,
        height: 48,
        top: 14,
        marginTop: 11,
        marginRight: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#09893E',
        backgroundColor: '#EAFFF3',
        marginLeft: 16
    },
    button: {
        width: Dimensions.get("screen").width - 32,
        marginTop: 47,
        height: 48,
        backgroundColor: '#09893E',
        borderRadius: 8,
        marginLeft: 16,
        marginRight: 16
    },
    verify: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700'
    },
    qrText: {
        color: '#000',
        marginLeft: 11,
        marginTop: 5,
        textAlign: 'left',
        fontFamily: 'DMSans_400Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    type: {
        color: '#000',
        marginTop: 5,
        textAlign: 'right',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    status: {
        backgroundColor: '#09893E',
        color: '#fff',
        fontFamily: 'DMSans_700Bold',
        padding: 5,
        fontSize: 12,
        borderRadius: 8,
        textAlign: 'right',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22
    },
    ref: {
        color: '#000',
        marginLeft: 10,
        marginTop: 5,
        textAlign: 'left',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    syncImg: {
        width: 60,
        height: 60,
        marginTop: 11,
        marginLeft: Dimensions.get('screen').width / 2 - 30,
        justifyContent: "center"
    }
})
