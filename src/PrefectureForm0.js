import React, { useState } from 'react';

import Minimumichiran from './minimumichiran.js';

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default class PrefectureForm extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.props.changer(e.target.value);
  }

  render() {
    const classes = makeStyles(theme => ({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    }));

    const items = [];
    for (let key in Minimumichiran) {
      items.push(
          <option key={key} value={key}>{key}</option>
      )
    }

    return <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <label htmlFor="pref">{this.props.name}</label>
        <select onChange={this.handleChange}>
          {items}
        </select>
      </FormControl>
    </form>;
  }
}
