import React, { createRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { AuthStore, TicketStore, WalletStore } from "../../../store";
import { useIsFocused } from "@react-navigation/native";
import {FUNNY_API, MOBILE_API} from "../../../config";

export default function TransportEnumerationScreen({ navigation, route }) {
  const [ticketType, setTicketType] = useState();
  const [plateNo, setPlateNo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentDescription, setPaymentDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState();
  const [amount, setAmount] = useState(0);
  const [paymentPeriod, setPaymentPeriod] = useState();
  const [invoiceId, setInvoiceId] = useState("");
  const [collectionType, setCollectionType] = useState([]);
  const [walletBalance, setWalletBalance] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);
  const [errorText, setErrorText] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: TicketStore.useState((s) => s) });
  const userInfo = AuthStore.useState();

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      TicketStore.update((s) => {
        s.progress = 0;
        s.paymentPeriod = "1Day";
      });
    getCollectionType();
    getVehicleType();
    getWalletDetails();
    generateRandomString();
  }, [isFocused]);

  const generateRandomString = () => {
    const random = Math.floor(Math.random() * 8999999 + 1000000);
    const randomString = "IN" + random;
    return setInvoiceId(randomString);
  };
  const getCollectionType = () => {
    fetch(`${FUNNY_API}CollectionType`, {
      headers: {
        "X-IBM-Client-Id": "26e9ccd3bc07c0dc1627609afcf4699d",
        "content-type": "application/json",
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((responseJson) => {
        setCollectionType(responseJson);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getVehicleType = () => {
    fetch(`${FUNNY_API}ProductCodes`, {
      headers: {
        "X-IBM-Client-Id": "26e9ccd3bc07c0dc1627609afcf4699d",
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((responseJson) => {
        setVehicleType(responseJson);
      })
      .catch((e) => {
        console.log(e);
        Alert.alert("Error Encountered", e.message);
      });
  };

  const getWalletDetails = () => {
    const url = `${MOBILE_API}dashboard/data`;
    fetch(url, {
      headers: {
        Authorization: "Bearer" + userInfo.token,
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((responseJson) => {
        setWalletBalance(responseJson);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const populateAmount = () => {
    if (ticketType === "") {
      setAmount(0);
    } else if (ticketType !== "" && TicketStore.paymentPeriod === "1Day") {
      setAmount(ticketType.dailyAmount);
    } else if (ticketType !== "" && paymentPeriod === "1Week") {
      setAmount(ticketType.weeklyAmount);
    } else {
      setAmount(ticketType.monthlyAmount);
    }
  };
  const onSubmit = () => {
    setErrorText("");
    if (ticketType === "") {
      setErrorText("Vehicle Type Required");
    }

    const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
    if (plateNo === alphanumericRegex.test(plateNo)) {
      setErrorText("Please Enter only alphanumeric characters");
    }

    // if (plateNo === '' || alphanumericRegex.test(plateNo)) {
    //     setPlateNo(value);
    //     setErrorText('');
    // } else {
    //     setErrorText('Please enter only alphanumeric characters.');
    // }
    TicketStore.update((s) => {
      s.progress = 33;
      s.ticketType = ticketType.productCode;
      s.plateNo = plateNo;
      s.vehicleInfo = ticketType;
      s.name = name;
      s.email = email;
      s.phoneNumber = phoneNumber;
      s.paymentDescription = paymentDescription;
      s.paymentPeriod = paymentPeriod || "1Day";
      s.paymentMethod = paymentMethod;
      s.invoiceId = invoiceId;

      if (s.paymentPeriod === "1Month") {
        s.amount = ticketType.monthlyAmount;
        setAmount(ticketType.monthlyAmount);
      } else if (s.paymentPeriod === "1Week") {
        s.amount = ticketType.weeklyAmount;
        setAmount(ticketType.weeklyAmount);
      } else {
        s.amount = ticketType.dailyAmount;
        setAmount(ticketType.dailyAmount);
      }
    });
    WalletStore.update((w) => {
      w.walletBalance = walletBalance.wallet_balance;
      w.id = walletBalance.wallet_id;
      w.name = walletBalance.name;
      w.currentEarnings = walletBalance.current_earnings;
    });
    navigation.navigate("Summary");
  };

  var yearsArray = [];
  for (var year = 1991; year <= 2023; year++) {
    yearsArray.push(year.toString());
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      {/*<Controller render={({onChange, value})}>*/}
      <View style={{ marginTop: 5 }}>
        <Text style={styles.label}>Vehicle Plate Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Vehicle Plate Number"
          placeholderTextColor="#C4C4C4"
          value={name}
          returnKeyType="next"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
          onChangeText={(text) => setName(text)}
        />
      </View>
       <View style={{ marginTop: 5 }}>
        <Text style={styles.label}>Taxpayer Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Transport Name"
          placeholderTextColor="#C4C4C4"
          value={name}
          returnKeyType="next"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={styles.label}>Vehicle Category</Text>
        <Picker
          style={styles.dropdown}
          selectedValue={ticketType}
          onValueChange={(itemValue, itemIndex) => {
            setTicketType(itemValue);
          }}
        >
          <Picker.Item label="Select Category" value="" />
          {vehicleType.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.productName} value={item} />
            );
          })}
        </Picker>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={styles.label}>Revenue Yeab bkqjbr</Text>
        <Picker
          style={styles.dropdown}
          selectedValue={ticketType}
          onValueChange={(itemValue, itemIndex) => {
            setTicketType(itemValue);
          }}
        >
          <Picker.Item label="Select Revenue Year" value="" />
          {yearsArray.map((item, index) => {
            return (
              <Picker.Item key={index} label={item} value={item} />
            );
          })}
        </Picker>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={styles.label}>L.G.A</Text>
        <Picker
          style={styles.dropdown}
          selectedValue={ticketType}
          onValueChange={(itemValue, itemIndex) => {
            setTicketType(itemValue);
          }}
        >
          <Picker.Item label="Select L.G.A" value="" />
          {[1, 23, 3, 4, 5, 6, 6, 7].map((item, index) => {
            return (
              <Picker.Item key={index} label={item} value={item} />
            );
          })}
        </Picker>
      </View>

      <View style={{ marginTop: 5 }}>
        <Text style={styles.label}>Parks</Text>
        <Picker
          style={styles.dropdown}
          selectedValue={ticketType}
          onValueChange={(itemValue, itemIndex) => {
            setTicketType(itemValue);
          }}
        >
          <Picker.Item label="Select Parks" value="" />
          {[1, 23, 3, 4, 5, 6, 6, 7].map((item, index) => {
            return (
              <Picker.Item key={index} label={item} value={item} />
            );
          })}
        </Picker>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={styles.label}>Unions</Text>
        <Picker
          style={styles.dropdown}
          selectedValue={ticketType}
          onValueChange={(itemValue, itemIndex) => {
            setTicketType(itemValue);
          }}
        >
          <Picker.Item label="Select Unions" value="" />
          {[1, 23, 3, 4, 5, 6, 6, 7].map((item, index) => {
            return (
              <Picker.Item key={index} label={item} value={item} />
            );
          })}
        </Picker>
      </View>

      {/*<View style={{marginTop: 5}}>*/}
      {/*    <Text style={styles.label}>Amount</Text>*/}
      {/*    <TextInput*/}
      {/*        style={styles.input}*/}
      {/*        placeholder="Amount"*/}
      {/*        placeholderTextColor="#C4C4C4"*/}
      {/*        returnKeyType="next"*/}
      {/*        underlineColorAndroid="#f000"*/}
      {/*        blurOnSubmit={false}*/}
      {/*        value={amount}*/}
      {/*        onChangeText={() => populateAmount()}*/}
      {/*        editable={false}*/}
      {/*        selectTextOnFocus={false}*/}

      {/*    />*/}
      {/*</View>*/}

      {errorText !== "" ? (
        <Text style={styles.errorTextStyle}>{errorText}</Text>
      ) : null}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Save & Continue"
          titleStyle={styles.btnText}
          onPress={handleSubmit(onSubmit)}
          buttonStyle={styles.nextBtnStyle}
        />
      </View>
      {/*</Controller>*/}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFC",
  },
  input: {
    width: Dimensions.get("screen").width - 32,
    height: 48,
    marginTop: 11,
    marginRight: 16,
    borderRadius: 8,
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 24,
    paddingBottom: 12,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#09893E",
    marginLeft: 16,
  },
  dropdown: {
    width: Dimensions.get("screen").width - 32,
    height: 48,
    marginTop: 11,
    marginRight: 16,
    borderRadius: 8,
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 24,
    paddingBottom: 12,
    borderWidth: 1,
    backgroundColor: "#EAFFF3",
    // backgroundColor: "pink",
    borderColor: "#09893E",
    marginLeft: 16,
  },
  label: {
    height: 22,
    color: "#071931",
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    marginLeft: 16,
    marginTop: 10,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 22,
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
  btnText: {
    color: "#fff",
    fontFamily: "DMSans_400Regular",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});

// const [state, setState] = useState({
//     ticketType: "",
//     plateNo: "",
//     phoneNumber: "",
//     name: "",
//     paymentDescription: "",
//     paymentMethod: "",
//     amount: 0,
//     paymentPeriod: "",
//     invoiceId: "",
//     collectionType: [],
//     walletBalance: [],
//     vehicleType: [],
//     errorText: "",
//   });
