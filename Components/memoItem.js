import React from 'react';
import { Text, View, Animated, TouchableOpacity, PanResponder, Dimensions } from 'react-native'
import m from 'moment'
import styles from '../themes/Style'

export default class memoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            detail: false,
            hAni: new Animated.Value(0)
        }
        this._moveX = new Animated.Value(0)
        this._threshold = 2
        this.startMove = false
        this.initX = null
        this.hideWidth = 100

        this.calTime = this.calTime.bind(this)
        this._toggle = this._toggle.bind(this)
        this.showDetail = this.showDetail.bind(this)
        this.hideDetail = this.hideDetail.bind(this)
        this.handleOnMoveShouldSetPanResponder = this.handleOnMoveShouldSetPanResponder.bind(this)
        this.handlePanResponderMove = this.handlePanResponderMove.bind(this)
        this.handlePanResponderEnd = this.handlePanResponderEnd.bind(this)
        this.animateFix = this.animateFix.bind(this)
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (e, gs) => this.handleOnMoveShouldSetPanResponder(e, gs),
            onPanResponderMove: (e, gs) => this.handlePanResponderMove(e, gs),
            onPanResponderRelease: (e, gs) => this.handlePanResponderEnd(e, gs),
            onPanResponderTerminate: (e, gs) => this.handlePanResponderEnd(e, gs),
            onShouldBlockNativeResponder: _ => false,
        });
    }
    handleOnMoveShouldSetPanResponder(e, gs) {
        const { dx } = gs
        console.log('should.,,')
        return Math.abs(dx) > this._threshold
    }
    handlePanResponderMove(e, gs) {
        console.log('move.,,')
        const { dx, dy } = gs
        const absDx = Math.abs(dx)
        const absDy = Math.abs(dy)

        if (absDx < absDy && !this.startMove) {
            return;
        }

        if (this.initX === null) {
            this.initX = this._moveX._value
        }

        if (!this.startMove) {
            this.startMove = true
        }

        let newX = this.initX + dx

        if (newX < -(this.hideWidth + 20)) {
            newX = -(this.hideWidth + 20)
        } else if (newX > (this.hideWidth + 20)) {
            newX = (this.hideWidth + 20)
        }

        this._moveX.setValue(newX)
    }
    handlePanResponderEnd(e, gs) {
        let toValue = 0
        if (this._moveX._value < 0) {
            if (this._moveX._value < -(this.hideWidth / 2)) {
                toValue = -this.hideWidth
            } else {
                toValue = 0
            }
        } else {
            toValue = 0
        }
        // setTimeout(_ => {

        this.animateFix(toValue)
        // }
        // , 200)
        console.log('end..')
        this.startMove = false
    }
    animateFix(toValue) {
        setTimeout(_ => {
            console.log('animate');
            Animated.timing(
                this._moveX,
                {
                    toValue
                }
            ).start(_ => {
                this.initX = toValue
            })
        })

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
        let width = Dimensions.get('window').width
        return (
            <View
                // onPress={this._toggle}
                {...this._panResponder.panHandlers}
                style={{
                    width: width - 60 + this.hideWidth
                }}
            >
                <Animated.View
                    style={{
                        backgroundColor: '#58a',
                        display: 'flex',
                        flexDirection: 'row',
                        height: 40,
                        marginBottom: 10,
                        alignItems: 'center',
                        paddingLeft: 10,
                        // paddingRight: 10,
                        transform: [
                            { translateX: this._moveX }
                        ]
                    }}
                >
                    <TouchableOpacity onPress={this._toggle} style={{ width: width - 170, display: 'flex', alignItems: 'center', flexDirection: 'row' }}><Text style={{ fontSize: 18, color: '#fff', width: width - 100 }}>{this.props.memo.title}</Text></TouchableOpacity>
                    <Text style={{ fontSize: 18, width: 100, color: '#fff', borderLeftColor: '#fff', paddingLeft: 5, overflow: 'hidden', flexWrap: 'nowrap', textAlign: 'center' }} numberOfLines={1}>{this.calTime(this.props.memo.time).label}</Text>
                    <View
                     style={{
                         width: this.hideWidth,
                         display: 'flex',
                         flexDirection: 'row',
                         alignItems: 'center',
                         justifyContent: 'space-around'
                     }}
                    >
                     <TouchableOpacity style={{ height: 40, backgroundColor: 'yellow', alignSelf: 'center'}} onPress={this.props.update}><Text style={styles.ctrlBtn}>修改</Text></TouchableOpacity>
                     <TouchableOpacity style={{ height: 40, backgroundColor: 'red'}} onPress={this.props.del}><Text style={styles.ctrlBtn}>删除</Text></TouchableOpacity>
                    </View>
                </Animated.View>
                <Animated.View
                    style={{
                        height: this.state.hAni
                    }}
                >
                    <Text>标题: {this.props.memo.title}</Text>
                    <Text>时间: {m(this.props.memo.time).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    <Text>{this.props.memo.desc}</Text>
                </Animated.View>
            </View>
        )
    }
}