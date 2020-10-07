import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

import { setSearchField, requestContacts } from '../actions';

const mapStateToProps = state => {
  return {
    searchfield: state.searchContacts.searchfield,
    isPending: state.requestContacts.isPending,
    contacts: state.requestContacts.contacts,
    error: state.requestContacts.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequest: () => requestContacts(dispatch) /*dispatch(requestContacts())*/
  }
}

class App extends Component {
  componentDidMount() {
    this.props.onRequest();
  }

  render() {
    const { searchfield, onSearchChange, contacts, isPending } = this.props;
    const filteredRobots = contacts.filter(contact =>{
      return contact.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>Contacts</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <CardList contacts={filteredRobots} />
          </Scroll>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);