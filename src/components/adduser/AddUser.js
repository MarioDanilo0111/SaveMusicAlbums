import React, { Fragment } from "react";
import "./AddUser.css";
import { VscNewFolder } from "react-icons/vsc";

const AddUser = ({ onAdd, values }) => {
  // onhandlesubmit add the target value to onAdd and reset the form
  const handleOnSubmit = (e) => {
    e.preventDefault();
    onAdd(
      e.target.name.value,
      e.target.band.value,
      e.target.year.value,
      e.target.genre.value,

      // reset inputs fields
      e.target.reset()
    );
    return "";
  };

  /**
   * this function is for mapping throw the genres database file then using the function for choosing a collapse option UI component
   */
  let valuesSelect =
    values.length > 0 &&
    values.map((genre, i) => {
      return (
        <option key={i} value={genre.id} select={genre === 0}>
          {genre.name}
        </option>
      );
    }, this);

  return (
    /**
     * this is a form that is sending data to de "onAdd" function for taking care of the info with a POST method
     */
    <Fragment>
      <div className="starting">
        <div className="second-title">
          <h3>add a new item:</h3>
        </div>
        <div className="input-select">
          <hr />
        </div>
      </div>
      <div className="input-user" onSubmit={handleOnSubmit}>
        <form>
          <input
            className="input-item"
            placeholder="Album"
            name="name"
            required
          />
          <input
            className="input-item"
            placeholder="Band/Musician"
            name="band"
            required
          />
          <input
            className="input-item"
            placeholder="year of elaboration"
            name="year"
            required
          />

          <div>
            <select
              className="input-item"
              name="genre"
              placeholder="Music genre"
            >
              {valuesSelect}
            </select>
            <div className="btn-add">
              <button className="btn-plus" onClick={() => handleOnSubmit}>
                <VscNewFolder size="3.3rem" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddUser;
