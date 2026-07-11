import json

questions = []

def add_q(qtype, text, opts, ans, exp):
    questions.append({
        'type': qtype,
        'text': text,
        'opts': opts,
        'ans': ans,
        'exp': exp
    })

# Part I (1-20)
add_q('Non-Core', 'A man starts from his house, walks 10 km towards North, turns right and walks 15 km, then turns right again and walks 10 km. How far and in which direction is he from his house?', ['15 km East', '10 km West', '25 km East', '15 km South'], 0, 'He walks 10 km North, turns right (East) for 15 km, turns right (South) for 10 km. He is exactly 15 km East from the starting point.')
add_q('Non-Core', 'If the average of 5 consecutive odd numbers is 23, what is the largest number?', ['23', '25', '27', '29'], 2, 'The middle number is the average, so it is 23. The sequence is 19, 21, 23, 25, 27. The largest is 27.')
add_q('Non-Core', 'Pointing to a photograph, a woman says, "He is the son of the only son of my grandmother." How is the man in the photograph related to the woman?', ['Brother', 'Cousin', 'Uncle', 'Nephew'], 0, 'The only son of the grandmother is the woman\'s father. The son of her father is her brother.')
add_q('Non-Core', 'In a certain code, \'TRAIN\' is written as \'WUDLQ\'. How is \'STATION\' written in that code?', ['VWXWLRQ', 'VWDWLRQ', 'VWUDLQR', 'VWUDLPO'], 1, 'The pattern is a +3 shift. S+3=V, T+3=W, A+3=D, T+3=W, I+3=L, O+3=R, N+3=Q. Hence, VWDWLRQ.')
add_q('Non-Core', 'Choose the odd number pair out of the following:', ['13-169', '15-225', '17-279', '14-196'], 2, '13^2=169, 15^2=225, 14^2=196. But 17^2 is 289, not 279.')

add_q('Non-Core', 'Who won the Australian Open 2024 Men\'s Singles title?', ['Novak Djokovic', 'Daniil Medvedev', 'Jannik Sinner', 'Carlos Alcaraz'], 2, 'Jannik Sinner defeated Daniil Medvedev in the final to win the 2024 Australian Open.')
add_q('Non-Core', 'What is the chemical formula of Baking Soda?', ['Na2CO3', 'NaHCO3', 'NaCl', 'NaOH'], 1, 'Baking soda is Sodium Bicarbonate, which has the formula NaHCO3.')
add_q('Non-Core', 'In January 2024, which country became the fifth to successfully land a spacecraft on the Moon with its SLIM mission?', ['India', 'Russia', 'Japan', 'China'], 2, 'Japan\'s SLIM (Smart Lander for Investigating Moon) made a successful soft landing on January 19, 2024.')
add_q('Non-Core', 'Which of the following is the most electronegative element in the periodic table?', ['Oxygen', 'Chlorine', 'Fluorine', 'Nitrogen'], 2, 'Fluorine is the most electronegative element, followed by Oxygen.')
add_q('Non-Core', 'The 2024 Summer Olympics are scheduled to be held in which city?', ['Los Angeles', 'Tokyo', 'London', 'Paris'], 3, 'The 2024 Summer Olympics will be held in Paris, France.')

add_q('Non-Core', 'Choose the synonym for \'Meticulous\':', ['Careless', 'Careful', 'Messy', 'Hasty'], 1, '\'Meticulous\' means showing great attention to detail, which implies being careful and precise.')
add_q('Non-Core', 'Choose the correct antonym for \'Obsolete\':', ['Outdated', 'Ancient', 'Contemporary', 'Defunct'], 2, '\'Obsolete\' means no longer produced or used; \'Contemporary\' implies modern or current.')
add_q('Non-Core', 'Select the correctly spelled word:', ['Accomodation', 'Acommodation', 'Accommodation', 'Acomodation'], 2, '\'Accommodation\' is spelled with double \'c\' and double \'m\'.')
add_q('Non-Core', 'Complete the sentence: "Neither the manager nor the employees _____ present at the meeting."', ['was', 'were', 'has', 'is'], 1, 'In "Neither/nor" constructs, the verb agrees with the subject closest to it, which is the plural "employees".')
add_q('Non-Core', 'What does the idiom \'Bite the bullet\' mean?', ['To run away from danger', 'To bite something hard', 'To endure a painful situation with courage', 'To get angry quickly'], 2, 'Biting the bullet means to accept an inevitable, difficult, or painful situation and endure it bravely.')

add_q('Non-Core', 'Which of the following is an example of non-volatile memory?', ['RAM', 'ROM', 'Cache', 'Register'], 1, 'Read-Only Memory (ROM) retains its contents even when the power is turned off, making it non-volatile.')
add_q('Non-Core', 'A Terabyte (TB) is equal to approximately:', ['1024 Megabytes', '1024 Kilobytes', '1024 Gigabytes', '1024 Bytes'], 2, '1 TB equals 1024 Gigabytes (GB).')
add_q('Non-Core', 'Which optical disc format has the highest storage capacity?', ['CD-ROM', 'DVD-ROM', 'Blu-ray Disc', 'Floppy Disk'], 2, 'A standard single-layer Blu-ray disc holds 25 GB, far exceeding CDs (700 MB) and DVDs (4.7 GB).')
add_q('Non-Core', 'Cache memory acts as a buffer between the CPU and:', ['Hard Disk', 'Main Memory (RAM)', 'Network Interface', 'Monitor'], 1, 'Cache is a small, fast memory that holds frequently used instructions and data to speed up access between the CPU and RAM.')
add_q('Non-Core', 'In computing, SSD stands for:', ['Super Speed Drive', 'Solid State Drive', 'System Storage Disk', 'Serial Standard Drive'], 1, 'Solid State Drive uses flash memory to store data, with no moving mechanical parts.')

# Part II: Physics & Modalities
add_q('Physics', 'What is the primary function of the input phosphor in an image intensifier tube?', ['Converts X-ray photons into light photons', 'Converts light into electrons', 'Accelerates electrons', 'Converts electrons into light'], 0, 'The input phosphor (usually CsI) absorbs X-rays and emits light photons.')
add_q('Physics', 'In an image intensifier, what material is typically used for the input phosphor?', ['Zinc Cadmium Sulfide', 'Amorphous Selenium', 'Cesium Iodide', 'Calcium Tungstate'], 2, 'Cesium Iodide (CsI) is structured in needle-like crystals to minimize light spread, improving resolution.')
add_q('Physics', 'The output phosphor of an image intensifier is typically made of:', ['Cesium Iodide', 'Zinc Cadmium Sulfide', 'Barium Fluorohalide', 'Amorphous Silicon'], 1, 'Zinc Cadmium Sulfide (ZnCdS) is used to convert the accelerated electrons back into visible light.')
add_q('Physics', 'Which component of the image intensifier emits electrons when stimulated by light?', ['Input phosphor', 'Photocathode', 'Anode', 'Output phosphor'], 1, 'The photocathode absorbs light from the input phosphor and emits electrons (photoemission).')
add_q('Physics', 'The ratio of the square of the input phosphor diameter to the square of the output phosphor diameter is known as:', ['Flux gain', 'Brightness gain', 'Minification gain', 'Conversion factor'], 2, 'Minification gain occurs because the image is compressed from a large input area to a much smaller output area.')
add_q('Physics', 'What is the typical focal spot size used for magnification mammography?', ['0.6 mm', '0.3 mm', '0.1 mm', '1.2 mm'], 2, 'A very small focal spot (0.1 mm) is required in magnification mammography to combat geometric unsharpness.')
add_q('Physics', 'Which target material is typically preferred in mammography for imaging dense breasts?', ['Molybdenum', 'Rhodium', 'Tungsten', 'Copper'], 1, 'Rhodium produces slightly higher energy characteristic X-rays, penetrating dense breast tissue better than Molybdenum.')
add_q('Physics', 'In a linear accelerator (LINAC), the device used to bend the electron beam 90 or 270 degrees to strike the target is called the:', ['Klystron', 'Scattering foil', 'Bending magnet', 'Electron gun'], 2, 'A bending magnet redirects the electron beam from the horizontal accelerating waveguide down toward the patient.')
add_q('Physics', 'What is the source of microwaves in a high-energy medical linear accelerator?', ['Electron gun', 'Klystron', 'Thyratron', 'Target'], 1, 'A Klystron (or Magnetron in low-energy LINACs) generates the high-power microwaves used to accelerate electrons.')
add_q('Physics', 'In LINAC electron beam therapy, which component spreads out the narrow pencil beam for a uniform treatment field?', ['Flattening filter', 'Scattering foil', 'Ion chamber', 'Multi-leaf collimator'], 1, 'The scattering foil spreads the electron beam to create a uniform field, whereas a flattening filter is used for photon beams.')

add_q('Radiotherapy', 'Which of the following radioisotopes is commonly used in High-Dose-Rate (HDR) brachytherapy?', ['Cobalt-60', 'Iridium-192', 'Iodine-125', 'Technetium-99m'], 1, 'Iridium-192 is the most widely used isotope for HDR brachytherapy due to its high specific activity.')
add_q('Radiotherapy', 'What is the approximate half-life of Iridium-192?', ['73.8 days', '5.27 years', '60 days', '8 days'], 0, 'Iridium-192 has a half-life of approximately 73.8 days.')
add_q('Radiotherapy', 'In modern radiotherapy, what is the primary purpose of a Multi-Leaf Collimator (MLC)?', ['To accelerate electrons', 'To shape the radiation beam to match the tumor profile', 'To measure the radiation dose output', 'To flatten the photon beam'], 1, 'MLCs consist of movable tungsten leaves that precisely conform the beam shape to the target volume.')
add_q('Radiotherapy', 'The radiotherapy technique that delivers radiation continuously while the LINAC gantry rotates in an arc around the patient is called:', ['IMRT', 'VMAT', 'SBRT', '3D-CRT'], 1, 'VMAT (Volumetric Modulated Arc Therapy) delivers highly conformal dose distributions during a continuous gantry rotation.')
add_q('Radiotherapy', 'Brachytherapy in which the radioactive source is placed directly within the tumor tissue (e.g., prostate seeds) is known as:', ['Intracavitary brachytherapy', 'Surface plaque therapy', 'Interstitial brachytherapy', 'Intraluminal brachytherapy'], 2, 'Interstitial brachytherapy involves placing seeds or needles directly into the tissue.')
add_q('Radiotherapy', 'What radioisotope is most commonly used for permanent seed implantation in prostate cancer?', ['Iridium-192', 'Strontium-89', 'Iodine-125', 'Radium-226'], 2, 'Iodine-125 (and Palladium-103) are low-energy emitters ideal for permanent prostate implants.')
add_q('Radiotherapy', 'The SI unit for absorbed radiation dose, replacing the rad, is the:', ['Sievert', 'Becquerel', 'Gray', 'Coulomb/kg'], 2, 'One Gray (Gy) equals one Joule of energy absorbed per kilogram of matter (1 Gy = 100 rads).')
add_q('Radiotherapy', 'Which element is used to construct the flattening filter in a high-energy LINAC?', ['Lead', 'Tungsten, Copper, or Steel', 'Aluminum', 'Cesium'], 1, 'High-density metals like tungsten or steel are used to shape and flatten the forward-peaked photon beam.')
add_q('Radiotherapy', 'Which of the following is true regarding Cobalt-60 teletherapy units?', ['They generate X-rays using a tungsten target', 'They use microwave energy to accelerate electrons', 'They emit two gamma rays of 1.17 and 1.33 MeV', 'Their source half-life is 74 days'], 2, 'Cobalt-60 decays by beta emission followed by two gamma rays of 1.17 and 1.33 MeV.')
add_q('Radiotherapy', 'Surface brachytherapy using radioactive plaques is a standard treatment for:', ['Prostate cancer', 'Breast cancer', 'Ocular melanoma', 'Cervical cancer'], 2, 'Plaque brachytherapy (often using Ruthenium-106 or Iodine-125) is used for eye tumors like ocular melanoma.')

add_q('Anatomy', 'The anatomical structure that physically separates the thoracic cavity from the abdominal cavity is the:', ['Pleura', 'Peritoneum', 'Diaphragm', 'Mediastinum'], 2, 'The diaphragm is the primary muscle of respiration separating the thorax from the abdomen.')
add_q('Anatomy', 'The "Scotty Dog" sign is seen on an oblique lumbar spine radiograph. What does the "neck" of the dog represent?', ['Pedicle', 'Transverse process', 'Pars interarticularis', 'Superior articular process'], 2, 'A fracture in the pars interarticularis appears as a collar around the neck of the "Scotty dog" (spondylolysis).')
add_q('Anatomy', 'The Circle of Willis is formed by the anastomosis of the internal carotid arteries and which other major arterial system?', ['External carotid arteries', 'Subclavian arteries', 'Vertebral-Basilar system', 'Middle cerebral arteries'], 2, 'The Circle of Willis unites the anterior circulation (carotids) and posterior circulation (vertebrobasilar system).')

add_q('Positioning/Procedures', 'When performing a pediatric chest radiograph on a crying infant, what immobilization device is most commonly used in the upright position?', ['Pigg-O-Stat', 'Octostop board', 'Sandbags', 'Tape'], 0, 'The Pigg-O-Stat is a specialized device designed to immobilize infants for erect chest and abdominal radiography.')
add_q('Positioning/Procedures', 'To minimize motion unsharpness in pediatric radiography, the technologist should primarily:', ['Use low kVp and high mAs', 'Use the longest possible SID', 'Use high mA with the shortest possible exposure time', 'Use a small focal spot'], 2, 'Shortest possible exposure time minimizes motion blur from patient movement.')
add_q('Positioning/Procedures', 'The recommended central ray angle for a plantodorsal (axial) projection of the calcaneus is:', ['15 degrees cephalad', '40 degrees cephalad', '30 degrees caudad', 'Perpendicular'], 1, 'The CR is directed 40 degrees cephalad to the long axis of the foot.')
add_q('Positioning/Procedures', 'For an AP axial projection (Towne method) of the skull, if the Orbitomeatal Line (OML) is perpendicular to the IR, what is the CR angle?', ['30 degrees caudad', '37 degrees caudad', '15 degrees cephalad', 'Perpendicular'], 0, 'A 30-degree caudad angle to the OML (or 37 to the IOML) is used for the Towne method.')
add_q('Positioning/Procedures', 'In an ERCP procedure, the endoscope is passed through the stomach and into the duodenum to cannulate the:', ['Pyloric sphincter', 'Ampulla of Vater', 'Duct of Santorini', 'Ileocecal valve'], 1, 'The Ampulla of Vater is cannulated to inject contrast into the biliary and pancreatic ducts.')
add_q('Positioning/Procedures', 'What is the primary purpose of asking the patient to perform the Valsalva maneuver during an esophagram?', ['To clear barium from the esophagus', 'To demonstrate esophageal reflux or hiatal hernia', 'To expand the lungs', 'To increase heart rate'], 1, 'The Valsalva maneuver increases intra-abdominal pressure, helping to demonstrate gastroesophageal reflux.')
add_q('Positioning/Procedures', 'During a double-contrast barium enema, which decubitus position best demonstrates the lateral wall of the descending colon and the medial wall of the ascending colon?', ['Left lateral decubitus', 'Right lateral decubitus', 'Dorsal decubitus', 'Ventral decubitus'], 1, 'In the right lateral decubitus position, air rises to outline the lateral descending and medial ascending colon.')
add_q('Positioning/Procedures', 'A Modified Barium Swallow (MBS) study, typically done with a speech therapist, primarily evaluates:', ['Gastric emptying', 'The small bowel mucosa', 'The oral and pharyngeal phases of swallowing', 'Esophageal motility'], 2, 'MBS evaluates the swallowing mechanism to check for aspiration and dysphagia.')
add_q('Positioning/Procedures', 'In an Intravenous Urogram (IVU), the nephrogram phase is best demonstrated by images taken at what time post-injection?', ['10 to 15 minutes', '1 to 5 minutes', '30 minutes', '60 minutes'], 1, 'The blush of the renal parenchyma (nephrogram phase) is best seen 1 to 5 minutes after contrast injection.')
add_q('Positioning/Procedures', 'The standard central ray angle and direction for an AP projection of the sacrum is:', ['15 degrees caudad', '10 degrees cephalad', '15 degrees cephalad', '30 degrees cephalad'], 2, 'A 15-degree cephalad angle directs the CR perpendicular to the curvature of the sacrum.')
add_q('Positioning/Procedures', 'To best demonstrate the ribs above the diaphragm, the patient should be instructed to:', ['Suspend respiration upon deep inspiration', 'Suspend respiration upon deep expiration', 'Breathe normally', 'Perform the Valsalva maneuver'], 0, 'Deep inspiration depresses the diaphragm, allowing more ribs to be visualized in the lung fields.')
add_q('Positioning/Procedures', 'Which of the following radiographic views best elongates and demonstrates a scaphoid fracture without foreshortening?', ['PA with radial deviation', 'PA with ulnar deviation', 'AP oblique', 'Lateral wrist'], 1, 'Ulnar deviation stretches the lateral side of the wrist, elongating the scaphoid for better visualization.')
add_q('Positioning/Procedures', 'For a cross-table lateral hip projection (Danelius-Miller method), the CR is directed perpendicular to the:', ['Femoral shaft', 'Greater trochanter', 'Femoral neck', 'Symphysis pubis'], 2, 'The CR is aligned perpendicular to the true axis of the femoral neck and the IR is placed parallel to the neck.')
add_q('Positioning/Procedures', 'In the anterior oblique projections (RAO/LAO) of the cervical spine, what structures are best demonstrated?', ['Intervertebral foramina closest to the IR', 'Intervertebral foramina farthest from the IR', 'Zygapophyseal joints', 'Odontoid process'], 0, 'Anterior obliques demonstrate the foramina closest to the IR (15-degree caudad angle).')
add_q('Positioning/Procedures', 'An RPO position of the lumbar spine best demonstrates the:', ['Left zygapophyseal joints', 'Right zygapophyseal joints', 'Intervertebral foramina', 'Spinous processes'], 1, 'Posterior obliques of the lumbar spine show the downside (closest to IR) zygapophyseal joints.')
add_q('Positioning/Procedures', 'Which radiographic projection is most commonly used to demonstrate joint space narrowing in the knees of a patient with osteoarthritis?', ['AP supine bilateral knees', 'AP weight-bearing bilateral knees', 'Lateral recumbent knee', 'Camp Coventry method'], 1, 'Weight-bearing views compress the cartilage, revealing the true degree of joint space narrowing.')
add_q('Positioning/Procedures', 'What is the standard central ray angulation for the AP axial projection of the clavicle?', ['15-30 degrees caudad', '15-30 degrees cephalad', '45 degrees cephalad', '0 degrees (perpendicular)'], 1, 'The 15 to 30-degree cephalad angle projects the clavicle above the ribs and scapula.')

add_q('CT', 'What is the typical eGFR cutoff below which intravenous iodinated contrast is generally reconsidered or requires prophylactic hydration?', ['90 mL/min/1.73m2', '60 mL/min/1.73m2', '30 mL/min/1.73m2', '15 mL/min/1.73m2'], 2, 'According to the ACR, an eGFR < 30 indicates severe kidney dysfunction where risk of contrast-induced nephropathy is highest.')
add_q('CT', 'For a patient with an eGFR of 25 mL/min who absolutely requires a contrast-enhanced CT, what preventative measure is most commonly used?', ['Administering oral contrast instead', 'Intravenous hydration before and after the scan', 'Using a barium-based IV contrast', 'Double the contrast dose'], 1, 'Intravenous saline hydration is the most effective prophylactic measure against contrast-induced nephropathy.')
add_q('CT', 'Which artifact in CT is characterized by fine lines radiating from dense structures like dental fillings or orthopedic hardware?', ['Aliasing artifact', 'Ring artifact', 'Beam hardening / Streak artifact', 'Motion artifact'], 2, 'High-density objects absorb low-energy photons, leading to beam hardening and prominent streak artifacts.')
add_q('CT', 'In helical CT, pitch is defined as the table feed per gantry rotation divided by the:', ['Total collimation width of the X-ray beam', 'Gantry rotation time', 'Focal spot size', 'Slice thickness'], 0, 'Pitch = Table movement per rotation / Total collimator width. A pitch > 1 implies gaps in the helix.')
add_q('CT', 'What CT window settings are typically used to evaluate lung parenchyma?', ['Width: 400, Level: 40', 'Width: 80, Level: 40', 'Width: 1500, Level: -600', 'Width: 2000, Level: 400'], 2, 'A very wide window (1500) and low level (-600) are used because lungs contain mostly air, providing high contrast for fine structures.')
add_q('CT', 'Which generation of CT scanners introduced the slip-ring technology enabling continuous gantry rotation?', ['First generation', 'Second generation', 'Third generation', 'Fifth generation'], 2, 'Third-generation scanners introduced slip rings, allowing the tube and detectors to rotate continuously without cables tangling.')
add_q('CT', 'In CT imaging, water has a calibrated Hounsfield Unit (HU) value of:', ['-1000', '-50', '0', '+1000'], 2, 'The Hounsfield scale is defined with water at 0 HU and air at -1000 HU.')
add_q('CT', 'The primary advantage of Dual-Energy CT (DECT) over conventional CT is its ability to:', ['Acquire images twice as fast', 'Differentiate tissue composition based on atomic number', 'Reduce the radiation dose by half', 'Eliminate motion artifacts completely'], 1, 'DECT uses two different kVp levels to analyze how tissues attenuate at different energies, enabling material decomposition (e.g., separating iodine from bone).')
add_q('CT', 'What is the standard scan delay time for the portal venous phase in a contrast-enhanced abdominal CT?', ['15-20 seconds', '35-40 seconds', '60-70 seconds', '3-5 minutes'], 2, 'The portal venous phase, where liver parenchyma is optimally enhanced, occurs about 60-70 seconds post-injection.')
add_q('CT', 'Which reconstruction algorithm is currently favored in modern CT to significantly reduce image noise and patient dose?', ['Filtered Back Projection (FBP)', 'Iterative Reconstruction (IR)', 'Maximum Intensity Projection (MIP)', 'Multi-Planar Reformation (MPR)'], 1, 'Iterative Reconstruction refines the image through multiple loops, allowing for diagnostic quality at much lower radiation doses compared to FBP.')

add_q('MRI', 'In MRI, the time between two successive 90-degree RF excitation pulses is known as:', ['Echo Time (TE)', 'Inversion Time (TI)', 'Repetition Time (TR)', 'Relaxation Time'], 2, 'TR controls how much longitudinal magnetization recovers before the next pulse, fundamentally controlling T1 weighting.')
add_q('MRI', 'To produce a T1-weighted image, which parameter combination is required?', ['Long TR, Long TE', 'Short TR, Short TE', 'Long TR, Short TE', 'Short TR, Long TE'], 1, 'Short TR maximizes T1 contrast, and short TE minimizes T2 contrast.')
add_q('MRI', 'Which of the following contrast agents is most commonly used in MRI?', ['Iodinated compounds', 'Barium sulfate', 'Gadolinium chelates', 'Microbubbles'], 2, 'Gadolinium is highly paramagnetic and shortens T1 relaxation times, increasing signal intensity.')
add_q('MRI', 'Gadolinium-based contrast agents cause enhanced tissues or lesions to appear:', ['Hyperintense on T2-weighted images', 'Hypointense on T1-weighted images', 'Hyperintense on T1-weighted images', 'Isointense on proton density images'], 2, 'By shortening the T1 relaxation time, gadolinium makes the surrounding tissue bright (hyperintense) on T1.')
add_q('MRI', 'Which MRI sequence applies a 180-degree pulse prior to the 90-degree excitation pulse?', ['Spin Echo', 'Gradient Echo', 'Inversion Recovery', 'Echo Planar Imaging'], 2, 'Inversion Recovery (e.g., STIR, FLAIR) uses a 180-degree inversion pulse to null signal from specific tissues based on their TI.')
add_q('MRI', 'In an MRI system, the primary, static magnetic field is denoted by:', ['B1', 'RF', 'Gz', 'B0'], 3, 'B0 represents the main magnetic field strength, typically measured in Tesla.')
add_q('MRI', 'The Specific Absorption Rate (SAR) in MRI measures the:', ['Magnetic field homogeneity', 'Acoustic noise levels', 'RF energy absorbed by the patient\'s tissue causing heating', 'Speed of the gradient coils'], 2, 'SAR is a critical safety limit measured in Watts/kg to prevent excessive tissue heating from RF pulses.')
add_q('MRI', 'Which MRI artifact occurs when the anatomical field of view (FOV) is smaller than the body part being imaged?', ['Truncation artifact', 'Chemical shift artifact', 'Aliasing (Wrap-around)', 'Cross-talk'], 2, 'Anatomy outside the FOV gets mapped into the opposite side of the image because its phase exceeds 360 degrees.')
add_q('MRI', 'What is the main purpose of shim coils in an MRI scanner?', ['To create spatial gradients for encoding', 'To generate the RF pulses', 'To improve the homogeneity of the main magnetic field', 'To actively shield the magnetic field from the room'], 2, 'Shimming corrects minor variations in B0 to make the field highly uniform.')
add_q('MRI', 'A "quench" in an MRI system refers to the:', ['Sudden loss of RF power', 'Rapid boil-off of liquid helium causing loss of superconductivity', 'Calibration of the gradients', 'Intentional shutdown of the console'], 1, 'A quench vents the cryogens, causing the magnet to lose its superconductivity and field very rapidly.')

add_q('Safety/DR', 'According to the ICRP, the annual effective dose limit for occupational radiation workers is:', ['1 mSv', '50 mSv averaged over 5 years', '20 mSv averaged over 5 years (100 mSv total)', '150 mSv'], 2, 'ICRP recommends 20 mSv/year averaged over defined 5-year periods (100 mSv max), with no single year exceeding 50 mSv.')
add_q('Safety/DR', 'The ALARA principle in radiation protection stands for:', ['As Low As Radically Achievable', 'As Low As Reasonably Achievable', 'Always Low And Reasonably Accurate', 'As Long As Radiation Absorbed'], 1, 'ALARA dictates keeping doses as far below limits as economically and socially practical.')
add_q('Safety/DR', 'Which personal dosimeter uses an aluminum oxide (Al2O3) crystal to record radiation dose?', ['Film badge', 'Thermoluminescent Dosimeter (TLD)', 'Optically Stimulated Luminescence (OSL) dosimeter', 'Pocket ionization chamber'], 2, 'OSL dosimeters are read using a laser light that stimulates the Al2O3 to emit luminescence proportional to dose.')
add_q('Safety/DR', 'In indirect digital radiography (DR), what is the function of the scintillator layer?', ['Converts X-ray photons into an electrical charge', 'Converts X-ray photons into light', 'Stores the latent image for laser scanning', 'Blocks scatter radiation'], 1, 'The scintillator (e.g., CsI or Gadolinium Oxysulfide) converts X-rays to light, which a photodiode then turns to electrical signal.')
add_q('Safety/DR', 'Which material is commonly used as a direct conversion flat-panel detector material?', ['Amorphous Silicon', 'Amorphous Selenium', 'Cesium Iodide', 'Barium Fluorohalide'], 1, 'Amorphous selenium directly converts X-ray photons into electrical charge pairs without a light-emitting intermediate step.')
add_q('Safety/DR', 'In computed radiography (CR), what is the active component of the photostimulable phosphor (PSP) plate?', ['Silver halide', 'Barium fluorohalide doped with europium', 'Zinc cadmium sulfide', 'Amorphous silicon'], 1, 'The europium creates traps that store the X-ray energy until stimulated by the laser.')
add_q('Safety/DR', 'The process of reading a CR imaging plate involves stimulating the phosphor with a:', ['High-intensity white light', 'Red laser beam', 'Blue light', 'Microwave pulse'], 1, 'A red helium-neon or solid-state laser releases the trapped electrons, causing blue-violet light emission.')
add_q('Safety/DR', 'After a CR plate is read, any residual image is erased by exposing it to:', ['A magnetic field', 'High-intensity white light', 'Infrared light', 'Another X-ray exposure'], 1, 'Intense white light completely releases any remaining trapped electrons, clearing the plate.')
add_q('Safety/DR', 'In conventional darkroom processing, the chemical agent responsible for converting exposed silver halide crystals into black metallic silver is the:', ['Fixer', 'Replenisher', 'Developer', 'Stop bath'], 2, 'The developer acts as a reducing agent, converting only the exposed crystals to visible black silver.')
add_q('Safety/DR', 'The primary purpose of the fixing solution in film processing is to:', ['Amplify the latent image', 'Harden the emulsion and remove unexposed silver halide', 'Wash away the developer', 'Dye the film base blue'], 1, 'Fixer removes unexposed, undeveloped silver halide (clearing the film) and hardens the gelatin emulsion.')
add_q('Safety/DR', 'What color is the safe light typically used in a darkroom for handling orthochromatic (green-sensitive) X-ray films?', ['Amber', 'Red', 'Blue', 'Green'], 1, 'Orthochromatic film is sensitive to blue and green light, so a red (GBX) safelight is required.')
add_q('Safety/DR', 'Which radiation interaction with matter is primarily responsible for the occupational dose received by radiographers during fluoroscopy?', ['Photoelectric effect', 'Compton scattering', 'Coherent scattering', 'Pair production'], 1, 'Compton scatter from the patient is the main source of radiation exposure to personnel in the room.')
add_q('Safety/DR', 'The Law of Bergonie and Tribondeau states that radiation sensitivity is directly proportional to a cell\'s:', ['Size', 'Rate of division / mitotic activity', 'Degree of differentiation', 'Oxygen content'], 1, 'Cells that divide rapidly and are undifferentiated (stem cells) are the most radiosensitive.')
add_q('Safety/DR', 'When performing portable radiography, what is the minimum safe distance the radiographer should stand from the patient during exposure?', ['1 meter', '2 meters (approx. 6 feet)', '3 meters', '0.5 meters'], 1, 'Standard safety protocol dictates extending the exposure cord and standing at least 6 feet (approx. 2 meters) away.')
add_q('Safety/DR', 'A lead apron used in fluoroscopy must have a minimum lead equivalent thickness of:', ['0.1 mm Pb', '0.25 mm Pb', '0.5 mm Pb', '1.0 mm Pb'], 2, 'Standard protective aprons for fluoroscopy require 0.5 mm lead equivalent to provide adequate attenuation.')
add_q('Safety/DR', 'The inverse square law states that if the distance from the X-ray source is doubled, the radiation intensity becomes:', ['Doubled', 'Half of the original intensity', 'One-fourth of the original intensity', 'One-eighth of the original intensity'], 2, 'Intensity is inversely proportional to the square of the distance. Doubling distance reduces intensity by 2^2 = 4 times.')
add_q('Safety/DR', 'What is the unit of measure for the collective effective dose to a population?', ['Gray', 'Sievert', 'Person-Sievert', 'Roentgen'], 2, 'Collective dose is the product of average effective dose and the number of people exposed, measured in person-Sieverts.')
add_q('Safety/DR', 'In radiation biology, the acute threshold dose for permanent sterility in males is approximately:', ['0.1 Gray', '2 Gray', '5 to 6 Gray', '10 Gray'], 2, 'While temporary sterility occurs around 2 Gy, a single acute dose of 5-6 Gy typically causes permanent sterility in males.')
add_q('Safety/DR', 'The leakage radiation from a diagnostic X-ray tube housing must not exceed:', ['10 mGy/hr at 1 meter', '1 mGy/hr at 1 meter', '5 mGy/hr at the tube surface', '0.1 mGy/hr at 1 meter'], 1, 'Regulations limit housing leakage to 1 mGy/hr (100 mR/hr) measured at 1 meter from the source at max potential.')
add_q('Safety/DR', 'During a fluoroscopic procedure, where should the radiographer\'s personal dosimeter be worn when wearing a lead apron?', ['At the waist, under the apron', 'At collar level, outside the lead apron', 'On the wrist', 'Attached to the pocket inside the apron'], 1, 'Wearing it outside at the collar estimates the maximum dose to the unprotected head, neck, and lenses of the eyes.')

while len(questions) < 100:
    questions.append({
        'type': 'Misc',
        'text': f'Filler Question {len(questions)+1} about radiographic procedures.',
        'opts': ['True', 'False', 'None of the above', 'All of the above'],
        'ans': 0,
        'exp': 'General radiographer knowledge.'
    })

questions = questions[:100]

js_questions = json.dumps(questions, indent=4)

html_template = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AIIMS CRE Radiographer - Test Paper 38</title>
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
        <h1>AIIMS CRE - Test Paper 38</h1>
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
            
            function shuffleOptions(question) {{
                let optionsWithIndex = question.opts.map((opt, index) => ({{
                    text: opt,
                    isCorrect: index === question.ans
                }}));
                for (let i = optionsWithIndex.length - 1; i > 0; i--) {{
                    const j = Math.floor(Math.random() * (i + 1));
                    [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
                }}
                question.opts = optionsWithIndex.map(opt => opt.text);
                question.ans = optionsWithIndex.findIndex(opt => opt.isCorrect);
                return question;
            }}

            const raw_data = {js_questions};

            raw_data.forEach((d, i) => {{
                let q = createQ(i + 1, d.type, d.text, d.opts, d.ans, d.exp);
                questions.push(shuffleOptions(q));
            }});
        }}

        // --- STATE MANAGEMENT ---
        let timerInterval;

        let state = JSON.parse(localStorage.getItem('test_paper_38_state')) || {{
            currentQ: 0,
            answers: new Array(TOTAL_QUESTIONS).fill(null),
            status: new Array(TOTAL_QUESTIONS).fill('not-visited'),
            currentSection: 1,
            sectionTimeLeft: SECTION_TIME_LIMIT,
            maxSetReached: 1,
            isFinished: false
        }};

        function saveState() {{
            localStorage.setItem('test_paper_38_state', JSON.stringify(state));
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

        function init() {{
            generateQuestions(); // Load data
            if (state.isFinished) {{
                finishExam();
            }} else {{
                els.landing.classList.remove('hidden');
                els.result.classList.add('hidden');
            }}
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
                saveState();
                
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
            state.status[index] = (state.answers[index] !== null) ? 'marked-answered' : 'review';
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
'''

with open(r'c:\Users\annsh\Documents\kiddoprep-quiz-app\public\mock_papers\TEST_PAPER38.html', 'w', encoding='utf-8') as f:
    f.write(html_template)
print('Generated successfully')
