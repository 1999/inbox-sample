# Sample HTML like inbox.google.com

## Development
```bash
git clone git://github.com/1999/inbox-sample.git
cd inbox-sample
nvm use # if you use nvm for managing node versions
npm install
./node_modules/.bin/webpack-dev-server
open http://localhost:8080/webpack-dev-server/
```

## UI Example
`TODO`

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
    checked // either thread is checked or not
    open // either thread is open or not
    menuItem // tag
    active // thread is not open, just active

    messages: [{
        active // message is not open, just active
        date
        sender // id (ref users)
        recipients: [users]
        message
        conversationExpanded: bool
        expanded // whether message is open or not
        advanced // advanced mode
    }]
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
                color
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
