import { Component } from 'react'
import SearchBar from './searchBar'
import ImageGallery from './imageGallery'
import ImageGalleryItem from './imageGalleryItem';
import fetcher from 'services/fetch';
import Button from './button';
import Loader from './loader';
import Modal from './modal';
import './styles.css';

  // const KEY = '25175728-94f0f247d27e4ed37775dc2a1';
  // const BASE_URL = 'https://pixabay.com/api';

class App extends Component {
  state = {
    search: '',
    items: [],
    page: 1,
    spinner: false,
    largeIMG: '',
    tags: '',
    modal: false,
    hits: [],
  }

  modalClickToggler = () => {
    return this.setState(({ modal }) => ({
      modal: !modal,
    }))
  }
  
  getLargeImgURL = (largeIMG, tags) => {
    return this.setState({ largeIMG, tags, modal: true})
  }

  handleButtonCLick = () => {
    this.setState(prevState => {
    return {page:prevState.page+1}
    })
  }

  handleFormSubmit = search => {
    return this.setState({ search, page: 1 });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.search;
    const newSearch = this.state.search;
    const { search, page } = this.state;

    if (prevSearch !== newSearch) {
      this.setState({
        items: [],
        page: 1,
      })
    }

    if (prevSearch !== newSearch || prevState.page !== this.state.page) {
      this.setState({
        spinner: true,
      });
        
      fetcher(search, page)
        .then((items) => {
          if (items.hits.length === 0) {
            alert(`No images found by keyword ${search}`)
          }
          this.setState({ items: [...this.state.items, ...items.hits], hits: items.hits })
        })
        .finally(() => { this.setState({ spinner: false }) })
    }
  }

  render() {
    const { items, spinner, largeIMG, modal, tags, hits } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery>
          <ImageGalleryItem data={items} options={this.getLargeImgURL}/>
        </ImageGallery>
        {(items.length > 0 && items.length === hits.length) && <Button onClick={this.handleButtonCLick} />}
        {spinner && <Loader />}
        {modal && <Modal link={largeIMG} name={tags} onToggle={this.modalClickToggler} />}
      </>
  );
  }
};

export default App;
