import React, { Component } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';
import api from "../services/api";
import {Text, StyleSheet, ImageBackground, View, Image, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';

class Login extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { email: "", senha: "" };
      }
    
      _realizarLogin = async () => {
    
        const resposta = await api.post("/login", {
          email: this.state.email,
          senha: this.state.senha
        });
    
        const token = resposta.data.token;        
        console.warn(token);
        await AsyncStorage.setItem("userToken", token);
      };

    render() {
        return (
            <ImageBackground source={require("../assets/img/Bg-login.png")}
                style={StyleSheet.absoluteFillObject}>
                    <View style={styles.overlay} />
                    
                    <View style={styles.main}>
                        <Image source={require("../assets/img/logowhite.png")}
                        style={styles.mainIcon}/>
                    
                        <View style={styles.inputLogin}>

                            <Input textColor="#666666" placeholderTextColor="#666666" placeholder="Insira seu email" onChangeText={email => this.setState({ email })}
                            leftIcon={
                                <Icon name="email-outline" size={25} color="#8c8c8c" />
                            }/>

                            <Input  secureTextEntry={true} textColor="#666666" placeholderTextColor="#666666" password="true" placeholder="Insira sua senha" onChangeText={senha => this.setState({ senha })}
                            leftIcon={
                                <Icon name="lock-outline" size={25} color="#8c8c8c" />
                            }/>

                            <TouchableOpacity style={styles.loginbtn} onPress={this._realizarLogin} >
                                <Text style={styles.logintext}>ENTRAR</Text>
                            </TouchableOpacity>
                        </View>
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
        height: "20%",
        width: "40%",
        margin: 10
    },
    inputLogin: {
        width: "85%",
        backgroundColor:"#ffffff",
        borderRadius:10,
        marginTop: 30,
        marginBottom: 10,
        fontSize: 20,
        color: "#FFFFFF",
        padding:10
    },
    loginbtn: {
        marginTop: 50,
        marginBottom:15,
        backgroundColor:"#c6603e",
        width: "100%",
        borderRadius:5,
        padding:15
    },
    logintext: {
        color: "#FFFFFF",
        textAlign:"center",
    }
});

export default Login;