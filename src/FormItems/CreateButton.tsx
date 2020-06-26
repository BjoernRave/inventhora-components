import { Button, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { FC } from 'react';

const CreateButton: FC<Props> = ({ onClick, title }) => {
  return (
    <Tooltip placement="right" title={title}>
      <Button
        aria-label={title}
        style={{ height: '56px', marginBottom: '23px' }}
        variant="contained"
        color="secondary"
        size="large"
        onClick={onClick}
      >
        <AddIcon />
      </Button>
    </Tooltip>
  );
};

export default CreateButton;

export interface Props {
  onClick: () => void;
  title: string;
}
