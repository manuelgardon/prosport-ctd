/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { setHours, setMinutes, differenceInHours } from 'date-fns'
import axios from 'axios'
import Cookies from 'js-cookie'
import FormReserva from './forms/FormReserva'
import Swal from 'sweetalert2'
import "../utils/utilsCSS.css"
import emailjs from 'emailjs-com'
import { UserContext } from '../UserContext'
// recibimos el valor del precio del espacio desde el componente EspacioPage
export default function Reserva({ precio }) {
    
    const [fechaReserva, setFechaReserva] = useState(new Date())
    const [horaInicio, setHoraInicio] = useState(setHours(setMinutes(new Date(), 0), 12));
    const [horaFin, setHoraFin] = useState(setHours(setMinutes(new Date(), 0), 13));
    const [reservasExistente, setReservasExistente] = useState([])
    const [precioTotal, setPrecioTotal] = useState();
    const { id } = useParams()
    const token = Cookies.get('token')
    const [diasDisponibles, setDiasDisponibles] = useState([]); 
    const [nombreEspacio, setNombreEspacio] = useState('')
    const { user } = useContext(UserContext);

        useEffect(() => {
            async function obtenerReservaExistente() {
                try {
                    const response = await axios.get(`http://localhost:1234/api/reservas?espacioId=${id}`);
                    setReservasExistente(response.data);
                } catch (error) {
                    console.error('Error al obtener las reservas:', error);
                }
            }
        
            async function obtenerDiasDisponibles() {
                try {
                    const response = await axios.get(`http://localhost:1234/api/espacios/${id}`);
                    setDiasDisponibles(response.data.diasDisponibles);
                    setNombreEspacio(response.data.nombre);
                    sendReservaEmail(user.email, user.nombre, user.apellido, response.data.nombre)
                } catch (error) {
                    console.error('Error al obtener los días disponibles:', error);
                }
            }
            obtenerReservaExistente();
            obtenerDiasDisponibles();
        }, [id]); 
    
    function calcularPrecio() {
        const horaInicioDate = new Date(horaInicio);
        const horaFinDate = new Date(horaFin);
        const numberOfHours = differenceInHours(horaFinDate, horaInicioDate);
        // usamos el precio que tomamos por props para calcular el precioTotal
        const precioTotal = numberOfHours * precio;
        setPrecioTotal(precioTotal)
    }

    // estas funciones nos sirven para recalcular el precio cada vez que se cambia 
    // la hora seleccionada en el form
    function handleChangeHoraInicio(time) {
        setHoraInicio(time)
        calcularPrecio()
    }

    function handleChangeHoraFin(time) {
        setHoraFin(time)
        calcularPrecio()
    }

    useEffect(() => {
        calcularPrecio()
    }, [horaInicio, horaFin, precio])

    emailjs.init("Blgi9VopKOYoDr-NN")
    const sendReservaEmail = async (email, nombre, apellido, nombreEspacio) => {
        // Envía el correo de bienvenida
        const templateParams = {
            to_email: email,
            user_name: `${nombre} ${apellido}`, 
            fecha_reserva: fechaReserva.toLocaleDateString(),
            hora_inicio: horaInicio.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            hora_fin: horaFin.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            precioTotal: precioTotal,
            nombre_espacio: nombreEspacio,
        };

        try {
            const response = await emailjs.send('service_l6prbvb', 'template_gn2rruj', templateParams);
            console.log('Correo electrónico de bienvenida enviado con éxito:', response);
        } catch (error) {
            console.error('Error al enviar el correo electrónico de bienvenida:', error);
        }
    }

    async function handleReserva(event) {
        event.preventDefault()
        if (token) {
            if (horaInicio >= horaFin) {
                Swal.fire({

                    title:"Revisa que la hora de inicio no sea mayor a la hora de finalización",
                    icon: "warning",
                    background:"#212121",
                    backdrop:true,
                    color: "#00FF9D",
                    allowOutsideClick:false,
                    allowEscapeKey:true,
                    allowEnterKey:true,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#00FF9D",
                    buttonsStyling: false,
                    customClass:{
                        popup:"swal-popu",
                        confirmButton:"swal"
                    },
                    });
                return
            }
            // convertimos la fecha en formato ISO y luego dividimos la cadena para tomar
            // solo la fecha
            const fechaReservaISO = fechaReserva.toLocaleDateString('en-US');
            console.log('fechaReservaISO:', fechaReservaISO);
            const diasDisponiblesStrings = diasDisponibles.map(date => new Date(date).toLocaleDateString('en-US'));
            console.log('diasDisponiblesStrings:', diasDisponiblesStrings);
            const horaFinStr = horaFin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            const horaInicioStr = horaInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // los argumentos hour y minute sirven para setear un formato a la cadena de tiempo, ej: '2-digit' => '01' en vez de '1' en el caso de las horas
            if (!diasDisponiblesStrings.includes(fechaReservaISO)) {
                Swal.fire({

                    title:"La fecha de reserva no está dentro del intervalo permitido",
                    icon: "error",
                    background:"#212121",
                    backdrop:true,
                    color: "#00FF9D",
                    allowOutsideClick:false,
                    allowEscapeKey:true,
                    allowEnterKey:true,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#00FF9D",
                    buttonsStyling: false,
                    customClass:{
                        popup:"swal-popu",
                        confirmButton:"swal"
                    },
                    });
                return;
            }
            const reservaExistente = reservasExistente.find(
                (reserva) => reserva.espacioId === id &&
                    reserva.fechaReserva === fechaReservaISO &&
                    reserva.horaInicio === horaInicioStr &&
                    reserva.horaFin === horaFinStr
            )

            if (reservaExistente) {
                Swal.fire({

                    title:"Las fechas y horas seleccionadas ya han sido reservadas",
                    icon: "warning",
                    background:"#212121",
                    backdrop:true,
                    color: "#00FF9D",
                    allowOutsideClick:false,
                    allowEscapeKey:true,
                    allowEnterKey:true,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#00FF9D",
                    buttonsStyling: false,
                    customClass:{
                        popup:"swal-popu",
                        confirmButton:"swal"
                    },
                    });
                return
            }

            try {
                calcularPrecio()
                const response = await axios.post(
                    'http://localhost:1234/api/reservas',
                    {
                        espacioId: id,
                        fechaReserva: fechaReservaISO,
                        horaInicio: horaInicioStr,
                        horaFin: horaFinStr,
                        precio: precioTotal
                    },
                    { withCredentials: true }
                )

                setReservasExistente((prevReservas) => [...prevReservas, response.data])
                Swal.fire({

                    title:"Reserva exitosa",
                    icon: "success",
                    background:"#212121",
                    backdrop:true,
                    color: "#00FF9D",
                    allowOutsideClick:false,
                    allowEscapeKey:true,
                    allowEnterKey:true,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#00FF9D",
                    buttonsStyling: false,
                    customClass:{
                        popup:"swal-popu",
                        confirmButton:"swal"
                    },
                    })
                console.log(response.data)
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    Swal.fire({

                        title:"Error en la reserva",
                        text: error.response.data.message,
                        icon: "error",
                        background:"#212121",
                        backdrop:true,
                        color: "#00FF9D",
                        allowOutsideClick:false,
                        allowEscapeKey:true,
                        allowEnterKey:true,
                        confirmButtonText: "Aceptar",
                        confirmButtonColor: "#00FF9D",
                        buttonsStyling: false,
                        customClass:{
                          popup:"swal-popu",
                          confirmButton:"swal"
                        },
                      })
                } else {
                    console.error('Error al hacer la reserva:', error)
                }
            }
        } else {
            Swal.fire({

                title:"Debes iniciar sesión para realizar una reserva",
                icon: "warning",
                background:"#212121",
                backdrop:true,
                color: "#00FF9D",
                allowOutsideClick:false,
                allowEscapeKey:true,
                allowEnterKey:true,
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#00FF9D",
                buttonsStyling: false,
                customClass:{
                    popup:"swal-popu",
                    confirmButton:"swal"
                },
                })
        }
        if (user) {
            const { email, nombre, apellido } = user;
            sendReservaEmail(email, nombre, apellido, nombreEspacio);
        }
    }

    return (
        <FormReserva diasDisponibles ={diasDisponibles} fechaReserva={fechaReserva} horaInicio={horaInicio} handleChangeHoraInicio={handleChangeHoraInicio} horaFin={horaFin} handleChangeHoraFin={handleChangeHoraFin} precioTotal={precioTotal} handleReserva={handleReserva} setFechaReserva={setFechaReserva}/>
    );
}

