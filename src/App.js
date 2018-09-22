import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Wrapper from './components/Wrapper/Wrapper';
import CharacterCard from './components/CharacterCard/CharacterCard';
import characters from './characters.json';
import './App.css';

//Helper function to shuffle array (Fischer-Yates)
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle…
  while (currentIndex !== 0) {

    // Pick a remaining element…
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class App extends Component {

  state = {
    characters: characters,
    currentScore: 0,
    topScore: 0,
    selectedCharactersArray: [],
    message: ""
  }

  componentDidMount() {
  }


handleShuffle = () => {
  //Shuffle the array and set the state of characters to the new shuffledArray
  let shuffledArrary = shuffle(characters);
  this.setState({ characters: shuffledArrary })
}

handleClick = id => {
  console.log(id)
  let selected = false;

  //Check if new character selected is already selected
  this.state.selectedCharactersArray.forEach(selectedCharacter => {

    //If id of the current selected character exists in the selectedCharacters array then set the selected flag to tru
    if (id === selectedCharacter.id) {
      selected = true;
    }
  })
  //If the character has been selected then reset the game
  if (selected) {
    this.resetGame()
  }
  //If it has not been selected then added to the selectedCharacters array
  else {
    this.state.characters.forEach(character => {
      if (character.id === id) {
        this.setState({ selectedCharactersArray: [...this.state.selectedCharactersArray, character] })
        this.updateScore()
      }
    })
  }

  this.handleShuffle()
}

updateScore = () => {
  const newScore = this.state.currentScore + 1;
  this.setState({
    currentScore: newScore,
    message: "You got it! Keep going!"
  })
  if (newScore >= this.state.topScore) {
    this.setState({ topScore: newScore })
  }
  else if (newScore === 15) {
    this.setState({ message: "You win!" })
  }
}

resetGame = () => {
  this.setState({
    currentScore: 0,
    topScore: this.state.topScore,
    selectedCharactersArray: [],
    message: "",
  })

  this.handleShuffle()
}

render()
{
  return(
    <Wrapper>
      <Navbar
        message={this.message}
        topScore={this.topScore}
        currentScore={this.currentScore}
      />
      {
        this.state.characters.map(character => (
          <CharacterCard
            id={character.id}
            name={character.name}
            image={character.image}
            handleClick={this.handleClick}
            resetGame={this.resetGame}
            updateScore={this.updateScore}
            handleShuffle={this.handleShuffle}
          />
        ))
      }     
    </Wrapper>
  );
}
}

export default App;
