// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     theme: 'dracula', // Default theme
// };

// const themeSlice = createSlice({
//     name: 'theme',
//     initialState,
//     reducers: {
//         toggleTheme: (state) => {
//             state.theme = state.theme === 'dracula' ? 'winter' : 'dracula';
//         },
//         setTheme: (state, action) => {
//             state.theme = action.payload;
//         },
//     },
// });

// export const { toggleTheme, setTheme } = themeSlice.actions;

// export default themeSlice.reducer;



// Updating Rupesh ThemeSlice
// const { createSlice } = require("@reduxjs/toolkit");
import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice= createSlice({
    name: "theme",
    initialState: 
    {themes:false},
    reducers:{
        themeSelector:(state)=>{
            state.themes=!state.themes;
        }
    }
})

export default ThemeSlice.reducer;

export const {themeSelector}= ThemeSlice.actions