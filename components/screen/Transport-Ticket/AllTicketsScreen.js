import React, {useContext, useEffect, useState} from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Card, List} from "react-native-paper";
import validate from "../../../assets/icons/validate.png";
import transaction from "../../../assets/icons/transaction.png";
import statement from "../../../assets/icons/statement.png";
import corporate from '../../../assets/taxpayers.png'
import tolls from '../../../assets/icons/markets.png'
import market from '../../../assets/market.png'
import transfer from '../../../assets/money-transfer.png'
import {Mulish_400Regular} from "@expo-google-fonts/mulish";
import {AuthStore} from "../../../store";
import {AuthContext} from "../../../context/AuthContext";
import {MOBILE_API} from "../../../config";

export default function AllTicketsScreen({navigation}){
    const [loading, setLoading] = useState(false)
    const [walletBalance, setWalletBalance] = useState([])
    const [fidelityBalance, setFidelityBalance] = useState([]);
    const [fidelityDetails, setFidelityDetails] = useState([]);
    const [total, setTotal] = useState([])

    const info = AuthStore.useState()
    const {userToken} = useContext(AuthContext)

    const options = {  maximumFractionDigits: 2   }
    const getWallet =  async () => {
        setLoading(true)
        const url = `${MOBILE_API}dashboard/data`

        await fetch(url, {
            headers:{
                'Authorization': 'Bearer' + userToken
            },
            method: 'POST'
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setLoading(false)
                setWalletBalance(responseJson)
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
    const getFidelityDetails = async () => {
        setLoading(true);
        // const url = `${MOBILE_API}dashboard/data`;
        const url = 'https://sandboxapi.abssin.com/api/v1/paygate/get-account-details';
        await fetch(url, {
            headers: {
                'content-type': "application/json",
                'accept': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                'email': info.email
            })
        })
            .then((res) => res.json())
            .then((responseJson) => {
                setLoading(false);
                setFidelityDetails(responseJson);
                console.log(fidelityDetails, 'Fidelity')
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const getFidelityBalance = async () => {
        setLoading(true);
        // const url = `${MOBILE_API}dashboard/data`;
        const url = 'https://sandboxapi.abssin.com/api/v1/paygate/get-balance';
        await fetch(url, {
            headers: {
                'content-type': "application/json",
                'accept': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                'email': info.email
            })
        })
            .then((res) => res.json())
            .then((responseJson) => {
                setLoading(false);
                setFidelityBalance(responseJson);
                console.log(fidelityBalance, 'Fidelity Balance')
            })
            .catch((e) => {
                console.log(e);
            });
    };
    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log("reloaded");
            getWallet()
            getTotalCollected()
            getFidelityBalance()
            getFidelityDetails()
        });
        getWallet()
        getFidelityBalance()
        getFidelityDetails()
        getTotalCollected()
    }, []);
    return(
        <SafeAreaView style={styles.container}>
            {
                loading ? <ActivityIndicator color="#09893E" size="large" /> : (
                    <ScrollView horizontal style={{marginTop: 10}}>
                        <Card style={styles.totalCard}>
                            <Card.Content>
                                <View style={{marginBottom: 10}}>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                                        <View>
                                            <Text style={styles.walletTitle}>Wallet Balance</Text>
                                            <Text style={styles.amount}>&#8358;{Intl.NumberFormat("en-US",options).format(walletBalance.wallet_balance) || 0}</Text>
                                            <Text style={styles.collected}>Ledger Balance: &#8358;{Intl.NumberFormat("en-US",options).format(walletBalance.ledger_balance)}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.walletTitle}>Current Earnings</Text>
                                            <Text style={styles.amount}>&#8358;{Intl.NumberFormat("en-US",options).format(walletBalance.current_earnings)}</Text>
                                            <Text style={styles.collected}>Total Collected: &#8358;{Intl.NumberFormat("en-US",options).format(total.total_amount)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                        <Card style={styles.totalCard}>
                            <Card.Content>
                                <View style={{marginBottom: 10}}>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                                        <View>
                                            <Text style={styles.walletTitle}>Fidelity Balance</Text>
                                            <Text style={styles.amount}>&#8358;{Intl.NumberFormat("en-US",options).format(fidelityBalance.balance) || 0}</Text>
                                            <Text style={styles.collected}>Ledger Balance: &#8358;{Intl.NumberFormat("en-US",options).format(fidelityBalance.ledger_balance || 0)}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.walletTitle}>Current Earnings</Text>
                                            <Text style={styles.amount}>&#8358;{Intl.NumberFormat("en-US",options).format(fidelityBalance.earnings)}</Text>
                                            <Text style={styles.collected}>Total Collected: &#8358;{Intl.NumberFormat("en-US",options).format(total.total_amount)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                    </ScrollView>
                )
            }
            <ScrollView>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Tickets')}
                        title="Transport Ticket"
                        titleStyle={{
                            color: '#292D32',
                            fontSize: 14,
                            fontFamily: 'DMSans_500Medium',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: 20
                        }}
                        descriptionStyle={{
                            color: '#09893E',
                            fontFamily: 'DMSans_400Regular',
                            fontSize: 8,
                            fontStyle: 'normal',
                            fontWeight: '400',
                        }}
                        left={props => <Image source={validate} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Concessionaire')}
                        title="Flying Revenue"
                        titleStyle={{
                            color: '#292D32',
                            fontSize: 14,
                            fontFamily: 'DMSans_500Medium',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: 20
                        }}
                        descriptionStyle={{
                            color: '#09893E',
                            fontFamily: 'DMSans_400Regular',
                            fontSize: 8,
                            fontStyle: 'normal',
                            fontWeight: '400',
                        }}
                        left={props => <Image source={validate} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}
                    />
                </TouchableOpacity>
                {/*<TouchableOpacity>*/}
                {/*    <List.Item*/}
                {/*        style={styles.list}*/}
                {/*        onPress={() => navigation.navigate('Transport')}*/}
                {/*        title="Transport Emblem"*/}
                {/*        titleStyle={{*/}
                {/*            color: '#292D32',*/}
                {/*            fontSize: 14,*/}
                {/*            fontFamily: 'DMSans_500Medium',*/}
                {/*            fontStyle: 'normal',*/}
                {/*            fontWeight: '700',*/}
                {/*            lineHeight: 20*/}
                {/*        }}*/}
                {/*        descriptionStyle={{*/}
                {/*            color: '#09893E',*/}
                {/*            fontFamily: 'DMSans_400Regular',*/}
                {/*            fontSize: 8,*/}
                {/*            fontStyle: 'normal',*/}
                {/*            fontWeight: '400',*/}
                {/*        }}*/}
                {/*        left={props => <Image source={transaction} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}*/}
                {/*        right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}*/}
                {/*    />*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Market')}
                        title="Market Ticket"
                        titleStyle={{
                            color: '#292D32',
                            fontSize: 14,
                            fontFamily: 'DMSans_500Medium',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: 20
                        }}
                        descriptionStyle={{
                            color: '#09893E',
                            fontFamily: 'DMSans_400Regular',
                            fontSize: 8,
                            fontStyle: 'normal',
                            fontWeight: '400',
                        }}
                        left={props => <Image source={market} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Concessionaire', {
                            screen: 'Market'
                        })}
                        title="Market Daily Tolls"
                        titleStyle={{
                            color: '#292D32',
                            fontSize: 14,
                            fontFamily: 'DMSans_500Medium',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: 20
                        }}
                        descriptionStyle={{
                            color: '#09893E',
                            fontFamily: 'DMSans_400Regular',
                            fontSize: 8,
                            fontStyle: 'normal',
                            fontWeight: '400',
                        }}
                        left={props => <Image source={tolls} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Corporate')}
                        title="Corporate Transport Tickets"
                        titleStyle={{
                            color: '#292D32',
                            fontSize: 14,
                            fontFamily: 'DMSans_500Medium',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: 20
                        }}
                        descriptionStyle={{
                            color: '#09893E',
                            fontFamily: 'DMSans_400Regular',
                            fontSize: 8,
                            fontStyle: 'normal',
                            fontWeight: '400',
                        }}
                        left={props => <Image source={corporate} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}
                    />
                </TouchableOpacity>
                {/*<TouchableOpacity>*/}
                {/*    <List.Item*/}
                {/*        style={styles.list}*/}
                {/*        onPress={() => navigation.navigate('Presumptive')}*/}
                {/*        title="Drivers' Presumptive Tax"*/}
                {/*        titleStyle={{*/}
                {/*            color: '#292D32',*/}
                {/*            fontSize: 14,*/}
                {/*            fontFamily: 'DMSans_500Medium',*/}
                {/*            fontStyle: 'normal',*/}
                {/*            fontWeight: '700',*/}
                {/*            lineHeight: 20*/}
                {/*        }}*/}
                {/*        descriptionStyle={{*/}
                {/*            color: '#09893E',*/}
                {/*            fontFamily: 'DMSans_400Regular',*/}
                {/*            fontSize: 8,*/}
                {/*            fontStyle: 'normal',*/}
                {/*            fontWeight: '400',*/}
                {/*        }}*/}
                {/*        left={props => <Image source={tax} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}*/}
                {/*        right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}*/}
                {/*    />*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Transactions')}
                        title="Transaction History"
                        titleStyle={{
                            color: '#292D32',
                            fontSize: 14,
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: 20
                        }}
                        descriptionStyle={{
                            color: '#09893E',
                            fontSize: 8,
                            fontStyle: 'normal',
                            fontWeight: '400',
                        }}
                        // left={props => <List.Image {...props} source={box} style={{width: 12, height: 12}}/> }
                        right={props => <List.Icon {...props} icon="chevron-right" color="#09893E"/>}
                        left={props => <Image source={statement} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Transfer')}
                        title="Transfer History"
                        titleStyle={{
                            color: '#292D32',
                            fontFamily: 'DMSans_500Medium',
                            fontSize: 14,
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: 20
                        }}
                        descriptionStyle={{
                            color: '#09893E',
                            fontFamily: 'DMSans_500Medium',
                            fontSize: 8,
                            fontStyle: 'normal',
                            fontWeight: '400',
                        }}
                        left={props => <Image source={transfer} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="chevron-right" color="#09893E" />}
                    />
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    title:{
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        marginTop: 20,
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
    list:{
        width: Dimensions.get("screen").width - 32,
        marginLeft: 16,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 16,
        height: 80,
        flexShrink: 0,
        backgroundColor: '#fff',
        borderRadius: 18,
        shadowColor: 'rgba(15, 13, 35, 0.04)'
    },
    cash:{
        color: '#FFF',
        fontFamily: 'DMSans_400Regular',
        fontSize: 10.263,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    ePayments:{
        color: '#4CD964',
        textAlign: 'left',
        fontFamily: 'DMSans_400Regular',
        fontSize: 10.263,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    amount:{
        color: '#FFF',
        fontFamily: 'Mulish_800ExtraBold',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 28,
    },
    totalCard:{
        width: Dimensions.get("screen").width - 32,
        marginLeft: 16,
        marginTop: 20,
        height: 89,
        marginBottom: 20,
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor: '#09893E',
        shadowColor: 'rgba(0, 0, 0, 0.07)'
    },
    collected:{
        color: '#FFF',
        textAlign: 'right',
        fontFamily: 'DMSans_400Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: 0.1
    },
    walletTitle:{
        color: '#FFF',
        fontFamily: 'Mulish_400Regular',
        fontSize: 12,
        marginTop: -10,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16
    }
})
