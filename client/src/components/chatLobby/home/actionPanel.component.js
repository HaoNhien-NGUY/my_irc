import React, { useState } from 'react';
import socket from '../../../socketAPI';

function ActionPanel(props) {
    const [createInput, setCreateInput] = useState('');
    const [modifyInput, setModifyInput] = useState(props.username);

    function handleCreateChange(event) {
        setCreateInput(event.target.value)
    }

    function handleModifyChange(event) {
        setModifyInput(event.target.value)
    }

    function handleCreateRoom(event) {
        event.preventDefault();
        socket.emit('create', {command: createInput, room: props.room});
        setCreateInput('');
    }

    function handleModifyUsername(event) {
        event.preventDefault();
        socket.emit('nick', {command: modifyInput, room: props.room});
    }

    return (
        <div className="col-6 h-100">
            <div className="action-panel">
                <div className="form">
                    <h4 className="pl-2 py-1 mb-3">Create a room</h4>
                    <form className="d-flex pb-2" onSubmit={handleCreateRoom}>
                        <input type="text" className="pl-3 form-control" style={{ fontSize: '18px', marginRight: '10px' }} autoComplete="off" placeholder="Enter a room name" value={createInput} onChange={handleCreateChange} />
                        <button type="submit" className="btn btn-create">Create</button>
                    </form>
                </div>
                <div className="form mt-4">
                    <h4 className="pl-2 py-1 mb-3">Change your username</h4>
                    <form className="d-flex pb-2" onSubmit={handleModifyUsername}>
                        <input type="text" className="pl-3 form-control" style={{ fontSize: '18px', marginRight: '10px' }} autoComplete="off" placeholder="Enter a new username" value={modifyInput} onChange={handleModifyChange} />
                        <button type="submit" className="btn btn-create">Change</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ActionPanel;