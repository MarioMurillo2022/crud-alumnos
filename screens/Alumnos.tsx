import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/csCrud';

export default function Alumnos() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [alumnos, setAlumnos] = useState([]);
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetchAlumnos();
    }, []);

    const fetchAlumnos = async () => {
        try {
            const response = await fetch('http://localhost:3001/alumnos');
            const data = await response.json();
            setAlumnos(data);
        } catch (error) {
            console.error(error);
        }
    };

    const createAlumno = async () => {
        try {
            const response = await fetch('http://localhost:3001/alumnos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, apellido }),
            });
            const newAlumno = await response.json();
            setAlumnos([...alumnos, newAlumno]);
            setNombre('');
            setApellido('');
        } catch (error) {
            console.error(error);
        }
    };

    const editarAlumno = async () => {
        try {
            if (!alumnoSeleccionado) {
                console.error('Debe seleccionar un alumno para editar.');
                return;
            }

            await fetch(`http://localhost:3001/alumnos/${alumnoSeleccionado.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, apellido }),
            });

            const response = await fetch('http://localhost:3001/alumnos');
            const data = await response.json();
            setAlumnos(data);

            setNombre('');
            setApellido('');
            setAlumnoSeleccionado(null);
        } catch (error) {
            console.error(error);
        }
    };

    const seleccionarAlumno = (alumno) => {
        setAlumnoSeleccionado(alumno);
        setNombre(alumno.nombre);
        setApellido(alumno.apellido);
    };

    const borrarAlumno = async (id) => {
        try {
            await fetch(`http://localhost:3001/alumnos/${id}`, {
                method: 'DELETE',
            });
            setAlumnos(alumnos.filter(alumno => alumno.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const navigateToInfoAlumnos = () => {
        navigation.navigate('InfoAlumnos');
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={apellido}
                onChangeText={setApellido}
            />
            <Button title="Crear Alumno" onPress={createAlumno} color='#004b23' />
            <Text>.</Text>
            <Button title="Actualizar Alumno" onPress={editarAlumno} color='#008000' />

            <FlatList
                data={alumnos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{`${item.nombre} ${item.apellido}`}</Text>
                        <Button title="Seleccionar" onPress={() => seleccionarAlumno(item)} color='#003049' />
                        <Button title="Eliminar Alumno" onPress={() => borrarAlumno(item.id)} color='#d62828' />
                    </View>
                )}
            />

            <View style={styles.buttonContainer}>
                <Text>.</Text>
                <Button title="Ver Información de Alumnos" onPress={navigateToInfoAlumnos} color='#0a9396' />
            </View>
        </SafeAreaView>
    );
}