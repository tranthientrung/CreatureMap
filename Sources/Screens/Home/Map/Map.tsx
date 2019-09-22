import React, {Component} from 'react';
import {View, Dimensions, Image} from 'react-native';

import MapView, {
  MarkerAnimated,
  Point,
  LatLng,
  Marker,
  AnimatedRegion,
  Region,
} from 'react-native-maps';
import {CreatureTypes} from 'Sources/Models/AppModels';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 10.0309636;
const LONGITUDE = 105.7513944;
const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

type Props = {
  navigation: NavigationType;
};
type State = {
  region: Region;
  markers: LatLng[];
  creature: CreatureTypes;
};
class Map extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      creature: {
        commonName: '',
        biologicalName: '',
        image: '',
        information: '',
        coordinates: {
          lat: LATITUDE,
          lon: LONGITUDE,
        },
      },
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [
        {latitude: LATITUDE, longitude: LONGITUDE},
        // {latitude: 10.031809, longitude: 105.765213},
        // {latitude: 10.0324, longitude: 105.766501},
        // {latitude: 10.03181, longitude: 105.765213},
        // {latitude: 10.031815, longitude: 105.765213},
        // {latitude: 10.031818, longitude: 105.765213},
        // {latitude: 10.031822, longitude: 105.765213},
        // {latitude: 10.03183, longitude: 105.765213},
      ],
    };
  }

  componentDidMount() {
    const creature: CreatureTypes = this.props.navigation.getParam('creature');
    this.setState({
      creature,
      region: {
        latitude: creature.coordinates.lat,
        longitude: creature.coordinates.lon,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [
        {
          latitude: creature.coordinates.lat,
          longitude: creature.coordinates.lon,
        },
      ],
    });
  }

  renderMarkers() {
    const {markers} = this.state;
    const {creature} = this.state;
    console.log('check image', creature.image);
    let markerResult: any = [];
    let key = 0;
    markers.map(latLng => {
      key++;
      markerResult.push(
        <Marker key={key} coordinate={latLng}>
          <Image
            style={{width: 50, height: 50}}
            source={{
              // uri: creature.image + '?' + new Date(),
              uri: 'https://img.lovepik.com/element/40137/4108.png_860.png',
            }}
          />
        </Marker>,
      );
    });
    console.log('Check markers', markerResult);
    return markerResult;
  }

  render() {
    const {region} = this.state;
    return (
      <MapView
        provider={null}
        style={{flex: 1}}
        showsUserLocation={true}
        // initialRegion={coordinate}
        // initRegion={coordinate}
        region={region}>
        {this.renderMarkers()}
      </MapView>
    );
  }
}

export default Map;
