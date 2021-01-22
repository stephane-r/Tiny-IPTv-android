import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar as SnackbarApp } from 'react-native-paper';
import { closeSnackbar, useSnackbarState } from '../states/snackbar';
import { Snackbar as SnackbarType } from '../types';

const Snackbar = () => {
  const snackbar: SnackbarType = useSnackbarState();

  useEffect(() => {
    if (snackbar.visible) {
      setTimeout(() => closeSnackbar(), 5000);
    }
  }, [snackbar]);

  return (
    <SnackbarApp
      visible={snackbar.visible}
      onDismiss={() => null}
      action={snackbar.action}
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
