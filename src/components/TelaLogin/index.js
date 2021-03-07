import React, {useState, useRef, useEffect} from 'react';
import {Alert} from 'react-native';

import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import VerifyCode from './VerifyCode';
import InsertNumberTel from './InsertNumberTel';
import {loginSuccess} from '../../utils/login/loginSuccess';
import store from '../../redux/store';
import {clientRegistered} from '../../redux/actions';

let tokenFCM = null;

const Login = () => {
  const [codeLoading, setCodeLoading] = useState(false);
  const [numberTel, setNumberTel] = useState('99982093469');
  const [confirmResult, setConfirmResult] = useState(null);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [timeResend, setTimeResend] = useState(20);
  const [timeTTS, setTimeTTS] = useState(45);
  const [loginVoice, setLoginVoice] = useState(false);

  const timeoutRef = useRef(null); // REF TO KEEP TRACK OF THE TIMEOUT

  function sendSMS(t) {
    setNumberTel(t);

    if (codeLoading) {
      return;
    }

    setCodeLoading(true);

    auth()
      .signInWithPhoneNumber('+55' + t)
      .then((confirmResult) => {
        setConfirmResult(confirmResult);
        setCodeLoading(false);
        cronosLogin();
        console.log('confirmResult');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          'Erro',
          'Verifique sua conexão à Internet ou tente novamente mais tarde',
        );
        setCodeLoading(false);
      });
  }

  function resendSMS() {
    if (!validNumberTel().valid) {
      Alert.alert('', 'Insira um número válido');
      return;
    }
    if (timeResend > 0) {
      return;
    }
    auth()
      .signInWithPhoneNumber('+55' + numberTel)
      .then((confirmResult) => {
        setConfirmResult(confirmResult);
        setCodeLoading(false);
        cronosLogin();
      })
      .catch((error) => {
        setCodeLoading(false);
        Alert.alert('Desculpe, ocorreu um erro');
      });
  }

  const getFcmToken = async () => {
    try {
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
          tokenFCM = token;
        });
    } catch (error) {
      console.error('getFcmToken', error);
    }
  };

  React.useEffect(() => {
    getFcmToken();
  }, []);

  React.useEffect(() => {
    // EFFECT TO RUN AFTER CHANGE IN VALUE
    if (timeoutRef.current !== null) {
      // IF THERE'S A RUNNING TIMEOUT
      clearTimeout(timeoutRef.current); // THEN, CANCEL IT
    }
    if (timeTTS < 1) return;
    timeoutRef.current = setTimeout(() => {
      // SET A TIMEOUT
      timeoutRef.current = null; // RESET REF TO NULL WHEN IT RUNS
      cronosLogin();
    }, 1000);
  }, [timeTTS, timeResend]); // RUN EFFECT AFTER CHANGE IN VALUE

  function cronosLogin() {
    setTimeTTS(timeTTS - 1);
    setTimeResend(timeResend - 1);
  }

  function verifyCodeAuth(code) {
    if (loginVoice) {
      loginTTS(code);
      return;
    }
    if (codeLoading) return;
    setCodeLoading(true);

    console.log('verifyCodeAuth', code);
    confirmResult
      .confirm(code.toString())
      .then((user) => login(user))
      .catch((error) => loginError(error));
  }

  function sendTTS() {}

  function alterNumber() {}

  async function login() {
    if (!tokenFCM.length) {
      getFcmToken();
      setTimeout(() => {
        login();
      }, 300);
      return;
    }
    try {
      const response = await loginSuccess({numberTel, tokenFCM});
      console.log(response);
      await AsyncStorage.multiSet([
        ['@cliente', JSON.stringify(response.cliente)],
        ['@id_install', JSON.stringify(response.id_install)],
        ['@enderecos', JSON.stringify(response.addresses)],
      ]);

      store.dispatch(clientRegistered(response.cliente));
    } catch (e) {
      Alert('', 'Ocorreu um erro. Tente novamente.');
      console.error(e);
    }
  }

  function loginError(e) {
    Alert.alert(
      '',
      'Desculpe, ocorreu um erro. Verifique o código e tente novamente',
    );
  }

  if (confirmResult) {
    return (
      <VerifyCode
        numberTel={numberTel}
        loginVoice={loginVoice}
        alterNumber={alterNumber}
        resendSMS={resendSMS}
        sendTTS={sendTTS}
        timeResend={timeResend}
        verifyLoading={verifyLoading}
        codeLoading={codeLoading}
        timeTTS={timeTTS}
        verifyCodeAuth={verifyCodeAuth}
      />
    );
  } else {
    return <InsertNumberTel sendSMS={sendSMS} codeLoading={codeLoading} />;
  }
};

export default Login;
