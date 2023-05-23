import { U as User } from "./main-31543197.js";
const registro = {
  template: `<div class="pt-5">
  <h1 class="w-100 text-center">Registro</h1>
  <form action=""  id="form-id" class="form p-4 border shadow bordered mt-5 mx-auto" style="width: 400px;">
    <label for="email" class="mt-2 form-label">User: </label>
    <input type="text" class="form-control" placeholder="usuario@mail.com" id="email-id">

    <label for="pass" class="mt-2 form-label">Contraseña: </label>
    <input type="password" class="form-control" id="password-id">

    
    <button type="submit" class="btn btn-primary mt-4 w-100 " id="enviar">Entrar</button>
  </form>
</div>`,
  async script() {
    const main = document.querySelector("main");
    main.style.height = "1000px";
    const formUser = document.querySelector("#form-id");
    formUser.addEventListener("submit", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        const usuario = {
          email: document.querySelector("#email-id").value,
          password: document.querySelector("#password-id").value
        };
        const nuevoUser = await User.create(usuario);
        window.location = "#/login";
      } catch (error) {
        console.log(error);
        swal({ title: "Error al crear el usuario", icon: "warning" });
      }
    });
  }
};
export {
  registro as default
};
