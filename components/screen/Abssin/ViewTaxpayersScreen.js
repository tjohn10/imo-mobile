import React, {useEffect, useState} from "react";
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ActivityIndicator, FlatList
} from "react-native";
import {Card, TextInput} from "react-native-paper";
import {Button} from "react-native-elements";
import {AuthStore} from "../../../store";
import {MOBILE_API} from "../../../config";

export default function ViewTaxpayersScreen({navigation}){
    const [loading, setLoading] = useState(false)
    const [taxPayers, setTaxPayers] = useState([])

    const info = AuthStore.useState()
    useEffect(() => {
        setLoading(true)
        const url = `${MOBILE_API}abssin/manage-abssin`
        fetch(url, {
            headers:{
                'Authorization': 'Bearer' + info.token
            },
            method: 'POST'
        }) .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false);
                setTaxPayers(responseJson.data)
                console.log(taxPayers)
            })
            .catch((e) => {
                console.log(e)
            })
    }, []);
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.title}>Tax Payers</Text>
                <TextInput
                    dense
                    mode="outlined"
                    outlineStyle={{height: 40, borderRadius: 40}}
                    style={styles.input}
                    placeholder="Search"
                    right={<TextInput.Icon icon="filter" style={{width: 20, height: 20, marginLeft: 90}}/>}
                />
            </View>

            <View style={{marginBottom: 40}}>
                { loading ? <><ActivityIndicator size="large"/></> : (
                        <FlatList
                            data={taxPayers}
                            style={{marginTop: 10, marginBottom: 20}}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => (
                                <TouchableOpacity>
                                    <Card style={styles.card} key={index}>
                                        <Card.Content>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={styles.name}>{item.Firstname} {item.Lastname}</Text>
                                                <Text style={{
                                                    backgroundColor: item.Status === 'Active' ? 'green' : 'red',
                                                    color: '#fff',
                                                    fontFamily: 'DMSans_700Bold',
                                                    padding: 4,
                                                    borderRadius: 8,
                                                    fontSize: 12,
                                                    textAlign: 'right',
                                                    fontStyle: 'normal',
                                                    fontWeight: '600',
                                                    lineHeight: 22
                                                }}>{item.Status || 'Active'}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={styles.number}>{item.Email}</Text>
                                                <Text style={styles.enumId}>{item.Phone}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={styles.number}>Abssin No: {item.RequestToken}</Text>
                                                <Text style={styles.enum}>{item.createtime} </Text>
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
    container:{
        flex: 1,
        backgroundColor: '#F9FAFC'
    },
    title: {
        color: '#071931',
        fontSize: 16,
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
        marginRight:16,
        borderRadius: 10,
        paddingBottom: 8,
        paddingLeft: 16,
        alignItems: 'flex-start'
    },
    card:{
        marginBottom: 15,
        width: Dimensions.get('screen').width - 32,
        marginLeft: 16,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    name: {
        color: '#000',
        marginTop: 10,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    enumId: {
        color: '#8A8A8A',
        marginTop: 10,
        textAlign: 'right',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16
    },
    enum:{
        color: '#219653',
        textAlign: 'right',
        fontSize: 12,
        marginTop: 3,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 16
    },
    number: {
        color: '#8A8A8A',
        fontSize: 14,
        marginTop: 3,
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
