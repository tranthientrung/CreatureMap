import React from 'react';
import {View, StyleSheet, Text, Button, Image} from 'react-native';
import axios from 'axios';
import {Api} from '@Services';
import {
  GetCreatureResponseTypes,
  CreatureTypes,
} from 'Sources/Models/AppModels';
import {object} from 'prop-types';
import {NavigationProp} from 'react-navigation';

type Props = {
  navigation: NavigationProp;
};
class Information extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    Api.getCreature<GetCreatureResponseTypes>(1)
      .then(res => {
        this.setState({
          creature: res.data,
          imageHash: Date.now(),
          img: 'https://img.lovepik.com/element/40137/4108.png_860.png',
        });
      })
      .catch(error => {
        console.log('error', error.message);
      });
    // this.forceUpdate();
  }

  showMap = (creature: CreatureTypes) => {
    this.props.navigation.navigate('Map', {creature});
  };

  render() {
    const creature: CreatureTypes = this.props.navigation.getParam(
      'creature',
      null,
    );
    console.log('check creature', creature);
    return (
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.container}>
          <Image
            style={styles.img}
            source={{
              // uri: `${img}?${imageHash}`,

              uri: creature.pictures[0],
            }}></Image>
          <Text>{creature.commonName}</Text>
          <Button
            title="location"
            onPress={() => this.showMap(creature)}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
    marginTop: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Information;
