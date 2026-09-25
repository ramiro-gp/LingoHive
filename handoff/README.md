# LingoHive · paquete factual para ramita.dev

- URL pública: https://lingo-hive.vercel.app/
- Repositorio: https://github.com/ramiro-gp/LingoHive
- Commit exacto desplegado: `ba7ffb4711929dfc03b019dcf938b3c47dfbd80d`
- Capturas de producción: [desktop](./lingohive-desktop.png) (1440 × 900) y [mobile](./lingohive-mobile.png) (390 × 844).
- Estado: demo histórica de un proyecto freelance real. LingoHive ya no está en actividad.
- Autorías: desarrollo web, Ramiro Garcia; diseño e identidad visual, Juan Galache de Toro.
- Stack verificado: Astro 5 (salida estática), React 19 en islas, Tailwind CSS 4, GSAP 3, Three.js 0.178 y Swiper 12.1.2. Fuente Poppins desde Google Fonts.
- Contenido preservado: marca, propuesta original, precios históricos y seis testimonios. El usuario confirmó autorización vigente para las fotografías, citas, perfiles de LinkedIn y logos de terceros.
- La demo no ofrece reservas ni contactos del negocio. No usa formularios, backend ni analytics. Tiene `noindex,follow`.
- QA de producción: Home 200, favicon 200, `/index_coming.html` 404; canonical y Open Graph apuntan al dominio estable. Se comprobaron 320, 390, 768, 1366 y 1440 px sin overflow horizontal, menú mobile con teclado, selector de precios, slider y contenido sin JavaScript.
- Lighthouse mobile (una medición): LCP 4,2 s, CLS 0, 35 requests, ~1,50 MB transferidos. Los resultados de rendimiento pueden variar por dispositivo y red.

## Dependencias y riesgo residual

`npm audit` sigue informando 18 avisos: 2 bajos, 2 moderados, 12 altos y 2 críticos. El aviso crítico directo de Swiper se resolvió al subir a 12.1.2. Los avisos restantes afectan principalmente a Astro y dependencias de build/desarrollo (por ejemplo Vite, Sharp y tar). La demo publicada es estática: no ejecuta servidor Astro, no procesa uploads ni AVIF de terceros y no expone el endpoint de optimización de imágenes. Esta clasificación reduce la exposición en producción, pero no elimina los avisos del árbol de dependencias. Conviene reevaluarlos antes de añadir contenido dinámico o entradas no confiables.

## Datos para el caso · ES

LingoHive fue un proyecto freelance real de desarrollo web para una academia de inglés. Esta demo conserva el diseño y contenido representativo del sitio original. La academia ya no está en actividad; los precios y testimonios son históricos. Ramiro Garcia desarrolló el sitio web. Juan Galache de Toro realizó el diseño y la identidad visual.

## Case facts · EN

LingoHive was a real freelance web development project for an English learning business. This demo preserves the original site's representative design and content. The business is no longer active; prices and testimonials are historical. Ramiro Garcia developed the website. Juan Galache de Toro created the design and visual identity.

## Dados do projeto · PT

LingoHive foi um projeto freelance real de desenvolvimento web para uma escola de inglês. Esta demo preserva o design e o conteúdo representativo do site original. A escola não está mais em atividade; os preços e depoimentos são históricos. Ramiro Garcia desenvolveu o site. Juan Galache de Toro criou o design e a identidade visual.

## Faits du projet · FR

LingoHive était un projet freelance réel de développement web pour une école d'anglais. Cette démo conserve le design et le contenu représentatif du site d'origine. L'école n'est plus en activité ; les prix et les témoignages sont historiques. Ramiro Garcia a développé le site. Juan Galache de Toro a créé le design et l'identité visuelle.

## プロジェクト情報 · JA

LingoHive は英語学習事業のために制作した実際のフリーランスのウェブ開発案件です。このデモには、元のサイトを代表するデザインとコンテンツを残しています。事業は現在活動しておらず、料金と利用者の声は当時のものです。ウェブサイトの開発は Ramiro Garcia、デザインとビジュアルアイデンティティは Juan Galache de Toro が担当しました。
