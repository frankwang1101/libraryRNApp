import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation'
import Detail from './Components/Detail'
import Result from './Components/Result'
import Search from './Components/Search'
import Login from './Components/Login'
import Memo from './Components/Memo'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import reducer from './redux/reducers/common'
import { Text, View, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import styles from './themes/Style'
import './Components/Storage'

const store = createStore(reducer)

const tabConfig = {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarOptions: {
    showIcon: true,
    inactiveTintColor: '#000',
    inactiveBackgroundColor: '#000',
    activeTintColor: '#000',
    activeBackgroundColor: '#000',
    showLabel: false,
    style: {
      backgroundColor: 'white',
    },
    // hideIndex: [4]
  },
  hiddenTabs: ['Detail']
}

class Ic extends React.Component {
  render() {
    return (
      <View>
        <Text>1122</Text>
      </View>
    )
  }
}

const App = new TabNavigator({
  Search: {
    screen: Search, navigationOptions: {
      tabBarIcon: () => <Image style={styles.tabIcon} source={require('./themes/icon/search.png')} />,
      tabBarLabel: '',
    }
  },
  Result: { screen: Result, navigationOptions: { tabBarIcon: () => <Image style={styles.tabIcon} source={require('./themes/icon/list.png')} />, } },
  Login: { screen: Login, navigationOptions: { tabBarIcon: () => <Image style={styles.tabIcon} source={require('./themes/icon/account.png')} />, tabBarLabel: '' } },
  Memo: { screen: Memo, navigationOptions: { tabBarIcon: () => <Icon name="ios-checkbox-outline" md="md-checkbox-outline" type="ionicon" />, tabBarLabel: '' } },
  Detail: { screen: Detail },
}, tabConfig)

const main = () => (<Provider store={store}><App /></Provider>)
console.ignoredYellowBox = ['Remote debugger', 'Debugger and device', 'Failed Child'];
export default main