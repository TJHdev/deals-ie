import React, { Component, createContext } from 'react';

const ModalContext = createContext({
  component: null,
  props: {},
  showModal: () => {},
  hideModal: () => {}
});

export class ModalProvider extends Component {
  // shows the modal
  showModal = (component, props = {}) => {
    this.setState({
      component,
      props
    });
  };

  // hides the modal
  hideModal = () =>
    this.setState({
      component: null,
      props: {}
    });

  // state to inject into the provider
  state = {
    component: null,
    props: {},
    showModal: this.showModal,
    hideModal: this.hideModal
  };

  render() {
    return <ModalContext.Provider value={this.state}>{this.props.children}</ModalContext.Provider>;
  }
}

export const ModalConsumer = ModalContext.Consumer;

export const ModalRoot = () => (
  <ModalConsumer>
    {({ component: Component, props, hideModal }) =>
      Component ? <Component {...props} onRequestClose={hideModal} /> : null
    }
  </ModalConsumer>
);
