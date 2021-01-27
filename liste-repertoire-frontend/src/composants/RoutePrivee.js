import { Redirect, Route } from 'react-router-dom';
import {UtiliseAuth} from '../context/auth';

function RoutePrivee({component: Component,...reste}){
    const {authentification} = UtiliseAuth();
    
    return(
        <Route {...reste}
            render={(props) => authentification==2 ? (
                    <Component {...props} />
                ) : authentification==1 ?  (
                    <>
                        <Component {...props} />
                        <Redirect to="/demande-speciale" />
                    </>
                ) : (
                    <Redirect to="/connection" />
                )
            }
        />
    );
}

export default RoutePrivee;