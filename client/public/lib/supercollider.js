const sc = require("supercolliderjs");

const options = {
  // post verbose messages to console
  //debug: true,
  // echo all commands sent TO sclang to console
  echo: true
};

async function launchSuperCollider() {
  // Boot supercollider interpreter
  const sclang = await sc.lang.boot(options);
  // Boot supercollider sound server
  await sclang.interpret(`s = Server.default; s.boot;`);
  return sclang;
}

module.exports = {
  launchSuperCollider
};
