import React,{useState,useEffect} from 'react';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { getToken } from '../../Utils/Common';

function DashboardScreen(props){
useEffect(()=>{
    getTransactionDetails();
},[])  
const getTransactionDetails = () => {
    let token = getToken();  
    axios.get('https://green-thumb-64168.uc.r.appspot.com/transactions',{
        headers:{
            'Authorization': token
        }
    }).then((res)=>{
        var arr = res.data.data;
//         const roots = {}
        let result = groupBy(arr,'transactionDate');
        console.log('ressss',result);
// arr.forEach((item) => {new Date(2013, 0, 32)
//       let year = new Date(item.transactionDate).getFullYear();  
//       let month = new Date(item.transactionDate).getMonth();
//       let date = new Date(item.transactionDate).getDate();
//       const formattedDate = new Date(year,month,date);
//       const currentList = roots[formattedDate] ?? []
//       Object.assign(roots, { [formattedDate]: [...currentList, item] })
//     });
//     console.log('result',roots);

//         var ref = {};
//         console.log('dddd',res.data.data);
// var result = arr.reduce(function(arr1, o) {
//   //  get month value
//   var m = new Date(o.transactionDate).getDate();
// console.log('mm',m)
//   // check already defined in the reference array
//   if (!(m in ref)) {
//   // define if not defined
//     ref[m] = arr1.length;
//     // push an empty array
//     arr1.push([]);
//   }
//   //console.log('ooo',o)
//   // push the object into the array
//   arr1[ref[m]].push(o);
//   // return array refernece
//   return arr1;
//   // set initial value as an empty array for result
// }, []);


// console.log(result);
    }).catch((error)=>{

    })
}

const groupBy = (array, key) => {
    // Return the reduced array
    return array.reduce((result, currentItem) => {
        let getDate = currentItem[key].split('T')[0];
      // If an array already present for key, push it to the array. Otherwise create an array and push the object.
      (result[getDate] = result[getDate] || []).push( currentItem );
      // return the current iteration `result` value, this will be the next iteration's `result` value and accumulate
      return result;
    }, {}); // Empty object is the initial value for result object
  };
return (
    <>
     DashboardScreen Screen
    </>
);
}

export default DashboardScreen;