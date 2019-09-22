import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
  ListView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Device} from '@Utils';
import {Api} from '@Services';
import {
  CreatureTypes,
  SearchCreatureResponseTypes,
} from 'Sources/Models/AppModels';
type Props = {};
type State = {
  textSearch: string;
  creatures: Array<CreatureTypes>;
};

class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      textSearch: '',
      creatures: [],
    };
  }

  search = () => {
    const {textSearch} = this.state;
    Api.searchCreature<SearchCreatureResponseTypes>(textSearch)
      .then(res => {
        const creatures: Array<CreatureTypes> = res.data;
        if (Array.isArray(creatures)) {
          this.setState({creatures});
        } else {
          this.setState({creatures: []});
        }
      })
      .catch(error => {
        console.log('Error', error.message);
      });
  };

  moveToInformation = (item: CreatureTypes) => {
    this.props.navigation.navigate('Information', {creature: item});
  };

  renderCreature = (item: CreatureTypes) => {
    console.log('check render item', item);
    return (
      <TouchableOpacity onPress={() => this.moveToInformation(item)}>
        <View style={styles.item}>
          <Image
            source={{
              uri: item.pictures[0],
            }}
            style={styles.imgItem}></Image>
          <Text style={styles.txtItem}>{item.commonName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = (item: CreatureTypes, index: number) => {
    return index.toString();
  };

  render() {
    const {textSearch, creatures} = this.state;
    return (
      <View style={StyleSheet.absoluteFillObject}>
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.ctSearch}>
              <TextInput
                placeholder="Input name of creature"
                style={styles.inputSearch}
                value={textSearch}
                onChangeText={textSearch =>
                  this.setState({textSearch})
                }></TextInput>
              <Button title="Search" onPress={this.search}></Button>
            </View>
            <FlatList
              style={styles.flatList}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              data={creatures}
              numColumns={2}
              renderItem={({item}) => this.renderCreature(item)}
              extraData={this.state}
              keyExtractor={this.keyExtractor}></FlatList>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imgItem: {
    width: 100,
    height: 100,
  },
  txtItem: {},
  flatList: {
    marginVertical: 24,
  },
  item: {
    width: 120,
    height: 120,
    // backgroundColor: 'blue',
    alignItems: 'center',
  },
  ctSearch: {flexDirection: 'row'},
  inputSearch: {
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 8,
  },
  container: {
    // backgroundColor: 'green',
    flex: 1,
  },
  scrollView: {
    // backgroundColor: 'pink',
    height: '100%',
    // backgroundColor: 'blue',
    marginHorizontal: Device.marginHorizontal,
    marginVertical: Device.marginVertical,
  },
});

export default Search;
