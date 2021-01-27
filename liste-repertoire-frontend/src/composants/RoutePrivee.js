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
                    if(window.location.pathname=="/admin"){
                        return (
                            <>
                                <Redirect to="/demande-speciale" />
                                
                            </>
                        );
                    }
                    return <Component {...props} />
                    
                } else {
                    return <Redirect to="/connection" />
                }
            }
            }
        />
    );
}

export default RoutePrivee;