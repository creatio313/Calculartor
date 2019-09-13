import React from 'react';

import MinashiForm from './MinashiForm.js';
import Minimumichiran from './minimumichiran.js';
import PrefectureForm from './PrefectureForm.js';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default class Minashi extends React.Component {
  constructor(){
    super();
    this.state = {
      minashiTime: 0,
      totalSalary: 0,
      workTime: 176,
      prefecture: "北海道",
      base: 0
    }
    this.changeTime = this.changeTime.bind(this);
    this.changeSalary = this.changeSalary.bind(this);
    this.changeWorktime = this.changeWorktime.bind(this);
    this.changePref = this.changePref.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  render() {
    const classes = makeStyles(theme => ({
      root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      dense: {
        marginTop: theme.spacing(2),
      },
      menu: {
        width: 200,
      }
    }));
    return <div>
      <Typography variant="h4" component="h2">
        みなし残業チェッカー
      </Typography>
      <Typography component="p">
        みなし残業を含む給与から基本時給、みなし残業なしの月給を求めます。
      </Typography>
      <Typography component="p">
        1か月の法定労働時間は、未入力の場合176時間として計算します。
      </Typography>
        <form className={classes.container} noValidate autoComplete="off">
          <MinashiForm name="月給" ph="0" changer={this.changeSalary} />
          <MinashiForm name="みなし残業時間" ph="0" changer={this.changeTime} />
          <MinashiForm name="1か月の法定労働時間(任意)" ph={this.state.workTime} changer={this.changeWorktime} />
        </form>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              計算結果
            </Typography>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                <TableCell>項目</TableCell>
                <TableCell align="right">値</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow key="base">
                    <TableCell component="th" scope="row">
                      基本時給
                    </TableCell>
                    <TableCell align="right">{Math.ceil(this.state.base)}</TableCell>
                  </TableRow>
                  <TableRow key="basesalary">
                    <TableCell component="th" scope="row">
                      みなし残業なしの月給
                    </TableCell>
                    <TableCell align="right">{Math.ceil(this.state.totalSalary - this.state.base * this.state.minashiTime)}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
            <Typography variant="h6" component="h4">
              最低時給比較
            </Typography>
              <p><PrefectureForm name="都道府県" ph="北海道" changer={this.changePref}/>の最低時給より
                {this.state.base>=Minimumichiran[this.state.prefecture] && (<strong>高い。</strong>)}
                {this.state.base<Minimumichiran[this.state.prefecture] && (<strong>低い。</strong>)}
              </p>
          </Paper>
        <hr/>
        <p><small>小数点を繰り上げて計算しているため、時給に1円未満の誤差があります。</small></p>
    </div>
  }

  changeTime(tvalue) {
    let time = tvalue;
    this.setState({
      minashiTime: time
    });
    this.calculate(this.state.totalSalary,time, this.state.workTime);
  }

  changeSalary(svalue) {
    let salary = svalue;
    this.setState({
      totalSalary: salary
    });
    this.calculate(salary, this.state.minashiTime, this.state.workTime);
  }

  changeWorktime(wvalue) {
    let wtime = wvalue;
    this.setState({
      workTime: wtime
    });
    this.calculate(this.state.totalSalary, this.state.minashiTime, wtime);
  }

  changePref(pvalue) {
    let pref = pvalue;
    this.setState({
      prefecture: pref
    });
  }

  calculate(salary, time, worktime){
    let val = salary/(parseInt(worktime) + 1.25 * time);
    this.setState({
      base: val
    });
  }
}
