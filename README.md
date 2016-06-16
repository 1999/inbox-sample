# Sample HTML like inbox.google.com

## UI elements:

* header with:
  * sandwich icon
  * either searchbar or text + icons
  * some icons to the right
  * avatar

* nav which is either hidden to the left or not
* content which is divided into days. Each day has so-called tasks which are either new (bold) or not. Also task can be opened, which means that it's not new anymore.

## Store
```
// tasks are more like threads
tasks: [{
    lastDate // thread's last message date
    avatar // thread's last message (not sent!) avatar (ref users)
    participants: [users]
    selected // either thread is open or not
    menuItems // tags
    active // thread is not open, just active

    messages: [
        active // message is not open, just active
        date
        sender // id
        recipients: [users]
        message
        conversationExpanded: bool
        expanded // whether message is open or not
        advanced // advanced mode
    ]
}]
loading: bool // show spinner for whole page
menu: {
    show: bool
    groups: [
        {
            id (gtd, gmail, bundled, unbundled)
            title
            items: [{
                id
                active: bool
                icon
                title
            }]
        }
    ]
}
pinned: bool // show only pinned
conversations: bool // show conversations popup
apps: bool // show apps popup
users: [{
    id,
    email
    name
    avatar
}]
```
