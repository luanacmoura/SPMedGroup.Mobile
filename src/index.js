import { createAppContainer, createStackNavigator,  createSwitchNavigator } from "react-navigation";
import Login from "./Pages/Login.js";
import ListarMedico from "./Pages/ListardoMedico";
import ListarPaciente from "./Pages/ListardoPaciente";


const AuthStack = createStackNavigator({ Login});
const ListarM = createStackNavigator({ListarMedico})
const ListarP = createStackNavigator({ListarPaciente})

export default createAppContainer(
    createSwitchNavigator(
      {
        AuthStack,
        ListarM,
        ListarP
      },
      {
        initialRouteName: "AuthStack"
      }
    )
);