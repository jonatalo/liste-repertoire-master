import { Redirect, Route } from 'react-router-dom';
import {UtiliseAuth} from '../context/auth';

function RoutePrivee({component: Component,...reste}){
    const {authentification} = UtiliseAuth();

    return(
        <Route {...reste}
            render={(props) => authentification ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/connection" />
                )
            }
        />
    );
}

export default RoutePrivee;