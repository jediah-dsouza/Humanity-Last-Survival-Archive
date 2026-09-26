import { CityOutpost, ColonyOption, ArchiveMemory, PopulationRecord, ResourceTelemetry } from '../types/archive';

export const HERO_IMAGE = '/src/assets/images/hero_dying_earth_1790453262999.jpg';
export const MEMORY_CAPSULE_IMAGE = '/src/assets/images/archive_memory_capsule_1790453327356.jpg';

export const COLONY_OPTIONS: ColonyOption[] = [
  {
    id: 'kepler-9',
    name: 'Kepler-9 Haven Ark',
    destination: 'Gliese 667Cc Interstellar Corridor',
    environmentType: 'Continuous Rotation Biosphere Ring',
    image: '/src/assets/images/colony_kepler_haven_1790453280854.jpg',
    transitDuration: '420 Earth Years (Cryo-Stasis / Generation Hybrid)',
    survivalProbability: 93.4,
    totalCapacity: 80000,
    remainingBerths: 14210,
    gravityStandard: '0.98 G (Centrifugal)',
    lifeSupportRedundancy: 'Triple Closed-Loop Algae Reactors',
    highlights: [
      'Self-contained agricultural terrarium holding 1,400 Earth species',
      'Antimatter pulse propulsion system tested over 18 solar trial runs',
      'Advanced medical cryo-pods with continuous neural preservation'
    ],
    riskFactor: 'Deep space micro-meteorite storms during Oort Cloud traverse',
    tagline: 'The Seed Ship for Humanity’s Second Genesis',
    description: 'Constructed at the Lagrangian Point L4, Kepler-9 is mankind’s grandest generational vessel. Designed to carry civilization across 23 light-years, its twin counter-rotating habitat drums simulate Earth atmospheric pressure and diurnal light cycles.'
  },
  {
    id: 'subterranean-zion',
    name: 'Subterranean Zion Core',
    destination: 'Mariana Geo-Crust Haven (Depth: -11.2 km)',
    environmentType: 'Geothermal Obsidian Vault City',
    image: '/src/assets/images/colony_sub_zion_1790453297931.jpg',
    transitDuration: 'Immediate (Sub-surface Mag-Rail Descent: 48 Mins)',
    survivalProbability: 97.8,
    totalCapacity: 120000,
    remainingBerths: 8430,
    gravityStandard: '1.02 G (Natural Terrestrial Crust)',
    lifeSupportRedundancy: 'Deep Mantle Geothermal Thermoelectric Spire',
    highlights: [
      'Impervious to all cosmic radiation, solar micro-novas, and toxic skies',
      'Underground hydrothermal agriculture fueled by volcanic mineral currents',
      'Direct structural tether into prehistoric crystalline bedrock'
    ],
    riskFactor: 'Tectonic shift resonance requiring continuous harmonic dampeners',
    tagline: 'Sheltered Beneath the Heart of the World',
    description: 'Carved directly into the basalt shelf of the Mariana Trench abyss, Zion Core utilizes Earth’s internal core heat to power self-sustaining subterranean ecosystems, completely insulated from the toxic atmosphere 11 kilometers above.'
  },
  {
    id: 'lunar-bastion',
    name: 'Lunar Bastion Citadel',
    destination: 'Shackleton Crater Rim & Orbital Ring',
    environmentType: 'Titanium-Regolith Shielded Spaceport',
    image: '/src/assets/images/colony_orbital_bastion_1790453311375.jpg',
    transitDuration: '14 Hours (SSTO Atmospheric Shuttle)',
    survivalProbability: 88.6,
    totalCapacity: 65000,
    remainingBerths: 3190,
    gravityStandard: '0.16 G (Low-G with Magnetic Compression Suits)',
    lifeSupportRedundancy: 'Polar Water Ice Extraction & Solar Fusion Array',
    highlights: [
      'Primary staging port and launch-catapult for interplanetary exploration',
      'Vast reserves of pure lunar water ice in permanently shadowed craters',
      'Direct telescope observation array monitoring Earth’s atmospheric decay'
    ],
    riskFactor: 'Extreme thermal swings during lunar twilight transitions',
    tagline: 'The High Watchtower Guarding the Cradle',
    description: 'Perched on the peaks of eternal light at the Lunar South Pole, Station Vanguard serves as the orbital transit citadel for evacuees while maintaining deep-space radio links to deep-space autonomous probes.'
  }
];

export const SURVIVING_CITIES: CityOutpost[] = [
  {
    id: 'new-geneva',
    name: 'New Geneva Redoubt',
    location: 'Alpine Sub-Glacial Trench, Switzerland',
    depthOrAltitude: '-1,420 m (Sub-alpine)',
    population: 114200,
    status: 'OPTIMAL',
    airQuality: 98.4,
    radiationLevel: '0.04 mSv/h (Shielded)',
    structuralIntegrity: 96,
    lifespanDays: 240,
    type: 'subterranean',
    leadArchivist: 'Dr. Elena Rostova',
    specialty: 'Human Cultural & Digital Knowledge Archives',
    description: 'Encased beneath 1,400 meters of solid granite and ancient permafrost, New Geneva holds the master quantum servers containing all recorded literature, music, and scientific discoveries from 3,000 BCE to 2187.'
  },
  {
    id: 'neo-kyoto',
    name: 'Neo-Kyoto Deep Dome',
    location: 'Japan Abyssal Trench, Pacific Ocean',
    depthOrAltitude: '-4,800 m (Abyssal Floor)',
    population: 89400,
    status: 'OPTIMAL',
    airQuality: 97.1,
    radiationLevel: '0.02 mSv/h (Zero Cosmic Penetration)',
    structuralIntegrity: 92,
    lifespanDays: 190,
    type: 'oceanic',
    leadArchivist: 'Takahiro Vance',
    specialty: 'Hydroponic Flora & Marine Genetic Banking',
    description: 'Constructed from cellular titanium and reinforced quartz membranes, Neo-Kyoto relies on deep-sea thermal vents to cultivate 600 varieties of bio-luminescent engineered food staples.'
  },
  {
    id: 'atacama-citadel',
    name: 'Atacama Sky Array',
    location: 'Chajnantor Plateau, Chile',
    depthOrAltitude: '+5,150 m (Sub-Stratosphere)',
    population: 58200,
    status: 'EVACUATING',
    airQuality: 82.5,
    radiationLevel: '1.24 mSv/h (Elevated)',
    structuralIntegrity: 78,
    lifespanDays: 45,
    type: 'high_altitude',
    leadArchivist: 'Commander Mateo Solis',
    specialty: 'Deep Space Orbital Launch & Guidance Control',
    description: 'The high-altitude staging center for outbound evacuation shuttles. Due to thinning atmospheric shielding, personnel are currently transferring to orbital staging pods at a rate of 1,200 per day.'
  },
  {
    id: 'svalbard-cryo',
    name: 'Svalbard Gen-Fortress',
    location: 'Spitsbergen Arch, Arctic Ocean',
    depthOrAltitude: '-680 m (Permafrost Vault)',
    population: 31200,
    status: 'SEALED',
    airQuality: 99.1,
    radiationLevel: '0.01 mSv/h (Hermetic)',
    structuralIntegrity: 98,
    lifespanDays: 610,
    type: 'cryo_vault',
    leadArchivist: 'Dr. Ingrid Lindqvist',
    specialty: '3.2M Earth Plant & Fauna Embryo Banks',
    description: 'The ultimate repository of terrestrial life. The subterranean cryo-vaults are completely autonomous and powered by deep thermopiles designed to maintain -196°C temperatures for over 10,000 years.'
  },
  {
    id: 'kalahari-oasis',
    name: 'Kalahari Geo-Bunker',
    location: 'Southern African Basin',
    depthOrAltitude: '-950 m (Aquifer Sanctuary)',
    population: 55920,
    status: 'DEGRADED',
    airQuality: 79.2,
    radiationLevel: '0.85 mSv/h',
    structuralIntegrity: 84,
    lifespanDays: 68,
    type: 'subterranean',
    leadArchivist: 'Amara Diallo',
    specialty: 'Synthetic Water Filtration & Solar Thermal Storage',
    description: 'Built above one of Earth’s largest fossil freshwater aquifers, supplying essential deuterium and drinking water to all remaining continental settlements via pressurized pipelines.'
  }
];

export const RESOURCE_TELEMETRY: ResourceTelemetry[] = [
  {
    key: 'o2_reserve',
    label: 'Atmospheric O2 Purification Reserves',
    currentValue: 1842000,
    unit: 'Megatons O2',
    threshold: 500000,
    dailyConsumption: 18200,
    daysRemaining: 101,
    status: 'CAUTION',
    trend: 'DOWN'
  },
  {
    key: 'water_synthesis',
    label: 'Desalinated Potable Water Synthesis',
    currentValue: 42100000,
    unit: 'Hectoliters',
    threshold: 10000000,
    dailyConsumption: 320000,
    daysRemaining: 131,
    status: 'STABLE',
    trend: 'STEADY'
  },
  {
    key: 'geothermal_power',
    label: 'Mantle Geothermal Core Power',
    currentValue: 94.6,
    unit: '% Grid Efficiency',
    threshold: 60.0,
    dailyConsumption: 0.04,
    daysRemaining: 865,
    status: 'STABLE',
    trend: 'STEADY'
  },
  {
    key: 'genetic_seeds',
    label: 'Global Seed & Embryo Viability',
    currentValue: 88.2,
    unit: '% Viable Strains',
    threshold: 75.0,
    dailyConsumption: 0.08,
    daysRemaining: 412,
    status: 'STABLE',
    trend: 'STEADY'
  },
  {
    key: 'radiation_shielding',
    label: 'Atmospheric Ozone Shield Integrity',
    currentValue: 14.8,
    unit: '% Retention',
    threshold: 10.0,
    dailyConsumption: 0.12,
    daysRemaining: 40,
    status: 'CRITICAL',
    trend: 'DOWN'
  }
];

export const ARCHIVED_MEMORIES: ArchiveMemory[] = [
  {
    id: 'mem-01',
    year: 2114,
    title: 'The Sound of Summer Rain in Provence',
    author: 'Cécile Laurent (Age 84, Archive Node 14)',
    originLocation: 'Aix-en-Provence, France',
    category: 'Audio',
    duration: '0:42',
    soundType: 'rain',
    excerpt: 'I remember the smell of petrichor on warm terra cotta tiles. When the sky opened, we didn’t run inside; we stood with open palms.',
    fullText: 'I remember the smell of petrichor on warm terra cotta tiles. In July of 2114, the rains were still soft, not acidic. My grandmother had a lavender garden, and when the sky opened, we didn’t run inside; we stood with open palms. You could taste the sweetness of clean air. If anyone born in Kepler-9 or Zion reads this: know that water once fell freely from the sky like silver thread, and nobody had to ration their breathing.',
    likesCount: 14208,
    verifiedTimestamp: '2187-04-12T08:14:00Z'
  },
  {
    id: 'mem-02',
    year: 2098,
    title: 'Humpback Whale Song Recorded in the Pacific',
    author: 'Oceanic Research Ark V (Autonomous Buoy #41)',
    originLocation: 'Hawaiian Marine Sanctuary',
    category: 'Sensory',
    duration: '1:15',
    soundType: 'ocean',
    excerpt: 'Low harmonic frequencies reverberating across 40 kilometers of crystalline, pre-bleached coral waters.',
    fullText: 'Low harmonic frequencies reverberating across 40 kilometers of crystalline, pre-bleached coral waters. The male whale called for forty-six minutes without answer. Our marine hydrophones captured the reverberation against the Maui underwater shelf. It is preserved here in full 192kHz dynamic resolution so humanity will never forget the beings who shared our cradle.',
    likesCount: 22194,
    verifiedTimestamp: '2187-05-02T19:30:11Z'
  },
  {
    id: 'mem-03',
    year: 2132,
    title: 'First Winter Snowfall on Mount Fuji',
    author: 'Kenji Takahashi (Flight Engineer, Ark 02)',
    originLocation: 'Honshu, Japan',
    category: 'Visual',
    soundType: 'chime',
    excerpt: 'The silence was absolute. White powder blankets over volcanic basalt at dawn, turning pink in the rising sun.',
    fullText: 'The silence was absolute. White powder blankets over volcanic basalt at dawn, turning pink in the rising sun. In 2132, winter was already dying, lasting barely three weeks. We climbed to the 5th station just to touch the ice with our bare fingers. It stung, then melted into warmth. A paradox that no climate simulation can replicate: how something so cold can feel so alive.',
    likesCount: 18450,
    verifiedTimestamp: '2187-06-18T11:05:42Z'
  },
  {
    id: 'mem-04',
    year: 2165,
    title: 'Laughter at the Final Public Concert',
    author: 'Aria Chen (Cellist, Global Philharmonic)',
    originLocation: 'Sydney Opera House Sanctuary',
    category: 'Audio',
    duration: '0:58',
    soundType: 'pulse',
    excerpt: 'We played Beethoven’s 9th as the sky outside turned violet. Nobody cried; instead, everyone began to sing.',
    fullText: 'We played Beethoven’s 9th as the sky outside turned violet with ion storms. The air filtration was already wheezing in the ceiling baffles, but nobody cried. Instead, seven thousand people who had never met began to harmonize the Ode to Joy in twelve different languages. We knew we were the closing act of Earth, but in that hall, humanity felt immortal.',
    likesCount: 31080,
    verifiedTimestamp: '2187-08-01T22:45:00Z'
  }
];

export const POPULATION_SAMPLE_RECORDS: PopulationRecord[] = [
  { id: 'HUM-2187-0941', name: 'Dr. Alistair Finch', age: 41, origin: 'Edinburgh, Scotland', specialization: 'Closed-Loop Hydrology & Plant Bio-Engineering', assignedColony: 'Kepler-9 Haven Ark', status: 'CLEARED' },
  { id: 'HUM-2187-1402', name: 'Maya Lin-O’Connor', age: 19, origin: 'Vancouver, Cascadia', specialization: 'Genomic Embryo Cryptography', assignedColony: 'Subterranean Zion Core', status: 'CLEARED' },
  { id: 'HUM-2187-2194', name: 'Tarek Al-Mansoor', age: 34, origin: 'Alexandria Delta', specialization: 'Antimatter Magnetic Nozzle Technician', assignedColony: 'Lunar Bastion Citadel', status: 'IN_TRANSIT' },
  { id: 'HUM-2187-3801', name: 'Dr. Yulia Belova', age: 52, origin: 'St. Petersburg Redoubt', specialization: 'Human Memory & Neural Archival Lead', assignedColony: 'Kepler-9 Haven Ark', status: 'CLEARED' },
  { id: 'HUM-2187-4920', name: 'Kwame Mensah', age: 28, origin: 'Accra Coastal Bunker', specialization: 'Deep Geothermal Fluid Mechanics', assignedColony: 'Subterranean Zion Core', status: 'PROCESSING' },
  { id: 'HUM-2187-5118', name: 'Katarina Varga', age: 24, origin: 'Budapest Under-City', specialization: 'Atmospheric Scrubber Chemistry', assignedColony: 'Lunar Bastion Citadel', status: 'CLEARED' },
  { id: 'HUM-2187-6709', name: 'Siddharth Rao', age: 39, origin: 'Deccan Shield Vault', specialization: 'Quantum Navigation & Stellar Cartography', assignedColony: 'Kepler-9 Haven Ark', status: 'IN_TRANSIT' },
  { id: 'HUM-2187-7890', name: 'Elena Gomez', age: 16, origin: 'Bogotá Mountain Arc', specialization: 'Terrestrial Seed Germination Apprentice', assignedColony: 'Subterranean Zion Core', status: 'CLEARED' }
];
