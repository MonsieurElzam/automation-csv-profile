# automation-csv-profile

**Profil de CSV** — Types, taux de vides, valeurs distinctes et clés possibles de chaque colonne : le premier réflexe avant tout nettoyage de données.

> **EN** — *CSV profiler.* Types, empty rates, distinct values and candidate keys for every column — the first reflex before any data cleanup.

Node.js 18+, **aucune dépendance**, licence **MIT**. Aucune donnée n'est envoyée nulle part. Les messages affichés sont en français.

## Utilisation

```bash
node src/csv-profile.mjs clients.csv
```

Des fichiers d'exemple sont fournis dans `samples/`.

Aide intégrée (`--help`) :

```text
Usage : node src/csv-profile.mjs fichier.csv [--json]
Affiche, pour chaque colonne : type, vides, valeurs distinctes, exemples.
```

## Tests

```bash
npm test
```

## Limites

- Les exemples de `samples/` sont fictifs ; adaptez les en-têtes de colonnes à vos propres exports.
- Essayez d'abord sur une copie de vos données.
- Fourni tel quel, sans garantie (voir `LICENSE`).

## La série

Ce script fait partie d'une série de **scripts d'automatisation libres** (public : qualité de données, entre autres) : [présentation, guides et archive complète](https://monsieurelzam.com/scripts) · [tous les dépôts](https://github.com/MonsieurElzam?tab=repositories&q=automation-).

---

Par [Elzam MAMAH](https://monsieurelzam.com) — business analyst, optimisation de processus. Licence MIT.
