import React from "react";
import {SafeAreaView, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from "react-native";
import {List} from "react-native-paper";
import billboard from "../../../../assets/icons/billboard.png";
import road from "../../../../assets/icons/billboard-other.png";
import sign from "../../../../assets/icons/signpost.png";
import free from "../../../../assets/icons/free.png";
import digital from "../../../../assets/icons/digital-sign.png";
import mobile from "../../../../assets/icons/poster.png";

export default function SignageEnumerationScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity>
                <List.Item
                    style={styles.list}
                    onPress={() => navigation.navigate("First Party")}
                    title="First Party Signs"
                    titleStyle={{
                        color: "#292D32",
                        fontSize: 14,
                        fontFamily: "DMSans_500Medium",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: 20,
                    }}
                    left={(props) => (
                        <Image
                            source={billboard}
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
                        <List.Icon {...props} icon="chevron-right" color="#09893E"/>
                    )}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <List.Item
                    style={styles.list}
                    onPress={() => navigation.navigate("Special")}
                    title="Special Advertisements"
                    titleStyle={{
                        color: "#292D32",
                        fontSize: 14,
                        fontFamily: "DMSans_500Medium",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: 20,
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
                        <List.Icon {...props} icon="chevron-right" color="#09893E"/>
                    )}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <List.Item
                    style={styles.list}
                    onPress={() => navigation.navigate("Temporary")}
                    title="Temporary Signs"
                    titleStyle={{
                        color: "#292D32",
                        fontSize: 14,
                        fontFamily: "DMSans_500Medium",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: 20,
                    }}
                    left={(props) => (
                        <Image
                            source={road}
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
                        <List.Icon {...props} icon="chevron-right" color="#09893E"/>
                    )}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <List.Item
                    style={styles.list}
                    onPress={() => navigation.navigate("Freestanding")}
                    title="Freestanding or Sky Signs"
                    titleStyle={{
                        color: "#292D32",
                        fontSize: 14,
                        fontFamily: "DMSans_500Medium",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: 20,
                    }}
                    left={(props) => (
                        <Image
                            source={free}
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
                        <List.Icon {...props} icon="chevron-right" color="#09893E"/>
                    )}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <List.Item
                    style={styles.list}
                    onPress={() => navigation.navigate("Development")}
                    title="Development Boardfare"
                    titleStyle={{
                        color: "#292D32",
                        fontSize: 14,
                        fontFamily: "DMSans_500Medium",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: 20,
                    }}
                    left={(props) => (
                        <Image
                            source={mobile}
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
                        <List.Icon {...props} icon="chevron-right" color="#09893E"/>
                    )}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <List.Item
                    style={styles.list}
                    onPress={() => navigation.navigate("Mobile")}
                    title="Mobile Advertisement"
                    titleStyle={{
                        color: "#292D32",
                        fontSize: 14,
                        fontFamily: "DMSans_500Medium",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: 20,
                    }}
                    left={(props) => (
                        <Image
                            source={digital}
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
                        <List.Icon {...props} icon="chevron-right" color="#09893E"/>
                    )}
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
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
})
