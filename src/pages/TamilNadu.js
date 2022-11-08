import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collectTaxSliceAction } from "../redux-store/collectTaxSlice";

const TamilNadu = () => {
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");
  const dispatch = useDispatch();
  const collectedCgst = useSelector((state) => state?.collectTax.CGST);
  const collectedSgst = useSelector((state) => state?.collectTax.SGST);

  const cgstChangeHandler = (e) => setCgst(e.target.value);
  const sgstChangeHandler = (e) => setSgst(e.target.value);

  const payTaxhandler = () => {
    dispatch(collectTaxSliceAction.collectCGST({ cgst }));
    dispatch(collectTaxSliceAction.collectSGST({ sgst }));
    setCgst("");
    setSgst("");
  };

  return (
    <div>
      <center>
        <h1>Central Government</h1>
        <table border={"2"}>
          <tr>
            <td>CGST</td>
            <td>Rs.{collectedCgst}/-</td>
          </tr>
          <tr>
            <td>SGST</td>
            <td>Rs.{collectedSgst}/-</td>
          </tr>
        </table>
        <div>
          <h2>TamilNadu State Govt</h2>
          <table>
            <tr>
              <td>
                <label>Input CGST : </label>
              </td>
              <td>
                <input
                  type="number"
                  value={cgst}
                  onChange={cgstChangeHandler}
                />
              </td>
              <br />
            </tr>
            <tr>
              <td>
                <label>Input SGST : </label>
              </td>
              <td>
                {" "}
                <input
                  type="number"
                  value={sgst}
                  onChange={sgstChangeHandler}
                />
              </td>
              <br />
            </tr>
          </table>
          <button
            style={{ marginTop: "10px" }}
            disabled={!cgst || !sgst}
            onClick={payTaxhandler}
          >
            Pay Tax
          </button>
        </div>
      </center>
    </div>
  );
};

export default TamilNadu;
