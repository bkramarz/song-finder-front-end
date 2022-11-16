import { useState, useEffect } from "react";
import "./App.css";
import ChoiceButtonArray from "./components/ChoiceButtonArray";

function App() {
  // API endpoints TODO - Change when deploying
  const genreListEndpoint = "http://127.0.0.1:5000/genres";
  const feelsListEndpoint = "http://127.0.0.1:5000/feels";
  const fullListEndpoint = "http://127.0.0.1:5000/send-list/";
  const songsByGenreEndpoint = "http://127.0.0.1:5000/songs-by-genre/";
  const songsByFeelEndpoint = "http://127.0.0.1:5000/songs-by-feel/";
  const genresByFeelEndpoint = "http://127.0.0.1:5000/genres-by-feel/";
  const feelsByGenreEndpoint = "http://127.0.0.1:5000/feels-by-genre/";

  const [listOfGenres, setListOfGenres] = useState([]);
  const [listOfFeels, setListOfFeels] = useState([]);
  const [chosenGenres, setChosenGenres] = useState([]);
  const [chosenFeels, setChosenFeels] = useState([]);
  const [songList, setSongList] = useState([]);

  function makeApiCall(endPoint, stateToSet) {
    fetch(endPoint)
      .then((response) => response.json())
      .then((data) => {
        stateToSet(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  //Call backend to get list of genres and feels when on page load and re-renders
  useEffect(() => {
    if (chosenGenres.length === 0 && chosenFeels.length === 0) {
      makeApiCall(genreListEndpoint, setListOfGenres);
      // makeApiCall(feelsListEndpoint, setListOfFeels);
    } else if (chosenGenres.length > 0) {
      makeApiCall(feelsByGenreEndpoint + chosenGenres, setListOfFeels)
    } 
    // if (chosenFeels.length > 0) {
    //   makeApiCall(genresByFeelEndpoint + chosenFeels, setListOfGenres)
    // }
  }, [chosenGenres, chosenFeels]);

  function fetchSongListFromBackEnd() {
    if (chosenGenres.length > 0 && chosenFeels.length > 0) {
      // If user has selected feels and genres, return list of songs in genres that have chosen feels
      makeApiCall(
        fullListEndpoint + chosenGenres + "/" + chosenFeels,
        setSongList
      );
    } else if (chosenGenres.length > 0 && chosenFeels.length === 0) {
      // If user has only selected genres, return list of all songs in chosen genres
      makeApiCall(songsByGenreEndpoint + chosenGenres, setSongList);
    } else if (chosenGenres.length === 0 && chosenFeels.length > 0) {
      // If user has only selected feels, return list of all songs in chosen feels
      makeApiCall(songsByFeelEndpoint + chosenFeels, setSongList);
      // If user has not selected anything, set array to empty
    } else {
      setSongList([]);
    }
  }

  const chosenListStyle = {
    // display: "inline-block",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
  };

  const addGenre = (item) => {
    if (chosenGenres.includes(item)) {
      // Delete item if already in array
      const index = chosenGenres.indexOf(item);
      chosenGenres.splice(index, 1);
      setChosenGenres([...chosenGenres]);
    } else {
      // Add item to array if not in array
      setChosenGenres([...chosenGenres, item]);
      chosenGenres.push(item);
    }
    console.log("chosen genres: " + chosenGenres);
    fetchSongListFromBackEnd();
    // makeApiCall(feelsByGenreEndpoint + chosenGenres, setListOfFeels);
  };

  const addFeel = (item) => {
    if (chosenFeels.includes(item)) {
      // Delete item if already in array
      const index = chosenFeels.indexOf(item);
      chosenFeels.splice(index, 1);
      setChosenFeels([...chosenFeels]);
    } else {
      // Add item to array if not in array
      setChosenFeels([...chosenFeels, item]);
      chosenFeels.push(item);
    }
    console.log("chosen feels:" + chosenFeels);
    fetchSongListFromBackEnd();
    // makeApiCall(genresByFeelEndpoint + chosenFeels, setListOfGenres);
  };

  return (
    <div className="App">
      <ChoiceButtonArray
        key="genre"
        arr={listOfGenres}
        title="genre(s)"
        addItem={addGenre}
      /> {chosenGenres.length > 0 ?
      <ChoiceButtonArray
        key="feel"
        arr={listOfFeels}
        title="feel(s)"
        addItem={addFeel}
      /> : null }
      <h2 style={songList.length === 0 ? { visibility: "hidden" } : null}>
        Songs
      </h2>
      {songList.map((song, index) => {
        return (
          <p style={chosenListStyle} key={index}>
            <b>{song["Song Title"]}</b> by {song["Recording Artist"]}
          </p>
        );
      })}
    </div>
  );
}

export default App;
