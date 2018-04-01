import {
    StyleSheet, Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80,
    },
    viewImg: {
        width: 80,
        height: 80,
        margin: 2
    },
    viewInfo: {
        flex: 1,
        margin: 2,
    },
    tabIcon: {
        width: 20,
        height: 20
    },
    infoItem: {
        height: 30,
        display: 'flex',
        flexDirection: 'row',
    },
    infoStyle:{
        width: 140,
    },
    infoContent:{
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        flex: 1,
        color: 'red'
    },
    listTb:{
      
        flex: 1,
        padding: 2,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
        height: 30
    },
    borrowRow: {
        display: 'flex',
        flexDirection: 'row',
        height: 30,
        flexWrap: 'nowrap'
    },
    webView: {
        height: 350,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.8)'
    },
    headerBtn: {
        width: 50,
        color: '#58a'
    },
    headerBar: {
        height: 40,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    headerStyle: {
        width: width
    },
    ctrlBtn:{
        height: 40,
        width: 50,
        lineHeight: 40,
        fontSize: 16,
        textAlign: 'center'
    }
});