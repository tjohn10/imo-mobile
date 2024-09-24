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
import tax from "../../../assets/tax.png";
import list from "../../../assets/icons/list.png";
import abssin from "../../../assets/icons/lists.png";
import pending from "../../../assets/icons/deadline.png";
import audit from "../../../assets/icons/money.png";
import later from "../../../assets/icons/pay-later.png";
import {MOBILE_API} from "../../../config";
import {AuthStore} from "../../../store";
import {AuthContext} from "../../../context/AuthContext";
import Moment from "moment";

export default function AccountScreen({navigation}){
    const [total, setTotal] = useState([])
    const [loading, setLoading] = useState(false)

    const userInfo = AuthStore.useState()
    const {userToken} = useContext(AuthContext)
    const options = {  maximumFractionDigits: 2   }
    useEffect(() => {
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
                console.log(total, "total")
            })
            .catch((e) => {
                console.log(e)
            })
    }, []);
    return(
        <SafeAreaView style={styles.container}>
            <View style={{marginTop: 10}}>
                {
                    loading ? <><ActivityIndicator size="large"/></> : (
                        <Card style={styles.totalCard}>
                            <Card.Content>
                                <View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={styles.cash}>Today's Collections</Text>
                                        <Text
                                            style={styles.ePayments}>{Moment(Date.now()).format('D MMM yyyy')}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text
                                            style={styles.amount}>₦{Intl.NumberFormat("en-US", options).format(total.total_amount) || 0}</Text>
                                        <Text style={styles.enum}>{total.total_transaction} Tickets</Text>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                    )}
            </View>
            <ScrollView>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Transactions')}
                        title="Transaction History"

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
                        left={props => <Image source={transaction} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Debit')}
                        title="Debit Later Transactions"

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
                        left={props => <Image source={later} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Statement')}
                        title="My Statement"

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
                        left={props => <Image source={statement} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('View Taxpayers')}
                        title="Manage ABSSIN"
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
                        left={props => <Image source={abssin} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="chevron-right" color="#09893E" />}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Pending Abssin')}
                        title="Pending ABSSIN"
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
                        left={props => <Image source={pending} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="chevron-right" color="#09893E" />}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('View Enumeration')}
                        title="My Enumeration List"
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
                        left={props => <Image source={list} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="chevron-right" color="#09893E" />}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Wallet Audit')}
                        title="Wallet Audit"
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
                        left={props => <Image source={audit} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
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
        color: '#FFF',
        textAlign: 'left',
        fontFamily: 'DMSans_400Regular',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '500'
    },
    amount:{
        color: '#FFF',
        fontFamily: 'DMSans_700Bold',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22,
        marginTop: 4
    },
    totalCard:{
        width: Dimensions.get("screen").width - 32,
        marginLeft: 16,
        marginTop: 20,
        marginBottom: 20,
        height: 76,
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor: '#09893E',
        shadowColor: 'rgba(0, 0, 0, 0.07)'
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
})
