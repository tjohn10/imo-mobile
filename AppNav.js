import React, {useContext, useEffect, useRef, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import AppStack from "./components/AppStack";
import AuthStack from "./components/AuthStack";
import {AuthContext} from "./context/AuthContext";
import {ActivityIndicator, Alert, PermissionsAndroid, Platform, View} from "react-native";

import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        token = (await Notifications.getExpoPushTokenAsync({ projectId: '71c80c13-140f-49cb-9068-9f063518f605' })).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}
export default function AppNav(){
    const {isLoading, userToken} = useContext(AuthContext)
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            console.log(token, 'token')
            setExpoPushToken(token)
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
        };

    })



    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
    return(
        <NavigationContainer>
            <StatusBar style="dark"/>
            {userToken !== null ? <AppStack/> :
                <AuthStack/>
            }
        </NavigationContainer>
    )
}
