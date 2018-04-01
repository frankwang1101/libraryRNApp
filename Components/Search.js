import React from 'react';
import { View, Text, TextInput, Button, FlatList, Dimensions, ListView } from 'react-native'
import { SearchBar, Header, Divider, List, ListItem, Card, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from '../themes/Style'
import * as Actions from '../redux/actions/index'

class Search extends React.Component {
    static navigationOptions = {
        title: 'Search'
    }
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            page: 1,
            history: []
        }
        this.search = this.search.bind(this)
    }
    search(text) {
        let query = this.state.text || text
        if(this.text){
            this.setState({
                text
            })
        }
        this.props.addHistory(query)
        this.props.navigation.navigate('Result', {
            query
        })
    }
    render() {
        var { height, width } = Dimensions.get('window');
        return (
            <View style={styles.container}>
                <Header
                    placement="left"
                    outerContainerStyles={styles.headerStyle}
                    // leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Search', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <SearchBar
                    inputStyle={{ width: width - 20 }}
                    lightTheme={true}
                    clearIcon={{ color: '#86939e', name: 'close' }}
                    containerStyle={{ backgroundColor: 'transparent', borderTopWidth: 0, borderBottomWidth: 0 }}
                    returnKeyType={'search'}
                    blurOnSubmit={true}
                    onSubmitEditing={this.search}
                    placeholder="请输入搜索内容" onChangeText={text => this.setState({ text })} value={this.state.text}></SearchBar>

        
                <Divider style={{ backgroundColor: 'blue' }} />
                <Text style={{ height: 30, borderBottomColor: '#86939e', borderBottomWidth: 1, width, textAlign: 'center', marginTop: 20 }}>历史搜索</Text>
                <List>
                    {
                            <FlatList
                                keyExtractor={(item, index) => String(index)}
                                renderItem={({item, index}) => (
                                    <ListItem
                                        key={index}
                                        title={item}
                                        containerStyle={{ width, borderBottomColor: '#ccc' }}
                                        onPress={_ => this.search(item)}
                                        leftIcon={{ name: 'search' }}
                                    />
                                )}
                                data={this.props.history}
                            >
                            </FlatList>

                    }
                </List>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        history: state.history
    }
}

function mapDisptachToProps(dispatch) {
    return {
        addHistory: _ => dispatch(Actions.addHistory(_))
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(Search)
