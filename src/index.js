import { createAppContainer, createStackNavigator,  createSwitchNavigator } from "react-navigation";
import Login from "./Pages/Login.js";


const AuthStack = createStackNavigator({ Login});

export default createAppContainer(
    createSwitchNavigator(
      {
        AuthStack
      },
      {
        initialRouteName: "AuthStack"
      }
    )
);