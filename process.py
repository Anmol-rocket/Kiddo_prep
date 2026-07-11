import json
import random

# Fix random seed for reproducibility
random.seed(42)

questions_data = [
    {
        "q": "Ring artefact in CT scan is due to",
        "o": ["Failure of detector", "Patient movement", "High density material in field", "Averaging of LAC in a given voxel that is heterogeneous in composition"],
        "a": "Failure of detector",
        "exp": "Ring artefacts are primarily caused by faulty or uncalibrated detectors in third-generation CT scanners."
    },
    {
        "q": "Right ventricle pumps blood into",
        "o": ["Aorta", "Pulmonary arteries", "Pulmonary veins", "SVC"],
        "a": "Pulmonary arteries",
        "exp": "The right ventricle receives deoxygenated blood from the right atrium and pumps it into the pulmonary trunk, which divides into the right and left pulmonary arteries."
    },
    {
        "q": "Photoelectric attenuation is",
        "o": ["Proportional to cube of atomic number", "Proportional to square of atomic number", "Inversely proportional to square of atomic number", "Inversely proportional to cube of mass number"],
        "a": "Proportional to cube of atomic number",
        "exp": "The probability of photoelectric interaction is directly proportional to the cube of the atomic number (Z^3) of the absorbing material."
    },
    {
        "q": "Electrons interact with matter by",
        "o": ["Ionization", "Excitation", "Both", "None"],
        "a": "Both",
        "exp": "Fast-moving electrons from the cathode interact with the target material via both ionization (ejection of orbital electrons) and excitation (raising an electron to a higher energy state without ejection)."
    },
    {
        "q": "Unit of exposure",
        "o": ["Curie", "Roentgen", "Rad", "Gray"],
        "a": "Roentgen",
        "exp": "The Roentgen (R) is the traditional unit used to measure radiation exposure in air."
    },
    {
        "q": "Output of X-Ray machine is",
        "o": ["Proportional to kV", "Proportional to square of kV", "None", "Inversely proportional to square of kV"],
        "a": "Proportional to square of kV",
        "exp": "X-ray beam intensity or output is approximately proportional to the square of the applied kilovoltage (kVp)."
    },
    {
        "q": "Quality factor for X-Ray is",
        "o": ["1", "5", "4", "20"],
        "a": "1",
        "exp": "X-rays, gamma rays, and beta particles have a radiation weighting factor (formerly quality factor) of 1 because they are low-LET radiations."
    },
    {
        "q": "Ways of hardening X-Ray beams",
        "o": ["Increasing filtration", "Increasing mAs", "Decreasing kVp", "Decreasing SID"],
        "a": "Increasing filtration",
        "exp": "Adding filtration to the X-ray tube absorbs lower-energy photons, thereby increasing the average energy and 'hardening' the X-ray beam."
    },
    {
        "q": "Which city topped the Swachh Vayu Sarveksha 2023 Clean Air Survey?",
        "o": ["Agra", "Indore", "Chandigadh", "Ahmedabad"],
        "a": "Indore",
        "exp": "Indore secured the first position in the Swachh Vayu Sarvekshan 2023 for having the cleanest air among cities with over 10 lakh population."
    },
    {
        "q": "National Girl Child Day is celebrated on which day?",
        "o": ["24th January", "30th January", "8th December", "10th February"],
        "a": "24th January",
        "exp": "National Girl Child Day is observed annually in India on January 24th to promote awareness about the rights of the girl child."
    },
    {
        "q": "The currently debated Hoollongapar Gibbon sanctuary is situated in which state?",
        "o": ["Tripura", "Uttar Pradesh", "Goa", "Assam"],
        "a": "Assam",
        "exp": "The Hoollongapar Gibbon Sanctuary, famous for the Hoolock gibbon, is located in the Jorhat district of Assam."
    },
    {
        "q": "Who has recently inaugurated the first medical college in Nagaland?",
        "o": ["Hon'ble CM of Nagaland, Shri Neiphiu Rio", "Hon'ble deputy CM of Nagaland, Shri TI Zeliang", "Hon'ble Union Minister of Health & Family Welfare, Dr. Mansukh Mandaviya", "Hon'ble Health Minister of State, Shri. P. Paiwa Konyak"],
        "a": "Hon'ble Union Minister of Health & Family Welfare, Dr. Mansukh Mandaviya",
        "exp": "Dr. Mansukh Mandaviya inaugurated the Nagaland Institute of Medical Sciences and Research (NIMSR) in Kohima."
    },
    {
        "q": "World Stroke Day is celebrated on which day?",
        "o": ["22 October", "24 October", "29 October", "31 October"],
        "a": "29 October",
        "exp": "World Stroke Day is observed on October 29th each year to emphasize the serious nature and high rates of stroke."
    },
    {
        "q": "Who is the present Prime Minister of the State of Palestine?",
        "o": ["Mohammad Shtayyeh", "Benjamin Netanyahu", "Mahmoud Abbas", "None of the given"],
        "a": "Mohammad Shtayyeh",
        "exp": "Mohammad Shtayyeh served as the Prime Minister of the State of Palestine from 2019 to 2024."
    },
    {
        "q": "National Food Security Act, 2013 (NFSA) provides coverage of rural and urban population.",
        "o": ["75% rural and 50% urban", "50% rural and 25% urban", "100% rural and 50% urban", "25% rural and 75% urban"],
        "a": "75% rural and 50% urban",
        "exp": "The NFSA 2013 aims to provide subsidized food grains to up to 75% of the rural and 50% of the urban population in India."
    },
    {
        "q": "\"Sarang\" is an Indian film festival organized in which country?",
        "o": ["Australia", "Canada", "South Korea", "Germany"],
        "a": "South Korea",
        "exp": "SARANG is an annual Indian cultural festival, which includes film screenings, organized by the Indian Embassy in South Korea."
    },
    {
        "q": "The United Nations Conference on Trade and Development (UNCTAD) is located at which of the following places?",
        "o": ["Geneva", "Rome", "Paris", "Vienna"],
        "a": "Geneva",
        "exp": "UNCTAD is headquartered in Geneva, Switzerland, and deals with trade, investment, and development issues."
    },
    {
        "q": "Which country had won the Cricket World Cup in 2019?",
        "o": ["Australia", "New Zealand", "South Africa", "England"],
        "a": "England",
        "exp": "England won the 2019 ICC Cricket World Cup by defeating New Zealand in a thrilling final on boundary count."
    },
    {
        "q": "Pradhan Mantri Swasthya Suraksha Yojana (PMSSY) Scheme launched in which year?",
        "o": ["2003", "2006", "2008", "2014"],
        "a": "2003",
        "exp": "The PMSSY scheme was announced in 2003 with the objective of correcting regional imbalances in the availability of affordable and reliable tertiary healthcare services."
    },
    {
        "q": "Who inaugurated the MedTech Expo-2023 in Gandhinagar?",
        "o": ["Dr. Mansukh Mandaviya", "Hon'ble CM Bhupendra Patel", "Narendra Modi", "Amit Shah"],
        "a": "Dr. Mansukh Mandaviya",
        "exp": "Union Health Minister Dr. Mansukh Mandaviya inaugurated the India MedTech Expo 2023 in Gandhinagar, Gujarat."
    },
    {
        "q": "Which type of fire extinguisher is used for petroleum fire as well as electrical equipment fire?",
        "o": ["Powder type", "Water type", "Foam type", "Carbon dioxide type"],
        "a": "Powder type",
        "exp": "Dry powder extinguishers can be used on both Class B (petroleum/flammable liquids) and electrical fires, as powder is non-conductive."
    },
    {
        "q": "Epoxy resins are used as",
        "o": ["Adhesives", "Detergents", "Insecticides", "Fertilizers"],
        "a": "Adhesives",
        "exp": "Epoxy resins are widely used as strong industrial and domestic adhesives, as well as in coatings and composites."
    },
    {
        "q": "Optic fibres are mainly used for which of the following?",
        "o": ["Musical instrument", "Weaving", "Food industry", "Communication"],
        "a": "Communication",
        "exp": "Optical fibers transmit light signals over long distances with minimal loss, making them essential for high-speed telecommunications."
    },
    {
        "q": "RAM stands for",
        "o": ["Random Access Memory", "Random Active Memory", "Random Access Method", "Read Access Memory"],
        "a": "Random Access Memory",
        "exp": "RAM stands for Random Access Memory, which provides temporary storage for data that the CPU needs quick access to."
    },
    {
        "q": "Which shortcut key is used to delete character on the left side of the cursor?",
        "o": ["Delete (Del)", "Alt + Delete", "Backspace", "Ctrl + Delete"],
        "a": "Backspace",
        "exp": "The Backspace key is used to delete the character immediately to the left of the text cursor."
    },
    {
        "q": "Which key is used to move the cursor at the end of the line?",
        "o": ["Home", "End", "Page down", "Page Up"],
        "a": "End",
        "exp": "Pressing the 'End' key instantly moves the cursor to the end of the current line in most text editing software."
    },
    {
        "q": "Firefox is",
        "o": ["Data Analysis", "Word Processing", "Presentation", "Internet Browser"],
        "a": "Internet Browser",
        "exp": "Mozilla Firefox is a free and open-source web browser used to navigate and view websites on the internet."
    },
    {
        "q": "Which tab of MS Word 2016 is used to change the orientation of the page from portrait to landscape?",
        "o": ["Insert", "Layout", "Design", "View"],
        "a": "Layout",
        "exp": "In MS Word 2016, the page orientation settings (Portrait or Landscape) are found under the 'Layout' tab."
    },
    {
        "q": "Word count option is available in which tab of MS Word 2016?",
        "o": ["References", "Review", "View", "Mailings"],
        "a": "Review",
        "exp": "The Word Count feature, which checks document statistics like words and characters, is located in the 'Review' tab."
    },
    {
        "q": "If you want to apply formats to selected cell that meet specific criteria based on specific values",
        "o": ["Format", "Style", "Condition", "Conditional Formatting"],
        "a": "Conditional Formatting",
        "exp": "Conditional Formatting allows users in Excel to automatically apply specific formatting to cells that meet defined criteria."
    },
    {
        "q": "Principles of radiation protection included all except",
        "o": ["Time", "Distance", "Shielding", "Monitoring"],
        "a": "Monitoring",
        "exp": "While monitoring is important for occupational safety, the three core principles of minimizing radiation exposure are time, distance, and shielding."
    },
    {
        "q": "Number of thoracic vertebrae",
        "o": ["2", "7", "5", "12"],
        "a": "12",
        "exp": "The human vertebral column typically contains 12 thoracic vertebrae, which articulate with the 12 pairs of ribs."
    },
    {
        "q": "Mammography units typically operate at",
        "o": ["25 to 30 kvp", "60 to 120 kvp", "50 to 75 kvp", "80 to 140 kvp"],
        "a": "25 to 30 kvp",
        "exp": "Mammography utilizes a low kVp range (typically 25-30 kVp) to maximize subject contrast when imaging soft breast tissues."
    },
    {
        "q": "Hounsfield unit zero represents",
        "o": ["Water", "CSF", "Air", "Blood"],
        "a": "Water",
        "exp": "The Hounsfield scale is a quantitative measure of radiodensity used in CT scans, where distilled water at standard pressure and temperature is arbitrarily defined as zero HU."
    },
    {
        "q": "X-Ray tube is made of which glass",
        "o": ["Burmese", "Duralex", "Pyrex", "Gorilla"],
        "a": "Pyrex",
        "exp": "X-ray tube envelopes are typically made of Pyrex glass because of its high heat resistance and ability to withstand extreme temperature variations."
    },
    {
        "q": "False regarding tungsten",
        "o": ["High atomic number making it efficient in beam production", "High melting point", "Atomic number 94", "Melting point 3370 degree Celsius"],
        "a": "Atomic number 94",
        "exp": "Tungsten has an atomic number of 74, not 94 (which is Plutonium), making that statement false."
    },
    {
        "q": "Contrast used in MRI",
        "o": ["Iodinated contrast agents", "Gadolinium", "Barium contrast agents", "All"],
        "a": "Gadolinium",
        "exp": "Gadolinium-based contrast agents are commonly used in MRI to enhance tissue contrast due to their paramagnetic properties."
    },
    {
        "q": "RF shielding in MRI magnet room is done using",
        "o": ["Bismuth", "Copper", "Manganese", "Lead"],
        "a": "Copper",
        "exp": "Copper shielding (often arranged as a Faraday cage) is used in MRI rooms to prevent external radiofrequency signals from interfering with the scan."
    },
    {
        "q": "Patient position for CT ankle joint",
        "o": ["Head first supine", "Head first prone", "Feet first supine", "Feet first prone"],
        "a": "Feet first supine",
        "exp": "For a CT scan of the ankle, the patient is typically positioned feet first and supine on the scanning table to position the ankle at the isocenter."
    },
    {
        "q": "Photoelectric effect yields",
        "o": ["Characteristic radiation", "Negative ion", "Positive ion", "All"],
        "a": "All",
        "exp": "The photoelectric effect results in the ejection of a photoelectron (negative ion), leaving behind an ionized atom (positive ion), and characteristic radiation is emitted when a higher-shell electron fills the vacancy."
    },
    {
        "q": "All increase attenuation except",
        "o": ["Energy of radiation", "Density of absorber", "Atomic number of absorber", "Electron per gram of absorber"],
        "a": "Energy of radiation",
        "exp": "Increasing the energy of the incident radiation typically decreases the probability of interactions, thereby decreasing attenuation."
    },
    {
        "q": "Grid ratio is",
        "o": ["Total radiation absorbed by grid", "Primary scatter absorbed by grid", "Scatter radiation absorbed by grid", "Ratio of height of lead strips to distance between them"],
        "a": "Ratio of height of lead strips to distance between them",
        "exp": "The grid ratio in radiography is defined as the height of the radiopaque lead strips divided by the distance (width of the radiolucent interspaces) between them."
    },
    {
        "q": "Lateral end of uterine tube opens into",
        "o": ["Cervix", "Uterine cavity", "Peritoneal cavity", "Fornix"],
        "a": "Peritoneal cavity",
        "exp": "The lateral (fimbriated) end of the uterine (Fallopian) tube opens directly into the peritoneal cavity near the ovary."
    },
    {
        "q": "Shoulder joint is formed by",
        "o": ["Glenoid cavity of scapula", "Acromion process", "Greater tuberosity", "Coracoid process"],
        "a": "Glenoid cavity of scapula",
        "exp": "The shoulder (glenohumeral) joint is a ball-and-socket joint formed by the articulation between the head of the humerus and the glenoid cavity of the scapula."
    },
    {
        "q": "Barium oral contrast concentration is expressed as",
        "o": ["%w/w", "g%", "mOsm/kg", "mg%"],
        "a": "%w/w",
        "exp": "Barium sulfate suspension concentration is usually expressed as a percentage of weight per volume (%w/v) or weight per weight (%w/w)."
    },
    {
        "q": "Intensity of X-Ray beam that leaves the tube is not uniform because",
        "o": ["Saturation voltage", "Space charge", "Tube shielding", "Heel effect"],
        "a": "Heel effect",
        "exp": "The anode heel effect causes the X-ray beam intensity to be lower on the anode side because photons are absorbed by the target material itself."
    },
    {
        "q": "Correct as per AERB regulations",
        "o": ["Wear TLD below lead apron", "Wear TLD at wrist level", "TLD provides radiation safety to patient", "TLD can be stored in control console room of X-Ray"],
        "a": "Wear TLD below lead apron",
        "exp": "According to AERB regulations, radiation workers should wear the TLD badge under the lead apron at chest level to estimate the whole-body dose accurately."
    },
    {
        "q": "Advantages of USG over CT",
        "o": ["No harmful side effects", "Relatively cheap", "Noninvasive", "All of the above"],
        "a": "All of the above",
        "exp": "Ultrasound is cost-effective, non-invasive, and does not use ionizing radiation, which eliminates the risks associated with CT scans."
    },
    {
        "q": "A type of social engineering where an attacker sends a fraudulent message designed to trick a person into revealing sensitive information is known as",
        "o": ["Phishing attack", "Ransomware attack", "Denial of Service attack", "Man in the middle attack"],
        "a": "Phishing attack",
        "exp": "Phishing is a cyber-attack that relies on deception to manipulate individuals into giving out confidential information, such as passwords or credit card numbers."
    },
    {
        "q": "Nonstochastic effect of radiation",
        "o": ["Epilation", "Carcinogenesis", "Genetic effect", "All of the above"],
        "a": "Epilation",
        "exp": "Nonstochastic (deterministic) effects, like epilation (hair loss) or cataracts, have a threshold dose below which the effect does not occur and severity increases with dose."
    }
]

output = []
for i, item in enumerate(questions_data):
    options = item["o"].copy()
    random.shuffle(options)
    correct_idx = options.index(item["a"])
    
    out_obj = {
        "id": f"p5_q{i+1}",
        "question": item["q"],
        "options": options,
        "correctAnswer": correct_idx,
        "explanation": item["exp"]
    }
    output.append(out_obj)

with open('p5_chunk1.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=4)
