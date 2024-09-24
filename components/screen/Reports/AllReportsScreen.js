import React from "react";
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {List} from "react-native-paper";
import verify from "../../../assets/icons/verify.png";
import transport from "../../../assets/icons/transport.png";
import tax from "../../../assets/taxpayers.png";
import validate from "../../../assets/icons/validate.png";


export default function AllReportsScreen({navigation}){
    return(
        <SafeAreaView>
            <ScrollView>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Ticket Report')}
                        title="Ticket Report"
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
                {/*<TouchableOpacity>*/}
                {/*    <List.Item*/}
                {/*        style={styles.list}*/}
                {/*        onPress={() => navigation.navigate('Transport Report')}*/}
                {/*        title="Transport Report"*/}
                {/*        titleStyle={{*/}
                {/*            color: '#292D32',*/}
                {/*            fontSize: 14,*/}
                {/*            fontFamily: 'DMSans_500Medium',*/}
                {/*            fontStyle: 'normal',*/}
                {/*            fontWeight: '700',*/}
                {/*            lineHeight: 20*/}
                {/*        }}*/}
                {/*        descriptionStyle={{*/}
                {/*            color: '#09893E',*/}
                {/*            fontFamily: 'DMSans_400Regular',*/}
                {/*            fontSize: 8,*/}
                {/*            fontStyle: 'normal',*/}
                {/*            fontWeight: '400',*/}
                {/*        }}*/}
                {/*        left={props => <Image source={transport} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}*/}
                {/*        right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}*/}
                {/*    />*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Transfer Report')}
                        title="Transfer Report"
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
                        onPress={() => navigation.navigate('ABSSIN Report')}
                        title="ABSSIN Report"
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
                        right={props => <List.Icon {...props} icon="chevron-right" color="#09893E"/>}
                        left={props => <Image source={validate} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Enumeration Report')}
                        title="Enumeration Report"
                        titleStyle={{
                            color: '#292D32',
                            fontFamily: 'DMSans_500Medium',
                            fontSize: 14,
                            fontStyle: 'normal',
                            fontWeight: '700',
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
                </TouchableOpacity>
                {/*<TouchableOpacity>*/}
                {/*    <List.Item*/}
                {/*        style={styles.list}*/}
                {/*        onPress={() => navigation.navigate('Generate')}*/}
                {/*        title="Supervisor's Report"*/}
                {/*        titleStyle={{*/}
                {/*            color: '#292D32',*/}
                {/*            fontFamily: 'DMSans_500Medium',*/}
                {/*            fontSize: 14,*/}
                {/*            fontStyle: 'normal',*/}
                {/*            fontWeight: '700',*/}
                {/*            lineHeight: 20*/}
                {/*        }}*/}
                {/*        descriptionStyle={{*/}
                {/*            color: '#09893E',*/}
                {/*            fontFamily: 'DMSans_500Medium',*/}
                {/*            fontSize: 8,*/}
                {/*            fontStyle: 'normal',*/}
                {/*            fontWeight: '400',*/}
                {/*        }}*/}
                {/*        left={props => <Image source={verify} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}*/}
                {/*        right={props => <List.Icon {...props} icon="chevron-right" color="#09893E" />}*/}
                {/*    />*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity>
                    <List.Item
                        style={styles.list}
                        onPress={() => navigation.navigate('Agents Report')}
                        title="Agents Report"
                        titleStyle={{
                            color: '#292D32',
                            fontFamily: 'DMSans_500Medium',
                            fontSize: 14,
                            fontStyle: 'normal',
                            fontWeight: '700',
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
                </TouchableOpacity>

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
})
