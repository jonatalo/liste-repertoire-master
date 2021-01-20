import { Redirect, Route } from 'react-router-dom';
import {UtiliseAuth} from './context/auth';

function RoutePrivee({component: Component,...reste}){
    const estAuthenfie = UtiliseAuth();

    return(
        <Route {...reste}
            render={(props) => estAuthenfie ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
}

export default RoutePrivee;