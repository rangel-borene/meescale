import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    onConnectionSelect: (number: string) => void;
    onConnectToWhatsApp: () => void;
}

const WhatsAppMenu = ({ onConnectionSelect, onConnectToWhatsApp }: Props) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('');
    const [connections, setConnections] = useState<string[]>([]);

    // Mock inicial com 3 números de exemplo
    useEffect(() => {
        const mockConnections = [
            '+55 11 99999-9999',
            '+55 11 88888-8888',
            '+55 11 77777-7777'
        ];
        setConnections(mockConnections);
        setSelectedNumber(mockConnections[0]);
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Ionicons name="logo-whatsapp" size={28} color="#333" />
            </TouchableOpacity>

            <Modal visible={menuVisible} transparent animationType="fade" onRequestClose={() => setMenuVisible(false)}>
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={() => setMenuVisible(false)}
                >
                    <View style={styles.menuContainer}>
                        {connections.map((number) => (
                            <TouchableOpacity
                                key={number}
                                style={styles.menuItem}
                                onPress={() => {
                                    setSelectedNumber(number);
                                    setMenuVisible(false);
                                    onConnectionSelect(number);
                                }}
                            >
                                <Text style={[styles.menuText, number === selectedNumber && styles.selectedAccount]}>
                                    {number}
                                </Text>
                                {number === selectedNumber && (
                                    <Ionicons name="checkmark" size={18} color="#007AFF" />
                                )}
                            </TouchableOpacity>
                        ))}

                        <View style={styles.separator} />

                        <TouchableOpacity
                            style={styles.connectButton}
                            onPress={() => {
                                setMenuVisible(false);
                                onConnectToWhatsApp();
                            }}
                        >
                            {/* <Ionicons name="logo-whatsapp" size={18} color="#25D366" /> */}
                            <Text style={styles.connectButtonText}>Gerenciar este WhatsApp</Text>
                        </TouchableOpacity>


                        <View style={styles.separator} />

                        <TouchableOpacity
                            style={styles.connectButton}
                            onPress={() => {
                                setMenuVisible(false);
                                onConnectToWhatsApp();
                            }}
                        >
                            {/* <Ionicons name="logo-whatsapp" size={18} color="#25D366" /> */}
                            <Text style={styles.connectButtonText}>Conectar um novo WhatsApp</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 16,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 8,
        width: 240,
        position: 'absolute',
        top: 60,
        left: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    menuText: {
        fontSize: 16,
        color: '#333',
    },
    selectedAccount: {
        fontWeight: '600',
        color: '#007AFF',
    },
    separator: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 8,
    },
    connectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    connectButtonText: {
        fontSize: 16,
        color: '#333',
    },
});

export default WhatsAppMenu;