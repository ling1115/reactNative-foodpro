export default {
    getCategoryList(list , cover){
        return {
            type: 'GET_CATEGORY_LIST',
            list,
            cover
        }
    },
    getMore(value){
        return {
            type:'REFRESH',
            value 
        }
    },
    getData(navigation , cover){
        return (dispatch)=>{
            var host = 'http://192.168.24.100:3000/'
            var id = navigation.state.params.id
            var url = host +'category?id=' + id;
            fetch(url).then(res=>res.json().then(res=>{
                dispatch(this.getCategoryList(res.data.list , cover))
            }))
        }
    }
}