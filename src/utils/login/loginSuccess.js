import DeviceInfo from 'react-native-device-info';
import {ajax} from '../general/ajax';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loginSuccess(params) {
  const {numberTel, tokenFCM} = params;

  let device = {
    fontScale: await DeviceInfo.getFontScale(),
    uniqueId: DeviceInfo.getUniqueId(),
    macAddress: await DeviceInfo.getMacAddress(),
    api: await DeviceInfo.getApiLevel(),
    systemVersion: DeviceInfo.getSystemVersion(),
    brand: DeviceInfo.getBrand(),
    model: DeviceInfo.getModel(),
    userAgent: await DeviceInfo.getUserAgent(),
    isTablet: DeviceInfo.isTablet(),
  };

  const dados = {
    numberTel,
    tokenFCM,
    device,
    versionApp: 1, // process.env.VERSION_APP,
    OS: 'ANDROID', // process.env.OPERATIONAL_SYSTEM,
  };

  try {
    const response = await ajax.POST('loginUser', dados);
    await AsyncStorage.multiSet([
      ['@cliente', JSON.stringify(response.cliente)],
      ['@id_install', JSON.stringify(response.id_install)],
      ['@enderecos', JSON.stringify(response.addresses)],
    ]);

    return response;
  } catch (e) {
    console.error(e);
    return -1;
  }
}
