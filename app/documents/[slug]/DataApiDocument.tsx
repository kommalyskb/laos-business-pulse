import styles from "../documents.module.css";

type DataApiDocumentProps = { basePath: string };

const decisions = [
  ["Identifier", "ໃຊ້ PostgreSQL UUIDv7 ຊະນິດ uuid ເປັນ Primary Key; ຖານຂໍ້ມູນສ້າງຄ່າດ້ວຍ uuidv7() ເພື່ອໃຫ້ index ແລະການຮຽງຕາມເວລາມີປະສິດທິພາບ."],
  ["Time", "ບັນທຶກເວລາເຫດການເປັນ timestamptz ໃນ UTC; ຊົ່ວໂມງເປີດຮ້ານເກັບເປັນວັນຂອງອາທິດ ແລະ local time ຕາມ timezone ຂອງ Place ໂດຍບໍ່ປ່ຽນເປັນ UTC. MVP ໃຊ້ Asia/Vientiane ເປັນຄ່າເລີ່ມຕົ້ນ."],
  ["Money", "ເກັບຈຳນວນເງິນເປັນ bigint ຕາມໜ່ວຍຍ່ອຍສຸດ ແລະ currency_code ແບບ ISO 4217. ສຳລັບ LAK, ຄ່າ 1 ໃນຖານຂໍ້ມູນໝາຍເຖິງ 1 ກີບ ແລະ LAK ເປັນຄ່າເລີ່ມຕົ້ນ; ຫ້າມໃຊ້ float ຄຳນວນເງິນ."],
  ["State", "ໃຊ້ text ຮ່ວມກັບ CHECK constraint ແທນ PostgreSQL native enum ເພື່ອໃຫ້ migration ຂອງສະຖານະປ່ຽນໄດ້ປອດໄພກວ່າ."],
  ["Concurrency", "ຕາຕະລາງທີ່ຖືກແກ້ໄຂຈາກ Admin ມີ version integer; API ຮັບ expectedVersion ແລະປະຕິເສດການຂຽນທັບຂໍ້ມູນໃໝ່."],
  ["JSONB", "ໃຊ້ສະເພາະ metadata ຫຼື snapshot ທີ່ໂຄງສ້າງຍືດຫຍຸ່ນ; relationship, state ແລະ field ທີ່ຄົ້ນຫາປະຈຳຕ້ອງເປັນ column ປົກກະຕິ."],
  ["Deletion", "ຂໍ້ມູນ Place, Content Source ແລະ Admin ບໍ່ hard delete; ປ່ຽນ lifecycle state ແລະຮັກສາ Audit Log ໄວ້."],
  ["Derived data", "Search projection ແລະ report aggregate ແມ່ນຂໍ້ມູນສ້າງຄືນໄດ້; PostgreSQL business tables ເທົ່ານັ້ນເປັນ Source of Truth."],
] as const;

const tableGroups = [
  ["Place & taxonomy", "9", "places, place_aliases, categories, place_categories, areas, place_contacts, business_hours, price_profiles, place_redirects"],
  ["Content & trust", "10", "creators, content_sources, source_availability_checks, takedown_requests, verification_checks, correction_requests, correction_items, request_evidence, request_communications, duplicate_candidates"],
  ["Operations & revenue", "5", "work_items, partner_memberships, sponsored_campaigns, admin_users, audit_logs"],
  ["Analytics", "3", "anonymous_sessions, analytics_events, decision_intents"],
  ["Derived & platform support", "3 + worker schema", "place_search_documents, outbox_events, idempotency_records ແລະຕາຕະລາງພາຍໃນຂອງ Graphile Worker"],
] as const;

const tableCatalog = [
  ["DB-001", "ENT-001", "places", "ຂໍ້ມູນຫຼັກຂອງຮ້ານ/ສະຖານທີ່", "id uuid PK; area_id uuid FK; slug text; name_lao text; place_type text; status text; version int; published_at timestamptz", "UNIQUE(slug); CHECK status/place_type; version ≥ 1", "status + published_at; area_id + status; lower(name_lao); updated_at", "Soft lifecycle; RESTRICT"],
  ["DB-002", "ENT-002", "place_aliases", "ຊື່ອື່ນ ແລະຄຳຄົ້ນຫາ", "id uuid PK; place_id uuid FK; alias text; locale text; normalized_alias text", "UNIQUE(place_id, normalized_alias); alias ຫ້າມວ່າງ", "GIN(normalized_alias gin_trgm_ops)", "ລຶບໄດ້ເມື່ອແກ້ alias; audit ການປ່ຽນ"],
  ["DB-003", "ENT-003", "categories", "ໝວດໝູ່ແບບລຳດັບຊັ້ນ", "id uuid PK; parent_id uuid self-FK; code text; name_lao text; status text; sort_order int", "UNIQUE(code); parent_id ≠ id; cycle ກວດໃນ service", "parent_id + sort_order; status", "Archive; RESTRICT ເມື່ອຍັງຖືກໃຊ້"],
  ["DB-004", "ENT-004", "place_categories", "ເຊື່ອມ Place ກັບ Category", "place_id uuid FK; category_id uuid FK; is_primary boolean", "PK(place_id, category_id); partial UNIQUE(place_id) WHERE is_primary", "category_id + place_id", "Owned junction; delete ຕາມ explicit command"],
  ["DB-005", "ENT-005", "areas", "ແຂວງ/ເມືອງ/ພື້ນທີ່", "id uuid PK; parent_id uuid self-FK; code text; name_lao text; area_type text; status text", "UNIQUE(code); parent_id ≠ id; CHECK area_type/status", "parent_id; status + name_lao", "Archive; RESTRICT"],
  ["DB-006", "ENT-006", "place_contacts", "ເບີໂທ, social, website ແລະ map link", "id uuid PK; place_id uuid FK; contact_type text; display_value text; normalized_value text; is_primary boolean", "UNIQUE(place_id, contact_type, normalized_value); one primary per type", "place_id + contact_type; partial primary index", "Soft remove; protected fields ບໍ່ສົ່ງໃຫ້ analytics"],
  ["DB-007", "ENT-007", "business_hours", "ເວລາເປີດ/ປິດປະຈຳວັນ", "id uuid PK; place_id uuid FK; weekday smallint; opens_at time; closes_at time; is_closed boolean; spans_midnight boolean", "CHECK weekday 0–6; closed ຫ້າມມີ open/close; open record ຕ້ອງມີທັງສອງ", "place_id + weekday", "Replace by validated schedule transaction"],
  ["DB-008", "ENT-008", "price_profiles", "ຊ່ວງລາຄາທີ່ຊ່ວຍຕັດສິນໃຈ", "id uuid PK; place_id uuid FK; min_amount bigint; max_amount bigint; currency_code char(3); price_level smallint; checked_at timestamptz", "UNIQUE(place_id); min/max ≥ 0; min ≤ max; price_level 1–4", "price_level; min_amount/max_amount", "Replace current value; Audit keeps history"],
  ["DB-009", "ENT-009", "place_redirects", "ສົ່ງ old slug/merged place ໄປ canonical Place", "id uuid PK; source_place_id uuid FK; target_place_id uuid FK; old_slug text; reason text", "UNIQUE(source_place_id); UNIQUE(old_slug); source ≠ target", "target_place_id", "Immutable after merge; correction by controlled migration"],
  ["DB-010", "ENT-010", "creators", "ຜູ້ສ້າງ Content ຈາກ external platform", "id uuid PK; platform text; external_creator_key text; display_name text; profile_url text; status text", "UNIQUE(platform, external_creator_key); CHECK status", "platform + status; lower(display_name)", "Deactivate; no creator login in MVP"],
  ["DB-011", "ENT-011", "content_sources", "Link ໄປຫາວິດີໂອ/ຣີວິວຕົ້ນສະບັບ", "id uuid PK; place_id/creator_id uuid FK; platform text; canonical_url text; external_content_key text; status text; version int; published_at timestamptz", "UNIQUE(canonical_url); UNIQUE(platform, external_content_key) when present; CHECK status", "place_id + status + published_at; creator_id; next_check_at", "Soft lifecycle/takedown; never copy social video"],
  ["DB-012", "ENT-012", "source_availability_checks", "ຜົນກວດ link ແຕ່ລະຄັ້ງ", "id uuid PK; content_source_id uuid FK; checked_at timestamptz; outcome text; http_status int; latency_ms int; detail jsonb", "CHECK outcome; http_status 100–599; latency ≥ 0", "content_source_id + checked_at DESC; outcome + checked_at", "Append-only; retention in TEC-06"],
  ["DB-013", "ENT-013", "takedown_requests", "ຄຳຮ້ອງຂໍເອົາ source/place ອອກ", "id uuid PK; target_type text; target_id uuid; requester_contact_protected text; reason text; status text; version int", "CHECK target/status; polymorphic target ກວດໂດຍ service", "status + created_at; target_type + target_id", "No hard delete; PII protected"],
  ["DB-014", "ENT-014", "verification_checks", "ຫຼັກຖານກວດຂໍ້ມູນ Place", "id uuid PK; place_id uuid FK; check_type text; result text; checked_by uuid FK admin_users; checked_at timestamptz; evidence_id uuid FK", "CHECK type/result; evidence required for specified outcomes", "place_id + checked_at DESC; result", "Append-only; supersede with new check"],
  ["DB-015", "ENT-015", "correction_requests", "ຄຳຂໍແກ້ Place/Source", "id uuid PK; place_id uuid FK; requester_contact_protected text; status text; submitted_at/closed_at timestamptz; version int", "CHECK status; closed_at required only for terminal state", "status + submitted_at; place_id + submitted_at DESC", "No hard delete; PII protected"],
  ["DB-016", "ENT-016", "correction_items", "ລາຍການ field ທີ່ຂໍແກ້", "id uuid PK; correction_request_id uuid FK; field_path text; old_value jsonb; proposed_value jsonb; decision text", "UNIQUE(request_id, field_path); CHECK decision; payload schema allowlist", "correction_request_id + decision", "Owned record; immutable after request closed"],
  ["DB-017", "ENT-017", "request_evidence", "Metadata ຫຼັກຖານໃນ private object storage", "id uuid PK; request_type text; request_id uuid; object_key text; media_type text; checksum text; status text", "UNIQUE(object_key); polymorphic request ກວດໂດຍ service", "request_type + request_id; status", "Restricted access; retention in TEC-06"],
  ["DB-018", "ENT-018", "request_communications", "ປະຫວັດການສື່ສານກັບ requester", "id uuid PK; request_type text; request_id uuid; channel text; direction text; outcome text; sent_at timestamptz; body_snapshot_protected text", "CHECK channel/direction/outcome; idempotency_key unique when supplied", "request_type + request_id + sent_at", "Append-only; protected content"],
  ["DB-019", "ENT-019", "duplicate_candidates", "ຄູ່ Place ທີ່ອາດຊ້ຳ", "id uuid PK; place_a_id/place_b_id uuid FK; score numeric(5,4); signals jsonb; status text; version int", "place_a_id < place_b_id; UNIQUE(place_a_id, place_b_id); score 0–1", "status + score DESC; each place FK", "Retain decision; candidate may expire"],
  ["DB-020", "ENT-020", "work_items", "Queue ວຽກສຳລັບ Admin", "id uuid PK; work_type text; resource_type text; resource_id uuid; status/priority text; assignee_id uuid FK; due_at timestamptz; version int", "CHECK types/status/priority; resource catalog ກວດໂດຍ service; outcome required before done", "status + priority + due_at; assignee_id + status", "No hard delete; retain outcome"],
  ["DB-021", "ENT-021", "partner_memberships", "Founding Partner/Pro membership ຂອງ Place", "id uuid PK; place_id uuid FK; plan_code text; status text; starts_at/ends_at timestamptz; amount bigint; currency_code char(3)", "one active membership per place; amount ≥ 0; end > start", "place_id + status; ends_at", "End/cancel; never changes review score"],
  ["DB-022", "ENT-022", "sponsored_campaigns", "ການສະແດງຜົນທີ່ມີປ້າຍ Sponsored", "id uuid PK; place_id uuid FK; status text; starts_at/ends_at timestamptz; budget_amount bigint; currency_code char(3); version int", "CHECK status; end > start; amount ≥ 0; activation eligibility in service", "status + starts_at + ends_at; place_id", "End/cancel; keep campaign evidence"],
  ["DB-023", "ENT-023", "admin_users", "ຜູ້ໃຊ້ Backoffice ແລະ role mapping", "id uuid PK; oidc_subject text; display_name text; role_code text; status text; last_login_at timestamptz; version int", "UNIQUE(oidc_subject); CHECK role/status", "role_code + status", "Deactivate; no hard delete"],
  ["DB-024", "ENT-024", "audit_logs", "ຫຼັກຖານການປ່ຽນ business state", "id uuid PK; actor_id uuid FK nullable; action text; resource_type text; resource_id uuid; before_snapshot/after_snapshot jsonb; request_id text; occurred_at timestamptz", "Append-only; action/resource required; payload redaction", "resource_type + resource_id + occurred_at; actor_id + occurred_at; request_id", "UPDATE/DELETE revoked from app role"],
  ["DB-025", "ENT-025", "anonymous_sessions", "Session ສຳລັບ aggregate analytics ໂດຍບໍ່ສ້າງ Guest account", "id uuid PK; anonymous_key_hash text; started_at/last_seen_at timestamptz; consent_state text; expires_at timestamptz", "UNIQUE(anonymous_key_hash); CHECK consent; expiry > start", "expires_at; last_seen_at", "Expire/purge per TEC-06"],
  ["DB-026", "ENT-026", "analytics_events", "Event allowlist ສຳລັບ funnel", "id uuid PK; event_key text; session_id uuid FK; place_id/source_id uuid FK nullable; event_name text; occurred_at timestamptz; properties jsonb; schema_version int", "UNIQUE(event_key); CHECK event/schema; PII fields prohibited", "event_name + occurred_at; place_id + occurred_at; session_id + occurred_at", "Append-only; retention in DEL-04/TEC-06"],
  ["DB-027", "ENT-027", "decision_intents", "ຫຼັກຖານເຈດຕະນາ map/call/social/share", "id uuid PK; analytics_event_id uuid FK; place_id uuid FK; intent_type text; occurred_at timestamptz", "UNIQUE(analytics_event_id); CHECK intent_type", "place_id + intent_type + occurred_at", "Append-only; aggregate evidence only"],
  ["DB-S01", "Derived", "place_search_documents", "Search projection ທີ່ສ້າງຄືນໄດ້", "place_id uuid PK/FK; display_text/search_text text; facets jsonb; search_vector tsvector; source_version int; refreshed_at timestamptz", "One projection per Place; source_version must match rebuild input", "GIN(search_vector); GIN(search_text gin_trgm_ops); facet expression indexes after benchmark", "Rebuild/delete freely; not source of truth"],
  ["DB-S02", "Platform", "outbox_events", "Event ທີ່ commit ພ້ອມ domain write", "id uuid PK; aggregate_type/id; event_type; payload jsonb; occurred_at; published_at; attempt_count int", "event schema/version validated; attempt ≥ 0", "unpublished partial index; aggregate + occurred_at", "Retain delivery evidence per TEC-06"],
  ["DB-S03", "Platform", "idempotency_records", "ປ້ອງກັນ command/event ຖືກປະມວນຜົນຊ້ຳ", "scope text; idempotency_key text; request_hash text; response_status int; response_body jsonb; expires_at timestamptz", "PK(scope, idempotency_key); same key + different hash = conflict", "expires_at", "Purge after approved TTL"],
] as const;

const indexCatalog = [
  ["IDX-01", "Public Place by slug", "places UNIQUE(slug) WHERE status='published'", "Place Page lookup", "Index-only target after EXPLAIN"],
  ["IDX-02", "Feed", "places(status, published_at DESC, id DESC)", "Cursor feed", "Stable tuple cursor"],
  ["IDX-03", "Area/category filter", "places(area_id, status) + place_categories(category_id, place_id)", "Search facets", "Keep two relational paths; no JSON scan"],
  ["IDX-04", "Exact/normalized name", "lower(places.name_lao); place_aliases(place_id, normalized_alias)", "Exact and prefix candidate", "Normalize input identically"],
  ["IDX-05", "Trigram candidate", "GIN place_search_documents.search_text gin_trgm_ops", "Typo/fuzzy candidate", "Threshold selected by TEC-05 benchmark"],
  ["IDX-06", "Full text candidate", "GIN place_search_documents.search_vector", "Token/weighted text candidate", "GIN is baseline for frequent read"],
  ["IDX-07", "Source freshness", "content_sources(status, next_check_at) WHERE status IN ('published','unavailable')", "Worker recheck scan", "Partial index avoids terminal rows"],
  ["IDX-08", "Admin work queue", "work_items(status, priority, due_at, id)", "Queue and SLA view", "Matches default ordering"],
  ["IDX-09", "Unassigned work", "work_items(priority, due_at) WHERE assignee_id IS NULL AND status='open'", "Claim next item", "Short locking transaction"],
  ["IDX-10", "Open request", "correction_requests(status, submitted_at); takedown_requests(status, created_at)", "Request triage", "Separate indexes because workflows differ"],
  ["IDX-11", "Duplicate review", "duplicate_candidates(status, score DESC)", "Highest confidence first", "Pair unique constraint separately"],
  ["IDX-12", "Campaign eligibility", "sponsored_campaigns(status, starts_at, ends_at)", "Scheduler/public placement", "Public query still joins published Place"],
  ["IDX-13", "Audit investigation", "audit_logs(resource_type, resource_id, occurred_at DESC); audit_logs(request_id)", "History and request correlation", "Append-only write overhead accepted"],
  ["IDX-14", "Analytics funnel", "analytics_events(event_name, occurred_at); decision_intents(place_id, intent_type, occurred_at)", "Aggregate job", "Raw event query is not public request path"],
  ["IDX-15", "Outbox dispatch", "outbox_events(occurred_at) WHERE published_at IS NULL", "Unpublished event claim", "Small partial index"],
] as const;

const apiCatalog = [
  ["API-P01", "Public", "GET", "/api/v1/feed", "None", "ຮັບ Published Place cards ສຳລັບ video-first feed", "cursor, limit≤30, area, category", "PlaceCard[] + nextCursor", "ERR-VALIDATION, ERR-RATE-LIMITED"],
  ["API-P02", "Public", "GET", "/api/v1/search", "None", "ຄົ້ນຫາຕາມ query/facet ແລະຄືນ candidate ທີ່ອະທິບາຍໄດ້", "q, area, category, priceLevel, openNow, cursor", "SearchResult[] + facets + nextCursor", "ERR-VALIDATION, ERR-RATE-LIMITED"],
  ["API-P03", "Public", "GET", "/api/v1/places/{slug}", "None", "Place Page ພ້ອມ contacts, hours, prices ແລະ trust metadata", "slug", "PublicPlaceDetail", "ERR-NOT-FOUND, ERR-PLACE-NOT-PUBLIC"],
  ["API-P04", "Public", "GET", "/api/v1/places/{placeId}/sources", "None", "Published review/source links ຂອງ Place", "cursor, platform, limit≤30", "PublicContentSource[] + nextCursor", "ERR-NOT-FOUND, ERR-PLACE-NOT-PUBLIC"],
  ["API-P05", "Public", "POST", "/api/v1/events", "Anonymous session", "ຮັບ analytics event ຕາມ allowlist", "Idempotency-Key + AnalyticsEventInput", "202 + accepted eventId", "ERR-EVENT-SCHEMA, ERR-IDEMPOTENCY-CONFLICT, ERR-RATE-LIMITED"],
  ["API-P06", "Public", "POST", "/api/v1/correction-requests", "Rate-limited anonymous", "ສົ່ງຄຳຂໍແກ້ຂໍ້ມູນ", "Idempotency-Key + contact + items + evidence refs", "201 + request reference", "ERR-VALIDATION, ERR-EVIDENCE-REQUIRED, ERR-RATE-LIMITED"],
  ["API-P07", "Public", "POST", "/api/v1/takedown-requests", "Rate-limited anonymous", "ສົ່ງຄຳຮ້ອງເອົາ Place/Source ອອກ", "Idempotency-Key + target + reason + contact", "201 + request reference", "ERR-VALIDATION, ERR-EVIDENCE-REQUIRED, ERR-RATE-LIMITED"],
  ["API-A01", "Admin", "GET", "/api/v1/admin/work-items", "OIDC + operations role", "Work queue ພ້ອມ filter/SLA", "status, type, assignee, cursor", "AdminWorkItem[]", "ERR-FORBIDDEN"],
  ["API-A02", "Admin", "POST", "/api/v1/admin/work-items/{id}/claim", "OIDC + operations role", "Claim ວຽກແບບ concurrency-safe", "Idempotency-Key + expectedVersion", "Updated WorkItem", "ERR-CONCURRENCY-CONFLICT, ERR-INVALID-STATE"],
  ["API-A03", "Admin", "POST", "/api/v1/admin/work-items/{id}/complete", "OIDC + operations role", "ປິດວຽກພ້ອມ outcome", "Idempotency-Key + expectedVersion + outcome", "Updated WorkItem", "ERR-WORK-OUTCOME-MISSING, ERR-CONCURRENCY-CONFLICT"],
  ["API-A04", "Admin", "GET/POST", "/api/v1/admin/places", "OIDC + content role", "List/Create Place", "filter ຫຼື PlaceCreateInput", "AdminPlace[] ຫຼື 201 AdminPlace", "ERR-VALIDATION, ERR-DUPLICATE-REVIEW-REQUIRED"],
  ["API-A05", "Admin", "GET/PATCH", "/api/v1/admin/places/{id}", "OIDC + content role", "ອ່ານ/ແກ້ draft Place", "PlacePatchInput + expectedVersion", "AdminPlace", "ERR-NOT-FOUND, ERR-CONCURRENCY-CONFLICT"],
  ["API-A06", "Admin", "POST", "/api/v1/admin/places/{id}/submit-review", "OIDC + content role", "ສົ່ງ Draft ເຂົ້າ review", "Idempotency-Key + expectedVersion", "AdminPlace", "ERR-INVALID-STATE, ERR-PLACE-PUBLISH-BLOCKED"],
  ["API-A07", "Admin", "POST", "/api/v1/admin/places/{id}/publish", "OIDC + publisher role", "ອະນຸມັດ Published Place", "Idempotency-Key + expectedVersion + decisionNote", "AdminPlace", "ERR-PLACE-PUBLISH-BLOCKED, ERR-VERIFICATION-INCOMPLETE"],
  ["API-A08", "Admin", "POST", "/api/v1/admin/places/{id}/suspend", "OIDC + publisher role", "ເອົາ Place ອອກຈາກ Public ຊົ່ວຄາວ", "Idempotency-Key + expectedVersion + reason", "AdminPlace", "ERR-INVALID-STATE"],
  ["API-A09", "Admin", "POST", "/api/v1/admin/places/{id}/archive", "OIDC + publisher role", "ສິ້ນສຸດ Place ແບບຮັກສາປະຫວັດ", "Idempotency-Key + expectedVersion + reason", "AdminPlace", "ERR-INVALID-STATE"],
  ["API-A10", "Admin", "POST", "/api/v1/admin/places/{id}/merge", "OIDC + senior reviewer", "Merge duplicate ໄປ canonical Place ແບບ atomic", "Idempotency-Key + targetPlaceId + both expectedVersion", "MergeResult + redirect", "ERR-MERGE-CONFLICT, ERR-CONCURRENCY-CONFLICT"],
  ["API-A11", "Admin", "GET/POST", "/api/v1/admin/sources", "OIDC + content role", "List/Create external source link", "filter ຫຼື SourceCreateInput", "AdminSource[] ຫຼື 201 AdminSource", "ERR-SOURCE-URL-DUPLICATE, ERR-SOURCE-VALIDATION"],
  ["API-A12", "Admin", "GET/PATCH", "/api/v1/admin/sources/{id}", "OIDC + content role", "ອ່ານ/ແກ້ source metadata", "SourcePatchInput + expectedVersion", "AdminSource", "ERR-NOT-FOUND, ERR-CONCURRENCY-CONFLICT"],
  ["API-A13", "Admin", "POST", "/api/v1/admin/sources/{id}/check", "OIDC + content role", "Queue availability/metadata check", "Idempotency-Key", "202 + job reference", "ERR-DEPENDENCY-TIMEOUT, ERR-IDEMPOTENCY-CONFLICT"],
  ["API-A14", "Admin", "POST", "/api/v1/admin/sources/{id}/publish", "OIDC + publisher role", "ເຜີຍແຜ່ source link", "expectedVersion + decisionNote", "AdminSource", "ERR-SOURCE-PUBLISH-BLOCKED, ERR-SOURCE-TAKEDOWN-HOLD"],
  ["API-A15", "Admin", "POST", "/api/v1/admin/sources/{id}/mark-unavailable", "OIDC + content role", "ລະບຸ link ໃຊ້ບໍ່ໄດ້", "expectedVersion + checkId", "AdminSource", "ERR-INVALID-STATE"],
  ["API-A16", "Admin", "GET/PATCH", "/api/v1/admin/correction-requests/{id}", "OIDC + support role", "ກວດ/ອັບເດດຄຳຂໍແກ້", "expectedVersion + assignment/status", "CorrectionRequestDetail", "ERR-CONCURRENCY-CONFLICT, ERR-REQUEST-VALUE-CONFLICT"],
  ["API-A17", "Admin", "POST", "/api/v1/admin/correction-requests/{id}/apply", "OIDC + reviewer role", "ນຳ approved items ໄປແກ້ Place ແບບ atomic", "Idempotency-Key + request/place expectedVersion", "ApplyResult", "ERR-REQUEST-NOT-READY-TO-CLOSE, ERR-CONCURRENCY-CONFLICT"],
  ["API-A18", "Admin", "GET/PATCH", "/api/v1/admin/takedown-requests/{id}", "OIDC + trust role", "ກວດ/ຕັດສິນ takedown", "expectedVersion + decision/evidence", "TakedownRequestDetail", "ERR-EVIDENCE-REQUIRED, ERR-INVALID-STATE"],
  ["API-A19", "Admin", "POST", "/api/v1/admin/verification-checks", "OIDC + reviewer role", "ບັນທຶກ verification result", "Idempotency-Key + VerificationCheckInput", "201 VerificationCheck", "ERR-VERIFICATION-INCOMPLETE, ERR-EVIDENCE-REQUIRED"],
  ["API-A20", "Admin", "GET/POST", "/api/v1/admin/campaigns", "OIDC + commercial role", "List/Create Sponsored Campaign", "filter ຫຼື CampaignCreateInput", "Campaign[] ຫຼື 201 Campaign", "ERR-CAMPAIGN-INELIGIBLE, ERR-CAMPAIGN-WINDOW"],
  ["API-A21", "Admin", "PATCH", "/api/v1/admin/campaigns/{id}", "OIDC + commercial role", "ແກ້ Draft Campaign", "expectedVersion + CampaignPatchInput", "Campaign", "ERR-CONCURRENCY-CONFLICT, ERR-INVALID-STATE"],
  ["API-A22", "Admin", "POST", "/api/v1/admin/campaigns/{id}/{action}", "OIDC + commercial approver", "activate/pause/end Campaign", "Idempotency-Key + expectedVersion + action", "Campaign", "ERR-CAMPAIGN-INELIGIBLE, ERR-CAMPAIGN-WINDOW"],
  ["API-A23", "Admin", "GET", "/api/v1/admin/audit-logs", "OIDC + auditor role", "ຄົ້ນ Audit ຕາມ resource/actor/request", "filters + cursor", "Redacted AuditLog[]", "ERR-FORBIDDEN, ERR-VALIDATION"],
  ["API-A24", "Admin", "GET", "/api/v1/admin/reports/operations", "OIDC + manager role", "ສະຫຼຸບ Place freshness, broken source, backlog ແລະ Decision Intent", "date range + timezone", "OperationsReport", "ERR-REPORT-DEFINITION-CONFLICT"],
] as const;

const transactionRules = [
  ["TX-01", "Publish/Suspend/Archive", "Place/Source state + audit_logs + outbox_events ຢູ່ transaction ດຽວ; search projection ອັບເດດພາຍຫຼັງໂດຍ Worker."],
  ["TX-02", "Merge Place", "Lock source/target in stable ID order; recheck version; move categories/contacts/sources; create redirect/audit/outbox; rollback ທັງໝົດຖ້າມີ conflict."],
  ["TX-03", "Correction apply", "Lock request ແລະ Place; validate approved items; apply all accepted changes; close request; write audit/outbox atomically."],
  ["TX-04", "Campaign transition", "Check Place published/eligible and time window ພາຍໃນ transaction; update state/version; record audit/outbox."],
  ["TX-05", "Analytics", "Insert analytics_events ແລະ optional decision_intents atomically; duplicate event_key returns prior accepted result."],
  ["TX-06", "Idempotent command", "Reserve scope/key + request hash; same hash replays stored response; different hash returns ERR-IDEMPOTENCY-CONFLICT."],
  ["TX-07", "Worker lease", "Claim/lease in short transaction; external work outside transaction; recheck lease/version before storing result."],
  ["TX-08", "External communication", "Commit business outcome before send; write communication attempt/result separately; failed send retries without reversing business decision."],
] as const;

const errorMapping = [
  ["400", "ERR-VALIDATION, ERR-EVENT-SCHEMA, ERR-SOURCE-VALIDATION, ERR-CAMPAIGN-WINDOW", "Request syntax/value is invalid; do not retry unchanged."],
  ["401", "ERR-AUTHENTICATION-REQUIRED", "OIDC/session missing or expired."],
  ["403", "ERR-FORBIDDEN", "Authenticated but role/policy denies action."],
  ["404", "ERR-NOT-FOUND, ERR-PLACE-NOT-PUBLIC", "Do not reveal private lifecycle state to Public client."],
  ["409", "ERR-INVALID-STATE, ERR-CONCURRENCY-CONFLICT, ERR-IDEMPOTENCY-CONFLICT, ERR-MERGE-CONFLICT, ERR-SOURCE-URL-DUPLICATE, ERR-REQUEST-VALUE-CONFLICT", "Refresh state or resolve conflict before retry."],
  ["422", "ERR-PLACE-PUBLISH-BLOCKED, ERR-DUPLICATE-REVIEW-REQUIRED, ERR-EVIDENCE-REQUIRED, ERR-VERIFICATION-INCOMPLETE, ERR-SOURCE-PUBLISH-BLOCKED, ERR-SOURCE-TAKEDOWN-HOLD, ERR-REQUEST-NOT-READY-TO-CLOSE, ERR-CAMPAIGN-INELIGIBLE, ERR-WORK-OUTCOME-MISSING", "Valid request format but business precondition failed."],
  ["429", "ERR-RATE-LIMITED", "Return Retry-After and retryAfterSeconds."],
  ["502/504", "ERR-EXTERNAL-ACTION-UNAVAILABLE, ERR-DEPENDENCY-TIMEOUT", "Dependency failed; safe retry only when command is idempotent."],
  ["500", "ERR-AUDIT-WRITE-FAILED, ERR-UNEXPECTED", "Rollback protected write; return traceId, never internal stack/SQL."],
] as const;

const migrationPlan = [
  ["MIG-01", "Bootstrap", "Enable pg_trgm; create migration role/schema; verify uuidv7() on PostgreSQL 18; establish UTC and required extensions."],
  ["MIG-02", "Reference core", "areas, categories, admin_users; seed approved area/category/role codes with stable IDs."],
  ["MIG-03", "Place core", "places, aliases, categories junction, contacts, hours, price profile, redirects; add constraints before importing records."],
  ["MIG-04", "Content & trust", "creators, sources, checks, requests, evidence, communication, duplicates; provision private object bucket separately."],
  ["MIG-05", "Operations & revenue", "work_items, memberships, campaigns, audit_logs; revoke audit UPDATE/DELETE from application role."],
  ["MIG-06", "Analytics", "anonymous_sessions, analytics_events, decision_intents; install event-name/property allowlist in application contract."],
  ["MIG-07", "Async/search support", "outbox_events, idempotency_records, Graphile Worker schema, place_search_documents and indexes; run full rebuild."],
  ["MIG-08", "Release gate", "Run migration twice against disposable DB, restore production-like backup in staging, EXPLAIN critical queries, smoke API, record forward-fix/rollback evidence."],
] as const;

const reviewDecisions = [
  ["REV-01", "Identifier", "UUIDv7 ຈາກ PostgreSQL 18 ເປັນ PK ຂອງຕາຕະລາງໃໝ່; ຫ້າມໃຊ້ລຳດັບ ID ເປັນຫຼັກກວດສິດ.", "ອະນຸມັດ"],
  ["REV-02", "Money/time/state", "bigint minor unit + ISO currency; LAK 1 = 1 ກີບ; UTC timestamptz; local business hours; text + CHECK state.", "ອະນຸມັດພ້ອມ LAK/timezone clarification"],
  ["REV-03", "Polymorphic references", "resource_type/resource_id ສຳລັບ Work/Audit/Request Evidence/Communication ໂດຍ service allowlist ແລະກວດ record; domain relation ອື່ນໃຊ້ real FK.", "ອະນຸມັດແບບມີເງື່ອນໄຂ: integration tests + reconciliation report"],
  ["REV-04", "API contract", "/api/v1, camelCase JSON, opaque cursor, expectedVersion, stable error code ແລະ Idempotency-Key ສຳລັບ side-effect POST.", "ອະນຸມັດ"],
  ["REV-05", "MVP scope", "Freeze 27 business tables + 3 support tables + 31 API catalog entries; ບໍ່ມີ Booking/Payment/Social interaction. ການເພີ່ມໃໝ່ຕ້ອງ trace ກັບ requirement.", "ອະນຸມັດ ແລະ freeze MVP scope"],
] as const;

export default function DataApiDocument({ basePath }: DataApiDocumentProps) {
  return (
    <article className={styles.formalDocument}>
      <header className={styles.formalDocumentHeader}>
        <p>TEC-04 · TECHNICAL BASELINE · 30 AUGUST 2026</p>
        <h1>ຖານຂໍ້ມູນ ແລະ API</h1>
        <h2>Database Design &amp; API Specification</h2>
        <span className={styles.formalStatus}>1.0 · ອະນຸມັດແລ້ວ</span>
      </header>

      <aside className={styles.formalApproval}>
        <strong>ສະບັບ 1.0 — Developer Handoff Baseline</strong>
        <p>REV-01—05 ຖືກອະນຸມັດແລ້ວ. Logical Data Model ແລະ Function Specification ຈາກ PRO-02 ຖືກປ່ຽນເປັນ physical schema, index, API contract, transaction ແລະ migration order ທີ່ Developer ນຳໄປສ້າງລະບົບໄດ້. ສະຖານະ 1.0 ແມ່ນການອະນຸມັດແບບອອກແບບ; migration, restore, security ແລະ load-test evidence ຍັງຕ້ອງຜ່ານກ່ອນ Public Pilot.</p>
      </aside>

      <nav className={styles.formalToc} aria-label="ສາລະບານ TEC-04">
        <h2>ສາລະບານ</h2>
        <ol>
          <li><a href="#tec04-control">ການຄວບຄຸມເອກະສານ</a></li>
          <li><a href="#tec04-purpose">ຈຸດປະສົງ ແລະຂອບເຂດ</a></li>
          <li><a href="#tec04-decisions">ຂໍ້ຕັດສິນ Physical Design</a></li>
          <li><a href="#tec04-catalog">ຂອບເຂດຕາຕະລາງ</a></li>
          <li><a href="#tec04-table-detail">Physical Table Catalog</a></li>
          <li><a href="#tec04-constraints">Constraint ແລະ Index</a></li>
          <li><a href="#tec04-api">API Catalog ແລະ Contract</a></li>
          <li><a href="#tec04-transaction">Transaction, Outbox ແລະ Idempotency</a></li>
          <li><a href="#tec04-errors">Error Contract ແລະ Versioning</a></li>
          <li><a href="#tec04-migration">Migration ແລະ Rollback</a></li>
          <li><a href="#tec04-security">Security ແລະ Data Boundary</a></li>
          <li><a href="#tec04-handoff">Traceability ແລະໄຟລ໌ນຳໃຊ້</a></li>
          <li><a href="#tec04-sources">Official Sources</a></li>
          <li><a href="#tec04-review">ບັນທຶກອະນຸມັດ REV-01—05</a></li>
        </ol>
      </nav>

      <section id="tec04-control" className={styles.formalSection}>
        <h2><span>01</span> ການຄວບຄຸມເອກະສານ</h2>
        <div className={styles.formalTableWrap}>
          <table className={styles.formalTable}>
            <tbody>
              <tr><th>Document ID</th><td><code>TEC-04</code></td></tr>
              <tr><th>Version / status</th><td>1.0 — ອະນຸມັດແລ້ວ</td></tr>
              <tr><th>Owner / approver</th><td>Technical Lead / Founder</td></tr>
              <tr><th>Input</th><td>PRO-02 System Analysis 1.0, PRO-03 MVP Scope 1.0, TEC-01 Architecture 1.0 ແລະ TEC-03 Tech Stack 1.0</td></tr>
              <tr><th>Output</th><td>Physical schema baseline, table/index register, API catalog, error contract ແລະ migration sequence</td></tr>
              <tr><th>Next documents</th><td>TEC-05 Search &amp; AI Recommendation, TEC-06 Security/Privacy/Infrastructure ແລະ DEL-01 Development Plan</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="tec04-purpose" className={styles.formalSection}>
        <h2><span>02</span> ຈຸດປະສົງ ແລະຂອບເຂດ</h2>
        <p>TEC-04 ຕອບ 4 ຄຳຖາມຫຼັກ: ຂໍ້ມູນຖືກເກັບຢູ່ໃສ, ຄວາມຖືກຕ້ອງຖືກບັງຄັບແນວໃດ, Client ແລະ Admin ເອີ້ນໃຊ້ຂໍ້ມູນແນວໃດ ແລະການປ່ຽນ schema ຈະຖືກນຳຂຶ້ນ Production ແນວໃດ.</p>
        <h3>ຢູ່ໃນຂອບເຂດ</h3>
        <ul className={styles.formalPlainList}>
          <li>27 business entities ຈາກ PRO-02 ພ້ອມ 3 support tables ແລະ Graphile Worker schema.</li>
          <li>Primary/foreign key, unique/check constraint, deletion rule, index ແລະ search projection.</li>
          <li>Public API, Admin API, request/response, pagination, versioning, stable error code ແລະ transaction boundary.</li>
          <li>Migration, seed, rollback, data backfill ແລະການສົ່ງມອບໃຫ້ Developer.</li>
        </ul>
        <h3>ບໍ່ຢູ່ໃນຂອບເຂດ</h3>
        <p>Booking, order, payment, invoice, refund, creator login/marketplace, comment/like/follow/DM ແລະ AI model training ບໍ່ແມ່ນ MVP. Search ranking ລະອຽດຢູ່ TEC-05; encryption, retention, network ແລະ disaster recovery ຢູ່ TEC-06.</p>
      </section>

      <section id="tec04-decisions" className={styles.formalSection}>
        <h2><span>03</span> ຂໍ້ຕັດສິນ Physical Design</h2>
        <p>ກົດເຫຼົ່ານີ້ແມ່ນ baseline ດຽວກັນສຳລັບ schema ແລະ API. ຫາກ implementation ຈະແຕກຕ່າງ ຕ້ອງບັນທຶກ Architecture Decision Record.</p>
        <div className={styles.formalTableWrap}>
          <table className={styles.formalTable}>
            <thead><tr><th>ຫົວຂໍ້</th><th>ຂໍ້ກຳນົດ</th></tr></thead>
            <tbody>{decisions.map(([name, detail]) => <tr key={name}><th>{name}</th><td>{detail}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section id="tec04-catalog" className={styles.formalSection}>
        <h2><span>04</span> ຂອບເຂດຕາຕະລາງ</h2>
        <p>Physical model ຮັກສາ 27 business entities ຈາກ PRO-02 ໂດຍບໍ່ລວມຫຼາຍ entity ໄວ້ໃນ JSONB. Support tables ຖືກແຍກໄວ້ຊັດເຈນເພາະສາມາດສ້າງຄືນ ຫຼືມີ lifecycle ຕ່າງຈາກ business data.</p>
        <div className={styles.formalTableWrap}>
          <table className={styles.formalTable}>
            <thead><tr><th>ກຸ່ມ</th><th>ຈຳນວນ</th><th>Physical tables</th></tr></thead>
            <tbody>{tableGroups.map(([group, count, tables]) => <tr key={group}><th>{group}</th><td>{count}</td><td><code>{tables}</code></td></tr>)}</tbody>
          </table>
        </div>
        <aside className={styles.formalDecision}>
          <strong>Source of Truth</strong>
          <p><code>place_search_documents</code> ບໍ່ແມ່ນ business record. ຫາກ index ເສຍ ຕ້ອງສ້າງຄືນຈາກ <code>places</code>, taxonomy, contacts, price ແລະ published content sources ໄດ້.</p>
        </aside>
      </section>

      <section id="tec04-table-detail" className={styles.formalSection}>
        <h2><span>05</span> Physical Table Catalog</h2>
        <p>ຕາຕະລາງນີ້ແມ່ນ schema baseline ທີ່ Developer ຕ້ອງແປເປັນ Drizzle schema ແລະ reviewed SQL migration. “Key fields” ແມ່ນ field ຫຼັກທີ່ກຳນົດ shape ຂອງ table; implementation ສາມາດເພີ່ມ audit timestamps ມາດຕະຖານໄດ້ ແຕ່ຫ້າມປ່ຽນ relationship ຫຼື lifecycle ໂດຍບໍ່ trace ກັບ PRO-02.</p>
        <div className={styles.formalTableWrap}>
          <table className={`${styles.formalTable} ${styles.formalCatalogTable}`}>
            <thead><tr><th>ID</th><th>Trace</th><th>Table</th><th>ຈຸດປະສົງ</th><th>Key fields</th><th>Integrity</th><th>Index path</th><th>Deletion</th></tr></thead>
            <tbody>{tableCatalog.map(([id, trace, table, purpose, fields, integrity, indexes, deletion]) => <tr key={id}><td><code>{id}</code></td><td><code>{trace}</code></td><td><strong><code>{table}</code></strong></td><td>{purpose}</td><td>{fields}</td><td>{integrity}</td><td>{indexes}</td><td>{deletion}</td></tr>)}</tbody>
          </table>
        </div>
        <h3>5.1 Column conventions ທີ່ໃຊ້ຮ່ວມ</h3>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Convention</th><th>ຂໍ້ກຳນົດ</th><th>ເຫດຜົນ</th></tr></thead><tbody>
          <tr><th>Names</th><td>Database ໃຊ້ <code>snake_case</code>; JSON API ໃຊ້ <code>camelCase</code>; mapping ຢູ່ repository/contract layer.</td><td>SQL ອ່ານງ່າຍ ແລະ TypeScript client ໄດ້ convention ທີ່ຄຸ້ນເຄີຍ.</td></tr>
          <tr><th>Primary key</th><td><code>id uuid PRIMARY KEY DEFAULT uuidv7()</code>; junction table ໃຊ້ composite PK ເມື່ອ record ບໍ່ມີ identity ຂອງຕົນ.</td><td>ລົດ duplicate surrogate key ແລະຮັກສາ relationship ຊັດເຈນ.</td></tr>
          <tr><th>Timestamps</th><td><code>created_at</code>/<code>updated_at</code> ເປັນ <code>timestamptz</code>; database default <code>now()</code>; service ປ່ຽນ <code>updated_at</code>.</td><td>ບໍ່ພຶ່ງ timezone ຂອງ browser/server.</td></tr>
          <tr><th>Version</th><td>Mutable aggregate root ມີ <code>version integer NOT NULL DEFAULT 1 CHECK(version &gt; 0)</code>.</td><td>ກວດ stale Admin screen ແລະຫ້າມ lost update.</td></tr>
          <tr><th>URLs/text</th><td>ເກັບ display/original value ແຍກຈາກ normalized/canonical value; URL canonicalization ກ່ອນ unique check.</td><td>ຮັກສາຂໍ້ຄວາມລາວຕົ້ນສະບັບ ແຕ່ຄົ້ນຫາ/ກວດຊ້ຳໄດ້.</td></tr>
          <tr><th>JSONB</th><td>ຕ້ອງມີ runtime schema + <code>schema_version</code> ເມື່ອ payload evolve; ຫ້າມເກັບ secret ຫຼື raw PII ໃນ generic properties.</td><td>ຫຼີກ schema-less data ທີ່ກວດ/ຍ້າຍບໍ່ໄດ້.</td></tr>
        </tbody></table></div>
      </section>

      <section id="tec04-constraints" className={styles.formalSection}>
        <h2><span>06</span> Constraint ແລະ Index</h2>
        <p>ຫຼັກການແມ່ນ “Database ບັງຄັບສິ່ງທີ່ມັນພິສູດໄດ້; service ບັງຄັບ workflow ທີ່ຕ້ອງອ່ານຫຼາຍ aggregate ຫຼືກວດ external evidence.” ການ validate ໃນ UI ຢ່າງດຽວບໍ່ພຽງພໍ.</p>
        <h3>6.1 Integrity boundary</h3>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ຊັ້ນ</th><th>ຕ້ອງບັງຄັບ</th><th>ຕົວຢ່າງ</th></tr></thead><tbody>
          <tr><th>Database</th><td>Type, NOT NULL, FK, unique, range, pair ordering, partial unique ແລະ append-only privilege.</td><td>ໜຶ່ງ primary category ຕໍ່ Place; duplicate source URL ບໍ່ຜ່ານ; campaign end ຕ້ອງຫຼັງ start.</td></tr>
          <tr><th>Domain service</th><td>State transition, permission, cross-aggregate eligibility, polymorphic target allowlist/existence ແລະ evidence completeness. Integration tests ຄຸ້ມທຸກ resource type ແລະ reconciliation job ລາຍງານ broken reference.</td><td>Place ຈະ publish ໄດ້ຕ້ອງຜ່ານ required verification; Sponsored ບໍ່ສາມາດຊື້ review score.</td></tr>
          <tr><th>API contract</th><td>Shape, field allowlist, max length/count, URL scheme, cursor ແລະ event property schema.</td><td>Analytics properties ທີ່ບໍ່ຢູ່ allowlist ຖືກປະຕິເສດ.</td></tr>
          <tr><th>Worker/reconciliation</th><td>Eventual consistency, broken reference report, search projection version ແລະ retry/dead job.</td><td>Projection source_version ບໍ່ກົງ Place version ຈະຖືກ rebuild.</td></tr>
        </tbody></table></div>
        <h3>6.2 Index Register</h3>
        <p>Index ຕໍ່ໄປນີ້ຜູກກັບ query path ທີ່ລະບຸ. ກ່ອນ Production ຕ້ອງມີ <code>EXPLAIN (ANALYZE, BUFFERS)</code> ຈາກ staging dataset; index ທີ່ບໍ່ຖືກໃຊ້ຕ້ອງຖືກທົບທວນເພາະມີ write/storage overhead.</p>
        <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Query path</th><th>Index baseline</th><th>Consumer</th><th>Verification</th></tr></thead><tbody>{indexCatalog.map(([id, path, index, consumer, verification]) => <tr key={id}><td><code>{id}</code></td><td><strong>{path}</strong></td><td><code>{index}</code></td><td>{consumer}</td><td>{verification}</td></tr>)}</tbody></table></div>
        <aside className={styles.formalNote}><strong>Search boundary</strong><p>Exact/prefix, full-text GIN ແລະ trigram GIN ເປັນ candidate retrieval baseline ເທົ່ານັ້ນ. Lao normalization, threshold, ranking weight ແລະ quality benchmark ຖືກຕັດສິນໃນ TEC-05.</p></aside>
      </section>

      <section id="tec04-api" className={styles.formalSection}>
        <h2><span>07</span> API Catalog ແລະ Contract</h2>
        <p>Public API ແລະ Admin API ແຍກ route, authorization ແລະ response field. Public API ສົ່ງຄືນສະເພາະ Published data; Admin command ຕ້ອງມີ authentication, authorization, validation, audit ແລະ optimistic concurrency.</p>
        <h3>7.1 Contract conventions</h3>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ຫົວຂໍ້</th><th>ຂໍ້ກຳນົດ</th></tr></thead><tbody>
          <tr><th>Base/version</th><td><code>/api/v1</code>; additive optional field ບໍ່ປ່ຽນ major; breaking semantic/required-field change ໄປ <code>/api/v2</code>.</td></tr>
          <tr><th>Format</th><td><code>application/json; charset=utf-8</code>; JSON field ໃຊ້ <code>camelCase</code>; timestamp ໃຊ້ ISO 8601 UTC; amount ແລະ currency ມາພ້ອມກັນ.</td></tr>
          <tr><th>Pagination</th><td>Opaque cursor + limit; default 20, maximum 30. Cursor ຜູກກັບ sort/filter ແລະຫ້າມ Client ຕີຄວາມໝາຍ.</td></tr>
          <tr><th>Concurrency</th><td>Admin mutation ຮັບ <code>expectedVersion</code>; mismatch ຄື HTTP 409 <code>ERR-CONCURRENCY-CONFLICT</code> ພ້ອມ current version.</td></tr>
          <tr><th>Idempotency</th><td>POST ທີ່ສ້າງ record, transition state ຫຼືຮັບ event ຕ້ອງມີ <code>Idempotency-Key</code>; key ດຽວ + payload ຕ່າງກັນຖືກປະຕິເສດ.</td></tr>
          <tr><th>Correlation</th><td>ທຸກ response ມີ <code>traceId</code>; Admin write ບັນທຶກ request ID ໃນ Audit Log.</td></tr>
          <tr><th>Public privacy</th><td>ຫ້າມສົ່ງ internal status, protected requester contact, evidence key, Admin identity, audit snapshot ຫຼື unpublished record.</td></tr>
        </tbody></table></div>
        <h3>7.2 Endpoint catalog</h3>
        <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Audience</th><th>Method</th><th>Path</th><th>Access</th><th>Purpose</th><th>Input</th><th>Output</th><th>Expected errors</th></tr></thead><tbody>{apiCatalog.map(([id, audience, method, path, access, purpose, input, output, errors]) => <tr key={id}><td><code>{id}</code></td><td>{audience}</td><td><strong>{method}</strong></td><td><code>{path}</code></td><td>{access}</td><td>{purpose}</td><td>{input}</td><td>{output}</td><td>{errors}</td></tr>)}</tbody></table></div>
        <h3>7.3 Success ແລະ Error envelope</h3>
        <pre className={styles.saCodeSample}>{`// Success\n{\n  "data": { "id": "019...", "version": 4 },\n  "meta": { "traceId": "req_..." }\n}\n\n// Error\n{\n  "error": {\n    "code": "ERR-CONCURRENCY-CONFLICT",\n    "message": "ຂໍ້ມູນຖືກແກ້ໄຂແລ້ວ; ກະລຸນາ refresh ກ່ອນບັນທຶກອີກຄັ້ງ",\n    "details": { "currentVersion": 5 },\n    "traceId": "req_..."\n  }\n}`}</pre>
        <p>Error message ສາມາດແປພາສາໄດ້ ແຕ່ <code>error.code</code> ຕ້ອງຄົງທີ່ເພາະ Client, test ແລະ monitoring ອ້າງອີງ code ນີ້.</p>
      </section>

      <section id="tec04-transaction" className={styles.formalSection}>
        <h2><span>08</span> Transaction, Outbox ແລະ Idempotency</h2>
        <p>Domain change, Audit Log ແລະ Outbox Event ຕ້ອງ commit ຫຼື rollback ພ້ອມກັນ. External call ແລະວຽກ Worker ບໍ່ຖື database transaction ຄ້າງໄວ້.</p>
        <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Operation</th><th>Atomicity/retry contract</th></tr></thead><tbody>{transactionRules.map(([id, operation, rule]) => <tr key={id}><td><code>{id}</code></td><td><strong>{operation}</strong></td><td>{rule}</td></tr>)}</tbody></table></div>
        <aside className={styles.formalDecision}><strong>Transactional Outbox rule</strong><p>API ບໍ່ publish event ເຂົ້າ Worker/telemetry ກ່ອນ transaction commit. Dispatcher claim ແຖວ <code>outbox_events</code>, ສົ່ງ task ແບບ at-least-once ແລະປະທັບ <code>published_at</code>. Consumer ຕ້ອງທົນ event ຊ້ຳໄດ້.</p></aside>
      </section>

      <section id="tec04-errors" className={styles.formalSection}>
        <h2><span>09</span> Error Contract ແລະ Versioning</h2>
        <p>30 stable errors ຈາກ PRO-02 ຖືກ mapping ເປັນ HTTP status ຕາມສາເຫດ. HTTP status ບອກປະເພດຂໍ້ຜິດພາດ; stable code ບອກກົດທຸລະກິດທີ່ລະອຽດກວ່າ.</p>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>HTTP</th><th>Stable error codes</th><th>Client behavior</th></tr></thead><tbody>{errorMapping.map(([http, codes, behavior]) => <tr key={http}><th>{http}</th><td><code>{codes}</code></td><td>{behavior}</td></tr>)}</tbody></table></div>
        <h3>9.1 Compatibility rule</h3>
        <ul className={styles.formalPlainList}>
          <li>ການເພີ່ມ optional response field ຫຼື error details ແມ່ນ backward-compatible; Client ຕ້ອງບໍ່ fail ເມື່ອພົບ field ໃໝ່.</li>
          <li>ການລຶບ/ປ່ຽນ type/ປ່ຽນ semantic ຂອງ field, error code ຫຼື state ແມ່ນ breaking change ແລະຕ້ອງມີ v2/migration window.</li>
          <li>OpenAPI/contract schema ຕ້ອງຢູ່ <code>packages/contracts</code>; CI ກວດ breaking diff ແລະ generated client ຕ້ອງບໍ່ແມ່ນ source of truth.</li>
        </ul>
      </section>

      <section id="tec04-migration" className={styles.formalSection}>
        <h2><span>10</span> Migration ແລະ Rollback</h2>
        <p>ທຸກ schema change ຕ້ອງຜ່ານ reviewed SQL migration, staging restore test ແລະ rollback/forward-fix plan; ຫ້າມໃຊ້ schema push ກັບ Production.</p>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Order</th><th>Stage</th><th>Deliverable/gate</th></tr></thead><tbody>{migrationPlan.map(([id, stage, result]) => <tr key={id}><td><code>{id}</code></td><td><strong>{stage}</strong></td><td>{result}</td></tr>)}</tbody></table></div>
        <h3>10.1 Expand–migrate–contract</h3>
        <ol className={styles.formalNumberList}>
          <li><strong>Expand:</strong> ເພີ່ມ nullable/default-compatible column/table/index ໂດຍບໍ່ທຳລາຍ app version ເກົ່າ.</li>
          <li><strong>Migrate:</strong> backfill ເປັນ batch, ວັດ lock/time/row count, ປ່ຽນ application ໃຫ້ dual-read/write ຖ້າຈຳເປັນ.</li>
          <li><strong>Contract:</strong> ຫຼັງຈາກກວດວ່າ code ເກົ່າບໍ່ຖືກໃຊ້ ຈຶ່ງຕື່ມ NOT NULL/drop old field ໃນ release ຕ່າງຫາກ.</li>
        </ol>
        <aside className={styles.formalNote}><strong>Rollback ບໍ່ແມ່ນ down migration ສະເໝີ</strong><p>ຖ້າ migration ໄດ້ປ່ຽນ/ລຶບ data, safest path ອາດແມ່ນ forward-fix ຫຼື restore ຈາກ verified backup. ແຕ່ລະ migration PR ຕ້ອງລະບຸວິທີຢຸດ, rollback application ແລະກູ້ data ກ່ອນ deploy.</p></aside>
      </section>

      <section id="tec04-security" className={styles.formalSection}>
        <h2><span>11</span> Security ແລະ Data Boundary</h2>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Control</th><th>TEC-04 baseline</th><th>ສິ່ງທີ່ TEC-06 ຕ້ອງປິດ</th></tr></thead><tbody>
          <tr><th>Database roles</th><td>App role ບໍ່ມີ DDL; migration role ແຍກ; audit role read-only; audit_logs ຫ້າມ UPDATE/DELETE.</td><td>Exact role grants, credential rotation ແລະ break-glass.</td></tr>
          <tr><th>PII</th><td>Requester contact/evidence/body ແຍກ protected fields; public/reports/telemetry ບໍ່ເຫັນ raw value.</td><td>Encryption mechanism, key ownership, retention/purge.</td></tr>
          <tr><th>Authorization</th><td>Server checks OIDC identity + role + resource/action policy; UI visibility ບໍ່ແມ່ນ security control.</td><td>Role matrix, MFA, session duration, step-up actions.</td></tr>
          <tr><th>Injection</th><td>Parameterized Drizzle/SQL only; sort/filter ໃຊ້ allowlist; raw SQL review mandatory.</td><td>SAST/DAST/dependency scan gate.</td></tr>
          <tr><th>Audit</th><td>Protected write fails when audit insert fails; snapshots are redacted; request/trace ID correlates logs.</td><td>Retention, archive integrity, alert/detection rules.</td></tr>
          <tr><th>Rate/abuse</th><td>Public write endpoints rate-limited by privacy-safe session/network signal; generic public 404.</td><td>Threshold, WAF/reverse-proxy rules, abuse response.</td></tr>
          <tr><th>Backup</th><td>Migration requires verified backup and restore evidence.</td><td>Encrypted base backup/WAL, RPO/RTO, off-host restore runbook.</td></tr>
        </tbody></table></div>
      </section>

      <section id="tec04-handoff" className={styles.formalSection}>
        <h2><span>12</span> Traceability ແລະໄຟລ໌ນຳໃຊ້</h2>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Input</th><th>TEC-04 implementation output</th><th>Verification</th></tr></thead><tbody>
          <tr><th>PRO-02 ENT-001—027</th><td><code>DB-001—027</code> ແລະ relationship/FK/constraint.</td><td>Entity coverage = 27/27; no orphan logical entity.</td></tr>
          <tr><th>PRO-02 functions/workflows</th><td><code>API-P01—P07</code>, <code>API-A01—A24</code> ແລະ <code>TX-01—08</code>.</td><td>Critical workflow has endpoint, transaction, error and permission.</td></tr>
          <tr><th>PRO-03 MVP boundary</th><td>Public discovery, Place detail, source links, correction/takedown, Admin operations, campaign and analytics only.</td><td>No booking/payment/social/creator login table or endpoint.</td></tr>
          <tr><th>TEC-01/03</th><td>PostgreSQL 18, Drizzle + SQL migration, pg_trgm/GIN, Graphile Worker, outbox and repository boundary.</td><td>Stack/architecture decision IDs represented in code and migration.</td></tr>
          <tr><th>PRO-04 acceptance</th><td>Deterministic seed, schema/contract/integration/migration tests.</td><td>CI + staging restore + critical query plan evidence.</td></tr>
        </tbody></table></div>
        <h3>12.1 Preview/download artifacts</h3>
        <div className={styles.architectureArtifacts}>
          <a href={`${basePath}/artifact-preview?file=tec04-data-api-baseline-2026-08-30.json&from=data-api`}><b>ພຣີວິວ Data/API Baseline JSON</b><span>Physical decisions, table/API scope, transaction, migration ແລະ review record</span></a>
          <a href={`${basePath}/artifact-preview?file=tec04-table-index-register-2026-08-30.csv&from=data-api`}><b>ພຣີວິວ Table/Index CSV</b><span>Working register ສຳລັບ schema ແລະ migration review</span></a>
          <a href={`${basePath}/artifact-preview?file=tec04-api-catalog-2026-08-30.csv&from=data-api`}><b>ພຣີວິວ API Catalog CSV</b><span>Endpoint, access, input/output, errors ແລະ transaction requirement</span></a>
          <a href={`${basePath}/templates/tec04-data-api-baseline-2026-08-30.json`} download><b>ດາວໂຫຼດ Baseline JSON</b><span>Machine-readable technical handoff</span></a>
          <a href={`${basePath}/templates/tec04-table-index-register-2026-08-30.csv`} download><b>ດາວໂຫຼດ Table/Index CSV</b><span>ນຳໄປຕິດຕາມ schema implementation</span></a>
          <a href={`${basePath}/templates/tec04-api-catalog-2026-08-30.csv`} download><b>ດາວໂຫຼດ API CSV</b><span>ນຳໄປສ້າງ OpenAPI/contract backlog</span></a>
        </div>
      </section>

      <section id="tec04-sources" className={styles.formalSection}>
        <h2><span>13</span> Official Source Register</h2>
        <p>ແຫຼ່ງອ້າງອີງນີ້ກວດໃນວັນທີ 30 ສິງຫາ 2026. TEC-04 ໃຊ້ເປັນຫຼັກຖານຄວາມສາມາດຂອງ PostgreSQL/Drizzle; ບໍ່ໃຊ້ blog ບຸກຄົນເປັນ technology contract.</p>
        <ul className={styles.formalNumberList}>
          <li><a href="https://www.postgresql.org/about/news/postgresql-18-released-3142/">PostgreSQL 18 release</a> — core <code>uuidv7()</code> ແລະ timestamp-ordered UUID support.</li>
          <li><a href="https://www.postgresql.org/docs/18/pgtrgm.html">PostgreSQL pg_trgm</a> — similarity, GIN/GiST operator class ແລະ indexed LIKE/ILIKE.</li>
          <li><a href="https://www.postgresql.org/docs/18/textsearch-indexes.html">PostgreSQL text search indexes</a> — GIN ເປັນ preferred text-search index type.</li>
          <li><a href="https://www.postgresql.org/docs/18/indexes.html">PostgreSQL indexes</a> ແລະ <a href="https://www.postgresql.org/docs/18/gin.html">GIN indexes</a> — query acceleration ແລະ write/storage trade-off.</li>
          <li><a href="https://orm.drizzle.team/docs/indexes-constraints">Drizzle indexes and constraints</a> ແລະ <a href="https://orm.drizzle.team/docs/migrations">Drizzle migrations</a> — typed schema with reviewed migration workflow.</li>
        </ul>
      </section>

      <section id="tec04-review" className={styles.formalSection}>
        <h2><span>14</span> ບັນທຶກອະນຸມັດ REV-01—05</h2>
        <p>Founder ອະນຸມັດທັງ 5 ຂໍ້ຕາມຄຳແນະນຳ. ຕາຕະລາງນີ້ແມ່ນ decision record ທີ່ Developer, Reviewer ແລະ Tester ຕ້ອງໃຊ້ກວດ implementation.</p>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Decision</th><th>ສະຖານະ/ເງື່ອນໄຂ</th></tr></thead><tbody>{reviewDecisions.map(([id, title, decision, approval]) => <tr key={id}><td><code>{id}</code></td><td><strong>{title}</strong><br />{decision}</td><td>{approval}</td></tr>)}</tbody></table></div>
        <aside className={styles.formalApproval}><strong>TEC-04 · ສະບັບ 1.0</strong><p>27 logical entities trace ໄປ physical tables ຄົບ, 3 support tables ຖືກແຍກຈາກ Source of Truth, API ມີ request/response/error/access/transaction contract, critical query ມີ index path ແລະ artifacts ກົງກັບໜ້າເອກະສານ. Implementation ຕ້ອງສ້າງ migration/restore, contract/integration, reconciliation, security ແລະ load-test evidence ຕາມ gates ກ່ອນ Public Pilot.</p></aside>
      </section>

      <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
        <a href={`${basePath}/documents/tech-stack`}><small>← PREVIOUS</small><strong>TEC-03 · ຊຸດເຕັກໂນໂລຊີ</strong></a>
        <a href={`${basePath}/documents/ai-recommendation`}><small>NEXT →</small><strong>TEC-05 · ລະບົບແນະນຳ</strong></a>
      </nav>
    </article>
  );
}
