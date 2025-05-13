// app/_layout.tsx
import { Stack } from "expo-router";
import AccountMenu from "./components/AccountMenu";
import { useAccount } from "./context/AccountContext";

export default function RootLayout() {
  const { selectedAccount } = useAccount();
  return (
    <Stack
      // screenOptions={{
      //   headerShown: false,
      //   animation: 'slide_from_right', // Adicione transições suaves
      //   contentStyle: {
      //     backgroundColor: '#ffffff' // Cor de fundo padrão
      //   }
      // }}
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
      {/* Mantenha apenas as telas que precisam de configurações específicas */}
      <Stack.Screen
        name="chats"
        options={{
          title: 'Chats',
          headerShown: true,
          headerTitle: 'Conversas',
          // headerBackTitle: 'Voltar'
        }}
      />
    </Stack>
  );
}