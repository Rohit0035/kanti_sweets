import React from "react";
import "../styles/NoMatch404.scss";

const NoMatch404 = () => {
  return (
    <div className="wrapper">
      <div className="text_group">
        <p className="text_404">404</p>
        <p className="text_lost">
          The page you are looking for <br />
          has been lost in space.
        </p>
      </div>
      <div className="window_group">
        <div className="window_404">
          <div className="stars">
            {[...Array(50)].map((e, i) => {
              return <div className="star" key={`start-${i}`}></div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoMatch404;
