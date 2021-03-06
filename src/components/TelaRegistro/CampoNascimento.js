import React, {useState} from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  Image,
} from 'react-native';

import {meses} from '../../utils/general/meses';
import {tela} from '../../utils/general/tela';

function CampoNascimento({nascimento, alterarNascimento}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View
      style={{
        marginTop: 20,
        padding: tela.width * 2.5,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 17, width: '25%', color: '#555'}}>Nasc.</Text>
      <View
        style={{
          width: '75%',
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          editable={true}
          maxLength={2}
          placeholder="dd"
          textAlign={'center'}
          multiline={false}
          style={{
            height: 45,
            width: '20%',
            backgroundColor: '#eee',
            textAlignVertical: 'center',
          }}
          keyboardType="numeric"
          placeholderTextColor="#999"
          onChangeText={(value) => alterarNascimento('dia', value)}
          underlineColorAndroid="transparent"
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalOpen}
          onRequestClose={() => {}}>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.70)',
              height: '100%',
              width: '100%',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 'auto',
                maxHeight: '90%',
                width: tela.width * 70,
                padding: tela.width * 2.5,
                borderRadius: 10,
                backgroundColor: '#fff',
                flex: 0,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <ScrollView style={{width: tela.width * 65}}>
                {meses.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      height: 40,
                      width: '100%',
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      alterarNascimento('mes', item);
                      setModalOpen(false);
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 16,
                        width: '100%',
                        textAlign: 'center',
                      }}>
                      {item.mesNome}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={{marginTop: 10}}
                onPress={() => {
                  setModalOpen(false);
                }}>
                <View
                  style={{
                    width: tela.width * 65,
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#777',
                      fontSize: 14,
                      width: tela.width * 56,
                      textAlign: 'center',
                      paddingTop: 5,
                    }}>
                    OK
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={{width: '50%', marginLeft: '2.5%', marginRight: '2.5%'}}
          onPress={() => setModalOpen(true)}>
          <View
            style={{
              width: '100%',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 17,
                color: '#555',
                height: 45,
                width: 'auto',
                textAlignVertical: 'center',
                padding: 5,
              }}>
              {nascimento.mesNome || 'Mês...'}
            </Text>
            <Image
              source={require('../../img/down.png')}
              style={{width: 12, height: 5.5}}
            />
          </View>
        </TouchableOpacity>

        <TextInput
          editable={true}
          maxLength={4}
          placeholder="aaaa"
          textAlign={'center'}
          multiline={false}
          style={{
            height: 45,
            width: '25%',
            backgroundColor: '#eee',
            textAlignVertical: 'center',
          }}
          keyboardType="numeric"
          placeholderTextColor="#999"
          onChangeText={(value) => alterarNascimento('ano', value)}
          underlineColorAndroid="transparent"
        />
      </View>
    </View>
  );
}

export default CampoNascimento;
