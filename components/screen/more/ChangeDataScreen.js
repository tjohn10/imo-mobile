import React, {useState} from "react";
import {SafeAreaView, Text, StyleSheet, Image, View, TextInput, Dimensions, ScrollView} from "react-native";
import support from '../../../assets/icons/customer.png'
import feedback from "../../../assets/icons/feed.png";
import {Button} from "react-native-elements";

export default function ChangeDataScreen(){
    const [name, setName] = useState('')
    const [phoneNumber, settPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [lga, setLga] = useState('')
    return(
        <ScrollView style={styles.container}>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#C4C4C4"
                    value={name}
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    onChangeText={text => setName(text)}
                />
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#C4C4C4"
                    value={phoneNumber}
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    onChangeText={text => settPhoneNumber(text)}
                />
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#C4C4C4"
                    value={email}
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>LGA</Text>
                <TextInput
                    style={styles.textBox}
                    placeholder="LGA"
                    placeholderTextColor="#C4C4C4"
                    value={lga}
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    onChangeText={text => setLga(text)}
                />
            </View>
            <View style={{marginTop: 20}}>
                <Button
                    title="Continue"
                    titleStyle={styles.btnText}
                    onPress={() => {}}
                    buttonStyle={styles.nextBtnStyle} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    textBox:{
        width: Dimensions.get("screen").width - 32,
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
})
