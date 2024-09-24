import React from "react";
import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";
import {Card, Divider} from "react-native-paper";
import {Button} from "react-native-elements";
import { Image } from "react-native";
import Moment from "moment";


export default function BusinesDetailScreen({navigation, route}){
    const details = route.params.params.item
    console.log(details, "details")
    return(
        <ScrollView style={styles.container}>
            <View style={{marginTop: 5}}>
                <Text style={styles.title}>Business Details</Text>
                <View style={{flexDirection: 'row', marginLeft: 16}}>
                    {/*<View>*/}
                    {/*    <Image source={details.photoID} style={styles.avatar}/>*/}
                    {/*</View>*/}
                </View>
                <Card style={styles.card}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Corporate BVN:</Text>
                        <Text style={styles.rowData}>{details.CorporateBVN}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Corporate Head Office:</Text>
                        <Text style={styles.rowData}>{details.CorporateHeadOfficeID}</Text>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Name:</Text>
                        <Text style={styles.status}>{details.coy_name}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>ABSSIN Number:</Text>
                        <Text style={styles.rowData}>{details.state_id}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Email:</Text>
                        <Text style={styles.rowData}>{details.email}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Sector:</Text>
                        <Text style={styles.rowData}>{details.line_of_business}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Monthly Income:</Text>
                        <Text style={styles.rowData}>{details.MonthlyIncome || 0}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Phomne Number:</Text>
                        <Text style={styles.rowData}>{details.phone_no}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>State:</Text>
                        <Text style={styles.rowData}>{details.state}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>City:</Text>
                        <Text style={styles.rowData}>{details.city}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Street:</Text>
                        <Text style={styles.rowData}>{details.street}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        <Text style={styles.rowLabel}>House No:</Text>
                        <Text style={styles.rowData}>{details.house_no}</Text>
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
                        marginTop: 12,
                        marginBottom: 12
                    }}>
                        <Text style={styles.rowLabel}>Other Details</Text>
                        {/* <Text style={styles.rowData}>{details.next_date}</Text> */}
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        <Text style={styles.rowLabel}>Tax Authority:</Text>
                        <Text style={styles.rowData}>{details.tax_authority}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Tax Office:</Text>
                        <Text style={styles.rowData}>{details.tax_office}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Date of Incorporation:</Text>
                        <Text style={styles.rowData}>{Moment(details.date_of_incorporation).format('d MMM yyyy')}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Issuance Place:</Text>
                        <Text style={styles.rowData}>{details.issuance_place}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Nationality:</Text>
                        <Text style={styles.rowData}>{details.nationality}</Text>
                    </View>
                    <Divider theme={{ colors: { primary: 'black' } }}  />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Date Created:</Text>
                        <Text style={styles.rowData}>{details.enter_date}</Text>
                    </View>


                </Card>
                <View>
                    <Button
                        title="Back to All"
                        titleStyle={styles.btnText}
                        onPress={() => navigation.navigate('View Business')}
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
        fontWeight: '600',
        lineHeight: 20
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
