import {AppRegistry} from 'react-native';
import Navigator from "./src";
import {name as appName} from './app.json';

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => Navigator);