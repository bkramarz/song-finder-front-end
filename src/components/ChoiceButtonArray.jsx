import React from "react";
import Button from "./Button";

function ChoiceButtonArray(props) {
  const add = (chosenItem) => {
    props.addItem(chosenItem);
  };

  return (
    <div>
      <h1>Pick your {props.title}</h1>
      <div className="container">
      {props.arr.map((item, index) => {
        return (
            <Button
              value={item.toUpperCase()}
              key={index}
              onClick={() => add(item)}
              className="genre-select"
            />
        );
      })}
      </div>
    </div>
  );
}

export default ChoiceButtonArray;
