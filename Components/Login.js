import React from 'react';
import { View, Text, TextInput, Dimensions, ScrollView, FlatList } from 'react-native'
import { SearchBar, Header, Divider, List, ListItem, Card, Input, Button } from 'react-native-elements'
import styles from '../themes/Style'
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/index'
import Constant from '../util/Constant'

/**
 * 登录页
 */
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      loading: false
    }
    this.login = this.login.bind(this)
    this._renderBorrowList = this._renderBorrowList.bind(this)
    this._renderInfo = this._renderInfo.bind(this)
  }
  login() {
    this.setState({
      loading: true
    })
    fetch(`${Constant.LIBPATH}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.json()).then(info => {
      this.props.setUser(info)
      this.setState({
        loading: false
      })
    }).catch(e => {
      console.log(e)
      this.setState({
        loading: false
      })
    })
  }
  _renderInfo({ index, item, sep }) {
    return (
      <View style={styles.infoItem}>
        <Text style={styles.infoStyle}>{item.name}</Text>
        <Text style={styles.infoContent}>{item.value.trim()}</Text>
      </View>
    )
  }
  _renderBorrowList({ index, item, sep }) {
    return (
      <View
        style={styles.borrowRow}
      // horizontal={true}>
      >
        {
          Object.values(item).map((v, i) => (<Text key={"rk" + index + i} style={styles.listTb}>{(v.val || '').trim()}</Text>))
        }
      </View>
    )
  }
  render() {
    let titles = ["条码号", "题名", "著者", "索书号", "馆藏地点", "文献类型", "借出时间", "应还时间"]
    let user = this.props.userInfo
    let height = Dimensions.get('window').height
    return (
      <View>
        <Header
          placement="left"
          outerContainerStyles={styles.headerStyle}
          // leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Login', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        {
          user ?
            <ScrollView style={{ overflow: 'scroll' }}>
              <ScrollView style={{ overflow: 'scroll' }}>
                <Card title="读者信息">
                  <FlatList
                    data={user.info}
                    keyExtractor={(item, index) => ("info" + index)}
                    renderItem={this._renderInfo}
                  >
                  </FlatList>
                </Card>
              </ScrollView>
              <ScrollView style={{ marginBottom: 80 }}>
                <Card title="已借书籍">
                  <ScrollView
                    horizontal={true}
                  >
                    {
                      titles.map((v, i) => (<View key={`row${i}`} style={{ display: 'flex', flexDirection: 'column', borderRightColor: '#ccc', borderRightWidth: 1, paddingLeft: 5, paddingRight: 5, padding: 5}}>
                      <Text style={{fontWeight: '700'}}>{v}</Text>
                      {
                          user.borrowData.map((row, ri) => (
                            <Text key={`col${i}${ri}`}>{Object.values(row)[i].val.trim()}</Text>
                          ))
                        }
                      </View>))
                    }

                  </ScrollView>
                </Card>
              </ScrollView>
            </ScrollView>
            :
            <View>
              <Card title="用户登录">
                <TextInput
                  value={this.state.username}
                  placeholder="Username"
                  underlineColorAndroid='transparent'
                  style={{ paddingLeft: 26, paddingRight: 30, marginTop: 28, marginBottom: 8, fontSize: 16, height: 40, borderRadius: 20, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ccc' }}
                  onChangeText={text => this.setState({ username: text })}
                ></TextInput>
                <TextInput
                  value={this.state.password}
                  placeholder="Password"
                  underlineColorAndroid='transparent'
                  style={{ paddingLeft: 26, marginTop: 8, marginBottom: 8, paddingRight: 30, fontSize: 16, height: 40, borderRadius: 20, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ccc' }}
                  onChangeText={text => this.setState({ password: text })}
                  secureTextEntry={true}
                ></TextInput>
                <Button
                  title="登录"
                  onPress={this.login}
                  titleStyle={{ color: '#fff',  fontSize: 16 }}
                  buttonStyle={{ marginTop: 50, backgroundColor: '#709ada', width: 200, height: 40 }}
                  loading={this.state.loading}
                ></Button>
              </Card>
            </View>
        }
      </View>
    )
  }
}

function mapStateToPros(state) {
  return {
    userInfo: state.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // getUser: dispatch(Actions.getUser()),
    setUser: _ => dispatch(Actions.setUser(_))
  }
}

export default connect(mapStateToPros, mapDispatchToProps)(Login)