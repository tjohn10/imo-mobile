import React, {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {AuthStore, TransportStore} from "../../../store";
import {useIsFocused} from "@react-navigation/native";
import {ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Card, Modal, PaperProvider, Portal} from "react-native-paper";
import {Button} from "react-native-elements";
import Moment from "moment";
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";
import {AuthContext} from "../../../context/AuthContext";
import {MOBILE_API} from "../../../config";

export default function TransportSummaryScreen({navigation}){
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState([])
    const [visible, setVisible] = useState(false)
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ defaultValues: TransportStore.useState((s) => s) });
    const isFocused = useIsFocused();

    const info = TransportStore.useState()
    const userInfo = AuthStore.useState()
    const {userToken} = useContext(AuthContext)
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = {backgroundColor: 'white', padding: 20,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 10,
        marginLeft: 16}
    ;


    console.log(info)
    const onSubmit = async () => {
        showModal()
        setLoading(true)
        await fetch(`${MOBILE_API}transport/create-transport-emblem`,{
            headers: {
                Authorization: "Bearer" + userToken,
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({
                "customer_name": info.name,
                "rev_head": "string",
                "refcode": "string",
                "rev_code": "string",
                "customer_email": info.email,
                "description": info.paymentDescription,
                "payment_recipient_id": "string",
                "site_id": 1,
                "email": info.email,
                "trans_date": Moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                "trans_ref": "string",
                "amount": info.emblemPrice,
                "site_name": "string",
                "product_code": info.emblemType,
                "payment_method": info.paymentMethod,
                "payment_ref": "string",
                "payment_period": info.paymentPeriod,
                "next_date": Moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                "plate_number": info.plateNo,
                "lga": 1
            })
        }).then((res) => res.json())
            .then((resJson) => {
                setLoading(false)
                setResponse(resJson)
                console.log(resJson)
            })

    };
    return (
        <ScrollView style={styles.container}>
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        {
                            loading ? <ActivityIndicator color="#09893E" size="large" /> : (
                                <View style={{marginTop: 10, marginLeft: 16}}>
                                    {
                                        response.status === true ? (
                                            <View>
                                                <Image style={{
                                                    width:100,
                                                    height:100,
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    marginTop: 6,
                                                    marginBottom: 6,
                                                }} source={success} />
                                                <Text style={{fontWeight: '700'}}>{response.message}</Text>
                                                <Text style={{fontWeight: '700'}}>REF: {response.payment_ref}</Text>
                                                <Text style={{fontWeight: '700'}}>Valid For: {info.paymentPeriod}</Text>
                                                <Text style={{fontWeight: '700'}}>Payment For: {info.emblemType}</Text>
                                                <Text style={{fontWeight: '700'}}>Payment For: {info.emblemPrice}</Text>
                                                <Button
                                                    title="Show Receipt"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.navigate("Done", {params: response})}
                                                    buttonStyle={styles.modalButton} />
                                                <Button
                                                    title="Create New"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.navigate("Order")}
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
                                                <Text>{response.response_message}</Text>
                                                <Button
                                                    title="Try Again"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.goBack()}
                                                    buttonStyle={styles.modalButton} />
                                            </View>
                                        )
                                    }

                                </View>
                            )
                        }
                    </Modal>
                </Portal>

                <View style={{marginTop: 16}}>
                <Card style={styles.card}>
                    <Text style={styles.title}>Emblem Details</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 14}}>
                        <Text style={styles.rowLabel}>Emblem Type:</Text>
                        <Text style={styles.rowData}>{info.emblemType}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                        <Text style={styles.rowLabel}>Vehicle Plate No:</Text>
                        <Text style={styles.rowData}>{info.plateNo}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                        <Text style={styles.rowLabel}>Payment Method:</Text>
                        <Text style={styles.rowData}>{info.paymentMethod}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                        <Text style={styles.rowLabel}>Tax Payer Name:</Text>
                        <Text style={styles.rowData}>{info.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22, marginBottom: 22}}>
                        <Text style={styles.rowLabel}>Tax Payers Phone No:</Text>
                        <Text style={styles.rowData}>{info.phoneNumber}</Text>
                    </View>
                </Card>
                <Card style={styles.card}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                        <Text style={styles.amount}>&#8358; {
                            info.emblemPrice
                        }</Text>
                        <Text style={styles.labelData}>Payment Amount</Text>
                    </View>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.reminderTitle}>Collection Reminder:</Text>
                    <Text style={styles.reminderText}>
                        Kindly ensure that cash has been collected from TaxPayer before completing this Transaction as
                        your Wallet will be debited for the collection amount.
                    </Text>
                </Card>
            </View>
            <View>
                <Button
                    title="Proceed to Payment"
                    titleStyle={styles.btnText}
                    onPress={handleSubmit(onSubmit)}
                    buttonStyle={styles.nextBtnStyle} />
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
    card: {
        marginTop: 18,
        marginBottom: 10,
        marginLeft: 16,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 8,
        backgroundColor: '#fff'
    },
    title: {
        color: '#071827',
        fontFamily: 'DMSans_500Medium',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        marginLeft: 17,
        lineHeight: 22
    },
    rowLabel: {
        color: '#979797',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        marginLeft: 17,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    rowData: {
        color: '#071827',
        textAlign: 'right',
        marginRight: 17,
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    amount: {
        color: '#219653',
        textAlign: 'right',
        fontFamily: 'DMSans_700Bold',
        marginLeft: 17,
        padding: 10,
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 16
    },
    labelData: {
        color: '#071827',
        fontFamily: 'DMSans_500Medium',
        fontSize: 14,
        padding: 10,
        marginRight: 17,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 22
    },
    modalButton: {
        width: 300,
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
    reminderTitle:{
        color: '#071827',
        padding: 12,
        fontFamily: 'DMSans_500Medium',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 22
    },
    reminderText:{
        color: '#FD0D1B',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        padding: 10,
        fontWeight: '400',
        lineHeight: 18
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
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
        fontWeight: '700'
    }
})
