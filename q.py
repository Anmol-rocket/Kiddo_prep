import json
import random

raw = [
    ['The headquarters of the World Health Organization (WHO) is located in:', ['Geneva', 'New York', 'Paris', 'London'], 0, 'WHO is headquartered in Geneva, Switzerland.', 'Non-Core'],
    ['Which organization is responsible for the Global Positioning System (GPS)?', ['NASA', 'United States Space Force', 'European Space Agency', 'ISRO'], 1, 'The US Space Force operates the GPS system.', 'Non-Core'],
    ['Who is credited with the invention of the World Wide Web (WWW)?', ['Tim Berners-Lee', 'Bill Gates', 'Steve Jobs', 'Vint Cerf'], 0, 'Tim Berners-Lee invented the WWW in 1989.', 'Non-Core'],
    ['The headquarters of the United Nations is situated in:', ['New York', 'Washington D.C.', 'Geneva', 'Vienna'], 0, 'UN Headquarters is in New York City.', 'Non-Core'],
    ['Which telescope was launched by NASA in 2021 to succeed the Hubble Space Telescope?', ['James Webb Space Telescope', 'Kepler Space Telescope', 'Spitzer Space Telescope', 'Chandra X-ray Observatory'], 0, 'JWST was launched in late 2021.', 'Non-Core'],
    ['In a class, the ratio of boys to girls is 4:5. If there are 20 boys, how many girls are there?', ['25', '16', '30', '20'], 0, '4 parts = 20, so 1 part = 5. 5 parts (girls) = 5 * 5 = 25.', 'Non-Core'],
    ["A pie chart represents 360 degrees. If a sector representing 'Apples' is 90 degrees, what percentage of the total does 'Apples' represent?", ['25%', '50%', '10%', '90%'], 0, '90/360 = 1/4 = 25%.', 'Non-Core'],
    ['Find the next number in the series: 2, 6, 12, 20, 30, ?', ['42', '40', '36', '38'], 0, 'Differences: +4, +6, +8, +10. Next is +12. 30 + 12 = 42.', 'Non-Core'],
    ['If 30% of a number is 120, what is 50% of that number?', ['200', '180', '240', '150'], 0, 'Number = 120 / 0.3 = 400. 50% of 400 = 200.', 'Non-Core'],
    ['A bar graph shows sales of 50, 70, 60, and 90 units over four months. What is the average monthly sales?', ['67.5', '65', '70', '60'], 0, 'Sum = 270. 270 / 4 = 67.5.', 'Non-Core'],
    ['Which protocol is widely used for secure communication over a computer network?', ['HTTPS', 'HTTP', 'FTP', 'SMTP'], 0, 'HTTPS (Hypertext Transfer Protocol Secure).', 'Non-Core'],
    ["A 'Phishing' attack is a type of:", ['Social engineering attack', 'Malware', 'Hardware failure', 'Network congestion'], 0, 'Tricking users to reveal sensitive information.', 'Non-Core'],
    ["What does 'IP' stand for in IP address?", ['Internet Protocol', 'Internal Provider', 'Intranet Process', 'Internet Port'], 0, 'Internet Protocol.', 'Non-Core'],
    ['Which of the following is considered a strong password practice?', ['Using a mix of uppercase, lowercase, numbers, and symbols', "Using your pet's name", 'Reusing passwords across sites', 'Writing it on a sticky note'], 0, 'Complex passwords increase security.', 'Non-Core'],
    ["A 'Firewall' in a computer network is primarily used to:", ['Monitor and control incoming and outgoing network traffic', 'Speed up internet connection', 'Store backup files', 'Prevent hardware overheating'], 0, 'Network security system.', 'Non-Core'],
    ["Medical terminology: 'Bradycardia' refers to:", ['Slow heart rate', 'Fast heart rate', 'High blood pressure', 'Irregular heartbeat'], 0, 'Brady = slow, cardia = heart.', 'Non-Core'],
    ["The prefix 'Dys-' in dyspnea means:", ['Difficult or painful', 'Fast', 'Slow', 'Without'], 0, 'Dys = difficult/bad. Dyspnea = difficulty breathing.', 'Non-Core'],
    ['Choose the correct spelling:', ['Hemorrhage', 'Hemorrage', 'Hemorhage', 'Hemmorhage'], 0, 'Hemorrhage (bleeding).', 'Non-Core'],
    ["'Myocardial infarction' is commonly known as a:", ['Heart attack', 'Stroke', 'Brain tumor', 'Kidney failure'], 0, 'MI is a heart attack.', 'Non-Core'],
    ['Effective communication with a hearing-impaired patient should include:', ['Facing the patient and speaking clearly', 'Shouting loudly', 'Speaking quickly', 'Exaggerating mouth movements'], 0, 'Ensuring clear visibility and normal speech.', 'Non-Core'],

    ['What does the Gross Tumor Volume (GTV) represent in radiotherapy planning?', ['The visible or palpable extent of the tumor', 'The tumor plus a margin for subclinical microscopic disease', 'The tissue margin for set-up uncertainties', 'The irradiated volume receiving a significant dose'], 0, 'GTV is the demonstrable tumor.', 'Core'],
    ['The Clinical Target Volume (CTV) is defined as:', ['GTV plus a margin for subclinical microscopic disease', 'The maximum volume of tissue irradiated', 'The organ at risk volume', 'The visible extent of the tumor'], 0, 'CTV accounts for subclinical spread.', 'Core'],
    ['The Planning Target Volume (PTV) accounts for:', ['Set-up uncertainties and organ motion', 'The visible tumor only', 'Microscopic disease only', 'The surrounding healthy tissue limits'], 0, 'PTV encompasses CTV plus a margin for motion and setup variations.', 'Core'],
    ["In radiotherapy, 'Isodose curves' are lines representing:", ['Points of equal radiation dose', 'Points of equal tissue density', 'The surface of the patient', 'The path of the radiation beam'], 0, 'Similar to topographic map lines, they show equal dose levels.', 'Core'],
    ["What is the primary purpose of a 'wedge filter' in radiotherapy?", ['To modify the dose distribution to compensate for missing tissue or sloping surfaces', 'To increase the energy of the beam', 'To collimate the beam to a specific shape', 'To decrease the skin dose'], 0, 'Wedges alter the isodose curves to achieve better dose uniformity.', 'Core'],
    ['Which dosimeter is considered the standard for absolute dose calibration in external beam radiotherapy?', ['Ionization chamber', 'TLD', 'Film', 'OSL'], 0, 'Ionization chambers are the gold standard for linac calibration.', 'Core'],
    ["The concept of 'Tissue Maximum Ratio' (TMR) is commonly used in dosimetry for:", ['High-energy linear accelerator beams', 'Superficial X-rays', 'Diagnostic X-rays', 'Low-energy brachytherapy'], 0, 'TMR is used for isocentric dose calculations in high-energy beams.', 'Core'],
    ['In brachytherapy, the source is typically placed:', ['Directly inside or very close to the tumor', 'At least 100 cm away from the patient', 'On the skin surface for deep tumors', 'Only used for total body irradiation'], 0, 'Brachytherapy means short-distance therapy.', 'Core'],
    ['Quality assurance (QA) of a linear accelerator requires checking the light field to radiation field coincidence. The acceptable tolerance is usually:', ['+/- 2 mm', '+/- 5 mm', '+/- 10 mm', '+/- 1 cm'], 0, 'Standard tolerance is within 2 mm or 1%.', 'Core'],
    ["The 'Organ at Risk' (OAR) refers to:", ['Normal tissues whose radiation sensitivity may significantly influence treatment planning', 'The primary tumor', 'The central axis of the beam', 'The bolus material'], 0, 'Critical structures near the target volume.', 'Core'],
    ['The normal resting heart rate for an adult is typically:', ['60 to 100 beats per minute', '40 to 60 beats per minute', '100 to 120 beats per minute', '120 to 140 beats per minute'], 0, '60-100 bpm is normal for adults.', 'Core'],
    ['What is the standard compression-to-ventilation ratio for adult CPR involving a single rescuer?', ['30:2', '15:2', '10:1', '50:2'], 0, 'The AHA guideline is 30 compressions to 2 breaths.', 'Core'],
    ['The most common site to check a pulse in an unresponsive adult patient is the:', ['Carotid artery', 'Radial artery', 'Brachial artery', 'Femoral artery'], 0, 'Carotid pulse is the most reliable in an emergency.', 'Core'],
    ['A sphygmomanometer is used to measure:', ['Blood pressure', 'Oxygen saturation', 'Heart rate', 'Respiratory rate'], 0, 'It measures blood pressure.', 'Core'],
    ['Normal blood pressure for a healthy adult is approximately:', ['120/80 mmHg', '140/90 mmHg', '90/60 mmHg', '160/100 mmHg'], 0, '120 systolic / 80 diastolic is normal.', 'Core'],
    ['Which of the following is considered a normal oxygen saturation (SpO2) level for a healthy individual?', ['95-100%', '85-90%', '75-80%', '60-70%'], 0, 'Above 95% is generally normal.', 'Core'],
    ["'Tachycardia' is defined as a resting heart rate over:", ['100 bpm', '60 bpm', '80 bpm', '120 bpm'], 0, 'Tachycardia is a fast heart rate (>100 bpm).', 'Core'],
    ['Which method is standard for destroying all microorganisms, including spores, on medical instruments?', ['Sterilization', 'Disinfection', 'Sanitization', 'Cleaning'], 0, 'Sterilization eliminates all forms of microbial life.', 'Core'],
    ['The most effective method of preventing the spread of hospital-acquired infections is:', ['Proper handwashing', 'Wearing lead aprons', 'Using sterile gloves for all patients', 'Isolating all patients'], 0, 'Hand hygiene is the most important measure.', 'Core'],
    ['In the event of a patient experiencing a grand mal seizure on the X-ray table, the radiographer should first:', ['Prevent the patient from injury by moving objects away', 'Attempt to restrain the patient', 'Insert a tongue depressor into their mouth', 'Administer CPR immediately'], 0, 'Patient safety is paramount.', 'Core'],
    ['Anaphylactic shock is most commonly caused by:', ['Severe allergic reaction', 'Severe bleeding', 'Spinal cord injury', 'Heart failure'], 0, 'It is an extreme allergic response.', 'Core'],
    ["The term 'syncope' refers to:", ['Fainting', 'Nosebleed', 'Vomiting', 'Difficulty breathing'], 0, 'Syncope is a temporary loss of consciousness.', 'Core'],
    ['Standard precautions require healthcare workers to treat which of the following as potentially infectious?', ['All blood and body fluids', 'Only blood', 'Only fluids from patients known to be infected', 'Only sweat'], 0, 'Universal standard precautions apply to all patients.', 'Core'],
    ["Medical terminology 'cyanosis' indicates:", ['Bluish discoloration of the skin due to lack of oxygen', 'Yellowish discoloration of the skin', 'Redness of the skin due to inflammation', 'Paleness of the skin'], 0, 'Cyanosis is a sign of hypoxia.', 'Core'],
    ['In CPR, the chest compressions for an adult should be at a depth of at least:', ['2 inches (5 cm)', '1 inch (2.5 cm)', '3 inches (7.5 cm)', '0.5 inch (1.25 cm)'], 0, 'Compressions must be deep enough to pump blood.', 'Core'],
    ['Which element is used as the target material in mammography X-ray tubes?', ['Molybdenum', 'Tungsten', 'Copper', 'Lead'], 0, 'Molybdenum or Rhodium provides optimal characteristic X-rays for breast tissue.', 'Core'],
    ['The principle advantage of a rotating anode over a stationary anode is:', ['Higher heat capacity', 'Lower cost', 'Smaller focal spot', 'Less off-focus radiation'], 0, 'Rotation spreads the heat over a larger focal track area.', 'Core'],
    ['In digital radiography, spatial resolution is primarily limited by:', ['Pixel size', 'kVp', 'mAs', 'Grid ratio'], 0, 'Pixel pitch determines the maximum spatial resolution.', 'Core'],
    ['The Hounsfield Unit (HU) for water in CT imaging is:', ['0', '-1000', '+1000', '+50'], 0, 'Water is calibrated to 0 HU. Air is -1000.', 'Core'],
    ['Pitch in a helical CT is defined as the ratio of table feed per gantry rotation to the:', ['Beam collimation width', 'Gantry rotation time', 'Slice thickness', 'kVp'], 0, 'Pitch = table travel per rotation / beam width.', 'Core'],
    ['Which MRI sequence produces images where fluids (like CSF) appear bright?', ['T2-weighted', 'T1-weighted', 'Proton density', 'Diffusion-weighted'], 0, "Fluids are bright on T2 ('WW2' - Water is White on T2).", 'Core'],
    ['The primary biological effect of concern in MRI is:', ['Tissue heating from RF pulses', 'Ionization of DNA', 'Cataract formation', 'Radiation sickness'], 0, 'RF pulses deposit energy as heat (measured by SAR).', 'Core'],
    ['Ultrasound frequency for diagnostic imaging typically ranges from:', ['2 to 15 MHz', '20 to 100 kHz', '1 to 2 GHz', '10 to 50 Hz'], 0, 'High-frequency sound waves above human hearing limits.', 'Core'],
    ["The 'piezoelectric effect' is the underlying principle for:", ['Ultrasound transducers', 'X-ray generation', 'MRI signal generation', 'Scintillation detectors'], 0, 'Crystals convert electrical energy to mechanical sound waves and vice versa.', 'Core'],
    ['Acoustic enhancement in ultrasound occurs posterior to:', ['Fluid-filled structures', 'Bones', 'Gas bubbles', 'Calcifications'], 0, 'Fluid transmits sound well, making tissues behind it appear brighter.', 'Core'],
    ['The darkroom safelight for handling green-sensitive orthochromatic film should be:', ['Red', 'Amber', 'Blue', 'Green'], 0, 'A red safelight (like GBX-2) is required.', 'Core'],
    ['In automatic film processing, the function of the fixer is to:', ['Remove unexposed silver halide crystals and harden the emulsion', 'Convert exposed crystals to black metallic silver', 'Wash away residual chemicals', 'Dry the film'], 0, 'Fixer stops development and clears unexposed crystals.', 'Core'],
    ["The 'bucky factor' relates to the:", ['Increase in exposure required when using a grid', 'Size of the focal spot', 'Speed of the film-screen combination', 'Thickness of the patient'], 0, 'It represents the ratio of incident radiation to transmitted radiation.', 'Core'],
    ['A radiograph with very few shades of gray is said to have:', ['High contrast (short scale)', 'Low contrast (long scale)', 'High density', 'Low density'], 0, 'High contrast has abrupt changes from black to white.', 'Core'],
    ['Decreasing the Source-to-Image Distance (SID) will:', ['Increase magnification', 'Decrease magnification', 'Decrease image density', 'Increase spatial resolution'], 0, 'Shorter SID increases beam divergence, increasing magnification.', 'Core'],
    ['For an AP projection of the thoracic spine, the cathode of the X-ray tube should be positioned over the:', ['Lower thoracic region', 'Upper thoracic region', 'Cervical region', "It doesn't matter"], 0, 'Due to the anode heel effect, place the thicker part under the cathode.', 'Core'],
    ['Which projection of the chest best demonstrates fluid levels in the pleural cavity if the patient cannot stand?', ['Lateral decubitus', 'AP supine', 'Lordotic', 'RAO'], 0, 'Horizontal beam decubitus shows air-fluid levels.', 'Core'],
    ["The 'Scout' or topogram in CT is used primarily for:", ['Planning the scan range', 'Diagnostic interpretation', 'Measuring bone density', 'Contrast timing'], 0, 'It acts as a localizer image for planning the actual scan.', 'Core'],
    ['An ERCP (Endoscopic Retrograde Cholangiopancreatography) is used to evaluate the:', ['Biliary and pancreatic ducts', 'Esophagus', 'Large intestine', 'Kidneys'], 0, 'Evaluates the biliary tree and pancreatic ducts using an endoscope.', 'Core'],
    ['The primary purpose of using a compression band during an IVU (Intravenous Urogram) is to:', ['Retain contrast medium in the renal pelvicalyceal system', 'Prevent patient movement', 'Reduce radiation dose', 'Enhance bladder filling'], 0, 'Ureteric compression delays emptying of the upper urinary tract.', 'Core'],
    ['Which contrast media is radiolucent?', ['Air', 'Barium sulfate', 'Iodine', 'Gadolinium'], 0, 'Air has low density and appears black (radiolucent).', 'Core'],
    ['Barium enema is contraindicated in suspected cases of:', ['Bowel perforation', 'Colorectal cancer', 'Diverticulosis', 'Polyps'], 0, 'Barium leaking into the peritoneum causes severe peritonitis.', 'Core'],
    ['The unit of radiation exposure in air is the:', ['Roentgen (or Air Kerma)', 'Rad', 'Rem', 'Sievert'], 0, 'Roentgen measures ionization in air.', 'Core'],
    ['ALARA stands for:', ['As Low As Reasonably Achievable', 'Always Leave Area Radiation-free', 'As Low As Radiation Allows', 'Applied Level of Annual Radiation'], 0, 'The guiding principle of radiation protection.', 'Core'],
    ['Which personal monitoring device uses aluminum oxide as its active element?', ['OSL dosimeter', 'TLD', 'Film badge', 'Pocket ionization chamber'], 0, 'Optically Stimulated Luminescence dosimeters use Al2O3.', 'Core'],
    ['The legal requirement for keeping personal dosimetry records for a radiation worker is generally:', ['For their entire lifetime', '5 years', '10 years', '1 year'], 0, 'Records must be kept indefinitely.', 'Core'],
    ['Which principle states that the radiation intensity is inversely proportional to the square of the distance from the source?', ['Inverse Square Law', "Ohm's Law", 'Law of Conservation of Energy', "Faraday's Law"], 0, 'Inverse Square Law.', 'Core'],
    ["A pregnant radiographer's occupational equivalent dose limit to the fetus is typically restricted to:", ['1 mSv for the duration of the pregnancy', '20 mSv', '5 mSv', '50 mSv'], 0, 'ICRP limits fetal dose to 1 mSv.', 'Core'],
    ['The photoelectric effect is most likely to occur with:', ['Low energy photons and high atomic number absorbers', 'High energy photons and low atomic number absorbers', 'High energy photons and high atomic number absorbers', 'Low energy photons and low atomic number absorbers'], 0, 'Probability is proportional to Z^3/E^3.', 'Core'],
    ['The protective lead apron used in fluoroscopy must have a lead equivalent thickness of at least:', ['0.5 mm Pb', '0.25 mm Pb', '1.0 mm Pb', '2.0 mm Pb'], 0, '0.5 mm Pb is the standard requirement for fluoroscopy.', 'Core'],
    ['Leakage radiation from the X-ray tube housing must not exceed:', ['1 mGy/hr at 1 meter', '10 mGy/hr at 1 meter', '0.1 mGy/hr at 1 meter', '100 mGy/hr at 1 meter'], 0, '1 mGy/hr (100 mR/hr) at 1 meter from the source.', 'Core'],
    ['The normal creatinine level for an adult is approximately:', ['0.6 - 1.2 mg/dL', '2.0 - 3.5 mg/dL', '5 - 10 mg/dL', '0.1 - 0.5 mg/dL'], 0, 'Usually between 0.6 and 1.2 mg/dL.', 'Core'],
    ['An elevated BUN and Creatinine indicate impaired function of the:', ['Kidneys', 'Liver', 'Heart', 'Lungs'], 0, 'These are markers of renal function.', 'Core'],
    ["In CPR, 'AED' stands for:", ['Automated External Defibrillator', 'Automatic Emergency Device', 'Advanced Electronic Defibrillator', 'Automated Emergency Defibrillator'], 0, 'AED provides an electric shock to restore rhythm.', 'Core'],
    ['Extravasation of IV contrast media is treated by:', ['Elevating the extremity and applying cold/warm compresses', 'Continuing the injection at a slower rate', 'Administering epinephrine', 'Amputating the limb'], 0, 'Elevation and compresses help reduce swelling and discomfort.', 'Core'],
    ['Metformin must be withheld after administration of IV contrast to prevent:', ['Lactic acidosis', 'Hyperglycemia', 'Anaphylaxis', 'Hypoglycemia'], 0, 'Contrast-induced nephropathy combined with Metformin can cause lactic acidosis.', 'Core'],
    ["The 'Glasgow Coma Scale' assesses patient status based on:", ['Eye, verbal, and motor responses', 'Heart rate and blood pressure', 'Respiratory rate and oxygen saturation', 'Reflexes and pupil dilation'], 0, 'Assesses neurological status using three parameters.', 'Core'],
    ['Standard precautions require the use of a mask and eye protection during:', ['Procedures that are likely to generate splashes of blood or body fluids', 'All patient interactions', 'Transporting a patient', 'Taking vital signs'], 0, 'To protect mucous membranes from splashes.', 'Core'],
    ['Nosocomial infections are:', ['Hospital-acquired infections', 'Genetic diseases', 'Airborne only', 'Always viral'], 0, 'Infections acquired during a hospital stay.', 'Core'],
    ["The term 'fomite' refers to:", ['An inanimate object that can transmit infection', 'An insect vector', 'A susceptible host', 'A type of bacteria'], 0, 'Fomites include doorknobs, IRs, and sponges.', 'Core'],
    ['A radiolucent positioning sponge is commonly used to:', ['Support the patient without obscuring anatomy', 'Filter the primary X-ray beam', 'Reduce scatter radiation', 'Absorb contrast media'], 0, 'Radiolucent materials dont cast shadows on the image.', 'Core'],
    ['Which of the following is NOT a method of sterilization?', ['Freezing', 'Autoclaving', 'Ethylene oxide gas', 'Gamma irradiation'], 0, 'Freezing does not reliably kill all microorganisms.', 'Core'],
    ['The standard distance for a PA chest radiograph is typically 72 inches (180 cm) to:', ['Minimize heart magnification', 'Maximize heart magnification', 'Blur the ribs', 'Increase the anode heel effect'], 0, 'Longer SID reduces magnification of the heart.', 'Core'],
    ["The term 'lateral decubitus' implies that the patient is:", ['Lying on their side with a horizontal X-ray beam', 'Lying on their back with a vertical X-ray beam', 'Standing upright', 'Seated with a horizontal beam'], 0, 'Decubitus = lying down; lateral = on the side. Always uses horizontal beam.', 'Core'],
    ['The Waters method is primarily used to evaluate the:', ['Maxillary sinuses', 'Occipital bone', 'Mandible', 'Cervical spine'], 0, 'Parietoacanthial projection is excellent for maxillary sinuses.', 'Core'],
    ['The odontoid process (dens) is part of which vertebra?', ['C2 (Axis)', 'C1 (Atlas)', 'C7', 'T1'], 0, 'The dens projects superiorly from the body of C2.', 'Core'],
    ['The carpal tunnel is evaluated using the:', ['Gaynor-Hart method', 'Stecher method', 'Norgaard method', 'Camp-Coventry method'], 0, 'Tangential projection for the carpal canal.', 'Core'],
    ["A Colles' fracture involves the:", ['Distal radius', 'Proximal ulna', 'Scaphoid bone', 'Metacarpals'], 0, 'Distal radius fracture with dorsal angulation.', 'Core'],
    ['The base of the fifth metatarsal is a common site for a:', ['Jones fracture', "Boxer's fracture", "Pott's fracture", 'Monteggia fracture'], 0, 'Jones fracture occurs at the base of the 5th metatarsal.', 'Core'],
    ['In an AP projection of the knee, the central ray is angled 3-5 degrees cephalad for a patient with a:', ['Thick pelvis/thigh', 'Thin pelvis/thigh', 'History of patellar fracture', 'Knee replacement'], 0, 'To open the joint space in patients with thick thighs.', 'Core'],
    ['The central ray for an AP pelvis projection is directed to a point midway between the ASIS and the:', ['Symphysis pubis', 'Greater trochanter', 'Iliac crest', 'Umbilicus'], 0, 'Midway between ASIS and Symphysis Pubis.', 'Core'],
    ['For a lateral view of the cervical spine, the exposure is typically made on:', ['Full expiration to depress the shoulders', 'Full inspiration', 'Suspended respiration', 'Quiet breathing'], 0, 'Expiration helps drop the shoulders to better visualize C7.', 'Core'],
    ['The most common matrix size for a digital radiographic image is:', ['2048 x 2048 or higher', '512 x 512', '256 x 256', '64 x 64'], 0, 'DR matrix sizes are very large to provide high spatial resolution.', 'Core'],
    ['Picture Archiving and Communication System (PACS) relies on what standard for medical images?', ['DICOM', 'JPEG', 'HL7', 'TIFF'], 0, 'Digital Imaging and Communications in Medicine.', 'Core'],
    ["The term 'windowing' in digital imaging refers to adjusting the:", ['Contrast and brightness', 'Spatial resolution', 'Matrix size', 'Pixel size'], 0, 'Window width controls contrast, window level controls brightness/density.', 'Core']
]

output = []
for item in raw:
    q_text = item[0]
    opts = item[1]
    ans_idx = item[2]
    exp = item[3]
    q_type = item[4]
    
    correct_ans = opts[ans_idx]
    random.shuffle(opts)
    new_ans_idx = opts.index(correct_ans)
    
    output.append({
        'type': q_type,
        'text': q_text,
        'opts': opts,
        'ans': new_ans_idx,
        'exp': exp
    })

with open('q.json', 'w') as f:
    json.dump(output, f, indent=4)
