import React, { useState } from "react";
import {Button,TextField,Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setUserSession } from "../../Utils/Common";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Loader from "../CommonComponents/Loader";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    button: {
        width:225,
        borderRadius:50
    },
    error:{
      color:'red',
      fontWeight:'bold'
    },
    textInput:{
      width:'100%'
  }
  })); 

function LoginScreen(props){
  const classes = useStyles();
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState();
  const [isLoading,setIsLoading] = useState(false);
  const validateForm = () => {
    return userName.length > 0 && password.length > 0;
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      axios.post('https://green-thumb-64168.uc.r.appspot.com/login',
        {"username":userName,"password":password}).then((res)=>{
          setUserSession(res.data.token,res.data.username);
          setError("");
          setIsLoading(false);
          history.push('/dashboard');
        }).catch((error)=>{
          setIsLoading(false);
          setError("Invalid Login Credentials");
        });
  }
  return (
    <>
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
      <h3 style={{textAlign:'left',padding:8}}>Login</h3>  
        <Grid className={classes.paper}>
            <TextField id="userName" label="Username" className={classes.textInput} variant="outlined" onChange={(e) => setUserName(e.target.value)} />
        </Grid>
        <Grid className={classes.paper}>
            <TextField id="password"  type={"password"} className={classes.textInput} label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />   
        </Grid>
        <Grid className={classes.error}>{error}</Grid>
        <Grid className={classes.paper}>
            <Button style={{backgroundColor: validateForm() ? '#000' : '#ccc',color:'#fff'}} 
            className={classes.button} variant="outlined" type="submit" disabled={!validateForm()}>
                 Login
            </Button>
        </Grid>
        <Grid className={classes.paper}>
            <Button className={classes.button} style={{backgroundColor:'#fff'}} variant="outlined" onClick={()=> history.push('/register') } >
                 Register
            </Button>
        </Grid>
      </form>
    </div>
    <Loader open={isLoading}/>
    </>
  )
}

export default LoginScreen;