import styles from "../documents.module.css";

type Attribute = {
  name: string;
  type: string;
  key?: "PK" | "FK" | "UK" | "FK/UK" | "PK/FK";
  required: boolean;
  description: string;
  rule?: string;
};

type Entity = {
  id: string;
  group: string;
  name: string;
  lao: string;
  purpose: string;
  owner: string;
  functions: string;
  attributes: Attribute[];
};

type Relationship = {
  id: string;
  from: string;
  fromCardinality: string;
  to: string;
  toCardinality: string;
  meaning: string;
  enforcement: string;
};

const a = (name: string, type: string, required: boolean, description: string, key?: Attribute["key"], rule?: string): Attribute => ({ name, type, required, description, key, rule });

const entities: Entity[] = [
  {
    id: "ENT-001", group: "PLACE CATALOG", name: "Place", lao: "ສະຖານທີ່/ຮ້ານຫຼັກ", owner: "MOD-03, MOD-05", functions: "FN-PLC-001, FN-PADM-001—010, FN-DQ-001—004",
    purpose: "Canonical Record ຂອງສະຖານທີ່ຈິງໜຶ່ງແຫ່ງ. ລວມ Identity, Location ແລະ Lifecycle ຂອງ Place; ບໍ່ລວມ Contact, Hours, Category ຫຼື Content ທີ່ມີໄດ້ຫຼາຍລາຍການ.",
    attributes: [
      a("place_id", "Identifier", true, "ID ຖາວອນພາຍໃນລະບົບ", "PK", "ຫ້າມນຳກັບມາໃຊ້ໃໝ່"),
      a("slug", "Text", true, "Canonical URL slug ປັດຈຸບັນ", "UK", "Normalize ແລະບໍ່ຊ້ຳ"),
      a("display_name", "Text", true, "ຊື່ທີ່ສະແດງຕໍ່ຜູ້ໃຊ້"),
      a("description", "Text", false, "ຄຳອະທິບາຍຫຍໍ້ທີ່ກວດແລ້ວ"),
      a("area_id", "Identifier", true, "ເຂດ/ເມືອງທີ່ Place ຕັ້ງຢູ່", "FK"),
      a("address_text", "Text", true, "ທີ່ຢູ່ທີ່ອ່ານໄດ້"),
      a("latitude", "Decimal", true, "ພິກັດ Latitude", undefined, "-90 ຫາ 90"),
      a("longitude", "Decimal", true, "ພິກັດ Longitude", undefined, "-180 ຫາ 180"),
      a("lifecycle_status", "Enum", true, "Draft | InReview | Published | Suspended | Archived"),
      a("quality_status", "Enum", true, "Fresh | Due | Stale | NeedsReview"),
      a("published_at", "Timestamp", false, "ເວລາເຜີຍແຜ່ຄັ້ງທຳອິດ"),
      a("closed_at", "Timestamp", false, "ເວລາຢືນຢັນວ່າປິດຖາວອນ"),
      a("created_at / updated_at", "Timestamp", true, "ເວລາສ້າງ ແລະແກ້ຫຼ້າສຸດ"),
    ],
  },
  {
    id: "ENT-002", group: "PLACE CATALOG", name: "Place Alias", lao: "ຊື່ອື່ນຂອງ Place", owner: "MOD-02, MOD-05", functions: "FN-SRCH-002, FN-PADM-008—010",
    purpose: "ເກັບຊື່ເກົ່າ, ຊື່ຫຍໍ້, ຊື່ອີກພາສາ ຫຼືຊື່ທີ່ຄົນນິຍົມຄົ້ນ ໂດຍບໍ່ສ້າງ Place ຊ້ຳ.",
    attributes: [a("place_alias_id", "Identifier", true, "ID ຂອງ Alias", "PK"), a("place_id", "Identifier", true, "Place ເຈົ້າຂອງ Alias", "FK"), a("alias_text", "Text", true, "ຊື່ທາງເລືອກ"), a("locale", "Code", false, "ພາສາຂອງຊື່"), a("alias_type", "Enum", true, "FormerName | ShortName | Translated | SearchTerm"), a("is_searchable", "Boolean", true, "ອະນຸຍາດໃຫ້ໃຊ້ຄົ້ນຫາ")],
  },
  {
    id: "ENT-003", group: "PLACE CATALOG", name: "Category", lao: "ໝວດສະຖານທີ່", owner: "MOD-02, MOD-05", functions: "FN-SRCH-003/005, FN-PADM-001—003",
    purpose: "Reference Data ສຳລັບຈັດໝວດຮ້ານອາຫານ, ທີ່ພັກ, ສະຖານທີ່ທ່ອງທ່ຽວ ແລະປະເພດຍ່ອຍ.",
    attributes: [a("category_id", "Identifier", true, "ID ຂອງໝວດ", "PK"), a("parent_category_id", "Identifier", false, "ໝວດແມ່ສຳລັບລຳດັບຊັ້ນ", "FK", "ຫ້າມອ້າງຫາຕົນເອງ"), a("code", "Code", true, "Code ຖາວອນສຳລັບ API/Rule", "UK"), a("name_lo", "Text", true, "ຊື່ພາສາລາວ"), a("name_en", "Text", false, "ຊື່ພາສາອັງກິດ"), a("is_active", "Boolean", true, "ເປີດໃຊ້ເປັນ Filter ຫຼືບໍ່"), a("sort_order", "Integer", true, "ລຳດັບສະແດງ")],
  },
  {
    id: "ENT-004", group: "PLACE CATALOG", name: "Place Category", lao: "ຄວາມສຳພັນ Place–Category", owner: "MOD-02, MOD-05", functions: "FN-SRCH-003, FN-PADM-001/002",
    purpose: "Junction Entity ທີ່ໃຫ້ Place ໜຶ່ງຢູ່ໄດ້ຫຼາຍ Category ແລະ Category ໜຶ່ງມີໄດ້ຫຼາຍ Place.",
    attributes: [a("place_id", "Identifier", true, "Place", "PK/FK"), a("category_id", "Identifier", true, "Category", "PK/FK"), a("is_primary", "Boolean", true, "ໝວດຫຼັກຂອງ Place", undefined, "Place ໜຶ່ງມີ Primary ໄດ້ສູງສຸດ 1"), a("assigned_at", "Timestamp", true, "ເວລາຈັດໝວດ")],
  },
  {
    id: "ENT-005", group: "PLACE CATALOG", name: "Area", lao: "ເຂດພື້ນທີ່", owner: "MOD-02, MOD-05", functions: "FN-SRCH-003, FN-PADM-001—003",
    purpose: "Reference Data ແບບລຳດັບຊັ້ນ ເຊັ່ນ ແຂວງ → ເມືອງ → ບ້ານ/ເຂດ ເພື່ອຄົ້ນ ແລະກອງຜົນ.",
    attributes: [a("area_id", "Identifier", true, "ID ຂອງພື້ນທີ່", "PK"), a("parent_area_id", "Identifier", false, "ພື້ນທີ່ແມ່", "FK"), a("area_type", "Enum", true, "Province | District | Village | Zone"), a("code", "Code", true, "Code ພາຍໃນ", "UK"), a("name_lo", "Text", true, "ຊື່ພາສາລາວ"), a("name_en", "Text", false, "ຊື່ພາສາອັງກິດ"), a("is_active", "Boolean", true, "ສະຖານະໃຊ້ງານ")],
  },
  {
    id: "ENT-006", group: "PLACE CATALOG", name: "Place Contact", lao: "ຊ່ອງທາງຕິດຕໍ່", owner: "MOD-03, MOD-05", functions: "FN-PLC-004, FN-ACT-002/003, FN-PADM-002",
    purpose: "ແຍກ Phone, WhatsApp, Facebook, Website ຫຼືຊ່ອງທາງອື່ນອອກເປັນຫຼາຍ Record ເພື່ອກວດແລະປິດເປັນລາຍຊ່ອງທາງ.",
    attributes: [a("contact_id", "Identifier", true, "ID ຂອງ Contact", "PK"), a("place_id", "Identifier", true, "Place ເຈົ້າຂອງ", "FK"), a("contact_type", "Enum", true, "Phone | WhatsApp | Facebook | Website | Other"), a("display_value", "Text", true, "ຄ່າທີ່ສະແດງ"), a("normalized_value", "Text", true, "ຄ່າມາດຕະຖານສຳລັບກວດຊ້ຳ/Deep Link"), a("is_primary", "Boolean", true, "ຊ່ອງທາງຫຼັກຂອງ Type ນັ້ນ"), a("verification_status", "Enum", true, "Unverified | Verified | Stale"), a("checked_at", "Timestamp", false, "ເວລາກວດຫຼ້າສຸດ")],
  },
  {
    id: "ENT-007", group: "PLACE CATALOG", name: "Business Hour", lao: "ເວລາເປີດ–ປິດ", owner: "MOD-03, MOD-05", functions: "FN-PLC-001, FN-PADM-002/003, FN-DQ-002/004",
    purpose: "ເກັບເວລາປົກກະຕິຕາມມື້. ຄ່າທີ່ບໍ່ຮູ້ຕ້ອງເປັນ Unknown ບໍ່ແມ່ນປ້ອນເວລາຄາດເດົາ.",
    attributes: [a("business_hour_id", "Identifier", true, "ID ຂອງຊ່ວງເວລາ", "PK"), a("place_id", "Identifier", true, "Place", "FK"), a("day_of_week", "Integer", true, "0–6 ຕາມມາດຕະຖານທີ່ Technical Design ກຳນົດ"), a("open_time", "LocalTime", false, "ເວລາເປີດ"), a("close_time", "LocalTime", false, "ເວລາປິດ"), a("day_status", "Enum", true, "Open | Closed | Unknown | ByAppointment"), a("checked_at", "Timestamp", false, "ເວລາກວດ")],
  },
  {
    id: "ENT-008", group: "PLACE CATALOG", name: "Price Profile", lao: "ລະດັບລາຄາ", owner: "MOD-02, MOD-05", functions: "FN-SRCH-003, FN-PLC-001, FN-DQ-002/004",
    purpose: "ເກັບຊ່ວງລາຄາແບບກວ້າງສຳລັບ Filter ແລະການຕັດສິນໃຈ; ບໍ່ແມ່ນ Menu Catalog ຫຼືລາຄາ Booking.",
    attributes: [a("price_profile_id", "Identifier", true, "ID ຂອງ Price Profile", "PK"), a("place_id", "Identifier", true, "Place", "FK/UK", "MVP ມີສູງສຸດ 1 Active Profile ຕໍ່ Place"), a("price_level", "Enum", false, "Budget | Moderate | Premium"), a("min_amount", "Money", false, "ລາຄາຕ່ຳສຸດທີ່ກວດໄດ້"), a("max_amount", "Money", false, "ລາຄາສູງສຸດທີ່ກວດໄດ້"), a("currency_code", "Code", false, "ສະກຸນເງິນ; LAK ເປັນຄ່າຫຼັກ"), a("verification_status", "Enum", true, "Unverified | Verified | Stale"), a("checked_at", "Timestamp", false, "ເວລາກວດ")],
  },
  {
    id: "ENT-009", group: "PLACE CATALOG", name: "Place Redirect", lao: "ເສັ້ນທາງໄປຫາ Canonical Place", owner: "MOD-03, MOD-05", functions: "FN-PLC-001, FN-PADM-009/010",
    purpose: "ຮັກສາ URL/ID ເກົ່າຫຼັງ Merge ໃຫ້ Redirect ໄປ Canonical Place ໂດຍ Shared Link ແລະປະຫວັດບໍ່ເສຍ.",
    attributes: [a("place_redirect_id", "Identifier", true, "ID ຂອງ Redirect", "PK"), a("source_place_id", "Identifier", true, "Place ທີ່ຖືກ Merge", "FK/UK"), a("canonical_place_id", "Identifier", true, "Place ປາຍທາງ", "FK"), a("old_slug", "Text", true, "Slug ທີ່ຕ້ອງ Redirect", "UK"), a("reason", "Text", true, "ເຫດຜົນການ Merge"), a("created_by_admin_id", "Identifier", true, "Admin ຜູ້ອະນຸມັດ", "FK"), a("created_at", "Timestamp", true, "ເວລາສ້າງ")],
  },
  {
    id: "ENT-010", group: "CONTENT", name: "Creator", lao: "ຜູ້ສ້າງ Content", owner: "MOD-04", functions: "FN-SRC-001/003, FN-FEED-003, FN-PLC-002",
    purpose: "Attribution Identity ຂອງ Creator ຢູ່ Social Platform. ບໍ່ແມ່ນ User Account ຫຼື Creator Login ໃນ MVP.",
    attributes: [a("creator_id", "Identifier", true, "ID ພາຍໃນ", "PK"), a("platform_code", "Enum", true, "TikTok | Facebook | YouTube | Other"), a("platform_creator_key", "Text", false, "ID/Handle ຈາກ Platform"), a("display_name", "Text", true, "ຊື່ທີ່ອ້າງອີງ"), a("profile_url", "URL", true, "Canonical Profile URL"), a("status", "Enum", true, "Active | Unavailable | Restricted"), a("checked_at", "Timestamp", false, "ເວລາກວດຫຼ້າສຸດ")],
  },
  {
    id: "ENT-011", group: "CONTENT", name: "Content Source", lao: "ລິ້ງ Content ຕົ້ນສະບັບ", owner: "MOD-01, MOD-03, MOD-04", functions: "FN-SRC-001—007, FN-FEED-001—005, FN-PLC-002",
    purpose: "Metadata ແລະ Canonical URL ຂອງ Review Video/Post ຢູ່ Platform ຕົ້ນສະບັບ. ລະບົບບໍ່ Re-host ໄຟລ໌ວິດີໂອ.",
    attributes: [a("content_source_id", "Identifier", true, "ID ຂອງ Source", "PK"), a("place_id", "Identifier", true, "Canonical Place ທີ່ Content ກ່າວເຖິງ", "FK"), a("creator_id", "Identifier", true, "Creator ຕົ້ນສະບັບ", "FK"), a("platform_code", "Enum", true, "Platform ຕົ້ນທາງ"), a("canonical_url", "URL", true, "URL ຕົ້ນສະບັບ", "UK"), a("external_content_key", "Text", false, "Content ID ຈາກ Platform"), a("title", "Text", false, "Title/Caption ທີ່ອະນຸຍາດ"), a("preview_url", "URL", false, "Thumbnail/Preview ທີ່ອະນຸຍາດ"), a("embed_reference", "Text", false, "Official Embed Reference; ບໍ່ແມ່ນໄຟລ໌ Media"), a("lifecycle_status", "Enum", true, "Proposed | Checked | Published | Unavailable | Removed"), a("availability_status", "Enum", true, "Unknown | Available | TemporaryFailure | ConfirmedUnavailable | Takedown"), a("checked_at", "Timestamp", false, "ເວລາກວດ Source ຫຼ້າສຸດ"), a("published_at", "Timestamp", false, "ເວລາເຜີຍແຜ່")],
  },
  {
    id: "ENT-012", group: "CONTENT", name: "Source Availability Check", lao: "ປະຫວັດກວດ Source", owner: "MOD-04, MOD-10", functions: "FN-SRC-002/006, FN-DQ-005/006",
    purpose: "ບັນທຶກຜົນທຸກຄັ້ງທີ່ກວດ URL ເພື່ອແຍກບັນຫາຊົ່ວຄາວອອກຈາກ Content ທີ່ຖືກລົບ/Private.",
    attributes: [a("source_check_id", "Identifier", true, "ID ຂອງການກວດ", "PK"), a("content_source_id", "Identifier", true, "Source ທີ່ຖືກກວດ", "FK"), a("check_method", "Enum", true, "Manual | Automated"), a("result", "Enum", true, "Available | TemporaryFailure | ConfirmedUnavailable"), a("response_code", "Text", false, "HTTP/Platform result ທີ່ບໍ່ມີ Secret"), a("failure_reason", "Text", false, "ເຫດຜົນລົ້ມ"), a("checked_by_admin_id", "Identifier", false, "Admin ຖ້າກວດ Manual", "FK"), a("checked_at", "Timestamp", true, "ເວລາກວດ"), a("next_check_at", "Timestamp", false, "ກຳນົດ Retry/Recheck")],
  },
  {
    id: "ENT-013", group: "CONTENT", name: "Takedown Request", lao: "ຄຳຮ້ອງຖອນ Content", owner: "MOD-04, MOD-06", functions: "FN-SRC-007, FN-REQ-006",
    purpose: "ຄຳຮ້ອງຂໍໃຫ້ຖອນ Source ອອກຈາກ Public View ພ້ອມເຫດຜົນ, ຜູ້ຮ້ອງ ແລະຜົນຕັດສິນ.",
    attributes: [a("takedown_request_id", "Identifier", true, "ID ຂອງຄຳຮ້ອງ", "PK"), a("content_source_id", "Identifier", true, "Source ທີ່ຖືກຮ້ອງ", "FK"), a("requester_contact", "ProtectedText", true, "ຊ່ອງທາງຕິດຕໍ່ຜູ້ຮ້ອງ"), a("request_reason", "Text", true, "ເຫດຜົນ/ສິດທີ່ອ້າງ"), a("status", "Enum", true, "Submitted | UnderReview | Approved | Rejected | Closed"), a("received_at", "Timestamp", true, "ເວລາຮັບ"), a("decided_by_admin_id", "Identifier", false, "Admin ຜູ້ຕັດສິນ", "FK"), a("decision_reason", "Text", false, "ເຫດຜົນຕັດສິນ"), a("closed_at", "Timestamp", false, "ເວລາປິດ")],
  },
  {
    id: "ENT-014", group: "TRUST & OPERATIONS", name: "Verification Check", lao: "ການກວດຢືນຢັນຂໍ້ມູນ", owner: "MOD-05, MOD-06, MOD-10", functions: "FN-PADM-002—004, FN-REQ-004, FN-DQ-002/004",
    purpose: "ຫຼັກຖານວ່າ Field ໃດຂອງ Place ຖືກກວດ, ກວດດ້ວຍຫຍັງ, ໃຜກວດ ແລະເມື່ອໃດ. Place ໜຶ່ງຈຶ່ງມີການກວດຫຼາຍຄັ້ງ.",
    attributes: [a("verification_check_id", "Identifier", true, "ID ຂອງການກວດ", "PK"), a("place_id", "Identifier", true, "Place", "FK"), a("field_code", "Code", true, "Field ທີ່ກວດ: Contact | Map | Hours | Status | Price"), a("result", "Enum", true, "Verified | Unverified | Conflicting | Stale"), a("evidence_type", "Enum", true, "SourceLink | OwnerContact | Visit | Other"), a("evidence_reference", "Text", true, "Reference ຫາ Source/Evidence; ຫ້າມໃສ່ Secret"), a("checked_by_admin_id", "Identifier", true, "Admin ຜູ້ກວດ", "FK"), a("checked_at", "Timestamp", true, "ເວລາກວດ"), a("expires_at", "Timestamp", true, "ວັນຄວນກວດຄືນຕາມ 30/60 ວັນ")],
  },
  {
    id: "ENT-015", group: "TRUST & OPERATIONS", name: "Correction Request", lao: "ຄຳຮ້ອງແກ້ໄຂ Place", owner: "MOD-06", functions: "FN-REQ-001—006",
    purpose: "Header ຂອງຄຳຮ້ອງໜຶ່ງຊຸດ. ແຍກລາຍການ Field ທີ່ຂໍແກ້ໄປ Correction Item ເພື່ອໃຫ້ Admin ອະນຸມັດບາງ Item ແລະປະຕິເສດບາງ Item ໄດ້.",
    attributes: [a("correction_request_id", "Identifier", true, "ID ຂອງຄຳຮ້ອງ", "PK"), a("place_id", "Identifier", true, "Place ທີ່ຈະແກ້", "FK"), a("requester_name", "ProtectedText", false, "ຊື່ຜູ້ແຈ້ງ"), a("requester_contact", "ProtectedText", true, "ຊ່ອງທາງແຈ້ງຜົນ"), a("requester_role", "Enum", true, "Owner | Staff | Visitor | Admin | Other"), a("priority", "Enum", true, "Normal | Urgent"), a("status", "Enum", true, "Submitted | UnderReview | NeedsEvidence | Approved | Rejected | Closed"), a("received_at", "Timestamp", true, "ເວລາຮັບ"), a("sla_due_at", "Timestamp", true, "ກຳນົດຕັດສິນ"), a("sla_paused_at", "Timestamp", false, "ເວລາຢຸດ SLA ເມື່ອ NeedsEvidence"), a("assigned_admin_id", "Identifier", false, "Admin ຮັບຜິດຊອບ", "FK"), a("closed_at", "Timestamp", false, "ເວລາປິດ")],
  },
  {
    id: "ENT-016", group: "TRUST & OPERATIONS", name: "Correction Item", lao: "Field ທີ່ຂໍແກ້", owner: "MOD-06", functions: "FN-REQ-001/004/005",
    purpose: "ລາຍການປ່ຽນໜຶ່ງ Field ພາຍໃນ Correction Request ພ້ອມຄ່າເກົ່າ, ຄ່າທີ່ສະເໜີ ແລະຜົນຕັດສິນແຍກລາຍການ.",
    attributes: [a("correction_item_id", "Identifier", true, "ID ຂອງ Item", "PK"), a("correction_request_id", "Identifier", true, "Request ແມ່", "FK"), a("field_code", "Code", true, "Field ທີ່ຂໍປ່ຽນ"), a("current_value_snapshot", "JSON", false, "Snapshot ຄ່າກ່ອນຕັດສິນ"), a("proposed_value", "JSON", true, "ຄ່າໃໝ່ທີ່ສະເໜີ"), a("decision", "Enum", true, "Pending | Approved | Rejected"), a("decision_reason", "Text", false, "ເຫດຜົນຕໍ່ Item"), a("decided_by_admin_id", "Identifier", false, "Admin ຜູ້ຕັດສິນ", "FK"), a("decided_at", "Timestamp", false, "ເວລາຕັດສິນ")],
  },
  {
    id: "ENT-017", group: "TRUST & OPERATIONS", name: "Request Evidence", lao: "ຫຼັກຖານປະກອບຄຳຮ້ອງ", owner: "MOD-06", functions: "FN-REQ-001—004",
    purpose: "Reference ຫາຫຼັກຖານທີ່ໃຊ້ກວດ Correction Item. MVP ອາດເກັບເປັນ URL/Message Reference; File Upload ຂຶ້ນກັບ Technical Design.",
    attributes: [a("request_evidence_id", "Identifier", true, "ID ຂອງຫຼັກຖານ", "PK"), a("correction_request_id", "Identifier", true, "Request ແມ່", "FK"), a("correction_item_id", "Identifier", false, "Item ສະເພາະ; Null ໝາຍເຖິງໃຊ້ກັບທັງ Request", "FK"), a("evidence_type", "Enum", true, "URL | MessageReference | DocumentReference | Other"), a("reference_value", "ProtectedText", true, "Reference ຫາຫຼັກຖານ"), a("submitted_at", "Timestamp", true, "ເວລາຮັບຫຼັກຖານ"), a("validation_status", "Enum", true, "Pending | Valid | Invalid")],
  },
  {
    id: "ENT-018", group: "TRUST & OPERATIONS", name: "Request Communication", lao: "ປະຫວັດສື່ສານກັບຜູ້ຮ້ອງ", owner: "MOD-06", functions: "FN-REQ-003/005/006",
    purpose: "ບັນທຶກການຂໍຫຼັກຖານເພີ່ມ, ແຈ້ງຜົນ ແລະຊ່ອງທາງທີ່ໃຊ້; ບໍ່ໄດ້ເປັນ Messaging System ໃນ Platform.",
    attributes: [a("request_communication_id", "Identifier", true, "ID ຂອງການສື່ສານ", "PK"), a("correction_request_id", "Identifier", true, "Request", "FK"), a("direction", "Enum", true, "Inbound | Outbound"), a("channel", "Enum", true, "Phone | MessagingApp | Email | Other"), a("message_summary", "ProtectedText", true, "ສະຫຼຸບສານທີ່ຈຳເປັນ"), a("admin_id", "Identifier", false, "Admin ຜູ້ບັນທຶກ/ສົ່ງ", "FK"), a("occurred_at", "Timestamp", true, "ເວລາສື່ສານ")],
  },
  {
    id: "ENT-019", group: "TRUST & OPERATIONS", name: "Duplicate Candidate", lao: "ຄູ່ Place ທີ່ອາດຊ້ຳ", owner: "MOD-05", functions: "FN-PADM-001/004/008/009",
    purpose: "ຜົນການກວດຄູ່ Place ທີ່ອາດຈະແມ່ນສະຖານທີ່ດຽວກັນ. ບັນທຶກ Signal/Score ເພື່ອໃຫ້ Admin ຕັດສິນ; ຫ້າມ Auto-merge.",
    attributes: [a("duplicate_candidate_id", "Identifier", true, "ID ຂອງ Candidate Pair", "PK"), a("place_a_id", "Identifier", true, "Place ຝັ່ງ A", "FK"), a("place_b_id", "Identifier", true, "Place ຝັ່ງ B", "FK"), a("match_score", "Decimal", true, "ຄະແນນຊ່ວຍຈັດລຳດັບ; ບໍ່ແມ່ນ Decision"), a("match_signals", "JSON", true, "Name/Phone/Coordinate/Social signals"), a("review_status", "Enum", true, "Pending | NotDuplicate | MergeApproved | Merged"), a("reviewed_by_admin_id", "Identifier", false, "Admin ຜູ້ທົບທວນ", "FK"), a("reviewed_at", "Timestamp", false, "ເວລາທົບທວນ")],
  },
  {
    id: "ENT-020", group: "TRUST & OPERATIONS", name: "Work Item", lao: "ວຽກທີ່ລໍຖ້າ Admin", owner: "MOD-08, MOD-10", functions: "FN-ADM-003, FN-DQ-001/003/005",
    purpose: "Queue Record ສຳລັບ Freshness Review, Source Recheck, Request SLA ຫຼືວຽກຄວບຄຸມອື່ນ. Work Item ອ້າງຫາ Entity ຕົ້ນທາງ ແຕ່ບໍ່ສຳເນົາ Business Data.",
    attributes: [a("work_item_id", "Identifier", true, "ID ຂອງວຽກ", "PK"), a("work_type", "Enum", true, "PlaceReview | SourceRecheck | RequestReview | CampaignReview"), a("subject_type", "Code", true, "Entity Type ຕົ້ນທາງ"), a("subject_id", "Identifier", true, "Entity ID ຕົ້ນທາງ"), a("priority", "Enum", true, "Normal | High | Urgent"), a("status", "Enum", true, "Open | Assigned | Completed | Cancelled"), a("due_at", "Timestamp", true, "ກຳນົດສຳເລັດ"), a("assigned_admin_id", "Identifier", false, "Admin ຮັບຜິດຊອບ", "FK"), a("completed_at", "Timestamp", false, "ເວລາສຳເລັດ")],
  },
  {
    id: "ENT-021", group: "COMMERCIAL", name: "Partner Membership", lao: "ສະຖານະ Founding Partner", owner: "MOD-03, MOD-10", functions: "FN-PLC-003, FN-DQ-001/002, FN-ANA-007",
    purpose: "ແຍກສິດ/ໄລຍະ Founding Partner ອອກຈາກ Verification. Partner ອາດໄດ້ຮັບ Profile/Report ແຕ່ບໍ່ຊື້ຄະແນນ Review ຫຼື Verified Status.",
    attributes: [a("partner_membership_id", "Identifier", true, "ID ຂອງ Membership", "PK"), a("place_id", "Identifier", true, "Place ຄູ່ຮ່ວມ", "FK"), a("plan_code", "Enum", true, "FoundingPilot | FuturePlan"), a("status", "Enum", true, "Pending | Active | Paused | Ended"), a("start_date", "Date", true, "ວັນເລີ່ມ"), a("end_date", "Date", false, "ວັນສິ້ນສຸດ"), a("agreed_monthly_price", "Money", false, "ລາຄາທົດລອງ; ບໍ່ແມ່ນ Payment Record"), a("agreement_reference", "Text", true, "Reference ຫາຂໍ້ຕົກລົງ"), a("created_by_admin_id", "Identifier", true, "Admin ຜູ້ບັນທຶກ", "FK")],
  },
  {
    id: "ENT-022", group: "COMMERCIAL", name: "Sponsored Campaign", lao: "Campaign ໂຄສະນາ", owner: "MOD-01, MOD-02, MOD-07", functions: "FN-CMP-001—005, FN-FEED-001—003, FN-SRCH-004",
    purpose: "ຂໍ້ຕົກລົງໃຫ້ Place ສະແດງໃນພື້ນທີ່ Sponsored ຕາມ Placement ແລະໄລຍະ. ບໍ່ປ່ຽນ Verification ຫຼື Organic Review.",
    attributes: [a("campaign_id", "Identifier", true, "ID ຂອງ Campaign", "PK"), a("place_id", "Identifier", true, "Place ທີ່ໂຄສະນາ", "FK"), a("placement_code", "Enum", true, "Feed | Search | Category | OtherApproved"), a("label_text", "Text", true, "ປ້າຍ Sponsored ທີ່ອະນຸມັດ"), a("start_at", "Timestamp", true, "ເລີ່ມສະແດງ"), a("end_at", "Timestamp", true, "ສິ້ນສຸດສະແດງ", undefined, "end_at > start_at"), a("status", "Enum", true, "Draft | Scheduled | Active | Paused | Ended"), a("agreed_price", "Money", false, "ລາຄາ Campaign ທີ່ຕົກລົງ"), a("agreement_reference", "Text", true, "Reference ຫາ Invoice/Agreement; ບໍ່ແມ່ນ Payment Transaction"), a("created_by_admin_id", "Identifier", true, "Admin ຜູ້ສ້າງ", "FK"), a("created_at / updated_at", "Timestamp", true, "ເວລາສ້າງ/ປ່ຽນ")],
  },
  {
    id: "ENT-023", group: "PLATFORM CONTROL", name: "Admin User", lao: "ຜູ້ໃຊ້ຝັ່ງ Admin", owner: "MOD-08", functions: "FN-ADM-001—004; privileged commands",
    purpose: "Identity ຂອງ Admin ແຕ່ລະຄົນ. Pilot ມີ FullAdmin Role ດຽວແຕ່ຫ້າມ Shared Account ແລະກະກຽມແຍກ Role ໃນອະນາຄົດ.",
    attributes: [a("admin_user_id", "Identifier", true, "ID ພາຍໃນ", "PK"), a("auth_subject", "Text", true, "ID ຈາກ Authentication Provider", "UK"), a("display_name", "Text", true, "ຊື່ Admin"), a("email", "ProtectedText", true, "Email ສຳລັບ Identity", "UK"), a("role_code", "Enum", true, "FullAdmin; ກະກຽມ Operator/Approver"), a("status", "Enum", true, "Invited | Active | Suspended | Deactivated"), a("last_login_at", "Timestamp", false, "ເວລາ Login ຫຼ້າສຸດ"), a("created_at", "Timestamp", true, "ເວລາສ້າງ")],
  },
  {
    id: "ENT-024", group: "PLATFORM CONTROL", name: "Audit Log", lao: "ປະຫວັດການປ່ຽນ", owner: "MOD-08", functions: "FN-ADM-004; all privileged commands",
    purpose: "Append-only Record ວ່າ Admin/Job ໃດເຮັດ Action ໃດກັບ Entity ໃດ, ຄ່າກ່ອນ–ຫຼັງເປັນແນວໃດ ແລະເຫດຜົນຫຍັງ.",
    attributes: [a("audit_log_id", "Identifier", true, "ID ຂອງ Log", "PK"), a("actor_admin_id", "Identifier", false, "Admin ຜູ້ເຮັດ; Null ໄດ້ສຳລັບ System Job", "FK"), a("actor_type", "Enum", true, "Admin | System"), a("action_code", "Code", true, "Create | Update | Publish | Suspend | Merge | Decide | Other"), a("entity_type", "Code", true, "ປະເພດ Entity ທີ່ຖືກປ່ຽນ"), a("entity_id", "Identifier", true, "ID ຂອງ Entity ທີ່ຖືກປ່ຽນ"), a("before_snapshot", "JSON", false, "ຄ່າກ່ອນ Action"), a("after_snapshot", "JSON", false, "ຄ່າຫຼັງ Action"), a("reason", "Text", true, "ເຫດຜົນ/Reference"), a("occurred_at", "Timestamp", true, "Server timestamp"), a("correlation_id", "Identifier", true, "ເຊື່ອມ Log ຫຼາຍລາຍການໃນ Command ດຽວ")],
  },
  {
    id: "ENT-025", group: "MEASUREMENT", name: "Anonymous Session", lao: "Session ແບບບໍ່ລະບຸຕົວຕົນ", owner: "MOD-09", functions: "FN-ANA-001—005",
    purpose: "ກຸ່ມ Interaction ຈາກ Browser Session ທີ່ບໍ່ຜູກກັບຊື່, ເບີໂທ ຫຼື User Account. ສ້າງສະເພາະຕາມ Consent Policy.",
    attributes: [a("anonymous_session_id", "Identifier", true, "Random pseudonymous ID", "PK"), a("consent_mode", "Enum", true, "EssentialOnly | AnalyticsAllowed"), a("started_at", "Timestamp", true, "ເວລາເລີ່ມ"), a("last_seen_at", "Timestamp", true, "ເວລາ Event ຫຼ້າສຸດ"), a("expires_at", "Timestamp", true, "ເວລາ Session ໝົດອາຍຸ"), a("locale", "Code", false, "ພາສາ UI"), a("coarse_device_type", "Enum", false, "Mobile | Desktop | Tablet; ຫ້າມ Fingerprinting")],
  },
  {
    id: "ENT-026", group: "MEASUREMENT", name: "Analytics Event", lao: "ເຫດການການນຳໃຊ້", owner: "MOD-09", functions: "FN-ANA-003/004/006/007",
    purpose: "Append-only Event ຕາມ Event Dictionary ເຊັ່ນ FeedView, Search, PlaceOpen, SourceClick, Save, Share. ຮັບສະເພາະ Field Allowlist ແລະບໍ່ເກັບ PII.",
    attributes: [a("analytics_event_id", "Identifier", true, "ID ຂອງ Event", "PK"), a("anonymous_session_id", "Identifier", true, "Session", "FK"), a("event_name", "Code", true, "ຊື່ຈາກ Event Dictionary"), a("place_id", "Identifier", false, "Place ທີ່ກ່ຽວຂ້ອງ", "FK"), a("content_source_id", "Identifier", false, "Source ທີ່ກ່ຽວຂ້ອງ", "FK"), a("campaign_id", "Identifier", false, "Campaign Attribution", "FK"), a("properties", "JSON", false, "Allowlisted non-PII properties"), a("client_occurred_at", "Timestamp", false, "ເວລາຈາກ Client ສຳລັບປະກອບ"), a("received_at", "Timestamp", true, "Server timestamp ທີ່ໃຊ້ເປັນຫຼັກ"), a("validation_version", "Code", true, "Event Dictionary version")],
  },
  {
    id: "ENT-027", group: "MEASUREMENT", name: "Decision Intent", lao: "ເຈດຕະນາຕັດສິນໃຈ", owner: "MOD-03, MOD-09", functions: "FN-ACT-001—003, FN-ANA-005—007, FN-CMP-005",
    purpose: "Event ທີ່ຜ່ານການ Deduplicate ສຳລັບ Map/Call/Message. ເປັນຫຼັກຖານຄວາມຕັ້ງໃຈ ບໍ່ແມ່ນການໄປຮ້ານ, ການຈອງ ຫຼືຍອດຂາຍ.",
    attributes: [a("decision_intent_id", "Identifier", true, "ID ຂອງ Unique Intent", "PK"), a("analytics_event_id", "Identifier", true, "Event ຕົ້ນທາງ", "FK/UK"), a("anonymous_session_id", "Identifier", true, "Session", "FK"), a("place_id", "Identifier", true, "Place ປາຍທາງ", "FK"), a("campaign_id", "Identifier", false, "Campaign Attribution", "FK"), a("action_type", "Enum", true, "Map | Call | Message"), a("dedupe_key", "Text", true, "Key ສຳລັບບໍ່ນັບ rapid repeat", "UK"), a("occurred_at", "Timestamp", true, "ເວລາ Intent"), a("definition_version", "Code", true, "Version ຂອງ Dedupe Rule")],
  },
];

const relationships: Relationship[] = [
  { id: "REL-001", from: "Area", fromCardinality: "1", to: "Place", toCardinality: "0..*", meaning: "Area ໜຶ່ງມີຫຼາຍ Place; Place ຕ້ອງຢູ່ Area ໜຶ່ງ", enforcement: "Place.area_id ບັງຄັບ; ຫ້າມລົບ Area ທີ່ຍັງຖືກໃຊ້" },
  { id: "REL-002", from: "Area", fromCardinality: "0..1", to: "Area", toCardinality: "0..*", meaning: "Area ມີ Parent/Children ເພື່ອສ້າງລຳດັບຊັ້ນ", enforcement: "parent_area_id ຫ້າມຊີ້ຕົນເອງ ແລະຫ້າມເກີດ Cycle" },
  { id: "REL-003", from: "Place", fromCardinality: "1", to: "Place Alias", toCardinality: "0..*", meaning: "Place ມີຊື່ອື່ນຫຼາຍຊື່", enforcement: "Alias ຖືກລວມໄປ Canonical Place ເມື່ອ Merge" },
  { id: "REL-004", from: "Place", fromCardinality: "1", to: "Place Category", toCardinality: "1..*", meaning: "Place ຕ້ອງມີ Category ຢ່າງໜ້ອຍ 1", enforcement: "Unique(place_id, category_id); Primary ສູງສຸດ 1" },
  { id: "REL-005", from: "Category", fromCardinality: "1", to: "Place Category", toCardinality: "0..*", meaning: "Category ໜຶ່ງຖືກໃຊ້ໂດຍ Place ຫຼາຍແຫ່ງ", enforcement: "Deactivate ແທນ Delete ເມື່ອຖືກອ້າງອີງ" },
  { id: "REL-006", from: "Category", fromCardinality: "0..1", to: "Category", toCardinality: "0..*", meaning: "Category ສາມາດມີ Parent Category", enforcement: "ຫ້າມ Self-reference/Cycle" },
  { id: "REL-007", from: "Place", fromCardinality: "1", to: "Place Contact", toCardinality: "0..*", meaning: "Place ມີຊ່ອງທາງຕິດຕໍ່ຫຼາຍອັນ", enforcement: "Contact ຖືກ Reassign ເມື່ອ Merge; ບໍ່ລົບແບບ Cascade ໂດຍບໍ່ມີ Audit" },
  { id: "REL-008", from: "Place", fromCardinality: "1", to: "Business Hour", toCardinality: "0..*", meaning: "Place ມີເວລາໄດ້ຫຼາຍຊ່ວງຕາມມື້", enforcement: "ຊ່ວງເວລາໃນມື້ດຽວຫ້າມຊ້ອນກັນ" },
  { id: "REL-009", from: "Place", fromCardinality: "1", to: "Price Profile", toCardinality: "0..1", meaning: "Place ອາດມີ Price Profile ໜຶ່ງ", enforcement: "Unknown ໃຊ້ Null + status; ຫ້າມຄາດເດົາ" },
  { id: "REL-010", from: "Creator", fromCardinality: "1", to: "Content Source", toCardinality: "0..*", meaning: "Creator ໜຶ່ງມີ Content ຫຼາຍອັນ", enforcement: "Content ທຸກອັນຕ້ອງມີ Attribution" },
  { id: "REL-011", from: "Place", fromCardinality: "1", to: "Content Source", toCardinality: "0..*", meaning: "Place ໜຶ່ງມີ Review Source ຫຼາຍອັນ; Source ຊີ້ Place ຫຼັກໜຶ່ງ", enforcement: "Reassign ໄປ Canonical Place ເມື່ອ Merge" },
  { id: "REL-012", from: "Content Source", fromCardinality: "1", to: "Source Availability Check", toCardinality: "0..*", meaning: "Source ມີປະຫວັດການກວດຫຼາຍຄັ້ງ", enforcement: "ຜົນຫຼ້າສຸດປັບ current availability ແຕ່ບໍ່ລົບປະຫວັດ" },
  { id: "REL-013", from: "Content Source", fromCardinality: "1", to: "Takedown Request", toCardinality: "0..*", meaning: "Source ອາດຖືກຮ້ອງຖອນຫຼາຍຄັ້ງ", enforcement: "Open request ຖອນ Source ຈາກ Public View ທັນທີ" },
  { id: "REL-014", from: "Place", fromCardinality: "1", to: "Verification Check", toCardinality: "0..*", meaning: "Field ຂອງ Place ຖືກກວດຫຼາຍຄັ້ງ", enforcement: "Freshness ຄຳນວນຈາກ Check ຫຼ້າສຸດຕໍ່ Field" },
  { id: "REL-015", from: "Place", fromCardinality: "1", to: "Correction Request", toCardinality: "0..*", meaning: "Place ມີຄຳຮ້ອງແກ້ໄຂຫຼາຍຊຸດ", enforcement: "Merge ຕ້ອງຍ້າຍ Request ໄປ Canonical Place" },
  { id: "REL-016", from: "Correction Request", fromCardinality: "1", to: "Correction Item", toCardinality: "1..*", meaning: "Request ໜຶ່ງຕ້ອງມີ Field ທີ່ຂໍແກ້ຢ່າງໜ້ອຍ 1", enforcement: "ຜົນລວມ Request ຕ້ອງສອດຄ່ອງກັບ Item decisions" },
  { id: "REL-017", from: "Correction Request", fromCardinality: "1", to: "Request Evidence", toCardinality: "0..*", meaning: "Request ມີຫຼັກຖານຫຼາຍອັນ", enforcement: "Evidence ອາດຜູກກັບ Item ສະເພາະ" },
  { id: "REL-018", from: "Correction Item", fromCardinality: "0..1", to: "Request Evidence", toCardinality: "0..*", meaning: "Evidence ອາດຮອງຮັບ Item ໜຶ່ງ", enforcement: "Item ຕ້ອງຢູ່ Request ດຽວກັບ Evidence" },
  { id: "REL-019", from: "Correction Request", fromCardinality: "1", to: "Request Communication", toCardinality: "0..*", meaning: "Request ມີປະຫວັດສື່ສານ", enforcement: "Append-only; ຫ້າມປ່ຽນສານເກົ່າ" },
  { id: "REL-020", from: "Place (A/B role)", fromCardinality: "1", to: "Duplicate Candidate", toCardinality: "0..*", meaning: "Candidate ທຸກລາຍການອ້າງ Place ສອງບົດບາດ: A ແລະ B", enforcement: "place_a_id ≠ place_b_id; canonical ordering ປ້ອງກັນ A–B ຊ້ຳ B–A" },
  { id: "REL-021", from: "Place", fromCardinality: "1", to: "Place Redirect", toCardinality: "0..*", meaning: "Canonical Place ຮັບ Redirect ຈາກ Place ທີ່ Merge", enforcement: "source_place_id ແລະ canonical_place_id ຫ້າມເທົ່າກັນ" },
  { id: "REL-022", from: "Place", fromCardinality: "1", to: "Partner Membership", toCardinality: "0..*", meaning: "Place ມີປະຫວັດ Membership ຫຼາຍໄລຍະ", enforcement: "Active Membership ສູງສຸດ 1 ຕໍ່ Plan" },
  { id: "REL-023", from: "Place", fromCardinality: "1", to: "Sponsored Campaign", toCardinality: "0..*", meaning: "Place ມີ Campaign ຫຼາຍຄັ້ງ", enforcement: "Active ໄດ້ເມື່ອ Place Published ແລະຢູ່ໃນໄລຍະ" },
  { id: "REL-024", from: "Admin User", fromCardinality: "1", to: "Audit Log", toCardinality: "0..*", meaning: "Admin ສ້າງ Audit Log ຫຼາຍລາຍການ", enforcement: "Deactivate Admin ແທນ Delete ເພື່ອຮັກສາ Actor" },
  { id: "REL-025", from: "Admin User", fromCardinality: "1", to: "Verification Check", toCardinality: "0..*", meaning: "Admin ກວດ Place ຫຼາຍຄັ້ງ", enforcement: "Manual verification ຕ້ອງມີ Admin" },
  { id: "REL-026", from: "Admin User", fromCardinality: "0..1", to: "Work Item", toCardinality: "0..*", meaning: "Work Item ອາດຖືກມອບໃຫ້ Admin", enforcement: "Unassigned ອະນຸຍາດ; Completed ຕ້ອງມີ outcome" },
  { id: "REL-027", from: "Anonymous Session", fromCardinality: "1", to: "Analytics Event", toCardinality: "0..*", meaning: "Session ມີ Event ຫຼາຍອັນ", enforcement: "Event Optional ຮັບໄດ້ເມື່ອ consent = AnalyticsAllowed" },
  { id: "REL-028", from: "Analytics Event", fromCardinality: "1", to: "Decision Intent", toCardinality: "0..1", meaning: "Action Event ອາດກາຍເປັນ Unique Decision Intent", enforcement: "Unique analytics_event_id; rapid repeat ບໍ່ສ້າງ Intent ໃໝ່" },
  { id: "REL-029", from: "Place", fromCardinality: "1", to: "Analytics Event", toCardinality: "0..*", meaning: "Event ອາດອ້າງຫາ Place", enforcement: "Place reference ຕ້ອງ Reassign ເມື່ອ Merge; ບໍ່ລົບ Event" },
  { id: "REL-030", from: "Content Source", fromCardinality: "1", to: "Analytics Event", toCardinality: "0..*", meaning: "Event ອາດອ້າງຫາ Source", enforcement: "Source ຖືກຖອນແລ້ວຍັງຮັກສາ Historical Event" },
  { id: "REL-031", from: "Sponsored Campaign", fromCardinality: "1", to: "Analytics Event", toCardinality: "0..*", meaning: "Event ອາດມີ Campaign Attribution", enforcement: "campaign_id ຕ້ອງ Active ໃນເວລາທີ່ສະແດງ" },
  { id: "REL-032", from: "Place", fromCardinality: "1", to: "Decision Intent", toCardinality: "0..*", meaning: "Place ຮັບ Map/Call/Message Intent", enforcement: "ຫ້າມຕີຄວາມເປັນ Visit/Sale" },
  { id: "REL-033", from: "Sponsored Campaign", fromCardinality: "0..1", to: "Decision Intent", toCardinality: "0..*", meaning: "Intent ອາດ Attribution ໄປ Campaign", enforcement: "ຮັກສາ Organic Intent ໂດຍ campaign_id = Null" },
  { id: "REL-034", from: "Place (merged source)", fromCardinality: "1", to: "Place Redirect", toCardinality: "0..1", meaning: "Place ທີ່ຖືກ Merge ມີ Redirect ປາຍທາງໜຶ່ງ", enforcement: "source_place_id ບໍ່ຊ້ຳ ແລະ Source Place ບໍ່ກັບມາ Published" },
  { id: "REL-035", from: "Admin User", fromCardinality: "0..1", to: "Source Availability Check", toCardinality: "0..*", meaning: "Manual Source Check ອາດບັນທຶກ Admin ຜູ້ກວດ", enforcement: "Automated check ໃຊ້ Null; Manual check ຕ້ອງມີ Admin" },
  { id: "REL-036", from: "Admin User", fromCardinality: "0..1", to: "Takedown Request", toCardinality: "0..*", meaning: "Admin ຕັດສິນ Takedown Request", enforcement: "Approved/Rejected ຕ້ອງມີ decided_by_admin_id ແລະ reason" },
  { id: "REL-037", from: "Admin User", fromCardinality: "0..1", to: "Correction Request", toCardinality: "0..*", meaning: "Correction Request ອາດຖືກມອບໃຫ້ Admin", enforcement: "Unassigned ໄດ້; UnderReview ຕ້ອງມີ assigned_admin_id" },
  { id: "REL-038", from: "Admin User", fromCardinality: "0..1", to: "Correction Item", toCardinality: "0..*", meaning: "Admin ຕັດສິນແຕ່ລະ Correction Item", enforcement: "Approved/Rejected Item ຕ້ອງມີ Admin, reason ແລະ decided_at" },
  { id: "REL-039", from: "Admin User", fromCardinality: "0..1", to: "Request Communication", toCardinality: "0..*", meaning: "Outbound communication ຖືກບັນທຶກໂດຍ Admin", enforcement: "Outbound ຕ້ອງມີ admin_id; Inbound ອາດເປັນ Null" },
  { id: "REL-040", from: "Admin User", fromCardinality: "0..1", to: "Duplicate Candidate", toCardinality: "0..*", meaning: "Admin ທົບທວນ Duplicate Candidate", enforcement: "ສະຖານະທີ່ຕັດສິນແລ້ວຕ້ອງມີ reviewed_by_admin_id" },
  { id: "REL-041", from: "Admin User", fromCardinality: "1", to: "Partner Membership", toCardinality: "0..*", meaning: "Admin ບັນທຶກ Membership", enforcement: "Membership ທຸກອັນຕ້ອງມີ created_by_admin_id" },
  { id: "REL-042", from: "Admin User", fromCardinality: "1", to: "Sponsored Campaign", toCardinality: "0..*", meaning: "Admin ສ້າງ Campaign", enforcement: "Campaign ທຸກອັນຕ້ອງມີ created_by_admin_id" },
  { id: "REL-043", from: "Anonymous Session", fromCardinality: "1", to: "Decision Intent", toCardinality: "0..*", meaning: "Session ໜຶ່ງອາດສ້າງ Unique Intent ຫຼາຍອັນ", enforcement: "Session ຂອງ Intent ຕ້ອງກົງກັບ Analytics Event ຕົ້ນທາງ" },
];

const groupOrder = ["PLACE CATALOG", "CONTENT", "TRUST & OPERATIONS", "COMMERCIAL", "PLATFORM CONTROL", "MEASUREMENT"];
const totalAttributes = entities.reduce((sum, entity) => sum + entity.attributes.length, 0);

const moduleCoverage = [
  ["MOD-01 Discovery Feed", "Place, Content Source, Creator, Sponsored Campaign", "Read Model ສ້າງຈາກ Published/Active records; ບໍ່ມີ Feed Item table ໃນ Logical Source of Truth"],
  ["MOD-02 Search & Filter", "Place, Place Alias, Category, Place Category, Area, Price Profile", "Search index ເປັນ Physical Read Model ທີ່ຈະກຳນົດໃນ Technical Design"],
  ["MOD-03 Place Detail & Actions", "Place ແລະ child entities, Content Source, Partner Membership, Campaign, Decision Intent", "Place Detail ເປັນ Composite View; Save ຢູ່ Device ຈຶ່ງບໍ່ມີ Server Entity"],
  ["MOD-04 Content Source", "Creator, Content Source, Source Availability Check, Takedown Request", "Canonical URL ແລະ Attribution ເປັນຂໍ້ບັງຄັບ"],
  ["MOD-05 Place Data", "Place, Alias, Category relation, Contact, Hours, Price, Redirect, Duplicate Candidate, Verification", "Canonical Place ເປັນ Aggregate Root; Merge ຕ້ອງຍ້າຍ relationship ແລະສ້າງ Redirect"],
  ["MOD-06 Correction & Request", "Correction Request, Correction Item, Evidence, Communication, Takedown Request", "ການອະນຸມັດຕໍ່ Item ປ້ອງກັນການແກ້ທັງ Request ໂດຍບໍ່ແຍກ Field"],
  ["MOD-07 Sponsored Campaign", "Sponsored Campaign, Place, Analytics Event, Decision Intent", "Campaign ບໍ່ມີ Payment/Invoice Transaction ໃນ MVP"],
  ["MOD-08 Admin & Audit", "Admin User, Audit Log, Work Item", "Authentication Session/Token ເປັນ Technical Security Model ບໍ່ແມ່ນ Business Entity"],
  ["MOD-09 Analytics", "Anonymous Session, Analytics Event, Decision Intent", "Aggregate Report ເປັນ Derived Data; ບໍ່ກຳນົດ Summary table ໃນ Logical Model"],
  ["MOD-10 Data Quality", "Verification Check, Source Availability Check, Work Item, Place/Source current status", "ປະຫວັດ Check ເປັນ Source of Truth; current status ເປັນຄ່າສະຫຼຸບສຳລັບ Query"],
] as const;

export default function SystemAnalysisDataModel() {
  return (
    <section className={styles.saDataModel} id="sa-logical-data-model">
      <header className={styles.saPartHeader}>
        <span>ພາກ C · ຂັ້ນ 2 ຂອງ SA</span>
        <h2>Logical Data Model & ERD</h2>
        <p>ພາກນີ້ແປ Data Read/Write ຈາກ 64 Functions ໃຫ້ເປັນ {entities.length} Logical Entities, {totalAttributes} Attributes ແລະ {relationships.length} Relationships ທີ່ມີ Cardinality ຊັດເຈນ. ຈຸດປະສົງແມ່ນໃຫ້ Developer ເຫັນວ່າຂໍ້ມູນໃດເປັນ Master, Transaction, Reference, Audit ຫຼື Event ແລະເຊື່ອມກັນແນວໃດ.</p>
        <p>Logical Model ບໍ່ແມ່ນ Physical Database Schema: Identifier format, SQL type, index, partition, database engine ແລະ migration syntax ຈະຖືກກຳນົດໃນ Technical Design. ແຕ່ Entity boundary, Key, Required/Optional, Relationship ແລະ Integrity Rule ໃນພາກນີ້ເປັນ Baseline ທີ່ Physical Schema ຕ້ອງຮັກສາ.</p>
      </header>

      <div className={styles.saCatalogSummary}>
        <article><small>LOGICAL ENTITIES</small><strong>{entities.length}</strong><p>6 Data Domains ທີ່ແຍກຂອບເຂດຊັດເຈນ</p></article>
        <article><small>ATTRIBUTES</small><strong>{totalAttributes}</strong><p>ລະບຸ Type, Key, Required ແລະ Constraint</p></article>
        <article><small>RELATIONSHIPS</small><strong>{relationships.length}</strong><p>Cardinality ແລະ Referential Rule ທຸກຄູ່</p></article>
        <article><small>STEP STATUS</small><strong>DONE</strong><p>Workflow & Sequence ຖືກຈັດເຮັດຕໍ່ໃນພາກ D</p></article>
      </div>

      <section className={styles.documentArticleSection}>
        <span>C1 · MODELING RULES</span>
        <h2>ຫຼັກການອ່ານ Logical Model</h2>
        <div className={styles.saModelRules}>
          <article><b>IDENTITY</b><strong>PK / UK</strong><p>PK ແມ່ນ ID ຫຼັກ; UK ແມ່ນຄ່າທີ່ຫ້າມຊ້ຳ. URL, code ແລະ external key ບໍ່ຄວນໃຊ້ແທນ Internal ID.</p></article>
          <article><b>RELATION</b><strong>FK</strong><p>FK ຊີ້ໄປ Entity ເຈົ້າຂອງ. Required FK ຫ້າມເປັນ Null; Optional FK ຈະລະບຸ 0..1.</p></article>
          <article><b>CARDINALITY</b><strong>1 · 0..1 · 0..*</strong><p>1 = ຕ້ອງມີໜຶ່ງ, 0..1 = ອາດບໍ່ມີ ຫຼືມີໜຶ່ງ, 0..* = ອາດມີຫຼາຍ.</p></article>
          <article><b>UNKNOWN</b><strong>Null + Status</strong><p>ຂໍ້ມູນທີ່ກວດບໍ່ໄດ້ໃຊ້ Null ພ້ອມ Verification Status; ຫ້າມໃຊ້ 0, “N/A” ຫຼືຄ່າຄາດເດົາ.</p></article>
          <article><b>HISTORY</b><strong>Append / Soft State</strong><p>Audit, Event ແລະ Check History ເພີ່ມ Record ໃໝ່. Place/Source/Admin ປ່ຽນ State ແທນ Hard Delete.</p></article>
          <article><b>PROTECTED</b><strong>Minimum PII</strong><p>Requester contact ແລະ Admin email ເປັນ ProtectedText; Analytics ຫ້າມຮັບ PII.</p></article>
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>C2 · LOGICAL ERD</span>
        <h2>ພາບລວມ Entity Relationship</h2>
        <p className={styles.documentQuestion}>Place ເປັນສູນກາງຂອງຂໍ້ມູນ ແຕ່ຈະແຍກ Content, Trust, Revenue ແລະ Analytics ອອກຈາກກັນແນວໃດ?</p>
        <div className={styles.documentProse}>
          <p>Place ແມ່ນ Aggregate Root ຂອງ Catalog. Category, Contact, Hours, Price ແລະ Alias ຊ່ວຍອະທິບາຍ Place; Content Source ອ້າງຫາ Place ແຕ່ມີ Lifecycle ຂອງຕົນ; Correction/Verification ຮັກສາຫຼັກຖານ; Partner/Campaign ແຍກສະຖານະການຈ່າຍອອກຈາກ Trust; Analytics ອ້າງ ID ເພື່ອວັດຜົນແຕ່ບໍ່ປ່ຽນ Business Record.</p>
        </div>
        <div className={styles.saErd} aria-label="Logical entity relationship overview">
          <div className={styles.saErdLane}><small>CATALOG</small><div><b>AREA</b><i>1 → 0..*</i><strong>PLACE</strong><i>1 → 0..*</i><b>CONTACT · HOURS · ALIAS</b></div><div><b>CATEGORY</b><i>1 → 0..*</i><strong>PLACE CATEGORY</strong><i>0..* → 1</i><b>PLACE</b></div></div>
          <div className={styles.saErdLane}><small>CONTENT</small><div><b>CREATOR</b><i>1 → 0..*</i><strong>CONTENT SOURCE</strong><i>0..* → 1</i><b>PLACE</b></div><div><b>CONTENT SOURCE</b><i>1 → 0..*</i><strong>AVAILABILITY CHECK</strong><i> / </i><strong>TAKEDOWN</strong></div></div>
          <div className={styles.saErdLane}><small>TRUST & OPERATIONS</small><div><b>PLACE</b><i>1 → 0..*</i><strong>VERIFICATION</strong><i> / </i><strong>CORRECTION REQUEST</strong></div><div><b>REQUEST</b><i>1 → 1..*</i><strong>CORRECTION ITEM</strong><i>1 → 0..*</i><b>EVIDENCE</b></div></div>
          <div className={styles.saErdLane}><small>COMMERCIAL</small><div><b>PLACE</b><i>1 → 0..*</i><strong>PARTNER MEMBERSHIP</strong><i> / </i><strong>SPONSORED CAMPAIGN</strong></div><div><b>CAMPAIGN</b><i>1 → 0..*</i><strong>ANALYTICS EVENT</strong><i>0..1 → 0..*</i><b>DECISION INTENT</b></div></div>
          <div className={styles.saErdLane}><small>CONTROL & MEASUREMENT</small><div><b>ADMIN USER</b><i>1 → 0..*</i><strong>AUDIT LOG</strong><i> / </i><strong>WORK ITEM</strong></div><div><b>ANONYMOUS SESSION</b><i>1 → 0..*</i><strong>ANALYTICS EVENT</strong><i>1 → 0..1</i><b>DECISION INTENT</b></div></div>
        </div>
        <p className={styles.saModelNote}>ERD ນີ້ສະແດງເສັ້ນທາງຫຼັກເພື່ອໃຫ້ອ່ານງ່າຍ. Relationship Catalog ດ້ານລຸ່ມແມ່ນ Source of Truth ທີ່ລະບຸຄົບ {relationships.length} ຄວາມສຳພັນ.</p>
      </section>

      <section className={styles.documentArticleSection}>
        <span>C3 · ENTITY DICTIONARY</span>
        <h2>{entities.length} Entities ແລະ Attribute Definitions</h2>
        <p className={styles.documentQuestion}>Developer ຈະຮູ້ໄດ້ແນວໃດວ່າ Field ໃດບັງຄັບ, Field ໃດເປັນ Key ແລະຂໍ້ມູນນັ້ນມີຄວາມໝາຍຫຍັງ?</p>
        <div className={styles.saEntityGroups}>
          {groupOrder.map((group) => {
            const groupEntities = entities.filter((entity) => entity.group === group);
            return <section key={group}>
              <header><small>{group}</small><strong>{groupEntities.length} Entities</strong></header>
              {groupEntities.map((entity, index) => <details key={entity.id} open={group === "PLACE CATALOG" && index === 0}>
                <summary><span>{entity.id}</span><div><strong>{entity.name}</strong><small>{entity.lao}</small></div><em>{entity.attributes.length} Attributes</em></summary>
                <div className={styles.saEntityIntro}><p>{entity.purpose}</p><div><b>OWNER MODULE</b><span>{entity.owner}</span></div><div><b>FUNCTION COVERAGE</b><span>{entity.functions}</span></div></div>
                <div className={styles.saAttributeTable} role="table" aria-label={`${entity.name} attribute dictionary`}>
                  <div role="row"><b>ATTRIBUTE</b><b>TYPE / KEY</b><b>REQUIRED</b><b>MEANING</b><b>CONSTRAINT</b></div>
                  {entity.attributes.map((attribute) => <div role="row" key={attribute.name}><code>{attribute.name}</code><div><strong>{attribute.type}</strong>{attribute.key && <small>{attribute.key}</small>}</div><span className={attribute.required ? styles.saRequired : styles.saOptional}>{attribute.required ? "YES" : "NO"}</span><p>{attribute.description}</p><p>{attribute.rule ?? "—"}</p></div>)}
                </div>
              </details>)}
            </section>;
          })}
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>C4 · RELATIONSHIP CATALOG</span>
        <h2>Cardinality ແລະ Referential Integrity</h2>
        <div className={styles.saRelationshipTable} role="table" aria-label="Logical relationship catalog">
          <div role="row"><b>ID</b><b>FROM</b><b>CARDINALITY</b><b>TO</b><b>BUSINESS MEANING</b><b>INTEGRITY RULE</b></div>
          {relationships.map((relationship) => <div role="row" key={relationship.id}><b>{relationship.id}</b><strong>{relationship.from}</strong><code>{relationship.fromCardinality} → {relationship.toCardinality}</code><strong>{relationship.to}</strong><p>{relationship.meaning}</p><p>{relationship.enforcement}</p></div>)}
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>C5 · FUNCTION–DATA COVERAGE</span>
        <h2>10 Modules ອ່ານ ແລະປ່ຽນ Entity ໃດ</h2>
        <div className={styles.saCoverageTable} role="table" aria-label="Module to entity coverage">
          <div role="row"><b>MODULE</b><b>LOGICAL ENTITIES / READ MODELS</b><b>BOUNDARY DECISION</b></div>
          {moduleCoverage.map(([module, model, decision]) => <div role="row" key={module}><strong>{module}</strong><p>{model}</p><p>{decision}</p></div>)}
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>C6 · INTEGRITY & LIFECYCLE</span>
        <h2>ກົດທີ່ Physical Schema ແລະ Service ຕ້ອງຮັກສາ</h2>
        <ol className={styles.reviewDecisions}>
          <li><b>01 · NO HARD DELETE</b><div><strong>Place, Source, Admin:</strong><p>ໃຊ້ Lifecycle Status. ການປິດ/ຖອນ/Deactivate ຕ້ອງຮັກສາປະຫວັດ, Link ແລະ Audit; Hard Delete ອະນຸຍາດສະເພາະຂໍ້ມູນທົດສອບ ຫຼືຕາມ Data Removal Policy ທີ່ອະນຸມັດ.</p></div></li>
          <li><b>02 · MERGE TRANSACTION</b><div><strong>Place Merge ຕ້ອງ Atomic:</strong><p>ຍ້າຍ Source, Contact, Category, Request, Campaign, Verification ແລະ Analytics Reference ໄປ Canonical Place; ສ້າງ Redirect/Audit ແລ້ວຈຶ່ງປ່ຽນ Source Place ເປັນ Archived/Merged. ຖ້າຂັ້ນໃດລົ້ມ ຕ້ອງ Rollback ທັງໝົດ.</p></div></li>
          <li><b>03 · TRUST IS SEPARATE</b><div><strong>Verification ≠ Partner ≠ Sponsored:</strong><p>Verification Check ອີງຫຼັກຖານ; Partner Membership ອີງຂໍ້ຕົກລົງ; Sponsored Campaign ອີງໄລຍະໂຄສະນາ. ຫ້າມໃຊ້ Field ດຽວກັນແທນສາມຄວາມໝາຍ.</p></div></li>
          <li><b>04 · APPEND-ONLY EVIDENCE</b><div><strong>Audit, Check, Communication, Event:</strong><p>ບໍ່ປ່ຽນ Record ເກົ່າເພື່ອປິດບັງປະຫວັດ. ຖ້າຂໍ້ມູນຜິດ ໃຫ້ເພີ່ມ Correction/Reversal Record ແລະອ້າງ Correlation ID.</p></div></li>
          <li><b>05 · MINIMUM PII</b><div><strong>ProtectedText ແຍກອອກຈາກ Analytics:</strong><p>Requester Contact ເກັບສະເພາະທີ່ຈຳເປັນຕໍ່ການແຈ້ງຜົນ. Analytics Event ຫ້າມມີຊື່, ເບີໂທ, email, message content ຫຼືຄ່າທີ່ໃຊ້ fingerprint.</p></div></li>
          <li><b>06 · DERIVED DATA</b><div><strong>Feed/Search/Reports ບໍ່ແມ່ນ Source of Truth:</strong><p>Feed Item, Search Index, Funnel Summary ແລະ Performance Summary ສາມາດສ້າງໃໝ່ຈາກ Logical Entities. ຖ້າ Technical Design ສ້າງ Cache/Table ສຳລັບຄວາມໄວ ຕ້ອງລະບຸ Owner, Refresh Rule ແລະ Recovery.</p></div></li>
        </ol>
      </section>

      <section className={styles.documentArticleSection}>
        <span>C7 · MODEL BOUNDARY</span>
        <h2>ຂໍ້ມູນທີ່ບໍ່ສ້າງເປັນ Server Entity ໃນ MVP</h2>
        <div className={styles.scopeColumns}>
          <div><h3>LOCAL / DERIVED — NO SOURCE TABLE</h3><ul><li>Saved Place ແລະ Consent Preference: ຢູ່ Browser/Device</li><li>Feed Item ແລະ Place Detail: Composite Read Model</li><li>Search Index: Physical implementation ຂອງ Query</li><li>Performance/Funnel Summary: ຄຳນວນຈາກ Event/Intent</li><li>Authentication Token/Session: Security implementation</li></ul></div>
          <div><h3>OUT OF MVP — NO ENTITY</h3><ul><li>Booking, Order, Payment, Invoice, Refund</li><li>Guest User Account/Profile/Cloud Save</li><li>Creator Login, Marketplace Contract/Commission</li><li>Comment, Like, Follow, Direct Message</li><li>AI Recommendation Profile/Training Dataset</li></ul></div>
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>C8 · OPEN PHYSICAL DECISIONS</span>
        <h2>ຂໍ້ຕັດສິນທີ່ບໍ່ຂັດຂວາງ Logical Model</h2>
        <ul className={styles.decisionList}>
          <li><b>01</b><span>ເລືອກ Identifier format (UUID/ULID ຫຼືຮູບແບບອື່ນ) ໃນ Technical Design; API ຫ້າມອີງລຳດັບທີ່ຄາດເດົາໄດ້.</span></li>
          <li><b>02</b><span>ເລືອກ Search engine/index, tokenizer ພາສາລາວ ແລະວິທີ refresh ຫຼັງ Place ປ່ຽນ.</span></li>
          <li><b>03</b><span>ກຳນົດ Retention/Archival ຂອງ ProtectedText, Analytics Event ແລະ Audit Log ໃນ Data Governance/Security Design.</span></li>
          <li><b>04</b><span>ກຳນົດ Time zone storage/display, Money precision ແລະ Currency conversion policy ໃນ Physical Data Standard.</span></li>
          <li><b>05</b><span>ກຳນົດ Polymorphic reference ຂອງ Work Item/Audit Log ວ່າຈະບັງຄັບໂດຍ Database ຫຼື Service Contract.</span></li>
        </ul>
      </section>

      <section className={styles.documentArticleSection}>
        <span>C9 · COMPLETION GATE</span>
        <h2>ເກນສຳເລັດຂອງຂັ້ນ 2</h2>
        <ul className={styles.decisionList}>
          <li><b>01</b><span>Entity ທຸກອັນມີ ID, Purpose, Owner Module, Attribute Dictionary ແລະ Function Coverage.</span></li>
          <li><b>02</b><span>Attribute ທຸກອັນລະບຸ Logical Type, Required/Optional, Key ແລະ Constraint ທີ່ຈຳເປັນ.</span></li>
          <li><b>03</b><span>Relationship ທຸກຄູ່ລະບຸ Cardinality ແລະ Referential Integrity Rule.</span></li>
          <li><b>04</b><span>Merge, Soft Delete, Audit, Verification, Consent ແລະ Sponsored separation ມີ Data Rule ຊັດເຈນ.</span></li>
          <li><b>05</b><span>Data ຈາກທັງ 10 Modules ມີ Entity/Read Model ຮອງຮັບ ແລະ Non-goal ບໍ່ປົນເຂົ້າ Schema.</span></li>
          <li><b>06</b><span>ຂໍ້ຕັດສິນທາງ Physical/Technical ທີ່ຍັງເປີດຖືກແຍກອອກ ແລະບໍ່ໃຫ້ຄ່າຄາດເດົາກາຍເປັນ Requirement.</span></li>
        </ul>
      </section>

      <aside className={styles.saNextStep}>
        <small>ສະຖານະ SA</small><h2>ຂັ້ນ 1–2 ຈັດເຮັດແລ້ວ · ອ່ານຕໍ່ຂັ້ນ 3 Workflow/Sequence</h2>
        <p>Entity ແລະ Relationship ໃນພາກ C ເປັນ Data Contract ພື້ນຖານຂອງ Workflow. ພາກ D ດ້ານລຸ່ມຈະລະບຸ Actor/Module call order, Transaction boundary, Alternate Flow ແລະຈຸດທີ່ Entity ແຕ່ລະອັນຖືກອ່ານ ຫຼືປ່ຽນ.</p>
      </aside>
    </section>
  );
}
