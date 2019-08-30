import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(3),
    },
    group: {
      margin: theme.spacing(1, 0),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    }
  }));

export default function Holiday(props) {
  const classes = useStyles();
  const [base, setBase] = useState("104");
  const [summer, setSummer] = useState("0");
  const [winter, setWinter] = useState("0");

  if(isNaN(summer))setSummer(0);
  if(isNaN(winter))setWinter(0);

  let total = parseInt(base) + parseInt(isNaN(summer)? 0: summer) + parseInt(isNaN(winter)? 0: winter);

  return(
  <React.Fragment>
    <Typography variant="h4" component="h2">
      休日数カウンタ
    </Typography>
      <p>{ total }</p>
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">長期休暇を除く休日数</FormLabel>
      <RadioGroup
        aria-label="base"
        name="base"
        className={classes.group}
        value={ base }
        onChange={(e)=>{setBase(e.target.value)}}
      >
        <FormControlLabel value="104" control={<Radio />} label="法律上の最低休日数(※)" />
        <FormControlLabel value="121" control={<Radio />} label="完全週休二日+全祝日" />
      </RadioGroup>
      <small>※1日の所定労働時間を8時間とした場合です。</small>
      <TextField
        label="夏期休暇"
        className={classes.textField}
        //value = { summer }
        margin="normal"
        variant="outlined"
        type="number"
        onChange={(e)=>{setSummer(e.target.value)}}
      />
      <TextField
        label="年末年始休暇"
        className={classes.textField}
        //value = { winter }
        margin="normal"
        variant="outlined"
        type="number"
        onChange={(e)=>{setWinter(e.target.value)}}
      />
    </FormControl>
  </React.Fragment>
  );
}
