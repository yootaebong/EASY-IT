import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
// 리스트뷰 아이템
import ListView from '../ListView/ListView';
//axio
import axios from 'axios';
//정보
import { SERVER_IP, SERVER_HOME_DIR } from '../../../privateSet';


export default class HomeTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newsData: [],
            skip: 0,
            limit: 10,
        }
    }

    UNSAFE_componentWillMount() {
        this.getData();
    }



    getData = () => {
        var current = this;
        axios.get(SERVER_IP + SERVER_HOME_DIR + "/" + current.state.skip + "/" + current.state.limit)
            .then(res => {
                // console.log("//////////////////////////");
                // console.log(res.data);
                // console.log("//////////////////////////");
                current.setState({
                    newsData: res.data,
                    skip: current.state.skip + current.state.limit
                })
            })
            .catch(res => {
                console.log(res);
            })
    }
    render() {

        return (
            <View style={style.container}>
                <ListView itemList={this.state.newsData} />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
    }

});