import bus from '../utlis/bus';

//../utils/bus

export default function useFlashMessage() {
  function setFlashMessage(msg, type) {
    bus.emit('flash', {
      message: msg,
      type: type,
    });
  }

  return { setFlashMessage };
}
