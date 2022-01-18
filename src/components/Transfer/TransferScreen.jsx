import React, { useState,useEffect } from "react";
import {Button,TextField,Grid,FormControl,Select,MenuItem,InputLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { getToken } from '../../Utils/Common';
import Loader from "../CommonComponents/Loader";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    button: {
        width:225,
        borderRadius:50,
        backgroundColor:'#000',
        color:'#fff'
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

function TransferScreen(props){
  const classes = useStyles();
  const history = useHistory();
  const [payee, setPayee] = useState("");
  const [accountNumber,setAccountNumber] = useState('');
  const [amount, setAmount] = useState("");
  const [balance,setBalance] = useState("0");
  const [description,setDescription] = useState("");
  const [error,setError] = useState("");
  const [successMsg,setSuccessMsg] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const token = getToken();  
  const validateForm = () => {
      console.log('amount',amount,'accNo',accountNumber);
    return amount !== '' && accountNumber !== ''; 
  }

  useEffect(()=>{
    getBalance();
    getPayees();
  },[]);

  const getBalance = () => {
    setIsLoading(true);
    axios.get('https://green-thumb-64168.uc.r.appspot.com/balance',{
        headers:{
            'Authorization': token
        }
    }).then((res)=>{
        setBalance(res.data.balance);
        setIsLoading(false)
    }).catch((error)=>{
        setIsLoading(false);
    });
  }

  const getPayees = () => {
    setIsLoading(true);
    axios.get('https://green-thumb-64168.uc.r.appspot.com/payees',{
        headers:{
            'Authorization': token
        }
    }).then((res)=>{
        setPayee(res.data.data);
        setIsLoading(false)
    }).catch((error)=>{
        setIsLoading(false);
    });
  }

  const handleTransfer = (e) => {
      e.preventDefault();
      setIsLoading(true);
      if(amount < balance){
        axios.post('https://green-thumb-64168.uc.r.appspot.com/transfer',
            { "receipientAccountNo": accountNumber,
            "amount": parseInt(amount),
            "description": description,
           },{ headers:{
            'Authorization': token
        }}).then((res)=>{
            setIsLoading(false);    
            setError("");
            setSuccessMsg("Amount Transferred Successfully");
            setTimeout(() => {
                history.push('/dashboard');
            }, 2000);
            }).catch((error)=>{
                setIsLoading(false);     
                setError('Something Went Wrong');
            });
        }else{
            setIsLoading(false);
            setError("Due to insufficient balance not able to transfer");
        }
  }

  return (
    <>
    <div className={classes.root}>
      <form onSubmit={handleTransfer}>
      <Grid className={classes.backButton}>    
        <IconButton aria-label="delete" onClick={()=> history.replace('/dashboard')} className={classes.margin} size="small">
            <ArrowBack fontSize="16" />
        </IconButton>    
      </Grid>
      <h3 style={{textAlign:'left',padding:8,margin:5}}>Transfer</h3>  
        <Grid className={classes.paper}>
            <FormControl fullWidth>
                <InputLabel id="payee">Payee</InputLabel>
                <Select
                labelId="payee"
                id="payee"
                variant="outlined"
                label="Payee"
                onChange={(event)=>{setAccountNumber(event.target.value)}}
                >
               {payee !== '' && payee.length > 0 && payee.map((pData)=>
                <MenuItem value={pData.accountNo}>{pData.name}</MenuItem>
               )
               }
                </Select>
            </FormControl>
        </Grid>
        <Grid className={classes.paper}>
            <TextField id="amount"  type={"number"} label="Amount" className={classes.textInput}
             variant="outlined" onChange={(e) => setAmount(e.target.value)} />   
        </Grid>
        <Grid className={classes.paper}>
            <TextField
            id="description"
            label="Description"
            variant="outlined"
            className={classes.textInput}
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            />
        </Grid>
        <Grid className={classes.error}>{error}</Grid>
        <Grid className={classes.success}>{successMsg}</Grid>
        <Grid >
            <Button className={classes.button} variant="outlined" style={{backgroundColor: validateForm() ? '#000' : '#ccc',color:'#fff'}} disabled={!validateForm()} type="submit">
                 Transfer Now
            </Button>
        </Grid>
      </form>
    </div>
    <Loader open={isLoading}/>
    </>
  )
}

export default TransferScreen;