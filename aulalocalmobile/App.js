import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, { useState} from 'react'; 

export default function App() {

  const [cep, setCep] = useState('');

  const [resultado, setResultado] = useState({});

  const buscarCep = (xcep) => {

    let url = `https://viacep.com.br/ws/${xcep}/json/`;
    fetch(url)
      .then(response => {return response.json()})
      .then(data => {
        if (data.erro) {
          alert('CEP não encontrado');
        }
        else {
          console.log(data);
          setResultado(data);     
        }   
      })

      .catch(error => {
        console.error('Erro ao buscar CEP:', error);
        alert('Erro ao buscar CEP');
      });
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 20
        }}
      >
        Digite seu CEP
      </Text>

      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: 200,
          marginBottom: 20,
          paddingHorizontal: 10
        }}
        keyboardType='numeric'
        placeholder='Dig. cep'
        onChangeText={(texto)=>{setCep(texto)}}
      />

      <Button
        title='Buscar'
        onPress={() => buscarCep(cep)}
      />

      <Text>{cep}</Text>

      {
        resultado && Object.keys(resultado).length > 0 ? (
          <View style={{ marginTop: 20 }}>
          <Text>CEP: {resultado.cep}</Text>
          <Text>Logradouro: {resultado.logradouro}</Text>
          <Text>Bairro: {resultado.bairro}</Text>
          <Text>Cidade: {resultado.localidade}</Text>
          <Text>Estado: {resultado.uf}</Text>
          </View>
        ) : null
      }

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


})
