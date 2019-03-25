import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    text: {
		position:'absolute',
		zIndex:10,
		height:40,
		lineHeight:40,
		marginLeft:40,
		borderRadius:8,
		backgroundColor:'#fff',
	},
    content: {
		flex:1,
		marginRight:10,
		marginTop:5
    },
    list: {
		display: 'flex',
		marginLeft:5,
		flexDirection: 'row',
		flexWrap: 'wrap',
    },
    img: {
      	marginLeft: 10
    },
    text1: {
      	textAlign: 'center'
    }
})
export default styles