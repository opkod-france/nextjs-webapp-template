type MessageState = {
  messages: { [key: string]: string };
};

type MessageAction =
  | { type: "set"; key: string; payload: string }
  | { type: "remove"; key: string }
  | { type: "reset" };

const messageReducer = (
  state: MessageState,
  action: MessageAction
): MessageState => {
  switch (action.type) {
    case "set":
      return {
        ...state,
        messages: { ...state.messages, [action.key]: action.payload },
      };
    case "remove":
      const newMessages = { ...state.messages };
      delete newMessages[action.key];
      return { ...state, messages: newMessages };
    case "reset":
      return { ...state, messages: {} };
    default:
      return state;
  }
};

export default messageReducer;
