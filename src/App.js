import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {
  const [searchField, SetSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);  
  const [filteredMonsters, setFilterdMonsters] = useState(monsters);

  console.log('render');

  useEffect(() => {
    console.log('effect fired')
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users))
  }, [])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) =>{
      return monster.name.toLocaleLowerCase().includes(searchField);
      });
    setFilterdMonsters(newFilteredMonsters)
    console.log('effect is firing');
  }, [monsters, searchField])

  const onSearchChange = (event)=> {
        const searchFieldString = event.target.value.toLocaleLowerCase();
        SetSearchField(searchFieldString);
      }

  return(
    <div className='App'>
    <h1 className='app-title'>Monsters Rolodex</h1>
     <SearchBox onChangeHandler={onSearchChange} placeholder='search monster' className='monsters-search-box'/>
     { <CardList monsters={filteredMonsters} />  }
  </div>
  )
}

export default App;
