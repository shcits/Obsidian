# Validación · 5 de octubre de 2026

- `npm run build`: compilación de producción correcta. Vite mantiene una advertencia de tamaño por el bundle de Three.js del pasaporte.
- `npm test`: 8/8 pruebas aprobadas. Se verifican proyección y sellos del pasaporte, giro limitado, reservas, privacidad del QR, GLB activo y las doce fotografías referenciadas.
- Seis productos con dos fotos cada uno. Los doce WebP son válidos, diferentes entre producto y uso, de 900 × 1200 px y menos de 200 KB cada uno.
- Fotos generadas con Imagegen integrado; originales y prompts guardados en `design/product-photography/`.
- La colección usa HTML, imágenes y CSS. El runtime sólo solicita el GLB del pasaporte; los seis GLB de productos fueron retirados de `public/models/`.
- Hover verificado en escritorio; las fotos alternativas de camiseta, tote, gorra, pulsera, pin y stickers cargan y se muestran correctamente.
- Vista móvil 390 × 844 comprobada, grilla de una columna y sin desborde horizontal. La activación vuelve a la imagen del producto y permite mostrar otra vez la foto en uso.
- Las etiquetas accesibles y el texto alternativo cambian según la imagen visible. El foco es visible y hay alternativa de teclado.
- Movimiento reducido elimina la transición de las fotos mediante CSS. No se modificaron preferencias del sistema ni se afirma haber probado un teléfono físico.
- Consola del navegador sin errores ni advertencias en la revisión de la colección.

## Evidencias locales

`evidence/collection-products-desktop.jpg`, `evidence/collection-hover-desktop.jpg` y `evidence/collection-mobile.jpg` documentan la versión fotográfica. Las capturas anteriores con productos 3D pertenecen a una iteración retirada.
