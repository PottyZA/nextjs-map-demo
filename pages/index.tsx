import Head from 'next/head'
import styles from '../styles/Home.module.scss'

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

import Map from "../components/Map"
import Footer from '../components/Footer'

const drawerWidth = 240

export default function Home() {
  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <AppBar
        position="fixed"
        sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Mappy
          </Typography>
        </Toolbar>
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
        <Toolbar/>
        <Divider/>
        <List>
          {['Import GeoJSON', 'Export map as GeoJSON'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  ICON
                </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItemButton>
            </ListItem>
          ))}
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
        <div className={styles.homeMap}>
          <Map />
        </div>
        <Footer />
      </Box>
    </Box>
  )
}
