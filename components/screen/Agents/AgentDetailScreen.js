import React from "react";
import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";
import {Card, Divider} from "react-native-paper";
import {Button} from "react-native-elements";
import { Image } from "react-native";
import Moment from "moment/moment";


export default function AgentDetailScreen({navigation, route}){
    const details = route.params.params.item
    return(
        <ScrollView style={styles.container}>
            <View style={{marginTop: 5}}>
                <Text style={styles.title}>Agent's Details</Text>
                <View style={{flexDirection: 'row', marginLeft: 16}}>
                </View>
                <Card style={styles.card}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Status:</Text>
                        <Text style={styles.status}>{details.status}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>User Category:</Text>
                        <Text style={styles.rowData}>{details.user_cat}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>FirstName:</Text>
                        <Text style={styles.rowData}>{details.first_name}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Last Name:</Text>
                        <Text style={styles.rowData}>{details.last_name}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Gender:</Text>
                        <Text style={styles.status}>{details.gender}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Phone Number:</Text>
                        <Text style={styles.rowData}>{details.phone_no}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Email:</Text>
                        <Text style={styles.rowData}>{details.email}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Merchant ID:</Text>
                        <Text style={styles.rowData}>{details.merchant_id}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>LGA:</Text>
                        <Text style={styles.rowData}>{details.lga}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>LGA Zone:</Text>
                        <Text style={styles.rowData}>{details.lga_zone}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Date Created:</Text>
                        <Text style={styles.rowData}>{Moment(details.create_time).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    </View>
                </Card>
                {/* <View>
                    <Button
                        title="Back to All"
                        titleStyle={styles.btnText}
                        onPress={() => navigation.navigate('Transactions')}
                        buttonStyle={styles.nextBtnStyle} />
                </View> */}
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    card: {
        marginTop: 18,
        marginBottom: 10,
        marginLeft: 16,
        width: Dimensions.get('screen').width - 32,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    rowData: {
        color: '#071827',
        width: 150,
        textAlign: 'right',
        marginRight: 17,
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    }, status: {
        color: '#09893E',
        width: 150,
        textAlign: 'right',
        marginRight: 17,
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '900',
        lineHeight: 22
    },
    title: {
        color: '#071827',
        fontFamily: 'DMSans_500Medium',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '900',
        marginTop: 15,
        marginLeft: 17,
        lineHeight: 22
    },
    nextBtnStyle: {
        width: Dimensions.get('screen').width - 32,
        height: 48,
        padding: 10,
        marginLeft: 16,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#09893E',
        flexShrink: 0
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
        fontWeight: '700'
    },
    rowLabel: {
        color: '#979797',
        fontFamily: 'DMSans_400Regular',
        fontSize: 14,
        marginLeft: 17,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    avatar: {
        borderRadius: 70.442,
        borderWidth: 0.5,
        borderColor: '#09893E',
        width: 68.639,
        marginTop: 11,
        height: 70.442,
        flexShrink: 0
    },
})
