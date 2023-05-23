import { U as User } from "./main-53a57959.js";
const logout = {
  template: ``,
  async script() {
    await User.logout();
    console.log("Sesion cerrada");
    header.script();
    window.location = "#/login";
  }
};
export {
  logout as default
};
