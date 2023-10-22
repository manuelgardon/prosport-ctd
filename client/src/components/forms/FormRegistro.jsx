
const FormRegistro = () => {

  return (
    <form >
      <h2>Registrate</h2>
      <label htmlFor="">Nombre:</label>
      <input type="text" name="nombre" />
      <label htmlFor="">Apellido:</label>
      <input type="text" name="apellido" />
      <label htmlFor="" >Email:</label>
      <input type="email" name="email" />
      <label htmlFor="" >Celular:</label>
      <input type="text" name="celular" />
      <label htmlFor="" >DNI:</label>
      <input type="text" name="dni" />
      <label htmlFor="" >Fecha de nacimiento:</label>
      <input type="text" name="fechaNacimiento" />
      <label htmlFor="" >Contraseña:</label>
      <input type="password" name="contraseña" />
      <label htmlFor="" >Repetir Contraseña:</label>
      <input type="password" name="reContraseña" />
      <label htmlFor="" >
        <input type="text" />
      </label>

      <button type="submit">Continuar</button>

    </form>
  )
}

export default FormRegistro