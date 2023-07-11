import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial-next';

const Connect = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Sprawdzanie czy Bluetooth jest dostępne na urządzeniu
    BluetoothSerial.isEnabled().then((enabled) => {
      if (!enabled) {
        BluetoothSerial.requestEnable();
      }
    });

    // Subskrypcja zdarzeń połączenia i rozłączenia Bluetooth
    BluetoothSerial.on('connectionLost', () => {
      setConnected(false);
    });

    return () => {
      BluetoothSerial.removeAllListeners();
    };
  }, []);

  // Funkcja do nawiązywania połączenia z HC-05
  const connectToDevice = async () => {
    try {
      const isEnabled = await BluetoothSerial.isEnabled();
      if (!isEnabled) {
        return;
      }

      const devices = await BluetoothSerial.list();
      const hc05Device = devices.find((device) => device.name === 'HC-05');

      if (!hc05Device) {
        console.log('Nie znaleziono urządzenia HC-05.');
        return;
      }

      await BluetoothSerial.connect(hc05Device.id);
      setConnected(true);
      console.log('Połączono z HC-05.');
    } catch (error) {
      console.error(error);
    }
  };

  // Funkcja do rozłączania się z HC-05
  const disconnectFromDevice = async () => {
    try {
      await BluetoothSerial.disconnect();
      setConnected(false);
      console.log('Rozłączono z HC-05.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button
        title={connected ? 'Rozłącz' : 'Połącz'}
        onPress={connected ? disconnectFromDevice : connectToDevice}
      />
      <Text>Status: {connected ? 'Połączono' : 'Rozłączono'}</Text>
    </View>
  );
};

export default Connect;
