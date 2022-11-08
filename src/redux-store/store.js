import createStore from "react-redux"

const counterReducer = (state={counter:0},action)=>{
    return {
        counter:state?.counter++
    }
}

const store = createStore(counterReducer)

const getTheCounter = ()=>{
    const currentState = store?.getState()
    console.log(currentState)
}

store.subscribe(getTheCounter)

store.dispatch()