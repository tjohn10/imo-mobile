import React, {useState} from "react";
import {Text, StyleSheet, View, Alert, Dimensions, Keyboard} from "react-native";
import {TextInput} from "react-native-paper";
import {Button} from "react-native-elements";

export default function ChangePasswordScreen() {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);

    const changePassword = () => {
        if (oldPassword !== newPassword) {
            const url = 'https://portalapi.sandbox.abiapay.com/api/v1/user/update-forgot-password'
            fetch(url, {
                headers: {
                    'X-IBM-Client-Id': '26e9ccd3bc07c0dc1627609afcf4699d'
                },
                body: JSON.stringify({
                    password: newPassword
                })
            }).then((res) => res.json())
                .then((resJson) => {

                })
        } else {
            Alert.alert('Error Changing Password', 'Password Cannot be the same')
        }

    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.emailLBL}>Old Password</Text>
                <TextInput
                    mode="contained"
                    style={styles.input}
                    secureTextEntry={!passwordVisible}
                    value={oldPassword}
                    onChangeText={text => setOldPassword(text)}
                    right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} icon="eye"/>}
                />
            </View>
            <View>
                <Text style={styles.emailLBL}>New Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!newPasswordVisible}
                    value={newPassword}
                    keyboardType="default"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                    onChangeText={text => setNewPassword(text)}
                    right={<TextInput.Icon name={newPasswordVisible ? "eye" : "eye-off"} onPress={() => setNewPasswordVisible(!newPasswordVisible)}  icon="eye"/>}
                />
            </View>
            <View>
                <Button
                    title="Change Password"
                    onPress={changePassword}
                    titleStyle={styles.btnText}
                    buttonStyle={styles.button}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    emailLBL: {
        color: '#020614',
        marginTop: 20,
        marginLeft: 24,
        fontSize: 14,
        textAlign: 'left',
        fontStyle: 'normal',
        fontWeight: '400',
    },
    input: {
        width: Dimensions.get('screen').width - 32,
        height: 48,
        top: 14,
        marginTop: 11,
        marginRight: 16,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E1E1E1',
        backgroundColor: '#fff',
        marginLeft: 16
    },
    button: {
        width: Dimensions.get('screen').width - 32,
        marginTop: 41,
        height: 48,
        backgroundColor: '#09893E',
        borderRadius: 8,
        marginLeft: 16,
        marginRight: 16
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
        fontWeight: '700'
    },
})
