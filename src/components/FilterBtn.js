import React from "react";
function FilterBtn(props) {
  return (
    <button onClick={() => props.setFilter(props.name)} type="button" className="btn toggle-btn" aria-pressed={props.isPressed}>
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterBtn;
