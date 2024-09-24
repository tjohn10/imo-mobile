import React from "react";
import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";
import {Card, Divider} from "react-native-paper";
import Moment from "moment";
import {Button} from "react-native-elements";

export default function EnumDetailsScreen({navigation, route}){
    const detail = route.params.params.item
    return(
        <ScrollView style={styles.container}>
            <View style={{marginTop: 5}}>
                <Text style={styles.title}>Enumeration Details</Text>
                <Card style={styles.card}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Status:</Text>
                        <Text style={styles.status}>{detail.EnumerationStatus}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Enumeration ID:</Text>
                        <Text style={styles.rowData}>{detail.EnumerationID}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>ABSSIN:</Text>
                        <Text style={styles.rowData}>{detail.TaxpayerID}</Text>
                    </View>
                    <Divider bold={true}/>
                    <Divider bold={true}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Name:</Text>
                        <Text style={styles.rowData}>{detail.TaxpayerName}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Phone Number:</Text>
                        <Text style={styles.rowData}>{detail.TaxpayerPhone}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Market:</Text>
                        <Text style={styles.rowData}>{detail.Market}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        <Text style={styles.rowLabel}>Amount:</Text>
                        <Text style={styles.rowData}>{detail.EnumerationFee}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        <Text style={styles.rowLabel}>Revenue Item:</Text>
                        <Text style={styles.rowData}>{detail.RevenueItem}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        <Text style={styles.rowLabel}>Revenue Year:</Text>
                        <Text style={styles.rowData}>{detail.RevenueYear}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Location:</Text>
                        <Text style={styles.rowData}>{detail.Location}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Zone/Line:</Text>
                        <Text style={styles.rowData}>{detail.zoneLine}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        <Text style={styles.rowLabel}>Shop Number:</Text>
                        <Text style={styles.rowData}>{detail.shopNumber}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Shop Occupants:</Text>
                        <Text style={styles.rowData}>{detail.shopOccupants}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Shop Category:</Text>
                        <Text style={styles.rowData}>{detail.shopCategory}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Monthly Income:</Text>
                        <Text style={styles.rowData}>{detail.MonthlyIncome}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Income Amount:</Text>
                        <Text style={styles.rowData}>{detail.IncomeAmount}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Occupant Income Amount:</Text>
                        <Text style={styles.rowData}>{detail.occupantIncomeAmount}</Text>
                    </View>
                    <Divider bold={true}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Payment Method:</Text>
                        <Text style={styles.rowData}>{detail.PaymentMethod}</Text>
                    </View>
                </Card>
                <View>
                    <Button
                        title="Back to All"
                        titleStyle={styles.btnText}
                        onPress={() => navigation.navigate('Manage Enumeration')}
                        buttonStyle={styles.nextBtnStyle} />

                </View>
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
    },
    status: {
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
})
