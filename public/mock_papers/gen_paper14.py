import json
import random
import os

questions = [
    # Non-Core: GK
    {
        'type': 'Non-Core',
        'text': 'Which of the following days is celebrated as National Sports Day in India?',
        'options': ['August 29', 'September 5', 'October 2', 'January 12'],
        'correct': 0,
        'exp': 'National Sports Day is celebrated on August 29 to mark the birth anniversary of hockey legend Major Dhyan Chand.'
    },
    {
        'type': 'Non-Core',
        'text': 'Who won the ICC Men\'s Cricket World Cup in 2023?',
        'options': ['Australia', 'India', 'England', 'New Zealand'],
        'correct': 0,
        'exp': 'Australia won the 2023 ICC Men\'s Cricket World Cup by defeating India in the final.'
    },
    {
        'type': 'Non-Core',
        'text': 'The G20 Summit in 2023 was hosted by which country?',
        'options': ['India', 'Indonesia', 'Brazil', 'Japan'],
        'correct': 0,
        'exp': 'India hosted the G20 Summit in September 2023 in New Delhi.'
    },
    {
        'type': 'Non-Core',
        'text': 'World Health Day is observed globally on which date?',
        'options': ['April 7', 'May 1', 'June 5', 'December 1'],
        'correct': 0,
        'exp': 'World Health Day is celebrated annually on April 7, marking the founding of the WHO in 1948.'
    },
    {
        'type': 'Non-Core',
        'text': 'Which Indian athlete is known as the \'Golden Boy\' for his achievements in javelin throw?',
        'options': ['Neeraj Chopra', 'Abhinav Bindra', 'Milkha Singh', 'Bajrang Punia'],
        'correct': 0,
        'exp': 'Neeraj Chopra is widely referred to as the Golden Boy of Indian athletics for his Olympic and World Championship gold medals in javelin throw.'
    },

    # Non-Core: Quant
    {
        'type': 'Non-Core',
        'text': 'Which of the following numbers is a prime number?',
        'options': ['97', '91', '87', '93'],
        'correct': 0,
        'exp': '97 is a prime number. 91 is 7x13, 87 is 3x29, 93 is 3x31.'
    },
    {
        'type': 'Non-Core',
        'text': 'If 15% of a number is 60, what is the number?',
        'options': ['400', '300', '450', '600'],
        'correct': 0,
        'exp': 'Let the number be x. 0.15 * x = 60 => x = 60 / 0.15 = 400.'
    },
    {
        'type': 'Non-Core',
        'text': 'Simplify: 3/4 + 1/6.',
        'options': ['11/12', '4/10', '5/12', '13/12'],
        'correct': 0,
        'exp': 'LCM of 4 and 6 is 12. (9 + 2)/12 = 11/12.'
    },
    {
        'type': 'Non-Core',
        'text': 'What is the square root of 1024?',
        'options': ['32', '34', '28', '24'],
        'correct': 0,
        'exp': '32 * 32 = 1024.'
    },
    {
        'type': 'Non-Core',
        'text': 'If the price of an item increases from Rs. 40 to Rs. 50, what is the percentage increase?',
        'options': ['25%', '20%', '30%', '10%'],
        'correct': 0,
        'exp': 'Increase = 10. Percentage increase = (10 / 40) * 100 = 25%.'
    },

    # Non-Core: Computer Basics & Hardware
    {
        'type': 'Non-Core',
        'text': 'Which hardware component is considered the \'brain\' of the computer?',
        'options': ['CPU (Central Processing Unit)', 'RAM', 'Motherboard', 'Hard Drive'],
        'correct': 0,
        'exp': 'The CPU is responsible for executing instructions and is known as the brain of the computer.'
    },
    {
        'type': 'Non-Core',
        'text': 'Which of the following is considered non-volatile memory?',
        'options': ['ROM', 'SRAM', 'DRAM', 'Cache Memory'],
        'correct': 0,
        'exp': 'ROM (Read-Only Memory) retains its data even when power is turned off, making it non-volatile.'
    },
    {
        'type': 'Non-Core',
        'text': 'An SSD (Solid State Drive) stores data using:',
        'options': ['Flash memory chips', 'Magnetic platters', 'Optical lasers', 'Magnetic tape'],
        'correct': 0,
        'exp': 'SSDs use NAND-based flash memory chips to store data persistently.'
    },
    {
        'type': 'Non-Core',
        'text': 'What is the purpose of the Motherboard in a computer?',
        'options': ['It connects and allows communication between all hardware components.', 'It cools the CPU.', 'It provides power to the house.', 'It displays images on the screen.'],
        'correct': 0,
        'exp': 'The motherboard is the main printed circuit board that connects all the components of a computer together.'
    },
    {
        'type': 'Non-Core',
        'text': 'Which port is commonly used to connect high-definition displays?',
        'options': ['HDMI', 'VGA', 'PS/2', 'Ethernet'],
        'correct': 0,
        'exp': 'HDMI (High-Definition Multimedia Interface) transmits both high-definition video and audio.'
    },

    # Non-Core: General Intelligence / English
    {
        'type': 'Non-Core',
        'text': 'Choose the correct synonym for \'Meticulous\'.',
        'options': ['Careful', 'Sloppy', 'Quick', 'Loud'],
        'correct': 0,
        'exp': 'Meticulous means showing great attention to detail; very careful and precise.'
    },
    {
        'type': 'Non-Core',
        'text': 'Complete the series: 2, 6, 12, 20, 30, ?',
        'options': ['42', '40', '36', '48'],
        'correct': 0,
        'exp': 'The differences are 4, 6, 8, 10... Next difference is 12. 30 + 12 = 42.'
    },
    {
        'type': 'Non-Core',
        'text': 'Find the odd one out:',
        'options': ['Jupiter', 'Earth', 'Moon', 'Mars'],
        'correct': 2,
        'exp': 'Moon is a satellite, while the others are planets.'
    },
    {
        'type': 'Non-Core',
        'text': 'If A is the brother of B, and B is the sister of C, how is A related to C?',
        'options': ['Brother', 'Uncle', 'Cousin', 'Father'],
        'correct': 0,
        'exp': 'A, B, and C are siblings. Since A is male (brother of B), A is the brother of C.'
    },
    {
        'type': 'Non-Core',
        'text': 'Fill in the blank: The doctor advised him to abstain ___ smoking.',
        'options': ['from', 'of', 'to', 'in'],
        'correct': 0,
        'exp': '\'Abstain from\' is the correct prepositional phrase.'
    },
]

# Core: Radiotherapy & Brachytherapy (20)
rt_questions = [
    {
        'text': 'Which isotope is commonly used in external beam teletherapy machines?',
        'options': ['Cobalt-60', 'Iridium-192', 'Iodine-131', 'Technetium-99m'],
        'correct': 0,
        'exp': 'Cobalt-60 emits high-energy gamma rays (1.17 and 1.33 MeV) and has been a staple in external beam radiation therapy.'
    },
    {
        'text': 'What is the half-life of Cobalt-60?',
        'options': ['5.26 years', '74.2 days', '8 days', '30 years'],
        'correct': 0,
        'exp': 'Cobalt-60 has a half-life of 5.26 years, decaying by beta emission to Nickel-60.'
    },
    {
        'text': 'Which component of a linear accelerator generates high-frequency microwave power?',
        'options': ['Magnetron or Klystron', 'Electron gun', 'Bending magnet', 'Target'],
        'correct': 0,
        'exp': 'Magnetrons and Klystrons generate or amplify the microwave power used to accelerate electrons in a LINAC.'
    },
    {
        'text': 'In Brachytherapy, radiation sources are placed:',
        'options': ['Inside or directly next to the tumor', 'At a distance of 100 cm from the patient', 'Only given orally as liquid', 'Intravenously exclusively'],
        'correct': 0,
        'exp': 'Brachytherapy involves placing sealed radioactive sources within or in close proximity to the treatment volume.'
    },
    {
        'text': 'High Dose Rate (HDR) Brachytherapy most commonly utilizes which radioisotope?',
        'options': ['Iridium-192', 'Strontium-90', 'Radium-226', 'Fluorine-18'],
        'correct': 0,
        'exp': 'Iridium-192 is the most common isotope used in HDR brachytherapy afterloaders due to its high specific activity and 73.8-day half-life.'
    },
    {
        'text': 'What does the term \'Isocenter\' refer to in radiation therapy?',
        'options': ['The point in space where the gantry, collimator, and couch axes intersect', 'The central position of the tumor', 'The surface of the patient\'s skin', 'The exit point of the beam'],
        'correct': 0,
        'exp': 'The isocenter is the fixed point of intersection of the three axes of rotation of the treatment unit, usually placed inside the tumor volume.'
    },
    {
        'text': 'Which modifying device is used in radiotherapy to compensate for irregular patient contours?',
        'options': ['Wedges / Compensators', 'Grid', 'Intensifying screen', 'Lead apron'],
        'correct': 0,
        'exp': 'Wedges and compensators alter the beam intensity profile to account for missing tissue or irregular contours.'
    },
    {
        'text': 'A multileaf collimator (MLC) is primarily used for:',
        'options': ['Conformal shaping of the radiation beam', 'Increasing the beam energy', 'Filtering out low energy x-rays', 'Cooling the target'],
        'correct': 0,
        'exp': 'MLCs allow custom beam shaping for each treatment field, essential for 3D-CRT and IMRT.'
    },
    {
        'text': 'Electron beams in radiotherapy are typically used to treat:',
        'options': ['Superficial tumors (e.g., skin, breast boost)', 'Deep-seated pelvic tumors', 'Brain metastases', 'Lung tumors centrally located'],
        'correct': 0,
        'exp': 'Electrons have a rapid dose fall-off, making them ideal for superficial lesions while sparing deeper healthy tissues.'
    },
    {
        'text': 'What is the typical average energy of the two gamma rays emitted by Cobalt-60?',
        'options': ['1.25 MeV', '0.66 MeV', '6.0 MeV', '140 keV'],
        'correct': 0,
        'exp': 'Cobalt-60 emits gamma rays of 1.17 MeV and 1.33 MeV, averaging 1.25 MeV.'
    },
    {
        'text': 'Permanent prostate brachytherapy seed implants commonly use which isotopes?',
        'options': ['Iodine-125 or Palladium-103', 'Cobalt-60', 'Iridium-192', 'Cesium-137'],
        'correct': 0,
        'exp': 'I-125 and Pd-103 have low photon energies and short half-lives suitable for permanent LDR seed implants.'
    },
    {
        'text': 'In a linear accelerator, what directs the electron beam toward the X-ray target after acceleration?',
        'options': ['Bending magnet', 'Thyratron', 'Waveguide', 'Scattering foil'],
        'correct': 0,
        'exp': 'The bending magnet steers the accelerated electron beam (often by 90 or 270 degrees) to hit the target for x-ray production or scattering foil for electron therapy.'
    },
    {
        'text': 'The depth of maximum dose (Dmax) for a 6 MV photon beam is approximately:',
        'options': ['1.5 cm', '0.5 cm', '3.0 cm', 'Skin surface'],
        'correct': 0,
        'exp': 'For 6 MV photons, Dmax occurs at about 1.5 cm depth in tissue. For Co-60 it is 0.5 cm.'
    },
    {
        'text': 'A scattering foil in a LINAC is used when treating with:',
        'options': ['Electron beams', 'Photon beams', 'Proton beams', 'Neutron beams'],
        'correct': 0,
        'exp': 'A scattering foil broadens a narrow pencil electron beam into a uniform clinical electron field. A target is used for photons.'
    },
    {
        'text': 'Which brachytherapy applicator is classically used for cervical cancer treatment?',
        'options': ['Fletcher-Suit applicator (Tandem and Ovoids)', 'Cylinders', 'Prostate seeds', 'Eye plaque'],
        'correct': 0,
        'exp': 'Tandem and Ovoids (Fletcher-Suit) are widely used in intracavitary brachytherapy for cervical cancer.'
    },
    {
        'text': 'Radium-226 is historically important in brachytherapy but is largely replaced due to:',
        'options': ['High risk of radon gas leakage and long half-life', 'Inability to penetrate tissue', 'Short half-life requiring frequent replacement', 'Lack of gamma emission'],
        'correct': 0,
        'exp': 'Radium-226 has a 1622-year half-life and decays to Radon gas, posing significant radiation safety hazards if the source capsule leaks.'
    },
    {
        'text': 'IMRT stands for:',
        'options': ['Intensity Modulated Radiation Therapy', 'Internal Magnetic Resonance Therapy', 'Image Monitored Radiation Technique', 'Intravenous Molecular Radioactive Treatment'],
        'correct': 0,
        'exp': 'IMRT uses computer-controlled linear accelerators to deliver precise radiation doses by modulating the intensity of the beam.'
    },
    {
        'text': 'In brachytherapy, HDR means the dose rate is typically greater than:',
        'options': ['12 Gy/hour', '2 Gy/hour', '0.5 Gy/hour', '100 Gy/hour'],
        'correct': 0,
        'exp': 'HDR brachytherapy is defined as dose rates >12 Gy/hour, typically delivered in minutes.'
    },
    {
        'text': 'What is the physical principle behind the flattening filter in a LINAC?',
        'options': ['It creates a uniform dose distribution across the photon beam', 'It removes neutrons', 'It cools the target', 'It accelerates electrons'],
        'correct': 0,
        'exp': 'The flattening filter is thickest in the center to attenuate the forward-peaked photon beam and make it uniform (flat) across the field.'
    },
    {
        'text': 'Total Body Irradiation (TBI) is most frequently used as a conditioning regimen for:',
        'options': ['Bone marrow / stem cell transplantation', 'Skin cancer', 'Prostate cancer', 'Brain tumors'],
        'correct': 0,
        'exp': 'TBI is used to immunosuppress the patient and eradicate malignant cells prior to bone marrow transplant, often for leukemia.'
    }
]

# Core: Anatomy of Thorax & Respiratory System (15)
thor_questions = [
    {
        'text': 'Which structure is known as the windpipe?',
        'options': ['Trachea', 'Esophagus', 'Pharynx', 'Bronchiole'],
        'correct': 0,
        'exp': 'The trachea is the cartilaginous tube that connects the larynx to the bronchi, serving as the windpipe.'
    },
    {
        'text': 'The carina is the point where the trachea bifurcates into the left and right main stem bronchi. At what vertebral level does it typically occur?',
        'options': ['T4-T5', 'C6-C7', 'T1-T2', 'T8-T9'],
        'correct': 0,
        'exp': 'The carina is located at the sternal angle anteriorly and the T4-T5 intervertebral disc level posteriorly.'
    },
    {
        'text': 'Which primary bronchus is wider, shorter, and more vertical?',
        'options': ['Right primary bronchus', 'Left primary bronchus', 'They are identical', 'Neither'],
        'correct': 0,
        'exp': 'The right main bronchus is wider, shorter, and more vertical, making aspirated foreign bodies more likely to enter the right lung.'
    },
    {
        'text': 'How many lobes does the right lung have?',
        'options': ['3', '2', '4', '1'],
        'correct': 0,
        'exp': 'The right lung has three lobes (superior, middle, inferior) separated by the oblique and horizontal fissures.'
    },
    {
        'text': 'The primary site of gas exchange in the lungs is the:',
        'options': ['Alveoli', 'Terminal bronchioles', 'Trachea', 'Pleura'],
        'correct': 0,
        'exp': 'Alveoli are tiny air sacs where oxygen and carbon dioxide are exchanged with blood in capillaries.'
    },
    {
        'text': 'What is the name of the double-layered serous membrane that surrounds each lung?',
        'options': ['Pleura', 'Pericardium', 'Peritoneum', 'Meninges'],
        'correct': 0,
        'exp': 'The pleura consists of a visceral layer covering the lung and a parietal layer lining the thoracic cavity.'
    },
    {
        'text': 'The space in the thoracic cavity between the lungs containing the heart, great vessels, and esophagus is the:',
        'options': ['Mediastinum', 'Pleural cavity', 'Pericardial cavity', 'Diaphragm'],
        'correct': 0,
        'exp': 'The mediastinum is the central compartment of the thoracic cavity.'
    },
    {
        'text': 'Which of the following structures passes through the diaphragm at the T10 level?',
        'options': ['Esophagus', 'Aorta', 'Inferior Vena Cava', 'Trachea'],
        'correct': 0,
        'exp': 'The IVC passes at T8, Esophagus at T10, and Aorta at T12 (remember: I 8 10 Eggs At 12).'
    },
    {
        'text': 'The cardiac notch is a feature of which organ?',
        'options': ['Left lung', 'Right lung', 'Heart', 'Liver'],
        'correct': 0,
        'exp': 'The cardiac notch is an indentation on the anterior border of the left lung to accommodate the heart.'
    },
    {
        'text': 'Which muscle is the primary muscle of inspiration?',
        'options': ['Diaphragm', 'Internal intercostals', 'Pectoralis major', 'Rectus abdominis'],
        'correct': 0,
        'exp': 'The diaphragm contracts and flattens during inspiration, increasing the thoracic cavity volume.'
    },
    {
        'text': 'The hilum of the lung is the region where:',
        'options': ['Bronchi, pulmonary blood vessels, and nerves enter and exit the lung', 'Gas exchange occurs', 'The lung attaches to the diaphragm', 'Pleural fluid is produced'],
        'correct': 0,
        'exp': 'The hilum is the "root" of the lung located on the mediastinal surface.'
    },
    {
        'text': 'What is the function of surfactant in the alveoli?',
        'options': ['Reduces surface tension to prevent alveolar collapse', 'Increases blood flow to the lungs', 'Fights respiratory infections', 'Traps dust and debris'],
        'correct': 0,
        'exp': 'Surfactant lowers the surface tension of fluid in the alveoli, preventing them from collapsing during exhalation.'
    },
    {
        'text': 'A pneumothorax refers to the presence of ___ in the pleural space.',
        'options': ['Air', 'Blood', 'Pus', 'Lymph'],
        'correct': 0,
        'exp': 'Pneumothorax is the accumulation of air in the pleural cavity causing lung collapse.'
    },
    {
        'text': 'On a normal PA chest radiograph, the right hemidiaphragm is usually:',
        'options': ['Slightly higher than the left', 'Lower than the left', 'At the exact same level as the left', 'Not visible'],
        'correct': 0,
        'exp': 'The right hemidiaphragm is typically 1.5 to 2.5 cm higher than the left due to the liver pushing it up.'
    },
    {
        'text': 'The lingula is a tongue-like projection found on the:',
        'options': ['Left lung superior lobe', 'Right lung middle lobe', 'Left lung inferior lobe', 'Right lung inferior lobe'],
        'correct': 0,
        'exp': 'The lingula is part of the left superior lobe and is considered the anatomical equivalent of the right middle lobe.'
    }
]

# Core: Hospital Practice, Ethics, Consent & Records (20 questions instead of 15 to make up 100)
ethics_questions = [
    {
        'text': 'Which principle of biomedical ethics refers to "Do no harm"?',
        'options': ['Non-maleficence', 'Beneficence', 'Autonomy', 'Justice'],
        'correct': 0,
        'exp': 'Non-maleficence requires that medical practitioners avoid causing harm to the patient.'
    },
    {
        'text': 'Informed consent for a contrast-enhanced CT scan must ideally be obtained by:',
        'options': ['A physician/radiologist explaining risks and benefits', 'The receptionist at the front desk', 'The ward nurse only', 'The hospital security guard'],
        'correct': 0,
        'exp': 'Informed consent requires a knowledgeable medical professional to explain the procedure, risks, benefits, and alternatives.'
    },
    {
        'text': 'A patient\'s medical record, including radiological images, is the physical property of:',
        'options': ['The hospital or imaging facility', 'The patient', 'The referring doctor', 'The radiographer'],
        'correct': 0,
        'exp': 'The physical records belong to the facility, while the information within them belongs to the patient.'
    },
    {
        'text': 'HIPAA in the context of medical records stands for:',
        'options': ['Health Insurance Portability and Accountability Act', 'Hospital Information Privacy and Access Act', 'Health Information Protection and Agreement Act', 'Healthcare Insurance Protection and Administration Act'],
        'correct': 0,
        'exp': 'HIPAA sets the standard for sensitive patient data protection.'
    },
    {
        'text': 'Which of the following describes the ethical principle of "Autonomy"?',
        'options': ['Respecting the patient\'s right to make their own medical decisions', 'Treating all patients fairly', 'Acting in the best interest of the patient', 'Telling the absolute truth'],
        'correct': 0,
        'exp': 'Autonomy is the right of competent adults to make informed decisions about their own medical care.'
    },
    {
        'text': 'If a patient refuses to proceed with a radiologic exam after arriving in the room, the technologist should:',
        'options': ['Respect their decision, stop the exam, and inform the physician', 'Restrain the patient and perform the exam', 'Proceed with the exam and ignore the patient', 'Tell the patient they have no choice'],
        'correct': 0,
        'exp': 'A patient can withdraw consent at any time. The technologist must stop and inform the referring doctor.'
    },
    {
        'text': 'The standard retention period for adult radiological images/records in a hospital (medico-legal requirement) is generally at least:',
        'options': ['5 to 10 years', '1 year', '30 days', '6 months'],
        'correct': 0,
        'exp': 'Record retention laws vary, but it is typically 5 to 10 years for adults.'
    },
    {
        'text': 'What is "Respondeat Superior"?',
        'options': ['Let the master answer (employer is liable for employee actions)', 'The thing speaks for itself', 'Do no harm', 'A breach of duty'],
        'correct': 0,
        'exp': 'Respondeat superior is a legal doctrine where an employer is legally responsible for the wrongful acts of an employee.'
    },
    {
        'text': 'What does "Res ipsa loquitur" mean in medical malpractice?',
        'options': ['The thing speaks for itself (negligence is obvious)', 'Patient autonomy', 'Informed consent', 'Standard of care'],
        'correct': 0,
        'exp': 'Used in cases where the injury could not have occurred without negligence (e.g., surgical instrument left in a patient).'
    },
    {
        'text': 'Administering wrong medication or contrast media to a patient falls under:',
        'options': ['Malpractice / Negligence', 'Assault', 'Battery', 'Libel'],
        'correct': 0,
        'exp': 'Negligence involves failing to provide the standard of care, causing harm.'
    },
    {
        'text': 'Performing an X-ray on a patient against their will can be legally considered:',
        'options': ['Battery', 'Slander', 'Fraud', 'Malpractice'],
        'correct': 0,
        'exp': 'Battery is intentional and unconsented touching. Assault is the threat of touching.'
    },
    {
        'text': 'Which condition must be met for a consent to be considered "valid"?',
        'options': ['The patient must be mentally competent and act voluntarily', 'The patient must sign it within 5 minutes', 'The patient must have a family member present', 'The patient must be over 65 years old'],
        'correct': 0,
        'exp': 'Valid consent requires competence, voluntariness, and adequate information.'
    },
    {
        'text': 'Sharing a patient\'s diagnosis with unauthorized personnel is a breach of:',
        'options': ['Confidentiality', 'Veracity', 'Justice', 'Fidelity'],
        'correct': 0,
        'exp': 'Confidentiality mandates keeping patient information private unless authorized.'
    },
    {
        'text': 'Which is an example of an objective sign in a patient\'s medical assessment?',
        'options': ['Blood pressure reading of 120/80', 'Patient complaining of a headache', 'Patient feeling nauseous', 'Patient expressing anxiety'],
        'correct': 0,
        'exp': 'Objective signs are measurable and observable by the clinician. Subjective symptoms are felt by the patient.'
    },
    {
        'text': 'Proper hand hygiene in a radiology department is an essential component of:',
        'options': ['Standard Precautions', 'Radiation Protection', 'Quality Assurance', 'HIPAA'],
        'correct': 0,
        'exp': 'Standard precautions are basic infection control practices used for all patient care.'
    },
    {
        'text': 'What does "Veracity" mean in medical ethics?',
        'options': ['Telling the truth to the patient', 'Keeping promises', 'Doing good', 'Being fair'],
        'correct': 0,
        'exp': 'Veracity refers to the ethical obligation to be honest and truthful.'
    },
    {
        'text': 'A radiographer discussing a patient\'s condition loudly in an elevator is a violation of:',
        'options': ['Patient Privacy / Confidentiality', 'Autonomy', 'Non-maleficence', 'Battery'],
        'correct': 0,
        'exp': 'Discussing PHI (Protected Health Information) in public areas is a breach of privacy.'
    },
    {
        'text': 'Which of the following describes "Fidelity"?',
        'options': ['Keeping promises and maintaining loyalty to the patient', 'Treating everyone equally', 'Telling the truth', 'Preventing harm'],
        'correct': 0,
        'exp': 'Fidelity is the duty to keep commitments and act in the patient\'s best interest.'
    },
    {
        'text': 'A written defamatory statement about a patient in their medical record is called:',
        'options': ['Libel', 'Slander', 'Assault', 'Fraud'],
        'correct': 0,
        'exp': 'Libel is written defamation. Slander is spoken defamation.'
    },
    {
        'text': 'When should an incident report be filed?',
        'options': ['Immediately after any unusual event or injury occurs', 'At the end of the month', 'Only if the patient sues', 'Never, to avoid liability'],
        'correct': 0,
        'exp': 'Incident reports should be completed promptly after any adverse event or deviation from normal procedure.'
    }
]

# Core: Basic Radiation Physics (Atomic structure, EM spectrum) (15)
phys_questions = [
    {
        'text': 'The atomic number (Z) of an element represents the number of:',
        'options': ['Protons in the nucleus', 'Neutrons in the nucleus', 'Protons plus neutrons', 'Electrons in the outermost shell'],
        'correct': 0,
        'exp': 'Atomic number (Z) is the number of protons, which determines the chemical identity of the element.'
    },
    {
        'text': 'Isotopes of an element have the same number of protons but different numbers of:',
        'options': ['Neutrons', 'Electrons', 'Photons', 'Orbitals'],
        'correct': 0,
        'exp': 'Isotopes have the same Z (protons) but different A (mass number) due to different numbers of neutrons.'
    },
    {
        'text': 'Electromagnetic radiation travels in a vacuum at:',
        'options': ['The speed of light (3 x 10^8 m/s)', 'The speed of sound', 'Variable speeds depending on energy', '1.5 x 10^8 m/s'],
        'correct': 0,
        'exp': 'All electromagnetic waves travel at the speed of light in a vacuum.'
    },
    {
        'text': 'As the wavelength of an electromagnetic wave decreases, its frequency:',
        'options': ['Increases', 'Decreases', 'Remains the same', 'Becomes zero'],
        'correct': 0,
        'exp': 'Wavelength and frequency are inversely proportional (c = lambda x nu).'
    },
    {
        'text': 'Which of the following is NOT a form of electromagnetic radiation?',
        'options': ['Beta particles', 'Gamma rays', 'Microwaves', 'X-rays'],
        'correct': 0,
        'exp': 'Beta particles are high-speed electrons (particulate radiation), not electromagnetic waves.'
    },
    {
        'text': 'The energy of a photon is directly proportional to its:',
        'options': ['Frequency', 'Wavelength', 'Amplitude', 'Mass'],
        'correct': 0,
        'exp': 'E = hf (Energy = Planck\'s constant x frequency). Higher frequency means higher energy.'
    },
    {
        'text': 'What type of bond is formed when atoms share electrons?',
        'options': ['Covalent bond', 'Ionic bond', 'Metallic bond', 'Hydrogen bond'],
        'correct': 0,
        'exp': 'Covalent bonds involve the sharing of electron pairs between atoms.'
    },
    {
        'text': 'The process of removing an electron from an atom is called:',
        'options': ['Ionization', 'Excitation', 'Annihilation', 'Radioactivity'],
        'correct': 0,
        'exp': 'Ionization creates an ion pair by ejecting an electron, leaving the atom positively charged.'
    },
    {
        'text': 'Which subatomic particle has the smallest mass?',
        'options': ['Electron', 'Proton', 'Neutron', 'Alpha particle'],
        'correct': 0,
        'exp': 'Electrons are much lighter than protons and neutrons (mass is approx 1/1836 of a proton).'
    },
    {
        'text': 'Alpha particles consist of:',
        'options': ['Two protons and two neutrons', 'One electron', 'Two neutrons only', 'High energy photons'],
        'correct': 0,
        'exp': 'An alpha particle is identical to a helium nucleus (2 protons, 2 neutrons).'
    },
    {
        'text': 'The primary difference between X-rays and Gamma rays is their:',
        'options': ['Origin', 'Mass', 'Velocity', 'Charge'],
        'correct': 0,
        'exp': 'X-rays originate from electron cloud interactions, while gamma rays originate from the atomic nucleus.'
    },
    {
        'text': 'Thermionic emission is the process of releasing electrons from a metal surface by applying:',
        'options': ['Heat', 'Light', 'Magnetic fields', 'Chemicals'],
        'correct': 0,
        'exp': 'Thermionic emission occurs in the X-ray tube filament when heated.'
    },
    {
        'text': 'Bremsstrahlung radiation is produced when an incident electron:',
        'options': ['Slows down and changes direction near a nucleus', 'Knocks out an inner-shell electron', 'Absorbs a photon', 'Collides with another electron'],
        'correct': 0,
        'exp': 'Bremsstrahlung (braking radiation) occurs when high-speed electrons are decelerated by the electric field of a nucleus.'
    },
    {
        'text': 'The mass number (A) represents:',
        'options': ['Sum of protons and neutrons', 'Number of protons only', 'Number of electrons', 'Atomic weight in grams'],
        'correct': 0,
        'exp': 'Mass number A is the total number of nucleons (protons + neutrons) in a nucleus.'
    },
    {
        'text': 'Half-Value Layer (HVL) is an indirect measure of:',
        'options': ['Beam quality or penetrability', 'Beam quantity (mAs)', 'Focal spot size', 'Tube current'],
        'correct': 0,
        'exp': 'HVL measures the thickness of absorber required to halve the beam intensity, indicating its penetrating power or quality.'
    }
]

# Core: General Radiography/Positioning/Other (10)
gen_questions = [
    {
        'text': 'The "Water\'s View" (Parietoacanthial projection) is primarily used to evaluate:',
        'options': ['Maxillary sinuses', 'Foramen magnum', 'Mastoid air cells', 'Cervical spine'],
        'correct': 0,
        'exp': 'Water\'s view demonstrates the maxillary sinuses well, projecting the petrous ridges below them.'
    },
    {
        'text': 'For a lateral view of the cervical spine, the SID (Source to Image Distance) used is typically:',
        'options': ['72 inches (180 cm)', '40 inches (100 cm)', '30 inches', '100 inches'],
        'correct': 0,
        'exp': 'A 72-inch SID is used to reduce magnification caused by the increased OID of the shoulder width.'
    },
    {
        'text': 'Which contrast medium is radio-lucent (negative contrast)?',
        'options': ['Room Air', 'Barium Sulfate', 'Iodine', 'Gadolinium'],
        'correct': 0,
        'exp': 'Air and carbon dioxide appear dark (radiolucent) on X-rays, making them negative contrast agents.'
    },
    {
        'text': 'What is the purpose of a Bucky grid?',
        'options': ['To absorb scatter radiation before it reaches the image receptor', 'To increase X-ray production', 'To hold the patient steady', 'To filter the primary beam'],
        'correct': 0,
        'exp': 'Grids absorb scatter radiation emitted from the patient, improving image contrast.'
    },
    {
        'text': 'In digital radiography, the term "Window Level" controls:',
        'options': ['Image brightness', 'Image contrast', 'Matrix size', 'Spatial resolution'],
        'correct': 0,
        'exp': 'Window Level adjusts the brightness (density), while Window Width controls the contrast.'
    },
    {
        'text': 'What is the primary advantage of Computed Radiography (CR) over conventional film-screen radiography?',
        'options': ['Wider dynamic range', 'Higher spatial resolution', 'Does not use X-rays', 'Requires no reader device'],
        'correct': 0,
        'exp': 'CR and DR have a wide dynamic range, allowing correction of exposure errors and reducing repeats.'
    },
    {
        'text': 'Which technical factor primarily controls the penetrating power (quality) of the X-ray beam?',
        'options': ['kVp', 'mA', 'Time (seconds)', 'SID'],
        'correct': 0,
        'exp': 'kVp (kilovoltage peak) determines the maximum energy and thus the penetrating power of the beam.'
    },
    {
        'text': 'An AP projection of the pelvis requires the lower limbs to be:',
        'options': ['Internally rotated 15-20 degrees', 'Externally rotated 15 degrees', 'Parallel in anatomical position', 'Flexed at the knees'],
        'correct': 0,
        'exp': 'Internal rotation of 15-20 degrees places the femoral necks parallel to the IR, showing them in true profile.'
    },
    {
        'text': 'Which exam involves introducing barium through a catheter into the large intestine?',
        'options': ['Barium Enema', 'Barium Swallow', 'Barium Meal', 'IVU'],
        'correct': 0,
        'exp': 'A barium enema is a lower GI series to visualize the colon and rectum.'
    },
    {
        'text': 'The term "Dysphagia" means:',
        'options': ['Difficulty swallowing', 'Difficulty breathing', 'Painful urination', 'Loss of speech'],
        'correct': 0,
        'exp': 'Dysphagia is difficulty swallowing, an indication for a barium swallow study.'
    }
]

for section in [rt_questions, thor_questions, ethics_questions, phys_questions, gen_questions]:
    for q in section:
        q['type'] = 'Core'

all_questions = questions + rt_questions + thor_questions + ethics_questions + phys_questions + gen_questions

if len(all_questions) != 100:
    print(f"Error: expected 100 questions, got {len(all_questions)}")
    exit(1)

# Shuffle options and keep track of correct index
final_raw_data = []
for q in all_questions:
    opts = q['options']
    correct_text = opts[q['correct']]
    # Shuffle options
    random.shuffle(opts)
    new_correct_idx = opts.index(correct_text)
    
    final_raw_data.append({
        'type': q['type'],
        'text': q['text'],
        'opts': opts,
        'ans': new_correct_idx,
        'exp': q['exp']
    })

js_array_str = json.dumps(final_raw_data, indent=4)

html_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AIIMS CRE Radiographer - Test Paper 14</title>
    <style>
        :root {
            --header-bg: #3f51b5;
            --header-text: #fff;
            --panel-bg: #f5f5f5;
            --pallet-answered: #4caf50;
            --pallet-not-answered: #f44336;
            --pallet-review: #9c27b0;
            --pallet-not-visited: #e0e0e0;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; }
        body { height: 100vh; display: flex; flex-direction: column; overflow: hidden; background: #fff; }

        /* --- Header --- */
        header {
            background: var(--header-bg); color: var(--header-text);
            padding: 10px 20px; display: flex; justify-content: space-between; align-items: center;
            height: 60px; flex-shrink: 0;
        }
        .timer { font-size: 1.2rem; font-weight: bold; background: #fff; color: #d32f2f; padding: 5px 15px; border-radius: 4px; border: 2px solid #d32f2f; }

        /* --- Main Layout --- */
        .main-container { display: flex; flex: 1; overflow: hidden; }
        
        .question-area { flex: 1; display: flex; flex-direction: column; padding: 20px; overflow-y: auto; }
        .q-header { display: flex; justify-content: space-between; border-bottom: 2px solid #ddd; padding-bottom: 10px; margin-bottom: 15px; }
        .q-text { font-size: 1.1rem; margin-bottom: 20px; line-height: 1.5; }
        
        .options-container { display: flex; flex-direction: column; gap: 10px; }
        .option-label { 
            display: flex; align-items: center; padding: 10px; border: 1px solid #ccc; border-radius: 5px; cursor: pointer; transition: 0.2s; 
        }
        .option-label:hover { background: #f0f8ff; }
        .option-label input { margin-right: 15px; transform: scale(1.2); }

        /* Sidebar */
        .sidebar {
            width: 320px; background: var(--panel-bg); border-left: 1px solid #ccc;
            display: flex; flex-direction: column; flex-shrink: 0;
        }
        .user-info { padding: 10px; background: #e8eaf6; border-bottom: 1px solid #ccc; }
        
        .palette-legend { padding: 10px; font-size: 0.8rem; display: grid; grid-template-columns: 1fr 1fr; gap: 5px; background: #fff; }
        .legend-item { display: flex; align-items: center; gap: 5px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }

        .question-grid { 
            padding: 10px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; 
            overflow-y: auto; flex: 1; align-content: start;
        }
        .q-btn {
            height: 35px; width: 35px; border: 1px solid #ccc; background: #fff; 
            border-radius: 4px; cursor: pointer; font-size: 0.9rem; font-weight: bold;
            display: flex; align-items: center; justify-content: center;
        }
        
        .q-btn.answered { background: var(--pallet-answered); color: white; border-color: var(--pallet-answered); }
        .q-btn.not-answered { background: var(--pallet-not-answered); color: white; border-color: var(--pallet-not-answered); }
        .q-btn.review { background: var(--pallet-review); color: white; border-radius: 50%; }
        .q-btn.current { border: 2px solid blue; box-shadow: 0 0 5px blue; }
        .q-btn.locked { opacity: 0.4; cursor: not-allowed; background: #444 !important; color: #888; border: 1px solid #000; }

        /* Footer */
        .footer-controls {
            height: 60px; background: #fff; border-top: 1px solid #ccc;
            display: flex; align-items: center; justify-content: space-between; padding: 0 20px;
        }
        .btn { padding: 8px 20px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 0.9rem; }
        .btn-primary { background: #2196f3; color: white; }
        .btn-success { background: #4caf50; color: white; }
        .btn-warn { background: #ff9800; color: white; }
        .btn-danger { background: #f44336; color: white; }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Mobile */
        .mobile-toggle { display: none; background: none; border: none; color: white; font-size: 1.5rem; }
        @media (max-width: 768px) {
            .mobile-toggle { display: block; }
            .sidebar { 
                position: absolute; right: 0; top: 60px; bottom: 60px; z-index: 100;
                transform: translateX(100%); transition: transform 0.3s; width: 85%;
            }
            .sidebar.active { transform: translateX(0); }
            .question-grid { grid-template-columns: repeat(6, 1fr); }
            .footer-controls { flex-wrap: wrap; gap: 5px; height: auto; padding: 10px; }
            .btn { flex: 1; padding: 8px; font-size: 0.8rem; }
        }

        /* Overlay */
        .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #fff; z-index: 1000; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .hidden { display: none !important; }
        
        .review-panel { display: none; padding: 20px; height: 100%; overflow-y: auto; background:#f9f9f9;}
        .review-item { margin-bottom: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 5px; background:white; }
        .explanation { background: #fff3cd; padding: 10px; margin-top: 10px; font-size: 0.9rem; border-left: 4px solid #ffc107; }

    </style>
</head>
<body>

    <div id="landingPage" class="overlay">
        <h1>AIIMS CRE - Test Paper 14</h1>
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
        const LS_KEY = 'test_paper_14_state';
        
        let questions = [];

        function generateQuestions() {
            const createQ = (id, type, text, opts, ans, exp) => ({ id, type, text, opts, ans, exp });
            questions = []; // Reset array

            const raw_data = """ + js_array_str + """;
            
            raw_data.forEach((d, i) => questions.push(createQ(i + 1, d.type, d.text, d.opts, d.ans, d.exp)));
        }

        // --- STATE MANAGEMENT ---
        let state = {
            currentQ: 0,
            answers: new Array(TOTAL_QUESTIONS).fill(null),
            status: new Array(TOTAL_QUESTIONS).fill('not-visited'),
            currentSection: 1,      // 1 to 5
            sectionTimeLeft: SECTION_TIME_LIMIT,
            maxSetReached: 1,       // Tracks highest section unlocked
            isFinished: false
        };

        const els = {
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
        };

        let timerInterval;

        function saveState() {
            localStorage.setItem(LS_KEY, JSON.stringify(state));
        }

        function loadState() {
            const saved = localStorage.getItem(LS_KEY);
            if (saved) {
                state = JSON.parse(saved);
                return true;
            }
            return false;
        }

        function init() {
            generateQuestions(); // Load data
            els.landing.classList.remove('hidden');
            els.result.classList.add('hidden');
            
            if (loadState()) {
                if (state.isFinished) {
                    els.landing.classList.add('hidden');
                    finishExam(true);
                } else {
                    if (confirm("Resume previous session?")) {
                        els.landing.classList.add('hidden');
                        renderExamInterface();
                        startSectionTimer();
                    } else {
                        localStorage.removeItem(LS_KEY);
                        location.reload();
                    }
                }
            }
        }

        function startExam() {
            els.landing.classList.add('hidden');
            renderExamInterface();
            startSectionTimer();
            saveState();
        }

        function startSectionTimer() {
            if(timerInterval) clearInterval(timerInterval);
            
            timerInterval = setInterval(() => {
                state.sectionTimeLeft--;
                
                // Format Time
                const m = Math.floor(state.sectionTimeLeft / 60);
                const s = state.sectionTimeLeft % 60;
                els.timer.innerText = `${m}:${s < 10 ? '0'+s : s}`;
                
                // Visual Warning
                if(state.sectionTimeLeft < 60) els.timer.style.backgroundColor = "#ffcdd2";
                else els.timer.style.backgroundColor = "#fff";

                // Time Up Logic
                if (state.sectionTimeLeft <= 0) {
                    handleSectionTimeout();
                }
            }, 1000);
        }

        function handleSectionTimeout() {
            clearInterval(timerInterval);
            
            if (state.currentSection < 5) {
                alert(`Time is up for Section ${state.currentSection}! Moving to Section ${state.currentSection + 1}.`);
                forceNextSection();
            } else {
                alert("Time is up for the final section! Submitting Exam.");
                finishExam();
            }
        }

        function forceNextSection() {
            state.currentSection++;
            state.maxSetReached = state.currentSection;
            state.sectionTimeLeft = SECTION_TIME_LIMIT;
            
            // Move to first question of next section
            const firstQofNextSection = (state.currentSection - 1) * SECTION_SIZE;
            loadQuestion(firstQofNextSection);
            startSectionTimer();
            saveState();
        }

        function renderExamInterface() {
            els.header.classList.remove('hidden');
            els.body.classList.remove('hidden');
            els.footer.classList.remove('hidden');
            renderPalette();
            loadQuestion(state.currentQ);
        }

        function loadQuestion(index) {
            state.currentQ = index;
            if(state.status[index] === 'not-visited') state.status[index] = 'not-answered';

            // Update Section Label
            const secNum = Math.floor(index / SECTION_SIZE) + 1;
            els.sectionLabel.innerText = `Section ${secNum} (Q${(secNum-1)*20 + 1}-${secNum*20})`;

            // Render Text
            els.qNum.innerText = `Question ${index + 1}`;
            els.qText.innerText = questions[index].text;
            
            // Render Options
            els.optsBox.innerHTML = '';
            questions[index].opts.forEach((opt, i) => {
                const isChecked = state.answers[index] === i ? 'checked' : '';
                els.optsBox.innerHTML += `
                    <label class="option-label">
                        <input type="radio" name="opt" value="${i}" ${isChecked} onchange="selectOption(${i})">
                        ${opt}
                    </label>
                `;
            });

            // Update Palette UI
            document.querySelectorAll('.q-btn').forEach(b => b.classList.remove('current'));
            const currentBtn = document.getElementById(`qbtn-${index}`);
            if(currentBtn) currentBtn.classList.add('current');

            // Handle Prev Button State (Cannot go back to previous locked section)
            const startOfCurrentSection = (state.currentSection - 1) * SECTION_SIZE;
            els.btnPrev.disabled = (index <= startOfCurrentSection);
            
            saveState();
        }

        function selectOption(optIndex) {
            state.answers[state.currentQ] = optIndex;
            saveState();
        }

        function saveAndNext() {
            const index = state.currentQ;
            // Update status
            state.status[index] = (state.answers[index] !== null) ? 'answered' : 'not-answered';
            
            moveToNextQuestion();
        }

        function markForReview() {
            const index = state.currentQ;
            state.status[index] = (state.answers[index] !== null) ? 'marked-answered' : 'review';
            moveToNextQuestion();
        }

        function clearResponse() {
            state.answers[state.currentQ] = null;
            state.status[state.currentQ] = 'not-answered';
            loadQuestion(state.currentQ);
            renderPalette();
            saveState();
        }

        function moveToNextQuestion() {
            const nextIndex = state.currentQ + 1;
            const currentSecBound = state.currentSection * SECTION_SIZE;

            // Check if next question crosses section boundary
            if (nextIndex >= currentSecBound) {
                // End of section reached
                if (state.currentSection < 5) {
                    if (confirm(`You have reached the end of Section ${state.currentSection}.\\nDo you want to submit this section and move to Section ${state.currentSection+1}?\\n\\nWARNING: You cannot return to this section.`)) {
                        forceNextSection();
                    }
                } else {
                    if(confirm("This was the last question. Submit Exam?")) {
                        finishExam();
                    }
                }
            } else {
                // Normal movement within section
                renderPalette();
                loadQuestion(nextIndex);
            }
        }

        function prevQuestion() {
            if (state.currentQ > 0) {
                loadQuestion(state.currentQ - 1);
            }
        }

        function renderPalette() {
            els.palette.innerHTML = '';
            for (let i = 0; i < TOTAL_QUESTIONS; i++) {
                let statusClass = state.status[i];
                if(statusClass === 'marked-answered') statusClass = 'review';
                
                // Check if question belongs to a locked (previous) section
                const qSection = Math.floor(i / SECTION_SIZE) + 1;
                const isLocked = qSection < state.currentSection;
                const lockedClass = isLocked ? ' locked' : '';
                
                // Gray out future sections
                const isFuture = qSection > state.currentSection;
                const futureStyle = isFuture ? 'opacity:0.3; pointer-events:none;' : '';

                els.palette.innerHTML += `
                    <div id="qbtn-${i}" 
                         class="q-btn ${statusClass}${lockedClass}" 
                         style="${futureStyle}"
                         onclick="jumpToQuestion(${i})">
                        ${i + 1}
                    </div>
                `;
            }
        }

        function jumpToQuestion(index) {
            const qSection = Math.floor(index / SECTION_SIZE) + 1;
            
            if (qSection < state.currentSection) {
                alert("This section is locked.");
                return;
            }
            if (qSection > state.currentSection) {
                alert("You cannot jump to a future section yet.");
                return;
            }
            
            loadQuestion(index);
        }

        function submitExam() {
            if(confirm("Are you sure you want to finish the exam? Unanswered questions in future sections will be marked zero.")) {
                finishExam();
            }
        }

        function finishExam(skipSave = false) {
            clearInterval(timerInterval);
            state.isFinished = true;
            if (!skipSave) saveState();
            
            els.header.classList.add('hidden');
            els.body.classList.add('hidden');
            els.footer.classList.add('hidden');
            els.result.classList.remove('hidden');
            
            calculateResult();
        }

        function calculateResult() {
            let correct = 0, wrong = 0, unattempted = 0, score = 0;

            state.answers.forEach((ans, i) => {
                if (ans === null) {
                    unattempted++;
                } else if (questions[i] && ans === questions[i].ans) {
                    correct++;
                    score += 4;
                } else {
                    wrong++;
                    score -= 1;
                }
            });

            document.getElementById('scoreCard').innerHTML = `
                <h1 style="color:#3f51b5; font-size:3rem;">${score} / 400</h1>
                <p><strong>Correct:</strong> ${correct} (+${correct*4})</p>
                <p><strong>Incorrect:</strong> ${wrong} (-${wrong})</p>
                <p><strong>Unattempted:</strong> ${unattempted}</p>
            `;
        }

        function showDetailedReview() {
            const container = document.getElementById('detailedReview');
            container.style.display = 'block';
            container.innerHTML = '<h3>Detailed Solutions</h3>';
            
            questions.forEach((q, i) => {
                const userAns = state.answers[i];
                const isCorrect = userAns === q.ans;
                const statusColor = userAns === null ? 'gray' : (isCorrect ? 'green' : 'red');
                const statusText = userAns === null ? 'Skipped' : (isCorrect ? 'Correct' : 'Incorrect');

                let optsHtml = '';
                q.opts.forEach((opt, oi) => {
                    let style = '';
                    if (oi === q.ans) style = 'font-weight:bold; color:green;'; 
                    if (oi === userAns && !isCorrect) style = 'font-weight:bold; color:red;'; 
                    optsHtml += `<div style="${style}">${oi+1}. ${opt}</div>`;
                });

                container.innerHTML += `
                    <div class="review-item">
                        <div style="color:${statusColor}; font-weight:bold; margin-bottom:5px;">Q${i+1}: ${statusText}</div>
                        <div>${q.text}</div>
                        <div style="margin:10px 0; padding-left:15px; border-left:3px solid #ddd;">${optsHtml}</div>
                        <div class="explanation"><strong>Explanation:</strong> ${q.exp}</div>
                    </div>
                `;
            });
        }

        function toggleSidebar() {
            els.sidebar.classList.toggle('active');
        }

        // Initialize
        init();

    </script>
</body>
</html>
"""

with open(r"c:\Users\annsh\Documents\kiddoprep-quiz-app\public\mock_papers\TEST_PAPER14.html", "w", encoding="utf-8") as f:
    f.write(html_template)
print("Success!")
