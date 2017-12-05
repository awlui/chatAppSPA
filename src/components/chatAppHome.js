import React, {Component} from 'react';
import {FriendsList} from './friendsList';
class chatApp extends Component {
  render = () => {
    return (
      <div>
        <FriendsList>
        </FriendsList>
      </div>
    )
  } 

}

export {
  chatApp as Component
}