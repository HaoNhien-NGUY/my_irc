import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ChatRoom from './chatRoom.component';
import MainRoom from './mainRoom.component';
import { joinRoomListner, leaveRoomListner } from '../../socketAPI';

function ChatLobby(props) {
    const [rooms, setRooms] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    const { username } = props;
    
    useEffect(() => {
        function joinRoomFN(roomData) {
            setRooms(rooms => [...rooms, roomData]);
        }
        function leaveRoomFN(roomName) {
            console.log(roomName);
            
            setRooms(rooms => rooms.filter(room => room.name !== roomName))
        }
        joinRoomListner(joinRoomFN);
        leaveRoomListner(leaveRoomFN);
    },[]);

    useEffect(() => {
        setCurrentTab(rooms.length);
    }, [rooms]);


    // const roomExample = {name: room};
    // useEffect(() => {
    //     function leaveFN(roomToLeave) {
    //         setRooms(rooms => rooms.filter(room => room.name !== roomToLeave));
    //     }
    //     roomLeaveListner(leaveFN);
    // });

    return (
        <div className="main-frame container-fluid">
            <div className="row mt-4">
                <div className="col-12">
                    <Tabs forceRenderTabPanel={true} selectedIndex={currentTab} onSelect={(index) => setCurrentTab(index)} >
                        <TabList>
                            <Tab>Main</Tab>
                            {rooms.map((room, i) => (
                                <Tab key={i}>{room.name}</Tab>
                            ))}
                        </TabList>

                        <TabPanel>
                            <MainRoom username={username} />
                        </TabPanel>
                        {rooms.map((room) => (
                            <TabPanel key={room.name}>
                                <ChatRoom room={room} username={username} />
                            </TabPanel>
                        ))}

                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ChatLobby;