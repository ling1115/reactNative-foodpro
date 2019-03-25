var defaultState = {
    list: [],
    refresh: false
}

const reducer = ( state=defaultState , action)=>{
    if(action.type === 'GET_CATEGORY_LIST'){
        if( action.cover ){ // 首次加载
            var newState = {
                list: [...action.list],
                refresh: false
            }
        }else{
            var newState = {
                // 这里叠加state.list和有actionCreator的action.list
                list: [...state.list , ...action.list],
                refresh: false
            }
        }
        
        return newState
    }else if( action.type === "REFRESH"){
        var newState = {
            list: [...state.list],
            refresh: action.value
        }
        return newState
    }
    return state
}

export default reducer