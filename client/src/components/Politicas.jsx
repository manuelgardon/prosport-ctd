import React, { useState } from 'react';

const Politicas = ({ onAceptarPoliticas }) => {
  const [aceptado, setAceptado] = useState(false);
  const [mostrarPoliticas, setMostrarPoliticas] = useState(false);

  const handleAceptoChange = () => {
    const nuevoEstado = !aceptado;
    setAceptado(nuevoEstado);
    onAceptarPoliticas(nuevoEstado);
  };

  const handleLeerPoliticasClick = () => {
    setMostrarPoliticas(!mostrarPoliticas);
  };

  return (
    <div>
      <h2>Políticas de Aceptación</h2>
      <label>
        <input type="checkbox" checked={aceptado} onChange={handleAceptoChange} />
        Acepto las políticas
      </label>
      <br />
      <button onClick={handleLeerPoliticasClick}>Leer políticas</button>
      {mostrarPoliticas && (
        <div>
          <h3>Políticas de Uso ProSport:</h3>
          <p>1. Introducción</p>

          <p>Bienvenido a PROSPORT, la plataforma de reserva de espacios deportivos. Antes de comenzar a utilizar nuestra aplicación, te pedimos que leas y aceptes nuestras políticas de uso. Estas políticas se han diseñado para garantizar una experiencia segura, justa y agradable para todos nuestros usuarios.</p>

          <p>2. Reservas de Espacios Deportivos</p>

          <p>2.1. Puedes utilizar nuestra aplicación para reservar espacios deportivos, como canchas o instalaciones, para actividades deportivas.</p>

          <p>2.2. Las reservas pueden realizarse para un período de una hora o más, según la disponibilidad de los espacios.</p>

          <p>2.3. Para cancelar una reserva, debes hacerlo con al menos 24 horas de antelación a la fecha y hora reservada. En caso de no cumplir con esta política, es posible que se apliquen cargos por cancelación.</p>

          <p>3. Responsabilidades del Usuario</p>

          <p>3.1. Al utilizar nuestra aplicación, te comprometes a proporcionar información precisa y actualizada en tu perfil, incluyendo tu nombre, dirección de correo electrónico y número de teléfono.</p>

          <p>3.2. Eres responsable de mantener la confidencialidad de tu contraseña y de cualquier otra información de acceso a tu cuenta.</p>

          <p>3.3. Debes utilizar la aplicación de manera responsable y respetar las políticas y reglas de los espacios deportivos reservados.</p>

          <p>3.4. Estás obligado a tratar a otros usuarios y al personal de los espacios deportivos con respeto y cortesía en todo momento.</p>

          <p>4. Cargos y Pagos</p>

          <p>4.1. Los precios de las reservas se mostrarán en la aplicación y estarán sujetos a cambios.</p>

          <p>4.2. Los pagos se realizarán a través de los métodos de pago aceptados en la aplicación.</p>

          <p>5. Política de Cancelación</p>

          <p>5.1. Puedes cancelar una reserva con al menos 24 horas de antelación a la fecha y hora reservada. En caso de no cumplir con esta política, es posible que se apliquen cargos por cancelación.</p>

          <p>6. Soporte y Atención al Cliente</p>

          <p>6.1. Si tienes alguna pregunta, inquietud o problema relacionado con nuestra aplicación, por favor, ponte en contacto con nuestro equipo de soporte al cliente a través de sr.prosport@gmail.com</p>

          <p>7. Modificaciones en las Políticas</p>

          <p>7.1. Nos reservamos el derecho de modificar estas políticas en cualquier momento. Te notificaremos de cualquier cambio significativo en nuestras políticas.</p>

          <p>8. Aceptación de las Políticas</p>

          <p>8.1. Al utilizar nuestra aplicación, aceptas estas políticas de uso.</p>
        </div>
      )}
    </div>
  );
};

export default Politicas;