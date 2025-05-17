import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    onPress: () => void;
    notificationCount?: number;
};

const TeamChat = ({ onPress, notificationCount = 0 }: Props) => {
    const scaleValue = React.useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        // Animação de escala ao pressionar
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
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.container}
            onPress={handlePress}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
            <Animated.View style={[styles.button, { transform: [{ scale: scaleValue }] }]}>
                <MaterialIcons name="chat" size={28} color="white" />

                {/* Notificação */}
                {notificationCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {notificationCount > 9 ? '9+' : notificationCount}
                        </Text>
                    </View>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: -30, // Metade do botão oculta (ajuste conforme tamanho)
        zIndex: 999,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#2563eb', // Azul
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default TeamChat;