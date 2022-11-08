import { createSlice } from "@reduxjs/toolkit";

export const collectTaxSlice = createSlice({
  name: "collectTax",
  initialState: { CGST: 0, SGST: 0 },
  reducers: {
    collectCGST(state, action) {
      const centraltaxCollected = +action.payload.cgst;
      state.CGST = state.CGST + centraltaxCollected;
    },
    collectSGST(state, action) {
      const statetaxCollected = +action.payload.sgst;
      state.SGST = state.SGST + statetaxCollected;
    },
  },
});

export const collectTaxSliceAction = collectTaxSlice.actions;
