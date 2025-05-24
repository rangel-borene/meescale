import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import AccountMenu from "./components/AccountMenu";
import TeamChat from "./components/TeamChat";
import WhatsAppMenu from "./components/WhatsAppMenu";

export default function ChatsScreen() {

  const navigation = useNavigation();

  const [whatsappAccounts, setWhatsappAccounts] = useState([
    { id: '1', name: 'Contato Principal', number: '+55 11 98765-4321' },
    { id: '2', name: 'Suporte Técnico', number: '+55 21 91234-5678' },
    { id: '3', name: 'Vendas Online', number: '+55 31 99876-5432' },
  ]);

  const addNewAccount = () => {
    const newItem = {
      id: String(whatsappAccounts.length + 1),
      name: `Nova Conta ${whatsappAccounts.length + 1}`,
      number: '+55 00 00000-0000'
    };
    setWhatsappAccounts([...whatsappAccounts, newItem]);
  };

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

  const connectWhatsAppCreate = () => {
    router.push('/connectwhatsappcreate');
  }

  const connectWhatsAppUpdate = () => {
    router.push('/connectwhatsappupdate');
  }

  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <WhatsAppMenu onConnectionSelect={loadSavedNumber}
          onConnectWhatsAppCreate={connectWhatsAppCreate}
          onConnectWhatsAppUpdate={connectWhatsAppUpdate}
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
    <View style={styles.container}>

      <FlatList
        data={whatsappAccounts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemNumber}>{item.number}</Text>
            </View>
            <Pressable style={styles.menuButton}>
              <Ionicons name="ellipsis-vertical" size={20} color="#666" />
            </Pressable>
          </View>
        )}
      />

      {/* Botão Flutuante */}
      <Pressable style={styles.fab} onPress={addNewAccount}>
        <Ionicons name="add" size={28} color="white" />
      </Pressable>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 24,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 80, // Espaço para o FAB
  },
  listItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  itemNumber: {
    fontSize: 14,
    color: '#666',
  },
  menuButton: {
    padding: 8,
    marginLeft: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    backgroundColor: '#25D366', // Cor verde do WhatsApp
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
});