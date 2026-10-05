# FAIR PLAY · experiencia web

Sitio en español basado en los wireframes y la identidad de FAIR PLAY. Fondo Noche `#051014`, Salvia `#708D81`, Papel `#FCFCFC`; Playfair Display y Arial.

## Ejecutar

```powershell
npm ci
npm run dev
```

Vite usa http://127.0.0.1:4180. Para servir la versión compilada: `npm run build`, luego `npm run preview`. La carpeta `dist/` se puede publicar en un host estático; no abrir el HTML por `file://`.

## Hero y recorrido

El hero alterna dos retratos alineados de un futbolista mediante una máscara orgánica que sigue el cursor. La segunda foto muestra un político anónimo con rostro gris desenfocado, una mano sobre la boca y otra sobre el hombro. Hay botón alternativo y soporte de movimiento reducido.

El mismo título FAIR PLAY aparece con un desvanecimiento y se desplaza con el scroll hasta convertirse en el título de About Us. Lenis y GSAP comparten un único ticker.

El pasaporte conserva su experiencia 3D: flotación, giro limitado con mouse o teclado, apertura, tres sellos, cierre y salida. Sólo se carga `public/models/pasaporte.glb`. Las recompensas se presentan en una sección HTML independiente después del recorrido.

## Colección fotográfica

Seis productos: camiseta, tote, gorra, pulsera, pin y stickers. Cada uno tiene dos fotografías generadas con Imagegen integrado: producto individual de estudio y persona utilizándolo. Los diseños toman como referencia `public/artwork/merchandising-sin-frase.png`.

El hover revela la foto en uso con un desvanecimiento de 550 ms. Al retirar el mouse vuelve el producto. En móvil se alterna tocando la foto; con teclado se puede enfocar y usar Enter o espacio. Las imágenes respetan movimiento reducido. La camiseta se entrega al completar el recorrido; los otros objetos pertenecen a la colección de la marca.

- Imágenes web: `public/artwork/products/*-{product,lifestyle}.webp`.
- Originales PNG y prompts completos: `design/product-photography/`.
- Interacción: `src/collection.js`.
- Grilla: tres columnas en escritorio, dos en tablet y una en móvil.
- Los doce WebP son de 900 × 1200 px y suman aproximadamente 1.08 MiB.
- `blender/prepare_product_photos.py` permite volver a codificar los originales con Python + Pillow.

No se cargan modelos 3D de productos en la colección. Los modelos anteriores quedan como archivos de trabajo locales en `blender/retired-models/`.

## Entradas

El flujo de selección, revisión y QR es una demostración local, sin servidor, pagos ni envío de datos. Las fechas y los cupos son ejemplos. El QR indica `validForAdmission:false` y no contiene nombre, correo ni datos de accesibilidad. Para reservas reales hay que conectar un servicio y reemplazar los datos de `src/booking-model.js`.

## Verificación

`npm test` comprueba proyección y sellos del pasaporte, límites de giro, capacidad y validación de reservas, privacidad del QR, GLB activo y las doce fotos vinculadas en el HTML. `npm run build` genera la versión de producción.

Las capturas de la colección están en `evidence/collection-*.jpg`. Las fotos usan carga diferida y se prepara la alternativa cuando la tarjeta se acerca al viewport. El renderer del pasaporte se pausa cuando queda fuera de pantalla, se oculta la pestaña o se abre la reserva.
