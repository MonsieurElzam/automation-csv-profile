#!/usr/bin/env node
/* Profil de qualité d'un CSV : types, taux de vides, valeurs distinctes, exemples. */
import { readFileSync } from 'node:fs'
import { parseCsv, toNumber, toDate } from '../lib/csv.mjs'
import { isMain, parseArgs, usage } from '../lib/cli.mjs'

export function profile(text) {
  const { headers, records } = parseCsv(text)
  const columns = headers.map((name) => {
    const values = records.map((r) => r[name].trim())
    const filled = values.filter((v) => v !== '')
    const distinct = new Set(filled)
    const numeric = filled.filter((v) => !Number.isNaN(toNumber(v))).length
    const dates = filled.filter((v) => toDate(v)).length
    let type = 'texte'
    if (filled.length) {
      if (numeric === filled.length) type = 'nombre'
      else if (dates === filled.length) type = 'date'
    }
    return {
      colonne: name,
      type,
      vides: values.length - filled.length,
      tauxVides: values.length ? Math.round(((values.length - filled.length) / values.length) * 1000) / 10 : 0,
      distincts: distinct.size,
      unique: filled.length > 0 && distinct.size === filled.length,
      exemples: [...distinct].slice(0, 3),
    }
  })
  return { lignes: records.length, colonnes: columns }
}

if (isMain(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2), ['help', 'json'])
  usage(`
Usage : node src/csv-profile.mjs fichier.csv [--json]
Affiche, pour chaque colonne : type, vides, valeurs distinctes, exemples.`, args, 1)
  const result = profile(readFileSync(args._[0], 'utf8'))
  if (args.json) console.log(JSON.stringify(result, null, 2))
  else {
    console.log(`${result.lignes} lignes, ${result.colonnes.length} colonnes\n`)
    console.table(result.colonnes.map((c) => ({
      colonne: c.colonne, type: c.type, 'vides %': c.tauxVides, distincts: c.distincts,
      'clé possible': c.unique ? 'oui' : '', exemples: c.exemples.join(' | '),
    })))
  }
}
