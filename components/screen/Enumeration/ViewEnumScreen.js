import React, {useContext, useEffect, useState} from "react";
import {
    ActivityIndicator,
    Dimensions, FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Card, TextInput} from "react-native-paper";
import agent from "../../../assets/icons/agent.png";
import {Button} from "react-native-elements";
import {MOBILE_API} from "../../../config";
import {AuthStore} from "../../../store";
import {AuthContext} from "../../../context/AuthContext";

export default function ViewEnumScreen({navigation}) {
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [enumerations, setEnumerations] = useState([])
    const [fullData, setFullData] = useState([])
    const [filteredEnums, setFilteredEnums] = useState([])

    const userInfo = AuthStore.useState()
    const {userToken} = useContext(AuthContext)
    useEffect(() => {
            setLoading(true)
            fetch(`${MOBILE_API}enumeration/all-enumeration`, {
                headers:{
                    Authorization: "Bearer" + userToken,
                    'Content-type': 'application/json',
                    'accept': 'application/json'
                },
                method: 'POST'
            }).then((res)  => res.json())
                .then((resJson) => {
                    setLoading(false)
                    setEnumerations(resJson.data)
                    setFullData(resJson.data)
                })
    }, []);

    // const searchFilter = (text) => {
    //     if(text){
    //         const newData = enumerations.filter(item => {
    //             const itemData = item.TaxpayerName ? item.TaxpayerName.toUpperCase() : ''.toUpperCase()
    //             const textData = text.toUpperCase();
    //             return itemData.indexOf(textData) > -1;
    //         })
    //         setFilteredEnums(newData);
    //     } else {
    //         setFilteredEnums(enumerations);
    //     }
    // }
    const handleSearch = (text) => {
        setSearchText(text)

        let filteredData = enumerations.filter(function (item) {
            return item.TaxpayerName.includes(text);
        });

        setFilteredEnums(filteredData)
    }
    // const contains = ({ name, email }, query) => {
    //     const { first, last } = name;
    //
    //     if (first.includes(query) || last.includes(query) || email.includes(query)) {
    //         return true;
    //     }
    //
    //     return false;
    // };
    const renderHead = () => {
        return(
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>Enumeration</Text>
                <TextInput
                    dense
                    mode="outlined"
                    outlineStyle={{height: 40, borderRadius: 40}}
                    style={styles.input}
                    value={searchText}
                    placeholder="Search"
                    onChangeText={text => handleSearch(text)}
                    right={<TextInput.Icon icon="filter" style={{width: 20, height: 20, marginLeft: 100}}/>}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>Enumeration</Text>
                <TextInput
                    dense
                    mode="outlined"
                    outlineStyle={{height: 40, borderRadius: 40}}
                    style={styles.input}
                    value={searchText}
                    placeholder="Search"
                    onChangeText={(text) => handleSearch(text)}
                    right={<TextInput.Icon icon="filter" style={{width: 20, height: 20, marginLeft: 100}}/>}
                />
            </View>


            <View style={{marginBottom: 40}}>
                {
                    loading ? <><ActivityIndicator size="large"/></> : (
                        <FlatList
                            // ListHeaderComponent={renderHead}
                            data={filteredEnums && filteredEnums.length > 0 ? filteredEnums : enumerations}
                            style={{marginTop: 10, marginBottom: 50}}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => (
                                <TouchableOpacity onPress={() => navigation.navigate('Details', {
                                    params: {
                                        item
                                    }
                                })}>

                                    <Card style={styles.card} key={index}>
                                        <Card.Content>
                                            <View
                                                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={styles.name}>{item.TaxpayerName}</Text>
                                                <Text
                                                    style={styles.price}>&#8358;{item.EnumerationFee}</Text>
                                            </View>
                                            <View
                                                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{
                                                    fontWeight: '600',
                                                    fontSize: 13
                                                }}>{item.RevenueItem}</Text>
                                                <Text
                                                    style={styles.status}>{item.EnumerationStatus}</Text>
                                            </View>
                                            <View
                                                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text
                                                    style={styles.type}>{item.TaxpayerPhone}</Text>
                                                <Text style={{
                                                    fontWeight: '500',
                                                    fontSize: 14
                                                }}>{item.shopCategory}</Text>
                                            </View>
                                                <Text style={{
                                                    fontWeight: '500',
                                                    fontSize: 14
                                                }}>Ref:{item.EnumerationID}</Text>
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
        flex: 1
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
        marginLeft: 34,
        borderRadius: 10,
        paddingBottom: 8,
        paddingLeft: 16,
        alignItems: 'flex-start'
    },
    card:{
        marginTop: 10,
        width: Dimensions.get('screen').width - 32,
        marginLeft: 16,
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
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 16
    },
    number: {
        color: '#8A8A8A',
        fontSize: 10.263,
        fontStyle: 'normal',
        fontWeight: '400'
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
        lineHeight: 16
    },
    button:{
        marginTop: 10,
        width: Dimensions.get("window").width - 32,
        height: 46,
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor: '#EAFFF3'
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
    type:{
        color: '#000',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700'
    }
})
