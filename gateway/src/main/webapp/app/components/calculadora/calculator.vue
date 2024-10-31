<template>
  <!-- Contenedor principal de la calculadora con una clase de estilo 'calculator-border' -->
  <div class="calculator-border">
    
    <!-- Contenedor de la pantalla de la calculadora -->
    <div class="calculator-display">
      <!-- Muestra la fórmula en pantalla. 'v-cloak' asegura que el contenido no se vea hasta que Vue se monte correctamente -->
      <div class="calculator-formula" v-cloak>{{ formula }}</div>
      <!-- Muestra el resultado de la operación -->
      <div class="calculator-result" v-cloak>{{ result }}</div>
    </div>
    
    <!-- Contenedor de los botones de la calculadora -->
    <div class="calculator-items">

      <!-- Fila 1: contiene los botones de retroceso, limpiar, alternar signo y raíz cuadrada -->
      <div class="calculator-row-1">
        <!-- Botón para eliminar el último carácter de la fórmula -->
        <div class="calculator-item" id="white" @click="drop">←</div>
        <!-- Botón para limpiar solo el resultado -->
        <div class="calculator-item" id="clean"  @click="cleanResult">CE</div>
        <!-- Botón para limpiar tanto la fórmula como el resultado -->
        <div class="calculator-item" id="clean" @click="cleanAll">C</div>
        <!-- Botón para alternar el signo del número actual (+/-) -->
        <div class="calculator-item" id="white" @click="toggle">±</div>
        <!-- Botón para calcular la raíz cuadrada del número actual -->
        <div class="calculator-item" id="white" @click="square">√</div>
      </div>

      <!-- Fila 2: contiene los números 7, 8, 9 y los operadores '/' y '%' -->
      <div class="calculator-row-2">
        <!-- Botones numéricos y de operación -->
        <div class="calculator-item" @click="operate(7)">7</div>
        <div class="calculator-item" @click="operate(8)">8</div>
        <div class="calculator-item" @click="operate(9)">9</div>
        <!-- Botón para dividir -->
        <div class="calculator-item" id="white" @click="operate('/')">/</div>
        <!-- Botón para calcular el módulo -->
        <div class="calculator-item" id="white" @click="operate('%')">%</div>
      </div>

      <!-- Fila 3: contiene los números 4, 5, 6 y los operadores '*' y '1/x' -->
      <div class="calculator-row-3">
        <!-- Botones numéricos y de operación -->
        <div class="calculator-item" @click="operate(4)">4</div>
        <div class="calculator-item" @click="operate(5)">5</div>
        <div class="calculator-item" @click="operate(6)">6</div>
        <!-- Botón para multiplicar -->
        <div class="calculator-item" id="white" @click="operate('*')">*</div>
        <!-- Botón para calcular el inverso del número (1/x) -->
        <div class="calculator-item" id="white" @click="devided">1/x</div>
      </div>

      <!-- Fila 4: contiene los números 1, 2, 3 y los operadores '-' y '+' -->
      <div class="calculator-row-4">
        <!-- Botones numéricos y de operación -->
        <div class="calculator-item" @click="operate(1)">1</div>
        <div class="calculator-item" @click="operate(2)">2</div>
        <div class="calculator-item" @click="operate(3)">3</div>
        <!-- Botón para restar -->
        <div class="calculator-item" id="white" @click="operate('-')">-</div>
        <!-- Botón para sumar -->
        <div class="calculator-item" id="white" @click="operate('+')">+</div>
      </div>

      <!-- Fila 5: contiene el número 0, el punto decimal y el botón de igual '=' -->
      <div class="calculator-row-5">
        <!-- Botones numérico, decimal y de operación -->
        <div class="calculator-item" @click="operate(0)">0</div>
        <!-- Botón para agregar un punto decimal -->
        <div class="calculator-item" @click="operate('.')">.</div>
        <!-- Botón para calcular el resultado de la operación actual -->
        <div class="calculator-item" id="white" @click="equal">=</div>
      </div>
    </div>
  </div>


</template>

<script lang="ts" src="./calculator.component.ts"></script>
<!-- Se incluye el archivo JavaScript/TypeScript que define la lógica de la calculadora -->


