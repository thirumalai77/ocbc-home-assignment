import React, { useState } from "react";
import {Button,TextField,Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setUserSession } from "../../Utils/Common";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
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
    success:{
    color:'green',
    fontWeight:'bold'
    },
    textInput:{
        width:'100%'
    },
    backButton:{
        alignItems: 'flex-start',
        display: 'flex'
    }
  })); 

function RegisterScreen(props){
  const classes = useStyles();
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [error,setError] = useState("");
  const [successMsg,setSuccessMsg] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const validateForm = () => {
    return userName.length > 0 && password.length > 0 && confirmPassword.length > 0;
  }

  const handleRegister = (e) => {
      e.preventDefault();
      setIsLoading(true);
      if(password === confirmPassword){
        axios.post('https://green-thumb-64168.uc.r.appspot.com/register',
            {"username":userName,"password":password}).then((res)=>{
            setIsLoading(false);    
            setError("");
            setSuccessMsg("Registered Successfully. Please continue to Login.");
            setTimeout(() => {
                history.push('/');
            }, 2000);
            }).catch((error)=>{
                setIsLoading(false);     
                setError("Username Already Exists");
            });
        }else{
            setIsLoading(false);
            setError("Confirm Password Not Match");
        }
  }

  return (
    <>
    <div className={classes.root}>
      <form onSubmit={handleRegister}>
      <Grid className={classes.backButton}>    
        <IconButton aria-label="delete" onClick={()=> history.goBack()} className={classes.margin} size="small">
            <ArrowBack fontSize="16" />
        </IconButton>    
      </Grid>
      <h3 style={{textAlign:'left',padding:8,margin:5}}>Register</h3>  
        <Grid className={classes.paper}>
            <TextField id="userName" label="Username" variant="outlined" className={classes.textInput} onChange={(e) => setUserName(e.target.value)} />
        </Grid>
        <Grid className={classes.paper}>
            <TextField id="password"  type={"password"} label="Password" className={classes.textInput} variant="outlined" onChange={(e) => setPassword(e.target.value)} />   
        </Grid>
        <Grid className={classes.paper}>
            <TextField id="confirmPassword"  type={"password"} label="Confirm Password" className={classes.textInput} variant="outlined" onChange={(e) => setConfirmPassword(e.target.value)} />   
        </Grid>
        <Grid className={classes.error}>{error}</Grid>
        <Grid className={classes.success}>{successMsg}</Grid>
        <Grid className={classes.paper}>
            <Button className={classes.button} variant="outlined" disabled={!validateForm()} type="submit">
                 Register
            </Button>
        </Grid>
      </form>
    </div>
    <Loader open={isLoading}/>
    </>
  )
}

export default RegisterScreen;