import React, {useState} from "react";
import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Card} from "react-native-paper";
import QR from "../../../assets/icons/qrcode.png";
import {Button} from "react-native-elements";
import {TransportStore} from "../../../store";
import {useForm} from "react-hook-form";
import {useIsFocused} from "@react-navigation/native";

export default function TransportConfirmationScreen({navigation}){
    const [visible, setVisible] = useState(false)
    const paymentInfo = TransportStore.useState()
    const clearAndReset = () => {
        TransportStore.replace({
            emblemType: '',
            plateNo: '',
            phoneNumber: '',
            emblemPrice: '',
            name: '',
            paymentDescription: '',
            paymentPeriod: '',
            paymentMethod: '',
            progress: 0,
        });
        setVisible(false);
        navigation.replace("Step1");
    };
    return (
        <ScrollView style={styles.container}>

            <Card style={styles.card}>
                <Text style={styles.title}>Emblem Details</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 14}}>
                    <Text style={styles.rowLabel}>Ticket Type:</Text>
                    <Text style={styles.rowData}>{paymentInfo.emblemType}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22,}}>
                    <Text style={styles.rowLabel}>Vehicle Plate No:</Text>
                    <Text style={styles.rowData}>{paymentInfo.plateNo}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22,}}>
                    <Text style={styles.rowLabel}>Payment Ref:</Text>
                    <Text style={styles.rowData}></Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22,}}>
                    <Text style={styles.rowLabel}>Payment Method:</Text>
                    <Text style={styles.rowData}>{paymentInfo.paymentMethod}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                    <Text style={styles.rowLabel}>
                        Payment Period:
                    </Text>
                    <Text style={styles.rowData}>{paymentInfo.paymentPeriod}</Text>
                </View>
                {/*<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>*/}
                {/*    <Text style={styles.rowLabel}>Next Payment Date:</Text>*/}
                {/*    <Text style={styles.rowData}></Text>*/}
                {/*</View>*/}
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                    <Text style={styles.rowLabel}>Tax Payer Name:</Text>
                    <Text style={styles.rowData}>{paymentInfo.name}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22, marginBottom: 22}}>
                    <Text style={styles.rowLabel}>Tax Payers Phone No:</Text>
                    <Text style={styles.rowData}>{paymentInfo.phoneNumber}</Text>
                </View>
            </Card>
            <Card style={styles.card}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                    <Text style={styles.amount}>&#8358; {
                        paymentInfo.emblemPrice
                    }</Text>
                    <Text style={styles.labelData}>Payment Amount</Text>
                </View>
            </Card>
            <Image source={QR} style={{width: 128, height: 129, marginLeft: 'auto', marginRight: 'auto'}}/>
            <View>
                <Button
                    title="Make New Payment"
                    titleStyle={styles.btnText}
                    onPress={() => navigation.navigate('Transport', {
                        screen: 'Order'
                    })}
                    buttonStyle={styles.nextBtnStyle} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
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
        marginTop: 10,
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
