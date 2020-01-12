import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform
} from "react-native";
import ListItem from "./ListItem";
import { AsyncStorage } from "react-native";
import Axios from "axios";
import { SERVER_IP, SERVER_LOG } from "../../../privateSet";
// 2019-12-25
// es5 -> es6 수정

//로컬 저장소 이름.
const StorageName = "saveItems";
//저장소 구분자
const SplitValue = "-__-";
//저장소
let localArray = [];
class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateArray: []
    };
  }

  //로컬 저장소에 저장되어있는 데이터를 가지고 온다.
  UNSAFE_componentWillMount() {
    let current = this;
    // console.log(this.props.itemList);
    //맨 처음 값을 가지고 옵니다.
    AsyncStorage.getItem(StorageName)
      .then((res, rej) => {
        if (res !== null) {
          localArray = res.split(SplitValue);
        }
      })
      .then((res, rej) => {
        this.setState({
          stateArray: localArray
        });
      });
  }

  onClick = (url, title) => {
    //url 이동
    this.saveClickLog(url, title);
    this.goToUrl(url);
    this.loadData(title);
  };

  //가지고 있는 url을 이용해서 웹으로 보내주는 메서드
  goToUrl = url => {
    // console.log(url);
    Linking.openURL(url);
  };

  //로컬 스토리지에 접근해서, 기존에 봣던 데이터의 타이틀 값으로 저장.
  loadData = async title => {
    let current = this;

    //기존에 있던 데이터를 로드한 뒤에, 추가해주는 방향으로 사용.
    try {
      let oldData = await AsyncStorage.getItem(StorageName);
      // console.log(oldData);
      if (oldData === null) {
        //데이터 처음 생성할 때
        let dataValue = title;
        AsyncStorage.setItem(StorageName, dataValue);
        localArray.push(dataValue);
      } else {
        //데이터 한개 이상 들어가 있을 경우 중복 제거
        let dataArr = oldData.split(SplitValue); //배열 생성
        let isOld = dataArr.some(item => {
          //중복 확인
          return item === title;
        });

        //새로운 타이틀이라면 추가
        if (!isOld) {
          AsyncStorage.setItem(StorageName, oldData + SplitValue + title);
          localArray.push(title);
        }
      }

      current.setState({
        stateArray: localArray
      });

      //   console.log(current.state.stateArray);
    } catch (err) {
      console.log("err : " + err);
    }
  };

  saveClickLog = (url, title) => {
    Axios.post(SERVER_IP + SERVER_LOG, null, {
      headers: {
        "device-os": Platform.OS,
        "device-version": Platform.Version,
        "click-url": url,
        "click-title": title
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.itemList}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                onPress={() => this.onClick(item.url, item.title)}
              >
                <ListItem
                  title={item.title}
                  creater={item.creater}
                  pubDate={item.pubDate}
                  isRead={this.state.stateArray.includes(item.title)}
                  url={item.url}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => {
            this.props._getData();
          }}
          onEndReachedThreshold={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default ListView;
