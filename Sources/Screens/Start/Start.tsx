import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  NavigationScreenProps,
  NavigationAction,
  NavigationProp,
} from 'react-navigation';
type Props = {
  navigation: NavigationProp;
};
class Start extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Search');
    }, 2000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txtSplashScreen}>Splash Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txtSplashScreen: {
    fontSize: 28,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Start;
