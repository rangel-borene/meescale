// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {

  return (
    <Stack
      screenOptions={({ route }) => ({
        // headerRight: () => route.name === 'chats' ? <AccountMenu /> : null,
        // headerTitle: 'Conversas',
        // headerShown: route.name === 'chats',

        headerShown: false,
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
          headerShown: true
          // headerBackTitle: 'Voltar'
        }}
      />
    </Stack>
  );
}