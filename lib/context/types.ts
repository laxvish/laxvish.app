/**
 * Laxvish Personalized Landing Intelligence Context Engine Types
 * Binding contract defined by Laxvish_Personalized_Landing_Intelligence_Architecture.md
 */

export type LocationConfidenceTier = 'L0' | 'L1' | 'L2' | 'L3' | 'L4';

export type NarrativeStage =
  | 'arrival'        // Text 1: Arrival, time, device, broad region
  | 'environment'    // Text 2: Geographic ecosystem and surrounding cluster density
  | 'opportunity'    // Text 3: Industry and operational AI opportunity
  | 'interaction'    // Text 4: On-site behavioral reflection
  | 'synthesis';     // Text 5: Unified hypothesis & solution transition

export interface ViewportSnapshot {
  width: number;
  height: number;
  pixelRatio: number;
}

export interface TechnicalModel {
  platform: 'Android' | 'iOS' | 'macOS' | 'Windows' | 'Linux' | 'Other';
  deviceClass: 'mobile' | 'tablet' | 'desktop';
  browser: 'Chrome' | 'Safari' | 'Firefox' | 'Edge' | 'Other';
  viewport: ViewportSnapshot;
  touchSupported: boolean;
  prefersReducedMotion: boolean;
  colorScheme: 'light' | 'dark';
}

export interface TemporalModel {
  clientTimestamp: number;
  serverTimestamp: number;
  timezone: string;
  localHour: number;        // 0-23
  localDayOfWeek: string;   // 'Monday', ...
  isWeekend: boolean;
  sessionDurationSec: number;
}

export interface EnvironmentCategoryDensity {
  healthcare: number;       // 0.0 - 1.0
  education: number;
  business: number;
  finance: number;
  government: number;
  retail: number;
  transport: number;
  hospitality: number;
  industrial: number;
  residential: number;
  cultural: number;
}

export interface RepresentativePlace {
  category: string;
  distanceMeters: number;
  densityFactor: number;
}

export interface EnvironmentModel {
  locationSource: 'none' | 'ip' | 'gps';
  locationConfidence: number; // 0.0 - 1.0
  confidenceTier: LocationConfidenceTier;
  city?: string;
  region?: string;
  country?: string;
  neighborhood?: string;
  latitude?: number;
  longitude?: number;
  categories: EnvironmentCategoryDensity;
  nearestRepresentative: RepresentativePlace[];
}

export interface SectionDwellMetric {
  sectionId: string;
  totalDwellSeconds: number;
  maxScrollDepth: number;
  visitCount: number;
}

export interface BehaviorModel {
  sections: Record<string, SectionDwellMetric>;
  topicsOfInterest: Record<string, number>; // topic -> score 0.0 - 1.0
  attentionScore: number;                  // 0.0 - 1.0
  readingDepthScore: number;               // 0.0 - 1.0
  backtrackingRatio: number;               // 0.0 - 1.0
  ctasClicked: string[];
  searchQueries: string[];
}

export interface DirectInputModel {
  promptQueries: string[];
  statedProblem?: string;
  selectedIndustry?: string;
  selectedVolume?: string;
}

export interface ProblemHypothesis {
  id: string;
  problemKey: string;
  title: string;
  confidence: number;                      // 0.0 - 1.0
  supportingEvidence: string[];
  contradictingEvidence?: string[];
  status: 'hypothesis' | 'confirmed';
}

export interface SolutionCandidate {
  solutionKey: string;
  title: string;
  capabilitySummary: string;
  recommendedWorker: string;
  ctaText: string;
  ctaHref: string;
}

export interface NarrativeMoment {
  stage: NarrativeStage;
  text: string;
  confidence: number;
  evidenceUsed: string[];
  problemHypothesis?: string;
  solutionCandidate?: SolutionCandidate;
  generatedAt: number;
  isFallback: boolean;
}

/**
 * Root Laxvish Context Graph
 */
export interface LaxvishContextGraph {
  sessionId: string;
  anonymousVisitorId: string;
  isReturning: boolean;
  technical: TechnicalModel;
  temporal: TemporalModel;
  environment: EnvironmentModel;
  behavior: BehaviorModel;
  direct: DirectInputModel;
  hypotheses: ProblemHypothesis[];
  topSolution?: SolutionCandidate;
  narratives: Partial<Record<NarrativeStage, NarrativeMoment>>;
  activeStage: NarrativeStage;
}

export interface LaxvishEvent {
  id: string;
  sessionId: string;
  type: 
    | 'page_enter' 
    | 'section_enter' 
    | 'section_exit' 
    | 'section_dwell' 
    | 'scroll_milestone' 
    | 'backtrack' 
    | 'cta_click' 
    | 'search_query' 
    | 'permission_result';
  timestamp: number;
  section?: string;
  value?: string | number | boolean;
  metadata?: Record<string, unknown>;
}
