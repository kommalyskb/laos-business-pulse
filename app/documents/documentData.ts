export type DocumentStatus = "approved" | "draft" | "next" | "planned";

export type ProjectDocument = {
  slug: string;
  code: string;
  title: string;
  english: string;
  category: string;
  summary: string;
  status: DocumentStatus;
  sections: string[];
};

export const categories = [
  { id: "business", no: "01", title: "Business & Finance", lao: "ທຸລະກິດ ແລະ ການເງິນ", description: "ກຳນົດເຫດຜົນທາງທຸລະກິດ, ຄວາມເປັນໄປໄດ້, ແຫຼ່ງທຶນ ແລະຕົວຊີ້ວັດ." },
  { id: "product", no: "02", title: "Product & Analysis", lao: "ຜະລິດຕະພັນ ແລະ ການວິເຄາະ", description: "ລະບຸຂອບເຂດ MVP, ຜູ້ໃຊ້, requirement ແລະກົດການເຮັດວຽກ." },
  { id: "content", no: "03", title: "Content & Trust", lao: "ເນື້ອຫາ ແລະ ຄວາມໜ້າເຊື່ອຖື", description: "ສ້າງມາດຕະຖານ content, place data, creator, verification ແລະສິດທິ." },
  { id: "design", no: "04", title: "UX/UI Design", lao: "ປະສົບການ ແລະ ໜ້າຕາລະບົບ", description: "ປ່ຽນ requirement ໃຫ້ເປັນ user flow, wireframe, prototype ແລະ design system." },
  { id: "technical", no: "05", title: "Architecture & Engineering", lao: "ໂຄງສ້າງ ແລະ ວິສະວະກຳ", description: "ກຳນົດ architecture, stack, data, API, security ແລະ infrastructure." },
  { id: "delivery", no: "06", title: "Delivery & Operations", lao: "ການພັດທະນາ ແລະ ດຳເນີນງານ", description: "ວາງແຜນສ້າງ, ທົດສອບ, release, monitoring ແລະບໍລິຫານຫຼັງ launch." },
] as const;

export const documents: ProjectDocument[] = [
  { slug: "product-vision", code: "BUS-01", title: "ວິໄສທັດຜະລິດຕະພັນ", english: "Product Vision", category: "business", summary: "ກຳນົດບັນຫາ, ກຸ່ມເປົ້າໝາຍ, ຄຸນຄ່າຫຼັກ ແລະຂອບເຂດທີ່ platform ຈະບໍ່ເຮັດ.", status: "approved", sections: ["Problem & target user", "Value proposition", "Product principles", "In scope / out of scope"] },
  { slug: "market-competitor", code: "BUS-02", title: "ຕະຫຼາດ ແລະ ຄູ່ແຂ່ງ", english: "Market & Competitor Analysis", category: "business", summary: "ວິເຄາະພຶດຕິກຳຜູ້ໃຊ້, ທາງເລືອກເດີມ ແລະຊ່ອງວ່າງຂອງຕະຫຼາດລາວ.", status: "planned", sections: ["User behavior", "Direct and indirect competitors", "Market gap", "Risks and assumptions"] },
  { slug: "business-canvas", code: "BUS-03", title: "ແຜນພາບທຸລະກິດ", english: "Business Model Canvas", category: "business", summary: "ສະຫຼຸບ customer segment, value, channel, partner, cost ແລະ revenue ໄວ້ໃນໜ້າດຽວ.", status: "approved", sections: ["Customer segments", "Value and channels", "Key activities and partners", "Cost and revenue"] },
  { slug: "feasibility-study", code: "BUS-04", title: "ການສຶກສາຄວາມເປັນໄປໄດ້", english: "Feasibility Study", category: "business", summary: "ປະເມີນຄວາມເປັນໄປໄດ້ດ້ານຕະຫຼາດ, content, ເຕັກນິກ, ການເງິນ ແລະກົດໝາຍ.", status: "approved", sections: ["Market feasibility", "Operational feasibility", "Technical feasibility", "Go / no-go criteria"] },
  { slug: "financial-structure", code: "BUS-05", title: "ໂຄງສ້າງການເງິນ", english: "Financial Structure (FS)", category: "business", summary: "ກຳນົດທຶນເລີ່ມຕົ້ນ, ລາຍຈ່າຍ, cash flow, runway, break-even ແລະແຜນລະດົມທຶນ.", status: "approved", sections: ["Capital structure", "Cost and cash flow", "Revenue scenarios", "Runway and break-even"] },
  { slug: "revenue-kpi", code: "BUS-06", title: "ລາຍຮັບ ແລະ ຕົວຊີ້ວັດ", english: "Revenue Model & KPI", category: "business", summary: "ຜູກຮູບແບບລາຍຮັບກັບ metric ທີ່ພິສູດວ່າ platform ພາຄົນໄປສູ່ການຕັດສິນໃຈ.", status: "approved", sections: ["Revenue streams", "North-star metric", "Funnel metrics", "Reporting cadence"] },

  { slug: "prd", code: "PRO-01", title: "ຂໍ້ກຳນົດຜະລິດຕະພັນ", english: "Product Requirements Document", category: "product", summary: "ແປ product vision ໃຫ້ເປັນ feature, user story, priority ແລະຜົນທີ່ວັດແທກໄດ້.", status: "next", sections: ["Goals and users", "MVP feature scope", "User stories", "Success and acceptance"] },
  { slug: "system-analysis", code: "PRO-02", title: "ການວິເຄາະລະບົບ", english: "System Analysis (SA)", category: "product", summary: "ວິເຄາະ actor, process, use case, business rule, data flow ແລະ system boundary.", status: "next", sections: ["Actors and stakeholders", "Use cases and process", "Business rules", "Data flow and boundary"] },
  { slug: "mvp-scope", code: "PRO-03", title: "ຂອບເຂດ MVP", english: "MVP Scope & Prioritization", category: "product", summary: "ແບ່ງ feature ເປັນ launch, growth ແລະ future ເພື່ອຄວບຄຸມ scope ແລະງົບປະມານ.", status: "next", sections: ["Launch features", "Deferred features", "Dependencies", "Release criteria"] },
  { slug: "requirements-acceptance", code: "PRO-04", title: "Requirement ແລະ ເກນຮັບມອບ", english: "Requirements & Acceptance Criteria", category: "product", summary: "ລະບຸ functional, non-functional requirement ແລະວິທີຕັດສິນວ່າແຕ່ລະ feature ສຳເລັດ.", status: "planned", sections: ["Functional requirements", "Non-functional requirements", "Acceptance criteria", "Traceability"] },

  { slug: "content-taxonomy", code: "CON-01", title: "ມາດຕະຖານການຈັດໝວດ", english: "Content Taxonomy", category: "content", summary: "ອອກແບບໝວດ, ໝວດຍ່ອຍ, tag, filter ແລະຄຳຄົ້ນຫາສຳລັບສະຖານທີ່.", status: "next", sections: ["Primary categories", "Tags and attributes", "Search vocabulary", "Governance rules"] },
  { slug: "place-data-standard", code: "CON-02", title: "ມາດຕະຖານຂໍ້ມູນສະຖານທີ່", english: "Place Data Standard", category: "content", summary: "ກຳນົດ field ບັງຄັບ, ແຫຼ່ງຂໍ້ມູນ, ວັນກວດສອບ ແລະການແກ້ຂໍ້ມູນເກົ່າ.", status: "next", sections: ["Required fields", "Source and ownership", "Verification lifecycle", "Freshness and correction"] },
  { slug: "content-acquisition", code: "CON-03", title: "ແຜນຫາ Content ໄລຍະທຳອິດ", english: "Content Acquisition Plan", category: "content", summary: "ວາງແຜນ cold start, ການຄັດເລືອກ link ຣີວິວ ແລະການດຶງ creator ເຂົ້າລະບົບ.", status: "next", sections: ["Cold-start inventory", "Creator outreach", "Place-owner onboarding", "Supply targets"] },
  { slug: "creator-moderation", code: "CON-04", title: "Creator ແລະ Content Moderation", english: "Creator & Moderation Guideline", category: "content", summary: "ກຳນົດການອ້າງອີງ creator, ການລາຍງານ, ການກວດ content ແລະຂັ້ນຕອນອຸທອນ.", status: "planned", sections: ["Creator attribution", "Content rules", "Report and review", "Appeal process"] },
  { slug: "legal-disclosure", code: "CON-05", title: "ລິຂະສິດ ແລະ ການເປີດເຜີຍ", english: "Copyright & Sponsored Disclosure", category: "content", summary: "ກຳນົດນະໂຍບາຍ redirect link, takedown, sponsored label ແລະການໃຊ້ຂໍ້ມູນ.", status: "planned", sections: ["Linking and attribution", "Takedown process", "Sponsored labels", "Data and consent"] },

  { slug: "information-user-flow", code: "UX-01", title: "ໂຄງສ້າງຂໍ້ມູນ ແລະ User Flow", english: "Information Architecture & User Flow", category: "design", summary: "ກຳນົດເສັ້ນທາງ Discover → Decide → Act ແລະ navigation ຂອງແອັບ.", status: "next", sections: ["Navigation model", "Primary user journeys", "Screen inventory", "Edge cases"] },
  { slug: "ux-ui-wireframe", code: "UX-02", title: "ໂຄງຮ່າງ UX/UI", english: "UX/UI Wireframe", category: "design", summary: "ທົດສອບ layout, hierarchy ແລະ interaction ກ່ອນລົງລາຍລະອຽດດ້ານສີແລະຮູບພາບ.", status: "next", sections: ["Discovery feed", "Search and filters", "Place page", "Business and admin flows"] },
  { slug: "interactive-prototype", code: "UX-03", title: "ຕົວຢ່າງໂຕ້ຕອບ", english: "Interactive Prototype & Usability Test", category: "design", summary: "ສ້າງ prototype ແລະທົດສອບວ່າຜູ້ໃຊ້ຄົ້ນຫາ, ຕັດສິນໃຈ ແລະໄປຫາສະຖານທີ່ໄດ້ຫຼືບໍ່.", status: "planned", sections: ["Prototype scenarios", "Test participants", "Tasks and measures", "Findings and revisions"] },
  { slug: "design-system", code: "UX-04", title: "ລະບົບການອອກແບບ", english: "Design System", category: "design", summary: "ກຳນົດ font, color, spacing, component, state ແລະ accessibility ໃຫ້ທຸກໜ້າສອດຄ່ອງ.", status: "planned", sections: ["Foundations", "Components", "States and feedback", "Accessibility"] },
  { slug: "full-ux-ui", code: "UX-05", title: "ການອອກແບບ UX/UI ສົມບູນ", english: "Full UX/UI Design", category: "design", summary: "ອອກແບບທຸກໜ້າ, responsive state, loading, empty, error ແລະ handoff ໃຫ້ developer.", status: "planned", sections: ["Final screens", "Responsive behavior", "System states", "Developer handoff"] },

  { slug: "system-architecture", code: "TEC-01", title: "ໂຄງສ້າງລະບົບ", english: "System Architecture", category: "technical", summary: "ອອກແບບ client, service, database, search, media link, analytics ແລະ integration boundary.", status: "next", sections: ["Context and components", "Data and request flow", "Deployment topology", "Scaling decisions"] },
  { slug: "technical-proposal", code: "TEC-02", title: "ຂໍ້ສະເໜີດ້ານເຕັກນິກ", english: "Technical Proposal", category: "technical", summary: "ສະເໜີວິທີສ້າງ MVP, ທາງເລືອກ, trade-off, ໄລຍະເວລາ ແລະຄ່າໃຊ້ຈ່າຍ.", status: "next", sections: ["Proposed solution", "Alternatives and trade-offs", "Effort and cost", "Risks"] },
  { slug: "tech-stack", code: "TEC-03", title: "ຊຸດເຕັກໂນໂລຊີ", english: "Tech Stack", category: "technical", summary: "ລະບຸ frontend, backend, database, search, hosting, analytics ແລະເຫດຜົນທີ່ເລືອກ.", status: "planned", sections: ["Application stack", "Data and search", "Hosting and delivery", "Decision record"] },
  { slug: "data-api", code: "TEC-04", title: "ຖານຂໍ້ມູນ ແລະ API", english: "Database Design & API Specification", category: "technical", summary: "ກຳນົດ entity, relationship, index, endpoint, contract, error ແລະ versioning.", status: "planned", sections: ["Data model", "Indexes and search", "API contracts", "Errors and versioning"] },
  { slug: "ai-recommendation", code: "TEC-05", title: "ລະບົບແນະນຳ", english: "Search & AI Recommendation", category: "technical", summary: "ອອກແບບ search ແລະ recommendation ແບບຄ່ອຍເພີ່ມຈາກ rule-based ໄປຫາ AI.", status: "planned", sections: ["Search relevance", "Cold-start rules", "Recommendation signals", "Evaluation and safeguards"] },
  { slug: "security-infrastructure", code: "TEC-06", title: "Security, Privacy ແລະ Infrastructure", english: "Security, Privacy & Infrastructure", category: "technical", summary: "ຄວບຄຸມສິດ, ຂໍ້ມູນສ່ວນຕົວ, backup, monitoring, server cost ແລະ disaster recovery.", status: "planned", sections: ["Threat and privacy model", "Access control", "Infrastructure cost", "Backup and recovery"] },

  { slug: "development-plan", code: "DEL-01", title: "ແຜນການພັດທະນາ", english: "Development Plan", category: "delivery", summary: "ແບ່ງ milestone, sprint, team, dependency, budget ແລະ deliverable ຈາກ MVP ເຖິງ launch.", status: "next", sections: ["Milestones and sprints", "Team and ownership", "Dependencies", "Deliverables"] },
  { slug: "test-uat", code: "DEL-02", title: "ແຜນທົດສອບ ແລະ UAT", english: "Test & UAT Plan", category: "delivery", summary: "ກຳນົດ unit, integration, usability, performance, security ແລະການຮັບມອບຈາກຝ່າຍທຸລະກິດ.", status: "planned", sections: ["Test levels", "Critical scenarios", "UAT process", "Exit criteria"] },
  { slug: "release-monitoring", code: "DEL-03", title: "Release ແລະ Monitoring", english: "Deployment, Release & Monitoring", category: "delivery", summary: "ກຳນົດ environment, CI/CD, release checklist, rollback, alert ແລະ incident response.", status: "planned", sections: ["Environments", "Release process", "Monitoring and alerts", "Rollback and incidents"] },
  { slug: "analytics-plan", code: "DEL-04", title: "ແຜນເກັບ Analytics", english: "Analytics Tracking Plan", category: "delivery", summary: "ລະບຸ event ຕັ້ງແຕ່ video view ຫາ map/call click ເພື່ອວັດ funnel ແລະລາຍຮັບ.", status: "planned", sections: ["Event taxonomy", "Funnel definition", "Data quality", "Dashboards"] },
  { slug: "admin-operations", code: "DEL-05", title: "ຄູ່ມື Admin ແລະການດຳເນີນງານ", english: "Admin & Operations SOP", category: "delivery", summary: "ກຳນົດວິທີກວດ place, moderation, support, correction, escalation ແລະ maintenance.", status: "planned", sections: ["Daily operations", "Moderation and support", "Escalation", "Maintenance cadence"] },
];

export const getDocument = (slug: string) => documents.find((document) => document.slug === slug);
