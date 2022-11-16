import React, { useEffect, useState, useReducer, lazy } from "react";
import axios from "axios";
import styles from "./Thirukkural.module.css";
import thiruvalluvar from "../images/valluvan.jpg";
// import oldPaper from "../images/oldpaper.jpg";
import { Button, Card, Input } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
const Dialog = lazy(() => import("@mui/material/Dialog"));
let initialShowCover = {
  bookCover: true,
  numberOfKural: 1,
  thirukkural: {},
  openDialog: false,
  pageNumber: "",
};
const coverReducer = (state, action) => {
  switch (action.type) {
    case "toggle":
      return {
        ...state,
        bookCover: !state.bookCover,
      };
      break;
    case "dialog":
      return {
        ...state,
        openDialog: !state.openDialog,
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
    case "apiCall":
      return {
        ...state,
        thirukkural: action.payload,
      };
    case "goTo":
      return {
        ...state,
        numberOfKural: action.payload,
      };
      break;
    case "pageNumber":
      return {
        ...state,
        pageNumber: action.payload,
      };
      break;
    default:
      return state;
  }
};
const Thirukkural = () => {
  const [showCover, coverDispatch] = useReducer(coverReducer, initialShowCover);
  const getThirukkural = async () => {
    try {
      const response = await axios.get(
        `https://api-thirukkural.vercel.app/api?num=${showCover?.numberOfKural}`
      );
      coverDispatch({
        type: "apiCall",
        payload: response?.data,
      });
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getThirukkural();
  }, [showCover?.numberOfKural]);

  const openBookHandler = () => {
    coverDispatch({ type: "toggle" });
  };
  const nextPage = () => {
    coverDispatch({ type: "next" });
  };
  const previousPage = () => {
    if (showCover?.numberOfKural > 1) coverDispatch({ type: "previous" });
    if (showCover?.numberOfKural === 1) coverDispatch({ type: "toggle" });
  };
  const goToKuralHandler = () => {
    coverDispatch({ type: "dialog" });
  };
  const kuralChangeHandler = (e) => {
    if (!isNaN(+e.target.value))
      coverDispatch({ type: "pageNumber", payload: +e.target.value });
  };

  const submitPageNumberHandler = () => {
    if (showCover?.pageNumber > 0 && showCover?.pageNumber < 1331) {
      coverDispatch({ type: "goTo", payload: +showCover?.pageNumber });
      goToKuralHandler();
      coverDispatch({ type: "pageNumber", payload: "" });
    }
  };

  return (
    <div className={styles.bookBG}>
      <Dialog onClose={goToKuralHandler} open={showCover?.openDialog}>
        <DialogTitle>Pick a particular thirukkural</DialogTitle>
        <div style={{ textAlign: "center", padding: "10px" }}>
          <div>There are 1330 kurals</div>
          <div>Enter the kural's number to choose one</div>
        </div>
        <Input
          min="1"
          max="4"
          type="text"
          onChange={kuralChangeHandler}
          value={showCover?.pageNumber}
        />
        <Button
          className={styles.buttonColor}
          onClick={submitPageNumberHandler}
        >
          சரி-Ok
        </Button>
      </Dialog>
      <div style={{ marginBottom: "10px" }}>
        {showCover?.bookCover && (
          <div className={styles.bookCover}>
            <div className={styles.gfg}>
              <img src={thiruvalluvar} />
              {/* <div className={styles.first}>
              <h3 >திருக்குறள்</h3>
              <span style={{fontSize:"15px"}}>(Thirukkural)</span><br />
              <span>Universal Scripture</span>
              </div>
              <div className={styles.third}>
              <h3 >திருவள்ளுவர் </h3>
              <span style={{fontSize:"15px"}}>(Thiruvalluvar)</span>
              </div> */}
            </div>
            <Button className={styles.buttonColor} onClick={openBookHandler}>
              படி-Read
            </Button>
          </div>
        )}
        {!showCover?.bookCover && (
          <div className={""}>
            <Card
              style={{
                backgroundImage:
                  "url('https://www2.gvsu.edu/gordonro/older-paper.gif')",
              }}
              className={styles.card}
            >
              <header className={styles.header}>
                <h3>{showCover.thirukkural?.chap_tam}</h3>
                <span>({showCover.thirukkural?.chap_eng})</span>
              </header>
              <section style={{ color: "#5C4033" ,fontWeight:"bold"}}>
                <span>
                  {showCover?.numberOfKural}.&nbsp;
                  <em>{showCover.thirukkural?.line1}</em>
                </span>
                <br />
                <em>{showCover.thirukkural?.line2}</em>
              </section>
              <header className={styles.float}>உரை:</header>
              <section>{showCover.thirukkural?.tam_exp}</section>
              <header className={styles.float}>Translation:</header>
              <section>{showCover.thirukkural?.eng}</section>
              <header className={styles.float}>Meaning:</header>
              <section>{showCover.thirukkural?.eng_exp}</section>
            </Card>
            <Button
              style={{ float: "left" }}
              className={styles.buttonColor}
              onClick={previousPage}
            >
              முன்-Previous
            </Button>
            <Button className={styles.buttonColor} onClick={goToKuralHandler}>
              செல்-Go to
            </Button>
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
        <small>Website © Copyrights@VMkrishna</small>
      </footer>
    </div>
  );
};

export default Thirukkural;
