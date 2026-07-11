import json
import random

data = [
    {
        "question": "Wavelength of X-rays ranges from",
        "options": ["6-7 A", "0.1-0.5 A", "15-20 A", "5-10 A"],
        "answer": "0.1-0.5 A",
        "explanation": "Diagnostic X-rays typically have a wavelength ranging from 0.1 to 0.5 Angstroms."
    },
    {
        "question": "X-rays are electrically charged",
        "options": ["electrons", "neutral", "neutrons", "protons"],
        "answer": "neutral",
        "explanation": "X-rays are electromagnetic waves and carry no electrical charge."
    },
    {
        "question": "Radioactive substances emit all except",
        "options": ["alpha", "beta", "gamma", "epsilon"],
        "answer": "epsilon",
        "explanation": "Radioactive decay primarily involves the emission of alpha particles, beta particles, and gamma rays."
    },
    {
        "question": "Most hazardous internally located isotopes are",
        "options": ["alpha particles", "beta particles", "gamma particles", "delta particles"],
        "answer": "alpha particles",
        "explanation": "Alpha particles have high linear energy transfer (LET), causing massive localized tissue damage if ingested or inhaled."
    },
    {
        "question": "Radiation exposure can measured by",
        "options": ["Ionization Chamber", "Scintillation detector", "GM Counter", "All the above"],
        "answer": "All the above",
        "explanation": "Various types of detectors, including ionization chambers, scintillation detectors, and Geiger-Muller counters, are used to measure radiation."
    },
    {
        "question": "TLD badge consists of",
        "options": ["Calcium sulphate", "Disprosium", "Teflon", "All the above"],
        "answer": "All the above",
        "explanation": "A thermoluminescent dosimeter (TLD) typically contains a phosphor like calcium sulfate doped with dysprosium, embedded in a Teflon matrix."
    },
    {
        "question": "In Mammography tube, anode is made of",
        "options": ["Tungsten", "Molybdenum", "Beryllium", "Cobalt"],
        "answer": "Molybdenum",
        "explanation": "Molybdenum targets produce characteristic X-rays in the optimal 17-20 keV energy range needed for soft tissue contrast in mammography."
    },
    {
        "question": "Advantage of high frequency generator are",
        "options": ["initial conversion of AC to DC waveform", "To ensure accurate voltage and current", "Excellent service and repair", "All the above"],
        "answer": "All the above",
        "explanation": "High frequency generators provide near-constant potential, ensuring accurate technique parameters and efficient operation."
    },
    {
        "question": "Modalities not involving ionizing radiations are",
        "options": ["CT Scan", "X-rays", "PET", "MRI"],
        "answer": "MRI",
        "explanation": "Magnetic Resonance Imaging (MRI) uses strong magnetic fields and radio waves, not ionizing radiation."
    },
    {
        "question": "Biological effect at the same energy level is in the order of",
        "options": ["alpha > beta > gamma", "alpha < beta < gamma", "alpha = beta = gamma", "None of the above"],
        "answer": "alpha > beta > gamma",
        "explanation": "Alpha particles have the highest linear energy transfer (LET) and cause the most biological damage at a given energy, followed by beta and then gamma."
    },
    {
        "question": "Death due to radiation exposure occurs at the dose of",
        "options": ["100 mSv", ">500REM", "3Sv", "0.25-1Sv"],
        "answer": ">500REM",
        "explanation": "Doses exceeding 500 REM (5 Sieverts) over a short period are typically lethal without intensive medical intervention."
    },
    {
        "question": "Cataract in eye with radiation exposure of 5-8Sv occurs within",
        "options": ["one year", "20-30 years", "6 months", "5-10 years"],
        "answer": "5-10 years",
        "explanation": "The latent period for radiation-induced cataracts after significant exposure typically ranges from several years up to a decade."
    },
    {
        "question": "Exposure can be reduced to desired level by",
        "options": ["Providing shield", "by reducing duration of exposure", "By measuring distance between source and area under exposure", "All the above"],
        "answer": "All the above",
        "explanation": "The three primary principles of radiation protection are maximizing distance, minimizing time, and utilizing adequate shielding."
    },
    {
        "question": "Minimum thickness of lead coat should be",
        "options": ["2mm", "1.5mm", "0.25 mm", "4mm"],
        "answer": "0.25 mm",
        "explanation": "Standard lead aprons for fluoroscopy and general radiography have a minimum lead equivalent thickness of 0.25 mm."
    },
    {
        "question": "Radioactivity was discovered by",
        "options": ["Roentgen", "Bacqueral", "Madam Curie", "None of the above"],
        "answer": "Bacqueral",
        "explanation": "Henri Becquerel discovered spontaneous radioactivity in 1896 while working with uranium salts."
    },
    {
        "question": "Causes of unsharpness in Radiographie image are",
        "options": ["geometry", "photographic", "movement", "all the above"],
        "answer": "all the above",
        "explanation": "Image unsharpness can result from geometric factors (focal spot size), photographic (screen phosphor), or patient movement."
    },
    {
        "question": "Radiographic examination of joints is called",
        "options": ["Arthrography", "Arteriography", "Dacrocystography", "Cholangiography"],
        "answer": "Arthrography",
        "explanation": "Arthrography is the medical imaging of a joint, often performed after injecting a contrast medium."
    },
    {
        "question": "Photoconductor used in Xeroradiography is",
        "options": ["Cobalt", "Selenium", "Tungsten", "Copper"],
        "answer": "Selenium",
        "explanation": "Amorphous selenium is used as the photoconductor plate in xeroradiography due to its excellent charge-holding properties."
    },
    {
        "question": "Good and uniform compression of Breast in mammography is to",
        "options": ["Immobilise breast", "Decrease geometric unsharpness", "Decrease scatter radiations", "All the above"],
        "answer": "All the above",
        "explanation": "Compression reduces tissue thickness (decreasing scatter), prevents motion, and improves geometric sharpness."
    },
    {
        "question": "Most commonly used lubricant purgative in abdominal preparation is",
        "options": ["Liquid paraffin", "Isogel", "Bisacodyl", "Castor oil"],
        "answer": "Liquid paraffin",
        "explanation": "Liquid paraffin acts as a lubricant laxative to aid in bowel clearance prior to abdominal imaging."
    },
    {
        "question": "Quantum theory fails to explain",
        "options": ["Interference", "Radiation emission", "Photoelectric effect", "All the above"],
        "answer": "Interference",
        "explanation": "Wave theory is required to explain phenomena like interference and diffraction, whereas quantum theory explains particle-like behavior."
    },
    {
        "question": "Visible spectrum ranges from",
        "options": ["1000-3000A", "4000-7700A", "8000-9900A", "200-500A"],
        "answer": "4000-7700A",
        "explanation": "The visible light spectrum typically ranges from about 400 nm to 700 nm, which is equivalent to 4000 to 7700 Angstroms."
    },
    {
        "question": "Contrast material used in Micturating cystourethrography",
        "options": ["Sodium Iodide", "Water-soluble iodinated contrast", "Telepaque", "Barium Sulfate"],
        "answer": "Water-soluble iodinated contrast",
        "explanation": "Water-soluble iodinated contrast media are safely used to outline the bladder and urethra during MCU."
    },
    {
        "question": "Investigation of choice in pericardial effusion:",
        "options": ["Cardiac catheterization", "USG", "Echocardiography", "Lateral view X-ray chest"],
        "answer": "Echocardiography",
        "explanation": "Echocardiography is highly sensitive, non-invasive, and considered the gold standard for diagnosing pericardial effusion."
    },
    {
        "question": "All are imaging modalities of chest, except",
        "options": ["HRCT", "USG", "Ventilation perfusion study", "Echocardiography"],
        "answer": "USG",
        "explanation": "Ultrasound cannot penetrate the air-filled lungs, limiting its usefulness for general chest imaging compared to CT or plain X-rays."
    },
    {
        "question": "SI unit for measurement of luminous intensity is",
        "options": ["Fermi", "Candela", "Parsec", "Kelvin"],
        "answer": "Candela",
        "explanation": "The candela is the standard SI base unit of luminous intensity."
    },
    {
        "question": "Contraindication for intravenous pyelography is",
        "options": ["Blunt injury abdomen with haematuria", "Pregnancy", "Congenital anomalies involving kidney", "All the above"],
        "answer": "Pregnancy",
        "explanation": "IVP involves significant ionizing radiation and is generally contraindicated during pregnancy to protect the fetus."
    },
    {
        "question": "Which of the following is semi conductor",
        "options": ["Copper", "Silicon", "Aluminum", "Lead"],
        "answer": "Silicon",
        "explanation": "Silicon is a widely used semiconductor material in electronic components and solid-state radiation detectors."
    },
    {
        "question": "Adverse reaction to contrast are all except",
        "options": ["Convulsions", "Urticaria", "Hypotension", "Cataract"],
        "answer": "Cataract",
        "explanation": "Cataracts are a long-term consequence of radiation exposure, not an acute adverse reaction to contrast media."
    },
    {
        "question": "Enteroclysis is",
        "options": ["Small bowel enema", "Barium meal follow thro", "T-tube cholangiography", "Barium enema"],
        "answer": "Small bowel enema",
        "explanation": "Enteroclysis involves the direct instillation of contrast into the small bowel via a nasojejunal tube."
    },
    {
        "question": "Barium suspension is made of",
        "options": ["Barium sulfate and water", "Barium chloride", "Barium sulfide", "Barium carbonate"],
        "answer": "Barium sulfate and water",
        "explanation": "Barium sulfate is insoluble in water and forms a safe suspension for gastrointestinal imaging."
    },
    {
        "question": "Ohm's law of electric current is",
        "options": ["V=I/R", "V=IR", "I=VR", "None of the above"],
        "answer": "V=IR",
        "explanation": "Ohm's law states that voltage (V) equals current (I) multiplied by resistance (R)."
    },
    {
        "question": "According to Maxwell's electromagnetic theory",
        "options": ["light is magnetic wave", "Light is electrical wave", "Light is transverse electromagnetic wave", "All the above"],
        "answer": "Light is transverse electromagnetic wave",
        "explanation": "Maxwell's theory describes light as a propagating wave of oscillating electric and magnetic fields perpendicular to each other."
    },
    {
        "question": "Biliary contrast medium is",
        "options": ["Barium sulfate", "Iodipamide (Biligrafin)", "Sodium Iodide", "Gadolinium"],
        "answer": "Iodipamide (Biligrafin)",
        "explanation": "Contrast media such as iodipamide are specifically excreted by the liver into the biliary system, making them useful for biliary imaging."
    },
    {
        "question": "Basic elements of image intensifier are",
        "options": ["Input phosphor", "Accelerating anode", "Output phosphor", "All of the above"],
        "answer": "All of the above",
        "explanation": "An image intensifier tube utilizes an input phosphor, photocathode, electrostatic lenses (accelerating anode), and an output phosphor."
    },
    {
        "question": "Radiographic contrast depends on",
        "options": ["Type of film", "Intensifying screens", "Scatter radiations", "All the above"],
        "answer": "All the above",
        "explanation": "Image contrast is influenced by the film characteristic curve, the presence of intensifying screens, and the amount of scatter reaching the receptor."
    },
    {
        "question": "Walls of radiography room should be lined with",
        "options": ["Tin", "Iron", "Lead", "Copper"],
        "answer": "Lead",
        "explanation": "Lead has a high atomic number and density, making it an excellent material for absorbing scattered X-rays and shielding rooms."
    },
    {
        "question": "Penetration power of radiograph is increased by",
        "options": ["Increasing kVp", "Increasing mAs", "Decreasing kVp", "Increasing exposure time"],
        "answer": "Increasing kVp",
        "explanation": "Increasing the kilovoltage peak (kVp) increases the average energy of the X-ray beam, enhancing its penetrating ability."
    },
    {
        "question": "Ear is located in",
        "options": ["Frontal bone", "Parietal bone", "Temporal bone", "Occipital bone"],
        "answer": "Temporal bone",
        "explanation": "The middle and inner ear structures are housed within the petrous portion of the temporal bone."
    },
    {
        "question": "Length of ureter is",
        "options": ["40 cm", "5 cm", "25 cm", "15 cm"],
        "answer": "25 cm",
        "explanation": "The human ureters are muscular tubes typically measuring about 25 to 30 cm in length."
    },
    {
        "question": "Adam's apple is due to prominence of",
        "options": ["Thyroid cartilage", "Cricoid cartilage", "Arytenoid", "Epiglottis"],
        "answer": "Thyroid cartilage",
        "explanation": "The laryngeal prominence, or Adam's apple, is formed by the angle of the thyroid cartilage."
    },
    {
        "question": "Working distance of safe light to the film should not be less than",
        "options": ["1.2 metres", "None of the above", "9 metres", "3 metres"],
        "answer": "1.2 metres",
        "explanation": "To prevent film fogging, safelights are typically mounted at least 1.2 meters (about 4 feet) away from the working surface."
    },
    {
        "question": "All are advantages of spiral CT except",
        "options": ["No motion artifact", "Improves lesion detection", "Multiplanar image", "Increase image noise"],
        "answer": "Increase image noise",
        "explanation": "Spiral CT generally decreases motion artifacts and allows multiplanar reconstructions, but it does not inherently aim to increase image noise."
    },
    {
        "question": "Heart of MRI system is",
        "options": ["Shim coils", "Computer", "Gradient coils", "Magnet"],
        "answer": "Magnet",
        "explanation": "The primary static magnetic field generated by the main magnet is the fundamental component required for MRI."
    },
    {
        "question": "Father of Computed Tomography is",
        "options": ["Curie", "WC Roentgen", "Robert Koch", "Godfrey Hounsfield"],
        "answer": "Godfrey Hounsfield",
        "explanation": "Sir Godfrey Hounsfield was the principal inventor of the first clinical CT scanner."
    },
    {
        "question": "Wattage of bulb in safe light should be less than",
        "options": ["100 watts", "30 watts", "50 watts", "15 watts"],
        "answer": "15 watts",
        "explanation": "Safelight bulbs are kept at low wattages, typically 15 watts, to minimize the risk of fogging the photosensitive film."
    },
    {
        "question": "Heart of X-ray film is",
        "options": ["Developer", "Base", "Substratum", "Emulsion"],
        "answer": "Emulsion",
        "explanation": "The emulsion layer contains the silver halide crystals, which are responsible for capturing the latent image."
    },
    {
        "question": "Automatic film processors have all advantages except",
        "options": ["Shortened processing time", "Improves quality", "Increases capacity of radiology dept", "Temperature regulation is variable"],
        "answer": "Temperature regulation is variable",
        "explanation": "Automatic processors rely on precise, consistent temperature regulation, not variable regulation, to ensure uniform film quality."
    },
    {
        "question": "All are components of fixer except",
        "options": ["Hydroquinone", "Sodium thiosulphate", "Sodium sulphite", "Water"],
        "answer": "Hydroquinone",
        "explanation": "Hydroquinone is a reducing agent found in the developer, whereas the fixer primarily contains clearing agents like sodium thiosulphate."
    },
    {
        "question": "Use of hyoscine N Butylbromide (Buscopan) is contraindicated in",
        "options": ["Pain abdomen", "Bowel spasm", "For adequate distension of bowel", "Severe Prostatism"],
        "answer": "Severe Prostatism",
        "explanation": "Buscopan has anticholinergic effects that can cause urinary retention, making it contraindicated in patients with severe prostatism."
    }
]

output = []
for idx, item in enumerate(data, start=1):
    options = item["options"].copy()
    random.shuffle(options)
    correct_idx = options.index(item["answer"])
    output.append({
        "id": f"p4_q{idx}",
        "question": item["question"],
        "options": options,
        "correctAnswer": correct_idx,
        "explanation": item["explanation"]
    })

with open("p4_chunk1.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2)

print("Successfully written 50 questions to p4_chunk1.json")
