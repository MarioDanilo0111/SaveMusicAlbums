import React from "react";
import "./user.css";
import { BiTrash } from "react-icons/bi";
import { VscEdit } from "react-icons/vsc";

/**
 *
 * takes in parameters from the element in the object for being rendered on the page
 * @return card for being rendered in the browser using the elements in the object array
 */
const User = ({
  id,
  name,
  band,
  year,
  genresId,
  onDelete,
  editAlbum,
  getFromUser,
}) => {
  /**
   * using the id from the object we are abel to delite a element from the objects array using the deleite method
   * return the id from the card that is chosen by the client to be deleted, and is set to the delete method
   */
  const handleDelete = () => {
    onDelete(id);
  };
  /**
   * we are passing the "id" to the "editAlbum" hook, this will be used to edit the element in the object array
   */
  const handleEditing = () => {
    editAlbum(id);
  };

  return (
    <div className="first-card">
      <div className="card__body" onSubmit={handleEditing}>
        <div className="card__title">
          {" "}
          The album <b>{name}</b> by <b>{band}</b>
        </div>
        <div className="card__description">
          <p className="name" style={{ color: "aqua" }}>
            was made <b>{year}</b>, the music played is considered to be{" "}
            <b>{genresId}</b>
          </p>
        </div>
        <div>
          <div className="btns">
            <div className="item-button" onClick={handleDelete}>
              <BiTrash size="1.6rem" />
            </div>

            <div className="item-b">
              <button className="item-b" onClick={() => getFromUser(id)}>
                <VscEdit size="1.6rem" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
