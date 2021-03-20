import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";

// _S 는 state이다.
// useEffect(실행함수, [배열]);

const TodayScreen = () => {
  const [location_S, setLocation_S] = useState(null);
  const [errMsg_S, setErrMsg_S] = useState(``);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        setErrMsg_S("Refuse Permission This Device.");
        return;
      }

      const locData = await Location.getCurrentPositionAsync({});
      setLocation_S(locData);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{location_S && location_S.coords.latitude}</Text>
      <Text>{location_S && location_S.coords.longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: `center`,
    justifyContent: `center`,
  },
});

export default TodayScreen;

// 1. location (위치) 위도 , 경도를 구해야함
// ex ) 공주 , 대전

// expo install expo-location 을 하여 Location 을 install 한다.
