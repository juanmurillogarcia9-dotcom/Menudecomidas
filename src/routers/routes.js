import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../MainLayout.vue'
import CatalogView from '../CatalogView.vue'
import NosotrosView from '../NosotrosView.vue'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            { path: '', redirect: '/hamburguesas' },
            { path: 'hamburguesas', component: CatalogView, props: { categoria: 'hamburguesas' } },
            { path: 'perros', component: CatalogView, props: { categoria: 'perros' } },
            { path: 'pizzas', component: CatalogView, props: { categoria: 'pizzas' } },
            { path: 'bebidas', component: CatalogView, props: { categoria: 'bebidas' } },
            { path: 'postres', component: CatalogView, props: { categoria: 'postres' } },
            { path: 'promociones', component: CatalogView, props: { categoria: 'promociones' } },
            { path: 'nosotros', component: NosotrosView }
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})