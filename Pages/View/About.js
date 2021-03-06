'use strict';
var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

var About = React.createClass({
	render: function() {
	    var movie = MOCKED_MOVIES_DATA[0];
	    return (
	      <View style={styles.container}>
	        <Text>{movie.title}</Text>
	        <Text>{movie.year}</Text>
	        <Image
	          source={{uri: movie.posters.thumbnail}}
	          style={styles.thumbnail}/>
	      </View>
	    );
	  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
});

module.exports = About;