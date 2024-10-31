import { computed, defineComponent, inject } from 'vue'; // Importa la función 'defineComponent' de Vue, que se utiliza para definir un componente de Vue.
import { useI18n } from 'vue-i18n'; // Importa el hook 'useI18n' de 'vue-i18n', una librería para la internacionalización.


export default defineComponent({
  // Configuración de compatibilidad, en este caso se usa el modo de compatibilidad 3 para hacer que funcione con versiones antiguas de Vue.
  compatConfig: { MODE: 3 }, 

  // Nombre del componente, lo que permite identificar este componente en las herramientas de desarrollo y en el sistema de Vue.
  name: 'JhiCalculadora',

  // Sección donde se definen las propiedades reactivas o "reactive state" del componente.
  data() {
    return {
      formula: "" as string, // 'formula' es un string que almacena la fórmula matemática que el usuario está introduciendo.
      result: 0 as number,   // 'result' es un número que almacenará el resultado del cálculo realizado.
       // Agrega esta propiedad para verificar la autenticación
    };
  },

  // Aquí se definen los métodos que controlan las acciones del componente, como cálculos o manipulación de datos.
  methods: {
    // Este método agrega un elemento (número o símbolo) a la fórmula. 
    // Es invocado cuando el usuario hace clic en un botón numérico o de operación (+, -, *, etc.).
    operate(element: number | string): void {
      console.log("operate.."); // Imprime en consola para depuración cuando se ejecuta.
      this.formula += element.toString(); // Convierte el elemento en string y lo concatena a la fórmula actual.
    },

    // Este método realiza el cálculo de la fórmula almacenada y asigna el resultado a 'result'.
    equal(): void {
      console.log("equal.."); // Imprime en consola para depuración cuando se ejecuta.
      try {
        // Evalúa la fórmula. NOTA: 'eval' puede ser peligroso, ya que ejecuta código arbitrario.
        this.result = eval(this.formula); 
      } catch (error) {
        console.error("Error en el cálculo:", error); // Muestra un error en consola si hay un problema durante la evaluación.
      }
    },

    // Limpia solo el resultado, estableciéndolo en 0.
    cleanResult(): void {
      console.log("cleanResult.."); // Imprime en consola para depuración cuando se ejecuta.
      this.result = 0; // Reinicia el resultado a 0 sin afectar la fórmula.
    },

    // Limpia tanto la fórmula como el resultado, reiniciándolos.
    cleanAll(): void {
      console.log("cleanAll.."); // Imprime en consola para depuración cuando se ejecuta.
      this.formula = ""; // Resetea la fórmula a un string vacío.
      this.result = 0;   // Resetea el resultado a 0.
    },

    // Elimina el último carácter de la fórmula, simulando un retroceso (backspace).
    drop(): void {
      console.log("drop.."); // Imprime en consola para depuración cuando se ejecuta.
      this.formula = this.formula.slice(0, -1); // Remueve el último carácter de la fórmula.
    },

    // Calcula la raíz cuadrada del valor actual en la fórmula y actualiza el resultado.
    square(): void {
      console.log("square.."); // Imprime en consola para depuración cuando se ejecuta.
      try {
        const currentVal = eval(this.formula); // Evalúa el valor actual de la fórmula.
        // Si el valor es mayor o igual a 0, calcula la raíz cuadrada, de lo contrario devuelve NaN (no es un número).
        this.result = currentVal >= 0 ? Math.sqrt(currentVal) : NaN;
      } catch (error) {
        console.error("Error en el cálculo:", error); // Muestra un error en consola si hay un problema durante la evaluación.
      }
    },

    // Calcula el inverso de la fórmula actual (1/x) y actualiza el resultado.
    devided(): void {
      console.log("devided.."); // Imprime en consola para depuración cuando se ejecuta.
      // Evita realizar la operación si la fórmula está vacía o si el último carácter es un operador (+, -, *, /, %).
      if (this.formula === "" || ["+", "-", "*", "/", "%"].includes(this.formula.slice(-1))) return;
      // Modifica la fórmula para calcular el inverso (1/fórmula).
      this.formula = "1/(" + this.formula + ")";
      this.equal(); // Ejecuta el método equal para realizar el cálculo y actualizar el resultado.
    },

    // Invierte el signo del valor actual de la fórmula (de positivo a negativo y viceversa).
    toggle(): void {
      console.log("toggle.."); // Imprime en consola para depuración cuando se ejecuta.
      // Evita realizar la operación si la fórmula está vacía o si el último carácter es un operador.
      if (this.formula === "" || ["+", "-", "*", "/", "%"].includes(this.formula.slice(-1))) return;
      // Si la fórmula comienza con "-", lo convierte a positivo. Si no, lo rodea con paréntesis y le agrega un "-".
      this.formula = this.formula.startsWith("-")
        ? Math.abs(eval(this.formula)).toString()
        : "-(" + this.formula + ")";
      this.equal(); // Ejecuta el método equal para actualizar el resultado con la fórmula modificada.
    }
  },

  // Uso del hook de internacionalización (i18n), que permite traducir el texto en la aplicación.
  setup() {
    const { t } = useI18n(); // Extrae la función 't' de useI18n, que se usa para traducciones.
    return {
      t$: t, // Devuelve 't$' para que esté disponible en el template del componente.
    };
  },
});
