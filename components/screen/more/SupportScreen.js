import React, {useEffect, useRef, useState} from "react";
import {SafeAreaView, Text, StyleSheet, Image, View, TextInput, Dimensions, ScrollView, Platform} from "react-native";
import support from '../../../assets/icons/customer.png'
import feedback from "../../../assets/icons/feed.png";
import {Button} from "react-native-elements";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { registerForPushNotificationsAsync} from "../../../AppNav";
export default function SupportScreen({navigation}){
    const [name, setName] = useState('')
    const [phoneNumber, settPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [comments, setComments] = useState('')

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
        }).catch((e) => console.log(e))
    })

    const sendNotification = async () => {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'initial Notification',
            body: 'New Notification'
        }
        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                host: "exp.host",
                accept: "application/json",
                "accept-encoding": "gzip, deflate",
                "content-type": "application/json"
            },
            body: JSON.stringify(message)
        })
            .then()
            .catch()
    }
    return(
        <ScrollView style={styles.container}>
            <View style={{marginTop: 20}}>
                <Image source={support} style={{
                    marginRight: 'auto',
                    marginLeft: 'auto'
                }}/>
                <Text style={styles.label}>Leave us a message and we'll get back to you</Text>
            </View>
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
                <Text style={styles.label}>Comments</Text>
                <TextInput
                    multiline
                    numberOfLines={4}
                    style={styles.textBox}
                    placeholder="Comments"
                    placeholderTextColor="#C4C4C4"
                    value={comments}
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    onChangeText={text => setComments(text)}
                />
            </View>
            <View style={{marginTop: 20}}>
                <Button
                    title="Submit"
                    titleStyle={styles.btnText}
                    onPress={() => sendNotification()}
                    buttonStyle={styles.nextBtnStyle} />
            </View>
            <Text
                style={{
                fontSize: 14,
                textAlign: 'center',
                fontWeight: '500',
                fontFamily: "DMSans_400Regular",
                color: '#2D64F5',
                marginBottom: 20
            }}
                onPress={() => navigation.navigate('Chat')}
            >Or You can Chat Now</Text>
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
        fontWeight: "700",
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
