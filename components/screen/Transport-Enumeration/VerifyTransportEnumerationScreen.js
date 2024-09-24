
import React, {useState} from "react";
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {Button} from "react-native-elements";
import QR from '../../../assets/icons/img.png'
import sync from '../../../assets/icons/sync.png'

export default function VerifyTransportEnumerationScreen(){
    const [code, setCode] = useState("")
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Verify Ticket</Text>
            <Text style={styles.select}>Scan your QR Code</Text>
            <View style={{backgroundColor: 'rgba(217, 217, 217, 0.32)'}}>
                <Image source={QR} style={{width: Dimensions.get('screen').width - 32, height: 363, marginLeft: 16}} />
            </View>
            <Text style={styles.qrText}>
                The QR Code will be automatically detected when you position it between the guide lines
            </Text>
            <Image source={sync} style={styles.syncImg}/>
            <View>
                <Button
                    title="Verify Ticket"
                    titleStyle={styles.verify}
                    onPress={() => {}}
                    buttonStyle={styles.button} />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    title:{
        fontSize: 24,
        color: '#071931',
        fontStyle: 'normal',
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 25,
        lineHeight: 32
    },
    select:{
        color: '#071931',
        marginTop: 25,
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'DMSans_700Bold',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 32
    },
    label:{
        marginTop: 25,
        marginLeft: 16,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    input: {
        width: Dimensions.get("screen").width - 32,
        height: 48,
        top: 14,
        marginTop: 11,
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
    verify:{
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700'
    },
    qrText:{
        color: '#A4A2A2',
        marginLeft: 27,
        marginTop: 11,
        textAlign: 'center',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        width: 322,
        height: 44,
    },
    syncImg:{
        width: 60,
        height: 60,
        marginTop: 11,
        marginLeft: Dimensions.get('screen').width / 2 - 30,
        justifyContent: "center"
    }
})
