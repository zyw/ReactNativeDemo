/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var About = require('./Pages/View/About');
var Home = require('./Pages/View/Home');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
} = React;

var ReactNativeDemo = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.'
  },

  getInitialState: function() {
    return {
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,
    };
  },

  _renderContent: function(color: string, pageText: string) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{this.state.presses} re-renders of the More tab</Text>
      </View>
    );
  },

  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          style={styles.tabBg}
          title="Blue Tab"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>

          <NavigatorIOS
           style={styles.container}
            tintColor={'#333344'}
            initialRoute={{
              title: 'About',
              component: About,
            }} />
          
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="history"
          style={styles.tabBg}
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          <NavigatorIOS
           style={styles.container}
            tintColor={'#333344'}
            initialRoute={{
              title: 'Home',
              component: Home,
            }} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          style={styles.tabBg}
          systemIcon="more"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContent('#21551C', 'Green Tab')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7EAEC'
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  tabBg:{
    backgroundColor:'#FF0000',
    borderTopColor:'#FF0000',
  },
});

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);
