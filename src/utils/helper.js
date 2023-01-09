import moment from "moment";
import AlertBox from "../lib/Alert";

export const convertToFormDate = (date) => {
  let format = "YYYY-MM-DD";
  if (date instanceof Date) {
    return moment(date).format(format);
  } else if (typeof date === "string") {
    return moment(String(date)).format(format);
  } else {
    return moment().format(format);
  }
};

export const convertToSearchDate = (date) => {
  let format = "DD-MMM-YYYY";
  if (date instanceof Date) {
    return moment(date).format(format);
  } else if (typeof date === "string") {
    return moment(String(date)).format(format);
  } else {
    return moment().format(format);
  }
};

export const onMenuToggle = (width) => {
  if (
    width < 992 &&
    document.getElementsByClassName("app-sidenav-toggled").length
  ) {
    document.body.classList.toggle("app-sidenav-toggled");
  }
};

export const convertPSSummaryMix = (data) => {
  let mix = data.reduce((cur, old) => {
    let product = {
      id: old.id,
      itemId: old.itemId,
      itemSize: old.itemSize,
      productId: old.productId,
      mixId: old.mixId,
      estimatedOutcome: old.estimatedOutcome,
      actualOutcome: old.actualOutcome,
      damage: old.damage,
      summaryDate: old.summaryDate,
      createdAt: old.createdAt,
      updatedAt: old.updatedAt,
      item: old.item,
      mix: old.mix,
      product: old.product,
    };
    if (cur[`${old.mixId}`]) {
      cur[`${old.mixId}`].products.push(product);
    } else {
      cur[`${old.mixId}`] = {
        name: old.mix.name,
        id: old.mixId,
        products: [product],
      };
    }
    return cur;
  }, {});
  return Object.keys(mix).map((key) => {
    return mix[key];
  });
};

export const getDifferenceOutcome = ({
  estimatedOutcome,
  actualOutcome,
  outcomeDamage,
}) => {
  return Math.abs(
    (Number(estimatedOutcome) || 0) -
      ((Number(actualOutcome) || 0) + (Number(outcomeDamage) || 0))
  );
};

export const tableErrorHandler = ({ error }) => {
  if (error && error.response && error.response.status) {
    let errorMessage =
      (error.response.data &&
        error.response.data.data &&
        error.response.data.data.message) ||
      null;
    switch (error.response.status) {
      case 404: {
        return {
          errorMessage: (
            <AlertBox type="warning" message={errorMessage || "Not Found"} />
          ),
        };
      }
      case 401: {
        return {
          errorMessage: (
            <AlertBox
              type="danger"
              message={errorMessage || "Session expired. Please login again."}
            />
          ),
        };
      }
      default: {
        return {
          errorMessage: (
            <AlertBox
              type="danger"
              message={errorMessage || error.message || "Something went wrong"}
            />
          ),
        };
      }
    }
  } else {
    return {
      errorMessage: <AlertBox type="danger" message={error.message} />,
    };
  }
};
