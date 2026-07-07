import json
import random

questions_raw = [
    # GK - Books & Authors, Awards & Honors (5)
    ("Non-Core", "Who is the author of the Booker Prize-winning novel 'The God of Small Things'?", "Arundhati Roy", ["Jhumpa Lahiri", "Salman Rushdie", "Kiran Desai"], "She won the Booker Prize in 1997 for this novel."),
    ("Non-Core", "Who was the first Indian citizen to be awarded the Nobel Prize?", "Rabindranath Tagore", ["C. V. Raman", "Mother Teresa", "Amartya Sen"], "Rabindranath Tagore won the Nobel Prize in Literature in 1913."),
    ("Non-Core", "The bestselling book 'A Brief History of Time' was authored by:", "Stephen Hawking", ["Carl Sagan", "Neil deGrasse Tyson", "Albert Einstein"], "Stephen Hawking published this landmark book on cosmology in 1988."),
    ("Non-Core", "Which is the highest civilian award in the Republic of India?", "Bharat Ratna", ["Padma Vibhushan", "Param Vir Chakra", "Ashoka Chakra"], "Instituted in 1954, Bharat Ratna is the highest civilian award."),
    ("Non-Core", "The 'Saraswati Samman' is an annual award given for outstanding prose or poetry in which field?", "Literature", ["Music", "Journalism", "Sports"], "It is an annual award for outstanding literary work in any Indian language."),

    # Quant - Tables/Graphs, Profit/Loss (5)
    ("Non-Core", "If a trader makes a profit of 20% on a selling price of Rs. 120, what is the cost price?", "Rs. 100", ["Rs. 96", "Rs. 144", "Rs. 80"], "Selling Price = CP * 1.20 => 120 = CP * 1.2 => CP = 100."),
    ("Non-Core", "An article is bought for Rs. 400 and sold for Rs. 500. What is the profit percentage?", "25%", ["20%", "15%", "30%"], "Profit = 500 - 400 = 100. Profit % = (100 / 400) * 100 = 25%."),
    ("Non-Core", "In a pie chart, if a total of 1000 items is represented by 360 degrees, how many degrees would represent 250 items?", "90 degrees", ["60 degrees", "120 degrees", "45 degrees"], "250 is 1/4th of 1000. 1/4th of 360 degrees is 90 degrees."),
    ("Non-Core", "Successive discounts of 10% and 20% are equivalent to a single discount of:", "28%", ["30%", "25%", "32%"], "Effective discount = X + Y - (X*Y)/100 = 10 + 20 - (200)/100 = 30 - 2 = 28%."),
    ("Non-Core", "A vendor sells 5 lemons for a rupee, gaining 20%. How many did he buy for a rupee?", "6", ["4", "5", "7"], "SP per lemon = 1/5. CP = SP / 1.2 = (1/5)/1.2 = 1/6. Thus, he bought 6 for a rupee."),

    # Computer - Hardware (5)
    ("Non-Core", "Which of the following is considered an output device?", "Monitor", ["Keyboard", "Mouse", "Scanner"], "A monitor displays data, making it an output device."),
    ("Non-Core", "Which component is often referred to as the 'brain' of the computer?", "CPU", ["RAM", "Hard Drive", "Motherboard"], "The Central Processing Unit (CPU) processes instructions and data."),
    ("Non-Core", "What does 'RAM' stand for in computer hardware?", "Random Access Memory", ["Read Access Memory", "Rapid Action Memory", "Random Array Memory"], "RAM provides temporary storage for active data."),
    ("Non-Core", "Which of these hardware components provides non-volatile permanent storage?", "Hard Disk Drive (HDD)", ["Cache", "RAM", "Register"], "HDDs and SSDs store data permanently, unlike volatile RAM."),
    ("Non-Core", "A printed circuit board that holds the CPU, memory, and connectors for peripherals is called the:", "Motherboard", ["SMPS", "Graphics Card", "Network Interface Card"], "The motherboard is the main backbone of a computer."),

    # English / Logic (5)
    ("Non-Core", "Choose the correct synonym for 'Amiable':", "Friendly", ["Hostile", "Rude", "Arrogant"], "'Amiable' means having a friendly and pleasant manner."),
    ("Non-Core", "Identify the antonym for 'Obscure':", "Clear", ["Hidden", "Vague", "Dark"], "'Obscure' means not easily understood or clear; its opposite is clear."),
    ("Non-Core", "Find the next number in the series: 2, 6, 12, 20, ?", "30", ["24", "28", "36"], "The differences are 4, 6, 8, so the next difference is 10. 20 + 10 = 30. (Also 1x2, 2x3, 3x4, 4x5, 5x6)."),
    ("Non-Core", "Pointing to a man, a woman said, 'He is the only son of my mother\\'s mother.' How is the woman related to the man?", "Niece", ["Sister", "Daughter", "Aunt"], "Mother's mother is the grandmother. The grandmother's only son is the woman's maternal uncle. Thus, she is his niece."),
    ("Non-Core", "Find the odd one out among the following:", "Wood", ["Iron", "Copper", "Zinc"], "Iron, Copper, and Zinc are metals. Wood is a non-metal/organic material."),

    # Core - Radiotherapy Equipment (Linac, Cobalt-60) (15)
    ("Radiotherapy", "What is the approximate half-life of Cobalt-60 used in teletherapy machines?", "5.27 years", ["10.5 years", "30 years", "74 days"], "Cobalt-60 decays with a half-life of approximately 5.27 years."),
    ("Radiotherapy", "In a Medical Linear Accelerator (LINAC), which particle is primarily accelerated down the waveguide?", "Electrons", ["Protons", "Neutrons", "Alpha particles"], "LINACs accelerate electrons which can be used directly or hit a target to produce X-rays."),
    ("Radiotherapy", "During its decay process, a Cobalt-60 source emits two primary gamma rays. What are their energies?", "1.17 MeV and 1.33 MeV", ["0.66 MeV and 1.25 MeV", "140 keV and 364 keV", "5.27 MeV and 6.0 MeV"], "Cobalt-60 emits two discrete gamma photons of 1.17 MeV and 1.33 MeV."),
    ("Radiotherapy", "Which component of a high-energy LINAC is responsible for generating microwave power?", "Magnetron or Klystron", ["Thyratron", "Electron gun", "Bending magnet"], "Magnetrons and Klystrons generate or amplify the microwaves needed to accelerate electrons."),
    ("Radiotherapy", "What is the function of the flattening filter in a LINAC X-ray beam?", "To make the X-ray beam intensity uniform across the field", ["To spread the electron beam", "To filter out high-energy photons", "To reduce the source size"], "The flattening filter attenuates the forward-peaked X-ray beam to create a uniform dose distribution."),
    ("Radiotherapy", "Which term refers to radiation treatment delivered by placing radioactive sources directly inside or next to the tumor?", "Brachytherapy", ["Teletherapy", "Teleradiology", "Stereotactic Radiosurgery"], "Brachytherapy implies short-distance treatment using sealed radioactive sources."),
    ("Radiotherapy", "The standard Source to Axis Distance (SAD) or isocenter distance for modern LINACs is typically:", "100 cm", ["80 cm", "60 cm", "120 cm"], "Modern LINACs use a 100 cm isocenter distance, unlike older Cobalt units which used 80 cm."),
    ("Radiotherapy", "Why does a Cobalt-60 teletherapy beam typically have a larger geometric penumbra than a LINAC beam?", "Larger physical source size", ["Lower beam energy", "Shorter SSD", "Thicker collimator jaws"], "The physical diameter of a Co-60 source (1-2 cm) creates a larger geometric penumbra than the tiny focal spot of a LINAC."),
    ("Radiotherapy", "What component is inserted into the beam path when a LINAC is set to electron mode?", "Scattering foil", ["Flattening filter", "Target", "Multileaf collimator"], "The scattering foil broadens the pencil-thin electron beam to a clinically useful size."),
    ("Radiotherapy", "The individual leaves of a Multileaf Collimator (MLC) in a LINAC are primarily constructed of which material?", "Tungsten", ["Lead", "Aluminum", "Copper"], "Tungsten alloys are used because of their high density and lower toxicity compared to lead."),
    ("Radiotherapy", "What does the bending magnet in a LINAC do?", "Redirects the electron beam toward the patient (often 90 or 270 degrees)", ["Accelerates the electrons", "Produces X-rays", "Generates microwaves"], "In high-energy LINACs, a bending magnet bends the horizontal electron beam vertically toward the treatment head."),
    ("Radiotherapy", "Which technology is characteristic of the Gamma Knife system for stereotactic radiosurgery?", "Multiple Cobalt-60 sources arranged in a hemisphere", ["A miniaturized LINAC on a robotic arm", "Proton beam Bragg peak modulation", "Iridium-192 HDR afterloader"], "Gamma Knife utilizes up to 192 highly collimated Cobalt-60 sources focused on a single point."),
    ("Radiotherapy", "In radiotherapy planning, the Gross Tumor Volume (GTV) defines:", "The visible or palpable extent of the malignant growth", ["The microscopic spread of the tumor", "The area accounting for patient setup errors", "The region encompassing organ motion"], "GTV is the demonstrable extent and location of the tumor."),
    ("Radiotherapy", "Which dosimetric term describes the depth in tissue at which the maximum absorbed dose (Dmax) occurs?", "Depth of dose maximum (z_max)", ["Half Value Layer (HVL)", "Percent Depth Dose (PDD)", "Isodose line"], "Dmax occurs deeper in the tissue as beam energy increases (e.g., ~1.5 cm for 6 MV)."),
    ("Radiotherapy", "Which imaging modality is physically integrated into a modern LINAC for Image-Guided Radiation Therapy (IGRT)?", "Cone Beam CT (CBCT)", ["Nuclear Medicine Gamma Camera", "Diagnostic Ultrasound", "Standard Multislice Spiral CT"], "kV or MV Cone Beam CT is mounted on the LINAC gantry to verify patient position before treatment."),

    # Core - Interventional Radiology & Drugs (15)
    ("Interventional", "What is the primary indication for placing an Inferior Vena Cava (IVC) filter?", "To prevent pulmonary embolism", ["To treat portal hypertension", "To bypass an aortic aneurysm", "To dissolve deep vein thrombosis"], "IVC filters catch blood clots traveling from the legs before they reach the lungs."),
    ("Interventional", "The Seldinger technique is fundamentally used for:", "Safe percutaneous access to blood vessels or hollow organs", ["Surgical exposure of arteries", "Open heart bypass grafting", "Non-invasive vascular imaging"], "It involves puncture with a needle, inserting a guidewire, removing the needle, and passing a catheter over the wire."),
    ("Interventional", "Which type of contrast medium is considered the standard for modern Digital Subtraction Angiography (DSA) due to lower reaction rates?", "Non-ionic, low-osmolar iodinated contrast", ["High-osmolar ionic iodinated contrast", "Barium sulfate suspension", "Paramagnetic gadolinium contrast"], "Non-ionic low-osmolar contrast media provide a better safety profile for intravascular use."),
    ("Interventional", "Transcatheter arterial embolization is a procedure designed to:", "Intentionally block a blood vessel", ["Dilate a narrowed artery", "Extract a blood clot", "Provide a pathway for venous blood"], "Embolization cuts off blood supply to tumors, aneurysms, or bleeding sites."),
    ("Interventional", "During complex angiographic procedures, Heparin is routinely administered to:", "Prevent blood clot formation on catheters and wires", ["Dissolve existing arterial plaque", "Increase the patient\\'s blood pressure", "Induce local anesthesia"], "Heparin is a powerful anticoagulant used to prevent procedure-related thrombosis."),
    ("Interventional", "In the event of a Heparin overdose during an intervention, which drug acts as a reversal agent?", "Protamine sulfate", ["Vitamin K", "Naloxone", "Flumazenil"], "Protamine sulfate specifically binds to and neutralizes heparin."),
    ("Interventional", "A 'Pigtail' catheter is uniquely shaped at its tip and is primarily used for:", "High-volume contrast injections in large vessels like the aorta", ["Selective micro-catheterization of brain aneurysms", "Biliary fluid drainage", "Embolization of uterine fibroids"], "The looped tip prevents intimal damage and stabilizes the catheter during high-pressure power injections."),
    ("Interventional", "A Transjugular Intrahepatic Portosystemic Shunt (TIPS) is most commonly performed to treat:", "Complications of portal hypertension (e.g., variceal bleeding)", ["Hepatocellular carcinoma", "Pulmonary embolism", "Renal artery stenosis"], "TIPS creates an artificial pathway connecting the portal vein to the hepatic vein to relieve pressure."),
    ("Interventional", "What imaging feature of a fluoroscopy C-arm is essential for real-time catheter tracking in DSA?", "Pulsed fluoroscopy with digital subtraction", ["High-kVp static spot filming", "T1-weighted image acquisition", "Tomosynthesis"], "Real-time subtraction allows clear visualization of contrast-filled vessels without bone interference."),
    ("Interventional", "Percutaneous Transluminal Angioplasty (PTA) uses which device to dilate stenotic vessels?", "Balloon catheter", ["Stent-graft", "Embolization coil", "IVC Filter"], "A balloon is inflated at the site of narrowing to stretch the vessel open."),
    ("Interventional", "Which emergency drug must be immediately available for treating a severe anaphylactic reaction to contrast media?", "Epinephrine (Adrenaline)", ["Atropine", "Lidocaine", "Amiodarone"], "Epinephrine is the first-line treatment for life-threatening anaphylaxis."),
    ("Interventional", "In an interventional setting, what does PTBD stand for?", "Percutaneous Transhepatic Biliary Drainage", ["Percutaneous Transluminal Balloon Dilation", "Peripheral Thromboembolic Bypass Device", "Primary Tumor Biopsy Diagnosis"], "PTBD is used to decompress an obstructed biliary tree."),
    ("Interventional", "Endovascular aneurysm repair (EVAR) typically involves the deployment of a:", "Stent-graft", ["Bare metal stent", "Platinum coil", "Detachable balloon"], "A stent-graft bridges the aneurysm sac, relining the vessel to prevent rupture."),
    ("Interventional", "In DSA, what is the 'Roadmapping' technique?", "Overlaying a peak opacification frame onto live fluoroscopy to guide wires", ["Creating a 3D model of the vascular tree", "Tracking the radiation dose to the patient", "Synchronizing the contrast injection with ECG"], "Roadmapping provides a static contrast outline over which live wire navigation can be seen."),
    ("Interventional", "Which drug is categorized as a thrombolytic ('clot-buster') commonly infused directly into a clot during catheter-directed thrombolysis?", "Tissue Plasminogen Activator (tPA, Alteplase)", ["Warfarin", "Heparin", "Aspirin"], "tPA actively dissolves existing blood clots, unlike anticoagulants which only prevent new ones."),

    # Core - Foundation English / Medical Terminology (10)
    ("English", "In medical terminology, the prefix 'dys-' as seen in 'dyspnea' means:", "Difficult, painful, or abnormal", ["Fast or rapid", "Without or absent", "Slow"], "'Dys-' means bad, difficult, or painful. Dyspnea is difficulty breathing."),
    ("English", "The suffix '-ectomy', as in appendectomy, signifies:", "Surgical removal or excision", ["Surgical repair", "Incision or cutting into", "Visual examination"], "Ectomy indicates the surgical removal of an anatomical structure."),
    ("English", "The root word 'hepat/o' specifically refers to the:", "Liver", ["Kidney", "Heart", "Stomach"], "Words like hepatitis (inflammation of the liver) derive from this root."),
    ("English", "A patient presenting with 'Tachycardia' has a:", "Rapid heart rate", ["Slow breathing rate", "High blood pressure", "Low body temperature"], "Tachy- means fast, -cardia refers to the heart."),
    ("English", "Which term refers to the surgical creation of an artificial opening into the colon?", "Colostomy", ["Colectomy", "Colonoscopy", "Colotomy"], "The suffix '-stomy' means to create an artificial opening (stoma)."),
    ("English", "The abbreviation 'NPO' commonly seen in radiology preparation orders stands for:", "Nothing by mouth", ["New patient order", "No physical overexertion", "Normal physiological output"], "Nil per os (NPO) means withholding oral intake."),
    ("English", "In anatomical orientation, the term 'Anterior' or 'Ventral' refers to:", "Toward the front of the body", ["Toward the back of the body", "Away from the midline", "Closer to the point of attachment"], "Anterior means situated at or directed toward the front."),
    ("English", "The root 'nephr/o' and 'ren/o' both relate to which organ?", "Kidney", ["Lung", "Brain", "Bladder"], "Nephropathy or renal disease refers to kidney pathology."),
    ("English", "What does the prefix 'hypo-' signify in terms like 'hypotension'?", "Below, deficient, or under", ["Above, excessive, or beyond", "Around or surrounding", "Within or inside"], "Hypotension means low blood pressure."),
    ("English", "The suffix '-itis', commonly seen in words like 'arthritis', denotes:", "Inflammation", ["Infection", "Degeneration", "Enlargement"], "It strictly implies inflammation, which may or may not be due to infection."),

    # Core - Advanced Radiographic Techniques (CT, MRI) (20)
    ("Advanced Imaging", "In MRI, the parameter 'TR' stands for:", "Repetition Time", ["Time of Relaxation", "Transmission Ratio", "Thermal Recovery"], "TR is the time between successive RF excitation pulses applied to the same slice."),
    ("Advanced Imaging", "The introduction of slip-ring technology in CT scanners was the critical advancement that enabled:", "Helical/Spiral scanning", ["High-resolution CT (HRCT)", "Dual-energy CT", "Electron beam CT"], "Slip rings allowed continuous gantry rotation without tangled cables, permitting helical acquisition."),
    ("Advanced Imaging", "By definition, the Hounsfield Unit (HU) value of distilled water in CT is exactly:", "0", ["-1000", "+1000", "100"], "The CT number scale is normalized so that water is 0 HU and air is -1000 HU."),
    ("Advanced Imaging", "In an MRI image, T1 relaxation time primarily reflects:", "Longitudinal magnetization recovery", ["Transverse magnetization decay", "Proton density distribution", "Magnetic field inhomogeneity"], "T1 is the spin-lattice relaxation time governing longitudinal recovery."),
    ("Advanced Imaging", "Which artifact in CT is characterized by a misregistration of anatomy due to patient breathing or movement?", "Motion artifact (Ghosting / Blurring)", ["Ring artifact", "Beam hardening artifact", "Partial volume artifact"], "Patient motion creates blurring or ghosting in the direction of movement."),
    ("Advanced Imaging", "In a standard Spin Echo MRI sequence, which parameter primarily controls T2 weighting?", "Time to Echo (TE)", ["Repetition Time (TR)", "Flip angle", "Inversion Time (TI)"], "A long TE allows differences in T2 relaxation times between tissues to become apparent."),
    ("Advanced Imaging", "In helical CT, 'Pitch' is mathematically defined as:", "Table travel per rotation divided by total beam collimation width", ["Gantry rotation speed multiplied by kVp", "Slice thickness divided by matrix size", "Detector array width divided by table speed"], "Pitch relates the table feed to the beam width. Pitch = 1 means contiguous spirals."),
    ("Advanced Imaging", "The presence of a metallic implant (e.g., hip prosthesis) in an MRI scanner typically causes severe:", "Susceptibility artifact", ["Chemical shift artifact", "Aliasing (Wrap-around) artifact", "Cross-talk artifact"], "Metal severely distorts the local magnetic field, causing geometric distortion and signal loss."),
    ("Advanced Imaging", "To improve the Signal-to-Noise Ratio (SNR) when imaging small superficial structures like the TMJ in MRI, what is typically used?", "A local Surface coil", ["A whole-body volume coil", "Higher SAR levels", "Faster gradient slew rates"], "Surface coils pick up higher signal from superficial tissues while limiting noise from deeper structures."),
    ("Advanced Imaging", "A CT window setting with a Window Width of 1500 HU and a Window Level of -600 HU is optimized for viewing:", "Lung parenchyma", ["Bone", "Brain tissue", "Liver"], "Wide width and highly negative level are standard for viewing lungs."),
    ("Advanced Imaging", "Functional MRI (fMRI) brain mapping relies primarily on which physiological effect?", "Blood Oxygenation Level Dependent (BOLD) contrast", ["Cerebrospinal fluid flow dynamics", "Gadolinium first-pass perfusion", "Glucose metabolism rate"], "BOLD contrast measures differences in magnetic properties of oxygenated vs deoxygenated hemoglobin."),
    ("Advanced Imaging", "Which technique is most effective in reducing Partial Volume Averaging artifact in CT?", "Using thinner slice thicknesses", ["Decreasing the kVp", "Increasing the pitch", "Using a smoothing reconstruction filter"], "Thinner slices reduce the chance of distinct tissues occupying the same voxel."),
    ("Advanced Imaging", "Clinical MRI relies almost exclusively on the nuclear magnetic resonance of which nucleus?", "Hydrogen (Protons)", ["Carbon-13", "Sodium-23", "Phosphorus-31"], "Hydrogen is extremely abundant in the human body (water and fat) and yields the strongest MR signal."),
    ("Advanced Imaging", "CT Angiography (CTA) typically requires precise timing of data acquisition relative to:", "The intravenous injection of an iodinated contrast bolus", ["The patient\\'s cardiac cycle (ECG) only", "The patient\\'s respiratory cycle only", "Oral barium administration"], "Data must be acquired when target vessels are maximally opacified by the contrast bolus."),
    ("Advanced Imaging", "In MRI safety, the Specific Absorption Rate (SAR) limits are monitored to prevent:", "Excessive tissue heating from RF energy deposition", ["Nerve stimulation from gradient switching", "Projectile accidents from the static field", "Acoustic damage to hearing"], "SAR measures the RF energy absorbed by the body, which converts to heat."),
    ("Advanced Imaging", "Increasing the mAs in a CT scan directly results in:", "Decreased image noise and increased patient dose", ["Increased spatial resolution", "Decreased scan time", "Increased beam hardening"], "Higher mAs means more photons, reducing quantum mottle (noise) but increasing the radiation dose."),
    ("Advanced Imaging", "What does the term 'Isocenter' refer to in a CT or MRI scanner?", "The physical center of the gantry aperture where x, y, z coordinates are zero", ["The point of maximum radiation dose", "The edge of the patient table", "The detector array focal point"], "Isocenter is the geometric center of the scanning bore."),
    ("Advanced Imaging", "If the Field of View (FOV) is decreased while maintaining the same matrix size in MRI, what happens to spatial resolution?", "Spatial resolution increases", ["Spatial resolution decreases", "Spatial resolution remains unchanged", "SNR significantly increases"], "Smaller FOV with same matrix means smaller pixels, hence higher spatial resolution (though SNR will drop)."),
    ("Advanced Imaging", "In the context of a superconducting MRI system, a 'Quench' refers to:", "The rapid boiling off of cryogens leading to sudden loss of the magnetic field", ["A routine calibration of the RF coils", "The cancellation of gradient noise", "A controlled RF pulse sequence stop"], "Quenching is an emergency or accidental event where liquid helium violently turns to gas, shutting down the magnet."),
    ("Advanced Imaging", "Dual-Energy CT (DECT) acquires images at two different kVp levels to allow for:", "Material decomposition (e.g., differentiating iodine from calcium)", ["Faster scan times than single-energy CT", "Elimination of motion artifacts", "Imaging without any radiation dose"], "Tissues attenuate differently at different energies, allowing algorithms to separate materials like iodine, bone, and uric acid."),

    # Core - Other Core Topics (Physics, Positioning, Anatomy, Darkroom/DR/Safety) (20)
    ("Anatomy", "Which anatomical plane divides the body into equal right and left halves?", "Midsagittal plane", ["Coronal plane", "Transverse plane", "Oblique plane"], "The midsagittal or median plane bisects the body vertically."),
    ("Physics", "The Inverse Square Law dictates that if the distance from an X-ray source is doubled, the radiation intensity becomes:", "One-fourth (1/4) of the original", ["Half (1/2) of the original", "Double the original", "One-eighth (1/8) of the original"], "Intensity is inversely proportional to the square of the distance. (1/2)^2 = 1/4."),
    ("Radiography", "What is the primary function of an intensifying screen in a conventional film-screen cassette?", "To convert X-ray energy into visible light to expose the film, reducing patient dose", ["To filter out low-energy scatter radiation", "To increase the spatial resolution of the image", "To protect the film from humidity"], "Screens emit light when struck by X-rays, exposing the film much faster than X-rays alone."),
    ("Anatomy", "Which carpal bone is located in the anatomical snuffbox and is the most commonly fractured wrist bone?", "Scaphoid", ["Lunate", "Trapezium", "Pisiform"], "The scaphoid is highly susceptible to fracture from falls on an outstretched hand."),
    ("Positioning", "The 'Camp Coventry' or 'Holmblad' method is specifically used to demonstrate the:", "Intercondylar fossa of the knee", ["Patellofemoral joint space", "Proximal tibiofibular joint", "Ankle mortise"], "These are 'tunnel views' to see the notch between the femoral condyles."),
    ("Anatomy", "The innermost lining of the heart chambers is called the:", "Endocardium", ["Myocardium", "Epicardium", "Pericardium"], "The endocardium lines the heart chambers and valves."),
    ("Physics", "According to AERB/ICRP standards, X-ray tubes operating above 70 kVp must have a minimum total filtration of:", "2.5 mm Aluminum equivalent", ["1.5 mm Aluminum equivalent", "0.5 mm Lead equivalent", "3.0 mm Copper equivalent"], "2.5 mm Al is standard to remove low-energy photons that only contribute to skin dose."),
    ("Radiography", "If a patient is suspected of having a gastrointestinal perforation, which contrast medium should be used instead of barium sulfate?", "Water-soluble iodinated contrast (e.g., Gastrografin)", ["Gadolinium", "Air contrast only", "Lipiodol"], "Barium in the peritoneal cavity causes severe peritonitis, whereas water-soluble contrast is absorbed."),
    ("Radiography", "In Computed Radiography (CR), the active layer of the imaging plate contains:", "Photostimulable phosphors (e.g., Barium fluorohalide)", ["Amorphous selenium", "Silver halide crystals", "Cesium iodide scintillators"], "These phosphors trap electrons upon exposure, which are later released as light when scanned by a laser."),
    ("Physics", "Which fundamental interaction of X-rays with tissue is responsible for producing the majority of scatter radiation that degrades image contrast?", "Compton effect (scattering)", ["Photoelectric effect", "Coherent (Classical) scattering", "Pair production"], "Compton scattering diverts photons in new directions, causing image fog."),
    ("Positioning", "For a standard PA projection of the chest, the patient should be instructed to hold their breath at the end of:", "The second full inspiration", ["Normal expiration", "The first deep inspiration", "Forced expiration"], "A second breath generally results in a deeper inspiration, showing more ribs above the diaphragm."),
    ("Positioning", "When positioning for an AP projection of the pelvis, the central ray is directed midway between the Anterior Superior Iliac Spine (ASIS) and the:", "Symphysis pubis", ["Greater trochanter", "Iliac crest", "Ischial tuberosity"], "This midpoint reliably centers the pelvic ring on the image receptor."),
    ("Radiography", "In a traditional darkroom handling green-sensitive (orthochromatic) X-ray film, what color safelight filter must be used?", "Red (e.g., GBX-2)", ["Amber", "Blue", "Green"], "Green-sensitive film will be fogged by amber/brown lights; it requires a deep red filter."),
    ("Radiography", "The primary active ingredient in X-ray film developer is a:", "Reducing agent (e.g., Phenidone/Hydroquinone)", ["Clearing agent (e.g., Ammonium thiosulfate)", "Hardening agent (e.g., Glutaraldehyde)", "Preservative (e.g., Sodium sulfite)"], "Developers reduce exposed silver halide crystals into black metallic silver."),
    ("Radiography", "What is the primary function of the fixer solution in film processing?", "To clear away unexposed, undeveloped silver halide crystals", ["To convert exposed silver crystals to black metallic silver", "To swell the emulsion for washing", "To increase image contrast"], "Fixing makes the image permanent by removing light-sensitive crystals that weren't exposed."),
    ("Radiography", "In Direct-Conversion Digital Radiography (DR) flat-panel detectors, which material acts as the photoconductor to convert X-rays directly into an electrical charge?", "Amorphous Selenium (a-Se)", ["Amorphous Silicon (a-Si)", "Cesium Iodide (CsI)", "Gadolinium Oxysulfide"], "Direct DR uses a-Se, while indirect DR uses a scintillator (CsI) plus a photodiode (a-Si)."),
    ("Physics", "Calculate the grid ratio if the lead strips are 2.4 mm high and the radiolucent interspace material is 0.3 mm wide.", "8:1", ["6:1", "10:1", "12:1"], "Grid Ratio = Height / Width (h/D). 2.4 / 0.3 = 8."),
    ("Radiography", "Utilizing a high kVp technique (e.g., 120 kVp) in chest radiography typically results in an image characterized by:", "Long scale contrast (low contrast)", ["Short scale contrast (high contrast)", "High patient skin dose", "Increased quantum mottle"], "High kVp produces more penetration and scatter, giving many shades of gray (long scale)."),
    ("Safety", "Which device is most widely used by radiographers in India for personal occupational radiation monitoring?", "Thermoluminescent Dosimeter (TLD) badge", ["Geiger-Muller counter", "Pocket ionization chamber", "Film badge"], "TLD badges (often using CaSO4:Dy) are the standard issued by AERB/BARC for personnel monitoring."),
    ("Safety", "According to the 'ALARA' principle in radiation protection, what are the three cardinal rules?", "Time, Distance, and Shielding", ["kVp, mAs, and Filtration", "Collimation, Grids, and Screens", "Dose, Frequency, and Output"], "Minimizing time, maximizing distance, and utilizing shielding are the foundations of radiation safety.")
]

def format_question(idx, type_, text, correct_ans, wrong_opts, exp):
    opts = wrong_opts + [correct_ans]
    random.shuffle(opts)
    ans_idx = opts.index(correct_ans)
    
    return f'{{ "type": "{type_}", "text": "{text}", "opts": {json.dumps(opts)}, "ans": {ans_idx}, "exp": "{exp}" }}'

raw_data_str = ",\n                ".join([format_question(i, *q) for i, q in enumerate(questions_raw)])

html_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AIIMS CRE Radiographer - Test Paper 22</title>
    <style>
        :root {{
            --header-bg: #3f51b5;
            --header-text: #fff;
            --panel-bg: #f5f5f5;
            --pallet-answered: #4caf50;
            --pallet-not-answered: #f44336;
            --pallet-review: #9c27b0;
            --pallet-not-visited: #e0e0e0;
        }}

        * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; }}
        body {{ height: 100vh; display: flex; flex-direction: column; overflow: hidden; background: #fff; }}

        /* --- Header --- */
        header {{
            background: var(--header-bg); color: var(--header-text);
            padding: 10px 20px; display: flex; justify-content: space-between; align-items: center;
            height: 60px; flex-shrink: 0;
        }}
        .timer {{ font-size: 1.2rem; font-weight: bold; background: #fff; color: #d32f2f; padding: 5px 15px; border-radius: 4px; border: 2px solid #d32f2f; }}

        /* --- Main Layout --- */
        .main-container {{ display: flex; flex: 1; overflow: hidden; }}
        
        .question-area {{ flex: 1; display: flex; flex-direction: column; padding: 20px; overflow-y: auto; }}
        .q-header {{ display: flex; justify-content: space-between; border-bottom: 2px solid #ddd; padding-bottom: 10px; margin-bottom: 15px; }}
        .q-text {{ font-size: 1.1rem; margin-bottom: 20px; line-height: 1.5; }}
        
        .options-container {{ display: flex; flex-direction: column; gap: 10px; }}
        .option-label {{ 
            display: flex; align-items: center; padding: 10px; border: 1px solid #ccc; border-radius: 5px; cursor: pointer; transition: 0.2s; 
        }}
        .option-label:hover {{ background: #f0f8ff; }}
        .option-label input {{ margin-right: 15px; transform: scale(1.2); }}

        /* Sidebar */
        .sidebar {{
            width: 320px; background: var(--panel-bg); border-left: 1px solid #ccc;
            display: flex; flex-direction: column; flex-shrink: 0;
        }}
        .user-info {{ padding: 10px; background: #e8eaf6; border-bottom: 1px solid #ccc; }}
        
        .palette-legend {{ padding: 10px; font-size: 0.8rem; display: grid; grid-template-columns: 1fr 1fr; gap: 5px; background: #fff; }}
        .legend-item {{ display: flex; align-items: center; gap: 5px; }}
        .dot {{ width: 12px; height: 12px; border-radius: 50%; display: inline-block; }}

        .question-grid {{ 
            padding: 10px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; 
            overflow-y: auto; flex: 1; align-content: start;
        }}
        .q-btn {{
            height: 35px; width: 35px; border: 1px solid #ccc; background: #fff; 
            border-radius: 4px; cursor: pointer; font-size: 0.9rem; font-weight: bold;
            display: flex; align-items: center; justify-content: center;
        }}
        
        .q-btn.answered {{ background: var(--pallet-answered); color: white; border-color: var(--pallet-answered); }}
        .q-btn.not-answered {{ background: var(--pallet-not-answered); color: white; border-color: var(--pallet-not-answered); }}
        .q-btn.review {{ background: var(--pallet-review); color: white; border-radius: 50%; }}
        .q-btn.current {{ border: 2px solid blue; box-shadow: 0 0 5px blue; }}
        .q-btn.locked {{ opacity: 0.4; cursor: not-allowed; background: #444 !important; color: #888; border: 1px solid #000; }}

        /* Footer */
        .footer-controls {{
            height: 60px; background: #fff; border-top: 1px solid #ccc;
            display: flex; align-items: center; justify-content: space-between; padding: 0 20px;
        }}
        .btn {{ padding: 8px 20px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 0.9rem; }}
        .btn-primary {{ background: #2196f3; color: white; }}
        .btn-success {{ background: #4caf50; color: white; }}
        .btn-warn {{ background: #ff9800; color: white; }}
        .btn-danger {{ background: #f44336; color: white; }}
        .btn:disabled {{ opacity: 0.6; cursor: not-allowed; }}

        /* Mobile */
        .mobile-toggle {{ display: none; background: none; border: none; color: white; font-size: 1.5rem; }}
        @media (max-width: 768px) {{
            .mobile-toggle {{ display: block; }}
            .sidebar {{ 
                position: absolute; right: 0; top: 60px; bottom: 60px; z-index: 100;
                transform: translateX(100%); transition: transform 0.3s; width: 85%;
            }}
            .sidebar.active {{ transform: translateX(0); }}
            .question-grid {{ grid-template-columns: repeat(6, 1fr); }}
            .footer-controls {{ flex-wrap: wrap; gap: 5px; height: auto; padding: 10px; }}
            .btn {{ flex: 1; padding: 8px; font-size: 0.8rem; }}
        }}

        /* Overlay */
        .overlay {{ position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #fff; z-index: 1000; display: flex; flex-direction: column; align-items: center; justify-content: center; }}
        .hidden {{ display: none !important; }}
        
        .review-panel {{ display: none; padding: 20px; height: 100%; overflow-y: auto; background:#f9f9f9;}}
        .review-item {{ margin-bottom: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 5px; background:white; }}
        .explanation {{ background: #fff3cd; padding: 10px; margin-top: 10px; font-size: 0.9rem; border-left: 4px solid #ffc107; }}

    </style>
</head>
<body>

    <div id="landingPage" class="overlay">
        <h1>AIIMS CRE - Test Paper 22</h1>
        <div style="width: 80%; max-width: 600px; text-align: left; margin: 20px 0;">
            <h3>Exam Rules:</h3>
            <ul>
                <li><strong>Questions:</strong> 100 (5 Sections of 20 questions each).</li>
                <li><strong>Timing:</strong> 18 Minutes per section (Strictly Dedicated).</li>
                <li><strong>Total Time:</strong> 90 Minutes.</li>
                <li><strong>Locking:</strong> Once 18 mins are up, or if you manually proceed to the next section, you <u>cannot</u> return to the previous section.</li>
                <li><strong>Marking:</strong> +4 Correct, -1 Incorrect.</li>
            </ul>
        </div>
        <button class="btn btn-success" style="font-size: 1.2rem;" onclick="startExam()">START EXAM</button>
    </div>

    <header id="examHeader" class="hidden">
        <div style="display:flex; align-items:center; gap:10px;">
            <h3>AIIMS Radiographer</h3>
            <span style="font-size:0.8rem; background:#eee; padding:2px 6px; border-radius:4px; color:#333;" id="sectionLabel">Section 1</span>
        </div>
        <div class="timer" id="timerDisplay">18:00</div>
        <button class="mobile-toggle" onclick="toggleSidebar()">☰</button>
    </header>

    <div class="main-container hidden" id="examBody">
        <div class="question-area">
            <div class="q-header">
                <span id="qNumDisplay">Question No. 1</span>
                <span style="color: #666;">Marks: +4, -1</span>
            </div>
            <div id="questionText" class="q-text">Loading...</div>
            <div id="optionsBox" class="options-container"></div>
        </div>

        <div class="sidebar" id="sidebar">
            <div class="user-info">
                <strong>Candidate Name</strong><br><small>Roll No: 123456</small>
            </div>
            <div class="palette-legend">
                <div class="legend-item"><span class="dot" style="background:var(--pallet-answered)"></span> Ans</div>
                <div class="legend-item"><span class="dot" style="background:var(--pallet-not-answered)"></span> Not Ans</div>
                <div class="legend-item"><span class="dot" style="background:var(--pallet-review)"></span> Review</div>
                <div class="legend-item"><span class="dot" style="background:#444"></span> Locked</div>
            </div>
            <div class="question-grid" id="questionPalette"></div>
            <div style="padding:10px; margin-top:auto;">
                <button class="btn btn-primary" style="width:100%" onclick="submitExam()">FINISH EXAM</button>
            </div>
        </div>
    </div>

    <div class="footer-controls hidden" id="examFooter">
        <div style="display:flex; gap:10px;">
            <button class="btn btn-danger" onclick="clearResponse()">Clear</button>
            <button class="btn btn-warn" onclick="markForReview()">Review</button>
        </div>
        <div style="display:flex; gap:10px;">
            <button class="btn" onclick="prevQuestion()" id="btnPrev">Previous</button>
            <button class="btn btn-success" onclick="saveAndNext()">Save & Next</button>
        </div>
    </div>

    <div id="resultPage" class="overlay hidden" style="display:block; overflow-y:auto; justify-content:start; padding-top:40px;">
        <h2 style="text-align:center;">Exam Summary</h2>
        <div id="scoreCard" style="margin: 20px auto; width:90%; max-width:600px; padding: 20px; border: 1px solid #ccc; text-align: center; background:#fff;"></div>
        <div style="display:flex; justify-content:center; gap:20px; margin-bottom:20px;">
            <button class="btn btn-primary" onclick="showDetailedReview()">Review Solutions</button>
            <button class="btn btn-danger" onclick="location.reload()">Exit</button>
        </div>
        <div id="detailedReview" class="review-panel" style="width: 90%; max-width: 800px; margin:0 auto;"></div>
    </div>

    <script>
        // --- CONFIGURATION ---
        const TOTAL_QUESTIONS = 100;
        const SECTION_SIZE = 20; // 20 questions per section
        const SECTION_TIME_LIMIT = 18 * 60; // 18 minutes in seconds
        
        let questions = [];

        function generateQuestions() {{
            const createQ = (id, type, text, opts, ans, exp) => ({{ id, type, text, opts, ans, exp }});
            questions = []; // Reset array

            const raw_data = [
                {raw_data_str}
            ];
            
            raw_data.forEach((d, i) => questions.push(createQ(i + 1, d.type, d.text, d.opts, d.ans, d.exp)));
        }}

        // --- STATE MANAGEMENT ---
        let state = JSON.parse(localStorage.getItem('test_paper_22_state')) || {{
            currentQ: 0,
            answers: new Array(TOTAL_QUESTIONS).fill(null),
            status: new Array(TOTAL_QUESTIONS).fill('not-visited'),
            currentSection: 1,      // 1 to 5
            sectionTimeLeft: SECTION_TIME_LIMIT,
            maxSetReached: 1,       // Tracks highest section unlocked
            isFinished: false
        }};

        function saveState() {{
            localStorage.setItem('test_paper_22_state', JSON.stringify(state));
        }}

        const els = {{
            landing: document.getElementById('landingPage'),
            header: document.getElementById('examHeader'),
            body: document.getElementById('examBody'),
            footer: document.getElementById('examFooter'),
            result: document.getElementById('resultPage'),
            qText: document.getElementById('questionText'),
            optsBox: document.getElementById('optionsBox'),
            qNum: document.getElementById('qNumDisplay'),
            sectionLabel: document.getElementById('sectionLabel'),
            palette: document.getElementById('questionPalette'),
            timer: document.getElementById('timerDisplay'),
            btnPrev: document.getElementById('btnPrev'),
            sidebar: document.getElementById('sidebar')
        }};

        let timerInterval;

        function init() {{
            generateQuestions(); // Load data
            
            if (state.isFinished) {{
                showResultsDirectly();
                return;
            }}
            
            els.landing.classList.remove('hidden');
            els.result.classList.add('hidden');
        }}
        
        function showResultsDirectly() {{
            els.landing.classList.add('hidden');
            els.header.classList.add('hidden');
            els.body.classList.add('hidden');
            els.footer.classList.add('hidden');
            els.result.classList.remove('hidden');
            calculateResult();
        }}

        function startExam() {{
            els.landing.classList.add('hidden');
            renderExamInterface();
            startSectionTimer();
        }}

        function startSectionTimer() {{
            if(timerInterval) clearInterval(timerInterval);
            
            timerInterval = setInterval(() => {{
                state.sectionTimeLeft--;
                
                // Format Time
                const m = Math.floor(state.sectionTimeLeft / 60);
                const s = state.sectionTimeLeft % 60;
                els.timer.innerText = `${{m}}:${{s < 10 ? '0'+s : s}}`;
                
                // Visual Warning
                if(state.sectionTimeLeft < 60) els.timer.style.backgroundColor = "#ffcdd2";
                else els.timer.style.backgroundColor = "#fff";

                // Time Up Logic
                if (state.sectionTimeLeft <= 0) {{
                    handleSectionTimeout();
                }}
                
                if(state.sectionTimeLeft % 5 === 0) saveState(); // periodically save
            }}, 1000);
        }}

        function handleSectionTimeout() {{
            clearInterval(timerInterval);
            
            if (state.currentSection < 5) {{
                alert(`Time is up for Section ${{state.currentSection}}! Moving to Section ${{state.currentSection + 1}}.`);
                forceNextSection();
            }} else {{
                alert("Time is up for the final section! Submitting Exam.");
                finishExam();
            }}
        }}

        function forceNextSection() {{
            state.currentSection++;
            state.maxSetReached = state.currentSection;
            state.sectionTimeLeft = SECTION_TIME_LIMIT;
            saveState();
            
            // Move to first question of next section
            const firstQofNextSection = (state.currentSection - 1) * SECTION_SIZE;
            loadQuestion(firstQofNextSection);
            startSectionTimer();
        }}

        function renderExamInterface() {{
            els.header.classList.remove('hidden');
            els.body.classList.remove('hidden');
            els.footer.classList.remove('hidden');
            renderPalette();
            loadQuestion(state.currentQ);
        }}

        function loadQuestion(index) {{
            state.currentQ = index;
            if(state.status[index] === 'not-visited') state.status[index] = 'not-answered';
            saveState();

            // Update Section Label
            const secNum = Math.floor(index / SECTION_SIZE) + 1;
            els.sectionLabel.innerText = `Section ${{secNum}} (Q${{(secNum-1)*20 + 1}}-${{secNum*20}})`;

            // Render Text
            els.qNum.innerText = `Question ${{index + 1}}`;
            els.qText.innerText = questions[index].text;
            
            // Render Options
            els.optsBox.innerHTML = '';
            questions[index].opts.forEach((opt, i) => {{
                const isChecked = state.answers[index] === i ? 'checked' : '';
                els.optsBox.innerHTML += `
                    <label class="option-label">
                        <input type="radio" name="opt" value="${{i}}" ${{isChecked}} onchange="selectOption(${{i}})">
                        ${{opt}}
                    </label>
                `;
            }});

            // Update Palette UI
            document.querySelectorAll('.q-btn').forEach(b => b.classList.remove('current'));
            const currentBtn = document.getElementById(`qbtn-${{index}}`);
            if(currentBtn) currentBtn.classList.add('current');

            // Handle Prev Button State (Cannot go back to previous locked section)
            const startOfCurrentSection = (state.currentSection - 1) * SECTION_SIZE;
            els.btnPrev.disabled = (index <= startOfCurrentSection);
        }}

        function selectOption(optIndex) {{
            state.answers[state.currentQ] = optIndex;
            saveState();
        }}

        function saveAndNext() {{
            const index = state.currentQ;
            // Update status
            state.status[index] = (state.answers[index] !== null) ? 'answered' : 'not-answered';
            saveState();
            
            moveToNextQuestion();
        }}

        function markForReview() {{
            const index = state.currentQ;
            state.status[index] = (state.answers[index] !== null) ? 'marked-answered' : 'review'; // Simplified
            saveState();
            moveToNextQuestion();
        }}

        function clearResponse() {{
            state.answers[state.currentQ] = null;
            state.status[state.currentQ] = 'not-answered';
            saveState();
            loadQuestion(state.currentQ);
            renderPalette();
        }}

        function moveToNextQuestion() {{
            const nextIndex = state.currentQ + 1;
            const currentSecBound = state.currentSection * SECTION_SIZE;

            // Check if next question crosses section boundary
            if (nextIndex >= currentSecBound) {{
                // End of section reached
                if (state.currentSection < 5) {{
                    if (confirm(`You have reached the end of Section ${{state.currentSection}}.\\nDo you want to submit this section and move to Section ${{state.currentSection+1}}?\\n\\nWARNING: You cannot return to this section.`)) {{
                        forceNextSection();
                    }}
                }} else {{
                    if(confirm("This was the last question. Submit Exam?")) {{
                        finishExam();
                    }}
                }}
            }} else {{
                // Normal movement within section
                renderPalette();
                loadQuestion(nextIndex);
            }}
        }}

        function prevQuestion() {{
            // Logic handled in loadQuestion to disable button if at start of section
            if (state.currentQ > 0) {{
                loadQuestion(state.currentQ - 1);
            }}
        }}

        function renderPalette() {{
            els.palette.innerHTML = '';
            for (let i = 0; i < TOTAL_QUESTIONS; i++) {{
                let statusClass = state.status[i];
                if(statusClass === 'marked-answered') statusClass = 'review';
                
                // Check if question belongs to a locked (previous) section
                // A question is locked if its section index is < current active section
                const qSection = Math.floor(i / SECTION_SIZE) + 1;
                const isLocked = qSection < state.currentSection;
                const lockedClass = isLocked ? ' locked' : '';
                
                // Gray out future sections
                const isFuture = qSection > state.currentSection;
                const futureStyle = isFuture ? 'opacity:0.3; pointer-events:none;' : '';

                els.palette.innerHTML += `
                    <div id="qbtn-${{i}}" 
                         class="q-btn ${{statusClass}}${{lockedClass}}" 
                         style="${{futureStyle}}"
                         onclick="jumpToQuestion(${{i}})">
                        ${{i + 1}}
                    </div>
                `;
            }}
        }}

        function jumpToQuestion(index) {{
            const qSection = Math.floor(index / SECTION_SIZE) + 1;
            
            if (qSection < state.currentSection) {{
                alert("This section is locked.");
                return;
            }}
            if (qSection > state.currentSection) {{
                alert("You cannot jump to a future section yet.");
                return;
            }}
            
            loadQuestion(index);
        }}

        function submitExam() {{
            if(confirm("Are you sure you want to finish the exam? Unanswered questions in future sections will be marked zero.")) {{
                finishExam();
            }}
        }}

        function finishExam() {{
            clearInterval(timerInterval);
            state.isFinished = true;
            saveState();
            
            els.header.classList.add('hidden');
            els.body.classList.add('hidden');
            els.footer.classList.add('hidden');
            els.result.classList.remove('hidden');
            
            calculateResult();
        }}

        function calculateResult() {{
            let correct = 0, wrong = 0, unattempted = 0, score = 0;

            state.answers.forEach((ans, i) => {{
                if (ans === null) {{
                    unattempted++;
                }} else if (questions[i] && ans === questions[i].ans) {{
                    correct++;
                    score += 4;
                }} else {{
                    wrong++;
                    score -= 1;
                }}
            }});

            document.getElementById('scoreCard').innerHTML = `
                <h1 style="color:#3f51b5; font-size:3rem;">${{score}} / 400</h1>
                <p><strong>Correct:</strong> ${{correct}} (+${{correct*4}})</p>
                <p><strong>Incorrect:</strong> ${{wrong}} (-${{wrong}})</p>
                <p><strong>Unattempted:</strong> ${{unattempted}}</p>
            `;
        }}

        function showDetailedReview() {{
            const container = document.getElementById('detailedReview');
            container.style.display = 'block';
            container.innerHTML = '<h3>Detailed Solutions</h3>';
            
            questions.forEach((q, i) => {{
                const userAns = state.answers[i];
                const isCorrect = userAns === q.ans;
                const statusColor = userAns === null ? 'gray' : (isCorrect ? 'green' : 'red');
                const statusText = userAns === null ? 'Skipped' : (isCorrect ? 'Correct' : 'Incorrect');

                let optsHtml = '';
                q.opts.forEach((opt, oi) => {{
                    let style = '';
                    if (oi === q.ans) style = 'font-weight:bold; color:green;'; 
                    if (oi === userAns && !isCorrect) style = 'font-weight:bold; color:red;'; 
                    optsHtml += `<div style="${{style}}">${{oi+1}}. ${{opt}}</div>`;
                }});

                container.innerHTML += `
                    <div class="review-item">
                        <div style="color:${{statusColor}}; font-weight:bold; margin-bottom:5px;">Q${{i+1}}: ${{statusText}}</div>
                        <div>${{q.text}}</div>
                        <div style="margin:10px 0; padding-left:15px; border-left:3px solid #ddd;">${{optsHtml}}</div>
                        <div class="explanation"><strong>Explanation:</strong> ${{q.exp}}</div>
                    </div>
                `;
            }});
        }}

        function toggleSidebar() {{
            els.sidebar.classList.toggle('active');
        }}

        // Initialize
        init();

    </script>
</body>
</html>
"""

with open('TEST_PAPER22.html', 'w', encoding='utf-8') as f:
    f.write(html_template)
print("Done!")
