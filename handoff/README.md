# LingoHive · handoff factual para ramita.dev

## Versión pública final

- URL: https://lingo-hive.vercel.app/
- Repositorio: https://github.com/ramiro-gp/LingoHive
- Commit de código y contenido de la demo publicada: `0609a18a39eef7a2a43a4b1e36615a68534462bc` (`main`).
- Capturas reales de producción: [desktop](./lingohive-desktop.png) (1440 × 900) y [mobile](./lingohive-mobile.png) (390 × 844). Se capturaron desde `https://lingo-hive.vercel.app/` con el deployment de `main` correspondiente al commit de código indicado.
- Estado: demo pública histórica de un proyecto freelance real. LingoHive ya no está en actividad.
- La demo mantiene la marca y una muestra representativa del sitio original. Precios y testimonios son históricos; no hay oferta vigente ni reserva.
- Diseño e identidad visual: **Juan Galache de Toro**. Desarrollo web: **Ramiro Garcia**.
- Búsqueda final en fuentes y salida compilada: no quedan Calendly, WhatsApp, el email del negocio, sus redes, `ramirogp.me` ni referencias comerciales a `lingohive.fun`. El crédito de Ramiro enlaza a https://ramita.dev.

## Stack y superficie publicada

- Astro 5.18.2, salida estática, npm y Node 24.
- React 19 en islas; Tailwind CSS 4; GSAP 3; Three.js 0.178; Swiper 12.1.2.
- Poppins v24 se sirve desde `public/fonts` bajo SIL Open Font License; se quitó la hoja de Google Fonts.
- El deployment contiene HTML/CSS/JS y assets estáticos. No hay formularios, backend, uploads, analytics, endpoint de optimización de imágenes ni funciones de servidor.
- SEO: `noindex,follow`, rastreo permitido, canonical y Open Graph con el dominio de producción.
- `npm ci` y `npm run build` pasan. El build emite `/index.html` y `/404.html`; no genera la antigua `/index_coming.html`.

## QA y rendimiento

- Producción: Home 200; favicon 200; `/404.html` 200; una ruta inexistente 404; `/index_coming.html` 404.
- Anchos revisados: 320, 390, 768, 1366 y 1440 px, sin overflow horizontal del documento.
- Pasaron menú táctil y Escape, anclajes, selector de precios táctil con estado `aria-pressed`, slider táctil y controles desktop, foco visible, `prefers-reduced-motion`, Home/precios/testimonios sin JavaScript, fallback `starfield.jpg` sin WebGL y consola sin errores.
- Las imágenes de testimonios, citas, perfiles de LinkedIn y logos de terceros se mantienen con la autorización vigente confirmada por el propietario.

### Lighthouse mobile antes y después

Tres mediciones comparables de Lighthouse 13.5.0 contra producción, en emulación Moto G Power (2022), viewport 412 × 823, 150 ms RTT y CPU ×4. Valores medianos:

| Métrica | Antes | Después | Cambio |
|---|---:|---:|---:|
| LCP | 3,884 ms | 2,274 ms | −1,610 ms |
| FCP | 2,958 ms | 1,599 ms | −1,359 ms |
| Retraso de render del LCP | 2,125 ms | 188 ms | −1,937 ms |
| CLS | 0 | 0.0028 | +0.0028 |
| TBT | 34 ms | 0 ms | −34 ms |
| Solicitudes | 35 | 33 | −2 |

El LCP fue el H1 `LingoHive` (`section#home > div.relative > div.flex > h1.text-6xl`), no una imagen. El TTFB de la fase LCP quedó en 139 ms antes y 134 ms después. Antes, el documento esperaba la hoja de Google Fonts, que Lighthouse estimó en unos 782 ms, y se pedían fuentes a otro origen. El retraso del título y FCP fueron las partes dominantes; TBT fue bajo y el hilo principal/Three.js no fue el cuello de botella del LCP. Se autoalojaron las mismas fuentes Poppins, se precargó el peso 900 y se difirió el selector de precios fuera de pantalla con `client:visible`. No se modificó el diseño del Hero ni se quitó el Starfield.

El CLS mediano posterior fue 0.0028 (redondeado a 0.00 por Lighthouse); sigue siendo bajo. Lighthouse simula CPU/red y presenta variación entre corridas: LCP después fue 2,269–2,816 ms. La mejora observada es consistente en las tres muestras frente a 3,557–4,173 ms antes.

## npm audit y riesgo residual

El lockfile de referencia previo tenía 18 hallazgos de paquetes: 2 bajos, 2 moderados, 12 altos y 2 críticos. El lockfile final tiene 3 filas de paquetes afectadas: 1 baja, 1 alta y 1 crítica. Se actualizaron Astro dentro del rango Astro 5, tar a 7.5.22 y paquetes transitivos compatibles; no se cambió `package.json` ni se hizo una migración mayor.

| Paquete del inventario inicial | Severidad inicial | Superficie/categoría | Estado en lockfile final |
|---|---:|---|---|
| `@babel/core` | baja | tooling de build, transitiva | corregido |
| `astro` | crítica | dependencia directa; build y funciones Astro que no se publican en esta salida estática | residual crítica; 5.18.2 |
| `browserslist` | alta | tooling/transitiva | corregido |
| `defu` | alta | tooling/transitiva de Astro | corregido |
| `devalue` | alta | serialización SSR de Astro, no publicada | corregido |
| `diff` | baja | tooling/transitiva | corregido |
| `fflate` | moderada | tooling/transitiva | corregido |
| `h3` | alta | servidor/SSR de Astro, no desplegado | corregido |
| `js-yaml` | alta | tooling/transitiva | corregido |
| `mdast-util-to-hast` | moderada | compilación Markdown de Astro | corregido |
| `nanoid` | alta | tooling/transitiva | corregido |
| `picomatch` | alta | tooling/transitiva | corregido |
| `postcss` | alta | tooling de CSS | corregido |
| `rollup` | alta | tooling de build | corregido |
| `sharp` | alta | procesamiento de imágenes durante build | residual alta; 0.34.5 |
| `smol-toml` | alta | parser de configuración en tooling | corregido |
| `tar` | crítica | extracción de dependencias durante instalación/build | corregido; 7.5.22 |
| `vite` | alta | build/dev server, no expuesto en producción | corregido |

La auditoría final también identifica `esbuild` 0.27.7 como baja, dependencia transitiva bajo Astro; no formaba parte de las 18 filas de referencia. Los tres hallazgos finales son de build/tooling: ninguno llega al bundle del navegador ni a un proceso público de servidor.

### Los dos críticos del inventario inicial

- **Astro — [GHSA-26w7-cxv4-gfx2](https://github.com/withastro/astro/security/advisories/GHSA-26w7-cxv4-gfx2).** Afecta Astro `<7.2.8`; el lockfile usa Astro 5.18.2. La superficie es la optimización AVIF del servicio Sharp por defecto. Requiere que Astro procese un AVIF no confiable. Esta demo no recibe archivos ni datos de usuarios, no tiene backend y la salida pública no contiene el servicio ni el endpoint de imagen; por eso no es una ruta explotable desde el sitio publicado. El parche está en Astro 7.2.8 y requiere Sharp 0.35.4; npm propone Astro 7.3.5, fuera del major Astro 5. No existe una actualización compatible Astro 5 que elimine este advisory. Se registra como riesgo residual de build si en el futuro se procesa AVIF no confiable.
- **tar — [GHSA-23hp-3jrh-7fpw](https://github.com/isaacs/node-tar/security/advisories/GHSA-23hp-3jrh-7fpw).** El inventario inicial usaba tar 7.4.3; el rango afectado es `<=7.5.18`, con parche desde 7.5.19. Se actualizó sin salir de tar 7.x a 7.5.22. Es tooling de instalación/build y no se sirve ni procesa archivos TAR enviados por visitantes.

El `sharp` residual agrupa avisos de libvips/libheif y sigue en el tooling de imágenes; npm requiere el rango Sharp 0.35.x y actualmente propone mover Astro a 7.3.5. No se forzó un override incompatible con Astro 5.18.2. No hay imágenes AVIF ni carga/optimización de imágenes públicas en el build. El residual debe revisarse si se cambia la ruta de assets, se aceptan uploads o se migra Astro.

## Datos para el caso en ramita.dev

### ES

LingoHive fue un proyecto freelance real de desarrollo web para una academia de inglés. Esta demo conserva el diseño y contenido representativo del sitio original. La academia ya no está en actividad; los precios y testimonios son históricos. Ramiro Garcia desarrolló el sitio web. Juan Galache de Toro realizó el diseño y la identidad visual.

### EN

LingoHive was a real freelance web development project for an English learning business. This demo preserves the original site's representative design and content. The business is no longer active; prices and testimonials are historical. Ramiro Garcia developed the website. Juan Galache de Toro created the design and visual identity.

### PT

LingoHive foi um projeto freelance real de desenvolvimento web para uma escola de inglês. Esta demo preserva o design e o conteúdo representativo do site original. A escola não está mais em atividade; os preços e depoimentos são históricos. Ramiro Garcia desenvolveu o site. Juan Galache de Toro criou o design e a identidade visual.

### FR

LingoHive était un projet freelance réel de développement web pour une école d'anglais. Cette démo conserve le design et le contenu représentatif du site d'origine. L'école n'est plus en activité ; les prix et les témoignages sont historiques. Ramiro Garcia a développé le site. Juan Galache de Toro a créé le design et l'identité visuelle.

### JA

LingoHive は英語学習事業のために制作した実際のフリーランスのウェブ開発案件です。このデモには、元のサイトを代表するデザインとコンテンツを残しています。事業は現在活動しておらず、料金と利用者の声は当時のものです。ウェブサイトの開発は Ramiro Garcia、デザインとビジュアルアイデンティティは Juan Galache de Toro が担当しました。

## Notas de integración

- Presentarlo como proyecto histórico, no como cliente actual ni una oferta vigente.
- Mantener la atribución a Juan Galache de Toro y Ramiro Garcia.
- Los precios y los testimonios se pueden presentar sólo como material del proyecto original; existe autorización vigente para el contenido visual y las citas incluidas aquí.
- La demo está marcada `noindex,follow` y su metadata usa el dominio de producción temporal; al integrar el caso en ramita.dev, usar la canonical del portfolio y conservar el carácter histórico.
- No hay integración de contacto, formulario, backend, analytics ni variables de entorno.
