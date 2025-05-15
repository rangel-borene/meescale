import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import AccountMenu from "./components/AccountMenu";

export default function ChatsScreen() {

  const navigation = useNavigation();

  const handleAccountChange = (account: string) => {
    console.log("Conta alterada!", account);
    // Você pode colocar qualquer lógica aqui que precise ser executada quando a conta for alterada
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AccountMenu onAccountChange={handleAccountChange} />,
    });
  }, [navigation]);


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Chats</Text>
    </View>
  );
}
