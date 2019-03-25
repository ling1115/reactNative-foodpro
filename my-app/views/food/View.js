import {connect} from 'react-redux';
import actionCreator from './actionCreator' 

import Ui from './ui'


function mapStateToProps(state){
	return {
		categories: state.food.categories
	}
}
function mapDispatchToProps(dispatch){
	return {
		getList(){
			dispatch(actionCreator.getList())
		}
	}
}

export default connect( mapStateToProps, mapDispatchToProps)(Ui);



