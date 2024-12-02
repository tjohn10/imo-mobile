import React from "react";
import {Image, ScrollView, TouchableOpacity} from "react-native";
import {List} from "react-native-paper";
import validate from "../../../assets/icons/validate.png";
import {DefaultStyles} from "../../constants/layout";

export default function TicketPayOptions({navigation}){
    return(
        <ScrollView style={{flex: 1}}>
            <TouchableOpacity>
                <List.Item
                    style={DefaultStyles.list}
                    onPress={() => navigation.navigate('Enum ID')}
                    title="Pay With Enumeration ID"
                    titleStyle={{
                        color: '#292D32',
                        fontSize: 14,
                        fontFamily: 'DMSans_500Medium',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: 20
                    }}
                    left={props => <Image source={validate} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                    right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <List.Item
                    style={DefaultStyles.list}
                    onPress={() => navigation.navigate('Order', {
                        screen: 'Enum ID'
                    })}
                    title="Pay With Plate Number"
                    titleStyle={DefaultStyles.listTitle}
                    left={props => <Image source={validate} {...props} style={{width: 24, height: 24, margin: 15, backgroundColor: '#EAFFF3', paddingTop: 11}}/>}
                    right={props => <List.Icon {...props} icon="arrow-right" color="#91DBB0"/>}
                />
            </TouchableOpacity>
        </ScrollView>
    )
}
