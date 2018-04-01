import React from 'react';
import { Text, Image, TouchableOpacity, View} from 'react-native'
import styles from '../themes/Style'

export default class ListItem extends React.PureComponent {
    constructor(props){
      super(props)
      this.itemPress = this.itemPress.bind(this)
    }
    itemPress(id) {
      this.props.trigger(id)
    }
    render() {
      return (
        <TouchableOpacity style={styles.card}
          onPress={() => this.itemPress(this.props.data.id)}
        >
          <Image source={{
            uri: this.props.data.src
          }}
          style={styles.viewImg}
          ></Image>
          <View
            style={styles.viewInfo}
          >
            <Text>{this.props.data.title}</Text>
            <Text>{this.props.data.author}</Text>
            <Text>{this.props.data.publish}</Text>
            <Text>{this.props.data.type}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }