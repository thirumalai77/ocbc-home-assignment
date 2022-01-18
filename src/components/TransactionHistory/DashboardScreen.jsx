import React,{useState,useEffect} from 'react';
import {Grid,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { getToken,formatDate,formatNumber } from '../../Utils/Common';
import Loader from '../CommonComponents/Loader';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme)=>({
    transactionContainer: {
        backgroundColor: 'rgb(255, 255, 255)',
        margin: 15,
        borderRadius: 20,
        textAlign: 'left',
        padding: 15,
        boxShadow: '0px 2px 8px #ccc',
        fontSize:15
      },
      accountHolderContainer: {
        backgroundColor: 'rgb(255, 255, 255)',
        marginLeft: -10,
        borderRadius: '0 20px 20px 0',
        textAlign: 'left',
        padding: 15,
        paddingTop: 1,
        boxShadow: '2px 2px 10px #ccc',
        fontSize:16
      },
      dateTitle:{
          color: 'rgb(173,173,173)',
          margin:'0 0 5px 0',
          fontWeight:'bold'
      },
      accountName:{
        marginBottom: 5,
        fontWeight: 'bold'
      },
      accountNo: {
        margin: 0,
        fontSize: 10,
        color: 'rgb(173,173,173)',
        fontWeight: 'bold'
      },
      amount:{
          textAlign:'right',
          color: 'rgb(173,173,173)',
          fontSize:15,
          fontWeight:'bold'
      },
      receivedAmount:{
        textAlign:'right',
        color: '#40c463',
        fontSize:15,
        fontWeight:'bold'
      },
      transactionTitle:{
        textAlign: 'left',
        padding: '20px 0 0 20px',
        fontWeight: 'bold'
      },
      balance:{
        fontSize: 30,
        margin: 0,
        fontWeight: 'bold'
      },
      holderTitle:{
        color: 'rgb(173,173,173)',
        fontWeight:'bold',
        marginBottom:5,
      },
      holderContent: {
        margin: 0,
        fontSize: 17,
        color: '#000',
        fontWeight: 'bold'
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      button: {
        width:'100%',
        borderRadius:50
    }
}))

function DashboardScreen(props){
const classes = useStyles();  
const history = useHistory();
const [transactionDetails,setTransactionDetails] = useState([]);    
const [isLoading,setIsLoading] = useState(false);
const [balance,setBalance] = useState('');
const [accountNumber,setAccountNumber] = useState('');

useEffect(()=>{
    getTransactionDetails();
},[]);

const getTransactionDetails = () => {
    let token = getToken();  
    setIsLoading(true);

    axios.get('https://green-thumb-64168.uc.r.appspot.com/balance',{
        headers:{
            'Authorization': token
        }
    }).then((res)=>{
        setAccountNumber(res.data.accountNo);
        setBalance(res.data.balance);
        setIsLoading(false)
    }).catch((error)=>{
        setIsLoading(false);
    });

    axios.get('https://green-thumb-64168.uc.r.appspot.com/transactions',{
        headers:{
            'Authorization': token
        }
    }).then((res)=>{
        let transactionData = groupBy(res.data.data,'transactionDate');
        setTransactionDetails(transactionData);
        setIsLoading(false)
    }).catch((error)=>{
        setIsLoading(false);
    })
}

const groupBy = (array, key) => {
    return array.reduce((result, currentItem) => {
      let getDate = currentItem[key].split('T')[0];
      (result[getDate] = result[getDate] || []).push( currentItem );
      return result;
    }, {}); 
  };

const renderAccountHolderDetails = () => {
    return (
        <Grid item xs='10' md='10' className={classes.accountHolderContainer}>
             <Grid item xs='12' md='12'>
                <p className={classes.accountName}>{'You have'}</p>
                <p className={classes.balance}>{'SGD '+formatNumber(balance)}</p>
            </Grid>
            <Grid item xs='12' md='12'>
                <p className={classes.holderTitle}>{'Account No'}</p>
                <p className={classes.holderContent}>{accountNumber}</p>
            </Grid>
            <Grid item xs='12' md='12'>
                <p className={classes.holderTitle}>{'Account Holder'}</p>
                <p className={classes.holderContent}>{sessionStorage.getItem('userInfo').split('"').join("")}</p>
            </Grid>
        </Grid>
    )
}  

const renderTransactionDetails = () => {
    return transactionDetails !== null && Object.keys(transactionDetails).map((tIndex)=>{
        let getDate = formatDate(tIndex);
        return (
                <Grid className={classes.transactionContainer}>
                    <p className={classes.dateTitle}>{getDate}</p>
                    {
                       transactionDetails[tIndex].length > 0 && transactionDetails[tIndex].map((tData)=>{
                           let accountHolder = tData.transactionType === 'transfer' ? tData.receipient.accountHolder : tData.sender.accountHolder;
                           let accountNo = tData.transactionType === 'transfer' ? tData.receipient.accountNo : tData.sender.accountNo;
                            return(
                                <Grid container spacing={2}>
                                    <Grid item xs='8' md='8'>
                                        <p className={classes.accountName}>{accountHolder}</p>
                                        <p className={classes.accountNo}>{accountNo}</p>
                                    </Grid>
                                    <Grid item xs='4' md='4'>
                                        {tData.transactionType === 'transfer' ?
                                         <p className={classes.amount}>{'-'+formatNumber(tData.amount)}</p>
                                         :
                                         <p className={classes.receivedAmount}>{formatNumber(tData.amount)}</p>
                                        }
                                    </Grid>
                                </Grid>
                            )
                       })
                    }
                </Grid>
            );
        })
}

return (
    <>
        <Grid>
            {renderAccountHolderDetails()}
            <p className={classes.transactionTitle}>{'Your Transaction History'}</p>
            {renderTransactionDetails()}
            <Grid className={classes.paper}>
            <Button onClick={() => history.replace('/transfer') } style={{backgroundColor: '#000',color:'#fff'}} 
             className={classes.button} variant="outlined" type="button">
                 Make Transfer
            </Button>
        </Grid>
        </Grid>
        <Loader open={isLoading}/>
    </>
);
}

export default DashboardScreen;