'use strict';
var React = require('react-native');

var About2 = require('./About2');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  AlertIOS,
  TouchableHighlight,
} = React;

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var Home = React.createClass({
  getInitialState: function () {
      return {
          dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
          loaded:false,
      };
  },
  componentDidMount: function () {
      this.fetchData();
  },
  fetchData:function(){
    fetch(REQUEST_URL).then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
        loaded:true,
      });
    }).done();
  },
  renderLoadingView:function(){
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },
  onSelected:function(movie){
    this.props.navigator.push({
      title: movie.title,
      component: About2,
      passProps: {
        data: movie
      }
    });
  },
  renderMovie:function(movie){
    return (
      <TouchableHighlight onPress={()=>this.onSelected(movie)}>
        <View style={styles.container}>
          <Image
            style={styles.thumbnail}
            source={{uri: movie.posters.thumbnail}} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
  render: function() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    return (
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie} />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView:{
    paddingTop:20,
    backgroundColor:'#F5FCFF',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
});

module.exports = Home;