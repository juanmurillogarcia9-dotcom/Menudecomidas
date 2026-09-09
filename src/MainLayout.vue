<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="app-header text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-icon name="fastfood" color="amber-4" size="md" class="q-mr-sm" />
        <q-toolbar-title class="app-brand text-weight-bold text-orange-5">
          Sabor Rápido
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="app-drawer">
      <div class="drawer-brand">
        <div class="drawer-brand__mark"><q-icon name="restaurant" size="22px" /></div>
        <div>
          <div class="drawer-brand__name">Sabor Rápido</div>
          <div class="drawer-brand__tagline">Comida que alegra el día</div>
        </div>
      </div>

      <q-separator />

      <q-list padding>
        <q-item-label header class="drawer-section-title">Explora el menú</q-item-label>
        
        <q-item clickable v-ripple to="/hamburguesas" class="drawer-item">
          <q-item-section avatar><q-icon name="lunch_dining" color="orange-8" /></q-item-section>
          <q-item-section>Hamburguesas</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/perros" class="drawer-item">
          <q-item-section avatar><q-icon name="restaurant" color="orange-8" /></q-item-section>
          <q-item-section>Perros Calientes</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/pizzas" class="drawer-item">
          <q-item-section avatar><q-icon name="local_pizza" color="orange-8" /></q-item-section>
          <q-item-section>Pizzas</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/bebidas" class="drawer-item">
          <q-item-section avatar><q-icon name="emoji_food_beverage" color="orange-8" /></q-item-section>
          <q-item-section>Bebidas</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/postres" class="drawer-item">
          <q-item-section avatar><q-icon name="cake" color="orange-8" /></q-item-section>
          <q-item-section>Postres</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/promociones" class="drawer-item drawer-item--promotion">
          <q-item-section avatar><q-icon name="local_offer" color="red-6" /></q-item-section>
          <q-item-section>Promociones</q-item-section>
        </q-item>

        <q-separator class="q-my-lg" />

        <q-item clickable v-ripple to="/nosotros" class="drawer-item">
          <q-item-section avatar><q-icon name="info" color="blue-6" /></q-item-section>
          <q-item-section>Nosotros</q-item-section>
        </q-item>

      </q-list>

      <div class="drawer-footer">Ingredientes frescos · Sabor real</div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>