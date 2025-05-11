// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right', // Adicione transições suaves
        contentStyle: {
          backgroundColor: '#ffffff' // Cor de fundo padrão
        }
      }}
    >
      {/* Mantenha apenas as telas que precisam de configurações específicas */}
      <Stack.Screen
        name="chats"
        options={{
          title: 'Chatsssss',
          headerShown: true,
          headerTitle: 'Conversas',
          // headerBackTitle: 'Voltar'
        }}
      />
    </Stack>
  );
}