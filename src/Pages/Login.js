import React, { Component } from "react";
import api from "../services/api";
import {Text, StyleSheet, ImageBackground, View, Image, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import { whileStatement } from "@babel/types";

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
                        <Image source={require("../assets/img/logored.png")}
                        style={styles.mainIcon}/>
                    
                        <View style={styles.inputLogin}>
                            <TextInput style = {styles.inputindividual} placeholderTextColor="#FFFFFF" placeholder="Insira seu email" onChangeText={email => this.setState({ email })}/>

                            <TextInput secureTextEntry={true} style = {styles.inputindividual} placeholderTextColor="#FFFFFF" password="true" placeholder="Insira sua senha" onChangeText={senha => this.setState({ senha })}/>
                        </View>

                        <View style={styles.loginbtn}>
                            <TouchableOpacity onPress={this._realizarLogin}>
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
        height: "30%",
        width: "50%",
        margin: 10
    },
    inputLogin: {
        width: 240,
        marginTop: 30,
        marginBottom: 10,
        fontSize: 20,
        color: "#FFFFFF"
    },
    inputindividual :{
        marginTop:25,
        opacity:.85,
        backgroundColor:"#C5683E",
        borderColor:"#ffffff",
        borderWidth:2,
        borderRadius:30,
        paddingLeft:15,
        paddingRight:15,
        height:50,
        color:"#ffffff"
    },
    loginbtn: {
        marginTop: 50,
        backgroundColor:"#C5683E",
        width: 240,
        borderRadius:30,
        padding:15
    },
    logintext: {
        color: "#FFFFFF",
        textAlign:"center",
    }
});

export default Login;