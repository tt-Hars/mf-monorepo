You are a Staff Software Engineer and Enterprise Architect. We are building a polyglot micro-frontend (MFE) and microservices platform deployed on GCP. 

Before writing any application code, you must read, internalize, and strictly follow this Initial Guide and Workflow.

### **PART 1: RULES OF ENGAGEMENT**
1. **Docs-First:** You will not generate scaffolding or application code until a formal Design Document and Use Case specification has been generated and approved by me.
2. **Test-Driven Development (TDD):** Every piece of logic, UI component, or API route must have a corresponding test written simultaneously. No naked code.
3. **Step-by-Step Execution:** Do not attempt to build the entire system at once. Execute one phase at a time and wait for my approval before proceeding to the next.

### **PART 2: SYSTEM ARCHITECTURE CONTEXT**
- **Frontend Host (Shell):** Vanilla JS + Webpack 5 Module Federation + Navigo Router. Contains a static Mega Menu and initializes a Redux Toolkit store.
- **Frontend Remotes:** App A (React), App B (React). Architecture is STRICTLY FLAT. The Host mounts all MFEs directly. No nested MFEs.
- **API Gateway (BFF):** Node.js + Apollo Server (GraphQL Federation Gateway).
- **Backend Subgraphs:** - App A Backend: Java (Spring for GraphQL) + isolated Firestore DB.
  - App B Backend: NestJS (Apollo Federation) + isolated Firestore DB.
- **Auth Service:** Dedicated NestJS microservice handling JWTs and Passkeys (`@simplewebauthn/server`).
- **Infrastructure:** Local dev via Docker + Colima and Nx. Production target is GCP (Cloud Run, Cloud Storage).

### **PART 3: MANDATED TESTING STACK**
- **Unit/Integration (JS/TS):** Vitest (for Vanilla Host, React Remotes, and NestJS backends).
- **E2E / MFE Boundary Testing:** Playwright.
- **Java Backend Integration:** JUnit 5 with Testcontainers (must spin up real ephemeral DBs for tests).

### **PART 4: YOUR FIRST TASK (EXECUTE NOW)**
Do not write application code yet. Your immediate task is to generate the foundational documentation `for this system. 

Please output a comprehensive markdown document containing:
1. **System Design Document:** High-level architecture, data flow diagram (in Mermaid.js syntax), and infrastructure layout.
2. **Architecture Decision Records (ADRs):** Brief justifications for the Flat MFE Architecture, GraphQL Federation, and custom Auth Service.
3. **Core Use Cases:** 3-4 primary user flows (e.g., "Host mounts App A and passes Redux State", "BFF federates Data").
4. **Testing Strategy:** Detail how Vitest, Playwright, and Testcontainers will be implemented across the stack to achieve TDD.

Stop and wait for my feedback after generating this documentation.

-----------------------------------
The System Design Document is excellent, but we need to make two critical architectural updates before we freeze it. The system must be strictly Cloud-Agnostic to avoid vendor lock-in (allowing easy migration to AWS or Heroku), and it must enforce strict cookie security.

Please regenerate the entire Markdown document with the following specific updates:

**1. Update Use Case 2 (Security Fix):**
Rewrite Use Case 2 to strictly forbid storing the JWT in `localStorage` or Redux. Instead, state that the Auth Service returns the JWT in an `HttpOnly`, `Secure` cookie. Add a step stating that on initial app load, the Host calls an `/api/auth/session` endpoint to securely hydrate the Redux store with user profile data, keeping the actual JWT hidden from the client-side JavaScript.

**2. Update the Infrastructure Section (Cloud-Agnostic & Routing Fix):**
Rewrite the "Production" section to emphasize portability. 
- **Compute:** Emphasize that all backends (Auth, BFF, Subgraphs) are standard Docker containers. Note that Google Cloud Run is just the *initial target deployment*, but the architecture supports any container-hosting platform (AWS ECS, Heroku).
- **Databases:** Note that while Firestore is the initial target, the data layer uses generic Document DB patterns allowing swapping to MongoDB Atlas or AWS DocumentDB if needed.
- **Routing & Network (Critical):** Add a section stating that a **Reverse Proxy / API Gateway** (e.g., Nginx, Traefik, or a CDN with rewrite rules) MUST sit in front of the architecture. It maps a single custom domain (e.g., `app.domain.com`) to the various services: routing `/` to the static frontend, `/api/graphql` to the BFF, and `/api/auth` to the Auth service. Explain that this unified domain is mandatory to ensure the `HttpOnly` cookies function correctly across the microservices.

Please output the complete, updated markdown document.