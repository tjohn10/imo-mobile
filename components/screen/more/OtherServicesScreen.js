import React from "react";
import {Text, View, StyleSheet} from "react-native";
import ComingSoonScreen from "./ComingSoonScreen";

export default function OtherServicesScreen(){
    return(
        // <View style={styles.container}>
        //     <Text style={styles.comingText}>
        //         COMING SOON
        //     </Text>
        // </View>
        <ComingSoonScreen/>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: "center",
        justifyContent: "center"
    },
    comingText:{
        fontSize: 24,
        textAlign: "center"
    }
})
