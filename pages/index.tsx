import Head from 'next/head'
import { useState } from "react"

import styles from '../styles/Home.module.scss'

// Material UI component imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// Icons
import MapIcon from '@mui/icons-material/Map';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// Custom Component imports
import Map from "../components/Map"
import Dialog from "../components/Dialog"
import Footer from '../components/Footer'

const drawerWidth = 240

export default function Home() {
  const [importModalOpen, setImportModalOpen] = useState(false)

  const saveFileContents = (data) => {
    console.log("save data into state", data)
  }

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <AppBar
        position="fixed"
        sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
      >
        <Toolbar />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <MapIcon />
          <Typography variant="h6" noWrap component="div" className={styles.branding}>
            Mappy
          </Typography>
        </Toolbar>
        <Divider/>
        <List>
          <ListItem key={"import"} disablePadding onClick={() => setImportModalOpen(true)}>
            <ListItemButton>
              <ListItemIcon>
                <FileUploadIcon />
              </ListItemIcon>
              <ListItemText primary={"Import GeoJSON"}/>
            </ListItemButton>
          </ListItem>
          <ListItem key={"export"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FileDownloadIcon />
              </ListItemIcon>
              <ListItemText primary={"Export as GeoJSON"}/>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider/>
      </Drawer>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "flex-start",
          alignItems:"stretch",
          alignContent: "stretch",
          minHeight: "100%",
          height: '100%',
          bgcolor: 'background.default',
          p: 3
      }}
      >
        <Toolbar/>
        <Dialog open={importModalOpen} saveFileContents={saveFileContents} handleClose={() => setImportModalOpen(false)} />
        <div className={styles.homeMap}>
          <Map />
        </div>
        <Footer />
      </Box>
    </Box>
  )
}
