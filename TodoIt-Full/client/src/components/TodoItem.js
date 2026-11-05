import React, { useState } from 'react';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { editTodo, updateTodo } from '../actions/todo';
import Modal from './modals/Modal';
import useModal from './modals/useModal';

const TodoItem = ({
  title,
  deleteTodo,
  id,
  editTodo,
  completed,
  updateTodo,
  handleCheck,
}) => {
  const { isShowing, toggle } = useModal();

  const [formData, setFormData] = useState({
    title,
    completed,
  });

  // const editThisTodo = () => {
  //   editTodo(formData);
  //   toggle();
  // };

  function toggleCheck() {
    handleCheck();
    updateTodo(id, formData);
  }

  return (
    <div className="container">
      <div id="input_container">
        <input
          type="checkbox"
          checked={completed}
          onChange={toggleCheck}
          className="checkbox-round"
        ></input>
        <FaCheck className="input_img" onClick={toggleCheck} />
      </div>

      <Modal isShowing={isShowing} hide={toggle} />
      <p className={`${completed ? 'strike ' : 'normal'}`}>{title}</p>

      <FaTrashAlt
        className="del-icon"
        onClick={() => {
          deleteTodo(id);
        }}
      />

      {/* <button type="button" onClick={editThisTodo}>
        Edit
      </button> */}
    </div>
  );
};

export default connect(null, { editTodo, updateTodo })(TodoItem);
