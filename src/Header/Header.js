import React from "react";
import GHContext from "./GHContext/GHContext";

function Header() {
  return (
    <div>
      <h4>Actions UI</h4>
      <div className="d-flex">
        <GHContext />
      </div>
    </div>
  );
}

export default Header;
