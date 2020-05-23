import React from 'react';
import ListItem from './listItem.component';

function RoomList(props) {
    const { list } = props;

    return (
        <div className="col-6 h-100">
            <div className="room-list">
                <h3 className="pl-4 py-3 mb-0">Room list</h3>
                <div className="list">
                    {list.map(room => <ListItem room={room} key={room} /> )}
                </div>
            </div>
        </div>
    )
}

export default RoomList;