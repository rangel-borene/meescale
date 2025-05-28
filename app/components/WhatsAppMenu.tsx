import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    onConnectionSelect: (number: string) => void;
    onConnectWhatsAppCreate: () => void;
    onConnectWhatsAppUpdate: () => void;

}

const WhatsAppMenu = ({ onConnectionSelect, onConnectWhatsAppCreate, onConnectWhatsAppUpdate }: Props) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('');
    const [connections, setConnections] = useState<string[]>([]);



    useEffect(() => {
        const loadConnections = async () => {
            try {
                const permissionsString = await AsyncStorage.getItem('permissions');
                if (permissionsString) {
                    const permissions = JSON.parse(permissionsString);

                    // Extrai os números de telefone das conexões do WhatsApp
                    const whatsappNumbers = permissions[0]?.whatsapp_connections?.map(
                        (connection: any) => connection.display_phone_number
                    ) || [];

                    setConnections(whatsappNumbers);

                    if (whatsappNumbers.length > 0) {
                        setSelectedNumber(whatsappNumbers[0]);
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar conexões:', error);
            }
        };

        loadConnections();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Ionicons name="logo-whatsapp" size={28} color="#333" />
            </TouchableOpacity>

            <Modal visible={menuVisible} transparent animationType="fade" onRequestClose={() => setMenuVisible(false)}>
                <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setMenuVisible(false)} >
                    <View style={styles.menuContainer}>
                        <ScrollView style={styles.menuList}>
                            {connections.map((number) => (
                                <TouchableOpacity key={number} style={styles.menuItem} onPress={() => { setSelectedNumber(number); setMenuVisible(false); onConnectionSelect(number); }} >
                                    <Text style={[styles.menuText, number === selectedNumber && styles.selectedAccount]}>
                                        {number}
                                    </Text>
                                    {number === selectedNumber && (
                                        <Ionicons name="checkmark" size={18} color="#007AFF" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        {connections.length > 0 && (
                            <>
                                <View style={styles.separator} />
                                <TouchableOpacity
                                    style={styles.connectButton} onPress={() => { setMenuVisible(false); onConnectWhatsAppUpdate(); }} >
                                    <Text style={styles.connectButtonText}>Alterar este WhatsApp</Text>
                                </TouchableOpacity>

                                <View style={styles.separator} />
                            </>)}
                        <TouchableOpacity style={styles.connectButton} onPress={() => { setMenuVisible(false); onConnectWhatsAppCreate(); }} >
                            <Text style={styles.connectButtonText}>Adicionar WhatsApp</Text>
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
    menuList: {
        maxHeight: 200,
        width: '100%',
    }
});

export default WhatsAppMenu;