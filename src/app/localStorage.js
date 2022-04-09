// load state
export const loadState = () => {
    try {
        const serialisedState = localStorage.getItem("state");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
      } catch (e) {
        console.warn(e);
        return undefined;
      }
}

// save state
export const saveState = state => {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("state", serialisedState);
      } catch (e) {
        console.warn(e);
      }
}