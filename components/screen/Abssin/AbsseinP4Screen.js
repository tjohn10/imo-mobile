import React, {useState} from "react";
import {Text, View, TextInput, StyleSheet, ScrollView, Dimensions, Image} from "react-native";
import {Card, Divider} from "react-native-paper";
import avatar from "../../../assets/avatar.png";
import {Button} from "react-native-elements";

export default function AbsseinP4Screen(){
    const [otp, setOtp] = useState("")
    return(
        <ScrollView style={{flex: 1, height: Dimensions.get("screen").height - 20}}>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={styles.basic}>Basic Information</Text>
                            <Text style={styles.title}>Full Name: <Text style={styles.name}>Bruno
                                Otax</Text></Text>
                            <Text style={styles.title}>ID: <Text style={styles.name}>BVN </Text></Text>
                        </View>
                        <View>
                            <Image source={avatar} style={styles.avatar}/>
                        </View>
                    </View>
                </Card.Content>
            </Card>
            <View style={styles.sectionTwo}>
                <View style={{   flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.textTitle}>DOB</Text>
                    <Text style={styles.text}>12/01/01</Text>
                </View>
                <Divider style={{marginLeft: 16, marginRight: 16}} />
                <View style={{   flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.textTitle}>Gender</Text>
                    <Text style={styles.text}>Male</Text>
                </View>
                <Divider style={{marginLeft: 16, marginRight: 16}} />
                <View style={{   flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.textTitle}>Phone</Text>
                    <Text style={styles.text}>+2348143642100</Text>
                </View>
                <Divider style={{marginLeft: 16, marginRight: 16}} />
                <View style={{   flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.textTitle}>Email</Text>
                    <Text style={styles.text}>peterempire08@gmail.com</Text>
                </View>
                <Divider style={{marginLeft: 16, marginRight: 16, marginBottom: 28}} />
            </View>
            <View style={{marginTop: 5}}>
                <TextInput
                    keyboardType="numeric"
                    label="OTP"
                    outlineStyle={styles.input}
                    style={styles.input}
                    placeholder="OTP"
                    placeholderTextColor="#e1e1e1"
                    value={otp}
                    onChangeText={text => setOtp(text)}
                />
            </View>
            <View>
                <Button
                    title="Proceed To Review ABSSIN Data"
                    titleStyle={styles.verify}
                    onPress={() => {}}
                    buttonStyle={styles.button} />
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sectionTwo:{
        marginTop: 14,
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width - 32,
        marginLeft: 16,
    },
    title: {
        color: '#5B5B5B',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    name: {
        color: '#071931',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 17.81
    },
    datePickerStyle: {
        width: Dimensions.get("screen").width - 32,
        marginLeft: 16
    },
    card: {
        marginTop: 15,
        width: Dimensions.get('screen').width - 32,
        marginLeft: 16,
        borderRadius: 8,
        backgroundColor: '#EAFFF3'
    },
    textTitle: {
        color: "#5B5B5B",
        paddingStart: 16,
        paddingBottom: 18,
        paddingTop: 14,
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 17.81
    },
    input: {
        width: Dimensions.get("screen").width - 32,
        height: 48,
        marginTop: 20,
        marginRight: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E1E1E1',
        marginLeft: 16
    },
    label: {
        marginTop: 5,
        marginLeft: 16,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    text: {
        color: '#071931',
        paddingBottom: 18,
        paddingEnd: 16,
        paddingTop: 14,
        textAlign: 'right',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 17.81
    },
    button:{
        width: Dimensions.get("screen").width - 32,
        marginTop: 17,
        height: 48,
        backgroundColor: '#09893E',
        borderRadius: 8,
        marginLeft: 16,
        marginRight: 16
    },
})
