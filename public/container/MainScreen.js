import React from 'react';
import { Icon } from 'native-base';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeTab from '../component/NavigatorItem/HomeTab';
import SearchTab from '../component/NavigatorItem/SearchTab';
import BookMarkTab from '../component/NavigatorItem/BookMarkTab';

// 하단 네비게이터 생성
const BottomNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeTab,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name='ios-home' style={{ color: tintColor }} />,
            tabBarLabel: <View />
        }
    },
    Search: {
        screen: SearchTab,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name='ios-search' style={{ color: tintColor }} />,
            tabBarLabel: <View />
        }
    },
    BookMark: {
        screen: BookMarkTab,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name='ios-bookmark' style={{ color: tintColor }} />,
            tabBarLabel: <View />
        }
    }
});

const AppNavigatorContainer = createAppContainer(BottomNavigator);

export default class MainScreen extends React.Component {

    static navigationOptions = {
        title: 'EASY IT',
        headerLeft: <View />,
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
            flexGrow: 1,
            color: 'white',
        },
        headerRight: <View />,
        headerStyle: {
            backgroundColor: 'black',
        },
    }

    render() {
        return (
            <AppNavigatorContainer />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});