# 🚀 Automatización Web E2E con Playwright & TypeScript

> **CS5383 - Pruebas y Verificación de Software (UTEC)**  
> **Tema:** Automatización de Pruebas de Sistema con Playwright  
> **Patrones Implementados:** Page Object Model (POM), Custom Fixtures y Test Data Builder  
> **Innovación:** Motor de Auto-Curación (Self-Healing) y Pruebas con Lenguaje Natural asistidas por Inteligencia Artificial  
> **Integrantes:** Cesar y Yoselyn (Grupo 1)

---

## 📋 Tabla de Contenidos
1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Arquitectura y Patrones de Diseño](#arquitectura-y-patrones-de-diseño)
3. [Capacidad de Inteligencia Artificial (Mostrada en Vivo)](#capacidad-de-inteligencia-artificial-mostrada-en-vivo)
4. [Estructura del Repositorio](#estructura-del-repositorio)
5. [Requisitos Previos e Instalación](#requisitos-previos-e-instalación)
6. [Guía de Ejecución de Pruebas](#guía-de-ejecución-de-pruebas)
7. [Visualización de Reportes y Trazas (Trace Viewer)](#visualización-de-reportes-y-trazas-trace-viewer)
8. [Hallazgos, Limitaciones y Conclusiones](#hallazgos-limitaciones-y-conclusiones)

---

## 📌 Descripción del Proyecto

Este proyecto implementa una suite de automatización de pruebas End-to-End (E2E) a nivel de sistema para una aplicación web interactiva de comercio electrónico (`SauceDemo / Swag Labs`), siguiendo rigurosamente los estándares del syllabus **ISTQB CTFL v4.0.1** y las recomendaciones del W3C para accesibilidad y automatización de navegadores.

El flujo automatizado principal (*Happy Path*) cubre:
1. **Autenticación** segura de usuario.
2. **Exploración de catálogo** y adición de múltiples ítems al carrito.
3. **Verificación de estado y persistencia** en la vista de carrito.
4. **Checkout Paso 1:** ingreso parametrizado de datos de facturación/envío.
5. **Checkout Paso 2:** verificación del resumen financiero (subtotal, impuestos y total).
6. **Confirmación y Oráculo de Prueba:** validación del mensaje de éxito (*"Thank you for your order!"*) y cierre de orden.

---

## 🏛️ Arquitectura y Patrones de Diseño

Para evitar la fragilidad (*flakiness*) y garantizar la mantenibilidad a largo plazo de la suite, se aplicaron tres patrones de diseño de pruebas:

### 1. Page Object Model (POM)
- Cada pantalla o componente web está encapsulado en su propia clase dentro de `src/pages/`:
  - `BasePage.ts`: Clase base con funciones comunes de navegación, carga y capturas de evidencia.
  - `LoginPage.ts`: Encapsula campos de usuario, contraseña, botón de envío y mensajes de validación.
  - `InventoryPage.ts`: Catálogo de productos, filtros de ordenamiento y badge del carrito.
  - `CartPage.ts`: Lista de ítems en carrito y navegación al checkout.
  - `CheckoutPage.ts`: Formulario de comprador, resumen de totales y pantalla final de orden completada.
- **Principio clave:** Los archivos de prueba (`.spec.ts`) describen **QUÉ** hace el usuario y **QUÉ** se verifica, mientras que las clases POM contienen el **CÓMO** se interactúa con el DOM.

### 2. Custom Fixtures Pattern (`test.extend`)
- Implementado en `src/fixtures/testFixtures.ts`.
- Reemplaza la inicialización manual (`new LoginPage(page)`) con inyección de dependencias tipada.
- Proporciona aislamiento estricto: cada caso de prueba recibe un contexto de navegador (`BrowserContext`) completamente limpio y descartado al terminar.

### 3. Test Data Builder Pattern
- Implementado en `src/data/testData.ts` con la clase `CustomerBuilder`.
- Genera datos válidos por defecto (`firstName`, `lastName`, `postalCode`) y permite sobreescribir únicamente los campos necesarios para cada escenario particular.

---

## 🤖 Capacidad de Inteligencia Artificial (Mostrada en Vivo)

Ubicación: `src/ai/AiHealer.ts` y test `tests/ai-capability-demo.spec.ts`.

### Problema que resuelve:
Uno de los mayores costos de automatización en la industria es el mantenimiento de localizadores rotos cuando los desarrolladores frontend cambian IDs, nombres de clases o la estructura del DOM.

### Solución demostrada:
1. **AI Self-Healing Locators (Auto-Curación en Tiempo de Ejecución):**
   - Cuando un localizador primario falla o es deprecado (ej. `#submit_auth_old_button_v1_deprecated`), el motor de IA intercepta la excepción en lugar de abortar la prueba.
   - Analiza el árbol semántico y de accesibilidad del DOM en tiempo real, evaluando roles accesibles, etiquetas y proximidad.
   - Identifica el elemento real con un puntaje de confianza (ej. `98.0%`), ejecuta la acción sin interrupción y emite una recomendación para actualizar el Page Object.
2. **AI Prompt-Driven Testing (Acciones por Lenguaje Natural):**
   - Permite enviar instrucciones en lenguaje natural como `"Agregar al carrito el producto Sauce Labs Backpack"`.
   - El motor traduce la intención semántica en una interacción precisa sobre el elemento correspondiente.

---

## 📂 Estructura del Repositorio

```text
playwright-demo/
├── package.json                   # Dependencias y scripts de ejecución
├── tsconfig.json                  # Configuración de TypeScript
├── playwright.config.ts           # Configuración de Playwright (reporter, traces, timeouts)
├── README.md                      # Documentación completa del proyecto
├── src/
│   ├── ai/
│   │   └── AiHealer.ts            # Motor de IA: Self-Healing y Prompt-Driven Testing
│   ├── data/
│   │   └── testData.ts            # Test Data & Patrón Test Data Builder
│   ├── fixtures/
│   │   └── testFixtures.ts        # Extensión de fixtures tipadas (POM Injection)
│   └── pages/
│       ├── BasePage.ts            # Clase base abstracta
│       ├── LoginPage.ts           # Page Object de Autenticación
│       ├── InventoryPage.ts       # Page Object de Catálogo
│       ├── CartPage.ts            # Page Object de Carrito
│       └── CheckoutPage.ts        # Page Object de Checkout y Confirmación
└── tests/
    ├── e2e-happy-path.spec.ts     # Flujo Happy Path completo E2E
    ├── ai-capability-demo.spec.ts # Demostración en vivo de la capacidad de IA
    └── e2e-validation-errors.spec.ts # Casos negativos y validaciones de borde
```

---

## ⚙️ Requisitos Previos e Instalación

### Requisitos:
- **Node.js:** v18.0.0 o superior (recomendado v20+ o v24+)
- **NPM:** v9.0.0 o superior

### Pasos de Instalación:
```bash
# 1. Navegar a la carpeta del proyecto
cd playwright-demo

# 2. Instalar dependencias del proyecto
npm install

# 3. Instalar los binarios de los navegadores de Playwright
npx playwright install chromium
```

---

## 🏃 Guía de Ejecución de Pruebas

### 1. Ejecutar toda la suite en modo headless (por consola)
```bash
npm test
```

### 2. Ejecutar la Demo en modo visual con ventana de navegador abierta (Headed)
Ideal para la presentación en vivo:
```bash
npm run test:headed
```

### 3. Ejecutar únicamente el Flujo Happy Path con navegador visible
```bash
npm run test:happy
```

### 4. Ejecutar la Demostración en Vivo de Inteligencia Artificial (Self-Healing)
Muestra en la consola la detección del selector roto, el cálculo de confianza y la auto-curación:
```bash
npm run test:ai
```

### 5. Abrir el modo interactivo Playwright UI Mode
Permite inspección visual en tiempo real, time-travel, consola y red:
```bash
npm run test:ui
```

### 6. Ejecutar el grabador de código (Codegen)
```bash
npm run codegen
```

---

## 📊 Visualización de Reportes y Trazas (Trace Viewer)

Playwright genera automáticamente un reporte HTML interactivo tras cada ejecución:

```bash
npm run test:report
```

Para inspeccionar una traza paso a paso de una ejecución con fallos o grabada:
```bash
npx playwright show-trace test-results/<nombre-carpeta>/trace.zip
```
El Trace Viewer permite:
- Navegar hacia adelante y hacia atrás en el tiempo (Time-travel DOM).
- Ver peticiones HTTP de red y respuestas del servidor.
- Revisar salidas de la consola del navegador.
- Inspeccionar el DOM exacto en el instante de cada acción.

---

## 🔍 Hallazgos, Limitaciones y Cuándo NO usar Playwright

### Dificultades Encontradas:
1. **Asincronía estricta (`async/await`):** Toda interacción con Playwright es asíncrona; omitir un `await` provoca errores difíciles de depurar.
2. **Strict Mode:** Playwright falla intencionalmente si un localizador devuelve más de un elemento coincidente. Esto exige diseñar selectores precisos y semánticos.

### Limitaciones:
1. **Dispositivos móviles reales:** Playwright emula viewports y user-agents móviles en Chromium/WebKit, pero no ejecuta sobre teléfonos físicos nativos con iOS o Android.
2. **Requiere código:** No es una solución No-Code/Codeless para personal sin conocimientos de programación.
3. **Navegadores legados:** No ofrece soporte para Internet Explorer 11 ni versiones obsoletas.

### ¿Cuándo NO usar Playwright?:
- Para pruebas en aplicaciones móviles nativas (.apk / .ipa) instaladas en dispositivos físicos $\rightarrow$ usar **Appium**.
- Para equipos que exigen flujos de trabajo 100% gráficos o sin código $\rightarrow$ usar **Katalon Studio** o **Tricentis Tosca**.
- Para pruebas de lógica pura de backend sin interfaz $\rightarrow$ usar pruebas unitarias o de API (Jest, Supertest, pytest, Schemathesis).
