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
}));
export default function ColorResults(props) {
  const classes = useStyles();
  const parentProps = {...props};
  if(parentProps.data && parentProps.data !== {})
  {
    return (
      <React.Fragment>
              <Typography variant="h6" gutterBottom>
          The Colors We Found
        </Typography>
        {parentProps.data}
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