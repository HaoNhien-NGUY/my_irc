import React from 'react';

const botName = 'chatBOT'

export function welcomeMessage(username) {
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
    return [{author: botName ,content}, {author: botName, content:'You will receive your private messages here.'}];
}