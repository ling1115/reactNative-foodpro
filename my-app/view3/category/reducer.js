var defaultState = {
    list: [],
    refresh: false
}

const reducer = ( state=defaultState , action)=>{
    if(action.type === 'GET_CATEGORY_LIST'){
        var newState = {
            // 这里叠加state.list和有actionCreator的action.list
            list: [...state.list , action.list],
            refresh: false
        }
        return newState
    }else if( action.type === "REFRESH"){
        var newState = {
            list: [...state.list],
            refresh: action.payload
        }
        return newState
    }
    return state
}

export default reducer