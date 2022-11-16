import React, { useState } from "react";

function Button(props) {
  const [isClicked, setIsClicked] = useState(false)

  function handleClick() {
      props.onClick()
      if(!isClicked) {
          setIsClicked(true)
      } else {
          setIsClicked(false)
      }
  }

  return (
    <button
      style={
        isClicked
          ? { backgroundColor: "cyan" }
          : { backgroundColor: "chartreuse" }
      }
      className={props.className}
      onClick={handleClick}
      key={props.value}
    >
      {props.value}
    </button>
  );
}

export default Button;
