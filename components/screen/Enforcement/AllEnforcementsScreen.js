import React from "react";
import {Dimensions, Image, SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import {List} from "react-native-paper";
import verify from "../../../assets/icons/verify.png";
import history from "../../../assets/icons/transaction.png";

export default function AllEnforcementsScreen({navigation}){
    return(
        <SafeAreaView>
            <TouchableOpacity>
                <List.Item
                    style={styles.list}
                    onPress={() => navigation.navigate('Verify Ticket')}
                    title="Verify Ticket"
                    titleStyle={{
                        color: '#292D32',
                        fontSize: 14,
                        fontFamily: 'DMSans_500Medium',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: 20
                    }}
                    left={props => <Image source={verify} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/> }
                    right={props => <List.Icon {...props} icon="chevron-right" color="#09893E"/>}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <List.Item
                    style={styles.list}
                    onPress={() => navigation.navigate('History')}
                    title="Ticket History"
                    titleStyle={{
                        color: '#292D32',
                        fontSize: 14,
                        fontFamily: 'DMSans_500Medium',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: 20
                    }}
                    left={props => <Image source={history} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/> }
                    right={props => <List.Icon {...props} icon="chevron-right" color="#09893E"/>}
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
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
