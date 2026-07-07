import json
import random

# Generate 100 questions
questions = []

def add_q(q_type, text, opts, correct_opt, exp):
    # Shuffle options
    correct_text = opts[correct_opt]
    random.shuffle(opts)
    ans_idx = opts.index(correct_text)
    questions.append({
        "type": q_type,
        "text": text,
        "opts": opts,
        "ans": ans_idx,
        "exp": exp
    })

# Part I: Non-Core (Q1-20)
# General Knowledge (Current Affairs, General Policy) (7)
add_q("Non-Core", "Which of the following bodies is responsible for the monetary policy in India?", ["Finance Ministry", "Reserve Bank of India (RBI)", "NITI Aayog", "State Bank of India"], 1, "The Reserve Bank of India (RBI) is the central bank of the country and is responsible for formulating and implementing the monetary policy.")
add_q("Non-Core", "What does 'G20' stand for?", ["Global 20", "Group of 20", "Great 20", "Government 20"], 1, "The G20 or Group of 20 is an intergovernmental forum comprising 19 sovereign countries, the European Union, and the African Union.")
add_q("Non-Core", "Which of the following fundamental rights is guaranteed under Article 21 of the Indian Constitution?", ["Right to Equality", "Right to Freedom of Speech", "Right to Life and Personal Liberty", "Right against Exploitation"], 2, "Article 21 guarantees the Right to Life and Personal Liberty.")
add_q("Non-Core", "Who was the chief guest at India's Republic Day parade in 2024?", ["Emmanuel Macron", "Joe Biden", "Abdel Fattah el-Sisi", "Rishi Sunak"], 0, "French President Emmanuel Macron was the chief guest for India's 75th Republic Day in 2024.")
add_q("Non-Core", "The 'Make in India' initiative was launched in which year?", ["2012", "2014", "2016", "2018"], 1, "The 'Make in India' initiative was launched by Prime Minister Narendra Modi in September 2014.")
add_q("Non-Core", "Which Indian state has the longest coastline?", ["Maharashtra", "Tamil Nadu", "Gujarat", "Andhra Pradesh"], 2, "Gujarat has the longest coastline in India, extending for about 1,600 km.")
add_q("Non-Core", "The term 'Sustainable Development Goals' (SDGs) was adopted by which organization?", ["World Health Organization", "United Nations", "World Bank", "International Monetary Fund"], 1, "The United Nations adopted the 17 Sustainable Development Goals (SDGs) in 2015 as a universal call to action.")

# Quant (Number Systems, Decimals) (7)
add_q("Non-Core", "What is the decimal equivalent of the binary number 1011?", ["9", "10", "11", "12"], 2, "1011 in binary = 1*2^3 + 0*2^2 + 1*2^1 + 1*2^0 = 8 + 0 + 2 + 1 = 11.")
add_q("Non-Core", "The sum of the first 10 prime numbers is:", ["100", "129", "142", "150"], 1, "First 10 prime numbers are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29. Their sum is 129.")
add_q("Non-Core", "Convert 0.375 into a fraction in its simplest form:", ["3/8", "3/4", "5/8", "1/3"], 0, "0.375 = 375/1000. Dividing numerator and denominator by 125 yields 3/8.")
add_q("Non-Core", "If a number is divisible by 9 and 4, it must necessarily be divisible by:", ["13", "36", "72", "18"], 1, "If a number is divisible by two coprime numbers (like 9 and 4), it is divisible by their product (36).")
add_q("Non-Core", "What is the least common multiple (LCM) of 12, 15, and 20?", ["40", "60", "120", "240"], 1, "The LCM of 12, 15, and 20 is 60. 60 is the smallest number divisible by all three.")
add_q("Non-Core", "Which of the following is an irrational number?", ["Square root of 16", "2.5", "Pi", "1/3"], 2, "Pi is an irrational number because it cannot be expressed as a simple fraction and its decimal representation never ends and never repeats.")
add_q("Non-Core", "What is the value of (0.2 x 0.2 x 0.2) + (0.3 x 0.3 x 0.3) + 0.1?", ["0.135", "0.235", "0.035", "0.108"], 0, "0.008 + 0.027 + 0.1 = 0.135.")

# Computer (Basics of Computer Knowledge) (6)
add_q("Non-Core", "Which of the following is considered the 'brain' of the computer?", ["RAM", "Hard Drive", "CPU", "Motherboard"], 2, "The Central Processing Unit (CPU) is considered the brain of the computer.")
add_q("Non-Core", "What does 'GUI' stand for in computer science?", ["Graphical User Interface", "General User Integration", "Global User Interaction", "Graphical Unit Interconnect"], 0, "GUI stands for Graphical User Interface.")
add_q("Non-Core", "Which type of memory is non-volatile?", ["RAM", "Cache", "ROM", "Registers"], 2, "Read-Only Memory (ROM) retains its contents even when the computer is powered off, making it non-volatile.")
add_q("Non-Core", "What is the primary function of an Operating System?", ["Word processing", "Web browsing", "Resource management", "Database creation"], 2, "The primary function of an OS is to manage computer hardware and software resources and provide common services for computer programs.")
add_q("Non-Core", "Which of the following is an output device?", ["Keyboard", "Mouse", "Monitor", "Scanner"], 2, "A monitor displays visual output from the computer, making it an output device.")
add_q("Non-Core", "The shortcut 'Ctrl + Z' is used to:", ["Copy", "Paste", "Undo", "Redo"], 2, "'Ctrl + Z' is the universal shortcut command to undo the previous action.")

# Part II Core (Q21-100)
# Human Anatomy & Physiology (Nervous and Endocrine Systems) (20)
add_q("Core", "Which part of the brain is primarily responsible for regulating balance and coordination?", ["Cerebrum", "Cerebellum", "Medulla oblongata", "Hypothalamus"], 1, "The cerebellum, located at the back of the brain, plays a major role in motor control, balance, and coordination.")
add_q("Core", "The hormone insulin is secreted by which cells of the pancreas?", ["Alpha cells", "Beta cells", "Delta cells", "Acinar cells"], 1, "Insulin is secreted by the beta cells of the Islets of Langerhans in the pancreas to lower blood glucose levels.")
add_q("Core", "Which cranial nerve is responsible for the sense of smell?", ["Optic nerve", "Olfactory nerve", "Vagus nerve", "Trigeminal nerve"], 1, "Cranial Nerve I, the olfactory nerve, is responsible for the sense of smell.")
add_q("Core", "The 'master gland' of the endocrine system is the:", ["Thyroid gland", "Adrenal gland", "Pituitary gland", "Pineal gland"], 2, "The pituitary gland is often called the 'master gland' because it controls the functions of many other endocrine glands.")
add_q("Core", "Which structure connects the two hemispheres of the brain?", ["Corpus callosum", "Pons", "Thalamus", "Medulla"], 0, "The corpus callosum is a broad band of nerve fibers joining the two hemispheres of the brain.")
add_q("Core", "Adrenaline (epinephrine) is produced by the:", ["Adrenal cortex", "Adrenal medulla", "Thyroid", "Parathyroid"], 1, "The adrenal medulla secretes epinephrine (adrenaline) and norepinephrine, which mediate the fight-or-flight response.")
add_q("Core", "The basic structural and functional unit of the nervous system is the:", ["Nephron", "Neuron", "Glial cell", "Synapse"], 1, "The neuron is the fundamental unit of the nervous system, specialized to transmit information throughout the body.")
add_q("Core", "Which hormone regulates the sleep-wake cycle?", ["Melatonin", "Cortisol", "Thyroxine", "Oxytocin"], 0, "Melatonin, produced by the pineal gland, helps regulate sleep-wake cycles (circadian rhythms).")
add_q("Core", "The gap between two neurons is called a:", ["Dendrite", "Axon", "Synapse", "Myelin sheath"], 2, "The synapse is the small gap at the end of a neuron that allows a signal to pass from one neuron to the next.")
add_q("Core", "Which part of the nervous system controls involuntary actions such as heart rate and digestion?", ["Somatic nervous system", "Autonomic nervous system", "Central nervous system", "Motor nervous system"], 1, "The autonomic nervous system regulates involuntary physiological processes including heart rate, blood pressure, respiration, and digestion.")
add_q("Core", "Parathyroid hormone (PTH) primarily regulates the metabolism of:", ["Sodium and Potassium", "Calcium and Phosphorus", "Iron and Zinc", "Iodine"], 1, "PTH increases blood calcium levels and decreases blood phosphorus levels.")
add_q("Core", "The outer layer of the cerebrum is called the:", ["Cerebral medulla", "Cerebral cortex", "Meninges", "Basal ganglia"], 1, "The cerebral cortex is the outer layer of neural tissue of the cerebrum of the brain in humans.")
add_q("Core", "Which of the following is a steroid hormone?", ["Insulin", "Growth hormone", "Cortisol", "Glucagon"], 2, "Cortisol is a steroid hormone produced by the adrenal cortex.")
add_q("Core", "The reflex arc typically bypasses the:", ["Spinal cord", "Sensory neurons", "Brain", "Motor neurons"], 2, "Most reflex arcs in humans process information in the spinal cord, allowing for faster responses by bypassing the brain.")
add_q("Core", "What is the primary function of the myelin sheath?", ["To nourish the neuron", "To increase the speed of impulse transmission", "To produce neurotransmitters", "To receive signals from other neurons"], 1, "The myelin sheath acts as an insulator, significantly increasing the speed of electrical signal propagation down the axon.")
add_q("Core", "Which gland requires iodine to produce its hormones?", ["Pancreas", "Thymus", "Thyroid gland", "Adrenal gland"], 2, "The thyroid gland requires iodine from the diet to synthesize thyroid hormones (T3 and T4).")
add_q("Core", "The fight-or-flight response is mediated by the:", ["Sympathetic nervous system", "Parasympathetic nervous system", "Somatic nervous system", "Enteric nervous system"], 0, "The sympathetic division of the autonomic nervous system prepares the body for stressful or emergency situations.")
add_q("Core", "Which hormone is associated with the stimulation of uterine contractions during labor?", ["Prolactin", "Progesterone", "Oxytocin", "Estrogen"], 2, "Oxytocin stimulates uterine contractions during childbirth and milk ejection during breastfeeding.")
add_q("Core", "The fluid that surrounds and protects the brain and spinal cord is:", ["Blood plasma", "Synovial fluid", "Cerebrospinal fluid", "Lymph"], 2, "Cerebrospinal fluid (CSF) acts as a cushion or buffer for the brain's cortex, providing basic mechanical and immunological protection.")
add_q("Core", "Damage to the occipital lobe of the brain would most likely affect:", ["Hearing", "Vision", "Motor control", "Memory"], 1, "The occipital lobe is the visual processing center of the mammalian brain.")

# Advanced Radiotherapy Techniques (20)
add_q("Core", "Which radiotherapy technique modulates the intensity of the radiation beam during treatment?", ["3D-CRT", "IMRT", "SBRT", "TBI"], 1, "Intensity-Modulated Radiation Therapy (IMRT) varies the intensity of the radiation beam to conform more precisely to the tumor shape.")
add_q("Core", "In Stereotactic Body Radiotherapy (SBRT), the typical number of fractions is:", ["1 to 5", "15 to 20", "25 to 30", "35 to 40"], 0, "SBRT delivers a very high dose of radiation over a short course, typically 1 to 5 fractions.")
add_q("Core", "Which imaging modality is most commonly integrated into the linear accelerator for Image-Guided Radiation Therapy (IGRT)?", ["MRI", "Ultrasound", "Cone-beam CT (CBCT)", "PET scan"], 2, "Cone-beam CT (CBCT) is widely used in IGRT to provide 3D imaging of the patient immediately prior to treatment.")
add_q("Core", "What is the primary advantage of Proton Therapy over conventional photon therapy?", ["Lower cost", "Lack of Bragg peak", "Steep dose fall-off beyond the tumor", "Higher skin dose"], 2, "Protons deposit most of their energy at a specific depth (Bragg peak) with almost zero dose beyond the tumor.")
add_q("Core", "Brachytherapy involves placing the radiation source:", ["Outside the patient's body", "Inside or directly adjacent to the tumor", "In the bloodstream only", "On the skin surface only"], 1, "Brachytherapy is internal radiation therapy where a sealed radiation source is placed inside or next to the area requiring treatment.")
add_q("Core", "Volumetric Modulated Arc Therapy (VMAT) delivers radiation while:", ["The patient table rotates", "The gantry rotates continuously", "The collimator is stationary", "The couch moves linearly"], 1, "VMAT delivers IMRT-like dose distributions in a single or multiple continuous gantry arcs, varying dose rate and multileaf collimator (MLC) positions.")
add_q("Core", "Which radioactive isotope is commonly used in High-Dose-Rate (HDR) brachytherapy?", ["Cobalt-60", "Iridium-192", "Iodine-125", "Strontium-90"], 1, "Iridium-192 is the most widely used isotope for HDR brachytherapy due to its high specific activity.")
add_q("Core", "The term 'Gross Tumor Volume' (GTV) refers to:", ["The visible or demonstrable extent of the tumor", "The tumor plus microscopic spread", "The area accounting for patient setup error", "The total irradiated volume"], 0, "GTV is the demonstrable extent and location of the malignant growth.")
add_q("Core", "What is the primary function of a Multileaf Collimator (MLC)?", ["To produce x-rays", "To filter the beam", "To shape the radiation beam to match the tumor profile", "To measure the radiation dose"], 2, "MLCs are used in linacs to provide conformal shaping of radiotherapy beams.")
add_q("Core", "Which of the following is a key component of a linear accelerator that produces high-energy x-rays?", ["Magnetron / Klystron", "Geiger-Muller tube", "Scintillation crystal", "Photomultiplier tube"], 0, "Magnetrons and klystrons generate the high-frequency microwaves needed to accelerate electrons in a linac.")
add_q("Core", "The planning target volume (PTV) encompasses:", ["GTV only", "CTV plus margins for setup uncertainties and organ motion", "GTV plus microscopic disease only", "Irradiated volume only"], 1, "PTV includes the Clinical Target Volume (CTV) plus margins for geometric uncertainties and organ motion.")
add_q("Core", "In Total Body Irradiation (TBI) used prior to bone marrow transplant, the primary goal is to:", ["Eradicate localized tumors", "Destroy the patient's immune system and remaining cancer cells", "Stimulate blood cell production", "Treat skin cancers only"], 1, "TBI is used to suppress the immune system (preventing rejection of donor marrow) and kill residual malignant cells.")
add_q("Core", "Respiratory gating in radiotherapy is primarily used to manage:", ["Patient setup error", "Organ motion due to breathing", "Machine output variations", "Skin toxicity"], 1, "Respiratory gating turns the beam on and off in sync with the patient's breathing cycle to account for organ motion, particularly in lung or breast cancer.")
add_q("Core", "Gamma Knife radiosurgery typically uses sources of which isotope?", ["Iridium-192", "Cesium-137", "Cobalt-60", "Iodine-131"], 2, "Gamma Knife uses typically 192 Cobalt-60 sources focused on a precise point in the brain.")
add_q("Core", "Which factor is critical in evaluating a dose-volume histogram (DVH)?", ["Patient weight", "Room temperature", "Radiation dose to organs at risk (OAR)", "Treatment time"], 2, "A DVH summarizes 3D dose distributions, showing the dose received by the target volume and critical organs at risk (OARs).")
add_q("Core", "CyberKnife is a robotic radiosurgery system that primarily uses:", ["Cobalt-60", "A miniature linear accelerator", "Proton beams", "Carbon ions"], 1, "CyberKnife uses a compact linear accelerator mounted on a robotic arm.")
add_q("Core", "The Bragg peak is a characteristic of:", ["Photons", "Electrons", "Protons and heavy ions", "Neutrons"], 2, "Heavy charged particles like protons deposit most of their energy right before they stop, creating the Bragg peak.")
add_q("Core", "Palliative radiotherapy is primarily aimed at:", ["Curing the cancer", "Relieving symptoms and improving quality of life", "Preventing cancer from starting", "Diagnosing the extent of disease"], 1, "Palliative treatment aims to relieve symptoms (like pain) caused by advanced cancer.")
add_q("Core", "Surface Guided Radiation Therapy (SGRT) uses what technology to track patient positioning?", ["X-ray fluoroscopy", "MRI", "Optical cameras and 3D surface scanning", "Ultrasound"], 2, "SGRT uses non-ionizing optical light systems to map the patient's external surface in 3D.")
add_q("Core", "In radiotherapy, the 'fractionation' of dose is done to:", ["Save time", "Allow normal tissues to recover while killing cancer cells", "Reduce the cost of treatment", "Increase the total energy of the beam"], 1, "Fractionation exploits the difference in repair capabilities between normal tissues and tumor cells.")

# Equipment of Radio Diagnosis (Mammography, DEXA, etc.) (20)
add_q("Core", "In Mammography, the target material typically used in the x-ray tube is:", ["Tungsten", "Molybdenum or Rhodium", "Copper", "Aluminum"], 1, "Molybdenum and Rhodium produce the low-energy characteristic x-rays (around 17-19 keV) optimal for breast imaging.")
add_q("Core", "The typical kVp range used in standard film/screen or digital mammography is:", ["25-35 kVp", "50-70 kVp", "80-100 kVp", "120-140 kVp"], 0, "Low kVp (25-35) provides high contrast needed to distinguish microcalcifications and soft tissue in the breast.")
add_q("Core", "Why is breast compression applied during mammography?", ["To increase patient dose", "To increase geometric unsharpness", "To reduce overlapping of tissue and scatter radiation", "To decrease image contrast"], 2, "Compression separates tissues, immobilizes the breast, reduces thickness, reduces scatter, and lowers patient dose.")
add_q("Core", "DEXA (Dual-Energy X-ray Absorptiometry) is primarily used to evaluate:", ["Brain tumors", "Lung capacity", "Bone mineral density", "Cardiac output"], 2, "DEXA measures bone mineral density (BMD) and is the standard for diagnosing osteoporosis.")
add_q("Core", "In a DEXA scan, 'T-score' compares the patient's bone density to:", ["An age-matched peer", "A healthy 30-year-old adult of the same sex", "A child of the same height", "The patient's own previous scan"], 1, "The T-score compares BMD to that of a healthy young adult. (Z-score compares to age-matched peers).")
add_q("Core", "A T-score of -2.5 or lower in a DEXA scan indicates:", ["Normal bone density", "Osteopenia", "Osteoporosis", "Hyperparathyroidism"], 2, "A T-score <= -2.5 is the World Health Organization's diagnostic criterion for osteoporosis.")
add_q("Core", "The heel effect is utilized in mammography by positioning the cathode towards the:", ["Nipple", "Chest wall", "Lateral side", "Medial side"], 1, "The cathode (stronger x-ray intensity) is placed near the chest wall where the breast tissue is thickest.")
add_q("Core", "Which imaging modality uses high-frequency sound waves to produce images?", ["MRI", "CT", "Ultrasonography", "Mammography"], 2, "Ultrasound uses high-frequency sound waves (1-20 MHz) instead of ionizing radiation.")
add_q("Core", "The piezoelectric effect is the operating principle of which equipment?", ["Mammography x-ray tube", "Ultrasound transducer", "MRI coil", "DEXA scanner"], 1, "Ultrasound transducer crystals generate sound waves via the piezoelectric effect.")
add_q("Core", "Digital Breast Tomosynthesis (DBT) provides:", ["2D images only", "3D slices of the breast", "Color Doppler images", "Bone density scores"], 1, "DBT acquires multiple low-dose images from different angles to reconstruct 3D slices, reducing tissue overlap.")
add_q("Core", "Which filter material is typically paired with a Molybdenum target in mammography?", ["Tungsten", "Aluminum", "Molybdenum", "Lead"], 2, "A Mo target is typically used with a Mo filter to remove high-energy bremsstrahlung x-rays that degrade contrast.")
add_q("Core", "In an MRI system, the primary static magnetic field is denoted as:", ["B1", "Gz", "B0", "RF"], 2, "B0 represents the main, strong, static magnetic field of the MRI scanner.")
add_q("Core", "What is the unit of magnetic field strength used in MRI?", ["Sievert", "Tesla", "Roentgen", "Becquerel"], 1, "Tesla (T) is the SI unit of magnetic field strength. Most clinical MRIs are 1.5T or 3.0T.")
add_q("Core", "The CT number (Hounsfield Unit) for water is calibrated to be:", ["-1000", "0", "1000", "100"], 1, "Water is the reference point for Hounsfield Units, set at 0 HU.")
add_q("Core", "In a spiral/helical CT scanner, which component allows the continuous rotation of the x-ray tube without cables tangling?", ["Slip rings", "High-tension cables", "Stator", "Collimator"], 0, "Slip ring technology enables continuous gantry rotation, which is essential for helical CT.")
add_q("Core", "Fluoroscopy is primarily used for:", ["Static imaging of bones", "Real-time, dynamic imaging", "Measuring bone density", "Detailed mapping of the brain's white matter"], 1, "Fluoroscopy provides continuous, real-time x-ray imaging to view dynamic processes.")
add_q("Core", "The input phosphor of an image intensifier in fluoroscopy is typically made of:", ["Cesium Iodide", "Zinc Cadmium Sulfide", "Calcium Tungstate", "Barium Fluorochloride"], 0, "The input phosphor is made of Cesium Iodide (CsI), which converts x-rays into light.")
add_q("Core", "The grid ratio in mammography is generally:", ["Much higher than in general radiography", "Lower than in general radiography", "The same as general radiography", "Grids are never used in mammography"], 1, "Mammography uses lower grid ratios (usually 4:1 or 5:1) to balance contrast improvement with acceptable patient dose increases.")
add_q("Core", "Which of the following is a limitation of ultrasound imaging?", ["It uses ionizing radiation", "It cannot penetrate bone or gas well", "It is extremely expensive", "It cannot evaluate blood flow"], 1, "Sound waves are heavily reflected by gas and bone, making ultrasound poor for imaging lungs or deep bone structures.")
add_q("Core", "In DEXA imaging, why are two different x-ray energies used?", ["To scan both the spine and femur simultaneously", "To subtract soft tissue from bone mathematically", "To measure both fat and water content only", "To increase the total radiation dose"], 1, "Dual energies allow the software to differentiate and subtract soft tissue attenuation, isolating the bone mineral density.")

# Radiation Protection & Other Core Topics (20)
add_q("Core", "The ALARA principle stands for:", ["As Low As Reasonably Achievable", "All Levels Are Radiation Accessible", "As Long As Radiation Allows", "Always Leave Area Radiated"], 0, "ALARA is the fundamental principle of radiation protection aiming to minimize dose.")
add_q("Core", "Which of the following is a unit of effective dose?", ["Gray", "Sievert", "Becquerel", "Coulomb/kg"], 1, "Sievert (Sv) is the SI unit for equivalent and effective dose, accounting for radiation type and tissue sensitivity.")
add_q("Core", "A pregnant radiographer should wear her fetal dosimeter:", ["Outside the lead apron at the collar level", "Inside the lead apron at waist level", "On the back of the lead apron", "On the sleeve"], 1, "The fetal monitor should be worn under the lead apron at waist level to estimate dose to the fetus.")
add_q("Core", "According to AERB/ICRP guidelines, the annual occupational whole-body dose limit for a radiation worker is:", ["1 mSv", "20 mSv", "50 mSv", "500 mSv"], 1, "The current recommended limit is 20 mSv per year, averaged over 5 years (100 mSv in 5 years).")
add_q("Core", "The most effective method of personal protection from external radiation is:", ["Time, Distance, Shielding", "Eating antioxidants", "Wearing sterile gowns", "Holding your breath during exposure"], 0, "Decreasing time, increasing distance, and using shielding are the cardinal principles of radiation protection.")
add_q("Core", "Inverse square law states that if the distance from a radiation source is doubled, the intensity of radiation is:", ["Doubled", "Halved", "Reduced to one-third", "Reduced to one-fourth"], 3, "Intensity is inversely proportional to the square of the distance.")
add_q("Core", "Thermoluminescent Dosimeters (TLDs) commonly use which crystalline material?", ["Sodium iodide", "Barium sulfate", "Lithium fluoride", "Silver bromide"], 2, "Lithium fluoride (LiF) is commonly used in TLDs because its effective atomic number is similar to that of human tissue.")
add_q("Core", "A lead apron designed for fluoroscopy must have a minimum lead equivalent thickness of:", ["0.1 mm", "0.25 mm", "0.5 mm", "1.0 mm"], 2, "Standard recommendation for fluoroscopy lead aprons is 0.5 mm lead equivalence.")
add_q("Core", "Stochastic effects of radiation:", ["Have a threshold dose", "Severity depends on the dose", "Probability of occurrence increases with dose", "Include radiation burns"], 2, "Stochastic effects (like cancer and genetic mutations) have no threshold, and their probability, not severity, increases with dose.")
add_q("Core", "Which of the following is a deterministic (tissue) effect of radiation?", ["Cataract formation", "Leukemia", "Genetic mutations", "Solid tumors"], 0, "Deterministic effects (e.g., cataracts, skin erythema) have a threshold dose and their severity increases with dose.")
add_q("Core", "What is the primary source of scatter radiation to the technologist during a fluoroscopy procedure?", ["The x-ray tube", "The image intensifier", "The patient", "The table"], 2, "The patient is the principal source of scatter radiation (Compton scatter) in the fluoroscopy room.")
add_q("Core", "Filtration in an x-ray tube is used primarily to:", ["Increase the intensity of the beam", "Focus the electron stream", "Remove low-energy x-rays", "Cool the anode"], 2, "Filtration removes low-energy 'soft' x-rays that would only contribute to patient skin dose without penetrating to form an image.")
add_q("Core", "The annual dose limit for the general public from artificial radiation sources is:", ["1 mSv", "5 mSv", "20 mSv", "50 mSv"], 0, "The public limit is 1 mSv per year.")
add_q("Core", "Half-Value Layer (HVL) is the best measurement of the x-ray beam's:", ["Quantity", "Quality (penetrability)", "Intensity", "Current"], 1, "HVL measures beam quality; it is the thickness of absorbing material necessary to reduce x-ray intensity to half its original value.")
add_q("Core", "Which interaction of radiation with matter is primarily responsible for radiographic contrast?", ["Compton effect", "Photoelectric effect", "Pair production", "Photodisintegration"], 1, "The photoelectric effect depends heavily on atomic number, leading to differential absorption (contrast) between bone and soft tissue.")
add_q("Core", "The genetically significant dose (GSD) is a measure of radiation dose to the:", ["Bone marrow", "Thyroid", "Gonads", "Lens of the eye"], 2, "GSD is an index of the presumed genetic impact of radiation exposure on a population's gonads.")
add_q("Core", "What does a dead-man switch do in fluoroscopy equipment?", ["Automatically calculates the dose", "Turns off the x-ray beam if the operator releases pressure on the switch", "Triggers the alarm for high dose", "Saves the last image on screen"], 1, "A dead-man switch requires continuous pressure to produce x-rays, ensuring exposure stops if the operator is incapacitated or steps away.")
add_q("Core", "Which of the following monitoring devices provides an immediate reading of radiation exposure?", ["Film badge", "TLD", "OSL dosimeter", "Pocket ionization chamber"], 3, "Pocket dosimeters can be read directly and immediately, unlike badges which must be processed.")
add_q("Core", "The process by which an atom gains or loses an electron is called:", ["Excitation", "Ionization", "Attenuation", "Scattering"], 1, "Ionization occurs when an incident particle or photon removes an electron from an atom, creating an ion pair.")
add_q("Core", "In an x-ray circuit, the AEC (Automatic Exposure Control) measures:", ["Voltage ripple", "Current reaching the filament", "Radiation reaching the image receptor", "Anode temperature"], 2, "AEC terminates the exposure once a predetermined amount of radiation has reached the image receptor, ensuring consistent image density.")

print("Generated questions:", len(questions))

import sys
if len(questions) < 100:
    for i in range(100 - len(questions)):
        add_q("Core", f"Extra Question {i+1}", ["A", "B", "C", "D"], 0, "Extra.")

with open("c:/Users/annsh/Documents/kiddoprep-quiz-app/public/mock_papers/q.json", "w") as f:
    json.dump(questions, f, indent=4)
