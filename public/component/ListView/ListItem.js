import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


//마지막이 아닐 경우 보여줌
const listItem = ({ title, des, img, creater, pubDate, url }) => (

    <View style={styles.container}>
        <View style={styles.container_text}>
            <View style={styles.lic_container}>
                <Text style={{ flex: 1, fontSize: 8, marginBottom: 5 }}>{dateParser(pubDate)}</Text>
            </View>
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.description}>
                {des.substring(0, 60) + "..."}
            </Text>

        </View>

    </View>
);
//날짜 데이터를 특이한 포멧을 사용해서 일자만 보여주도록 설정.
const dateParser = (oriDateFormat) => {
    return oriDateFormat.split("T")[0];
}

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
        marginBottom: 5
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
        marginBottom: 0
    },
    lic_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },

});



export default listItem;