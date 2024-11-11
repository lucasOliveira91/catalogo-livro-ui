import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import UserCatalog from "./pages/UserCatalog";
import React from 'react';
import {AppBar, CssBaseline, Drawer, List, ListItem, ListItemText, Toolbar, Typography} from '@mui/material';
import LoginPage from "./pages/LoginPage";

const drawerWidth = 240;

function App() {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" style={{ width: `calc(100% - ${drawerWidth}px)`, marginLeft: drawerWidth }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Book Catalog
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth } }}
                >
                    <Toolbar />
                    <List>
                        <ListItem button component={Link} to="/login">
                            <ListItemText primary="Login" />
                        </ListItem>
                        <ListItem button component={Link} to="/">
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin">
                            <ListItemText primary="Admin " />
                        </ListItem>
                    </List>
                </Drawer>
                <main style={{ flexGrow: 1, padding: '24px', marginLeft: drawerWidth }}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<UserCatalog />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin" element={<AdminPanel />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

