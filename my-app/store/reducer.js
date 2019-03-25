import {reducer as food} from "../views/food"
import {reducer as category} from '../views/category'
import {reducer as hotlist} from '../views/hotlist'
import {reducer as home} from '../views/home'
import {reducer as setting} from '../views/setting'
import {combineReducers} from 'redux'


var reducer = combineReducers({
	food,
	category,
	hotlist,
	home,
	setting
})

export default reducer;
