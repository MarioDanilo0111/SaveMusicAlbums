import { useEffect, useState } from "react";
import "./App.css";
import AddUser from "./components/adduser/AddUser";
import User from "./components/users/User";
import PutUpdate from "./components/PutUpdate/PutUpdate";

/**
 * This component handles all data from two different JSON files.
 * It will be triggered by other components in this application,
 * This component interacts with url's and that are directed to JSON files that the API contains.
 * This makes this API a CRUD running interface with foreing key to connect with the JSON files.
 * @returns Ability to create, read all or a specific rows, update and delete.
 *
 */
const App = () => {
  /**
   *useState hooks for handeling state variables in the components
   *we will handle the current state of the database with functions
   *and update the values in this API.
   */
  // handle the url /albums
  const [albums, setAlbums] = useState([]);
  // handle the url /albums when we whan to make a search in the database and not lose the memory of what needs to be rendering
  const [albumsCopy, setAlbumsCopy] = useState([]);
  // handle the url /genres
  const [genres, setGen] = useState([]);
  // setting state for editing form with a boolean function. This will enable the Update component form when update button is triggered.
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    (async () => {
      getAlbums();
    })();
  }, [editing]);

  // Set state to get all data from User.js and pass to PutUpdate component starting with underfined values
  const [getChildData, setGetChildData] = useState({
    id: null,
    name: "",
    band: "",
    year: "",
    genresId: "",
  });

  /**
   * This function has the parameter "id" to identify the correctly row from albums array
   * @param {id from the card to be updated} id
   * returns values to the PutUpdate component and opens the edit form for the client
   */
  const getFromUser = (id) => {
    // Using find lambda to find the object
    const album = albums.find((a) => a.id === id);
    // This state sets true to enable editing form apares from the browser
    setEditing(true);
    // This state sets the album object that the find lambda function has executed
    setGetChildData({
      id: album.id,
      name: album.name,
      band: album.band,
      year: album.year,
      genresId: album.genresId,
    });
  };

  //const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  /**
   * This function makes a request to the server (the .JSON file) and load the info to the browser
   */
  const getAlbums = async () => {
    await fetch("http://localhost:3500/albums")
      .then((res) => {
        return res;
      })
      .then((res) => res.json())
      // we pass the data to our "setData" function
      .then((data) => setData(data))
      .catch((err) => {
        console.log(err);
      });
    // we also initiate the request our other database
    fetchGenres();
  };

  /**
   * this function makes a request to the server (the .JSON file) and load the info to the browser
   */
  const fetchGenres = async () => {
    await fetch("http://localhost:3600/genres")
      .then((res) => {
        return res;
      })
      .then((res) => res.json())
      // pass the data to the setGen hook
      .then((value) => setGen(value))
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   *
   * @param {string} name
   * @param {string} band
   * @param {integer} year
   * @param {integer} genresId
   * returns POST method, that handles posts for the albums object with all the attributes that are sended
   */
  const onAdd = async (name, band, year, genresId) => {
    await fetch("http://localhost:3500/albums", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        band: band,
        year: parseInt(year),
        genresId: parseInt(genresId),
      }),
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      // send data to the "setAlbums" and "setAlbumsCopy" hooks
      .then((data) => {
        setAlbums((a) => [data, ...a]);
        setAlbumsCopy((a) => [data, ...a]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   *we can delete an element from the object using the id element with this DELETE method
   * @param {attribute} id for accesing the elements
   */
  const onDelete = async (id) => {
    await fetch(`http://localhost:3500/albums/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res.json);
        if (res.status !== 200) {
          return;
        } else {
          setAlbumsCopy(
            albumsCopy &&
              albumsCopy.filter((album) => {
                return album.id !== id;
              })
          );
          setAlbums(
            albums &&
              albums.filter((album) => {
                return album.id !== id;
              })
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   *
   * @param {attribute} id
   * @param {string} name
   * @param {string} band
   * @param {integer} year
   * @param {integer} genresId
   * here the app can update elements from the object using this PUT method
   */
  const UpDate = async (id, name, band, year, genresId) => {
    await fetch(`http://localhost:3500/albums/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        band: band,
        year: parseInt(year),
        genresId: parseInt(genresId),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      // update the row from url /albums
      .then(() => {
        setAlbums = [];
        setAlbumsCopy = [];
        getAlbums();
        // Empty the setAlbums and setAlbumsCopy to refresh the new information from getAlbums()
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * @param data to add all albums
   */
  const setData = (data) => {
    setAlbums(data);
    setAlbumsCopy(data);
    // This method is a helper to add at the same time two different arrays
  };

  /**
   * This function is for searching render all the finded items that matches the letter typed in the search element
   */
  const filterCards = (event) => {
    event.preventDefault("");
    const value = event.target.value.toLowerCase("");
    console.log(event.target.value);
    /**
     * from the albums object hook we search in each element missing parameters and puch them to the "albumsCopy" use state, so that they will be rendered back after finishing a search
     */
    albums.forEach((a) => {
      if (!albumsCopy.includes(a)) {
        albumsCopy.push(a);
      }
    });

    /**
     * here the .filter method is excluding (filtering) from the array (albumsCopy),
     * in the forEach function the filterd parameters will replace what this function excludes
     */
    const filteredUsers = albumsCopy.filter((ac) =>
      stringFilter(ac).includes(value)
    );

    // set state to the "setAlbumsCopy" where it will .push the missing parameters
    setAlbumsCopy(filteredUsers);
  };
  /**
   * @param {parameters} a
   * @returns from the url /genres the name of the genre making a relation with the genresId from the url /albums
   * this relation helps to bild the return of the search function, returning the parameters.
   */
  const stringFilter = (a) => {
    const genreName = genres.find((g) => {
      if (g.id === a.genresId) {
        return g;
      }
      return "";
    }).name;

    return `${a.name} ${a.band} ${a.year} ${genreName}`.toLowerCase();
  };

  return (
    <div className="App">
      <div className="first-title">
        <h3>Music Albums Bands & Genres</h3>
      </div>
      {/* state to switch betwen adding component and editing component */}
      {editing ? (
        <div className="editing">
          {/* update component */}
          <PutUpdate
            // values is used to interact with the genres JSON file
            values={genres}
            // function that sends the values to be updated
            getChildData={getChildData}
            // sends data to "UpDate" PUT method
            UpDate={UpDate}
            // set State to enable the update component
            setEditing={setEditing}
          />
        </div>
      ) : (
        <div>
          {/* add component send data to the POST method function "onAdd" */}
          <AddUser onAdd={onAdd} values={genres} />
        </div>
      )}
      <div className="search-title">
        <h1>whant to find something?</h1>
      </div>
      <div className="search-box">
        {/* input component for searching in the array components */}
        <input
          type="text"
          className="box"
          placeholder=" type what you are searching"
          onInput={filterCards}
        />
      </div>
      <div>
        <div className="pl-list">
          {/*mapping through hook function for sending parameters to the card component for being rendered  */}
          {albumsCopy &&
            albumsCopy.map((ac) => (
              <User
                key={ac.id}
                name={ac.name}
                band={ac.band}
                year={ac.year}
                id={ac.id}
                genresId={
                  // To map through the second object array, this will return a correlation between the two arrays, we will be seeing the name of the genre but the comparing will be done by the "id's"
                  genres &&
                  genres.map((g) => {
                    if (g.id === ac.genresId) {
                      const genName = g.name;
                      return genName;
                    }
                    return "";
                  })
                }
                // uses to find genres in genresArray for then being used in userComponent
                getFromUser={getFromUser} // This function is passed like a props and will get the data for being edited, will be used in the edit button.
                onDelete={onDelete}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
