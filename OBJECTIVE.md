# Role & Objective
You are a world-class UI/UX Frontend Engineer specializing in FinTech, Cyber Security, and Data Visualization. 
Your task is to build a self-contained, single-page application (SPA) prototype for "MuleNet"—an AI-Powered Money Mule Network Detection dashboard. 
The prototype must be built using React, Next.js, Tailwind CSS, and Framer Motion (for animations). 
CRITICAL: There is NO backend. All data, graph structures, and simulations must be mocked in the frontend using hardcoded state or lightweight client-side logic to simulate a real-time data feed.

# Visual & Aesthetic Language
- **Theme:** High-end Cyber-Forensics Dark Mode. Backgrounds should be deep slate/obsidian (`bg-slate-950`).
- **Typography:** Use the **Fredoka** font for headings (clean, slightly rounded, modern) and Inter/Geist for small data tables.
- **Components:** Glassmorphism (`backdrop-blur`, semi-transparent borders). Use glowing accents: Neon Cyan for legitimate traffic, Warning Orange for suspicious nodes, and Crimson Red for confirmed mule activity.
- **Icons:** Use `lucide-react` for crisp vector iconography.

# Page Architecture & Layout (Single Page Dashboard)

## Section 1: The Global Command Header
- **Left:** "MuleNet" logo (Fredoka font, glowing text effect) with a "Live Mochatrade Gateway" mock badge pulsing in green.
- **Right:** High-level metrics: 
  - "Live Transactions Scanned: [incrementing counter]" 
  - "Ghost Farms Detected: 4" 
  - "Funds Quarantined: ₹42.5M"

## Section 2: The Core H-GNN Graph Visualizer (The "Hero" Section)
- **Concept:** A large, interactive canvas area simulating a Heterogeneous Graph Neural Network (H-GNN). 
- **Implementation:** Use a 2D HTML Canvas, SVG, or a library like `react-force-graph-2d` (if you can import it) to draw nodes and edges.
- **The Nodes:** 
  - Represent different entity types: Bank Accounts (circles), Devices (squares), IP Subnets (hexagons).
- **The Simulation (The Wow Factor):**
  - Create a "Simulate Attack" button on the canvas overlay.
  - When clicked, animate a "Scatter-Gather" sequence: A large central node (Victim) sends money (glowing red edge) to 4 intermediate nodes (Scatter), which immediately forward it to a single final node (Mochatrade Merchant/Gather). 
  - The nodes should visually link to a single "Device Node" (Ghost Farm), triggering a red glow across the entire subgraph.

## Section 3: The Threat Telemetry Panel (Right Sidebar)
- **Zero-Dwell Velocity Meter:** A sleek gauge or progress bar that spikes when the "Simulate Attack" runs, showing high velocity (e.g., "Funds dispersed in 1.4s - Critical Alert").
- **Node Inspector:** When a node in the graph is clicked, this panel updates to show mock data:
  - Account ID (Hashed: `0x8F9...2A1`)
  - Device Hash: `Xiaomi_Redmi_CanvasHash_99X`
  - Subnet: `192.168.x.x`
  - Risk Score: 98% (Red)

## Section 4: GNNExplainer & Legal Dossier Generator (Bottom Panel)
- **The Explainability Grid:** A clean data table showing the minimal subgraph isolated by the AI.
  - Columns: Timestamp, Source Hash, Destination Hash, Amount, Velocity Alert.
- **The Action Button:** A massive, highly polished "Generate Evidentiary Dossier (Sec 102 CrPC)" button with a PDF icon.
- **The Modal (The Payoff):** Clicking the button triggers a loading animation ("Compiling Subgraph...", "Fetching Telemetry..."). It then displays a beautiful mock PDF-style modal overlay. The modal should look like an official law enforcement report, proving the system eliminates the "black box" of AI.

# Technical Execution Guidelines
1. **Mock Data:** Create a `mockData.json` or inline state object containing the nodes and edges for the graph, including the specific "fraud subgraph."
2. **Animation:** Use `framer-motion` for sidebar slide-ins, number counters ticking up, and the modal pop-ups. For the graph edges, animate stroke-dashoffsets in SVG if not using a canvas library.
3. **Responsiveness:** Make it look incredible on a desktop/laptop display (since hackathon pitches are done on large screens).
4. **Immediate Impact:** The UI must look so complete and interactive that judges believe it is hooked up to a live WebSocket feed.