import React from 'react';
import ListItem_ from './ListItem'
import { Text, TextInput, View, FlatList, Dimensions, DatePickerAndroid, TimePickerAndroid, ScrollView } from 'react-native'
import { SearchBar, Header, Divider, List, ListItem, Card, Icon, Overlay, Input, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { setMemoList, getMemoList } from '../redux/actions/index'
import styles from '../themes/Style'
import MemoItem from './memoItem'
// import MemoItem from './MemoItem_comp'
import { SwipeListView } from 'react-native-swipe-list-view';
import m from 'moment'

class Memo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addData: {
                date: '',
                time: '',
                title: '',
                desc: '',
                timeError: false,
                dateError: false,
                titleError: false,
            },
            isVisible: false,
        }
        this._addOpen = this._addOpen.bind(this)
        this.openDate = this.openDate.bind(this)
        this.openTime = this.openTime.bind(this)
        this._init = this._init.bind(this)
        this._load = this._load.bind(this)
        this.addSubmit = this.addSubmit.bind(this)
        this.back = this.back.bind(this)
        this.checkValid = this.checkValid.bind(this)
        this.itemDel = this.itemDel.bind(this)
        this.itemUpdate = this.itemUpdate.bind(this)

    }
    componentWillMount() {

    }
    componentDidMount() {
        this._init()
    }
    async _init() {
        let memos = await this._load()
        this.props.setMemos(memos)
        console.log('ok')
    }
    async openDate() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                mode: 'spinner'
            })
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({
                    addData: Object.assign({}, this.state.addData, {
                        date: `${year}-${month + 1}-${day}`,
                        dateError: false
                    })
                })
            }
        } catch (e) {
            alert(e)
        }
    }
    async openTime() {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 0,
                minute: 0,
                is24Hour: true,
            })
            if (action !== TimePickerAndroid.dismissedAction) {
                this.setState({
                    addData: Object.assign({}, this.state.addData, {
                        time: `${hour}:${minute}`,
                        timeError: false,
                    })
                })
            }
        } catch (e) {
            alert(e)
        }
    }
    _addOpen() {
        this.setState({
            isVisible: true
        })
    }
    async _load() {
        return await global.storage.load({ key: 'memoData', id: '1101' })
    }
    checkValid() {
        let flag = true
        let data = this.state.addData
        let check = ['time', 'date', 'title']
        let change = {} //用于存放校验失败的key
        check.forEach(v => {
            if (!data[v]) {
                flag = false
                change[v + 'Error'] = true
            }
        })
        if (!flag) {
            flag = false;
            this.setState({
                addData: Object.assign(data, change)
            })
        }
        return flag
    }
    addSubmit() {
        if (this.checkValid()) {
            let data = this.state.addData
            const item = {
                title: data.title,
                time: m(data.date + ' ' + data.time, 'YYYY-M-D H:m').valueOf(),
                id: this.props.memos.length + 1 + Math.random(32)
            }
            let dataList = this.props.memos.slice()
            dataList.push(item)
            this.saveMemoList(dataList)
            this.back()
        }
    }
    saveMemoList(dataList) {
        try {
            global.storage.save({
                key: 'memoData',
                id: '1101',
                data: dataList
            }).then(res => {
                console.log(res)
            }).catch(e => {
                console.error(e)
            })
            this.props.setMemos(dataList)
        } catch (e) {
            alert(e)
        }
    }
    back() {
        this.setState({
            isVisible: false
        })

    }
    itemDel(id) {
        let idx = this.props.memos.findIndex(item => item.id === id)
        if (!~idx) {
            idx = id
        }
        let newData = this.props.memos.slice()
        newData.splice(idx, 1)
        this.saveMemoList(newData)
    }
    itemUpdate(id) {
        let item = this.props.memos.find(item => item.id === id)
        if (!item) {
            item = this.props.memos[id]
        }
        this.setState({
            addData: {
                date: m(item.time).format('YYYY-M-D'),
                time: m(item.time).format('H:m'),
                title: item.title,
                desc: item.desc,
                timeError: false,
                dateError: false,
                titleError: false,
            }
        }, this._addOpen)
    }
    render() {
        var { height, width } = Dimensions.get('window');
        let memos = this.props ? (this.props.memos || []) : []
        let k = <ScrollView>
            {
                memos.map((memo, memoIdx) => {
                    return (
                        <MemoItem memo={memo} del={_ => this.itemDel(memo.id || memoIdx)} update={_ => this.itemUpdate(memo.id || memoIdx)} key={memo.id || memoIdx}></MemoItem>
                    )
                })
            }
        </ScrollView>
        let card = this.state.isVisible ? null :
            <Card title="当前备忘">
                {k}
            </Card>
        return (
            <View>
                <Header
                    placement="left"
                    outerContainerStyles={styles.headerStyle}
                    // leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Memo', style: { color: '#fff' } }}
                    rightComponent={<Icon name="library-plus" color="#fff" type="material-community" onPress={this._addOpen} />}
                />
                {
                    card
                }
                <Overlay
                    isVisible={this.state.isVisible}
                    windowBackgroundColor="rgba(94,97,99,0.3)"
                    fullScreen={false}

                >
                    <Input
                        placeholder="Enter Title"
                        value={this.state.addData.title}
                        displayError={this.state.addData.titleError}
                        errorMessage={'Please enter something'}
                        onChangeText={title => this.setState({ addData: Object.assign(this.state.addData, { title, titleError: false }) })}></Input>
                    <Text
                        style={{
                            height: 40,
                            paddingLeft: 10,
                            fontSize: 18,
                            borderBottomColor: 'rgba(171, 189,219,1)',
                            borderBottomWidth: 1,
                        }}
                    >
                        <Text placeholder="Pick a Date"
                            style={{
                                marginLeft: 10,
                                height: 40,
                                alignSelf: 'center',
                                fontSize: 18,
                                lineHeight: 40,
                                borderBottomColor: 'rgba(171, 189,219,1)',
                                borderBottomWidth: 1,
                                fontWeight: '400',
                                color: this.state.addData.date ? '#000' : '#ccc'
                            }}
                            onPress={this.openDate}>{this.state.addData.date || 'Pick a Date'}</Text>
                    </Text>
                    {
                        this.state.addData.dateError ?
                            <Text style={{
                                fontSize: 12,
                                margin: 5,
                                color: '#FF2D00',
                                height: 16,
                            }}>Please pick a Date</Text>
                            : null
                    }
                    <Text
                        style={{
                            height: 40,
                            paddingLeft: 10,
                            fontSize: 18,
                            borderBottomColor: 'rgba(171, 189,219,1)',
                            borderBottomWidth: 1
                        }}
                    >
                        <Text placeholder="Pick a Time"
                            style={{
                                marginLeft: 10,
                                height: 40,
                                alignSelf: 'center',
                                fontSize: 18,
                                lineHeight: 40,
                                borderBottomColor: 'rgba(171, 189,219,1)',
                                borderBottomWidth: 1,
                                fontWeight: '400',
                                color: this.state.addData.time ? '#000' : '#ccc'
                            }}
                            onPress={this.openTime}>{this.state.addData.time || 'Pick a Time'}</Text>
                    </Text>
                    {this.state.addData.timeError ? <Text style={{
                        fontSize: 12,
                        margin: 5,
                        color: '#FF2D00',
                        height: 16
                    }}>Please pick a Time</Text> : null}
                    <Input
                        multiline={true}
                        placeholder="Enter ur desc"
                        value={this.state.addData.desc}
                        numberOfLines={10}
                        inputStyle={{
                            textAlignVertical: 'top',
                            height: 200
                        }}
                        containerStyle={{
                            height: 200
                        }}
                        onChangeText={desc => this.setState({ addData: Object.assign(this.state.addData, { desc }) })}

                    ></Input>
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: 10,
                            flexDirection: 'row'
                        }}
                    >
                        <Button
                            title="submit"
                            onPress={this.addSubmit}
                            buttonStyle={{
                                backgroundColor: '#5679ee',
                            }}></Button>
                        <Button
                            title="back"
                            onPress={this.back}
                            buttonStyle={{
                                backgroundColor: '#58a',
                                marginLeft: 10
                            }}></Button>
                    </View>
                </Overlay>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        memos: state.memos
    }
}

const mapDispatchToProps = dispatch => ({
    setMemos: _ => dispatch(setMemoList(_)),
    getMemos: dispatch(getMemoList())
})

export default connect(mapStateToProps, mapDispatchToProps)(Memo)