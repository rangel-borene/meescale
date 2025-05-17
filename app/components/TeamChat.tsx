// TeamChatBeta.tsx (versão final do usuário)
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    onPress: () => void;
    notificationCount?: number;
};

const TeamChat = ({ onPress, notificationCount = 0 }: Props) => {
    const scaleValue = React.useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 0.9,
                duration: 50,
                useNativeDriver: false,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false,
            }),
        ]).start();

        onPress();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={handlePress}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
                <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                    <Ionicons name="chatbubble" size={24} color="#333" />

                    {notificationCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>
                                {notificationCount > 9 ? '9+' : notificationCount}
                            </Text>
                        </View>
                    )}
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Estilo limpo e funcional
    },
    badge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: 'red',
        borderRadius: 8,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default TeamChat;