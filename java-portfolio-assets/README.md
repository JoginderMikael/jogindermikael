# MK.DEV Java Portfolio Asset Pack

Development assets recreated from the approved portfolio mockup.

## Raster assets

- `images/hero-portrait.png` — hero portrait; intended for a dark framed card
- `images/patient-dashboard.png` — patient-management project preview
- `images/ride-dashboard.png` — ride-hailing project preview
- `reference/portfolio-mockup.png` — complete approved mockup

## Editable SVG assets

- `vectors/logo.svg` — MK.DEV wordmark
- `vectors/architecture-diagram.svg` — API Gateway / services / Kafka / data stores
- `vectors/background-grid.svg` — repeatable hero background texture
- `vectors/icons.svg` — SVG symbol sprite

Use a sprite icon in HTML:

```html
<svg aria-hidden="true"><use href="/assets/vectors/icons.svg#icon-code"></use></svg>
```

## Design tokens

Import `styles/tokens.css` for the mockup colors, radii, shadows, and type stacks.

The tech brand marks (Java, Spring, PostgreSQL, Kafka, Docker and AWS) are intentionally not redrawn. Use their official SVGs or a maintained icon package such as Simple Icons/Devicon and follow each brand's usage rules.

