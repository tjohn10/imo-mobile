import React, {useContext, useEffect, useState} from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View, ScrollView
} from "react-native";
import {Card, TextInput} from "react-native-paper";
import CardSlider from 'react-native-cards-slider';
import {StatusBar} from "expo-status-bar";
import {AuthStore} from "../../../store";
import {MOBILE_API} from "../../../config";
import Moment from "moment";
import dayjs from "dayjs";
import {AuthContext} from "../../../context/AuthContext";
import Carousel from 'react-native-snap-carousel';
import CardSilder from 'react-native-cards-slider';

export default function ViewTransactionsScreen({navigation}) {
    const [payments, setPayments] = useState([])
    const [filteredPayments, setFilteredPayments] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState([])
    const [searchText, setSearchText] = useState('')
    const [status, setStatus] = useState('Completed')

    const url = process.env.BASE_URL
    const info = AuthStore.useState()
    const {userToken} = useContext(AuthContext)

    _renderItem = ({item, index}) => {
        return (
            <View>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    }


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
        fetch(`${MOBILE_API}transport/transactions`, {
            headers: {
                'Authorization': 'Bearer' + userToken
            },
            method: 'POST'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false);
                setPayments(responseJson.data)
                setStatus(responseJson.data.status)
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
        // const newData = payments.filter((item) => {
        //     return item.trans_ref.search(text) > -1;
        // });
        // setPayments(newData);
        // setSearchText(text);
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
            <View style={{marginTop: 10}}>
                {
                    loading ? <><ActivityIndicator size="large"/></> : (
                        <ScrollView horizontal style={{marginRight: 16}}>
                            <Card style={styles.totalCard}>
                                <Card.Content>
                                    <View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={styles.cash}>Today's Collections</Text>
                                            <Text
                                                style={styles.ePayments}>{Moment(Date.now()).format('DD MMM yyyy')}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text
                                                style={styles.amount}>₦{Intl.NumberFormat("en-US", options).format(total.total_amount) || 0}</Text>
                                            <Text style={styles.enum}>{total.total_transaction} Tickets</Text>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                            <Card style={styles.totalCard}>
                                <Card.Content>
                                    <View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={styles.cash}>Week's Collection</Text>
                                            <Text style={styles.cash}>Month's Collection</Text>
                                            {/*<Text style={styles.ePayments}>{Moment(Date.now()).format('D MMM yyyy')}</Text>*/}
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <View>
                                                <Text
                                                    style={styles.amount}>₦{Intl.NumberFormat("en-US", options).format(total.total_amount_weekly) || 0}</Text>
                                                <Text style={styles.cash}>{total.total_transaction_weekly} Tickets</Text>
                                            </View>
                                            <View>
                                                <Text
                                                    style={styles.amount}>₦{Intl.NumberFormat("en-US", options).format(total.total_amount_monthly) || 0}</Text>
                                                <Text style={styles.cash}>{total.total_transaction_monthly} Tickets</Text>
                                            </View>

                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                        </ScrollView>

                    )}
            </View>
            <View style={{marginBottom: 30}}>
                {
                    loading ? <><ActivityIndicator size="large"/></> : (
                        <FlatList
                            data={payments}
                            style={{marginTop: 10, marginBottom: 60}}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => (
                                <TouchableOpacity onPress={() => navigation.navigate('Transaction Detail', {
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
                                                    style={{fontWeight: '600'}}>{item.trans_ref || item.shopNumber + '' + item.zoneLine}</Text>
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
                                                    style={styles.date}>{item.trans_type || item.revenue_item || item.vehicleType}</Text>
                                                <Text
                                                    style={{
                                                        backgroundColor: item.status === 'Completed' ? '#09893E' : 'yellow',
                                                        color: item.status === 'Completed' ? 'white' : 'black',
                                                        fontFamily: 'DMSans_700Bold',
                                                        padding: 5,
                                                        fontSize: 12,
                                                        borderRadius: 8,
                                                        textAlign: 'right',
                                                        fontStyle: 'normal',
                                                        fontWeight: '600',
                                                        lineHeight: 22
                                                    }}>
                                                    {item.status}</Text>
                                            </View>
                                            <View
                                                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{
                                                    fontWeight: '400',
                                                    fontSize: 13
                                                }}>{item.next_date || item.taxpayer_name}</Text>
                                                <Text style={styles.type}>{item.payment_period}</Text>
                                            </View>
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
        height: 115,
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
