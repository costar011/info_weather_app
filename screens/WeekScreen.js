import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import * as Location from "expo-location";

const WEATHER_API_KEY = "c2279690f1a92e1324cfa1a79d5584ed";
/*useEffect에는 async가 안걸림 아래에 가상의 함수를 만듦 */

const WeekScreen = () => {
  const Item = ({ time, temp }) => {
    return (
      <View style={styles.listBox}>
        <Text>{time}</Text>
        <Text>{temp}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return <Item time={String(item.dateTime).split(` `)[1]} temp={item.temp} />;
  };

  const [data0Date, setData0Date] = useState(null);
  const [data1Date, setData1Date] = useState(null);
  const [data2Date, setData2Date] = useState(null);
  const [data3Date, setData3Date] = useState(null);
  const [data4Date, setData4Date] = useState(null);

  const [tab, setTab] = useState(0);

  const [btnName0, setBtnName0] = useState(null);
  const [btnFlag0, setBtnFlag0] = useState(true);

  const [btnName1, setBtnName1] = useState(null);
  const [btnFlag1, setBtnFlag1] = useState(true);

  const [btnName2, setBtnName2] = useState(null);
  const [btnFlag2, setBtnFlag2] = useState(true);

  const [btnName3, setBtnName3] = useState(null);
  const [btnFlag3, setBtnFlag3] = useState(true);

  const [btnName4, setBtnName4] = useState(null);
  const [btnFlag4, setBtnFlag4] = useState(true);

  const buttonClickHandler = (tab) => {
    setTab(tab);
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== "granted") {
          setErrMsg_S("Refuse Permission This Device.");
          return;
        }

        const locData = await Location.getCurrentPositionAsync({});

        const weather = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${locData.coords.latitude}&lon=${locData.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`
        )
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            const now = new Date();

            const data0 = `${now.getFullYear()}-${
              now.getMonth() + 1 < 10
                ? `0` + (now.getMonth() + 1)
                : now.getMonth() + 1
            }-${now.getDate() < 10 ? `0` + now.getDate() : now.getDate()}`;

            now.setDate(now.getDate() + 1);
            const data1 = `${now.getFullYear()}-${
              now.getMonth() + 1 < 10
                ? `0` + (now.getMonth() + 1)
                : now.getMonth() + 1
            }-${now.getDate() < 10 ? `0` + now.getDate() : now.getDate()}`;

            now.setDate(now.getDate() + 1);
            const data2 = `${now.getFullYear()}-${
              now.getMonth() + 1 < 10
                ? `0` + (now.getMonth() + 1)
                : now.getMonth() + 1
            }-${now.getDate() < 10 ? `0` + now.getDate() : now.getDate()}`;

            now.setDate(now.getDate() + 1);
            const data3 = `${now.getFullYear()}-${
              now.getMonth() + 1 < 10
                ? `0` + (now.getMonth() + 1)
                : now.getMonth() + 1
            }-${now.getDate() < 10 ? `0` + now.getDate() : now.getDate()}`;

            now.setDate(now.getDate() + 1);
            const data4 = `${now.getFullYear()}-${
              now.getMonth() + 1 < 10
                ? `0` + (now.getMonth() + 1)
                : now.getMonth() + 1
            }-${now.getDate() < 10 ? `0` + now.getDate() : now.getDate()}`;

            let arr0 = [];
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            let arr4 = [];

            json.list.map((data) => {
              const compareData = data.dt_txt.split(` `)[0];

              switch (compareData) {
                case data0:
                  const prevData = {
                    temp: String(data.main.temp).split(`.`)[0],
                    dateTime: data.dt_txt,
                  };

                  arr0.push(prevData);
                  break;

                case data1:
                  const prevData1 = {
                    temp: String(data.main.temp).split(`.`)[0],
                    dateTime: data.dt_txt,
                  };

                  arr1.push(prevData1);
                  break;

                case data2:
                  const prevData2 = {
                    temp: String(data.main.temp).split(`.`)[0],
                    dateTime: data.dt_txt,
                  };

                  arr2.push(prevData2);
                  break;

                case data3:
                  const prevData3 = {
                    temp: String(data.main.temp).split(`.`)[0],
                    dateTime: data.dt_txt,
                  };

                  arr3.push(prevData3);
                  break;

                case data4:
                  const prevData4 = {
                    temp: String(data.main.temp).split(`.`)[0],
                    dateTime: data.dt_txt,
                  };

                  arr4.push(prevData4);
                  break;
              }
            });
            setData0Date(arr0);
            if (data0Date) {
              if (btnFlag0) {
                setBtnName0(String(data0Date[0].dateTime).substring(5, 10));
                setBtnFlag0(false);
              }
            }
            setData1Date(arr1);
            if (data0Date) {
              if (btnFlag1) {
                setBtnName1(String(data1Date[0].dateTime).substring(5, 10));
                setBtnFlag1(false);
              }
            }
            setData2Date(arr2);
            if (data2Date) {
              if (btnFlag2) {
                setBtnName2(String(data2Date[0].dateTime).substring(5, 10));
                setBtnFlag2(false);
              }
            }
            setData3Date(arr3);
            if (data3Date) {
              if (btnFlag3) {
                setBtnName3(String(data3Date[0].dateTime).substring(5, 10));
                setBtnFlag3(false);
              }
            }
            setData4Date(arr4);
            if (data4Date) {
              if (btnFlag4) {
                setBtnName4(String(data4Date[0].dateTime).substring(5, 10));
                setBtnFlag4(false);
              }
            }
          });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        {btnName0 && (
          <TouchableOpacity
            style={tab === 0 ? styles.activeBtn : styles.standardBtn}
            onPressOut={() => buttonClickHandler(0)}
          >
            <Text style={styles.btnTxt}>{btnName0}</Text>
          </TouchableOpacity>
        )}

        {btnName1 && (
          <TouchableOpacity
            style={tab === 1 ? styles.activeBtn : styles.standardBtn}
            onPressOut={() => buttonClickHandler(1)}
          >
            <Text style={styles.btnTxt}>{btnName1}</Text>
          </TouchableOpacity>
        )}

        {btnName2 && (
          <TouchableOpacity
            style={tab === 2 ? styles.activeBtn : styles.standardBtn}
            onPressOut={() => buttonClickHandler(2)}
          >
            <Text style={styles.btnTxt}>{btnName2}</Text>
          </TouchableOpacity>
        )}

        {btnName3 && (
          <TouchableOpacity
            style={tab === 3 ? styles.activeBtn : styles.standardBtn}
            onPressOut={() => buttonClickHandler(3)}
          >
            <Text style={styles.btnTxt}>{btnName3}</Text>
          </TouchableOpacity>
        )}

        {btnName4 && (
          <TouchableOpacity
            style={tab === 4 ? styles.activeBtn : styles.standardBtn}
            onPressOut={() => buttonClickHandler(4)}
          >
            <Text style={styles.btnTxt}>{btnName4}</Text>
          </TouchableOpacity>
        )}
      </View>
      <SafeAreaView style={styles.box2}>
        {tab === 0 && (
          <FlatList
            data={data0Date && data0Date}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
        {tab === 1 && (
          <FlatList
            data={data1Date && data1Date}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
        {tab === 2 && (
          <FlatList
            data={data2Date && data2Date}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
        {tab === 3 && (
          <FlatList
            data={data3Date && data3Date}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
        {tab === 4 && (
          <FlatList
            data={data4Date && data4Date}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },

  box1: {
    flex: 1,
    width: `100%`,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-around`,

    marginTop: 70,
  },

  box2: {
    flex: 4,
    width: `100%`,
  },

  standardBtn: {
    width: `19%`,
    height: 45,

    alignItems: `center`,
    justifyContent: `center`,

    borderRadius: 3.5,
    borderColor: `rgb(200,200,200)`,
    borderWidth: 1,

    shadowColor: "#999",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,

    elevation: 17,
  },

  activeBtn: {
    width: `19%`,
    height: 45,

    backgroundColor: `#e7eb2a`,
    alignItems: `center`,
    justifyContent: `center`,
    borderRadius: 7,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,

    elevation: 17,
  },

  btnTxt: {
    fontWeight: `500`,
    fontSize: 20,
  },
  listBox: {
    width: `100%`,
    flexDirection: `row`,
    justifyContent: `space-around`,
    marginBottom: 7,
  },
});

export default WeekScreen;
