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
import {MOBILE_API} from "../../../config";
import { Chip } from 'react-native-paper';
import {AuthContext} from "../../../context/AuthContext";

export default function ViewIndividual({navigation}){
    const [loading, setLoading] = useState(false)
    const [taxPayers, setTaxPayers] = useState([])
    const [filteredTaxPayers, setFilteredTaxPayers] = useState([])

    const {userToken} = useContext(AuthContext)
    const info = AuthStore.useState()
    useEffect(() => {
        navigation.addListener('focus', () => {
          getIndividualList()
        });
        getIndividualList()
    }, []);
    const getIndividualList = () => {
        setLoading(true)
        const url = `${MOBILE_API}abssin/manage-individual`
        fetch(url, {
            headers:{
                'Authorization': 'Bearer' + userToken
            },
            method: 'POST'
        }) .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false);
                setTaxPayers(responseJson.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const search = (text) => {

        if(text){
            const newData = taxPayers.filter(item => {
                // const abssin = item.state_id
                // const name = item.surname
                // const phone = item.phone_number
                // if(name){
                    const itemData = item.surname ? item.surname.toUpperCase() : ''.toUpperCase() || item.state_id ? item.state_id.toUpperCase() : ''.toUpperCase()
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                // } else if (abssin){
                //     const itemData = abssin ? abssin.toUpperCase() : ''.toUpperCase()
                //     const textData = text.toUpperCase();
                //     return itemData.indexOf(textData) > -1;
                // } else {
                //     const itemData = phone ? phone.toUpperCase() : ''.toUpperCase()
                //     const textData = text.toUpperCase();
                //     return itemData.indexOf(textData) > -1;
                // }

            }) || taxPayers.filter(item => {
                const itemData = item.state_id ? item.state_id.toUpperCase() : ''.toUpperCase()
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setTaxPayers(newData);
        } else {
            getIndividualList()
            setFilteredTaxPayers(taxPayers);
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.title}>Individuals</Text>
                 <TextInput
                    mode="outlined"
                    outlineStyle={{height: 40, borderRadius: 40}}
                    style={styles.input}
                    placeholder="Search"
                    onChangeText={(text) => search(text)}
                    right={<TextInput.Icon icon="filter" style={{width: 20, height: 20, marginLeft: 90}}/>}
                />
            </View>

            <View>
                {
                    loading ? <><ActivityIndicator size="large"/></> : (
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
                                <TouchableOpacity onPress={() => navigation.navigate('Individual Details', {
                                    params: {
                                        item
                                    }
                                })}>
                                    <Card style={styles.card} key={index}>
                                        <Card.Content>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={styles.name}>{item.indv_title} {item.first_name} {item.surname}</Text>
                                                <Text style={{
                                                    backgroundColor: item.Status === 'Active' ? 'red' : 'green',
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
                                                <Text style={styles.number}>{item.phone_number}</Text>
                                                <Text style={styles.enum}>{item.gender} </Text>
                                            </View>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                 <Text style={styles.number}>ABSSIN: {item.state_id}</Text>
                                                 <Text style={styles.enum}>{item.income_source} </Text>
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
        width: 180,
        backgroundColor: '#f7f7f7',
        height: 40,
        borderColor: '#08983e',
        marginTop: 10,
        marginRight: 16,
        borderRadius: 10,
        paddingBottom: 8,
        paddingLeft: 16,
        alignItems: 'flex-start'
    },
    card:{
        marginBottom: 10,
        width: Dimensions.get('screen').width - 32,
        marginLeft: 16,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    name: {
        color: '#000',
        fontSize: 16,
        lineHeight: 20,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    enumId: {
        color: '#8A8A8A',
        marginLeft: 117,
        marginTop: 10,
        textAlign: 'right',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16
    },
    enum:{
        color: '#219653',
        marginLeft: 132,
        textAlign: 'right',
        fontSize: 12,
        marginTop: 3,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 16
    },
    number: {
        color: '#000',
        fontSize: 12,
        marginTop: 3,
        fontStyle: 'normal',
        fontWeight: '600'
    },
    status: {
        backgroundColor: '#09893E',
        color: '#fff',
        fontFamily: 'DMSans_700Bold',
        padding: 4,
        borderRadius: 8,
        fontSize: 12,
        textAlign: 'right',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22
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
