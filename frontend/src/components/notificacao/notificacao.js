import { useEffect } from "react";

export default function Notificacao({
  titulo,
  tipo,
  mensagem,
  tempo,
  onRequestHide,
  customClassName,
}) {
  const requestHide = () => {
    if (onRequestHide) {
      onRequestHide();
    }
  };

  useEffect(() => {
    let timer = null;
    if (tempo != 0) {
      timer = setTimeout(requestHide, tempo);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  });

  const tituloHtml = titulo ? <h4 className="title">{titulo}</h4> : null;

  return (
    <div className={`notification notification-${tipo} ${customClassName}`}>
      <div className="notification-message">
        {tituloHtml}
        <div className="message">{mensagem}</div>
      </div>
    </div>
  );
}
