import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        padding: 10,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: '#FFF',

        borderRadius: 5,
        borderWidth: 1,

        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,

    },
    title: {
        fontSize: 18,
        color: '#000',
        marginBottom: 10
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 5,
        justifyContent: 'center',

    },
    description: {
        fontSize: 10,
        fontStyle: 'italic',
        marginBottom: 5
    },
    lic_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },

});

const ListItem = ({ title, description, img, creater, pubDate, url }) => (
    <View style={styles.container}>
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.description}>
                {description + "..."}
            </Text>
            <View style={styles.lic_container}>
                <Text style={{ flex: 3, fontSize: 10 }}>{creater}</Text>
                <Text style={{ flex: 3, fontSize: 10 }}>{pubDate}</Text>
            </View>
        </View>

    </View>
);

export default ListItem;