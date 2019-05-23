import React, {Component} from "React";
import api from "../services/api";
import jwt from "jwt-decode";
import Icon from 'react-native-vector-icons/Octicons';
import Iicon from 'react-native-vector-icons/Ionicons';
import { Header, ThemeProvider } from 'react-native-elements';
import {Text, AsyncStorage, FlatList, View, StyleSheet, TouchableOpacity, StatusBar} from "react-native";

class ListardoMedico extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { dataSource:[], Nome:"" };
    }

    componentDidMount() {
        this._buscarConsultas();
    }

    _buscarConsultas = async () => {
        let token = await AsyncStorage.getItem("userToken");
        const nomedousuario = jwt(token).Nome;
        this.setState({Nome : nomedousuario});
        const resposta = await api.get("/consulta/listardomedico", {
            headers : {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token
            }
        });
        const dadosDaApi = resposta.data;
        this.setState({ dataSource: dadosDaApi });
    }

    _realizarLogout = async () => {
        this.props.navigation.navigate("Sair");
    }

    render() {
        return (
            <View>
                <ThemeProvider theme={theme}>
                    <Header placement="left"
                    centerComponent={{ text: "Minhas consultas", style: { color: '#ffffff', fontSize:20 } }}
                    rightComponent={
                        <Icon onPress={this._realizarLogout} name="sign-out" size={25} color="#ffffff" />
                    }/>

                    <View style = {styles.all}>
                        <Text> Bem vindo Médico(a), {this.state.Nome} </Text>
                        <View>
                            <FlatList
                                data={this.state.dataSource}
                                keyExtractor={item => item.id}
                                renderItem={this.renderizaItem}
                            />
                        </View>
                    </View>

                </ThemeProvider>
            </View>
        
        );
    }
    renderizaItem = ({ item}) => (
        <View style={styles.quadrado}>
          <View>
                <Text> Data da consulta: {item.dataConsulta}</Text>
                <Text> Paciente: {item.idProntuarioPacienteNavigation.nome}</Text>
                <Text> CPF: {item.idProntuarioPacienteNavigation.cpf}</Text>
                {item.statusConsulta === "Agendada" && <Text style={[styles.statusAg,styles.status]}> {item.statusConsulta} </Text>}
                {item.statusConsulta === "Cancelada" && <Text style={[styles.statusCan, styles.status]}> {item.statusConsulta} </Text>}
                {item.statusConsulta === "Realizada" && <Text style={[styles.statusRea, styles.status]}> {item.statusConsulta} </Text>}

                {item.statusConsulta === "Realizada" && <Text> Descrição: {item.descricao} </Text>}
          </View>
        </View>
    );

}

const theme = {
    Header: {
        backgroundColor:"#651428",
        containerStyle: {
            top:-20,
            paddingRight:20
        },
        statusBarProps : {
            backgroundColor:"#551122"
        }
    }
}

const styles = StyleSheet.create( {
    quadrado: {
        borderWidth:1,
        borderColor:"#303030",
        borderLeftWidth:6,
        borderLeftColor:"#ffffff",
        marginBottom:20,
        padding:10
    },
    all: {
        paddingHorizontal:20,
        fontSize:20
    },
    status : {
        width:80,
        borderRadius:10,
        textAlign:"center",
        color:"white"
    },
    statusAg : {
        backgroundColor:"orange"
    },
    statusCan: {
        backgroundColor:"red"
    },
    statusRea: {
        backgroundColor:"green"
    }
});

export default ListardoMedico;