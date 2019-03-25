var defaultState = {
    categories: []
}
const reducer = ( state=defaultState , action)=>{
    var newState = {...state}
    if(action.type === 'GET_CATEGORY'){
        newState.categories = [...action.list]
    }
    return newState
}

export default reducer