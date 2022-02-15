# bot-editor

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```


## Interfaces

#### Editor
```
Editor: {
    scale: Number,
    scrollX: Number,
    scrollY: Number
}
```

#### Message
```
MessageObject: {
    state: String,
    id: String,
    type: String, // "start" || "default" || "end"
    nextState: String,
    connections: MessageConnections,
    options: MessageOptions,
    view: MessageView
}
MessageConnections: {
    input: Array,
    output: Array
}
MessageOptions: {
    text: String,
    title: String,
    buttons: Array
}
MessageView: {
    top: Number,
    left: Number
}
ButtonObject: {
    text: String,
    nextState: String,
    nextStateId: String
}
```