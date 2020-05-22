import React from 'react';

const botInfo = { author: 'chatBOT', type: 'bot' };

export function botWelcome(username) {
    const content = (<span>Welcome to my_irc <strong>{username}</strong> !
        <br /> <br /> <b>Here is a list of commands you can type : </b>
        <br /><b>/nick</b> [nickname] : change your nickname.
        <br /><b>/list</b> [string] : list all channels containing [string] if specified
        <br /><b>/create</b> [channel] : create a channel.
        <br /><b>/delete</b> [channel] : delete a channel.
        <br /><b>/join</b> [channel] : join a [channel].
        <br /><b>/part</b> [channel] : quit a [channel]
        <br /><b>/users</b> : list all users in the channel.
        <br /><b>/msg</b> [nickname] [message] : send a [message] to a specified [nickname].
    </span>
    )
    return [{ ...botInfo, content }, { ...botInfo, content: 'You will receive privates messages here.' }];
}

export function botJoinRoom(room) {
    const content = (
        <span>You joined <i>#{room.name}</i></span>
    )
    return { content, time: room.time };
}

export function botCommandError(action) {
    return { ...botInfo, content: `'/${action}' command doesn't exist.` };
}