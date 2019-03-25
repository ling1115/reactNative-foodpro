3. 使用redux-thunk
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
4. category页面
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
            if( action.type === 'GET_LIST'){
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
            getData(navigation){
                return (dispatch)=>{
                    var host = 'http://192.168.24.100:3000/'
                    var url = host + 'hotlist'
                    if( navigation ){
                        var id = navigation.state.params.id
                        url = host +'category?id=' + id;
                        fetch(url).then(res=>res.json().then(res=>{
                            dispatch(this.getCategoryList(res.data.list))
                        }))
                    
                    }
                }
            }
        }
    6. category/Views.js: 将actionCreator.js/中的方法映射到Views.js中
        import actionCreator from './actionCreator'
        componentDidMount(){
            this.props.getData()
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
                getData(){
                    dispatch(actionCreator.getData(ownProps.navigate))
                }
            }
        }

        export default connect(mapStateToProps,mapDispatchToProps)(Category)

    7. category/View.js: 渲染数据 this.props.list[0]

food项目+分类redux
1. 修改：在category/reducer.js中 返回的newState改为
    {list:[...state.list,...action.list]}
    在View.js中就可以this.props.list  和this.props.refresh
2. 上节课遗留的两个问题：
    1. 热门分类和食品分类数据混合，相互影响：点击分类页面和主页当中的主食 或其他分类食品，渲染出的数据是一样的
    原因：
        两个页面的数据都是通过在redux中的同一个actionCreator.js获取
    解决：
        将两个页面的数据源分开
    2. 下拉刷新加载数据后，退出页面重新进入还是之前加载后的数据状态：但是退出这个在主页面中点击进去的分类页面后，在切换tab下的分类页面，会保留之前那个分类页面的所有数据，而不是重新加载，还是以前加载的数据
    原因：
        先设置了Flatlist的refreshing属性默认值为false,在第一次请求数据时，并不需要加载更多数据，请求数据并不知道是第一次请求还是刷新加载更多，首次加载数据时不需要设置refreshing属性
        而下拉刷新需要再次加载数据时，需要先设置refreshing为true才可以触发加载数据请求方法
    解决：
        所以需要把首次请求加载数据方法和请求加载更多数据方法分开

    3. 解决第二个问题：
        1. category/View.js:
            function mapDispatchToProps(dispatch,ownProps){
                return {
                    // 首次触发加载分类数据,在这里再传一个布尔值：true,表示首次加载需要覆盖之前加载的数据，false表示不覆盖
                    getInitData(){
                        dispatch(actionCreator.getData(ownProps.navigation,true))
                    },
                    // 再次加载更多：先设置refreshing=true,加载成功后设为false
                    getData(){
                        // 要修改值：需要触发getMore()方法
                        dispatch(actionCreator.getMore(true))
                        // 然后触发请求数据
                        dispatch(actionCreator.getData(ownProps.navigation , false))
                    }
                }
            }

        2. category/actionCreator.js:
            // 修改getCategoryList方法：接受覆盖的布尔值
            getCategoryList(list, cover){
                return {
                    type: 'GET_LIST',
                    list,
                    cover
                }
            },
            getData(navigation, cover){
                ...
                fetch(url).then(res=>res.json()).then(res=>{
                    dispatch(this.getCategoryList(res.data.list, cover))
                })
            }

        3. category/reducer.js:
            ...
            if(action.type === 'GET_CATEGORY_LIST'){
                if( action.cover ){  // 首次加载
                    var newSatet = {
                        list: [...action.list],
                        refresh: false
                    }
                }else{
                    newState = {
                        list: [...state.list, ...action.list],
                        refresh: false
                    }
                }
            }
    4. 解决第一个问题：
        新建一个hotlist文件夹,将category文件夹内容拷贝一份，将重复代码去掉
        1. store/reducer.js中引入hotlist/reducer.js
        import { hotlistReducer as hotlist } from '../views/hotlist'
        const reducer = {
            ...
            hotlist
        }
        2. hotlist/View.js: 修改取数据的模块名为hotlist
            mapStateToProps(state){
                return {
                    list: state.hotlist.list,
                    refresh: state.hotlist.refresh
                }
            }
        3. views/Home.js: 修改tab栏跳转的模块为hotlist
            import { Hotlist } from './hotlist'
            ...
            <TabNavigator.Item>
                ...
                <Hotlist />
            </TabNavigator.Item>
        4. hotlist/index.js: 导出hotlist模块
            import Hotlist from './View'

        5. App.js: 添加导入hotlist
            import { Hotlist } from './views/hotlist'
            ...
            hotlist: {screen: Hotlist}
        6. hotlist/actionCreator.js: hotlist就不需要判断是否传入id再复制url了，删掉那一个

        7. category/actionCreator.js: 统一不需要设置url初始值。直接是传入id的那个

        8. hotlist和category的actionCreator.js中 getCategoryList()中发出action的type不能相同
            hotlist/actionCreator.js: 修改type为 GET_HOTLIST  HOTLIST_REFRESH
            相应的reducer.js也要修改

        9. 将相同的样式 模块 分离出公共模块
            1. 新建views/common/styles.js,将样式剪切到这个文件中，再导出，在相应组件中引入
            2. 新建views/common/ui.js: 将相同ui模块剪切到这个文件，再导出，在相应组件中引入
            3. 分离之后，在hotlist和category做相应删除 导入操作

    5. views/home: Home模块采用redux管理数据：
        1. 新建views/home,将Home.js放入其中，改名为Views.js
            并且修改图片导入路径 ../../assetss/
            还有引入food和category的路径
        2. 新建indes.js,引入View.js 并导出
            import Home from './View.js'
            export {
                Home
            }
        3. App.js: 修改导入home的路径
            import {Home} from './views/home'

        4. 新建reducer.js: 
            var defaultState = {
                selectedTab : 'home'
            }
            const reducer = (state=defaultState , action)=>{
                var newState = {...state}
                if( action.type === 'CHANGE_PAGE'){
                    newState.selectedTab = action.page
                }
                return newState
            }
            export default reducer

        5. home/index.js: 引入reducer.js
            import HomeReducer from './reducer.js'
            export {Home, HomeReducer}
        
        6. store/reducer.js: 引入home中的reducer
            import { HomeReducer as home } from '../views/home'
            ...,home

        7. 新建actionCreator.js: 发送任务
            export default {
                changePageAction(page){
                    return {
                        type: 'CHANGE_PAGE',
                        page
                    }
                }
            }

        8. 在home/View.js中做映射：导入actionCreator.js
            import { connect } from 'react-redux'
            import actionCreator from './actionCreator.js'

            function mapStateToProps(state){
                return {
                    page: state.home.selectedTab
                }
            }
            function mapDispatchToProps(dispatch){
                return {
                    changePage(page){
                        dispatch(actionCreator.changePageAction(page))
                    }
                }
            }

            2. 修改TabNavigator.Item中的属性
                this.props.page === 'home'
                onPress={()=>{ this.props.changePage('home') }}

                this.props.page === 'profile'
                onPress={()=>{ this.props.changePage('profile') }}

            export default connect(mapStateToProps,mapDispatchToProps)(Home)

3. WebView 组件: 
    如果要更新数据，需要重新打包发布等等。才能看到结果。WebView相当于嵌入到应用中的小型浏览器，可以显示网页
    1. 新建views/map: 在这个文件夹中展示地图美食
    2. View.js: 
        import React , {Componnet} from 'react'
        import {WebView} from 'react-native'

        class Map extends Component{
            render(){
                return (
                    <WebView source={{uri:'http://www.baidu.com'}} style={width:100%,height:100%}>
                    </WebView>
                )
            }
        }
        export default Map

    3. index.js: 导入
        import Map from './View.js'
        export default {Map}

    4. 在home/View.js中: 引入map组件
        import { Map } from '../map'
        在复制一份美食tab的TabNavigator.Item

    5. Setting设置页面：步骤与map一样


        