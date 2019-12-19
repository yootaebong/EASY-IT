import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import ListItem from './ListItem';

const ListView = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
            data={itemList}
            renderItem={({ item }) =>
                <TouchableOpacity onPress={() => goToUrl(item.url)}>
                    <ListItem
                        title={item.title}
                        description={item.des}
                        img={item.img}
                        creater={item.creater}
                        pubDate={item.pubDate}
                    />
                </TouchableOpacity >
            }

            keyExtractor={(item, index) => index.toString()}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

let goToUrl = (url) => {
    // console.log(url);
    Linking.openURL(url);
}

export default ListView;

