import React from 'react';
import ListItem_ from './ListItem'
import { Text, TextInput, Button, View, FlatList, Dimensions } from 'react-native'
import { SearchBar, Header, Divider, List, ListItem, Card } from 'react-native-elements'
import styles from '../themes/Style'
import Constant from '../util/Constant'

export default class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            text: '',
            page: 1,
            size: 10,
            pro: '',
            refreshing: false,
        }
        this.search = this.search.bind(this)
        this._refresh = this._refresh.bind(this)
        this._endReach = this._endReach.bind(this)
        this.detail = this.detail.bind(this)
        this._renderItem = this._renderItem.bind(this)
    }
    componentDidUpdate() {
        let text = this.props.navigation.getParam('query', '')
        if(text && this.state.text !== text){
            this.setState({ text, refreshing: true }, _ => this.search(true))
        }
    }
    search(refresh) {
        this.setState({ refreshing: true})
        fetch(`${Constant.LIBPATH}/search?name=${this.state.text}&page=${this.state.page}&size=${this.state.size}`).then(res => res.json()).then(res => {
            this.setState({
                list: (refresh?[]:this.state.list).concat(res || []),
                prop: res.length,
                refreshing: false
            })
        }).catch(e => {
            console.error(e)
            this.setState({
                list: [],
                refreshing: false,
                prop: 0,
            })
        })
    }
    _refresh() {
        this.setState({
            page: 1,
            size: 10
        }, _ => this.search(true))
        return true
    }
    _endReach() {
        this.setState({
            page: this.state.page + 1
        }, this.search)

    }
    _renderItem({ index, item, sep }) {
        return (<ListItem
            avatar={{
                uri: item.src
            }}
            avatarStyle={styles.viewImg}
            avatarContainerStyle={styles.viewImg}
            onPress={_ => this.detail(item.id)}
            title={item.title}
            subtitle={(
                <View
                    style={styles.viewInfo}
                >
                    <Text>{item.author}</Text>
                    <Text>{item.publish}</Text>
                    <Text>{item.type}</Text>
                </View>
            )}
        ></ListItem>)
    }
    detail(id) {
        this.props.navigation.navigate('Detail', { bookId: id })
    }
    render() {
        var { height, width } = Dimensions.get('window');
        return (
            <View>
                <Header
                    placement="left"
                    outerContainerStyles={styles.headerStyle}
                    // leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Result', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <SearchBar
                    inputStyle={{ width: width - 20 }}
                    lightTheme={true}
                    clearIcon={{ color: '#86939e', name: 'close' }}
                    containerStyle={{ backgroundColor: 'transparent', borderTopWidth: 0, borderBottomWidth: 0 }}
                    returnKeyType={'search'}
                    blurOnSubmit={true}
                    onSubmitEditing={_ => this.search(true)}
                    placeholder="请输入搜索内容" onChangeText={text => this.setState({ text })} value={this.state.text}></SearchBar>
                <List>
                    <FlatList
                        data={this.state.list}
                        renderItem={this._renderItem}
                        keyExtractor={(item, i) => 'result' + (item.isbn || i) + i}
                        refreshing={this.state.refreshing}
                        onRefresh={this._refresh}
                        onEndReached={this._endReach}
                    // getItemLayout={(data, index) => ({ length: 40, offset: (40 + 1) * index + 50, index })}
                    />
                </List>
            </View>
        )
    }
}