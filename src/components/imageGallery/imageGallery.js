import propTypes from 'prop-types';
import '../styles.css';

export default function ImageGallery({ children }) {
  return <ul className="ImageGallery">{children}</ul>;
}

ImageGallery.propTypes = {
  children: propTypes.node,
};
