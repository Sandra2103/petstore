import type { ITarea } from '@/shared/model/tarea.model'; // Importa el tipo ITarea desde el modelo de tareas
import axios from 'axios'; // Importa Axios para realizar las solicitudes HTTP

const baseApiUrl = 'services/tareams/api/tareas'; // Define la URL base para acceder a las APIs de tareas

// Define la clase TareaService que contiene métodos para listar, crear, obtener, actualizar y eliminar tareas
export default class TareaService {
  // Método para obtener la lista de todas las tareas (HTTP GET)
  public listar(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}`)
        .then(res => {
          resolve(res); // Devuelve los datos si la solicitud es exitosa
        })
        .catch(err => {
          reject(err); // Lanza un error si ocurre un fallo en la solicitud
        });
    });
  }

  // Método para crear una nueva tarea (HTTP POST)
  public crear(tarea: ITarea): Promise<ITarea> {
    return new Promise<ITarea>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, tarea) // Envía la nueva tarea al servidor
        .then(res => {
          resolve(res.data); // Devuelve los datos de la tarea creada
        })
        .catch(err => {
          reject(err); // Lanza un error si ocurre un fallo en la solicitud
        });
    });
  }



  // Método para actualizar una tarea existente 
  public actualizar(tarea: ITarea): Promise<ITarea> {
    return new Promise<ITarea>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${tarea.id}`, tarea) // Envía los datos actualizados de la tarea
        .then(res => {
          resolve(res.data); // Devuelve los datos de la tarea actualizada
        })
        .catch(err => {
          reject(err); // Lanza un error si ocurre un fallo en la solicitud
        });
    });
  }

  // Método para eliminar una tarea mediante su ID 
  public eliminar(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`) // Solicita la eliminación de la tarea por ID
        .then(() => {
          resolve(); // Indica éxito si se eliminó la tarea correctamente
        })
        .catch(err => {
          reject(err); // Lanza un error si ocurre un fallo en la solicitud
        });
    });
  }
}
