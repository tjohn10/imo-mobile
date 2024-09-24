import React, {useState, useRef, useContext} from "react";
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
import { useIsFocused } from "@react-navigation/native";
import {
  AuthStore,
  TicketStore,
  ILIDStore,
  ValidateStore,
} from "../../../store";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import OTPTextView from "react-native-otp-textinput";
import { Card, List, Modal, PaperProvider, Portal } from "react-native-paper";
import { Axios } from "axios";
import {MOBILE_API} from "../../../config";
import {AuthContext} from "../../../context/AuthContext";

export default function CreateILIDScreen({ navigation }) {
  const [source, setSource] = useState();
  const [id, setId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const sources = [{ source: "BVN" }, { source: "NIN" }, { source: "NO ID" }];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [validteButton, setValidateButton] = useState(false);
  const [otpInput, setOtpInput] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const [idError,setIderror] = useState(' ');
  const [disableNext, setDisableNext]= useState(true)
  const [code, setCode]= useState('')
  const [codeError, setCodeError]= useState('')
  const [verification, setVerification]= useState([])

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: ValidateStore.useState((item) => item) });

  const {
    handleSubmit: handleSubmit2,
    control: control2,
    watch: watch2,
    errors: errors2,
  } = useForm({ defaultValues: ILIDStore.useState((item) => item) });

  // const watchAllFields = watch()
  const userInfo = AuthStore.useState()
  const {userToken} = useContext(AuthContext)
  const validateID =async () => {
    setLoading(true)
   await fetch(`${MOBILE_API}/abssin/validate-ids`, {
      headers: {
        'Authorization': 'Bearer' + userToken,
        'accept': 'application/json',
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        id: id,
        source: source
      })
    }).then((res) => res.json())
        .then((resJson) => {
          setLoading(false)
          setVerification(resJson)
          console.log(resJson)
        })
  }
  const onSubmit = async () => {
    if (id.length <11 ){
      setIderror('Id Must be 11 numbers')
        return;
    }
    ValidateStore.update((item) => {
      (item.source = source), (item.id = id);
    });

    console.log(ValidateStore.currentState)
    try {
      const url = "https://mobileapi.sandbox.abiapay.com/api/v1/abssin/validate-ids";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add content type if sending JSON
        },
        body: JSON.stringify(ValidateStore),
      });

  console.log(ValidateStore)


      if (response) {
        const res = await response.json();
  console.log(response)
        if (response) {
        console.log('response', res.message);

          setIderror('ID Verified, Click Next and Enter OTP');
          setDisableNext(false);
        } else {
          setIderror('Data Not Found');
       }
      } else {
        setIderror('Data Not Found');
      }
    } catch (error) {
      console.error("Error:", error.response);
    }
  }
  const submitUserDetails = async() => {
    console.log("submit user details");
    showModal();
    try {
      const response = await Axios.post(`${MOBILE_API}user/verify-otp`, {
        code: code,
      });
      console.log(response.data)
      let userData = response.data.data;
      // setUserDetails(userData);
      let data = response.data.data.id;

      // setUserId(data);
      // router.push({
      //   pathname: "/userDetails",
      //   query: userData,
      // });
    } catch (error) {
      setCodeError(error?.response?.data?.message?.code)
      setCode('')
    }
  };

  const submitOtp = () => {
    console.log("otp input", otpInput);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <View style={{ flex: 1 }}>
        <ProgressSteps>
          <ProgressStep label="Validate ID"  nextBtnDisabled={disableNext}>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.label}>Select Preferred ID Type</Text>
              <Picker
                style={styles.dropdown}
                selectedValue={source}
                onValueChange={(itemValue, itemIndex) => setSource(itemValue)}
              >
                <Picker.Item label="ID Type" value="" />
                {sources.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={item.source}
                      value={item.source}
                    />
                  );
                })}
              </Picker>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.label}>Identity Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Identity Number"
                placeholderTextColor="#C4C4C4"
                value={id}
                maxLength={11}
                minLength= {11}
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                onChangeText={(text) => setId(text)}

              />
              {idError !== '' ? (
                <Text style={styles.errorTextStyle}>{idError}</Text>
              ):null}

            </View>

            <View style={{ marginTop: 20 }}>
              <Button
                title="Verify ID"
                titleStyle={styles.btnText}
                onPress={() => validateID()}
                buttonStyle={styles.nextBtnStyle}
              />
            </View>
          </ProgressStep>
          <ProgressStep label="Validate ID"  nextBtnDisabled={disableNext}>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.label}>Select Preferred ID Type</Text>
              <Picker
                style={styles.dropdown}
                selectedValue={source}
                onValueChange={(itemValue, itemIndex) => setSource(itemValue)}
              >
                <Picker.Item label="ID Type" value="" />
                {sources.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={item.source}
                      value={item.source}
                    />
                  );
                })}
              </Picker>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.label}>Identity Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Identity Number"
                placeholderTextColor="#C4C4C4"
                value={id}
                maxLength={11}
                minLength= {11}
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                onChangeText={(text) => setId(text)}

              />
              {idError !== '' ? (
                <Text style={styles.errorTextStyle}>{idError}</Text>
              ):null}

            </View>

            <View style={{ marginTop: 20 }}>
              <Button
                title="Verify ID"
                titleStyle={styles.btnText}
                onPress={() => validateID()}
                buttonStyle={styles.nextBtnStyle}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Enter OTP"
            previousBtnDisabled
            onNext={handleSubmit2(submitUserDetails)}
          >
            <View style={styles.otpcontainer}>
              <OTPTextView
                //  ref={e => (otpInput = e)}
                //   containerStyle={styles.textInputContainer}
                handleTextChange={setCode}
                //   handleCellTextChange={handleCellTextChange}
                inputCount={6}
                keyboardType="numeric"
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label="User Details"
            onSubmit={handleSubmit2(submitUserDetails)}
          >
            <View style={{ alignItems: "center" }}>
              <View style={{ marginTop: 5 }}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  placeholderTextColor="#C4C4C4"
                  value={title}
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  onChangeText={(text) => setTitle(text)}
                />
              </View>

              <View style={{ marginTop: 5 }}>
                <Text style={styles.label}>FirstName</Text>
                <TextInput
                  style={styles.input}
                  placeholder="FirstName"
                  placeholderTextColor="#C4C4C4"
                  value={firstName}
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  onChangeText={(text) => setFirstName(text)}
                />
              </View>

              <View style={{ marginTop: 5 }}>
                <Text style={styles.label}>MiddleName</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MiddleName"
                  placeholderTextColor="#C4C4C4"
                  value={middleName}
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  onChangeText={(text) => setMiddleName(text)}
                />
              </View>

              <View style={{ marginTop: 5 }}>
                <Text style={styles.label}>LastName</Text>
                <TextInput
                  style={styles.input}
                  placeholder="LastName"
                  placeholderTextColor="#C4C4C4"
                  value={lastName}
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  onChangeText={(text) => setLastName(text)}
                />
              </View>

              <View style={{ marginTop: 5 }}>
                <Text style={styles.label}>Marital Status</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Marital Status"
                  placeholderTextColor="#C4C4C4"
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  value={maritalStatus}
                  onChangeText={(text) => setMaritalStatus(text)}
                />
              </View>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>

      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Text>Modal</Text>
        <Text>{lastName}</Text>
        <View>
          <View style={styles.button}>
            <Button
              title="Create New ID"
              titleStyle={styles.btnText}
              onPress={() => navigation.navigate("Create")}
              buttonStyle={styles.modalButton}
            />
            <Button
              title="View Created ID"
              titleStyle={styles.btnText}
              onPress={() => navigation.navigate("Create")}
              buttonStyle={styles.modalButton}
            />
          </View>
        </View>
      </Modal>
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
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
    marginTop:12
  },
  otpcontainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 5,
    paddingVertical: 20,
  },
  containerStyle: {
    padding: 20,
  },
  announcementModal: {
    padding: 0,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalHeaderText: {
    fontSize: 29,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#09893E",
  },
  modalHeaderSubText: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
    lineHeight: 20,
    padding: 20,
  },
  pointContainer: {
    display: "flex",
    alignItems: "center",
    margin: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 2,
  },
  pointer: {
    width: 30,
    height: 30,
    backgroundColor: "#10BF58",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  points: {
    fontSize: 14,
    width: "82%",
  },
  modalDetails: {
    borderColor: "#D3D3D3",
    borderWidth: 1,
    backgroundColor: "#E5E4E2",
    padding: 15,
    marginTop: 5,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  cancel: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#09893E",
    color: "white",
    borderRadius: 4,
    marginRight: 5,
  },
  cancelText: {
    color: "white",
  },
  join: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderColor: "#09893E",
    backgroundColor: "white",
    borderWidth: 1,
    color: "white",
    borderRadius: 4,
  },
  joinText: {
    color: "#09893E",
  },
  modalButton: {
    width: 150,
    height: 48,
    // padding: 10,
    marginTop: 20,
    marginBottom: 20,
    // alignItems: 'center',
    textAlign: "center",
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
});
