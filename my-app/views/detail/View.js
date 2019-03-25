import React , {Component} from 'react'
import {View , Text} from 'react-native'

class Detail extends Component{
    render(){
        return (
            <View>
                <Text>详情页
                    {this.props.navigation.state.params.id}
                </Text>
            </View>
        )
    }
}

export default Detail