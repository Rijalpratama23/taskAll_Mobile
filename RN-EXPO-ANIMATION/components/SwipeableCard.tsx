import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolation, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

interface CardProps {
  item: {
    id: number | string;
    title: string;
    image: any;
  };
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  index: number;
}

const SwipeableCard: React.FC<CardProps> = ({ item, onSwipeLeft, onSwipeRight, index }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        const direction = translateX.value > 0 ? 1 : -1;

        translateX.value = withTiming(direction * SCREEN_WIDTH * 1.5, { duration: 300 }, () => {
          if (direction > 0) {
            runOnJS(onSwipeRight)();
          } else {
            runOnJS(onSwipeLeft)();
          }
        });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2], [-15, 0, 15], Extrapolation.CLAMP);

    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { rotate: `${rotate}deg` }],
    };
  });

  const likeOpacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SCREEN_WIDTH / 4], [0, 1]),
  }));

  const nopeOpacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -SCREEN_WIDTH / 4], [0, 1]),
  }));

  return (
    <GestureDetector gesture={pan}>
      {/* Container Utama Kartu */}
      <Animated.View style={[styles.card, animatedCardStyle, { zIndex: index }]}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />

        <View style={styles.footer}>
          <Text style={styles.titleText}>{item.title}</Text>
        </View>

        {/* Label LIKE (Icon + Text) */}
        <Animated.View style={[styles.choiceLabel, styles.likeLabel, likeOpacityStyle]}>
          <Ionicons name="heart" size={40} color="#4ade" />
        </Animated.View>

        {/* Label NOPE (Icon + Text) */}
        <Animated.View style={[styles.choiceLabel, styles.nopeLabel, nopeOpacityStyle]}>
          <Ionicons name="close" size={40} color="#ef4444" />
        </Animated.View>
      </Animated.View>
      {/* ^^^ INI YANG TADI HILANG (Penutup Animated.View utama) */}
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 1.3,
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  choiceLabel: {
    position: 'absolute',
    top: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row', // Agar Icon dan Teks sejajar
    alignItems: 'center',
    gap: 10, // Jarak antar Icon dan Teks
  },
  likeLabel: {
    left: 40,
    transform: [{ rotate: '-30deg' }],
  },
  nopeLabel: {
    right: 40,
    transform: [{ rotate: '30deg' }],
  },
});

export default SwipeableCard;
