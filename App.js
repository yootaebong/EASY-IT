import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
// 네비 관련
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

//스크린
import MainScreen from "./public/container/MainScreen";

const AppStackNavigator = createStackNavigator({
  Main: {
    screen: MainScreen // MainScreen 컴포넌트를 네비게이터에 등록
  }
});

export default createAppContainer(AppStackNavigator);
