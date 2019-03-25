var defaultState = {
    selectedTab: 'home'
}

var reducer = (state=defaultState , action)=>{
    var newState = {...state}
    if( action.type === 'CHANGE_PAGE'){
        newState.selectedTab = action.page
    }
    return newState
}

export default reducer