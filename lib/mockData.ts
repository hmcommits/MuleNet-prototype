// ============================================================
//  MuleNet — Mock Data Layer
//  All graph data, dossier rows, and node inspector payloads
// ============================================================

export type NodeType = "account" | "device" | "subnet" | "merchant";
export type RiskLevel = "safe" | "suspicious" | "mule" | "victim";

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  risk: RiskLevel;
  x: number;
  y: number;
  details: NodeDetails;
}

export interface NodeDetails {
  accountId: string;
  deviceHash: string;
  subnet: string;
  riskScore: number;
  bank?: string;
  lastTx?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  amount?: string;
  isFraud?: boolean;
  isActive?: boolean;
}

export interface DossierRow {
  timestamp: string;
  sourceHash: string;
  destHash: string;
  amount: string;
  velocityAlert: string;
}

// ────────────────────────────────────────────────────────────
//  GRAPH NODES
// ────────────────────────────────────────────────────────────
export const GRAPH_NODES: GraphNode[] = [
  // ── Victim
  {
    id: "victim",
    label: "Victim Account",
    type: "account",
    risk: "victim",
    x: 400,
    y: 280,
    details: {
      accountId: "0xA1B2...C3D4",
      deviceHash: "Samsung_Galaxy_CanvasHash_01X",
      subnet: "103.21.58.x",
      riskScore: 5,
      bank: "HDFC Bank",
      lastTx: "2026-09-03 21:12:44",
    },
  },

  // ── Mule Layer 1 (Scatter)
  {
    id: "mule1",
    label: "Mule-1",
    type: "account",
    risk: "mule",
    x: 200,
    y: 140,
    details: {
      accountId: "0x8F9A...2A1C",
      deviceHash: "Xiaomi_Redmi_CanvasHash_99X",
      subnet: "192.168.44.x",
      riskScore: 98,
      bank: "Paytm Payments Bank",
      lastTx: "2026-09-03 21:12:45",
    },
  },
  {
    id: "mule2",
    label: "Mule-2",
    type: "account",
    risk: "mule",
    x: 600,
    y: 140,
    details: {
      accountId: "0xB3C4...9F2D",
      deviceHash: "Xiaomi_Redmi_CanvasHash_99X",
      subnet: "192.168.44.x",
      riskScore: 97,
      bank: "Airtel Payments Bank",
      lastTx: "2026-09-03 21:12:45",
    },
  },
  {
    id: "mule3",
    label: "Mule-3",
    type: "account",
    risk: "mule",
    x: 200,
    y: 420,
    details: {
      accountId: "0xD5E6...1B3F",
      deviceHash: "Xiaomi_Redmi_CanvasHash_99X",
      subnet: "192.168.44.x",
      riskScore: 96,
      bank: "Jio Payments Bank",
      lastTx: "2026-09-03 21:12:46",
    },
  },
  {
    id: "mule4",
    label: "Mule-4",
    type: "account",
    risk: "mule",
    x: 600,
    y: 420,
    details: {
      accountId: "0xF7G8...4C5A",
      deviceHash: "Xiaomi_Redmi_CanvasHash_99X",
      subnet: "192.168.44.x",
      riskScore: 95,
      bank: "IPPB Bank",
      lastTx: "2026-09-03 21:12:46",
    },
  },

  // ── Gather / Merchant
  {
    id: "merchant",
    label: "Mochatrade Gateway",
    type: "merchant",
    risk: "suspicious",
    x: 400,
    y: 530,
    details: {
      accountId: "0xMCH...7E9B",
      deviceHash: "Server_Node_CanvasHash_01S",
      subnet: "45.79.201.x",
      riskScore: 72,
      bank: "Crypto Exchange / Mochatrade",
      lastTx: "2026-09-03 21:12:47",
    },
  },

  // ── Ghost Farm Device Node
  {
    id: "ghost_farm",
    label: "Ghost Farm Device",
    type: "device",
    risk: "mule",
    x: 400,
    y: 50,
    details: {
      accountId: "N/A",
      deviceHash: "Xiaomi_Redmi_CanvasHash_99X",
      subnet: "192.168.44.x",
      riskScore: 99,
      bank: "N/A (Device Node)",
      lastTx: "2026-09-03 21:12:40",
    },
  },

  // ── IP Subnet Nodes
  {
    id: "subnet_fraud",
    label: "192.168.44.x",
    type: "subnet",
    risk: "mule",
    x: 730,
    y: 280,
    details: {
      accountId: "N/A",
      deviceHash: "N/A",
      subnet: "192.168.44.x",
      riskScore: 91,
      bank: "N/A (Subnet Node)",
      lastTx: "2026-09-03 21:12:44",
    },
  },
  {
    id: "subnet_safe",
    label: "103.21.58.x",
    type: "subnet",
    risk: "safe",
    x: 70,
    y: 280,
    details: {
      accountId: "N/A",
      deviceHash: "N/A",
      subnet: "103.21.58.x",
      riskScore: 12,
      bank: "N/A (Subnet Node)",
      lastTx: "2026-09-03 21:10:02",
    },
  },

  // ── Safe / Ambient accounts
  {
    id: "safe1",
    label: "Account-7",
    type: "account",
    risk: "safe",
    x: 100,
    y: 600,
    details: {
      accountId: "0x2F3A...BB1C",
      deviceHash: "Apple_iPhone_CanvasHash_12A",
      subnet: "103.21.58.x",
      riskScore: 8,
      bank: "SBI",
      lastTx: "2026-09-03 20:55:11",
    },
  },
  {
    id: "safe2",
    label: "Account-8",
    type: "account",
    risk: "safe",
    x: 700,
    y: 600,
    details: {
      accountId: "0x4D5E...CC2D",
      deviceHash: "OnePlus_9_CanvasHash_34B",
      subnet: "103.21.58.x",
      riskScore: 14,
      bank: "ICICI Bank",
      lastTx: "2026-09-03 20:48:30",
    },
  },

  // ── Suspicious
  {
    id: "susp1",
    label: "Suspect-Node",
    type: "account",
    risk: "suspicious",
    x: 780,
    y: 480,
    details: {
      accountId: "0x9A1B...EE3F",
      deviceHash: "Xiaomi_Redmi_CanvasHash_88X",
      subnet: "192.168.44.x",
      riskScore: 67,
      bank: "Kotak Mahindra Bank",
      lastTx: "2026-09-03 21:05:18",
    },
  },
];

// ────────────────────────────────────────────────────────────
//  GRAPH EDGES (baseline / static)
// ────────────────────────────────────────────────────────────
export const GRAPH_EDGES: GraphEdge[] = [
  // Victim subnet connection
  { id: "e-victim-subnet_safe", source: "victim", target: "subnet_safe" },
  // Safe account connections
  { id: "e-safe1-subnet_safe", source: "safe1", target: "subnet_safe" },
  { id: "e-safe2-subnet_safe", source: "safe2", target: "subnet_safe" },
  // Ghost farm to fraud subnet
  { id: "e-ghost-subnet", source: "ghost_farm", target: "subnet_fraud" },
  // Mules to fraud subnet
  { id: "e-mule1-subnet", source: "mule1", target: "subnet_fraud" },
  { id: "e-mule2-subnet", source: "mule2", target: "subnet_fraud" },
  { id: "e-mule3-subnet", source: "mule3", target: "subnet_fraud" },
  { id: "e-mule4-subnet", source: "mule4", target: "subnet_fraud" },
  // Suspicious
  { id: "e-susp1-subnet", source: "susp1", target: "subnet_fraud" },
  // Ghost farm to mules (device linkage)
  { id: "e-ghost-mule1", source: "ghost_farm", target: "mule1" },
  { id: "e-ghost-mule2", source: "ghost_farm", target: "mule2" },
  { id: "e-ghost-mule3", source: "ghost_farm", target: "mule3" },
  { id: "e-ghost-mule4", source: "ghost_farm", target: "mule4" },
];

// ── Fraud / attack edges — animated on simulate
export const FRAUD_EDGES: GraphEdge[] = [
  { id: "fe-victim-mule1", source: "victim", target: "mule1", amount: "₹2.8L", isFraud: true },
  { id: "fe-victim-mule2", source: "victim", target: "mule2", amount: "₹3.1L", isFraud: true },
  { id: "fe-victim-mule3", source: "victim", target: "mule3", amount: "₹2.4L", isFraud: true },
  { id: "fe-victim-mule4", source: "victim", target: "mule4", amount: "₹2.7L", isFraud: true },
  { id: "fe-mule1-merch", source: "mule1", target: "merchant", amount: "₹2.8L", isFraud: true },
  { id: "fe-mule2-merch", source: "mule2", target: "merchant", amount: "₹3.1L", isFraud: true },
  { id: "fe-mule3-merch", source: "mule3", target: "merchant", amount: "₹2.4L", isFraud: true },
  { id: "fe-mule4-merch", source: "mule4", target: "merchant", amount: "₹2.7L", isFraud: true },
];

// ────────────────────────────────────────────────────────────
//  DOSSIER / EXPLAINABILITY TABLE ROWS
// ────────────────────────────────────────────────────────────
export const DOSSIER_ROWS: DossierRow[] = [
  {
    timestamp: "2026-09-03 21:12:44.001",
    sourceHash: "0xA1B2...C3D4 (Victim)",
    destHash: "0x8F9A...2A1C (Mule-1)",
    amount: "₹2,80,000",
    velocityAlert: "CRITICAL — 0.3s dwell",
  },
  {
    timestamp: "2026-09-03 21:12:44.210",
    sourceHash: "0xA1B2...C3D4 (Victim)",
    destHash: "0xB3C4...9F2D (Mule-2)",
    amount: "₹3,10,000",
    velocityAlert: "CRITICAL — 0.2s dwell",
  },
  {
    timestamp: "2026-09-03 21:12:44.388",
    sourceHash: "0xA1B2...C3D4 (Victim)",
    destHash: "0xD5E6...1B3F (Mule-3)",
    amount: "₹2,40,000",
    velocityAlert: "CRITICAL — 0.4s dwell",
  },
  {
    timestamp: "2026-09-03 21:12:44.501",
    sourceHash: "0xA1B2...C3D4 (Victim)",
    destHash: "0xF7G8...4C5A (Mule-4)",
    amount: "₹2,70,000",
    velocityAlert: "CRITICAL — 0.3s dwell",
  },
  {
    timestamp: "2026-09-03 21:12:45.301",
    sourceHash: "0x8F9A...2A1C (Mule-1)",
    destHash: "0xMCH...7E9B (Mochatrade)",
    amount: "₹2,80,000",
    velocityAlert: "CRITICAL — 0.8s dwell",
  },
  {
    timestamp: "2026-09-03 21:12:45.511",
    sourceHash: "0xB3C4...9F2D (Mule-2)",
    destHash: "0xMCH...7E9B (Mochatrade)",
    amount: "₹3,10,000",
    velocityAlert: "CRITICAL — 0.6s dwell",
  },
  {
    timestamp: "2026-09-03 21:12:45.720",
    sourceHash: "0xD5E6...1B3F (Mule-3)",
    destHash: "0xMCH...7E9B (Mochatrade)",
    amount: "₹2,40,000",
    velocityAlert: "CRITICAL — 0.9s dwell",
  },
  {
    timestamp: "2026-09-03 21:12:45.999",
    sourceHash: "0xF7G8...4C5A (Mule-4)",
    destHash: "0xMCH...7E9B (Mochatrade)",
    amount: "₹2,70,000",
    velocityAlert: "CRITICAL — 0.7s dwell",
  },
];

// ────────────────────────────────────────────────────────────
//  CASE METADATA (for Dossier Modal)
// ────────────────────────────────────────────────────────────
export const CASE_META = {
  caseNumber: "MN-2026-09-03-4471",
  reportDate: "September 03, 2026",
  reportTime: "21:12:47 IST",
  totalFundsIllicit: "₹11,00,000",
  nodesInSubgraph: 6,
  edgesInSubgraph: 8,
  ghostFarmHash: "Xiaomi_Redmi_CanvasHash_99X",
  fraudSubnet: "192.168.44.x",
  velocityWindow: "1.4 seconds",
  ncrpRef: "NCRP/2026/IND/47821",
  analyst: "MuleNet AI Engine v2.1",
};
