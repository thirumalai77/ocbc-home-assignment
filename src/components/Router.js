import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import PublicRoute from '../Utils/PublicRoute';
import PrivateRoute from '../Utils/PrivateRoute';
import Dashboard from './TransactionHistory';
import Header from './Header';
function Router(props){
    return(
        <>
         <BrowserRouter>
            <div className='body-content'>
            <Header />   
            <Switch>
                <PublicRoute path="/" exact component={Login} />
                <PublicRoute path="/register"  component={Register} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
            </div>  
        </BrowserRouter>
        </>
    )
}

export default Router;