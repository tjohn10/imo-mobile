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
import {AuthContext} from "../../../context/AuthContext";

export default function PendingAbssinScreen(){
    const [loading, setLoading] = useState(false)
    const [abssin, setAbssin] = useState([])
    const [filteredAbssin, setFilteredAbssin] = useState([])

    const info = AuthStore.useState()
    const {userToken} = useContext(AuthContext)
    useEffect(() => {
        getPendingList()
    }, []);
    const getPendingList = () => {
        setLoading(true)
        const url = `${MOBILE_API}abssin/pending-abssin`
        fetch(url, {
            headers:{
                'Authorization': 'Bearer' + userToken
            },
            method: 'POST'
        }) .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false);
                setAbssin(responseJson.data)
                console.log(responseJson)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const searchPending = (text) => {
        if(text){
            const newData = abssin.filter(item => {
                const itemData = item.Lastname ? item.Lastname.toUpperCase() : ''.toUpperCase()
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setAbssin(newData);
        } else {
            getPendingList()
            setAbssin(abssin);
        }
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>Pending ABSSIN</Text>
                <TextInput
                    mode="outlined"
                    outlineStyle={{height: 40, borderRadius: 40}}
                    style={styles.input}
                    onChangeText={(text) => searchPending(text)}
                    placeholder="Search"
                    right={<TextInput.Icon icon="filter" style={{width: 20, height: 20, marginLeft: 90}}/>}
                />
            </View>

            <View style={{marginBottom: 90}}>
                {
                    loading ? <><ActivityIndicator size="large"/></> : (
                        <FlatList
                            data={abssin}
                            style={{marginTop: 10, marginBottom: 20}}
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
        width: 200,
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
    card:{
        marginTop: 15,
        width: Dimensions.get('screen').width - 32,
        marginLeft: 16,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    name: {
        color: '#000',
        marginTop: 10,
        fontSize: 16,
        width: 200,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    enumId: {
        color: '#219653',
        marginTop: 4,
        fontFamily: 'DMSans_700Bold',
        textAlign: 'right',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 16
    },
    enum: {
        color: '#8A8A8A',
        marginRight: 10,
        fontFamily: 'DMSans_400Regular',
        textAlign: 'right',
        fontSize: 10.263,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16
    },
    number: {
        color: '#8A8A8A',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        marginTop: 4,
        fontStyle: 'normal',
        fontWeight: '600'
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
    button:{
        marginTop: 10,
        width: Dimensions.get("window").width - 32,
        height: 46,
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor: '#EAFFF3'
    }
})
