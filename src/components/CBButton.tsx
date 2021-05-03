import React, { FC } from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  Animated,
  StyleSheet,
} from 'react-native';
import * as Haptics from 'expo-haptics';

interface CBButtonProps {
  title: string;
}

const CBButton: FC<CBButtonProps> = ({ title }) => {
  const animatedValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };
  return (
    <Animated.View style={[styles.btnContainer, animatedStyle]}>
      <TouchableHighlight
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{ borderRadius: 10 }}
        activeOpacity={0.9}
      >
        <View style={styles.btn}>
          <Text style={styles.btnText}>{title}</Text>
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: '85%',
    borderRadius: 8,
  },
  btn: {
    width: '100%',
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(0, 82, 248)',
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default CBButton;
