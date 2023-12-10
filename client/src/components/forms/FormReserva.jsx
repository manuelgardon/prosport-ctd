/* eslint-disable react/prop-types */
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import TextField from '@mui/material/TextField';
export default function FormReserva({
    fechaReserva,
    horaInicio,
    handleChangeHoraInicio,
    horaFin,
    handleChangeHoraFin,
    precioTotal,
    handleReserva,
    setFechaReserva,
    diasDisponibles,
}) {
    const fechaMaxima = diasDisponibles ? new Date(Math.max(...diasDisponibles.map(date => new Date(date)))) : new Date();

    const highlightDates = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        
        if (diasDisponibles && diasDisponibles.includes(formattedDate)) {
            return 'highlight-available';
        } else if (formattedDate === fechaReserva) {
            return 'highlight-reserved';
        } else {
            return null;
        }
    };

    return (
        <section className="">
            <form className="flex flex-col place-content-center w-[400px] bg-opacity-40 backdrop-blur-lg bg-[#135241] px-4 py-4 rounded-xl " onSubmit={handleReserva}>
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-white text-xl mb-3">
                        Fecha de inicio:
                    </label>
                    <DatePicker
                        value={new Date(fechaReserva)}
                        onChange={(date) => setFechaReserva(date)}
                        renderInput={(startProps) => (
                            <TextField
                                {...startProps}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                className="w-full px-3 py-2"
                            />
                        )}
                        format="dd/MM/yyyy"
                        inputFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        maxDate={fechaMaxima}
                        shouldDisableDate={highlightDates}
                    />  
                </div>

                <div className="mb-4">
                    <label htmlFor="startTime" className="block text-white text-xl mb-3">
                        Hora de inicio:
                    </label>
                    <TimePicker
                        value={horaInicio}
                        onChange={handleChangeHoraInicio}
                        renderInput={(props) => (
                            <input
                                {...props.inputProps}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-600"
                            />
                        )}
                        ampm={false}
                        minutesStep={60}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="endTime" className="block text-white text-xl mb-3">
                        Hora de fin:
                    </label>
                    <TimePicker
                        value={horaFin}
                        onChange={handleChangeHoraFin}
                        renderInput={(props) => (
                            <input
                                {...props.inputProps}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary-100"
                            />
                        )}
                        ampm={false}
                        minutesStep={60}
                    />
                </div>
                {precioTotal && (
                    <div className="mb-4">
                        <label htmlFor="precioTotal" className="block text-[#E1E1E1] text-xl mb-3">
                            Precio Total:
                        </label>
                        <p className="text-xl text-[#FF9B27]">${precioTotal}</p>
                    </div>
                )}
                <button type="submit" className="bg-green-500 text-white p-2 rounded-md mt-2 w-full transition-colors duration-300 ease-in-out hover:bg-green-600">Reservar</button>
            </form>
        </section>
    );
}