import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Linking, ToastAndroid } from 'react-native';
import ListItem from './ListItem';

// 아이템 뷰
const ListView = ({ itemList, _getData }) => (
    <View style={styles.container}>
        <FlatList
            data={itemList}
            renderItem={({ item }) =>
                <TouchableOpacity onPress={() => goToUrl(item.url)}>
                    <ListItem
                        title={item.title}
                        des={item.des}
                        creater={item.creater}
                        pubDate={item.pubDate}
                    />
                </TouchableOpacity >
            }

            keyExtractor={(item, index) => index.toString()}

            onEndReached={() => { _getData(); }}
            onEndReachedThreshold={1}
        />
    </View>
);


//가지고 있는 url을 이용해서 웹으로 보내주는 메서드
let goToUrl = (url) => {
    // console.log(url);
    Linking.openURL(url);
}

//스타일
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});




export default ListView;

