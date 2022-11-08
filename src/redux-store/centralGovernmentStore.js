import { configureStore } from "@reduxjs/toolkit";
import { collectTaxSlice } from "./collectTaxSlice";

export const centralGovernment = configureStore({
    reducer:{
        collectTax:collectTaxSlice.reducer
    }
})