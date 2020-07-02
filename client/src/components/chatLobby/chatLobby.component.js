import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ChatRoom from './chatRoom.component';
import MainRoom from './mainRoom.component';
import { joinRoomListner, leaveRoomListner } from '../../socketAPI';

function ChatLobby(props) {
    const [rooms, setRooms] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    const { user } = props;
    
    useEffect(() => {
        function joinRoomFN(roomData) {
            setRooms(rooms => [...rooms, roomData]);
        }
        function leaveRoomFN(roomName) {
            setRooms(rooms => rooms.filter(room => room.name !== roomName))
        }
        joinRoomListner(joinRoomFN);
        leaveRoomListner(leaveRoomFN);
    },[]);

    useEffect(() => {
        setCurrentTab(rooms.length);
    }, [rooms]);

    return (
        <div className="main-frame container-fluid">
            <div className="row mt-4">
                <div className="col-12">
                    <Tabs forceRenderTabPanel={true} selectedIndex={currentTab} onSelect={(index) => setCurrentTab(index)} >
                        <TabList>
                            <Tab>Home</Tab>
                            {rooms.map((room) => (
                                <Tab key={room.name}>#{room.name}</Tab>
                            ))}
                        </TabList>

                        <TabPanel>
                            <MainRoom user={user} />
                        </TabPanel>
                        {rooms.map((room) => (
                            <TabPanel key={room.name}>
                                <ChatRoom room={room} user={user} />
                            </TabPanel>
                        ))}

                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ChatLobby;