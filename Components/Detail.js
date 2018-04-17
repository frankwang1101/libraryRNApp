import React from 'react';
import { View, Text, WebView, Dimensions, Button, TouchableOpacity } from 'react-native'
import styles from '../themes/Style'
import Constant from '../util/Constant'

var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');


export default class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookId: '',
            scalesPageToFit: true
        }
        this.back = this.back.bind(this)
    }

    componentDidMount() {
        let bookId = this.props.navigation.getParam('bookId', '')
        this.setState({
            bookId
        })
    }
    back() {
        this.props.navigation.navigate('Result')
    }
    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: 20
            }}>
                <View style={styles.headerBar}><TouchableOpacity><Text title="back" style={styles.headerBtn} onPress={this.back}>返回</Text></TouchableOpacity></View>
                <WebView
                    scalesPageToFit={true}
                    source={{ uri: `${Constant.BOOKPREFIX}/${this.state.bookId}`, method: 'GET' }}
                    style={{ width: deviceWidth, height: deviceHeight }}
                />
            </View>
        )
    }
}
