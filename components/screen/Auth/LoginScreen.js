import React, {createRef, useContext, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image, Keyboard, KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import forgot from "../../../assets/logo.png";
import {Button, CheckBox} from "react-native-elements";
import {Checkbox, PaperProvider, TextInput} from "react-native-paper";
import {AuthContext} from "../../../context/AuthContext";



export default function LoginScreen({navigation}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [walletBalance, setWalletBalance] = useState([])
    const [checked, setChecked] = useState(false)

    const [visible, setVisible] = React.useState(false);
    const passwordInputRef = createRef();

    const { login } = useContext(AuthContext);
    const loginHandle = (email, password) => {
        login(email, password)
    }
    return(
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.container}>
            <View>
                <KeyboardAvoidingView enabled>
                    <PaperProvider>
                        <Image source={forgot} style={styles.image} />
                        <Text style={styles.title}>
                            Welcome Back!
                        </Text>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.emailLBL}>Email Address</Text>
                            <TextInput
                                mode="contained"
                                style={styles.input}
                                placeholder="email@gmail.com"
                                value={email}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                                onChangeText={text => setEmail(text)}
                            />
                        </View>
                        <View>
                            <Text style={styles.emailLBL}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry={!passwordVisible}
                                value={password}
                                keyboardType="default"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                                onChangeText={text => setPassword(text)}
                                right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)}  icon="eye"/>}
                            />
                        </View>
                        <Text style={styles.forgot} onPress={() => navigation.navigate('Forgot')}>
                            Forgot Password ?
                        </Text>
                        {errorText !== '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errorText}
                            </Text>
                        ) : null}
                        <View>
                            {/*<CheckBox*/}
                            {/*    center*/}
                            {/*    checkedIcon='dot-circle-o'*/}
                            {/*    uncheckedIcon='circle-o'*/}
                            {/*    containerStyle={{backgroundColor: '#fff', borderColor: '#fff'}}*/}
                            {/*    onPress={() => (!checked)}*/}
                            {/*    title='By Clicking Login, You agree to our Terms and Conditions and you have read our Privacy Policy'*/}
                            {/*    checked={checked}*/}
                            {/*/>*/}
                            <View style={{flexDirection: 'row', justifyContent: 'space-between',width: Dimensions.get('screen').width - 36, marginLeft: 16, marginRight: 16, marginTop: 10}}>
                                <Checkbox
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                                <Text style={{width: 350, fontWeight: '500'}}>By Clicking Login, You agree to our Terms and Conditions and you have read our Privacy Policy</Text>
                            </View>
                            {
                                loading ? <ActivityIndicator size="large" color="#09893E"/> : (
                                    <Button
                                        title="Login"
                                        onPress={() => loginHandle(email, password)}
                                        buttonStyle={styles.button} />
                                )
                            }

                        </View>
                        <View>
                            <Text style={styles.subtext}>
                                Don’t have an account?
                                <Text style={styles.signup} onPress={()=>navigation.navigate('Signup')}>Sign Up</Text>
                            </Text>
                        </View>
                    </PaperProvider>
                </KeyboardAvoidingView>
            </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: Dimensions.get('screen').height,
    },
    image: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 120,
    },
    title:{
        fontSize: 24,
        fontWeight: "700",
        color: '#333',
        marginTop: 5,
        lineHeight: 26,
        letterSpacing: 0,
        textAlign: "center"
    },
    emailLBL: {
        color: '#020614',
        marginTop: 22,
        marginLeft: 24,
        fontSize: 14,
        textAlign: 'left',
        fontStyle: 'normal',
        fontWeight: '500',
    },
    input: {
        width: Dimensions.get('screen').width - 40,
        height: 48,
        top: 14,
        marginTop: 11,
        marginRight: 20,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor:'#fff',
        borderColor: '#0F0D23',
        marginLeft: 20
    },
    button:{
        width: 327,
        marginTop: 27,
        height: 48,
        backgroundColor: '#09893E',
        borderRadius: 8,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    forgot:{
        color: '#C4C4C4',
        fontSize: 12,
        fontStyle: 'normal',
        marginTop: 18,
        marginRight: 31,
        textAlign: 'right',
        fontWeight: '500'
    },
    subtext:{
        color: '#999',
        textAlign: 'center',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    signup:{
        color: '#09893E',
        fontSize: 14,
        marginLeft: 15,
        paddingLeft: 10,
        fontStyle: 'normal',
        fontWeight: '700'
    },
    modalTitle:{
        color: '#09893E',
        textAlign: 'center',
        fontFamily: 'DMSans_700Bold',
        fontSize: 20,
        marginTop: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 28
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
})
