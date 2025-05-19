import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function RootLayout() {

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
            color: '#333'
          }
        }}
      >
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="chats"
          options={{
            title: 'Chats',
          }}
        />
        <Stack.Screen
          name="managewhatsapp"
          options={{
            title: 'Gerenciar este WhatsApp',
          }}
        />
        <Stack.Screen
          name="manageaccount"
          options={{
            title: 'Gerenciar esta Conta',
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});