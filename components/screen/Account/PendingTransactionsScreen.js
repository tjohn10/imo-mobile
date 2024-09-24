import React, {useContext, useEffect, useState} from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, ScrollView
} from "react-native";
import {Card, TextInput} from "react-native-paper";
import CardSlider from 'react-native-cards-slider';
import {StatusBar} from "expo-status-bar";
import {AuthStore} from "../../../store";
import {MOBILE_API} from "../../../config";
import Moment from "moment";
import {AuthContext} from "../../../context/AuthContext";

export default function PendingTransactionsScreen({navigation}) {
    const [payments, setPayments] = useState([])
    const [filteredPayments, setFilteredPayments] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState([])
    const [searchText, setSearchText] = useState('')
    const info = AuthStore.useState()
    const {userToken} = useContext(AuthContext)


    useEffect(() => {
        navigation.addListener('focus', () => {
            getTransactions()
            getTotalCollected()
        });
        getTransactions()
        getTotalCollected()
    }, []);

    const options = {maximumFractionDigits: 2}
    const getTransactions = () => {
        setLoading(true)
        fetch(`${MOBILE_API}wallet/debit-later?limit=20&page=1&status=Pending`, {
            headers: {
                'Authorization': 'Bearer' + userToken
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false);
                setPayments(responseJson.new_data)
                console.log(payments)
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
    const searchTransaction = (text) => {
        if (text) {
            const newData = payments.filter(item => {
                const itemData = item.trans_ref ? item.trans_ref.toUpperCase() : ''.toUpperCase()
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setPayments(newData);
        } else {
            getTransactions()
            setPayments(payments);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.title}>Transactions</Text>
                <TextInput
                    dense
                    mode="outlined"
                    outlineStyle={{height: 40, borderRadius: 40}}
                    style={styles.input}
                    placeholder="Search"
                    onChangeText={(text) => searchTransaction(text)}
                    right={<TextInput.Icon icon="filter"
                                           style={{width: 20, height: 20, marginLeft: 120, backgroundColor: '#fff'}}/>}
                />
            </View>
            <View style={{marginBottom: 30}}>
                {
                    loading ? <><ActivityIndicator size="large"/></> : (
                        <FlatList
                            data={payments}
                            style={{marginTop: 10, marginBottom: 60}}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={(
                                <Text style={{
                                    fontStyle: 'normal',
                                    fontWeight: '900',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    fontSize: 16
                                }}>No data Found</Text>
                            )}
                            renderItem={({item, index}) => (
                                <TouchableOpacity onPress={() => navigation.navigate('Details', {
                                    params: {
                                        item
                                    }
                                })}>

                                    <Card style={styles.card} key={index}>
                                        <Card.Content>
                                            <View
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between'
                                                }}>
                                                <Text
                                                    style={{fontWeight: '600'}}>{item.plate_number}</Text>
                                                <Text
                                                    style={styles.price}>&#8358;{item.amount}</Text>
                                            </View>
                                            <View
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between'
                                                }}>
                                                <Text
                                                    style={styles.date}>{item.trans_type || item.ticket_type || item.revenue_item || item.vehicleType}</Text>
                                                <Text
                                                    style={{
                                                        backgroundColor: item.status === 'COMPLETED' ? '#09893E' : 'yellow',
                                                        color: item.status === 'COMPLETED' ? 'white' : 'black',
                                                        fontFamily: 'DMSans_700Bold',
                                                        padding: 5,
                                                        fontSize: 12,
                                                        borderRadius: 8,
                                                        textAlign: 'right',
                                                        fontStyle: 'normal',
                                                        fontWeight: '600',
                                                        lineHeight: 22
                                                    }}>
                                                    {item.process_status.toUpperCase()}</Text>
                                            </View>
                                            {/*<View*/}
                                            {/*    style={{flexDirection: 'row', justifyContent: 'space-between'}}>*/}
                                            {/*    <Text style={{*/}
                                            {/*        fontWeight: '400',*/}
                                            {/*        fontSize: 13*/}
                                            {/*    }}>{item.next_date || item.taxpayer_name}</Text>*/}
                                            {/*    <Text style={styles.type}>{item.payment_period}</Text>*/}
                                            {/*</View>*/}
                                            <View
                                                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{
                                                    fontWeight: '500',
                                                    fontSize: 14
                                                }}>Ref:{item.payment_ref}</Text>
                                                <Text style={{
                                                    fontWeight: '500',
                                                    fontSize: 14
                                                }}>{Moment(item.trans_date).format('D MMM yyyy')}</Text>
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
        // marginLeft: 34,
        marginRight: 16,
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
        marginTop: 5,
        width: Dimensions.get('screen').width - 32,
        marginLeft: 16,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    name: {
        color: '#000',
        marginLeft: 10,
        marginTop: 10,
        fontFamily: 'DMSans_700Bold',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    enumId: {
        color: '#219653',
        marginRight: 10,
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
        color: '#8A8A8A',
        fontFamily: 'DMSans_400Regular',
        fontSize: 10.263,
        marginLeft: 10,
        fontStyle: 'normal',
        fontWeight: '400'
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
        textAlign: 'right',
        fontFamily: 'DMSans_400Regular',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '500'
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
        fontSize: 20,
        marginRight: 10,
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
        padding: 5,
        fontSize: 12,
        borderRadius: 8,
        textAlign: 'right',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22
    },
    price: {
        color: '#09893E',
        fontFamily: 'DMSans_700Bold',
        fontSize: 16,
        textAlign: 'right',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22
    },
    type: {
        color: '#09893E',
        fontFamily: 'DMSans_700Bold',
        marginLeft: 50,
        fontSize: 15,
        textAlign: 'right',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22
    },
    date: {
        color: '#0e0e0e',
        fontFamily: 'DMSans_700Bold',
        fontSize: 13,
        textAlign: 'right',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22
    },
    listTitle: {
        color: '#0e0e0e',
        fontFamily: 'DMSans_700Bold',
        fontSize: 18,
        textAlign: 'left',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22
    }
})
