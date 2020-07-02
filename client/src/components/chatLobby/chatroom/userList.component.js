import React from 'react';
import ListItem from './listItem.component';

function UserList(props) {
    const { list } = props;

    return (
        <div className="user-list">
            <h3 className="list-title pl-2">Users ({list.length})</h3>
            <div className="list">
                {list.map(user => <ListItem user={user} key={user}/>)}
            </div>
        </div>
    )
}

export default UserList;