import React from "react";
 
import {
  Route,
  Redirect
} from "react-router-dom";
import { isNullOrUndefined } from "util";

function AuthenticatedRoute({ component: Component, ...rest}) {
  let loginPathName= "/musicmanager/login";
  
    return (
      <Route
        {...rest}
        render={props =>  // Arbitrary length check
         ( !isNullOrUndefined(rest.props.authToken) && rest.props.authToken !== "undefined" && rest.props.authToken.length >1) ? (
            <Component {...props} />
          ) : (

            <Redirect to = {loginPathName}/>
          )
      }
    />
  );
}
 
export default(AuthenticatedRoute)