import React, {useState} from 'react';

import {
  Alert,
  ActivityIndicator,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {connect} from 'react-redux';
import store from '../../redux/store';
import {clientRegistered} from '../../redux/actions';

import CampoNascimento from './CampoNascimento';
import {tela} from '../../utils/general/tela';
import {ajax} from '../../utils/general/ajax';

function TelaRegistro({stateRedux}) {
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [sexo, setSexo] = useState(null);

  const [nascimento, setNascimento] = useState({
    dia: null,
    mesNome: null,
    mesValor: null,
    ano: null,
  });

  const {cliente} = stateRedux;

  function alterarNascimento(date, value) {
    const nasc = Object.assign(nascimento, {});
    if (date !== 'mes') {
      nasc[date] = value;
    } else {
      nasc.mesNome = value.mesNome;
      nasc.mesValor = value.mesValor;
    }
    setNascimento(nasc);
  }

  async function registrar() {
    console.log(nome, sobrenome, sexo);
    console.log(nascimento);

    //informação mínima: nome e sobrenome
    if (!nome.length && !sobrenome.length) {
      Alert.alert('', 'Por favor, registre seu nome e sobrenome');
      setLoading(false);
      return;
    }

    const {dia, mesValor, ano} = nascimento;

    if (dia || ano) {
      // se o usuário preencher algum campo do nascimento, validar

      if (dia < 1 || dia > 31 || !Number(dia)) {
        Alert.alert('Erro', 'Dia de nascimento inválido');
        return;
      }
      if (ano < 1900 || ano > 2021 || !Number(ano)) {
        // corrigir este campo ao passar dos anos
        Alert.alert('Erro', 'Ano de nascimento inválido');
        return;
      }
      if (!mesValor) {
        Alert.alert('Erro', 'Informe seu mês de nascimento');
        return;
      }
    }

    setLoading(true);

    try {
      const info = {
        clienteID: cliente.id,
        nome,
        sobrenome,
        sexo,
        nascimento,
      };

      console.log(info);

      const response = await ajax.POST('registrarCliente', info);

      if (response.ok) {
        await AsyncStorage.setItem(
          '@cliente',
          JSON.stringify(response.cliente),
        );
        store.dispatch(clientRegistered(response.cliente));
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  return (
    <SafeAreaView
      style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
      <ScrollView>
        <Text
          style={{
            fontSize: 24,
            color: '#000',
            fontWeight: 'bold',
            marginBottom: 5,
            marginTop: 20,
            marginLeft: tela.width * 2.5,
          }}>
          Olá, seja bem-vindo!
        </Text>

        <Text
          style={{fontSize: 15, color: '#555', marginLeft: tela.width * 2.5}}>
          Você parece ser novo por aqui...
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#555',
            marginBottom: 30,
            marginLeft: tela.width * 2.5,
          }}>
          Crie agora sua conta MyUrbe.
        </Text>

        <View
          style={{
            paddingLeft: '2.5%',
            marginTop: 5,
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <TextInput
            editable={true}
            maxLength={200}
            placeholder="Nome"
            multiline={false}
            style={{
              height: 45,
              width: '39%',
              padding: tela.width,
              paddingLeft: tela.width * 2.5,
              backgroundColor: '#eee',
              textAlignVertical: 'center',
            }}
            placeholderTextColor="#999"
            onChangeText={(value) => setNome(value)}
            underlineColorAndroid="transparent"
          />

          <TextInput
            editable={true}
            maxLength={200}
            placeholder="Sobrenome"
            multiline={false}
            style={{
              height: 45,
              width: '55%',
              padding: tela.width,
              paddingLeft: tela.width * 2.5,
              marginLeft: '2.5%',
              backgroundColor: '#eee',
              textAlignVertical: 'center',
            }}
            placeholderTextColor="#999"
            onChangeText={(value) => setSobrenome(value)}
            underlineColorAndroid="transparent"
          />
        </View>

        <CampoNascimento
          alterarNascimento={alterarNascimento}
          nascimento={nascimento}
        />

        <View
          style={{
            marginTop: 5,
            padding: tela.width * 2.5,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{width: '42.5%', height: 45, flexDirection: 'row'}}
            onPress={() => setSexo('F')}>
            <View
              style={{
                height: '100%',
                width: '100%',
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Image
                source={
                  sexo === 'F'
                    ? require('../../img/esc1.png')
                    : require('../../img/esc0.png')
                }
                style={{width: tela.width * 5, height: tela.width * 5}}
              />

              <Text style={{marginLeft: '3%'}}>Feminino</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width: '50%', height: 45, flexDirection: 'row'}}
            onPress={() => setSexo('M')}>
            <View
              style={{
                height: '100%',
                width: '100%',
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Image
                source={
                  sexo === 'M'
                    ? require('../../img/esc1.png')
                    : require('../../img/esc0.png')
                }
                style={{width: tela.width * 5, height: tela.width * 5}}
              />
              <Text style={{marginLeft: '3%'}}>Masculino</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 40,
            flex: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 50,
          }}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://myurbe.com/privacidade')}
            style={{
              width: '95%',
              height: 'auto',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{textAlign: 'center', fontSize: 14}}>
              Ao clicar em enviar, você concorda com nossos
              <Text style={{color: '#00f'}}>
                Termos de uso e Política de Privacidade
              </Text>
              .
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => registrar()}
            opacity={0.8}
            style={{
              marginTop: 20,
              backgroundColor: '#08f',
              height: 55,
              width: '40%',
              borderRadius: 10,
              flex: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: '#fff',
                }}>
                Enviar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = ({state}) => {
  return {stateRedux: state};
};

export default connect(mapStateToProps)(TelaRegistro);
