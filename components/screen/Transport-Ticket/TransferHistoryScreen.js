import React, {useContext, useEffect, useState} from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Card, TextInput} from "react-native-paper";
import {Button} from "react-native-elements";
import {StatusBar} from "expo-status-bar";
import Moment from 'moment';
import {AuthStore} from "../../../store";
import {AuthContext} from "../../../context/AuthContext";
import {MOBILE_API} from "../../../config";

export default function TransferHistoryScreen({navigation}) {
    const [transfers, setTransfers] = useState([])
    const [filteredTransfers, setFilteredTransfers] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)

    Moment.locale('en');
    const info = AuthStore.useState()
    const {userToken} = useContext(AuthContext)
    const options = {  maximumFractionDigits: 2   }

    useEffect(() => {
        navigation.addListener('focus', () => {
            getTransfers()
            getTotalCollected()
        });
        getTransfers()
        getTotalCollected()
    }, []);
    const getTransfers = () => {
        setLoading(true)
        fetch(`${MOBILE_API}wallet/transfer-history`, {
            headers:{
                'Authorization': 'Bearer' + userToken
            },
            method: 'POST'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false);
                setTransfers(responseJson.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const getTotalCollected = () => {
        setLoading(true)
        fetch(`${MOBILE_API}enumeration/total-collected`, {
            headers: {
                'Authorization': 'Bearer' + userToken
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false);
                setTotal(responseJson.data[0])
                console.log(total)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const searchTransfers = (text) => {
        if(text){
            const newData = transfers.filter(item => {
                const itemData = item.payer_accountName ? item.payer_accountName.toUpperCase() : ''.toUpperCase()
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setTransfers(newData);
        } else {
            getTransfers()
            setTransfers(transfers);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>Transfer History</Text>
                <TextInput
                    dense
                    mode="outlined"
                    outlineStyle={{height: 40, borderRadius: 40}}
                    style={styles.input}
                    placeholder="Search"
                    onChangeText={(text) => searchTransfers(text)}
                    right={<TextInput.Icon icon="filter" style={{width: 20, height: 20, marginLeft: 120, backgroundColor: '#fff'}}/>}
                />
            </View>
            <View style={{marginTop: 10}}>
                <Card style={styles.totalCard}>
                    <Card.Content>
                        <View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.cash}>Today's Collections</Text>
                                <Text style={styles.ePayments}>{Moment(Date.now()).format('D MMM yyyy')}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.amount}>₦{Intl.NumberFormat("en-US",options).format(total.total_amount) || 0}</Text>
                                <Text style={styles.enum}>{total.total_transactions || 0} Transfers</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
            </View>

            <View style={{marginBottom: 20}}>
                {
                    loading ? <><ActivityIndicator size="large"/></> : (
                        <FlatList
                            data={transfers}
                            style={{marginTop: 10, marginBottom: 40}}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Transfer Details', {
                                        params: {
                                            item
                                        }
                                    })}
                                >
                                    <Card style={styles.card} key={index}>
                                        <Card.Content>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={styles.name}>{item.payer_accountName}</Text>
                                                <Text style={styles.status}>{item.paymentStatus}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={styles.bank}>{item.payer_bankCode}</Text>
                                                <Text style={styles.enumId}>₦{item.payer_amountPaid}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={styles.number}>Ref: {item.sessionId}</Text>
                                                <Text style={styles.enum}> {Moment(item.createTime).format('d MMM yyyy')} </Text>
                                            </View>
                                        </Card.Content>
                                    </Card>
                                </TouchableOpacity>
                            )}
                        />
                    )}
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        color: '#071931',
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 24,
        marginLeft: 16,
        marginTop: 20
    },
    input: {
        width: 209,
        backgroundColor: '#f7f7f7',
        height: 40,
        borderColor: '#08983e',
        marginTop: 10,
        marginLeft: 34,
        borderRadius: 10,
        paddingBottom: 8,
        paddingLeft: 16,
        alignItems: 'flex-start'
    },
    totalCard: {
        width: Dimensions.get("screen").width - 32,
        marginLeft: 16,
        height: 76,
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor: '#09893E',
        shadowColor: 'rgba(0, 0, 0, 0.07)'
    },
    card: {
        marginTop: 15,
        width: Dimensions.get('screen').width - 32,
        marginLeft: 16,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    name: {
        color: '#000',
        fontFamily: 'DMSans_700Bold',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    enumId: {
        color: '#219653',
        marginTop: 10,
        fontFamily: 'DMSans_700Bold',
        textAlign: 'right',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 16
    },
    enum: {
        color: '#FFF',
        fontFamily: 'DMSans_700Bold',
        fontSize: 20,
        textAlign: 'right',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22,
        marginTop: 5
    },
    number: {
        color: '#000',
        fontFamily: 'DMSans_400Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700'
    },
    bank: {
        color: '#000',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        lineHeight:18,
        fontWeight: '700'

    },
    button: {
        marginTop: 10,
        width: Dimensions.get("window").width - 32,
        height: 46,
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor: '#EAFFF3'
    },
    cash: {
        color: '#FFF',
        fontFamily: 'DMSans_400Regular',
        fontSize: 10.263,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    ePayments: {
        color: '#FFF',
        marginLeft: 168,
        textAlign: 'right',
        fontFamily: 'DMSans_400Regular',
        fontSize: 10.263,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    amount: {
        color: '#FFF',
        fontFamily: 'DMSans_700Bold',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22,
        marginTop: 5
    },
    eAmount: {
        color: '#FFF',
        fontFamily: 'DMSans_700Bold',
        marginLeft: 170,
        fontSize: 20,
        textAlign: 'right',
        fontStyle: 'normal',
        fontWeight: '700',
        marginTop: 10,
        lineHeight: 22
    },
    status: {
        backgroundColor: '#09893E',
        color: '#fff',
        fontFamily: 'DMSans_700Bold',
        borderRadius: 8,
        padding: 4,
        fontSize: 12,
        textAlign: 'right',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 14
    }
})
