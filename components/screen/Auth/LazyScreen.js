import React from "react";
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import { Button } from 'react-native-elements';
import img from '../../../assets/p1.png'
export default function LazyScreen({navigation}){
    return(
        <SafeAreaView style={styles.container}>
            <Image source={img} style={styles.image} />
            <Text style={styles.title}>
                Easy for Supervision
            </Text>
            <Text style={styles.subtitle}>
                Very easy to supervise your ABIA IRS Agent, Tax Payers, Transaction History etc.
            </Text>
            <View>
                <Button
                    title="Next Step"
                    onPress={() => navigation.navigate('Welcome')}
                    buttonStyle={styles.button} />
            </View>
            <Text
                onPress={() => navigation.navigate('Login')}
                style={styles.skip}
            >
                Skip This Step
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center'
    },
    image: {
        width: 217,
        top: 51,
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
    skip: {
        fontSize: 16,
        marginTop: 15,
        fontWeight: '700',
        lineHeight: 21,
        color: '#09893E',
        textDecorationLine: 'underline',
        textAlign: 'center'
    }
})
