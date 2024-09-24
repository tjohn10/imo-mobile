import React, {useContext, useEffect, useState} from "react";
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
import { Chip } from 'react-native-paper';
import {AuthContext} from "../../../context/AuthContext";
import {MOBILE_API} from "../../../config";

export default function BusinessList({navigation}){
    const [loading, setLoading] = useState(false)
    const [taxPayers, setTaxPayers] = useState([])
    const [filteredTaxPayers, setFilteredTaxPayers] = useState([])

    const info = AuthStore.useState()
    const {userToken} = useContext(AuthContext)

    useEffect(() => {
       getBusiness()
    }, []);

    const getBusiness = () =>{
        setLoading(true)
        fetch(`${MOBILE_API}abssin/manage-business`, {
            headers: {
                'Authorization': 'Bearer' + userToken
            },
            method: 'POST'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false);
                setTaxPayers(responseJson.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const searchList = (text) => {
        if(text){
            const newData = taxPayers.filter(item => {
                const itemData = item.coy_name ? item.coy_name.toUpperCase() : ''.toUpperCase()
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setTaxPayers(newData);
        } else {
            getBusiness()
            setTaxPayers(taxPayers);
        }
    }
    console.log(filteredTaxPayers)
    console.log(taxPayers, "list")
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.title}>Businesses</Text>
                <TextInput
                    dense
                    mode="outlined"
                    outlineStyle={{height: 40, borderRadius: 40}}
                    style={styles.input}
                    onChangeText={(text) => searchList(text)}
                    placeholder="Search"
                    right={<TextInput.Icon icon="filter" style={{width: 20, height: 20, marginLeft: 90}}/>}
                />
            </View>

            <View style={{marginBottom: 40}}>
                {
                    loading ? <ActivityIndicator size="large" /> :(
                        <FlatList
                            data={taxPayers}
                            style={{marginTop: 10, marginBottom: 40}}
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
                                <TouchableOpacity onPress={() => navigation.navigate('Business Details', {
                                    params: {
                                        item
                                    }
                                })}>
                                    <Card style={styles.card} key={index}>
                                        <Card.Content>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={styles.name}>{item.coy_name} </Text>
                                                <Text style={styles.number}>{item.type_of_organisation} </Text>
                                            </View>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                                                <Text style={styles.number}>ABSSIN: {item.state_id}</Text>
                                                 <Text style={styles.enumId}>{item.city}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={styles.number}>{item.category} </Text>
                                                 <Text style={styles.enum}>{item.phone_no} </Text>
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
        marginRight: 18,
        borderRadius: 10,
        paddingBottom: 8,
        paddingLeft: 16,
        alignItems: 'flex-start'
    },
    card:{
        marginTop: 15,
        width: Dimensions.get('screen').width - 32,
        marginLeft: 16,
        height: 102,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    name: {
        color: '#000',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    enumId: {
        color: '#8A8A8A',
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
        color: '#000',
        fontSize: 14,
        marginTop: 3,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    button:{
        marginTop: 10,
        width: Dimensions.get("window").width - 32,
        height: 46,
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor: '#EAFFF3'
    },
    badge:{
        borderRadius: 8,
        backgroundColor: '#EAFFF3'
    }
})
