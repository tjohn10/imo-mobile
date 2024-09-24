import React, {useState} from "react";
import {Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, View, Dimensions, FlatList} from "react-native";
import {FlatGrid} from "react-native-super-grid";
import {Card} from "react-native-paper";


export default function AllConcessionaireScreen({navigation}){
    const [items, setItems] = useState([
        { name: 'Produce', uri: require('../../../assets/icons/fruit.png'), route: 'New' },
        { name: 'Scrap Metal', uri: require('../../../assets/icons/waste.png'), route: 'Scrap' },
        { name: 'Veterinary Inspection/Abattoir Fees', uri: require('../../../assets/icons/cow.png'), route: 'Veterinary' },
        { name: 'Stone Sites', uri: require('../../../assets/icons/wheelbarrow.png'), route: 'Stone' },
        { name: 'Quarry Sites',  uri: require('../../../assets/icons/dump-truck.png'),  route: 'Quarry'  },
        { name: 'Inter State Haulage & Commerce Levy', uri: require('../../../assets/icons/dump-trucks.png'), route: 'Inter State' },
        { name: 'Baggage & Basket Handling Charge', uri: require('../../../assets/icons/suitcase.png'), route: 'Baggage' },
        { name: 'Forestry', uri: require('../../../assets/icons/forest.png'), route: 'Forestry' },
        { name: 'Market Daily Tolls', uri: require('../../../assets/icons/markets.png'),route: 'Market' },
        { name: 'Palm Produce', uri: require('../../../assets/icons/palm-oil.png'),route: 'Palm Produce' },
        { name: 'Sand Beaches', uri: require('../../../assets/icons/beach.png'), route: 'Beach' },
        { name: 'Gate Pass', uri: require('../../../assets/icons/border.png'), route: 'Gate' },
        // { name: 'Loading and Off Loading', uri: require('../../../assets/icons/unloading.png'), route: 'Loading' }

    ])

    return(
        <SafeAreaView style={styles.container}>
            <FlatGrid
                itemDimension={130}
                data={items}
                spacing={15}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() =>navigation.navigate(item.route)}>
                        <Card style={[styles.itemContainer, { backgroundColor: '#fff', shadowColor: '#000', shadowRadius: 10 }]}>
                            <View style={{width: 48, height: 48, backgroundColor: '#EBF8FB', borderRadius: 50, marginTop: 15, borderWidth: 1, borderColor: '#EBF8FB'}}>
                                <Image source={item.uri} style={{ width: 25, height: 25, marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}/>
                            </View>
                            <Text style={styles.itemName}>{item.name}</Text>
                            {/*<Text style={styles.subtitle}>{item.subtitle}</Text>*/}
                        </Card>
                    </TouchableOpacity>
                )}
            />
            {/*<FlatList*/}
            {/*    data={ items }*/}
            {/*    renderItem={ ({item}) =>*/}
            {/*        <View style={styles.GridViewContainer}>*/}
            {/*            <Text style={styles.GridViewTextLayout} onPress={() => {}} > {item.key} </Text>*/}
            {/*        </View> }*/}
            {/*    numColumns={2}*/}
            {/*/>*/}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    itemContainer: {
        width: 157,
        height: 168,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20
    },
    itemName: {
        fontSize: 14,
        color: '#000',
        marginTop: 21.53,
        fontWeight: '600',
        fontStyle: 'normal',
        lineHeight: 17
    },
    subtitle:{
        width: 124,
        height: 25,
        left: 15,
        top: 2,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 12,
        color: '#8A8A8A'
    }
})
