import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';

let Dashboard = ({ name }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>
          <Typography
            style={{ padding: '1rem' }}
            component="h2"
            variant="h4"
            color="primary"
          >
            {name}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
