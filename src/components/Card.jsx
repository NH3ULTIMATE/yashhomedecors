import React from "react";

const Card = () => {
  return (
    <div className="flex flex-col justify-center items-center w-fit h-fit border-2 rounded-2xl  ">
      <img
        src="login.jpg"
        alt="project-1"
        className="w-[300px] h-[200px] rounded-2xl p-2"
      ></img>
      <p className="card-title m-1">project title</p>
      <br />
      <p className="card-description m-1">project description</p>
    </div>
  );
};

export default Card;
