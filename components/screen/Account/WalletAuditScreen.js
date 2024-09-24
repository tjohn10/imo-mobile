import React, {useContext, useEffect, useState} from "react";
import {View, Text, ActivityIndicator, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList} from "react-native";
import notification from "../../../assets/icons/notification.png";
import {AuthStore} from "../../../store";
import {Card} from "react-native-paper";
import {Button} from "react-native-elements";
import {AuthContext} from "../../../context/AuthContext";
import {MOBILE_API} from "../../../config";

export default function WalletAuditScreen({navigation}){
    const [walletDetails, setWalletDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const [auditDetails, setAuditDetails] = useState([])

    const info = AuthStore.useState()
    const {userToken} = useContext(AuthContext)
    const options = {  maximumFractionDigits: 2   }
    const getWalletDetails =  async () => {
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
                setWalletDetails(responseJson)
            })
            .catch((e) => {
                console.log(e)
            })
    }
 const getAuditDetails =  async () => {
        setLoading(true)
        const url = `${MOBILE_API}wallet/wallet-audit`
        await fetch(url, {
            headers:{
                'Authorization': 'Bearer' + userToken
            },
            method: 'POST'
        })
            .then((res)=>res.json())
            .then((responseJson) => {
                setLoading(false)
                setAuditDetails(responseJson.data)

            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        getAuditDetails()
        getWalletDetails()
    }, []);

    return(
        <View>
            <View>
                {
                    loading ? <ActivityIndicator color="#09893E" size="large" /> : (
                        <View style={{marginTop: 10}}>
                            <Card style={styles.topCard}>
                                <Card.Content>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                        <View>
                                            <Text style={styles.wallet}>Wallet Balance</Text>
                                            <Text style={styles.amount}>&#8358; {Intl.NumberFormat("en-US",options).format(walletDetails.wallet_balance) || 0}</Text>
                                            <Text style={styles.id}>Wallet ID: {walletDetails.wallet_id}</Text>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>
                    )
                }
            </View>
            <View>
                {/*{auditDetails.length !== 0 ?*/}
                {loading ? <ActivityIndicator color="#09893E" size="large" /> : (
                    <FlatList
                        data={auditDetails}
                        style={{marginTop: 10, marginBottom: 20}}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => (
                            <TouchableOpacity   onPress={() => navigation.navigate('Wallet Detail', {
                                    params: item
                                })}>
                                <Card style={styles.card} key={index}>
                                    <Card.Content>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={styles.name}>{item.transaction_desc}</Text>
                                            <Text style={styles.enumId}>Credit: &#8358;{Intl.NumberFormat("en-US",options).format(item.total_credit)}</Text>
                                        </View>
                                        {/*<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>*/}
                                        {/*    <Text style={styles.number}>Payment ref: {item.payment_ref}</Text>*/}
                                        {/*    <Text style={styles.enum}>Debit:&#8358;{Intl.NumberFormat("en-US",options).format(item.total_debit)} </Text>*/}
                                        {/*</View>*/}
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={styles.number}>Ref: {item.payment_ref}</Text>
                                            <Text style={styles.enum}>Debit:&#8358;{Intl.NumberFormat("en-US",options).format(item.total_debit)} </Text>
                                        </View>
                                    </Card.Content>
                                </Card>
                            </TouchableOpacity>
                        )}
                        />
                )
                }
                {/*    /> : <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '800'}}> No Data Found</Text>*/}
                {/*}*/}

            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    card:{
        marginTop: 15,
        width: Dimensions.get('screen').width - 32,
        marginLeft: 16,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    topCard:{
        // width: Dimensions.get("screen").width - 40,
        width: 350,
        borderRadius: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#09893E',
        shadowColor: 'rgba(0, 0, 0, 0.07)'
    },
    wallet:{
        color: '#fff',
        alignSelf: 'stretch',
        fontFamily: 'Mulish_400Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16
    },
    amount:{
        color: '#fff',
        fontFamily: 'Mulish_800ExtraBold',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 32
    },
    id:{
        color: '#fff',
        fontFamily: 'DMSans_400Regular',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: 0.1
    },
    name:{
        color: '#000',
        width: 160,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    enumId: {
        color: '#3BB143',
        textAlign: 'right',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16
    },
    enum:{
        color: '#FF0000',
        textAlign: 'right',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 16
    },
    number: {
        color: '#000',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '600'
    },
    button:{
        marginTop: 10,
        width: Dimensions.get("window").width - 32,
        height: 46,
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor: '#EAFFF3'
    }
})
