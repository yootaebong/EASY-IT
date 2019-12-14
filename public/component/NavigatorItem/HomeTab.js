import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
// 리스트뷰 아이템
import ListView from '../../container/ListView';


export default class HomeTab extends React.Component {

    getData = () => {
        let newsData = [];

        for (let i = 0; i < 10; i++) {
            newsData.push({
                key: (i *= 1),
                title: 'title ' + i,
                description: 'des ' + i
            })
        }

        return newsData;
    }
    render() {
        return (
            <View style={style.container}>
                <ListView itemList={this.getData()} />
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