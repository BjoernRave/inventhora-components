import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useState } from 'react';
import { useMutation } from 'urql';
import SubmitButton from './FormItems/Basic/SubmitButton';
import { handleResponse } from './lib/utils';
import { useNotification } from './Notification';

const DeletionModal: FC<Props> = ({
  onClose,
  id,
  mutation,
  type,
  children,
}) => {
  const { t } = useTranslation();
  const [, deleteEntity] = useMutation(mutation);
  const { setNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeletion = async () => {
    setIsLoading(true);
    const response = await deleteEntity({ id });

    if (
      handleResponse({
        t,
        setNotification,
        response,
        error: t('common:deletionError', { name: t(`common:${type}`) }),
        success: t('common:deletionSuccess', { name: t(`common:${type}`) }),
      })
    ) {
      onClose(id);
    }

    setIsLoading(false);
  };

  // useEffect(() => {
  //   if (!isServer) {
  //     setTimeout(() => {
  //       const links = document.querySelectorAll('#confirm-dialog-content a')

  //       for (const link of links) {
  //         link.setAttribute('target', '_blank')
  //       }
  //     }, 300)
  //   }
  // }, [])

  return (
    <Dialog
      fullWidth
      onClose={() => onClose()}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <DialogTitle id="customized-dialog-title">
        {t('common:deletionTitle', { name: t(`common:${type}`) })}
      </DialogTitle>
      <DialogContent id="confirm-dialog-content" style={{ marginTop: -20 }}>
        <DialogContentText>
          {t('common:deletionDescription', {
            name: t(`common:${type}`),
          })}
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => onClose()} color="primary">
          {t('common:cancel')}
        </Button>
        <SubmitButton loading={isLoading} onClick={handleDeletion}>
          {t('common:confirm')}
        </SubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeletionModal;

interface Props {
  onClose: (id?: string) => void;
  id: string;
  mutation: any;
  type: string;
}
