import React,{useState} from 'react';
import {Button,TextField,Grid} from '@material-ui/core';
import {Nav,Navbar} from 'react-bootstrap';
import {userLogout} from '../../Utils/Common';
import { useHistory } from "react-router-dom";
import {getToken} from "../../Utils/Common";
function HeaderScreen(){
    const history = useHistory();
    const onLogout = () => {
        userLogout();
        history.push('/');
    }

    return (
    <Navbar className='' fixed="top" expand='lg'>
        {getToken() &&
        <div className="container">
            <Nav className="justify-content-end">
                <Button onClick={()=>onLogout()}> Logout </Button>
            </Nav>
        </div>
        }
        </Navbar>
    )
}

export default HeaderScreen;