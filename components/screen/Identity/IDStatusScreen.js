import React, {useContext, useState} from 'react'
import {
    Dimensions,
    SafeAreaView,
    Text,
    TextInput,
    View,
    StyleSheet,
    Alert,
    ScrollView,
    ActivityIndicator
} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Button} from "react-native-elements";
import {FUNNY_API, MOBILE_API} from "../../../config";
import {AuthContext} from "../../../context/AuthContext";
import {Modal, PaperProvider, Portal} from "react-native-paper";

export default function IDStatusScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [idError, setIdError] = useState('');
    const [id, setId] = useState('')
    const [idStatus, setIdStatus] = useState()
    const [source, setSource] = useState()
    const [idView, setIdView] = useState(false)
    const [loading, setLoading] = useState(true)
    const [verifyResponse, setVerifyResponse] = useState([])
    const [bvnResponse, setBvnResponse] = useState([])
    const [visible, setVisible] = React.useState(false);
    const [visible1, setVisible1] = React.useState(false);

    const showModal = () => setVisible(true);
    const showModal1 = () => setVisible1(true);
    const hideModal = () => setVisible(false);
    const hideModal1 = () => setVisible1(false);
    const containerStyle = {
        backgroundColor: 'white',
        padding: 20,
        width: Dimensions.get('screen').width - 40,
        marginLeft: 20
    };

    const {userToken} = useContext(AuthContext)
    const validateID = () => {
        showModal()
        setLoading(true)
        if(source === 'NIN') {
            fetch(`${MOBILE_API}agent/nin-info`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    "id": id
                })
            }).then((res) => res.json())
                .then((resJson) => {
                    setLoading(false)
                    setBvnResponse(resJson)
                })
                .catch((e) => {
                    Alert.alert('Error Processing', e.message)
                })
        } else {
            fetch(`${MOBILE_API}agent/bvn-info`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    "id": id,
                })
            }).then((res) => res.json())
                .then((resJson) => {
                    setLoading(false)
                    setBvnResponse(resJson)
                })
                .catch((e) => {
                    Alert.alert('Error Processing', e.message)
                })
        }
    }
    const noIDRequest = () => {
        setLoading(true)
        showModal1()
        fetch(`${MOBILE_API}user/otp-request-no-id`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer' + userToken
            },
            body: JSON.stringify({
                value: phone,
                verify_via: "phone"
            })
        }).then((res) => res.json())
            .then((resJson) => {
                setLoading(false)
                setVerifyResponse(resJson.message)
            })
            .catch((e) => {
                Alert.alert('Error Processing', e.message)
            })
    }

    return (
        <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
            <PaperProvider>
                <View style={{marginTop: 5}}>
                    <Text style={styles.label}>Do you have an ID</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={idStatus}
                        onValueChange={(itemValue, itemIndex) => setIdStatus(itemValue)}
                    >
                        <Picker.Item label="Do you have an ID" value=""/>
                        <Picker.Item label="Yes" value="Yes"/>
                        <Picker.Item label="No" value="No"/>
                    </Picker>
                </View>
                <View>
                    {
                        idStatus === 'Yes' ?
                            <View>
                                <Portal>
                                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                        {
                                            loading ? <ActivityIndicator color="#09893E" size="large"/> : (
                                                <View>
                                                    {
                                                        bvnResponse.status === true ? (
                                                            <View>
                                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>{bvnResponse.message}</Text>
                                                                <Button
                                                                    title="Confirm User Details"
                                                                    type="outline"
                                                                    titleStyle={styles.newBtnText}
                                                                    onPress={() => navigation.navigate("User", {params: bvnResponse.data})}
                                                                    buttonStyle={styles.modalNewButton}/>
                                                            </View>
                                                        ) : (
                                                            <View>
                                                                <Text style={{fontWeight: '700', textAlign: 'center'}}>{bvnResponse.message}</Text>
                                                                <Button
                                                                    title="Try Again"
                                                                    type="outline"
                                                                    titleStyle={styles.newBtnText}
                                                                    onPress={() => hideModal()}
                                                                    buttonStyle={styles.modalNewButton}/>
                                                            </View>
                                                        )
                                                    }
                                                </View>

                                            )
                                        }
                                    </Modal>
                                </Portal>
                                <View style={{marginTop: 5}}>
                                    <Text style={styles.label}>Select Preferred ID Type</Text>
                                    <Picker
                                        style={styles.dropdown}
                                        selectedValue={source}
                                        onValueChange={(itemValue, itemIndex) => setSource(itemValue)}
                                    >
                                        <Picker.Item label="Select an ID" value=""/>
                                        <Picker.Item label="BVN" value="BVN"/>
                                        <Picker.Item label="NIN" value="NIN"/>
                                    </Picker>
                                </View>
                                <View style={{marginTop: 5}}>
                                    <Text style={styles.label}>Identity Number</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Identity Number"
                                        placeholderTextColor="#C4C4C4"
                                        keyboardType="number-pad"
                                        value={id}
                                        maxLength={11}
                                        minLength={11}
                                        returnKeyType="next"
                                        underlineColorAndroid="#f000"
                                        blurOnSubmit={false}
                                        onChangeText={(text) => setId(text)}

                                    />
                                    {idError !== '' ? (
                                        <Text style={styles.errorTextStyle}>{idError}</Text>
                                    ) : null}

                                </View>
                                <View style={{marginTop: 20}}>
                                    <Button
                                        title="Verify ID"
                                        titleStyle={styles.btnText}
                                        onPress={() => validateID()}
                                        buttonStyle={styles.nextBtnStyle}
                                    />
                                </View>
                            </View> : (
                                <View>
                                    <Portal>
                                        <Modal visible={visible1} onDismiss={hideModal1} contentContainerStyle={containerStyle}>
                                            <Text  style={{fontWeight: '700', textAlign: 'center'}}>{verifyResponse}</Text>
                                            <Button
                                                title="Verify OTP"
                                                type="outline"
                                                titleStyle={styles.newBtnText}
                                                onPress={() => navigation.navigate("OTP")}
                                                buttonStyle={styles.modalNewButton}/>
                                        </Modal>
                                    </Portal>
                                    {/*<View style={{marginTop: 5}}>*/}
                                    {/*    <Text style={styles.label}>Email Address</Text>*/}
                                    {/*    <TextInput*/}
                                    {/*        style={styles.input}*/}
                                    {/*        placeholder="Email"*/}
                                    {/*        placeholderTextColor="#C4C4C4"*/}
                                    {/*        value={email}*/}
                                    {/*        returnKeyType="next"*/}
                                    {/*        underlineColorAndroid="#f000"*/}
                                    {/*        blurOnSubmit={false}*/}
                                    {/*        onChangeText={(text) => setEmail(text)}*/}
                                    {/*    />*/}
                                    {/*</View>*/}

                                    {/*<View style={{marginTop: 5}}>*/}
                                    {/*    <Text style={styles.label}>Phone Number</Text>*/}
                                    {/*    <TextInput*/}
                                    {/*        style={styles.input}*/}
                                    {/*        placeholder="Phone Number"*/}
                                    {/*        placeholderTextColor="#C4C4C4"*/}
                                    {/*        value={phone}*/}
                                    {/*        keyboardType='number-pad'*/}
                                    {/*        returnKeyType="next"*/}
                                    {/*        underlineColorAndroid="#f000"*/}
                                    {/*        blurOnSubmit={false}*/}
                                    {/*        onChangeText={(text) => setPhone(text)}*/}
                                    {/*    />*/}
                                    {/*</View>*/}
                                    {/*<View style={{marginTop: 20}}>*/}
                                    {/*    <Button*/}
                                    {/*        title="Submit"*/}
                                    {/*        titleStyle={styles.btnText}*/}
                                    {/*        onPress={() => noIDRequest()}*/}
                                    {/*        // onPress={() => navigation.navigate("OTP")}*/}
                                    {/*        buttonStyle={styles.nextBtnStyle}*/}
                                    {/*    />*/}
                                    {/*</View>*/}

                                    <View style={{marginTop: 5}}>
                                        <Text style={{textAlign: 'center', fontSize: 24, fontWeight: '600',marginLeft: 'auto', marginRight: 'auto', marginTop: 25, width: 350}}>Please obtain an ID to continue this action</Text>
                                    </View>
                                </View>)
                    }
                </View>
            </PaperProvider>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    input: {
        width: Dimensions.get("screen").width - 32,
        height: 48,
        marginTop: 11,
        marginRight: 16,
        borderRadius: 8,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 24,
        paddingBottom: 12,
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: "#09893E",
        marginLeft: 16,
    },
    newBtnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
        fontWeight: '700'
    },
    dropdown: {
        width: Dimensions.get("screen").width - 32,
        height: 48,
        marginTop: 11,
        marginRight: 16,
        borderRadius: 8,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 24,
        paddingBottom: 12,
        borderWidth: 1,
        backgroundColor: "#EAFFF3",
        borderColor: "#09893E",
        marginLeft: 16,
    },
    label: {
        height: 22,
        color: "#071931",
        fontFamily: "DMSans_400Regular",
        fontSize: 14,
        marginLeft: 16,
        marginTop: 10,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 22,
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
    modalNewButton: {
        width: 300,
        height: 48,
        padding: 10,
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#09893E',
        backgroundColor: '#09893E',
        flexShrink: 0
    },
    errorTextStyle: {
        color: "red",
        textAlign: "center",
        fontSize: 14,
        marginTop: 12
    },
})
