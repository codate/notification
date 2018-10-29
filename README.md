# @codate/notification

Responsible for sending and receiving messages for both chat and generic notifications.

## Requirement

To run this micro service you must have a mongodb database previously installed and configured


## How to start

```bash
PORT=8085
DB_URL=mongodb://localhost/notification
npm run start 

```
## How to use

**Join**<br />
    So that you can receive notifications, first, you need join with your person object reference.
    To do this, emit a person object to join, ex.:
```javascript
const person = {
    "_id":"5bbce640a588e463967fe2a1",
    "name":"Fulano Silva",
    "photo":"..."
}
socket.emit("join", person)
```
**Send notification**<br />
    You can send a notification to a person following this example: 
```javascript
const notification = {
    "from":{
        "_id":"5bbce640a588e463967fe2a1",
        "name":"Fulano Silva",
        "photo":"..."
    },
    "to":{
        "_id":"5bbe54dec1c10a24c4b71e6a",
        "name":"Beltrano Santos",
        "photo":"..."
    },
    "group":"Codate",
    "content":"Good Morning!"
}
socket.emit("sendNotification", notification)
```
**Receiving a notification**<br />
    You can receive a notification from a person in real time, just listening "receiveNotification" on function "on", example:  
```javascript
socket.on("receiveNotification",(notification) => {
    console.log(notification.content)
})
```
   Observation: Take a look on Join first

**Getting notifications**<br />
    To getting your notifications, you need to send person _id and group in json object to "getMyNotifications", example:
```javascript
const myData = {   
    "to":{
        "_id":"5bbe54dec1c10a24c4b71e6a"
    },
    "group":"Codate"
}
socket.emit("getMyNotifications", myData)
```
    
   You will receive the notifications on "receiveMyNotifications":  
```javascript
socket.on("receiveMyNotifications",(notifications) => {
    notifications.forEach((notification) => 
        console.log(notification.content)
    })
})
```

**Getting group notifications**<br />
    To getting group notifications, you need to send group in json object to "getGroupNotifications", example:
```javascript
const myData = {   
    "group":"Codate"
}
socket.emit("getGroupNotifications", myData)
```
    
   You will receive the notifications on "receiveMyNotifications":  
```javascript
socket.on("receiveGroupNotifications",(notifications) => {
    notifications.forEach((notification) => 
        console.log(notification.content)
    })
})
```

**Marking a notification as read**<br />
   You can mark a notification as read following this example: 

```javascript
const notification = {
   "_id": "5bd3c5b08fee0811752aa571"
}
socket.emit("readNotification", notification)  
