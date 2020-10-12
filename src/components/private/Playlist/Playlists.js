import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, List, Card, Spin, Descriptions, Divider } from 'antd'; 
import { withRouter } from "react-router"; 
import UserContext from './../../../context/UserContext'; 
import useApi from '../../../hooks/useApi'; 
import * as PortalConstants from "../../../utility/constants"; 

import ErrorSummary from '../../common/ErrorComponents/ErrorSummary';
import './Playlists.less'
 
const Playlists = (props) => {

    const user = useContext(UserContext);
    const Meta = Card.Meta;
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    let fetchApiPath= "playlists/users/";
    if(location && location.state && location.state.userInfo){
        fetchApiPath+=location.state.userInfo.id;
    }
    const  [playlistsFetchResponse, playlistsFetchRequest] = useApi(fetchApiPath, null,PortalConstants.APIMETHODS.GET);
    const [playlistData , setPlaylistData] =useState(null);
    const [showError, setShowError] = useState(false);
    useEffect(() => {
        if(playlistData === null && !loading && !playlistsFetchResponse.isLoading && playlistsFetchResponse.hasError === false){
            setLoading(true);
            playlistsFetchRequest(null,PortalConstants.APIMETHODS.GET,fetchApiPath);
        }
    });

    useEffect(() => {
        setLoading(false);
        if(playlistsFetchResponse.data && !playlistsFetchResponse.error && !playlistsFetchResponse.isLoading && !playlistsFetchResponse.hasError){
          setPlaylistData(playlistsFetchResponse.data);
        }
        else if(playlistsFetchResponse.error && !playlistsFetchResponse.data && !playlistsFetchResponse.isLoading){
          setShowError(true);
        }
      }, [playlistsFetchResponse]);
     

    return (
        <>
        <Spin spinning={loading}>
            <h2>
                Playlists
            </h2>
            {playlistData && playlistData!==null && loading === false &&
            <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={playlistData}
            renderItem={item => (
            <List.Item>
                <Card title={item.name}>
                    <>
                    {item.description}
                <Descriptions>
                <Descriptions.Item label="Song Count">{item.songSet.length}</Descriptions.Item> 
                </Descriptions>

                <List
                dataSource={item.songSet}    
                pagination={{pageSize:2}}             
                    renderItem={songItem=>(
                    <List.Item> 
                        <Descriptions style={{marginBottom:"-25px !important"}} title={ songItem.name}>
                                            <Descriptions.Item style={{marginTop:"-25px !important"}} label="Artist">{songItem.artist}</Descriptions.Item>
                                            <Descriptions.Item label="Album">{songItem.album}</Descriptions.Item>
                                            <Descriptions.Item label="Genre">{songItem.genre}</Descriptions.Item>
                                            <Descriptions.Item label="Year"> {songItem.year}</Descriptions.Item>
                                            
                        </Descriptions> 
                    </List.Item>
                   
                    )}>
                </List>                      
                </>
                
                </Card>
            </List.Item>
            )}
            
            
            />
            }

            {playlistsFetchResponse.hasError && showError  &&
             <ErrorSummary error={playlistsFetchResponse.error} />
            }
         </Spin>
        </>

    );
}
export default withRouter(Playlists);