export function soundTest() {
  return interpretWithSclang("interpret_sclang", {
    message: `
    (
        {
          var env = Env.perc(0.5, 1, 0.5, -4);
          SinOsc.ar(470) * EnvGen.kr(env, doneAction: Done.freeSelf)
        }.play
    )
    `
  });
}

export function interpretWithSclang(message) {
  if (typeof message !== "string") {
    throw new Error("Message must be a string");
  }
  let ipcRenderer;
  try {
    ipcRenderer = window.require("electron").ipcRenderer;
    return ipcRenderer.invoke("interpret_sclang", { message });
  } catch (err) {
    const message = "Can't reach sclang interpreter.";
    console.warn(message);
    throw new Error(message);
  }
}
