import React, { Component } from "react";
import { Image } from "react-native";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";

import {
  api_key,
  articles_url,
  country_code,
  category_general,
} from "../config/rest_config";

export default class generalNewsScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      generalNews: [],
    };
  }
  getGeneralNewsData = async () => {
    try {
      const url = `${articles_url}?country=${country_code}&category=${category_general}&apiKey=${api_key}`;
      var req = await fetch(url);
      var res = await req.json();
      this.setState({ generalNews: res.articles, loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    this.getGeneralNewsData();
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <ScrollView>
            {this.state.generalNews.map((news, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  Linking.openURL(news.url);
                }}
              >
                <View
                  style={{
                    margin: 10,
                    borderRadius: 10,
                    marginVertical: 7,
                    padding: 7,
                    backgroundColor: "#ffffff",
                    elevation: 15,
                  }}
                >
                  <View style={styles.card}>
                    <Image
                      source={{
                        uri:
                          news.urlToImage !== null
                            ? news.urlToImage
                            : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                      }}
                      style={styles.Image}
                    />
                    <View style={{ width: "70%", marginLeft: 20 }}>
                      <Text
                        style={{
                          paddingVertical: 4,
                          fontWeight: "bold",
                          fontSize: 15,
                        }}
                        numberOfLines={1}
                      >
                        {news.title}
                      </Text>

                      <Text
                        numberOfLines={2}
                        style={{ fontSize: 12, opacity: 0.6 }}
                      >
                        {news.description ? news.description : "No Description"}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF3F3",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
  },
  Image: {
    width: 60,
    height: 60,
    borderRadius: 20,
    resizeMode: "cover",
  },
});
