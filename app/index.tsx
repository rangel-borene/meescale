import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, InteractionManager, View } from "react-native";

export default function Index() {

  useEffect(() => {
    console.log('entrou')
    InteractionManager.runAfterInteractions(async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        router.replace('/login')
      }
      else {
        router.replace('/chats');
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>);
}
