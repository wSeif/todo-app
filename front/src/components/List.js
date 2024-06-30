import React from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

const List = ({ id, task, handleDelete, updateMode }) => {
  const handleEdit = () => {
    console.log("Editing task with id:", id);
    updateMode(id, task); // Call updateMode to handle editing
  };

  const onDelete = () => {
    handleDelete(id); // Call handleDelete to handle task deletion
  };

  return (
    <li>
      {task}
      <div className="icon_holder">
        <BiEditAlt className="icon" onClick={handleEdit} />
        <BsTrash className="icon" onClick={onDelete} />
      </div>
    </li>
  );
};

export default List;
