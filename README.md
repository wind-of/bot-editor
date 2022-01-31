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
    nextState: String, // another MessageObject.state, required if Length(this.options.buttons).equals(0)
    connections: MessageConnections,
    options: MessageOptions,
    view: MessageView
}
MessageConnections: {
    input: Array,
    output: Array
}
MessageOptions: {
    title: String,
    buttons: Array
}
MessageView: {
    top: Number,
    left: Number
}
ButtonObject: {
    text: String,
    nextState: String // another MessageObject.state
}
```