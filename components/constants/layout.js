import React from "react";
import {Dimensions, StyleSheet} from "react-native";

export const DefaultStyles = StyleSheet.create({
    container:{
        flex: 1
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
    listTitle:{
        color: '#292D32',
        fontSize: 14,
        fontFamily: 'DMSans_500Medium',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 20
    }
})
