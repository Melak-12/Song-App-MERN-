import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import songService from './songService'

const initialState = {
    songs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
//create new song
export const createSong = createAsyncThunk('songs/create', async (songData, thunkAPI) => {
    try {
      
        const userr = localStorage.getItem('user')
        const token2 = JSON.parse(userr);        
        // const token = thunkAPI.getState().auth.user.token

        return await songService.createSong(songData, token2.token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get user songs 
export const getSongs = createAsyncThunk('songs/getAll', async (_, thunkAPI) => {
    try {
        

        // const token2=userr.token
        const userr = localStorage.getItem('user')
        const token2 = JSON.parse(userr);        
        // const token = thunkAPI.getState().auth.user.token
        // console.warn("token is ", token)
        // console.warn("token  from local is ", token2.token)

        return await songService.getSong(token2.token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//delete user song
export const deleteSong = createAsyncThunk('songs/delete', async (id, thunkAPI) => {
    try {
        // const token=userr.token
        const userr = localStorage.getItem('user')
        const token2 = JSON.parse(userr);        
        // const token = thunkAPI.getState().auth.user.token
        return await songService.deleteSong(id, token2.token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSong.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(createSong.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.songs.push(action.payload)

            })
            .addCase(createSong.rejected, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.message = action.payload

            })

            //get songs
            .addCase(getSongs.pending, (state) => {
                state.isLoading = true


            })
            .addCase(getSongs.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.songs = action.payload

            })
            .addCase(getSongs.rejected, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.message = action.payload

            })

            //delete songs
            .addCase(deleteSong.pending, (state) => {
                state.isLoading = true


            })
            .addCase(deleteSong.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.songs = state.songs.filter((song) => song._id !== action.payload.id)

            })
            .addCase(deleteSong.rejected, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.message = action.payload

            })

    }
})

export const { reset } = songSlice.actions
export default songSlice.reducer