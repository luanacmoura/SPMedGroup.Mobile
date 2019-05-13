import React, { Component } from "react";
import api from "../services/api";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, Image } from "react-native";

class Login extends Component {
    //Pra não ficar a barra branca em cima (header):
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { email: "", senha: "", erro: "" };
    }

    _realizarLogin = async () => {
        try {
            const resposta = await api.post("/login", {
                email: this.state.email,
                senha: this.state.senha
            });

            const token = resposta.data.token;
            await AsyncStorage.setItem("user", token);
            this.props.navigation.navigate("MainNavigator");
        }
        catch {
            this.state.erro = "Email ou senha inválidos!";
        }
    };

    _redirectCadastro = async () => {
        this.props.navigation.navigate("CadastroUsuario");
    }

    render() {
        return (

            <View style={styles.main}>
                <View style={styles.loginImg}>
                    <Image
                        source={require("../assets/img/profile.png")}
                        style={styles.loginImg}
                    />
                </View>
                <View style={styles.inputLogin}>
                    <TextInput placeholder="Insira seu email"
                        placeholderTextColor="#CCCCCC"
                        underlineColorAndroid="#FFFFFF" onChangeText={email => this.setState({ email })} />

                    <TextInput placeholder="Insira sua senha"
                        placeholderTextColor="#CCCCCC"
                        underlineColorAndroid="#FFFFFF" onChangeText={senha => this.setState({ senha })} />
                </View>
                <View style={styles.loginbtn}>
                    <TouchableOpacity onPress={this._realizarLogin}>
                        <Text style={{color: "white"}}>LOGIN</Text>
                    </TouchableOpacity>

                    <Text>{this.state.erro}</Text>

                    <TouchableOpacity onPress={this._redirectCadastro}>
                        <Text style={{color: "white"}}>Cadastre-se!</Text>
                    </TouchableOpacity>
                </View>


            </View>

        );
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#0000FF",
        alignContent: "center",
        alignItems: "center",
        display: "flex",
        height: 1336
    },
    loginImg: {
        marginTop: 50,
        width: 100,
        height: 100,
    },
    inputLogin: {
        width: 240,
        marginTop: 80,
        marginBottom: 10,
        fontSize: 20,
        color: "#FFFFFF"
    },
    loginbtn: {
        marginTop: 50,
    },
    Text: {
        color: "#FFFFFF"
    }
})

export default Login;