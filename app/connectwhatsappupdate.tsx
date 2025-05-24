import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import PrimaryButton from './components/PrimaryButton';

export default function ConnectWhatsAppUpdate() {
    // Estados mantidos iguais
    const [callbackUrl, setCallbackUrl] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [apiToken, setApiToken] = useState<string>('');
    const [phoneNumberId, setPhoneNumberId] = useState<string>('605865722607740');
    const [wabaId, setWabaId] = useState<string>('1378836803468391');
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        console.log({
            callbackUrl,
            token,
            apiToken,
            phoneNumberId,
            wabaId,
        });


        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={[styles.label, styles.firstLabel]}>Webhook URL de Callback:</Text>
                <TextInput
                    style={styles.input}
                    value={callbackUrl}
                    onChangeText={setCallbackUrl}
                    placeholder="Digite a URL de callback"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Token:</Text>
                <TextInput
                    style={styles.input}
                    value={token}
                    onChangeText={setToken}
                    placeholder="Digite o token"
                    secureTextEntry
                />

                <Text style={styles.label}>Token de acesso da API:</Text>
                <TextInput
                    style={styles.input}
                    value={apiToken}
                    onChangeText={setApiToken}
                    placeholder="Digite o token de acesso da API"
                    secureTextEntry
                />

                <Text style={styles.label}>Identificação do número de telefone:</Text>
                <TextInput
                    style={styles.input}
                    value={phoneNumberId}
                    onChangeText={setPhoneNumberId}
                    placeholder="Digite o ID do número de telefone"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Identificação da conta do WhatsApp Business:</Text>
                <TextInput
                    style={styles.input}
                    value={wabaId}
                    onChangeText={setWabaId}
                    placeholder="Digite o ID da conta WABA"
                    keyboardType="numeric"
                />
                <View style={{ maxWidth: 500, width: '100%', alignItems: 'flex-end' }}>
                    <PrimaryButton
                        title="Salvar"
                        onPress={handleSave}
                        loading={loading}
                        disabled={loading}
                        width={160}
                    />
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        padding: 20,
        flexGrow: 1, // Permite expansão vertical
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginTop: 16,
        marginBottom: 8,
        width: '100%',
        maxWidth: 500,
        alignSelf: 'flex-start',
    },
    firstLabel: {
        marginTop: 0,
    },
    input: {
        width: '100%',
        maxWidth: 500,
        height: 40, // Altura fixa
        minHeight: 40, // Garante altura mínima
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        marginBottom: 8,
    },


});