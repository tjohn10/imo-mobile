import React, {useState} from "react";
import {Text, View, TextInput, StyleSheet, SafeAreaView, Dimensions, Image, ScrollView} from "react-native";
import {Card} from "react-native-paper";
import avatar from "../../../assets/avatar.png";
import DropDownPicker from "react-native-dropdown-picker";
import {Button} from "react-native-elements";

export default function AbsseinP3Screen({navigation}){
    const [state, setState] = useState('')
    const [lga, setLga] = useState('')
    const [country, setCountry] = useState('')
    const [openCountry, setOpenCountry] = useState(false);
    const [openState, setOpenState] = useState(false);

    const [openLga, setOpenLga] = useState(false);
    const [openRState, setOpenRState] = useState(false);
    const [openRLga, setOpenRLga] = useState(false);
    const [countries, setCountries] = useState([
        {label: 'Employed', value: 'employed'},
        {label: 'Unemployed', value: 'unemployed'},
        {label: 'Self-Employed', value: 'self_employed'}
    ]);

    const [states, setStates] = useState([
        {label: 'Lagos', value: 'lagos'},
        {label: 'Abia', value: 'abia'},
        {label: 'FCT', value: 'fct'}
    ]);
    const [lgaList, setLgalist] = useState([
        {label: 'Aba North', value: 'aba_north'},
        {label: 'Aba South', value: 'aba_south'},
        {label: 'Isiala Ngwa North', value: 'isiala_ugwa_north'},
        {label: 'Isiala Ngwa South', value: 'isiala_ugwa_south'},
        {label: 'Ukwa West', value: 'ukwa_west'}
    ]);
    return(
        <SafeAreaView style={{flex: 1, height: Dimensions.get("screen").height - 20}}>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={styles.basic}>Basic Information</Text>
                            <Text style={styles.title}>Full Name: <Text style={styles.name}>Bruno
                                Otax</Text></Text>
                            <Text style={styles.title}>ID: <Text style={styles.name}> BVN</Text></Text>
                        </View>
                        <View>
                            <Image source={avatar} style={styles.avatar}/>
                        </View>
                    </View>
                </Card.Content>
            </Card>
            <ScrollView>
                <Text style={styles.regText}>Origin</Text>
                <View style={{marginTop: 5}}>
                    <DropDownPicker
                        open={openCountry}
                        value={country}
                        items={countries}
                        placeholder="Country"
                        setOpen={setOpenCountry}
                        setValue={setCountry}
                        setItems={setCountries}
                        style={{
                            borderColor: '#E1E1E1',
                            backgroundColor: '#EAFFF3',
                        }}
                        containerStyle={{
                            width: Dimensions.get('screen').width - 32,
                            marginLeft: 16,
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            borderWidth: 1,
                        }}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <DropDownPicker
                        open={openState}
                        value={state}
                        items={states}
                        placeholder="State"
                        setOpen={setOpenState}
                        setValue={setState}
                        // style={styles.input}
                        setItems={setStates}
                        style={{
                            borderColor: '#E1E1E1',
                        }}
                        containerStyle={{
                            width: Dimensions.get('screen').width - 32,
                            marginLeft: 16,
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            borderWidth: 1,
                        }}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <DropDownPicker
                        open={openLga}
                        value={lga}
                        items={lgaList}
                        setOpen={setOpenLga}
                        placeholder="LGA"
                        setValue={setLga}
                        // style={styles.input}
                        setItems={setLgalist}
                        style={{
                            borderColor: '#E1E1E1',
                            backgroundColor: '#EAFFF3',
                        }}
                        containerStyle={{
                            width: Dimensions.get('screen').width - 32,
                            marginLeft: 16,
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            borderWidth: 1,
                        }}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <TextInput
                        label="Email"
                        style={styles.input}
                        placeholder="Verification Method"
                        placeholderTextColor="#e1e1e1"
                        // value={code}
                        // onChangeText={text => setCode(text)}
                    />
                </View>
                <Text style={styles.regText}>Residential Address</Text>
                <View style={{marginTop: 5}}>
                    <DropDownPicker
                        open={openRState}
                        value={state}
                        items={states}
                        placeholder="State"
                        setOpen={setOpenRState}
                        setValue={setState}
                        setItems={setStates}
                        style={{
                            borderColor: '#E1E1E1',
                            backgroundColor: '#EAFFF3',
                        }}
                        containerStyle={{
                            width: Dimensions.get('screen').width - 32,
                            marginLeft: 16,
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            borderWidth: 1,
                        }}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <DropDownPicker
                        open={openRLga}
                        value={state}
                        items={lgaList}
                        setOpen={setOpenRLga}
                        setValue={setLga}
                        // style={styles.input}
                        setItems={setLgalist}
                        style={{
                            borderColor: '#E1E1E1',
                            backgroundColor: '#EAFFF3',
                        }}
                        containerStyle={{
                            width: Dimensions.get('screen').width - 32,
                            marginLeft: 16,
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            borderWidth: 1,
                        }}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <DropDownPicker
                        open={openLga}
                        value={lga}
                        items={lgaList}
                        setOpen={setOpenLga}
                        placeholder="LGA"
                        setValue={setLga}
                        // style={styles.input}
                        setItems={setLgalist}
                        style={{
                            borderColor: '#E1E1E1',
                            backgroundColor: '#EAFFF3',
                        }}
                        containerStyle={{
                            width: Dimensions.get('screen').width - 32,
                            marginLeft: 16,
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            borderWidth: 1,
                        }}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <TextInput
                        label="Email"
                        style={styles.input}
                        placeholder="Verification Method"
                        placeholderTextColor="#e1e1e1"
                        // value={code}
                        // onChangeText={text => setCode(text)}
                    />
                </View>
                <View>
                    <Button
                        title="Proceed to Review ABSSIN Data"
                        titleStyle={styles.verify}
                        onPress={() => navigation.navigate('Confirmation')}
                        buttonStyle={styles.button} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        marginTop: 15,
        width: Dimensions.get('screen').width - 32,
        marginLeft: 16,
        borderRadius: 8,
        backgroundColor: '#EAFFF3'
    },
    sectionTwo:{
        marginTop: 14,
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width - 32,
        marginLeft: 16,
    },
    header: {
        alignSelf: "stretch",
        marginLeft: 16,
        marginTop: 15,
        color: '#071931',
        fontFamily: 'DM Sans',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 32
    },
    regText: {
        marginTop: 10,
        alignSelf: 'stretch',
        marginLeft: 16,
        color: '#5B5B5B',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    input: {
        width: Dimensions.get("screen").width - 32,
        height: 48,
        marginTop: 15,
        marginRight: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E1E1E1',
        marginLeft: 16
    },
    label: {
        marginTop: 5,
        marginLeft: 16,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    nextBtnStyle: {
        width: 363,
        height: 48,
        padding: 10,
        marginLeft: 36,
        left: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#09893E',
        flexShrink: 0
    },
    btnText: {
        color: '#fff'
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
    basic: {
        color: '#5B5B5B',
        marginTop: 20,
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    title: {
        color: '#5B5B5B',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    name: {
        color: '#071931',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 17.81
    },
    datePickerStyle: {
        width: Dimensions.get("screen").width - 32,
        marginLeft: 16
    },
    textTitle: {
        color: "#5B5B5B",
        paddingStart: 16,
        paddingBottom: 18,
        paddingTop: 14,
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 17.81
    },
    text: {
        color: '#071931',
        paddingBottom: 18,
        paddingEnd: 16,
        paddingTop: 14,
        textAlign: 'right',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 17.81
    },
    button:{
        width: Dimensions.get("screen").width - 32,
        marginTop: 17,
        height: 48,
        backgroundColor: '#09893E',
        borderRadius: 8,
        marginLeft: 16,
        marginRight: 16
    }
})
