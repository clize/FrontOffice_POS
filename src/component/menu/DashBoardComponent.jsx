import React, { Component } from 'react';
import Chart from "react-google-charts";
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { Doughnut, Bar } from 'react-chartjs-2';
import Clock from './ClockComponent';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    margin: {
      margin: theme.spacing(1),
      minWidth: 120,
    },

    paper: {
      minWidth: 275,
      minHeight: 340,
      maxHeight: 360,
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    success: {
        backgroundColor: '#BFB8EB',
        color: 'white',
    },
    titleRow:{
        width: '100%',
        marginBottom: '1em',
    },
    titleText:{
      color: 'black',
      display: 'inline-block',
      textAlign: 'center', 
    },
    titleIcon:{
        color: '#AFAFAF',
        float: 'right',
    },
    doughnutDiv:{
        marginTop:'2em',
    }
    
  });

const boardData = [
    {id: 1, title: "서버별 배치 결과", content: "내용"},
    {id: 2, title: "시간대별 AMS LOG", content: "내용"},
    {id: 3, title: "일자별 거래 건수", content: "내용"},
    {id: 4, title: "일중 마스터 현황", content: "내용"},
    {id: 5, title: "유형별 AMS LOG", content: "내용"},
    {id: 6, title: "중요 업무 이력", content: "내용"}
];

const doughnutData = {
    datasets: [
      {
        label: 'AMS 유형',
        data: [12, 10, 8],
        backgroundColor: [
            '#E7E7E7',
            '#AFAFAF',
            '#BFB8EB'
        ],
      },
    ],
    labels: ['Type1', 'Type2', 'Type3',],
};

const barData = {
    labels: ['10/1',
             '10/2',
             '10/3',
             '10/4',
             '10/5',
             '10/6',
             '10/7'
            ],
    datasets: [
        {
            label: '거래 건 수',
            barThickness: 8,
            data:[
                810    ,
                1170   ,
                660    ,
                1030   ,
                1120   ,
                1000   ,
                990    ,
              ]
        },
    ]
};

const barOptions = {
    scales: {
        xAxes: [{
            gridLines: {
                offsetGridLines: true
            }
        }]
    },
    // reponsive: true,
};

  function createData(seq, name, startDt, status) {
        return { seq, name, startDt, status };
    }
  
  function createWorkLogData(seq, regdate, title) {
      return { seq, regdate, title};
    }
  
  const rows = [
    createData(1, 'pre SOD', '2020-08-24', 100),
    createData(2, 'SOD', '2020-08-24', 66.6),
    createData(3, 'EOD', '2020-08-24', 55.5),
    createData(4, 'POS PGM', '2020-08-24', 4.3),
  ];
  const workLogRows=[
    createWorkLogData(1, '2020-10-29', 'Project 일정'),
    createWorkLogData(2, '2020-10-24', 'Config 정보' ),
    createWorkLogData(3, '2020-10-21', '중앙서버 전환 장애대응메뉴얼'),
    createWorkLogData(4, '2020-10-20', 'DailyCheck List'),
    createWorkLogData(5, '2020-10-20', '서버 계정정보'),
    createWorkLogData(6, '2020-10-19', 'Keymap 처리'),
  ];

class DashBoardComponent extends Component {


    render() {
        const { classes } = this.props;
        return(
            <div className= {classes.root}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Typography variant="h4" > DASHBOARD </Typography>
                  <Clock/>
                </Grid>
                
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                          <Link to="/">
                            <div className={classes.titleRow}>
                              <Typography variant="h6" className={classes.titleText}> 일자 별 거래 건수 </Typography>
                              <AddIcon className={classes.titleIcon} />
                            </div>
                          </Link>                            
                            <Bar 
                                data={barData}
                                height="240%"
                                options={barOptions}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                          <Link to="/">
                            <div className={classes.titleRow}>
                              <Typography variant="h6"className={classes.titleText} > 일중 마스터 현황 </Typography>
                              <AddIcon className={classes.titleIcon} />
                            </div>
                          </Link>
                          <Table className={classes.table} size="small" aria-label="simple table" style={{tableLayout: 'auto'}}>
                              <TableHead>
                                <TableRow>
                                  <TableCell>배치명</TableCell>
                                  <TableCell>시작일</TableCell>
                                  <TableCell>진행상태</TableCell>
                                  <TableCell>진행내역&nbsp;(%)</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows.map((row) => (
                                  <TableRow key={row.seq}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.startDt}</TableCell>
                                    <TableCell>
                                    {
                                      row.status === 100
                                      ? <Chip className={classes.success} size="small" label="완료" deleteIcon={<DoneIcon className={classes.icon}/>}/>
                                      : <Chip className={classes.ing} size="small" label="진행중" />
                                    }
                                    </TableCell>
                                    <TableCell>{row.status}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                          <Link to="/">
                            <div className={classes.titleRow}>
                              <Typography variant="h6"className={classes.titleText} > 시간대별 AMS LOG </Typography>
                              <AddIcon className={classes.titleIcon} />
                            </div>
                          </Link>
                        <Chart
                              height={'280px'}
                              chartType="Bar"
                              loader={
                                <div align="center"
                                    justify="center">
                                        Loading Chart
                                </div>}
                              data={[
                                ['Year', 'Sales', 'Expenses', 'Profit'],
                                ['2014', 1000, 400, 200],
                                ['2015', 1170, 460, 250],
                                ['2016', 660, 1120, 300],
                                ['2017', 1030, 540, 350],
                              ]}
                              options={{
                                // Material design options
                                colors: ['#E7E7E7', '#AFAFAF', '#BFB8EB'],
                                chart: {
                                },
                              }}
                              // For tests
                              rootProps={{ 'data-testid': '2' }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                          <Link to="/batchRslt">
                            <div className={classes.titleRow}>
                              <Typography variant="h6"className={classes.titleText} > 서버별 배치결과 </Typography>
                              <AddIcon className={classes.titleIcon} />
                            </div>
                          </Link>
                            <Table className={classes.table} size="small" aria-label="simple table" style={{tableLayout: 'auto'}}>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>배치명</TableCell>
                                    <TableCell>시작일</TableCell>
                                    <TableCell>진행상태</TableCell>
                                    <TableCell>진행내역&nbsp;(%)</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {rows.map((row) => (
                                    <TableRow key={row.seq}>
                                      <TableCell>{row.name}</TableCell>
                                      <TableCell>{row.startDt}</TableCell>
                                      <TableCell>
                                      {
                                        row.status === 100
                                        ? <Chip className={classes.success} size="small" label="완료" deleteIcon={<DoneIcon className={classes.icon}/>}/>
                                        : <Chip className={classes.ing} size="small" label="진행중" />
                                      }
                                      </TableCell>
                                      <TableCell>{row.status}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                        </Paper>
                    </Grid>
                    <Grid item xs
                    >
                        <Paper className={classes.paper}>
                          <Link to="/">
                            <div className={classes.titleRow}>
                              <Typography variant="h6"className={classes.titleText} > AMS LOG 유형 </Typography>
                              <AddIcon className={classes.titleIcon} />
                            </div>
                          </Link>
                            <div className={classes.doughnutDiv} width="100%">
                              <Doughnut
                                data={doughnutData}
                                width="240%"
                                options={{
                                  responsive: true,
                                  legend: {
                                      display: true,
                                      position: "bottom",
                                      label: {
                                        boxWidth: 20,
                                      }
                                    }
                                }}
                              />
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                          <Link to="/">
                            <div className={classes.titleRow}>
                              <Typography variant="h6"className={classes.titleText} >중요업무이력 </Typography>
                              <AddIcon className={classes.titleIcon} />
                            </div>
                          </Link>
                        <Table className={classes.table} size="small" aria-label="simple table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="right">등록일</TableCell>
                                    <TableCell align="right">TITLE</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {workLogRows.map((row) => (
                                    <TableRow key={row.seq}>
                                      <TableCell align="right">{row.regdate}</TableCell>
                                      <TableCell align="right">{row.title}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                        </Paper>
                    </Grid>                  
                </Grid>
                    
            </div>
        )
    }
    
}

export default withStyles(styles, {withTheme: true}) (DashBoardComponent);