**Project Title:** MuleNet – Autonomous H-GNN for Privacy-Preserving Money Mule Detection

## The Problem Statement

As digital payments scale across India, "money mules" have become the foundational infrastructure for cybercrime syndicates. Fraudsters do not cash out stolen money directly; they break it down and route it through a complex "scatter-gather" network of 3-5 compromised or synthetic bank accounts before it reaches a final off-ramp (like a crypto exchange).

Traditional banking fraud systems are mathematically blind to this. They rely on rules-based or tabular Machine Learning models that analyze accounts in isolation. When a fraudster moves ₹10,000 from one mule to another, legacy systems view this as normal peer-to-peer behavior (like splitting a dinner bill) because they cannot see the larger multi-bank topology. Consequently, illicit funds bypass security protocols while legitimate merchants face devastating, blunt-force account freezes from cyber police due to collateral contamination.

## The Real Pain Points

* **The "Ghost Farm" Blindspot:** Fraud syndicates operate dozens of synthetic accounts across multiple banks using a single emulator farm or device. Because legacy systems only look at transaction history, they cannot link these accounts pre-emptively based on shared device telemetries.
* **The Regulatory Ticking Clock (August 2026 Mandate):** On August 4, 2026, the Supreme Court of India ordered the RBI to issue a strict Standard Operating Procedure (SOP) within four weeks, mandating banks to place temporary debit holds on accounts linked to mule activity. Banks are legally compelled to act faster, but their current tools generate too many false positives to automate these holds safely.
* **The AI "Black Box" Barrier:** Compliance officers cannot legally freeze a user's funds just because an AI outputs a "92% fraud probability." If the AI cannot explicitly explain its reasoning, the bank cannot justify the debit-hold to the customer or submit the findings to the National Cyber Crime Reporting Portal (NCRP).

## The Current Reality (2025-2026 Facts)

* **Scale of Theft:** Digital arrest scams alone drained over ₹22,495 crore from Indian citizens in 2025.
* **Mule Account Volume:** As of early 2026, the I4C Suspect Registry had shared over 32.08 lakh Layer-1 mule accounts with participating entities. In 2025, the government froze 1.33 million mule accounts and deactivated 1.2 million linked SIM cards.
* **Institutional Shift:** In May 2026, the Indian Cyber Crime Coordination Centre (I4C) signed an MoU with the Reserve Bank Innovation Hub (RBIH) to directly feed suspect data into AI models like MuleHunter.AI. The entire ecosystem is actively seeking next-generation AI infrastructure to handle this data.

---

## The Proposed Solution: MuleNet

MuleNet is an advanced compliance and detection engine that treats money laundering like a virus, running "contact tracing" on illicit funds using two core technological pillars:

### 1. Heterogeneous Graph Neural Networks (H-GNN)

Instead of a simple Account-to-Account graph, MuleNet builds a multi-dimensional topology mapping Bank Accounts, Device Fingerprints, IP Subnets, and Temporal Transaction Velocity.

* **Pre-emptive Detection:** If a brand-new account is created on a device node that is computationally linked to a known scammer's subnet, the system flags it *before* a single fraudulent transaction occurs.
* **Zero-Dwell Velocity Scoring:** Legitimate users hold balances; mules disperse them. By assigning dynamic weights to graph edges based on how fast incoming funds are scattered, the H-GNN instantly recognizes the geometric signature of an algorithmic scatter-gather operation.

### 2. GNNExplainer & Autonomous Evidence Dossiers

MuleNet entirely eliminates the AI "black box" problem. When the H-GNN flags a high-risk mule cluster, it utilizes GNNExplainer to isolate the exact minimal subgraph (e.g., the specific 4 accounts and 5 transactions) responsible for the risk score.

* It automatically compiles this isolated topology, dwell-time timestamps, and device hashes into a clean, PDF-ready **Evidentiary Dossier**.
* Instead of handing compliance teams a vague alert, MuleNet delivers the exact, court-admissible paper trail required to execute a legal freeze under the new RBI SOPs.

---

## Ways to Monetize MuleNet

* **API-as-a-Service (Transaction Scoring):** Charge payment aggregators and fintechs a micro-fee (e.g., ₹0.50) per transaction scored. The API returns a structural risk score within 100 milliseconds to authorize or block the transfer.
* **Crypto Off-Ramp Protection (Direct Synergy with Mochatrade):** Scammers heavily utilize fiat-to-crypto exchanges as their final cash-out destination. When stolen UPI funds hit an exchange, the exchange absorbs the chargeback loss. MuleNet can be licensed to platforms like Mochatrade to score incoming fiat deposits, blocking tainted funds before they are converted to crypto, directly protecting the platform's bottom line.
* **Compliance Dashboard SaaS (B2B):** Small-to-medium Cooperative Banks and NBFCs cannot afford internal AI data science teams. Sell MuleNet as a turnkey SaaS dashboard (₹1-2 Lakh/month) that plugs directly into their core banking systems to help them automate debit-holds and meet the aggressive new Supreme Court and RBI compliance mandates.