# Project: Applied AI Class

## Overview
Interactive web-based course teaching LLM fundamentals through 5 interconnected HTML lessons with multimedia, animations, and interactive features. Hosted on GitHub Pages.

**Status:** Active development  
**URL:** https://joselfernandezwork.github.io/applied-ai-class/  
**Repo:** https://github.com/joselfernandezwork/applied-ai-class  
**Owner:** Jose Luis Fernandez

## Course Structure (5 Lessons)

### Lesson 1: Tokenization
- **File:** video_1_tokenization.html
- **What:** Explains how text is converted to numerical tokens
- **Features:** Scroll-triggered animations
- **Status:** Complete

### Lesson 2: Neural Networks
- **File:** video_2_neural_networks.html
- **What:** Core concepts - layers, backpropagation, optimization
- **Features:** 
  - ✓ Interactive mouse tracking (elements follow cursor with parallax at different depths)
  - ✓ Draggable elements (click & drag, elastic snap-back animation)
  - ✓ Hover glow effects
  - ✓ CSS transitions for smooth interactions
- **Status:** Complete with interactive enhancements

### Lesson 3: Retrieval-Augmented Generation (RAG)
- **File:** video_3_retrieval_augmented_generation.html
- **Codename:** "the RAG lesson"
- **What:** How to augment LLM context with external retrieval
- **Position:** Moved from lesson 5 → lesson 3 (post-Neural Networks)
- **Features:** Scroll-triggered slide-in animations
- **Status:** Complete, reordered

### Lesson 4: Prompting
- **File:** video_4_how_to_prompt.html
- **Original Position:** Lesson 3 (before reordering)
- **What:** Effective prompt engineering techniques
- **Features:** Interactive examples
- **Status:** Complete, renumbered

### Lesson 5: Tools Guide
- **File:** video_5_tools_guide.html
- **Original Position:** Lesson 4 (before reordering)
- **What:** Comprehensive directory of 23+ AI tools
- **Features:** 
  - Tool comparison table with links
  - 23+ verified tool links
  - Categories: Generalists, Code, Creative, Data, Research
- **Status:** Complete, renumbered, links verified

## 23+ AI Tools Directory (in video_5)
OpenAI (ChatGPT, API), Anthropic (Claude), Google (Gemini, Vertex AI), Perplexity, HuggingFace, Runway, Midjourney, DALL-E, Stable Diffusion, Replicate, Together AI, Modal Labs, Lambda Labs, Colab, Kaggle, Weights & Biases, LangChain, LlamaIndex, RAG Engines (Vespa, Pinecone, Weaviate), DeepMind (AlphaFold), Anthropic (Constitution AI), AlphaCode, GitHub Copilot

## File Structure
```
Applied Ai Class/
├── index.html                                    [Main hub]
├── START_HERE.html                               [Getting started guide]
├── video_1_tokenization.html                     [Lesson 1]
├── video_2_neural_networks.html                  [Lesson 2 - Interactive]
├── video_3_retrieval_augmented_generation.html   [Lesson 3 - RAG, moved from 5]
├── video_4_how_to_prompt.html                    [Lesson 4 - was lesson 3]
├── video_5_tools_guide.html                      [Lesson 5 - was lesson 4]
├── .git/                                         [Version control]
├── memory/                                       [This vault]
│   └── projects/
│       └── applied-ai-class.md                   [This file]
└── Campaign/                                     [Marketing materials]
```

## Technical Stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Hosting:** GitHub Pages
- **Version Control:** Git
- **Animations:** CSS @keyframes, IntersectionObserver API
- **Interactivity:** requestAnimationFrame, mouse event tracking
- **Styling:** Dark theme, purple/gradient color scheme, responsive design

## Key Implementation Details

### Mouse Tracking (Neural Networks Page)
```javascript
// Captures mouse position, applies parallax to elements based on depth
const updateMousePosition = (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
  animate(); // Updates element positions with parallax
};
```
- Elements at different depths move at different speeds (parallax effect)
- Smooth easing with `ease-out` transitions
- Hover triggers glow effect: `box-shadow: 0 0 30px rgba(168, 85, 247, 0.4)`

### Draggable Elements (Neural Networks Page)
- Click & drag elements anywhere on screen
- Elastic snap-back animation when released
- CSS `transition:transform 0.08s ease-out` for smooth movement
- Disabled text selection during drag

### Scroll Animations (RAG & Other Lessons)
- IntersectionObserver triggers slide-in animations on scroll
- Elements fade and translate from off-screen to visible
- Performance optimized with `will-change` hints

## Recent Updates (Session Summary)

### 1. Lesson Reordering (RAG moved 5→3)
- Renamed files to reflect new order:
  - video_5 → video_3 (RAG lesson)
  - video_3 → video_4 (Prompting lesson)
  - video_4 → video_5 (Tools lesson)
- Updated lesson numbers in HTML: "MINI LESSON 3 OF 5" → "MINI LESSON 4 OF 5", etc.
- Fixed all previous/next navigation links between lessons
- Updated index.html and START_HERE.html with correct ordering

### 2. Interactive Features (Neural Networks)
- Added mouse tracking system
- Implemented draggable elements with parallax
- Fixed JavaScript syntax error (closing brace on line 56)
- Tested and verified working

### 3. URL Corrections & Verification
- **Google Vertex AI:** Updated from `https://vertex.ai` → `https://console.cloud.google.com/vertex-ai`
- **AlphaFold:** Updated from `https://alphafold.isomorphiclabs.com` → `https://alphafoldserver.com/welcome`
- **Code Review:** Systematically verified 50+ links across all pages
- **Broken Links Fixed:** START_HERE.html had references to old filenames (video_3_how_to_prompt.html, etc.) - corrected to new names
- **RAG Card:** Added missing RAG lesson card to START_HERE.html with correct lesson number

## Git Workflow
- All changes committed to main branch
- Deployed to GitHub Pages automatically
- Live updates available at https://joselfernandezwork.github.io/applied-ai-class/

## Known Working Features
- ✓ All 5 lessons load and display correctly
- ✓ Navigation links work (previous/next buttons)
- ✓ Mouse tracking on Neural Networks page functional
- ✓ Draggable elements snap back smoothly
- ✓ Scroll animations trigger on visibility
- ✓ All 50+ external tool links verified working
- ✓ START_HERE.html displays all lessons in correct order
- ✓ Responsive design works on mobile/tablet

## Next Steps (When Needed)
- User can request new features, content updates, or design changes
- All changes integrated via Python/bash scripts and Git commits
- Memory vault maintained for continuity across sessions
