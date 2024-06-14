import React from "react";
import NotificacaoManager from "./notificacaoManager";
import Notificacoes from "./notificacoes";

class NotificacaoContainer extends React.Component {
  constructor(props) {
    super(props);
    NotificacaoManager.addChangeListener(this.handleStoreChange);
    this.state = {
      notificacoes: [],
    };
  }

  componentWillUnmount() {
    NotificacaoManager.removeChangeListener(this.handleStoreChange);
  }

  handleStoreChange = (notificacoes) => {
    this.setState({ notificacoes });
  };

  handleRequestHide = (notificacao) => {
    NotificacaoManager.remove(notificacao);
  };

  render() {
    const { notificacoes } = this.state;
    const { enterTimeout, laeveTimeout } = this.props;
    return (
      <Notificacoes
        enterTimeout={enterTimeout}
        laeveTimeout={laeveTimeout}
        notificacoes={notificacoes}
        onRequestHide={this.handleRequestHide}
      />
    );
  }
}

NotificacaoContainer.defaultProps = {
  enterTimeout: 400,
  leaveTimeout: 400,
};

export default NotificacaoContainer;
