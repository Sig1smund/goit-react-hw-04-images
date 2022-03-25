import { Component } from 'react';
import propTypes from 'prop-types';
import '../styles.css';

export default class Modal extends Component {
  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onToggle();
    }
  };

  onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onToggle();
    }
  };

  onImageClick = e => {
    if (e.target.nodeName === 'IMG') {
      this.props.onToggle();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    const { link, name } = this.props;
    return (
      <div className="Overlay" onClick={this.onOverlayClick}>
        <div className="Modal">
          <img src={link} alt={name} onClick={this.onImageClick} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  link: propTypes.string,
  name: propTypes.string,
  onToggle: propTypes.func,
};
