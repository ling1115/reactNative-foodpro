export default {
    getCategoryList(list){
        return {
            type: 'GET_CATEGORY_LIST',
            list,
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