export default {
    getCategoryList(list , cover){
        return {
            type: 'GET_HOTLIST',
            list,
            cover
        }
    },
    getMore(value){
        return {
            type:'HOTLIST_REFRESH',
            value 
        }
    },
    getData(navigation , cover){
        return (dispatch)=>{
            var host = 'http://192.168.24.100:3000/'
            var url = host + 'hotlist'
            
            fetch(url).then(res=>res.json().then(res=>{
                dispatch(this.getCategoryList(res.data.list , cover))
            }))
        }
    }
}