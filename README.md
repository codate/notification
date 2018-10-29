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
    
