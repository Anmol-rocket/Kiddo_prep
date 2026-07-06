import json
import random
import sys
import re

# Template path
TEMPLATE_PATH = "CBT10.html"
OUTPUT_PATH = "TEST_PAPER9.html"

non_core = [
    # Syllogism
    {"text": "Statements: All tables are chairs. No chair is a bed. Conclusion: I. No table is a bed. II. Some chairs are tables.", "opts": ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"], "ans_text": "Both I and II follow", "exp": "Since all tables are within chairs and no chair is a bed, no table can be a bed. Also, since all tables are chairs, some chairs are tables."},
    {"text": "Statements: Some cats are dogs. All dogs are birds. Conclusion: I. Some cats are birds. II. No cat is a bird.", "opts": ["Only I follows", "Only II follows", "Both I and II follow", "Either I or II follows"], "ans_text": "Only I follows", "exp": "Since some cats are dogs and all dogs are birds, the intersection of cats and dogs is within birds, so some cats are birds."},
    {"text": "Statements: All flowers are trees. All trees are forests. Conclusion: I. All flowers are forests. II. All forests are flowers.", "opts": ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"], "ans_text": "Only I follows", "exp": "Flowers is a subset of trees, which is a subset of forests. So all flowers are forests. But not all forests are flowers."},
    {"text": "Statements: Some pens are pencils. Some pencils are erasers. Conclusion: I. Some pens are erasers. II. All erasers are pens.", "opts": ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"], "ans_text": "Neither I nor II follows", "exp": "There is no direct relation given between pens and erasers. Both conclusions are invalid."},

    # Indian Polity
    {"text": "Which Part of the Indian Constitution deals with Fundamental Rights?", "opts": ["Part I", "Part II", "Part III", "Part IV"], "ans_text": "Part III", "exp": "Part III of the Indian Constitution (Articles 12 to 35) deals with Fundamental Rights."},
    {"text": "Article 21 of the Indian Constitution guarantees:", "opts": ["Right to Equality", "Right to Freedom of Religion", "Right to Life and Personal Liberty", "Right against Exploitation"], "ans_text": "Right to Life and Personal Liberty", "exp": "Article 21 states that no person shall be deprived of his life or personal liberty except according to procedure established by law."},
    {"text": "Which Fundamental Right was removed by the 44th Amendment Act, 1978?", "opts": ["Right to Freedom of Speech", "Right to Property", "Right to Constitutional Remedies", "Right to Education"], "ans_text": "Right to Property", "exp": "The Right to Property was removed from the list of Fundamental Rights and made a legal right under Article 300A."},
    {"text": "The writ of 'Habeas Corpus' means:", "opts": ["To command", "By what authority", "We forbid", "To have the body of"], "ans_text": "To have the body of", "exp": "Habeas Corpus is a Latin term meaning 'to have the body of'. It is used to release a person who has been unlawfully detained."},
    {"text": "Article 17 of the Indian Constitution deals with the abolition of:", "opts": ["Titles", "Child labor", "Untouchability", "Sati"], "ans_text": "Untouchability", "exp": "Article 17 abolishes 'untouchability' and forbids its practice in any form."},

    # English Spelling
    {"text": "Choose the correctly spelled word:", "opts": ["Accommodate", "Acommodate", "Accomodate", "Acomodate"], "ans_text": "Accommodate", "exp": "The correct spelling has double 'c' and double 'm'."},
    {"text": "Choose the correctly spelled word:", "opts": ["Embarrass", "Embarass", "Embaras", "Emmbarrass"], "ans_text": "Embarrass", "exp": "The correct spelling has double 'r' and double 's'."},
    {"text": "Choose the correctly spelled word:", "opts": ["Privilege", "Priviledge", "Privelige", "Prevelege"], "ans_text": "Privilege", "exp": "The correct spelling is Privilege, without a 'd'."},
    {"text": "Choose the correctly spelled word:", "opts": ["Fascinate", "Fassinate", "Facinate", "Fascinat"], "ans_text": "Fascinate", "exp": "The correct spelling is Fascinate."},

    # Internet Basics
    {"text": "Which of the following is NOT a web browser?", "opts": ["Google Chrome", "Mozilla Firefox", "Microsoft Edge", "Linux"], "ans_text": "Linux", "exp": "Linux is an operating system, not a web browser."},
    {"text": "In a URL, what does 'HTTP' stand for?", "opts": ["HyperText Transfer Protocol", "HyperText Transmission Process", "HyperLink Transfer Protocol", "HyperText Translation Protocol"], "ans_text": "HyperText Transfer Protocol", "exp": "HTTP stands for HyperText Transfer Protocol, the foundation of data communication for the World Wide Web."},
    {"text": "What is the primary function of a DNS (Domain Name System)?", "opts": ["To block malicious websites", "To translate domain names to IP addresses", "To encrypt web traffic", "To store website cookies"], "ans_text": "To translate domain names to IP addresses", "exp": "DNS translates human-readable domain names (like www.google.com) into IP addresses that computers use to identify each other."},
    {"text": "A 'cookie' on the internet is:", "opts": ["A type of virus", "A small piece of data sent from a website and stored on the user's computer", "A program used to view websites", "A hardware component for networking"], "ans_text": "A small piece of data sent from a website and stored on the user's computer", "exp": "Cookies are used to remember stateful information or to record the user's browsing activity."},

    # Seating Arrangement
    {"text": "Five friends A, B, C, D, and E are sitting in a row facing North. C is between A and E. D is to the immediate right of E. B is at the extreme left end. Who is sitting in the middle?", "opts": ["A", "C", "D", "E"], "ans_text": "C", "exp": "The arrangement from left to right is B, A, C, E, D. C is between A and E. So, C is in the middle (3rd position)."},
    {"text": "P, Q, R, S, and T are sitting in a circle facing the center. R is immediately left of T. P is between S and T. Who is immediately left of R?", "opts": ["Q", "P", "S", "T"], "ans_text": "Q", "exp": "T is to the right of R. P is between S and T, meaning the sequence is R, T, P, S. The only one left is Q, so Q is to the left of R."},
    {"text": "Six people are in a row. A is next to B but not next to C. D is next to E, and E is next to C. F is at the right end. If B is at the left end, who is next to F?", "opts": ["A", "C", "D", "E"], "ans_text": "D", "exp": "Arrangement is B, A, C, E, D, F. D is next to F."}
]

# Total 20 non-core questions

physics = [
    # Nuclear Medicine / Gamma Camera / Tc99m
    {"text": "What is the physical half-life of Technetium-99m?", "opts": ["6 hours", "8 days", "2.8 days", "13 hours"], "ans_text": "6 hours", "exp": "Tc-99m has a physical half-life of approximately 6 hours, making it ideal for diagnostic imaging."},
    {"text": "Technetium-99m emits primarily what type of radiation?", "opts": ["Gamma rays", "Alpha particles", "Beta minus particles", "Positrons"], "ans_text": "Gamma rays", "exp": "Tc-99m decays by isomeric transition, emitting a 140 keV gamma ray without particulate radiation."},
    {"text": "What is the principal energy of the gamma photon emitted by Tc-99m?", "opts": ["140 keV", "511 keV", "364 keV", "74 keV"], "ans_text": "140 keV", "exp": "Tc-99m emits a characteristic 140 keV gamma photon."},
    {"text": "In a Gamma Camera, what is the function of the collimator?", "opts": ["To restrict the gamma rays to a specific direction", "To convert gamma rays to light", "To amplify the signal", "To produce isotopes"], "ans_text": "To restrict the gamma rays to a specific direction", "exp": "Collimators allow only gamma rays traveling in a specific direction (usually perpendicular) to strike the crystal, providing spatial resolution."},
    {"text": "Which crystal is most commonly used in a conventional Gamma Camera?", "opts": ["Sodium Iodide doped with Thallium NaI(Tl)", "Bismuth Germanate (BGO)", "Lutetium Oxyorthosilicate (LSO)", "Cesium Iodide (CsI)"], "ans_text": "Sodium Iodide doped with Thallium NaI(Tl)", "exp": "NaI(Tl) is the standard scintillator crystal used in Anger gamma cameras due to its excellent light yield for 140 keV photons."},
    {"text": "What device converts light photons into an electrical signal in a gamma camera?", "opts": ["Photomultiplier Tube (PMT)", "TFT array", "ADC converter", "Pulse height analyzer"], "ans_text": "Photomultiplier Tube (PMT)", "exp": "PMTs convert the scintillation light from the crystal into an amplified electrical pulse."},
    {"text": "How is Tc-99m typically obtained in a nuclear medicine department?", "opts": ["From a Molybdenum-99 / Technetium-99m generator", "Delivered daily by cyclotron", "Extracted from Uranium fission locally", "Naturally occurring ore"], "ans_text": "From a Molybdenum-99 / Technetium-99m generator", "exp": "Tc-99m is milked or eluted from a generator containing the parent isotope Mo-99 (half-life 66 hours)."},
    {"text": "What is the biological half-life of a radiopharmaceutical?", "opts": ["The time taken for the body to eliminate half of the substance", "The physical decay time of the isotope", "The time to reach maximum concentration", "The time it takes to lose half its mass"], "ans_text": "The time taken for the body to eliminate half of the substance", "exp": "Biological half-life refers to physiological elimination, whereas physical half-life refers to radioactive decay."},
    {"text": "The function of a Pulse Height Analyzer (PHA) in nuclear medicine is to:", "opts": ["Reject scatter radiation by energy windowing", "Amplify the light signal", "Collimate the beam", "Generate the high voltage"], "ans_text": "Reject scatter radiation by energy windowing", "exp": "The PHA selects only pulses within a specific energy window (e.g., around 140 keV), rejecting lower-energy scattered photons."},
    {"text": "Which imaging modality records the distribution of a radiopharmaceutical over a specified time period?", "opts": ["Dynamic planar imaging", "Static planar imaging", "PET imaging", "CT scanning"], "ans_text": "Dynamic planar imaging", "exp": "Dynamic planar imaging captures a series of frames over time to assess functional processes like renal blood flow or gallbladder emptying."}
]

positioning = [
    # Emergency / Trauma Positioning
    {"text": "Which projection is most critical for evaluating a cervical spine trauma patient before removing the collar?", "opts": ["Cross-table lateral", "AP axial", "Open mouth odontoid", "Swimmer's view"], "ans_text": "Cross-table lateral", "exp": "The cross-table (horizontal beam) lateral C-spine is the initial and most critical view to rule out unstable fractures."},
    {"text": "In a trauma cross-table lateral C-spine, if C7 is not visualized, which supplementary view is indicated?", "opts": ["Twining method (Swimmer's view)", "Fuchs method", "AP open mouth", "Judd method"], "ans_text": "Twining method (Swimmer's view)", "exp": "The Swimmer's view is used to visualize the cervicothoracic junction (C7-T1) when obscured by the shoulders."},
    {"text": "For a trauma AP chest X-ray taken supine, what is a common distinct appearance compared to an erect PA chest?", "opts": ["The mediastinum appears wider", "The heart appears smaller", "The apices are better aerated", "Pneumothorax is easily seen at the apices"], "ans_text": "The mediastinum appears wider", "exp": "In a supine AP chest, gravity alters blood flow and the shorter SID plus AP projection magnifies the heart and widens the mediastinum."},
    {"text": "How is a cross-table lateral hip (Danelius-Miller method) positioned for a trauma patient?", "opts": ["Unaffected leg raised, IR parallel to femoral neck, CR perpendicular to IR", "Both legs extended, IR parallel to femur", "Affected leg externally rotated 15 degrees", "CR angled 45 degrees cephalad"], "ans_text": "Unaffected leg raised, IR parallel to femoral neck, CR perpendicular to IR", "exp": "The Danelius-Miller method requires elevating the unaffected leg and placing the IR parallel to the femoral neck of the affected side."},
    {"text": "What modified view is used to visualize the odontoid process when the patient cannot open their mouth due to trauma?", "opts": ["Fuchs method (AP) or Judd method (PA)", "Waters view", "Caldwell view", "Townes method"], "ans_text": "Fuchs method (AP) or Judd method (PA)", "exp": "The Fuchs (AP) or Judd (PA) methods project the dens through the foramen magnum when the mouth cannot be opened."},
    {"text": "When performing an AP pelvis on a severe trauma patient, how should the legs be positioned?", "opts": ["Left exactly as they are without internal rotation", "Internally rotated 15-20 degrees", "Externally rotated 45 degrees", "Flexed at the knees"], "ans_text": "Left exactly as they are without internal rotation", "exp": "In severe trauma, the limbs should not be manipulated to avoid aggravating potential fractures or vascular injuries."},
    {"text": "Which view is best to demonstrate a pneumothorax in a patient who cannot stand but can lie on their side?", "opts": ["Lateral decubitus (affected side up)", "Lateral decubitus (affected side down)", "Supine AP", "Cross-table lateral"], "ans_text": "Lateral decubitus (affected side up)", "exp": "Air rises, so placing the affected side up in a lateral decubitus position best demonstrates a small pneumothorax."},
    {"text": "Which view is best to demonstrate pleural effusion in a patient who cannot stand?", "opts": ["Lateral decubitus (affected side down)", "Lateral decubitus (affected side up)", "Supine AP", "Lordotic view"], "ans_text": "Lateral decubitus (affected side down)", "exp": "Fluid falls to the dependent portion, so placing the affected side down demonstrates pleural effusion."},
    {"text": "For a trauma horizontal-beam lateral skull, which artifact can indicate a basal skull fracture?", "opts": ["Sphenoid sinus effusion (air-fluid level)", "Pineal gland calcification", "Widened diploic space", "Vascular grooves"], "ans_text": "Sphenoid sinus effusion (air-fluid level)", "exp": "An air-fluid level in the sphenoid sinus on a horizontal beam lateral skull indicates a basal skull fracture (CSF leak)."},
    {"text": "In a modified shoulder trauma series, the Garth method requires the CR to be angled:", "opts": ["45 degrees caudad", "45 degrees cephalad", "30 degrees medial", "Perpendicular to the IR"], "ans_text": "45 degrees caudad", "exp": "The Garth method (AP apical oblique) uses a 45-degree caudad angle to assess shoulder dislocations."},
    {"text": "The Clements-Nakayama method for trauma hip requires the CR to be angled:", "opts": ["15 degrees posteriorly", "15 degrees anteriorly", "30 degrees cephalad", "Perpendicular to the femur"], "ans_text": "15 degrees posteriorly", "exp": "Used when bilateral hip fractures prevent raising the unaffected leg; the CR is angled 15 degrees posteriorly and tilted to match the IR."},
    {"text": "For a trauma patient needing an AP projection of the humerus, the hand is usually left in:", "opts": ["Neutral position (as is)", "Supinated position", "Pronated position", "Internally rotated position"], "ans_text": "Neutral position (as is)", "exp": "In trauma, the limb is imaged as it presents. A neutral AP humerus is taken without rotating the hand."},
    {"text": "Which projection provides a lateral view of the proximal humerus without moving the injured arm?", "opts": ["Transthoracic lateral (Lawrence method)", "Scapular Y view", "Garth method", "Axillary view (Inferosuperior)"], "ans_text": "Transthoracic lateral (Lawrence method)", "exp": "The transthoracic lateral projects the proximal humerus through the thorax, requiring no arm rotation."},
    {"text": "What breathing technique is recommended for a transthoracic lateral humerus?", "opts": ["Orthostatic (quiet, shallow breathing)", "Full inspiration", "Full expiration", "Valsalva maneuver"], "ans_text": "Orthostatic (quiet, shallow breathing)", "exp": "A long exposure time with shallow breathing blurs the ribs and lung markings, improving visibility of the humerus."},
    {"text": "In trauma radiography of long bones, what is a crucial requirement?", "opts": ["Include both joints on the AP and lateral views", "Only include the joint closest to the injury", "Use high kVp to penetrate casts", "Always angle the tube 10 degrees"], "ans_text": "Include both joints on the AP and lateral views", "exp": "It is essential to include both the proximal and distal joints of a long bone to evaluate for associated dislocations or fractures."},
    {"text": "For a modified axillary view of the shoulder on a trauma patient, which method is used?", "opts": ["Velpeau method", "Camp Coventry method", "Settegast method", "Holmblad method"], "ans_text": "Velpeau method", "exp": "The Velpeau method is a modified axillary view for patients who cannot abduct their arm."},
    {"text": "When performing a reverse Waters view (AP axial) for facial bones on a supine trauma patient, the CR is aligned parallel to the:", "opts": ["Mentomeatal Line (MML)", "Orbitomeatal Line (OML)", "Acanthiomeatal Line (AML)", "Infraorbitomeatal Line (IOML)"], "ans_text": "Mentomeatal Line (MML)", "exp": "In an AP reverse Waters, the MML is made perpendicular to the IR, and the CR is parallel to the MML."},
    {"text": "What is the primary purpose of the Scapular Y projection in trauma?", "opts": ["To determine anterior or posterior shoulder dislocation", "To visualize the glenoid labrum", "To evaluate AC joint separation", "To demonstrate the coracoid process base"], "ans_text": "To determine anterior or posterior shoulder dislocation", "exp": "The humeral head normally superimposes the junction of the Y. Anterior dislocation places it beneath the coracoid, posterior beneath the acromion."},
    {"text": "Which view evaluates the patella in a trauma patient with a flexed knee?", "opts": ["Horizontal beam lateral knee", "Merchant method", "Hughston method", "Settegast method"], "ans_text": "Horizontal beam lateral knee", "exp": "A cross-table lateral evaluates the knee without requiring extreme flexion, revealing lipohemarthrosis (fat-fluid level)."},
    {"text": "A 'fat pad sign' (sail sign) on a lateral elbow radiograph in an adult usually indicates:", "opts": ["Radial head fracture", "Supracondylar fracture", "Olecranon bursitis", "Ulnar collateral ligament tear"], "ans_text": "Radial head fracture", "exp": "Elevation of the anterior or appearance of the posterior fat pad indicates joint effusion, often from a subtle radial head fracture in adults."}
]

ct = [
    # CT and PET/CT
    {"text": "What isotope is most commonly used in clinical PET imaging?", "opts": ["Fluorine-18", "Carbon-11", "Technetium-99m", "Iodine-131"], "ans_text": "Fluorine-18", "exp": "F-18, usually attached to glucose as FDG, is the most common PET isotope due to its 110-minute half-life."},
    {"text": "What does FDG stand for in PET imaging?", "opts": ["Fluorodeoxyglucose", "Fluorodiglyceride", "Fluorodopamine", "Fluorodeoxygalactose"], "ans_text": "Fluorodeoxyglucose", "exp": "FDG (Fluorodeoxyglucose) is a glucose analog used to map metabolic activity."},
    {"text": "PET imaging relies on the detection of:", "opts": ["Two 511 keV photons traveling in opposite directions", "A single 140 keV photon", "Alpha particles", "Characteristic X-rays"], "ans_text": "Two 511 keV photons traveling in opposite directions", "exp": "Positrons annihilate with electrons, creating two 511 keV photons emitted at approximately 180 degrees to each other."},
    {"text": "What is 'Coincidence Detection' in a PET scanner?", "opts": ["Registering two photons striking opposite detectors almost simultaneously", "Detecting scattered and unscattered photons", "Aligning the CT and PET lasers", "Filtering low energy signals"], "ans_text": "Registering two photons striking opposite detectors almost simultaneously", "exp": "The PET system only records an event if two opposing detectors are struck within a very narrow time window (coincidence timing window)."},
    {"text": "What is the primary role of the CT scan in a PET/CT protocol?", "opts": ["Attenuation correction and anatomical localization", "Enhancing the PET resolution", "Reducing the radiation dose", "Speeding up the PET scan"], "ans_text": "Attenuation correction and anatomical localization", "exp": "The CT data provides an attenuation map to correct the PET emission data and provides precise anatomical landmarks."},
    {"text": "Why must patients fast before an FDG-PET scan?", "opts": ["To lower blood glucose levels and reduce insulin, promoting tumor FDG uptake", "To prevent nausea from the contrast agent", "To empty the bowel for better pelvic imaging", "To slow down the heart rate"], "ans_text": "To lower blood glucose levels and reduce insulin, promoting tumor FDG uptake", "exp": "High insulin drives glucose into muscles, competing with the tumor for FDG. Fasting ensures high tumor uptake relative to background."},
    {"text": "What is the Standardized Uptake Value (SUV) in PET?", "opts": ["A semiquantitative measure of radiotracer concentration in a lesion", "The dose of FDG injected into the patient", "The physical size of the tumor", "The maximum radiation limit per scan"], "ans_text": "A semiquantitative measure of radiotracer concentration in a lesion", "exp": "SUV is a calculated ratio of tissue radioactivity concentration relative to the injected dose and patient body weight."},
    {"text": "What crystal is widely used in modern PET scanners due to its high stopping power and fast decay time?", "opts": ["LSO or LYSO (Lutetium Yttrium Orthosilicate)", "NaI(Tl)", "BGO (Bismuth Germanate)", "CsI"], "ans_text": "LSO or LYSO (Lutetium Yttrium Orthosilicate)", "exp": "LYSO crystals have excellent light output, high density, and fast decay times, making them ideal for Time-of-Flight PET."},
    {"text": "What is Time-of-Flight (TOF) in PET imaging?", "opts": ["Using the slight time difference in photon detection to localize the annihilation event", "The time it takes to perform the whole body scan", "The duration between injection and scanning", "The speed of the CT gantry rotation"], "ans_text": "Using the slight time difference in photon detection to localize the annihilation event", "exp": "TOF measures the picosecond difference in arrival times of the two photons to better pinpoint where along the Line of Response the event occurred."},
    {"text": "In a whole-body FDG PET scan, which organ naturally shows intense physiological uptake?", "opts": ["Brain", "Lungs", "Bone matrix", "Skeletal muscle at rest"], "ans_text": "Brain", "exp": "The brain relies almost entirely on glucose metabolism, showing very intense physiological FDG uptake."},
    {"text": "How long is the typical uptake phase (wait time) after injecting FDG before scanning?", "opts": ["45 to 60 minutes", "5 to 10 minutes", "12 to 24 hours", "Immediately"], "ans_text": "45 to 60 minutes", "exp": "This allows the FDG to distribute and be trapped within metabolically active cells while clearing from the blood."},
    {"text": "What artifact can occur in PET/CT if the patient breathes differently during the CT vs the PET?", "opts": ["Misregistration artifact", "Streak artifact", "Beam hardening", "Ring artifact"], "ans_text": "Misregistration artifact", "exp": "Differences in respiration cause the CT attenuation map to misalign with the PET data, creating artificial 'cold' or 'hot' spots, especially near the diaphragm."},
    {"text": "FDG uptake in brown fat is often seen in:", "opts": ["Cold, anxious, or young patients", "Elderly diabetic patients", "Patients who exercised their arms", "Patients with renal failure"], "ans_text": "Cold, anxious, or young patients", "exp": "Brown adipose tissue generates heat when cold and is metabolically active. Warming the patient reduces this uptake."},
    {"text": "In a CT trauma protocol, why is a non-contrast CT head performed first?", "opts": ["To rapidly identify acute intracranial hemorrhage", "To measure cerebral blood flow", "To check for aneurysms", "To evaluate fine bone detail in the skull base"], "ans_text": "To rapidly identify acute intracranial hemorrhage", "exp": "Acute blood appears hyperdense on non-contrast CT. Contrast would mask the hemorrhage."},
    {"text": "What is the typical pitch used in a trauma CT scan of the chest/abdomen/pelvis?", "opts": ["Greater than 1 (e.g., 1.2 to 1.5) for rapid scanning", "Less than 1 for high detail", "Exactly 1", "0.5 to maximize dose"], "ans_text": "Greater than 1 (e.g., 1.2 to 1.5) for rapid scanning", "exp": "A higher pitch allows for faster table movement and shorter scan times, which is critical in trauma to reduce motion and time."}
]

mri = [
    # Advanced MRI
    {"text": "What does DWI stand for in MRI?", "opts": ["Diffusion Weighted Imaging", "Dynamic Wash-in Imaging", "Delayed Water Inversion", "Double Weighted Inversion"], "ans_text": "Diffusion Weighted Imaging", "exp": "DWI measures the random Brownian motion of water molecules in tissue."},
    {"text": "In DWI, acute cerebral infarction (stroke) typically appears:", "opts": ["Hyperintense (Bright)", "Hypointense (Dark)", "Isointense (Grey)", "Signal void (Black)"], "ans_text": "Hyperintense (Bright)", "exp": "Cytotoxic edema in acute stroke restricts water diffusion, appearing bright on DWI."},
    {"text": "What is an ADC map in the context of DWI?", "opts": ["Apparent Diffusion Coefficient map", "Analog to Digital Converter map", "Automated Dose Control map", "Arterial Diffusion Curve"], "ans_text": "Apparent Diffusion Coefficient map", "exp": "The ADC map calculates true diffusion, removing T2 shine-through effects. Restricted diffusion appears dark on an ADC map."},
    {"text": "If a lesion is bright on DWI and dark on the ADC map, this indicates:", "opts": ["True restricted diffusion", "T2 shine-through", "Free diffusion", "Fat content"], "ans_text": "True restricted diffusion", "exp": "True restricted diffusion (like in acute stroke or dense tumors) is hyperintense on DWI and hypointense on ADC."},
    {"text": "What does the 'b-value' represent in DWI?", "opts": ["The strength, duration, and timing of the diffusion gradients", "The magnetic field strength (B0)", "The slice thickness", "The contrast injection rate"], "ans_text": "The strength, duration, and timing of the diffusion gradients", "exp": "A higher b-value (e.g., 1000 s/mm2) provides stronger diffusion weighting but lower signal-to-noise ratio."},
    {"text": "MR Spectroscopy (MRS) produces a:", "opts": ["Graph of chemical spectra based on resonant frequencies", "High-resolution 3D volume", "Map of blood flow velocities", "Functional brain activity map"], "ans_text": "Graph of chemical spectra based on resonant frequencies", "exp": "MRS non-invasively measures chemical metabolites (like NAA, Choline, Creatine), producing a spectral graph rather than an anatomical image."},
    {"text": "In brain MR Spectroscopy, a high peak of 'Choline' usually indicates:", "opts": ["Increased cell membrane turnover (e.g., tumor)", "Normal healthy neurons", "Anaerobic metabolism (infarction)", "Fat necrosis"], "ans_text": "Increased cell membrane turnover (e.g., tumor)", "exp": "Choline is a marker of cell membrane synthesis and is elevated in high-grade gliomas and tumors."},
    {"text": "What metabolite peak is the highest in a normal, healthy brain MRS spectrum?", "opts": ["N-acetylaspartate (NAA)", "Lactate", "Lipid", "Alanine"], "ans_text": "N-acetylaspartate (NAA)", "exp": "NAA is a marker of healthy neuronal viability and is typically the dominant peak at 2.0 ppm."},
    {"text": "The presence of a 'Lactate' peak on brain MRS indicates:", "opts": ["Anaerobic glycolysis, seen in ischemia or necrosis", "Malignant tumor growth", "Demyelination", "Healthy tissue"], "ans_text": "Anaerobic glycolysis, seen in ischemia or necrosis", "exp": "Lactate (at 1.3 ppm) is normally absent. It appears when tissue undergoes anaerobic respiration, such as in stroke or necrotic tumors."},
    {"text": "Which MRI sequence is highly sensitive to microscopic bleeding and calcification by utilizing susceptibility effects?", "opts": ["SWI (Susceptibility Weighted Imaging)", "STIR", "T1 Spin Echo", "FLAIR"], "ans_text": "SWI (Susceptibility Weighted Imaging)", "exp": "SWI (and GRE) sequences exploit magnetic susceptibility differences, making paramagnetic substances like blood products very dark (blooming artifact)."}
]

usg = [
    # USG Basics and FAST
    {"text": "In a FAST ultrasound exam, what does FAST stand for?", "opts": ["Focused Assessment with Sonography for Trauma", "Fast Arterial Scanning Technique", "Frequency Analyzed Sonographic Testing", "Fluid Assessment and Screening Tool"], "ans_text": "Focused Assessment with Sonography for Trauma", "exp": "FAST is a rapid bedside ultrasound examination performed to identify free intraperitoneal fluid in trauma patients."},
    {"text": "Which of the following is NOT a standard view in a typical FAST exam?", "opts": ["Subclavian view", "Perihepatic (Morison's pouch) view", "Perisplenic view", "Pelvic (Suprapubic) view"], "ans_text": "Subclavian view", "exp": "The 4 standard views are: Cardiac (subxiphoid), RUQ (Morison's pouch), LUQ (perisplenic), and Pelvic (suprapubic)."},
    {"text": "On an ultrasound image, fluid (like blood or urine) appears:", "opts": ["Anechoic (Black)", "Hyperechoic (White)", "Isoechoic (Grey)", "Acoustic shadowing"], "ans_text": "Anechoic (Black)", "exp": "Fluid lacks internal acoustic interfaces, so no echoes are returned, making it appear black (anechoic)."},
    {"text": "Which transducer frequency is typically used for examining deep abdominal structures in an adult?", "opts": ["Low frequency (2-5 MHz)", "High frequency (10-15 MHz)", "Very high frequency (20 MHz)", "1 MHz"], "ans_text": "Low frequency (2-5 MHz)", "exp": "Low frequencies penetrate deeper but have lower resolution. Curvilinear probes (2-5 MHz) are standard for abdomens."},
    {"text": "What artifact occurs behind a strongly reflective structure like a gallstone?", "opts": ["Acoustic Shadowing", "Posterior Acoustic Enhancement", "Reverberation", "Mirror Image"], "ans_text": "Acoustic Shadowing", "exp": "Sound cannot penetrate the stone, leaving a dark 'shadow' behind it."}
]

anatomy = [
    # Trauma / NM Anatomy
    {"text": "In an AP projection of the normal pelvis, the femoral neck is:", "opts": ["Foreshortened unless the legs are internally rotated", "Elongated when the legs are externally rotated", "Superimposed on the greater trochanter", "Parallel to the IR when legs are neutral"], "ans_text": "Foreshortened unless the legs are internally rotated", "exp": "The normal femoral neck angles forward. Internal rotation of 15-20 degrees makes it parallel to the IR."},
    {"text": "The 'space of Retzius' is located:", "opts": ["Anterior to the urinary bladder", "Posterior to the rectum", "Between the liver and right kidney", "In the pleural cavity"], "ans_text": "Anterior to the urinary bladder", "exp": "The retropubic space (space of Retzius) is between the pubic symphysis and the bladder, relevant in pelvic trauma."},
    {"text": "Morison's pouch is a potential space located between the:", "opts": ["Liver and right kidney", "Spleen and left kidney", "Bladder and rectum", "Stomach and pancreas"], "ans_text": "Liver and right kidney", "exp": "The hepatorenal recess (Morison's pouch) is the most dependent part of the upper abdominal cavity in the supine patient, where fluid collects."},
    {"text": "In nuclear medicine bone scintigraphy, physiological uptake is normally seen in all EXCEPT:", "opts": ["Brain parenchyma", "Bones and joints", "Kidneys", "Urinary bladder"], "ans_text": "Brain parenchyma", "exp": "Tc-99m MDP (bone agent) does not cross the intact blood-brain barrier. It localizes in bones and is excreted by kidneys into the bladder."},
    {"text": "A fracture of the C2 vertebra pedicles due to hyperextension is called:", "opts": ["Hangman's fracture", "Jefferson fracture", "Clay-shoveler's fracture", "Odontoid fracture"], "ans_text": "Hangman's fracture", "exp": "A Hangman's fracture is a bilateral fracture of the pars interarticularis of C2."},
    {"text": "A 'burst fracture' of the C1 ring is known as:", "opts": ["Jefferson fracture", "Hangman's fracture", "Chance fracture", "Teardrop fracture"], "ans_text": "Jefferson fracture", "exp": "A Jefferson fracture results from axial loading, breaking the anterior and posterior arches of C1."},
    {"text": "A 'Chance fracture' is a horizontal fracture typically occurring in the:", "opts": ["Thoracolumbar spine (due to seatbelt hyperflexion)", "Cervical spine", "Sacrum", "Skull base"], "ans_text": "Thoracolumbar spine (due to seatbelt hyperflexion)", "exp": "Often called a seatbelt fracture, it is a flexion-distraction injury of the spine."},
    {"text": "The 'Circle of Willis' is formed by all EXCEPT:", "opts": ["Middle Cerebral Artery (MCA)", "Anterior Cerebral Artery (ACA)", "Posterior Communicating Artery", "Anterior Communicating Artery"], "ans_text": "Middle Cerebral Artery (MCA)", "exp": "The MCA is not considered part of the geometric circle itself, though it is a major branch. The circle is formed by ACA, anterior comm, ICA, posterior comm, and PCA."},
    {"text": "In a lateral cervical spine radiograph, the prevertebral soft tissue thickness at C2 should normally not exceed:", "opts": ["7 mm", "22 mm", "15 mm", "30 mm"], "ans_text": "7 mm", "exp": "At C2, prevertebral soft tissue >7mm indicates swelling (hematoma/edema). At C6, the limit is 22mm."},
    {"text": "Which bone is most frequently fractured in carpal trauma?", "opts": ["Scaphoid", "Lunate", "Triquetrum", "Pisiform"], "ans_text": "Scaphoid", "exp": "The scaphoid is the most commonly fractured carpal bone, often from a fall on an outstretched hand (FOOSH)."}
]

safety = [
    # NM/PET Safety and Trauma DR
    {"text": "What is the half-life of Fluorine-18?", "opts": ["110 minutes", "6 hours", "8 days", "2.8 days"], "ans_text": "110 minutes", "exp": "F-18 has a half-life of 109.8 (approx 110) minutes."},
    {"text": "The annihilation photons in PET have an energy of:", "opts": ["511 keV", "140 keV", "364 keV", "1.02 MeV"], "ans_text": "511 keV", "exp": "Each of the two annihilation photons has an energy of 511 keV (the rest mass energy of an electron)."},
    {"text": "Which shielding material is best for high-energy 511 keV PET photons?", "opts": ["Tungsten or Thick Lead", "Thin aluminum", "Plexiglass (Lucite)", "Copper"], "ans_text": "Tungsten or Thick Lead", "exp": "Due to their high energy, 511 keV photons require high-density, thick shielding like tungsten syringe shields or thick lead bricks."},
    {"text": "Why is Plexiglass (Lucite) preferred over lead for shielding pure Beta emitters like Yttrium-90?", "opts": ["Lead causes Bremsstrahlung radiation when interacting with beta particles", "Lead is too heavy", "Plexiglass absorbs gamma rays better", "Beta particles melt lead"], "ans_text": "Lead causes Bremsstrahlung radiation when interacting with beta particles", "exp": "High-Z materials like lead rapidly decelerate beta particles, emitting secondary X-rays (Bremsstrahlung). Low-Z materials like acrylic minimize this."},
    {"text": "What is the recommended procedure for a minor radioactive spill in a nuclear medicine lab?", "opts": ["Notify RSO, contain with absorbent paper, clean from outside inward, survey", "Evacuate the hospital immediately", "Wash it down the sink", "Leave it until it decays"], "ans_text": "Notify RSO, contain with absorbent paper, clean from outside inward, survey", "exp": "Standard procedure for a minor spill: contain, report, clean from edges to center to prevent spreading, and check with a survey meter."},
    {"text": "What instrument is used to measure the exact radioactivity of a radiopharmaceutical dose before injection?", "opts": ["Dose Calibrator (Ionization Chamber)", "Geiger-Muller Counter", "Scintillation well counter", "TLD badge"], "ans_text": "Dose Calibrator (Ionization Chamber)", "exp": "A dose calibrator is an ionization chamber designed to accurately assay the activity (in mCi or MBq) of a syringe or vial."},
    {"text": "In trauma portable radiography, what is the most effective way for the technologist to reduce their own radiation exposure?", "opts": ["Maximizing distance from the X-ray tube and patient", "Wearing a thyroid collar", "Using low kVp", "Collimate the beam"], "ans_text": "Maximizing distance from the X-ray tube and patient", "exp": "According to the inverse square law, distance is the most effective factor in reducing occupational dose."},
    {"text": "What is the primary source of scatter radiation to personnel during a trauma cross-table lateral?", "opts": ["The patient", "The x-ray tube housing", "The image receptor", "The wall behind the patient"], "ans_text": "The patient", "exp": "The patient is the principal scattering object. The technologist should stand as far away as possible and at right angles to the primary beam."},
    {"text": "For a pregnant radiation worker, what is the fetal dose limit for the entire pregnancy?", "opts": ["1 mSv", "5 mSv", "20 mSv", "50 mSv"], "ans_text": "1 mSv", "exp": "The recommended dose limit to the fetus (declared pregnancy) is 1 mSv over the course of the pregnancy."},
    {"text": "ALARA in radiation safety stands for:", "opts": ["As Low As Reasonably Achievable", "Always Leave A Radiation Area", "As Low As Radiography Allows", "All Levels Are Risk Associated"], "ans_text": "As Low As Reasonably Achievable", "exp": "ALARA is the fundamental principle of minimizing radiation doses and releases of radioactive materials."}
]

all_core = physics + positioning + ct + mri + usg + anatomy + safety

# Validate counts
assert len(non_core) == 20, f"Non core count: {len(non_core)}"
assert len(all_core) == 80, f"Core count: {len(all_core)}"

questions = non_core + all_core
assert len(questions) == 100, "Total must be 100"

# Read template
with open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
    html = f.read()

# Replace Titles
html = html.replace("<title>AIIMS CBT - Sectional Timing Mode</title>", "<title>AIIMS CRE Radiographer - Test Paper 9</title>")
html = html.replace("<h1>AIIMS CRE CBT (Strict Pattern)</h1>", "<h1>AIIMS CRE - Test Paper 9</h1>")

# We need to replace the local storage key. We should search for where localStorage is used. 
# Wait, the CBT10.html template actually doesn't seem to have localStorage implemented in the text we saw!
# Let me double check if localStorage is mentioned.
if 'localStorage' not in html:
    # If not there, maybe we inject it or we just add it to the state management.
    # The prompt says: Use localStorage key 'test_paper_9_state' instead of 'aiims_cbt_state'
    pass

# We will replace the generateQuestions block
start_marker = "function generateQuestions() {"
end_marker = "        // --- STATE MANAGEMENT ---"

start_idx = html.find(start_marker)
end_idx = html.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Could not find generation block markers")
    sys.exit(1)

new_generation_block = start_marker + "\n"
new_generation_block += "        const createQ = (id, type, text, opts, ans, exp) => ({ id, type, text, opts, ans, exp });\n"
new_generation_block += "        questions = [];\n\n"

for i, q in enumerate(questions):
    cat = "Non-Core" if i < 20 else "Core"
    opts = q["opts"]
    ans_text = q["ans_text"]
    
    # Shuffle options
    shuffled_opts = opts.copy()
    random.shuffle(shuffled_opts)
    ans_idx = shuffled_opts.index(ans_text)
    
    # JSON encode strings to prevent quote escaping issues
    text_j = json.dumps(q["text"])
    opts_j = json.dumps(shuffled_opts)
    exp_j = json.dumps(q["exp"])
    
    new_generation_block += f"        questions.push(createQ({i+1}, '{cat}', {text_j}, {opts_j}, {ans_idx}, {exp_j}));\n"

new_generation_block += "    }\n\n"

# Replace block
html = html[:start_idx] + new_generation_block + html[end_idx:]

# Handle localStorage key
# The prompt says: "Use localStorage key 'test_paper_9_state' instead of 'aiims_cbt_state'"
# Even if it's not present, I should implement it or change it if it is.
if "aiims_cbt_state" in html:
    html = html.replace("aiims_cbt_state", "test_paper_9_state")
else:
    # Add persistence logic inside init() and saveAndNext etc.
    # Actually, looking at CBT10 code:
    # function init() {
    #        generateQuestions(); // Load data
    #        // Persistence check could go here, but for strict timing, fresh start is safer
    #        els.landing.classList.remove('hidden');
    #        els.result.classList.add('hidden');
    # }
    # So there is no aiims_cbt_state. But I will modify `init` to load state and `saveAndNext` to save state.
    persistence_script = """
        const STATE_KEY = 'test_paper_9_state';

        function saveState() {
            localStorage.setItem(STATE_KEY, JSON.stringify(state));
        }

        function loadState() {
            const saved = localStorage.getItem(STATE_KEY);
            if(saved) {
                state = JSON.parse(saved);
                return true;
            }
            return false;
        }
"""
    # Just to be safe, I'll add the saving logic
    html = html.replace("let state = {", persistence_script + "\n        let state = {")
    html = html.replace("state.status[index] = (state.answers[index] !== null) ? 'answered' : 'not-answered';", "state.status[index] = (state.answers[index] !== null) ? 'answered' : 'not-answered';\n            saveState();")
    html = html.replace("state.answers[state.currentQ] = optIndex;", "state.answers[state.currentQ] = optIndex;\n            saveState();")
    html = html.replace("state.status[index] = (state.answers[index] !== null) ? 'marked-answered' : 'review';", "state.status[index] = (state.answers[index] !== null) ? 'marked-answered' : 'review';\n            saveState();")
    html = html.replace("els.landing.classList.remove('hidden');", """
            if(loadState() && !state.isFinished) {
                // resume
                els.landing.classList.add('hidden');
                renderExamInterface();
                startSectionTimer();
            } else {
                els.landing.classList.remove('hidden');
            }
    """)
    html = html.replace("state.isFinished = true;", "state.isFinished = true;\n            saveState();")

with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    f.write(html)
print(f"Generated {OUTPUT_PATH}")
