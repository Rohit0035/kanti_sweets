import React, { useMemo } from "react";
import { useAccountContext } from "../../context/AccountContext";
import "../../styles/custom.scss";

const Home = () => {
  const { account = {} } = useAccountContext();

  const user = useMemo(() => {
    return (account && account.detail) || {};
  }, [account]);

  return (
    <React.Fragment>
      <h3>
        Welcome <span className="text-color-app-default">Admin</span>
      </h3>
      <hr />
      <section>
        <div className="row">
          <div className="col-lg-4">
            <div className="widgt-1 bg-1">
              <h2>100</h2>
              <p>Total Users</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="widgt-1 bg-2">
              <h2>100</h2>
              <p>Total Branches</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="widgt-1 bg-3">
              <h2>100</h2>
              <p>Total Company</p>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
