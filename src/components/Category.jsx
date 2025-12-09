import React from "react";

const Category = ({ genre, setGenre }) => {
  return (
    <div className="category">
      <button className="btnCategory">Action</button>
      <button className="btnCategory">Adventure</button>
      <button className="btnCategory">Comedy</button>
      <button className="btnCategory">Crime</button>
      <button className="btnCategory">Action</button>
      <button className="btnCategory">Adventure</button>
      <button className="btnCategory">Comedy</button>
      <button className="btnCategory">Crime</button>
      {/* <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        /> */}
    </div>
  );
};
export default Category;
