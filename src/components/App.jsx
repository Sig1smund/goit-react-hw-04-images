import { useState, useEffect, useRef } from 'react'
import SearchBar from './searchBar'
import ImageGallery from './imageGallery'
import ImageGalleryItem from './imageGalleryItem';
import fetcher from 'services/fetch';
import Button from './button';
import Loader from './loader';
import Modal from './modal';
import './styles.css';

export default function App() {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [spinner, setSpinner] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [tags, setTags] = useState('');
  const [modal, setModal] = useState(false);
  const [hits, setHits] = useState([]);

  const prevSearch = useRef(search);

  const  modalClickToggler = () => {
      return setModal(!modal)
    }

  const getLargeImgURL = (largeIMG, tags) => {
      setLargeImg(largeIMG);
      setTags(tags);
      setModal(true);
    }
  
  const handleButtonCLick = () => {
    setPage(state => state + 1);
  }

  const handleFormSubmit = search => {
    if (search !== prevSearch) {
      setSearch(search);
      setPage(1);
      setItems([])
    }

  }
  
  useEffect(() => {
    if (!search) {
      return
    }

    setSpinner(true);
    fetcher(search, page)
      .then((elements) => {
        if (elements.hits.length === 0) {
          window.alert(`No images found by keyword ${search}`)
        }
        setItems(prevItems => ([...prevItems, ...elements.hits]));
        setHits([...elements.hits]);
      })
      .finally(() => { setSpinner(false) }).catch(error => console.log(error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  return (
      <>
        <SearchBar onSubmit={handleFormSubmit} />
        <ImageGallery>
          <ImageGalleryItem data={items} options={getLargeImgURL}/>
        </ImageGallery>
        {(items.length > 0 && hits.length === 12) && <Button onClick={handleButtonCLick} />}
        {spinner && <Loader />}
        {modal && <Modal link={largeImg} name={tags} onToggle={modalClickToggler} />}
      </>
  );
}
// class App extends Component {
//   state = {
//     search: '',
//     items: [],
//     page: 1,
//     spinner: false,
//     largeIMG: '',
//     tags: '',
//     modal: false,
//     hits: [],
//   }

//   modalClickToggler = () => {
//     return this.setState(({ modal }) => ({
//       modal: !modal,
//     }))
//   }
  
//   getLargeImgURL = (largeIMG, tags) => {
//     return this.setState({ largeIMG, tags, modal: true})
//   }

//   handleButtonCLick = () => {
//     this.setState(prevState => {
//     return {page:prevState.page+1}
//     })
//   }

//   handleFormSubmit = search => {
//     return this.setState({ search, page: 1 });
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const prevSearch = prevState.search;
//     const newSearch = this.state.search;
//     const { search, page } = this.state;

//     if (prevSearch !== newSearch) {
//       this.setState({
//         items: [],
//         page: 1,
//       })
//     }

//     if (prevSearch !== newSearch || prevState.page !== this.state.page) {
//       this.setState({
//         spinner: true,
//       });
        
//       fetcher(search, page)
//         .then((items) => {
//           if (items.hits.length === 0) {
//             alert(`No images found by keyword ${search}`)
//           }
//           this.setState({ items: [...this.state.items, ...items.hits], hits: items.hits })
//         })
//         .finally(() => { this.setState({ spinner: false }) })
//     }
//   }

//   render() {
//     const { items, spinner, largeIMG, modal, tags, hits } = this.state;
//     return (
//       <>
//         <SearchBar onSubmit={this.handleFormSubmit} />
//         <ImageGallery>
//           <ImageGalleryItem data={items} options={this.getLargeImgURL}/>
//         </ImageGallery>
//         {(items.length > 0 && items.length === hits.length) && <Button onClick={this.handleButtonCLick} />}
//         {spinner && <Loader />}
//         {modal && <Modal link={largeIMG} name={tags} onToggle={this.modalClickToggler} />}
//       </>
//   );
//   }
// };
