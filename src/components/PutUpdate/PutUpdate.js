import { Fragment, useState } from "react";
import React from "react";
import "./PutUpdate.css";
import { VscSync } from "react-icons/vsc";

/**
 * @returns sends back a handled element from the object that the user needed to update. The PUT method (UpDate function) receives the data after its updated
 */
const PutUpdate = ({ getChildData, values, UpDate, setEditing }) => {
  // console.log(getChildData);

  // the "getChildData" hook function sends the parameters to this function, they are attached in the edit form so that the client can handle the edit that they estimate to be.
  const id = getChildData.id;
  const [name, setName] = useState(getChildData.name);
  const [band, setBand] = useState(getChildData.band);
  const [year, setYear] = useState(getChildData.year);
  const [genresId, setGenresId] = useState(getChildData.genresId);

  // event button for sending data to the PUT method "UpDate"
  const handleUpdate = (e) => {
    e.preventDefault();
    UpDate(id, name, band, year, genresId);
    // set state back to "false", to put the page back to its initial state after handling the update of the element
    setEditing(false);
  };
  /**
   * this function is for the colaps menu we se in the add form,
   * it takes in "values" that is the parameters from the "genres" object
   * in this function we map through the parameters and return the name of the genre and render it in the collapse component
   */
  let valuesSelect =
    values.length > 0 &&
    values.map((genre, i) => {
      return (
        <option key={i} value={genre.id} selected={genre === 0}>
          {genre.name}
        </option>
      );
    }, this);

  /**
   * retuns a form for the data to render and to be updated, the UpDate functions will process the data with a PUT method
   */
  return (
    <Fragment>
      <div className="input-user-update" onSubmit={handleUpdate}>
        <div className="input-title-update">
          <h3>edit you collection</h3>
        </div>
        <form>
          <div className="input-line-update">
            <hr />
          </div>
          <input
            className="input-item-update"
            placeholder="Album Title"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input-item-update"
            placeholder="Band/Musician"
            name="band"
            value={band}
            onChange={(e) => setBand(e.target.value)}
          />
          <input
            className="input-item-update"
            placeholder="elaboration year"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <div>
            <select
              defaultValue=""
              className="input-item-update"
              name="genresId"
              value={genresId}
              onChange={(e) => setGenresId(e.target.value)}
            >
              {valuesSelect}
            </select>
          </div>
          <div className="btn-upD">
            <button className="btn" onClick={(e) => getChildData()}>
              {" "}
              <VscSync className="btnVs" size="3.6rem" />{" "}
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default PutUpdate;
