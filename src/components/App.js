import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all',
      }
    };
  }

  handleChangeType = (newValue) => {
    this.setState({
      filters: {
        type: newValue
      }
    });
  }

  handleFindPetsClick = () => {
    const filterVariable = this.state.filters['type']
    if (filterVariable === 'all') {
      fetch('/api/pets')
      .then(results => {
        return results.json();
      }).then(data => {
        console.log(data)
      })
    } else {
      fetch(`/api/pets?type=${filterVariable}`)
      .then(results => {
        return results.json();
      }).then(data => {
        let newAnimals = data
        return newAnimals
      })
    }
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.handleFindPetsClick} filters={this.state.filters} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
