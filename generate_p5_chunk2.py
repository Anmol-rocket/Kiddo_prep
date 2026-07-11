import json
import random

raw_data = [
    {
        "q": "X Ray photons produced by X-Ray machines are",
        "opts": ['Heterogenous in energy', 'Homogenous in energy', 'Both', 'None'],
        "ans": "Heterogenous in energy",
        "exp": "X-ray machines produce a continuous spectrum of bremsstrahlung radiation along with characteristic X-rays, making the beam heterogeneous in energy."
    },
    {
        "q": "Bragg peak characteristic is utilized in",
        "opts": ['Proton therapy', 'Neutron therapy', 'Megavoltage therapy', 'Electron therapy'],
        "ans": "Proton therapy",
        "exp": "Proton beams exhibit a Bragg peak, depositing the majority of their energy at a specific depth, which is highly beneficial in radiation therapy."
    },
    {
        "q": "Plane dividing body into right and left halves",
        "opts": ['Median sagittal', 'Coronal', 'Axial', 'Mid axillary'],
        "ans": "Median sagittal",
        "exp": "The median sagittal plane divides the body vertically into equal right and left halves."
    },
    {
        "q": "Orthopantomogram is taken to rule out lesion in",
        "opts": ['Mandible', 'Facial bone', 'Maxilla', 'Skull'],
        "ans": "Mandible",
        "exp": "An orthopantomogram (OPG) is a panoramic radiograph primarily used to evaluate the mandible, maxilla, and dental arches."
    },
    {
        "q": "The process by which electrons are emitted from a X-Ray cathode filament",
        "opts": ['Ionization', 'Photoconduction', 'Thermo luminescence', 'Thermionic emission'],
        "ans": "Thermionic emission",
        "exp": "Heating the cathode filament causes electrons to be released, a process known as thermionic emission."
    },
    {
        "q": "X-Rays are",
        "opts": ['Stream of electrons', 'Stream of positively charged particles', 'Electromagnetic radiations of high frequency', 'Stream of uncharged particles'],
        "ans": "Electromagnetic radiations of high frequency",
        "exp": "X-rays are high-energy, high-frequency electromagnetic waves, not particles with mass or charge."
    },
    {
        "q": "Term neoplasia means",
        "opts": ['New Growth', 'New cancer', 'New lesion', 'New disease'],
        "ans": "New Growth",
        "exp": "Neoplasia literally translates to \"new growth,\" referring to an abnormal and excessive proliferation of cells."
    },
    {
        "q": "Which of the following needs the longest exposure for an X-Ray image.",
        "opts": ['Thoracic', 'Spine', 'Abdomen', 'Pelvis'],
        "ans": "Spine",
        "exp": "Radiography of the spine, particularly the lateral lumbar spine, involves a large amount of tissue and dense bone, requiring the longest exposure."
    },
    {
        "q": "X-Ray is recorded on a plate coated with",
        "opts": ['Gold halide', 'Silver halide', 'Copper halide', 'Iron halide'],
        "ans": "Silver halide",
        "exp": "Traditional X-ray films use an emulsion layer containing silver halide crystals, which are sensitive to radiation and light."
    },
    {
        "q": "Normal range of creatinine is:",
        "opts": ["0 to 0.4 mg/100 ml", "0.6 to 1.5 mg/100 ml", "2 to 4 mg/100 ml", "8 to 15 mg/100 ml"],
        "ans": "0.6 to 1.5 mg/100 ml",
        "exp": "The normal serum creatinine range is typically between 0.6 and 1.5 mg/dL (mg/100 ml), depending on muscle mass and sex."
    },
    {
        "q": "Function of housing around X-Ray tube",
        "opts": ['Keeps heat inside the glass envelope', 'Promotes electrical shock', 'Minimizes radiation leakage', 'Helps with image production.'],
        "ans": "Minimizes radiation leakage",
        "exp": "The protective housing around the X-ray tube contains lead to absorb isotropically emitted X-rays and minimize leakage radiation."
    },
    {
        "q": "What is the position when a patient lies flat on their back and the head is lower than feet.",
        "opts": ['Fowler', 'Sims', 'Trendelenberg', 'Lateral recumbent'],
        "ans": "Trendelenberg",
        "exp": "In the Trendelenburg position, the patient is supine with the table tilted so that the head is lower than the feet."
    },
    {
        "q": "What instructions to give patient after barium enema?",
        "opts": ["Don't drink fluid for 6 hours", 'With old laxatives', 'Drink plenty of fluids', "Don't monitor your bowel movements"],
        "ans": "Drink plenty of fluids",
        "exp": "Patients are instructed to drink plenty of fluids after a barium enema to prevent constipation and help flush the barium out of the system."
    },
    {
        "q": "What restricts useful X-Ray beams from causing unnecessary exposure?",
        "opts": ['Protective barriers', 'Collimation', 'Filtration', 'Cassette Size'],
        "ans": "Collimation",
        "exp": "Collimation restricts the size and shape of the primary X-ray beam, thereby reducing the irradiated field and minimizing unnecessary patient exposure."
    },
    {
        "q": "A unit measuring radiation is REM, What does REM stand for?",
        "opts": ['Radiation Equivalent Man', 'Roentgen Early Man', 'Radioactive early management', 'Radiation evolved management'],
        "ans": "Radiation Equivalent Man",
        "exp": "REM stands for Roentgen Equivalent Man, an older unit used to measure the biological effect of ionizing radiation."
    },
    {
        "q": "Which principle states that ionizing exposure to humans should be as far below the dose limits as practical?",
        "opts": ['C/kg', 'FID', 'OAP', 'ALARA'],
        "ans": "ALARA",
        "exp": "ALARA stands for \"As Low As Reasonably Achievable,\" a fundamental safety principle aiming to minimize radiation exposure."
    },
    {
        "q": "What is one of the duties of a Radiation Safety Officer?",
        "opts": ['Conduct yearly reviews on records on Radiation levels', 'Conduct quarterly reviews of radiation safety programs', 'Conduct annual briefings and educational sessions with employees', 'All of the above'],
        "ans": "All of the above",
        "exp": "A Radiation Safety Officer (RSO) is responsible for monitoring radiation records, reviewing safety programs, and conducting educational training for staff."
    },
    {
        "q": "Nausea and difficulty in breathing after injecting contrast in a patient for CT scan, what type of shock is he experiencing",
        "opts": ['Septic', 'Anaphylactic', 'Cardiogenic', 'Hypovolemic'],
        "ans": "Anaphylactic",
        "exp": "Difficulty breathing and nausea following contrast administration are classic signs of an allergic or anaphylactic reaction."
    },
    {
        "q": "Chemical substances that kill pathogenic microorganisms on inanimate objects are known as:",
        "opts": ["Disinfectants", "Antiseptics", "Antibiotics", "Sterilants"],
        "ans": "Disinfectants",
        "exp": "Disinfectants are chemical agents applied to non-living objects to destroy viruses, bacteria, and other pathogens."
    },
    {
        "q": "Geometric factor responsible for unequal magnification of different portions of the same object:",
        "opts": ['Quantum mottle', 'Noise', 'Focal spot', 'Distortion'],
        "ans": "Distortion",
        "exp": "Distortion occurs when unequal magnification of different parts of the object causes a misrepresentation of its true size or shape."
    },
    {
        "q": "What is the best way to alter quality of an X-Ray beam?",
        "opts": ['kVp', 'Gray', 'mAs', 'REM'],
        "ans": "kVp",
        "exp": "The kilovoltage peak (kVp) determines the maximum energy (quality or penetrability) of the X-ray beam."
    },
    {
        "q": "Which of the following is not a part of quality assurance program?",
        "opts": ['Making sure the equipments are efficient', 'Making sure the patient is satisfied', 'Consistent quality of radiographic images', 'Keeping a low patient dose'],
        "ans": "Making sure the patient is satisfied",
        "exp": "While patient satisfaction is important in healthcare, a radiography Quality Assurance (QA) program strictly focuses on equipment performance, image quality, and radiation dose limits."
    },
    {
        "q": "What does PACS stand for?",
        "opts": ['Printer Analog Computer Systems', 'Projection Access Communication Systems', 'Picture Active Computer System', 'Picture Archiving and Communication Systems'],
        "ans": "Picture Archiving and Communication Systems",
        "exp": "PACS (Picture Archiving and Communication System) is medical imaging technology used for storing, retrieving, presenting, and sharing images digitally."
    },
    {
        "q": "In the postero anterior chest radiography which of the following should be included on the X-Ray?",
        "opts": ['Maximum of 8 posterior ribs', 'Exhaled lungs', 'Trachea including upper thoracic vertebrae', 'Top of iliac crests'],
        "ans": "Trachea including upper thoracic vertebrae",
        "exp": "A proper PA chest radiograph should include the entire lung fields from the apices (including the trachea and upper thoracic vertebrae) down to the costophrenic angles."
    },
    {
        "q": "Stomach protruding through the cardiac orifice through the cleft of diaphragm is known as:",
        "opts": ['Small bowel obstruction', 'Hiatal hernia', 'Pleural effusion', 'Appendicitis'],
        "ans": "Hiatal hernia",
        "exp": "A hiatal hernia occurs when the upper part of the stomach pushes through the esophageal hiatus (cleft) of the diaphragm into the chest cavity."
    },
    {
        "q": "What does GERD stand for?",
        "opts": ['Gall Bladder Esophageal Reflux Dysfunction', 'Gastroesophageal Reflux Disease', 'Gastroesophageal Reflex Disease', 'Gastroesophageal Reflex Dysfunction'],
        "ans": "Gastroesophageal Reflux Disease",
        "exp": "GERD stands for Gastroesophageal Reflux Disease, a digestive disorder where stomach acid irritates the food pipe lining."
    },
    {
        "q": "Emulsion in radiographic film contains:",
        "opts": ['Cs halide crystals', 'Ca tungsten crystals', 'Ag halide crystals', 'Ag atoms'],
        "ans": "Ag halide crystals",
        "exp": "The emulsion layer of traditional radiographic films is composed of gelatin containing radiation-sensitive silver (Ag) halide crystals."
    },
    {
        "q": "Filter used in mammography:",
        "opts": ['Molybdenum', 'Tungsten', 'Aluminium', 'Copper'],
        "ans": "Molybdenum",
        "exp": "Molybdenum filters are commonly used in mammography to remove high-energy bremsstrahlung X-rays and produce a beam with optimal contrast for breast tissue."
    },
    {
        "q": "Protective lead apron should have minimum lead equivalence of:",
        "opts": ['0.5 mm lead', '1 mm lead', '2 mm lead', '0.25 mm lead'],
        "ans": "0.25 mm lead",
        "exp": "Regulatory standards typically require protective lead aprons to have a minimum lead equivalent of 0.25 mm for general radiography."
    },
    {
        "q": "Maximum field of view which can be obtained with a specific radiographic system is general limited by the:",
        "opts": ['Focal spot size', 'Anode size', 'Anode angle', 'Focal length'],
        "ans": "Anode angle",
        "exp": "The anode angle determines the actual focal spot size and restricts the maximum usable field of view due to the geometry of the X-ray beam cutoff."
    },
    {
        "q": "Beam penetration can be increased by increasing:",
        "opts": ['kV', 'FFD', 'mAs', 'Beam area'],
        "ans": "kV",
        "exp": "Increasing the kilovoltage (kV) increases the kinetic energy of the electrons, resulting in X-ray photons with higher energy and greater penetrating power."
    },
    {
        "q": "Low kV are used in some procedures for purpose of:",
        "opts": ['Increasing penetration', 'Increasing contrast sensitivity', 'Decreasing patient exposure', 'Decreasing area contrast'],
        "ans": "Increasing contrast sensitivity",
        "exp": "Lower kilovoltage (kV) produces a lower-energy beam, which increases differential absorption and thereby enhances subject contrast on the radiograph."
    },
    {
        "q": "Changing from 5:1 ratio to 10:1 ratio grid will",
        "opts": ['Decrease patient exposure', 'Increase image contrast', 'Decrease required kV or mAs', 'Decreased X ray tube heating'],
        "ans": "Increase image contrast",
        "exp": "A higher ratio grid is more effective at absorbing scattered radiation, which results in improved image contrast but requires an increase in patient dose."
    },
    {
        "q": "Underprocessing of X-Ray film can result is increased film:",
        "opts": ['Sensitivity', 'Contrast', 'Fog', 'None'],
        "ans": "None",
        "exp": "Underprocessing typically leads to a decrease in film density and contrast, rather than an increase in these factors."
    },
    {
        "q": "Substituting high speed radiographic film for a medium speed results in:",
        "opts": ['Higher contrast', 'More visibility of detail because of more blurring', 'Reduced patient exposure', 'Increased quantum noise'],
        "ans": "Reduced patient exposure",
        "exp": "High-speed films require less radiation to achieve the desired optical density, thereby directly reducing the radiation exposure to the patient."
    },
    {
        "q": "Factors appropriate for conventional chest X-Ray:",
        "opts": ['Low contrast', '0.1 mm focal spot', '120 kV', '1:1 ratio grid'],
        "ans": "120 kV",
        "exp": "Conventional chest radiography typically employs a high kilovoltage technique (e.g., 110-130 kVp) to penetrate the dense mediastinum and provide a long scale of contrast."
    },
    {
        "q": "Advantages of higher kV are all except:",
        "opts": ['Increased patient exposure', 'Reduced X-Ray tube heating', 'Shorter exposure times', 'Decreased area contrast'],
        "ans": "Increased patient exposure",
        "exp": "Higher kV allows for a significant reduction in mAs, which actually results in decreased patient radiation exposure, not increased."
    },
    {
        "q": "Single coated X-Ray film used in all except:",
        "opts": ['Mammography', 'CT scan films', 'Skull X Ray', 'Fluoroscopy films'],
        "ans": "Skull X Ray",
        "exp": "Routine general radiography, such as a skull X-ray, utilizes double-emulsion films to increase speed and reduce patient dose, unlike mammography which uses single-emulsion films for high detail."
    },
    {
        "q": "All are true for dental X-Ray films except:",
        "opts": ['Embossed dot on film kept near crown of tooth', 'Corners have sharp angles', 'Films are protected by lead coils', 'Occlusion film size is 2 1/4 x 3"'],
        "ans": "Corners have sharp angles",
        "exp": "Dental intraoral X-ray films have rounded corners, not sharp angles, to prevent discomfort and injury to the patient's oral mucosa."
    },
    {
        "q": "Efficiency of film washing process is done by estimating:",
        "opts": ['Residual iodine', 'Residual silver', 'Residual thiosulphate', 'Residual chlorine'],
        "ans": "Residual thiosulphate",
        "exp": "The washing process is designed to remove the fixing agent (sodium or ammonium thiosulphate). Testing for residual thiosulphate evaluates washing efficiency."
    },
    {
        "q": "Annual effective radiation dose for technicians is less than:",
        "opts": ['30 mSv', '100 mSv', '100 mRem', '5 mRem'],
        "ans": "30 mSv",
        "exp": "Under many regulatory bodies, the occupational annual effective dose limit for radiation workers should not exceed 30 mSv in any single year."
    },
    {
        "q": "Which is a life saving measure in contrast reaction effect:",
        "opts": ['Inj Rantac', 'Inj Adrenaline', 'Saline infusion', 'Inj Phenargen'],
        "ans": "Inj Adrenaline",
        "exp": "Epinephrine (Inj Adrenaline) is the primary life-saving pharmacological intervention for severe, anaphylactic contrast reactions."
    },
    {
        "q": "Enteroclysis is an investigation of:",
        "opts": ['Esophagus', 'Small bowel', 'Large bowel', 'Hepato biliary tree'],
        "ans": "Small bowel",
        "exp": "Enteroclysis, also known as small bowel enema, is a fluoroscopic X-ray examination specifically dedicated to evaluating the small intestine."
    },
    {
        "q": "CCD means:",
        "opts": ['Charged couple device', 'Continuous charged detector', 'Conventional charged device', 'Continuous conventional device'],
        "ans": "Charged couple device",
        "exp": "CCD stands for Charge-Coupled Device, an integrated circuit used as a sensor to convert light into electronic signals in digital imaging systems."
    },
    {
        "q": "Target material in an X-Ray tube must have:",
        "opts": ['High atomic number', 'High mass number', 'High cost', 'Low melting point'],
        "ans": "High atomic number",
        "exp": "A high atomic number target material increases the efficiency of bremsstrahlung X-ray production."
    },
    {
        "q": "Interaction of photons with matter include all except:",
        "opts": ['Pair production', 'Leakage radiation', 'Photoelectric radiation', 'Compton scattering'],
        "ans": "Leakage radiation",
        "exp": "Leakage radiation refers to X-rays escaping the tube housing, whereas Pair Production, Photoelectric effect, and Compton scattering are actual photon-matter interactions."
    }
]

output = []
for i, item in enumerate(raw_data):
    opts = item['opts']
    random.shuffle(opts)
    correct_idx = opts.index(item['ans'])
    
    obj = {
        "id": f"p5_q{i+1}",
        "question": item['q'],
        "options": opts,
        "correctAnswer": correct_idx,
        "explanation": item['exp']
    }
    output.append(obj)

with open('p5_chunk2.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=4)

print(f"Successfully generated {len(output)} processed questions in p5_chunk2.json")
