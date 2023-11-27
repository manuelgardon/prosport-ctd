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
        <section className="mt-10">
            <form className="w-full max-w-sm mx-auto bg-opacity-50 backdrop-blur-lg bg-[#223331] px-4 py-4 rounded-lg" onSubmit={handleReserva}>
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-[#AAF0D5] text-sm font-bold mb-2">
                        Fecha de inicio de reserva:
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
                    <label htmlFor="startTime" className="block text-[#AAF0D5] text-sm font-bold mb-2">
                        Hora de inicio de reserva:
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
                    <label htmlFor="endTime" className="block text-[#AAF0D5] text-sm font-bold mb-2">
                        Hora de finalización de reserva:
                    </label>
                    <TimePicker
                        value={horaFin}
                        onChange={handleChangeHoraFin}
                        renderInput={(props) => (
                            <input
                                {...props.inputProps}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary-600"
                            />
                        )}
                        ampm={false}
                        minutesStep={60}
                    />
                </div>
                {precioTotal && (
                    <div className="mb-4">
                        <label htmlFor="precioTotal" className="block text-[#AAF0D5] text-sm font-bold mb-2">
                            Precio Total:
                        </label>
                        <p>${precioTotal}</p>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full hover:bg-[#17B289] hover:bg-opacity-5 text-[#17B289] font-bold py-2 px-4 rounded border border-[#17B289] "
                >
                    Reservar
                </button>
            </form>
        </section>
    );
}