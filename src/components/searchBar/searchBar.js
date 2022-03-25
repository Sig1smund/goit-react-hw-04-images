import { Component } from 'react';
import propTypes from 'prop-types';
import '../styles.css';

export default class SearchBar extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = e => {
    const { value } = e.currentTarget;
    this.setState({ inputValue: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.inputValue.trim() === '') {
      return alert('Keyword is required');
    }

    const { inputValue } = this.state;
    this.props.onSubmit(inputValue);

    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="inputValue"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: propTypes.func,
};
