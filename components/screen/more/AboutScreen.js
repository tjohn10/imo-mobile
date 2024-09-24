import React from "react";
import {SafeAreaView, Text, StyleSheet, View, ScrollView, Dimensions} from "react-native";

export default function AboutScreen() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>About</Text>
            <View style={{marginLeft: 16, marginRight: 16, width: Dimensions.get('screen').width - 32, marginBottom: 10}}>
                <Text style={styles.main}>Welcome to the Abia State Internal Revenue Service (IRS) Mobile Application – your one-stop
                    solution for seamless and efficient tax management. At Abia State IRS, we are committed to
                    revolutionizing the way you interact with your tax obligations. Our mobile app is more than just a
                    platform; it's a commitment to providing you with a seamless, convenient, transparent, and
                    user-friendly experience in managing your tax responsibilities.</Text>

                <Text style={styles.subtitle}>Who We Are:</Text>
                <Text style={styles.main}>Abia State IRS is a dynamic and forward-thinking revenue agency dedicated to fostering economic
                    development through effective tax administration. With a focus on innovation and customer
                    satisfaction, we aim to simplify the tax process and enhance the overall taxpayer experience.</Text>

                <Text style={styles.subtitle}>Our Vision:</Text>
                <Text style={styles.main}> To be a leading revenue agency that leverages technology to provide world-class tax services,
                    contributing to the sustainable development of Abia State.</Text>

                <Text style={styles.subtitle}>Our Mission:</Text>
                <Text style={styles.main}> We are dedicated to efficiently collecting, managing, and optimizing revenue for the development
                    of Abia State by leveraging cutting-edge technology, fostering compliance, and ensuring a positive
                    taxpayer experience.</Text>

                <Text style={styles.subtitle}>Why Abia State IRS Mobile App:</Text>

                <Text style={styles.outline}>Simplified Tax Management:</Text><Text style={styles.main}> Our mobile app provides an intuitive platform for taxpayers to easily
                    manage their tax obligations. From filing returns to making payments, everything you need is just a
                    few taps away.</Text>

                <Text style={styles.outline}>
                    Real-Time Updates:</Text><Text style={styles.main}> Stay informed with real-time updates on tax-related news, changes in regulations,
                    and important announcements from Abia State IRS. We keep you in the loop, ensuring you are always
                    up-to-date.
                </Text>
                <Text style={styles.outline}>
                    Secure and Convenient Transactions:</Text><Text style={styles.main}> Enjoy the convenience of secure and hassle-free transactions. Our
                    mobile app prioritizes the security of your information, providing a reliable and trusted platform for
                    all your tax-related activities.
                </Text>
                <Text style={styles.outline}>
                    User-Friendly Interface:
                </Text>
                <Text style={styles.main}>
                    Designed with simplicity in mind, our app is user-friendly and accessible to
                    individuals and businesses alike. Whether you are a seasoned taxpayer or a first-time filer, our app
                    makes the process smooth and straightforward.
                </Text>
                <Text style={styles.outline}>
                    Access to Resources:
                </Text>
                <Text style={styles.main}>
                    Explore a wealth of resources, including tax guides, FAQs, and other educational
                    materials. Abia State IRS is committed to empowering taxpayers with the knowledge they need to navigate
                    the tax landscape with confidence.
                </Text>
                <Text style={styles.outline}>Get Started:</Text>
                <Text>Download the Abia State IRS Mobile App today and embark on a journey towards a more streamlined
                    and efficient tax experience. We are here to support you in fulfilling your tax responsibilities and
                    contributing to the growth and development of Abia State.

                    Thank you for choosing Abia State IRS – where innovation meets taxation for a brighter future!
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginLeft: 16,
        color: '#333',
        marginTop: 20,
        lineHeight: 22,
        letterSpacing: 0,
        textAlign: "left"
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "700",
        color: '#333',
        marginTop: 10,
        lineHeight: 26,
        letterSpacing: 0,
        textAlign: "left"
    },
    outline: {
        fontSize: 16,
        fontWeight: "700",
        color: '#333',
        marginTop: 10,
        lineHeight: 26,
        letterSpacing: 0,
        textAlign: "left"
    },
    main: {
        fontSize: 14,
        fontWeight: "400",
        color: '#333',
        marginTop: 5,
        lineHeight: 15,
        letterSpacing: 0,
        textAlign: "justify"
    }
})
