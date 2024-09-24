import React, {useState} from "react";
import {Text, TextInput, View, StyleSheet, SafeAreaView, Dimensions, Image, Pressable, Platform} from "react-native";
import {Card} from "react-native-paper";
import avatar from "../../../assets/avatar.png";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import {Button} from "react-native-elements";

export default function AbsseinP2Screen({navigation}){
    const [value, setValue] = useState("");
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false);
    const [showPicker, setShowPicker] = useState(false)
    const [dateOfBirth, setDateOfBirth] = useState(Date())
    const [occupation, setOccupation] = useState("")
    const [children, setChildren] = useState("")
    const [salary, setSalary] = useState("")

    const [items, setItems] = useState([
        {label: 'Employed', value: 'employed'},
        {label: 'Unemployed', value: 'unemployed'},
        {label: 'Self-Employed', value: 'self_employed'}
    ]);

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }
    const onChange = ({type}, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate
            setDate(currentDate)

            if (Platform.OS === "android") {
                toggleDatePicker()
                setDateOfBirth(currentDate.toDateString())
            }

        } else {
            toggleDatePicker()
        }
    }
    return(
        <SafeAreaView style={{flex: 1, height: Dimensions.get("screen").height - 20}}>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={styles.basic}>Basic Information</Text>
                            <Text style={styles.title}>Full Name: <Text style={styles.name}>Bruno
                                Otax</Text></Text>
                            <Text style={styles.title}>ID: <Text style={styles.name}>BVN</Text></Text>
                        </View>
                        <View>
                            <Image source={avatar} style={styles.avatar}/>
                        </View>
                    </View>

                </Card.Content>
            </Card>
            <View>
                {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="spinner"
                        onChange={onChange}
                    />
                )}

                {!showPicker && (
                    <Pressable
                        onPress={toggleDatePicker}
                    >
                        <TextInput
                            label="Date"
                            style={styles.input}
                            placeholder="Date"
                            placeholderTextColor="#e1e1e1"
                            editable={false}
                            value={dateOfBirth}
                            onChangeText={text => setDateOfBirth(text)}
                            onPressIn={toggleDatePicker}
                        />
                    </Pressable>
                )}
            </View>
            <View style={{marginTop: 5}}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    placeholder="Employment Status"
                    // style={styles.input}
                    setItems={setItems}
                    placeholderStyle={{
                        color: '#09893E'
                    }}
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
                    label="Occupation"
                    style={styles.input}
                    placeholder="Occupation"
                    placeholderTextColor="#e1e1e1"
                    value={occupation}
                    onChangeText={text => setOccupation(text)}
                />
            </View>
            <View style={{marginTop: 5}}>
                <TextInput
                    label="Children"
                    style={styles.input}
                    placeholder="Have Children?"
                    placeholderTextColor="#e1e1e1"
                    value={children}
                    onChangeText={text => setChildren(text)}
                />
            </View>
            <View style={{marginTop: 5}}>
                <TextInput
                    label="Salary Range"
                    style={styles.input}
                    placeholder="Have Children?"
                    placeholderTextColor="#e1e1e1"
                    value={salary}
                    onChangeText={text => setSalary(text)}
                />
            </View>
            <View>
                <Button
                    title="Proceed To ABSSIN Address Setup"
                    titleStyle={styles.verify}
                    onPress={() => navigation.navigate('Step3')}
                    buttonStyle={styles.button} />
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    card: {
        marginTop: 15,
        width: Dimensions.get('screen').width - 32,
        marginLeft: 16,
        borderRadius: 8,
        backgroundColor: '#EAFFF3'
    },
    input: {
        width: Dimensions.get("screen").width - 32,
        height: 48,
        marginTop: 20,
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
    button:{
        width: Dimensions.get("screen").width - 32,
        marginTop: 17,
        height: 48,
        backgroundColor: '#09893E',
        borderRadius: 8,
        marginLeft: 16,
        marginRight: 16
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
