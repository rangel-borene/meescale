import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import AccountMenu from '../components/AccountMenu';
import { useAccount } from '../context/AccountContext';

export default function TabLayout() {
    const { selectedAccount } = useAccount();

    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerTitle: selectedAccount,
                headerTitleStyle: {
                    fontWeight: '600',
                    fontSize: 18,
                    color: '#333',
                },
                headerRight: () => <AccountMenu />,
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 8,
                },
            })}
        >
            <Tabs.Screen
                name="chats"
                options={{
                    title: 'Chats',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbubbles-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Configurações',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}