import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as Location from "expo-location";
import { getCurrentDate } from "../src/commonUtil";
import { LinearGradient } from "expo-linear-gradient";
import TypeWriter from "react-native-typewriter";

const WEATHER_API_KEY = "c2279690f1a92e1324cfa1a79d5584ed";
/*useEffect에는 async가 안걸림 아래에 가상의 함수를 만듦 */

// _S 는 state이다.
// useEffect(실행함수, [배열]);

const TodayScreen = () => {
  const [location_S, setLocation_S] = useState(null);
  const [errMsg_S, setErrMsg_S] = useState(``);

  const [viewDate, setViewDate] = useState(`0000. 00. 00 (0)`);
  const [viewTime, setviewTime] = useState(`00:00`);

  const [currentTemp, setCurrentTemp] = useState(`0`);
  const [currentCity, setCurrentCity] = useState(``);

  const [minTemp, setMinTemp] = useState(``);
  const [maxTemp, setMaxTemp] = useState(``);

  const [weatherStatus, setWeatherStatus] = useState(``);
  const [weatherImg, setWeatherImg] = useState(null);

  setInterval(() => {
    const { currentDate, currentTime } = getCurrentDate();

    setViewDate(currentDate);
    setviewTime(currentTime);
  }, 1000);

  useEffect(() => {
    const { currentDate, currentTime } = getCurrentDate();

    setViewDate(currentDate);
    setviewTime(currentTime);
    (async () => {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        setErrMsg_S("Refuse Permission This Device.");
        return;
      }

      const locData = await Location.getCurrentPositionAsync({});
      setLocation_S(locData);

      try {
        const weather = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${locData.coords.latitude}&lon=${locData.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`
        )
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            const temp = String(json.main.temp).split(".")[0];
            const minTemp = String(json.main.temp_min).split(".")[0];
            const maxTemp = String(json.main.temp_max).split(".")[0];

            /* floor을 이용해서 소수점을 자르려면 인티져 타입이어야 해서 복잡해서 split 을 이용해 점을 기준으로 나누어서 0번째 배열의 수를 가져옴 */

            setCurrentCity(json.name);
            setCurrentTemp(temp);
            setMinTemp(minTemp);
            setMaxTemp(maxTemp);

            const status = json.weather[0].description;

            switch (status) {
              case "clear sky":
                setWeatherStatus("날씨가 좋습니다.");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/info-weather.appspot.com/o/sun.png?alt=media&token=0c1abb08-0797-4146-b9f4-6ca8c76f621f"
                );
                break;

              case "moderate rain":
                setWeatherStatus("비가 오고있습니다.");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/info-weather.appspot.com/o/rain.png?alt=media&token=36162268-3e2c-4eff-977b-c65312a8d330"
                );
                break;

              case "few clouds":
                setWeatherStatus("조금 흐립니다.");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/info-weather.appspot.com/o/cloud-computing.png?alt=media&token=82522e05-c9cf-446f-bf16-f00297b269e3"
                );
                break;

              case "scattered clouds":
                setWeatherStatus("구름이 많습니다.");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/info-weather.appspot.com/o/clouds.png?alt=media&token=fd1aee92-54be-49e6-b9eb-b9d28973e94d"
                );
                break;

              case "broken clouds":
                setWeatherStatus("비가 올 수도 있습니다.");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/info-weather.appspot.com/o/cloud-computing.png?alt=media&token=fb162215-dd16-40a9-bf87-2380587f25d9"
                );
                break;

              case "shower rain":
                setWeatherStatus("비가 오고있습니다.");
                "https://firebasestorage.googleapis.com/v0/b/info-weather.appspot.com/o/rain.png?alt=media&token=36162268-3e2c-4eff-977b-c65312a8d330";
                break;

              case "rain":
                setWeatherStatus("비가 오고있습니다.");
                "https://firebasestorage.googleapis.com/v0/b/info-weather.appspot.com/o/rain.png?alt=media&token=36162268-3e2c-4eff-977b-c65312a8d330";
                break;

              case "thunder storm":
                setWeatherStatus("번개가 치고 있습니다.");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/info-weather.appspot.com/o/flash.png?alt=media&token=1d7fff5a-de1c-4328-8ae4-010397409558"
                );
                break;

              case "snow":
                setWeatherStatus("눈이 오고있습니다");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/info-weather.appspot.com/o/snow.png?alt=media&token=84941108-0986-4d54-bb64-f17b16b2e8b1"
                );
                break;

              case "mist":
                setWeatherStatus("안개가 꼈습니다.");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/info-weather.appspot.com/o/free-icon-fog-1532335.png?alt=media&token=2154ce2a-827c-4817-b9e3-388d78f441a5"
                );
                break;
            }
          });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>{location_S && location_S.coords.latitude}</Text>
      <Text>{location_S && location_S.coords.longitude}</Text> */}
      <View style={styles.box_1}>
        <Text style={styles.timeText}>{viewTime}</Text>
        <Text style={styles.dateText}>{viewDate}</Text>
      </View>
      <View style={styles.box_2}>
        {weatherImg && (
          <Image
            style={styles.weatherImg}
            source={{
              uri: weatherImg,
            }}
          />
        )}
        <Text style={styles.statusText}>
          <TypeWriter typing={1}>{weatherStatus}</TypeWriter>
        </Text>
        <Text style={styles.tempText}>{currentTemp}°C</Text>
        <View style={styles.tempUnderLine}></View>
      </View>
      <View style={styles.box_3}>
        <Text style={styles.cityText}>{currentCity}</Text>
      </View>
      <LinearGradient
        // Background Linear Gradient
        colors={["#f0eeb9", "#e7eb2a"]}
        style={styles.box_4}
      />
      {/* <View style={styles.box_4_box}>
          <Text style={styles.tempGuideText}>최저기온</Text>
          <Text style={styles.minMaxText}>{minTemp}°C</Text>
        </View>
        <View style={styles.box_4_box}>
          <Text style={styles.tempGuideText}>최고기온</Text>
          <Text style={styles.minMaxText}>{maxTemp}°C</Text>
        </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,

    alignItems: `center`,
    justifyContent: `center`,
  },

  box_1: {
    flex: 2.5,
    width: `100%`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
    marginBottom: 100,
  },

  dateText: {
    fontSize: 19,
    color: `#34495e`,
  },

  timeText: {
    fontSize: 34,
    fontWeight: `700`,
  },

  statusText: {
    fontSize: 20,
    color: `#333`,
    marginBottom: 20,
    marginTop: 10,
  },

  box_2: {
    flex: 3,
    width: `100%`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `flex-end`,
  },

  tempText: {
    fontWeight: `500`,
    fontSize: 90,
    marginBottom: 5,
  },

  tempUnderLine: {
    width: `70%`,
    height: 2,

    backgroundColor: "#666",
    borderRadius: 20,
    marginTop: -10,
    marginBottom: 5,
  },

  box_3: {
    flex: 1,
    width: `100%`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `flex-start`,
  },

  cityText: {
    fontSize: 20,
    fontWeight: `500`,
    color: `#888`,
  },

  box_4: {
    flex: 2,
    width: `100%`,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `center`,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    shadowColor: "#0b0b0b",
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.15,

    elevation: 17,
  },

  box_4_box: {
    flex: 1,
    width: `40%`,
    height: `100%`,
    alignItems: `center`,
    justifyContent: `center`,
  },

  tempGuideText: {
    fontSize: 26,
    fontWeight: `500`,
    padding: 5,
  },

  minMaxText: {
    fontWeight: `400`,
    fontSize: 20,
  },

  weatherImg: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
});

export default TodayScreen;

// 1. location (위치) 위도 , 경도를 구해야함
// ex ) 공주 , 대전

// expo install expo-location 을 하여 Location 을 install 한다.
