<template>
  <q-page class="q-pa-md">
    <!-- Banner Horizontal Apetitoso -->
    <div class="banner-container relative-position q-mb-lg rounded-borders overflow-hidden">
      <q-img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200" height="250px">
        <div class="absolute-bottom text-h3 text-weight-bold text-white bg-transparent q-pa-md shadow-2">
          Sección de Hamburguesas
        </div>
      </q-img>
    </div>

    <!-- Descripción Breve -->
    <q-card flat bordered class="q-mb-lg bg-grey-2">
      <q-card-section class="text-subtitle1 text-grey-8">
        Disfruta de nuestras jugosas hamburguesas artesanales hechas al carbón, con carne 100% de res y pan brioche recién horneado.
      </q-card-section>
    </q-card>

    <!-- Recomendación del Chef (Diseño Diferenciado) -->
    <q-card bordered class="bg-orange-1 q-mb-xl shadow-3">
      <q-banner class="bg-orange-9 text-white text-weight-bold">
        ⭐ RECOMENDACIÓN DEL CHEF ⭐
      </q-banner>
      <q-card-section horizontal>
        <q-img class="col-5" src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600" />
        <q-card-section class="col-7">
          <div class="text-h5 text-weight-bold">La Monstruosa BBQ</div>
          <div class="text-subtitle2 text-orange-9 q-mt-sm">$24.000</div>
          <p class="text-grey-7 q-mt-sm">Doble carne de res, queso cheddar fundido, tocino crujiente, cebolla caramelizada y salsa BBQ artesanal.</p>
          <q-badge color="red" label="Más pedido" />
        </q-card-section>
      </q-card-section>
    </q-card>

    <!-- Listado de Productos (Mínimo 4) -->
    <div class="text-h5 text-weight-bold q-mb-md">Nuestro Menú</div>
    <div class="row q-col-gutter-md">
      <div v-for="producto in productos" :key="producto.id" class="col-12 col-sm-6 col-md-3">
        <q-card class="column full-height">
          <q-img :src="producto.imagen" height="180px">
            <q-badge v-if="producto.etiqueta" :color="producto.colorEtiqueta" class="absolute-top-right q-ma-sm">
              {{ producto.etiqueta }}
            </q-badge>
          </q-img>

          <q-card-section class="col">
            <div class="text-h6 text-weight-bold">{{ producto.nombre }}</div>
            <div class="text-subtitle1 text-primary text-weight-bold q-mt-xs">{{ producto.precio }}</div>
            <p class="text-caption text-grey-7 q-mt-sm">{{ producto.descripcion }}</p>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat color="orange-9" icon="add_shopping_cart" label="Añadir" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const productos = ref([
  {
    id: 1,
    nombre: 'Clásica con Queso',
    precio: '$16.000',
    descripcion: 'Carne de res 150g, queso mozzarella, lechuga fresca, tomate y salsa de la casa.',
    imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
    etiqueta: 'Más pedido',
    colorEtiqueta: 'orange'
  },
  {
    id: 2,
    nombre: 'Burger Criolla',
    precio: '$19.500',
    descripcion: 'Carne de res, maduritos fritos, queso costeño asado, hogao y lechuga crujiente.',
    imagen: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600',
    etiqueta: 'Nuevo',
    colorEtiqueta: 'green'
  },
  {
    id: 3,
    nombre: 'Burger Picante Jalapeño',
    precio: '$21.000',
    descripcion: 'Carne de res, jalapeños encurtidos, queso pepper jack, aros de cebolla y aderezo picante.',
    imagen: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600',
    etiqueta: 'Picante',
    colorEtiqueta: 'red'
  },
  {
    id: 4,
    nombre: 'Veggie Delicia',
    precio: '$18.000',
    descripcion: 'Medallón a base de quinua y frijol negro, aguacate, tomate grillado y germinados.',
    imagen: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=600',
    etiqueta: 'Vegetariano',
    colorEtiqueta: 'teal'
  }
])
</script>