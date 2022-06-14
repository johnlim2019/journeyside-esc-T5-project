const KEY = "SearchBarSlice";

export function loadState(){
    try {
        const serialisedState = localStorage.getItem(KEY);
        if (!serialisedState) return undefined;
        console.log("LOCALSTORAGE able to load");
        console.log()
        return JSON.parse(serialisedState);
    }
    catch(e){
        console.log("could not load")
        console.log(e);
        return undefined;
    }
}

export function saveState(state:any){
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem(KEY,serialisedState);
        console.log("LOCALSTORAGE able to save");
    } catch (e){
        console.log("unable to save");
        console.log(e);
    }
}