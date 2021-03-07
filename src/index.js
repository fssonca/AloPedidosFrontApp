import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';

import store from './redux/store';
import {clientRegistered} from './redux/actions';

import TelaRegistro from './components/TelaRegistro';
import TelaLocalPadrao from './components/TelaLocalPadrao';
import TelaLogin from './components/TelaLogin';

import {AppTabs} from './AppTabs';

const Stack = createStackNavigator();

function LogoTitle({title}) {
  return <Text style={{textAlign: 'center'}}>{title}</Text>;
}

let screen;
function Routes({stateRedux}) {
  const [load, setLoad] = React.useState(false);

  const {cliente} = stateRedux;

  React.useEffect(() => {
    AsyncStorage.getItem('@cliente')
      .then((cliente) => {
        console.log('cliente', cliente);

        store.dispatch(clientRegistered(JSON.parse(cliente)));
        setLoad(true);
      })
      .catch((err) => {
        console.error(err);
        setLoad(false);
      });
  }, []);

  const logout = () => {};

  if (!cliente) {
    screen = (
      <Stack.Screen
        name="TelaLogin"
        options={{headerTitle: () => <LogoTitle title={'Login'} />}}
        component={TelaLogin}
      />
    );
  } else if (cliente && !cliente.nome?.length) {
    screen = (
      <Stack.Screen
        name="TelaRegistro"
        options={{headerTitle: () => <LogoTitle title={'Registre-se'} />}}
        component={TelaRegistro}
      />
    );
  } else if (cliente && !cliente.info?.localPadrao) {
    screen = (
      <Stack.Screen
        name="TelaLocalPadrao"
        options={{
          headerTitle: () => <LogoTitle title={'Selecione sua localização'} />,
        }}
        component={TelaLocalPadrao}
      />
    );
  }

  if (!load) {
    return <View></View>;
  }

  return (
    <NavigationContainer>
      {cliente?.info?.localPadrao ? (
        <AppTabs cliente={cliente} />
      ) : (
        <Stack.Navigator>{screen}</Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const mapStateToProps = ({state}) => {
  return {stateRedux: state};
};

export default connect(mapStateToProps)(Routes);
