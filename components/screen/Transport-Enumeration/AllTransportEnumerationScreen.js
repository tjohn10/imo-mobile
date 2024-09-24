import React, {useState, useCallback, useEffect, useContext} from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, List } from "react-native-paper";
import tickets from "../../../assets/icons/tickets.png";
import market from "../../../assets/icons/retail.png";
import transport from "../../../assets/icons/transportation.png";
import sign from "../../../assets/icons/digital-signage.png";
import { AuthStore } from "../../../store";
import {CENTRAL_API, MOBILE_API} from "../../../config";
import {AuthContext} from "../../../context/AuthContext";

export default function AllEnumerationScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState([]);
  const [total, setTotal] = useState([]);
    const [fidelityBalance, setFidelityBalance] = useState([]);
    const [fidelityDetails, setFidelityDetails] = useState([]);

  const info = AuthStore.useState();
    const {userToken} = useContext(AuthContext)

    const options = {  maximumFractionDigits: 2   }
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
    const getFidelityDetails = async () => {
        setLoading(true);
        // const url = `${MOBILE_API}dashboard/data`;
        const url = `${CENTRAL_API}paygate/get-account-details`;
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
        const url = `${CENTRAL_API}paygate/get-balance`;
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
  const getWallet = useCallback(async () => {
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
        setWalletBalance(responseJson.access);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getWallet();
      getTotalCollected()
  }, []);

  return (
    <SafeAreaView>
        {
            loading ? <ActivityIndicator color="#09893E" size="large" /> : (
                <ScrollView horizontal indicatorStyle="white" style={{marginTop: 10, marginBottom: 10}}>
                    <Card style={styles.totalCard}>
                        <Card.Content>
                            <View style={{marginBottom: 10}}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                                    <View>
                                        <Text style={styles.walletTitle}>Access Balance</Text>
                                        <Text style={styles.amount}>&#8358;{Intl.NumberFormat("en-US",options).format(walletBalance.wallet_balance) || 0}</Text>
                                        <Text style={styles.collected}> </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.walletTitle}>Current Earnings</Text>
                                        <Text style={styles.amount}>&#8358;{Intl.NumberFormat("en-US",options).format(walletBalance.current_earnings)}</Text>
                                        <Text style={styles.collected}>Total Collected: &#8358;{Intl.NumberFormat("en-US",options).format(total.total_amount)}</Text>
                                    </View>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                    <Card style={styles.totalCard}>
                        <Card.Content>
                            <View style={{marginBottom: 10}}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                                    <View>
                                        <Text style={styles.walletTitle}>Fidelity Balance</Text>
                                        <Text style={styles.amount}>&#8358;{Intl.NumberFormat("en-US",options).format(fidelityBalance.balance) || 0}</Text>
                                        <Text style={styles.collected}> </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.walletTitle}>Current Earnings</Text>
                                        <Text style={styles.amount}>&#8358;{Intl.NumberFormat("en-US",options).format(fidelityBalance.earnings)}</Text>
                                        <Text style={styles.collected}>Total Collected: &#8358;{Intl.NumberFormat("en-US",options).format(total.total_amount)}</Text>
                                    </View>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </ScrollView>
            )
        }
      <TouchableOpacity>
        <List.Item
          style={styles.list}
          onPress={() => navigation.navigate("Transport Enumeration")}
          title="Transport Enumeration"
          titleStyle={{
            color: "#292D32",
            fontSize: 14,
            fontFamily: "DMSans_500Medium",
            fontStyle: "normal",
            fontWeight: "500",
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
              source={transport}
              {...props}
              style={{
                width: 24,
                height: 24,
                margin: 15,
                backgroundColor: "#EAFFF3",
                paddingTop: 11,
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
          onPress={() => navigation.navigate("Market Enumeration")}
          title="Market Enumeration"
          titleStyle={{
            color: "#292D32",
            fontSize: 14,
            fontFamily: "DMSans_500Medium",
            fontStyle: "normal",
            fontWeight: "500",
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
                paddingTop: 11,
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
          onPress={() => navigation.navigate("Signage Enumeration")}
          title="Signage Enumeration"
          titleStyle={{
            color: "#292D32",
            fontSize: 14,
            fontFamily: "DMSans_500Medium",
            fontStyle: "normal",
            fontWeight: "500",
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
              source={sign}
              {...props}
              style={{
                width: 24,
                height: 24,
                margin: 15,
                backgroundColor: "#EAFFF3",
                paddingTop: 11,
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
          onPress={() => navigation.navigate("Manage Enumeration")}
          title="Manage Enumerations"
          titleStyle={{
            color: "#292D32",
            fontSize: 14,
            fontFamily: "DMSans_500Medium",
            fontStyle: "normal",
            fontWeight: "500",
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
              source={tickets}
              {...props}
              style={{
                width: 24,
                height: 24,
                margin: 15,
                backgroundColor: "#EAFFF3",
                paddingTop: 11,
              }}
            />
          )}
          right={(props) => (
            <List.Icon {...props} icon="chevron-right" color="#09893E" />
          )}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    width: Dimensions.get("screen").width - 32,
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 16,
    height: 80,
    flexShrink: 0,
    backgroundColor: "#fff",
    borderRadius: 18,
    shadowColor: "rgba(15, 13, 35, 0.04)",
  },
  title: {
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "700",
    marginTop: 20,
    marginLeft: 16,
    lineHeight: 32,
  },
  select: {
    color: "#5B5B5B",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    marginLeft: 16,
    marginTop: 12,
    lineHeight: 22,
  },
  cash: {
    color: "#FFF",
    fontFamily: "DMSans_400Regular",
    fontSize: 10.263,
    fontStyle: "normal",
    fontWeight: "400",
  },
  ePayments: {
    color: "#4CD964",
    textAlign: "left",
    fontFamily: "DMSans_400Regular",
    fontSize: 10.263,
    fontStyle: "normal",
    fontWeight: "400",
  },
  amount: {
    color: "#FFF",
    fontFamily: "Mulish_800ExtraBold",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: 32,
    marginTop: 4,
  },
  totalCard: {
    width: Dimensions.get("screen").width - 32,
    marginLeft: 16,
    marginTop: 20,
    height: 89,
    marginBottom: 20,
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: "#09893E",
    shadowColor: "rgba(0, 0, 0, 0.07)",
  },
  collected: {
    color: "#fff",
    textAlign: "right",
    fontFamily: "DMSans_400Regular",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0.1,
  },
  walletTitle: {
    color: "#FFF",
      marginTop: -5,
    fontFamily: "Mulish_400Regular",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 16,
  },
});
