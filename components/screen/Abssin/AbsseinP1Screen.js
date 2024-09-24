import React, {useState} from "react";
import {Text, View, StyleSheet, TextInput, ScrollView, Dimensions} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {Button} from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
export default function AbsseinP1Screen({navigation}){
    const [image, setImage] = useState(null);
    const [identity, setIdentity] = useState('')
    const [identityNum, setIdentityNum] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')
    const [firstname, setFirstname] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastname, setLastname] = useState('')
    const [marital, setMarital] = useState('')
    const [gender, setGender] = useState('')
    const [openIdentity, setOpenIdentity] = useState(false);
    const [openTitle, setOpenTitle] = useState(false);
    const [identityList, setIdentityList] = useState([
        {id: 1, label: 'Lagos', value: 'lagos'},
        {id: 2,label: 'Abia', value: 'abia'},
        {id: 3,label: 'FCT', value: 'fct'}
    ]);
    const [titleList, setTitleList] = useState([
        { id: 1, label: 'Mr', value: 'Mr'},
        { id: 2, label: 'Mrs', value: 'Mrs'},
        { id: 3, label: 'Miss', value: 'Miss'},
    ])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Abssein</Text>
            <Text style={styles.regText}>Registration for Abssein</Text>
            <View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 10, borderWidth: 2 }} />}
                    <Button icon={{
                        name: "camera-outline",
                        type: 'ionicon',
                        size: 15,
                        color: "white"
                    }} onPress={pickImage} />
                </View>
            </View>
            <View style={{marginTop: 5}}>
                <DropDownPicker
                    open={openIdentity}
                    value={identity}
                    itemKey={identityList.id}
                    placeholder="BVN"
                    items={identityList}
                    setOpen={setOpenIdentity}
                    setValue={setIdentity}
                    setItems={setIdentityList}
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
            <Text style={styles.label}>Enter your ID</Text>
            <View>
                <TextInput
                    label="ID no"
                    style={styles.input}
                    placeholder="ID Number"
                    placeholderTextColor="#e1e1e1"
                    value={identityNum}
                    onChangeText={text => setIdentityNum(text)}
                />
            </View>

            <View style={{marginTop: 5}}>
                <TextInput
                    label="Phone"
                    style={styles.input}
                    placeholder="Phone"
                    placeholderTextColor="#e1e1e1"
                    value={phone}
                    onChangeText={text => setPhone(text)}
                />
            </View>
            <View style={{marginTop: 10}}>
                <TextInput
                    label="Email"
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#e1e1e1"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View style={{marginTop: 5}}>
                <DropDownPicker
                    open={openTitle}
                    value={identity}
                    items={titleList}
                    placeholder="Title"
                    setOpen={setOpenTitle}
                    setValue={setTitle}
                    itemKey={titleList.id}
                    setItems={setTitleList}
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
            <View style={{marginTop: 10}}>
                <TextInput
                    label="Firstname"
                    style={styles.input}
                    placeholder="Firstname"
                    placeholderTextColor="#e1e1e1"
                    value={firstname}
                    onChangeText={text => setFirstname(text)}
                />
            </View>
            <View style={{marginTop: 10}}>
                <TextInput
                    label="Middlename"
                    style={styles.input}
                    placeholder="Middlename"
                    placeholderTextColor="#e1e1e1"
                    value={middleName}
                    onChangeText={text => setMiddleName(text)}
                />
            </View>
            <View style={{marginTop: 10}}>
                <TextInput
                    label="lastname"
                    style={styles.input}
                    placeholder="lastname"
                    placeholderTextColor="#e1e1e1"
                    value={lastname}
                    onChangeText={text => setLastname(text)}
                />
            </View>
            <View style={{marginTop: 10}}>
                <TextInput
                    label="Marital Status"
                    style={styles.input}
                    placeholder="Marital Status"
                    placeholderTextColor="#e1e1e1"
                    value={marital}
                    onChangeText={text => setMarital(text)}
                />
            </View>
            <View style={{marginTop: 10}}>
                <TextInput
                    label="Gender"
                    style={styles.input}
                    placeholder="Gender"
                    placeholderTextColor="#e1e1e1"
                    value={gender}
                    onChangeText={text => setGender(text)}
                />
            </View>
            <View>
                <Button
                    title="Start ABSSIN Setup"
                    titleStyle={styles.btnText}
                    onPress={() => navigation.navigate('Step2')}
                    buttonStyle={styles.nextBtnStyle} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignSelf: "stretch",
        marginLeft: 16,
        marginTop: 15,
        color: '#071931',
        fontFamily: 'DMSans_500Medium',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 32
    },
    card: {
        marginTop: 15,
        width: Dimensions.get('screen').width - 32,
        marginLeft: 16,
        borderRadius: 8,
        backgroundColor: '#EAFFF3'
    },
    regText: {
        marginTop: 10,
        alignSelf: 'stretch',
        marginLeft: 16,
        color: '#5B5B5B',
        fontSize: 14,
        fontFamily: 'DMSans_400Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22
    },
    input: {
        width: Dimensions.get("screen").width - 32,
        height: 48,
        marginTop: 5,
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
        fontFamily: 'DMSans_400Regular',
        fontStyle: 'normal',
        fontWeight: '400',
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
        color: '#fff'
    },
})
