import React, {Component} from 'React';
import {AsyncStorage, Text, ActivityIndicator, View} from 'react-native';


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
            <View>
            <ActivityIndicator size="small" color="#00ff00" />
        <Text style={{color:"red"}}> Saindo.. </Text>
            </View>
        );
    }
}
export default Logout; 