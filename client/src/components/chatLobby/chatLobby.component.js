import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ChatRoom from './chatRoom.component';
import MainRoom from './mainRoom.component';
// import { roomLeaveListner } from '../../socketAPI';

function ChatLobby(props) {
    const [rooms, setRooms] = useState([]);
    const { username } = props;

    //plutot un useeffect, du genre socket.on('joinRoom')
    function handleJoinRoom() {

    }

    function handleLeaveRoom() {

    }

    // useEffect(() => {
    //     console.log(rooms.length);
    // })


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
                    <Tabs forceRenderTabPanel={true} defaultIndex={rooms.length}>
                        <TabList>
                            <Tab>Main</Tab>
                            {rooms.map((room, i) => (
                                <Tab key={i}>{room.name}</Tab>
                            ))}
                        </TabList>

                        <TabPanel>
                            <MainRoom username={username} />
                        </TabPanel>
                        {rooms.map((room, i) => (
                            <TabPanel key={i}>
                                <ChatRoom room={room.name} username={username} />
                            </TabPanel>
                        ))}

                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ChatLobby;