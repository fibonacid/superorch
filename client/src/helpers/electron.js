function getIpc() {
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

function soundTest() {
  try {
    const ipc = getIpc();
    return ipc.invoke("interpret_sclang", {
      message: "{ SinOsc.ar(freq: 440); }.play()"
    });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getIpc,
  soundTest
};
