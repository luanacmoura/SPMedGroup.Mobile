import React, {Component} from 'react';
import {Text, StyleSheet, ImageBackground, View, Image} from 'react-native';

class login extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <ImageBackground source={require("../assets/img/Bg-login.png")}
                style={StyleSheet.absoluteFillObject}>
                    <View style={styles.overlay} />
                    <View style={styles.main}>
                    <Image source={require("../assets/img/logored.png")}
                        style={styles.mainIcon}/>
                    </View>
            </ImageBackground>
        );
    }   
}

const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
    },
    main: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    mainIcon: {
        height: "30%",
        width: "50%",
        margin: 10
    }
});

export default login;