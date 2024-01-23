import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store';
import { PaperProvider } from 'react-native-paper';
import NetworkWrapper from './src/components/NetworkWrapper';
import { getLocalStorage } from './src/lib/asyncStorage';
import palette from './src/theme/palette';
import { StatusBar } from 'react-native';
import AppAuthenticator from './src/authenticator';
import { PersistGate } from 'redux-persist/integration/react';
// import { ZoomVideoSdkProvider, useZoom,  EventType } from '@zoom/react-native-videosdk';
const theme = {
  colors: {
    primary: '#f1a08f',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(240, 219, 255)',
    onPrimaryContainer: 'rgb(44, 0, 81)',
    secondary: 'rgb(102, 90, 111)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: '#f1a08f',
    onSecondaryContainer: '#fff',
    tertiary: 'rgb(128, 81, 88)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 217, 221)',
    onTertiaryContainer: 'rgb(50, 16, 23)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(29, 27, 30)',
    surface: 'white',
    onSurface: 'rgb(29, 27, 30)',
    surfaceVariant: 'rgb(255, 255, 255)', // input backgroud
    onSurfaceVariant: 'rgb(74, 69, 78)',
    outline: 'rgb(124, 117, 126)',
    outlineVariant: 'rgb(204, 196, 206)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(50, 47, 51)',
    inverseOnSurface: 'rgb(245, 239, 244)',
    inversePrimary: 'rgb(220, 184, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(248, 242, 251)',
      level2: 'rgb(244, 236, 248)',
      level3: 'rgb(240, 231, 246)',
      level4: 'rgb(239, 229, 245)',
      level5: 'rgb(236, 226, 243)',
    },
    surfaceDisabled: 'rgba(29, 27, 30, 0.12)',
    onSurfaceDisabled: 'rgba(29, 27, 30, 0.38)',
    backdrop: 'rgba(51, 47, 55, 0.4)',
    roundness: 4,
  },
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    if (isAuthenticated !== null) {
      // setTimeout(() => {
      //   LottieSplashScreen.hide();
      // }, 0);
    }
  }, [isAuthenticated]);
  const checkAuthentication = async () => {
    try {
      // Fetch the value from AsyncStorage
      const storedIsAuthenticated = await getLocalStorage({
        key: 'isAuthenticated',
      });
      setTimeout(() => {
        setIsAuthenticated(storedIsAuthenticated === 'true');
      }, 3000);
    } catch (error) {
      console.error('Error reading AsyncStorage:', error);
    }
  };

  const updateAuthentication = value => {
    setIsAuthenticated(value);
  };
  React.useEffect(() => {
    // checkAuthentication();
  }, []);
  return (
    <>
      <StatusBar
        barStyle="dark-content" // or "light-content"
        backgroundColor={palette.background.default} // Set your desired background color
      />
      <NetworkWrapper>
        <PaperProvider theme={theme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {/* <ZoomVideoSdkProvider > */}
                <NavigationContainer>
                  <AppAuthenticator
                    isAuthenticated={false}
                    updateAuthentication={updateAuthentication}
                  />
                </NavigationContainer>
              {/* </ZoomVideoSdkProvider> */}
            </PersistGate>
          </Provider>
        </PaperProvider>
      </NetworkWrapper>
    </>
  );
}
