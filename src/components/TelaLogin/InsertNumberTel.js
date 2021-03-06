import React, {useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

function InsertNumberTel({codeLoading, sendSMS}) {
  const [numberTel, setNumberTel] = useState('');

  function validNumberTel() {
    let numbers = numberTel.replace(/\D/g, '');
    return {valid: !(numbers.length < 11), numbers};
  }

  function preSendSMS() {
    if (!validNumberTel().valid) {
      Alert.alert('', 'Insira um número válido');
      return;
    }
    sendSMS(validNumberTel().numbers);
  }

  return (
    <View style={{height: '100%', width: '100%', backgroundColor: '#eee'}}>
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          padding: 15,
          backgroundColor: '#fff',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#555',
            marginBottom: 15,
          }}>
          Insira seu número
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: '#000',
            marginBottom: 15,
          }}>
          O MyUrbe enviará um SMS para confirmar seu número de telefone.
        </Text>
        <TextInputMask
          autoFocus
          style={{
            borderColor: '#444',
            color: '#555',
            borderWidth: 1,
            width: 250,
            height: 45,
            textAlign: 'center',
            fontSize: 18,
          }}
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
          placeholder="(- -) - - - - -  - - - -"
          placeholderTextColor="#aaa"
          value={numberTel}
          onChangeText={(text) => {
            setNumberTel(text);
          }}
        />

        <TouchableOpacity
          onPress={() => {
            preSendSMS();
          }}
          style={
            !validNumberTel().valid
              ? {
                  height: 45,
                  marginTop: 30,
                  width: 120,
                  backgroundColor: '#999',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }
              : {
                  height: 45,
                  marginTop: 30,
                  width: 120,
                  backgroundColor: '#08f',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }
          }>
          {!codeLoading ? (
            <Text style={{color: '#fff', fontSize: 15}}>AVANÇAR</Text>
          ) : (
            <ActivityIndicator size="small" color="#ffffff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default InsertNumberTel;
