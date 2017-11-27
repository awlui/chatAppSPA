# WS Chat App
## Description
    A websocket chat application that utilizes the out-of-box features of socket.io such as rooms/namespaces and automatic reconnect. I created a Datamanager that manages the data I/O for the socket. The DataManager  ouputs events through a master observable stream. This master observable gets subscribed to by a switch statement that handles the dispatching of actions to the observable-based redux implementation, called Redjxs which I wrote myself. Changes to the redxjs store get reflected by the React Components. The application will be very similar to Facebook Messenger. Private Chatrooms with the ability to add new users to a room. It will also implement the "seen" feature.

### Related Repositories
1. [Socket Server](https://github.com/awlui/chatAppServer)
2. [DataManager](https://github.com/awlui/wsClient)
3. [Redjxs](https://github.com/awlui/redxjs)


### Future
After development of the web client has comple