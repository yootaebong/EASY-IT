import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";
import { AsyncStorage } from "react-native";
import { NavigationEvents } from "react-navigation";

const splitValue = "-__-";
//2019-12-26 ex5 -> es6
class listItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: false
    };
  }
  //데이터를 전달 받을 때, 로컬 저장소에 접근 한뒤, 좋아요 한 것인지 판단.
  UNSAFE_componentWillReceiveProps() {
    // console.log(this.props.title);
    //제목으로 로컬 저장. 없을 경우 북마크 추가 안했다고 판단.
    AsyncStorage.getItem(this.props.title).then((res, rej) => {
      if (res !== null) {
        this.setState({
          isLike: true
        });
      }
      //   console.log(res);
    });
  }
  // 좋아요 버튼을 클릭하면 들어오게 되는 메서드.
  // 로컬 데이터베이스에 저장한뒤에, 아이콘을 변경해준다.
  likeBtnClick = () => {
    //좋아요 클릭한 것에 대해서 이미 클릭한 것 이라면, 삭제를 아니라면,추가를 해준다.
    if (!this.state.isLike) {
      AsyncStorage.setItem(
        this.props.title,
        this.props.title +
          splitValue +
          this.props.des +
          splitValue +
          this.props.pubDate +
          splitValue +
          this.props.url +
          splitValue +
          new Date().getTime()
      );
    } else {
      AsyncStorage.removeItem(this.props.title);
    }
    this.setState({
      isLike: !this.state.isLike
    });
  };
  //포커스가 돌아왔을 때 아이템의 좋아요가 풀렸는지 판단.
  likedChecker = () => {
    AsyncStorage.getItem(this.props.title).then((res, rej) => {
      if (res !== null) {
        this.setState({
          isLike: true
        });
      } else {
        this.setState({
          isLike: false
        });
      }
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={payload => {
            this.likedChecker();
          }}
        />
        <View style={styles.container_text}>
          <View style={styles.lic_container}>
            <Text
              style={{
                flex: 1,
                fontSize: 12,
                marginBottom: 5,
                color: this.props.isRead ? "#808080" : "#000"
              }}
            >
              {dateParser(this.props.pubDate)}
            </Text>

            <Icon
              name={this.state.isLike ? "ios-heart" : "ios-heart-empty"}
              style={{ fontSize: 20, padding: 5 }}
              onPress={() => {
                this.likeBtnClick();
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              marginBottom: 5,
              color: this.props.isRead ? "#808080" : "#000"
            }}
          >
            {this.props.title}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontStyle: "italic",
              marginBottom: 0,
              color: this.props.isRead ? "#808080" : "#000"
            }}
          >
            {this.props.des.substring(0, 60) + "..."}
          </Text>
        </View>
      </View>
    );
  }
}

//날짜 데이터를 특이한 포멧을 사용해서 일자만 보여주도록 설정.
const dateParser = oriDateFormat => {
  return oriDateFormat.split("T")[0];
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    flexDirection: "column",
    padding: 10,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#FFF",

    borderRadius: 5,
    borderWidth: 1,

    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  container_text: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 5,
    justifyContent: "center"
  },
  title: {
    fontSize: 18,
    marginBottom: 5
  },

  description: {
    fontSize: 10,
    fontStyle: "italic",
    marginBottom: 0
  },
  lic_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    flex: 1
  }
});

export default listItem;
