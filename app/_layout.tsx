import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function RootLayout() {
  // const pathname = usePathname(); // Captura a rota atual

  // const handleChatPress = () => {
  //   console.log('clicou');
  //   // navigation.navigate('ChatScreen');
  // };

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
            color: '#333',
          }
        }}
      >
        <Stack.Screen
          name="login" // Garanta que esta tela existe
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="chats"
          options={{
            title: 'Chats',
            headerTitleAlign: 'center',
            headerShown: true
          }}
        />
      </Stack>

      {/* {pathname !== '/login' && (
        <TeamChat
          onPress={handleChatPress}
          notificationCount={3}
        />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});