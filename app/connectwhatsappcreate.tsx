import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { isAxiosError } from 'axios';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    View
} from 'react-native';
import PrimaryButton from './components/PrimaryButton';
import { showToast, Toast } from './components/Toast';

const api = axios.create({
    baseURL: 'https://meescale.com', // Altere para sua URL
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
    }
});


export default function ConnectWhatsAppCreate() {
    const [apiToken, setApiToken] = useState('EAAVhfkYXoaMBO53UJGLZA0F7A1ZCJypRJOXW5csY4JK4BNlfyrU9Fdw6kx5ER8WIwSa1FQBYEOuCMrXLBuyHntihTd8iblION5B0kXxCQEhSOupqtxjE2SqzYwh6LsvvZC5YZBVMxBHZCTYpmZAruUY5N1vaNHUnYXPtU0jLXA2HS9oODZBW28LUOmQG1Jp1t1ckgZDZD');
    // const [displayPhoneNumber, setDisplayPhoneNumber] = useState('15556353905');
    // const [phoneNumberId, setPhoneNumberId] = useState('605865722607740');
    const [whatsappBusinessId, setWhatsappBusinessId] = useState('1378836803468391');
    const [loading, setLoading] = useState(false);

    const validateFields = () => {
        if (!apiToken || !whatsappBusinessId) {
            showToast('error', 'Campos obrigatórios', 'Preencha todos os campos');

            return false;
        }
        return true;
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            if (!validateFields()) return;

            const authToken = await AsyncStorage.getItem('token');

            const response = await api.post('/whatsapp-create', {
                apiToken, //EAAVhfkYXoaMBO53UJGLZA0F7A1ZCJypRJOXW5csY4JK4BNlfyrU9Fdw6kx5ER8WIwSa1FQBYEOuCMrXLBuyHntihTd8iblION5B0kXxCQEhSOupqtxjE2SqzYwh6LsvvZC5YZBVMxBHZCTYpmZAruUY5N1vaNHUnYXPtU0jLXA2HS9oODZBW28LUOmQG1Jp1t1ckgZDZD token
                whatsappBusinessId //1378836803468391 whatsapp_business_id
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            });

            if (response.data.success) {
                Alert.alert('Sucesso', 'Configurações salvas com sucesso!');
                // Limpar formulário se necessário
                // setCallbackUrl('');
                // ... outros states
                showToast('success', 'Sucesso!', 'Operação concluída com sucesso');
            }

        } catch (error) {
            const message = isAxiosError(error)
                ? error.response?.data?.message || 'Erro ao salvar configurações'
                : 'Erro desconhecido';

            showToast('error', 'Erro!', message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                {/* {error ? <Text style={styles.errorText}>{error}</Text> : null} */}

                <FormField
                    label="Token de acesso da API:"
                    value={apiToken}
                    onChange={setApiToken}
                    loading={loading}
                    placeholder="Digite o token de acesso da API"
                />

                <FormField
                    label="ID da conta WhatsApp Business:"
                    value={whatsappBusinessId}
                    onChange={setWhatsappBusinessId}
                    loading={loading}
                    placeholder="Digite o ID da conta WABA"
                    keyboardType="numeric"
                />

                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        title={"Salvar"}
                        onPress={handleSave} // Restaure o onPress original
                        disabled={loading}
                        loading={loading}
                        width={160}
                    />
                </View>
            </ScrollView>
            <Toast />
        </View>
    );
}

interface FormFieldProps extends Omit<TextInputProps, 'onChange'> { // Remove o onChange original
    label: string;
    value: string;
    onChange: (text: string) => void;
    loading?: boolean;
    inputStyle?: StyleProp<TextStyle>;
}

const FormField = ({ label, value, onChange, loading = false, inputStyle, ...props }: FormFieldProps) => (
    <>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={[styles.input]}
            value={value}
            onChangeText={onChange}
            editable={!loading}
            placeholderTextColor="#999"
            {...props}
        />
    </>
);

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
        // maxWidth: 500,
        alignSelf: 'flex-start',
    },
    firstLabel: {
        marginTop: 0,
    },
    input: {
        width: '100%',
        // maxWidth: 500,
        height: 40, // Altura fixa
        minHeight: 40, // Garante altura mínima
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        marginBottom: 8,
    },
    errorText: {
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 14,
    },

    buttonContainer: {
        // maxWidth: 500,
        marginTop: 5, // Reduza este valor para compensar
        alignItems: 'flex-end',
    },


});

