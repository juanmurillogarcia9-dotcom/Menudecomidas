<template>
  <q-page class="catalog-page q-pa-md">
    <div class="catalog-banner relative-position q-mb-lg rounded-borders overflow-hidden">
      <q-img :src="categoriaActual.imagen" height="280px">
        <div class="catalog-banner__content absolute-full flex flex-center items-end justify-start">
          <div>
            <div class="eyebrow">SABOR RÁPIDO · CARTA</div>
            <div class="text-h3 text-weight-bold text-white">{{ categoriaActual.titulo }}</div>
          </div>
        </div>
      </q-img>
    </div>

    <q-card flat bordered class="catalog-intro q-mb-lg">
      <q-card-section class="text-subtitle1 text-grey-8">
        {{ categoriaActual.descripcion }}
      </q-card-section>
    </q-card>

    <q-card bordered class="featured-card q-mb-xl shadow-3">
      <q-banner class="featured-card__banner text-white text-weight-bold">
        <q-icon name="auto_awesome" class="q-mr-sm" />{{ categoriaActual.recomendacion }}
      </q-banner>

      <div class="row items-center no-wrap">
        <q-img
          class="featured-card__image col-12 col-md-5"
          :src="categoriaActual.destacado.imagen || defaultHotDogImage"
          height="260px"
          fit="cover"
          style="min-height: 260px;"
        />

        <div class="col-12 col-md-7 q-pa-lg featured-card__copy">
          <div class="text-h5 text-weight-bold">{{ categoriaActual.destacado.nombre }}</div>
          <div class="text-subtitle2 text-orange-9 q-mt-sm">
            {{ formatearPrecio(categoriaActual.destacado.precio) }}
          </div>
          <p class="text-grey-7 q-mt-sm">{{ categoriaActual.destacado.descripcion }}</p>
          <q-badge color="red" :label="categoriaActual.destacado.badge" />
        </div>
      </div>
    </q-card>

    <div v-if="isCarritoView" class="cart-section q-mb-xl">
      <div class="cart-heading row items-end q-mb-md">
        <div class="col">
          <div class="eyebrow text-orange-9">RESUMEN DE COMPRA</div>
          <div class="text-h4 text-weight-bold">Mi pedido</div>
        </div>
        <q-badge color="orange-8" :label="`${carrito.length} productos`" />
      </div>

      <q-card bordered class="cart-card shadow-2 q-mb-md">
        <q-list separator>
          <q-item v-for="item in carrito" :key="item.id + '-' + item.categoria">
            <q-item-section>
              <div class="text-subtitle1 text-weight-medium">{{ item.nombre }}</div>
              <div class="text-caption text-grey-7">{{ formatearPrecio(item.precio) }} por unidad</div>
            </q-item-section>
            <q-item-section side>
              <div class="cart-quantity">x{{ item.cantidad }}</div>
            </q-item-section>
            <q-item-section side>
              <div class="text-weight-bold text-primary">{{ formatearPrecio(item.precio * item.cantidad) }}</div>
            </q-item-section>
            <q-item-section side>
              <q-btn
                flat
                round
                dense
                color="negative"
                icon="delete_outline"
                aria-label="Eliminar del carrito"
                @click="eliminarDelCarrito(item)"
              />
            </q-item-section>
          </q-item>

          <q-item v-if="carrito.length === 0">
            <q-item-section class="text-grey-7">Tu carrito está vacío.</q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <div class="cart-total row items-center justify-end q-pa-md">
        <div class="text-subtitle1 text-weight-bold q-mr-md">Total del pedido</div>
        <div class="text-h5 text-weight-bold text-orange-8">{{ formatearPrecio(carritoTotal) }}</div>
      </div>
    </div>

    <div v-else class="menu-heading row items-end q-mb-md">
      <div class="col">
        <div class="eyebrow text-orange-9">SELECCIÓN DE LA CASA</div>
        <div class="text-h4 text-weight-bold">Nuestro menú</div>
      </div>
    </div>

    <div v-if="!isCarritoView" class="row q-col-gutter-md">
      <div v-for="producto in productosCategoria" :key="producto.id" class="col-12 col-sm-6 col-md-3">
        <q-card class="product-card column full-height shadow-2">
          <q-img :src="producto.imagen || defaultHotDogImage" height="180px">
            <q-badge v-if="producto.etiqueta" :color="producto.colorEtiqueta" class="absolute-top-right q-ma-sm">
              {{ producto.etiqueta }}
            </q-badge>
          </q-img>

          <q-card-section class="col">
            <div class="text-h6 text-weight-bold">{{ producto.nombre }}</div>
            <div class="text-subtitle1 text-primary text-weight-bold q-mt-xs">
              {{ formatearPrecio(producto.precio) }}
            </div>
            <p class="text-caption text-grey-7 q-mt-sm">{{ producto.descripcion }}</p>
          </q-card-section>

          <q-card-actions class="product-card__actions" />
        </q-card>
      </div>
    </div>

    <q-dialog v-model="dialogoAbierto" persistent>
      <q-card style="min-width: 420px; max-width: 560px; width: 100%">
        <q-card-section>
          <div class="text-h6">
            {{ productoEditando ? 'Editar producto' : 'Agregar producto' }}
          </div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="formulario.nombre" label="Nombre del producto" outlined />
          <q-input v-model.number="formulario.precio" type="number" label="Precio" outlined />
          <q-input v-model="formulario.descripcion" type="textarea" label="Descripción" outlined />
          <q-input v-model="formulario.imagen" label="URL de la imagen" outlined />
          <q-input v-model="formulario.etiqueta" label="Etiqueta" outlined />
          <q-select
            v-model="formulario.colorEtiqueta"
            :options="['orange', 'green', 'red', 'teal', 'blue', 'purple']"
            label="Color de etiqueta"
            outlined
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey" v-close-popup @click="resetFormulario" />
          <q-btn color="orange-8" :label="productoEditando ? 'Guardar cambios' : 'Guardar producto'" @click="guardarProducto" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const props = defineProps({
  categoria: {
    type: String,
    default: 'hamburguesas'
  }
})

const categoriaConfig = {
  hamburguesas: {
    titulo: 'Sección de Hamburguesas',
    descripcion: 'Disfruta de nuestras jugosas hamburguesas artesanales hechas al carbón, con carne 100% de res y pan brioche recién horneado.',
    recomendacion: 'RECOMENDACIÓN DEL CHEF',
    imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200',
    destacado: {
      nombre: 'La Monstruosa BBQ',
      precio: 24000,
      descripcion: 'Doble carne de res, queso cheddar fundido, tocino crujiente, cebolla caramelizada y salsa BBQ artesanal.',
      imagen: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600',
      badge: 'Más pedido'
    }
  },
  perros: {
    titulo: 'Perros Calientes',
    descripcion: 'Perros calientes clásicos y gourmet con salchichas de calidad, salsas caseras y toppings irresistibles.',
    recomendacion: 'EL MÁS PEDIDO',
    imagen: 'https://tse4.mm.bing.net/th/id/OIP.fLP0D5YBcrtGDsej4wRmFwHaE8?r=0&w=1000&h=667&rs=1&pid=ImgDetMain&o=7&rm=3',
    destacado: {
      nombre: 'Hot Dog Supremo',
      precio: 18000,
      descripcion: 'Salchicha gourmet, queso fundido, cebolla caramelizada, salsa BBQ y mostaza de la casa.',
      imagen: 'https://uploads.candelaestereo.com/1/2016/07/k2_items_src_d53c89e6112e06952771c7ecc5b4808a-1200x768.jpg',
      badge: 'Top seller'
    }
  },
  pizzas: {
    titulo: 'Pizzas',
    descripcion: 'Pizzas artesanales horneadas al momento con masa fina, ingredientes frescos y sabores intensos.',
    recomendacion: 'PIZZA DEL DÍA',
    imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200',
    destacado: {
      nombre: 'Pizza Especial',
      precio: 32000,
      descripcion: 'Mozzarella, pepperoni, tomate, albahaca y una base perfectamente crujiente.',
      imagen: 'https://images.unsplash.com/photo-1548365328-9f547fb9587c?w=600',
      badge: 'Nueva'
    }
  },
  bebidas: {
    titulo: 'Bebidas',
    descripcion: 'Refrescos, batidos y bebidas frías para acompañar cada comida con sabor refrescante y energía.',
    recomendacion: 'REFRESCOS FAVORITOS',
    imagen: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=1200',
    destacado: {
      nombre: 'Limonada Natural',
      precio: 7000,
      descripcion: 'Limonada casera con hierbabuena, hielo y un toque dulce natural.',
      imagen: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?auto=format&fit=crop&w=900&q=85',
      badge: 'Frescura'
    }
  },
  postres: {
    titulo: 'Postres',
    descripcion: 'Deliciosos postres con texturas suaves, dulces intensos y presentación irresistible.',
    recomendacion: 'POSTRE DEL CHEF',
    imagen: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200',
    destacado: {
      nombre: 'Cheesecake de Fresa',
      precio: 12000,
      descripcion: 'Cheesecake suave con salsa de fresa, crema batida y trozos de fruta.',
      imagen: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600',
      badge: 'Premium'
    }
  },
  promociones: {
    titulo: 'Promociones',
    descripcion: 'Combos irresistibles y descuentos especiales para disfrutar más sabor a mejor precio.',
    recomendacion: 'PROMO DEL MES',
    imagen: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200',
    destacado: {
      nombre: 'Combo Familiar',
      precio: 42000,
      descripcion: '2 hamburguesas, 2 bebidas y 1 porción de papas para compartir en familia.',
      imagen: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600',
      badge: 'Ahorro'
    }
  },
  carrito: {
    titulo: 'Carrito',
    descripcion: 'Revisa y administra los productos que hayas agregado para comprar más tarde.',
    recomendacion: 'TUS PRODUCTOS',
    imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200',
    destacado: {
      nombre: 'Tus compras',
      precio: 0,
      descripcion: 'Aquí puedes guardar o revisar tu pedido para continuar con la compra.',
      imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
      badge: 'Pedido'
    }
  }
}

const defaultHotDogImage = 'https://tse4.mm.bing.net/th/id/OIP.fLP0D5YBcrtGDsej4wRmFwHaE8?r=0&w=1000&h=667&rs=1&pid=ImgDetMain&o=7&rm=3'
const cartKey = 'sabor-rapido-cart'

const carrito = ref([])
const isCarritoView = computed(() => props.categoria === 'carrito')
const carritoTotal = computed(() =>
  carrito.value.reduce((sum, item) => sum + Number(item.precio) * Number(item.cantidad || 1), 0)
)

const cargarCarrito = () => {
  try {
    const guardado = JSON.parse(localStorage.getItem(cartKey) || '[]')
    carrito.value = Array.isArray(guardado) ? guardado : []
  } catch {
    carrito.value = []
  }
}

onMounted(() => {
  cargarCarrito()
})

watch(carrito, (value) => {
  localStorage.setItem(cartKey, JSON.stringify(value))
}, { deep: true })

const categoriaActual = computed(() => {
  return categoriaConfig[props.categoria] || categoriaConfig.hamburguesas
})

const productos = ref([
  { id: 1, categoria: 'hamburguesas', nombre: 'Clásica con Queso', precio: 16000, descripcion: 'Carne de res 150g, queso mozzarella, lechuga fresca, tomate y salsa de la casa.', imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600', etiqueta: 'Más pedido', colorEtiqueta: 'orange' },
  { id: 2, categoria: 'hamburguesas', nombre: 'Burger Criolla', precio: 19500, descripcion: 'Carne de res, maduritos fritos, queso costeño asado, hogao y lechuga crujiente.', imagen: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600', etiqueta: 'Nuevo', colorEtiqueta: 'green' },
  { id: 3, categoria: 'hamburguesas', nombre: 'Burger Picante Jalapeño', precio: 21000, descripcion: 'Carne de res, jalapeños encurtidos, queso pepper jack, aros de cebolla y aderezo picante.', imagen: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600', etiqueta: 'Picante', colorEtiqueta: 'red' },
  { id: 4, categoria: 'hamburguesas', nombre: 'Veggie Delicia', precio: 18000, descripcion: 'Medallón a base de quinua y frijol negro, aguacate, tomate grillado y germinados.', imagen: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=600', etiqueta: 'Vegetariano', colorEtiqueta: 'teal' },

  { id: 5, categoria: 'perros', nombre: 'Hot Dog Mixto', precio: 12000, descripcion: 'Salchicha premium, pan suave, salsa de tomate, mostaza y cebolla fresca.', imagen: 'https://tse4.mm.bing.net/th/id/OIP.fLP0D5YBcrtGDsej4wRmFwHaE8?r=0&w=1000&h=667&rs=1&pid=ImgDetMain&o=7&rm=3', etiqueta: 'Classic', colorEtiqueta: 'orange' },
  { id: 6, categoria: 'perros', nombre: 'Hot Dog BBQ', precio: 15000, descripcion: 'Salchicha ahumada, queso cheddar, cebolla caramelizada y salsa BBQ artesanal.', imagen: 'https://i.pinimg.com/736x/ae/87/bd/ae87bd8221bed6e81819f497d4fcab8c.jpg', etiqueta: 'Especial', colorEtiqueta: 'red' },
  { id: 7, categoria: 'perros', nombre: 'Hot Dog Veggie', precio: 13000, descripcion: 'Salchicha vegetariana, aguacate, salsa verde y cebollín fresco.', imagen: 'https://images.squarespace-cdn.com/content/v1/5b5f49e68f5130fc92219e1f/1594014749498-FPR367P3HWJ0HXX9HVU3/image-asset.jpeg', etiqueta: 'Veggie', colorEtiqueta: 'green' },
  { id: 8, categoria: 'perros', nombre: 'Hot Dog Supremo', precio: 17000, descripcion: 'Salchicha de pollo, queso fundido, bacon crujiente y salsa ranch.', imagen: 'https://uploads.candelaestereo.com/1/2016/07/k2_items_src_d53c89e6112e06952771c7ecc5b4808a-1200x768.jpg', etiqueta: 'Top', colorEtiqueta: 'purple' },

  { id: 9, categoria: 'pizzas', nombre: 'Pizza Margarita', precio: 28000, descripcion: 'Salsa de tomate, mozzarella, albahaca fresca y aceite de oliva.', imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600', etiqueta: 'Popular', colorEtiqueta: 'green' },
  { id: 10, categoria: 'pizzas', nombre: 'Pizza Pepperoni', precio: 33000, descripcion: 'Mozzarella, pepperoni, tomate y un toque de orégano.', imagen: 'https://tse1.mm.bing.net/th/id/OIP.8H3AsDJT_tqR4UCv-rUFigHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', etiqueta: 'Picante', colorEtiqueta: 'red' },
  { id: 11, categoria: 'pizzas', nombre: 'Pizza Hawaiana', precio: 31000, descripcion: 'Jamón, piña, queso mozzarella y salsa de tomate.', imagen: 'https://th.bing.com/th/id/OIP.LqHhBIpwcoRZKVkBQ4IiKQHaE8?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', etiqueta: 'Familiar', colorEtiqueta: 'blue' },
  { id: 12, categoria: 'pizzas', nombre: 'Pizza Cuatro Quesos', precio: 34000, descripcion: 'Mozzarella, parmesano, gouda y queso azul con base dorada.', imagen: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600', etiqueta: 'Premium', colorEtiqueta: 'orange' },

  { id: 13, categoria: 'bebidas', nombre: 'Gaseosa Personal', precio: 5000, descripcion: 'Refresco frío de 400 ml para acompañar tu comida.', imagen: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600', etiqueta: 'Refresco', colorEtiqueta: 'blue' },
  { id: 14, categoria: 'bebidas', nombre: 'Batido de Chocolate', precio: 9000, descripcion: 'Batido cremoso con cacao, leche y un toque de dulce.', imagen: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600', etiqueta: 'Premium', colorEtiqueta: 'purple' },
  { id: 15, categoria: 'bebidas', nombre: 'Jugo Natural', precio: 7000, descripcion: 'Jugo recién exprimido de naranja o mango.', imagen: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600', etiqueta: 'Natural', colorEtiqueta: 'green' },
  { id: 16, categoria: 'bebidas', nombre: 'Limonada Natural', precio: 7000, descripcion: 'Limonada casera con hierbabuena, hielo y toque dulce natural.', imagen: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?auto=format&fit=crop&w=900&q=85', etiqueta: 'Frescura', colorEtiqueta: 'red' },

  { id: 17, categoria: 'postres', nombre: 'Brownie', precio: 10000, descripcion: 'Brownie de chocolate con nuez y helado de vainilla.', imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600', etiqueta: 'Clásico', colorEtiqueta: 'brown' },
  { id: 18, categoria: 'postres', nombre: 'Muffin de Vainilla', precio: 8000, descripcion: 'Muffin suave con notas de vainilla y azúcar glas.', imagen: 'https://th.bing.com/th/id/OIP.XPNoJbg_nNDthgKcPuhnYQHaE8?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', etiqueta: 'Nuevo', colorEtiqueta: 'orange' },
  { id: 19, categoria: 'postres', nombre: 'Helado Artesanal', precio: 11000, descripcion: 'Helado en copa con cobertura y toppings a elegir.', imagen: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600', etiqueta: 'Helado', colorEtiqueta: 'teal' },
  { id: 20, categoria: 'postres', nombre: 'Cheesecake de Fresa', precio: 12000, descripcion: 'Cheesecake suave con salsa de fresa y crema batida.', imagen: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600', etiqueta: 'Premium', colorEtiqueta: 'pink' },

  { id: 21, categoria: 'promociones', nombre: 'Combo 2x1', precio: 26000, descripcion: 'Dos hamburguesas con papas y una bebida.', imagen: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600', etiqueta: 'Oferta', colorEtiqueta: 'red' },
  { id: 22, categoria: 'promociones', nombre: 'Combo Familiar', precio: 42000, descripcion: '4 hamburguesas, 4 bebidas y porción de alitas.', imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600', etiqueta: 'Familiar', colorEtiqueta: 'orange' },
  { id: 23, categoria: 'promociones', nombre: 'Pizza + Bebida', precio: 35000, descripcion: 'Pizza mediana con una bebida y papas a elección.', imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600', etiqueta: 'Combo', colorEtiqueta: 'green' }
])

const dialogoAbierto = ref(false)
const productoEditando = ref(null)
const formulario = ref({
  nombre: '',
  precio: 0,
  descripcion: '',
  imagen: defaultHotDogImage,
  etiqueta: '',
  colorEtiqueta: 'orange'
})

const productosCategoria = computed(() =>
  productos.value.filter((producto) => producto.categoria === props.categoria)
)

const formatearPrecio = (valor) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(valor)

const tiempoEstimadoPorCategoria = {
  hamburguesas: 15,
  perros: 12,
  pizzas: 20,
  bebidas: 5,
  postres: 10,
  promociones: 18,
  carrito: 7
}

const agregarAlCarrito = (producto) => {
  const minutos = tiempoEstimadoPorCategoria[producto.categoria] ?? 10
  const itemExistente = carrito.value.find((item) => item.id === producto.id)

  if (itemExistente) {
    itemExistente.cantidad += 1
  } else {
    carrito.value.push({ ...producto, cantidad: 1 })
  }

  $q.notify({
    type: 'positive',
    message: `${producto.nombre} añadido al carrito. Tu pedido estará listo en aproximadamente ${minutos} minutos.`,
    position: 'top-right',
    timeout: 2500,
    actions: [{ label: 'Cerrar', color: 'white' }]
  })
}

const eliminarDelCarrito = (item) => {
  carrito.value = carrito.value.filter((producto) => producto.id !== item.id || producto.categoria !== item.categoria)

  $q.notify({
    type: 'info',
    message: `${item.nombre} eliminado del carrito.`,
    position: 'top-right',
    timeout: 1800
  })
}

const resetFormulario = () => {
  productoEditando.value = null
  formulario.value = {
    nombre: '',
    precio: 0,
    descripcion: '',
    imagen: defaultHotDogImage,
    etiqueta: '',
    colorEtiqueta: 'orange'
  }
}

const abrirDialog = () => {
  resetFormulario()
  dialogoAbierto.value = true
}

const editarProducto = (producto) => {
  productoEditando.value = producto.id
  formulario.value = { ...producto }
  dialogoAbierto.value = true
}

const guardarProducto = () => {
  if (!formulario.value.nombre || !formulario.value.descripcion) return

  const productoData = {
    ...formulario.value,
    categoria: props.categoria,
    precio: Number(formulario.value.precio) || 0
  }

  if (productoEditando.value) {
    productos.value = productos.value.map((producto) =>
      producto.id === productoEditando.value ? { ...producto, ...productoData } : producto
    )
  } else {
    productos.value.push({
      ...productoData,
      id: Date.now()
    })
  }

  resetFormulario()
  dialogoAbierto.value = false
}

const eliminarProducto = (id) => {
  productos.value = productos.value.filter((producto) => producto.id !== id)
}
</script>
