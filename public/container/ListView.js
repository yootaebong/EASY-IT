import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ListItem from '../component/ListView/ListItem';



const ListView = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
            data={itemList}
            renderItem={({ item }) => <ListItem
                id={item._id}
                title={item.title}
                description={item.des}
            />}

            keyExtractor={(item, index) => index.toString()}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ListView;

