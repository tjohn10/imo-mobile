import React, {useContext, useEffect, useState} from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import notification from "../../assets/icons/notification.png";
import verify from "../../assets/icons/verify.png";
import abs from "../../assets/icons/abssin.png";
import enumeration from "../../assets/icons/enum.png";
import banner from "../../assets/slider/7.png";
import market from "../../assets/icons/market.png";
import access from '../../assets/icons/accesss.png'
import fidelity from '../../assets/icons/Fidelity-Bank.png'
import ticket from "../../assets/icons/ticket1.png";
import transport from "../../assets/icons/transport.png";
import {
  Card,
  List,
  Modal,
  PaperProvider,
  Portal,
  Button,
} from "react-native-paper";
import welcome from '../../assets/welcome.png'

import { AuthStore } from "../../store";
import {MOBILE_API} from "../../config";
import {AuthContext} from "../../context/AuthContext";
import avatar from "../../assets/avatar.png";

const conditions = [
  {
    id: 1,
    paragraph: "Fast and easy to use",
  },
  {
    id: 2,
    paragraph: "Multi wallets option",
  },
  {
    id: 3,
    paragraph: "24 x 7 Always on",
  },
  {
    id: 4,
    paragraph: "Ability to save earnings or having instant discounted tickets",
  },
  // {
  //   id: 5,
  //   paragraph: "You can join the group for exciting offers",
  // }
];

const images = [
  require('../../assets/slider/1.jpeg'),
  require('../../assets/slider/2.jpeg'),
  require('../../assets/slider/7.png'),
]

export default function HomeScreen({ navigation, route }) {
  const [totalTickets, setTotalTickets] = useState();
  // const [totalEarnings, setTotalEarnings] = useState(0)
  const [walletBalance, setWalletBalance] = useState([]);
  const [fidelityBalance, setFidelityBalance] = useState([]);
  const [fidelityDetails, setFidelityDetails] = useState([]);
  const [totalAbssin, setTotalAbssin] = useState(0);
  const [totalEnumeration, setTotalEnumeration] = useState(0);
  const [total, setTotal] = useState([])
  const [loading, setLoading] = useState(false);

  // Beginning of Popup Component
  const [visible, setVisible] = useState(false);
  const {userToken, logout, isL} = useContext(AuthContext)

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { padding: 20, marginTop: 20 };




  // End of Popup Component

  const info = AuthStore.useState();

  const options = {  maximumFractionDigits: 2   }
  const getTotalTickets = () => {
    const url =
      `${MOBILE_API}transport/transactions`;
    fetch(url, {
      headers: {
        Authorization: "Bearer" + userToken,
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((responseJson) => {
        setLoading(false);
        setTotalTickets(responseJson.data.length);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getTotalCollected = () => {
    setLoading(true)
    fetch(`${MOBILE_API}enumeration/total-collected`, {
      headers: {
        'Authorization': 'Bearer' + userToken
      },
    })
        .then((response) => response.json())
        .then((responseJson) => {
          setLoading(false);
          setTotal(responseJson.data[0])
          console.log(total)
        })
        .catch((e) => {
          console.log(e)
        })
  }
  const getWalletDetails = async () => {
    setLoading(true);
    const url = `${MOBILE_API}dashboard/data`;
    await fetch(url, {
      headers: {
        Authorization: "Bearer" + userToken,
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((responseJson) => {
        setLoading(false);
        setWalletBalance(responseJson);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getFidelityDetails = async () => {
    setLoading(true);
    // const url = `${MOBILE_API}dashboard/data`;
    const url = 'https://sandboxapi.abssin.com/api/v1/paygate/get-account-details';
    await fetch(url, {
      headers: {
        'content-type': "application/json",
        'accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        'email': info.email
      })
    })
      .then((res) => res.json())
      .then((responseJson) => {
        setLoading(false);
        setFidelityDetails(responseJson);
        console.log(fidelityDetails, 'Fidelity')
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getFidelityBalance = async () => {
    setLoading(true);
    // const url = `${MOBILE_API}dashboard/data`;
    const url = 'https://sandboxapi.abssin.com/api/v1/paygate/get-balance';
    await fetch(url, {
      headers: {
        'content-type': "application/json",
        'accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        'email': info.email
      })
    })
      .then((res) => res.json())
      .then((responseJson) => {
        setLoading(false);
        setFidelityBalance(responseJson);
        console.log(fidelityBalance, 'Fidelity Balance')
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getTotalAbssin = () => {
    const url =
        `${MOBILE_API}abssin/manage-abssin`;
    fetch(url, {
      headers: {
        Authorization: "Bearer" + userToken,
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((responseJson) => {
        setTotalAbssin(responseJson.data.length);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getTotalEnumeration = () => {
    const url =
        `${MOBILE_API}enumeration/all-enumeration`;
    fetch(url, {
      headers: {
        Authorization: "Bearer" + userToken,
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((responseJson) => {
        setTotalEnumeration(responseJson.data.length);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      getWalletDetails()
      getFidelityDetails()
      getFidelityBalance()
      getTotalAbssin();
      getTotalCollected()
      getTotalTickets();
      getTotalEnumeration();
    });
    if(info.email === ''){
      Alert.alert('Session Error', 'This is not meant to happen. kindly Login again to be able to continue',[{text: 'OK', onPress: () => logout()},])
    }
    getWalletDetails();
    getFidelityDetails()
    getFidelityBalance()
    getTotalAbssin();
    getTotalCollected()
    getTotalTickets();
    getTotalEnumeration();
    // showModal();
  }, [navigation]);

  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <View>
          {loading ? (
            <ActivityIndicator color="#09893E" size="large" />
          ) : (
            <View style={styles.top}>
              <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
                <View style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                    <Image source={avatar} style={styles.avatar}/>
                  <Text style={styles.welcomeText}>
                   {walletBalance.name}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity>
                    <Image
                        style={{
                          width: 26,
                          height: 26,
                          marginTop: 50,
                          marginRight: 20,
                        }}
                        source={notification}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          <ScrollView style={{ marginTop: -160 }}>
            <Card style={styles.card}>
              <Card.Content>
                <View
                >
                  <View  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                    <Text style={styles.wallet}>
                      Access Wallet: {walletBalance.wallet_id}
                    </Text>
                    <Image style={{width: 27, height: 27, marginRight: 10, marginTop: -10}} source={access} />
                    {/*<Text style={styles.wallet}>Wallet Balance</Text>*/}
                  </View>
                  <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                    <Text style={styles.amount}>
                      &#8358; {Intl.NumberFormat("en-US",options).format(walletBalance.wallet_balance) || 0}
                    </Text>
                    <Text style={styles.amount}>
                      &#8358; {Intl.NumberFormat("en-US",options).format(walletBalance.current_earnings)}
                    </Text>
                  </View>
                  <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                    <Text style={styles.collected}>Ledger Balance: &#8358; {Intl.NumberFormat("en-US",options).format(walletBalance.ledger_balance)}</Text>
                    <Text style={styles.collected}>Total Collected: &#8358; {Intl.NumberFormat("en-US",options).format(total.total_amount) || 0}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
            {/*<Card style={[styles.card,{marginTop: 10}]}>*/}
            {/*  <Card.Content>*/}
            {/*    <View*/}
            {/*    >*/}
            {/*      <View  style={{*/}
            {/*        display: "flex",*/}
            {/*        flexDirection: "row",*/}
            {/*        justifyContent: "space-between",*/}
            {/*      }}>*/}
            {/*        <Text style={styles.wallet}>*/}
            {/*          Fidelity Wallet: {fidelityDetails.account_number}*/}
            {/*        </Text>*/}
            {/*        <Image style={{width: 27, height: 27, marginRight: 10, marginTop: -10}} source={fidelity} />*/}
            {/*      </View>*/}
            {/*      <View style={{*/}
            {/*        display: "flex",*/}
            {/*        flexDirection: "row",*/}
            {/*        justifyContent: "space-between",*/}
            {/*      }}>*/}
            {/*        <Text style={styles.amount}>*/}
            {/*          &#8358; {Intl.NumberFormat("en-US",options).format(fidelityBalance.balance) || 0}*/}
            {/*        </Text>*/}
            {/*        <Text style={styles.amount}>*/}
            {/*          &#8358; {Intl.NumberFormat("en-US",options).format(fidelityBalance.earnings)}*/}
            {/*        </Text>*/}
            {/*      </View>*/}
            {/*      <View style={{*/}
            {/*        display: "flex",*/}
            {/*        flexDirection: "row",*/}
            {/*        justifyContent: "space-between",*/}
            {/*      }}>*/}
            {/*        /!*<Text style={styles.collected}>Ledger Balance: &#8358; {Intl.NumberFormat("en-US",options).format(walletBalance.ledger_balance)}</Text>*!/*/}
            {/*        <Text style={styles.collected}>Total Collected: &#8358; {Intl.NumberFormat("en-US",options).format(total.total_amount) || 0}</Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*  </Card.Content>*/}
            {/*</Card>*/}
          </ScrollView>
          <View style={{flexDirection: "row",  marginLeft: "auto",
            marginRight: "auto" }}>
            <Card
                style={styles.agent}
                onPress={() => navigation.navigate("Ticket")}
            >
              <Card.Content>
                <Image
                    style={{
                      width: 23,
                      height: 23,
                      flexShrink: 0,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    source={ticket}
                />
                <Text style={styles.agentText}>Tickets</Text>
                <Text style={styles.numbers1}>{total.total_transaction}</Text>
              </Card.Content>
            </Card>
            <Card
                style={styles.abssin}
                onPress={() => navigation.navigate("TaxPayers")}
            >
              <Card.Content>
                <Image
                    style={{
                      width: 23,
                      height: 23,
                      flexShrink: 0,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    source={abs}
                />
                <Text style={styles.absText}>ABSSIN</Text>
                <Text style={styles.numbers}>{totalAbssin}</Text>
              </Card.Content>
            </Card>
            <Card
                style={styles.enum}
                onPress={() => navigation.navigate("Enumeration")}
            >
              <Card.Content>
                <Image
                    style={{
                      width: 23,
                      height: 23,
                      flexShrink: 0,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    source={enumeration}
                />
                <Text style={styles.enumText}>Enumeration</Text>
                <Text style={styles.numbers}>{totalEnumeration || 0}</Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        <View>
          {/*<SliderBox*/}
          {/*    images={images}*/}
          {/*    autoplay={true}*/}
          {/*    circleLoop*/}
          {/*    sliderBoxHeight={100}*/}
          {/*    parentWidth={Dimensions.get('screen').width}*/}
          {/*    style={{*/}
          {/*      marginTop: 10,*/}
          {/*      marginLeft: 16*/}
          {/*    }}*/}
          {/*/>*/}
          <Image source={banner} style={styles.image} />
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          {/*<Text style={styles.allTask}>All Tasks</Text>*/}
          <View>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}
              >
                <View style={styles.announcementModal}>
                  <Image source={welcome} style={{
                    width: 291,
                    marginTop: 20,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: 200
                  }}/>
                  <Text style={styles.modalHeaderText}>
                    Welcome to the new Paytax mobile App.
                  </Text>
                  <Text style={styles.modalHeaderSubText}>
                    Join us for the new rave. This January we will provide you exciting offers and appreciate our support Agents.
                  </Text>
                  <Text style={styles.benefits}>
                    Benefits of the new Mobile APP
                  </Text>
                  <View style={styles.modalDetails}>
                    {conditions.map((condition) => (
                      <View key={condition.id} style={styles.pointContainer}>
                        <View style={styles.pointer}>
                          <Text> {condition.id}</Text>
                        </View>
                        <Text style={styles.points}>{condition.paragraph}</Text>
                      </View>
                    ))}
                    <View>
                      <Button style={styles.cancel} onPress={() => navigation.navigate('Join')}>
                        <Text style={styles.cancelText}>Join Group</Text>
                      </Button>
                        <Text onPress={hideModal} style={styles.joinText}>Cancel</Text>
                    </View>
                  </View>
                </View>
              </Modal>
            </Portal>
          </View>
        </View>
        <ScrollView>
          <TouchableOpacity>
            <List.Item
              style={styles.list}
              onPress={() => navigation.navigate("Identity")}
              title="Identity"
              // description="Click Here"
              titleStyle={{
                color: "#292D32",
                fontFamily: "DMSans_500Medium",
                fontSize: 14,
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: 20,
              }}
              descriptionStyle={{
                color: "#09893E",
                fontFamily: "DMSans_400Regular",
                fontSize: 8,
                fontStyle: "normal",
                fontWeight: "400",
              }}
              left={(props) => (
                <Image
                  source={verify}
                  {...props}
                  style={{
                    width: 24,
                    height: 24,
                    margin: 15,
                    backgroundColor: "#EAFFF3",
                  }}
                />
              )}
              right={(props) => (
                <List.Icon {...props} icon="chevron-right" color="#09893E" />
              )}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <List.Item
              style={styles.list}
              onPress={() => navigation.navigate("Enforcement")}
              title="Enforcement"
              titleStyle={{
                color: "#292D32",
                fontSize: 14,
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: 20,
              }}
              descriptionStyle={{
                color: "#09893E",
                fontSize: 8,
                fontStyle: "normal",
                fontWeight: "400",
              }}
              // description="Click Here"
              // left={props => <List.Image {...props} source={box} style={{width: 12, height: 12}}/> }
              right={(props) => (
                <List.Icon {...props} icon="chevron-right" color="#09893E" />
              )}
              left={(props) => (
                <Image
                  source={transport}
                  {...props}
                  style={{
                    width: 24,
                    height: 24,
                    margin: 15,
                    backgroundColor: "#EAFFF3",
                  }}
                />
              )}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <List.Item
              style={styles.list}
              onPress={() => navigation.navigate("Reports")}
              title="Reports"
              // description="Click Here"
              titleStyle={{
                color: "#292D32",
                fontFamily: "DMSans_500Medium",
                fontSize: 14,
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: 20,
              }}
              descriptionStyle={{
                color: "#09893E",
                fontFamily: "DMSans_400Regular",
                fontSize: 8,
                fontStyle: "normal",
                fontWeight: "400",
              }}
              left={(props) => (
                <Image
                  source={market}
                  {...props}
                  style={{
                    width: 24,
                    height: 24,
                    margin: 15,
                    backgroundColor: "#EAFFF3",
                  }}
                />
              )}
              right={(props) => (
                <List.Icon {...props} icon="chevron-right" color="#09893E" />
              )}
            />
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  benefits:{
    color: '#071931',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 19,
    marginTop: -10
  },
  top: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: "#09893E",
    height: 251,
  },
  name: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "DMSans_500Medium",
    fontStyle: "normal",
    fontWeight: "500",
    left: 21,
    marginTop: 50,
    lineHeight: 24,
  },
  welcomeText: {
    color: "rgba(255, 255, 255, 0.72)",
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    left: 21,
    fontStyle: "normal",
    marginTop: 50,
    fontWeight: "400",
    lineHeight: 20,
  },
  card: {
    width: Dimensions.get("screen").width - 40,
    // width: 350,
    height: 90,
    borderRadius: 8,
    marginLeft: 20,
    marginRight: "auto",
    backgroundColor: "#FFF",
    shadowColor: "rgba(0, 0, 0, 0.07)",
  },
  wallet: {
    color: "#09893E",
    alignSelf: "stretch",
    fontFamily: "Mulish_400Regular",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 16,
  },
  amount: {
    color: "#09893E",
    fontFamily: "Mulish_800ExtraBold",
    fontSize: 22,
    marginTop: 5,
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: 26,
  },
  id: {
    color: "#000",
    fontFamily: "DMSans_400Regular",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0.1,
  },
  collected: {
    color: "#FF552F",
    textAlign: "right",
    fontFamily: "DMSans_400Regular",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0.1,
  },
  agent: {
    width: 94.65,
    // height: 103,
    marginTop: 30,
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: "#09893E",
  },
  agentText: {
    color: "#FFF",
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    fontStyle: "normal",
    fontWeight: "700",
  },
  abssin: {
    backgroundColor: '#fff',
    width: 94.65,
    // height: 103,
    marginLeft: 13.35,
    marginTop: 30,
    flexShrink: 0,
    borderRadius: 10,
  },
  absText: {
    color: "#666",
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    fontSize: 12,
    fontStyle: "normal",
    marginTop: 5,
    fontWeight: "700",
  },
  enum: {
    width: 98.65,
    // height: 103,
    backgroundColor: '#fff',
    marginLeft: 13.35,
    marginTop: 30,
    flexShrink: 0,
    borderRadius: 10,
  },
  enumText: {
    color: "#666",
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    fontSize: 10.5,
    marginTop: 5,
    fontStyle: "normal",
    fontWeight: "700",
  },
  numbers: {
    color: "#666",
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "700",
  },
  numbers1: {
    color: "#fff",
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "700",
  },
  allTask: {
    color: "#09893E",
    fontFamily: "DMSans_500Medium",
    fontSize: 16,
    fontStyle: "normal",
    marginTop: 22,
    left: 24,
    fontWeight: "500",
  },
  viewAll: {
    color: "#09893E",
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 20,
    left: 226,
    marginTop: 36,
    textAlign: "right",
  },
  avatar: {
    borderRadius: 70.442,
    borderWidth: 0.5,
    borderColor: '#09893E',
    width: 40,
    marginTop: 40,
    marginLeft: 16,
    height: 40,
    flexShrink: 0
  },
  list: {
    width: Dimensions.get("screen").width - 32,
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 1,
    marginRight: 16,
    height: 80,
    flexShrink: 0,
    backgroundColor: "#fff",
    borderRadius: 18,
    shadowColor: "rgba(15, 13, 35, 0.04)",
  },
  image: {
    width: Dimensions.get("screen").width - 32,
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 16,
  },
  announcementModal: {
    padding: 0,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalHeaderText: {
    fontSize: 25,
    width: 295,
    marginLeft: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#09893E",
    lineHeight: 26
},
  modalHeaderSubText: {
    marginTop: -15,
    fontSize: 14,
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
    backgroundColor: "#fff",
    borderColor: '#10BF58',
    borderWidth: 1,
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
    marginTop: -15,
    width: "82%",
  },
  modalDetails: {
    backgroundColor: "#fff",
    padding: 5,
    marginTop: 5,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  cancel: {
    width:263,
    backgroundColor: "#09893E",
    color: "white",
    borderRadius: 8,
    marginTop: 10,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  cancelText: {
    color: "white",
    fontSize: 14,
  },
  join: {
    width:263,
    borderColor: "#09893E",
    backgroundColor: "white",
    borderWidth: 1,
    color: "white",
    borderRadius: 8,
  },
  joinText: {
    color: "#09893E",
    textAlign: "center",
    textDecorationLine: 'underline',
    marginTop: 9,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
    marginBottom:10,
  },
});
