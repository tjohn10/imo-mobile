import React, {useContext, useEffect, useState} from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { Card, Modal, PaperProvider, Portal } from "react-native-paper";
import { Button } from "react-native-elements";
import { useForm } from "react-hook-form";
import { AuthStore, TransportEnumerationStore, WalletStore } from "../../../store";
import cancel from "../../../assets/cancel.png";
import success from "../../../assets/success.png";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {merchant_key, MOBILE_API} from "../../../config";


export default function TransportEnumerationSummaryScreen({ navigation }) {
  const [paymentResponse, setPaymentResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [ticketError, setTicketError] = useState("");
  const [response, setResponse] = useState([]);
  let nextPayment = useState();
  const [walletResponse, setWalletResponse] = useState([]);
  const [errorText, setErrorText] = useState(
    "Insufficient Balance. Please recharge your wallet"
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: TransportEnumerationStore.useState((s) => s) });
  const isFocused = useIsFocused();

  const info = TransportEnumerationStore.useState();
  const userInfo = AuthStore.useState();
  const {userToken} = useContext(AuthContext)
  const walletInfo = WalletStore.useState();
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    width: Dimensions.get("screen").width - 32,
    borderRadius: 10,
    marginLeft: 16,
  };
  const requestBody = {
    taxpayer_category : info.taxpayer_category,
    abssin : info.abssin,
    vehicle_plate_number : info.vehicle_plate_number,
    taxpayer_name : info.taxpayer_name,
    revenue_year : info.revenue_year,
    taxpayer_location : info.taxpayer_location,
    operating_park : info.operating_park,
    trade_union : info.trade_union,
    vehicle_category : info.vehicle_category,
    owner_name : info.owner_name,
    owner_address : info.owner_address,
    registration_expiry : info.registration_expiry,
    daily_ticket_amount : info.daily_ticket_amount,
    enumeration_fee : info.enumeration_fee,
    payment_method : info.payment_method,
  };
  const onSubmit = async () => {
    showModal();
    setLoading(true);
    const url =
      `${MOBILE_API}enumeration/create-transport-enumeration`;
    await fetch(`${MOBILE_API}enumeration/create-transport-enumeration`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer" + userToken,
        'accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        taxpayer_category: info.taxpayer_category,
        abssin: info.abssin,
        vehicle_plate_number: info.plateNo,
        taxpayer_name: info.name,
        revenue_year: info.revenueYear,
        taxpayer_location: info.lga,
        operating_park: info.parks,
        trade_union: info.union,
        vehicle_category: info.vehicle_category,
        owner_name: info.ownerName,
        owner_address: info.ownerAddress,
        registration_expiry: info.registrationExpiry,
        daily_ticket_amount: info.dailyAmount,
        enumeration_fee: info.enumFee,
        payment_method: info.payment_method,
        merchant_key: merchant_key
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        setLoading(false);
        setResponse(resJson);
        console.log(resJson);
      })
      .catch((e) => {
        console.log(e);
        Alert.alert("Error Processing Payment", e.message);
      });
    //
    // try {
    //   showModal();
    //   setLoading(true);
    //   const response = await fetch(
    //     `${MOBILE_API}enumeration/create-transport-enumeration`,
    //     {
    //       method: "POST", // or 'PUT'
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer" + userToken,
    //       },
    //       body: JSON.stringify(requestBody),
    //     }
    //   );
    //
    //   const result = await response.json();
    //   console.log("Success:", result);
    //   setLoading(false);
    //   setResponse(result);
    //   console.log(requestBody);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <ScrollView style={styles.container}>
      <PaperProvider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            {loading ? (
              <ActivityIndicator color="#09893E" size="large" />
            ) : (
              <View style={{ marginTop: 10, marginLeft: 16 }}>
                {response.status === true ? (
                  <View>
                    <Image
                      style={{
                        width: 100,
                        height: 100,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 6,
                        marginBottom: 6,
                      }}
                      source={success}
                    />
                    <Text style={{
                      fontStyle:'normal',
                      fontWeight: '700',
                      fontSize: 14,
                    }}>Payment Successful</Text>
                    <Text style={{
                      fontStyle:'normal',
                      fontWeight: '700',
                      fontSize: 14,
                    }}>Vehicle Type: {response.data.enumeration.Category}</Text>
                    <Text style={{
                      fontStyle:'normal',
                      fontWeight: '700',
                      fontSize: 14,
                    }}>Plate Number: {response.data.enumeration.PlateNumber}</Text>
                    <Text style={{
                      fontStyle:'normal',
                      fontWeight: '700',
                      fontSize: 14,
                    }}>Phone Number: {response.data.transactions.taxpayer_phone}</Text>
                    <Button
                      title="Show Receipt"
                      titleStyle={styles.btnText}
                      onPress={() =>
                        navigation.navigate("Done", { params: response })
                      }
                      buttonStyle={styles.modalButton}
                    />
                    <Button
                        title="Create New"
                        type="outline"
                        titleStyle={styles.newBtnText}
                        onPress={() => navigation.navigate("Order")}
                        buttonStyle={styles.modalNewButton}/>
                  </View>
                ) : (
                  <View>
                    <Image
                      style={{
                        width: 100,
                        height: 100,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 6,
                        marginBottom: 6,
                      }}
                      source={cancel}
                    />
                    <Text>{response.message}</Text>
                    <Button
                      title="Try Again"
                      titleStyle={styles.btnText}
                      onPress={() => navigation.goBack()}
                      buttonStyle={styles.modalButton}
                    />
                  </View>
                )}
              </View>
            )}
          </Modal>
        </Portal>

        <View style={{ marginTop: 16 }}>
          <Card style={styles.card}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 14,
              }}
            >
              <Text style={styles.rowLabel}>Taxpayer Name:</Text>
              <Text style={styles.rowData}>{info.name}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 22,
              }}
            >
              <Text style={styles.rowLabel}>Taxpayer Category:</Text>
              <Text style={styles.rowData}>{info.taxpayer_category}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 22,
              }}
            >
              <Text style={styles.rowLabel}>ABSSIN:</Text>
              <Text style={styles.rowData}>{info.abssin}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 22,
              }}
            >
              <Text style={styles.rowLabel}>L.G.A:</Text>
              <Text style={styles.rowData}>{info.lga}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 22,
              }}
            >
              <Text style={styles.rowLabel}>Vehicle Plate number:</Text>
              <Text style={styles.rowData}>{info.plateNo}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 22,
              }}
            >
              <Text style={styles.rowLabel}>Operating Park:</Text>
              <Text style={styles.rowData}>{info.parks}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 22,
              }}
            >
              <Text style={styles.rowLabel}>Revenue Year:</Text>
              <Text style={styles.rowData}>{info.revenueYear}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 22,
              }}
            >
              <Text style={styles.rowLabel}>Owner Name:</Text>
              <Text style={styles.rowData}>{info.ownerName}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 22,
              }}
            >
              <Text style={styles.rowLabel}>Owner Address:</Text>
              <Text style={styles.rowData}>{info.ownerAddress}</Text>
            </View>

          </Card>
          <Card style={styles.card}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text style={styles.amount}>&#8358; {info.enumFee}</Text>
              <Text style={styles.labelData}>Enumeration Amount</Text>
            </View>
          </Card>
          <Card style={styles.card}>
            <Text style={styles.reminderTitle}>Collection Reminder:</Text>
            <Text style={styles.reminderText}>
              Kindly ensure that cash has been collected from TaxPayer before
              completing this Transaction as your Wallet will be debited for the
              collection amount.
            </Text>
          </Card>
        </View>
        <View>
          {/* {walletInfo.walletBalance >= info.amount ? ( */}
          {walletInfo.walletBalance == info.amount ? (
            <View>
              {paymentResponse.response_code !== "00" ? (
                <Text style={styles.errorTextStyle}>
                  {paymentResponse.response_message}
                </Text>
              ) : null}
              <Button
                title="Enumerate Vehicle"
                titleStyle={styles.btnText}
                onPress={handleSubmit(onSubmit)}
                buttonStyle={styles.nextBtnStyle}
              />
            </View>
          ) : (
            <View>
              {errorText !== "" ? (
                <Text style={styles.errorTextStyle}>
                  Insufficient Balance. Please recharge your wallet
                </Text>
              ) : (
                <Text style={styles.errorTextStyle}>{errorText}</Text>
              )}
              <Button
                disabled
                title="Enumerate Vehicle"
                titleStyle={styles.btnText}
                onPress={handleSubmit(onSubmit)}
                buttonStyle={styles.nextBtnStyle}
              />
            </View>
          )}
        </View>
      </PaperProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFC",
  },
  card: {
    marginTop: 18,
    marginBottom: 10,
    marginLeft: 16,
    width: Dimensions.get("screen").width - 32,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  rowLabel: {
    color: "#979797",
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    marginLeft: 17,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22,
  },
  modalNewButton: {
    width: 300,
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
  title: {
    color: "#071827",
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    marginLeft: 17,
    lineHeight: 22,
  },
  rowData: {
    color: "#071827",
    textAlign: "right",
    marginRight: 17,
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22,
  },
  amount: {
    color: "#219653",
    textAlign: "right",
    fontFamily: "DMSans_700Bold",
    marginLeft: 17,
    padding: 10,
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 16,
  },
  labelData: {
    color: "#071827",
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
    padding: 10,
    marginRight: 17,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22,
  },
  reminderTitle: {
    color: "#071827",
    padding: 12,
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22,
  },
  reminderText: {
    color: "#FD0D1B",
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    fontStyle: "normal",
    padding: 10,
    fontWeight: "400",
    lineHeight: 18,
  },
  newBtnText: {
    color: '#09893E',
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700'
  },
  nextBtnStyle: {
    width: Dimensions.get("screen").width - 32,
    height: 48,
    padding: 10,
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#09893E",
    flexShrink: 0,
  },
  modalButton: {
    width: 300,
    height: 48,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#09893E",
    flexShrink: 0,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    fontWeight: "700",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
