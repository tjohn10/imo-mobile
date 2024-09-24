import React, {useContext, useState} from "react";
import {Text, View, StyleSheet, SafeAreaView, TextInput, Dimensions, Image} from "react-native";
import {Button} from "react-native-elements";
import {AuthContext} from "../../context/AuthContext";
import {Modal, PaperProvider, Portal} from "react-native-paper";
import joinImage from '../../assets/icons/join.png'

export default function JoinGroupScreen({navigation}){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const {userToken} = useContext(AuthContext)
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20, width: Dimensions.get('screen').width - 40, marginLeft: 20};

    const join = () => {
        setLoading(true)
        fetch('', {
            headers: {
                Authorisation: 'Bearer' + userToken
            },
            method: 'POST',
            body: JSON.stringify({})
        }).then((res) => res.json())
            .then((resJson) => {
                setLoading(false)
            })
    }
    return(
        <SafeAreaView style={styles.container}>
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Image source={joinImage} style={{
                            marginLeft: 'auto',
                            marginRight: 'auto',

                        }}/>
                        <Text style={styles.success}>Success 🚀</Text>
                        <Text style={styles.texts}>You have successfully join the group. You can now start selling tickets</Text>
                        <Button
                            title="Get Started"
                            titleStyle={styles.btnText}
                            onPress={() => navigation.navigate("Home")}
                            buttonStyle={styles.modalButton} />
                    </Modal>
                </Portal>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Taxpayer Name"
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
                    placeholder="Taxpayer Phone No"
                    placeholderTextColor="#C4C4C4"
                    value={phoneNumber}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    maxLength={11}
                    onChangeText={text => setPhoneNumber(text)}
                />
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Taxpayer Email"
                    placeholderTextColor="#C4C4C4"
                    value={email}
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    keyboardType="email-address"
                    autoComplete="email"
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View style={{marginTop: 20}}>
                <Button
                    title="Submit"
                    titleStyle={styles.btnText}
                    onPress={() => join()}
                    buttonStyle={styles.nextBtnStyle} />
            </View>
            </PaperProvider>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    input: {
        width: Dimensions.get('screen').width - 32,
        height: 48,
        marginTop: 11,
        marginRight: 16,
        borderRadius: 8,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 24,
        paddingBottom: 12,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#09893E',
        marginLeft: 16
    },
    texts:{
        color: '#071931',
        textAlign: 'center',
        fontFamily: "DM Sans",
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    success:{
        color: '#09893E',
        marginTop: 20,
        marginBottom: 8,
        textAlign: 'center',
        fontFamily: "DM Sans",
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 28
    },
    label: {
        height: 22,
        color: '#071931',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        marginLeft: 16,
        marginTop: 10,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22
    },
    nextBtnStyle: {
        width: Dimensions.get('screen').width - 32,
        height: 48,
        padding: 10,
        marginLeft: 16,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#09893E',
        flexShrink: 0
    },
    modalButton: {
        width: 260,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 48,
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#09893E',
        flexShrink: 0
    },
    btnText: {
        color: '#fff',
        fontFamily: 'DMSans_400Regular',
    }
})
