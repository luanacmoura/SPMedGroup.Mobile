import { createAppContainer, createStackNavigator,  createSwitchNavigator } from "react-navigation";

import Login from "./pages/Login";
import ListardoMedico from "./pages/ListardoMedico";
import ListardoPaciente from "./pages/ListardoPaciente";


const AuthStack = createStackNavigator({ Login });
const Listas = createStackNavigator({ListardoMedico, ListardoPaciente});

const MainNavigator = createAppContainer(
    createSwitchNavigator(
      {
        Listas,
        AuthStack,
      },
      {
        initialRouteName: "AuthStack"
      }
    )
);