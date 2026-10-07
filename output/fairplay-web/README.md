# FAIR PLAY · experiencia web

Sitio en español basado en los wireframes y la identidad de FAIR PLAY. Fondo Noche `#051014`, Salvia `#708D81`, Papel `#FCFCFC`; Playfair Display y Arial.

## Ejecutar

```powershell
npm ci
npm run dev
```

Vite usa http://127.0.0.1:4180. Para servir la versión compilada: `npm run build`, luego `npm run preview`. La carpeta `dist/` se puede publicar en un host estático; no abrir el HTML por `file://`.

## Hero y recorrido

La celebración ocupa la pantalla completa desde el primer encuadre; el acercamiento conserva la copa en imagen. En móvil, los textos aparecen en la parte inferior para dejarla visible. La cabecera vectorial THE TIMES ocupa el 94% del ancho del diario con su escudo central y proporción original.

El hero alterna dos retratos alineados de un futbolista mediante una máscara orgánica que sigue el cursor. La segunda foto muestra un político anónimo con rostro gris desenfocado, una mano sobre la boca y otra sobre el hombro. Hay botón alternativo y soporte de movimiento reducido.

Tras 5 segundos sin interacción, una demostración revela la segunda foto con un único tajo diagonal inspirado en el gesto de Fruit Ninja: un trazo rápido de abajo a la izquierda hacia arriba a la derecha, con extremos afinados, una breve apertura y cierre gradual. Dura 2,8 segundos y descansa 10 segundos antes de repetirse. El mouse o el toque la interrumpen inmediatamente; el botón de cambio, la pestaña oculta y salir del hero la suspenden. No se ejecuta con movimiento reducido. Comparte el ticker y el renderer existentes. Se retiraron las frases «La gloria se ve», «La presión no» y las dos etiquetas numeradas del hero.

El título FAIR PLAY se desvanece al salir del hero. El recorrido sigue este orden: portada, recorrido continuo de acercamiento al equipo, información, evento con pasaporte y recompensas, About Us y tickets. Lenis y GSAP comparten un único ticker.

El pasaporte abre con el scroll, sin botón de apertura. Conserva su experiencia 3D: flotación, giro limitado con mouse o teclado, apertura, tres sellos, cierre y salida. Su modelo es `public/models/pasaporte.glb`. Las recompensas están dentro de la misma escena fija: al cerrarse el pasaporte, su imagen y textos dan paso a la colección fotográfica.

Los sellos aparecen automáticamente al avanzar por las zonas con el scroll, sin un sellador visible. Cada impresión genera una pequeña presión y un rebote del pasaporte que termina en 600 ms aunque se detenga el scroll. Los sellos quedan adheridos a las páginas durante el cierre y siguen presentes al reabrir. Al retroceder por las zonas se deshacen en orden 3 → 2 → 1, con la animación de impresión invertida y un desvanecimiento de la tinta. Al avanzar se vuelven a imprimir. La zona 2 se divide en dos mitades que acompañan sus respectivas páginas. Movimiento reducido muestra las zonas completas sin impactos.

La impresión interior se dibuja como una única composición en `src/passport-artwork.js` y se divide exactamente por la mitad para las páginas del GLB. Los títulos y círculos comparten la misma altura; las superficies impresas llegan hasta el pliegue para que la zona 2 no pierda texto. Los sellos toman sus posiciones de esa misma composición. La tapa conserva la fotografía original.

## Sección informativa

El recorrido usa **una sola fotografía continua** del mismo equipo sosteniendo un trofeo circular, con una W grabada en el frente. El scroll desplaza y acerca esa única imagen; no hay cambio de toma ni estela. Los dos textos aparecen por líneas con una máscara vertical y un desvanecimiento suave, debajo de las caras y de la copa. En escritorio, el primero queda abajo a la izquierda y la pregunta abajo a la derecha; en móvil ambos quedan abajo a la izquierda. El estado depende solo del scroll y se invierte al retroceder.

La inscripción se registra en coordenadas de la fotografía: centro (790, 131), tamaño 80 × 62 px. Una versión SVG de esa misma W acompaña exactamente la proyección de la cámara para conservar la nitidez de la letra. El fondo pierde foco al acercarse al plato. El mural se pinta sobre la imagen, la W forma «SportWashing», el título se centra y después se desplaza a la izquierda en color Noche `#051014`. La explicación aparece de manera escalonada. En móvil queda debajo del título. Al retroceder se invierte el acercamiento inicial; `#contexto` apunta a la definición.

El activo `public/artwork/victory-team-plate.webp` mide 1672 × 941 px y pesa 346556 bytes. Es una fotografía raster, no una imagen vectorizada ni un video con movimiento independiente de los jugadores. Solo la inscripción y el título son vectoriales. Se generó editando la escena con Imagegen integrado; original y prompt completo: `design/victory-video/team-plate-continuous.png` y `continuous-plate-prompt.txt`. El manifiesto registra una sola fuente. `scripts/prepare_continuous_plate.py` codifica el original a WebP sin modificar su composición.

`src/victory-image.js` carga la imagen y coordina el estado; `src/victory-state.js` calcula la cámara compartida por foto y letra; `src/sportswashing-transition.js` proyecta la inscripción, revela el mural y organiza título y texto. Todo usa el ticker de GSAP/Lenis existente. Movimiento reducido o una carga fallida dejan el contenido estático. Los MP4 y generadores anteriores quedan como material de trabajo; ya no se cargan en la página. El equipo 3D descartado está archivado en `blender/retired-models/`; el pasaporte mantiene Three.js.

## Diario: SportWashing, noticias e invitación a FAIR PLAY

Después de la definición, la misma composición original de SportWashing —mural, título a la izquierda y explicación a la derecha— se aleja hasta revelar la cabecera vectorial THE TIMES con su escudo. No se sustituye por un resumen ni una foto diferente. Esa sección es la noticia principal de una hoja vertical con tres columnas, una franja salvia y catorce notas decorativas permanentemente borrosas. F1 ocupa la derecha, Six Kings Slam la izquierda y Argentina 1978 el centro más abajo. Cada caso conserva su foto documental cuadrada, texto breve, créditos y fuentes. Six Kings Slam se identifica como exhibición.

El header contiene el logo a la izquierda y un icono de hamburguesa a la derecha, sin texto ni caja visibles. El área de interacción mide 40 × 40 px y el icono mide 18 × 14 px; despliega una lista de 154 px con Inicio, Recorrido, SportWashing, El evento, Recompensas, Nosotros y Tickets. Se cierra al elegir una sección, pulsar Escape o tocar afuera. El espacio restante permanece transparente, sin barra sobre toda la pantalla. `src/site-menu.js` y `src/site-menu.css` implementan el menú sobre un elemento details nativo. `src/reading.css` define los controles flotantes y el foco periférico; el estado de la mirada se calcula en `magazineLayout`.

La hoja ocupa el 94% del ancho disponible, hasta 1180 px, para evitar miniaturizar las noticias. El scroll vertical mueve un círculo de lectura entre las columnas y acompaña la altura de la noticia; no hay desplazamiento horizontal del diario. Una máscara radial circular deja nítido el interior y aplica blur de 8 px al exterior. Los textos principales son de 16 px en escritorio y 12 px en móvil, con fotos de 112 y 72 px respectivamente. El círculo termina en una noticia sobre FAIR PLAY en Club Arquitectura: volanta, titular informativo, bajada, firma del equipo, cuerpo breve en tercera persona y foto lateral del pasaporte. La nota no incluye botones ni enlaces de reserva. Referencias periodísticas: `design/news-gallery/editorial-structure.md`. Censura ya no tiene una noticia independiente. El diario se acerca a la imagen del pasaporte entre las distancias 19.3 y 21.5, y la funde con el mismo modelo 3D entre 21.5 y 22.8. El texto queda a la izquierda y la foto a la derecha. La imagen se obtiene una sola vez del renderer existente, con fondo transparente; su encuadre se mide y alinea con el canvas, sin un segundo renderer. Si no está disponible, la noticia conserva su imagen estática y su lectura. Se retiró la leyenda de fecha y horario a confirmar. El diario da paso directamente al evento con el pasaporte; se retiró la sección «Otra forma de entrar al juego». Todo comparte el ticker existente y 23 alturas de desplazamiento; `#contexto` apunta a la definición original. El recorrido se invierte con el scroll.

`src/news-gallery-state.js` calcula la hoja, el alejamiento continuo y la trayectoria circular. `src/news-gallery.js` mantiene la sección original dentro de `.magazine-world`, sin desvanecimiento ni reemplazo al entrar al diario. `src/newspaper-portrait.css` define el tamaño legible, las fotos cuadradas y la máscara circular. Solo los enlaces de la noticia enfocada quedan disponibles. Movimiento reducido y la alternativa sin JavaScript conservan la explicación original, los casos y la invitación en una secuencia estática, ocultando la decoración.

Las fotografías documentales suman 194788 bytes; se guardan en `public/artwork/news/`. Originales, procedencia, dimensiones y situación de derechos: `design/news-gallery/manifest.json`. Las fotos editoriales conservan los derechos de sus titulares; el manifiesto no afirma que sean imágenes de licencia abierta. Fuentes: Amnistía Internacional y FIA para la F1; Tennis.com y Diario AS para el Six Kings Slam; Archivo Nacional de la Memoria y DGCyE para el Mundial de 1978. `scripts/fetch_news_photos.py` permite recodificar las fuentes archivadas o recuperarlas cuando faltan.

## Colección fotográfica

Seis productos: camiseta, tote, gorra, pulsera, pin y stickers. Cada uno tiene dos fotografías generadas con Imagegen integrado: producto individual de estudio y persona utilizándolo. Los diseños toman como referencia `public/artwork/merchandising-sin-frase.png`.

El hover revela la foto en uso con un desvanecimiento de 550 ms. Al retirar el mouse vuelve el producto. En móvil se alterna tocando la foto; con teclado se puede enfocar y usar Enter o espacio. Las imágenes respetan movimiento reducido. La camiseta se entrega al completar el recorrido; los otros objetos pertenecen a la colección de la marca.

- Imágenes web: `public/artwork/products/*-{product,lifestyle}.webp`.
- Originales PNG y prompts completos: `design/product-photography/`.
- Interacción: `src/collection.js`.
- Recorrido: `src/event-story.js` coordina pasaporte, transición y seis productos. Las seis tarjetas permanecen visibles en el abanico; el scroll lleva cada una desde su lugar al centro y al frente, y la devuelve al abanico cuando avanza la siguiente. Tienen marco de papel, giro desde el borde inferior, leve desenfoque lateral y orden de profundidad. No se incluye una mano. `src/collection-fan.js` calcula el abanico; `src/interaction-refinements.css` define la presentación. Al detenerse, se selecciona el producto más cercano.
- Flechas, teclado, rueda horizontal y gesto horizontal táctil permiten recorrer los productos. Retroceder vuelve por la colección hasta reabrir el pasaporte. El enlace `#recompensas` apunta al primer producto dentro de la escena.
- Las fotos y sus textos se ajustan al espacio disponible en escritorio y móvil. Movimiento reducido o falta de WebGL usan un pasaporte estático seguido de una fila con scroll horizontal nativo.
- Los doce WebP son de 900 × 1200 px y suman aproximadamente 1.08 MiB.
- `blender/prepare_product_photos.py` permite volver a codificar los originales con Python + Pillow.

No se cargan modelos 3D de productos en la colección. Los modelos anteriores quedan como archivos de trabajo locales en `blender/retired-models/`.

## Entradas

El flujo de selección, revisión y QR es una demostración local, sin servidor, pagos ni envío de datos. Las fechas y los cupos son ejemplos. El QR indica `validForAdmission:false` y no contiene nombre, correo ni datos de accesibilidad. Para reservas reales hay que conectar un servicio y reemplazar los datos de `src/booking-model.js`.

## Verificación

`npm test` comprueba la transición tras el cierre, las posiciones de los seis productos, el foco según distancia, proyección y sellos del pasaporte, límites de giro, capacidad y validación de reservas, privacidad del QR, GLB activo y las doce fotos vinculadas en el HTML. `npm run build` genera la versión de producción.

Las capturas de la colección están en `evidence/collection-*.jpg`. Las fotos usan carga diferida y se prepara la alternativa cuando la tarjeta se acerca al viewport. El renderer del pasaporte se pausa cuando queda fuera de pantalla, se oculta la pestaña o se abre la reserva.
