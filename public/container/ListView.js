import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ListItem from '../component/ListView/ListItem';

const ListView = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
            data={itemList}
            renderItem={({ item }) => <ListItem
                key={item.key}
                title={item.title}
                description={item.description}
            />}
        />

    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ListView;

