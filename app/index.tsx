import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, InteractionManager, View } from "react-native";


export default function Index() {

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      let teste = true;
      if (teste)
        router.replace('/login')
      else
        router.replace('/chats'); 
    });
  }, []);

  return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
  </View>);
}
