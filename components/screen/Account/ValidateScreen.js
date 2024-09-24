import React, {useState} from "react";
import {ActivityIndicator, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import {Button} from "react-native-elements";
import {PaperProvider, Portal, Modal} from "react-native-paper";

export default function ValidateScreen({navigation}){
    const [reference, setReference] = useState("")
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState([])

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20, width: Dimensions.get('screen').width - 32, marginLeft: 16};

    const verifyPayment = () => {
        setLoading(true)

        const  url = 'https://rgw.awtom8.africa/abia/sandbox/v1/ValidatePaymentDetails'
        fetch(url, {
            headers:{
                'X-IBM-Client-Id': '26e9ccd3bc07c0dc1627609afcf4699d',
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                referenceId : reference
            })
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                showModal()
                setLoading(false)
                setResponse(responseJson)
                console.log(responseJson)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    return(

        <PaperProvider>
            {
                loading ? <><ActivityIndicator size="large"/></> : (
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text style={styles.title}>Transaction Details</Text>
                    <View>
                        <Text style={styles.label}>Payment Reference</Text>
                        <Text style={styles.select}>{response.referenceId}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Customer Name</Text>
                        <Text style={styles.select}>{response.customerName}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Phone Number</Text>
                        <Text style={styles.select}>{response.otherDetails.phone}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Amount</Text>
                        <Text style={styles.select}>₦{response.totalamount}</Text>
                    </View>
                    {/*<View style={{marginTop: 5}}>*/}
                    {/*    <Text style={styles.label}>Status Message</Text>*/}
                    {/*    <Text style={styles.select}>{response.statusMessage}</Text>*/}
                    {/*</View>*/}
                    <View style={{marginTop: 5}}>
                        <Button
                            title="Back to Transactions"
                            titleStyle={styles.verify}
                            onPress={() => navigation.navigate('Transactions')}
                            buttonStyle={styles.modalButton} />
                    </View>
                </Modal>
            </Portal>
                )}
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Validate</Text>
                <Text style={styles.select}>Enter Payment Ref Number to Validate Transaction</Text>
                <View>
                    <Text style={styles.label}>Payment Reference</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Payment Reference"
                        placeholderTextColor="#e1e1e1"
                        value={reference}
                        onChangeText={text => setReference(text)}
                    />
                </View>
                <View>
                    <Button
                        title="Verify Payment"
                        titleStyle={styles.verify}
                        onPress={verifyPayment}
                        buttonStyle={styles.button} />
                </View>
            </SafeAreaView>
        </PaperProvider>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    title:{
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        marginTop: 10,
        marginLeft: 16,
        lineHeight: 32
    },
    select:{
        color: '#5B5B5B',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        marginLeft: 16,
        marginTop: 12,
        lineHeight: 22
    },
    label:{
        marginTop: 10,
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
        padding: 5,
        backgroundColor: '#09893E',
        borderRadius: 8,
        marginLeft: 16,
        marginRight: 16
    },
    modalButton:{
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
    }
})
