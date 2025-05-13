import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAccount } from '../context/AccountContext';

const AccountMenu = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const { selectedAccount, setAccount } = useAccount();

    const accounts = [
        'Conta Pessoal',
        'Conta Profissional',
        'Conta de Suporte'
    ];

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Ionicons name="person-circle-outline" size={28} color="#333" />
            </TouchableOpacity>

            <Modal
                visible={menuVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={() => setMenuVisible(false)}
                >
                    <View style={styles.menuContainer}>
                        {accounts.map((account) => (
                            <TouchableOpacity
                                key={account}
                                style={styles.menuItem}
                                onPress={() => {
                                    setAccount(account);
                                    setMenuVisible(false);
                                }}
                            >
                                <Text style={[
                                    styles.menuText,
                                    account === selectedAccount && styles.selectedAccount
                                ]}>
                                    {account}
                                </Text>
                                {account === selectedAccount && (
                                    <Ionicons name="checkmark" size={18} color="#007AFF" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: 16,
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
        width: 200,
        position: 'absolute',
        top: 60,
        right: 16,
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
});

export default AccountMenu;