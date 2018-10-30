import React, { Component } from 'react';
import LinksComponent from './components/LinksComponent';
import CheckboxComponent from './components/CheckboxComponent';
import './App.css';
import Store from './store';
import { items } from './config';

class App extends Component {
  constructor(props) {
    super(props);
    this.store = new Store();
    this.store.set('selectedItems',  new Set([]));
    this.state = {
      selectedItems: this.store.get('selectedItems'),
      links: this.store.get('links')
    };
  }
  componentDidMount() {
    this.setCheckboxState();
  }
  setCheckboxState(selected = new Set([])) {
    this.store.set('selectedItems', selected);
    this.setState({
      selectedItems: selected,
      links: this.store.get('links')
    });
  }
  onCheckboxChange = (e, itemNo) => {
    const selected = this.store.get('selectedItems');
    if (e.target.checked) {
      selected.add(itemNo);
    } else {
      selected.delete(itemNo);
    }
    this.setCheckboxState(selected);
  }
  render() {
    const checkboxComponents = items
      .map(itemNo => 
        <CheckboxComponent 
          key={itemNo} 
          id={itemNo} 
          onChange={this.onCheckboxChange}
        />
      );
    return (
      <div className="app-container">
        {/* <SimpleStorage parent={this} /> */}
        <section className="left checkbox-wrapper">
          <h2>Checklist</h2>
          <div className="checkbox-inner">
            {checkboxComponents}
          </div>
        </section>
        <section className="right links-wrapper">
          <h2>Links</h2>
          <LinksComponent className={"links-container"} links={this.state.links} />
        </section>
      </div>
    );
  }
}

export default App;
