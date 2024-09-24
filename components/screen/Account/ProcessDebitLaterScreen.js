import React, {useContext, useState} from "react";
import {ActivityIndicator, Alert, Dimensions, Image, ScrollView, Share, StyleSheet, Text, View} from "react-native";
import {Card, Divider, Modal, PaperProvider, Portal} from "react-native-paper";
import {Button} from "react-native-elements";
import Moment from "moment/moment";
import {AuthStore, TicketStore} from "../../../store";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import QRCode from "react-native-qrcode-svg";
import {MOBILE_API} from "../../../config";
import {AuthContext} from "../../../context/AuthContext";
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";


export default function ProcessDebitLaterScreen({navigation, route}){
    const transactionDetails = route.params.params.item
    const qrValue = `https://abia.abssin.com/receipt?PaymentRef=${transactionDetails.payment_ref}`
    const [selectedPrinter, setSelectedPrinter] = useState();
    const [payResponse, setPayResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = {
            backgroundColor: 'white', padding: 20,
            width: Dimensions.get('screen').width - 32,
            borderRadius: 10,
            marginLeft: 16
        }
    ;
    const userInfo = AuthStore.useState()
    const {userToken} = useContext(AuthContext)
    const html = `
<html lang="html">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" /><title></title>
  </head>
  <body style="text-align: center;">
    <div style="margin-top: 10px">
        <div style="display: inline-flex;
            border-radius: 8px;
            background: #E8FCF0;
            height: 80px;
            padding: 48px 24px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;"
        >
            <img
          src="https://dailypost.ng/wp-content/uploads/2023/04/Collage-Maker-10-Apr-2023-02-51-PM-8619-scaled.jpg"
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
                    <h3 style="color: #09893E; text-align: center; font-size: 24px; font-style: normal; font-weight: 700; line-height: 28px;">&#8358;${transactionDetails.amount}</h3>
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
    
    
  
    <div style="width: 350px; margin-top: -15px; justify-content: center; align-items: center; text-align: center; margin-left: auto; margin-right: auto">
        <div style="display: flex; justify-content: space-between; ">
            <h3>Transaction Status:</h3>
            <h5 style="color: #09893E;
                text-align: right;
                font-size: 12px;
                font-style: normal;
                font-weight: 500;
                line-height: 22px;"
                >
                ${transactionDetails.status}
            </h5>
        </div>
         <div style="display: flex; justify-content: space-between; ">
            <h3>Plate Number:</h3>
            <h5>${transactionDetails.trans_ref}</h5>
        </div> 
        <div style="display: flex; justify-content: space-between; ">
            <h3>Payment Reference:</h3>
            <h5>${transactionDetails.payment_ref}</h5>
        </div>
         <div style="display: flex; justify-content: space-between; ">
            <h3>No of Days:</h3>
            <h5>${transactionDetails.no_of_days}</h5>
        </div>
         <div style="display: flex; justify-content: space-between; ">
            <h3>Payment Period:</h3>
            <h5>${transactionDetails.payment_period}</h5>
        </div> 
        <div style="display: flex; justify-content: space-between; ">
            <h3>Next Date of Payment:</h3>
            <h5>${transactionDetails.next_date}</h5>
        </div>
         <div style="display: flex; justify-content: space-between; ">
            <h3>Transaction Channel:</h3>
            <h5>${transactionDetails.trans_channel}</h5>
        </div> 
        <div style="display: flex; justify-content: space-between; ">
            <h3>Transaction type:</h3>
            <h5>${transactionDetails.trans_type}</h5>
        </div> 
        <div style="display: flex; justify-content: space-between; ">
            <h3>LGA:</h3>
            <h5>${transactionDetails.lga}</h5>
        </div> 
        <div style="display: flex; justify-content: space-between; ">
            <h3>Agent Name:</h3>
            <h5>${userInfo.name}</h5>
        </div> 
          <div style="display: flex; justify-content: space-between; ">
            <h3>Agent Phone:</h3>
            <h5>${userInfo.phone}</h5>
        </div> 
        <div style="display: flex; justify-content: space-between; ">
            <h3>Transaction Date:</h3>
            <h5>${Moment(transactionDetails.trans_date).format('d MMM yyyy')}</h5>
        </div>
        <div style="display: flex; justify-content: space-evenly; text-align: center; margin: 15px 0 5px 0">
            <h3 style="color: #09893E">Support:</h3>
            <h5>09132222180, 09022888488</h5>
        </div>
<!--        <div style="width: 100px; margin-right: auto; margin-left: auto; margin-top: 10px">-->
<!--        <img src="https://app.abiapay.com/qr?PaymentRef=110057611441" alt="QR code">-->
<!--</div>-->

    </div>
  </body>
</html>
`;

    // const printToFile = async () => {
    //     // On iOS/android prints the given html. On web prints the HTML from the current page.
    //     const { uri } = await Print.printToFileAsync({ html });
    //     await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    // };
    // const info = TicketStore.useState()
    // const onShare = async () => {
    //     try {
    //         const result = await Share.share({
    //             message:
    //                 'React Native | A framework for building native apps using React',
    //         });
    //         if (result.action === Share.sharedAction) {
    //             if (result.activityType) {
    //                 // shared with activity type of result.activityType
    //             } else {
    //                 // shared
    //             }
    //         } else if (result.action === Share.dismissedAction) {
    //             // dismissed
    //         }
    //     } catch (error) {
    //         Alert.alert(error.message);
    //     }
    // };

    const processTrans = () => {
        showModal()
        setLoading(true)
        fetch(`${MOBILE_API}wallet/process-debit-later`, {
            headers: {
                'Authorization': 'Bearer' + userToken
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false);
                setPayResponse(responseJson)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    return(
        <ScrollView style={styles.container}>
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        {
                            loading ? <ActivityIndicator color="#09893E" size="large"/> : (
                                <View style={{marginTop: 10, marginLeft: 16}}>
                                    {
                                        payResponse.response_code === '00' || payResponse.response_code === '01' ? (
                                            <View>
                                                <Image style={{
                                                    width: 100,
                                                    height: 100,
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    marginTop: 6,
                                                    marginBottom: 6,
                                                }} source={success}/>
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>{'Payment Successful' || payResponse.message}</Text>
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>REF: {payResponse.payment_ref}</Text>
                                                <Button
                                                    title="Show Receipt"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.navigate("Done", {params: payResponse})}
                                                    buttonStyle={styles.modalButton}/>
                                                <Button
                                                    title="Create New"
                                                    type="outline"
                                                    titleStyle={styles.newBtnText}
                                                    onPress={() => clearAndRefresh()}
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
                                                <Text>{payResponse.response_message || payResponse.message}</Text>
                                                <Button
                                                    title="Try Again"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.goBack()}
                                                    buttonStyle={styles.modalButton}/>
                                            </View>

                                        )
                                    }

                                </View>
                            )
                        }
                    </Modal>
                </Portal>
            <View style={{marginTop: 5}}>
                <Text style={styles.title}>More Transaction Details</Text>
                <Card style={styles.card}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Status:</Text>
                        <Text style={styles.status}>{transactionDetails.process_status}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Transaction Date:</Text>
                        <Text style={styles.rowData}>{Moment(transactionDetails.trans_date).format('D MMM yyyy')}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Plate Number:</Text>
                        <Text style={styles.rowData}>{transactionDetails.trans_ref}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Shop Number:</Text>
                        <Text style={styles.rowData}>{transactionDetails.shopNumber}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Zone/Line:</Text>
                        {/*<Text style={styles.rowData}>{transactionDetails.zoneLine}</Text>*/}
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Payment Reference:</Text>
                        <Text style={styles.rowData}>{transactionDetails.payment_ref}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        <Text style={styles.rowLabel}>Amount:</Text>
                        <Text style={styles.rowData}>{transactionDetails.amount}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Payment Period:</Text>
                        <Text style={styles.rowData}>{transactionDetails.payment_period}</Text>
                    </View>
                    {/*<Divider />*/}
                    {/*<View style={{*/}
                    {/*    flexDirection: 'row',*/}
                    {/*    justifyContent: 'space-between',*/}
                    {/*    marginTop: 15,*/}
                    {/*    marginBottom: 15*/}
                    {/*}}>*/}
                    {/*    <Text style={styles.rowLabel}>Next Date of Payment:</Text>*/}
                    {/*    <Text style={styles.rowData}>{transactionDetails.next_date}</Text>*/}
                    {/*</View>*/}
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        <Text style={styles.rowLabel}>No of Days:</Text>
                        <Text style={styles.rowData}>{transactionDetails.no_of_days}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Transaction Channel:</Text>
                        <Text style={styles.rowData}>{transactionDetails.trans_channel}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Transaction type:</Text>
                        <Text style={styles.rowData}>{transactionDetails.trans_type}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>LGA:</Text>
                        <Text style={styles.rowData}>{transactionDetails.lga}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Date Created:</Text>
                        <Text style={styles.rowData}>{transactionDetails.trans_date}</Text>
                    </View>
                    <Divider />
                    {/*<View style={{*/}
                    {/*    flexDirection: 'row',*/}
                    {/*    justifyContent: 'space-between',*/}
                    {/*    marginTop: 15,*/}
                    {/*    marginBottom: 15*/}
                    {/*}}>*/}
                    {/*    <Text style={styles.rowLabel}>Transaction type:</Text>*/}
                    {/*    <Text style={styles.rowData}>{transactionDetails.trans_type}</Text>*/}
                    {/*</View>*/}
                    {/*<Divider />*/}
                    {/*<View style={{*/}
                    {/*    flexDirection: 'row',*/}
                    {/*    justifyContent: 'space-between',*/}
                    {/*    marginTop: 15,*/}
                    {/*    marginBottom: 15*/}
                    {/*}}>*/}
                    {/*    <Text style={styles.rowLabel}>Taxpayer Name:</Text>*/}
                    {/*    <Text style={styles.rowData}>{transactionDetails.taxpayer_name}</Text>*/}
                    {/*</View>*/}
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Taxpayer Email:</Text>
                        <Text style={styles.rowData}>{transactionDetails.taxpayer_email}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Taxpayer Phone:</Text>
                        <Text style={styles.rowData}>{transactionDetails.taxpayer_phone}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Revenue Item:</Text>
                        <Text style={styles.rowData}>{transactionDetails.revenue_item}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Payment Method:</Text>
                        <Text style={styles.rowData}>{transactionDetails.payment_method}</Text>
                    </View>
                </Card>
                <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
                    <QRCode
                        size={150}
                        value={qrValue}
                    />
                </View>
                <View>
                    <Button
                        title="Back to All"
                        titleStyle={styles.btnText}
                        onPress={() => navigation.navigate('Transactions')}
                        buttonStyle={styles.nextBtnStyle} />
                    <Button
                        title="Process Payment"
                        titleStyle={styles.btnText}
                        onPress={()=>processTrans()}
                        buttonStyle={styles.nextBtnStyle} />

                </View>
            </View>
            </PaperProvider>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    card: {
        marginTop: 18,
        marginBottom: 10,
        marginLeft: 16,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    rowData: {
        color: '#071827',
        width: 150,
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
        width: 150,
        textAlign: 'right',
        marginRight: 17,
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '900',
        lineHeight: 22
    },
    title: {
        color: '#071827',
        fontFamily: 'DMSans_500Medium',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '900',
        marginTop: 15,
        marginLeft: 17,
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
})
