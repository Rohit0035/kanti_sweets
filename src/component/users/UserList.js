import React, { useMemo } from "react";
import { useAccountContext } from "../../context/AccountContext";
import "../../styles/custom.scss";

const Users = () => {
  return (
    <React.Fragment>
      <h3>
        Welcome <span className="text-color-app-default">Admin</span>
      </h3>
      <hr />
      <section>
        <h3>lorem ipsum</h3>
      </section>
    </React.Fragment>
  );
};

export default Users;
