import { StyleSheet, Text, View } from 'react-native';

export default function ConnectWhatsApp() {
    return (
        <View style={styles.container}>
            <Text>Connect WhatsApp</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
