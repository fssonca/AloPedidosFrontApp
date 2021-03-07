import React from 'react';

import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react/cjs/react.development';

import {ajax} from '../../utils/general/ajax';

import RenderEstado from './RenderEstado';

function TelaLocalPadrao() {
  const [loadingCidades, setLoadingCidades] = useState(true);
  const [loadingBairros, setLoadingBairros] = useState(true);
  const [internet, setInternet] = useState(false);
  const [cidades, setCidades] = useState(null);

  async function ajaxCities() {
    try {
      setInternet(true);
      const cities = await ajax.GET('getAllCities');
      console.log(cities);
      setCidades(cities);
    } catch (e) {
      setInternet(false);
      console.log(e);
    }
  }

  React.useEffect(() => {
    ajaxCities();
  }, []);

  return (
    <View style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
      {internet ? (
        cidades ? (
          <FlatList
            data={cidades}
            renderItem={({item}) => <RenderEstado item={item} />}
            keyExtractor={(_i, index) => index.toString()}
          />
        ) : (
          <ActivityIndicator
            size="large"
            color="#08f"
            style={{marginTop: '10%'}}
          />
        )
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Falha na conexão</Text>
          <TouchableOpacity
            onPress={() => ajaxCities()}
            opacity={0.8}
            style={{
              marginTop: 20,
              backgroundColor: '#08f',
              height: 45,
              width: '40%',
              borderRadius: 10,
              flex: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#fff',
              }}>
              Recarregar
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default TelaLocalPadrao;
