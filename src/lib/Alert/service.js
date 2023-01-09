export const TYPES = {
  WARNING: "warning",
  INFO: "info",
  SUCCESS: "success",
  DANGER: "danger",
  SECONDARY: "secondary",
};

export const getAlertClass = (type) => {
  switch (type) {
    case TYPES.INFO: {
      return "alert-info";
    }
    case TYPES.WARNING: {
      return "alert-warning";
    }
    case TYPES.SUCCESS: {
      return "alert-success";
    }
    case TYPES.DANGER: {
      return "alert-danger";
    }
    case TYPES.SECONDARY: {
      return "alert-secondary";
    }
    default: {
      return "alert-light";
    }
  }
};

export const getAlertIconClass = (type) => {
  switch (type) {
    case TYPES.INFO: {
      return "bi bi-info-circle-fill";
    }
    case TYPES.WARNING: {
      return "bi bi-info-circle-fill";
    }
    case TYPES.SUCCESS: {
      return "bi bi-info-circle-fill";
    }
    case TYPES.DANGER: {
      return "bi bi-info-circle-fill";
    }
    case TYPES.SECONDARY: {
      return "bi bi-info-circle-fill";
    }
    default: {
      return "bi bi-chat-right-text";
    }
  }
};
