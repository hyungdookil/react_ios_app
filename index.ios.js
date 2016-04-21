/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var ACCESS_TOKEN = '';
var API_URL = 'https://api.instagram.com/v1';
var PARAMS = '/users/self/media/recent/?access_token=' + ACCESS_TOKEN;
var INSTAGRAM_REQUEST_URL = API_URL + PARAMS;

class react_ios_app extends Component {

  constructor (props) {
    super(props);
    this.state = {
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2, }),
         loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(INSTAGRAM_REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />

    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading Photos ...
        </Text>
      </View>
    );
  }

  renderMovie(feed) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: feed.images.thumbnail.url}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{feed.caption.text}</Text>
          <Text style={styles.year}>{feed.caption.created_time}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 150,
    height: 150,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    fontSize: 13,
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('react_ios_app', () => react_ios_app);
