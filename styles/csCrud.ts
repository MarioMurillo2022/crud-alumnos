import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    button: {
        backgroundColor: '#d00000',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 12,
    },
    buttonContainer: {
        paddingVertical: 10,
        margin: 5
    },
});