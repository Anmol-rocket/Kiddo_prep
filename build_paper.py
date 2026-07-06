import json
import random
import re

questions = []

def add_q(qtype, text, opts, correct_opt_text, exp):
    shuffled_opts = opts[:]
    random.seed(len(questions)) # For reproducible output
    random.shuffle(shuffled_opts)
    ans_idx = shuffled_opts.index(correct_opt_text)
    questions.append({
        'type': qtype,
        'text': text,
        'opts': shuffled_opts,
        'ans': ans_idx,
        'exp': exp
    })

# Part 1 (20)
# GK
add_q('Non-Core', 'Which of the following is the highest civilian award in India?', ['Padma Shri', 'Bharat Ratna', 'Padma Vibhushan', 'Param Vir Chakra'], 'Bharat Ratna', 'Bharat Ratna is the highest civilian award of the Republic of India.')
add_q('Non-Core', 'What is the capital of the Indian state of Chhattisgarh?', ['Raipur', 'Ranchi', 'Dehradun', 'Bhopal'], 'Raipur', 'Raipur is the capital of Chhattisgarh.')
add_q('Non-Core', 'Which sector is considered the backbone of the Indian economy?', ['Manufacturing', 'Agriculture', 'Information Technology', 'Tourism'], 'Agriculture', 'Agriculture and its allied sectors are considered the backbone of the Indian economy.')
add_q('Non-Core', 'The Dronacharya Award is given to:', ['Sports coaches', 'Outstanding athletes', 'Scientists', 'Film directors'], 'Sports coaches', 'Dronacharya Award is an award presented by the Government of India for excellence in sports coaching.')
add_q('Non-Core', 'Which of the following determines the Repo Rate in India?', ['Ministry of Finance', 'Reserve Bank of India (RBI)', 'NITI Aayog', 'State Bank of India'], 'Reserve Bank of India (RBI)', 'The Reserve Bank of India decides the repo rate to regulate liquidity and inflation.')

# Quant
add_q('Non-Core', 'Find the area of a circle whose radius is 7 cm. (Take pi = 22/7)', ['154 sq cm', '44 sq cm', '144 sq cm', '308 sq cm'], '154 sq cm', 'Area = pi * r^2 = (22/7) * 7 * 7 = 154 sq cm.')
add_q('Non-Core', 'The volume of a cube is 512 cm^3. What is the length of its edge?', ['6 cm', '8 cm', '10 cm', '12 cm'], '8 cm', 'Volume of a cube = a^3. 8^3 = 512, so the edge length is 8 cm.')
add_q('Non-Core', 'A train moving at a speed of 90 km/hr crosses a pole in 10 seconds. What is the length of the train?', ['200 m', '250 m', '300 m', '150 m'], '250 m', 'Speed = 90 * (5/18) = 25 m/s. Distance (length) = Speed * Time = 25 * 10 = 250 m.')
add_q('Non-Core', 'A car covers a distance of 150 km in 3 hours. What is its average speed?', ['40 km/hr', '50 km/hr', '60 km/hr', '70 km/hr'], '50 km/hr', 'Speed = Distance / Time = 150 / 3 = 50 km/hr.')
add_q('Non-Core', 'The surface area of a sphere of radius r is given by the formula:', ['4 * pi * r^2', '(4/3) * pi * r^3', '2 * pi * r', 'pi * r^2'], '4 * pi * r^2', 'The surface area of a sphere is 4 * pi * r^2.')

# Reasoning / English
add_q('Non-Core', 'Select the synonym of Abundant:', ['Scarce', 'Plentiful', 'Rare', 'Limited'], 'Plentiful', 'Abundant means available in large quantities; plentiful.')
add_q('Non-Core', 'Choose the correctly spelled word:', ['Accomodation', 'Accommodation', 'Acommodation', 'Acomodation'], 'Accommodation', 'The correct spelling is Accommodation (two Cs, two Ms).')
add_q('Non-Core', 'If RED is coded as 27, how is CAT coded? (A=1, B=2...)', ['24', '26', '22', '20'], '24', 'C(3) + A(1) + T(20) = 24.')
add_q('Non-Core', 'Pointing to a man, a woman said, "He is the son of my mothers only daughter." How is the man related to the woman?', ['Son', 'Brother', 'Nephew', 'Uncle'], 'Son', 'The womans mothers only daughter is the woman herself. Her son is the man.')
add_q('Non-Core', 'Find the odd one out:', ['Square', 'Rectangle', 'Circle', 'Cube'], 'Cube', 'A cube is a 3D shape, while the others are 2D shapes.')

# Computers
add_q('Non-Core', 'In MS Excel, which symbol is used to start a formula?', ['@', '#', '=', '$'], '=', 'All formulas in MS Excel must begin with an equal sign (=).')
add_q('Non-Core', 'What is the file extension of a Microsoft Excel 2007 and newer workbook?', ['.xls', '.xlsx', '.xlsm', '.xltx'], '.xlsx', '.xlsx is the default XML-based file extension for Excel 2007 and later.')
add_q('Non-Core', 'Which software is primarily used for creating presentations?', ['MS Word', 'MS Excel', 'MS PowerPoint', 'MS Access'], 'MS PowerPoint', 'Microsoft PowerPoint is a presentation program.')
add_q('Non-Core', 'The VLOOKUP function in Excel is used to:', ['Find a value vertically in a table', 'Add up values in a column', 'Change text to uppercase', 'Count the number of cells'], 'Find a value vertically in a table', 'VLOOKUP (Vertical Lookup) searches for a value in the first column of a table array.')
add_q('Non-Core', 'Which of the following is an example of an Operating System?', ['Google Chrome', 'Adobe Photoshop', 'Microsoft Windows', 'Microsoft Office'], 'Microsoft Windows', 'Microsoft Windows is an operating system.')

# Core - Special Techniques
add_q('Core', 'Which contrast medium is primarily used for a Barium Swallow study?', ['Iodinated contrast', 'Barium sulfate suspension', 'Gadolinium', 'Air only'], 'Barium sulfate suspension', 'Barium sulfate is the contrast of choice for demonstrating the gastrointestinal tract, including the esophagus.')
add_q('Core', 'What is the primary indication for an Intravenous Urogram (IVU)?', ['Peptic ulcer', 'Renal calculi', 'Gallstones', 'Spinal cord lesions'], 'Renal calculi', 'IVU (or IVP) is performed to evaluate the urinary tract for calculi, tumors, or strictures.')
add_q('Core', 'During an ERCP procedure, the contrast is injected into the:', ['Common bile duct and pancreatic duct', 'Renal pelvis', 'Spinal canal', 'Joint space'], 'Common bile duct and pancreatic duct', 'Endoscopic Retrograde Cholangiopancreatography evaluates the biliary and pancreatic ducts.')
add_q('Core', 'Micturating Cystourethrography (MCU) is most commonly performed to diagnose:', ['Vesicoureteral reflux', 'Renal artery stenosis', 'Gallbladder polyps', 'Esophageal stricture'], 'Vesicoureteral reflux', 'MCU evaluates the bladder and urethra during urination and is the gold standard for diagnosing VUR in children.')
add_q('Core', 'In a double-contrast barium enema, what is used as the negative contrast agent?', ['Water', 'Air', 'Barium sulfate', 'Iodine'], 'Air', 'Air (or CO2) provides negative contrast to distend the bowel lumen and coat the mucosa with barium.')
add_q('Core', 'A T-tube cholangiogram is performed:', ['Pre-operatively', 'Post-operatively', 'During an IVU', 'For esophageal assessment'], 'Post-operatively', 'It is done post-operatively after cholecystectomy to evaluate the patency of the common bile duct via an indwelling T-tube.')
add_q('Core', 'Which procedure involves radiographic examination of the uterus and fallopian tubes?', ['Hysterosalpingography (HSG)', 'Cystography', 'Sialography', 'Myelography'], 'Hysterosalpingography (HSG)', 'HSG uses contrast to assess the patency of fallopian tubes and uterine cavity anatomy.')
add_q('Core', 'Sialography is the radiographic examination of the:', ['Salivary glands and ducts', 'Spinal cord', 'Synovial joints', 'Lymph nodes'], 'Salivary glands and ducts', 'It involves injecting contrast into the ducts of the salivary glands (parotid or submandibular).')
add_q('Core', 'Myelography involves the injection of contrast into the:', ['Subarachnoid space', 'Epidural space', 'Subdural space', 'Intra-articular space'], 'Subarachnoid space', 'Contrast is injected into the subarachnoid space to visualize the spinal cord and nerve roots.')
add_q('Core', 'Which contrast agent is safe for intrathecal injection (Myelography)?', ['High osmolar ionic contrast', 'Non-ionic water-soluble contrast', 'Barium sulfate', 'Lipiodol'], 'Non-ionic water-soluble contrast', 'Only non-ionic, low-osmolar water-soluble contrasts (like Iohexol) are safe for intrathecal use to prevent neurotoxicity.')
add_q('Core', 'What is the preparation required for an Upper GI Tract (Barium Meal) study?', ['NPO for 6-8 hours', 'Full bladder', 'Bowel preparation with laxatives', 'No preparation needed'], 'NPO for 6-8 hours', 'Fasting (NPO) ensures the stomach is empty of food and fluid for proper mucosal coating.')
add_q('Core', 'In a Barium Swallow, to evaluate esophageal varices, the patient may be asked to:', ['Perform the Valsalva maneuver', 'Hold their breath in deep inspiration', 'Drink water rapidly', 'Cough forcefully'], 'Perform the Valsalva maneuver', 'The Valsalva maneuver increases intrathoracic pressure, distending the esophageal veins (varices).')
add_q('Core', 'Percutaneous Transhepatic Cholangiography (PTC) is performed by inserting a needle through the:', ['Abdominal wall into the liver', 'Through the mouth and stomach', 'Through the femoral artery', 'Through the urethra'], 'Abdominal wall into the liver', 'A Chiba needle is passed percutaneously into the liver to access the biliary tree directly.')
add_q('Core', 'Arthrography is the study of:', ['Synovial joints', 'Arteries', 'Salivary glands', 'Spinal cord'], 'Synovial joints', 'Arthrography involves injecting contrast into a joint capsule to assess structures like menisci or ligaments.')
add_q('Core', 'Which radiographic procedure is used to evaluate the patency of the male urethra?', ['Retrograde Urethrography (RGU)', 'Micturating Cystourethrography', 'Intravenous Urogram', 'Nephrostomy'], 'Retrograde Urethrography (RGU)', 'RGU involves injecting contrast retrogradely to assess urethral strictures or trauma in males.')
add_q('Core', 'The string sign on a barium meal follow-through is classically associated with:', ['Crohns disease', 'Ulcerative colitis', 'Diverticulitis', 'Appendicitis'], 'Crohns disease', 'The string sign indicates severe narrowing of a bowel loop, characteristic of terminal ileitis in Crohns disease.')
add_q('Core', 'Fistulography is performed to:', ['Determine the origin and extent of a sinus or fistula', 'Evaluate the fallopian tubes', 'Assess joint spaces', 'Examine salivary ducts'], 'Determine the origin and extent of a sinus or fistula', 'Contrast is injected into the external opening of a tract to map its internal communication.')
add_q('Core', 'During an IVU, compression bands are applied over the distal ureters to:', ['Retain contrast in the pelvicalyceal system', 'Prevent patient movement', 'Increase renal blood flow', 'Push the bowels away'], 'Retain contrast in the pelvicalyceal system', 'Ureteric compression delays contrast emptying to better fill and distend the renal pelvis and calyces.')
add_q('Core', 'Which phase of an IVU best demonstrates the renal parenchyma?', ['Nephrogram phase (1-3 minutes)', 'Calyceal phase (5-10 minutes)', 'Ureteric phase (15 minutes)', 'Cystogram phase'], 'Nephrogram phase (1-3 minutes)', 'The nephrogram phase occurs immediately after injection when contrast is in the nephrons, blushing the parenchyma.')
add_q('Core', 'For a Barium Enema, Buscopan or Glucagon may be administered to:', ['Induce bowel hypotonia/relaxation', 'Stimulate bowel peristalsis', 'Prevent contrast allergy', 'Act as a local anesthetic'], 'Induce bowel hypotonia/relaxation', 'These drugs are antispasmodics used to paralyze bowel movements temporarily for better visualization.')

# IR & Contrast/Pharma
add_q('Core', 'The Seldinger technique is most commonly used for:', ['Percutaneous vascular access', 'Intubation', 'Needle biopsy', 'Lumbar puncture'], 'Percutaneous vascular access', 'The Seldinger technique uses a needle, guidewire, and catheter for safe access to blood vessels.')
add_q('Core', 'Which of the following is a non-ionic contrast medium?', ['Iohexol', 'Diatrizoate', 'Iothalamate', 'Metrizoate'], 'Iohexol', 'Iohexol (Omnipaque) is a low-osmolar non-ionic contrast medium. The others are high-osmolar ionic agents.')
add_q('Core', 'The osmolality of blood is approximately:', ['290 mOsm/kg', '100 mOsm/kg', '600 mOsm/kg', '1000 mOsm/kg'], '290 mOsm/kg', 'Normal plasma osmolality is around 285-295 mOsm/kg.')
add_q('Core', 'High-osmolar contrast media (HOCM) have an osmolality roughly:', ['5 to 8 times that of blood', 'Equal to blood', 'Half of blood', 'Twice that of blood'], '5 to 8 times that of blood', 'HOCM typically has an osmolality of 1500-2000 mOsm/kg, causing more adverse reactions than low-osmolar agents.')
add_q('Core', 'In transcatheter arterial chemoembolization (TACE) for liver tumors, the embolic agent is delivered to the:', ['Hepatic artery', 'Portal vein', 'Hepatic vein', 'Superior mesenteric artery'], 'Hepatic artery', 'Hepatocellular carcinomas derive their primary blood supply from the hepatic artery.')
add_q('Core', 'Which drug is considered the first-line treatment for an anaphylactic contrast reaction?', ['Epinephrine (Adrenaline)', 'Diphenhydramine', 'Hydrocortisone', 'Atropine'], 'Epinephrine (Adrenaline)', 'Epinephrine (1:1000 IM) is the primary treatment for severe anaphylaxis to stabilize blood pressure and airways.')
add_q('Core', 'What is the primary action of Atropine in a radiology emergency?', ['Treat bradycardia (increase heart rate)', 'Treat anaphylaxis', 'Treat hypoglycemia', 'Reduce seizures'], 'Treat bradycardia (increase heart rate)', 'Atropine is an anticholinergic drug used to treat hemodynamically significant bradycardia.')
add_q('Core', 'Which patient condition poses the highest risk for contrast-induced nephropathy (CIN)?', ['Pre-existing renal failure', 'Asthma', 'Hyperthyroidism', 'Peptic ulcer disease'], 'Pre-existing renal failure', 'Pre-existing renal dysfunction, often compounded by diabetes, is the biggest risk factor for CIN.')
add_q('Core', 'Metformin should be withheld after administration of iodinated contrast for:', ['48 hours', '12 hours', '1 week', 'No need to withhold'], '48 hours', 'Metformin is withheld for 48 hours post-contrast to prevent lactic acidosis in case contrast-induced renal dysfunction occurs.')
add_q('Core', 'Which imaging modality provides real-time guidance during endovascular procedures?', ['Fluoroscopy', 'Static radiography', 'MRI', 'PET scan'], 'Fluoroscopy', 'Fluoroscopy provides continuous real-time X-ray imaging essential for tracking catheters and guidewires.')
add_q('Core', 'What is the purpose of an IVC filter?', ['To prevent pulmonary embolism', 'To treat deep vein thrombosis directly', 'To monitor central venous pressure', 'To dilate the vena cava'], 'To prevent pulmonary embolism', 'Inferior Vena Cava filters trap emboli from the lower extremities, preventing them from reaching the lungs.')
add_q('Core', 'Iodine is used as an X-ray contrast agent because it:', ['Has a high atomic number (Z=53)', 'Is a low-density gas', 'Is highly radioactive', 'Has a very low atomic number'], 'Has a high atomic number (Z=53)', 'Iodines high atomic number increases the photoelectric absorption of X-rays, making vessels radio-opaque.')
add_q('Core', 'A patient develops hives (urticaria) after contrast injection. This is classified as a:', ['Mild reaction', 'Severe reaction', 'Vasovagal reaction', 'Moderate reaction'], 'Mild reaction', 'Urticaria and nausea are mild idiosyncratic reactions and generally require observation or an antihistamine.')
add_q('Core', 'Hydrocortisone in a contrast reaction is used primarily because it:', ['Reduces inflammation and late-phase allergic response', 'Provides immediate bronchodilation', 'Increases heart rate rapidly', 'Reverses contrast nephropathy'], 'Reduces inflammation and late-phase allergic response', 'Steroids like hydrocortisone take hours to act fully and are used to prevent secondary/delayed allergic cascades.')
add_q('Core', 'Which device is used to expand a narrowed artery and keep it open?', ['Stent', 'Guidewire', 'Catheter', 'Embolization coil'], 'Stent', 'A stent is a wire-mesh tube placed within an artery to provide structural support after angioplasty.')
add_q('Core', 'A vagal reaction during a procedure is typically characterized by:', ['Bradycardia and hypotension', 'Tachycardia and hypertension', 'Hives and bronchospasm', 'Seizures and apnea'], 'Bradycardia and hypotension', 'Vasovagal syncope presents with a slow heart rate (bradycardia) and low blood pressure.')
add_q('Core', 'Contrast agents used in MRI are primarily based on which element?', ['Gadolinium', 'Iodine', 'Barium', 'Technetium'], 'Gadolinium', 'Gadolinium is a paramagnetic element that shortens the T1 relaxation time in MRI.')
add_q('Core', 'Which antihistamine is commonly administered for mild allergic contrast reactions?', ['Diphenhydramine', 'Epinephrine', 'Amiodarone', 'Naloxone'], 'Diphenhydramine', 'H1 receptor antagonists like diphenhydramine are given for hives and itching.')
add_q('Core', 'Which of the following is an anti-emetic drug?', ['Ondansetron', 'Atropine', 'Diazepam', 'Hydrocortisone'], 'Ondansetron', 'Ondansetron (Zofran) is used to prevent or treat nausea and vomiting.')
add_q('Core', 'What is PTCA?', ['Percutaneous Transluminal Coronary Angioplasty', 'Percutaneous Transhepatic Cholangiography', 'Prothrombin Time Clotting Assay', 'Peripheral Transluminal Carotid Angiography'], 'Percutaneous Transluminal Coronary Angioplasty', 'PTCA is a minimally invasive procedure to open blocked coronary arteries.')

# Biochemistry & Pathology
add_q('Core', 'Which enzyme is a primary marker for myocardial infarction and skeletal muscle damage?', ['Creatine Kinase (CK)', 'Alkaline Phosphatase (ALP)', 'Amylase', 'Lipase'], 'Creatine Kinase (CK)', 'CK (especially CK-MB) is a key enzyme marker for muscle damage, including the myocardium.')
add_q('Core', 'Elevated levels of SGOT (AST) and SGPT (ALT) in the blood most specifically indicate:', ['Liver damage', 'Kidney failure', 'Pancreatitis', 'Bone disease'], 'Liver damage', 'Transaminases (ALT and AST) are intracellular liver enzymes released during hepatocellular injury.')
add_q('Core', 'Which blood test is the most reliable indicator of renal function and glomerular filtration rate?', ['Serum Creatinine', 'Serum Bilirubin', 'Blood Glucose', 'Serum Uric Acid'], 'Serum Creatinine', 'Creatinine is a waste product of muscle metabolism filtered almost entirely by the kidneys.')
add_q('Core', 'Jaundice is clinically visible when serum levels of which substance are elevated?', ['Bilirubin', 'Cholesterol', 'Calcium', 'Urea'], 'Bilirubin', 'Hyperbilirubinemia causes the yellowish discoloration of skin and sclera known as jaundice.')
add_q('Core', 'Which enzymes are classically elevated in acute pancreatitis?', ['Amylase and Lipase', 'ALT and AST', 'ALP and GGT', 'Troponin and Myoglobin'], 'Amylase and Lipase', 'Pancreatic enzymes amylase and lipase spill into the blood during pancreatic inflammation.')
add_q('Core', 'The normal fasting blood glucose level in a healthy adult is approximately:', ['70-100 mg/dL', '120-150 mg/dL', '40-60 mg/dL', '150-200 mg/dL'], '70-100 mg/dL', 'A normal fasting blood sugar is generally between 70 and 99 mg/dL.')
add_q('Core', 'An elevated Alkaline Phosphatase (ALP) with an elevated Gamma-Glutamyl Transferase (GGT) suggests pathology in the:', ['Biliary tract (Cholestasis)', 'Heart muscle', 'Skeletal muscle', 'Lungs'], 'Biliary tract (Cholestasis)', 'ALP is found in bone and biliary tract. Concurrent GGT elevation confirms a biliary source.')
add_q('Core', 'Which is the good cholesterol?', ['HDL', 'LDL', 'VLDL', 'Triglycerides'], 'HDL', 'High-Density Lipoprotein (HDL) carries cholesterol back to the liver to be flushed from the body.')
add_q('Core', 'The HbA1c test measures:', ['Average blood sugar over the past 2-3 months', 'Instantaneous blood sugar level', 'Insulin production', 'Kidney filtration rate'], 'Average blood sugar over the past 2-3 months', 'HbA1c reflects glycated hemoglobin, indicating long-term glucose control.')
add_q('Core', 'Uric acid is the end product of the metabolism of:', ['Purines', 'Proteins', 'Carbohydrates', 'Fats'], 'Purines', 'Uric acid is produced from the breakdown of purine nucleotides and can cause gout if elevated.')

# General Core - CT, MRI, US, Physics, DR, Anatomy, Safety, Positioning
add_q('Core', 'The Hounsfield Unit (HU) for pure water in CT imaging is:', ['0', '-1000', '+1000', '-100'], '0', 'Water is the reference point for the CT numbers scale and is assigned 0 HU.')
add_q('Core', 'Which CT artifact is caused by patient motion?', ['Blurring/Ghosting', 'Ring artifact', 'Beam hardening', 'Partial volume effect'], 'Blurring/Ghosting', 'Patient movement causes misregistration of data, leading to blurring or ghosting.')
add_q('Core', 'In Helical CT, Pitch is defined as:', ['Table travel per rotation / beam collimation width', 'kVp / mA', 'Scan time / slice thickness', 'Gantry speed * table feed'], 'Table travel per rotation / beam collimation width', 'Pitch indicates the overlap or gap between helices. Pitch = 1 means contiguous spirals.')
add_q('Core', 'Which component of an MRI scanner is responsible for spatial encoding of the signal?', ['Gradient coils', 'Main magnet', 'RF transmitter', 'Shim coils'], 'Gradient coils', 'Gradient coils create linear variations in the magnetic field to locate the signal source.')
add_q('Core', 'Which MRI safety zone is the restricted area specifically for the MRI scanner room itself?', ['Zone IV', 'Zone I', 'Zone II', 'Zone III'], 'Zone IV', 'Zone IV is the magnet room itself, which poses the highest magnetic hazard.')
add_q('Core', 'The phenomenon where MR signal from fat is intentionally nullified is called:', ['Fat Suppression (e.g., STIR)', 'Inversion Recovery', 'Spin Echo', 'Gradient Echo'], 'Fat Suppression (e.g., STIR)', 'Sequences like STIR use specific inversion times to null the signal from fat tissue.')
add_q('Core', 'Which property of ultrasound waves determines the depth of tissue penetration?', ['Frequency', 'Amplitude', 'Velocity', 'Phase'], 'Frequency', 'Lower frequency waves penetrate deeper, while higher frequency waves provide better resolution at superficial depths.')
add_q('Core', 'The piezoelectric effect is responsible for:', ['Converting electrical energy to sound waves and vice versa', 'Creating X-ray photons', 'Producing radiofrequency pulses', 'Magnetizing protons'], 'Converting electrical energy to sound waves and vice versa', 'Transducer crystals use the piezoelectric effect to generate and detect ultrasound waves.')

add_q('Core', 'The half-value layer (HVL) of an X-ray beam is an indicator of:', ['Beam quality (penetrability)', 'Beam quantity (intensity)', 'Focal spot size', 'Grid ratio'], 'Beam quality (penetrability)', 'HVL measures the thickness of material needed to halve the beam intensity, reflecting its average energy.')
add_q('Core', 'Which interaction of X-rays with matter predominates at low diagnostic energies (e.g., Mammography)?', ['Photoelectric effect', 'Compton scatter', 'Pair production', 'Photodisintegration'], 'Photoelectric effect', 'The photoelectric effect is highly dependent on atomic number and dominates at low photon energies, yielding high contrast.')
add_q('Core', 'What is the primary purpose of the focusing cup in an X-ray tube?', ['To direct electrons towards the focal spot on the anode', 'To cool the anode', 'To filter low-energy X-rays', 'To increase the voltage'], 'To direct electrons towards the focal spot on the anode', 'The negatively charged focusing cup compresses the electron cloud into a tight beam.')
add_q('Core', 'In Computed Radiography (CR), the latent image is stored in:', ['Photostimulable phosphor (PSP)', 'Silver halide crystals', 'Thin-film transistor (TFT)', 'Amorphous selenium'], 'Photostimulable phosphor (PSP)', 'CR imaging plates contain Barium Fluorohalide PSP crystals that trap electrons to form the latent image.')
add_q('Core', 'What laser is commonly used in a CR reader to stimulate the imaging plate?', ['Helium-Neon or solid-state laser', 'Argon laser', 'CO2 laser', 'Nd:YAG laser'], 'Helium-Neon or solid-state laser', 'A red laser (He-Ne or diode) scans the plate, causing it to emit blue/purple light via photostimulated luminescence.')
add_q('Core', 'In direct digital radiography (DR), amorphous selenium acts as a:', ['Photoconductor', 'Scintillator', 'Phosphor', 'Laser'], 'Photoconductor', 'Amorphous selenium directly converts X-ray photons into electrical charges without an intermediate light step.')
add_q('Core', 'Which chemical acts as the developing agent in an X-ray film processor?', ['Phenidone and Hydroquinone', 'Ammonium thiosulfate', 'Potassium bromide', 'Glutaraldehyde'], 'Phenidone and Hydroquinone', 'These are the reducing agents that convert exposed silver halide crystals into black metallic silver.')
add_q('Core', 'The function of the fixer solution is to:', ['Remove unexposed silver halide crystals', 'Convert latent image to visible image', 'Harden the film emulsion only', 'Increase image contrast'], 'Remove unexposed silver halide crystals', 'Fixing clears the unexposed crystals from the emulsion, making the image permanent and transparent in clear areas.')

add_q('Core', 'The Circle of Willis provides blood supply to the:', ['Brain', 'Heart', 'Liver', 'Kidneys'], 'Brain', 'It is an arterial polygon at the base of the brain connecting the anterior and posterior circulations.')
add_q('Core', 'Which bone houses the pituitary gland in the sella turcica?', ['Sphenoid', 'Ethmoid', 'Temporal', 'Occipital'], 'Sphenoid', 'The sella turcica is a saddle-like depression in the body of the sphenoid bone.')
add_q('Core', 'The common bile duct is formed by the union of the:', ['Common hepatic duct and cystic duct', 'Right and left hepatic ducts', 'Pancreatic duct and cystic duct', 'Hepatic duct and pancreatic duct'], 'Common hepatic duct and cystic duct', 'The gallbladders cystic duct joins the common hepatic duct to form the CBD.')
add_q('Core', 'Which spinal nerve root passes through the intervertebral foramen between L4 and L5?', ['L4 nerve root', 'L5 nerve root', 'S1 nerve root', 'L3 nerve root'], 'L4 nerve root', 'In the lumbar spine, the exiting nerve root takes the name of the vertebra above it.')

add_q('Core', 'According to ICRP recommendations, the annual effective dose limit for a radiation worker is:', ['20 mSv averaged over 5 years', '50 mSv every year', '1 mSv', '150 mSv'], '20 mSv averaged over 5 years', 'The occupational limit is 20 mSv/year averaged over defined 5-year periods (max 50 mSv in any single year).')
add_q('Core', 'Which dosimeter provides an immediate, direct reading of radiation dose?', ['Pocket Dosimeter', 'TLD Badge', 'OSL Dosimeter', 'Film Badge'], 'Pocket Dosimeter', 'A pocket ionization chamber can be read immediately, unlike TLDs or film badges which require processing.')
add_q('Core', 'What is the principle of ALARA?', ['As Low As Reasonably Achievable', 'As Little As Radiographers Allow', 'Always Leave A Restricted Area', 'All Low And Right Angled'], 'As Low As Reasonably Achievable', 'ALARA is the guiding philosophy of radiation protection to minimize exposure.')
add_q('Core', 'The Inverse Square Law states that if the distance from the source is doubled, the intensity is:', ['Reduced to 1/4th', 'Halved', 'Doubled', 'Reduced to 1/8th'], 'Reduced to 1/4th', 'Radiation intensity is inversely proportional to the square of the distance.')

add_q('Core', 'For a lateral projection of the cervical spine, the SID (Source-to-Image Distance) should be:', ['72 inches (180 cm)', '40 inches (100 cm)', '48 inches (120 cm)', '60 inches (150 cm)'], '72 inches (180 cm)', 'A larger SID is used to overcome the magnification caused by the increased Object-to-Image Distance (OID) from the shoulder.')
add_q('Core', 'The Waters View is primarily used to evaluate the:', ['Maxillary sinuses', 'Frontal sinuses', 'Mastoid air cells', 'Mandibular symphysis'], 'Maxillary sinuses', 'Parietoacanthial (Waters) projection projects the petrous ridges below the maxillary sinuses.')
add_q('Core', 'For an AP projection of the knee, the central ray is directed to:', ['1/2 inch distal to the patellar apex', 'The center of the patella', '1 inch proximal to the patella', 'The tibial tuberosity'], '1/2 inch distal to the patellar apex', 'This centers the beam directly on the knee joint space.')
add_q('Core', 'The Swimmers view is utilized to visualize the:', ['Cervicothoracic junction (C7-T1)', 'Lumbar spine', 'Odontoid process', 'Sacroiliac joints'], 'Cervicothoracic junction (C7-T1)', 'It separates the shoulders to clearly visualize the lower cervical and upper thoracic vertebrae.')
add_q('Core', 'The partial volume averaging artifact can be reduced by:', ['Using thinner slices', 'Increasing the pitch', 'Lowering kVp', 'Increasing FOV'], 'Using thinner slices', 'Thinner slices reduce the chance of multiple tissue densities being averaged into a single voxel.')
add_q('Core', 'A Skyline or Sunrise view is taken to assess the:', ['Patellofemoral joint', 'Glenohumeral joint', 'Talocrural joint', 'Radioulnar joint'], 'Patellofemoral joint', 'It offers an axial view of the patella and its articulation with the femur.')

with open(r'c:\Users\annsh\Documents\kiddoprep-quiz-app\public\mock_papers\CBT10.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Make Title & Heading changes
content = content.replace('<title>AIIMS CBT - Sectional Timing Mode</title>', '<title>AIIMS CRE Radiographer - Test Paper 16</title>')
content = content.replace('<h1>AIIMS CRE CBT (Strict Pattern)</h1>', '<h1>AIIMS CRE - Test Paper 16</h1>')

start_match = re.search(r'function generateQuestions\(\) \{', content)
end_match = re.search(r'    \}\n\n        // --- STATE MANAGEMENT ---', content)

if start_match and end_match:
    before = content[:start_match.start()]
    after = content[end_match.end() - len('        // --- STATE MANAGEMENT ---'):]
    
    qs_json = json.dumps(questions, indent=8)
    
    new_func = "function generateQuestions() {\n"
    new_func += "        const createQ = (id, type, text, opts, ans, exp) => ({ id, type, text, opts, ans, exp });\n"
    new_func += "        questions = []; // Reset array\n\n"
    new_func += "        const raw_data = " + qs_json + ";\n"
    new_func += "        \n"
    new_func += "        raw_data.forEach((d, i) => questions.push(createQ(i + 1, d.type, d.text, d.opts, d.ans, d.exp)));\n"
    new_func += "    }\n\n"
    
    new_content = before + new_func + after
    with open(r'c:\Users\annsh\Documents\kiddoprep-quiz-app\public\mock_papers\TEST_PAPER16.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f'Successfully wrote {len(questions)} questions to TEST_PAPER16.html.')
else:
    print('Failed to match generateQuestions block.')

