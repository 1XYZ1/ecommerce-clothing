# eCommerce Clothing - Tienda de Ropa Online

Una tienda de ropa online moderna y responsiva desarrollada con HTML5, JavaScript vanilla y Tailwind CSS. El proyecto implementa un sistema completo de ecommerce con carrito de compras, catálogo de productos y proceso de checkout.

## 🛍️ Características Principales

- **Catálogo de Productos**: Visualización completa de productos con filtros por categoría y género
- **Carrito de Compras**: Sistema funcional de carrito con LocalStorage persistente
- **Responsive Design**: Diseño adaptativo para dispositivos móviles y desktop
- **Interfaz Moderna**: UI/UX implementada con Tailwind CSS
- **Navegación Intuitiva**: Sistema de navegación fluido entre páginas
- **Datos Dinámicos**: Productos cargados desde archivo JSON

## 🏗️ Estructura del Proyecto

```
ecommerce-clothing/
├── index.html              # Página principal con productos destacados
├── pages/
│   ├── catalogo.html      # Catálogo completo de productos
│   ├── carrito.html       # Página del carrito de compras
│   ├── checkout.html      # Proceso de finalización de compra
│   └── producto.html      # Vista detallada de producto individual
├── assets/
│   ├── css/               # Archivos de estilos (si los hay)
│   ├── img/               # Imágenes de productos y recursos
│   └── js/
│       ├── app.js         # Lógica principal de la aplicación
│       └── carrito.js     # Funcionalidad del carrito de compras
├── data/
│   └── productos.json     # Base de datos de productos en JSON
└── README.md              # Documentación del proyecto
```

## 📋 Descripción de Archivos

### Páginas HTML

- **`index.html`**: Página de inicio con hero section, productos destacados y características de la tienda
- **`pages/catalogo.html`**: Catálogo completo con todos los productos disponibles
- **`pages/carrito.html`**: Gestión del carrito de compras con opciones para modificar cantidades
- **`pages/checkout.html`**: Proceso de finalización de compra y datos de envío
- **`pages/producto.html`**: Vista detallada individual de cada producto

### JavaScript

- **`assets/js/app.js`**:

  - Inicialización de la aplicación
  - Manejo de eventos de botones
  - Integración con el sistema de carrito

- **`assets/js/carrito.js`**:
  - Funciones de gestión del carrito (agregar, quitar, actualizar)
  - Persistencia de datos en LocalStorage
  - Cálculo de totales y cantidades

### Datos

- **`data/productos.json`**: Base de datos de productos con información completa:
  - ID único y slug para URLs amigables
  - Nombre, descripción y precio
  - Stock disponible y categorización
  - Tallas, colores y género objetivo
  - Productos destacados y imágenes

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **Tailwind CSS**: Framework CSS utility-first para estilos modernos y responsivos
- **JavaScript Vanilla**: Lógica del cliente sin dependencias externas
- **LocalStorage**: Persistencia de datos del carrito en el navegador
- **JSON**: Almacenamiento estructurado de datos de productos

## 🚀 Instrucciones de Configuración

### Instalación y Ejecución

1. **Clonar el repositorio**:

   ```bash
   git clone <url-del-repositorio>
   cd ecommerce-clothing
   ```

2. **Ejecutar localmente**:

   - **Opción 1**: Abrir `index.html` directamente en el navegador
   - **Opción 2**: Usar un servidor HTTP local:

     ```bash
     # Con Python 3
     python -m http.server 8000

     # Con Node.js (live-server)
     npx live-server

     # Con VS Code Live Preview
     #
     ```

## 📱 Funcionalidades

### Sistema de Productos

- **15 productos** organizados en múltiples categorías
- Información completa: precios, stock, tallas, colores
- Clasificación por género: hombre, mujer, unisex
- Productos destacados en página principal

### Carrito de Compras

- Agregar/quitar productos
- Modificar cantidades
- Persistencia entre sesiones (LocalStorage)
- Cálculo automático de totales
- Contador visual en navegación

### Diseño Responsivo

- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: Adaptación automática a tablets y desktop
- **Componentes**: Cards de productos, navegación hamburguesa, grids adaptativos

## 🛠️ Desarrollo y Personalización

### Agregar Nuevos Productos

1. Editar `data/productos.json`
2. Agregar nueva entrada con estructura:
   ```json
   {
     "id": "16",
     "slug": "nuevo-producto",
     "nombre": "Nuevo Producto",
     "descripcion": "Descripción del producto",
     "precio": 29.99,
     "stock": 10,
     "genero": "unisex",
     "categoria": "nueva-categoria",
     "imagen": "assets/img/nuevo-producto.jpg",
     "tallas": ["S", "M", "L"],
     "colores": ["color1", "color2"],
     "destacado": false
   }
   ```

### Modificar Estilos

- El proyecto usa **Tailwind CSS** via CDN
- Para personalización avanzada, configurar Tailwind localmente
- Estilos personalizados en archivos CSS dentro de `assets/css/`

### Extender Funcionalidad

- Agregar nuevas páginas en directorio `pages/`
- Implementar funciones adicionales en `assets/js/`
- Integrar con APIs externas para pagos o inventario

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
