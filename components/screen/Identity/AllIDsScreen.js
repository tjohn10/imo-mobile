import React from "react";
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Card, List} from "react-native-paper";
import validate from "../../../assets/icons/validate.png";
import transaction from "../../../assets/icons/transaction.png";
import transport from '../../../assets/icons/transport.png'
import statement from "../../../assets/icons/statement.png";
import verify from "../../../assets/icons/verify.png"
import tax from "../../../assets/taxpayers.png";

export default function AllIDsScreen({navigation}){
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Create')}
                        title="Create ABSSIN"
                        // description="Click here"
                        titleStyle={{
                            color: '#292D32',
                            fontSize: 14,
                            fontFamily: 'DMSans_500Medium',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: 20
                        }}
                        descriptionStyle={{
                            color: '#09893E',
                            fontFamily: 'DMSans_400Regular',
                            fontSize: 8,
                            fontStyle: 'normal',
                            fontWeight: '400',
                        }}
                        left={props => <Image source={verify} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Create Business')}
                        title="Create Business ABSSIN"
                        // description="Click here"
                        titleStyle={{
                            color: '#292D32',
                            fontSize: 14,
                            fontFamily: 'DMSans_500Medium',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: 20
                        }}
                        descriptionStyle={{
                            color: '#09893E',
                            fontFamily: 'DMSans_400Regular',
                            fontSize: 8,
                            fontStyle: 'normal',
                            fontWeight: '400',
                        }}
                        left={props => <Image source={transport} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('View Individual')}
                        title="View Individuals"
                        // description="Click here"
                        titleStyle={{
                            color: '#292D32',
                            fontSize: 14,
                            fontFamily: 'DMSans_500Medium',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: 20
                        }}
                        descriptionStyle={{
                            color: '#09893E',
                            fontFamily: 'DMSans_400Regular',
                            fontSize: 8,
                            fontStyle: 'normal',
                            fontWeight: '400',
                        }}
                        left={props => <Image source={tax} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('View Business')}
                        title="View Businesses"
                        titleStyle={{
                            color: '#292D32',
                            fontSize: 14,
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: 20
                        }}
                        descriptionStyle={{
                            color: '#09893E',
                            fontSize: 8,
                            fontStyle: 'normal',
                            fontWeight: '400',
                        }}
                        // description="Click Here"
                        // left={props => <List.Image {...props} source={box} style={{width: 12, height: 12}}/> }
                        right={props => <List.Icon {...props} icon="chevron-right" color="#09893E"/>}
                        left={props => <Image source={validate} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                    />
                </TouchableOpacity>
                {/* <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Generate')}
                        title="Generate IDs"
                        // description="Click Here"
                        titleStyle={{
                            color: '#292D32',
                            fontFamily: 'DMSans_500Medium',
                            fontSize: 14,
                            fontStyle: 'normal',
                            fontWeight: '500',
                            lineHeight: 20
                        }}
                        descriptionStyle={{
                            color: '#09893E',
                            fontFamily: 'DMSans_500Medium',
                            fontSize: 8,
                            fontStyle: 'normal',
                            fontWeight: '400',
                        }}
                        left={props => <Image source={verify} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                        right={props => <List.Icon {...props} icon="chevron-right" color="#09893E" />}
                    />
                </TouchableOpacity> */}

            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        // backgroundColor: '#efefef'
    },
    title:{
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        marginTop: 20,
        marginLeft: 16,
        lineHeight: 32
    },
    select:{
        color: '#5B5B5B',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        marginLeft: 16,
        marginTop: 12,
        lineHeight: 22
    },
    list:{
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
    cash:{
        color: '#FFF',
        fontFamily: 'DMSans_400Regular',
        fontSize: 10.263,
        fontStyle: 'normal',
        fontWeight: '400'
    }
})
