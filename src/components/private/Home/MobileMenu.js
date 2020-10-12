import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Button, Menu } from 'antd'; 
import { withCookies } from 'react-cookie';
import * as PortalConstants from '../../../utility/constants';
import { withRouter } from 'react-router-dom'; 
import * as gfunctions from '../../../utility/generalFunctions'; 
 
import { CloseCircleOutlined, MenuFoldOutlined, HomeOutlined, UserOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import MenuItem from 'antd/lib/menu/MenuItem';

 
const MobileMenu = (props)=>  {
    
        const [mode, setMode] =useState(props.menumode);
        const [mobileCollapsed, setMobileCollapsed] =useState(false);
      const doLogout = () => {
        let cookies = this.props.cookies; 
        cookies.remove(PortalConstants.AUTH_TOKEN, {
          path: "/"
        });
        let loginPath = "/musicmanager/login";
        
          this.props.history.push(loginPath);
        
      }

      const toggleCollapsed = () => {
        setMobileCollapsed(!mobileCollapsed);
      };
     
          return (
          <div>
                <div style={{ float: "right", margin: "25px 10px 25px 25px" }}>
                    <Button
                        onClick={toggleCollapsed}
                        style={{ marginBottom: 5, border: "none" }}
                    >
                        {mobileCollapsed? <CloseCircleOutlined></CloseCircleOutlined> : <MenuFoldOutlined></MenuFoldOutlined>}
                        &nbsp; MENU
                    </Button>
                </div>        
                <Menu 
                    onClick = {toggleCollapsed}
                    defaultSelectedKeys={['home']}
                    style={{ float: "left", width: "100%" }}
                    theme="light"
                    visible={mobileCollapsed}
                    mode="vertical"
                >
                      <Menu.Item key='home'>
                      <Link to='/home/playlists'>
                        <HomeOutlined />
                          Playlists Home
                      </Link></Menu.Item>
                    
                    <Menu.Item key='songs'>
                        <Link to='/home/songs'> 
                        <CustomerServiceOutlined></CustomerServiceOutlined>
                           Songs
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='artists'>
                        <Link to='/home/artists'> 
                          <UserOutlined></UserOutlined>
                            Artists
                        </Link>
                    </Menu.Item>
                        <Menu.Divider style={{height:'1.5px'}} />
                      

                        <Menu.Item style={{fontSize:'16px'}} onClick={() => doLogout()}> 
                        Logout
                    </Menu.Item> 
                      </Menu>
        </div>
        );
    
}

 export default withCookies(withRouter((MobileMenu)));
