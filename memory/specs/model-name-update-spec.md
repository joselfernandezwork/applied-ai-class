# PRD: AI Model Name Currency Update
**Applied AI Class Website**
**Date:** April 12, 2026
**Author:** Jose Luis Fernandez (via Claude)
**Status:** Implementing

---

## Problem Statement

The Applied AI Class course content references AI model names that are 12–18 months out of date (GPT-4, Claude 3.5, Gemini 2.5 Pro, Grok 4.2, Llama 3, Mistral 2 Large). Students learning AI fundamentals in 2026 encounter model names they cannot find in current interfaces, undermining trust and practical utility. Because this is an educational product teaching students to *use* AI tools today, outdated model names create confusion at the exact moment students are trying to take action.

---

## Goals

1. **Accuracy** — Every model name on the site reflects a model that exists and is publicly accessible as of April 2026.
2. **Actionability** — Students who follow the step-by-step instructions on the Tools page can immediately select the named models in the actual product UI.
3. **Context window education** — The tokenization lesson's context window comparison reflects current model capabilities (significant expansion since 2024).
4. **Reduce student confusion** — Eliminate the friction of encountering deprecated model names (GPT-4o was retired Feb 2026, Claude 3.5 Sonnet is no longer the flagship).

---

## Non-Goals

- **Rewriting lesson narrative** — Model names are updated in-place; the pedagogical structure and explanations are not changed.
- **Adding new model providers** — No new tool cards or lesson sections; scope is updating existing references only.
- **Parameter count precision** — Most frontier model providers do not disclose exact parameter counts; estimates remain labeled as estimates.
- **Mobile/UI redesign** — No visual or layout changes; text content only.

---

## Current State vs. Target State

| Location | Current (Outdated) | Updated (2026 Current) |
|---|---|---|
| **Tokenization — Scale check** | GPT-4: 128k tokens | GPT-5.4: 128k+; Claude Sonnet 4.6: 1M tokens |
| **Tokenization — Context window card** | GPT-4: 128k, Claude: 200k, Gemini: 2M | GPT-5.4: 128k, Claude Sonnet 4.6: 1M, Gemini 3.1 Pro: 1M, Llama 4 Scout: 10M |
| **Neural Networks — Parameter count label** | GPT-4 has ~1.8 trillion | Large frontier models can have 1–3+ trillion |
| **Neural Networks — Scale comparison** | GPT-4, Claude 3.5, Llama 3 70B | GPT-5.4, Claude Sonnet 4.6, Llama 4 Maverick |
| **Neural Networks — Efficiency note** | Claude Haiku or GPT-4o mini | Claude Haiku 4.5 or GPT-5.4 mini |
| **Tools — ChatGPT model selector** | GPT-4o (balanced), o1 (reasoning), mini (speed) | GPT-5.4 (balanced), o3 (reasoning), mini (speed) |
| **Tools — Google AI Studio** | Gemini 2.5 Pro | Gemini 3.1 Pro |
| **Tools — Vertex AI model list** | Claude 3.5 Sonnet, Gemini Pro, Llama 2 | Claude Sonnet 4.6, Gemini 3.1 Pro, Llama 4 Maverick |
| **Tools — Mistral model list** | Mistral 2 Large (70B), Mistral Nemo | Mistral Large 3, Mistral NeMo 12B |
| **Tools — Grok card name + table** | Grok 4.2 | Grok 4 |

---

## User Stories

**As a student** following the Tools Guide step-by-step, I want the model names in the instructions to match exactly what I see in the product UI, so that I can complete the exercise without getting stuck or confused.

**As a student** reading the Tokenization lesson, I want the context window comparison to reflect current model capabilities, so that I understand the realistic scale of what today's AI can process.

**As a student** reading the Neural Networks scale comparison, I want to see the names of models I've heard of in 2026 news, so that the content feels relevant and current.

**As an educator** (Jose Luis), I want the course content to stay credible with students who are also consuming AI news, so that they trust the material and recommend the course to peers.

---

## Requirements

### P0 — Must Have (all in scope for this update)

- [ ] **Tokenization page** — Update scale check callout from "GPT-4: 128k" to current flagship model with accurate token count.
- [ ] **Tokenization page** — Update context window comparison card with current model names and token counts.
- [ ] **Neural Networks page** — Update scale comparison bar chart model labels (3 models shown).
- [ ] **Neural Networks page** — Update efficiency footnote from deprecated model names to current equivalents.
- [ ] **Neural Networks page** — Update parameter count callout to reflect that frontier models are in the 1–3T+ range.
- [ ] **Tools page — ChatGPT section** — Update model selector instruction from GPT-4o/o1 to GPT-5.4/o3.
- [ ] **Tools page — AI Studio section** — Update Gemini 2.5 Pro to Gemini 3.1 Pro.
- [ ] **Tools page — Vertex AI section** — Update model list from Claude 3.5 Sonnet / Llama 2 to Claude Sonnet 4.6 / Llama 4 Maverick.
- [ ] **Tools page — Mistral section** — Update model names from Mistral 2 Large / Mistral Nemo to Mistral Large 3 / Mistral NeMo 12B.
- [ ] **Tools page — Grok card** — Update "Grok 4.2" to "Grok 4" in both the card header and comparison table.

### P1 — Nice to Have (future pass)

- Update token cost estimates if pricing has shifted significantly with newer models.
- Add Llama 4 Scout to the scale comparison for its remarkable 10M-token context window.
- Add a note that o3 (OpenAI) replaced o1 as the primary reasoning model.

### P2 — Future Consideration

- Create a quarterly "model name audit" checklist or scheduled task to catch future drift.
- Add a "Last verified" timestamp footer to the Tools page to set student expectations.

---

## Model Reference (2026 Current)

| Provider | Flagship | Fast/Lightweight | Notes |
|---|---|---|---|
| **OpenAI** | GPT-5.4 | GPT-5.4 mini | GPT-4o retired Feb 2026; o3 = reasoning flagship |
| **Anthropic** | Claude Opus 4.6 | Claude Haiku 4.5 | Sonnet 4.6 = balanced (1M context) |
| **Google** | Gemini 3.1 Pro | Gemini 3 Flash | Gemini 2.5 still available but older |
| **Meta** | Llama 4 Maverick | Llama 4 Scout | Scout has 10M context; Maverick is 17B active / 128 experts |
| **Mistral** | Mistral Large 3 | Mistral NeMo 12B | 256K context on Large 3 |
| **xAI** | Grok 4 | — | 2M token context window |

---

## Success Metrics

**Leading (check at launch):**
- All named models are findable/selectable in their respective product UIs — manual QA by Jose.
- Zero references to "GPT-4o", "Claude 3.5", "Gemini 2.5 Pro", "Grok 4.2", "Llama 3", or "Mistral 2" remaining on any page.

**Lagging (check at next cohort):**
- Student feedback no longer mentions confusion about "wrong model names."
- Drop in support questions about which model to select.

---

## Open Questions

- **[Jose — content]** Should the Neural Networks scale comparison add a 4th row for Llama 4 Maverick's MoE architecture, given it illustrates an important shift (mixture of experts vs. dense models)?
- **[Jose — content]** Should the Tokenization page add Llama 4 Scout's 10M token context to make the scale more dramatic and educational?
- **[Engineering]** Are there any model name references in `index.html` or `START_HERE.html` that need updating? (Current scan found none — confirm after implementation.)
