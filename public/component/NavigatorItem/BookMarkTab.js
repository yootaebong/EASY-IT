import React from "react";
import {
  View,
  StyleSheet,
  AsyncStorage,
  Linking,
  TouchableOpacity
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import ListItem from "../ListView/ListItem";

export default class BookMarkTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeKeyArray: [], //key 정보만 가지고 있는 리스트
      likeItemArray: [] //모든 데이터를 가지고 있는 리스트
    };
  }
  //탭바에서 북마크 아이콘을 클릭해 해당 페이지에 포커스가 올 경우에 북마크 추가한 데이터를 다시 싱크를 맞춘다.
  onWillFocusDataSync = () => {
    const current = this;
    AsyncStorage.getAllKeys()
      .then((res, rej) => {
        current.setState({
          likeKeyArray: res
        });
        return res;
      })
      .then((res, rej) => {
        //넘어온 값은 키 어레이
        //멀티 키 값으로 데이터를 파싱한다.
        AsyncStorage.multiGet(res, (err, stores) => {
          let dumpLikeItemArray = [];
          stores.map((result, i, store) => {
            let key = store[i][0];
            let value = store[i][1];

            if (key !== "saveItems") {
              let dumpJson = {};
              let dumpArr = value.split("-__-");

              dumpJson.title = dumpArr[0];
              dumpJson.des = dumpArr[1];
              dumpJson.pubDate = dumpArr[2];
              dumpJson.url = dumpArr[3];
              dumpJson.addTime = dumpArr[4];

              dumpLikeItemArray.push(dumpJson);
            }
          });
          //배열을 최근 저장한 순서대로 리스팅한다.
          dumpLikeItemArray.sort((a, b) => {
            return a.addTime * 1 < b.addTime * 1
              ? 1
              : a.addTime * 1 > b.addTime * 1
              ? -1
              : 0;
          });

          //스테이터스 값 저장
          current.setState({
            likeItemArray: dumpLikeItemArray
          });

          //   console.log(dumpLikeItemArray);
        });
      });
  };

  render() {
    return (
      <View style={style.container}>
        <NavigationEvents
          onWillFocus={payload => {
            this.onWillFocusDataSync();
          }}
        />
        <FlatList
          data={this.state.likeItemArray}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                <ListItem
                  title={item.title}
                  des={item.des}
                  pubDate={item.pubDate}
                  isRead={false}
                  url={item.url}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={1}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
