import React, { Component } from "react";
import Icon from 'react-native-vector-icons/EvilIcons';
import jwt from "jwt-decode";
import { ThemeProvider, Input } from 'react-native-elements';
import api from "../services/api";
import {Text, StyleSheet, ImageBackground, View, Image, TouchableOpacity, AsyncStorage, StatusBar} from 'react-native';

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
        await AsyncStorage.setItem("userToken", token);
        const tipousuario = jwt(token).Role;

        if (tipousuario == 2) {
            this.props.navigation.navigate("ListarM");
        }
        else if (tipousuario == 3) {
            this.props.navigation.navigate("ListarP");
        }
        //Fazer uma tela pra listar todas as consultas
      };

    render() {
        return (
            <ImageBackground source={require("../assets/img/Bg-login9.png")}
                style={StyleSheet.absoluteFillObject}>
                    <View style={styles.overlay} />
                    
                    <View style={styles.main}>
                    <StatusBar backgroundColor="#651428" barStyle="light-content" />
                        <Image source={require("../assets/img/logowhite.png")}
                        style={styles.mainIcon}/>

                        <Text> Suas consultas em um só lugar! </Text>
                    
                        <View style={styles.inputLogin}>
                            <ThemeProvider theme={theme}>
                                <Input shake={true}  color="#ffffffe6" placeholderTextColor="#ffffffe6" placeholder="Email" onChangeText={email => this.setState({ email })}
                                leftIcon={
                                    <Icon name="envelope" size={30} color="#ffffff80" />
                                }/>

                                <Input  secureTextEntry={true}  placeholderTextColor="#ffffff" password="true" placeholder="Senha" onChangeText={senha => this.setState({ senha })}
                                leftIcon={
                                    <Icon name="lock" size={30} color="#ffffff80"  textAlign="center"/>
                                }/>
                            </ThemeProvider>
                            <TouchableOpacity style={styles.loginbtn} onPress={this._realizarLogin} >
                                <Text style={styles.logintext}>ENTRAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

            </ImageBackground>
        );
    }   
}

const theme = {
    Input: {
      containerStyle: {
        marginTop: 10,
        marginBottom:10,
        backgroundColor: '#ffffff33',
        borderRadius:25,
        paddingHorizontal:0
      },
      inputStyle: {
          color:"white",
          fontFamily:"Kodchasan-Light"
      },
      inputContainerStyle: {
          borderColor:"#ffffff00",
      }
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
        height: "21%",
        width: "40%",
        margin: 10
    },
    inputLogin: {
        width: "85%",
        marginTop: 30,
        marginBottom: 10,
        fontSize: 15,
        color: "#FFFFFF",
        padding:10,
    },
    loginbtn: {
        marginTop: 50,
        marginBottom:15,
        width: "100%",
        borderWidth:1.5,
        borderColor:"#ffffff33",
        borderRadius:25,
        padding:15
    },
    logintext: {
        color: "#FFFFFF",
        textAlign:"center",
        fontFamily:"Kodchasan-Light"
    }
});

export default Login;