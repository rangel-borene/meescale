import { router, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Text, View } from "react-native";
import AccountMenu from "./components/AccountMenu";
import MenuLeft from "./components/MenuLeft";
import TeamChat from "./components/TeamChat";

export default function ChatsScreen() {

  const navigation = useNavigation();

  const handleAccountChange = (account: string) => {
    console.log("Conta alterada!", account);
    // Você pode colocar qualquer lógica aqui que precise ser executada quando a conta for alterada
  };



  const handleManageAccount = () => {
    router.push('/manageaccount');
  };

  // Adicione estas constantes no início do componente
  // const handleConnection = async (number: string) => {
  //     // Lógica para salvar/recuperar do AsyncStorage
  //     await AsyncStorage.setItem('whatsapp-connection', number);
  // };

  // // E no useEffect inicial
  const loadSavedNumber = async (number: any) => {
    console.log(number);
    // const savedNumber = await AsyncStorage.getItem('whatsapp-connection');
    // if(savedNumber) setSelectedNumber(savedNumber);
    // (number) => console.log('Número selecionado:', number)
  };

  const handleChatPress = () => {
    console.log('open team chat');
  };

  const connectToWhatsApp = () => {
    router.push('/connectwhatsapp');
  }

  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuLeft onConnectionSelect={loadSavedNumber}
          onConnectToWhatsApp={connectToWhatsApp}
        />
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, opacity: mounted ? 1 : 0 }}>
          <TeamChat
            onPress={handleChatPress}
            notificationCount={3}
          />
          <AccountMenu onAccountChange={handleAccountChange} onManageAccount={handleManageAccount} />
        </View>
      )
    });

    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [navigation, mounted]);

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
