import {AsyncStorage} from 'react-native'

var defaultState = {
    isNear: true
}

const reducer = (state=defaultState , action)=>{
    var newState = {...state}
    if( action.type === 'CHANGE_NEAR'){
        AsyncStorage.setItem('near',action.value.toString())
        newState.isNear = action.value
    }
    return newState
}

export default reducer
