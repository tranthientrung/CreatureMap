import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Start, ScanQR, Map, Information, Search} from '@Screens';

const rootStack = createStackNavigator(
  {
    Start: {
      screen: Start,
      navigationOptions: {
        header: null,
        // title: 'Start',
      },
    },
    ScanQR: {
      screen: ScanQR,
      navigationOptions: {
        title: 'ScanQR',
      },
    },
    Map: {
      screen: Map,
      navigationOptions: {
        // title: 'Map',
        header: null,
      },
    },
    Information: {
      screen: Information,
      navigationOptions: {
        // header: null,
        title: 'Creature Information',
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        // header: null,
        title: 'Search Creature',
        headerLeft: null,
      },
    },
  },
  {
    initialRouteName: 'Start',
  },
);

const AppContainer = createAppContainer(rootStack);

export default AppContainer;
