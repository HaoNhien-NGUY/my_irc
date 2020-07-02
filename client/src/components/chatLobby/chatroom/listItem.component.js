import React from 'react';

function ListItem(props) {
    const { user } = props;

    return (
        <div className="list-item ml-4 mr-3 my-3 d-flex">
            <span>{user}</span>
        </div>
    )
}

export default ListItem;