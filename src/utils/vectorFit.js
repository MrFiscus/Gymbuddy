const VECTOR_FIT_LIBRARY_URL = 'https://vectorfitexercises.com/exercise-animations'
const VECTOR_FIT_CDN_ROOT = 'https://vfe-protector.vectorfitexercises.workers.dev'

const muscleBuckets = {
  chest: ['CHEST'],
  back: ['BACK'],
  shoulders: ['SHOULDERS'],
  biceps: ['ARMS'],
  triceps: ['ARMS'],
  forearms: ['ARMS'],
  abs: ['ABS'],
  quads: ['LEGS'],
  hamstrings: ['LEGS'],
  glutes: ['LEGS'],
  calves: ['LEGS'],
  traps: ['SHOULDERS', 'BACK'],
}

const equipmentBuckets = {
  Barbell: ['Barbell'],
  Dumbbells: ['Dumbbell'],
  Dumbbell: ['Dumbbell'],
  Cable: ['Cable'],
  Machine: ['Machine', 'Lever'],
  Bodyweight: ['Bodyweight'],
  'EZ Bar': ['Barbell'],
  'Jump Rope': ['Bodyweight'],
  'Weight Plate': ['Barbell'],
  'Ab Wheel': ['Bodyweight'],
  'Stability Ball': ['Bodyweight'],
}

const aliasMap = {
  'barbell-bench-press': ['barbell bench press front view', 'barbell bench press side view'],
  'incline-dumbbell-press': ['dumbbell incline bench press'],
  'dumbbell-fly': ['dumbbell chest fly', 'dumbbell incline fly'],
  'machine-chest-press': ['lever chest press', 'machine chest press'],
  'cable-crossover': ['cable chest fly', 'cable crossover'],
  'pull-up': ['regular grip pull up', 'wide grip pull up'],
  'lat-pulldown': ['lat pulldown', 'lever pulldown', 'close grip pulldown'],
  'barbell-row': ['barbell bent over row side view', 'barbell bent over row'],
  'seated-cable-row': ['seated cable row', 'seated row'],
  'single-arm-dumbbell-row': ['dumbbell bench one arm row'],
  'straight-arm-pulldown': ['straight arm pulldown', 'cable pullover'],
  'seated-dumbbell-press': ['dumbbell seated shoulders press'],
  'barbell-overhead-press': ['barbell standing shoulders press'],
  'rear-delt-fly': ['dumbbell bent over rear delt row'],
  'arnold-press': ['dumbbell seated shoulders press'],
  'standing-barbell-curl': ['barbell bicep curl'],
  'preacher-curl': ['barbell preacher curl'],
  'incline-dumbbell-curl': ['dumbbell incline bicep curl'],
  'cable-curl': ['cable bicep curl'],
  'close-grip-bench-press': ['barbell close grip bench press', 'barbell bench press narrow grip'],
  'tricep-pushdown': ['cable tricep pushdown'],
  'overhead-tricep-extension': ['dumbbell standing overhead triceps extension'],
  skullcrusher: ['barbell lying triceps extension'],
  'bench-dip': ['bench dip'],
  'rope-tricep-extension': ['cable rope tricep pushdown'],
  'wrist-curl': ['barbell seated palms up wrist curl'],
  'reverse-wrist-curl': ['barbell seated palms down wrist curl'],
  'reverse-curl': ['barbell reverse grip bicep curl'],
  'farmer-walk': ['farmer walk', 'farmer carry'],
  'plate-pinch': ['plate pinch'],
  'towel-pull-up': ['pull up'],
  plank: ['plank', 'diagonal plank'],
  'leg-press': ['leg press'],
  'walking-lunge': ['dumbbell forward lunge'],
  'leg-extension': ['leg extension'],
  'lying-leg-curl': ['lying leg curl'],
  'glute-ham-raise': ['glute ham raise', 'glute ham developer'],
  'stability-ball-leg-curl': ['stability ball leg curl'],
  'cable-kickback': ['cable kickback', 'cable glute kickback'],
  'frog-pump': ['frog pump', 'glute bridge'],
  'standing-calf-raise': ['standing calf raise'],
  'seated-calf-raise': ['seated calf raise'],
  'donkey-calf-raise': ['donkey calf raise'],
  'leg-press-calf-raise': ['leg press calf raise'],
  'jump-rope': ['jump rope'],
  'barbell-shrug': ['barbell shrug'],
  'dumbbell-shrug': ['dumbbell shrug'],
  'face-pull': ['cable face pull'],
  'high-pull': ['barbell high pull'],
  'rack-pull': ['barbell rack pull'],
  'farmer-carry': ['farmer carry', 'farmer walk'],
}

const tokenReplacements = [
  ['push-up', 'push up'],
  ['pull-up', 'pull up'],
  ['sit-up', 'sit up'],
  ['step-up', 'step up'],
  ['one arm', 'single arm'],
  ['single arm', 'one arm'],
  ['tricep', 'triceps'],
  ['bicep', 'biceps'],
  ['shoulders', 'shoulder'],
  ['abs', 'ab'],
]

let manifestPromise
let animationIndexPromise
const resultCache = new Map()

function normalize(value) {
  let output = value.toLowerCase()
  tokenReplacements.forEach(([from, to]) => {
    output = output.replaceAll(from, to)
  })
  output = output.replaceAll('&', ' and ')
  output = output.replace(/\([^)]*\)/g, ' ')
  output = output.replace(/[^a-z0-9]+/g, ' ')
  output = output.replace(/\b(exercise|men|women|var|view|regular|grip)\b/g, ' ')
  output = output.replace(/\s+/g, ' ').trim()
  return output
}

function getManifest() {
  if (!manifestPromise) {
    manifestPromise = fetch(`${VECTOR_FIT_CDN_ROOT}/manifest.json`).then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to load VectorFit manifest (${response.status})`)
      }
      return response.json()
    })
  }

  return manifestPromise
}

function getAnimationIndex() {
  if (!animationIndexPromise) {
    animationIndexPromise = getManifest().then((manifest) => {
      const entries = []
      Object.entries(manifest).forEach(([variation, equipmentMap]) => {
        Object.entries(equipmentMap).forEach(([equipment, muscleMap]) => {
          Object.entries(muscleMap).forEach(([muscle, files]) => {
            files.forEach((file) => {
              entries.push({
                variation,
                equipment,
                muscle,
                file,
                title: file.replace('.json', '').replace(/\s+Exercise\s+(Men|Women)$/i, ''),
                normalized: normalize(file),
                url: `${VECTOR_FIT_CDN_ROOT}/${variation}/${equipment}/${muscle}/${encodeURIComponent(file)}`,
              })
            })
          })
        })
      })
      return entries
    })
  }

  return animationIndexPromise
}

function scoreCandidate(exercise, candidate, queries) {
  let score = 0
  const normalizedName = normalize(exercise.name)
  const nameTokens = new Set(normalizedName.split(' ').filter(Boolean))
  const fileTokens = new Set(candidate.normalized.split(' ').filter(Boolean))
  const overlap = [...nameTokens].filter((token) => fileTokens.has(token)).length

  score += overlap * 12
  if (candidate.normalized === normalizedName) score += 120
  if (candidate.normalized.includes(normalizedName) || normalizedName.includes(candidate.normalized)) score += 48

  queries.forEach((query) => {
    const normalizedQuery = normalize(query)
    if (candidate.normalized === normalizedQuery) score += 96
    if (candidate.normalized.includes(normalizedQuery) || normalizedQuery.includes(candidate.normalized)) score += 40
    const queryTokens = new Set(normalizedQuery.split(' ').filter(Boolean))
    score += [...queryTokens].filter((token) => fileTokens.has(token)).length * 8
  })

  if (candidate.variation === 'Men') score += 4
  return score - Math.max(0, fileTokens.size - nameTokens.size)
}

export function getVectorFitLibraryUrl() {
  return VECTOR_FIT_LIBRARY_URL
}

export async function resolveVectorFitAnimation(exercise) {
  if (!exercise) return null
  if (resultCache.has(exercise.id)) return resultCache.get(exercise.id)

  const index = await getAnimationIndex()
  const bucketMuscles = muscleBuckets[exercise.muscle] || ['ALL EXERCISES']
  const bucketEquipment = equipmentBuckets[exercise.equipment] || [exercise.equipment]
  const queries = [exercise.name, ...(aliasMap[exercise.id] || [])]

  let pool = index.filter(
    (entry) =>
      entry.variation === 'Men' &&
      bucketMuscles.includes(entry.muscle) &&
      bucketEquipment.includes(entry.equipment),
  )

  if (!pool.length) {
    pool = index.filter((entry) => entry.variation === 'Men' && bucketMuscles.includes(entry.muscle))
  }

  const best = pool
    .map((entry) => ({
      ...entry,
      score: scoreCandidate(exercise, entry, queries),
    }))
    .sort((left, right) => right.score - left.score)[0]

  const result = best && best.score > 10 ? best : null
  resultCache.set(exercise.id, result)
  return result
}
