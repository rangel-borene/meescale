import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

type ToastType = 'success' | 'error';

interface ToastContent {
    text1: string;
    text2: string;
}

const ToastManager = {
    show: (type: ToastType, text1: string, text2: string) => { },
    hide: () => { }
};

export const Toast = () => {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<ToastType>('success');
    const [content, setContent] = useState<ToastContent>({ text1: '', text2: '' });
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const autoHideTimeout = useRef<number | null>(null);

    const isTouching = useRef(false);

    const handleTouchStart = () => {
        isTouching.current = true;
        if (autoHideTimeout.current) {
            clearTimeout(autoHideTimeout.current);
        }
    };

    const handleTouchEnd = () => {
        isTouching.current = false;
        startAutoHide();
    };

    const startAutoHide = () => {
        autoHideTimeout.current = setTimeout(() => {
            if (!isTouching.current) {
                ToastManager.hide();
            }
        }, 4000);
    };

    useEffect(() => {
        ToastManager.show = (newType, text1, text2) => {
            setType(newType);
            setContent({ text1, text2 });
            setVisible(true);

            if (autoHideTimeout.current !== null) {
                clearTimeout(autoHideTimeout.current);
            }

            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                startAutoHide();
            });
        };

        ToastManager.hide = () => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setVisible(false);
                if (autoHideTimeout.current) {
                    clearTimeout(autoHideTimeout.current);
                }
            });
        };

        return () => {
            if (autoHideTimeout.current) {
                clearTimeout(autoHideTimeout.current);
            }
        };
    }, [fadeAnim]);

    if (!visible) return null;

    return (
        <TouchableWithoutFeedback
            onPressIn={handleTouchStart}
            onPressOut={handleTouchEnd}
        >
            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity: fadeAnim,
                        transform: [{
                            translateY: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-150, 0]
                            })
                        }]
                    }
                ]}
            >
                <View style={type === 'error' ? styles.toastError : styles.toastSuccess}>
                    <Ionicons
                        name={type === 'error' ? 'alert-circle' : 'checkmark-circle'}
                        size={20}
                        color={type === 'error' ? '#D92D20' : '#2DA44E'}
                    />
                    <View style={styles.toastContent}>
                        <Text style={styles.toastTitle}>{content.text1}</Text>
                        <Text style={styles.toastMessage}>{content.text2}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={ToastManager.hide}
                        hitSlop={{ top: 20, bottom: 20, left: 30, right: 30 }}
                        style={styles.closeButton}
                    >
                        <Ionicons name="close" size={20} color="#1F2328" />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export const showToast = (type: ToastType, title: string, message: string) => {
    ToastManager.show(type, title, message);
};

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        top: 15,
        left: 18,
        right: 18,
        zIndex: 9999,
    },

    toastError: {
        backgroundColor: '#FFFAFA',
        borderWidth: 1,
        borderColor: '#FEE2E2',
        borderRadius: 8,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    toastSuccess: {
        backgroundColor: '#ECFDF3',
        borderWidth: 1,
        borderColor: '#D1FAE5',
        borderRadius: 8,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    toastContent: {
        flex: 1,
        marginLeft: 8,
    },
    toastTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2328',
    },
    toastMessage: {
        fontSize: 14,
        color: '#656D76',
        marginTop: 4,
    },
    closeButton: {
        marginLeft: 16,
    }
});