import json
import random

questions_raw = [
    # Non-Core (1-20)
    ("If the price of an item is increased by 20% and then decreased by 20%, what is the net effect?", ["4% decrease", "No change", "4% increase", "2% decrease"], "Let price be 100. +20% -> 120. -20% of 120 is 24 -> 96. Net is 4% decrease."),
    ("A sum of money is to be distributed among A, B, and C in the proportion 2:3:5. If C gets Rs. 1000 more than B, what is B's share?", ["Rs. 1500", "Rs. 1000", "Rs. 2000", "Rs. 500"], "C(5x) - B(3x) = 2x = 1000, so x = 500. B gets 3*500 = 1500."),
    ("In an examination, 40% of the students failed in Math, 30% failed in English, and 10% failed in both. What percentage of students passed in both subjects?", ["40%", "30%", "20%", "60%"], "Total failed = 40 + 30 - 10 = 60%. Passed both = 100 - 60 = 40%."),
    ("The ratio of boys to girls in a class is 5:3. If there are 16 more boys than girls, how many girls are there?", ["24", "16", "32", "40"], "5x - 3x = 2x = 16, so x = 8. Girls = 3*8 = 24."),
    ("Arrange the following in a meaningful sequence: 1. Death 2. Marriage 3. Education 4. Birth 5. Funeral.", ["4, 3, 2, 1, 5", "4, 1, 3, 2, 5", "3, 4, 2, 1, 5", "4, 2, 3, 1, 5"], "Birth -> Education -> Marriage -> Death -> Funeral."),
    ("Arrange in meaningful sequence: 1. Nation 2. Village 3. State 4. District 5. Continent", ["2, 4, 3, 1, 5", "2, 3, 4, 1, 5", "5, 1, 3, 4, 2", "1, 3, 2, 4, 5"], "Village -> District -> State -> Nation -> Continent."),
    ("Arrange logically: 1. Diagnosis 2. Doctor 3. Sick 4. Treatment 5. Recovery", ["3, 2, 1, 4, 5", "3, 1, 2, 4, 5", "2, 3, 1, 4, 5", "1, 2, 3, 4, 5"], "Sick -> Doctor -> Diagnosis -> Treatment -> Recovery."),
    ("Which of the following is considered an input device?", ["Scanner", "Monitor", "Printer", "Speaker"], "A scanner takes physical inputs and converts them to digital data."),
    ("What is the primary function of an ALU in a computer?", ["Perform arithmetic and logic operations", "Store data", "Output data", "Connect to internet"], "Arithmetic Logic Unit performs mathematical calculations and logic operations."),
    ("Which of the following is an output device?", ["Plotter", "Keyboard", "Mouse", "Touchpad"], "A plotter draws physical output onto paper."),
    ("In computer terminology, what does SSD stand for?", ["Solid State Drive", "System Storage Disk", "Solid Sector Disk", "Silicon State Drive"], "SSD is Solid State Drive, a type of non-volatile storage."),
    ("Which space agency recently launched the Europa Clipper mission to study Jupiter's moon?", ["NASA", "ISRO", "ESA", "JAXA"], "NASA's Europa Clipper mission launched to explore Jupiter's moon Europa."),
    ("What is the primary objective of ISRO's Aditya-L1 mission?", ["To study the Sun", "To study Mars", "To study the Moon", "To study Venus"], "Aditya-L1 is India's first dedicated solar mission."),
    ("Which James Webb Space Telescope instrument is primarily used to see through dust clouds?", ["MIRI (Mid-Infrared Instrument)", "NIRCam", "FGS", "NIRSpec"], "MIRI allows JWST to see through dense dust clouds in the mid-infrared range."),
    ("The Nobel Prize in Physics 2023 was awarded for research in which field?", ["Attosecond physics", "Quantum entanglement", "Black hole formation", "Exoplanet discovery"], "Awarded for experimental methods that generate attosecond pulses of light for the study of electron dynamics."),
    ("What is the synonym for 'Meticulous'?", ["Careful", "Sloppy", "Rapid", "Careless"], "Meticulous means showing great attention to detail; very careful and precise."),
    ("Choose the synonym for 'Ephemeral'.", ["Short-lived", "Permanent", "Eternal", "Lengthy"], "Ephemeral means lasting for a very short time."),
    ("Find the synonym for 'Obscure'.", ["Unclear", "Obvious", "Famous", "Bright"], "Obscure means not discovered or known about; uncertain or unclear."),
    ("Select the synonym of 'Candid'.", ["Frank", "Deceitful", "Secretive", "Shy"], "Candid means truthful and straightforward; frank."),
    ("What is the synonym of 'Lethargic'?", ["Sluggish", "Energetic", "Active", "Brisk"], "Lethargic means affected by lethargy; sluggish and apathetic."),

    # Core - Physics (21-30) - 10 Qs
    ("In direct conversion digital radiography (DR) systems, which material is commonly used as the photoconductor?", ["Amorphous Selenium (a-Se)", "Amorphous Silicon (a-Si)", "Cesium Iodide (CsI)", "Gadolinium Oxysulfide"], "Direct conversion DR uses Amorphous Selenium to directly convert X-ray photons to electrons."),
    ("What is the primary function of a scintillator in an indirect flat-panel detector?", ["To convert X-ray photons into visible light photons", "To convert light to electrical signals", "To store charge", "To amplify the signal"], "Scintillators emit light when struck by X-rays, which is then captured by photodiodes."),
    ("Which element is widely used as the photodiode material in indirect capture TFT arrays?", ["Amorphous Silicon (a-Si)", "Amorphous Selenium (a-Se)", "Germanium", "Silicon Dioxide"], "Amorphous silicon is used to create the photodiode layer that converts light to charge."),
    ("What effect does increasing the thickness of the phosphor layer have in an indirect DR detector?", ["Increases detection efficiency but decreases spatial resolution", "Decreases both efficiency and resolution", "Increases both efficiency and resolution", "Decreases efficiency but increases resolution"], "A thicker phosphor stops more X-rays (higher efficiency) but light spreads more, reducing resolution."),
    ("In computed radiography (CR), what phenomenon releases the trapped electrons in the photostimulable phosphor plate?", ["Photostimulated luminescence", "Photoelectric effect", "Thermionic emission", "Compton scattering"], "A red laser stimulates the plate, causing trapped electrons to drop back to ground state and emit blue light."),
    ("Cesium Iodide (CsI) scintillators are preferred over Gadolinium Oxysulfide because they:", ["Have a structured, needle-like crystal growth", "Are cheaper to manufacture", "Do not require a photodiode", "Have lower atomic numbers"], "CsI forms needle-like columns that channel light, reducing light spread and improving resolution."),
    ("The fill factor of a digital detector element (DEL) is defined as:", ["The ratio of the sensing area to the total area of the DEL", "The ratio of pixel size to matrix size", "The total charge capacity of the DEL", "The amount of X-rays absorbed by the panel"], "A higher fill factor means a larger percentage of the pixel is sensitive to radiation, improving DQE."),
    ("Which of the following DR configurations generally provides the highest spatial resolution?", ["Direct conversion using a-Se", "Indirect conversion using CsI", "Indirect conversion using Gadolinium Oxysulfide", "Computed Radiography (CR)"], "Direct conversion avoids the light-spreading step of scintillators, preserving maximum spatial resolution."),
    ("In a digital image, pixel pitch is defined as:", ["The distance from the center of one pixel to the center of the adjacent pixel", "The physical size of the monitor", "The number of shades of gray", "The depth of the pixel"], "Pixel pitch determines the spatial resolution of the digital detector."),
    ("What artifact is characterized by a dark line or band caused by incomplete erasure of a CR imaging plate?", ["Ghosting or image retention", "Moiré artifact", "Aliasing", "Grid cutoff"], "If the CR plate is not fully erased by intense light, residual latent image appears as a ghost on the next image."),

    # Core - Positioning (31-50) - 20 Qs
    ("For a pediatric PA chest radiograph, where should the central ray be directed?", ["At the level of T6-T7 (midthorax)", "At the level of T4", "At the lung apices", "At the level of T10"], "The CR should be perpendicular and directed to the midsagittal plane at the level of T6-T7 for pediatric PA chest."),
    ("Which immobilization device is commonly used for upright pediatric chest and abdomen radiography in infants?", ["Pigg-O-Stat", "Octostop", "Sandbags", "Velcro straps"], "The Pigg-O-Stat is a specialized mechanical immobilizer for erect chest/abdomen on infants."),
    ("In pediatric skeletal surveys for suspected non-accidental trauma (NAT), which view is crucial for detecting classic metaphyseal lesions?", ["AP views of the long bones", "Lateral skull", "Oblique ribs", "PA chest"], "High-detail AP views of long bones (arms, legs, joints) are required to see bucket-handle or corner metaphyseal fractures."),
    ("What is the recommended central ray angulation for an AP axial projection of the clavicle in a pediatric patient?", ["15 to 20 degrees cephalad", "30 degrees caudad", "Perpendicular", "45 degrees cephalad"], "A 15-20 degree cephalic angle projects the clavicle above the ribs and scapula. Less angle is used for children than adults."),
    ("To accurately evaluate the pediatric airway for suspected epiglottitis, which projection is considered most useful?", ["Soft tissue lateral neck", "AP open mouth", "SMV projection", "Waters view"], "A soft tissue lateral neck radiograph evaluates the epiglottis, retropharyngeal space, and subglottic region."),
    ("For a pediatric AP abdomen (KUB), the central ray should be centered:", ["1 inch above the umbilicus for infants", "At the symphysis pubis", "At the xiphoid process", "At the ASIS"], "For infants/small children, centering 1 inch above the umbilicus ensures the entire abdomen and diaphragm are included."),
    ("Which method is preferred to evaluate developmental dysplasia of the hip (DDH) in a 4-month-old infant?", ["Ultrasound", "CT scan", "MRI", "AP Radiograph"], "Before 4-6 months, the femoral heads are cartilaginous; thus ultrasound is the preferred modality."),
    ("When performing a pelvic radiograph on a pediatric patient for Legg-Calvé-Perthes disease, which view is commonly added to the AP?", ["AP bilateral frog-leg projection", "Judet views", "Inlet view", "Outlet view"], "Frog-leg lateral (modified Cleaves) evaluates the femoral head for flattening or fragmentation."),
    ("In a voiding cystourethrogram (VCUG) for a male child, what is the best position to visualize the urethra?", ["30-degree right posterior oblique (RPO) or LPO", "True AP", "True lateral", "PA"], "A 30-degree oblique unfolds the urethra from the superimposition of the pubic bones."),
    ("A modified Caldwell view for a pediatric skull is achieved by directing the CR:", ["15 degrees caudad to exit at the nasion", "30 degrees caudad to exit at the glabella", "Perpendicular to the OML", "25 degrees cephalad"], "The 15-degree caudal angle projects the petrous ridges into the lower third of the orbits."),
    ("To obtain a true lateral position of the skull in a restless toddler, which baseline should be parallel to the IR?", ["Midsagittal plane", "Interpupillary line", "OML", "IOML"], "The midsagittal plane must be strictly parallel to the IR to prevent tilt and rotation in a true lateral skull."),
    ("What is the recommended rotation of the leg for a pediatric AP mortise view of the ankle?", ["15 to 20 degrees internally", "45 degrees externally", "30 degrees internally", "No rotation"], "Internally rotating the entire leg 15-20 degrees places the intermalleolar line parallel to the IR, opening the mortise joint."),
    ("For an AP projection of the pediatric pelvis, how should the lower limbs be positioned to place the femoral necks parallel to the IR?", ["Internally rotated 15 to 20 degrees", "Externally rotated 15 to 20 degrees", "Abducted 45 degrees", "Flexed 90 degrees"], "Internal rotation overcomes the normal anteversion of the femoral necks, projecting them without foreshortening."),
    ("Which radiographic view of the knee is best for demonstrating the intercondylar fossa in a child?", ["Camp-Coventry or Holmblad method", "Merchant method", "Settegast method", "Rosenberg method"], "These PA axial projections (tunnel views) clearly demonstrate the intercondylar fossa."),
    ("For an AP projection of the forearm in a pediatric patient, the hand must be:", ["Supinated", "Pronated", "In a lateral position", "Clenched into a fist"], "Supination prevents superimposition of the radius and ulna at their proximal third."),
    ("During an upper GI series on an infant, a right lateral position is often used to demonstrate:", ["The pyloric canal and duodenal bulb", "The fundus of the stomach", "The gastroesophageal junction", "The terminal ileum"], "The right lateral position utilizes gravity to empty the stomach contents into the pylorus and duodenum."),
    ("The 'bunny wrap' technique using a sheet is primarily used to immobilize:", ["The arms and body of an infant or small child", "The legs during a pelvic x-ray", "The head during a skull series", "The entire body for a CT scan"], "A 'mummification' or bunny wrap securely holds the child's arms down to prevent motion."),
    ("Which anatomical structure must be included in an AP projection of a pediatric lower leg?", ["Both the knee and ankle joints", "Only the knee joint", "Only the ankle joint", "The hip and knee joints"], "To assess for long bone trauma or alignment, both adjacent joints must be included on the radiograph."),
    ("For a lateral projection of the pediatric cervical spine, the patient's shoulders should be:", ["Depressed as much as possible", "Elevated", "Rotated 45 degrees", "Pushed forward"], "Depressing the shoulders helps project them below the level of C7, allowing visualization of the C7-T1 junction."),
    ("In pediatric radiography, reducing the exposure time is critical to minimize:", ["Motion artifact", "Radiation dose to parents", "Focal spot blur", "Grid cutoff"], "Short exposure times are the most effective way to eliminate motion artifact in uncooperative pediatric patients."),

    # Core - CT (51-65) - 15 Qs
    ("In CT coronary artery calcium scoring, the Agatston score is primarily based on:", ["The area of calcification and its maximum CT number (density)", "The volume of the heart", "The width of the coronary arteries", "The patient's heart rate"], "The Agatston score multiplies the area of a calcified lesion by a weighted density factor."),
    ("To minimize cardiac motion artifacts during a CT coronary angiogram, scan acquisition is typically triggered during which phase of the cardiac cycle?", ["Mid-diastole", "Peak systole", "Early systole", "Late systole"], "The heart has the least motion during mid-diastole (typically 60-75% of the R-R interval)."),
    ("Retrospective ECG gating in cardiac CT:", ["Acquires data continuously throughout the cardiac cycle but uses more radiation dose", "Triggers the X-ray tube only during diastole", "Is only used for heart rates below 60 bpm", "Uses less radiation than prospective gating"], "Retrospective gating scans continuously and allows reconstruction at any phase, but exposes the patient to a higher dose."),
    ("In a multiphasic CT of the liver, the late arterial phase is typically acquired at what time post-injection?", ["35 to 40 seconds", "15 to 20 seconds", "60 to 70 seconds", "10 to 15 minutes"], "The late arterial phase (35-40s) optimally demonstrates hypervascular liver tumors."),
    ("Which liver lesion typically demonstrates 'peripheral nodular enhancement' during the arterial phase with centripetal fill-in on delayed phases?", ["Hemangioma", "Hepatocellular carcinoma", "Focal nodular hyperplasia", "Metastasis"], "This classic centripetal fill-in pattern is characteristic of a cavernous hemangioma."),
    ("The portal venous phase of a liver CT protocol is usually obtained approximately how long after contrast administration?", ["65 to 70 seconds", "20 to 25 seconds", "40 to 45 seconds", "120 seconds"], "At 65-70s, the hepatic parenchyma is maximally enhanced via the portal vein."),
    ("Hepatocellular carcinoma (HCC) characteristically shows which enhancement pattern on a multiphasic CT liver protocol?", ["Hypervascularity in the arterial phase and 'washout' in the portal venous phase", "Hypodense in all phases", "Peripheral enhancement with delayed fill-in", "Iso-dense in arterial phase and hyperdense in delayed phase"], "HCC receives its blood supply predominantly from the hepatic artery, causing early enhancement and rapid washout."),
    ("In dual-source CT (DSCT), the two X-ray tubes are positioned at what angle to each other?", ["90 degrees", "180 degrees", "45 degrees", "120 degrees"], "DSCT systems use two tube/detector arrays offset by 90 degrees to dramatically improve temporal resolution."),
    ("What is a primary clinical advantage of Dual-Energy CT (DECT)?", ["Material decomposition and iodine mapping", "Reduced scan time", "Higher spatial resolution", "Elimination of motion artifact"], "DECT uses two different kVp levels to differentiate materials based on their atomic number, allowing iodine maps or bone removal."),
    ("To detect a pancreatic adenocarcinoma, which CT phase is most sensitive for visualizing the typically hypodense tumor?", ["Pancreatic parenchymal phase (40-50 seconds)", "Non-contrast phase", "Early arterial phase (20 seconds)", "Equilibrium phase (5 minutes)"], "The pancreas enhances maximally at 40-50s, making the relatively avascular tumor appear distinctly hypodense."),
    ("In CT pulmonary angiography (CTPA) for suspected pulmonary embolism, contrast timing is optimized using:", ["Bolus tracking in the main pulmonary artery", "A fixed delay of 60 seconds", "Test bolus in the ascending aorta", "Bolus tracking in the left ventricle"], "Placing the ROI in the main pulmonary artery ensures peak contrast in the pulmonary vasculature."),
    ("A high-pitch CT protocol is most beneficial for:", ["Freezing motion and reducing scan time in uncooperative patients", "Improving spatial resolution in the temporal bone", "Reducing metal artifacts from implants", "Enhancing soft tissue contrast in the brain"], "High-pitch helical scanning allows for extremely fast table speeds, virtually freezing motion (e.g., in pediatrics)."),
    ("Which artifact is characterized by alternating dark and light streaks, often seen around dense bone or metal in CT?", ["Beam hardening artifact", "Ring artifact", "Partial volume averaging", "Windmill artifact"], "Beam hardening occurs when lower-energy photons are preferentially absorbed by dense objects, causing streaks."),
    ("Iterative reconstruction algorithms in CT are primarily used to:", ["Reduce image noise and lower patient dose", "Decrease scan acquisition time", "Increase spatial resolution without changing pitch", "Prevent patient movement"], "IR algorithms mathematically reduce noise, allowing the use of significantly lower mAs/dose."),
    ("What is the typical Hounsfield Unit (HU) range for simple cysts on a non-contrast CT?", ["0 to 20 HU", "-100 to -50 HU", "40 to 60 HU", "100 to 200 HU"], "Simple fluid measures near water, typically 0 to 20 HU."),

    # Core - MRI (66-75) - 10 Qs
    ("Which of the following pulse sequences is highly sensitive for detecting microhemorrhages or calcifications in the brain?", ["Susceptibility-weighted imaging (SWI)", "T1-weighted spin echo", "FLAIR", "Diffusion-weighted imaging (DWI)"], "SWI or T2* Gradient Echo sequences exploit magnetic susceptibility differences of blood products/calcium."),
    ("In an MRI of the spine, how do normal intervertebral discs appear on a T2-weighted sagittal image?", ["Nucleus pulposus is bright and annulus fibrosus is dark", "Entire disc is dark", "Entire disc is bright", "Nucleus pulposus is dark and annulus fibrosus is bright"], "Normal discs have high water content in the nucleus pulposus (bright on T2) and fibrous tissue in the annulus (dark)."),
    ("A short TR and a short TE are characteristics of which MRI sequence?", ["T1-weighted", "T2-weighted", "Proton Density (PD)", "STIR"], "Short Time of Repetition (TR) and short Time to Echo (TE) generate T1 weighting."),
    ("Which MRI artifact is caused by the difference in resonant frequencies of protons in water and fat?", ["Chemical shift artifact", "Aliasing artifact", "Cross-talk artifact", "Truncation artifact"], "Water and fat precess at slightly different frequencies, causing a spatial misregistration in the frequency-encoding direction."),
    ("Diffusion-weighted imaging (DWI) is particularly sensitive for early detection of:", ["Acute ischemic stroke", "Multiple sclerosis plaques", "Brain metastases", "Subarachnoid hemorrhage"], "DWI detects restricted diffusion of water molecules, which occurs within minutes of a stroke."),
    ("In Magnetic Resonance Angiography (MRA), Time-of-Flight (TOF) imaging relies on which phenomenon?", ["Flow-related enhancement", "Phase shifts of moving spins", "Contrast agent administration", "Signal suppression of moving blood"], "TOF MRA uses the inflow of fully magnetized fresh blood into the slice to create bright signal (flow-related enhancement)."),
    ("What does the term 'specific absorption rate' (SAR) measure in MRI safety?", ["The rate at which radiofrequency (RF) energy is absorbed by tissue", "The acoustic noise level", "The strength of the static magnetic field", "The speed of the gradient coils"], "SAR is measured in Watts/kg and monitors tissue heating caused by the RF pulses."),
    ("Which of the following is an absolute contraindication for undergoing an MRI scan?", ["Traditional cardiac pacemaker", "Orthodontic braces", "Titanium joint replacement", "Intrauterine device (IUD)"], "Standard pacemakers are absolute contraindications due to risk of movement, heating, or electrical interference."),
    ("Gadolinium-based contrast agents shorten which relaxation time to produce signal enhancement?", ["T1 relaxation time", "T2 relaxation time", "T2* relaxation time", "Proton density time"], "Gadolinium primarily shortens the T1 time of adjacent water protons, causing tissues to appear hyperintense on T1-weighted images."),
    ("To reduce truncation (Gibbs) artifact in an MRI image, the technologist should:", ["Increase the matrix size", "Decrease the field of view", "Decrease the TR", "Increase the receiver bandwidth"], "Gibbs artifact (ringing lines) occurs due to undersampling at high-contrast boundaries; increasing the matrix (more phase encodings) reduces it."),

    # Core - Ultrasound (76-80) - 5 Qs
    ("In diagnostic ultrasound, high-frequency transducers (e.g., 10-15 MHz) are best suited for imaging:", ["Superficial structures like the thyroid or breast", "Deep abdominal organs", "The adult heart", "Transcranial imaging"], "High frequency provides better axial resolution but poor penetration, ideal for superficial structures."),
    ("The artifact in ultrasound characterized by a series of parallel bands or echoes caused by the sound wave bouncing between two strong reflectors is called:", ["Reverberation artifact", "Mirror image artifact", "Acoustic enhancement", "Side lobe artifact"], "Reverberation occurs when sound bounces back and forth between two highly reflective interfaces."),
    ("Acoustic shadowing typically occurs distal to a highly attenuating structure such as a:", ["Gallstone or bone", "Fluid-filled cyst", "Blood vessel", "Normal liver parenchyma"], "Dense objects like gallstones absorb or reflect almost all sound, leaving an echo-free 'shadow' behind them."),
    ("In Doppler ultrasound, the 'aliasing' artifact occurs when the Doppler shift exceeds:", ["The Nyquist limit", "The speed of sound in tissue", "The transducer frequency", "The pulse repetition period"], "Aliasing (wrap-around of the spectral waveform) happens when the shift exceeds the Nyquist limit (PRF/2)."),
    ("What does the acronym FAST stand for in emergency ultrasound?", ["Focused Assessment with Sonography for Trauma", "Fast Abdominal Sonography Technique", "Fluid Assessment Sonography Test", "Functional Abdominal Sonogram for Trauma"], "FAST scans rapidly assess trauma patients for free fluid in the pericardial, pleural, and peritoneal spaces."),

    # Core - Anatomy (81-90) - 10 Qs
    ("Which part of the temporal bone houses the organs of hearing and balance?", ["Petrous portion", "Squamous portion", "Mastoid portion", "Tympanic portion"], "The petrous pyramid is dense bone that contains the inner ear structures (cochlea and semicircular canals)."),
    ("The Circle of Willis is formed by the anastomosis of which primary arteries?", ["Internal carotid arteries and vertebral arteries", "External carotid and vertebral arteries", "Internal jugular and vertebral arteries", "Subclavian and common carotid arteries"], "The internal carotid and basilar (formed by vertebrals) arteries supply the Circle of Willis."),
    ("Which specific valve prevents the backflow of blood from the right ventricle to the right atrium?", ["Tricuspid valve", "Mitral valve", "Pulmonary valve", "Aortic valve"], "The tricuspid valve separates the right atrium and right ventricle."),
    ("The ampulla of Vater is formed by the union of which two ducts?", ["Common bile duct and main pancreatic duct", "Cystic duct and common hepatic duct", "Right and left hepatic ducts", "Accessory pancreatic duct and common bile duct"], "These join at the hepatopancreatic ampulla (of Vater) before emptying into the duodenum."),
    ("The ligamentum arteriosum is a remnant of a fetal structure that connected the:", ["Pulmonary artery and descending aorta", "Right and left atria", "Umbilical vein and inferior vena cava", "Pulmonary veins and left atrium"], "It is the remnant of the ductus arteriosus, which bypassed the fetal lungs."),
    ("Which carpal bone is most commonly fractured, often resulting from a fall on an outstretched hand?", ["Scaphoid", "Lunate", "Triquetrum", "Pisiform"], "The scaphoid (navicular) is the most frequently fractured carpal bone."),
    ("The 'Scottie dog' appearance on an oblique lumbar spine radiograph is useful for identifying a defect in the:", ["Pars interarticularis", "Spinous process", "Vertebral body", "Pedicle"], "The neck of the 'Scottie dog' represents the pars interarticularis; a break indicates spondylolysis."),
    ("Which structure separates the right and left lobes of the liver anteriorly?", ["Falciform ligament", "Coronary ligament", "Ligamentum venosum", "Round ligament"], "The falciform ligament attaches the liver to the anterior abdominal wall and diaphragm, dividing the main lobes."),
    ("The true vocal cords are situated within which anatomical structure?", ["Larynx", "Pharynx", "Trachea", "Esophagus"], "The larynx (voice box) contains the true vocal cords."),
    ("The common carotid artery normally bifurcates into the internal and external carotid arteries at the level of:", ["C3-C4", "C1-C2", "C6-C7", "T1-T2"], "The bifurcation occurs approximately at the upper border of the thyroid cartilage (C3-C4 level)."),

    # Core - Safety/DR/Contrast (91-100) - 10 Qs
    ("Contrast media with a higher osmolality compared to blood plasma are more likely to cause:", ["Adverse hemodynamic effects and fluid shifts", "Fewer allergic reactions", "Better vascular opacification", "Less pain on injection"], "High Osmolar Contrast Media (HOCM) pull water into the vessels, causing pain, heat, and hemodynamic stress."),
    ("Non-ionic iodinated contrast media typically have a ________ osmolality compared to ionic contrast media.", ["Lower", "Higher", "Identical", "Variable"], "Non-ionic agents do not dissociate in solution, giving them a lower osmolality than ionic agents."),
    ("A patient experiencing bronchospasm following the administration of intravenous contrast media is having what type of reaction?", ["Moderate", "Mild", "Severe", "Local"], "Bronchospasm is considered a moderate reaction requiring medical intervention (e.g., bronchodilators)."),
    ("Which term refers to radiation effects that increase in severity with increasing dose and have a clear threshold?", ["Deterministic effects", "Stochastic effects", "Genetic effects", "Probabilistic effects"], "Deterministic effects (tissue reactions like erythema or cataracts) have a threshold dose below which they do not occur."),
    ("Radiation-induced cancer and genetic mutations are examples of:", ["Stochastic effects", "Deterministic effects", "Acute radiation syndrome", "Non-stochastic effects"], "Stochastic effects occur by chance; the probability increases with dose, but severity does not, and there is no threshold."),
    ("In the context of radiation biology, what does the acronym ALARA stand for?", ["As Low As Reasonably Achievable", "As Little As Radiologically Acceptable", "Always Lower Absorbed Radiation Amounts", "Applied Low-Dose And Radiation Assessment"], "ALARA is the fundamental principle of radiation protection."),
    ("Barium sulfate is an enteral contrast agent that is contraindicated if:", ["A bowel perforation is suspected", "The patient is allergic to iodine", "The patient has a pacemaker", "A CT scan is planned in a month"], "Barium is not water-soluble; if it leaks into the peritoneum, it can cause severe peritonitis."),
    ("According to the Law of Bergonié and Tribondeau, which type of cells are most radiosensitive?", ["Undifferentiated cells with high mitotic activity", "Mature, highly specialized cells", "Nerve cells", "Muscle cells"], "Stem cells and rapidly dividing cells are the most vulnerable to radiation damage."),
    ("Which radiation measurement takes into account the varying biological harm produced by different types of radiation?", ["Equivalent dose", "Absorbed dose", "Exposure", "Air kerma"], "Equivalent dose (Sieverts) multiplies absorbed dose by a radiation weighting factor (e.g., higher for alpha particles)."),
    ("What is the most effective method for a radiographer to protect themselves from scattered radiation during a fluoroscopic procedure?", ["Increasing the distance from the patient", "Wearing leaded glasses", "Reducing the tube voltage (kVp)", "Standing near the image intensifier"], "According to the inverse square law, doubling the distance reduces the dose by a factor of 4.")
]

# Randomize options and store correct index
formatted_questions = []
for idx, (q, opts, exp) in enumerate(questions_raw):
    correct_opt = opts[0]
    shuffled_opts = opts.copy()
    random.shuffle(shuffled_opts)
    correct_idx = shuffled_opts.index(correct_opt)
    
    cat = "Non-Core" if idx < 20 else "Physics" if idx < 30 else "Positioning" if idx < 50 else "CT" if idx < 65 else "MRI" if idx < 75 else "USG" if idx < 80 else "Anatomy" if idx < 90 else "Safety/DR"
    
    formatted_questions.append({
        "id": idx + 1,
        "type": cat,
        "text": q,
        "opts": shuffled_opts,
        "ans": correct_idx,
        "exp": exp
    })

js_questions = json.dumps(formatted_questions, indent=4)

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AIIMS CRE Radiographer - Test Paper 6</title>
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
        <h1>AIIMS CRE - Test Paper 6</h1>
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
        const STATE_KEY = 'test_paper_6_state';
        
        let questions = {js_questions};

        // --- STATE MANAGEMENT ---
        let state = {{
            currentQ: 0,
            answers: new Array(TOTAL_QUESTIONS).fill(null),
            status: new Array(TOTAL_QUESTIONS).fill('not-visited'),
            currentSection: 1,      // 1 to 5
            sectionTimeLeft: SECTION_TIME_LIMIT,
            maxSetReached: 1,       // Tracks highest section unlocked
            isFinished: false
        }};

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

        function saveState() {{
            localStorage.setItem(STATE_KEY, JSON.stringify(state));
        }}

        function loadState() {{
            const saved = localStorage.getItem(STATE_KEY);
            if(saved) {{
                state = JSON.parse(saved);
            }}
        }}

        function init() {{
            loadState();
            if(state.isFinished) {{
                els.landing.classList.add('hidden');
                finishExam();
            }} else if (state.currentSection > 1 || state.currentQ > 0) {{
                // Resume in progress
                els.landing.classList.add('hidden');
                renderExamInterface();
                startSectionTimer();
            }} else {{
                els.landing.classList.remove('hidden');
                els.result.classList.add('hidden');
            }}
        }}

        function startExam() {{
            els.landing.classList.add('hidden');
            renderExamInterface();
            startSectionTimer();
            saveState();
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
                
                if (state.sectionTimeLeft % 5 === 0) saveState();
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
            
            // Move to first question of next section
            const firstQofNextSection = (state.currentSection - 1) * SECTION_SIZE;
            loadQuestion(firstQofNextSection);
            startSectionTimer();
            saveState();
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
            
            saveState();
        }}

        function selectOption(optIndex) {{
            state.answers[state.currentQ] = optIndex;
            saveState();
        }}

        function saveAndNext() {{
            const index = state.currentQ;
            // Update status
            state.status[index] = (state.answers[index] !== null) ? 'answered' : 'not-answered';
            
            moveToNextQuestion();
        }}

        function markForReview() {{
            const index = state.currentQ;
            state.status[index] = (state.answers[index] !== null) ? 'marked-answered' : 'review'; 
            moveToNextQuestion();
        }}

        function clearResponse() {{
            state.answers[state.currentQ] = null;
            state.status[state.currentQ] = 'not-answered';
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
            if (state.currentQ > 0) {{
                loadQuestion(state.currentQ - 1);
            }}
        }}

        function renderPalette() {{
            els.palette.innerHTML = '';
            for (let i = 0; i < TOTAL_QUESTIONS; i++) {{
                let statusClass = state.status[i];
                if(statusClass === 'marked-answered') statusClass = 'review';
                
                const qSection = Math.floor(i / SECTION_SIZE) + 1;
                const isLocked = qSection < state.currentSection;
                const lockedClass = isLocked ? ' locked' : '';
                
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

with open("c:\\Users\\annsh\\Documents\\kiddoprep-quiz-app\\public\\mock_papers\\TEST_PAPER6.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("Generated TEST_PAPER6.html successfully!")
