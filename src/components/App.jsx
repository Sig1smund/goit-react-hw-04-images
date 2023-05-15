import { useState, useEffect, useRef } from 'react'
import SearchBar from './SearchBar'
import ImageGallery from './ImageGallery'
import ImageGalleryItem from './ImageGalleryItem';
import fetcher from 'services/fetch';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import './styles.css';

export default function App() {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(null)
  const [page, setPage] = useState(1);
  const [spinner, setSpinner] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [tags, setTags] = useState('');
  const [modal, setModal] = useState(false);

  const prevSearch = useRef(search);
  const Gallery = useRef(null);

  const modalClickToggler = () => {
    setModal(prevState => !prevState)
    ;
  };

  const getLargeImgURL = (largeIMG, tags) => {
    setLargeImg(largeIMG);
    setTags(tags);
    setModal(true);
  };
  
  const handleButtonCLick = () => {
    if (items.length < totalItems) {
      return setPage(state => state + 1);
    };
  };

  const handleFormSubmit = search => {
    if (search !== prevSearch) {
      setSearch(search);
      setPage(1);
      setItems([])
    };
  };

  const toScrollDownOnLoad = () => {
    const setHeight = Gallery.current.lastElementChild.clientHeight;
    window.scrollBy({ top: setHeight * 2.43, behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (!search) {
      return;
    };

    setSpinner(true);

    fetcher(search, page)
      .then(({ hits, totalHits }) => {
        if (totalHits === 0) {
          window.alert(`No images found by keyword ${search}`)
          return;
        };
        if (page === 1) {
          setItems([...hits])
          setTotalItems(totalHits)
        } else {
          setItems(prevState => [...prevState, ...hits])
          toScrollDownOnLoad();
        };
      })
      .catch(error => console.log(error))
      .finally(() => {
        setSpinner(false)
      });
  }, [search, page]);

  return (
      <>
        <SearchBar onSubmit={handleFormSubmit}/>
        <ImageGallery scroll={Gallery}>
          <ImageGalleryItem data={items} options={getLargeImgURL}/>
        </ImageGallery>
        {items.length < totalItems && <Button onClick={handleButtonCLick} />}
        {spinner && <Loader />}
        {modal && <Modal link={largeImg} name={tags} onToggle={modalClickToggler} />}
      </>
  );
}