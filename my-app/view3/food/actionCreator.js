
const actionCreator = {
    getCategories(list){
        return {
            type: 'GET_CATEGORY',
            list
        }
    },
    getList(){
        return (dispatch)=>{
            var url = 'http://192.168.24.100:3000/food'
            fetch(url).then((res)=>res.json()).then(res=>{
                dispatch(this.getCategories(res.data.categories))
            })
        }
    }
    
}

export default actionCreator