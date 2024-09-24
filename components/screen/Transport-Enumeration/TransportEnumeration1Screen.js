import React, {useEffect, useState, useCallback, useContext} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity, Platform, Alert, ActivityIndicator, Image, SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import {
  AuthStore,
  TransportEnumerationStore,
  WalletStore,
} from "../../../store";
import { useIsFocused } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {AuthContext} from "../../../context/AuthContext";
import {FUNNY_API, merchant_key, MOBILE_API, OTHER_API} from "../../../config";
import crashlytics from "@react-native-firebase/crashlytics";
import {MD3Colors, Modal, PaperProvider, Portal, ProgressBar} from "react-native-paper";
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";
import notFound from "../../../assets/icons/no-results.png";
import Moment from "moment/moment";


export default function TransportEnumerationScreen({ navigation, route }) {
  const userInfo = AuthStore.useState();
  const {userToken} = useContext(AuthContext)
  const [errorText, setErrorText] = useState("");
  const [vehicleCategory, setVehicleCategory] = useState()
  const [enumFee, setEnumFee] = useState('')
  const [vehicleType, setVehicleType] = useState([])
  const [plateNumber, setPlateNumber] = useState('')
  const [dailyTicket, setDailyTicket] = useState('')
  const [taxpayerPhone, setTaxpayerPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const [unions, setUnions] = useState([])
  const [parks, setParks] = useState([]);
  const [tradeUnion, setTradeUnion] = useState()
  const [park, setPark] = useState()

  const clearAndReset = () => {
    hideModal()
    navigation.addListener('focus', () => {
      setPark()
      setEnumFee('')
      setPlateNumber('')
      setDailyTicket('')
      setTaxpayerPhone('')
      setVehicleCategory()
    })
    setPark()
    setEnumFee('')
    setPlateNumber('')
    setDailyTicket('')
    setTaxpayerPhone('')
    setVehicleCategory()
  }

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20,
    width: Dimensions.get('screen').width - 32,
    borderRadius: 10,
    marginLeft: 16}

  const [plateNumberResponse, setPlateNumberResponse] = useState([]);

  const setDailyAmount = (value) => {
    console.log(value, 'value')
    setDailyTicket(value.dailyAmount)
    setEnumFee(value.amount)
  }



  const getParks = useCallback(async () => {
    const url = `${MOBILE_API}parks`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: "Bearer" + userToken,
        },
      });

      const responseJson = await response.json();
      const resParks = responseJson.map((park) => park?.park);
      setParks(resParks);
    } catch (error) {
      console.error(error, "PARKS ERROR");
    }
  }, [MOBILE_API, userInfo.token, setParks]);

  const getVehicleType = () => {
    fetch(`${MOBILE_API}transport/emblem-product-code`, {
      headers:{
        Authorization: "Bearer" + userToken,
        "Content-Type": "application/json"
      },
    })
        .then((res)=>res.json())
        .then((responseJson) => {
          setVehicleType(responseJson.data)
        })
        .catch((e) => {
          console.log(e)
          Alert.alert('Error Encountered', e.message)
        })
  }

  const getTradeUnions = () => {
    fetch(`${MOBILE_API}enumeration/unions`, {
      headers:{
        'accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer" + userToken,
      }
    })
        .then((response) => response.json())
        .then((responseJson) => {
          setLoading(false);
          setUnions(responseJson)
        })
        .catch((e) => {
          Alert.alert('Error Occurred', e.message)
        })
  }

  useEffect(() => {
    clearAndReset()
    navigation.addListener('focus', () => {
      clearAndReset()
      setPark()
      setEnumFee('')
      setPlateNumber('')
      setDailyTicket('')
      setTaxpayerPhone('')
      setVehicleCategory()
    })
    getParks()
    getVehicleType()
    getTradeUnions()
  }, []);


  const getPlateDetails = () => {
    if (plateNumber === '') {
      Alert.alert('Incomplete Fields', 'Plate Number cannot be Empty')
    } else {
      TransportEnumerationStore.update((s) => {
        s.plateNo = plateNumber;
        s.phone = taxpayerPhone;
        s.park = park;
        s.union = tradeUnion;
        s.vehicleCategory = vehicleCategory.productCode;
        s.dailyAmount = dailyTicket;
        s.enumFee = enumFee;
      })
      showModal()
      setLoading(true)
      fetch(`${MOBILE_API}vehicle/verify-plate-number`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          Authorization: "Bearer" + userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "phone_number": taxpayerPhone,
          "plate_number": plateNumber,
          "merchant_key": merchant_key
        })
      }).then((res) => res.json())
          .then((resJson) => {
            console.log(resJson, 'vehicle details')
            if (resJson.response_code === '02') {
              setButtonVisible(true)
            }
            setLoading(false)
            setPlateNumberResponse(resJson)
          })
    }
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: TransportEnumerationStore.useState((s) => s) });

  const isFocused = useIsFocused();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginTop: 10, fontSize: 16, fontWeight: '600', marginLeft: 16}}>1. Vehicle Data</Text>
        <Text style={{marginTop: 10, fontSize: 14, fontWeight: '600', marginLeft: 13, color: '#b9d7d9'}}>2. Owner's Data</Text>
        <Text style={{marginTop: 10, fontSize: 14, fontWeight: '600', marginLeft: 10, color: '#b9d7d9'}}>3. Driver's Data</Text>
      </View>

      <ProgressBar progress={0.33} color='#f07241' style={{width: Dimensions.get('screen').width -32, marginLeft: 16}}/>
      <ScrollView keyboardShouldPersistTaps="handled">
        <PaperProvider>
          <Portal>
            <Modal visible={visible} dismissable={true} onDismiss={hideModal} contentContainerStyle={containerStyle}>
              {
                loading ? <ActivityIndicator color="#09893E" size="large" /> : (
                    <View style={{marginTop: 10, marginLeft: 16}}>
                      {
                        plateNumberResponse.response_code === '00' ? (
                            <View>
                              <Image style={{
                                width:100,
                                height:100,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: 6,
                                marginBottom: 6,
                              }} source={success} />
                              <Text style={{
                                fontStyle:'normal',
                                fontWeight: '700',
                                fontSize: 16,
                              }}>Information Retrieved Successful</Text>
                              <Text style={{
                                fontStyle:'normal',
                                fontWeight: '700',
                                fontSize: 16,
                              }}>Vehicle Make: {plateNumberResponse.response_data.vehicle_data.vehicle_make}</Text>
                              <Text style={{
                                fontStyle:'normal',
                                fontWeight: '700',
                                fontSize: 16,
                              }}>Vehicle Model: {plateNumberResponse.response_data.vehicle_data.vehicle_model}</Text>
                              <Text style={{
                                fontStyle:'normal',
                                fontWeight: '700',
                                fontSize: 16,
                              }}>Vehicle Color: {plateNumberResponse.response_data.vehicle_data.vehicle_color}</Text>
                              <Text style={{
                                fontStyle:'normal',
                                fontWeight: '700',
                                fontSize: 16,
                              }}>State of Registration: {plateNumberResponse.response_data.vehicle_data.state_of_registration}</Text>
                              <Text style={{
                                fontStyle:'normal',
                                fontWeight: '700',
                                fontSize: 16,
                              }}>
                                Registration Expiry Date: {plateNumberResponse.response_data.vehicle_data.expiry_date}
                              </Text>
                              <Button
                                  title="Continue"
                                  titleStyle={styles.btnText}
                                  onPress={() => navigation.navigate("Order2", {params: {plateNumber, plateNumberResponse}})}
                                  buttonStyle={styles.modalButton} />
                            </View>
                        ) : (
                            <View>
                              {
                                buttonVisible ? (
                                    <View>
                                      <Image style={{
                                        width:100,
                                        height:100,
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        marginTop: 6,
                                        marginBottom: 6,
                                      }} source={notFound} />
                                      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Vehicle Information Not Found</Text>
                                      <Button
                                          title="Enter Vehicle Details"
                                          titleStyle={styles.btnText}
                                          onPress={() => navigation.navigate('Vehicle Info')}
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
                                      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{plateNumberResponse.response_message}</Text>
                                      <Button
                                          title="Try Again"
                                          titleStyle={styles.btnText}
                                          onPress={clearAndReset}
                                          buttonStyle={styles.modalButton} />
                                    </View>
                                )
                              }
                            </View>
                        )
                      }

                    </View>
                )
              }
            </Modal>
          </Portal>
          {/*<Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 10}}>Vehicle's Data</Text>*/}

          <View style={{ marginTop: 5 }}>
            <Text style={styles.label}>Driver's Phone Number (e.g 08012345678)</Text>
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#C4C4C4"
                value={taxpayerPhone}
                keyboardType={'numeric'}
                maxLength={11}
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                onChangeText={(text) => setTaxpayerPhone(text)}
            />
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={styles.label}>Vehicle Plate Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Vehicle Plate Number"
                placeholderTextColor="#C4C4C4"
                autoCapitalize={'characters'}
                value={plateNumber}
                maxLength={8}
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                onChangeText={(text) => { if (text.includes(' ')) {
                  setPlateNumber(text.trim());
                } else {
                  setPlateNumber(text);
                }}}
            />
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={styles.label}>Vehicle Category </Text>
            <Picker
                style={styles.dropdown}
                selectedValue={vehicleCategory}
                onValueChange={(itemValue, itemIndex) => {
                  setVehicleCategory(itemValue)
                  setDailyAmount(itemValue)
                }}>
              <Picker.Item label="Select Vehicle Category" value="" />
              {vehicleType.map((item, index) => {
                return (
                    <Picker.Item key={index} label={item.productName} value={item} />
                );
              })}
            </Picker>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={styles.label}>Operating Park</Text>
            <Picker
                style={styles.dropdown}
                selectedValue={park}
                onValueChange={(itemValue, itemIndex) => {
                  setPark(itemValue)
                }}
            >
              <Picker.Item label="Select Operating Park" value="" />
              {parks.map((item, index) => {
                return <Picker.Item key={index} label={item} value={item} />;
              })}
            </Picker>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={styles.label}>Trade Unions</Text>
            <Picker
                style={styles.dropdown}
                selectedValue={tradeUnion}
                onValueChange={(itemValue, itemIndex) => {
                  setTradeUnion(itemValue)
                }}
            >
              <Picker.Item label="Select Trade Union" value="" />
              {unions.map((item, index) => {
                return <Picker.Item key={index} label={item.unionName} value={item.unionCode} />;
              })}
            </Picker>
          </View>

          {errorText !== "" ? (
              <Text style={styles.errorTextStyle}>{errorText}</Text>
          ) : null}
          <View style={{ marginTop: 20 }}>
            <Button
                title="Save & Continue"
                titleStyle={styles.btnText}
                onPress={getPlateDetails}
                buttonStyle={styles.nextBtnStyle}
            />
          </View>
        </PaperProvider>
      </ScrollView>
    </SafeAreaView>
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
  horizontalView: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: "space-between"
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
  modalButton: {
    width: 260,
    marginRight:'auto',
    marginLeft:'auto',
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
    marginRight:'auto',
    marginLeft:'auto',
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
