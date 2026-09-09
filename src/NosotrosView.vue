<template>
  <q-page class="q-pa-md">
    <!-- Banner de Presentación -->
    <div class="q-mb-lg rounded-borders overflow-hidden">
      <q-img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200" height="220px">
        <div class="absolute-bottom text-h3 text-weight-bold text-white bg-transparent q-pa-md shadow-2">
          Sobre Nosotros
        </div>
      </q-img>
    </div>

    <!-- Historia Breve -->
    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 text-weight-bold q-mb-sm text-primary">Nuestra Historia</div>
        <p class="text-body1 text-grey-8">
          Fundado en 2021, <strong>Sabor Rápido</strong> nació del sueño de llevar comida rápida artesanal de alta calidad a las calles de la ciudad. Empezamos con un pequeño carrito y hoy, gracias a nuestros clientes, somos el punto de referencia favorito para compartir momentos llenos de sabor y buena energía.
        </p>
      </q-card-section>
    </q-card>

    <!-- Información de Contacto y Horarios -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-6">
        <q-card flat bordered class="full-height">
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-sm text-primary">Dirección y Horarios</div>
            <q-list>
              <q-item>
                <q-item-section avatar><q-icon name="place" color="orange-8" /></q-item-section>
                <q-item-section>Calle 45 # 12-34, Zona Rosa</q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar><q-icon name="schedule" color="orange-8" /></q-item-section>
                <q-item-section>Lunes a Domingo: 4:00 PM - 11:30 PM</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card flat bordered class="full-height">
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-sm text-primary">Teléfono y WhatsApp</div>
            <q-list>
              <q-item>
                <q-item-section avatar><q-icon name="phone" color="green-7" /></q-item-section>
                <q-item-section>(607) 723 4567</q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar><q-icon name="chat" color="green-7" /></q-item-section>
                <q-item-section>+57 310 456 7890 (Pedidos WhatsApp)</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Equipo de Trabajo -->
    <div class="text-h5 text-weight-bold q-mb-md">Nuestro Equipo</div>
    <div class="row q-col-gutter-md">
      <div v-for="miembro in equipo" :key="miembro.nombre" class="col-12 col-sm-4">
        <q-card class="text-center">
          <q-img :src="miembro.foto" height="200px" />
          <q-card-section>
            <div class="text-h6 text-weight-bold">{{ miembro.nombre }}</div>
            <q-badge color="orange-9" class="q-mt-xs">{{ miembro.cargo }}</q-badge>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const equipo = ref([
  {
    nombre: 'Carlos Mendoza',
    cargo: 'Chef Ejecutivo',
    foto: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500'
  },
  {
    nombre: 'Andrea Gómez',
    cargo: 'Cajera Principal',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500'
  },
  {
    nombre: 'Mateo Rojas',
    cargo: 'Domiciliario',
    foto: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=500'
  }
])
</script>