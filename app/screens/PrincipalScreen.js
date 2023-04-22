// In App.js in a new project

import React, { useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StatusBar, Alert, BackHandler, Image } from 'react-native'
import { mainStyles } from '@styles/styles'
import color from '@styles/colors'
import MyButton from '@components/MyButton'
import { UsuarioContext } from '@context/UsuarioContext'
import { navigationRef } from '../../MyScreens/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/FontAwesome"
import s from '../../MyDrawer/style'

import HomeScreen from '../../MyScreens/HomeScreen'
import PerfilScreen from '../../MyScreens/PerfilScreen'
import NotificacionScreen from '../../MyScreens/NotificacionScreen'

function useBackButton(handler){
    useEffect(()=> {
        BackHandler.addEventListener("hardwareBackPress", handler)

        return() => {
            console.log('hardwareBackPress Close')
            BackHandler.removeEventListener("hardwareBackPress", handler)
        }
    }, [handler])
}

export default function PrincipalScreen(props) {

    useBackButton(desconectarse)
    const [login, loginAction] = useContext(UsuarioContext)
    const Drawer = createDrawerNavigator();
    return (
        <NavigationContainer ref={navigationRef}>
            <Drawer.Navigator drawerContent={(props)=> <Menu {...props}/>}>
                <Drawer.Screen name="Inicio" component={HomeScreen} />
                <Drawer.Screen name="Perfil" component={PerfilScreen} />
                <Drawer.Screen name="Usuarios" component={NotificacionScreen} />
            </Drawer.Navigator>
            <MyButton style={{width: 200, marginTop: 0, marginLeft: 100, alignItems: 'center',backgroundColor: color.BLUE,borderRadius: 50}}
                 titulo='Cerrar Sesión'
                onPress={()=> desconectarse()}
            />
        </NavigationContainer>
    )

    function goToScreen(routeName){
        props.navigation.navigate(routeName)
    }

    function desconectarse(){

        Alert.alert(
            "Salir",
            "¿Está seguro que \ndesea cerrar sessión",
            [
                {
                    text:"Si", onPress: ()=>{
                        loginAction({
                            type:'sign-out',
                            data:{}
                        })
                        goToScreen('Login')
                    }
                },
                {
                    text:"No", onPress: ()=>{}, style:'cancel'
                }
            ]
        )
    }

}

function DrawerMenu(props){
    return(
        <TouchableOpacity onPress={props.navigation}>
            <View style={s.menuContainer}>
                <View style={s.iconoContainer}>
                    <Icon size={17} name={props.iconName}/>
                </View>
                <View style={s.tituloContainer}>
                    <Text style={s.tituloTxt}>{props.titleName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

function Menu(props){
    return(
        <View style={s.container}>
            <View style={s.bgContainer}>
                <TouchableOpacity>
                    <View style={s.userContainer}>
                        <Image style={s.userImagen} source={ require('../../MyDrawer/logoHeineken0.png')}/>
                        {/*<View style={s.camaraContainer}>
                            <Image style={s.camaraIcon} source={require('./photo-camera.png')}/>
                        </View>*/}
                    </View>
                    <View style={s.userNombre}>
                        {/*<Text style={s.userTitulo}>BrainApps</Text>
                        <Text style={s.userSubTitulo}>Ver Perfil</Text>*/}
                    </View>
                </TouchableOpacity>
            </View>
             {/*<DrawerMenu iconName='home' titleName='Inicio' navigation={()=>props.navigation.navigate('Home')}/>
            <DrawerMenu iconName='user' titleName='Perfil' navigation={()=>props.navigation.navigate('Perfil')}/>
            <DrawerMenu iconName='bell' titleName='Usuarios' navigation={()=>props.navigation.navigate('Notificacion')}/>*/}
            <DrawerMenu titleName='Inicio' navigation={()=>props.navigation.navigate('Inicio')}/>
            <DrawerMenu titleName='Perfil' navigation={()=>props.navigation.navigate('Perfil')}/>
            <DrawerMenu titleName='Usuarios' navigation={()=>props.navigation.navigate('Usuarios')}/>
        </View>
    )
}

//const Stack = createNativeStackNavigator();
//export default MyDrawer