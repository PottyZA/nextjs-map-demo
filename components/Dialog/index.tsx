import React, {FC} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  open: boolean,
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
}

const DialogComponent: FC<Props> = ({open, handleClose}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload GeoJSON</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please use the input below to upload a file with a .txt, .json, or .geojson file extension
        </DialogContentText>
        <input
          type="file"
          accept={"application/geo+json, .txt, .json, .geojson"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Done</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogComponent