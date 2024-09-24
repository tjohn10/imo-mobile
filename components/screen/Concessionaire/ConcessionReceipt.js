import React, {useEffect, useState} from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    Text,
    TextInput,
    Image,
    ScrollView,
    ActivityIndicator, Alert
} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Button} from "react-native-elements";
import {Card} from "react-native-paper";
import {AuthStore, ConcessionStore} from "../../../store";
import Moment from "moment";
import logo from '../../../assets/logo.png'
import * as Print from "expo-print";
import {shareAsync} from "expo-sharing";
import QRCode from 'react-native-qrcode-svg';

export default function ConcessionReceipt({navigation, route}){
    const [loading, setLoading] = useState(false)
    const info = ConcessionStore.useState()
    const userInfo = AuthStore.useState()
    const paymentInfo = route.params.params
    const qrValue = `https://abia.abssin.com/receipt?PaymentRef=${paymentInfo.payment_ref}`

    const html = `
<html lang="html">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" /><title></title>
  </head>
  <body style="text-align: center;"> <div style="margin-top: 20px">
        <div style="display: inline-flex;
            border-radius: 8px;
            background: #E8FCF0;
            height: 90px;
            padding: 48px 24px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;"
        >
            <img
          src="https://imostate.tax/assets/img/bank.jpg"
          style="width: 46px; height: 51px; margin-right: auto; margin-left: auto"  alt=""
          />
          <h1 style="color: #071931;
            text-align: right;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 22px;"
            >
                Payment Receipt
          </h1>
        </div>
    </div>
    <div style="display: inline-flex;
        height: 60px;
        margin-top: -15px;
        border-radius: 8px;
        background: #FFF;
        padding: 24px 12px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;"
        >
             <div>
                <span>
                    <h3 style="color: #09893E; text-align: center; font-size: 24px; font-style: normal; font-weight: 700; line-height: 28px;">&#8358;${info.amount}</h3>
                    <h5 style="color: #071931;
                    text-align: center;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 22px;">
                    Success 🚀
                    </h5>
                </span>
              
            </div>

    </div>
     <div style="margin-top: 10px; width: 350px; justify-content: center; align-items: center; text-align: center; margin-left: auto; margin-right: auto">
        <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Ticket Type:</h3>
            <h5>${info.ticketType}</h5>
        </div>
         <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Taxpayer Name:</h3>
            <h5>${info.name}</h5>
        </div>  
          <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Taxpayer Phone Number:</h3>
            <h5>${info.phoneNumber}</h5>
        </div> 
           <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Plate Number:</h3>
            <h5>${info.plateNo}</h5>
        </div> 
        <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Payment Reference:</h3>
            <h5>${paymentInfo.payment_ref}</h5>
        </div>
         <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Amount:</h3>
            <h5>${info.amount}</h5>
        </div>
         <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Payment Period:</h3>
            <h5>${info.paymentPeriod}</h5>
        </div>  
         <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Agent Name:</h3>
            <h5>${userInfo.name}</h5>
        </div> 
          <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Agent Phone:</h3>
            <h5>${userInfo.phone}</h5>
        </div> 
        <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Next Date of Payment:</h3>
            <h5>${paymentInfo.next_expiration_date}</h5>
        </div>
         <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Payment Method:</h3>
            <h5>${info.paymentMethod}</h5>
        </div>
        <div style="display: flex; justify-content: space-evenly; text-align: center; margin: 15px 0 5px 0">
            <h3 style="color: #09893E">Support:</h3>
            <h5>09132222180, 09022888488</h5>
        </div>
        
    </div>
  </body>
</html>
`;
    const printToFile = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({ html });
        // Alert.alert('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };

    return (
        <ScrollView style={styles.container}>
            {
                loading ? <ActivityIndicator color="#09893E" size="large" /> : (
                    <View>
                        <View>
                            <Card style={styles.topCard}>
                                <Image style={{
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    width: 46,
                                    height: 51
                                }} source={logo}/>
                                <Text style={styles.topText}>Transaction Receipt</Text>
                            </Card>
                        </View>
                        <Card style={styles.amountCard}>
                            <View>
                                <Text style={styles.amount}>&#8358; {
                                    info.amount
                                }</Text>
                                <Text style={styles.labelData}>Success 🚀</Text>
                            </View>
                        </Card>
                        <Card style={styles.card}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 14}}>
                                <Text style={styles.rowLabel}>Transaction Status:</Text>
                                <Text style={styles.status}>Completed</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 14}}>
                                <Text style={styles.rowLabel}>Ticket Type:</Text>
                                <Text style={styles.rowData}>{info.tonnage}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 14}}>
                                <Text style={styles.rowLabel}>Total Number:</Text>
                                <Text style={styles.rowData}>{info.totalNumber}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                                <Text style={styles.rowLabel}>Vehicle Plate No:</Text>
                                <Text style={styles.rowData}>{info.plateNumber}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                                <Text style={styles.rowLabel}>Payment Ref:</Text>
                                <Text style={styles.rowData}>{paymentInfo.payment_ref}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22,}}>
                                <Text style={styles.rowLabel}>Payment Method:</Text>
                                <Text style={styles.rowData}>{info.paymentMethod}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                                <Text style={styles.rowLabel}>
                                    Payment Period:
                                </Text>
                                <Text style={styles.rowData}>{info.paymentPeriod}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                                <Text style={styles.rowLabel}>Next Payment Date:</Text>
                                <Text style={styles.rowData}>{paymentInfo.next_expiration_date}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                                <Text style={styles.rowLabel}>Agent Name:</Text>
                                <Text style={styles.rowData}>{userInfo.name}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                                <Text style={styles.rowLabel}>Agent Phone:</Text>
                                <Text style={styles.rowData}>{userInfo.phone}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                                <Text style={styles.rowLabel}>Tax Payer Name:</Text>
                                <Text style={styles.rowData}>{info.name}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22, marginBottom: 22}}>
                                <Text style={styles.rowLabel}>Tax Payers Phone No:</Text>
                                <Text style={styles.rowData}>{info.phone}</Text>
                            </View>
                        </Card>
                        <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
                            <QRCode
                                size={150}
                                value={qrValue}
                            />
                        </View>
                        {/*<Image source={QR} style={{width: 128, height: 129, marginLeft: 'auto', marginRight: 'auto'}}/>*/}
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16}}>
                            <Button
                                title="Make New Payment"
                                titleStyle={styles.btnText}
                                onPress={() => navigation.navigate('All')}
                                buttonStyle={styles.nextBtnStyle} />
                            <Button
                                title="Share Receipt"
                                titleStyle={styles.btnText}
                                onPress={printToFile}
                                buttonStyle={styles.nextBtnStyle} />
                        </View>
                    </View>
                )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    card: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 16,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 8,
        backgroundColor: '#fff'
    },
    amountCard: {
        marginTop: 3,
        marginBottom: 3,
        marginLeft: 16,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 8,
        backgroundColor: '#fff'
    },
    topCard:{
        marginTop: 26,
        width: Dimensions.get('screen').width - 40,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        backgroundColor: '#E8FCF0',
        borderRadius: 8,
        padding: 24
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
    topText:{
        color: '#071931',
        textAlign: 'center',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
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
    status: {
        color: '#09893E',
        textAlign: 'right',
        marginRight: 17,
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22
    },
    amount: {
        color: '#09893E',
        textAlign: 'center',
        fontFamily: 'DMSans_700Bold',
        marginRight: 17,
        padding: 10,
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 28
    },
    labelData: {
        color: '#071827',
        fontFamily: 'DMSans_500Medium',
        fontSize: 14,
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: '500',
        padding: 5,
        lineHeight: 22
    },
    nextBtnStyle: {
        width: 150,
        height: 80,
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
