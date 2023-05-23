import { User } from "./claseUser"
export default  {
  template: ``,
  async script() {
    await User.logout()
    console.log("Sesion cerrada")
    header.script()
    window.location = '#/login'
  }
}
