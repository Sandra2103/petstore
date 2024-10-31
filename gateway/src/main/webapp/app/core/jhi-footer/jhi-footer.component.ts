import { defineComponent, ref, inject } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'JhiFooter',
  setup() {
    const username = inject('currentUsername');
    const showModal = ref(false); // Controla la visibilidad del modal

    return {
      username,
      t$: useI18n().t,
      showModal, // Retorna la propiedad para controlar el modal
    };
  },
});
