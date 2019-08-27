import React from 'react';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

export default class Minashi extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.props.changer(e.target.value);
  }

  render() {
    const classes = makeStyles(theme => ({
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      }
    }));
    return <React.Fragment>
        <TextField
          label={this.props.name}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="number"
          onChange={this.handleChange}
          />
    </React.Fragment>;
  }
}
