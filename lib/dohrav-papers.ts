// Dohrav (दोहराव) - Test Paper Question Bank
// Papers sourced from: Lucknow Cantonment Board, NCL Radiographer, ISRO Radiographer

export interface DohravQuestion {
  id: string           // "p1_q1" format (paper_question)
  question: string
  options: string[]    // 4 options
  correctAnswer: number // 0-indexed
  explanation: string
}

export interface DohravPaper {
  id: number
  name: string
  subtitle: string
  totalQuestions: number
  questions: DohravQuestion[]
}

export const dohravPapers: DohravPaper[] = [
  {
    "id": 1,
    "name": "Paper 1",
    "subtitle": "Lucknow Cantonment Board — X-Ray Technician",
    "totalQuestions": 50,
    "questions": [
      {
        "id": "p1_q1",
        "question": "A micron is _____ times smaller than a millimetre.",
        "options": [
          "500",
          "250",
          "1000",
          "2000"
        ],
        "correctAnswer": 2,
        "explanation": "1 millimetre = 1000 micrometres (microns). So a micron is 1000 times smaller than a millimetre."
      },
      {
        "id": "p1_q2",
        "question": "G-CSF (Granulocyte Colony-Stimulating Factor) is produced by:",
        "options": [
          "Stromal cells of the marrow",
          "Lymphocytes",
          "Granulocytes",
          "Stem cells"
        ],
        "correctAnswer": 0,
        "explanation": "G-CSF is primarily produced by stromal cells of the bone marrow, including fibroblasts, endothelial cells, and macrophages. It stimulates granulocyte production."
      },
      {
        "id": "p1_q3",
        "question": "Acid phosphatase is demonstrated by an azo dye coupling technique that depends upon the hydrolysis of a substrate containing:",
        "options": [
          "NAD",
          "NADPH",
          "G6PD",
          "α-Naphthol phosphate"
        ],
        "correctAnswer": 3,
        "explanation": "The azo dye method for acid phosphatase uses α-naphthol phosphate as a substrate. The enzyme hydrolyzes this substrate, releasing α-naphthol which couples with a diazonium salt to form a colored azo dye."
      },
      {
        "id": "p1_q4",
        "question": "Zenker's solution is recommended for the fixation of small pieces of which type of tissue?",
        "options": [
          "Liver",
          "Spleen",
          "None of these",
          "Both Liver & Spleen"
        ],
        "correctAnswer": 3,
        "explanation": "Zenker's fixative is a mercuric chloride-based fixative recommended for small tissue pieces of both liver and spleen. It provides excellent nuclear detail and is good for trichrome staining."
      },
      {
        "id": "p1_q5",
        "question": "Name the gas used in preparation of bleaching powder:",
        "options": [
          "None of these",
          "Chlorine",
          "Nitrogen",
          "Hydrogen"
        ],
        "correctAnswer": 1,
        "explanation": "Bleaching powder (calcium hypochlorite) is prepared by passing chlorine gas over dry slaked lime. The reaction is: Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O."
      },
      {
        "id": "p1_q6",
        "question": "Heat will accelerate the process of:",
        "options": [
          "Dehydration",
          "Demineralization",
          "Mounting",
          "Clearing"
        ],
        "correctAnswer": 1,
        "explanation": "Heat accelerates the process of demineralization (decalcification) in histology. Applying gentle heat to acid solutions speeds up the removal of calcium salts from bone and calcified tissues."
      },
      {
        "id": "p1_q7",
        "question": "Which endocrine gland secretes insulin and glucagon hormone?",
        "options": [
          "Adrenal gland",
          "Pancreas",
          "Pituitary gland",
          "Thymus gland"
        ],
        "correctAnswer": 1,
        "explanation": "The pancreas is the endocrine gland that secretes both insulin (from beta cells) and glucagon (from alpha cells) of the Islets of Langerhans. These hormones regulate blood glucose levels."
      },
      {
        "id": "p1_q8",
        "question": "Which disease is caused due to deficient iodine in diet?",
        "options": [
          "Cretinism",
          "Acromegaly",
          "Beri-beri",
          "Goiter"
        ],
        "correctAnswer": 3,
        "explanation": "Goiter is the enlargement of the thyroid gland caused by iodine deficiency. Without sufficient iodine, the thyroid cannot produce adequate thyroid hormones, leading to compensatory gland enlargement."
      },
      {
        "id": "p1_q9",
        "question": "Cushing's syndrome is caused due to hyperactivity of:",
        "options": [
          "Adrenal cortex",
          "Adrenal medulla",
          "Parathyroid gland",
          "Thyroid gland"
        ],
        "correctAnswer": 0,
        "explanation": "Cushing's syndrome results from prolonged exposure to excess cortisol, typically due to hyperactivity of the adrenal cortex. It causes obesity, hypertension, muscle weakness, and moon face."
      },
      {
        "id": "p1_q10",
        "question": "Gilt-edged market means:",
        "options": [
          "Market of guns",
          "Market of government securities",
          "Market of pure metals",
          "Bullion market"
        ],
        "correctAnswer": 1,
        "explanation": "Gilt-edged market refers to the market for government securities (gilts). These are considered very safe investments as they are backed by the government, hence called 'gilt-edged' (golden edge)."
      },
      {
        "id": "p1_q11",
        "question": "Which one of the following lipoprotein has maximum density?",
        "options": [
          "LDL",
          "VLDL",
          "HDL",
          "Chylomicrons"
        ],
        "correctAnswer": 2,
        "explanation": "HDL (High-Density Lipoprotein) has the maximum density among lipoproteins. The density order is: HDL > LDL > IDL > VLDL > Chylomicrons. HDL is called 'good cholesterol' as it removes cholesterol from arteries."
      },
      {
        "id": "p1_q12",
        "question": "Which component of the nucleus has phosphoric acid and four nitrogenous bases?",
        "options": [
          "DNA",
          "Nucleoli",
          "RNA",
          "Chromatin"
        ],
        "correctAnswer": 0,
        "explanation": "DNA (Deoxyribonucleic Acid) contains phosphoric acid and four nitrogenous bases: Adenine, Guanine, Cytosine, and Thymine. It stores genetic information in the nucleus."
      },
      {
        "id": "p1_q13",
        "question": "Areolar tissue, fibrous tissue, yellow elastic, reticular, adipose, lymphoid tissue, cartilage, bone & teeth are examples of which type of tissue?",
        "options": [
          "Connective tissue",
          "Nervous tissue",
          "Muscular tissue",
          "Epithelial tissue"
        ],
        "correctAnswer": 0,
        "explanation": "All these are types of connective tissue. Connective tissue provides structural support and connects different parts of the body. It includes loose (areolar, adipose), dense (fibrous, elastic), and specialized types (cartilage, bone)."
      },
      {
        "id": "p1_q14",
        "question": "Which of the following types of energy can be used to decompose water into its elements?",
        "options": [
          "Heat energy",
          "Chemical energy",
          "Electrical energy",
          "Light energy"
        ],
        "correctAnswer": 2,
        "explanation": "Electrical energy can decompose water into hydrogen and oxygen through electrolysis. When electric current passes through water, it breaks the H-O bonds: 2H₂O → 2H₂ + O₂."
      },
      {
        "id": "p1_q15",
        "question": "Blood pressure & cardiac output is increased during:",
        "options": [
          "Eating",
          "Both Exercise & Sleeping",
          "Exercise",
          "Sleeping"
        ],
        "correctAnswer": 2,
        "explanation": "During exercise, the body demands more oxygen and nutrients. The heart pumps faster and harder, increasing both cardiac output and blood pressure to meet the increased metabolic demands."
      },
      {
        "id": "p1_q16",
        "question": "_______ is the longest & largest bone of the skeleton.",
        "options": [
          "Femur",
          "Humerus",
          "Tibia",
          "Fibula"
        ],
        "correctAnswer": 0,
        "explanation": "The femur (thigh bone) is the longest and largest bone in the human body. In an adult, it is approximately 48 cm long and supports the weight of the body."
      },
      {
        "id": "p1_q17",
        "question": "Muscles having double nerve supply:",
        "options": [
          "Trapezius",
          "Adductor magnus",
          "All of the above",
          "Digastric muscle"
        ],
        "correctAnswer": 2,
        "explanation": "All listed muscles have dual nerve supply: Digastric (trigeminal V3 + facial VII), Trapezius (accessory nerve + C3,C4), and Adductor magnus (obturator nerve + sciatic nerve)."
      },
      {
        "id": "p1_q18",
        "question": "A dark purple compound used as an antiseptic and disinfectant is:",
        "options": [
          "Calcium phosphate",
          "Sodium thiosulphate",
          "Potassium permanganate",
          "Potassium nitrate"
        ],
        "correctAnswer": 2,
        "explanation": "Potassium permanganate (KMnO₄) is a dark purple crystalline compound used as an antiseptic and disinfectant. It is a strong oxidizing agent used for wound cleaning and water purification."
      },
      {
        "id": "p1_q19",
        "question": "Which wave in ECG represents ventricular septal activity and is shown by an inconspicuous downward deflection?",
        "options": [
          "S wave",
          "Q wave",
          "R wave",
          "T wave"
        ],
        "correctAnswer": 1,
        "explanation": "The Q wave represents the initial depolarization of the interventricular septum. It appears as a small downward (negative) deflection before the R wave in the QRS complex."
      },
      {
        "id": "p1_q20",
        "question": "On which factor is the blood pressure dependent?",
        "options": [
          "All of these",
          "Cardiac output",
          "Peripheral resistance",
          "Systolic force"
        ],
        "correctAnswer": 0,
        "explanation": "Blood pressure depends on all these factors: systolic force (heart contraction strength), cardiac output (volume pumped per minute), and peripheral resistance (resistance in blood vessels). BP = CO × TPR."
      },
      {
        "id": "p1_q21",
        "question": "Which type of cell is increased in body fluid in bacterial infection?",
        "options": [
          "Basophil",
          "Neutrophil",
          "Macrophages",
          "Eosinophil"
        ],
        "correctAnswer": 1,
        "explanation": "Neutrophils are the first responders to bacterial infections and their count increases significantly (neutrophilia). They constitute 60-70% of white blood cells and are the primary phagocytic cells."
      },
      {
        "id": "p1_q22",
        "question": "Which is NOT found in DNA?",
        "options": [
          "Uracil",
          "Guanine",
          "Thymine",
          "Adenine"
        ],
        "correctAnswer": 0,
        "explanation": "Uracil is found in RNA, not DNA. DNA contains Adenine, Guanine, Cytosine, and Thymine. In RNA, Uracil replaces Thymine and pairs with Adenine."
      },
      {
        "id": "p1_q23",
        "question": "In the strip method, the color of the strip changes to _____ when the urine contains albumin.",
        "options": [
          "Orange",
          "Red",
          "Green",
          "Yellow"
        ],
        "correctAnswer": 2,
        "explanation": "In urine dipstick testing, the albumin (protein) pad changes to green when albumin is present. The intensity of green color increases with higher albumin concentration."
      },
      {
        "id": "p1_q24",
        "question": "Hormones that regulate salt and water balance except:",
        "options": [
          "1,25-dihydroxycholecalciferol",
          "Vasopressin",
          "Calcitonin",
          "Parathyroid hormone"
        ],
        "correctAnswer": 2,
        "explanation": "Calcitonin primarily regulates calcium metabolism by lowering blood calcium levels, not salt and water balance. Vasopressin (ADH), PTH, and vitamin D all play roles in electrolyte and water homeostasis."
      },
      {
        "id": "p1_q25",
        "question": "Which method is used for the estimation of hormones?",
        "options": [
          "ELISA",
          "All of the above",
          "Fluorimetric assay",
          "Radioimmunoassay (RIA)"
        ],
        "correctAnswer": 1,
        "explanation": "All listed methods are used for hormone estimation: RIA uses radioactive labels, ELISA uses enzyme-linked antibodies, and fluorimetric assay uses fluorescent compounds. Each has specific applications in endocrinology."
      },
      {
        "id": "p1_q26",
        "question": "Amino acids are building blocks for:",
        "options": [
          "Proteins",
          "Lipids",
          "DNA",
          "Carbohydrates"
        ],
        "correctAnswer": 0,
        "explanation": "Amino acids are the fundamental building blocks of proteins. There are 20 standard amino acids that link together through peptide bonds to form polypeptide chains, which fold into functional proteins."
      },
      {
        "id": "p1_q27",
        "question": "In diabetes, _____ level is raised.",
        "options": [
          "Blood sugar",
          "Blood urea",
          "Blood cholesterol",
          "Blood lipid"
        ],
        "correctAnswer": 0,
        "explanation": "In diabetes mellitus, blood sugar (glucose) level is raised due to insufficient insulin production (Type 1) or insulin resistance (Type 2). Normal fasting blood glucose is 70-100 mg/dL."
      },
      {
        "id": "p1_q28",
        "question": "Oils and fats are obtained from:",
        "options": [
          "Animal sources only",
          "Vegetable sources only",
          "Synthesis",
          "Both animal and vegetable sources"
        ],
        "correctAnswer": 3,
        "explanation": "Oils and fats are obtained from both animal sources (butter, lard, fish oil) and vegetable sources (coconut oil, olive oil, sunflower oil). Animal fats tend to be saturated while vegetable oils are mostly unsaturated."
      },
      {
        "id": "p1_q29",
        "question": "Serum amylase is increased in:",
        "options": [
          "Renal failure",
          "Obesity",
          "Acute pancreatitis",
          "Diabetes"
        ],
        "correctAnswer": 2,
        "explanation": "Serum amylase is markedly elevated in acute pancreatitis, often rising to 3-5 times the upper limit of normal within hours of onset. It is a key diagnostic marker for acute pancreatic inflammation."
      },
      {
        "id": "p1_q30",
        "question": "Which of the following is most important in causing coronary artery disease?",
        "options": [
          "HDL",
          "LDL",
          "Triglycerides",
          "VLDL"
        ],
        "correctAnswer": 1,
        "explanation": "LDL (Low-Density Lipoprotein) is the most important factor in causing coronary artery disease. It deposits cholesterol in arterial walls, leading to atherosclerosis. LDL is called 'bad cholesterol'."
      },
      {
        "id": "p1_q31",
        "question": "Which protein is synthesized by platelets?",
        "options": [
          "Albumin",
          "Collagen",
          "Fibrinogen",
          "Globulin"
        ],
        "correctAnswer": 2,
        "explanation": "Platelets contain and release fibrinogen, which is essential for blood clotting. During the coagulation cascade, fibrinogen is converted to fibrin threads that form the structural framework of a blood clot."
      },
      {
        "id": "p1_q32",
        "question": "Which blood cell is essential for blood clotting?",
        "options": [
          "White blood cell",
          "Platelets",
          "Red blood cell",
          "All of the above"
        ],
        "correctAnswer": 1,
        "explanation": "Platelets (thrombocytes) are essential for blood clotting. They aggregate at the site of injury, form a platelet plug, and release clotting factors that initiate the coagulation cascade."
      },
      {
        "id": "p1_q33",
        "question": "The difference between isotopes of an element is due to the presence of a different number of:",
        "options": [
          "Electrons",
          "Neutrons",
          "Protons",
          "Photons"
        ],
        "correctAnswer": 1,
        "explanation": "Isotopes of an element have the same number of protons (same atomic number) but different numbers of neutrons, giving them different mass numbers. For example, Carbon-12 and Carbon-14 differ in neutron count."
      },
      {
        "id": "p1_q34",
        "question": "Permanent hardness of water is due to the presence of:",
        "options": [
          "Magnesium bicarbonate",
          "Calcium sulphate",
          "Calcium bicarbonate",
          "Sodium bicarbonate"
        ],
        "correctAnswer": 1,
        "explanation": "Permanent hardness is caused by dissolved calcium and magnesium sulphates and chlorides. Unlike temporary hardness (caused by bicarbonates), permanent hardness cannot be removed by boiling."
      },
      {
        "id": "p1_q35",
        "question": "_____ is known as the powerhouse of the cell.",
        "options": [
          "Mitochondria",
          "Ribosome",
          "Golgi apparatus",
          "Lysosomes"
        ],
        "correctAnswer": 0,
        "explanation": "Mitochondria are called the powerhouse of the cell because they produce ATP (adenosine triphosphate) through cellular respiration (oxidative phosphorylation), providing energy for cellular functions."
      },
      {
        "id": "p1_q36",
        "question": "Malaria infection can be transmitted by:",
        "options": [
          "All of the above",
          "Blood transfusion",
          "Anopheles mosquito bite",
          "Transmission through placenta"
        ],
        "correctAnswer": 0,
        "explanation": "Malaria can be transmitted through all these routes: bite of infected female Anopheles mosquito (primary route), blood transfusion from infected donor, and transplacentally from mother to fetus (congenital malaria)."
      },
      {
        "id": "p1_q37",
        "question": "0°K (zero Kelvin) is equivalent to:",
        "options": [
          "273°C",
          "0°C",
          "-273°C",
          "100°C"
        ],
        "correctAnswer": 2,
        "explanation": "Absolute zero (0 K) is equivalent to -273.15°C. This is the lowest possible temperature where all molecular motion theoretically ceases. The conversion formula is: °C = K - 273.15."
      },
      {
        "id": "p1_q38",
        "question": "In Myelography, the intrathecal contrast injection is injected into which space?",
        "options": [
          "Sub-arachnoid",
          "Intra-medullary",
          "Extra-dural",
          "Sub-dural"
        ],
        "correctAnswer": 0,
        "explanation": "In myelography, contrast medium is injected into the subarachnoid space (intrathecal injection) to visualize the spinal cord, nerve roots, and surrounding structures. This space contains cerebrospinal fluid (CSF)."
      },
      {
        "id": "p1_q39",
        "question": "Basic protein is:",
        "options": [
          "Histone",
          "Albumin",
          "Globulin",
          "Glutelin"
        ],
        "correctAnswer": 0,
        "explanation": "Histones are basic proteins found in cell nuclei that are rich in positively charged amino acids (lysine and arginine). They bind to negatively charged DNA and help package it into chromatin."
      },
      {
        "id": "p1_q40",
        "question": "Ferritin is stored in:",
        "options": [
          "Liver",
          "All of the above",
          "Gut",
          "Spleen"
        ],
        "correctAnswer": 1,
        "explanation": "Ferritin, the primary iron storage protein, is stored in multiple organs including the liver (major storage site), spleen, gut mucosa, and bone marrow. Serum ferritin levels reflect total body iron stores."
      },
      {
        "id": "p1_q41",
        "question": "Which component is used as an amplifying device?",
        "options": [
          "Electric cell",
          "Transistor",
          "Transformer",
          "Diode"
        ],
        "correctAnswer": 1,
        "explanation": "A transistor is used as an amplifying device. It can amplify weak electrical signals by using a small input current to control a larger output current. This principle is fundamental in electronic circuits."
      },
      {
        "id": "p1_q42",
        "question": "The following two amino acids are semi-essential:",
        "options": [
          "Arginine, histidine",
          "Proline, phenylalanine",
          "Cysteine, tyrosine",
          "Serine, threonine"
        ],
        "correctAnswer": 0,
        "explanation": "Arginine and histidine are semi-essential (conditionally essential) amino acids. They are essential during growth and development in children but can be synthesized by adults in sufficient quantities."
      },
      {
        "id": "p1_q43",
        "question": "The temperature at which a substance catches fire is called its:",
        "options": [
          "Ignition temperature",
          "Heat temperature",
          "Melting point",
          "Boiling point"
        ],
        "correctAnswer": 0,
        "explanation": "Ignition temperature (or kindling temperature) is the minimum temperature at which a substance catches fire and begins to burn without an external flame. Different substances have different ignition temperatures."
      },
      {
        "id": "p1_q44",
        "question": "Intraoperative radiation therapy (IORT) is used to treat an exposed tumor during cancer surgery. Which rays are used in this treatment?",
        "options": [
          "X-rays, gamma rays, and electron beams",
          "Infrared rays",
          "Neutrons",
          "UV rays"
        ],
        "correctAnswer": 0,
        "explanation": "IORT uses high-energy X-rays, gamma rays, and electron beams delivered directly to the tumor bed during surgery. This allows precise delivery of a concentrated dose while minimizing exposure to surrounding normal tissues."
      },
      {
        "id": "p1_q45",
        "question": "All of the following infectious diseases are transmitted by milk EXCEPT:",
        "options": [
          "Tuberculosis",
          "Salmonellosis",
          "Hepatitis A virus",
          "Brucellosis"
        ],
        "correctAnswer": 2,
        "explanation": "Hepatitis A is primarily transmitted through the fecal-oral route (contaminated water/food), not through milk. Tuberculosis, brucellosis, and salmonellosis can all be transmitted through unpasteurized milk."
      },
      {
        "id": "p1_q46",
        "question": "Cytology helps in the diagnosis of:",
        "options": [
          "All of the above",
          "Evaluation of endocrine disorder",
          "In assessment of hormonal activity",
          "Malignancy"
        ],
        "correctAnswer": 0,
        "explanation": "Cytology (study of cells) helps in diagnosing malignancy (Pap smear, FNAC), evaluating endocrine disorders, and assessing hormonal activity (vaginal cytology). It is a key diagnostic tool across multiple domains."
      },
      {
        "id": "p1_q47",
        "question": "Ultrasonic sounds are sounds which have frequencies more than:",
        "options": [
          "30 KHz",
          "15 KHz",
          "20 KHz",
          "50 KHz"
        ],
        "correctAnswer": 2,
        "explanation": "Ultrasound refers to sound waves with frequencies above the upper limit of human hearing, which is 20 KHz (20,000 Hz). Medical ultrasound typically uses frequencies of 1-20 MHz."
      },
      {
        "id": "p1_q48",
        "question": "Syphilis is caused by:",
        "options": [
          "Human papilloma virus",
          "Neisseria gonorrhoeae",
          "Human immunodeficiency virus",
          "Treponema pallidum"
        ],
        "correctAnswer": 3,
        "explanation": "Syphilis is caused by the spirochete bacterium Treponema pallidum. It is a sexually transmitted infection that progresses through primary, secondary, latent, and tertiary stages if untreated."
      },
      {
        "id": "p1_q49",
        "question": "In zinc sulphate flotation technique, what percentage of zinc sulphate solution is used?",
        "options": [
          "33%",
          "35%",
          "31%",
          "25%"
        ],
        "correctAnswer": 0,
        "explanation": "The zinc sulphate flotation technique uses a 33% zinc sulphate solution (specific gravity 1.18). This concentration allows parasite eggs and cysts to float to the surface while heavier debris sinks."
      },
      {
        "id": "p1_q50",
        "question": "Carbon dating technique is used to determine:",
        "options": [
          "Volume of liquids",
          "Weight of non-metals",
          "Age of plastic",
          "Age of fossils"
        ],
        "correctAnswer": 3,
        "explanation": "Carbon-14 dating is used to determine the age of fossils and archaeological specimens. It measures the decay of radioactive Carbon-14 isotope, which has a half-life of approximately 5,730 years."
      }
    ]
  },
  {
    "id": 2,
    "name": "Paper 2",
    "subtitle": "NCL — Radiographer",
    "totalQuestions": 70,
    "questions": [
      {
        "id": "p2_q1",
        "question": "Which part of the body is X-rayed in 'Frog position'?",
        "options": [
          "Knee joint",
          "Pelvis",
          "Hip joint",
          "Elbow joint"
        ],
        "correctAnswer": 2,
        "explanation": "The frog-leg (or frog) position is used to X-ray the hip joint. The patient lies supine with the hip abducted and externally rotated, knee flexed — resembling a frog's leg. This view is especially used in pediatric hip assessment."
      },
      {
        "id": "p2_q2",
        "question": "Which of the following will help in reducing radiation exposure to patients?\n1. High KV, low mAs\n2. Collimation\n3. Filtration",
        "options": [
          "1 and 3 only",
          "2 and 3 only",
          "1, 2 and 3",
          "1 and 2 only"
        ],
        "correctAnswer": 2,
        "explanation": "All three reduce patient dose: High kV/low mAs reduces skin dose; collimation limits the beam to the area of interest; filtration removes low-energy X-rays that would only increase patient dose without contributing to the image."
      },
      {
        "id": "p2_q3",
        "question": "The unit of dose equivalent used to express radiation dose in living tissue is:",
        "options": [
          "Erg",
          "Rad",
          "Rem",
          "Roentgen"
        ],
        "correctAnswer": 2,
        "explanation": "Rem (Roentgen Equivalent Man) is the unit of dose equivalent used to express biological effect of radiation in living tissue. The SI equivalent is Sievert (Sv), where 1 Sv = 100 rem."
      },
      {
        "id": "p2_q4",
        "question": "TLD badge should be worn at:",
        "options": [
          "The back side at the shoulder position",
          "Outside the lead apron collar position",
          "Outside the lead apron stomach position",
          "Inside the lead apron chest level"
        ],
        "correctAnswer": 1,
        "explanation": "TLD (Thermoluminescent Dosimeter) badge should be worn outside the lead apron at collar (thyroid) level. This position gives the best estimate of dose to the thyroid and head, which are most radiosensitive areas not covered by the apron."
      },
      {
        "id": "p2_q5",
        "question": "The common bile duct opens into the:",
        "options": [
          "Lateral wall of the second part of duodenum",
          "Medial wall of the third part of duodenum",
          "Medial wall of the first part of duodenum",
          "Medial wall of the second part of duodenum"
        ],
        "correctAnswer": 3,
        "explanation": "The common bile duct opens into the medial (posteromedial) wall of the second part of the duodenum at the major duodenal papilla (ampulla of Vater), usually along with the main pancreatic duct."
      },
      {
        "id": "p2_q6",
        "question": "The stomach is located primarily within the:",
        "options": [
          "Right lower quadrant",
          "Left upper quadrant",
          "Right upper quadrant",
          "Left lower quadrant"
        ],
        "correctAnswer": 1,
        "explanation": "The stomach is located primarily in the left upper quadrant (LUQ) and the epigastric region of the abdomen. The fundus lies under the left dome of the diaphragm."
      },
      {
        "id": "p2_q7",
        "question": "Normally a patient is asked to inhale deeply when having the lungs X-rayed. Which of the following is the BEST reason for that?",
        "options": [
          "Increased contrast",
          "Greater magnification",
          "Greater area of lung structures shown",
          "More uniform density"
        ],
        "correctAnswer": 2,
        "explanation": "Deep inspiration expands the lungs fully, showing a greater area of lung structures. This allows better visualization of the lung fields, bases, and costophrenic angles, and helps detect pathology that might be hidden in a poorly inflated lung."
      },
      {
        "id": "p2_q8",
        "question": "Compression is used during excretory urography in order to accomplish which of the following?",
        "options": [
          "Immobilizing the patient",
          "Retaining the contrast medium in the collecting system",
          "Preventing the patient from breathing during exposure",
          "Aiding in the excretion process"
        ],
        "correctAnswer": 1,
        "explanation": "Compression bands are applied over the distal ureters during excretory urography (IVU) to retain contrast medium in the pelvicalyceal system. This causes better distension and filling of the renal pelvis and calyces for improved visualization."
      },
      {
        "id": "p2_q9",
        "question": "Which of the following is a radiographic study of the urinary bladder that involves the direct injection of a contrast media through a catheter?",
        "options": [
          "Cystogram",
          "Intravenous urogram",
          "Retrograde pyelogram",
          "Intravenous pyelogram"
        ],
        "correctAnswer": 0,
        "explanation": "A cystogram involves direct injection of contrast media into the urinary bladder through a catheter (retrograde filling). This demonstrates the bladder morphology, vesicoureteral reflux, and urethral anatomy during voiding."
      },
      {
        "id": "p2_q10",
        "question": "The frequencies of Ultrasound used in medical imaging are in the range of:",
        "options": [
          "1-20 MHz",
          "10-20 KHz",
          "1-20 Hz",
          "10-20 MHz"
        ],
        "correctAnswer": 0,
        "explanation": "Medical diagnostic ultrasound uses frequencies in the range of 1-20 MHz (megahertz). Lower frequencies (1-5 MHz) penetrate deeper for abdominal imaging, while higher frequencies (7-20 MHz) provide better resolution for superficial structures."
      },
      {
        "id": "p2_q11",
        "question": "What form of energy is used in MRI?",
        "options": [
          "Ultraviolet",
          "Sound waves",
          "X-rays",
          "Radio waves"
        ],
        "correctAnswer": 3,
        "explanation": "MRI uses radiofrequency (RF) waves and strong magnetic fields to produce images. Radio waves are non-ionizing electromagnetic radiation. The patient's hydrogen atoms resonate with the RF pulses, and the emitted signals are used to construct images."
      },
      {
        "id": "p2_q12",
        "question": "The abdominal aorta bifurcates into Left and Right:",
        "options": [
          "Popliteal arteries",
          "Tibial arteries",
          "Femoral arteries",
          "Common iliac arteries"
        ],
        "correctAnswer": 3,
        "explanation": "The abdominal aorta bifurcates into the left and right common iliac arteries at the level of L4 vertebra. Each common iliac artery further divides into external and internal iliac arteries."
      },
      {
        "id": "p2_q13",
        "question": "Which of the following radiological procedures outlines the Spinal cord?",
        "options": [
          "KUB Radiography",
          "Myelography",
          "Thermography",
          "Xeroradiography"
        ],
        "correctAnswer": 1,
        "explanation": "Myelography involves injecting contrast into the subarachnoid space to outline the spinal cord, nerve roots, and thecal sac. It can detect spinal cord compression, disc herniations, and tumors."
      },
      {
        "id": "p2_q14",
        "question": "Unexposed X-ray film is comprised of a transparent polyester base coated with an emulsion containing radiation-sensitive particles known as:",
        "options": [
          "Silver iodide",
          "Silver bromide",
          "Neither Silver bromide nor Silver iodide",
          "Both Silver bromide and Silver iodide"
        ],
        "correctAnswer": 3,
        "explanation": "X-ray film emulsion contains both silver bromide (AgBr) and silver iodide (AgI) crystals suspended in gelatin. Silver bromide is the predominant component (~98%), with a small amount of silver iodide (~2%) to increase sensitivity."
      },
      {
        "id": "p2_q15",
        "question": "Swimmer's view is used for taking X-Rays of:",
        "options": [
          "Cervico-thoracic junction",
          "Coccyx",
          "Humerus",
          "Lumbo-sacral spine"
        ],
        "correctAnswer": 0,
        "explanation": "The Swimmer's lateral view is specifically used to visualize the cervico-thoracic junction (C7-T1). The patient extends one arm above the head and the other down, separating the shoulders to allow clear visualization of this area."
      },
      {
        "id": "p2_q16",
        "question": "Waters' view is used for taking X-Rays of:",
        "options": [
          "Paranasal sinuses",
          "Base of skull",
          "Mastoid bones",
          "Orbits"
        ],
        "correctAnswer": 0,
        "explanation": "Waters' view (parietoacanthial projection) is the best view for demonstrating the maxillary sinuses (paranasal sinuses). The chin is elevated so the petrous bones are projected below the maxillary sinuses."
      },
      {
        "id": "p2_q17",
        "question": "Apicogram is used for taking X-Rays of:",
        "options": [
          "Diaphragm",
          "Base of lung",
          "Apices of lung",
          "Mediastinum"
        ],
        "correctAnswer": 2,
        "explanation": "An apicogram (lordotic view/AP axial projection) is specifically designed to visualize the lung apices. By tilting the X-ray tube or the patient, the clavicles are projected above the lung apices, providing clear visualization."
      },
      {
        "id": "p2_q18",
        "question": "Which procedure uses non-ionizing radiation?",
        "options": [
          "X-Ray",
          "CT",
          "Nuclear medical imaging",
          "MRI"
        ],
        "correctAnswer": 3,
        "explanation": "MRI (Magnetic Resonance Imaging) uses radiofrequency waves and magnetic fields, which are non-ionizing forms of radiation. X-ray, CT, and nuclear medicine all use ionizing radiation."
      },
      {
        "id": "p2_q19",
        "question": "To detect gas-fluid level in the abdomen, following X-ray views of abdomen are taken:",
        "options": [
          "AP view",
          "Erect view",
          "Both Lateral decubitus and Erect views",
          "Lateral decubitus view"
        ],
        "correctAnswer": 2,
        "explanation": "Both lateral decubitus and erect views can demonstrate air-fluid levels. The erect view shows levels in a vertical orientation, while the lateral decubitus allows detection when the patient cannot stand. Both use a horizontal X-ray beam."
      },
      {
        "id": "p2_q20",
        "question": "The most damaging type of radiation is:",
        "options": [
          "Beta rays",
          "Alpha rays",
          "Gamma rays",
          "X-rays"
        ],
        "correctAnswer": 1,
        "explanation": "Alpha rays are the most damaging type of radiation when internally deposited, due to their high mass, charge, and Linear Energy Transfer (LET). They cause intense ionization along a very short path, causing severe cellular damage."
      },
      {
        "id": "p2_q21",
        "question": "The following bones participate in the formation of the knee joint:\n1. Femur\n2. Tibia\n3. Patella",
        "options": [
          "1 and 3 only",
          "2 and 3 only",
          "1, 2, and 3",
          "1 and 2 only"
        ],
        "correctAnswer": 2,
        "explanation": "The knee joint is formed by three bones: the femur (thigh bone), tibia (shin bone), and patella (kneecap). The fibula does not directly participate in the knee joint formation."
      },
      {
        "id": "p2_q22",
        "question": "A patient is usually required to drink barium sulphate suspension in order to demonstrate which of the following structures?\n1. Pylorus\n2. Sigmoid\n3. Duodenum",
        "options": [
          "1 and 2 only",
          "1 and 3 only",
          "2 and 3 only",
          "3 only"
        ],
        "correctAnswer": 1,
        "explanation": "Oral barium demonstrates the upper GI tract: pylorus (stomach outlet) and duodenum. The sigmoid colon is part of the lower GI tract and is demonstrated by barium enema (administered rectally), not by oral barium."
      },
      {
        "id": "p2_q23",
        "question": "The image intensifier's input phosphor is generally composed of:",
        "options": [
          "Gadolinium oxysulphide",
          "Cesium iodide",
          "Zinc cadmium sulphide",
          "Calcium tungstate"
        ],
        "correctAnswer": 1,
        "explanation": "The input phosphor of a modern image intensifier is composed of cesium iodide (CsI). CsI has a needle-like crystal structure that reduces lateral light spread, improving resolution and X-ray absorption efficiency."
      },
      {
        "id": "p2_q24",
        "question": "The following statement(s) is/are accurate with respect to the differences between the male and female bony pelvis:\n1. The female pelvic outlet is wider\n2. The pubic angle is 90° or fewer in the male\n3. The male pelvis is more shallow",
        "options": [
          "1 and 2 only",
          "1 only",
          "2 and 3 only",
          "1, 2, and 3"
        ],
        "correctAnswer": 0,
        "explanation": "The female pelvic outlet is wider (for childbirth) and the male pubic angle is less than 90° (the female angle is greater than 90°). However, the male pelvis is deeper (not more shallow) than the female pelvis."
      },
      {
        "id": "p2_q25",
        "question": "With the patient positioned for a parietoacanthial projection (Waters method) and CR directed through the open mouth, which sinus group is demonstrated through the open mouth?",
        "options": [
          "Frontal",
          "Ethmoid",
          "Sphenoid",
          "Maxillary"
        ],
        "correctAnswer": 2,
        "explanation": "The open-mouth Waters' view demonstrates the sphenoid sinuses through the open mouth. The standard Waters' view shows maxillary sinuses, but modifying it with the mouth open allows sphenoid sinus visualization."
      },
      {
        "id": "p2_q26",
        "question": "In which body position would a patient suffering from orthopnea experience the least discomfort?",
        "options": [
          "Erect",
          "Fowler",
          "Recumbent",
          "Trendelenburg"
        ],
        "correctAnswer": 0,
        "explanation": "Orthopnea is difficulty breathing when lying down. An erect (upright/sitting) position provides the most relief as gravity pulls the abdominal organs away from the diaphragm and reduces pulmonary congestion. Fowler's position (semi-sitting) is also acceptable."
      },
      {
        "id": "p2_q27",
        "question": "The four major arteries supplying the brain include the:\n1. Brachiocephalic artery\n2. Common carotid arteries\n3. Vertebral arteries",
        "options": [
          "1 and 2 only",
          "2 and 3 only",
          "1 and 3 only",
          "1, 2, and 3"
        ],
        "correctAnswer": 1,
        "explanation": "The brain is supplied by four major arteries: two internal carotid arteries (from common carotid arteries) and two vertebral arteries. The brachiocephalic artery itself doesn't directly supply the brain — it branches into the right common carotid and right subclavian arteries."
      },
      {
        "id": "p2_q28",
        "question": "Which of the following is/are demonstrated in the lateral projection of the thoracic spine?\n1. Intervertebral joints\n2. Apophyseal joints\n3. Intervertebral foramina",
        "options": [
          "2 and 3 only",
          "1 and 2 only",
          "1 and 3 only",
          "1 only"
        ],
        "correctAnswer": 2,
        "explanation": "The lateral projection of the thoracic spine demonstrates intervertebral disc spaces (joints) and intervertebral foramina. The apophyseal (facet) joints of the thoracic spine are best seen on oblique views, not lateral."
      },
      {
        "id": "p2_q29",
        "question": "Which of the following conditions is characterized by widening of the intercostal spaces?",
        "options": [
          "Empyema",
          "Atelectasis",
          "Emphysema",
          "Pneumonia"
        ],
        "correctAnswer": 2,
        "explanation": "Emphysema causes hyperinflation of the lungs due to destruction of alveolar walls and air trapping. This leads to widened intercostal spaces, flattened diaphragm, and increased AP diameter (barrel chest)."
      },
      {
        "id": "p2_q30",
        "question": "For AP view of the coccyx, the central ray is directed:",
        "options": [
          "25 degrees towards the feet",
          "25 degrees towards the head",
          "10 degrees towards the feet",
          "10 degrees towards the head"
        ],
        "correctAnswer": 2,
        "explanation": "For AP coccyx, the central ray is angled 10 degrees caudally (towards the feet) to project the coccyx away from the pubic symphysis. This angulation reduces overlap and provides clear visualization."
      },
      {
        "id": "p2_q31",
        "question": "Typical examples of digital imaging include:\n1. Magnetic Resonance Imaging (MRI)\n2. Computed Tomography (CT)\n3. Pluridirectional Tomography",
        "options": [
          "1, 2, and 3",
          "1 and 3 only",
          "1 only",
          "1 and 2 only"
        ],
        "correctAnswer": 3,
        "explanation": "MRI and CT are both digital imaging modalities — they produce images using digital data. Pluridirectional (conventional) tomography is an analog technique that uses film and mechanical tube/film movement."
      },
      {
        "id": "p2_q32",
        "question": "Of the following groups of technical factors, which will produce the greatest radiographic density?",
        "options": [
          "5 mAs, 85 kV, 40-inches SID",
          "10 mAs, 74 kV, 44-inches SID",
          "5 mAs, 85 kV, 48-inches SID",
          "10 mAs, 74 kV, 36-inches SID"
        ],
        "correctAnswer": 3,
        "explanation": "10 mAs at 74 kV with 36-inch SID produces greatest density. Higher mAs = more photons; shorter SID = higher intensity (inverse square law). Though 85 kV is higher, the halved mAs and greater SID in those options result in lower overall density."
      },
      {
        "id": "p2_q33",
        "question": "The energy of ionizing electromagnetic radiations is measured in:",
        "options": [
          "mA",
          "kV",
          "keV",
          "mAs"
        ],
        "correctAnswer": 2,
        "explanation": "The energy of individual X-ray photons is measured in keV (kilo-electron volts). This represents the kinetic energy of the photon. kV is the tube voltage, mA is tube current, and mAs is the exposure (current × time)."
      },
      {
        "id": "p2_q34",
        "question": "A wire mesh is used to test:",
        "options": [
          "Screen speed",
          "Screen lag",
          "Focal spot size",
          "Film-screen contact"
        ],
        "correctAnswer": 3,
        "explanation": "A wire mesh test tool is used to evaluate film-screen contact. Poor contact appears as areas of blurring or unsharpness on the radiograph when the wire mesh is placed on the cassette and exposed."
      },
      {
        "id": "p2_q35",
        "question": "Which of the following has an effect on distortion?\n1. Source-image distance\n2. Angulation of the X-ray tube\n3. Angulation of the part",
        "options": [
          "1 and 2 only",
          "2 and 3 only",
          "1 only",
          "1, 2, and 3"
        ],
        "correctAnswer": 3,
        "explanation": "All three factors affect distortion: SID changes magnification distortion; X-ray tube angulation causes foreshortening or elongation; part angulation causes shape distortion. Any misalignment between tube, part, and receptor creates distortion."
      },
      {
        "id": "p2_q36",
        "question": "The term used in digital imaging to describe image density is:",
        "options": [
          "Gray scale",
          "Brightness",
          "Resolution",
          "Blackening"
        ],
        "correctAnswer": 1,
        "explanation": "In digital imaging, the term 'brightness' replaces the conventional film term 'density.' Brightness can be adjusted post-acquisition through windowing (window level/width), unlike film where density is fixed after processing."
      },
      {
        "id": "p2_q37",
        "question": "Compared to a low-ratio grid, a higher-ratio grid could have:\n1. Taller lead strips\n2. More distance between the lead strips\n3. Thicker lead strips",
        "options": [
          "1, 2, and 3",
          "1 and 2 only",
          "2 and 3 only",
          "1 only"
        ],
        "correctAnswer": 3,
        "explanation": "Grid ratio = height of lead strips / distance between them. A higher ratio grid has taller lead strips relative to the interspace distance. It doesn't necessarily have more distance between strips or thicker strips — only taller strips."
      },
      {
        "id": "p2_q38",
        "question": "Which of the following pathologic conditions would require an increase in exposure factors?",
        "options": [
          "Pneumoperitoneum",
          "Obstructed bowel",
          "Ascites",
          "Renal colic"
        ],
        "correctAnswer": 2,
        "explanation": "Ascites (fluid accumulation in the abdomen) increases tissue density/thickness, requiring increased exposure factors. Pneumoperitoneum (free air) and obstructed bowel (gas) actually decrease density."
      },
      {
        "id": "p2_q39",
        "question": "Grid ratio is defined as the relationship between the height of the lead strip and the:",
        "options": [
          "Distance between the lead strips",
          "Number of lead strips per inch",
          "Angle of the lead strip",
          "Width of the lead strip"
        ],
        "correctAnswer": 0,
        "explanation": "Grid ratio = height of lead strips ÷ distance between lead strips (interspace distance). For example, if lead strips are 3.2 mm tall with 0.32 mm interspace, the ratio is 10:1."
      },
      {
        "id": "p2_q40",
        "question": "Patient dose can be decreased by using:\n1. High ratio grids\n2. High-speed screen and film combination\n3. Air-gap technique",
        "options": [
          "3 only",
          "1 only",
          "2 and 3",
          "1 and 2 only"
        ],
        "correctAnswer": 2,
        "explanation": "High-speed screens reduce dose by converting X-rays to light more efficiently, requiring less radiation. Air-gap technique reduces scatter without the Bucky factor increase of grids. High-ratio grids actually increase patient dose because they require higher technique."
      },
      {
        "id": "p2_q41",
        "question": "In order to better visualize joint space in AP view of knee joint, the tube is angled 5 to 7 degrees:",
        "options": [
          "Cranially",
          "Towards the medial side",
          "Caudally",
          "Towards the lateral side"
        ],
        "correctAnswer": 0,
        "explanation": "For AP knee, the tube is angled 5-7 degrees cephalad (cranially) to open up the joint space. This aligns the central ray with the slight posterior slope of the tibial plateau, providing a clear view of the joint space."
      },
      {
        "id": "p2_q42",
        "question": "MCU stands for:",
        "options": [
          "Modified Cysto Urethrogram",
          "Micturating Cysto Urinography",
          "Micturating Cysto Urethrography",
          "Micturating Cysto Ureterography"
        ],
        "correctAnswer": 2,
        "explanation": "MCU stands for Micturating Cysto-Urethrography. It is a fluoroscopic study that evaluates the bladder and urethra during voiding. It is the gold standard for diagnosing vesicoureteral reflux, especially in children."
      },
      {
        "id": "p2_q43",
        "question": "The term 'effective dose' refers to:",
        "options": [
          "Whole-body dose",
          "Genetic effects only",
          "Localized organ dose",
          "Somatic and genetic effects"
        ],
        "correctAnswer": 3,
        "explanation": "Effective dose accounts for both somatic (body) and genetic (hereditary) effects of radiation. It considers the type of radiation and the sensitivity of different tissues to give a single value representing overall risk."
      },
      {
        "id": "p2_q44",
        "question": "Examples of primary radiation barriers include:\n1. X-ray room walls\n2. Control booth\n3. Lead aprons",
        "options": [
          "1 only",
          "1 and 2 only",
          "2 and 3 only",
          "1, 2, and 3"
        ],
        "correctAnswer": 0,
        "explanation": "Primary radiation barriers are walls that could be struck by the primary (direct) X-ray beam. Only X-ray room walls facing the tube can be primary barriers. The control booth and lead aprons are secondary barriers (protecting from scatter/leakage)."
      },
      {
        "id": "p2_q45",
        "question": "When reviewing patient blood chemistry levels, what is considered the normal creatinine range?",
        "options": [
          "Up to 50 mg/100 ml",
          "8-25 mg/100 ml",
          "4.5-6 mg/100 ml",
          "0.6-1.5 mg/100 ml"
        ],
        "correctAnswer": 3,
        "explanation": "Normal serum creatinine is 0.6-1.5 mg/dL (mg/100 mL). Creatinine is a waste product of muscle metabolism filtered by the kidneys. Elevated levels indicate impaired renal function, which is important to check before administering contrast media."
      },
      {
        "id": "p2_q46",
        "question": "In IVP, the first film after contrast injection is:",
        "options": [
          "Nephrogram",
          "Pyelogram",
          "Ureterogram",
          "Venogram"
        ],
        "correctAnswer": 0,
        "explanation": "The nephrogram is the first film taken (at 1-3 minutes) after contrast injection in IVP. It shows the contrast within the renal parenchyma (nephrons), producing a diffuse blush of the kidneys before the contrast reaches the collecting system."
      },
      {
        "id": "p2_q47",
        "question": "The number of cervical vertebrae is:",
        "options": [
          "7",
          "12",
          "5",
          "8"
        ],
        "correctAnswer": 0,
        "explanation": "There are 7 cervical vertebrae (C1-C7) in the human spine. C1 is called the Atlas, C2 is the Axis. All mammals (except sloths and manatees) have 7 cervical vertebrae regardless of neck length."
      },
      {
        "id": "p2_q48",
        "question": "When X-ray beam falls on the body, they are:",
        "options": [
          "Transmitted",
          "Reflected",
          "All of the above (reflected, absorbed, transmitted)",
          "Absorbed"
        ],
        "correctAnswer": 2,
        "explanation": "When X-rays interact with the body, they undergo all three processes: some are absorbed (photoelectric effect), some are transmitted through the body (forming the image), and some are scattered/reflected (Compton scattering)."
      },
      {
        "id": "p2_q49",
        "question": "The value of CT number (in Hounsfield units) is determined primarily by:",
        "options": [
          "KV",
          "Tissue density",
          "Matrix size",
          "Slice thickness"
        ],
        "correctAnswer": 1,
        "explanation": "CT numbers (Hounsfield units) are determined primarily by tissue density (linear attenuation coefficient). Water = 0 HU, air = -1000 HU, dense bone = +1000 HU. The CT number directly reflects how much the tissue attenuates X-rays."
      },
      {
        "id": "p2_q50",
        "question": "Anode in rotating anode X-ray tube is made of:",
        "options": [
          "Nickel-Tin alloy",
          "Tungsten-Rhenium alloy",
          "Tungsten-Aluminum alloy",
          "Tungsten-Nickel alloy"
        ],
        "correctAnswer": 1,
        "explanation": "Modern rotating anode X-ray tubes use a Tungsten-Rhenium alloy (typically 90% W, 10% Re). Rhenium improves resistance to surface roughening and cracking from thermal stress. The anode disc is usually backed by molybdenum."
      },
      {
        "id": "p2_q51",
        "question": "Which is NOT true about intensifying screens?",
        "options": [
          "Reduces blurring",
          "Decreases spatial resolution",
          "Increases loading of X-ray tube",
          "Reduces patient dose"
        ],
        "correctAnswer": 0,
        "explanation": "Intensifying screens actually increase blurring (reduce spatial resolution), not reduce it. They do reduce patient dose (by requiring less radiation) and decrease spatial resolution due to light diffusion in the phosphor layer. They reduce (not increase) tube loading."
      },
      {
        "id": "p2_q52",
        "question": "Ideal temperature of the dark room is:",
        "options": [
          "28-32°C",
          "10-15°C",
          "16-22°C",
          "23-27°C"
        ],
        "correctAnswer": 2,
        "explanation": "The ideal dark room temperature is 16-22°C (60-72°F). Higher temperatures can cause film fog and affect developer chemistry. The developer solution should be maintained at about 20°C for manual processing."
      },
      {
        "id": "p2_q53",
        "question": "The most commonly used photosensitive agent in X-ray film is:",
        "options": [
          "None of the above",
          "Silver Iodide",
          "Silver Chloride",
          "Silver Bromide"
        ],
        "correctAnswer": 3,
        "explanation": "Silver bromide (AgBr) is the most commonly used photosensitive agent in X-ray film. It makes up about 98% of the silver halide crystals in the emulsion. The remaining 2% is silver iodide for enhanced sensitivity."
      },
      {
        "id": "p2_q54",
        "question": "The specialized radiological examination of lungs and bronchial tree using an opaque contrast medium is called:",
        "options": [
          "Urography",
          "Cystography",
          "Bronchography",
          "Bronchoscopy"
        ],
        "correctAnswer": 2,
        "explanation": "Bronchography is the radiographic examination of the bronchial tree using an opaque contrast medium. Note: Bronchoscopy is direct visual examination of bronchi using a scope, not a radiographic study."
      },
      {
        "id": "p2_q55",
        "question": "To decrease the magnification of the heart in PA view of chest, the film focal distance is kept at:",
        "options": [
          "40 inches",
          "60 inches",
          "36 inches",
          "72 inches"
        ],
        "correctAnswer": 3,
        "explanation": "A 72-inch (6 feet/180 cm) SID is used for PA chest X-rays to minimize cardiac magnification. The heart is anterior in the chest; in PA projection at 72 inches, the heart is close to the film and the long SID reduces magnification."
      },
      {
        "id": "p2_q56",
        "question": "Radiological examination of salivary glands and its ducts by means of contrast medium is termed as:",
        "options": [
          "Ductography",
          "Fistulogram",
          "Sinography",
          "Sialography"
        ],
        "correctAnswer": 3,
        "explanation": "Sialography is the radiographic examination of salivary glands and their ducts using contrast medium. Contrast is injected into the duct opening (Stensen's for parotid, Wharton's for submandibular) to visualize the ductal system."
      },
      {
        "id": "p2_q57",
        "question": "Stenver's projection view is basically done for:",
        "options": [
          "Petrous portion of temporal bone",
          "Orbit",
          "Base of skull",
          "Oblique view of mandible"
        ],
        "correctAnswer": 0,
        "explanation": "Stenver's view (posterior profile projection) specifically demonstrates the petrous portion of the temporal bone, including the internal auditory canal, mastoid antrum, and labyrinthine structures."
      },
      {
        "id": "p2_q58",
        "question": "Which view of the nasal bone shows bony nasal septum best?",
        "options": [
          "Lateral projection",
          "None of the above",
          "Water's projection",
          "AP projection"
        ],
        "correctAnswer": 0,
        "explanation": "The lateral projection of the nasal bones best demonstrates the bony nasal septum in profile. It shows the anterior nasal spine, nasal bones, and the perpendicular plate of the ethmoid (bony septum)."
      },
      {
        "id": "p2_q59",
        "question": "Skyline view is used for:",
        "options": [
          "Patella",
          "Talus",
          "Scapula",
          "Hip joint"
        ],
        "correctAnswer": 0,
        "explanation": "The skyline (sunrise/tangential) view is used to demonstrate the patella. The patient flexes the knee and the X-ray beam is directed tangentially along the patellofemoral joint, showing the posterior surface of the patella."
      },
      {
        "id": "p2_q60",
        "question": "What position of the elbow best demonstrates the olecranon process?",
        "options": [
          "Axial view",
          "Oblique view",
          "AP view",
          "True lateral view"
        ],
        "correctAnswer": 3,
        "explanation": "The true lateral view of the elbow best demonstrates the olecranon process of the ulna in profile. The elbow is flexed 90° with the lateral side down, clearly showing the olecranon, coronoid process, and trochlear notch."
      },
      {
        "id": "p2_q61",
        "question": "The patient's chin should be elevated during chest radiography to:",
        "options": [
          "Avoid superimposition on the apices of lung",
          "Keep mid sagittal plane parallel",
          "Reduce patient dose",
          "Reduce patient motion"
        ],
        "correctAnswer": 0,
        "explanation": "Elevating the chin during chest X-ray prevents the mandible and soft tissues of the chin from superimposing on (overlapping) the lung apices. This allows clear visualization of the upper lung fields."
      },
      {
        "id": "p2_q62",
        "question": "The 10 days rule for X-ray examination of female patients is applicable to:",
        "options": [
          "The first 10 days following the cessation of menstruation",
          "The first 10 days following the onset of menstruation",
          "14 days before menstruation",
          "The 10 days preceding the menstruation"
        ],
        "correctAnswer": 1,
        "explanation": "The 10-day rule states that non-urgent X-ray examinations of the abdomen/pelvis in women of reproductive age should be done within the first 10 days following the onset of menstruation, when pregnancy is least likely."
      },
      {
        "id": "p2_q63",
        "question": "In India, which of the following is the most significant in the development of radiation protection standards?",
        "options": [
          "BARC",
          "ICRP",
          "AERB",
          "NCRP"
        ],
        "correctAnswer": 2,
        "explanation": "AERB (Atomic Energy Regulatory Board) is the regulatory body in India responsible for radiation protection standards. It was established in 1983 under the Atomic Energy Act. BARC is a research center, while ICRP and NCRP are international/US bodies."
      },
      {
        "id": "p2_q64",
        "question": "The radiation warning symbol is a black _____ on a yellow background:",
        "options": [
          "Single foil",
          "Quad foil",
          "Dual foil",
          "Tri foil"
        ],
        "correctAnswer": 3,
        "explanation": "The international radiation warning symbol (trefoil/tri-foil) consists of three triangular blades arranged around a central circle, printed in black on a yellow background. It was designed in 1946 at UC Berkeley."
      },
      {
        "id": "p2_q65",
        "question": "All of the following are potential advantages of using higher KV in radiography EXCEPT:",
        "options": [
          "Reduced X-ray tube heating",
          "Shorter exposure time",
          "Decreased image contrast",
          "Increased patient exposure"
        ],
        "correctAnswer": 3,
        "explanation": "Higher kV increases penetration, allowing lower mAs and thus: shorter exposure times, reduced tube heating, and decreased image contrast (wider gray scale). However, higher kV actually decreases (not increases) patient exposure when mAs is appropriately reduced."
      },
      {
        "id": "p2_q66",
        "question": "In an adult, the spinal cord usually ends at the level of which vertebra?",
        "options": [
          "L5",
          "S1",
          "L1",
          "S3"
        ],
        "correctAnswer": 2,
        "explanation": "In adults, the spinal cord (conus medullaris) typically ends at the level of L1-L2 vertebra. Below this level, the spinal canal contains the cauda equina (bundle of nerve roots). This is why lumbar puncture is safely performed below L3."
      },
      {
        "id": "p2_q67",
        "question": "Newton's Inverse Square Law is useful in radiography because it indicates how the radiation intensity is affected by:",
        "options": [
          "Radioactive decay",
          "The size of the source",
          "None of the above",
          "Distance from the source"
        ],
        "correctAnswer": 3,
        "explanation": "The Inverse Square Law states that radiation intensity is inversely proportional to the square of the distance from the source (I ∝ 1/d²). Doubling the distance reduces intensity to 1/4. This is fundamental for radiation protection and technique calculations."
      },
      {
        "id": "p2_q68",
        "question": "Fixing solutions used in radiography are:",
        "options": [
          "Neutral",
          "Acidic",
          "None of the above",
          "Alkaline"
        ],
        "correctAnswer": 1,
        "explanation": "X-ray fixer solutions are acidic (pH 4-4.5). The main fixing agent is ammonium thiosulfate in an acid environment. The acid pH stops developer action and helps the fixing agent dissolve undeveloped silver halide crystals."
      },
      {
        "id": "p2_q69",
        "question": "One rad is equal to the absorption of:",
        "options": [
          "0.1 Gy",
          "100 joules/kg",
          "1 joule/kg",
          "0.01 Gy"
        ],
        "correctAnswer": 3,
        "explanation": "1 rad = 0.01 Gray (Gy) = 0.01 J/kg. The rad (radiation absorbed dose) is the CGS unit, while the Gray is the SI unit. 1 Gy = 100 rad. This conversion is important for understanding radiation dose measurements."
      },
      {
        "id": "p2_q70",
        "question": "The intensity of the X-ray beam that leaves the X-ray tube is not uniform throughout all portions of the beam. This is called:",
        "options": [
          "Stray radiation",
          "Thermionic emission",
          "Tube rating",
          "Heel effect"
        ],
        "correctAnswer": 3,
        "explanation": "The heel effect describes the non-uniform intensity distribution across the X-ray beam. The intensity is greater on the cathode side and less on the anode side due to self-absorption of X-rays within the anode target."
      }
    ]
  },
  {
    "id": 3,
    "name": "Paper 3",
    "subtitle": "ISRO — Radiographer",
    "totalQuestions": 80,
    "questions": [
      {
        "id": "p3_q1",
        "question": "Depression between the two tuberosities of humerus is known as:",
        "options": [
          "Bicipital groove",
          "Epicondyles",
          "Capitulum",
          "Trochlea"
        ],
        "correctAnswer": 0,
        "explanation": "The bicipital groove (intertubercular sulcus) is the depression between the greater and lesser tuberosities of the humerus. It houses the tendon of the long head of biceps brachii."
      },
      {
        "id": "p3_q2",
        "question": "Transverse plane is also called as:",
        "options": [
          "Sagittal",
          "Axial",
          "Median sagittal",
          "Coronal"
        ],
        "correctAnswer": 1,
        "explanation": "The transverse plane is also called the axial or horizontal plane. It divides the body into superior (upper) and inferior (lower) portions. CT scans are typically acquired in the axial plane."
      },
      {
        "id": "p3_q3",
        "question": "DEXA is used for:",
        "options": [
          "MRI",
          "Bone mineral densitometry",
          "CT scan",
          "Cardiac catheterisation"
        ],
        "correctAnswer": 1,
        "explanation": "DEXA (Dual-Energy X-ray Absorptiometry) is the gold standard for measuring bone mineral density (BMD). It uses two different energy X-ray beams to differentiate between bone and soft tissue, primarily for diagnosing osteoporosis."
      },
      {
        "id": "p3_q4",
        "question": "In IVP, the first film after contrast injection is:",
        "options": [
          "Ureterogram",
          "Nephrogram",
          "Venogram",
          "Pyelogram"
        ],
        "correctAnswer": 1,
        "explanation": "The nephrogram is taken first (1-3 minutes post-injection) in IVP. It shows the contrast within the renal parenchyma as the kidneys begin filtering the contrast, producing a characteristic renal blush."
      },
      {
        "id": "p3_q5",
        "question": "Dental formula for permanent teeth is:",
        "options": [
          "2-0-2-3 / 2-0-2-3",
          "2-1-0-3 / 2-1-2-3",
          "2-1-2-2 / 2-1-2-2",
          "2-1-2-3 / 2-1-2-3"
        ],
        "correctAnswer": 3,
        "explanation": "The dental formula for permanent teeth per quadrant is 2-1-2-3 (2 incisors, 1 canine, 2 premolars, 3 molars). Total permanent teeth = 4 × 8 = 32 teeth."
      },
      {
        "id": "p3_q6",
        "question": "IOPA stands for:",
        "options": [
          "Interoral periapical",
          "Intraoral paraapex",
          "Intraoral periapical",
          "Interoral para align"
        ],
        "correctAnswer": 2,
        "explanation": "IOPA stands for Intraoral Periapical radiograph. It is a dental X-ray that shows the complete tooth — crown, root, and surrounding bone. It is the most commonly used dental radiographic technique."
      },
      {
        "id": "p3_q7",
        "question": "The common carotid artery usually bifurcates at the level of _____ cervical vertebra.",
        "options": [
          "4th",
          "5th",
          "2nd",
          "3rd"
        ],
        "correctAnswer": 0,
        "explanation": "The common carotid artery typically bifurcates at the level of C4 (fourth cervical vertebra), near the upper border of the thyroid cartilage, into the internal and external carotid arteries."
      },
      {
        "id": "p3_q8",
        "question": "The functional tissue of the lung is:",
        "options": [
          "Bronchi",
          "Alveoli",
          "Terminal bronchiole",
          "Respiratory bronchiole"
        ],
        "correctAnswer": 1,
        "explanation": "Alveoli are the functional (parenchymal) tissue of the lung where gas exchange occurs. There are approximately 300 million alveoli in each lung, providing a massive surface area (~70 m²) for oxygen and carbon dioxide exchange."
      },
      {
        "id": "p3_q9",
        "question": "Elevation of the scapula is caused by all EXCEPT:",
        "options": [
          "Latissimus dorsi",
          "Rhomboids major",
          "Trapezius",
          "Levator scapulae"
        ],
        "correctAnswer": 0,
        "explanation": "Latissimus dorsi does NOT elevate the scapula; it primarily extends, adducts, and medially rotates the arm and depresses the shoulder. The elevators of the scapula are: trapezius (upper fibers), levator scapulae, and rhomboids."
      },
      {
        "id": "p3_q10",
        "question": "The number of cervical vertebrae is:",
        "options": [
          "8",
          "12",
          "7",
          "5"
        ],
        "correctAnswer": 2,
        "explanation": "There are 7 cervical vertebrae (C1-C7) in the human spine. C1 (Atlas) supports the skull, and C2 (Axis) allows rotation of the head. C7 is called the vertebra prominens due to its long spinous process."
      },
      {
        "id": "p3_q11",
        "question": "Protons are _____ charged particles.",
        "options": [
          "Positive",
          "None",
          "Neutral",
          "Negative"
        ],
        "correctAnswer": 0,
        "explanation": "Protons carry a positive electrical charge (+1). They reside in the atomic nucleus along with neutrons (which are neutral). The number of protons defines the element (atomic number)."
      },
      {
        "id": "p3_q12",
        "question": "Ultrasound waves require _____ to travel.",
        "options": [
          "Air",
          "Vacuum",
          "Gas",
          "Medium (jelly, oil etc.)"
        ],
        "correctAnswer": 3,
        "explanation": "Ultrasound waves are mechanical waves that require a medium to propagate. In medical imaging, coupling gel (acoustic medium) is used between the transducer and skin to eliminate air gaps and allow efficient sound transmission."
      },
      {
        "id": "p3_q13",
        "question": "Isotopes are those elements that have:",
        "options": [
          "Same atomic number but different mass number",
          "None of the above",
          "Equal number of protons and electrons",
          "Different atomic number but same mass number"
        ],
        "correctAnswer": 0,
        "explanation": "Isotopes are atoms of the same element (same atomic number/protons) but with different mass numbers (different neutrons). For example, Carbon-12 and Carbon-14 are isotopes of carbon."
      },
      {
        "id": "p3_q14",
        "question": "When X-ray beam falls on the body, they are:",
        "options": [
          "Transmitted",
          "Reflected",
          "All of the above",
          "Absorbed"
        ],
        "correctAnswer": 2,
        "explanation": "When X-rays interact with the body: some are absorbed (photoelectric effect), some pass through (transmitted to form the image), and some are scattered (Compton effect). All three interactions occur simultaneously."
      },
      {
        "id": "p3_q15",
        "question": "In modern X-ray tube, a vacuum is maintained equal to:",
        "options": [
          "None",
          "10⁻² mm of Hg",
          "10⁻³ mm of Hg",
          "10 mm of Hg"
        ],
        "correctAnswer": 2,
        "explanation": "A high vacuum of approximately 10⁻³ mm of Hg (or better) is maintained in X-ray tubes. This vacuum allows electrons to travel from cathode to anode without colliding with gas molecules, which would reduce efficiency."
      },
      {
        "id": "p3_q16",
        "question": "Heat is dissipated in most X-ray tubes by:",
        "options": [
          "Conduction and radiation",
          "Conduction, convection and radiation",
          "Convection and radiation",
          "Conduction and convection"
        ],
        "correctAnswer": 1,
        "explanation": "Heat dissipation in X-ray tubes occurs by all three methods: conduction (through anode stem to rotor), convection (oil circulation in tube housing), and radiation (infrared radiation from the hot anode). All three are necessary for adequate cooling."
      },
      {
        "id": "p3_q17",
        "question": "Penetration of X-rays is directly related to:",
        "options": [
          "Focus film distance",
          "mA",
          "KVP",
          "Exposure time"
        ],
        "correctAnswer": 2,
        "explanation": "X-ray penetration (beam quality/energy) is directly related to kVp (kilovoltage peak). Higher kVp produces higher energy photons with greater penetrating ability. mA affects quantity (number of photons), not quality."
      },
      {
        "id": "p3_q18",
        "question": "The unit used to record the radiation received by radiation workers is:",
        "options": [
          "Curie",
          "Roentgen",
          "Milli Sievert",
          "Rad"
        ],
        "correctAnswer": 2,
        "explanation": "The milli Sievert (mSv) is the unit used to record radiation dose received by radiation workers. It measures effective dose, accounting for both the type of radiation and tissue sensitivity. The annual occupational limit is 20 mSv."
      },
      {
        "id": "p3_q19",
        "question": "The normal frequency of ultrasound waves used in medical diagnostics ranges from:",
        "options": [
          "1 MHz-20 MHz",
          "500001 MHz",
          "20 MHz+",
          "20000-50000 Hz"
        ],
        "correctAnswer": 0,
        "explanation": "Medical diagnostic ultrasound uses frequencies from 1 MHz to 20 MHz. Lower frequencies (1-5 MHz) provide deeper penetration for abdominal scans, while higher frequencies (7-20 MHz) give better resolution for superficial structures."
      },
      {
        "id": "p3_q20",
        "question": "Anode in rotating anode X-ray tube is made of:",
        "options": [
          "Nickel-Tin alloy",
          "Tungsten-Aluminium alloy",
          "Tungsten-Rhenium alloy",
          "Tungsten-Nickel alloy"
        ],
        "correctAnswer": 2,
        "explanation": "The rotating anode in modern X-ray tubes is made of Tungsten-Rhenium alloy (typically 90% W, 10% Re). Tungsten has a high melting point (3422°C) and high atomic number (Z=74), while Rhenium prevents surface cracking."
      },
      {
        "id": "p3_q21",
        "question": "Compression in Mammography is important due to:",
        "options": [
          "Reduced patient dose",
          "Improved contrast resolution",
          "Improved spatial resolution",
          "All of the above"
        ],
        "correctAnswer": 3,
        "explanation": "Breast compression in mammography is important for all reasons: it improves spatial and contrast resolution (uniform thickness), reduces patient dose (thinner tissue requires less radiation), and reduces motion blur and scatter."
      },
      {
        "id": "p3_q22",
        "question": "Moseley's law relates to:",
        "options": [
          "Frequency and atomic number",
          "Wavelength and angle of scattering",
          "Frequency and applied voltage",
          "Wavelength and intensity of X-ray"
        ],
        "correctAnswer": 0,
        "explanation": "Moseley's law states that the frequency (ν) of characteristic X-rays is proportional to the square of the atomic number (Z) of the target element: √ν ∝ (Z-σ), where σ is a screening constant."
      },
      {
        "id": "p3_q23",
        "question": "The usual thickness of radiographic film is:",
        "options": [
          "1 mm",
          "0.05 mm",
          "0.25 mm",
          "0.75 mm"
        ],
        "correctAnswer": 2,
        "explanation": "The usual total thickness of a radiographic film is approximately 0.25 mm (250 μm). This includes the polyester base (~0.18 mm) and the emulsion layers on both sides (~0.015 mm each) plus protective supercoat."
      },
      {
        "id": "p3_q24",
        "question": "Which is NOT true about intensifying screens?",
        "options": [
          "Reduces patient dose",
          "Reduces blurring",
          "Decreases spatial resolution",
          "Increases loading of X-ray tube"
        ],
        "correctAnswer": 1,
        "explanation": "Intensifying screens actually increase blurring (not reduce it) due to light diffusion in the phosphor layer. They do reduce patient dose and decrease spatial resolution. They reduce (not increase) tube loading by requiring less exposure."
      },
      {
        "id": "p3_q25",
        "question": "Ideal temperature of the dark room is:",
        "options": [
          "16-22°C",
          "23-27°C",
          "28-32°C",
          "10-15°C"
        ],
        "correctAnswer": 0,
        "explanation": "The ideal dark room temperature is 16-22°C (60-72°F). This prevents film fog from heat and maintains proper developer chemistry. The humidity should also be controlled at 40-60%."
      },
      {
        "id": "p3_q26",
        "question": "Intensifying screens are NOT used in:",
        "options": [
          "None",
          "Mammography",
          "Ultrasound",
          "Both Mammography and Ultrasound"
        ],
        "correctAnswer": 2,
        "explanation": "Intensifying screens are not used in ultrasound because ultrasound uses sound waves, not X-rays. There is no need for fluorescent screens. Note: Some mammography systems do use special single-screen cassettes."
      },
      {
        "id": "p3_q27",
        "question": "Filter in the dark room used for blue-sensitive film is:",
        "options": [
          "Amber",
          "White",
          "Gray",
          "Green"
        ],
        "correctAnswer": 0,
        "explanation": "Amber (reddish-orange) safelight filters are used for blue-sensitive (regular) X-ray film. The amber filter blocks blue and UV light while allowing some visibility in the darkroom. Green-sensitive film requires a dark red safelight."
      },
      {
        "id": "p3_q28",
        "question": "The most commonly used photosensitive agent is:",
        "options": [
          "Silver Bromide",
          "Silver Iodide",
          "None of the above",
          "Silver Chloride"
        ],
        "correctAnswer": 0,
        "explanation": "Silver Bromide (AgBr) is the most commonly used photosensitive agent in radiographic film emulsion, constituting about 98% of the silver halide crystals. It is highly sensitive to visible light and X-radiation."
      },
      {
        "id": "p3_q29",
        "question": "Fixing solutions used in radiography are:",
        "options": [
          "None of the above",
          "Neutral",
          "Acidic",
          "Alkaline"
        ],
        "correctAnswer": 2,
        "explanation": "Radiographic fixer solutions are acidic (pH ~4-4.5). The acid environment stops the alkaline developer action and the main fixing agent (ammonium thiosulfate) works best in acidic conditions to dissolve unexposed silver halide."
      },
      {
        "id": "p3_q30",
        "question": "In automatic processor, developer temperature is:",
        "options": [
          "35-40°C",
          "18-20°C",
          "25-30°C",
          "50-55°C"
        ],
        "correctAnswer": 0,
        "explanation": "In automatic processors, the developer temperature is maintained at 35-40°C (typically 35°C). This is higher than manual processing temperature (20°C) to allow faster development in the shorter processing time (about 90 seconds total)."
      },
      {
        "id": "p3_q31",
        "question": "The fracture of Scaphoid is best seen in:",
        "options": [
          "PA view with radial deviation",
          "PA view with ulnar deviation",
          "PA view",
          "Lateral view"
        ],
        "correctAnswer": 1,
        "explanation": "Scaphoid fractures are best visualized on a PA view with ulnar deviation of the wrist. Ulnar deviation opens up the scaphoid and elongates it, making fracture lines more visible. This is the standard scaphoid view."
      },
      {
        "id": "p3_q32",
        "question": "The bicipital groove of Humerus can be demonstrated in:",
        "options": [
          "PA view of shoulder",
          "Lateral view",
          "Tangential projection",
          "Axial view of shoulder"
        ],
        "correctAnswer": 2,
        "explanation": "The bicipital groove (intertubercular groove) of the humerus is best demonstrated using a tangential (Fisk) projection. The arm is internally rotated and the beam is directed tangentially down the groove."
      },
      {
        "id": "p3_q33",
        "question": "The Lauenstein's projection view is basically done for:",
        "options": [
          "Pelvis",
          "Hip joint and upper third of Femur",
          "Chest region",
          "Sacro-Iliac joint"
        ],
        "correctAnswer": 1,
        "explanation": "Lauenstein's projection (frog-leg lateral) is done to demonstrate the hip joint and upper third of the femur, particularly the femoral neck and head. It is useful for detecting avascular necrosis and hip joint pathology."
      },
      {
        "id": "p3_q34",
        "question": "The specialized radiological examination of lungs and bronchial tree using an opaque contrast medium is called:",
        "options": [
          "Urography",
          "Cystography",
          "Bronchoscopy",
          "Bronchography"
        ],
        "correctAnswer": 3,
        "explanation": "Bronchography is the radiographic study of the bronchial tree using contrast medium (usually oil-based). It has been largely replaced by CT and bronchoscopy but was historically important for diagnosing bronchiectasis."
      },
      {
        "id": "p3_q35",
        "question": "To decrease the magnification of the heart in PA view of chest, the film focal distance is kept at:",
        "options": [
          "60 inches",
          "36 inches",
          "72 inches",
          "40 inches"
        ],
        "correctAnswer": 2,
        "explanation": "A 72-inch (6 feet/180 cm) SID is used for PA chest radiography to minimize magnification of the heart. At this distance, the divergent X-ray beam is nearly parallel, reducing geometric magnification."
      },
      {
        "id": "p3_q36",
        "question": "The radiological examination of salivary glands and its ducts by means of contrast medium is termed as:",
        "options": [
          "Fistulogram",
          "Sialography",
          "Sinography",
          "Ductography"
        ],
        "correctAnswer": 1,
        "explanation": "Sialography is the radiographic examination of salivary glands using contrast medium injected into the gland ducts. It demonstrates calculi, strictures, tumors, and inflammatory conditions of salivary glands."
      },
      {
        "id": "p3_q37",
        "question": "Stenver's projection view is basically done for:",
        "options": [
          "Petrous portion of temporal bone",
          "Orbit",
          "Oblique view of mandible",
          "Base of skull"
        ],
        "correctAnswer": 0,
        "explanation": "Stenver's projection specifically demonstrates the petrous portion of the temporal bone. It shows the internal auditory canal, semicircular canals, mastoid air cells, and petrous apex."
      },
      {
        "id": "p3_q38",
        "question": "Patella is a:",
        "options": [
          "Irregular bone",
          "Long bone",
          "Sesamoid bone",
          "Flat bone"
        ],
        "correctAnswer": 2,
        "explanation": "The patella (kneecap) is the largest sesamoid bone in the body. Sesamoid bones develop within tendons — the patella forms within the tendon of the quadriceps femoris muscle."
      },
      {
        "id": "p3_q39",
        "question": "Which view of the nasal bone shows bony nasal septum best?",
        "options": [
          "None of the above",
          "AP projection",
          "Lateral projection",
          "Water's projection"
        ],
        "correctAnswer": 2,
        "explanation": "The lateral projection best demonstrates the bony nasal septum, showing the perpendicular plate of the ethmoid and the vomer bone in profile. It also shows nasal bone fractures clearly."
      },
      {
        "id": "p3_q40",
        "question": "Skyline view is used for:",
        "options": [
          "Talus",
          "Scapula",
          "Hip joint",
          "Patella"
        ],
        "correctAnswer": 3,
        "explanation": "The skyline (sunrise/tangential) view demonstrates the patella and patellofemoral joint. It provides an axial view of the patella, useful for detecting patellar fractures, subluxation, and chondromalacia."
      },
      {
        "id": "p3_q41",
        "question": "What position of the elbow best demonstrates the Olecranon process?",
        "options": [
          "True lateral view",
          "Oblique view",
          "AP view",
          "Axial view"
        ],
        "correctAnswer": 0,
        "explanation": "The true lateral view of the elbow (90° flexion) best demonstrates the olecranon process in profile. It separates the olecranon from the trochlea and shows the anterior fat pad."
      },
      {
        "id": "p3_q42",
        "question": "What is the proper breathing instruction for an AP abdomen?",
        "options": [
          "Full expiration",
          "Full inspiration",
          "Shallow breathing",
          "Rapid breathing"
        ],
        "correctAnswer": 0,
        "explanation": "For AP abdomen, the patient should fully exhale (full expiration). This elevates the diaphragm, pushes abdominal organs downward, and compresses them, reducing the overall thickness and improving image quality."
      },
      {
        "id": "p3_q43",
        "question": "Which of the following would best demonstrate fluid in the right pleural cavity?",
        "options": [
          "Dorsal decubitus",
          "Left lateral decubitus",
          "Right lateral decubitus",
          "Ventral decubitus"
        ],
        "correctAnswer": 2,
        "explanation": "Right lateral decubitus position (patient lying on right side with horizontal beam) allows free pleural fluid in the right pleural cavity to layer along the dependent (right) chest wall, making it visible."
      },
      {
        "id": "p3_q44",
        "question": "The patient's chin should be elevated during chest radiography to:",
        "options": [
          "Avoid superimposition on the apices",
          "Keep mid sagittal plane parallel",
          "Reduce patient motion",
          "Reduce patient dose"
        ],
        "correctAnswer": 0,
        "explanation": "Chin elevation during chest X-ray prevents the mandible from overlapping the lung apices, ensuring clear visualization of the upper lung fields where pathology like TB apical lesions may be present."
      },
      {
        "id": "p3_q45",
        "question": "The 10 days rule is applicable to:",
        "options": [
          "14 days before menstruation",
          "The first 10 days following the onset of menstruation",
          "The first 10 days following the cessation of menstruation",
          "The 10 days preceding the onset of menstruation"
        ],
        "correctAnswer": 1,
        "explanation": "The 10-day rule recommends scheduling elective abdominal X-rays within the first 10 days from the onset of menstruation, when the probability of pregnancy is lowest. This protects a potentially early embryo from radiation."
      },
      {
        "id": "p3_q46",
        "question": "In India, which of the following is the most significant in the development of radiation protection standards?",
        "options": [
          "AERB",
          "ICRP",
          "BARC",
          "NCRP"
        ],
        "correctAnswer": 0,
        "explanation": "AERB (Atomic Energy Regulatory Board) is the Indian regulatory body for radiation protection. Established in 1983, it frames rules, regulations, and guidelines for nuclear and radiation safety in India."
      },
      {
        "id": "p3_q47",
        "question": "TLD is based on the phenomenon of:",
        "options": [
          "Induction",
          "Thermoluminescence",
          "Photographic effect",
          "Thermionic emission"
        ],
        "correctAnswer": 1,
        "explanation": "TLD (Thermoluminescent Dosimeter) works on the principle of thermoluminescence. When heated, the irradiated crystal (usually LiF) releases stored energy as visible light, proportional to the radiation dose received."
      },
      {
        "id": "p3_q48",
        "question": "MCU stands for:",
        "options": [
          "Micturating Cysto Urinography",
          "Micturating Cysto Urethrography",
          "Modified Cysto Urethrogram",
          "Micturating Cysto Ureterography"
        ],
        "correctAnswer": 1,
        "explanation": "MCU stands for Micturating Cysto-Urethrography. It is a fluoroscopic investigation where contrast is instilled into the bladder via catheter, and images are taken during voiding to assess the bladder and urethra."
      },
      {
        "id": "p3_q49",
        "question": "The primary factor that limits the maximum mA that can be used during a radiographic exposure is:",
        "options": [
          "Exposure time",
          "Cathode temperature",
          "Anode angle",
          "Focal spot size"
        ],
        "correctAnswer": 3,
        "explanation": "Focal spot size is the primary limiting factor for maximum mA. A larger focal spot can handle higher mA because the heat is distributed over a larger area. Small focal spots are limited in mA to prevent thermal damage."
      },
      {
        "id": "p3_q50",
        "question": "All the following are potential advantages of using higher kV (90 rather than 70) in radiography EXCEPT:",
        "options": [
          "Increased patient exposure",
          "Shorter exposure times",
          "Decreased area contrast",
          "Reduced X-ray tube heating"
        ],
        "correctAnswer": 0,
        "explanation": "Higher kV actually decreases patient exposure (when mAs is reduced accordingly). The advantages of higher kV include: reduced tube heating, shorter exposure times, and wider latitude. The tradeoff is decreased contrast."
      },
      {
        "id": "p3_q51",
        "question": "In the adult, the spinal cord usually ends at the level of which vertebra?",
        "options": [
          "S3",
          "S1",
          "L5",
          "L1"
        ],
        "correctAnswer": 3,
        "explanation": "The spinal cord (conus medullaris) ends at L1-L2 in adults. Below this, the cauda equina continues. Lumbar puncture is performed at L3-L4 or L4-L5 to avoid spinal cord injury."
      },
      {
        "id": "p3_q52",
        "question": "The cochlea is located within the _____ bone.",
        "options": [
          "Sphenoid bone",
          "Temporal bone",
          "Frontal bone",
          "Occipital bone"
        ],
        "correctAnswer": 1,
        "explanation": "The cochlea (organ of hearing) is located within the petrous part of the temporal bone. It is a spiral-shaped, fluid-filled structure that converts sound vibrations into nerve impulses."
      },
      {
        "id": "p3_q53",
        "question": "X-ray generators produce radiation through:",
        "options": [
          "Bremsstrahlung processes",
          "K-shell emission processes",
          "Both Bremsstrahlung and K-shell emission",
          "Neither"
        ],
        "correctAnswer": 2,
        "explanation": "X-ray tubes produce radiation through both bremsstrahlung (braking radiation, ~80-85%) and characteristic (K-shell) emission (~15-20%). Bremsstrahlung produces a continuous spectrum, while characteristic radiation produces discrete energy peaks."
      },
      {
        "id": "p3_q54",
        "question": "Increasing the magnetic field in MRI:",
        "options": [
          "Reduces the risk of tissue heating",
          "Reduces the danger from metallic projectiles",
          "Increases the signal to noise ratio",
          "Produces less susceptibility artifacts"
        ],
        "correctAnswer": 2,
        "explanation": "Increasing the magnetic field strength in MRI increases the Signal-to-Noise Ratio (SNR), providing better image quality. However, it also increases susceptibility artifacts, tissue heating risk, and metallic projectile danger."
      },
      {
        "id": "p3_q55",
        "question": "Newton's Inverse Square Law is useful in radiography because it indicates how radiation intensity is affected by:",
        "options": [
          "Radioactive decay",
          "Distance from the source",
          "None of the above",
          "The size of the source"
        ],
        "correctAnswer": 1,
        "explanation": "The Inverse Square Law shows that radiation intensity varies inversely with the square of the distance (I ∝ 1/d²). This is essential for calculating exposure changes with SID variations and for radiation protection."
      },
      {
        "id": "p3_q56",
        "question": "As an ultrasound pulse moves through tissue, it will undergo a change of all the following EXCEPT:",
        "options": [
          "Physical size",
          "Frequency",
          "Amplitude (energy)",
          "Intensity"
        ],
        "correctAnswer": 1,
        "explanation": "Frequency remains constant as ultrasound travels through tissue. The frequency is determined by the transducer and does not change. However, amplitude, physical size (beam width), and intensity all change due to attenuation and diffraction."
      },
      {
        "id": "p3_q57",
        "question": "The spatial resolution of an imaging system is most directly related to:",
        "options": [
          "Visibility of large, low contrast objects",
          "Visibility of anatomical detail",
          "Visibility of soft tissues",
          "Visibility of noisy images"
        ],
        "correctAnswer": 1,
        "explanation": "Spatial resolution refers to the ability to distinguish fine anatomical detail — the smallest structures that can be clearly separated in an image. Higher spatial resolution = better visibility of small anatomical structures."
      },
      {
        "id": "p3_q58",
        "question": "The radio frequency energy used in MRI and X-rays have essentially the same:",
        "options": [
          "Wavelength",
          "Velocity",
          "Photon energy",
          "Frequency"
        ],
        "correctAnswer": 1,
        "explanation": "Both RF waves (used in MRI) and X-rays are electromagnetic radiation traveling at the same velocity — the speed of light (3 × 10⁸ m/s). However, they have vastly different frequencies, wavelengths, and photon energies."
      },
      {
        "id": "p3_q59",
        "question": "The most appropriate instrument for measuring scattered X-ray exposure from a patient is:",
        "options": [
          "Scintillation detector",
          "Geiger counter",
          "Small ionization chamber",
          "Large ionization chamber"
        ],
        "correctAnswer": 1,
        "explanation": "A Geiger-Müller counter (Geiger counter) is most appropriate for detecting scattered radiation because it can detect very low levels of radiation and is highly sensitive to the variable, low-intensity scattered X-rays around patients."
      },
      {
        "id": "p3_q60",
        "question": "The main component of radiographic noise is:",
        "options": [
          "Random mottle",
          "Quantum mottle",
          "Graininess",
          "Structure mottle"
        ],
        "correctAnswer": 1,
        "explanation": "Quantum mottle (also called quantum noise or photon noise) is the main component of radiographic noise. It results from the random statistical fluctuation in the number of X-ray photons reaching the image receptor."
      },
      {
        "id": "p3_q61",
        "question": "Under the ionising radiation regulations, the annual dose limit for an adult worker is:",
        "options": [
          "2 mSv",
          "50 mSv",
          "20 mSv",
          "5 mSv"
        ],
        "correctAnswer": 2,
        "explanation": "The ICRP recommends an annual effective dose limit of 20 mSv averaged over 5 years for occupational radiation workers, with no single year exceeding 50 mSv. AERB (India) also follows 20 mSv/year."
      },
      {
        "id": "p3_q62",
        "question": "Absorbed dose is measured in:",
        "options": [
          "Man Sieverts",
          "Grays",
          "Coulombs",
          "Sieverts"
        ],
        "correctAnswer": 1,
        "explanation": "Absorbed dose is measured in Grays (Gy), where 1 Gy = 1 joule of energy absorbed per kilogram of tissue. The older unit was the rad (1 Gy = 100 rad). Sieverts measure equivalent/effective dose."
      },
      {
        "id": "p3_q63",
        "question": "One rad is equal to the absorption of:",
        "options": [
          "1 joule/kg",
          "0.1 Gy",
          "100 joules/kg",
          "0.01 Gy"
        ],
        "correctAnswer": 3,
        "explanation": "1 rad = 0.01 Gy = 0.01 J/kg = 100 ergs/gram. The rad is the CGS unit of absorbed dose. The SI unit Gray (Gy) = 100 rad. This conversion is fundamental in radiation dosimetry."
      },
      {
        "id": "p3_q64",
        "question": "In the Photoelectric effect:",
        "options": [
          "The gamma ray is scattered",
          "Fluorescent X-ray emission never results",
          "All the gamma ray energy is transferred to the photoelectron",
          "None of the above"
        ],
        "correctAnswer": 2,
        "explanation": "In the photoelectric effect, the incident photon's entire energy is transferred to an inner shell electron (photoelectron), which is ejected from the atom. The photon disappears completely. This interaction is dominant at low photon energies and high Z materials."
      },
      {
        "id": "p3_q65",
        "question": "The intensity of the X-ray beam that leaves the X-ray tube is not uniform throughout all portions of the beam. This is called:",
        "options": [
          "Tube rating",
          "Stray radiation",
          "Heel effect",
          "Thermionic emission"
        ],
        "correctAnswer": 2,
        "explanation": "The heel effect describes the uneven distribution of X-ray intensity across the beam. The cathode side has higher intensity than the anode side because X-rays produced deeper in the anode are absorbed before exiting."
      },
      {
        "id": "p3_q66",
        "question": "Why is copper used as an anode stem?",
        "options": [
          "Very hard",
          "Poor heat dissipation",
          "High thermal conductivity",
          "None of the above"
        ],
        "correctAnswer": 2,
        "explanation": "Copper is used as the anode stem due to its high thermal conductivity. It efficiently conducts heat away from the tungsten target to the rotor and bearing assembly, aiding in heat dissipation from the anode."
      },
      {
        "id": "p3_q67",
        "question": "Which is NOT a method for radiation protection?",
        "options": [
          "Time",
          "Shielding",
          "Distance",
          "Dosimeter"
        ],
        "correctAnswer": 3,
        "explanation": "A dosimeter is not a method of radiation protection — it is a monitoring device that measures radiation exposure. The three principles of radiation protection are: Time (minimize exposure time), Distance (maximize distance), and Shielding (use barriers)."
      },
      {
        "id": "p3_q68",
        "question": "Which device is used to improve radiographic quality by reducing scattered radiation?",
        "options": [
          "All of these",
          "Grids",
          "Film cassette",
          "X-ray table"
        ],
        "correctAnswer": 1,
        "explanation": "Grids are placed between the patient and the image receptor to absorb scattered radiation while allowing primary (useful) radiation to pass through. This significantly improves image contrast and quality."
      },
      {
        "id": "p3_q69",
        "question": "The X-ray tube is made up of:",
        "options": [
          "Boro glass",
          "Aluminium",
          "Pyrex glass",
          "Beryllium"
        ],
        "correctAnswer": 2,
        "explanation": "The X-ray tube envelope is made of Pyrex glass, which can withstand high temperatures and maintains the vacuum seal. Pyrex is borosilicate glass with high heat resistance and low thermal expansion coefficient."
      },
      {
        "id": "p3_q70",
        "question": "Fogging of X-ray film is caused by:",
        "options": [
          "Pair annihilation",
          "Compton scattering",
          "Pair production",
          "Photo electric effect"
        ],
        "correctAnswer": 1,
        "explanation": "Fogging of X-ray film is primarily caused by Compton scattering. Scattered photons reach the film from various directions, adding unwanted exposure (fog) and reducing image contrast. Grids are used to reduce this."
      },
      {
        "id": "p3_q71",
        "question": "The radiation warning symbol is a black _____ on a yellow background:",
        "options": [
          "Single foil",
          "Quad foil",
          "Dual foil",
          "Trifoil"
        ],
        "correctAnswer": 3,
        "explanation": "The trefoil (tri-foil) is the internationally recognized radiation warning symbol — three blades arranged symmetrically around a central disc, printed in black (or magenta) on a yellow background."
      },
      {
        "id": "p3_q72",
        "question": "The most damaging type of radiation is:",
        "options": [
          "X-rays",
          "Beta rays",
          "Alpha rays",
          "Gamma rays"
        ],
        "correctAnswer": 2,
        "explanation": "Alpha particles are the most damaging when deposited internally due to their high mass, double positive charge, and high LET (Linear Energy Transfer). They cause intense ionization along a very short path."
      },
      {
        "id": "p3_q73",
        "question": "TLD should be worn at:",
        "options": [
          "The back side at the shoulder position",
          "Outside the lead apron collar position",
          "Outside the lead apron stomach position",
          "Inside the lead apron chest level"
        ],
        "correctAnswer": 1,
        "explanation": "TLD badges should be worn outside the lead apron at collar level. This position measures the dose to the thyroid and head regions (which are not shielded by the apron) and provides the best estimate of extremity and eye dose."
      },
      {
        "id": "p3_q74",
        "question": "Who invented the cyclotron?",
        "options": [
          "Bergonie",
          "Roentgen",
          "Kerst",
          "Lawrence"
        ],
        "correctAnswer": 3,
        "explanation": "Ernest Orlando Lawrence invented the cyclotron in 1929-1930 at the University of California, Berkeley. He received the Nobel Prize in Physics in 1939 for this invention, which accelerates charged particles in a spiral path."
      },
      {
        "id": "p3_q75",
        "question": "The appropriate test to determine if an X-ray machine has adequate filtration is to measure the:",
        "options": [
          "kV",
          "Patient exposure",
          "Exposure output",
          "HVL"
        ],
        "correctAnswer": 3,
        "explanation": "HVL (Half-Value Layer) is measured to determine if an X-ray machine has adequate filtration. HVL is the thickness of material needed to reduce beam intensity by half. Adequate filtration removes low-energy photons that increase patient dose without contributing to the image."
      },
      {
        "id": "p3_q76",
        "question": "The value of a CT number (in Hounsfield units) is determined primarily by:",
        "options": [
          "Slice thickness",
          "Tissue density",
          "Matrix size",
          "kV"
        ],
        "correctAnswer": 1,
        "explanation": "CT numbers (Hounsfield Units) are determined primarily by tissue density (linear attenuation coefficient). Each tissue type has a characteristic CT number: water = 0 HU, air = -1000 HU, bone = +1000 HU."
      },
      {
        "id": "p3_q77",
        "question": "The efficiency of X-ray production can generally be increased by increasing the:",
        "options": [
          "Exposure time",
          "kV",
          "mA",
          "Focal spot size"
        ],
        "correctAnswer": 1,
        "explanation": "Increasing kV improves X-ray production efficiency. The efficiency of X-ray production is approximately proportional to (Z × kV), where Z is the atomic number. Higher kV electrons produce more X-rays per unit energy input."
      },
      {
        "id": "p3_q78",
        "question": "Positron emission involves the ejection of:",
        "options": [
          "A beta plus particle",
          "A beta minus particle",
          "A proton and a neutron",
          "An alpha particle"
        ],
        "correctAnswer": 0,
        "explanation": "Positron emission involves the ejection of a beta plus (β⁺) particle — a positively charged electron (positron). A proton in the nucleus converts to a neutron, emitting a positron and a neutrino. This is the basis of PET scanning."
      },
      {
        "id": "p3_q79",
        "question": "In order to better visualize joint space in AP view of knee joint, the tube is angled 5 to 7 degrees:",
        "options": [
          "Towards medial side",
          "Towards lateral side",
          "Cranially",
          "Caudally"
        ],
        "correctAnswer": 2,
        "explanation": "For AP knee, the tube is angled 5-7 degrees cranially (cephalad) to open up the knee joint space. This compensates for the 5-7° posterior slope of the tibial plateau."
      },
      {
        "id": "p3_q80",
        "question": "For AP view of coccyx, the central ray is directed:",
        "options": [
          "10° towards head",
          "25° towards head",
          "25° towards feet",
          "10° towards feet"
        ],
        "correctAnswer": 3,
        "explanation": "For AP coccyx, the central ray is angled 10° caudally (towards feet) to project the coccyx below the pubic symphysis. This angulation eliminates overlap and allows clear visualization of the coccyx."
      }
    ]
  }
,
  // ==================== PAPER 4 & 5 ====================
  {
    "id": 4,
    "name": "Paper 4",
    "subtitle": "BFUHS Radiographer",
    "totalQuestions": 98,
    "questions": [
      {
        "id": "p4_q1",
        "question": "Wavelength of X-rays ranges from",
        "options": [
          "5-10 A",
          "0.1-0.5 A",
          "6-7 A",
          "15-20 A"
        ],
        "correctAnswer": 1,
        "explanation": "Diagnostic X-rays typically have a wavelength ranging from 0.1 to 0.5 Angstroms."
      },
      {
        "id": "p4_q2",
        "question": "X-rays are electrically charged",
        "options": [
          "protons",
          "neutral",
          "electrons",
          "neutrons"
        ],
        "correctAnswer": 1,
        "explanation": "X-rays are electromagnetic waves and carry no electrical charge."
      },
      {
        "id": "p4_q3",
        "question": "Radioactive substances emit all except",
        "options": [
          "beta",
          "alpha",
          "gamma",
          "epsilon"
        ],
        "correctAnswer": 3,
        "explanation": "Radioactive decay primarily involves the emission of alpha particles, beta particles, and gamma rays."
      },
      {
        "id": "p4_q4",
        "question": "Most hazardous internally located isotopes are",
        "options": [
          "delta particles",
          "alpha particles",
          "gamma particles",
          "beta particles"
        ],
        "correctAnswer": 1,
        "explanation": "Alpha particles have high linear energy transfer (LET), causing massive localized tissue damage if ingested or inhaled."
      },
      {
        "id": "p4_q5",
        "question": "Radiation exposure can measured by",
        "options": [
          "GM Counter",
          "Scintillation detector",
          "All the above",
          "Ionization Chamber"
        ],
        "correctAnswer": 2,
        "explanation": "Various types of detectors, including ionization chambers, scintillation detectors, and Geiger-Muller counters, are used to measure radiation."
      },
      {
        "id": "p4_q6",
        "question": "TLD badge consists of",
        "options": [
          "Disprosium",
          "Calcium sulphate",
          "Teflon",
          "All the above"
        ],
        "correctAnswer": 3,
        "explanation": "A thermoluminescent dosimeter (TLD) typically contains a phosphor like calcium sulfate doped with dysprosium, embedded in a Teflon matrix."
      },
      {
        "id": "p4_q7",
        "question": "In Mammography tube, anode is made of",
        "options": [
          "Beryllium",
          "Tungsten",
          "Molybdenum",
          "Cobalt"
        ],
        "correctAnswer": 2,
        "explanation": "Molybdenum targets produce characteristic X-rays in the optimal 17-20 keV energy range needed for soft tissue contrast in mammography."
      },
      {
        "id": "p4_q8",
        "question": "Advantage of high frequency generator are",
        "options": [
          "initial conversion of AC to DC waveform",
          "All the above",
          "To ensure accurate voltage and current",
          "Excellent service and repair"
        ],
        "correctAnswer": 1,
        "explanation": "High frequency generators provide near-constant potential, ensuring accurate technique parameters and efficient operation."
      },
      {
        "id": "p4_q9",
        "question": "Modalities not involving ionizing radiations are",
        "options": [
          "CT Scan",
          "PET",
          "X-rays",
          "MRI"
        ],
        "correctAnswer": 3,
        "explanation": "Magnetic Resonance Imaging (MRI) uses strong magnetic fields and radio waves, not ionizing radiation."
      },
      {
        "id": "p4_q10",
        "question": "Biological effect at the same energy level is in the order of",
        "options": [
          "alpha = beta = gamma",
          "alpha < beta < gamma",
          "alpha > beta > gamma",
          "None of the above"
        ],
        "correctAnswer": 2,
        "explanation": "Alpha particles have the highest linear energy transfer (LET) and cause the most biological damage at a given energy, followed by beta and then gamma."
      },
      {
        "id": "p4_q11",
        "question": "Death due to radiation exposure occurs at the dose of",
        "options": [
          "0.25-1Sv",
          "3Sv",
          ">500REM",
          "100 mSv"
        ],
        "correctAnswer": 2,
        "explanation": "Doses exceeding 500 REM (5 Sieverts) over a short period are typically lethal without intensive medical intervention."
      },
      {
        "id": "p4_q12",
        "question": "Cataract in eye with radiation exposure of 5-8Sv occurs within",
        "options": [
          "6 months",
          "5-10 years",
          "20-30 years",
          "one year"
        ],
        "correctAnswer": 1,
        "explanation": "The latent period for radiation-induced cataracts after significant exposure typically ranges from several years up to a decade."
      },
      {
        "id": "p4_q13",
        "question": "Exposure can be reduced to desired level by",
        "options": [
          "By measuring distance between source and area under exposure",
          "All the above",
          "by reducing duration of exposure",
          "Providing shield"
        ],
        "correctAnswer": 1,
        "explanation": "The three primary principles of radiation protection are maximizing distance, minimizing time, and utilizing adequate shielding."
      },
      {
        "id": "p4_q14",
        "question": "Minimum thickness of lead coat should be",
        "options": [
          "1.5mm",
          "4mm",
          "0.25 mm",
          "2mm"
        ],
        "correctAnswer": 2,
        "explanation": "Standard lead aprons for fluoroscopy and general radiography have a minimum lead equivalent thickness of 0.25 mm."
      },
      {
        "id": "p4_q15",
        "question": "Radioactivity was discovered by",
        "options": [
          "Roentgen",
          "None of the above",
          "Bacqueral",
          "Madam Curie"
        ],
        "correctAnswer": 2,
        "explanation": "Henri Becquerel discovered spontaneous radioactivity in 1896 while working with uranium salts."
      },
      {
        "id": "p4_q16",
        "question": "Causes of unsharpness in Radiographie image are",
        "options": [
          "photographic",
          "movement",
          "all the above",
          "geometry"
        ],
        "correctAnswer": 2,
        "explanation": "Image unsharpness can result from geometric factors (focal spot size), photographic (screen phosphor), or patient movement."
      },
      {
        "id": "p4_q17",
        "question": "Radiographic examination of joints is called",
        "options": [
          "Cholangiography",
          "Arteriography",
          "Arthrography",
          "Dacrocystography"
        ],
        "correctAnswer": 2,
        "explanation": "Arthrography is the medical imaging of a joint, often performed after injecting a contrast medium."
      },
      {
        "id": "p4_q18",
        "question": "Photoconductor used in Xeroradiography is",
        "options": [
          "Copper",
          "Tungsten",
          "Selenium",
          "Cobalt"
        ],
        "correctAnswer": 2,
        "explanation": "Amorphous selenium is used as the photoconductor plate in xeroradiography due to its excellent charge-holding properties."
      },
      {
        "id": "p4_q19",
        "question": "Good and uniform compression of Breast in mammography is to",
        "options": [
          "All the above",
          "Decrease scatter radiations",
          "Decrease geometric unsharpness",
          "Immobilise breast"
        ],
        "correctAnswer": 0,
        "explanation": "Compression reduces tissue thickness (decreasing scatter), prevents motion, and improves geometric sharpness."
      },
      {
        "id": "p4_q20",
        "question": "Most commonly used lubricant purgative in abdominal preparation is",
        "options": [
          "Isogel",
          "Bisacodyl",
          "Castor oil",
          "Liquid paraffin"
        ],
        "correctAnswer": 3,
        "explanation": "Liquid paraffin acts as a lubricant laxative to aid in bowel clearance prior to abdominal imaging."
      },
      {
        "id": "p4_q21",
        "question": "Quantum theory fails to explain",
        "options": [
          "Interference",
          "Photoelectric effect",
          "All the above",
          "Radiation emission"
        ],
        "correctAnswer": 0,
        "explanation": "Wave theory is required to explain phenomena like interference and diffraction, whereas quantum theory explains particle-like behavior."
      },
      {
        "id": "p4_q22",
        "question": "Visible spectrum ranges from",
        "options": [
          "4000-7700A",
          "200-500A",
          "8000-9900A",
          "1000-3000A"
        ],
        "correctAnswer": 0,
        "explanation": "The visible light spectrum typically ranges from about 400 nm to 700 nm, which is equivalent to 4000 to 7700 Angstroms."
      },
      {
        "id": "p4_q23",
        "question": "Contrast material used in Micturating cystourethrography",
        "options": [
          "Sodium Iodide",
          "Barium Sulfate",
          "Telepaque",
          "Water-soluble iodinated contrast"
        ],
        "correctAnswer": 3,
        "explanation": "Water-soluble iodinated contrast media are safely used to outline the bladder and urethra during MCU."
      },
      {
        "id": "p4_q24",
        "question": "Investigation of choice in pericardial effusion:",
        "options": [
          "Echocardiography",
          "Cardiac catheterization",
          "Lateral view X-ray chest",
          "USG"
        ],
        "correctAnswer": 0,
        "explanation": "Echocardiography is highly sensitive, non-invasive, and considered the gold standard for diagnosing pericardial effusion."
      },
      {
        "id": "p4_q25",
        "question": "All are imaging modalities of chest, except",
        "options": [
          "HRCT",
          "Ventilation perfusion study",
          "Echocardiography",
          "USG"
        ],
        "correctAnswer": 3,
        "explanation": "Ultrasound cannot penetrate the air-filled lungs, limiting its usefulness for general chest imaging compared to CT or plain X-rays."
      },
      {
        "id": "p4_q26",
        "question": "SI unit for measurement of luminous intensity is",
        "options": [
          "Kelvin",
          "Parsec",
          "Fermi",
          "Candela"
        ],
        "correctAnswer": 3,
        "explanation": "The candela is the standard SI base unit of luminous intensity."
      },
      {
        "id": "p4_q27",
        "question": "Contraindication for intravenous pyelography is",
        "options": [
          "Pregnancy",
          "Congenital anomalies involving kidney",
          "All the above",
          "Blunt injury abdomen with haematuria"
        ],
        "correctAnswer": 0,
        "explanation": "IVP involves significant ionizing radiation and is generally contraindicated during pregnancy to protect the fetus."
      },
      {
        "id": "p4_q28",
        "question": "Which of the following is semi conductor",
        "options": [
          "Silicon",
          "Aluminum",
          "Copper",
          "Lead"
        ],
        "correctAnswer": 0,
        "explanation": "Silicon is a widely used semiconductor material in electronic components and solid-state radiation detectors."
      },
      {
        "id": "p4_q29",
        "question": "Adverse reaction to contrast are all except",
        "options": [
          "Urticaria",
          "Convulsions",
          "Cataract",
          "Hypotension"
        ],
        "correctAnswer": 2,
        "explanation": "Cataracts are a long-term consequence of radiation exposure, not an acute adverse reaction to contrast media."
      },
      {
        "id": "p4_q30",
        "question": "Enteroclysis is",
        "options": [
          "T-tube cholangiography",
          "Barium enema",
          "Small bowel enema",
          "Barium meal follow thro"
        ],
        "correctAnswer": 2,
        "explanation": "Enteroclysis involves the direct instillation of contrast into the small bowel via a nasojejunal tube."
      },
      {
        "id": "p4_q31",
        "question": "Barium suspension is made of",
        "options": [
          "Barium sulfide",
          "Barium chloride",
          "Barium sulfate and water",
          "Barium carbonate"
        ],
        "correctAnswer": 2,
        "explanation": "Barium sulfate is insoluble in water and forms a safe suspension for gastrointestinal imaging."
      },
      {
        "id": "p4_q32",
        "question": "Ohm's law of electric current is",
        "options": [
          "None of the above",
          "V=IR",
          "V=I/R",
          "I=VR"
        ],
        "correctAnswer": 1,
        "explanation": "Ohm's law states that voltage (V) equals current (I) multiplied by resistance (R)."
      },
      {
        "id": "p4_q33",
        "question": "According to Maxwell's electromagnetic theory",
        "options": [
          "Light is electrical wave",
          "Light is transverse electromagnetic wave",
          "light is magnetic wave",
          "All the above"
        ],
        "correctAnswer": 1,
        "explanation": "Maxwell's theory describes light as a propagating wave of oscillating electric and magnetic fields perpendicular to each other."
      },
      {
        "id": "p4_q34",
        "question": "Biliary contrast medium is",
        "options": [
          "Barium sulfate",
          "Sodium Iodide",
          "Iodipamide (Biligrafin)",
          "Gadolinium"
        ],
        "correctAnswer": 2,
        "explanation": "Contrast media such as iodipamide are specifically excreted by the liver into the biliary system, making them useful for biliary imaging."
      },
      {
        "id": "p4_q35",
        "question": "Basic elements of image intensifier are",
        "options": [
          "Output phosphor",
          "Input phosphor",
          "All of the above",
          "Accelerating anode"
        ],
        "correctAnswer": 2,
        "explanation": "An image intensifier tube utilizes an input phosphor, photocathode, electrostatic lenses (accelerating anode), and an output phosphor."
      },
      {
        "id": "p4_q36",
        "question": "Radiographic contrast depends on",
        "options": [
          "All the above",
          "Scatter radiations",
          "Type of film",
          "Intensifying screens"
        ],
        "correctAnswer": 0,
        "explanation": "Image contrast is influenced by the film characteristic curve, the presence of intensifying screens, and the amount of scatter reaching the receptor."
      },
      {
        "id": "p4_q37",
        "question": "Walls of radiography room should be lined with",
        "options": [
          "Tin",
          "Copper",
          "Lead",
          "Iron"
        ],
        "correctAnswer": 2,
        "explanation": "Lead has a high atomic number and density, making it an excellent material for absorbing scattered X-rays and shielding rooms."
      },
      {
        "id": "p4_q38",
        "question": "Penetration power of radiograph is increased by",
        "options": [
          "Decreasing kVp",
          "Increasing mAs",
          "Increasing exposure time",
          "Increasing kVp"
        ],
        "correctAnswer": 3,
        "explanation": "Increasing the kilovoltage peak (kVp) increases the average energy of the X-ray beam, enhancing its penetrating ability."
      },
      {
        "id": "p4_q39",
        "question": "Ear is located in",
        "options": [
          "Occipital bone",
          "Frontal bone",
          "Temporal bone",
          "Parietal bone"
        ],
        "correctAnswer": 2,
        "explanation": "The middle and inner ear structures are housed within the petrous portion of the temporal bone."
      },
      {
        "id": "p4_q40",
        "question": "Length of ureter is",
        "options": [
          "40 cm",
          "5 cm",
          "25 cm",
          "15 cm"
        ],
        "correctAnswer": 2,
        "explanation": "The human ureters are muscular tubes typically measuring about 25 to 30 cm in length."
      },
      {
        "id": "p4_q41",
        "question": "Adam's apple is due to prominence of",
        "options": [
          "Epiglottis",
          "Cricoid cartilage",
          "Arytenoid",
          "Thyroid cartilage"
        ],
        "correctAnswer": 3,
        "explanation": "The laryngeal prominence, or Adam's apple, is formed by the angle of the thyroid cartilage."
      },
      {
        "id": "p4_q42",
        "question": "Working distance of safe light to the film should not be less than",
        "options": [
          "9 metres",
          "None of the above",
          "1.2 metres",
          "3 metres"
        ],
        "correctAnswer": 2,
        "explanation": "To prevent film fogging, safelights are typically mounted at least 1.2 meters (about 4 feet) away from the working surface."
      },
      {
        "id": "p4_q43",
        "question": "All are advantages of spiral CT except",
        "options": [
          "No motion artifact",
          "Increase image noise",
          "Multiplanar image",
          "Improves lesion detection"
        ],
        "correctAnswer": 1,
        "explanation": "Spiral CT generally decreases motion artifacts and allows multiplanar reconstructions, but it does not inherently aim to increase image noise."
      },
      {
        "id": "p4_q44",
        "question": "Heart of MRI system is",
        "options": [
          "Computer",
          "Magnet",
          "Gradient coils",
          "Shim coils"
        ],
        "correctAnswer": 1,
        "explanation": "The primary static magnetic field generated by the main magnet is the fundamental component required for MRI."
      },
      {
        "id": "p4_q45",
        "question": "Father of Computed Tomography is",
        "options": [
          "WC Roentgen",
          "Curie",
          "Godfrey Hounsfield",
          "Robert Koch"
        ],
        "correctAnswer": 2,
        "explanation": "Sir Godfrey Hounsfield was the principal inventor of the first clinical CT scanner."
      },
      {
        "id": "p4_q46",
        "question": "Wattage of bulb in safe light should be less than",
        "options": [
          "50 watts",
          "100 watts",
          "15 watts",
          "30 watts"
        ],
        "correctAnswer": 2,
        "explanation": "Safelight bulbs are kept at low wattages, typically 15 watts, to minimize the risk of fogging the photosensitive film."
      },
      {
        "id": "p4_q47",
        "question": "Heart of X-ray film is",
        "options": [
          "Emulsion",
          "Substratum",
          "Developer",
          "Base"
        ],
        "correctAnswer": 0,
        "explanation": "The emulsion layer contains the silver halide crystals, which are responsible for capturing the latent image."
      },
      {
        "id": "p4_q48",
        "question": "Automatic film processors have all advantages except",
        "options": [
          "Temperature regulation is variable",
          "Increases capacity of radiology dept",
          "Shortened processing time",
          "Improves quality"
        ],
        "correctAnswer": 0,
        "explanation": "Automatic processors rely on precise, consistent temperature regulation, not variable regulation, to ensure uniform film quality."
      },
      {
        "id": "p4_q49",
        "question": "All are components of fixer except",
        "options": [
          "Sodium sulphite",
          "Hydroquinone",
          "Sodium thiosulphate",
          "Water"
        ],
        "correctAnswer": 1,
        "explanation": "Hydroquinone is a reducing agent found in the developer, whereas the fixer primarily contains clearing agents like sodium thiosulphate."
      },
      {
        "id": "p4_q50",
        "question": "Use of hyoscine N Butylbromide (Buscopan) is contraindicated in",
        "options": [
          "Severe Prostatism",
          "For adequate distension of bowel",
          "Pain abdomen",
          "Bowel spasm"
        ],
        "correctAnswer": 0,
        "explanation": "Buscopan has anticholinergic effects that can cause urinary retention, making it contraindicated in patients with severe prostatism."
      },
      {
        "id": "p4_q51",
        "question": "RF pulse causes longitudinal magnetization to and establishes a new transversal magnetization",
        "options": [
          "Increase",
          "Decrease",
          "Remain unchanged",
          "Become zero"
        ],
        "correctAnswer": 1,
        "explanation": "The RF pulse flips protons into the transverse plane, causing longitudinal magnetization to decrease as it converts into transverse magnetization."
      },
      {
        "id": "p4_q52",
        "question": "1/T2 is also called",
        "options": [
          "Transverse frequency",
          "Longitudinal frequency",
          "Transverse relaxation rate",
          "Longitudinal relaxation rate"
        ],
        "correctAnswer": 2,
        "explanation": "T2 is the transverse relaxation time, so its reciprocal, 1/T2, represents the transverse relaxation rate."
      },
      {
        "id": "p4_q53",
        "question": "TR less than is short.",
        "options": [
          "500msec",
          "1000msec",
          "300msec",
          "700msec"
        ],
        "correctAnswer": 0,
        "explanation": "In MRI, a Repetition Time (TR) of less than 500 milliseconds is generally considered short, maximizing T1 weighting."
      },
      {
        "id": "p4_q54",
        "question": "T2 of fat is",
        "options": [
          "Equal to water",
          "100msec",
          "Shorter than water",
          "Longer than water"
        ],
        "correctAnswer": 2,
        "explanation": "Fat has a shorter T2 relaxation time compared to water, which has a very long T2 time."
      },
      {
        "id": "p4_q55",
        "question": "TR more than is long.",
        "options": [
          "700 msec",
          "1000 msec",
          "500msec",
          "1500 msec"
        ],
        "correctAnswer": 3,
        "explanation": "A Repetition Time (TR) of over 1500-2000 milliseconds is considered long, which is used for T2-weighted and proton density images."
      },
      {
        "id": "p4_q56",
        "question": "We get T1 weighted image, when TR is",
        "options": [
          "None of the above",
          "Too long to be measured",
          "Long",
          "Short"
        ],
        "correctAnswer": 3,
        "explanation": "A short TR and a short TE are required to produce a T1-weighted image in MRI."
      },
      {
        "id": "p4_q57",
        "question": "In a normal case, air is seen as dark on",
        "options": [
          "Both T1 and T2 weighted images",
          "T1 weighted image",
          "T2 weighted image",
          "None of the above"
        ],
        "correctAnswer": 0,
        "explanation": "Air lacks mobile protons, meaning it yields no MRI signal and appears completely black on all standard MRI sequences."
      },
      {
        "id": "p4_q58",
        "question": "In a normal case, dense bone is seen as dark on",
        "options": [
          "CT image",
          "MR image",
          "Both MR and CT images",
          "None of CT or MR images"
        ],
        "correctAnswer": 1,
        "explanation": "Cortical bone has very few mobile protons and a very short T2, making it appear dark (signal void) on MRI. In CT, dense bone appears bright."
      },
      {
        "id": "p4_q59",
        "question": "In medical Ultrasonography, Piezoelectric material used is",
        "options": [
          "Lead zirconate titanate.",
          "None of the above.",
          "Zinc cadmium sulphate",
          "Calcium Tungstate"
        ],
        "correctAnswer": 0,
        "explanation": "Lead zirconate titanate (PZT) is the most common synthetic piezoelectric ceramic used in modern ultrasound transducers."
      },
      {
        "id": "p4_q60",
        "question": "To sterilise the USG transducer, it should be",
        "options": [
          "Cleaned with specific chemical disinfectants",
          "Heated.",
          "Autoclaved.",
          "None of the above."
        ],
        "correctAnswer": 3,
        "explanation": "Ultrasound transducers cannot be autoclaved or heated as it damages the piezoelectric crystals. They are typically sterilized using cold chemical disinfectants."
      },
      {
        "id": "p4_q61",
        "question": "USG produces which of the following biological effects.",
        "options": [
          "None of these.",
          "Both of these.",
          "Cavitation",
          "Heat"
        ],
        "correctAnswer": 1,
        "explanation": "Ultrasound can cause biological effects through thermal mechanisms (heat) and mechanical mechanisms (cavitation)."
      },
      {
        "id": "p4_q62",
        "question": "In Color Doppler venous flow is normally which type?",
        "options": [
          "Circular flow",
          "Plug flow",
          "Laminar flow",
          "Turbulent flow"
        ],
        "correctAnswer": 2,
        "explanation": "Normal venous flow is laminar, with blood moving in parallel layers and the highest velocity in the center of the vessel."
      },
      {
        "id": "p4_q63",
        "question": "Unit of Pulse repetition frequency is",
        "options": [
          "mm/sec",
          "Hertz",
          "Per minute",
          "msec"
        ],
        "correctAnswer": 1,
        "explanation": "Pulse repetition frequency (PRF) is measured in Hertz (Hz), which represents pulses per second."
      },
      {
        "id": "p4_q64",
        "question": "In which of the following, Doppler has tws piezoelectric elements with single head?",
        "options": [
          "Doppler color flow imaging",
          "Pulse Doppler",
          "CW Doppler",
          "Duplex"
        ],
        "correctAnswer": 2,
        "explanation": "Continuous Wave (CW) Doppler requires two separate piezoelectric elements in the transducer: one for continuously transmitting and one for continuously receiving."
      },
      {
        "id": "p4_q65",
        "question": "Transrectal scanner is best at which frequency?",
        "options": [
          "3.5 MHz",
          "1.0 MHz",
          "7.5 MHz",
          "5.0 MHz"
        ],
        "correctAnswer": 2,
        "explanation": "Transrectal scanners use higher frequencies, typically around 7.5 to 10 MHz, to provide high-resolution images of the prostate and nearby structures."
      },
      {
        "id": "p4_q66",
        "question": "Contrast resolution in CT is",
        "options": [
          "None of the above",
          "Less than conventional films",
          "Same as conventional films",
          "Better than conventional films"
        ],
        "correctAnswer": 3,
        "explanation": "CT has significantly better contrast resolution than conventional radiography, allowing differentiation of tissues with very small density differences."
      },
      {
        "id": "p4_q67",
        "question": "CT number of water is",
        "options": [
          "zero",
          "200-300",
          "+1000",
          "-1000"
        ],
        "correctAnswer": 0,
        "explanation": "On the Hounsfield scale used in CT, the radiodensity of distilled water at standard temperature and pressure is defined as zero (0 HU)."
      },
      {
        "id": "p4_q68",
        "question": "CT number of bone is",
        "options": [
          "zero",
          "-1000",
          "200-300",
          "+1000"
        ],
        "correctAnswer": 3,
        "explanation": "Dense cortical bone has high attenuation and corresponds to a CT number of approximately +1000 Hounsfield Units."
      },
      {
        "id": "p4_q69",
        "question": "In CT reference material is",
        "options": [
          "air",
          "bone",
          "water",
          "none of the above"
        ],
        "correctAnswer": 2,
        "explanation": "Water is the standard reference material in CT, serving as the baseline (0 HU) for calculating the Hounsfield units of other tissues."
      },
      {
        "id": "p4_q70",
        "question": "With narrowing of the window, each gray scale",
        "options": [
          "no effect on CT numbers",
          "less CT numbers.",
          "none of the above",
          "larger CT numbers"
        ],
        "correctAnswer": 1,
        "explanation": "A narrow window width means fewer Hounsfield units are spread across the available grayscale, increasing contrast by assigning fewer CT numbers to each shade of gray."
      },
      {
        "id": "p4_q71",
        "question": "Barium swallow is indicated in all except",
        "options": [
          "Tracheo Esophageal fistulae",
          "Motility disorder",
          "Intestinal obstruction",
          "Failed upper Gl endoscopy"
        ],
        "correctAnswer": 2,
        "explanation": "Barium is contraindicated in suspected intestinal obstruction due to the risk of barium inspissation and exacerbation of the obstruction; water-soluble contrast should be used instead."
      },
      {
        "id": "p4_q72",
        "question": "Virtual Colonoscopy (CT colonoscopy) is the radiological investigation of choice for",
        "options": [
          "Detection of Lung cancer",
          "Detection of esophageal stricture.",
          "Detection of Colonic neoplasia.",
          "Acid Peptic disease."
        ],
        "correctAnswer": 2,
        "explanation": "CT colonography is a specialized imaging technique primarily used as a non-invasive screening tool for detecting colonic polyps and neoplasia."
      },
      {
        "id": "p4_q73",
        "question": "MR imaging of GI tract is indicated in",
        "options": [
          "Perianal fistula",
          "Local staging of anorectal cancer",
          "All the above.",
          "Inflammatory bowel disease."
        ],
        "correctAnswer": 2,
        "explanation": "MRI is excellent for soft tissue contrast and is routinely used for evaluating perianal fistulas, staging anorectal tumors, and assessing inflammatory bowel disease."
      },
      {
        "id": "p4_q74",
        "question": "Indication for MCU is",
        "options": [
          "Bladder leak.",
          "To study uretheral pathologies",
          "Vesicoureteric reflux",
          "All the above."
        ],
        "correctAnswer": 3,
        "explanation": "Micturating cystourethrography (MCU) is used to assess the lower urinary tract, making it useful for diagnosing reflux, urethral strictures, and bladder leaks."
      },
      {
        "id": "p4_q75",
        "question": "CT scan of urinary tract is done",
        "options": [
          "Intestinal mass",
          "Gall stones",
          "Renal colic/ renal stone disease",
          "Acute Pancreatitis"
        ],
        "correctAnswer": 2,
        "explanation": "Non-contrast CT of the urinary tract (CT KUB) is the gold standard for detecting and evaluating renal and ureteric stones in patients with renal colic."
      },
      {
        "id": "p4_q76",
        "question": "Indication for MR Urography",
        "options": [
          "All the above",
          "To evaluate urinary tract in pregnancy",
          "To determine the level of obstruction.",
          "Urinary obstruction unrelated to urolithiasis"
        ],
        "correctAnswer": 0,
        "explanation": "MR urography is radiation-free and provides excellent visualization of the collecting system, making it useful for finding the level and cause of non-calculous obstructions."
      },
      {
        "id": "p4_q77",
        "question": "IVU is contraindicated in",
        "options": [
          "Haematuria",
          "Vesical calculus",
          "Acute renal failure",
          "Recurrent urinary tract infection"
        ],
        "correctAnswer": 2,
        "explanation": "Acute renal failure is an absolute contraindication for Intravenous Urography (IVU) due to the risk of contrast-induced nephropathy worsening the condition."
      },
      {
        "id": "p4_q78",
        "question": "To evaluate Gall Bladder on imaging, patient should be fasting for",
        "options": [
          "24 hrs",
          "12 hrs",
          "6 hrs",
          "2 hrs"
        ],
        "correctAnswer": 2,
        "explanation": "Fasting for at least 6 hours ensures the gallbladder is adequately distended for proper sonographic evaluation."
      },
      {
        "id": "p4_q79",
        "question": "ERCP is contraindicated in",
        "options": [
          "Management of bile duct stones.",
          "Severe cardiac disease",
          "Acute Pancreatitis",
          "Post Cholecystectomy syndrome"
        ],
        "correctAnswer": 1,
        "explanation": "ERCP is an invasive endoscopic procedure and is contraindicated in patients with severe cardiac or pulmonary disease who are unfit for sedation."
      },
      {
        "id": "p4_q80",
        "question": "In MR, if fluid is darker than solids, the image is",
        "options": [
          "T1 weighted image",
          "T2 weighted image",
          "PD weighted image",
          "None of the above"
        ],
        "correctAnswer": 0,
        "explanation": "On T1-weighted sequences, fluid (like CSF or urine) has a long T1 relaxation time and appears dark (hypointense) compared to solid tissues."
      },
      {
        "id": "p4_q81",
        "question": "If fluid e.g. CSF or urine is white, image is",
        "options": [
          "T1 weighted image",
          "PD weighted image",
          "None of the above.",
          "T2 weighted image"
        ],
        "correctAnswer": 3,
        "explanation": "Fluid appears bright (hyperintense) on T2-weighted MRI sequences due to its long transverse relaxation time."
      },
      {
        "id": "p4_q82",
        "question": "In dual source CT, which of the following filters are used?",
        "options": [
          "Tungsten",
          "Tin",
          "Lead",
          "Rhenium"
        ],
        "correctAnswer": 1,
        "explanation": "In dual-source CT, a tin (Sn) filter is often used on the high-energy X-ray tube to improve spectral separation and reduce radiation dose."
      },
      {
        "id": "p4_q83",
        "question": "The Ultrasound frequency used in the diagnosis",
        "options": [
          "60kHz.",
          "1MHz-20MHz",
          "40 KHz",
          "20 KHz"
        ],
        "correctAnswer": 1,
        "explanation": "Diagnostic medical ultrasound typically utilizes frequencies in the range of 1 MHz to 20 MHz to balance tissue penetration and spatial resolution."
      },
      {
        "id": "p4_q84",
        "question": "On applying electric field certain materials change",
        "options": [
          "Both a&b",
          "None of the above.",
          "Physical dimension",
          "Chemical dimension"
        ],
        "correctAnswer": 2,
        "explanation": "The piezoelectric effect describes materials that change their physical dimensions (shape or thickness) when subjected to an electric field."
      },
      {
        "id": "p4_q85",
        "question": "Which of the following Phosphor is not used in intensifying screens",
        "options": [
          "Calcium tungstate.",
          "Zinc cadmium sulphide",
          "Terbium",
          "Thulium blue"
        ],
        "correctAnswer": 1,
        "explanation": "Zinc cadmium sulphide was historically used for fluoroscopic screens, while calcium tungstate and rare-earth phosphors are used in radiographic intensifying screens."
      },
      {
        "id": "p4_q86",
        "question": "In CT scan the 4th generation is",
        "options": [
          "None of the above.",
          "Stationary rotate type",
          "Rotate- rotate type",
          "Translate rotate type"
        ],
        "correctAnswer": 1,
        "explanation": "Fourth-generation CT scanners use a rotating X-ray tube inside a fixed, stationary ring of detectors."
      },
      {
        "id": "p4_q87",
        "question": "5th generation CT scan uses",
        "options": [
          "Broad fan beam",
          "Multiple x-ray beams.",
          "Narrow fan beam",
          "Pencil beam of x-rays"
        ],
        "correctAnswer": 1,
        "explanation": "Fifth-generation (electron beam) CT scanners use an electron gun to sweep a stationary target, effectively creating multiple X-ray beams from different angles without mechanical movement."
      },
      {
        "id": "p4_q88",
        "question": "Which of the following is best lateral resolution?",
        "options": [
          "0.06cm",
          "6cm",
          "2cm.",
          "15cm"
        ],
        "correctAnswer": 0,
        "explanation": "A smaller numerical value for lateral resolution indicates the ability to distinguish smaller, closely spaced objects, making 0.06 cm the best resolution among the options."
      },
      {
        "id": "p4_q89",
        "question": "Which of the following statements regarding protons are correct?",
        "options": [
          "They have no mass",
          "They are equal to the number of electrons in a non-ionized atom",
          "Hydrogen atom has 2 protons",
          "They have a negative charge"
        ],
        "correctAnswer": 1,
        "explanation": "In a neutral, non-ionized atom, the number of positively charged protons in the nucleus equals the number of negatively charged electrons."
      },
      {
        "id": "p4_q90",
        "question": "Which of the following is not correct for Tungsten",
        "options": [
          "It is represented by the letter W",
          "The mass number of tungsten is 284",
          "It has an atomic number of 74",
          "The K-shell binding energy of tungsten is 69.5 KeV"
        ],
        "correctAnswer": 1,
        "explanation": "Tungsten has an atomic number of 74 and an atomic mass of approximately 184, not 284."
      },
      {
        "id": "p4_q91",
        "question": "Which of following is correct for electromagnetic radiation:",
        "options": [
          "Visible light is not a part of electromagnetic spectrum",
          "X-rays and gamma rays have different frequency and wavelength",
          "Travels with a speed of light in vacuum.",
          "It cannot travel in vacuum."
        ],
        "correctAnswer": 2,
        "explanation": "All forms of electromagnetic radiation, including X-rays and light, travel at the speed of light in a vacuum (approximately 3 x 10^8 m/s)."
      },
      {
        "id": "p4_q92",
        "question": "In a diagnostic X-ray tube:",
        "options": [
          "Cathode is made of aluminium",
          "Anode is positive",
          "X-rays are produced by thermionic emission",
          "Cathode is positive"
        ],
        "correctAnswer": 1,
        "explanation": "In an X-ray tube, the anode is the positively charged target electrode, while the cathode is the negative electron source."
      },
      {
        "id": "p4_q93",
        "question": "Cathode of X-ray tube is:",
        "options": [
          "Has a low melting point",
          "Is commonly made of tungsten",
          "Is positively charged in relation to the anode",
          "Has a low resistance"
        ],
        "correctAnswer": 1,
        "explanation": "The cathode filament in an X-ray tube is typically made of tungsten due to its high melting point and efficiency in thermionic emission."
      },
      {
        "id": "p4_q94",
        "question": "The following techniques can be used to minimise scatter",
        "options": [
          "Air gaps between the object and the image receptor",
          "Intensifying screens",
          "Using collimation",
          "Increasing the tube kV"
        ],
        "correctAnswer": 2,
        "explanation": "Collimation restricts the primary X-ray beam, reducing the volume of irradiated tissue and thereby decreasing the production of scatter radiation."
      },
      {
        "id": "p4_q95",
        "question": "Which of the following is correct for mammography tube:",
        "options": [
          "Single-phase voltage supply",
          "Tube voltage of 40-50 kVp",
          "Molybdenum window",
          "Molybdenum target anode"
        ],
        "correctAnswer": 3,
        "explanation": "Mammography tubes typically use a molybdenum (or rhodium) target anode to produce the low-energy characteristic X-rays optimal for soft-tissue breast imaging."
      },
      {
        "id": "p4_q96",
        "question": "All of these are deterministic effects of radiation except-",
        "options": [
          "Hair loss",
          "Sterility",
          "Leukaemia",
          "Formation of cataract"
        ],
        "correctAnswer": 2,
        "explanation": "Leukaemia is a stochastic effect of radiation (probability increases with dose), whereas sterility, cataracts, and hair loss are deterministic (severity increases with dose above a threshold)."
      },
      {
        "id": "p4_q97",
        "question": "Regarding computed tomography (CT) imaging which of these is true-",
        "options": [
          "High level of scatter reaches the CT detectors.",
          "Windowing is a technique to adjust the greyscale.",
          "Air corresponds to a CT value of 0 HU",
          "CT number of fat is higher than water."
        ],
        "correctAnswer": 1,
        "explanation": "Windowing alters the window width and level to optimize the mapping of Hounsfield units to the grayscale for optimal display of specific tissues."
      },
      {
        "id": "p4_q98",
        "question": "All of the following are true for X-rays except",
        "options": [
          "They form part of electromagnetic spectrum",
          "They cause ionization",
          "They are invisible",
          "They cannot travel through vacuum"
        ],
        "correctAnswer": 3,
        "explanation": "X-rays are a form of electromagnetic radiation and, like visible light, they can travel through a vacuum at the speed of light."
      }
    ]
  },
  {
    "id": 5,
    "name": "Paper 5",
    "subtitle": "Radiographer Practice Paper",
    "totalQuestions": 96,
    "questions": [
      {
        "id": "p5_q1",
        "question": "Ring artefact in CT scan is due to",
        "options": [
          "High density material in field",
          "Patient movement",
          "Averaging of LAC in a given voxel that is heterogeneous in composition",
          "Failure of detector"
        ],
        "correctAnswer": 3,
        "explanation": "Ring artefacts are primarily caused by faulty or uncalibrated detectors in third-generation CT scanners."
      },
      {
        "id": "p5_q2",
        "question": "Right ventricle pumps blood into",
        "options": [
          "SVC",
          "Pulmonary veins",
          "Aorta",
          "Pulmonary arteries"
        ],
        "correctAnswer": 3,
        "explanation": "The right ventricle receives deoxygenated blood from the right atrium and pumps it into the pulmonary trunk, which divides into the right and left pulmonary arteries."
      },
      {
        "id": "p5_q3",
        "question": "Photoelectric attenuation is",
        "options": [
          "Proportional to square of atomic number",
          "Inversely proportional to cube of mass number",
          "Inversely proportional to square of atomic number",
          "Proportional to cube of atomic number"
        ],
        "correctAnswer": 3,
        "explanation": "The probability of photoelectric interaction is directly proportional to the cube of the atomic number (Z^3) of the absorbing material."
      },
      {
        "id": "p5_q4",
        "question": "Electrons interact with matter by",
        "options": [
          "Excitation",
          "Both",
          "Ionization",
          "None"
        ],
        "correctAnswer": 1,
        "explanation": "Fast-moving electrons from the cathode interact with the target material via both ionization (ejection of orbital electrons) and excitation (raising an electron to a higher energy state without ejection)."
      },
      {
        "id": "p5_q5",
        "question": "Unit of exposure",
        "options": [
          "Roentgen",
          "Rad",
          "Gray",
          "Curie"
        ],
        "correctAnswer": 0,
        "explanation": "The Roentgen (R) is the traditional unit used to measure radiation exposure in air."
      },
      {
        "id": "p5_q6",
        "question": "Output of X-Ray machine is",
        "options": [
          "Proportional to square of kV",
          "Inversely proportional to square of kV",
          "None",
          "Proportional to kV"
        ],
        "correctAnswer": 0,
        "explanation": "X-ray beam intensity or output is approximately proportional to the square of the applied kilovoltage (kVp)."
      },
      {
        "id": "p5_q7",
        "question": "Quality factor for X-Ray is",
        "options": [
          "4",
          "5",
          "1",
          "20"
        ],
        "correctAnswer": 2,
        "explanation": "X-rays, gamma rays, and beta particles have a radiation weighting factor (formerly quality factor) of 1 because they are low-LET radiations."
      },
      {
        "id": "p5_q8",
        "question": "Ways of hardening X-Ray beams",
        "options": [
          "Increasing mAs",
          "Decreasing SID",
          "Increasing filtration",
          "Decreasing kVp"
        ],
        "correctAnswer": 2,
        "explanation": "Adding filtration to the X-ray tube absorbs lower-energy photons, thereby increasing the average energy and 'hardening' the X-ray beam."
      },
      {
        "id": "p5_q9",
        "question": "Which city topped the Swachh Vayu Sarveksha 2023 Clean Air Survey?",
        "options": [
          "Agra",
          "Chandigadh",
          "Indore",
          "Ahmedabad"
        ],
        "correctAnswer": 2,
        "explanation": "Indore secured the first position in the Swachh Vayu Sarvekshan 2023 for having the cleanest air among cities with over 10 lakh population."
      },
      {
        "id": "p5_q10",
        "question": "National Girl Child Day is celebrated on which day?",
        "options": [
          "8th December",
          "10th February",
          "24th January",
          "30th January"
        ],
        "correctAnswer": 2,
        "explanation": "National Girl Child Day is observed annually in India on January 24th to promote awareness about the rights of the girl child."
      },
      {
        "id": "p5_q11",
        "question": "The currently debated Hoollongapar Gibbon sanctuary is situated in which state?",
        "options": [
          "Goa",
          "Uttar Pradesh",
          "Assam",
          "Tripura"
        ],
        "correctAnswer": 2,
        "explanation": "The Hoollongapar Gibbon Sanctuary, famous for the Hoolock gibbon, is located in the Jorhat district of Assam."
      },
      {
        "id": "p5_q12",
        "question": "Who has recently inaugurated the first medical college in Nagaland?",
        "options": [
          "Hon'ble Health Minister of State, Shri. P. Paiwa Konyak",
          "Hon'ble Union Minister of Health & Family Welfare, Dr. Mansukh Mandaviya",
          "Hon'ble deputy CM of Nagaland, Shri TI Zeliang",
          "Hon'ble CM of Nagaland, Shri Neiphiu Rio"
        ],
        "correctAnswer": 1,
        "explanation": "Dr. Mansukh Mandaviya inaugurated the Nagaland Institute of Medical Sciences and Research (NIMSR) in Kohima."
      },
      {
        "id": "p5_q13",
        "question": "World Stroke Day is celebrated on which day?",
        "options": [
          "31 October",
          "24 October",
          "22 October",
          "29 October"
        ],
        "correctAnswer": 3,
        "explanation": "World Stroke Day is observed on October 29th each year to emphasize the serious nature and high rates of stroke."
      },
      {
        "id": "p5_q14",
        "question": "Who is the present Prime Minister of the State of Palestine?",
        "options": [
          "Mahmoud Abbas",
          "None of the given",
          "Benjamin Netanyahu",
          "Mohammad Shtayyeh"
        ],
        "correctAnswer": 3,
        "explanation": "Mohammad Shtayyeh served as the Prime Minister of the State of Palestine from 2019 to 2024."
      },
      {
        "id": "p5_q15",
        "question": "National Food Security Act, 2013 (NFSA) provides coverage of rural and urban population.",
        "options": [
          "75% rural and 50% urban",
          "50% rural and 25% urban",
          "25% rural and 75% urban",
          "100% rural and 50% urban"
        ],
        "correctAnswer": 0,
        "explanation": "The NFSA 2013 aims to provide subsidized food grains to up to 75% of the rural and 50% of the urban population in India."
      },
      {
        "id": "p5_q16",
        "question": "\"Sarang\" is an Indian film festival organized in which country?",
        "options": [
          "Germany",
          "Australia",
          "South Korea",
          "Canada"
        ],
        "correctAnswer": 2,
        "explanation": "SARANG is an annual Indian cultural festival, which includes film screenings, organized by the Indian Embassy in South Korea."
      },
      {
        "id": "p5_q17",
        "question": "The United Nations Conference on Trade and Development (UNCTAD) is located at which of the following places?",
        "options": [
          "Rome",
          "Vienna",
          "Paris",
          "Geneva"
        ],
        "correctAnswer": 3,
        "explanation": "UNCTAD is headquartered in Geneva, Switzerland, and deals with trade, investment, and development issues."
      },
      {
        "id": "p5_q18",
        "question": "Which country had won the Cricket World Cup in 2019?",
        "options": [
          "New Zealand",
          "England",
          "Australia",
          "South Africa"
        ],
        "correctAnswer": 1,
        "explanation": "England won the 2019 ICC Cricket World Cup by defeating New Zealand in a thrilling final on boundary count."
      },
      {
        "id": "p5_q19",
        "question": "Pradhan Mantri Swasthya Suraksha Yojana (PMSSY) Scheme launched in which year?",
        "options": [
          "2014",
          "2008",
          "2006",
          "2003"
        ],
        "correctAnswer": 3,
        "explanation": "The PMSSY scheme was announced in 2003 with the objective of correcting regional imbalances in the availability of affordable and reliable tertiary healthcare services."
      },
      {
        "id": "p5_q20",
        "question": "Who inaugurated the MedTech Expo-2023 in Gandhinagar?",
        "options": [
          "Dr. Mansukh Mandaviya",
          "Hon'ble CM Bhupendra Patel",
          "Narendra Modi",
          "Amit Shah"
        ],
        "correctAnswer": 0,
        "explanation": "Union Health Minister Dr. Mansukh Mandaviya inaugurated the India MedTech Expo 2023 in Gandhinagar, Gujarat."
      },
      {
        "id": "p5_q21",
        "question": "Which type of fire extinguisher is used for petroleum fire as well as electrical equipment fire?",
        "options": [
          "Powder type",
          "Foam type",
          "Carbon dioxide type",
          "Water type"
        ],
        "correctAnswer": 0,
        "explanation": "Dry powder extinguishers can be used on both Class B (petroleum/flammable liquids) and electrical fires, as powder is non-conductive."
      },
      {
        "id": "p5_q22",
        "question": "Epoxy resins are used as",
        "options": [
          "Adhesives",
          "Fertilizers",
          "Insecticides",
          "Detergents"
        ],
        "correctAnswer": 0,
        "explanation": "Epoxy resins are widely used as strong industrial and domestic adhesives, as well as in coatings and composites."
      },
      {
        "id": "p5_q23",
        "question": "Optic fibres are mainly used for which of the following?",
        "options": [
          "Weaving",
          "Communication",
          "Food industry",
          "Musical instrument"
        ],
        "correctAnswer": 1,
        "explanation": "Optical fibers transmit light signals over long distances with minimal loss, making them essential for high-speed telecommunications."
      },
      {
        "id": "p5_q24",
        "question": "RAM stands for",
        "options": [
          "Random Access Method",
          "Read Access Memory",
          "Random Access Memory",
          "Random Active Memory"
        ],
        "correctAnswer": 2,
        "explanation": "RAM stands for Random Access Memory, which provides temporary storage for data that the CPU needs quick access to."
      },
      {
        "id": "p5_q25",
        "question": "Which shortcut key is used to delete character on the left side of the cursor?",
        "options": [
          "Backspace",
          "Delete (Del)",
          "Alt + Delete",
          "Ctrl + Delete"
        ],
        "correctAnswer": 0,
        "explanation": "The Backspace key is used to delete the character immediately to the left of the text cursor."
      },
      {
        "id": "p5_q26",
        "question": "Which key is used to move the cursor at the end of the line?",
        "options": [
          "End",
          "Page Up",
          "Home",
          "Page down"
        ],
        "correctAnswer": 0,
        "explanation": "Pressing the 'End' key instantly moves the cursor to the end of the current line in most text editing software."
      },
      {
        "id": "p5_q27",
        "question": "Firefox is",
        "options": [
          "Internet Browser",
          "Presentation",
          "Word Processing",
          "Data Analysis"
        ],
        "correctAnswer": 0,
        "explanation": "Mozilla Firefox is a free and open-source web browser used to navigate and view websites on the internet."
      },
      {
        "id": "p5_q28",
        "question": "Which tab of MS Word 2016 is used to change the orientation of the page from portrait to landscape?",
        "options": [
          "Layout",
          "View",
          "Insert",
          "Design"
        ],
        "correctAnswer": 0,
        "explanation": "In MS Word 2016, the page orientation settings (Portrait or Landscape) are found under the 'Layout' tab."
      },
      {
        "id": "p5_q29",
        "question": "Word count option is available in which tab of MS Word 2016?",
        "options": [
          "Mailings",
          "Review",
          "References",
          "View"
        ],
        "correctAnswer": 1,
        "explanation": "The Word Count feature, which checks document statistics like words and characters, is located in the 'Review' tab."
      },
      {
        "id": "p5_q30",
        "question": "If you want to apply formats to selected cell that meet specific criteria based on specific values",
        "options": [
          "Format",
          "Style",
          "Condition",
          "Conditional Formatting"
        ],
        "correctAnswer": 3,
        "explanation": "Conditional Formatting allows users in Excel to automatically apply specific formatting to cells that meet defined criteria."
      },
      {
        "id": "p5_q31",
        "question": "Principles of radiation protection included all except",
        "options": [
          "Shielding",
          "Time",
          "Monitoring",
          "Distance"
        ],
        "correctAnswer": 2,
        "explanation": "While monitoring is important for occupational safety, the three core principles of minimizing radiation exposure are time, distance, and shielding."
      },
      {
        "id": "p5_q32",
        "question": "Number of thoracic vertebrae",
        "options": [
          "2",
          "12",
          "5",
          "7"
        ],
        "correctAnswer": 1,
        "explanation": "The human vertebral column typically contains 12 thoracic vertebrae, which articulate with the 12 pairs of ribs."
      },
      {
        "id": "p5_q33",
        "question": "Mammography units typically operate at",
        "options": [
          "25 to 30 kvp",
          "60 to 120 kvp",
          "50 to 75 kvp",
          "80 to 140 kvp"
        ],
        "correctAnswer": 0,
        "explanation": "Mammography utilizes a low kVp range (typically 25-30 kVp) to maximize subject contrast when imaging soft breast tissues."
      },
      {
        "id": "p5_q34",
        "question": "Hounsfield unit zero represents",
        "options": [
          "CSF",
          "Blood",
          "Water",
          "Air"
        ],
        "correctAnswer": 2,
        "explanation": "The Hounsfield scale is a quantitative measure of radiodensity used in CT scans, where distilled water at standard pressure and temperature is arbitrarily defined as zero HU."
      },
      {
        "id": "p5_q35",
        "question": "X-Ray tube is made of which glass",
        "options": [
          "Duralex",
          "Pyrex",
          "Burmese",
          "Gorilla"
        ],
        "correctAnswer": 1,
        "explanation": "X-ray tube envelopes are typically made of Pyrex glass because of its high heat resistance and ability to withstand extreme temperature variations."
      },
      {
        "id": "p5_q36",
        "question": "False regarding tungsten",
        "options": [
          "High melting point",
          "Atomic number 94",
          "Melting point 3370 degree Celsius",
          "High atomic number making it efficient in beam production"
        ],
        "correctAnswer": 1,
        "explanation": "Tungsten has an atomic number of 74, not 94 (which is Plutonium), making that statement false."
      },
      {
        "id": "p5_q37",
        "question": "Contrast used in MRI",
        "options": [
          "Gadolinium",
          "Iodinated contrast agents",
          "Barium contrast agents",
          "All"
        ],
        "correctAnswer": 0,
        "explanation": "Gadolinium-based contrast agents are commonly used in MRI to enhance tissue contrast due to their paramagnetic properties."
      },
      {
        "id": "p5_q38",
        "question": "RF shielding in MRI magnet room is done using",
        "options": [
          "Bismuth",
          "Manganese",
          "Copper",
          "Lead"
        ],
        "correctAnswer": 2,
        "explanation": "Copper shielding (often arranged as a Faraday cage) is used in MRI rooms to prevent external radiofrequency signals from interfering with the scan."
      },
      {
        "id": "p5_q39",
        "question": "Patient position for CT ankle joint",
        "options": [
          "Head first prone",
          "Head first supine",
          "Feet first prone",
          "Feet first supine"
        ],
        "correctAnswer": 3,
        "explanation": "For a CT scan of the ankle, the patient is typically positioned feet first and supine on the scanning table to position the ankle at the isocenter."
      },
      {
        "id": "p5_q40",
        "question": "Photoelectric effect yields",
        "options": [
          "All",
          "Negative ion",
          "Positive ion",
          "Characteristic radiation"
        ],
        "correctAnswer": 0,
        "explanation": "The photoelectric effect results in the ejection of a photoelectron (negative ion), leaving behind an ionized atom (positive ion), and characteristic radiation is emitted when a higher-shell electron fills the vacancy."
      },
      {
        "id": "p5_q41",
        "question": "All increase attenuation except",
        "options": [
          "Electron per gram of absorber",
          "Density of absorber",
          "Energy of radiation",
          "Atomic number of absorber"
        ],
        "correctAnswer": 2,
        "explanation": "Increasing the energy of the incident radiation typically decreases the probability of interactions, thereby decreasing attenuation."
      },
      {
        "id": "p5_q42",
        "question": "Grid ratio is",
        "options": [
          "Scatter radiation absorbed by grid",
          "Primary scatter absorbed by grid",
          "Total radiation absorbed by grid",
          "Ratio of height of lead strips to distance between them"
        ],
        "correctAnswer": 3,
        "explanation": "The grid ratio in radiography is defined as the height of the radiopaque lead strips divided by the distance (width of the radiolucent interspaces) between them."
      },
      {
        "id": "p5_q43",
        "question": "Lateral end of uterine tube opens into",
        "options": [
          "Fornix",
          "Uterine cavity",
          "Peritoneal cavity",
          "Cervix"
        ],
        "correctAnswer": 2,
        "explanation": "The lateral (fimbriated) end of the uterine (Fallopian) tube opens directly into the peritoneal cavity near the ovary."
      },
      {
        "id": "p5_q44",
        "question": "Shoulder joint is formed by",
        "options": [
          "Coracoid process",
          "Glenoid cavity of scapula",
          "Greater tuberosity",
          "Acromion process"
        ],
        "correctAnswer": 1,
        "explanation": "The shoulder (glenohumeral) joint is a ball-and-socket joint formed by the articulation between the head of the humerus and the glenoid cavity of the scapula."
      },
      {
        "id": "p5_q45",
        "question": "Barium oral contrast concentration is expressed as",
        "options": [
          "g%",
          "%w/w",
          "mg%",
          "mOsm/kg"
        ],
        "correctAnswer": 1,
        "explanation": "Barium sulfate suspension concentration is usually expressed as a percentage of weight per volume (%w/v) or weight per weight (%w/w)."
      },
      {
        "id": "p5_q46",
        "question": "Intensity of X-Ray beam that leaves the tube is not uniform because",
        "options": [
          "Tube shielding",
          "Saturation voltage",
          "Heel effect",
          "Space charge"
        ],
        "correctAnswer": 2,
        "explanation": "The anode heel effect causes the X-ray beam intensity to be lower on the anode side because photons are absorbed by the target material itself."
      },
      {
        "id": "p5_q47",
        "question": "Correct as per AERB regulations",
        "options": [
          "TLD can be stored in control console room of X-Ray",
          "Wear TLD at wrist level",
          "TLD provides radiation safety to patient",
          "Wear TLD below lead apron"
        ],
        "correctAnswer": 3,
        "explanation": "According to AERB regulations, radiation workers should wear the TLD badge under the lead apron at chest level to estimate the whole-body dose accurately."
      },
      {
        "id": "p5_q48",
        "question": "Advantages of USG over CT",
        "options": [
          "Relatively cheap",
          "Noninvasive",
          "No harmful side effects",
          "All of the above"
        ],
        "correctAnswer": 3,
        "explanation": "Ultrasound is cost-effective, non-invasive, and does not use ionizing radiation, which eliminates the risks associated with CT scans."
      },
      {
        "id": "p5_q49",
        "question": "A type of social engineering where an attacker sends a fraudulent message designed to trick a person into revealing sensitive information is known as",
        "options": [
          "Man in the middle attack",
          "Phishing attack",
          "Ransomware attack",
          "Denial of Service attack"
        ],
        "correctAnswer": 1,
        "explanation": "Phishing is a cyber-attack that relies on deception to manipulate individuals into giving out confidential information, such as passwords or credit card numbers."
      },
      {
        "id": "p5_q50",
        "question": "Nonstochastic effect of radiation",
        "options": [
          "Carcinogenesis",
          "Genetic effect",
          "All of the above",
          "Epilation"
        ],
        "correctAnswer": 3,
        "explanation": "Nonstochastic (deterministic) effects, like epilation (hair loss) or cataracts, have a threshold dose below which the effect does not occur and severity increases with dose."
      },
      {
        "id": "p5_q1",
        "question": "X Ray photons produced by X-Ray machines are",
        "options": [
          "Heterogenous in energy",
          "Homogenous in energy",
          "Both",
          "None"
        ],
        "correctAnswer": 0,
        "explanation": "X-ray machines produce a continuous spectrum of bremsstrahlung radiation along with characteristic X-rays, making the beam heterogeneous in energy."
      },
      {
        "id": "p5_q2",
        "question": "Bragg peak characteristic is utilized in",
        "options": [
          "Proton therapy",
          "Electron therapy",
          "Neutron therapy",
          "Megavoltage therapy"
        ],
        "correctAnswer": 0,
        "explanation": "Proton beams exhibit a Bragg peak, depositing the majority of their energy at a specific depth, which is highly beneficial in radiation therapy."
      },
      {
        "id": "p5_q3",
        "question": "Plane dividing body into right and left halves",
        "options": [
          "Coronal",
          "Mid axillary",
          "Median sagittal",
          "Axial"
        ],
        "correctAnswer": 2,
        "explanation": "The median sagittal plane divides the body vertically into equal right and left halves."
      },
      {
        "id": "p5_q4",
        "question": "Orthopantomogram is taken to rule out lesion in",
        "options": [
          "Maxilla",
          "Facial bone",
          "Mandible",
          "Skull"
        ],
        "correctAnswer": 2,
        "explanation": "An orthopantomogram (OPG) is a panoramic radiograph primarily used to evaluate the mandible, maxilla, and dental arches."
      },
      {
        "id": "p5_q5",
        "question": "The process by which electrons are emitted from a X-Ray cathode filament",
        "options": [
          "Thermionic emission",
          "Photoconduction",
          "Ionization",
          "Thermo luminescence"
        ],
        "correctAnswer": 0,
        "explanation": "Heating the cathode filament causes electrons to be released, a process known as thermionic emission."
      },
      {
        "id": "p5_q6",
        "question": "X-Rays are",
        "options": [
          "Stream of positively charged particles",
          "Stream of uncharged particles",
          "Stream of electrons",
          "Electromagnetic radiations of high frequency"
        ],
        "correctAnswer": 3,
        "explanation": "X-rays are high-energy, high-frequency electromagnetic waves, not particles with mass or charge."
      },
      {
        "id": "p5_q7",
        "question": "Term neoplasia means",
        "options": [
          "New disease",
          "New Growth",
          "New cancer",
          "New lesion"
        ],
        "correctAnswer": 1,
        "explanation": "Neoplasia literally translates to \"new growth,\" referring to an abnormal and excessive proliferation of cells."
      },
      {
        "id": "p5_q8",
        "question": "Which of the following needs the longest exposure for an X-Ray image.",
        "options": [
          "Spine",
          "Pelvis",
          "Thoracic",
          "Abdomen"
        ],
        "correctAnswer": 0,
        "explanation": "Radiography of the spine, particularly the lateral lumbar spine, involves a large amount of tissue and dense bone, requiring the longest exposure."
      },
      {
        "id": "p5_q9",
        "question": "X-Ray is recorded on a plate coated with",
        "options": [
          "Iron halide",
          "Copper halide",
          "Silver halide",
          "Gold halide"
        ],
        "correctAnswer": 2,
        "explanation": "Traditional X-ray films use an emulsion layer containing silver halide crystals, which are sensitive to radiation and light."
      },
      {
        "id": "p5_q10",
        "question": "Normal range of creatinine is:",
        "options": [
          "2 to 4 mg/100 ml",
          "0.6 to 1.5 mg/100 ml",
          "0 to 0.4 mg/100 ml",
          "8 to 15 mg/100 ml"
        ],
        "correctAnswer": 1,
        "explanation": "The normal serum creatinine range is typically between 0.6 and 1.5 mg/dL (mg/100 ml), depending on muscle mass and sex."
      },
      {
        "id": "p5_q11",
        "question": "Function of housing around X-Ray tube",
        "options": [
          "Helps with image production.",
          "Minimizes radiation leakage",
          "Promotes electrical shock",
          "Keeps heat inside the glass envelope"
        ],
        "correctAnswer": 1,
        "explanation": "The protective housing around the X-ray tube contains lead to absorb isotropically emitted X-rays and minimize leakage radiation."
      },
      {
        "id": "p5_q12",
        "question": "What is the position when a patient lies flat on their back and the head is lower than feet.",
        "options": [
          "Sims",
          "Lateral recumbent",
          "Trendelenberg",
          "Fowler"
        ],
        "correctAnswer": 2,
        "explanation": "In the Trendelenburg position, the patient is supine with the table tilted so that the head is lower than the feet."
      },
      {
        "id": "p5_q13",
        "question": "What instructions to give patient after barium enema?",
        "options": [
          "Don't drink fluid for 6 hours",
          "Drink plenty of fluids",
          "With old laxatives",
          "Don't monitor your bowel movements"
        ],
        "correctAnswer": 1,
        "explanation": "Patients are instructed to drink plenty of fluids after a barium enema to prevent constipation and help flush the barium out of the system."
      },
      {
        "id": "p5_q14",
        "question": "What restricts useful X-Ray beams from causing unnecessary exposure?",
        "options": [
          "Filtration",
          "Protective barriers",
          "Cassette Size",
          "Collimation"
        ],
        "correctAnswer": 3,
        "explanation": "Collimation restricts the size and shape of the primary X-ray beam, thereby reducing the irradiated field and minimizing unnecessary patient exposure."
      },
      {
        "id": "p5_q15",
        "question": "A unit measuring radiation is REM, What does REM stand for?",
        "options": [
          "Radiation evolved management",
          "Roentgen Early Man",
          "Radioactive early management",
          "Radiation Equivalent Man"
        ],
        "correctAnswer": 3,
        "explanation": "REM stands for Roentgen Equivalent Man, an older unit used to measure the biological effect of ionizing radiation."
      },
      {
        "id": "p5_q16",
        "question": "Which principle states that ionizing exposure to humans should be as far below the dose limits as practical?",
        "options": [
          "OAP",
          "C/kg",
          "ALARA",
          "FID"
        ],
        "correctAnswer": 2,
        "explanation": "ALARA stands for \"As Low As Reasonably Achievable,\" a fundamental safety principle aiming to minimize radiation exposure."
      },
      {
        "id": "p5_q17",
        "question": "What is one of the duties of a Radiation Safety Officer?",
        "options": [
          "Conduct annual briefings and educational sessions with employees",
          "All of the above",
          "Conduct yearly reviews on records on Radiation levels",
          "Conduct quarterly reviews of radiation safety programs"
        ],
        "correctAnswer": 1,
        "explanation": "A Radiation Safety Officer (RSO) is responsible for monitoring radiation records, reviewing safety programs, and conducting educational training for staff."
      },
      {
        "id": "p5_q18",
        "question": "Nausea and difficulty in breathing after injecting contrast in a patient for CT scan, what type of shock is he experiencing",
        "options": [
          "Anaphylactic",
          "Cardiogenic",
          "Hypovolemic",
          "Septic"
        ],
        "correctAnswer": 0,
        "explanation": "Difficulty breathing and nausea following contrast administration are classic signs of an allergic or anaphylactic reaction."
      },
      {
        "id": "p5_q19",
        "question": "Chemical substances that kill pathogenic microorganisms on inanimate objects are known as:",
        "options": [
          "Antiseptics",
          "Antibiotics",
          "Disinfectants",
          "Sterilants"
        ],
        "correctAnswer": 2,
        "explanation": "Disinfectants are chemical agents applied to non-living objects to destroy viruses, bacteria, and other pathogens."
      },
      {
        "id": "p5_q20",
        "question": "Geometric factor responsible for unequal magnification of different portions of the same object:",
        "options": [
          "Distortion",
          "Focal spot",
          "Quantum mottle",
          "Noise"
        ],
        "correctAnswer": 0,
        "explanation": "Distortion occurs when unequal magnification of different parts of the object causes a misrepresentation of its true size or shape."
      },
      {
        "id": "p5_q21",
        "question": "What is the best way to alter quality of an X-Ray beam?",
        "options": [
          "REM",
          "kVp",
          "Gray",
          "mAs"
        ],
        "correctAnswer": 1,
        "explanation": "The kilovoltage peak (kVp) determines the maximum energy (quality or penetrability) of the X-ray beam."
      },
      {
        "id": "p5_q22",
        "question": "Which of the following is not a part of quality assurance program?",
        "options": [
          "Keeping a low patient dose",
          "Making sure the patient is satisfied",
          "Making sure the equipments are efficient",
          "Consistent quality of radiographic images"
        ],
        "correctAnswer": 1,
        "explanation": "While patient satisfaction is important in healthcare, a radiography Quality Assurance (QA) program strictly focuses on equipment performance, image quality, and radiation dose limits."
      },
      {
        "id": "p5_q23",
        "question": "What does PACS stand for?",
        "options": [
          "Picture Archiving and Communication Systems",
          "Printer Analog Computer Systems",
          "Projection Access Communication Systems",
          "Picture Active Computer System"
        ],
        "correctAnswer": 0,
        "explanation": "PACS (Picture Archiving and Communication System) is medical imaging technology used for storing, retrieving, presenting, and sharing images digitally."
      },
      {
        "id": "p5_q24",
        "question": "In the postero anterior chest radiography which of the following should be included on the X-Ray?",
        "options": [
          "Trachea including upper thoracic vertebrae",
          "Maximum of 8 posterior ribs",
          "Top of iliac crests",
          "Exhaled lungs"
        ],
        "correctAnswer": 0,
        "explanation": "A proper PA chest radiograph should include the entire lung fields from the apices (including the trachea and upper thoracic vertebrae) down to the costophrenic angles."
      },
      {
        "id": "p5_q25",
        "question": "Stomach protruding through the cardiac orifice through the cleft of diaphragm is known as:",
        "options": [
          "Pleural effusion",
          "Appendicitis",
          "Hiatal hernia",
          "Small bowel obstruction"
        ],
        "correctAnswer": 2,
        "explanation": "A hiatal hernia occurs when the upper part of the stomach pushes through the esophageal hiatus (cleft) of the diaphragm into the chest cavity."
      },
      {
        "id": "p5_q26",
        "question": "What does GERD stand for?",
        "options": [
          "Gastroesophageal Reflux Disease",
          "Gastroesophageal Reflex Dysfunction",
          "Gastroesophageal Reflex Disease",
          "Gall Bladder Esophageal Reflux Dysfunction"
        ],
        "correctAnswer": 0,
        "explanation": "GERD stands for Gastroesophageal Reflux Disease, a digestive disorder where stomach acid irritates the food pipe lining."
      },
      {
        "id": "p5_q27",
        "question": "Emulsion in radiographic film contains:",
        "options": [
          "Ag halide crystals",
          "Cs halide crystals",
          "Ca tungsten crystals",
          "Ag atoms"
        ],
        "correctAnswer": 0,
        "explanation": "The emulsion layer of traditional radiographic films is composed of gelatin containing radiation-sensitive silver (Ag) halide crystals."
      },
      {
        "id": "p5_q28",
        "question": "Filter used in mammography:",
        "options": [
          "Aluminium",
          "Copper",
          "Tungsten",
          "Molybdenum"
        ],
        "correctAnswer": 3,
        "explanation": "Molybdenum filters are commonly used in mammography to remove high-energy bremsstrahlung X-rays and produce a beam with optimal contrast for breast tissue."
      },
      {
        "id": "p5_q29",
        "question": "Protective lead apron should have minimum lead equivalence of:",
        "options": [
          "2 mm lead",
          "1 mm lead",
          "0.25 mm lead",
          "0.5 mm lead"
        ],
        "correctAnswer": 2,
        "explanation": "Regulatory standards typically require protective lead aprons to have a minimum lead equivalent of 0.25 mm for general radiography."
      },
      {
        "id": "p5_q30",
        "question": "Maximum field of view which can be obtained with a specific radiographic system is general limited by the:",
        "options": [
          "Anode angle",
          "Anode size",
          "Focal length",
          "Focal spot size"
        ],
        "correctAnswer": 0,
        "explanation": "The anode angle determines the actual focal spot size and restricts the maximum usable field of view due to the geometry of the X-ray beam cutoff."
      },
      {
        "id": "p5_q31",
        "question": "Beam penetration can be increased by increasing:",
        "options": [
          "kV",
          "FFD",
          "mAs",
          "Beam area"
        ],
        "correctAnswer": 0,
        "explanation": "Increasing the kilovoltage (kV) increases the kinetic energy of the electrons, resulting in X-ray photons with higher energy and greater penetrating power."
      },
      {
        "id": "p5_q32",
        "question": "Low kV are used in some procedures for purpose of:",
        "options": [
          "Decreasing patient exposure",
          "Increasing penetration",
          "Increasing contrast sensitivity",
          "Decreasing area contrast"
        ],
        "correctAnswer": 2,
        "explanation": "Lower kilovoltage (kV) produces a lower-energy beam, which increases differential absorption and thereby enhances subject contrast on the radiograph."
      },
      {
        "id": "p5_q33",
        "question": "Changing from 5:1 ratio to 10:1 ratio grid will",
        "options": [
          "Increase image contrast",
          "Decrease required kV or mAs",
          "Decreased X ray tube heating",
          "Decrease patient exposure"
        ],
        "correctAnswer": 0,
        "explanation": "A higher ratio grid is more effective at absorbing scattered radiation, which results in improved image contrast but requires an increase in patient dose."
      },
      {
        "id": "p5_q34",
        "question": "Underprocessing of X-Ray film can result is increased film:",
        "options": [
          "Fog",
          "Sensitivity",
          "None",
          "Contrast"
        ],
        "correctAnswer": 2,
        "explanation": "Underprocessing typically leads to a decrease in film density and contrast, rather than an increase in these factors."
      },
      {
        "id": "p5_q35",
        "question": "Substituting high speed radiographic film for a medium speed results in:",
        "options": [
          "Reduced patient exposure",
          "More visibility of detail because of more blurring",
          "Increased quantum noise",
          "Higher contrast"
        ],
        "correctAnswer": 0,
        "explanation": "High-speed films require less radiation to achieve the desired optical density, thereby directly reducing the radiation exposure to the patient."
      },
      {
        "id": "p5_q36",
        "question": "Factors appropriate for conventional chest X-Ray:",
        "options": [
          "120 kV",
          "Low contrast",
          "1:1 ratio grid",
          "0.1 mm focal spot"
        ],
        "correctAnswer": 0,
        "explanation": "Conventional chest radiography typically employs a high kilovoltage technique (e.g., 110-130 kVp) to penetrate the dense mediastinum and provide a long scale of contrast."
      },
      {
        "id": "p5_q37",
        "question": "Advantages of higher kV are all except:",
        "options": [
          "Shorter exposure times",
          "Reduced X-Ray tube heating",
          "Increased patient exposure",
          "Decreased area contrast"
        ],
        "correctAnswer": 2,
        "explanation": "Higher kV allows for a significant reduction in mAs, which actually results in decreased patient radiation exposure, not increased."
      },
      {
        "id": "p5_q38",
        "question": "Single coated X-Ray film used in all except:",
        "options": [
          "Skull X Ray",
          "Fluoroscopy films",
          "CT scan films",
          "Mammography"
        ],
        "correctAnswer": 0,
        "explanation": "Routine general radiography, such as a skull X-ray, utilizes double-emulsion films to increase speed and reduce patient dose, unlike mammography which uses single-emulsion films for high detail."
      },
      {
        "id": "p5_q39",
        "question": "All are true for dental X-Ray films except:",
        "options": [
          "Corners have sharp angles",
          "Embossed dot on film kept near crown of tooth",
          "Occlusion film size is 2 1/4 x 3\"",
          "Films are protected by lead coils"
        ],
        "correctAnswer": 0,
        "explanation": "Dental intraoral X-ray films have rounded corners, not sharp angles, to prevent discomfort and injury to the patient's oral mucosa."
      },
      {
        "id": "p5_q40",
        "question": "Efficiency of film washing process is done by estimating:",
        "options": [
          "Residual silver",
          "Residual thiosulphate",
          "Residual iodine",
          "Residual chlorine"
        ],
        "correctAnswer": 1,
        "explanation": "The washing process is designed to remove the fixing agent (sodium or ammonium thiosulphate). Testing for residual thiosulphate evaluates washing efficiency."
      },
      {
        "id": "p5_q41",
        "question": "Annual effective radiation dose for technicians is less than:",
        "options": [
          "100 mRem",
          "30 mSv",
          "5 mRem",
          "100 mSv"
        ],
        "correctAnswer": 1,
        "explanation": "Under many regulatory bodies, the occupational annual effective dose limit for radiation workers should not exceed 30 mSv in any single year."
      },
      {
        "id": "p5_q42",
        "question": "Which is a life saving measure in contrast reaction effect:",
        "options": [
          "Inj Rantac",
          "Inj Phenargen",
          "Inj Adrenaline",
          "Saline infusion"
        ],
        "correctAnswer": 2,
        "explanation": "Epinephrine (Inj Adrenaline) is the primary life-saving pharmacological intervention for severe, anaphylactic contrast reactions."
      },
      {
        "id": "p5_q43",
        "question": "Enteroclysis is an investigation of:",
        "options": [
          "Small bowel",
          "Esophagus",
          "Large bowel",
          "Hepato biliary tree"
        ],
        "correctAnswer": 0,
        "explanation": "Enteroclysis, also known as small bowel enema, is a fluoroscopic X-ray examination specifically dedicated to evaluating the small intestine."
      },
      {
        "id": "p5_q44",
        "question": "CCD means:",
        "options": [
          "Charged couple device",
          "Continuous conventional device",
          "Conventional charged device",
          "Continuous charged detector"
        ],
        "correctAnswer": 0,
        "explanation": "CCD stands for Charge-Coupled Device, an integrated circuit used as a sensor to convert light into electronic signals in digital imaging systems."
      },
      {
        "id": "p5_q45",
        "question": "Target material in an X-Ray tube must have:",
        "options": [
          "High cost",
          "High mass number",
          "Low melting point",
          "High atomic number"
        ],
        "correctAnswer": 3,
        "explanation": "A high atomic number target material increases the efficiency of bremsstrahlung X-ray production."
      },
      {
        "id": "p5_q46",
        "question": "Interaction of photons with matter include all except:",
        "options": [
          "Photoelectric radiation",
          "Compton scattering",
          "Leakage radiation",
          "Pair production"
        ],
        "correctAnswer": 2,
        "explanation": "Leakage radiation refers to X-rays escaping the tube housing, whereas Pair Production, Photoelectric effect, and Compton scattering are actual photon-matter interactions."
      }
    ]
  }

];
