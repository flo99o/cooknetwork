import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome5";

export const FeedScroll = () => {
  const video = React.useRef(null);

  const [loadingMore, setLoadingMore] = useState(false);
  const [status, setStatus] = useState(null);

  const [heartCount, setHeartCount] = useState(0);

  const handleHeartPress = () => {
    setHeartCount(heartCount + 1);
    console.log("Heart pressed!");
  };

  const [videoFeed, setVideoFeed] = useState([
    {
      title: "video1",
      uri: require("../assets/videos/video2.mp4"),
      description: "New Apple pie recipe",
    },
    {
      title: "video2",
      uri: require("../assets/videos/video3.mp4"),
      description: "New Apple pie recipe",
    },
    {
      title: "video3",
      uri: require("../assets/videos/video4.mp4"),
      description: "New Apple pie recipe",
    },
  ]);

  const customMenus = [
    {
      icon: <Icon name="heart" size={30} color="white" />,
      value: heartCount.toString(),
      onPress: handleHeartPress,
    },
    {
      icon: <Icon name="comment" size={30} color="white" />,
      value: "0",
      onPress: () => console.log("Comment pressed!"),
    },
    {
      icon: <Icon name="share" size={30} color="white" />,
      value: "0",
      onPress: () => console.log("Share pressed!"),
    },
  ];

  const loadMoreVideos = () => {
    // Simuler une requête de chargement de plus de vidéos
    setLoadingMore(true);
    setLoadingMore(true);
    // Mettre à jour l'état du chargement après un certain délai (simulant une requête)
    setTimeout(() => {
      setLoadingMore(false);
    }, 2000);
  };


  const renderItem = ({ item}) => {
    
    return(
    <Pressable onPress={() => status.isPlaying ? video.current?.pauseAsync() : video.current?.playAsync()}>
      <View style={styles.videoContainer}>
        <Video
          ref={video}
          style={styles.video}
          source={item.uri}
          useNativeControls
          isLooping={true}
          resizeMode={ResizeMode.COVER}
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={styles.IconContainer}>
          {customMenus.map((menu, index) => (
            <TouchableOpacity
              key={index}
              style={styles.customMenu}
              onPress={menu.onPress}
            >
              {menu.icon}
              <Text style={styles.menuValue}>{menu.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Pressable>
    )
  };
  const renderFooter = () => {
    // Afficher un indicateur de chargement si loadingMore est vrai
    return loadingMore ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : null;
  };
 
  return (
    <View>
      <FlatList
        data={videoFeed}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadMoreVideos}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  video: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    color: "#ffffff",
    fontSize: 16,
  },
  IconContainer: {
    position: "absolute",
    top: "70%",
    right: 10,
    flexDirection: "column",
    gap: 5,
  },
  customMenu: {
    alignItems: "center",
    marginBottom: 10,
    gap: 2,
  },
  menuValue: {
    color: "white",
    marginLeft: 5,
  },
});
