import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import styles from "./Thirukkural.module.css";
import thiruvalluvar from "../images/thiruvalluvar2.jpg";
import { Button, Paper, Card } from "@mui/material";
let initialShowCover = { bookCover: true, numberOfKural: 1, thirukkural: {} };
const coverReducer = (state, action) => {
  switch (action.type) {
    case "toggle":
      return {
        ...state,
        bookCover: !state.bookCover,
      };
      break;
    case "next":
      return {
        ...state,
        numberOfKural: state.numberOfKural + 1,
      };
      break;
    case "previous":
      return {
        ...state,
        numberOfKural: state.numberOfKural - 1,
      };
      break;
    default:
      return state;
  }
};
const Thirukkural = () => {
  const [showCover, coverDispatch] = useReducer(coverReducer, initialShowCover);
  const [thr, setThr] = useState({});
  const getThirukkural = async () => {
    const response = await axios.get(
      `https://api-thirukkural.vercel.app/api?num=${showCover?.numberOfKural}`
    );
    console.log(response?.data, "respo");
    setThr(response?.data);
  };
  useEffect(() => {
    getThirukkural();
  }, [showCover?.numberOfKural]);

  const openBookHandler = () => {
    coverDispatch({ type: "toggle" });
  };
  console.log(showCover);
  const nextPage = () => {
    coverDispatch({ type: "next" });
  };
  const previousPage = () => {
    if (showCover?.numberOfKural > 1) coverDispatch({ type: "previous" });
    if (showCover?.numberOfKural === 1) coverDispatch({ type: "toggle" });
  };
  return (
    <div className={styles.bookBG}>
      <div className={""}>
        {showCover?.bookCover && (
          <div className={styles.bookCover}>
            <img src={thiruvalluvar} />
            <Button className={styles.buttonColor} onClick={openBookHandler}>
              படி-Read
            </Button>
          </div>
        )}
        {!showCover?.bookCover && (
          <div className={""}>
            <Card className={styles.card}>
              <header className={styles.header}>
                <h3>{thr?.chap_tam}</h3>
                <span>({thr?.chap_eng})</span>
              </header>
              <section style={{ color: "#003300" }}>
                <span>
                  {showCover?.numberOfKural}.&nbsp;<em>{thr?.line1}</em>
                </span>
                <br />
                <em>{thr?.line2}</em>
              </section>
              <header className={styles.float}>உரை:</header>
              <section>{thr?.tam_exp}</section>
              <header className={styles.float}>Translation:</header>
              <section>{thr?.eng}</section>
              <header className={styles.float}>Meaning:</header>
              <section>{thr?.eng_exp}</section>
            </Card>
            <Button
              style={{ float: "left" }}
              className={styles.buttonColor}
              onClick={previousPage}
            >
              முன்-Previous
            </Button>
            {/* <Button className={styles.buttonColor} onClick={openBookHandler}>
              show
            </Button> */}
            <Button
              style={{ float: "right" }}
              className={styles.buttonColor}
              onClick={nextPage}
            >
              பின்-Next
            </Button>
          </div>
        )}
      </div>
      <footer className={styles.copyRight}>
      <small>Website © Copyright-VMkrishna</small>
      </footer>
    </div>
  );
};

export default Thirukkural;
