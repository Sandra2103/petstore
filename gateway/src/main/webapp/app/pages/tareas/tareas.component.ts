import { Tarea } from '@/shared/model/tarea.model'; // Importa el modelo de datos Tarea
import { defineComponent, ref, type Ref, inject, onMounted } from 'vue'; // Importa funciones y tipos de Vue
import { useI18n } from 'vue-i18n'; // Importa el módulo de i18n para traducción
import { useTareaStore } from '@/store'; // Importa el store específico de tareas
import TareaEdit from '@/components/tarea-edit/tarea-edit.vue'; // Importa el componente de edición de tareas
import TareaService from '@/pages/tareas/tareas.service'; // Importa el servicio de tareas que contiene las llamadas a la API

// Define el componente principal de tareas
export default defineComponent({
  compatConfig: { MODE: 3 }, // Configuración de compatibilidad con Vue
  emits: ['confirmed'], // Define el evento que este componente puede emitir
  components: {
    'tarea-edit': TareaEdit, // Declara el componente de edición de tarea
  },
  name: 'Tareas', // Nombre del componente
  setup() {
    // Inyecta el servicio de tareas para hacer llamadas a la API, creando una nueva instancia si no existe
    const tareaService = inject('tareaService', () => new TareaService());

    const textLabel: Ref<string> = ref('Hola mundo'); // Mensaje de ejemplo
    const tareaStore = useTareaStore(); // Almacena la referencia al store de tareas
    const listaTareas: Ref<Tarea[] | null> = ref([]); // Lista de tareas obtenida de la API
    const tareaToEdit: Ref<Tarea> = ref(new Tarea()); // Tarea actual que está siendo editada o eliminada
    const fields: Ref<string[]> = ref(['id', 'nombre', 'fechaLimite', 'acciones']); // Define los campos visibles en la tabla de tareas

    const createTareaModal = ref<any>(null); // Referencia al modal de creación de tareas
    const deleteTareaModal = ref<any>(null); // Referencia al modal de eliminación de tareas
    const editTareaModal = ref<any>(null); // Referencia al modal de edición de tareas
    const isFetching: Ref<boolean> = ref(false); // Bandera para indicar si se está realizando una solicitud

    // Función para obtener todas las tareas desde la API
    const listarTareas = () => {
      isFetching.value = true; // Establece la bandera de carga en verdadero
      tareaService()
        .listar()
        .then(res => {
          listaTareas.value = res.data; // Asigna los datos recibidos a la lista de tareas
          if (listaTareas.value) {
            // Convierte cada fecha límite a un objeto Date para su manipulación
            listaTareas.value.forEach(tarea => {
              if (tarea.fechaLimite) {
                tarea.fechaLimite = new Date(tarea.fechaLimite);
              }
            });
          }
        })
        .catch(err => {
          console.log(err); // Maneja errores de la solicitud
        })
        .finally(() => {
          isFetching.value = false; // Restablece la bandera de carga
        });
    };

    // Ejecuta listarTareas cuando el componente se monta
    onMounted(() => {
      listarTareas();
    });

    return {
      textLabel,
      listaTareas,
      createTareaModal,
      deleteTareaModal,
      editTareaModal,
      tareaToEdit,
      tareaStore,
      fields,
      isFetching,
      t$: useI18n().t, // Función para la traducción de textos
      tareaService,
      listarTareas,
    };
  },
  methods: {
    // Abre el modal de creación de tareas y establece una tarea vacía para rellenar
    openCreateModalHandler(): void {
      this.tareaToEdit = new Tarea();
      this.createTareaModal.show();
    },

    // Ejemplo de función para manejar clics
    clickHandler(): void {
      console.log('Se ejecuto un click');
    },

    // Abre el modal de edición y establece la tarea seleccionada para editar
    openEditModalHandler(tarea: Tarea): void {
      this.createEditableTarea(tarea); // Copia los datos de la tarea seleccionada
      this.editTareaModal.show(); // Muestra el modal de edición
    },

    // Abre el modal de eliminación y establece la tarea seleccionada para eliminar
    openDeleteModalHandler(tarea: Tarea): void {
      this.createEditableTarea(tarea); // Copia los datos de la tarea seleccionada
      this.deleteTareaModal.show(); // Muestra el modal de eliminación
    },

    // Copia profunda de la tarea seleccionada para evitar cambios reactivos no deseados
    createEditableTarea(tarea: Tarea): void {
      this.tareaToEdit = JSON.parse(JSON.stringify(tarea));
      this.tareaToEdit.fechaLimite = tarea.fechaLimite; // Conserva la fecha límite original
    },

    // Manejador para la creación de una nueva tarea
    createTareaHandler(): void {
      this.isFetching = true; // Activa el indicador de carga
      this.tareaService()
        .crear(this.tareaToEdit) // Llama al servicio para crear la nueva tarea
        .then(() => {
          this.listarTareas(); // Refresca la lista de tareas
        })
        .catch(err => {
          console.log(err); // Maneja cualquier error de la solicitud
        })
        .finally(() => {
          this.isFetching = false; // Desactiva el indicador de carga
        });
      this.createTareaModal.hide(); // Oculta el modal de creación después de crear la tarea
    },

    // Manejador para eliminar una tarea seleccionada
    deleteTareaHandler(): void {
      this.isFetching = true; // Activa el indicador de carga
      this.tareaService()
        .eliminar(this.tareaToEdit.id as string) // Llama al servicio de eliminación usando el ID de la tarea seleccionada
        .then(() => {
          this.listarTareas(); // Refresca la lista de tareas después de la eliminación
          this.deleteTareaModal.hide(); // Oculta el modal de eliminación
        })
        .catch(err => {
          console.log(err); // Maneja errores de la solicitud
        })
        .finally(() => {
          this.isFetching = false; // Desactiva el indicador de carga
        });
    },

    // Manejador para actualizar una tarea seleccionada
    updateTareaHandler(): void {
      this.isFetching = true; // Activa el indicador de carga
      this.tareaService()
        .actualizar(this.tareaToEdit) // Llama al servicio para actualizar la tarea
        .then(() => {
          this.listarTareas(); // Refresca la lista de tareas después de la actualización
          this.editTareaModal.hide(); // Oculta el modal de edición
        })
        .catch(err => {
          console.log(err); // Maneja errores de la solicitud
        })
        .finally(() => {
          this.isFetching = false; // Desactiva el indicador de carga
        });
    },

    // Manejador para cancelar y ocultar todos los modales de creación, edición y eliminación
    cancelHandler(): void {
      this.createTareaModal.hide();
      this.deleteTareaModal.hide();
      this.editTareaModal.hide();
    },

    // Genera una clave única usando el timestamp actual, útil para identificadores únicos
    keygenerator(): string {
      return new Date().getTime().toString();
    },
  },
});
