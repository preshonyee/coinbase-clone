import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const isActions = route.name == 'Actions';

        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Portfolio':
            iconName = 'pie-chart';
            break;
          case 'Prices':
            iconName = 'cellular';
            break;
          default:
            iconName = 'person';
        }
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
        };

        const animatedStyle = {
          transform: [{ scale: animatedValue }],
        };

        return (
          <Animated.View
            style={[
              styles.tabBarItem,
              isActions ? { marginTop: 7 } : { marginTop: 10 },
              animatedStyle,
            ]}
          >
            <TouchableOpacity
              onPress={onPress}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              {isActions ? (
                <View style={styles.actionsButton}>
                  <Ionicons name='swap-horizontal' size={20} color='white' />
                </View>
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <Ionicons
                    name={iconName}
                    size={20}
                    color={isFocused ? Colors.cbBlue : Colors.subtitle}
                    style={{ marginBottom: 2 }}
                  />
                  <Text
                    style={[
                      { color: isFocused ? Colors.cbBlue : Colors.subtitle },
                      styles.tabBarText,
                    ]}
                    selectable
                  >
                    {route.name}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 85,
    borderColor: 'white',
    borderTopColor: Colors.border,
    borderWidth: 1,
    justifyContent: 'space-evenly',
  },
  tabBarItem: {
    width: 60,
  },
  tabBarText: {
    fontSize: 10,
    fontWeight: '700',
  },
  actionsButton: {
    width: 42,
    height: 42,
    backgroundColor: Colors.cbBlue,
    borderRadius: 21,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabBar;