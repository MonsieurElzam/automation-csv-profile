import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, mkdtempSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { parseCsv, toDate } from '../lib/csv.mjs'

const sample = (n) => readFileSync(new URL(`../samples/${n}`, import.meta.url), 'utf8')
const mod = (n) => import(`../src/${n}.mjs`)

test('01 profil : types, vides et clé possible', async () => {
  const { profile } = await mod('csv-profile')
  const p = profile(sample('clients.csv'))
  assert.equal(p.lignes, 5)
  const email = p.colonnes.find((c) => c.colonne === 'email')
  assert.equal(email.vides, 1)
  assert.equal(p.colonnes.find((c) => c.colonne === 'ville').vides, 1)
})
