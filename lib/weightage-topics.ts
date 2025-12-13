// Weightage-wise topics for AIIMS CRE Radiology Technician exam
// Based on repeated patterns from AIIMS, PGI, RRB, DSSSB, ESIC exams

export interface WeightageTopic {
  id: string
  name: string
  weightage: "VERY HIGH" | "HIGH" | "MEDIUM-HIGH" | "MEDIUM" | "LOW-MEDIUM"
  expectedQuestions: string // e.g., "15-20 questions"
  priority: number // 1 is highest priority
  mustStudy: string[]
  questions: WeightageQuestion[]
}

export interface WeightageQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number // 0-indexed
  explanation: string
}

// Question format for reference:
// {
//   id: 1,
//   question: "Your question here?",
//   options: ["Option A", "Option B", "Option C", "Option D"],
//   correctAnswer: 0, // 0-indexed (0 = Option A, 1 = Option B, etc.)
//   explanation: "Explanation for the correct answer"
// }

export const weightageTopics: WeightageTopic[] = [
  {
    id: "radiation_protection_laws",
    name: "Radiation Protection & QA/QC",
    weightage: "VERY HIGH",
    expectedQuestions: "15-20 questions",
    priority: 1,
    mustStudy: [
      "Dose limits (ICRP)",
      "Controlled vs uncontrolled area",
      "TLD, OSL dosimeters",
      "Workload, occupancy, use factor",
      "Barriers: primary, secondary",
      "Leakage radiation",
      "QC tests for X-ray, CT, Mammography"
    ],
    questions: [
  // --- TOPIC: DOSE LIMITS (ICRP) ---
  {
    id: 1,
    question: "According to ICRP, what is the annual effective dose limit for occupational workers averaged over 5 years?",
    options: ["50 mSv", "20 mSv", "100 mSv", "1 mSv"],
    correctAnswer: 1,
    explanation: "The ICRP recommends an effective dose limit of 20 mSv per year, averaged over defined periods of 5 years, with no single year exceeding 50 mSv."
  },
  {
    id: 2,
    question: "What is the annual effective dose limit for the general public according to ICRP?",
    options: ["5 mSv", "20 mSv", "1 mSv", "50 mSv"],
    correctAnswer: 2,
    explanation: "The annual effective dose limit for members of the public is 1 mSv."
  },
  {
    id: 3,
    question: "According to ICRP 118, what is the equivalent dose limit for the lens of the eye for occupational workers?",
    options: ["150 mSv/year", "20 mSv/year", "500 mSv/year", "50 mSv/year"],
    correctAnswer: 1,
    explanation: "ICRP 118 reduced the occupational limit for the lens of the eye to 20 mSv per year, averaged over 5 years, with no single year exceeding 50 mSv."
  },
  {
    id: 4,
    question: "What is the annual equivalent dose limit for the skin for occupational workers?",
    options: ["150 mSv", "50 mSv", "500 mSv", "20 mSv"],
    correctAnswer: 2,
    explanation: "The equivalent dose limit for the skin (and hands/feet) for occupational workers is 500 mSv per year."
  },
  {
    id: 5,
    question: "For a pregnant radiation worker, the dose to the embryo/fetus must not exceed what value during the remainder of the pregnancy?",
    options: ["5 mSv", "1 mSv", "2 mSv", "20 mSv"],
    correctAnswer: 1,
    explanation: "Once pregnancy is declared, the dose to the embryo/fetus should not exceed 1 mSv for the remainder of the pregnancy."
  },
  {
    id: 6,
    question: "What is the annual equivalent dose limit for the skin for the general public?",
    options: ["15 mSv", "50 mSv", "150 mSv", "500 mSv"],
    correctAnswer: 1,
    explanation: "For the public, the equivalent dose limit for the skin is 50 mSv per year."
  },
  {
    id: 7,
    question: "The dose limits recommended by ICRP do NOT apply to:",
    options: ["Occupational exposure", "Medical exposure of patients", "Public exposure", "Emergency response personnel"],
    correctAnswer: 1,
    explanation: "Dose limits do not apply to patients undergoing medical diagnosis or therapy, as the exposure is intended to provide a direct benefit to them."
  },
  {
    id: 8,
    question: "Which ICRP publication is the primary source for the 2007 recommendations on radiological protection?",
    options: ["ICRP 60", "ICRP 103", "ICRP 90", "ICRP 118"],
    correctAnswer: 1,
    explanation: "ICRP Publication 103 (2007) replaced ICRP 60 and provides the current fundamental recommendations."
  },
  {
    id: 9,
    question: "The maximum permissible dose in any single year for an occupational worker (provided the 5-year average is maintained) is:",
    options: ["20 mSv", "30 mSv", "50 mSv", "100 mSv"],
    correctAnswer: 2,
    explanation: "While the average is 20 mSv/year, a worker may receive up to 50 mSv in a single year as long as the 5-year total does not exceed 100 mSv."
  },
  {
    id: 10,
    question: "What is the dose limit for a caregiver (comforter) voluntarily helping a patient undergoing medical procedures?",
    options: ["1 mSv/episode", "5 mSv/episode", "20 mSv/episode", "Dose constraints are used instead of strict limits"],
    correctAnswer: 3,
    explanation: "Strict public dose limits do not apply to comforters/carers; instead, dose constraints (often 5 mSv per episode) are used to manage exposure."
  },

  // --- TOPIC: CONTROLLED VS UNCONTROLLED AREA ---
  {
    id: 11,
    question: "A 'Controlled Area' is defined as an area where:",
    options: ["Any member of the public can enter", "Annual dose may exceed 1 mSv", "Specific protection measures and safety provisions are required", "No radiation is present"],
    correctAnswer: 2,
    explanation: "A Controlled Area requires specific protection measures to control normal exposures and prevent potential exposures."
  },
  {
    id: 12,
    question: "Typically, the design limit for weekly dose in an Uncontrolled Area is:",
    options: ["0.1 mSv/week", "0.02 mSv/week", "1 mSv/week", "0.4 mSv/week"],
    correctAnswer: 1,
    explanation: "Uncontrolled areas are designed to ensure public dose limits are met, typically calculated at 0.02 mSv/week (or roughly 1 mSv/year)."
  },
  {
    id: 13,
    question: "Which of the following is required for a Controlled Area?",
    options: ["Open access", "Warning signs and access control", "No shielding", "Occupancy factor of 0"],
    correctAnswer: 1,
    explanation: "Controlled areas must have warning signs (e.g., radiation symbol) and restricted access."
  },
  {
    id: 14,
    question: "An area where the annual dose equivalent might exceed 6 mSv (3/10ths of the limit) is generally classified as:",
    options: ["Uncontrolled Area", "Supervised Area", "Controlled Area", "Public Area"],
    correctAnswer: 2,
    explanation: "If doses are expected to be greater than 6 mSv/year (often defined as >3/10 of the limit), the area is usually designated as Controlled."
  },
  {
    id: 15,
    question: "Who is primarily responsible for classifying areas as Controlled or Supervised?",
    options: ["The receptionist", "The Radiological Safety Officer (RSO)", "The patient", "The equipment manufacturer"],
    correctAnswer: 1,
    explanation: "The RSO (or Qualified Expert) is responsible for designating areas based on radiation levels and safety requirements."
  },
  {
    id: 16,
    question: "A 'Supervised Area' is one where:",
    options: ["Occupational exposure conditions are kept under review but special procedures are not normally needed", "Doses exceed 20 mSv/year", "The public has free access", "No monitoring is allowed"],
    correctAnswer: 0,
    explanation: "Supervised areas require monitoring/review but not the stringent control measures of a Controlled Area."
  },
  {
    id: 17,
    question: "The shielding design goal (P) for a Controlled Area is typically:",
    options: ["0.02 mSv/week", "0.1 mSv/week", "5 mSv/year", "0.1 mSv/year"],
    correctAnswer: 1,
    explanation: "For controlled areas (occupational workers), the design goal is typically 0.1 mSv/week (approx 5 mSv/year constraint)."
  },
  {
    id: 18,
    question: "Which group of people is permitted in an Uncontrolled Area?",
    options: ["Only radiation workers", "Only patients", "Members of the general public", "Only RSOs"],
    correctAnswer: 2,
    explanation: "Uncontrolled areas are those occupied by individuals such as patients' visitors, hospital staff who do not work with radiation, and the general public."
  },
  {
    id: 19,
    question: "Radiation warning lights (Red lights) are essential for:",
    options: ["The waiting room", "The darkroom", "The entrance to a Controlled Area (e.g., CT/X-ray room)", "The doctor's office"],
    correctAnswer: 2,
    explanation: "Warning lights indicate when the X-ray beam is on and are required at the entrance of Controlled Areas."
  },
  {
    id: 20,
    question: "Personnel monitoring (e.g., TLD badges) is mandatory for staff working primarily in:",
    options: ["Uncontrolled Areas", "Controlled Areas", "Administrative offices", "Cafeterias"],
    correctAnswer: 1,
    explanation: "Staff working in Controlled Areas are occupationally exposed and typically require individual monitoring."
  },

  // --- TOPIC: TLD, OSL DOSIMETERS ---
  {
    id: 21,
    question: "What does TLD stand for?",
    options: ["Thermal Light Detector", "Thermoluminescent Dosimeter", "Time Limited Dose", "Total Lead Density"],
    correctAnswer: 1,
    explanation: "TLD stands for Thermoluminescent Dosimeter."
  },
  {
    id: 22,
    question: "Which material is most commonly used in TLD badges for personnel monitoring?",
    options: ["CaSO4:Dy", "LiF:Mg,Ti", "Al2O3:C", "NaI:Tl"],
    correctAnswer: 0,
    explanation: "In many countries (like India), CaSO4:Dy is used for high sensitivity; globally LiF:Mg,Ti is also very common. CaSO4:Dy is the standard for BARC/AERB personnel monitoring cards."
  },
  {
    id: 23,
    question: "What does OSL stand for?",
    options: ["Optical Source Light", "Optically Stimulated Luminescence", "Occupational Safety Limit", "Outer Shield Layer"],
    correctAnswer: 1,
    explanation: "OSL stands for Optically Stimulated Luminescence."
  },
  {
    id: 24,
    question: "The active material typically used in OSL dosimeters is:",
    options: ["Lithium Fluoride", "Calcium Sulfate", "Aluminum Oxide (Al2O3:C)", "Silver Bromide"],
    correctAnswer: 2,
    explanation: "Carbon-doped Aluminum Oxide (Al2O3:C) is the primary phosphor used in OSL dosimeters (e.g., Luxel)."
  },
  {
    id: 25,
    question: "How is the stored energy released in a TLD reader?",
    options: ["By exposing it to a laser", "By heating the material", "By applying a magnetic field", "By chemical washing"],
    correctAnswer: 1,
    explanation: "TLDs release stored energy as light when they are heated (Thermal stimulation)."
  },
  {
    id: 26,
    question: "How is the stored energy released in an OSL reader?",
    options: ["By heating", "By exposing it to light (green laser/LED)", "By crushing the crystal", "By radio frequency"],
    correctAnswer: 1,
    explanation: "OSL dosimeters are read by stimulating the material with light (Optical stimulation)."
  },
  {
    id: 27,
    question: "Which dosimeter allows for re-analysis (re-reading) of the dose?",
    options: ["Film Badge", "TLD", "OSL", "Pocket Ionization Chamber"],
    correctAnswer: 2,
    explanation: "OSL dosimeters can be re-read because the reading process only depletes a small fraction of the stored signal, unlike TLDs which are annealed (cleared) by reading."
  },
  {
    id: 28,
    question: "What is the main advantage of TLD over Film Badges?",
    options: ["Permanent record", "Tissue equivalence", "Lower cost", "Instant readout"],
    correctAnswer: 1,
    explanation: "TLD materials like LiF are more tissue-equivalent than the silver in film, providing more accurate dose measurements without complex energy filters."
  },
  {
    id: 29,
    question: "The process of heating a TLD to high temperature to remove residual signal before reuse is called:",
    options: ["Developing", "Annealing", "Fixing", "Bleaching"],
    correctAnswer: 1,
    explanation: "Annealing resets the TLD crystal by emptying all electron traps."
  },
  {
    id: 30,
    question: "What filter is used in a TLD badge to distinguish between shallow (skin) and deep (body) dose?",
    options: ["Lead filter only", "Open window, plastic, and metal filters", "No filters are used", "Water filter"],
    correctAnswer: 1,
    explanation: "TLD badges use a combination of open windows and metal/plastic filters to differentiate between beta, low-energy X-ray, and high-energy radiation (Hp(0.07) vs Hp(10))."
  },
  {
    id: 31,
    question: "Which dosimeter is generally more sensitive to low doses?",
    options: ["Film Badge", "OSL", "TLD (LiF)", "Pocket Dosimeter"],
    correctAnswer: 1,
    explanation: "OSL dosimeters (Al2O3:C) generally have a lower limit of detection (approx 0.01 mSv) compared to standard TLDs or Film."
  },
  {
    id: 32,
    question: "The glow curve is a characteristic output of which device?",
    options: ["Geiger Muller Counter", "TLD Reader", "Ionization Chamber", "OSL Reader"],
    correctAnswer: 1,
    explanation: "A glow curve plots light output vs temperature during the TLD reading cycle."
  },

  // --- TOPIC: WORKLOAD, OCCUPANCY, USE FACTOR ---
  {
    id: 33,
    question: "In shielding calculations, Workload (W) is typically expressed in units of:",
    options: ["mSv/week", "mA-min/week", "kVp/week", "Hours/week"],
    correctAnswer: 1,
    explanation: "Workload describes the X-ray tube output and usage, measured in milliampere-minutes per week (mA-min/wk)."
  },
  {
    id: 34,
    question: "The 'Use Factor' (U) describes:",
    options: ["The fraction of time the beam is directed at a specific barrier", "The fraction of time the room is occupied", "The efficiency of the X-ray tube", "The percentage of leakage radiation"],
    correctAnswer: 0,
    explanation: "The Use Factor represents the fraction of the beam-on time that the primary beam is directed toward a specific barrier (e.g., floor, wall)."
  },
  {
    id: 35,
    question: "What is the typical Use Factor (U) for a floor in a general radiography room?",
    options: ["0", "1", "1/4", "1/16"],
    correctAnswer: 1,
    explanation: "The floor is almost always a primary barrier because the beam is often directed downwards; U is typically taken as 1."
  },
  {
    id: 36,
    question: "The 'Occupancy Factor' (T) for an office or control room continuously staffed by workers is:",
    options: ["1", "1/4", "1/16", "1/8"],
    correctAnswer: 0,
    explanation: "For areas occupied full-time by the same individual (offices, control rooms), T = 1."
  },
  {
    id: 37,
    question: "What is a typical Occupancy Factor (T) for a corridor or heavy traffic area?",
    options: ["1", "1/5 or 1/4", "1/40", "0"],
    correctAnswer: 1,
    explanation: "Corridors are used frequently but not continuously by the same person, so T is often 1/5 (NCRP 147) or 1/4."
  },
  {
    id: 38,
    question: "In the shielding formula B = P * d^2 / (W * U * T), what does 'P' stand for?",
    options: ["Patient dose", "Protection level (Design goal)", "Primary barrier", "Penetration"],
    correctAnswer: 1,
    explanation: "P is the Shielding Design Goal (permissible dose equivalent) for the area being protected."
  },
  {
    id: 39,
    question: "Which factor is NOT required for calculating Secondary Barrier shielding?",
    options: ["Workload (W)", "Occupancy Factor (T)", "Use Factor (U)", "Distance (d)"],
    correctAnswer: 2,
    explanation: "The Use Factor (U) is effectively 1 for secondary barriers because leakage and scatter radiation are emitted in all directions, so the barrier is always 'in use' when the tube is on."
  },
  {
    id: 40,
    question: "If the distance (d) from the source to the barrier is doubled, the required shielding thickness:",
    options: ["Increases", "Decreases", "Remains the same", "Doubles"],
    correctAnswer: 1,
    explanation: "By the inverse square law, doubling distance reduces intensity by 4, thus reducing the amount of shielding thickness required."
  },
  {
    id: 41,
    question: "The Workload for a CT scanner is often best described in terms of:",
    options: ["mA-min/week", "DLP/week or scans/week", "kVp settings", "Gantry rotation speed"],
    correctAnswer: 0,
    explanation: "While CT workload can be complex, it is fundamentally calculated based on the total mA-min generated per week."
  },
  {
    id: 42,
    question: "For a secondary barrier, the source of radiation is considered to be:",
    options: ["The X-ray tube focal spot", "The patient (scatter) and tube housing (leakage)", "The control console", "The image receptor"],
    correctAnswer: 1,
    explanation: "Secondary barriers protect against scatter (from the patient) and leakage (from the housing)."
  },

  // --- TOPIC: BARRIERS (PRIMARY & SECONDARY) ---
  {
    id: 43,
    question: "A Primary Barrier is designed to attenuate:",
    options: ["Leakage radiation only", "Scatter radiation only", "The direct (useful) X-ray beam", "Background radiation"],
    correctAnswer: 2,
    explanation: "Primary barriers are placed where the primary X-ray beam can be directly aimed."
  },
  {
    id: 44,
    question: "Which of the following is typically a Primary Barrier in a general X-ray room?",
    options: ["The ceiling", "The control booth wall", "The wall behind the chest bucky", "The door to the corridor"],
    correctAnswer: 2,
    explanation: "The chest bucky wall receives the direct beam during chest X-rays."
  },
  {
    id: 45,
    question: "A Secondary Barrier is designed to protect against:",
    options: ["Primary beam only", "Scatter and Leakage radiation", "Neutron radiation", "Alpha particles"],
    correctAnswer: 1,
    explanation: "Secondary barriers are walls that are never struck by the direct beam; they shield scatter and leakage."
  },
  {
    id: 46,
    question: "The control booth wall is generally considered a:",
    options: ["Primary Barrier", "Secondary Barrier", "Tertiary Barrier", "Temporary Barrier"],
    correctAnswer: 1,
    explanation: "The beam should never be directed at the control booth; therefore, it is a secondary barrier."
  },
  {
    id: 47,
    question: "Which material is most efficient (requires least thickness) for X-ray shielding?",
    options: ["Concrete", "Lead", "Gypsum board", "Steel"],
    correctAnswer: 1,
    explanation: "Lead has a high atomic number and density, making it the most efficient space-saving shielding material."
  },
  {
    id: 48,
    question: "1/16 inch of Lead is approximately equivalent to how much concrete?",
    options: ["4 inches (10 cm)", "1 inch", "12 inches", "0.5 inches"],
    correctAnswer: 0,
    explanation: "As a rule of thumb, 4 inches of concrete is roughly equivalent to 1/16 inch (approx 1.6mm) of lead for diagnostic energies."
  },
  {
    id: 49,
    question: "Barriers are usually specified in terms of:",
    options: ["HVL (Half Value Layer)", "TVL (Tenth Value Layer)", "Lead Equivalence", "Optical Density"],
    correctAnswer: 2,
    explanation: "Structural shielding is often specified in mm of Lead Equivalence."
  },
  {
    id: 50,
    question: "In a Mammography room, the walls are usually considered:",
    options: ["Primary barriers requiring thick lead", "Secondary barriers requiring minimal shielding", "No shielding required", "Primary barriers made of concrete"],
    correctAnswer: 1,
    explanation: "Due to low kVp in mammography and the fact that the machine absorbs the primary beam (image receptor assembly acts as a stop), room walls are secondary barriers often requiring just drywall or very thin lead."
  },
  {
    id: 51,
    question: "Lead glass windows in control booths typically require a lead equivalence of:",
    options: ["0.1 mm", "1.5 mm", "10 mm", "0.05 mm"],
    correctAnswer: 1,
    explanation: "Standard regulatory requirement for control windows is often 1.5 mm lead equivalence (at 150 kVp)."
  },
  {
    id: 52,
    question: "If a barrier must reduce intensity by a factor of 1000, how many TVLs are needed?",
    options: ["1", "2", "3", "10"],
    correctAnswer: 2,
    explanation: "10 x 10 x 10 = 1000. Therefore, 3 Tenth Value Layers are needed."
  },
  {
    id: 53,
    question: "Scatter radiation intensity at 1 meter from the patient is approximately what fraction of the incident beam intensity?",
    options: ["10%", "1%", "0.1% (1/1000)", "0.01%"],
    correctAnswer: 2,
    explanation: "Rule of thumb: Scatter at 1m is 0.1% (1/1000th) of the entrance skin exposure."
  },

  // --- TOPIC: LEAKAGE RADIATION ---
  {
    id: 54,
    question: "Leakage radiation emanates from:",
    options: ["The patient", "The collimator opening", "The X-ray tube housing", "The wall"],
    correctAnswer: 2,
    explanation: "Leakage is radiation that passes through the protective housing of the tube, other than the useful beam."
  },
  {
    id: 55,
    question: "The maximum permissible leakage radiation from a diagnostic X-ray tube housing at 1 meter is:",
    options: ["100 mGy/hr", "1 mGy/hr (100 mR/hr)", "0.1 mGy/hr", "10 mGy/hr"],
    correctAnswer: 1,
    explanation: "Regulations (FDA/AERB/IEC) limit leakage to 1 mGy/hr (100 mR/hr) at 1 meter from the source when operated at maximum rating."
  },
  {
    id: 56,
    question: "Leakage radiation is considered what type of radiation for shielding purposes?",
    options: ["Primary", "Secondary", "Remnant", "Background"],
    correctAnswer: 1,
    explanation: "Leakage, along with scatter, is classified as secondary radiation."
  },
  {
    id: 57,
    question: "Which component is responsible for limiting leakage radiation?",
    options: ["The collimator", "The lead-lined tube housing", "The anode", "The filter"],
    correctAnswer: 1,
    explanation: "The protective tube housing is lined with lead to absorb isotropic X-rays not directed at the window."
  },
  {
    id: 58,
    question: "When calculating secondary barriers, leakage radiation is assumed to be:",
    options: ["Isotropic (equal in all directions)", "Focused downward", "Negligible", "Higher intensity than the primary beam"],
    correctAnswer: 0,
    explanation: "Leakage is assumed to radiate in all directions from the tube housing."
  },

  // --- TOPIC: QC TESTS (X-RAY, CT, MAMMO) ---
  {
    id: 59,
    question: "Which QC test measures the consistency of X-ray output for the same exposure parameters?",
    options: ["Linearity", "Reproducibility", "Accuracy", "HVL"],
    correctAnswer: 1,
    explanation: "Reproducibility tests whether the machine produces the same output (mR) for repeated exposures at the same settings. Coefficient of variation should be < 0.05."
  },
  {
    id: 60,
    question: "kVp accuracy for a general X-ray unit must typically be within:",
    options: ["±2 kVp", "±5% or ±5 kVp", "±10%", "±20%"],
    correctAnswer: 1,
    explanation: "Standard limits are ±5% or ±5 kVp of the set value."
  },
  {
    id: 61,
    question: "The Half Value Layer (HVL) is a measure of:",
    options: ["Beam Quantity", "Beam Quality (Penetrability)", "Field size", "Timer accuracy"],
    correctAnswer: 1,
    explanation: "HVL indicates the filtration and effective energy (quality) of the beam."
  },
  {
    id: 62,
    question: "Collimator alignment (Light field vs Radiation field) must be within what tolerance?",
    options: ["2% of SID", "5% of SID", "1 cm regardless of SID", "10% of SID"],
    correctAnswer: 0,
    explanation: "The misalignment must not exceed 2% of the Source-to-Image Distance (SID)."
  },
  {
    id: 63,
    question: "In CT QC, the CT number for water should be:",
    options: ["-1000 HU", "0 HU ± ~4 HU", "100 HU", "500 HU"],
    correctAnswer: 1,
    explanation: "Water is the reference for Hounsfield Units and must calibrate to 0 HU (typically within ±3 to 5 HU)."
  },
  {
    id: 64,
    question: "What does the 'Low Contrast Resolution' test in CT evaluate?",
    options: ["Ability to distinguish small objects with high density difference", "Ability to distinguish objects with similar densities", "Accuracy of slice thickness", "Patient dose"],
    correctAnswer: 1,
    explanation: "Low contrast resolution measures the scanner's ability to differentiate tissues with very similar densities (slight HU differences)."
  },
  {
    id: 65,
    question: "The star pattern test tool is used to measure:",
    options: ["kVp accuracy", "Focal spot size", "Timer accuracy", "Grid ratio"],
    correctAnswer: 1,
    explanation: "Star patterns or slit cameras are used to determine the effective focal spot size."
  },
  {
    id: 66,
    question: "In Mammography QC, the compression force should typically range between:",
    options: ["50-100 Newtons", "111-200 Newtons (approx 11-20 kg)", "300-400 Newtons", "10-20 Newtons"],
    correctAnswer: 1,
    explanation: "AERB/MQSA standards typically require powered compression to be between 111 N and 200 N (25-45 lbs)."
  },
  {
    id: 67,
    question: "The wire mesh test in screen-film radiography or CR is used to check:",
    options: ["Screen-film contact", "Developer temperature", "Fog level", "Beam alignment"],
    correctAnswer: 0,
    explanation: "Poor contact between the screen and film/plate causes blurring; a wire mesh image reveals these areas."
  },
  {
    id: 68,
    question: "Which phantom is typically used for CTDI measurements?",
    options: ["RMI 156", "PMMA (Acrylic) head and body phantoms", "Aluminum step wedge", "Water bath"],
    correctAnswer: 1,
    explanation: "Standard CT dosimetry uses 16cm (head) and 32cm (body) cylindrical PMMA phantoms."
  },
  {
    id: 69,
    question: "The minimum filtration required for a general X-ray tube operating above 70 kVp is:",
    options: ["0.5 mm Al", "1.5 mm Al", "2.5 mm Al equivalent", "5.0 mm Al"],
    correctAnswer: 2,
    explanation: "Total filtration must be at least 2.5 mm Aluminum equivalent for tubes operating above 70 kVp."
  },
  {
    id: 70,
    question: "In Mammography, the kVp accuracy should be within:",
    options: ["±5 kVp", "±1 kVp", "±10%", "±0.1 kVp"],
    correctAnswer: 1,
    explanation: "Mammography requires high precision; kVp must be accurate within ±1 kVp (or ±5% depending on specific regulation, but usually tighter)."
  },
  {
    id: 71,
    question: "Which QC test evaluates the linearity of the X-ray output?",
    options: ["Output is constant when mA and time are varied but mAs is constant", "Output doubles when kVp doubles", "Output remains same over 10 exposures", "Focal spot remains constant"],
    correctAnswer: 0,
    explanation: "Linearity (Reciprocity) ensures that any combination of mA and time that results in the same mAs produces the same radiation output (mR/mAs)."
  },
  {
    id: 72,
    question: "Spatial resolution in CT is typically measured using:",
    options: ["A water phantom", "Bar patterns or a wire MTF", "Dosimeters", "Uniformity phantom"],
    correctAnswer: 1,
    explanation: "High contrast spatial resolution is measured using bar patterns (lp/cm) or by calculating the Modulation Transfer Function (MTF) of a wire."
  },
  {
    id: 73,
    question: "Uniformity test in CT checks:",
    options: ["That the CT number of water is the same at the center and periphery of the phantom", "That the table moves smoothly", "That the laser lights are straight", "That slice thickness is constant"],
    correctAnswer: 0,
    explanation: "Uniformity ensures the image of a uniform object (water phantom) looks uniform, checking for cupping or capping artifacts."
  },
  {
    id: 74,
    question: "The exposure timer accuracy for times greater than 10 ms should be within:",
    options: ["±20%", "±5%", "±50%", "±1%"],
    correctAnswer: 1,
    explanation: "Timer accuracy is typically required to be within ±5%."
  },
  {
    id: 75,
    question: "In Mammography, the phantom image quality test scores:",
    options: ["Fibers, speck groups, and masses", "Only contrast", "Only resolution", "Patient ID accuracy"],
    correctAnswer: 0,
    explanation: "The ACR Mammography phantom requires the visualization of specific numbers of fibers, speck groups, and masses."
  },
  {
    id: 76,
    question: "Which device is used to check kVp non-invasively?",
    options: ["Spinning top", "kVp meter (electronic penetrameter)", "Densitometer", "Sensitometer"],
    correctAnswer: 1,
    explanation: "Digital kVp meters use filtered detectors to measure the peak voltage without opening the circuitry."
  },
  {
    id: 77,
    question: "Beam perpendicularity checks ensure the central ray is within what degree of perpendicular to the receptor?",
    options: ["1 degree", "1.5 degrees", "3 degrees", "5 degrees"],
    correctAnswer: 0,
    explanation: "The X-ray beam must be within 1 degree of perpendicularity to the image receptor."
  },

  // --- MIXED / ADVANCED TOPICS ---
  {
    id: 78,
    question: "The dose limit for the hands of an occupational worker is:",
    options: ["20 mSv", "150 mSv", "500 mSv", "1000 mSv"],
    correctAnswer: 2,
    explanation: "Extremities (hands and feet) have a deterministic limit of 500 mSv/year."
  },
  {
    id: 79,
    question: "Which of the following describes 'Stochastic Effects'?",
    options: ["Severity depends on dose (e.g., skin burn)", "Probability depends on dose (e.g., cancer)", "Has a threshold", "Occurs immediately"],
    correctAnswer: 1,
    explanation: "Stochastic effects (cancer, genetic effects) have no threshold, and the probability of occurrence increases with dose."
  },
  {
    id: 80,
    question: "For CT, the dose metric 'DLP' stands for:",
    options: ["Daily Limit Protocol", "Dose Length Product", "Direct Linear Penetration", "Digital Luminescence Profile"],
    correctAnswer: 1,
    explanation: "DLP = CTDIvol × Scan Length. It represents the total energy absorbed."
  },
  {
    id: 81,
    question: "In Fluoroscopy, the maximum skin entrance exposure rate (normal mode) is typically limited to:",
    options: ["100 mGy/min (10 R/min)", "10 mGy/min", "1 Gy/min", "5 mGy/min"],
    correctAnswer: 0,
    explanation: "Regulatory limit for normal fluoroscopy is typically 100 mGy/min (10 R/min) at the entrance point."
  },
  {
    id: 82,
    question: "Which is a 'personnel' monitoring device?",
    options: ["Geiger Muller Survey Meter", "TLD Badge", "Ionization Chamber Survey Meter", "Well Counter"],
    correctAnswer: 1,
    explanation: "Survey meters measure area radiation; TLD badges measure individual dose."
  },
  {
    id: 83,
    question: "The 'Control' TLD badge is used to:",
    options: ["Measure the dose to the RSO", "Measure background radiation during transit and storage", "Test the reader", "Measure patient dose"],
    correctAnswer: 1,
    explanation: "The control badge is kept in a radiation-free area to subtract background/transit dose from the workers' badges."
  },
  {
    id: 84,
    question: "What is the primary material used in the construction of a CT gantry housing to reduce weight but not necessarily for shielding?",
    options: ["Lead", "Plastic/Carbon Fiber", "Depleted Uranium", "Tungsten"],
    correctAnswer: 1,
    explanation: "While the tube has lead, the covers are plastic. The actual shielding is inside. (This question clarifies structure vs shielding)."
  },
  {
    id: 85,
    question: "QC for Automatic Exposure Control (AEC) includes checking:",
    options: ["That it terminates exposure at consistent Optical Density/Index", "That it sets the kVp", "That it collimates the beam", "That it develops the film"],
    correctAnswer: 0,
    explanation: "AEC QC ensures that regardless of patient thickness (within limits), the resulting image brightness/density is consistent."
  },
  {
    id: 86,
    question: "An occupancy factor of T=1/16 is typical for:",
    options: ["Offices", "Corridors", "Toilets or Stairways", "Control rooms"],
    correctAnswer: 2,
    explanation: "Areas with minimal occupancy like toilets, unattended waiting rooms, or stairways are assigned T=1/16 (or 1/20 in NCRP 147)."
  },
  {
    id: 87,
    question: "The 'Ten Day Rule' applies to:",
    options: ["Scheduling X-ray exams for women of childbearing age", "TLD reading frequency", "QC testing intervals", "Radioactive decay"],
    correctAnswer: 0,
    explanation: "Historical guideline (now often replaced by 28-day rule or just pregnancy checks) to schedule abdominal X-rays during the first 10 days of the menstrual cycle."
  },
  {
    id: 88,
    question: "For shielding, 'HVL' stands for the thickness required to reduce intensity to:",
    options: ["10%", "50%", "37%", "90%"],
    correctAnswer: 1,
    explanation: "Half Value Layer reduces intensity to 50%."
  },
  {
    id: 89,
    question: "Which radiation unit is used for 'Effective Dose'?",
    options: ["Gray (Gy)", "Sievert (Sv)", "Roentgen (R)", "Becquerel (Bq)"],
    correctAnswer: 1,
    explanation: "Sievert is the unit for equivalent and effective dose, accounting for biological harm."
  },
  {
    id: 90,
    question: "A lead apron of 0.5 mm Pb equivalence attenuates approximately what percentage of scatter radiation (at diagnostic energies)?",
    options: ["10%", "50%", "95-99%", "100%"],
    correctAnswer: 2,
    explanation: "At standard scatter energies, 0.5 mm lead attenuates over 95% of the radiation."
  },
  {
    id: 91,
    question: "If a QC test fails, the first step is usually to:",
    options: ["Shut down the department", "Repeat the test to confirm", "Call the engineer immediately", "Ignore it"],
    correctAnswer: 1,
    explanation: "Verify the result by repeating the test to rule out operator error before calling service."
  },
  {
    id: 92,
    question: "Slice thickness accuracy in CT is evaluated using:",
    options: ["Ramps or spirals in a phantom", "Water bucket", "Air scan", "Dosimeter"],
    correctAnswer: 0,
    explanation: "Phantoms containing inclined ramps allow calculation of slice width based on the length of the ramp image."
  },
  {
    id: 93,
    question: "The most radiation-sensitive stage of pregnancy is:",
    options: ["Pre-implantation", "Organogenesis (2-15 weeks)", "Fetal period", "Third trimester"],
    correctAnswer: 1,
    explanation: "Organogenesis is the period of major organ formation and is most sensitive to teratogenic effects."
  },
  {
    id: 94,
    question: "Which particle is used in OSL readout that is NOT used in TLD?",
    options: ["Heat", "Light (LED/Laser)", "Electricity", "Sound"],
    correctAnswer: 1,
    explanation: "OSL uses optical stimulation (light); TLD uses thermal stimulation (heat)."
  },
  {
    id: 95,
    question: "Leakage radiation contributes to the dose of:",
    options: ["The patient", "The image receptor", "Staff and persons in adjacent rooms", "The filament"],
    correctAnswer: 2,
    explanation: "Leakage is a safety hazard primarily for staff in the room and people in adjacent areas."
  },
  {
    id: 96,
    question: "The unit 'Gray' (Gy) measures:",
    options: ["Absorbed Dose", "Equivalent Dose", "Radioactivity", "Exposure"],
    correctAnswer: 0,
    explanation: "Gray is the SI unit for Absorbed Dose (Energy/Mass)."
  },
  {
    id: 97,
    question: "AERB/ICRP recommends that students/trainees (16-18 years) have an annual dose limit of:",
    options: ["20 mSv", "6 mSv", "1 mSv", "50 mSv"],
    correctAnswer: 1,
    explanation: "For trainees/apprentices, the limit is often set at 6 mSv/year."
  },
  {
    id: 98,
    question: "What is the typical lead equivalence of a thyroid shield?",
    options: ["0.25 mm", "0.5 mm", "1.0 mm", "0.1 mm"],
    correctAnswer: 1,
    explanation: "Standard thyroid shields usually have 0.5 mm Pb equivalence."
  },
  {
    id: 99,
    question: "The backup timer in an AEC system is set to terminate exposure at:",
    options: ["100 mAs", "600 mAs or 6 seconds", "10 mAs", "1 second"],
    correctAnswer: 1,
    explanation: "Safety regulation requires a backup timer to stop exposure at 600 mAs (for >50kVp) to prevent tube overload and patient overexposure if AEC fails."
  },
  {
    id: 100,
    question: "Which QC test uses a SMPTE pattern?",
    options: ["Monitor/Display calibration", "CT dose", "kVp accuracy", "Lead apron integrity"],
    correctAnswer: 0,
    explanation: "The SMPTE pattern is used to check the resolution, contrast, and brightness of medical display monitors."
  }
]

  },
  {
    id: "radiology_physics",
    name: "Radiology Physics",
    weightage: "VERY HIGH",
    expectedQuestions: "15-20 questions",
    priority: 2,
    mustStudy: [
      "X-ray production (Bremsstrahlung, Characteristic)",
      "Factors affecting quality (kVp) & quantity (mAs)",
      "Inverse square law, FFD, OFD, magnification",
      "Attenuation, HVL, filtration",
      "Interaction of radiation: PE, Compton, Coherent",
      "Heel effect",
      "Generators: single phase, 3-phase, HF",
      "Line focus principle, focal spot blooming & loading",
      "Grid: ratio, frequency, focal range, density, Bucky factor",
      "Scatter & contrast control"
    ],
    questions: [
     {
    id: 1,
    question: "Which type of X-ray radiation constitutes the majority (approx. 85-90%) of the X-ray beam at 100 kVp?",
    options: ["Characteristic Radiation", "Bremsstrahlung Radiation", "Scatter Radiation", "Annihilation Radiation"],
    correctAnswer: 1,
    explanation: "Bremsstrahlung interactions occur over a continuous spectrum and make up the vast majority of the beam. Characteristic radiation only occurs at specific discrete energies."
  },
  {
    id: 2,
    question: "Characteristic X-rays are produced when:",
    options: ["A projectile electron slows down near the nucleus", "An outer-shell electron fills an inner-shell vacancy", "A neutron is ejected from the nucleus", "An electron changes its spin"],
    correctAnswer: 1,
    explanation: "Characteristic X-rays are emitted when an outer-shell electron drops down to fill a void in an inner shell (usually K-shell) created by a projectile electron."
  },
  {
    id: 3,
    question: "The energy of K-characteristic X-rays from a Tungsten target is approximately:",
    options: ["69 keV", "100 keV", "12 keV", "30 keV"],
    correctAnswer: 0,
    explanation: "The binding energy of the K-shell in Tungsten is 69.5 keV. Therefore, K-characteristic X-rays have an effective energy of approx 69 keV."
  },

  // --- SUBTOPIC: QUALITY (kVp) & QUANTITY (mAs) ---
  {
    id: 4,
    question: "Which factor primarily controls the penetrating power (quality) of the X-ray beam?",
    options: ["mAs", "kVp", "Focal spot size", "SID"],
    correctAnswer: 1,
    explanation: "kVp determines the maximum energy of the photons, directly influencing beam quality and penetrability (contrast)."
  },
  {
    id: 5,
    question: "If you double the mAs (milliampere-seconds), what happens to the number of X-ray photons produced?",
    options: ["It remains the same", "It increases by 50%", "It doubles", "It quadruples"],
    correctAnswer: 2,
    explanation: "There is a direct linear relationship between mAs and X-ray quantity. Doubling mAs doubles the number of electrons and thus the number of photons."
  },

  // --- SUBTOPIC: GEOMETRY (ISL, FFD, OFD, Magnification) ---
  {
    id: 6,
    question: "To calculate the Magnification Factor (MF), the formula is:",
    options: ["SID / SOD", "SOD / SID", "SID × SOD", "OID / SID"],
    correctAnswer: 0,
    explanation: "Magnification Factor = Source-to-Image Distance (SID) divided by Source-to-Object Distance (SOD)."
  },
  {
    id: 7,
    question: "An increase in Object-to-Film Distance (OFD/OID) will result in:",
    options: ["Decreased magnification and increased sharpness", "Increased magnification and decreased sharpness (blur)", "Increased contrast only", "No change in image geometry"],
    correctAnswer: 1,
    explanation: "Increasing the OID moves the object closer to the source relative to the film, increasing magnification and penumbra (blur)."
  },
  {
    id: 8,
    question: "If the radiation intensity at 1 meter is 100 mR, what is the intensity at 2 meters?",
    options: ["200 mR", "50 mR", "25 mR", "10 mR"],
    correctAnswer: 2,
    explanation: "According to the Inverse Square Law, doubling the distance reduces intensity to one-fourth (1/2² = 1/4). 100 / 4 = 25 mR."
  },

  // --- SUBTOPIC: INTERACTION OF RADIATION ---
  {
    id: 9,
    question: "Which interaction occurs at very low energy levels (< 10 keV) and causes the photon to change direction without losing energy?",
    options: ["Photoelectric Effect", "Compton Scatter", "Coherent (Classical) Scatter", "Pair Production"],
    correctAnswer: 2,
    explanation: "Coherent (or Classical/Thompson) scatter excites the atom but does not ionize it; the photon is scattered with no loss of energy."
  },
  {
    id: 10,
    question: "Which interaction results in the total absorption of the incident X-ray photon?",
    options: ["Compton Scatter", "Photoelectric Effect", "Coherent Scatter", "Transmission"],
    correctAnswer: 1,
    explanation: "In the Photoelectric Effect, the incident photon gives up all its energy to eject an inner-shell electron and ceases to exist."
  },

  // --- SUBTOPIC: ATTENUATION, HVL, FILTRATION ---
  {
    id: 11,
    question: "The thickness of an absorber required to reduce the radiation intensity to half its original value is known as:",
    options: ["Tenth Value Layer (TVL)", "Half Value Layer (HVL)", "Attenuation Coefficient", "Effective Dose"],
    correctAnswer: 1,
    explanation: "HVL is the standard measurement for effective beam quality."
  },
  {
    id: 12,
    question: "Inherent filtration in an X-ray tube typically includes:",
    options: ["The aluminum sheets added to the port", "The glass envelope and insulating oil", "The collimator mirror", "The grid"],
    correctAnswer: 1,
    explanation: "Inherent filtration is the filtration provided by the permanent components of the tube housing, primarily the glass envelope and cooling oil."
  },

  // --- SUBTOPIC: HEEL EFFECT ---
  {
    id: 13,
    question: "The Anode Heel Effect is most pronounced (noticeable) when using:",
    options: ["Long SID and small film size", "Short SID and large film size", "High kVp techniques", "Small focal spot only"],
    correctAnswer: 1,
    explanation: "The effect is more obvious at short distances (Short SID) and when covering a large field (Large Film Size) because the beam angle variation is greater."
  },

  // --- SUBTOPIC: GENERATORS & LINE FOCUS PRINCIPLE ---
  {
    id: 14,
    question: "What is the approximate voltage ripple for a Three-Phase, 12-Pulse generator?",
    options: ["100%", "14%", "4%", "< 1%"],
    correctAnswer: 2,
    explanation: "Single phase = 100% ripple; 3-phase 6-pulse = ~14%; 3-phase 12-pulse = ~4%; High Frequency = <1%."
  },
  {
    id: 15,
    question: "Focal Spot Blooming refers to:",
    options: ["The physical expansion of the focal spot due to high mA (electron repulsion)", "The use of a larger filament", "The angling of the anode", "The cracking of the anode"],
    correctAnswer: 0,
    explanation: "At high mA stations, the negative cloud of electrons swells due to electrostatic repulsion before hitting the anode, slightly enlarging the focal spot."
  },

  // --- SUBTOPIC: GRID & SCATTER CONTROL ---
  {
    id: 16,
    question: "The primary function of a radiographic grid is to:",
    options: ["Reduce patient dose", "Remove scatter radiation before it reaches the image receptor", "Cool the X-ray tube", "Filter low energy radiation"],
    correctAnswer: 1,
    explanation: "Grids are placed between the patient and the film to absorb scatter radiation, thereby improving image contrast. They do not reduce patient dose; they actually require a higher dose (mAs)."
  },
  {
    id: 17,
    question: "Grid Cut-off is most commonly caused by:",
    options: ["Using a focused grid upside down", "Using high kVp", "Using a low ratio grid", "Decreasing mAs"],
    correctAnswer: 0,
    explanation: "Grid cut-off (undesirable absorption of primary X-rays) often happens if a focused grid is inverted, off-center, or tilted."
  },
  {
    id: 18,
    question: "Which 'Grid Ratio' would provide the highest contrast improvement (best scatter cleanup)?",
    options: ["5:1", "8:1", "12:1", "16:1"],
    correctAnswer: 3,
    explanation: "Higher grid ratios (e.g., 16:1) are more efficient at cleaning up scatter but require precise positioning and higher patient dose."
  },
  {
    id: 19,
    question: "The 'Air Gap Technique' works as an alternative to a grid because:",
    options: ["The air absorbs the scatter", "Scatter radiation misses the film due to the distance between patient and film", "It increases magnification", "It reduces kVp"],
    correctAnswer: 1,
    explanation: "By increasing the OID (Air Gap), much of the scatter radiation produced in the patient diverges enough to miss the image receptor entirely."
  },
  {
    id: 20,
    question: "Which interaction is the primary source of scatter radiation in diagnostic radiography?",
    options: ["Photoelectric Effect", "Compton Scatter", "Pair Production", "Photodisintegration"],
    correctAnswer: 1,
    explanation: "Compton interactions create a recoil electron and a scattered photon that travels in a different direction, causing fog."
  },

  // --- ADVANCED / MIXED PHYSICS ---
  {
    id: 21,
    question: "X-ray quantity is proportional to the square of:",
    options: ["mAs", "kVp", "Distance", "Filtration"],
    correctAnswer: 1,
    explanation: "Quantity (intensity) increases with the square of the kVp. If you double kVp, intensity increases by a factor of 4."
  },
  {
    id: 22,
    question: "The 'Line Focus Principle' allows for a large area for heating (Actual Focal Spot) while maintaining a:",
    options: ["Small Effective Focal Spot", "Large Effective Focal Spot", "High ripple factor", "Low anode speed"],
    correctAnswer: 0,
    explanation: "This principle helps in handling high heat loads (large actual spot) while keeping the projected source size (effective spot) small for good detail."
  },
  {
    id: 23,
    question: "Which of the following grid errors results in a loss of density along the edges of the image only?",
    options: ["Off-level grid", "Off-center grid", "Upside down focused grid", "Focus-grid distance decentering (Grid Focus Distance)"],
    correctAnswer: 3,
    explanation: "If the SID is outside the specific focal range of the grid (too close or too far), density is lost at the periphery (edges) of the image."
  },
  {
    id: 24,
    question: "The photoelectric effect is most likely to occur in tissues with:",
    options: ["Low atomic number", "High atomic number", "High water content", "Low density"],
    correctAnswer: 1,
    explanation: "PE interaction probability is proportional to Z³ (Atomic Number cubed). Bone (Calcium, Z=20) has a much higher probability than soft tissue (Z=7.4)."
  },
  {
    id: 25,
    question: "Total filtration in the X-ray beam is the sum of:",
    options: ["Inherent filtration + Added filtration", "Inherent filtration + Compensating filter", "Added filtration + Mirror", "Tube shield + Collimator"],
    correctAnswer: 0,
    explanation: "Total filtration = Inherent (tube components) + Added (aluminum sheets)."
  },
  {
    id: 26,
    question: "The process of 'Thermionic Emission' occurs at the:",
    options: ["Anode Target", "Cathode Filament", "Focusing Cup", "Glass Envelope"],
    correctAnswer: 1,
    explanation: "Thermionic emission is the boiling off of electrons from the heated tungsten filament at the cathode."
  },
  {
    id: 27,
    question: "Which component of the X-ray tube is negatively charged to condense the electron stream?",
    options: ["Anode", "Rotor", "Focusing Cup", "Stator"],
    correctAnswer: 2,
    explanation: "The Focusing Cup (usually made of Nickel/Molybdenum) is negatively charged to repel the electrons and focus them into a narrow beam directed at the anode."
  },
  {
    id: 28,
    question: "To calculate Heat Units (HU) for a 3-Phase, 6-Pulse generator, the formula is:",
    options: ["kVp × mA × s", "kVp × mA × s × 1.35", "kVp × mA × s × 1.41", "kVp × mA × s × 0.7"],
    correctAnswer: 1,
    explanation: "3-Phase 6-Pulse generators produce more heat per exposure. The correction factor is 1.35. (For High Frequency, it is 1.40 or 1.41)."
  },
  {
    id: 29,
    question: "The 'Space Charge Effect' limits the:",
    options: ["Maximum kVp", "Maximum mA", "Exposure time", "Anode rotation speed"],
    correctAnswer: 1,
    explanation: "The space charge effect creates a cloud of electrons around the filament that repels subsequent electrons, limiting the tube's ability to produce high mA at low kVp."
  },
  {
    id: 30,
    question: "In a rotating anode tube, the rotation speed (approx 3000-10,000 rpm) helps to:",
    options: ["Focus the electron beam", "Dissipate heat over a larger track", "Increase the energy of the photons", "Reduce the heel effect"],
    correctAnswer: 1,
    explanation: "Rotation spreads the heat over a focal track rather than a single spot, allowing for higher tube currents and heat loading."
  },

  // --- SUBTOPIC: INTERACTIONS WITH MATTER ---
  {
    id: 31,
    question: "Pair Production requires an incident photon energy of at least:",
    options: ["1.02 MeV", "0.51 MeV", "140 keV", "10 MeV"],
    correctAnswer: 0,
    explanation: "Pair production only occurs when the incident photon has enough energy (1.02 MeV) to create a positron and an electron. This is used in PET scans, not general radiography."
  },
  {
    id: 32,
    question: "In Compton scattering, the scattered photon:",
    options: ["Has the same energy as the incident photon", "Has lower energy (longer wavelength) than the incident photon", "Is absorbed completely", "Turns into a positron"],
    correctAnswer: 1,
    explanation: "The incident photon transfers some energy to the recoil electron and continues as a scattered photon with reduced energy and longer wavelength."
  },
  {
    id: 33,
    question: "Which interaction is responsible for the white appearance of bone on an X-ray?",
    options: ["Compton Scatter", "Photoelectric Absorption", "Coherent Scatter", "Transmission"],
    correctAnswer: 1,
    explanation: "Differential absorption occurs because bone absorbs X-rays via the Photoelectric effect, preventing them from reaching the film (appearing white/radiopaque)."
  },

  // --- SUBTOPIC: FILTRATION & BEAM QUALITY ---
  {
    id: 34,
    question: "Adding filtration to the X-ray beam causes the emission spectrum to:",
    options: ["Shift to the left (lower energy) and increase amplitude", "Shift to the right (higher average energy) and decrease amplitude", "Increase in amplitude only", "Shift to the right and increase amplitude"],
    correctAnswer: 1,
    explanation: "Filtration removes low-energy photons (decreasing amplitude/quantity) but increases the average energy of the remaining beam (hardening/shifting right)."
  },
  {
    id: 35,
    question: "A 'Wedge Filter' is a type of compensating filter used for:",
    options: ["Skull radiography", "Chest radiography", "Foot or T-spine radiography", "Knee radiography"],
    correctAnswer: 2,
    explanation: "Wedge filters compensate for unequal body part thickness (e.g., the foot is thin at the toes and thick at the heel) to produce uniform density."
  },

  // --- SUBTOPIC: GEOMETRY & IMAGE QUALITY ---
  {
    id: 36,
    question: "Geometric Unsharpness (Penumbra) can be calculated using the formula:",
    options: ["(Focal Spot Size × OID) / SOD", "(Focal Spot Size × SID) / OID", "OID / SOD", "SID / SOD"],
    correctAnswer: 0,
    explanation: "Penumbra (P) = (Focal Spot × OID) / SOD. To reduce blur, you want a small focal spot, small OID, and large SOD."
  },
  {
    id: 37,
    question: "Shape distortion appearing as 'Elongation' typically occurs when:",
    options: ["The object is parallel to the film", "The tube or image receptor is angled", "The object is angled but the tube is perpendicular", "The central ray is perpendicular to the object"],
    correctAnswer: 1,
    explanation: "Elongation occurs when the tube or IR is angled improperly. Foreshortening occurs when the body part (object) is angled."
  },
  {
    id: 38,
    question: "Using the 'Direct Square Law' (Density Maintenance Formula), if you double the distance (SID) from 100cm to 200cm, what must you do to the mAs to maintain density?",
    options: ["Double the mAs", "Halve the mAs", "Multiply mAs by 4", "Divide mAs by 4"],
    correctAnswer: 2,
    explanation: "Because intensity drops by 4 times (Inverse Square Law), you must increase the technique (mAs) by 4 times to compensate."
  },

  // --- SUBTOPIC: GRIDS & SCATTER ---
  {
    id: 39,
    question: "A 'Focused Grid' is designed so that the lead strips are:",
    options: ["Parallel to each other", "Angled to match the divergence of the X-ray beam", "Criss-crossed", "Moving during exposure"],
    correctAnswer: 1,
    explanation: "Focused grids have canted lead strips that match the beam divergence at a specific distance (focal range) to prevent grid cut-off at the edges."
  },
  {
    id: 40,
    question: "The 'Grid Frequency' refers to:",
    options: ["The height of the lead strips", "The number of lead lines per cm or inch", "The ratio of height to distance", "The speed of the bucky"],
    correctAnswer: 1,
    explanation: "Frequency is the number of grid lines per unit length. High-frequency grids (e.g., 60-70 lines/cm) are used in digital imaging to prevent Moire artifacts."
  },
  {
    id: 41,
    question: "Which grid error results in a uniform loss of density across the entire image?",
    options: ["Off-level", "Off-center (Lateral decentering)", "Off-focus", "Upside down"],
    correctAnswer: 1,
    explanation: "If the grid is off-center (lateral decentering), the beam diverges against the lead strips, causing a uniform reduction in exposure across the whole image."
  },
  {
    id: 42,
    question: "The mechanism that moves the grid during exposure to blur out grid lines is called the:",
    options: ["Stationary Grid", "Potter-Bucky Diaphragm", "Slip Ring", "Collimator"],
    correctAnswer: 1,
    explanation: "The Potter-Bucky diaphragm (or Bucky) moves the grid (reciprocating or oscillating) to blur the grid lines so they are not visible on the image."
  },

  // --- SUBTOPIC: QA & MISCELLANEOUS PHYSICS ---
  {
    id: 43,
    question: "The accuracy of the Collimator (Light field vs X-ray field alignment) must be within:",
    options: ["± 2% of the SID", "± 5% of the SID", "± 10% of the SID", "± 1 cm regardless of SID"],
    correctAnswer: 0,
    explanation: "Quality Control standards require the light field and radiation field to align within +/- 2% of the Source-to-Image Distance (SID)."
  },
  {
    id: 44,
    question: "'Off-Focus Radiation' is produced when electrons hit:",
    options: ["The focal track", "Parts of the anode other than the focal spot", "The glass envelope", "The filter"],
    correctAnswer: 1,
    explanation: "Electrons sometimes bounce off the focal spot and strike other metal parts of the anode, creating 'extra-focal' or 'off-focus' X-rays that degrade the image (ghosting)."
  },
  {
    id: 45,
    question: "The primary purpose of the 'Stator' in the X-ray tube induction motor is to:",
    options: ["Rotate the anode using electromagnets outside the glass envelope", "Heat the filament", "Conduct heat away from the anode", "Support the cathode"],
    correctAnswer: 0,
    explanation: "The stator is the bank of electromagnets outside the glass/metal envelope that induces rotation in the internal copper rotor."
  },
  {
    id: 46,
    question: "In Fluoroscopy, the Image Intensifier input phosphor is usually made of:",
    options: ["Cesium Iodide (CsI)", "Zinc Cadmium Sulfide", "Calcium Tungstate", "Amorphous Silicon"],
    correctAnswer: 0,
    explanation: "Cesium Iodide (CsI) is the standard input phosphor because it grows in needle-like crystals that reduce light spread, improving resolution."
  },
  {
    id: 47,
    question: "Flux Gain in an image intensifier is the ratio of:",
    options: ["Output light photons to input X-ray photons", "Input X-ray photons to output light photons", "Output electron energy to input electron energy", "Diameter of input to diameter of output"],
    correctAnswer: 0,
    explanation: "Flux gain measures the intensification of the light signal: Number of output light photons divided by number of input X-ray photons."
  },
  {
    id: 48,
    question: "When using AEC (Automatic Exposure Control), the exposure is terminated when:",
    options: ["The set time is reached", "A predetermined quantity of radiation reaches the ionization chamber", "The kVp limit is reached", "The patient moves"],
    correctAnswer: 1,
    explanation: "AEC measures the radiation passing through the patient; once the ionization chamber collects enough charge (corresponding to proper density), the timer circuit breaks."
  },
  {
    id: 49,
    question: "A high Signal-to-Noise Ratio (SNR) in digital imaging results in:",
    options: ["A grainy image", "A clear image with high quality", "High patient dose", "Low contrast"],
    correctAnswer: 1,
    explanation: "Signal is the useful information; Noise is the random background interference. High SNR means a clear, high-quality image."
  },
  {
    id: 50,
    question: "The voltage across the X-ray tube is most accurately described as:",
    options: ["Direct Current (DC)", "Alternating Current (AC)", "Pulsating Direct Current", "Static Current"],
    correctAnswer: 2,
    explanation: "Even with rectification, the voltage goes from zero to peak (or ripple to peak). It is unidirectional (DC) but fluctuates (pulsating), unless it is a perfect constant potential (rare)."
  },
  {
    id: 51,
    question: "In Computed Radiography (CR), the 'Latent Image' typically loses about 25% of its energy if not processed within:",
    options: ["1 hour", "8 hours", "24 hours", "10 minutes"],
    correctAnswer: 1,
    explanation: "The latent image on a PSP plate begins to fade (fading effect) immediately. It loses roughly 25% of its stored energy within 8 hours, so timely processing is crucial."
  },
  {
    id: 52,
    question: "Which digital artifact appears as a wavy, grid-like pattern when the grid lines run parallel to the laser scan lines?",
    options: ["Ghosting", "Moire Pattern", "Dropout artifact", "Blooming"],
    correctAnswer: 1,
    explanation: "The Moire effect (aliasing) occurs when two grid patterns (the anti-scatter grid and the digital sampling grid) overlap or are aligned closely in frequency."
  },
  {
    id: 53,
    question: "A 'Histogram' in digital image processing represents:",
    options: ["The physical size of the pixels", "A graphic display of the distribution of pixel values (intensities)", "The speed of the network connection", "The patient dose report"],
    correctAnswer: 1,
    explanation: "A histogram maps the frequency of each gray level (pixel value) in the image, allowing the software to rescale the image (rescaling) for proper brightness."
  },
  {
    id: 54,
    question: "The 'Fill Factor' of a detector element (del) in Direct Radiography (DR) refers to:",
    options: ["The percentage of the pixel face that is sensitive to X-rays", "The amount of contrast medium used", "The storage capacity of the hard drive", "The speed of the scintillator"],
    correctAnswer: 0,
    explanation: "A higher Fill Factor means a larger sensing area per pixel, leading to better spatial resolution and signal-to-noise ratio (SNR)."
  },
  {
    id: 55,
    question: "In digital imaging, 'Window Level' primarily controls:",
    options: ["Image Contrast (Gray scale)", "Image Brightness (Density)", "Image Sharpness", "Image Magnification"],
    correctAnswer: 1,
    explanation: "Window Level determines the center of the visible range, affecting brightness. Window Width controls the contrast."
  },
  {
    id: 56,
    question: "Which component is used in Indirect DR systems to convert X-rays into light?",
    options: ["Photoconductor (Selenium)", "Scintillator (Cesium Iodide)", "Photomultiplier Tube", "TFT Array"],
    correctAnswer: 1,
    explanation: "Indirect systems use a Scintillator (like Cesium Iodide or Gadolinium Oxysulfide) to turn X-rays into light, which is then converted to electrons by photodiodes."
  },
  {
    id: 57,
    question: "The smallest component of a digital image matrix is the:",
    options: ["Voxel", "Pixel", "Bit", "Byte"],
    correctAnswer: 1,
    explanation: "A Pixel (Picture Element) is the 2D building block. A Voxel (Volume Element) is the 3D equivalent used in CT/MRI."
  },
  {
    id: 58,
    question: "Look-Up Table (LUT) is used during processing to:",
    options: ["Store patient data", "Apply a specific contrast characteristic curve to the raw data", "Measure the dose area product", "Reduce scatter"],
    correctAnswer: 1,
    explanation: "The LUT maps the raw pixel values to desired brightness levels to give the image the correct 'look' (contrast) for the specific body part."
  },
  {
    id: 59,
    question: "The process of 'Erasure' in CR plates is done by exposing the plate to:",
    options: ["Intense white light", "Infrared laser", "Ultraviolet light", "Heat"],
    correctAnswer: 0,
    explanation: "After the image is read, the plate is flooded with bright white light to release any remaining trapped electrons and clear the plate for reuse."
  },
  {
    id: 60,
    question: "Spatial Resolution in digital imaging is primarily limited by:",
    options: ["Pixel Size (Pixel Pitch)", "Bit Depth", "Window Width", "Processor Speed"],
    correctAnswer: 0,
    explanation: "You cannot resolve an object smaller than the pixel size. Smaller pixels (finer pitch) yield higher spatial resolution."
  },

  // --- TOPIC 3: RADIOGRAPHIC POSITIONING (Chest & Abdomen) ---
  {
    id: 61,
    question: "For a standard PA Chest X-ray, the X-ray tube should be at a SID of:",
    options: ["100 cm (40 inches)", "180 cm (72 inches)", "30 cm (12 inches)", "200 cm (80 inches)"],
    correctAnswer: 1,
    explanation: "180 cm (72 inches) is standard for chest radiography to minimize magnification of the heart and increase sharpness."
  },
  {
    id: 62,
    question: "Why is the PA projection preferred over AP for chest radiography?",
    options: ["To reduce breast exposure", "To place the heart closer to the film (reducing cardiac magnification)", "It is more comfortable", "To visualize the spine better"],
    correctAnswer: 1,
    explanation: "In PA position, the heart (anterior structure) is closer to the detector, resulting in less magnification and a truer heart size."
  },
  {
    id: 63,
    question: "To demonstrate a small pneumothorax (air in pleural space), which view is often recommended?",
    options: ["Lateral Decubitus (Affected side down)", "Expiration PA Chest", "Lordotic View", "Supine AP"],
    correctAnswer: 1,
    explanation: "An Expiration film reduces lung volume, making the pneumothorax (air) appear relatively larger and denser against the collapsed lung tissue."
  },
  {
    id: 64,
    question: "The 'Lindblom' or 'Lordotic' view is used specifically to visualize:",
    options: ["Fluid in the costophrenic angles", "The lung apices (clavicles thrown above apices)", "The heart shadow", "The diaphragm"],
    correctAnswer: 1,
    explanation: "The Apical Lordotic view projects the clavicles above the lung apices, allowing a clear view of apical lesions (e.g., TB)."
  },
  {
    id: 65,
    question: "For an acute abdomen series (suspected perforation), which view is critical to show free air under the diaphragm?",
    options: ["Supine Abdomen (KUB)", "Erect Abdomen (or Erect Chest PA)", "Lateral Abdomen", "Prone Abdomen"],
    correctAnswer: 1,
    explanation: "An Erect view (Chest or Abdomen) allows free intraperitoneal air to rise under the diaphragm, which is the sign of perforation."
  },

  // --- TOPIC 3: RADIOGRAPHIC POSITIONING (Skeletal / Extremities) ---
  {
    id: 66,
    question: "To best visualize the Scaphoid bone and rule out a fracture, the wrist should be positioned in:",
    options: ["Radial Deviation", "Ulnar Deviation", "Neutral", "Full Extension"],
    correctAnswer: 1,
    explanation: "Ulnar deviation opens up the spaces between the carpals and elongates the scaphoid, preventing overlap."
  },
  {
    id: 67,
    question: "The 'Y-view' (Scapular Y) is primarily used to evaluate:",
    options: ["Fracture of the clavicle", "Shoulder dislocation", "AC joint separation", "Scapular fracture"],
    correctAnswer: 1,
    explanation: "The Scapular Y lateral view clearly shows the humeral head's relationship to the glenoid, making it ideal for diagnosing anterior/posterior dislocations."
  },
  {
    id: 68,
    question: "The 'Frog-leg' lateral position is a common view for the:",
    options: ["Knee", "Ankle", "Hip joints (Non-trauma)", "Shoulder"],
    correctAnswer: 2,
    explanation: "The Modified Cleaves (Frog-leg) method is used for non-traumatic hip exams to visualize the femoral neck and greater trochanter."
  },
  {
    id: 69,
    question: "In a lateral knee projection, the knee is typically flexed 20-30 degrees to:",
    options: ["Prevent patellar fracture", "Relax the muscles and show maximum joint cavity volume", "Tighten the ACL", "Flatten the femoral condyles"],
    correctAnswer: 1,
    explanation: "Flexion of 20-30 degrees relaxes the patella and prevents it from being drawn into the intercondylar sulcus, while showing the joint space well."
  },
  {
    id: 70,
    question: "The 'Skyline' or 'Sunrise' view is used to visualize the:",
    options: ["Calcaneus", "Patellofemoral joint", "Acromioclavicular joint", "Zygomatic arch"],
    correctAnswer: 1,
    explanation: "This axial view (Settegast/Merchant method) looks tangentially at the patella and patellofemoral joint space."
  },

  // --- TOPIC 3: RADIOGRAPHIC POSITIONING (Skull & Spine) ---
  {
    id: 71,
    question: "The 'Waters View' (Occipitomental) is the best projection for visualizing:",
    options: ["Frontal Sinuses", "Maxillary Sinuses", "Sphenoid Sinuses", "Sella Turcica"],
    correctAnswer: 1,
    explanation: "The Waters view projects the petrous ridges below the maxillary sinuses, providing an unobstructed view of fluid levels or polyps in the maxillary antrum."
  },
  {
    id: 72,
    question: "Towne’s View (AP Axial Skull) requires a caudal angulation of:",
    options: ["10 degrees", "15 degrees", "30 degrees", "45 degrees"],
    correctAnswer: 2,
    explanation: "A 30-degree caudal angle is standard (37 degrees if using IOML) to visualize the occipital bone and foramen magnum."
  },
  {
    id: 73,
    question: "The 'Open Mouth' (Odontoid) view is essential for visualizing:",
    options: ["C1 (Atlas) and C2 (Axis)", "C7 and T1 junction", "The mandible", "The nasal bone"],
    correctAnswer: 0,
    explanation: "The AP Open Mouth view projects the Atlas (C1) and Axis (C2) dens (odontoid process) through the open mouth, free of superimposition."
  },
  {
    id: 74,
    question: "The 'Swimmer’s View' is used when:",
    options: ["The patient is wet", "The C7-T1 junction is not visible on the lateral C-spine due to shoulder superimposition", "Looking for swimmers ear", "Visualizing the lumbar spine"],
    correctAnswer: 1,
    explanation: "This view (Twining method) clears the shoulders to visualize the cervicothoracic junction (C7-T1)."
  },
  {
    id: 75,
    question: "Which projection is best for visualizing the Intervertebral Foramina of the Cervical Spine?",
    options: ["AP", "Lateral", "Oblique", "Open Mouth"],
    correctAnswer: 2,
    explanation: "Oblique views (RPO/LPO) are required to open up the intervertebral foramina in the C-spine. (Note: In L-spine, lateral view shows foramina)."
  },

  // --- TOPIC 4: CT SCAN BASICS & PHYSICS (High Yield) ---
  {
    id: 76,
    question: "The CT number (Hounsfield Unit) for pure water is calibrated to:",
    options: ["-1000", "0", "+1000", "+100"],
    correctAnswer: 1,
    explanation: "Water is the reference point for the Hounsfield scale and is always set to 0 HU."
  },
  {
    id: 77,
    question: "The CT number for Air is:",
    options: ["0 HU", "-100 HU", "-1000 HU", "+1000 HU"],
    correctAnswer: 2,
    explanation: "Air is the least dense substance typically measured, set at -1000 HU. Dense bone is +1000 HU or more."
  },
  {
    id: 78,
    question: "Which generation of CT scanners introduced the 'Slip Ring' technology allowing for Helical/Spiral scanning?",
    options: ["First Generation", "Second Generation", "Third Generation", "Fourth Generation (Spiral enabled)"],
    correctAnswer: 2,
    explanation: "Slip ring technology (continuous rotation without cables wrapping) enabled the development of Spiral/Helical CT. This is most associated with modern 3rd gen architectures."
  },
  {
    id: 79,
    question: "In CT, 'Pitch' is defined as:",
    options: ["Table movement per rotation / Beam width", "kVp / mAs", "Gantry tilt angle", "Slice thickness × Time"],
    correctAnswer: 0,
    explanation: "Pitch > 1 means the table moves faster than the beam width (gaps/lower dose). Pitch < 1 means overlap (higher detail/higher dose)."
  },
  {
    id: 80,
    question: "Beam Hardening artifact in CT (e.g., between petrous ridges) appears as:",
    options: ["Bright streaks", "Dark bands or streaks", "Blurring", "Rings"],
    correctAnswer: 1,
    explanation: "As the beam passes through dense bone, lower energy photons are absorbed (hardened). The remaining beam is more penetrating, causing the detector to underestimate attenuation, appearing as dark streaks."
  },
  {
    id: 81,
    question: "Window Width (WW) in CT determines the:",
    options: ["Center of the gray scale", "Number of gray shades displayed (Contrast)", "Spatial resolution", "Pixel size"],
    correctAnswer: 1,
    explanation: "A narrow Window Width results in high contrast (few shades). A wide Window Width (e.g., lung window) results in long gray scale."
  },
  {
    id: 82,
    question: "High Resolution CT (HRCT) of the chest typically uses:",
    options: ["Thick slices (10mm)", "Thin slices (1-2mm) with high spatial frequency algorithm", "Low kVp", "Contrast media"],
    correctAnswer: 1,
    explanation: "HRCT uses very thin slices and a sharp reconstruction kernel (bone algorithm) to visualize lung parenchyma structures like interstitium."
  },

  // --- TOPIC 5 & 6: MRI & ULTRASOUND BASICS ---
  {
    id: 83,
    question: "In MRI, T1-weighted images show fluid (like CSF) as:",
    options: ["Bright (White)", "Dark (Black)", "Grey", "Variable"],
    correctAnswer: 1,
    explanation: "On T1, fluid is dark. On T2, fluid is bright (Remember: 'H2O is bright on T2')."
  },
  {
    id: 84,
    question: "The absolute contraindication for MRI is:",
    options: ["Pregnancy (1st trimester)", "Titanium hip replacement", "Cardiac Pacemaker (Non-MRI conditional)", "Dental fillings"],
    correctAnswer: 2,
    explanation: "Ferromagnetic implants or active electronic devices like traditional pacemakers can malfunction or move, causing fatal injury."
  },
  {
    id: 85,
    question: "In Ultrasound, the frequency of the transducer is inversely proportional to:",
    options: ["Image resolution", "Penetration depth", "Cost", "Gel temperature"],
    correctAnswer: 1,
    explanation: "High frequency = High resolution but Low penetration (for superficial parts). Low frequency = Deep penetration but Lower resolution (for abdomen)."
  },
  {
    id: 86,
    question: "The Piezoelectric effect in Ultrasound refers to:",
    options: ["Conversion of electrical energy into sound waves (and vice versa)", "Heating of tissue", "Doppler shift", "Creation of X-rays"],
    correctAnswer: 0,
    explanation: "Piezoelectric crystals vibrate when electricity is applied (producing sound) and produce electricity when sound hits them (receiving echoes)."
  },

  // --- TOPIC 8: CONTRAST MEDIA (High Yield) ---
  {
    id: 87,
    question: "Which contrast agent is preferred for a patient with suspected bowel perforation?",
    options: ["Barium Sulfate", "Water-soluble iodinated contrast (Gastrografin)", "Air", "Gadolinium"],
    correctAnswer: 1,
    explanation: "Barium can cause severe peritonitis if it leaks into the peritoneum. Water-soluble contrast is absorbed by the body and is safer if leakage occurs."
  },
  {
    id: 88,
    question: "The most serious side effect of iodinated contrast media is:",
    options: ["Nausea", "Metallic taste", "Anaphylactic shock", "Hot flush"],
    correctAnswer: 2,
    explanation: "Anaphylaxis is a severe, life-threatening allergic reaction requiring immediate epinephrine."
  },
  {
    id: 89,
    question: "Non-ionic contrast media are preferred over ionic media because they have:",
    options: ["Higher osmolality", "Lower osmolality and less toxicity", "Lower cost", "Better opacity"],
    correctAnswer: 1,
    explanation: "Low Osmolar Contrast Media (LOCM) are closer to blood osmolality, reducing the risk of adverse reactions and kidney damage."
  },

  // --- TOPIC 7: RADIATION SAFETY (Laws & Limits) ---
  {
    id: 90,
    question: "A 'Radiation Safety Officer' (RSO) is responsible for:",
    options: ["Repairing the machine", "Ensuring radiation safety norms and regulations are followed", "Developing films", "Billing patients"],
    correctAnswer: 1,
    explanation: "The RSO is the designated individual responsible for implementing the radiation protection program."
  },
  {
    id: 91,
    question: "The AERB (Atomic Energy Regulatory Board) requires X-ray equipment to be registered using:",
    options: ["e-LORA", "BIS portal", "NMC website", "Local police station"],
    correctAnswer: 0,
    explanation: "e-LORA (e-Licensing of Radiation Applications) is the online portal in India for licensing and registration of radiology equipment."
  },
  {
    id: 92,
    question: "Lead gloves typically have a lead equivalent thickness of:",
    options: ["0.25 mm Pb", "0.5 mm Pb", "1.0 mm Pb", "0.1 mm Pb"],
    correctAnswer: 0,
    explanation: "Gloves usually safeguard hands which might be close to the beam; 0.25mm is standard for gloves (aprons are usually 0.25 or 0.5)."
  },
  {
    id: 93,
    question: "Which personnel monitoring device provides an immediate reading of exposure?",
    options: ["TLD Badge", "Film Badge", "Pocket Dosimeter", "OSL Badge"],
    correctAnswer: 2,
    explanation: "Pocket dosimeters (ionization chambers) give an immediate real-time reading, unlike TLD/OSL which must be processed later."
  },

  // --- TOPIC 9: ANATOMY & MISCELLANEOUS ---
  {
    id: 94,
    question: "The 'Sella Turcica' houses which gland?",
    options: ["Thyroid", "Pineal", "Pituitary", "Adrenal"],
    correctAnswer: 2,
    explanation: "The Sella Turcica is a saddle-shaped depression in the Sphenoid bone containing the Pituitary gland."
  },
  {
    id: 95,
    question: "The prominent bony landmark on the ilium used for positioning the abdomen is the:",
    options: ["Ischial tuberosity", "Iliac Crest", "Symphysis pubis", "Acetabulum"],
    correctAnswer: 1,
    explanation: "The Iliac Crest is at the level of L4-L5 and is the primary landmark for centering abdominal and lumbar spine X-rays."
  },
  {
    id: 96,
    question: "The 'Carina' is the anatomical point where:",
    options: ["The esophagus joins the stomach", "The trachea bifurcates into right and left main bronchi", "The aorta arches", "The heart sits"],
    correctAnswer: 1,
    explanation: "The Carina is at the level of T4-T5. ETT tubes should be positioned roughly 2-5cm above the carina."
  },
  {
    id: 97,
    question: "In HSG (Hysterosalpingography), the contrast is injected into the:",
    options: ["Ovaries", "Uterus and Fallopian tubes", "Bladder", "Peritoneum"],
    correctAnswer: 1,
    explanation: "HSG is used to evaluate the patency of fallopian tubes and the shape of the uterine cavity, often for infertility workups."
  },
  {
    id: 98,
    question: "IVP (Intravenous Pyelogram) primarily visualizes the:",
    options: ["Liver and Gallbladder", "Kidneys, Ureters, and Bladder", "Stomach and Intestines", "Spinal cord"],
    correctAnswer: 1,
    explanation: "IVP (or IVU) uses iodinated contrast to assess the urinary tract system functionally and structurally."
  },
  {
    id: 99,
    question: "The standard rotation of the anode in a diagnostic X-ray tube is approximately:",
    options: ["500 rpm", "3,400 rpm", "20,000 rpm", "50 rpm"],
    correctAnswer: 1,
    explanation: "Standard rotation is 3,000-3,600 rpm. High-speed rotation (for high loads) can go up to 10,000 rpm."
  },
  {
    id: 100,
    question: "What is the unit of 'Frequency' for Ultrasound?",
    options: ["Hertz (Hz)", "Decibel (dB)", "Watt", "Tesla"],
    correctAnswer: 0,
    explanation: "Frequency is cycles per second, measured in Hertz. Diagnostic US uses MegaHertz (MHz)."
  }
    ]
  },
  {
    id: "digital_imaging",
    name: "Image Receptors & Digital Imaging",
    weightage: "HIGH",
    expectedQuestions: "10-15 questions",
    priority: 3,
    mustStudy: [
      "CR, DR, TFT, CCD, selenium vs cesium iodide",
      "DQE, MTF, SNR, CNR",
      "Bit depth, pixel, matrix, spatial resolution",
      "Artifacts in Digital Radiography",
      "Histogram, LUT, preprocessing errors",
      "Exposure index (EI, DI, S-value)"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  },
  {
    id: "radiographic_positioning",
    name: "Radiographic Techniques & Positioning",
    weightage: "HIGH",
    expectedQuestions: "12-15 questions",
    priority: 4,
    mustStudy: [
      "Chest PA, Lat, Oblique",
      "Abdomen, KUB views",
      "Skull: Towne's, Caldwell, Waters",
      "Spine: L-spine oblique, C-spine AP open mouth",
      "Joints: Knee, shoulder, hip",
      "Contrast studies: Barium swallow, meal, enema",
      "Special studies: HSG, IVP, RGU/MCU"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  },
  {
    id: "ct_physics",
    name: "CT Scan Physics & Parameters",
    weightage: "MEDIUM-HIGH",
    expectedQuestions: "8-12 questions",
    priority: 5,
    mustStudy: [
      "Slip rings, detector types",
      "CT numbers (HU)",
      "Window width / level",
      "Artifacts (beam hardening, streak, motion)",
      "Pitch, collimation, mA modulation",
      "Contrast phases (arterial, venous, delayed)"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  },
  {
    id: "mri_basics_safety",
    name: "MRI Basics & Safety",
    weightage: "MEDIUM",
    expectedQuestions: "8-10 questions",
    priority: 6,
    mustStudy: [
      "T1, T2 relaxation",
      "Spin echo, GRE",
      "MRI safety (SAR, projectiles)",
      "Contraindications: pacemakers, aneurysm clips",
      "Coils: surface, phased-array, volume",
      "Common artifacts"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  },
  {
    id: "contrast_media",
    name: "Contrast Media",
    weightage: "MEDIUM",
    expectedQuestions: "5-8 questions",
    priority: 7,
    mustStudy: [
      "Ionic vs non-ionic",
      "Osmolality",
      "Anaphylaxis management",
      "Barium vs iodine use",
      "Reactions (mild, moderate, severe)"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  },
  {
    id: "ultrasound_physics",
    name: "Ultrasound & Doppler Physics",
    weightage: "MEDIUM",
    expectedQuestions: "6-10 questions",
    priority: 8,
    mustStudy: [
      "Piezoelectric effect",
      "Acoustic impedance, attenuation",
      "Doppler shift",
      "Aliasing",
      "Modes: A, B, M, Doppler, Duplex",
      "Artifacts: reverberation, shadowing, enhancement"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  },
  {
    id: "radiological_anatomy",
    name: "Radiological Anatomy",
    weightage: "MEDIUM",
    expectedQuestions: "8-12 questions",
    priority: 9,
    mustStudy: [
      "Bones: skull, spine, joints",
      "Chest anatomy (hilum, fissures)",
      "Abdomen & pelvis",
      "Vascular anatomy (CT/MRI)",
      "Brain lobes, ventricles"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  },
  {
    id: "mammography",
    name: "Mammography",
    weightage: "LOW-MEDIUM",
    expectedQuestions: "4-6 questions",
    priority: 10,
    mustStudy: [
      "kVp (25–32)",
      "Target-filter: Mo-Mo, Mo-Rh, Rh-Rh",
      "Compression force",
      "AEC / grid use",
      "Breast composition (fat—radiolucent)"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  }
]

// Helper function to get weightage color
export const getWeightageColor = (weightage: WeightageTopic["weightage"]): string => {
  switch (weightage) {
    case "VERY HIGH":
      return "text-red-500 bg-red-500/10 border-red-500/30"
    case "HIGH":
      return "text-orange-500 bg-orange-500/10 border-orange-500/30"
    case "MEDIUM-HIGH":
      return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30"
    case "MEDIUM":
      return "text-blue-500 bg-blue-500/10 border-blue-500/30"
    case "LOW-MEDIUM":
      return "text-green-500 bg-green-500/10 border-green-500/30"
    default:
      return "text-muted-foreground bg-muted/10"
  }
}

// Helper function to get priority badge color
export const getPriorityBadgeColor = (priority: number): string => {
  if (priority <= 2) return "bg-red-500 text-white"
  if (priority <= 4) return "bg-orange-500 text-white"
  if (priority <= 6) return "bg-yellow-500 text-black"
  if (priority <= 8) return "bg-blue-500 text-white"
  return "bg-green-500 text-white"
}
