// app/_layout.tsx
import { Stack } from "expo-router";
import AccountMenu from "./components/AccountMenu";
import { useAccount } from "./context/AccountContext";

export default function RootLayout() {
  const { selectedAccount } = useAccount();
  return (
    <Stack
      screenOptions={({ route }) => ({
        headerRight: () => route.name === 'chats' ? <AccountMenu /> : null,
        headerTitle: route.name === 'chats' ? 'Conversas' : selectedAccount,
        headerShown: route.name === 'chats',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
          color: '#333',
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
        },
      })}
    >
      {/* Mantenha apenas as telas que precisam de configurações específicas */}

      <Stack.Screen
        name="chats"
        options={{
          title: 'Chats',
          headerTitle: 'Conversas',
          // headerBackTitle: 'Voltar'
        }}
      />
    </Stack>
  );
}