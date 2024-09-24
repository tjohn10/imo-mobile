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
    ActivityIndicator
} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Button} from "react-native-elements";
import {Card} from "react-native-paper";
import QR from '../../../assets/icons/qrcode.png'
import {AuthStore, MarketStore, TicketStore} from "../../../store";
import * as Print from "expo-print";
import {shareAsync} from "expo-sharing";
import logo from "../../../assets/logo.png";

export default function MarketTicketReceipt({navigation, route}){
    const [loading, setLoading] = useState(false)
    const info = MarketStore.useState()
    const userInfo = AuthStore.useState()
    const paymentInfo = route.params.params

    const html = `
<html lang="html">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" /><title></title>
  </head>
  <body style="text-align: center;">
    <div style="display: flex; justify-content: space-between;margin-top: 10px">
      <h1 style="font-size: 30px; font-family: 'Helvetica Neue',serif; font-weight: 900; margin-left: 10px">
            Payment Receipt
      </h1>
      <img
      src="https://abiapay.net/img/logo.png"
      style="width: 20%; margin-right: 10px"  alt=""
      />
    </div>
    <div style="margin-top: 10px">
        <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Payment Reference:</h3>
            <h5>${paymentInfo.payment_ref}</h5>
        </div>
         <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Market Name:</h3>
            <h5>${info.marketName}</h5>
        </div>  
          <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Shop Number:</h3>
            <h5>${info.shopNumber}</h5>
        </div> 
           <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Zone:</h3>
            <h5>${info.zone}</h5>
        </div> 
        <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Shop Category:</h3>
            <h5>${info.shopCategory}</h5>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Business Type:</h3>
            <h5>${info.businessType}</h5>
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
            <h3>Taxpayers Name:</h3>
            <h5>${info.name}</h5>
        </div>
         <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Taxpayer Phone:</h3>
            <h5>${info.phone}</h5>
        </div>
         <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Payment Period:</h3>
            <h5>${info.paymentPeriod}</h5>
        </div> 
        <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Next Date of Payment:</h3>
            <h5>${info.nextPayment}</h5>
        </div>
         <div style="display: flex; justify-content: space-between; margin: 5px 10px 10px 5px">
            <h3>Payment Method:</h3>
            <h5>${info.paymentMethod}</h5>
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
                            <Text style={styles.title}>Ticket Details</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 14}}>
                                <Text style={styles.rowLabel}>Payment Reference:</Text>
                                <Text style={styles.rowData}>{paymentInfo.payment_ref}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 14}}>
                                <Text style={styles.rowLabel}>Market Name:</Text>
                                <Text style={styles.rowData}>{info.marketName}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22,}}>
                                <Text style={styles.rowLabel}>Shop Number:</Text>
                                <Text style={styles.rowData}>{info.shopNumber}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22,}}>
                                <Text style={styles.rowLabel}>Zone:</Text>
                                <Text style={styles.rowData}>{info.zone}</Text>
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
                                <Text style={styles.rowLabel}>Shop Category:</Text>
                                <Text style={styles.rowData}>{info.shopCategory}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 22}}>
                                <Text style={styles.rowLabel}>Business Type:</Text>
                                <Text style={styles.rowData}>{info.businessType}</Text>
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
                        {/*<Image source={QR} style={{width: 128, height: 129, marginLeft: 'auto', marginRight: 'auto'}}/>*/}
                        <View>
                            <Button
                                title="Make New Payment"
                                titleStyle={styles.btnText}
                                onPress={() => navigation.navigate('Tickets', {
                                    screen: 'Order'
                                })}
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
        marginTop: 18,
        marginBottom: 10,
        marginLeft: 16,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 8,
        backgroundColor: '#fff'
    },
    topText:{
        color: '#071931',
        textAlign: 'center',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22
    },
    title: {
        color: '#071827',
        fontFamily: 'DMSans_500Medium',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        marginTop: 10,
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
    status: {
        color: '#09893E',
        textAlign: 'right',
        marginRight: 17,
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22
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
    amount: {
        color: '#219653',
        textAlign: 'right',
        fontFamily: 'DMSans_700Bold',
        marginRight: 17,
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
        marginLeft: 17,
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
