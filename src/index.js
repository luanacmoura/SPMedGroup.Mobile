import { createAppContainer, createStackNavigator,  createSwitchNavigator } from "react-navigation";
import Login from "./pages/login";


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