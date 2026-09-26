export interface CityOutpost {
  id: string;
  name: string;
  location: string;
  depthOrAltitude: string;
  population: number;
  status: 'OPTIMAL' | 'DEGRADED' | 'EVACUATING' | 'SEALED';
  airQuality: number; // percentage
  radiationLevel: string; // mSv/h
  structuralIntegrity: number; // percentage
  lifespanDays: number;
  type: 'subterranean' | 'oceanic' | 'high_altitude' | 'cryo_vault';
  leadArchivist: string;
  specialty: string;
  description: string;
}

export interface ColonyOption {
  id: string;
  name: string;
  destination: string;
  environmentType: string;
  image: string;
  transitDuration: string;
  survivalProbability: number;
  totalCapacity: number;
  remainingBerths: number;
  gravityStandard: string;
  lifeSupportRedundancy: string;
  highlights: string[];
  riskFactor: string;
  tagline: string;
  description: string;
}

export interface ArchiveMemory {
  id: string;
  year: number;
  title: string;
  author: string;
  originLocation: string;
  category: 'Audio' | 'Sensory' | 'Visual' | 'Poetry';
  duration?: string;
  excerpt: string;
  fullText: string;
  likesCount: number;
  verifiedTimestamp: string;
  soundType?: 'rain' | 'ocean' | 'chime' | 'pulse';
}

export interface PopulationRecord {
  id: string;
  name: string;
  age: number;
  origin: string;
  specialization: string;
  assignedColony: string;
  status: 'CLEARED' | 'IN_TRANSIT' | 'PROCESSING';
}

export interface ResourceTelemetry {
  key: string;
  label: string;
  currentValue: number;
  unit: string;
  threshold: number;
  dailyConsumption: number;
  daysRemaining: number;
  status: 'STABLE' | 'CAUTION' | 'CRITICAL';
  trend: 'UP' | 'DOWN' | 'STEADY';
}
