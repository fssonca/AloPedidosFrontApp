import React from 'react';
import {Text, View} from 'react-native';

import {estados} from '../../utils/general/estadosBrasil';

function RenderEstado({item}) {
  return (
    <View
      style={{
        flex: 1,
        marginBottom: 5,
        paddingTop: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',

        height: 'auto',
        width: '100%',
      }}>
      <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 15}}>
        {estados[item[0]]}
      </Text>

      {item[1].map((i) => (
        <View
          key={i.nome}
          style={{
            minHeight: 45,
          }}>
          <Text style={{fontSize: 16, color: '#666'}}>{i.nome}</Text>
        </View>
      ))}
    </View>
  );
}

export default RenderEstado;
