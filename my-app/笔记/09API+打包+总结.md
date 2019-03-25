常用API+组件  food项目打包   
1. 常用API
    1. BackHandler: 点击手机返回键 触发函数
        componentDidMount() {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        }

        componentWillUnmount() {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        }

        handleBackPress = () => {
            this.goBack(); // works best when the goBack is async
            return true;
        }

    2. CameraRoll: 可以读取手机的相册
        import { ... , CameraRoll , Button , ScrollView ,Image} from 'react-native'
        constructor(){
            super()
            photos:[]
        }
        _handleButtonPress = () => {
            CameraRoll.getPhotos({
                first: 20,
                assetType: 'Photos',
                })
                .then(r => {
                this.setState({ photos: r.edges });
                })
                .catch((err) => {
                    //Error Loading Images
                });
            };
        render() {
            return (
                <View>
                    <Button title="Load Images" onPress={this._handleButtonPress} />
                    <ScrollView>
                    {this.state.photos.map((p, i) => {
                        return (
                            <Image
                            key={i}
                            style={{
                                width: 300,
                                height: 100,
                            }}
                            source={{ uri: p.node.image.uri }}
                            />
                        );
                    })}
                    </ScrollView>
                </View>
            );
        }

    3. DatePickerAndroid: 获取日期
        componentDidMount(){
            try {
                const {action} = DatePickerAndroid.open({
                    // Use `new Date()` for current date.
                    // May 25 2020. Month 0 is January.
                    date: new Date(2020, 4, 25)
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                    // Selected year, month (0-11), day
                }
            } catch ({code, message}) {
                console.warn('Cannot open date picker', message);
            }
        }

    4. Dimensions: 获取屏幕宽度 和 高度
        var {height, width} = Dimensions.get('window');

    5. Geolocation: 获取定位, 不需要引入
        componentDidMount(){
            naviagtor.geolocation.getCurrentPosition(pos=>{
                alert(JSON.stringify(pos))
            })
        }

    6. Keyboard: 键盘
        import React, {Component} from 'react';
        import {Keyboard, TextInput} from 'react-native';

        class Example extends Component {
            componentDidMount() {
                this.keyboardDidShowListener = Keyboard.addListener(
                'keyboardDidShow',
                this._keyboardDidShow,
                );
                this.keyboardDidHideListener = Keyboard.addListener(
                'keyboardDidHide',
                this._keyboardDidHide,
                );
            }

            componentWillUnmount() {
                this.keyboardDidShowListener.remove();
                this.keyboardDidHideListener.remove();
            }

            _keyboardDidShow() {
                alert('Keyboard Shown');
            }

            _keyboardDidHide() {
                alert('Keyboard Hidden');
            }

            render() {
                return <TextInput onSubmitEditing={Keyboard.dismiss} />;
            }
        }

    7. PixelRatio: 提供了访问设备的像素密度的方法
        import {... , PixelRatio} from 'react-natvie'
        ...
        <View style={{width:100,height:100,borderBottomWidth:1/PixelRatio}} ></View>

    8. Share: 分享
        import {...,Share} from 'react-native'

        componentDidMount(){
            Share.share({
                message: '分享测试',
                title: '我的测试'
            })
        }

    9. TimePickerAndroid: 
        import {..., TimePickerAndroid} from 'react-native'

        componentDidMount(){
            try {
                const {action, hour, minute} = TimePickerAndroid.open({
                    hour: 14,
                    minute: 0,
                    is24Hour: false, // Will display '2 PM'
                });
                if (action !== TimePickerAndroid.dismissedAction) {
                    // Selected hour (0-23), minute (0-59)
                }
            } catch ({code, message}) {
                console.warn('Cannot open time picker', message);
            }
        }

2. 常用组件
    1. ActivityIndicator: 正在加载图标
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
    
    2. Modal: 弹框
        import React, { Component } from "react";
        import { Modal, Text, TouchableHighlight, View } from "react-native";

        class ModalExample extends Component {
            state = {
                modalVisible: false
            };
            setModalVisible(visible) {
                this.setState({ modalVisible: visible });
            }
            render() {
                return (
                <View style={{ marginTop: 22 }}>
                    <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}
                    >
                    <View style={{ marginTop: 22 }}>
                        <View>
                        <Text>Hello World!</Text>

                        <TouchableHighlight
                            onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                            }}
                        >
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
                        </View>
                    </View>
                    </Modal>

                    <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                    >
                    <Text>Show Modal</Text>
                    </TouchableHighlight>
                </View>
                );
            }
        }

    3. Picker: 下拉弹框
        import React, { Component } from "react";
        import { View,Picker } from "react-native";

        export default class ModalExample extends Component {
            constructor(props){
                super(props)
                this.state ={
                    language:''
                }
            }
            render() {
                return (
                <View style={{ marginTop: 22 }}>
                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 50, width: 100 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="clanguage" value="js" />
                    </Picker>
                </View>
                );
            }
        }
    
    4. ProgressBarAndroid: 进度条
        import React, {Component} from 'react';
        import {ProgressBarAndroid, AppRegistry, StyleSheet, View} from 'react-native';

        export default class App extends Component {
        render() {
            return (
            <View style={styles.container}>
                <ProgressBarAndroid />
                <ProgressBarAndroid styleAttr="Horizontal" />
                <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
                <ProgressBarAndroid
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={0.5}
                />
            </View>
            );
        }
        }

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'space-evenly',
                padding: 10,
            },
        });

    5. Slide: 滑块
         import React, {Component} from 'react';
        import {Slide, StyleSheet, View} from 'react-native';

        export default class App extends Component {
        render() {
            return (
                <View style={styles.container}>
                    <Slide />
                </View>
            );
        }
        }

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'space-evenly',
                padding: 10,
            },
        });

3. 兼容IOS和android方法：
    1. expo官网的API: Camera:
        import React from 'react';
        import { Text, View, TouchableOpacity } from 'react-native';
        import { Camera, Permissions } from 'expo';

        export default class CameraExample extends React.Component {
            state = {
                hasCameraPermission: null,
                type: Camera.Constants.Type.back,
            };

            async componentDidMount() {
                const { status } = await Permissions.askAsync(Permissions.CAMERA);
                this.setState({ hasCameraPermission: status === 'granted' });
            }

            render() {
                const { hasCameraPermission } = this.state;
                if (hasCameraPermission === null) {
                return <View />;
                } else if (hasCameraPermission === false) {
                return <Text>No access to camera</Text>;
                } else {
                return (
                    <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.type}>
                        <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={{
                            flex: 0.1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            }}
                            onPress={() => {
                            this.setState({
                                type: this.state.type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back,
                            });
                            }}>
                            <Text
                            style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                            {' '}Flip{' '}
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </Camera>
                    </View>
                );
                }
            }
        }
    2. expo：加数器 Accelerometer
        import React from 'react';
        import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
        import { Accelerometer } from 'expo';

        export default class AccelerometerSensor extends React.Component {
            state = {
                accelerometerData: {},
            };

            componentDidMount() {
                this._toggle();
            }

            componentWillUnmount() {
                this._unsubscribe();
            }

            _toggle = () => {
                if (this._subscription) {
                this._unsubscribe();
                } else {
                this._subscribe();
                }
            };

            _slow = () => {
                Accelerometer.setUpdateInterval(1000); 
            };

            _fast = () => {
                Accelerometer.setUpdateInterval(
                16
                ); 
            };

            _subscribe = () => {
                this._subscription = Accelerometer.addListener(
                accelerometerData => {
                    this.setState({ accelerometerData });
                }
                ); 
            };

            _unsubscribe = () => {
                this._subscription && this._subscription.remove(); 
                this._subscription = null;
            };

            render() {
                let {
                x,
                y,
                z,
                } = this.state.accelerometerData; 

                return (
                <View style={styles.sensor}>
                    <Text>Accelerometer:</Text>
                    <Text>
                    x: {round(x)} y: {round(y)} z: {round(z)}
                    </Text>

                    <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this._toggle} style={styles.button}>
                        <Text>Toggle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
                        <Text>Slow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._fast} style={styles.button}>
                        <Text>Fast</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                );
            }
        }

        function round(n) {
            if (!n) {
                return 0;
            }

            return Math.floor(n * 100) / 100;
            }

            const styles = StyleSheet.create({
            container: {
                flex: 1,
            },
            buttonContainer: {
                flexDirection: 'row',
                alignItems: 'stretch',
                marginTop: 15,
            },
            button: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#eee',
                padding: 10,
            },
            middleButton: {
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: '#ccc',
            },
            sensor: {
                marginTop: 15,
                paddingHorizontal: 10,
            },
        });

    3. expo: 二维码  BarCodeScanner
        import React from 'react';
        import { StyleSheet, Text, View } from 'react-native';
        import { BarCodeScanner, Permissions } from 'expo';

        export default class BarcodeScannerExample extends React.Component {
            state = {
                hasCameraPermission: null,
            }

            async componentDidMount() {
                const { status } = await Permissions.askAsync(Permissions.CAMERA);
                this.setState({ hasCameraPermission: status === 'granted' });
                }

            render() {
                const { hasCameraPermission } = this.state;

                if (hasCameraPermission === null) {
                return <Text>Requesting for camera permission</Text>;
                }
                if (hasCameraPermission === false) {
                return <Text>No access to camera</Text>;
                }
                return (
                <View style={{ flex: 1 }}>
                    <BarCodeScanner
                    onBarCodeScanned={this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFill}
                    />
                </View>
                );
            }

            handleBarCodeScanned = ({ type, data }) => {
                alert(`Bar code with type ${type} and data ${data} has been scanned!`);
            }
        }


    4. 第三方插件：react-native-camera
    5. 原生工程师写API

4. 项目打包
    expo官网文档---Managed Workflow --- Publishing  打不开  可以百度搜
    1. 先全局安装exp: npm i -g exp   或   yarn global add exp
    2. 配置app.json： 修改icon.png图标大小 需要是120*120
        再复制： "android": {
                    "package": "com.Troy.toilet74932487"
                }
        到app.json中，package唯一名就可以
    3. 进入到项目目录下：.../food  
        执行命令：exp start
    4. 打开另一个命令窗口：
        exp build:android    或者   exp build:ios
        然后选择：1       让exp去完成这个进程
    5. 第三网站 复制到expo官网中，可以查看打包进度（登录expo
        打包完后 在这个网页中点击download

常用组件  API  弹性盒模型  第三方插件   美食项目难点在于 将模块放在redux管理