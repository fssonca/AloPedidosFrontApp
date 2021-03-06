import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import {Provider} from 'react-redux';
import store from './src/redux/store';

import Routes from './src';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: '#eee',
            height: '100%',
            width: '100%',
            flex: 0,
          }}>
          <Routes />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
