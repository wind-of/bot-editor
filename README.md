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
    options: MessageOptions,
    view: MessageView
}
MessageOptions: {
    title: String,
    buttons: Array
}
MessageView: {
    top: Number,
    left: Number,
}
ButtonObject: {
    text: String,
    nextState: String
}
```