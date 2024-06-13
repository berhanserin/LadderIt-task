import React, { useEffect, useMemo, useRef, useState } from 'react';
import { enableScreens } from 'react-native-screens';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { LoginPage, Main, Market } from '@/screen';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase';
import {
  AppState,
  LogBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { screenHeight, screenWidth } from './utils/dimensions';
import { useBottomState } from './store/modal';
import { navigationRef } from './navRoot';
import { Markets, Protuct } from './component';

const MainApp = () => {
  const Stack = createNativeStackNavigator();
  enableScreens();

  const [session, setSession] = useState<Session | null>(null);

  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  AppState.addEventListener('change', state => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });

  // ref

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  const { open, closeBottom, type } = useBottomState();

  useEffect(() => {
    if (open) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.forceClose();
    }
  }, [open]);

  LogBox.ignoreAllLogs();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              fullScreenGestureEnabled: true,
            }}
            initialRouteName="Main">
            {session?.access_token ? (
              <>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Market" component={Market} />
              </>
            ) : (
              <>
                <Stack.Screen name="Main" component={LoginPage} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          bottomInset={50}
          detached={true}
          index={0}
          onDismiss={() => {
            bottomSheetModalRef.current?.forceClose();
            closeBottom();
          }}
          backdropComponent={() => (
            <TouchableOpacity
              onPress={() => {
                bottomSheetModalRef.current?.forceClose();
                closeBottom();
              }}
              activeOpacity={1}
              style={{
                width: screenWidth,
                height: screenHeight,
                position: 'absolute',
                left: 0,
                top: 0,
                backgroundColor: '#00000040',
              }}
            />
          )}
          enablePanDownToClose
          style={styles.sheetContainer}>
          <View style={styles.contentContainer}>
            {type === 0 ? <Markets /> : <Protuct />}
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  sheetContainer: {
    // add horizontal space
    marginHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
  },
});

export default MainApp;
