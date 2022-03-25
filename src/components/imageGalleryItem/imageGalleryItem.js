import propTypes from 'prop-types';
import '../styles.css';

export default function ImageGalleryItem({ data, options }) {
  return data.map(item => {
    return (
      <li key={item.id} className="ImageGalleryItem">
        <img
          src={item.webformatURL}
          srcSet={item.largeImageURL}
          alt={item.tags}
          className="ImageGalleryItem-image"
          onClick={() => options(item.largeImageURL, item.tags)}
        />
      </li>
    );
  });
}

ImageGalleryItem.propTypes = {
  data: propTypes.array,
  options: propTypes.func,
};
