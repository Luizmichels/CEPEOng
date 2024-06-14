import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Notificacao from "./notificacao";

class Notificacoes extends React.Component {
  handleRequestHide = (notificacao) => () => {
    const { onRequestHide } = this.props;
    if (onRequestHide) {
      onRequestHide(notificacao);
    }
  };

  render() {
    const { notificacoes, enterTimeout, laeveTimeout } = this.props;
    const className = `notification-container ${
      notificacoes.length == 0 ? "notification-container-empty" : ""
    }`;
    return (
      <div className={className}>
        <TransitionGroup>
          {notificacoes.map((notificacao) => {
            const key = notificacao.id || new Date().getTime();
            return (
              <CSSTransition
                className="notification"
                Key={key}
                timeout={{ exit: laeveTimeout, enter: enterTimeout }}
              >
                <Notificacao
                  key={key}
                  {...notificacao}
                  onRequestHide={this.handleRequestHide(notificacao)}
                  customClassName={`rounded ${notificacao.customClassName}`}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    );
  }
}

Notificacoes.defaultProps = {
    notificacoes: [],
    onRequestHide: () => {},
    enterTimeout: 400,
    leaveTimeout: 400,
  };

export default Notificacoes;
