import React, {useState} from 'react'
import { TextInput, View, Text, TouchableOpacity, Vibration, Pressable, Keyboard } from 'react-native'
import ResultImc from './ResultImc'
import styles from './style'

export default function Form() {

const [height, setHeight] = React.useState(null)
const [weight, setWeight] = useState(null) 
const [messageImc, setMessageImc] = useState('Preencha o peso e a altura') 
const [imc, setImc] = useState(null)
const [textButton, setTextButton] = useState('Calcular')
const [errorMessage, setErrorMessage] = useState(null)

function imcCalculator() {
    let heightFormat = height.replace(',','.')
    let weightFormat = weight.replace(',','.')
    return setImc((weightFormat/(heightFormat*heightFormat)).toFixed(2))
}

function verificationImc() {
    if(imc == null) {
        setErrorMessage('Campo Obrigatório*')
        Vibration.vibrate()
    }
}

function validationImc() {
    if(weight != null && height != null) {
        imcCalculator()
        setHeight(null)
        setWeight(null)
        setMessageImc('Seu IMC é igual a: ')
        setTextButton('Calcular Novamente')
        setErrorMessage(null)
        return
    }
    setImc(null)
    setTextButton('Calcular')
    setMessageImc('Preencha o peso e a altura')
    verificationImc()
}

    return(
        <Pressable
            onPress={Keyboard.dismiss}
            style={styles.formContext}
        >
            <View style={styles.form}>

                <Text style={styles.formLabel}>Altura</Text>
                <Text style = {styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                    onChangeText={setHeight}
                    value={height}
                    placeholder='Ex. 1.75'
                    keyboardType='numeric'
                    style={styles.input}
                />

                <Text style={styles.formLabel}>Peso</Text>
                <Text style = {styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                    onChangeText={setWeight}
                    value={weight}
                    placeholder='Ex. 75.365'
                    keyboardType='numeric'
                    style={styles.input}
                />

                <TouchableOpacity
                    onPress={() => {validationImc()}}
                    style={styles.buttonCalculator}
                >
                    <Text style={styles.textButtonCalculator}> {textButton} </Text>
                </TouchableOpacity>

            </View>

            <ResultImc 
                messageResultImc={messageImc}
                resultImc={imc}
            />

        </Pressable>
    );
}