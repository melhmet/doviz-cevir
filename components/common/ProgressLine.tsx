import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/constants/colors';

export function ProgressLine() {
  const scaleX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleX, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleX, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.7,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [scaleX, opacity]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.line,
          {
            opacity,
            transform: [{ scaleX }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 2,
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.primaryContainer,
    transformOrigin: 'left',
  },
});
