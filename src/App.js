import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AddColorImages from './AddColorImages';
import ColorResults from './ColorResults';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import './App.css';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: '#282c34',
    color: 'white',
    alignItems: 'center',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    background: '#282c34',
    color: 'white',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  progress: {
    marginTop: 'auto',
    color: 'green'
  },
  divider: {
    marginTop: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  listItem: {
    display: 'block',
    textAlign: 'center'
  }
}));

const steps = ['Upload Image', 'Result'];

function App() {
  const [colorImages, setColorImages] = React.useState(0);
  const [isSubmit, setIsSubmit] = React.useState(0);
  const [Results, setResults] = React.useState({});
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const AddColorImagesCallback = (colorImages) => {
    setColorImages(colorImages)
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddColorImages parentCallback={AddColorImagesCallback} />;
      case 1:
        return <ColorResults data={Results}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  const handleNext = () => {
    if (activeStep === 0) {
      let formData = new FormData();
      if(colorImages === null || colorImages === 0)
      {
          alert("please enter an image of a test to check");
          return;
      }
      formData.append('images', colorImages, colorImages.name)
      const options = {
        headers: {
          'Accept': 'application/json',
        },
        method: 'POST',
        body: formData,
      };
      setIsSubmit(1);
      fetch('/api/checkColor', options).then(res => res.json()).then(data => {
            const currID = setInterval(async () => {
            const res = await fetch(`/api/returnResults/`+ data['task_id'], {
             headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }});
            const new_data = await res.json();
              if(new_data['status'] == 'finished'){
                setResults(new_data['result']);
                setIsSubmit(0);
                clearInterval(currID);
                setActiveStep(activeStep + 1);
              }
              else if(new_data['status'] == 'not started')
              {
                clearInterval(currID);
                alert('internal error, please try again');
              }
            }, 3000);
      });
    }
    if (activeStep === steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const restartApp = () => {
    setColorImages(0);
    setResults({});
    setActiveStep(0);
    setIsSubmit(0);
  };

  return (
    <div className="App">
      <React.Fragment >
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Cooler Match
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Hope we were helful!
                  </Typography>
                  <Button
                        variant="contained"
                        color="primary"
                        onClick={restartApp}
                        className={classes.button}
                      >
                        Again
                      </Button>
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <div className={classes.buttons}>
                      { isSubmit ? <CircularProgress className={classes.progress}/> : <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                        disabled={isSubmit}
                      >{activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                      </Button>}
                    </div>
                  </React.Fragment>
                )}
              { isSubmit ? <span>Searching our catalogue 🔎</span> : null} 
            </React.Fragment>
          </Paper>
        </main>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body2" color="inherit" align="center">
              {'By Cooler Match Team '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Container>
        </footer>
      </React.Fragment>
    </div>
  );
}

export default App;
