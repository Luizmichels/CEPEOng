import EventEmitter from "events";

const createUUID = () => {
  const pattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  return pattern.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const Constants = {
  CHANGE: "change",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
};

class NotificacaoManager extends EventEmitter {
  constructor() {
    super();
    this.listaNot = [];
  }

  create(notify) {
    const defaultNotify = {
      id: createUUID(),
      tipo: "info",
      titulo: null,
      mensagem: null,
      tempo: 5000,
      customClassName: '',
    };
    if (notify.priority) {
      this.listaNot.unshift(Object.assign(defaultNotify, notify));
    } else {
      this.listaNot.push(Object.assign(defaultNotify, notify));
    }
    this.emitChange();
  }

  primary(mensagem, titulo, tempo, customClassName, onClick, priority) {
    this.create({
      tipo: Constants.PRIMARY,
      mensagem,
      titulo,
      tempo,
      onClick,
      priority,
      customClassName,
    });
  }

  secondary(mensagem, titulo, tempo, onClick, priority, customClassName) {
    this.create({
      tipo: Constants.SECONDARY,
      mensagem,
      titulo,
      tempo,
      onClick,
      priority,
      customClassName,
    });
  }

  info(mensagem, titulo, tempo, onClick, priority, customClassName) {
    this.create({
      tipo: Constants.INFO,
      mensagem,
      titulo,
      tempo,
      onClick,
      priority,
      customClassName,
    });
  }

  success(mensagem, titulo, tempo, customClassName, onClick, priority) {
    this.create({
      tipo: Constants.SUCCESS,
      mensagem,
      titulo,
      tempo,
      onClick,
      priority,
      customClassName,
    });
  }

  warning(mensagem, titulo, tempo, onClick, priority, customClassName) {
    this.create({
      tipo: Constants.WARNING,
      mensagem,
      titulo,
      tempo,
      onClick,
      priority,
      customClassName,
    });
  }

  error(mensagem, titulo, tempo, onClick, priority, customClassName) {
    this.create({
      tipo: Constants.ERROR,
      mensagem,
      titulo,
      tempo,
      onClick,
      priority,
      customClassName,
    });
  }

  remove(notification) {
    this.listaNot = this.listaNot.filter((n) => notification.id !== n.id);
    this.emitChange();
  }

  emitChange() {
    this.emit(Constants.CHANGE, this.listaNot);
  }

  addChangeListener(callback) {
    this.addListener(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new NotificacaoManager();
