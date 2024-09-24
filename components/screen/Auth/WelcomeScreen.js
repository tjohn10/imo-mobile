import React from "react";
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import img from "../../../assets/hand.png";
import {Button} from "react-native-elements";

export default function WelcomeScreen({navigation}){
    return(
        <SafeAreaView style={styles.container}>
            <Image source={img} style={styles.image} />
            <Text style={styles.title}>
                Easy To Use
            </Text>
            <Text style={styles.subtitle}>
                Very easy to use and easy to understand for those of you who are beginners
            </Text>
            <View>
                <Button
                    title="Create Account"
                    onPress={() => navigation.navigate('Signup')}
                    buttonStyle={styles.button} />
            </View>
            <View>
                <Button
                    title="Login"
                    titleStyle={{ color: '#09893E'}}
                    onPress={() => navigation.navigate('Login')}
                    buttonStyle={styles.loginBtn} />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    image: {
        width: 217,
        marginTop: 61,
        height: 217,
    },
    title:{
        fontSize: 20,
        fontWeight: "700",
        color: '#262626',
        marginTop: 80,
        lineHeight: 26,
        letterSpacing: 0,
        textAlign: "center"
    },
    subtitle: {
        width: 261,
        fontSize: 14,
        color: '#999',
        marginTop: 20,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0,
        textAlign: 'center'
    },
    button:{
        width: 327,
        marginTop: 96,
        height: 48,
        backgroundColor: '#09893E',
        borderRadius: 8
    },
    loginBtn: {
        width: 327,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginTop: 15,
        borderColor: '#09893e',
        borderWidth: 2,
        height: 48
    }
})
