import React from 'react';
import { Text, View, Animated, TouchableOpacity, PanResponder } from 'react-native'
import m from 'moment'

export default class memoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            detail: false,
            hAni: new Animated.Value(0)
        }
        this.calTime = this.calTime.bind(this)
        this._toggle = this._toggle.bind(this)
        this.showDetail = this.showDetail.bind(this)
        this.hideDetail = this.hideDetail.bind(this)
    }
    componentWillMount() {
    }
    calTime(time) {
        // if(!time) return  ''
        let diff = time - Date.now()
        diff = diff / 1000 / 60
        let labal = ''
        if (diff < 60) {
            label = `${(diff).toFixed(0)}分`
        } else if (diff < 60 * 24) {
            label = `${(diff / 60).toFixed(0)}小时`
        } else {
            label = `${(diff / 60 / 24).toFixed(0)}天`
        }
        return {
            diff,
            label
        }
    }
    _toggle() {
        if (!this.state.detail) {
            this.showDetail()
        } else {
            this.hideDetail()
        }
    }
    hideDetail(isAct) {
        if (isAct) {
            Animated.timing(
                this.state.hAni,
                {
                    toValue: 0
                }
            ).start()
        } else {
            this.setState({
                detail: false,
            }, _ => this.hideDetail(true))
        }
    }
    showDetail(isAct) {
        if (isAct) {
            Animated.timing(
                this.state.hAni,
                {
                    toValue: 100
                }
            ).start()
        } else {
            this.setState({
                detail: true,
            }, _ => this.showDetail(true))
        }
    }
    render() {
        console.log('render,...')
        return (
            <TouchableOpacity
                onPress={this._toggle}
            >
                <View
                    style={{
                        backgroundColor: '#58a',
                        display: 'flex',
                        flexDirection: 'row',
                        height: 40,
                        marginBottom: 10,
                        alignItems: 'center',
                        paddingLeft: 10,
                        paddingRight: 10,
                    }}
                >
                    <Text style={{ fontSize: 18, color: '#fff', flex: 1 }}>{this.props.memo.title}</Text>
                    <Text style={{ fontSize: 18, width: 100, color: '#fff', borderLeftColor: '#fff', paddingLeft: 5, overflow: 'hidden', flexWrap: 'nowrap', textAlign: 'center' }} numberOfLines={1}>{this.calTime(this.props.memo.time).label}</Text>
                </View>
                <Animated.View
                    style={{
                        height: this.state.hAni
                    }}
                >
                    <Text>标题: {this.props.memo.title}</Text>
                    <Text>时间: {m(this.props.memo.time).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    <Text>{this.props.memo.desc}</Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }
}