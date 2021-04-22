export function convertDurationToTimeString(duration: number) {
  const hours = Math.floor(duration / 3600); //3600 sao 60 * 60 - convertendo para horas - Math.floor preciso do menor valor.
  const minutes = Math.floor((duration % 3600) / 60); //resto dividido por 60, terei o numero em minutos
  const seconds = duration % 60; //resto por 60, segundos

  const timeString = [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");

  return timeString;
}
