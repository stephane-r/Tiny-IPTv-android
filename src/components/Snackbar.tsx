import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar as SnackbarApp } from 'react-native-paper';
import { AppState, closeSnackbar, useApp } from '../states/app';
import { Snackbar as SnackbarType } from '../types';

const Snackbar = () => {
  const app: AppState = useApp();
  const snackbar: SnackbarType = app.snackbar;

  useEffect(() => {
    if (app.snackbar.visible) {
      setTimeout(() => closeSnackbar(), 5000);
    }
  }, [app]);

  return (
    <SnackbarApp
      visible={snackbar.visible}
      onDismiss={() => null}
      action={{
        label: snackbar.buttonLabelClose,
        onPress: closeSnackbar,
      }}
      style={styles.snackbar}>
      {snackbar.message}
    </SnackbarApp>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    maxWidth: 600,
    alignSelf: 'center',
  },
});

export default Snackbar;
