import { Redirect, Route } from 'react-router-dom';
import {UtiliseAuth} from '../context/auth';

function RoutePrivee({component: Component,...reste}){
    const {authentification} = UtiliseAuth();
    
    
    return(
        <Route {...reste}
            render={(props) => {
                
                if (authentification == 2)  {
                    return <Component {...props} />
                }
                else if (authentification == 1) {
                    return (
                        <>
                            <Component {...props} />
                            <Redirect to="/demande-speciale" />
                            
                        </>
                    );
                } else {
                    return <Redirect to="/connection" />
                }
            }
            }
        />
    );
}

export default RoutePrivee;