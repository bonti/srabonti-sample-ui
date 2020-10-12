import * as React from 'react';
import { useEffect, useContext , useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Card, Row, Col } from 'antd';
import * as PortalConstants from '../../../utility/constants';
import { Switch, Route } from 'react-router-dom'
import * as gfunctions from '../../../utility/generalFunctions'; 
import { withRouter } from "react-router"; 
import UserContext from './../../../context/UserContext'; 
import { UserProvider } from '../../../context/UserContext';
import CommonMenu from './CommonMenu';
import MobileMenu from './MobileMenu';

import "./Home.less";
import Playlists from '../Playlist/Playlists';
import Songs from '../Song/Songs';
import Artists from '../Artists/Artists';
import { withCookies } from 'react-cookie';
const Home = (props) => {

    const user = useContext(UserContext);
    const Meta = Card.Meta;
    const location = useLocation();
    const [userInfo, setUserInfo] = useState(user)

    useEffect(() => { 
     
     if(userInfo === null || userInfo === undefined && (location.state === null || location.state=== undefined)){
        let cookies = props.cookies; 
        cookies.remove(PortalConstants.AUTH_TOKEN, {
          path: '/'
        });
        props.history.push('/musicmanager/login');
     }
     else{
         if(userInfo === null || userInfo === undefined && (location.state!== null && location.state!==undefined) ){
             setUserInfo(location.state.userInfo);
         }
     }
    });

    return (
        <>
            <UserProvider value={userInfo}>  
                <Layout className="layout">
                <div>
                <div style={{ float: "left" }}/> 
                <div style={{ float: "right" }}> 
                    <Row>
                        <Col span={24}> 
                                    <CommonMenu  mode="horizontal" show={true} 
                                      userInfo={userInfo}
                                      fullName={userInfo !== null && userInfo!== undefined? userInfo.name: ""}
                                    />

                               
                        </Col>
                    </Row> 
                    </div>
                    </div>
                    <Layout>
                        <div style={{ minHeight: 280 , margin:"25px"}}>
                            <Switch>
                                <Route exact path="/" user={userInfo} component={Playlists}></Route>
                                <Route path="/home/playlists" user={userInfo} component={Playlists} />
                                <Route path="/home/songs" user={userInfo} component={Songs}></Route>
                                <Route path="/home/artists" user={userInfo} component={Artists}></Route> 
                            </Switch>
                        </div>
                    </Layout>
                </Layout>
            </UserProvider>


        </>

    );
}
export default withCookies (withRouter(Home));