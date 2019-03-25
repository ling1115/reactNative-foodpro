import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
  },
  categoryList: {
      display: 'flex',
      flexDirection: 'row'
  },
  img: {
      marginBottom:10,
      marginLeft: 5,
      width:100,
      height:100
  },
  info: {
      flex:1,
      marginLeft:5
  },
  title: {
      fontSize: 16,
      marginLeft:5,
      marginBottom: 5
  },
  desc: {
      fontSize:12,
      marginLeft:5,
      flexWrap: 'wrap',
  }

});
export default styles