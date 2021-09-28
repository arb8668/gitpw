import { selectNonNullableDeviceFileData } from '../state/deviceFileDataSlice';
import { selectNonNullableBootFileData } from '../state/bootFileDataSlice';
import { Button, Text, View } from 'react-native';
import { useSelector } from '../hooks/useSelector';
import { useTheme } from '../hooks/useTheme';
import { FS } from '../utils/FS';
import React from 'react';

/**
 * This is the first screen the user sees after entering their passcode (or
 *  it's the first visible screen upon opening the app if they don't have a
 *  passcode).
 */
export function HomeScreen(): JSX.Element {
  const deviceFileData = useSelector(selectNonNullableDeviceFileData);
  const bootFileData = useSelector(selectNonNullableBootFileData);
  const theme = useTheme('HomeScreen');

  function onReset(): void {
    FS.unlink('/device.json')
      .then(() => console.log('reset device'))
      .catch((e) => console.error('reset device', e));
    FS.unlink('/boot.json')
      .then(() => console.log('reset boot'))
      .catch((e) => console.error('reset boot', e));
  }

  return (
    <View style={theme.root}>
      <Text style={theme.text}>Welcome!</Text>

      <Button onPress={onReset} title="Reset" />

      <Text style={theme.text}>{JSON.stringify(bootFileData, null, 2)}</Text>

      <Text style={theme.text}>{JSON.stringify(deviceFileData, null, 2)}</Text>
    </View>
  );
}
