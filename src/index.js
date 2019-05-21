import { createAppContainer, createStackNavigator,  createSwitchNavigator } from "react-navigation";
import Login from "./Pages/Login.js";
import ListarMedico from "./Pages/ListardoMedico";
import ListarPaciente from "./Pages/ListardoPaciente";
import Logout from "./services/Logout";


const AuthStack = createStackNavigator({ Login});
const ListarM = createStackNavigator({ListarMedico})
const ListarP = createStackNavigator({ListarPaciente})
const Sair = createStackNavigator({Logout})

export default createAppContainer(
    createSwitchNavigator(
      {
        AuthStack,
        ListarM,
        ListarP,
        Sair
      },
      {
        initialRouteName: "AuthStack"
      }
    )
);