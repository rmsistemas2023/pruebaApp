import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MyButton from './MyButton';

export default function NotificacionScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Pantalla Usuarios</Text>
            {/*<MyButton nombre='Ir a Home' destino='Home'/>*/}
        </View>
    );
}