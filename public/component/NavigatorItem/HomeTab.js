import React from 'react';
import { View, StyleSheet, Platform, ProgressBarAndroid, ProgressViewIOS } from 'react-native';
// 리스트뷰 아이템
import ListView from '../ListView/ListView';
//axio
import axios from 'axios';
//정보
import { SERVER_IP, SERVER_HOME_DIR } from '../../../privateSet';


export default class HomeTab extends React.Component {
    loadingInterval = 0; //인터벌 컨트롤을 위한 id값 넣기.

    constructor(props) {
        super(props);

        this.state = {
            newsData: [],       //뉴스 데이터 어레이
            skip: 0,            //페이징 위한 스킵
            limit: 20,          //페이지 사이즈
            loadAnimVisible: false,    //데이터통신을 할 때 애니메이션을 보여줄지 말지
            progressValue: 0.00,      //프로그레스바 벨류, ios는 interminate 되지 않기 떄문에, 직접 제작,
            lastList: false,
        }
    }

    //컴포넌트가 마운트 될 때 데이터 통신을 해서 state에 데이터를 넣어줍니다.
    UNSAFE_componentWillMount() {
        this.getData();
    }


    // 서버와 통신해서 아이템을 얻어옵니다. 
    // 기본적으로 20개씩 가져오며, 아이템 끝에 갔을 경우 페이징 처리를 진행해서 아이템을 추가 해 줍니다.
    getData = () => {
        //마지막 리스트를 가지고 왔으면 더이상 통신하지 않아요
        if (this.state.lastList) return;
        var current = this;
        //아이폰만 프로그레스바 진행.
        Platform.OS === "ios" ? this.startProgessValue() : null;
        //로딩 애니메이션 보여줌
        current.setState({
            loadAnimVisible: true
        })
        axios.get(SERVER_IP + SERVER_HOME_DIR + "/" + current.state.skip + "/" + current.state.limit)
            .then(res => {
                // console.log("get_data call");
                // console.log("//////////////////////////");
                // console.log(res.data);
                // console.log("//////////////////////////");
                // console.log(current.state.skip + "/" + current.state.limit);
                current.setState({
                    newsData: current.state.newsData.concat(res.data),
                    skip: current.state.skip + current.state.limit,
                    loadAnimVisible: false,
                    progressValue: 0.00
                })

                Platform.OS === "ios" ? this.stopProgessValue() : null;
            })
            .catch(res => {
                //더이상 불러올 데이터가 없을 경우 에러 마지막 데이터라는 것을 인식
                const last = [
                    { title: "마지막 뉴스입니다.", des: "문의 사항 : ytb4748@gmail.com", creater: "", pubDate: "Developer Bong " }
                ];
                current.setState({
                    newsData: current.state.newsData.concat(last),
                    loadAnimVisible: false,
                    progressValue: 0.00,
                    lastList: true
                })

                Platform.OS === "ios" ? this.stopProgessValue() : null;
            })
    }

    //통신할 떄 보여줄 로딩 애니메이션 사용.
    //state로 visible을 컨트롤 한다.
    loadAnimForOs = (visible) => {
        if (!visible) return;

        if (Platform.OS === "ios") {
            return (
                <ProgressViewIOS style={{ width: "100%" }} progress={this.state.progressValue} />
            )
        } else {
            return (
                <ProgressBarAndroid style={{ width: "100%" }} styleAttr="Horizontal" />
            )
        }
    }
    //로딩 프로그레스 벨류 제작
    //인터벌 등록.
    startProgessValue = () => {
        this.loadingInterval = setInterval(() => {
            if (this.state.progressValue <= 1) {
                this.setState({
                    progressValue: this.state.progressValue + 0.01
                })
            } else {
                this.setState({
                    progressValue: 0.00
                })
            }
        }, 10);
    }
    //인터벌 제거
    stopProgessValue = () => {
        clearInterval(this.loadingInterval);
    }

    render() {
        // 리스트 뷰는 state.newsData를 기반으로 렌더링 됩니다.

        return (
            <View style={style.container}>
                <ListView
                    itemList={this.state.newsData}
                    _getData={() => this.getData()}
                />
                {this.loadAnimForOs(this.state.loadAnimVisible)}
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
    }

});