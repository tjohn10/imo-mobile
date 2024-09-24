import React, {useContext, useEffect, useState} from "react";
import {Text, StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Dimensions} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Card, TextInput} from "react-native-paper";
import {Button} from "react-native-elements";
import {MOBILE_API} from "../../../config";
import {AuthStore} from "../../../store";
import {AuthContext} from "../../../context/AuthContext";

export default function ManageAgentsScreen({navigation}){
    const [loading, setLoading] = useState(false)
    const [agents, setAgents] = useState([])

    const userInfo = AuthStore.useState()
    const {userToken} = useContext(AuthContext)

    useEffect(() => {
        setLoading(true)
        fetch(`${MOBILE_API}agent`, {
            headers: {
                Authorization: "Bearer" + userToken,
                'Content-type': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                setLoading(false)
                setAgents(resJson.data)
            })
    }, []);
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>Manage Agents</Text>
                <TextInput
                    dense
                    mode="outlined"
                    outlineStyle={{height: 40, borderRadius: 40}}
                    style={styles.input}
                    placeholder="Search"
                    right={<TextInput.Icon icon="filter" style={{width: 20, height: 20, marginLeft: 120, backgroundColor: '#fff'}}/>}
                />
            </View>
            <View style={{marginBottom: 40}}>
                <FlatList
                    data={agents}
                    style={{marginBottom: 55}}
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
                        <TouchableOpacity onPress={() => navigation.navigate('Detail', {
                            params:{
                                item
                            }
                        })}>
                            <Card style={styles.card} key={index}>
                                <Card.Content>
                                    <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                        <Text style={styles.name}>{item.first_name} {item.last_name}</Text>
                                        <Text style={styles.enumId}>{item.status}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={styles.number}>{item.email}</Text>
                                        <Text style={styles.enum}>{item.user_cat} </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={styles.number}>Merchant ID: {item.merchant_id}</Text>
                                        <Text style={styles.enum}>{item.lga} </Text>
                                    </View>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
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
    totalCard:{
        width: Dimensions.get("screen").width - 32,
        marginLeft: 16,
        height: 76,
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor: '#09893E',
        shadowColor: 'rgba(0, 0, 0, 0.07)'
    },
    card:{
        marginTop: 15,
        width: Dimensions.get('screen').width - 32,
        marginLeft: 16,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    name: {
        color: '#000',
        fontFamily: 'DMSans_700Bold',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    enumId: {
        color: '#219653',
        fontFamily: 'DMSans_700Bold',
        textAlign: 'right',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 16
    },
    enum:{
        color: '#000',
        fontFamily: 'DMSans_400Regular',
        textAlign: 'right',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 16
    },
    number: {
        color: '#000',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
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
        marginLeft: 168,
        textAlign: 'right',
        fontFamily: 'DMSans_400Regular',
        fontSize: 10.263,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    amount:{
        color: '#FFF',
        fontFamily: 'DMSans_700Bold',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22,
        marginTop: 10
    },
    eAmount:{
        color: '#FFF',
        fontFamily: 'DMSans_700Bold',
        marginLeft: 170,
        fontSize: 20,
        textAlign: 'right',
        fontStyle: 'normal',
        fontWeight: '700',
        marginTop: 10,
        lineHeight: 22
    }
})
