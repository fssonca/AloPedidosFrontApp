import React, {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  View,
} from 'react-native';

function VerifyCode({
  numberTel,
  loginVoice,
  alterNumber,
  resendSMS,
  sendTTS,
  verifyLoading,
  timeResend,
  timeTTS,
  verifyCodeAuth,
}) {
  const [verifyCode, setVerifyCode] = useState(false);
  const [codeAuth, setCodeAuth] = useState('');

  function _verifyCode() {
    codeAuth.toString().length === 6 && verifyCodeAuth(codeAuth);
  }

  return (
    <View style={{height: '100%', width: '100%'}}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View
          style={{
            height: '100%',
            width: '100%',
            padding: 15,
            backgroundColor: '#fff',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          {loginVoice ? (
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                color: '#000',
                marginBottom: 10,
              }}>
              Insira o código de verificação enviado via LIGAÇÃO DE VOZ para o
              número {numberTel}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                color: '#000',
                marginBottom: 10,
              }}>
              Insira o código de verificação enviado via SMS para o número{' '}
              {numberTel}
            </Text>
          )}

          <TouchableOpacity
            onPress={() => {
              alterNumber();
            }}
            style={{
              height: 45,
              marginTop: 5,
              marginBottom: 15,
              width: 120,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 16, textAlign: 'center', color: '#f70'}}>
              Alterar número
            </Text>
          </TouchableOpacity>
          <TextInput
            autoFocus
            keyboardType="numeric"
            maxLength={6}
            style={{
              borderColor: '#444',
              borderWidth: 1,
              color: '#555',
              width: 250,
              height: 45,
              textAlign: 'center',
              fontSize: 18,
            }}
            placeholder="- - - - - -"
            placeholderTextColor="#aaa"
            value={codeAuth}
            onChangeText={(text) => {
              setCodeAuth(text);
            }}
          />

          <TouchableOpacity
            onPress={() => {
              _verifyCode();
            }}
            style={
              codeAuth.toString().length < 6
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
            {!verifyLoading ? (
              <Text style={{color: '#fff', fontSize: 14}}>CONFIRMAR</Text>
            ) : (
              <ActivityIndicator size="small" color="#ffffff" />
            )}
          </TouchableOpacity>

          <View
            style={{
              width: '100%',
              height: 50,
              marginTop: 40,
              borderBottomWidth: 2,
              borderBottomColor: '#eee',
              paddingLeft: '5%',
              paddingRight: '5%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                resendSMS();
              }}
              style={{
                height: 40,
                width: '65%',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              {timeResend > 0 ? (
                <Text style={{color: '#999', fontWeight: 'bold', fontSize: 14}}>
                  Reenviar SMS
                </Text>
              ) : (
                <Text style={{color: '#08f', fontWeight: 'bold', fontSize: 14}}>
                  Reenviar SMS
                </Text>
              )}
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                width: '35%',
                height: 40,
              }}>
              {timeResend > 0 && (
                <Text style={{color: '#666', fontSize: 12}}>
                  {timeResend} s
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 50,
              paddingLeft: '5%',
              paddingRight: '5%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                sendTTS();
              }}
              style={{
                height: 40,
                width: '65%',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              {timeTTS > 0 ? (
                <Text style={{color: '#999', fontWeight: 'bold', fontSize: 14}}>
                  Ligação de voz
                </Text>
              ) : (
                <Text style={{color: '#08f', fontWeight: 'bold', fontSize: 14}}>
                  Ligação de voz
                </Text>
              )}
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                width: '35%',
                height: 40,
              }}>
              {timeTTS > 0 && (
                <Text style={{color: '#666', fontSize: 12}}>{timeTTS} s</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default VerifyCode;
