import { StyleSheet } from 'react-native';

export const Colors = {
  primary: '#007AFF',
  background: '#FFFFFF',
  text: '#1A1A1A',
};

export const GlobalStyles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
});