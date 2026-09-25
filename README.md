# LingoHive · demo histórica

Esta es una demo pública de un sitio desarrollado para LingoHive. La academia ya no está en actividad. Los precios, la propuesta de clases y los testimonios se conservan como registro del proyecto original y no son una oferta vigente.

**Desarrollo web:** Ramiro Garcia · [ramita.dev](https://ramita.dev)
**Diseño e identidad visual:** Juan Galache de Toro

Las fotografías, citas, perfiles y logos de los testimonios originales se publican con autorización vigente. La demo no contiene reservas, contactos comerciales, formularios, backend ni analytics.

## Stack

Astro 5 con salida estática, React en islas, Tailwind CSS 4, GSAP, Three.js y Swiper. La tipografía Poppins se carga desde Google Fonts.

## Desarrollo local

Se usa Node 24.x y npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

El build genera `dist/`. `vercel.json` fija Astro, instalación `npm ci`, build `npm run build` y salida `dist`; `package.json` declara Node 24.x. No se usa adapter. La URL canónica y las tarjetas sociales se generan a partir de `VERCEL_PROJECT_PRODUCTION_URL`, que Vercel debe exponer en el entorno de build. En local, sin esa variable, se omiten las URLs absolutas.

La demo usa `noindex,follow` y no genera sitemap. La ruta pública es `/`, con página `404.html`.
