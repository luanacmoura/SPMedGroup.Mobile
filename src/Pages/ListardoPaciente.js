import React, {Component} from "React";
import api from "../services/api";
import jwt from "jwt-decode";
import Icon from 'react-native-vector-icons/Octicons';
import { Header, ThemeProvider } from 'react-native-elements';
import {Text, AsyncStorage, FlatList, View, StyleSheet, Image} from "react-native";

class ListardoPaciente extends Component {

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
        const resposta = await api.get("/consulta/listardopaciente", {
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
                        <Text style={{fontSize:17, marginBottom:20}}> Bem vindo(a), {this.state.Nome}! </Text>
                        <View>
                            <FlatList
                                data={this.state.dataSource}
                                keyExtractor={item => item.id}
                                renderItem={this.renderizaItem}
                            />
                            <FlatList
                                data={this.state.dataSource}
                                keyExtractor={item => item.id}
                                renderItem={this.renderizaItemRealizada}
                            />
                            <FlatList
                                data={this.state.dataSource}
                                keyExtractor={item => item.id}
                                renderItem={this.renderizaItemCancelada}
                            />
                        </View>
                    </View>

                    {this.state.dataSource == "" &&
                            <View>
                                <Image source={require("../assets/img/mocadoerro.png")} style={styles.nothing}/>
                            </View>
                    }

                </ThemeProvider>
            </View>
        
        );
    }

    renderizaItem = ({item}) => (
        item.statusConsulta === "Agendada" &&
        <View style={styles.quadrado}>
                    <View style={styles.headerquadrado}>
                        <Text> Paciente: {item.idProntuarioPacienteNavigation.nome}</Text>
                        <Text style={[styles.statusAg,styles.status]}> {item.statusConsulta} </Text>
                    </View>
                <View>
                        <Text> CPF: {item.idProntuarioPacienteNavigation.cpf}</Text>
                        <Text> Data da consulta: {item.dataConsulta}</Text>
                </View>
        </View>
    );

    renderizaItemRealizada = ({item}) => (
        item.statusConsulta === "Realizada" &&
        <View style={styles.quadrado}>
                    <View style={styles.headerquadrado}>
                        <Text> Paciente: {item.idProntuarioPacienteNavigation.nome}</Text>
                        <Text style={[styles.statusRea, styles.status]}> {item.statusConsulta} </Text>                   
                    </View>
                <View>
                        <Text> CPF: {item.idProntuarioPacienteNavigation.cpf}</Text>
                        <Text> Data da consulta: {item.dataConsulta}</Text>
                        {item.statusConsulta === "Realizada" && <Text> Descrição: {item.descricao} </Text>}
                </View>
        </View>
    );

    renderizaItemCancelada = ({item}) => (
        item.statusConsulta === "Cancelada" &&
        <View style={styles.quadrado}>
                    <View style={styles.headerquadrado}>
                        <Text> Paciente: {item.idProntuarioPacienteNavigation.nome}</Text>
                        <Text style={[styles.statusCan, styles.status]}> {item.statusConsulta} </Text>
                    </View>
                <View>
                        <Text> CPF: {item.idProntuarioPacienteNavigation.cpf}</Text>
                        <Text> Data da consulta: {item.dataConsulta}</Text>
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
        borderLeftWidth:5,
        borderLeftColor:"#86BEB5",
        borderRadius:3,
        marginBottom:20,
        padding:10,
        display:"flex",
        flexDirection:"column",
        backgroundColor:"#30303020"
    },
    headerquadrado: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    all: {
        paddingHorizontal:20,
        fontSize:20,
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
    },
    nothing: {
        position:"relative",
        bottom:0,
        width:"99%",
        height:"75%",
        marginTop:"20%"
    }
});

export default ListardoPaciente;