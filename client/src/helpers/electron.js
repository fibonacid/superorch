export function getIpc() {
  try {
    //
    // This should throw an error
    // when application is runs on
    // a regular browser.
    //
    const electron = window.require("electron");
    return electron.ipcRenderer;
  } catch (err) {
    throw err;
  }
}

export function soundTest() {
  try {
    const ipc = getIpc();
    return ipc.invoke("interpret_sclang", {
      message: `
      (
         {
            var env = Env.perc(0.5, 1, 0.5, -4);
            SinOsc.ar(470) * EnvGen.kr(env, doneAction: Done.freeSelf)
         }.play
      )
      `
    });
  } catch (err) {
    throw err;
  }
}
