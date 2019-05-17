import React, {Component} from "React";
import api from "../services/api";
import jwt from "jwt-decode";
import {Text, AsyncStorage, FlatList, View} from "react-native";

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

    render() {
        return (
        
            <View>
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
            <Text>{item.idUsuarioPaciente}</Text>
            <Text>{item.idUsuarioMedico}</Text>
            <Text>{item.idProntuarioPaciente}</Text>
          </View>
        </View>
    );

}

export default ListardoMedico;