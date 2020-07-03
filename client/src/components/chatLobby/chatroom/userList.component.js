import React from 'react';
import ListItem from './listItem.component';

function UserList(props) {
    const { list } = props;

    return (
        <div className="user-list">
            <h4 className="list-title pl-2">Online &nbsp;&nbsp;-&nbsp;&nbsp; {list.length}</h4>
            <div className="list">
                {list.map(user => <ListItem user={user} key={user}/>)}
            </div>
        </div>
    )
}

export default UserList;