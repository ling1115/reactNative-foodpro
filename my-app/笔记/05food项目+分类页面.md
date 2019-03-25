完成分类页面 + 上拉加载效果(Flatlist)
1. category.js:
    1. 判断url: 如果有参数id则跳转/hotlist,没有则/category
        constructor(){
            super()
            this.state = {
                categoryList: []
            }
        }

        componentDidMount(){
            var host = 'http://192.168.24.100:3000/'
            var url = host + 'hotlist'
            if( this.props.navigation ){
                var id = this.props.navigation.state.params.id;
                url = host + 'category' + id;
            }
            fetch(url).then(res=>res.json()).then(res=>{
                this.setState({
                    categoryList: res.data.list
                })
            })
        }

    2. 使用长列表Flatlist渲染数据
        import {..., Flatlist } from 'react-native'
        render(){
            return (
                <View>
                    <FlatList 
                        keyExtractor={(item,index)=>item+inex}
                        data={ this.state.categoryList}
                        renderItem={({item}) => <View style={styles.categoryList}>
                                <Image source={{uri:item.imgUrl}} style={ [styels.img,{width:100,height:100}] } />
                                <View style={styles.info}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.desc}>{item.desc}</Text>
                                </View>
                            </View>}
                    />
                </View>
            )
        }

        const styles = StyleSheet.create({
            ...
            categoryList: {
                display: 'flex',
                flexDirection: 'row'
            },
            img: {
                marginBottom:10,
                marginLeft: 5,
            },
            info: {
                flex:1,
            }
            title: {
                fontSize: 16,
                marginBottom: 5,
                marginLeft:5
            }
            desc: {
                fontSize:12,
                marginLeft:5,
                flexWrap:'wrap'
            }
        })

    3. 上拉刷新：Flatlist中的onFresh属性(回调函数),需要设置refreshingh属性(Boolean值)
        在state中设置refreshing初始值：
            this.state = {
                ...
                refresh: false
            }
            componentDidMount(){
                // 需要重复请求数据，所以单独将请求数据的方法提出来
                this.getMore();
            }
            // 得到新数据
            getMore(){
                // 得到新数据时。refreshing值应该为true
                this.setState({
                    refresh : true
                })
                var host = 'http://192.168.24.100:3000/'
                var url = host + 'category'
                if( this.props.navigation ){
                    var id = this.props.navigation.state.params.id;
                    url = host + 'hotlist?id=' + id;
                }
                fetch(url).then(res=>res.json()).then(res=>{
                    this.setState({
                        // 叠加新数据和旧数据
                        categoryList: [...this.state.categoryList,...res.data.list],
                        // 请求数据 加载完之后，需要将refreshing值再改为初始值false
                        refresh: false
                    })
                })
            }
        <Flatlist
            onRefresh={()=>{ this.getMore() }}
            refreshing={this.state.refresh} // 为false时可以发送请求  为true正在刷新，不能发送请求
        >

2. 