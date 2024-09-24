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
import { AuthStore } from "../../../store";
import {AuthContext} from "../../../context/AuthContext";

const BASE_URL = "https://mobileapi.sandbox.abiapay.com/api/v1";
export default function AllEnumerationScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState([]);

    const options = {  maximumFractionDigits: 2   }
  const info = AuthStore.useState();

    const {userToken} = useContext(AuthContext)
  const getWallet = useCallback(async () => {
    setLoading(true);
    const url = "https://mobileapi.sandbox.abiapay.com/api/v1/dashboard/data";
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
  }, []);

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator color="#09893E" size="large" />
      ) : (
        <View style={{ marginTop: 10 }}>
          <Card style={styles.totalCard}>
            <Card.Content>
              <View style={{ marginBottom: 10 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View>
                    <Text style={styles.walletTitle}>Amount Completed</Text>
                    <Text style={styles.amount}>
                      &#8358; {Intl.NumberFormat("en-US",options).format(walletBalance.wallet_balance) || 0}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.walletTitle}>Amount Pending</Text>
                    <Text style={styles.amount}>
                      &#8358; {Intl.NumberFormat("en-US",options).format(walletBalance.current_earnings)}
                    </Text>
                    <Text style={styles.collected}>
                      Total Collected: &#8358; {Intl.NumberFormat("en-US",options).format(walletBalance.total_collected)}
                    </Text>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      )}
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
      <TouchableOpacity>
        <List.Item
          style={styles.list}
          onPress={() => navigation.navigate("Manage Enumeration")}
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
      {/* <TouchableOpacity>
        <List.Item
          style={styles.list}
          onPress={() => navigation.navigate("Ticket")}
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
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 99,
    marginBottom: 20,
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: "#09893E",
    shadowColor: "rgba(0, 0, 0, 0.07)",
  },
  collected: {
    color: "#FFBC42",
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
    fontFamily: "Mulish_400Regular",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 16,
  },
});
