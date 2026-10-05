export const dates=[{value:'2026-11-14',label:'Sábado 14 de noviembre'},{value:'2026-11-15',label:'Domingo 15 de noviembre'},{value:'2026-11-21',label:'Sábado 21 de noviembre'},{value:'2026-11-22',label:'Domingo 22 de noviembre'}];
export const times=['11:00','14:00','17:00','19:00'];
const capacities=[[6,0,3,6],[0,6,6,2],[6,6,0,6],[6,3,6,0]];
export function capacity(date,time){const d=dates.findIndex(d=>d.value===date),t=times.indexOf(time);return d<0||t<0?null:capacities[d][t]}
export function initialBooking(){return {date:'',time:'',quantity:1,name:'',email:'',accessibility:''}}
export function selectionError(s){if(!dates.some(d=>d.value===s.date))return 'Elegí una fecha.';if(!times.includes(s.time))return 'Elegí un horario.';if(!Number.isInteger(s.quantity)||s.quantity<1||s.quantity>6)return 'Podés reservar entre 1 y 6 entradas.';const left=capacity(s.date,s.time);if(left===0)return 'Ese horario no tiene cupos. Elegí otro.';if(s.quantity>left)return `Quedan ${left} entradas en ese horario. Reducí la cantidad o elegí otro.`;return ''}
export function contactErrors(s){return {name:s.name.trim().length>=2?'':'Ingresá tu nombre y apellido.',email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email.trim())?'':'Ingresá un correo válido.'}}
export function dateLabel(date){return dates.find(d=>d.value===date)?.label||''}
export function qrPayload(s,code){return JSON.stringify({type:'FAIRPLAY-DEMO',code,date:s.date,time:s.time,quantity:s.quantity,validForAdmission:false})}
