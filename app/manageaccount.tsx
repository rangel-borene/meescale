import { StyleSheet, Text, View } from 'react-native';

export default function ManageAccount() {
    return (
        <View style={styles.container}>
            <Text>Gerenciar esta Conta</Text>
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
