import {StyleSheet, View} from "react-native";
import {memo} from "react";

const GridView = ({data = [], renderItem, cols = 2, alignItems}) => {
    return (
        <View style={styles.container}>
            {
                data && cols && renderItem &&
                data?.map((item, index) => (
                    <View key={index} style={{width: (100 / cols) + '%'}}>
                        <View style={[alignItems ? {alignItems} : {}]}>
                            {renderItem(item, index)}
                        </View>
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default memo(GridView);
