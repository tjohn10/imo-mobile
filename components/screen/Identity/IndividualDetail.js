import React from "react";
import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";
import {Card, Divider} from "react-native-paper";
import {Button} from "react-native-elements";
import { Image } from "react-native";


export default function IndividualDetail({navigation, route}){
    console.log(route.params.params.item)
    const details = route.params.params.item
    return(
        <ScrollView style={styles.container}>
            <View style={{marginTop: 5}}>
                <Text style={styles.title}>Individual Details</Text>
                <View style={{flexDirection: 'row', marginLeft: 16}}>
                {/*<View>*/}
                {/*    <Image source={details.photoID} style={styles.avatar}/>*/}
                {/*</View>*/}
                {/* <View style={{marginLeft: 16}}>
                    <Text style={styles.name}>{info.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.id}>ID: 2384638</Text>

                            <Image source={copy} style={{width: 16, height: 16}} />

                    </View>
                </View> */}
            </View>
                <Card style={styles.card}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Status:</Text>
                        <Text style={styles.status}>{details.Status || 'Active'}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>ABSSIN:</Text>
                        <Text style={styles.rowData}>{details.state_id}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>FirstName:</Text>
                        <Text style={styles.rowData}>{details.first_name}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Last Name:</Text>
                        <Text style={styles.rowData}>{details.surname}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Gender:</Text>
                        <Text style={styles.status}>{details.gender}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Phone Number:</Text>
                        <Text style={styles.rowData}>{details.phone_number}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Email:</Text>
                        <Text style={styles.rowData}>{details.email}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Sector:</Text>
                        <Text style={styles.rowData}>{details.sector}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Monthly Income:</Text>
                        <Text style={styles.rowData}>{details.MonthlyIncome || 0}</Text>

                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Marital Status:</Text>

                        <Text style={styles.rowData}>{details.marital_status}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>State of Origin:</Text>
                        <Text style={styles.rowData}>{details.state_of_origin}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>State of Residence:</Text>
                        <Text style={styles.rowData}>{details.state_of_residence}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>Employment Status:</Text>
                        <Text style={styles.rowData}>{details.EmploymentStatus}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>ID:</Text>
                        <Text style={styles.rowData}>{details.nin}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={styles.rowLabel}>ID Type:</Text>
                        <Text style={styles.rowData}>{details.IDType}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        <Text style={styles.rowLabel}>Address:</Text>
                        <Text style={styles.rowData}>{details.Address}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>LGA:</Text>
                        <Text style={styles.rowData}>{details.LGA}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Tax Details</Text>
                        {/* <Text style={styles.rowData}>{details.next_date}</Text> */}
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        <Text style={styles.rowLabel}>TIN:</Text>
                        <Text style={styles.rowData}>{details.TIN}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Tax Office:</Text>
                        <Text style={styles.rowData}>{details.TaxOffice}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Tax Balance:</Text>
                        <Text style={styles.rowData}>{details.TaxBalance}</Text>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.rowLabel}>Transaction type:</Text>
                        <Text style={styles.rowData}>{details.trans_type}</Text>
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
                        <Text style={styles.rowLabel}>Nationality:</Text>
                        <Text style={styles.rowData}>{details.nationality}</Text>
                    </View>
                    <Divider />
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
