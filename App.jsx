/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  PixelRatio,
} from 'react-native';

import FastImageWrapper from './FastImageWrapper';

import {CACHE_EXPIRY, IMAGE_RESOLUTION} from './constants';

const App = () => {
  const ip = `192.168.29.120` || `localhost`;

  const sources = [
    {
      uri: `http://${ip}:7777/image-64_x_64.jpeg`,
      height: 64,
      width: 64,
    },
    {
      uri: `http://${ip}:7777/image-128_x_128.jpeg`,
      height: 128,
      width: 128,
    },
    {
      uri: `http://${ip}:7777/image-256_x_256.jpeg`,
      height: 256,
      width: 256,
    },
    {
      uri: `http://${ip}:7777/image-512_x_512.jpeg`,
      height: 512,
      width: 512,
    },
  ];

  const [toggleInbuiltImageComponent, settoggleInbuiltImageComponent] =
    useState(false);
  const [toggleFastImageComponent, settoggleFastImageComponent] =
    useState(false);

  return (
    <SafeAreaView>
      <ScrollView>
        <Button
          title="Toggle inbuilt image component"
          onPress={() => {
            settoggleInbuiltImageComponent(!toggleInbuiltImageComponent);
          }}
        />
        <Button
          title="Toggle fast image component"
          onPress={() => {
            settoggleFastImageComponent(!toggleFastImageComponent);
          }}
        />
        <View style={styles.container}>
          {toggleInbuiltImageComponent && (
            <>
              <Text style={styles.title}>Inbuilt image conpmponent</Text>
              <Image style={styles.image} source={sources} />
            </>
          )}
          {toggleFastImageComponent && (
            <>
              <Text style={styles.title}>Fast image component</Text>
              <FastImageWrapper
                style={styles.image}
                source={{
                  uri: sources[1].uri,
                }}
                cacheExpiry={CACHE_EXPIRY.EVERY_END_OF_DAY}
                multipleURI={{
                  [IMAGE_RESOLUTION['1x']]: sources[0].uri,
                  [IMAGE_RESOLUTION['2x']]: sources[1].uri,
                  [IMAGE_RESOLUTION['3x']]: sources[2].uri,
                }}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
  },
  title: {
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
  },
  image: {
    width: 64,
    height: 64,
  },
});

export default App;
