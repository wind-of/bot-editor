import { 
  MESSAGE_TYPE_START, MESSAGE_TYPE_DEFAULT, MESSAGE_TYPE_END,
  DEFAULT_MESSAGE_OFFSET_X, DEFAULT_MESSAGE_OFFSET_Y,
  DEFAULT_BUTTON_TEXT
} from "@/constants.js"
import { uid } from "@/utils.js"

export const messages = [
  createMessage(),
]

function createMessage(params) {
  return {
    state: "SOME_STATE",
    id: uid(),
    type: MESSAGE_TYPE_DEFAULT,
    nextState: undefined,
    connections: {
      input: [],
      output: []
    },
    options: {
      text: "Some Long text for the message. Lorem Ipsum Dolor Sit Amet Consectetur Adipisking Elit.",
      title: "Some Title",
      buttons: [
        createButton()
      ]
    },
    view: {
      top: DEFAULT_MESSAGE_OFFSET_Y,
      left: DEFAULT_MESSAGE_OFFSET_X
    }
  }
}
function createButton(params) {
  return {
    text: DEFAULT_BUTTON_TEXT,
    nextState: undefined,
    nextStateId: undefined
  }
}