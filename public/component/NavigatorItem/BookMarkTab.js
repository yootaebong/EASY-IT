import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class BookMarkTab extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <Text>BookMarkTab</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});