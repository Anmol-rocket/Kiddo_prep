import json
import random

data = [
    {
        "question": "RF pulse causes longitudinal magnetization to and establishes a new transversal magnetization",
        "options": ["Increase", "Decrease", "Remain unchanged", "Become zero"],
        "correct_text": "Decrease",
        "explanation": "The RF pulse flips protons into the transverse plane, causing longitudinal magnetization to decrease as it converts into transverse magnetization."
    },
    {
        "question": "1/T2 is also called",
        "options": ["Transverse relaxation rate", "Longitudinal frequency", "Transverse frequency", "Longitudinal relaxation rate"],
        "correct_text": "Transverse relaxation rate",
        "explanation": "T2 is the transverse relaxation time, so its reciprocal, 1/T2, represents the transverse relaxation rate."
    },
    {
        "question": "TR less than is short.",
        "options": ["300msec", "500msec", "700msec", "1000msec"],
        "correct_text": "500msec",
        "explanation": "In MRI, a Repetition Time (TR) of less than 500 milliseconds is generally considered short, maximizing T1 weighting."
    },
    {
        "question": "T2 of fat is",
        "options": ["Longer than water", "Shorter than water", "Equal to water", "100msec"],
        "correct_text": "Shorter than water",
        "explanation": "Fat has a shorter T2 relaxation time compared to water, which has a very long T2 time."
    },
    {
        "question": "TR more than is long.",
        "options": ["700 msec", "1000 msec", "1500 msec", "500msec"],
        "correct_text": "1500 msec",
        "explanation": "A Repetition Time (TR) of over 1500-2000 milliseconds is considered long, which is used for T2-weighted and proton density images."
    },
    {
        "question": "We get T1 weighted image, when TR is",
        "options": ["Short", "Long", "Too long to be measured", "None of the above"],
        "correct_text": "Short",
        "explanation": "A short TR and a short TE are required to produce a T1-weighted image in MRI."
    },
    {
        "question": "In a normal case, air is seen as dark on",
        "options": ["T1 weighted image", "T2 weighted image", "Both T1 and T2 weighted images", "None of the above"],
        "correct_text": "Both T1 and T2 weighted images",
        "explanation": "Air lacks mobile protons, meaning it yields no MRI signal and appears completely black on all standard MRI sequences."
    },
    {
        "question": "In a normal case, dense bone is seen as dark on",
        "options": ["CT image", "MR image", "Both MR and CT images", "None of CT or MR images"],
        "correct_text": "MR image",
        "explanation": "Cortical bone has very few mobile protons and a very short T2, making it appear dark (signal void) on MRI. In CT, dense bone appears bright."
    },
    {
        "question": "In medical Ultrasonography, Piezoelectric material used is",
        "options": ["Calcium Tungstate", "Zinc cadmium sulphate", "Lead zirconate titanate.", "None of the above."],
        "correct_text": "Lead zirconate titanate.",
        "explanation": "Lead zirconate titanate (PZT) is the most common synthetic piezoelectric ceramic used in modern ultrasound transducers."
    },
    {
        "question": "To sterilise the USG transducer, it should be",
        "options": ["Autoclaved.", "Heated.", "Cleaned with specific chemical disinfectants", "None of the above."],
        "correct_text": "None of the above.",
        "explanation": "Ultrasound transducers cannot be autoclaved or heated as it damages the piezoelectric crystals. They are typically sterilized using cold chemical disinfectants."
    },
    {
        "question": "USG produces which of the following biological effects.",
        "options": ["Heat", "Cavitation", "None of these.", "Both of these."],
        "correct_text": "Both of these.",
        "explanation": "Ultrasound can cause biological effects through thermal mechanisms (heat) and mechanical mechanisms (cavitation)."
    },
    {
        "question": "In Color Doppler venous flow is normally which type?",
        "options": ["Plug flow", "Circular flow", "Laminar flow", "Turbulent flow"],
        "correct_text": "Laminar flow",
        "explanation": "Normal venous flow is laminar, with blood moving in parallel layers and the highest velocity in the center of the vessel."
    },
    {
        "question": "Unit of Pulse repetition frequency is",
        "options": ["Hertz", "Per minute", "msec", "mm/sec"],
        "correct_text": "Hertz",
        "explanation": "Pulse repetition frequency (PRF) is measured in Hertz (Hz), which represents pulses per second."
    },
    {
        "question": "In which of the following, Doppler has tws piezoelectric elements with single head?",
        "options": ["CW Doppler", "Pulse Doppler", "Duplex", "Doppler color flow imaging"],
        "correct_text": "CW Doppler",
        "explanation": "Continuous Wave (CW) Doppler requires two separate piezoelectric elements in the transducer: one for continuously transmitting and one for continuously receiving."
    },
    {
        "question": "Transrectal scanner is best at which frequency?",
        "options": ["3.5 MHz", "5.0 MHz", "7.5 MHz", "1.0 MHz"],
        "correct_text": "7.5 MHz",
        "explanation": "Transrectal scanners use higher frequencies, typically around 7.5 to 10 MHz, to provide high-resolution images of the prostate and nearby structures."
    },
    {
        "question": "Contrast resolution in CT is",
        "options": ["Same as conventional films", "Less than conventional films", "Better than conventional films", "None of the above"],
        "correct_text": "Better than conventional films",
        "explanation": "CT has significantly better contrast resolution than conventional radiography, allowing differentiation of tissues with very small density differences."
    },
    {
        "question": "CT number of water is",
        "options": ["zero", "-1000", "200-300", "+1000"],
        "correct_text": "zero",
        "explanation": "On the Hounsfield scale used in CT, the radiodensity of distilled water at standard temperature and pressure is defined as zero (0 HU)."
    },
    {
        "question": "CT number of bone is",
        "options": ["zero", "+1000", "200-300", "-1000"],
        "correct_text": "+1000",
        "explanation": "Dense cortical bone has high attenuation and corresponds to a CT number of approximately +1000 Hounsfield Units."
    },
    {
        "question": "In CT reference material is",
        "options": ["water", "air", "bone", "none of the above"],
        "correct_text": "water",
        "explanation": "Water is the standard reference material in CT, serving as the baseline (0 HU) for calculating the Hounsfield units of other tissues."
    },
    {
        "question": "With narrowing of the window, each gray scale",
        "options": ["less CT numbers.", "larger CT numbers", "no effect on CT numbers", "none of the above"],
        "correct_text": "less CT numbers.",
        "explanation": "A narrow window width means fewer Hounsfield units are spread across the available grayscale, increasing contrast by assigning fewer CT numbers to each shade of gray."
    },
    {
        "question": "Barium swallow is indicated in all except",
        "options": ["Motility disorder", "Tracheo Esophageal fistulae", "Failed upper Gl endoscopy", "Intestinal obstruction"],
        "correct_text": "Intestinal obstruction",
        "explanation": "Barium is contraindicated in suspected intestinal obstruction due to the risk of barium inspissation and exacerbation of the obstruction; water-soluble contrast should be used instead."
    },
    {
        "question": "Virtual Colonoscopy (CT colonoscopy) is the radiological investigation of choice for",
        "options": ["Detection of Lung cancer", "Acid Peptic disease.", "Detection of Colonic neoplasia.", "Detection of esophageal stricture."],
        "correct_text": "Detection of Colonic neoplasia.",
        "explanation": "CT colonography is a specialized imaging technique primarily used as a non-invasive screening tool for detecting colonic polyps and neoplasia."
    },
    {
        "question": "MR imaging of GI tract is indicated in",
        "options": ["Perianal fistula", "Local staging of anorectal cancer", "Inflammatory bowel disease.", "All the above."],
        "correct_text": "All the above.",
        "explanation": "MRI is excellent for soft tissue contrast and is routinely used for evaluating perianal fistulas, staging anorectal tumors, and assessing inflammatory bowel disease."
    },
    {
        "question": "Indication for MCU is",
        "options": ["Vesicoureteric reflux", "To study uretheral pathologies", "Bladder leak.", "All the above."],
        "correct_text": "All the above.",
        "explanation": "Micturating cystourethrography (MCU) is used to assess the lower urinary tract, making it useful for diagnosing reflux, urethral strictures, and bladder leaks."
    },
    {
        "question": "CT scan of urinary tract is done",
        "options": ["Renal colic/ renal stone disease", "Intestinal mass", "Gall stones", "Acute Pancreatitis"],
        "correct_text": "Renal colic/ renal stone disease",
        "explanation": "Non-contrast CT of the urinary tract (CT KUB) is the gold standard for detecting and evaluating renal and ureteric stones in patients with renal colic."
    },
    {
        "question": "Indication for MR Urography",
        "options": ["To evaluate urinary tract in pregnancy", "To determine the level of obstruction.", "Urinary obstruction unrelated to urolithiasis", "All the above"],
        "correct_text": "All the above",
        "explanation": "MR urography is radiation-free and provides excellent visualization of the collecting system, making it useful for finding the level and cause of non-calculous obstructions."
    },
    {
        "question": "IVU is contraindicated in",
        "options": ["Haematuria", "Recurrent urinary tract infection", "Acute renal failure", "Vesical calculus"],
        "correct_text": "Acute renal failure",
        "explanation": "Acute renal failure is an absolute contraindication for Intravenous Urography (IVU) due to the risk of contrast-induced nephropathy worsening the condition."
    },
    {
        "question": "To evaluate Gall Bladder on imaging, patient should be fasting for",
        "options": ["6 hrs", "2 hrs", "24 hrs", "12 hrs"],
        "correct_text": "6 hrs",
        "explanation": "Fasting for at least 6 hours ensures the gallbladder is adequately distended for proper sonographic evaluation."
    },
    {
        "question": "ERCP is contraindicated in",
        "options": ["Acute Pancreatitis", "Post Cholecystectomy syndrome", "Management of bile duct stones.", "Severe cardiac disease"],
        "correct_text": "Severe cardiac disease",
        "explanation": "ERCP is an invasive endoscopic procedure and is contraindicated in patients with severe cardiac or pulmonary disease who are unfit for sedation."
    },
    {
        "question": "In MR, if fluid is darker than solids, the image is",
        "options": ["PD weighted image", "T1 weighted image", "T2 weighted image", "None of the above"],
        "correct_text": "T1 weighted image",
        "explanation": "On T1-weighted sequences, fluid (like CSF or urine) has a long T1 relaxation time and appears dark (hypointense) compared to solid tissues."
    },
    {
        "question": "If fluid e.g. CSF or urine is white, image is",
        "options": ["PD weighted image", "T1 weighted image", "T2 weighted image", "None of the above."],
        "correct_text": "T2 weighted image",
        "explanation": "Fluid appears bright (hyperintense) on T2-weighted MRI sequences due to its long transverse relaxation time."
    },
    {
        "question": "In dual source CT, which of the following filters are used?",
        "options": ["Lead", "Tungsten", "Tin", "Rhenium"],
        "correct_text": "Tin",
        "explanation": "In dual-source CT, a tin (Sn) filter is often used on the high-energy X-ray tube to improve spectral separation and reduce radiation dose."
    },
    {
        "question": "The Ultrasound frequency used in the diagnosis",
        "options": ["20 KHz", "40 KHz", "1MHz-20MHz", "60kHz."],
        "correct_text": "1MHz-20MHz",
        "explanation": "Diagnostic medical ultrasound typically utilizes frequencies in the range of 1 MHz to 20 MHz to balance tissue penetration and spatial resolution."
    },
    {
        "question": "On applying electric field certain materials change",
        "options": ["Chemical dimension", "Physical dimension", "Both a&b", "None of the above."],
        "correct_text": "Physical dimension",
        "explanation": "The piezoelectric effect describes materials that change their physical dimensions (shape or thickness) when subjected to an electric field."
    },
    {
        "question": "Which of the following Phosphor is not used in intensifying screens",
        "options": ["Calcium tungstate.", "Zinc cadmium sulphide", "Terbium", "Thulium blue"],
        "correct_text": "Zinc cadmium sulphide",
        "explanation": "Zinc cadmium sulphide was historically used for fluoroscopic screens, while calcium tungstate and rare-earth phosphors are used in radiographic intensifying screens."
    },
    {
        "question": "In CT scan the 4th generation is",
        "options": ["Translate rotate type", "Rotate- rotate type", "Stationary rotate type", "None of the above."],
        "correct_text": "Stationary rotate type",
        "explanation": "Fourth-generation CT scanners use a rotating X-ray tube inside a fixed, stationary ring of detectors."
    },
    {
        "question": "5th generation CT scan uses",
        "options": ["Pencil beam of x-rays", "Narrow fan beam", "Broad fan beam", "Multiple x-ray beams."],
        "correct_text": "Multiple x-ray beams.",
        "explanation": "Fifth-generation (electron beam) CT scanners use an electron gun to sweep a stationary target, effectively creating multiple X-ray beams from different angles without mechanical movement."
    },
    {
        "question": "Which of the following is best lateral resolution?",
        "options": ["15cm", "6cm", "0.06cm", "2cm."],
        "correct_text": "0.06cm",
        "explanation": "A smaller numerical value for lateral resolution indicates the ability to distinguish smaller, closely spaced objects, making 0.06 cm the best resolution among the options."
    },
    {
        "question": "Which of the following statements regarding protons are correct?",
        "options": ["They have a negative charge", "They are equal to the number of electrons in a non-ionized atom", "They have no mass", "Hydrogen atom has 2 protons"],
        "correct_text": "They are equal to the number of electrons in a non-ionized atom",
        "explanation": "In a neutral, non-ionized atom, the number of positively charged protons in the nucleus equals the number of negatively charged electrons."
    },
    {
        "question": "Which of the following is not correct for Tungsten",
        "options": ["It has an atomic number of 74", "The K-shell binding energy of tungsten is 69.5 KeV", "The mass number of tungsten is 284", "It is represented by the letter W"],
        "correct_text": "The mass number of tungsten is 284",
        "explanation": "Tungsten has an atomic number of 74 and an atomic mass of approximately 184, not 284."
    },
    {
        "question": "Which of following is correct for electromagnetic radiation:",
        "options": ["It cannot travel in vacuum.", "Travels with a speed of light in vacuum.", "Visible light is not a part of electromagnetic spectrum", "X-rays and gamma rays have different frequency and wavelength"],
        "correct_text": "Travels with a speed of light in vacuum.",
        "explanation": "All forms of electromagnetic radiation, including X-rays and light, travel at the speed of light in a vacuum (approximately 3 x 10^8 m/s)."
    },
    {
        "question": "In a diagnostic X-ray tube:",
        "options": ["Anode is positive", "Cathode is made of aluminium", "Cathode is positive", "X-rays are produced by thermionic emission"],
        "correct_text": "Anode is positive",
        "explanation": "In an X-ray tube, the anode is the positively charged target electrode, while the cathode is the negative electron source."
    },
    {
        "question": "Cathode of X-ray tube is:",
        "options": ["Is commonly made of tungsten", "Has a low melting point", "Has a low resistance", "Is positively charged in relation to the anode"],
        "correct_text": "Is commonly made of tungsten",
        "explanation": "The cathode filament in an X-ray tube is typically made of tungsten due to its high melting point and efficiency in thermionic emission."
    },
    {
        "question": "The following techniques can be used to minimise scatter",
        "options": ["Using collimation", "Air gaps between the object and the image receptor", "Intensifying screens", "Increasing the tube kV"],
        "correct_text": "Using collimation",
        "explanation": "Collimation restricts the primary X-ray beam, reducing the volume of irradiated tissue and thereby decreasing the production of scatter radiation."
    },
    {
        "question": "Which of the following is correct for mammography tube:",
        "options": ["Tube voltage of 40-50 kVp", "Molybdenum target anode", "Single-phase voltage supply", "Molybdenum window"],
        "correct_text": "Molybdenum target anode",
        "explanation": "Mammography tubes typically use a molybdenum (or rhodium) target anode to produce the low-energy characteristic X-rays optimal for soft-tissue breast imaging."
    },
    {
        "question": "All of these are deterministic effects of radiation except-",
        "options": ["Sterility", "Leukaemia", "Formation of cataract", "Hair loss"],
        "correct_text": "Leukaemia",
        "explanation": "Leukaemia is a stochastic effect of radiation (probability increases with dose), whereas sterility, cataracts, and hair loss are deterministic (severity increases with dose above a threshold)."
    },
    {
        "question": "Regarding computed tomography (CT) imaging which of these is true-",
        "options": ["CT number of fat is higher than water.", "High level of scatter reaches the CT detectors.", "Windowing is a technique to adjust the greyscale.", "Air corresponds to a CT value of 0 HU"],
        "correct_text": "Windowing is a technique to adjust the greyscale.",
        "explanation": "Windowing alters the window width and level to optimize the mapping of Hounsfield units to the grayscale for optimal display of specific tissues."
    },
    {
        "question": "All of the following are true for X-rays except",
        "options": ["They are invisible", "They form part of electromagnetic spectrum", "They cannot travel through vacuum", "They cause ionization"],
        "correct_text": "They cannot travel through vacuum",
        "explanation": "X-rays are a form of electromagnetic radiation and, like visible light, they can travel through a vacuum at the speed of light."
    }
]

output = []
start_id = 51

for item in data:
    options = item["options"]
    random.shuffle(options)
    
    correct_idx = options.index(item["correct_text"])
    
    out_item = {
        "id": f"p4_q{start_id}",
        "question": item["question"],
        "options": options,
        "correctAnswer": correct_idx,
        "explanation": item["explanation"]
    }
    output.append(out_item)
    start_id += 1

with open('p4_chunk2.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2)

print("Done generating p4_chunk2.json")
