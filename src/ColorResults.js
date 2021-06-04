import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  square: {
    width: '100px',
    height: '100px',
    display: 'inline-flex'
  }
}));
export default function ColorResults(props) {
  const classes = useStyles();
  const parentProps = {...props};
  if(parentProps.data && parentProps.data !== {})
  {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Top Colors We Found From Best To Worst
        </Typography>
        <List disablePadding>
        {parentProps.data.map((colors) => (
        <ListItem className={classes.listItem}>
          <ListItemText primary={colors.name} secondary={`${colors.percentage * 100}%`} />          
          <div className={classes.square} style={{backgroundColor: `rgb(${colors.val})`}}> </div>
        </ListItem>
        ))}
        </List>
      </React.Fragment>
      );
  } else {
    return (
    <React.Fragment>
      Results
    </React.Fragment>
    );
  }
  
  
}