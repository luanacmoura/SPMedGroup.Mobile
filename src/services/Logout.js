import React, {Component} from 'React';
import {AsyncStorage, Text, ActivityIndicator, View, ImageBackground, StyleSheet, StatusBar} from 'react-native';


class Logout extends Component {
    static navigationOptions = {
        header: null
    };

    _RealizarLogout = async () => {
        await AsyncStorage.removeItem("userToken");
        this.props.navigation.navigate("Login");
    };

    componentDidMount(){
        this._RealizarLogout();
    };

    render() {
        return (
            <ImageBackground source={require("../assets/img/Bg-login9.png")}
                style={StyleSheet.absoluteFillObject}>
                <StatusBar backgroundColor="#65142800" barStyle="light-content" translucent={true}/>
                <View>
                    <ActivityIndicator style={styles.center} size={80} color="#ffffff" />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        marginTop:"60%"
    }
});

export default Logout; 