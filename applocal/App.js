import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
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
        alert('Erro ao buscar CEP, verifique se o CEP está digitado corretamente');
      });
  }

  return (
    <View style={styles.container}>
      <Text
        style={styles.texto}
      >
        Digite o CEP desejado
      </Text>

      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Dig. cep'
        onChangeText={(texto)=>{setCep(texto)}}
      />

      <Pressable
        onPress={() => buscarCep(cep)}
        style={styles.botao}
      >
        <Text style={styles.textobotao}>Buscar</Text>
      </Pressable>

      <Text
        style={styles.verificacep}
      >
        {cep}
      </Text>

      {
        resultado && Object.keys(resultado).length > 0 ? (
          <View style={styles.ceps}>
            <Text style={{fontWeight: 'bold'}}>Aqui estão os dados do CEP digitado:</Text>
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
    backgroundColor: '#512a75ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ceps: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    margin: '10px',
    padding: '20px',
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },

  texto: {
    fontSize: 25,
    marginBottom: 20,
    padding: '15px',
    border: '1px solid white',
    borderRadius: '10px',
    fontWeight: 'bold',
    color: '#fff',
  },

  verificacep: {
    backgroundColor:'#000000ff',
    margin:'10px',
    padding: '10px',
    borderRadius: '10px',
    color: '#fff'
  },

  botao: {
    backgroundColor: '#000',
    borderRadius: '20px',
    padding: '15px',
    paddingLeft: '20px',
    paddingRight: '20px'
  },

  textobotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
})
