import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import AccountMenu from "./components/AccountMenu";
import MenuLeft from "./components/MenuLeft";

export default function ChatsScreen() {

  const navigation = useNavigation();

  const handleAccountChange = (account: string) => {
    console.log("Conta alterada!", account);
    // Você pode colocar qualquer lógica aqui que precise ser executada quando a conta for alterada
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AccountMenu onAccountChange={handleAccountChange} />,

      headerLeft: () => (
        <MenuLeft onConnectionSelect={loadSavedNumber}
          onConnectToWhatsApp={() => console.log('Iniciar conexão com WhatsApp')}
        />
      ),
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
