import React from 'react';
import clsx from 'clsx';
import Table from './Table';
import {
  TextField,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Main = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item>
              <Typography component="span" variant="h6" color="primary">
                USERS
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                All users in the Data Base
              </Typography>
            </Grid>
            <Grid item xs={true}></Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Search User"
                variant="standard"
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <Table />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Main;
