import React from 'react';

import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography';

import Minashi from './Minashi.js';
import Holiday from './Holiday.js';

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <Router className="App">
      <header>
        <Typography variant="h3" component="h1">
          労働契約計算
        </Typography>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Menu
        </Button>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}><Link to="Minashi">みなし残業カウンタ</Link></MenuItem>
          <MenuItem onClick={handleClose}><Link to="/Holiday">休日数カウンタ</Link></MenuItem>
        </Menu>
        <hr/>
      </header>
      <Switch>
        <Route exact path="/" component = {Minashi}/>
        <Route path="/Minashi" component = {Minashi}/>
        <Route path="/Holiday" component = {Holiday}/>
      </Switch>
    </Router>
  );
}


export default App;
