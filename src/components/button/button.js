import propTypes from 'prop-types';
import '../styles.css';

export default function Button({ onClick }) {
  return (
    <div className="Button-block">
      <button type="button" className="Button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: propTypes.func,
};
