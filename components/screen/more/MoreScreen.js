import React, {useContext, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Dimensions, Image, FlatList} from "react-native";
import {Button, Card, List} from "react-native-paper";
import {AuthStore} from "../../../store";
import airtime from "../../../assets/icons/airtime.png";
import data from "../../../assets/icons/datas.png";
import loan from "../../../assets/icons/loan.png";
import bank from "../../../assets/icons/bank.png";
import about from "../../../assets/icons/info.png";
import wallet from "../../../assets/icons/purse.png";
import pass from "../../../assets/icons/messages.png";
import group from "../../../assets/icons/group.png";
import support from "../../../assets/icons/support.png";
import signout from "../../../assets/icons/logout.png";
import security from "../../../assets/icons/security-safe.png";
import electricity from "../../../assets/icons/electricity.png";
import copy from "../../../assets/icons/copy.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../../../context/AuthContext";
import {merchant_key, version_num} from "../../../config";
import banner from "../../../assets/slider/more_bg.png";

export default function MoreScreen({navigation}) {
    const [loading, setLoading] = useState(false)
    const info = AuthStore.useState()
    const {logout} = useContext(AuthContext)
    if (info.name === '') {
        Alert.alert('Session Error', 'You have been signed out due to inactivity. kindly Login again to be able to continue', [{
            text: 'OK',
            onPress: () => logout()
        },])
    }

    const dailyServices = [
        {
            name: 'Airtime',
            icon: airtime
        },
        {
            name: 'Data',
            icon: data
        },
        {
            name: 'Loan',
            icon: loan
        },
        {
            name: 'Electricity',
            icon: electricity
        }
    ]
    const others = [
        {
            name: 'About',
            icon: about,
            action: 'About'
        },
        {
            name: 'Feedback',
            icon: pass,
            action: ''
        },
        {
            name: 'Support',
            icon: support,
            action: 'Support'
        },
        {
            name: 'Change Password',
            icon: security,
            action: 'Password'
        }
    ]

    return (
        <ScrollView style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16}}>

                <View style={{marginLeft: 16}}>
                    <Text style={styles.name}>{info.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.id} selectable={true}>ID: 2384638</Text>

                        <Image source={copy} style={{width: 16, height: 16}}/>

                    </View>
                </View>
                <Button onPress={() =>logout()}>
                    <Image source={signout} style={{width: 30, height: 30, marginTop: 30, marginRight: 10}} />
                </Button>
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.sectionTitle}>My Money Transfer</Text>
                <View style={styles.horizontalView}>
                    <Card style={styles.cards} mode="contained" onPress={() => navigation.navigate('Wallet')}>
                        <Card.Content>
                            <Image
                                style={{
                                    width: 24,
                                    height: 24,
                                    flexShrink: 0,
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                                source={wallet}
                            />
                            <Text style={styles.agentText}>To My Wallet</Text>
                        </Card.Content>
                    </Card>
                    <Card style={styles.cards} mode="contained"  onPress={() => navigation.navigate('External')}>
                        <Card.Content>
                            <Image
                                style={{
                                    width: 24,
                                    height: 24,
                                    flexShrink: 0,
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                                source={group}
                            />
                            <Text style={styles.agentText}>To Other Wallets</Text>
                        </Card.Content>
                    </Card>
                    <Card style={styles.cards} mode="contained" onPress={() => navigation.navigate('Bank')}>
                        <Card.Content>
                            <Image
                                style={{
                                    width: 23,
                                    height: 23,
                                    flexShrink: 0,
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                                source={bank}
                            />
                            <Text style={styles.agentText}>To Bank</Text>
                        </Card.Content>
                    </Card>
                </View>
            </View>
            <View>
                <Image source={banner} style={styles.banner} />
            </View>

            <Card style={styles.card}>
                <Text style={{fontWeight: 'bold', marginLeft: 15, marginTop: 10}}>Daily Services</Text>
                <FlatList
                    data={dailyServices}
                    numColumns={4}
                    renderItem={({item, index}) => (
                        <TouchableOpacity>
                            <Card style={styles.menuCards} key={index} mode="contained">
                                <Card.Content>
                                    <Image
                                        style={{
                                            width: 20,
                                            height: 20,
                                            flexShrink: 0,
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                        }}
                                        source={item.icon}
                                    />
                                    <Text style={styles.menuText}>{item.name}</Text>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.alt}
                />
                {/*<List.Item*/}
                {/*    style={styles.topList}*/}
                {/*    title="Other Services"*/}
                {/*    onPress={() => navigation.navigate('Other Services')}*/}
                {/*    titleStyle={{*/}
                {/*        color: '#28374B',*/}
                {/*        fontSize: 12,*/}
                {/*        fontStyle: 'normal',*/}
                {/*        fontWeight: '700',*/}
                {/*        lineHeight: 18*/}
                {/*    }}*/}
                {/*    left={props => <Image source={concession} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}*/}
                {/*    right={props => <List.Icon {...props} icon="chevron-right" color="#09893E"/>}*/}
                {/*/>*/}

            </Card>
            <Card style={styles.card2}>
                <Text style={{fontWeight: 'bold', marginLeft: 15}}>Other Services</Text>
                <FlatList
                    data={others}
                    numColumns={4}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => navigation.navigate(item.action)} key={index}>
                            <Card style={styles.menuCards} mode="contained">
                                <Card.Content>
                                    <Image
                                        style={{
                                            width: 20,
                                            height: 20,
                                            flexShrink: 0,
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                        }}
                                        source={item.icon}
                                    />
                                    <Text style={styles.menuText}>{item.name}</Text>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.alt}
                />
            </Card>

            <Text style={{fontWeight: '800', fontSize: 16, marginTop: 20, marginBottom: 20, textAlign: 'left', marginLeft: 20}}>{version_num}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFC'
    },
    card: {
        // width: Dimensions.get("screen").width - 40,
        width: Dimensions.get("screen").width - 32,
        borderRadius: 8,
        marginLeft: 'auto',
        marginTop: 10,
        marginRight: 'auto',
        backgroundColor: '#FFF',
        paddingBottom: 10,
        paddingTop: 10,
        shadowColor: 'rgba(0, 0, 0, 0.07)'
    },
    card2: {
        // width: Dimensions.get("screen").width - 40,
        width: Dimensions.get("screen").width - 32,
        flexDirection: "row",
        borderRadius: 8,
        marginLeft: 'auto',
        marginTop: 16,
        marginRight: 'auto',
        backgroundColor: '#FFF',
        shadowColor: 'rgba(0, 0, 0, 0.07)',
        paddingTop: 10,
        paddingBottom: 20
    },
    horizontalView: {
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    agentText: {
        color: "#000",
        fontSize: 12,
        textAlign: "center",
        paddingTop: 10,
        fontStyle: "normal",
        fontWeight: "700",
    },
    list: {
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
    menuCards: {
        width: 72,
        height: 78,
        margin: 5,
        marginTop: 10,
        backgroundColor: '#EAF7F0'
    },
    menuText:{
        fontSize: 8.5,
        fontWeight: 'bold',
        fontFamily: "DMSans_500Medium",
        color: '#000',
        marginTop: 10,
        paddingBottom: 5,
        textAlign: 'center'
    },
    cards: {
        width: 95,
        // height: 74,
        margin: 5,
        backgroundColor: '#EAF7F0'
    },
    topList: {
        // width: 350,
        marginLeft: 16,
        marginRight: 16,
        flexShrink: 0,
        height: 50,
        // backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: 'rgba(15, 13, 35, 0.04)'
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 10
    },

    name: {
        color: '#000',
        marginTop: 28,
        textAlign: 'center',
        fontFamily: 'DMSans_700Bold',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 18
    },
    id: {
        color: '#8A8A8A',
        fontFamily: 'DMSans_700Bold',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 18
    },
    banner:{
        width: Dimensions.get('screen').width - 32,
        marginTop: 15,
        marginLeft: 16,
        height: 134
    }
})
