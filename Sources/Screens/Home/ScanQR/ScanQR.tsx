import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {RNCamera, Barcode} from 'react-native-camera';
import {Api} from '@Services';
import {
  GetCreatureResponseTypes,
  CreatureTypes,
} from 'Sources/Models/AppModels';

type State = {
  canScan: boolean;
};
type Props = {};
class ScanQR extends React.Component<Props, State> {
  private cameraRef = React.createRef<RNCamera>();

  constructor(props: Props) {
    super(props);
    this.state = {
      canScan: true,
    };
  }

  barcodeRecognized = (barcodes: any) => {
    this.setState({canScan: false});
    // const result = JSON.parse(barcodes.data);
    // console.log('check', JSON.parse(barcodes.data));
    // const id = JSON.parse(barcodes.data).id;
    const data = JSON.parse(barcodes.data);
    console.log('data', data);
    const id = data.id;
    console.log('id', id);
    if (id > 0) {
      Api.getCreature<GetCreatureResponseTypes>(id)
        .then(res => {
          const creature: CreatureTypes = res.data;
          console.log('creature', creature);
        })
        .catch(error => {
          console.log('error', error.message);
        });
    } else {
      console.log('error else');
    }
  };
  show = () => {};
  render() {
    const {canScan} = this.state;
    return (
      <RNCamera
        ref={this.cameraRef}
        style={{flex: 1}}
        onBarCodeRead={onBarCodeRead =>
          canScan ? this.barcodeRecognized(onBarCodeRead) : {}
        }
        // onGoogleVisionBarcodesDetected={({barcodes}) => this.show(barcodes)}
        // onGoogleVisionBarcodesDetected={this.barcodeRecognized}></RNCamera>
      ></RNCamera>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default ScanQR;
