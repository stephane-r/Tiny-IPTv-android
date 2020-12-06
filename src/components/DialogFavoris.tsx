import React from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { useFavoris } from '../hooks/useFavoris';
import { AppState, toggleDialogFavoris, useApp } from '../states/app';

const DialogFavoris = () => {
  const app: AppState = useApp();
  const { addOrRemoveFromFavoris, favorisIds } = useFavoris();

  const addToFavoris = (): void => {
    if (app.dialog.favoris.data.name) {
      addOrRemoveFromFavoris(app.dialog.favoris.data);
      toggleDialogFavoris(false, null);
    }
  };

  return (
    <Portal>
      <Dialog
        visible={app.dialog.favoris.isOpen}
        onDismiss={() => toggleDialogFavoris(false, null)}
        style={{ maxWidth: 600, width: '100%', alignSelf: 'center' }}>
        <Dialog.Title>
          {favorisIds.includes(app.dialog.favoris.data?.name)
            ? 'Remove from favoris'
            : 'Add to favoris'}
        </Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Do you want add [CHANNEL NAME] to your favoris ?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => toggleDialogFavoris(false, null)}>
            Cancel
          </Button>
          <Button onPress={addToFavoris}>Add</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogFavoris;
