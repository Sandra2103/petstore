<template>
  <div id="footer" class="navbar fixed-bottom navbar-light bg-light">
    <p v-text="t$('footer')"></p>
  </div>

  <!-- Solo muestra el botón de calculadora si el usuario está autenticado -->
  <button v-if="username" @click="showModal = true" class="calcu">+/-</button>

  <!-- Modal que contiene la calculadora -->
  <div v-if="showModal" class="modal" tabindex="-1" role="dialog" style="display: block;">
    <div class="modal-dialog" role="document">
      <div class="modal-content" id="modal-content-calcu">
        <div class="modal-header">
          <h5 class="modal-title">Calculadora</h5>
          <button id="close-calcu" type="button" class="close" @click="showModal = false">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <calculadora></calculadora> <!-- Aquí va la calculadora -->
        </div>
 
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./jhi-footer.component.ts"></script>
