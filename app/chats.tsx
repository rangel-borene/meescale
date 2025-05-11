import { Text, View } from "react-native";

export default function Chats() {

  // useEffect(() => {
  //   if (typeof document !== 'undefined')
  //     document.title = 'Chats';
  // }, []);


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
