import React, {Component} from "React";
import api from "../services/api";
import logout from "../services/Logout";
import jwt from "jwt-decode";
import {Text, AsyncStorage, FlatList, View, StyleSheet, TouchableOpacity} from "react-native";

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
                <TouchableOpacity onPress={this._realizarLogout} >
                    <Text style={styles.logintext}>Sair</Text>
                </TouchableOpacity>

                <Text> Listar do Médico(a), {this.state.Nome} </Text>
                <View>
                    <FlatList
                        data={this.state.dataSource}
                        keyExtractor={item => item.id}
                        renderItem={this.renderizaItem}
                    />
                </View>



            </View>
        
        );
    }
    renderizaItem = ({ item }) => (
        <View>
          <View>
                <Text> Data da consulta: {item.dataConsulta}</Text>
                <Text> Paciente: {item.idProntuarioPacienteNavigation.nome}</Text>
                {item.statusConsulta === "Agendada" && <Text style={[styles.statusAg,styles.status]}> {item.statusConsulta} </Text>}
                {item.statusConsulta === "Cancelada" && <Text style={[styles.statusCan, styles.status]}> {item.statusConsulta} </Text>}
                {item.statusConsulta === "Realizada" && <Text style={[styles.statusRea, styles.status]}> {item.statusConsulta} </Text>}

                {item.statusConsulta === "Realizada" && <Text> Descrição: {item.descricao} </Text>}
          </View>
        </View>
    );

}

const styles = StyleSheet.create( {
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