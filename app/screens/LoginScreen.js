import React, { useState, useContext} from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image    
} from 'react-native'
import { mainStyles, loginStyles } from '@styles/styles'
import MyTextInput from '@components/MyTextInput'
import MyButton from '@components/MyButton'
import color from '@styles/colors'
import { UsuarioContext } from '@context/UsuarioContext'

export default function LoginScreen (props){

    const [login, loginAction] = useContext(UsuarioContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(false)

    return(
        <View style={[mainStyles.container, {padding: 50}]}>
            <StatusBar backgroundColor={color.BLUE} translucent={true}/>
            <View style={loginStyles.logo}>
                <Image source={require('@recursos/images/logoHeineken0.png')}
                style={{ height:200, width:154}}/>
            </View>
            <MyTextInput keyboardType='email-address' placeholder='Correo Electrónico'
            value={email} onChangeText={(email)=> setEmail(email)}/>
            <MyTextInput keyboardType={null} placeholder='Contraseña' bolGone={true}
            secureTextEntry={hidePassword}
            onPress={() => setHidePassword(!hidePassword)}
            value={password} onChangeText={(password)=> setPassword(password)}/>
            <MyButton
                titulo='Iniciar Sesión'
                onPress={()=> iniciarSesion()}
            />
        </View>
    )

    function iniciarSesion(){
        loginAction({
            type:'sign', data:{
                email, password
            }
        })
        goToScreen('Principal')
    }

    function goToScreen(routeName){
        props.navigation.replace(routeName)
    }
}