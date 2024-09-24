import React, {useEffect, useRef, useState} from "react";
import {SafeAreaView, Text, StyleSheet, Image, Dimensions, View, TextInput, Platform} from "react-native";
import feedback from '../../../assets/icons/feed.png'
import {Rating} from "react-native-ratings";
import {Button} from "react-native-elements";
import * as Notifications from 'expo-notifications';
import * as Device from "expo-device";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
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
        token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
        });
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token.data;
}
export default function FeedbackScreen(){
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const [ratingCompleted, setRatingCompleted] = useState('')
    return(
        <SafeAreaView style={styles.container}>
            <Image source={feedback} style={{
                marginRight: 'auto',
                marginLeft: 'auto'
            }}/>
            <View>
                <Text style={styles.title}>Please Rate your Experience</Text>
                <Rating
                    style={{marginTop: 10, width: Dimensions.get('screen').width - 40, marginLeft: 20, marginRight: 20}}
                    type='star'
                    ratingCount={5}
                    imageSize={40}
                />
            </View>
            <View>
                <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    onChangeText={text => onChangeText(text)}
                    style={styles.input}
                />
            </View>
            <View>
                <Button
                    title="Submit Feedback"
                    titleStyle={styles.verify}
                    onPress={() => submit()}
                    buttonStyle={styles.button} />
            </View>
        </SafeAreaView>
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
        //     <Text>Your expo push token: {expoPushToken}</Text>
        //     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        //         <Text>Title: {notification && notification.request.content.title} </Text>
        //         <Text>Body: {notification && notification.request.content.body}</Text>
        //         <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        //     </View>
        //     <Button
        //         title="Press to Send Notification"
        //         onPress={async () => {
        //             await sendPushNotification(expoPushToken);
        //         }}
        //     />
        // </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    title: {
        color: '#071931',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 24,
        marginLeft: 16,
        marginTop: 20
    },
    input: {
        width: Dimensions.get("screen").width - 32,
        height: 100,
        top: 14,
        padding: 10,
        marginTop: 11,
        fontWeight: '600',
        marginRight: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#09893E',
        marginLeft: 16
    },
    button:{
        width: Dimensions.get("screen").width - 32,
        marginTop: 37,
        height: 48,
        backgroundColor: '#09893E',
        borderRadius: 8,
        marginLeft: 16,
        marginRight: 16
    },
})
