import React from "react";
import styles from "../CSS/WrapperCard.module.css"


const WrapperCard = (props) => {
  return <div className={styles.card}>{props.children}</div>;
};

export default WrapperCard;
