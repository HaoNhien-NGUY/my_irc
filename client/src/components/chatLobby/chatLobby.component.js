import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ChatRoom from './chatRoom.component';
import { roomLeaveListner } from '../../socketAPI';

function ChatLobby(props) {
    const [rooms, setRooms] = useState([{ name: 'Global' }, { name: 'room1' }]);
    const [newMessage, setNewMessage] = useState();

    const testevent = (message) => {
        setNewMessage(message);
    }

    useEffect(() => {
        console.log('new render');
    })

    // const roomExample = {name: room};
    useEffect(() => {
        function leaveFN(roomToLeave) {
            setRooms(rooms => rooms.filter(room => room.name != roomToLeave));
        }
        roomLeaveListner(leaveFN);
    });

    return (
        <div className="main-frame container-fluid">
            <div className="row mt-4">
                <div className="col-12">
                    <Tabs forceRenderTabPanel={true}>
                        <TabList>
                            {rooms.map((room, i) => (
                                <Tab key={i}>{room.name}</Tab>
                            ))}
                        </TabList>

                        {rooms.map((room, i) => (
                            <TabPanel key={i}>
                                <ChatRoom testevent={testevent} room={room.name} />
                            </TabPanel>
                        ))}

                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ChatLobby;