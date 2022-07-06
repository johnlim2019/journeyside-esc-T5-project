export function loadState(key:string){
    try {
        const serialisedState = localStorage.getItem(key);
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

export function saveState(state:any,key:string){
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem(key,serialisedState);
        console.log("LOCALSTORAGE able to save");
    } catch (e){
        console.log("unable to save");
        console.log(e);
    }
}

export function saveSession(state:any,key:string){
    try {
        const serialisedState = JSON.stringify(state);
        sessionStorage.setItem(key,serialisedState);
        console.log("session able to save");
    } catch (e){
        console.log("unable to save");
        console.log(e);
    }
}

export function loadSession(key:string){
    try {
        const serialisedState = sessionStorage.getItem(key);
        if (!serialisedState) return undefined;
        console.log("session able to load");
        console.log()
        return JSON.parse(serialisedState);
    }
    catch(e){
        console.log("could not load")
        console.log(e);
        return undefined;
    }
}