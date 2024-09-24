import React, {useContext, useState} from "react";
import {ActivityIndicator, Alert, Dimensions, Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import OTPTextView from "react-native-otp-textinput";
import {Button} from "react-native-elements";
import {AuthContext} from "../../../context/AuthContext";
import {MOBILE_API} from "../../../config";
import {Modal, PaperProvider, Portal} from "react-native-paper";
import success from "../../../assets/success.png";
import cancel from "../../../assets/cancel.png";

export default function OTPScreen({navigation}) {
    const [code, setCode] = useState('')
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20, width: Dimensions.get('screen').width - 40, marginLeft: 20};
    const {userToken} = useContext(AuthContext)
    const verifyOTP = () => {
        showModal()
        setLoading(true)
        console.log(code)
        fetch(`${MOBILE_API}abssin/verify-otp`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer' + userToken,
                "Content-type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                code: code
            })
        }).then((res) =>  res.json())
            .then((resJson) => {
                setLoading(false)
                setResponse(resJson)
                console.log(resJson)
            })
            .catch((e) => {
                Alert.alert('Error Processing', e.message)
            })
    }
    return(
        <SafeAreaView style={styles.container}>
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        {
                            loading ? <ActivityIndicator color="#09893E" size="large"/> : (
                                <View style={{marginTop: 10, marginLeft: 16}}>
                                    {
                                        response.status === true ? (
                                            <View>
                                                <Image style={{
                                                    width: 100,
                                                    height: 100,
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    marginTop: 6,
                                                    marginBottom: 6,
                                                }} source={success}/>
                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>{response.response_message}</Text>
                                                <Button
                                                    title="Enter User Details"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => navigation.navigate("User", {params: response})}
                                                    buttonStyle={styles.modalButton}/>
                                            </View>
                                        ) : (
                                            <View>
                                                <Image style={{
                                                    width: 100,
                                                    height: 100,
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    marginTop: 6,
                                                    marginBottom: 6,
                                                }} source={cancel}/>
                                                <Text>{response.response_message}</Text>
                                                <Button
                                                    title="Try Again"
                                                    titleStyle={styles.btnText}
                                                    onPress={() => hideModal()}
                                                    // onPress={() => navigation.navigate("User")}
                                                    buttonStyle={styles.modalButton}/>
                                            </View>

                                        )
                                    }

                                </View>
                            )
                        }
                    </Modal>
                </Portal>
                <View style={styles.otpContainer}>
                    <OTPTextView
                        //  ref={e => (otpInput = e)}
                        //   containerStyle={styles.textInputContainer}
                        defaultValue={code}
                        handleTextChange={text => setCode(text)}
                        //   handleCellTextChange={handleCellTextChange}
                        inputCount={6}
                        keyboardType="numeric"
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <Button
                        title="Submit"
                        titleStyle={styles.btnText}
                        onPress={() => verifyOTP()}
                        buttonStyle={styles.nextBtnStyle}
                    />
                </View>
            </PaperProvider>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    otpContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        padding: 5,
        paddingVertical: 20,
    },
    modalButton: {
        width: 260,
        marginRight:'auto',
        marginLeft:'auto',
        height: 48,
        padding: 10,
        marginTop: 20,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#09893E',
        flexShrink: 0
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
})
