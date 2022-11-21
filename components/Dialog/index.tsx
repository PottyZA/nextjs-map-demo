import React, { FC, useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  open: boolean,
  saveFileContents: (data: object) => void,
  handleClose: () => void
}

const DialogComponent: FC<Props> = ({open, saveFileContents, handleClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileHandler = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(changeEvent.target.files[0])
  }

  const  handleFileSubmission = (file: File | null): void => {
    const fileReader = new FileReader()
    if (file) {
      fileReader.readAsText(file)
    } else {
      alert("You haven't uploaded anything!")
    }

    fileReader.onload = function() {
      let result = fileReader.result
      let data = {}
      if (result && typeof result === "string") {
        data = JSON.parse(result)
      }
      saveFileContents(data)

      // Close modal
      handleClose()

      // Reset file state to allow fresh uploads
      setSelectedFile(null)
    }
  }

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
          onChange={fileHandler}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleFileSubmission(selectedFile)}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogComponent