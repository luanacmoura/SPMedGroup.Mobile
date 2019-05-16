import React, {Component} from "React";
import api from "../services/api";
import {Text, AsyncStorage, FlatList} from "react-native";
class ListardoMedico extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { dataSource:[] };
    }

    componentDidMount() {
        this._buscarConsultas();
    }

    _buscarConsultas = async () => {
        const token = await AsyncStorage.getItem("userToken");
        const resposta = await api.get("/consulta/listardomedico", {
            headers : {
                "Content-Type": "application/json",
                "Authorization" : "Bearer" + token
            }
        });
        const dadosDaApi = resposta.data;
        this.setState({ dataSource: dadosDaApi });
    }

    render() {
        return (
        
            <View>
                <Text> Projeto </Text>
                <View>
                    <FlatList
                        data={this.state.dataSource}
                        keyExtractor={item => item.Id}
                        renderItem={this.renderizaItem}
                    />
                </View>
            </View>
        
        );
    }
    renderizaItem = ({ item }) => (
        <View>
          <View>
            <Text>{item.IdUsuarioPaciente}</Text>
            <Text>{item.IdUsuarioMedico}</Text>
            <Text>{item.IdProntuarioPaciente}</Text>
          </View>
        </View>
    );

}

    
}
export default ListardoMedico;