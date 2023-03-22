import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Home =() => {
    return(
        <View style={styles.container}>
            <Text>Home Screen
                Ini aplikasi Kalkulator
            </Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex : 1,
      backgroundColor: "#fff",
      alignItems: 'center',
      justifyContent: 'center',
    },
});