redux改写首页和分类页面
server: npm start
react-native: yarn start
1. 将Food.js的actionCreator.js  reducer.js  state.js 统一放在views/food文件夹中，
    Food.js也放在这个文件中，改名为View.js,新建index.js转为到处food文件夹中的文件
    然后修改文件引用路径
    views/food/index.js:
        import Food from './View.js'

        export default { Food }
2. 新建views/food/reducer.js: 将food/View.js中需要的数据映射过来
    1. reducer.js: reducer函数有两个参数：上一次的state和action(任务)
        var defaultState = {
            categories: []
        }
        var reducer = ( state=defaultState , action)=>{
            var newState = [...state.categories]
            return newState
        }
        export default reducer
    
    2. food/index.js: 导出reducer
        ...
        import reducer from './reducer.js'
        export default {
            Food,
            reducer
        }
    3. store文件夹中新建一个总reducer: 
        store/reducer.js:
            import { combineReducers } from 'redux'
            import { reducer as food } from '../views/food/index'

            var reducer = combineReducers({
                food
            })

            export default reducer

    4. views/food/actionCreator.js:
        1. const actionCreator = {
            getCategories(list){
                return {
                    type: 'GET_CATEGORIES',
                    payload: list
                }
            }
        }

        export default actionCreator

        2. 在views/food/reducer.js中判断派发任务:
            var reducer = ( state=defaultState , action)=>{
                var newState = {...state}
                if( action.type === 'GET_CATEGORIES' ){
                    newState.categories = [...action.payload]
                }
                return newState
            }


    5. views/food/View.js
        ...
        import actionCreator from './actionCreator'
        // 映射方法：容器组件
        function mapStateToProps(state){
            return {
                categories: state.food.categories
            }
        }
        function mapDispatchToProps(dispatch){
            // 派发任务之前要先导入actionCreator
            return{
                getCategories(list){
                    dispatch( actionCreator.getCategories(list) )
                }
            }
        }
        // 然后在getFoodList()中调用getCategories()
            ...
            this.props.getCategories(res.data.categories)

        export default connect(mapStateToProps,mapDispatchToProps)(Food)

import { bindActionCreator } from 'redux'
bindActionCreator可以将actionCreator的派发的任务都请求过来

总结：
    1. 首先是componentDidMount()中调用getFoodList(),在getFoddList()中fetch数据，
        然后调用this.props.getCategories(res.data.categories)方法派发任务,getCategories在mapDispacthToProps中定义
    2. mapDispacthToProp中的getCategories()派发任务触发 actionCreator中的getCategories方法

3. 拆分css
    在views/food/styles.js中 将Views.js中的styles独立一个文件
    import { StyleSheet } from 'react-native'
    const styles = StyleSheet.create({
        ...
    })
    export default styles
    views/food/Views.js中引入：import styles from './styles.js'

4. 拆分UI组件和容器组件
    1. views/food/ui.js:
        import ... render(){}全部复制  部分import的组件不用
        export default Food

    2. views/food/Views.js:
        import UI from './ui'
        export default connect()(UI)

总结：关于Food首页页面的所有state、actionCreator、reducer、styles、ui都单独放在food文件夹中
    然后View.js作为总显示页面文件。相应的state和reducer都需要在store/reducer文件夹下引入

5. 中间件：redux-thunk: yarn add redux-thunk
    1. store/store.js中引用applyMiddleware中间件，
        再引入redux-thunk,需要用applyMiddleware包裹中间件
        import {createStore , applyMiddleware } from 'redux'
        import thunk from 'redux-thunk'

        var store = createStore( reducer , applyMiddleWare(thunk))
        在这就可以发送请求，不用在ui.js中，所以将ui.js中的getFoodList()提取到actionCreator.js中
    2. food/actionCreator.js:
        ...
        getList(){
            return (dispatch)=>{
                var url = 'http://192.168.24.100:3000/food'
                fetch(url).then(res=>res.json()).then(res=>{
                    dispatch(this.getCategories(res.data.categories))
                })
            }
        }
    3. food/Views.js: 将actionCreatorgetList()映射到food/Views.js的mapDisPatchToProps()中
        getCategories改为getList()
        import actionCreator from './actionCreator'
        function mapDisPatchToProps(dispatch){
            return {
                getList(){
                    dispatch(actionCreator.getList())
                }
            }
        }
    4. food/ui.js: 在ui.js中componentDidMount()调用getList(),不需要getFoodList()
        componentDidMount(){
            this.props.getList()
        }
6. category页面
    1. 新建文件夹：views/category/, category.js改名为View.js, 
        新建index.js,导入Views/category/的所有文件
        category/index.js: 
            import Category from './View.js'

            export {
                Category
            }
    2. category/reducer.js: 新建
        var defaultState = {
            list: [],
            refresh: false
        }
        const reducer = (state=defaultSatet,action){
            if( action.type === 'GET_CATEGORY_LIST'){
                let newSatte = {
                    list:[...state.list, action.payload]
                    refresh: false
                }
                return newState
            }esle if( action.type === 'REFRESH'){
                let newState = {
                    list: [...state.list],
                    refresh: action.payload
                }
                return newState
            }
            return state
        }
        export default reducer

    3. category/index.js中导入reducer.js
        import reducer from './reducer.js'
        export {
            Category,
            reducer
        }
    4. store/reducer.js中引入views/category/index.js
        import { reducer as category} from '../views/category'

        var reducer = combineReducers({
            food,
            category
        })
    5. category/actionCreator.js: 将category/View.js中的getMore()中请求代码复制带这里
        export default {
            getCategoryList(list){
                return {
                    type: 'GET_CATEGORY_LIST',
                    payload: list,
                }
            },
            getMore(value){
                return {
                    type:'REFRESH',
                    refresh: value 
                }
            },
            getDate(navigation){
                return (dispatch)=>{
                    var host = 'http://192.168.24.100:3000/'
                    var url = host + 'hotlist'
                    if( navigation ){
                        var id = navigation.state.params.id
                        url = host +'category?id=' + id;
                    }
                    fetch(url).then(res=>res.json().then(res=>{
                            dispatch(this.getCategoryList(res.data.list))
                    }))
                }
            }
        }
    6. category/Views.js: 将actionCreator.js/中的方法映射到Views.js中
        import actionCreator from './actionCreator'
        componentDidMount(){
            this.props.getDate()
        }
        ....
        function mapStateToProps(state){
            return {
                list: state.category.list,
                refresh: state.category.refresh
            }
            
        }
        function mapDispatchToProps(dispatch,ownProps){
            return {
                getDate(){
                    dispatch(actionCreator.getDate(ownProps.navigate))
                }
            }
        }

        export default connect(mapStateToProps,mapDispatchToProps)(Category)

    7. category/View.js: 渲染数据 this.props.list[0]