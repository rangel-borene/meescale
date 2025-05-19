import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface Props {
    onAccountChange: (account: string) => void;
    onManageAccount: () => void;
}

const AccountMenu = ({ onAccountChange, onManageAccount }: Props) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedAccount, setAccount] = useState('');
    const [accounts, setAccounts] = useState<string[]>([]);

    useEffect(() => {
        const loadPermissions = async () => {
            try {
                const storeAccount = await AsyncStorage.getItem('account');
                setAccount(storeAccount!);
                const storedPermissions = await AsyncStorage.getItem('permissions');
                if (storedPermissions) {
                    const parsedPermissions = JSON.parse(storedPermissions);
                    const uniqueAccounts = [...new Set(parsedPermissions.map((p: any) => p.account))].filter(Boolean) as string[];
                    setAccounts(uniqueAccounts);
                }
            } catch (error) {
                console.error('Erro ao carregar permissões:', error);
            }
        };
        loadPermissions();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Ionicons name="person-circle-outline" size={28} color="#333" />
            </TouchableOpacity>
            <Modal visible={menuVisible} transparent animationType="fade" onRequestClose={() => setMenuVisible(false)} >
                <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setMenuVisible(false)} >
                    <View style={styles.menuContainer}>
                        {accounts.map((account) => (
                            <TouchableOpacity key={account} style={styles.menuItem} onPress={async () => {
                                await AsyncStorage.setItem('account', account);
                                setAccount(account);
                                setMenuVisible(false);
                                onAccountChange(account);
                            }} >
                                <Text style={[styles.menuText, account === selectedAccount && styles.selectedAccount]}>
                                    {account}
                                </Text>
                                {account === selectedAccount && (
                                    <Ionicons name="checkmark" size={18} color="#007AFF" />
                                )}
                            </TouchableOpacity>
                        ))}

                        <View style={styles.separator} />

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setMenuVisible(false);
                                onManageAccount();
                            }}
                        >
                            <Text style={[styles.menuText]}>Gerenciar esta Conta</Text>
                        </TouchableOpacity>
                        <View style={styles.separator} />

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setMenuVisible(false);
                                onManageAccount();
                            }}
                        >
                            <Text style={[styles.menuText]}>Criar uma nova Conta</Text>
                        </TouchableOpacity>
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
    separator: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 8,
    },
});

export default AccountMenu;