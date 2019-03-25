import React, { Component } from 'react';
import { View, Text , StyleSheet , 
        Dimensions ,Image , TextInput , ScrollView} from 'react-native';

class Category extends Component {
  
  render() {
    
    return (
		<View style={styles.container}>
			<View>
                <Text>分类页面</Text>
            </View>

		</View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 30,
    }
})

export default Category;
