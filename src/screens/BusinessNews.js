import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import {
  api_key,
  category_Business,
  articles_url,
  country_code,
} from "../config/rest_config";

export default class BusinessNews extends Component {
  constructor() {
    super();
    this.state = {
      BusinessNewsData: [],
      loading: true,
    };
  }

  getBusinessNewsData = async () => {
    const url = `${articles_url}?country=${country_code}&category=${category_Business}&apiKey=${api_key}`;
    var req = await fetch(url);
    var res = await req.json();
    this.setState({ BusinessNewsData: res.articles, loading: false });
  };

  componentDidMount = () => {
    this.getBusinessNewsData();
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <ScrollView>
            {this.state.BusinessNewsData.map((news, key) => (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(news.url);
                }}
                key={key}
              >
                <View style={styles.card}>
                  <Image
                    source={{
                      uri:
                        news.urlToImage !== null
                          ? news.urlToImage
                          : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                    }}
                    style={styles.image}
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
                      style={{ fontSize: 12, opacity: 0.7 }}
                      numberOfLines={2}
                    >
                      {news.description ? news.description : "No Description"}
                    </Text>
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
    margin: 10,
    borderRadius: 10,
    marginVertical: 7,
    padding: 7,
    backgroundColor: "#ffffff",
    elevation: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 20,
    resizeMode: "cover",
  },
});
