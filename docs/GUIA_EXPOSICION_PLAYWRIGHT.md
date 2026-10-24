# ⏱️ Guía de Exposición de 10 Minutos: Playwright (TypeScript)

> **Curso:** CS5383 - Pruebas y Verificación de Software (UTEC)  
> **Tema:** Automatización de Pruebas de Sistema con Playwright  
> **Integrantes (Grupo 1):** Cesar y Yoselyn  
> **Tiempo Límite Estricto:** **10 Minutos** (6 min presentación + 3 min demo en vivo + 1 min cierre/preguntas)  
> **Plataformas Soportadas:** Windows y Linux (Cross-platform)

---

## 📌 1. ¿Están los patrones usados en la PPT del curso?

**¡SÍ, TOTALMENTE!** Están explícitamente detallados en el material del curso:
- **Diapositiva 38 (Pauta de Laboratorio):**
  > *"Cada grupo recibirá por sorteo una herramienta y automatizará un flujo happy path de su módulo en Qolqe usando un patrón **(S25)**."*
- **Diapositiva 25 (`S25` - Los cuatro patrones principales):**
  1. **Page Object:** *"Una clase por pantalla (o componente) con lo que el usuario puede hacer y ver"*.
  2. **Fixture:** *"El framework prepara antes y limpia después (Familia xUnit; pytest, Playwright)"*.
  3. **Test Data Builder:** *"Datos válidos por defecto; la prueba cambia solo lo que necesita"*.
  4. **Screenplay:** *"Actores que realizan tareas y hacen preguntas"*.
- **Diapositiva 27 (Criterio de Elección del Profesor):**
  > *"Regla práctica: empezar simple (**Page Object + fixtures**) y escalar solo cuando duela."*

En nuestro proyecto implementamos exactamente la regla recomendada por el docente: **Page Object Model (POM)** combinado con **Custom Fixtures** y **Test Data Builder**.

---

## 🕒 2. Cronograma de Exposición Minuto a Minuto (Total: 10 min)

```text
[00:00 - 00:30] Diapositiva 1: Portada y presentación del equipo
[00:30 - 01:45] Diapositiva 2: Qué es Playwright, problemas que resuelve y evolución
[01:45 - 02:45] Diapositiva 3: Arquitectura interna y componentes clave
[02:45 - 03:45] Diapositiva 4: Patrones de diseño de pruebas (POM + Fixtures - S25)
[03:45 - 04:45] Diapositiva 5: Capacidad de IA aplicada (Self-Healing y Prompts)
[04:45 - 07:45] Diapositiva 6: DEMOSTRACIÓN EN VIVO (Flujo Happy Path + Demo de IA)
[07:45 - 08:40] Diapositiva 7: Hallazgos y dificultades técnicas
[08:40 - 09:30] Diapositiva 8: Limitaciones, cuándo NO usarla y matriz comparativa
[09:30 - 10:00] Diapositiva 9: Conclusiones finales y bibliografía
```

---

## 🗣️ 3. Guion de Diapositivas (Qué decir en cada una)

### Diapositiva 1: Portada (30 seg)
> *"Buenos días profesor y compañeros. Somos el Grupo 1, conformado por Cesar y Yoselyn. Hoy presentaremos la automatización de pruebas de sistema con Playwright en TypeScript, implementando los patrones Page Object Model y Fixtures exigidos en la diapositiva 25 de la clase, y demostraremos en vivo la integración de capacidades de Inteligencia Artificial para auto-curación de pruebas."*

### Diapositiva 2: ¿Qué es Playwright, qué resuelve y evolución? (1 min 15 seg)
> *"Playwright es un framework moderno creado por Microsoft en 2020 por los autores de Puppeteer. Nace para solucionar los tres grandes dolores de Selenium: el flakiness (pruebas inestables), la lentitud de inicio de sesiones y las diferencias entre navegadores. A diferencia de Selenium, Playwright soporta Chromium, Firefox y WebKit con un solo API y sin drivers externos desalineados. Ha evolucionado desde su versión inicial hasta convertirse en el estándar de la industria, integrando hoy herramientas como Trace Viewer, UI Mode y agentes autónomos basados en IA."*

### Diapositiva 3: Arquitectura y Componentes Clave (1 min)
> *"A nivel arquitectónico, Playwright se comunica con el navegador mediante una conexión WebSocket persistente y bidireccional sobre CDP (Chrome DevTools Protocol), logrando latencias de apenas un milisegundo en lugar del HTTP REST de WebDriver. Su jerarquía se compone de Browser, BrowserContext y Page. Un BrowserContext es equivalente a una ventana de incógnito: se crea en solo 10 a 20 milisegundos, permitiendo aislar pruebas por completo sin sobrecargar la memoria RAM. Además, cuenta con Auto-Waiting nativo: antes de cualquier clic, verifica automáticamente que el elemento sea visible, estable, habilitado y que reciba eventos."*

### Diapositiva 4: Patrón de Diseño Obligatorio: POM + Fixtures (1 min)
> *"Siguiendo la exigencia de la diapositiva 25 y la recomendación de la diapositiva 27 de la clase, implementamos Page Object Model junto con Fixtures. El patrón POM separa el QUÉ se prueba (la lógica en el archivo .spec.ts) del CÓMO se interactúa con el HTML (encapsulado en clases de página como LoginPage, InventoryPage, CartPage y CheckoutPage). Si un selector cambia en la aplicación, solo modificamos una línea de código en la clase correspondiente. Lo complementamos con las Fixtures de Playwright (test.extend) para inyectar automáticamente páginas limpias en cada prueba y con Test Data Builder para generar datos de cliente parametrizados."*

### Diapositiva 5: Capacidad de IA Aplicada a Playwright (1 min)
> *"El mayor costo en la automatización tradicional es el mantenimiento de localizadores rotos cuando los desarrolladores frontend cambian clases o IDs. Para resolver esto, hemos integrado una capacidad de IA: Self-Healing Locators. Cuando un selector falla, nuestro motor AiHealer intercepta la excepción, analiza el árbol de accesibilidad del DOM y deduce semánticamente el nuevo elemento en tiempo real, evitando que la suite falle. Además, soporta Prompt-Driven Testing, permitiendo ejecutar pasos mediante lenguaje natural como 'agregar el producto al carrito'."*

### Diapositiva 6: DEMOSTRACIÓN EN VIVO (3 min)
*(Aquí minimizan la presentación y abren la terminal para correr los scripts)*:

1. **Ejecutar el Flujo Happy Path:**
   - En Windows: `npm run test:happy` (o doble clic a `ejecutar-demo-en-vivo.bat`)
   - En Linux: `./ejecutar-demo-en-vivo.sh`
   > *"Observen cómo Playwright levanta Chromium en milisegundos. Ejecuta el inicio de sesión, navega al catálogo, agrega dos ítems al carrito, valida la cantidad, llena los datos de envío usando el Builder y comprueba el oráculo final de cálculo financiero y el mensaje 'Thank you for your order!'. Todo el flujo corre sin un solo sleep()."*

2. **Ejecutar la Demo de IA (Self-Healing):**
   - Comando: `npm run test:ai`
   > *"Ahora simulamos un caso real: un selector de login roto (`#submit_auth_old_button_v1_deprecated`). En una suite convencional, el test fallaría tras un timeout de 30 segundos. Con nuestro motor de IA, observen en la consola cómo la IA analiza el DOM, identifica el botón real [data-test='login-button'] con un 98% de confianza y la prueba termina en VERDE exitosamente."*

3. **Mostrar el Trace Viewer / UI Mode (si queda tiempo):**
   - Comando: `npm run test:ui`

### Diapositiva 7: Hallazgos y Dificultades Técnicas (55 seg)
> *"Entre los hallazgos principales encontramos: primero, el rigor asíncrono; omitir un 'await' genera condiciones de carrera silenciosas, por lo que usamos tipado estricto en TypeScript. Segundo, el Strict Mode de Playwright: si un selector coincide con más de un elemento, lanza error de inmediato para evitar falsos positivos, obligándonos a usar selectores accesibles como getByRole. Tercero, la sincronización de popups con Promise.all. Y cuarto, aseguramos la portabilidad en Linux detectando si hay entorno gráfico o ejecutando en headless en servidores."*

### Diapositiva 8: Limitaciones, ¿Cuándo NO usarla? y Comparativa (50 seg)
> *"Es vital reconocer las limitaciones: Playwright no ejecuta pruebas en smartphones físicos nativos (para apps .apk o .ipa se debe usar Appium). Tampoco es una herramienta No-Code para equipos sin conocimientos de programación (donde convendría Katalon o Tosca). En la comparativa, Playwright supera a Selenium en velocidad y esperas automáticas, y a Cypress en soporte real de múltiples pestañas y protocolos nativos."*

### Diapositiva 9: Conclusiones y Cierre (30 seg)
> *"En conclusión: el uso de Page Object Model con Fixtures garantiza una suite mantenible y desacoplada del DOM; el Auto-waiting erradica las pruebas frágiles; y la IA representa el siguiente salto evolutivo reduciendo el costo de mantenimiento ante refactorizaciones de interfaz. Cumplimos con los estándares de prueba de sistema de ISTQB CTFL v4.0.1. Muchas gracias, quedamos atentos a sus preguntas."*

---

## 🐧 4. Guía de Ejecución en Linux / macOS / WSL

El proyecto es **100% multiplataforma**. Para correrlo en Linux:

### Paso 1: Clonar o copiar la carpeta y dar permisos de ejecución
```bash
cd Semana_11_lab
chmod +x ejecutar-demo-en-vivo.sh
chmod +x playwright-demo/run-demo.sh
```

### Paso 2: Ejecutar la demo completa
```bash
./ejecutar-demo-en-vivo.sh
```
*El script detecta automáticamente si estás en un Linux con escritorio gráfico (Gnome, KDE, XFCE) para abrir la ventana con `--headed`, o si estás en una terminal de servidor / WSL sin display para ejecutar en modo `headless` sin errores.*

### Paso 3: Comandos npm directos en Linux
```bash
cd playwright-demo

# Flujo Happy Path
npm run test:happy

# Demostración de IA (Self-Healing)
npm run test:ai

# En servidores o entornos sin pantalla gráfica:
npm run test:happy:headless
npm run test:ai:headless

# Si estás en Ubuntu/Debian y necesitas dependencias del sistema:
npm run install:linux-deps
```
