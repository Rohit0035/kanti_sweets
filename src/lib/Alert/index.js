import React from "react";
import PropTypes from "prop-types";
import { getAlertClass, getAlertIconClass } from "./service";

const AlertBox = ({ type, message }) => {
  return (
    <div className={`alert ${getAlertClass(type)}`} role="alert">
      <i className={getAlertIconClass(type)}></i>
      <div className="message">{message}</div>
    </div>
  );
};

AlertBox.propTypes = {
  type: PropTypes.oneOf(["warning", "info", "danger", "success", "secondary"]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
};

export default AlertBox;
