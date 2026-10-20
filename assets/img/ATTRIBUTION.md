# Джерела зображень

## Значки магазинів (офіційні, не змінювати)

Завантажено 17.10.2026 з дозволу власника.

| Файл | Джерело |
|---|---|
| `badges/gp-<мова>.png` | `https://play.google.com/intl/en_us/badges/static/images/badges/<код>_badge_web_generic.png` (коди: en, ua→uk, de, es, fr) |
| `badges/ms-<мова>-{dark,light}.svg` | `https://get.microsoft.com/images/<код>%20{dark,light}.svg` (коди: en-us, uk, de, es, fr) |

Правила Google Play (partnermarketinghub.withgoogle.com → Google Play → Lockups, icons & badges):
- висота значка ≥ 28 px; вільне поле ≥ ¼ висоти (у PNG воно вже вбудоване);
- значок Google Play — такого ж розміру або більший за значки інших магазинів;
- локалізований значок мовою сторінки; не змінювати кольори, елементи, пропорції;
- однотонне тло з достатнім контрастом.
- Рядок у підвалі: «Google Play and the Google Play logo are trademarks of Google LLC.»

Правила Microsoft Store (github.com/microsoft/app-store-badge, developer.microsoft.com/microsoft-store/badges):
- тема `dark` на світлому тлі, `light` на темному; не змінювати; посилання на сторінку програми в Store.

Apple App Store: значок не використовується, доки програма не опублікована.

## Скріншоти й іконка

З репозиторію програми (лише читання), через `tools/prepare_images.py`:
- `shots/<мова>/*` — `store_listing/app_store_screenshots_run5/app_store_screenshots/6.9/<мова>/{01,03,07,09}.png`;
- `watch/<мова>-dial-*` — `android/store_assets/screenshots_wear/<мова>_1_dial.png`;
- `icon-*`, `og-512.jpg`, `favicon.ico`, `apple-touch-icon.png` — `ios/TimeForLife/Resources/Assets.xcassets/AppIcon.appiconset/AppIcon.png` (1024×1024; логотип «рука з кишеньковим годинником», рішення власника 18.10.2026).
