import json
import re

questions_js = '''
function generateQuestions() {
    const createQ = (id, type, text, opts, ans, exp) => ({ id, type, text, opts, ans, exp });
    questions = [];

    const nonCoreData = [
        ["Pointing to a photograph, a man said, 'I have no brother or sister but that man\\'s father is my father\\'s son.' Whose photograph was it?", ["His son's", "His father's", "His nephew's", "His own"], 0, "Since he has no brother or sister, 'my father\\'s son' is the man himself. Therefore, the man in the photograph is his son."],
        ["What will come in place of the question mark in the following series? 2, 5, 11, 23, 47, ?", ["95", "94", "96", "97"], 0, "The pattern is (x * 2) + 1. 47 * 2 + 1 = 95."],
        ["A is the brother of B. C is the sister of D. B is the son of C. How is A related to C?", ["Son", "Brother", "Nephew", "Father"], 0, "B is the son of C. Since A is the brother of B, A is also the son of C."],
        ["Find the missing term: 1, 4, 27, 16, 125, 36, ?", ["343", "49", "216", "64"], 0, "Alternating series of cubes and squares: 1^3, 2^2, 3^3, 4^2, 5^3, 6^2, 7^3 = 343."],
        ["If in a certain language, GRASP is coded as BMVNK, which word would be coded as CRANE?", ["HWFSJ", "FUDQG", "BQDMD", "GVERI"], 0, "The pattern is a shift of -5 letters. Reverse mapping for CRANE means +5. C+5=H, R+5=W, A+5=F, N+5=S, E+5=J."],
        
        ["Which Indian state shares the longest international border with a neighbouring country?", ["West Bengal", "Rajasthan", "Jammu and Kashmir", "Arunachal Pradesh"], 0, "West Bengal shares the longest border with Bangladesh (approx. 2,217 km)."],
        ["Which river is known as the 'Sorrow of Bihar'?", ["Kosi", "Ganga", "Son", "Damodar"], 0, "Kosi is known as the Sorrow of Bihar due to its frequent and devastating floods."],
        ["The highest peak in the Western Ghats is:", ["Anamudi", "Doda Betta", "Mahendragiri", "Kalsubai"], 0, "Anamudi in Kerala is the highest peak in the Western Ghats."],
        ["The 'Pradhan Mantri Jan Dhan Yojana' primarily aims at:", ["Financial inclusion of the unbanked", "Providing free housing", "Promoting digital literacy", "Subsidizing agricultural loans"], 0, "It is a National Mission for Financial Inclusion to ensure access to financial services."],
        ["'Ayushman Bharat' scheme is related to:", ["Health Insurance for economically weaker sections", "Free education for girls", "Employment generation in rural areas", "Subsidized food grains"], 0, "It provides health coverage of up to Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization."],
        
        ["Choose the correct synonym for 'Benevolent':", ["Kind", "Malevolent", "Cruel", "Apathetic"], 0, "Benevolent means well-meaning and kindly."],
        ["Fill in the blank: 'He has been living here _____ 2015.'", ["since", "for", "from", "in"], 0, "'Since' is used for a specific point in time in the past."],
        ["Choose the correct antonym for 'Obscure':", ["Clear", "Hidden", "Vague", "Dark"], 0, "Obscure means not discovered or known about; uncertain. The opposite is clear."],
        ["Identify the grammatical error in the sentence: 'Neither the principal nor the teachers is present.'", ["is present", "Neither the", "nor the", "teachers is"], 0, "When subjects are joined by 'neither...nor', the verb agrees with the closer subject ('teachers'), so it should be 'are present'."],
        ["Select the correct passive voice: 'They are building a new hospital.'", ["A new hospital is being built by them.", "A new hospital has been built by them.", "A new hospital was being built by them.", "A new hospital is built by them."], 0, "Present continuous tense passive form uses 'is being + past participle'."],
        
        ["The 'Make in India' initiative was launched in which year?", ["2014", "2015", "2016", "2018"], 0, "Make in India was launched by Prime Minister Narendra Modi in September 2014."],
        ["Which is the largest freshwater lake in India?", ["Wular Lake", "Chilika Lake", "Dal Lake", "Vembanad Lake"], 0, "Wular Lake in Jammu and Kashmir is the largest freshwater lake in India."],
        ["In computers, 'HTTP' stands for:", ["HyperText Transfer Protocol", "HyperText Transmission Protocol", "Hyper Transfer Text Protocol", "HighText Transfer Protocol"], 0, "HTTP is the foundation of data communication for the World Wide Web."],
        ["Which shortcut key is used to 'Undo' an action in most software?", ["Ctrl + Z", "Ctrl + Y", "Ctrl + U", "Ctrl + X"], 0, "Ctrl + Z undoes the last action, while Ctrl + Y redoes it."],
        ["'NITI Aayog' replaced which institution in India?", ["Planning Commission", "Finance Commission", "Election Commission", "National Development Council"], 0, "NITI Aayog replaced the Planning Commission in 2015."]
    ];
    nonCoreData.forEach((d, i) => questions.push(createQ(i + 1, "Non-Core", d[0], d[1], d[2], d[3])));

    const qaData = [
        ["Which tool is most commonly used for measuring effective focal spot size?", ["Slit camera", "Spinning top", "Sensitometer", "Penetrometer"], 0, "The slit camera, pinhole camera, and star test pattern are used to measure focal spot size."],
        ["In a quality control program, the maximum acceptable variation for kVp accuracy is usually:", ["±5%", "±2%", "±10%", "±15%"], 0, "kVp accuracy must typically be within ±5% of the indicated value."],
        ["The timer accuracy of a radiographic unit for exposures greater than 10 ms should be within:", ["±5%", "±10%", "±2%", "±20%"], 0, "For exposures >10 ms, timer accuracy should be within ±5%."],
        ["Which target material is preferred in mammography to produce characteristic x-rays in the 17-19 keV range?", ["Molybdenum", "Tungsten", "Copper", "Lead"], 0, "Molybdenum produces characteristic x-rays perfectly suited for the tissue contrast required in mammography."],
        ["What is the primary purpose of breast compression in mammography?", ["To reduce breast thickness, improving contrast and reducing dose", "To immobilize the patient completely", "To decrease the focal spot size", "To increase magnification"], 0, "Compression evens out breast thickness, lowers scatter, improves contrast, and reduces radiation dose."],
        ["The half-value layer (HVL) of an x-ray beam is an indicator of:", ["Beam quality or penetrability", "Beam quantity", "Focal spot size", "Grid ratio"], 0, "HVL measures the penetrability (quality) of the x-ray beam."],
        ["In a Wisconsin test cassette, which parameter is evaluated?", ["kVp accuracy", "Focal spot size", "Timer accuracy", "Screen-film contact"], 0, "The Wisconsin test cassette is classically used to measure kVp accuracy."],
        ["In mammography, the filter material used with a Rhodium target is typically:", ["Rhodium", "Molybdenum", "Tungsten", "Aluminum"], 0, "Rhodium targets are typically paired with Rhodium filters to optimize the beam for denser breasts."],
        ["To test screen-film contact, which of the following is used?", ["Wire mesh tool", "Step wedge", "Slit camera", "Spinning top"], 0, "A wire mesh test tool is used to detect areas of poor contact between the screen and film."],
        ["What is the acceptable limit for light field-radiation field congruence (collimator accuracy) at a 100 cm SID?", ["±2% of the SID (±2 cm)", "±5% of the SID", "±10% of the SID", "±1% of the SID"], 0, "Collimator accuracy must be within ±2% of the Source-to-Image Distance."],
        ["The 'spinning top test' is primarily used to check:", ["Timer accuracy for single-phase generators", "kVp accuracy", "mA linearity", "Focal spot size"], 0, "A spinning top produces a series of dots depending on the exposure time and single-phase pulses."],
        ["Reproducibility of radiation output must be within what limit?", ["±5%", "±10%", "±2%", "±15%"], 0, "Output reproducibility across multiple identical exposures should be within ±5%."],
        ["Which effect limits the use of a very small focal spot at high mA settings?", ["Focal spot blooming and tube rating limits", "Anode heel effect", "Line-focus principle", "Compton scatter"], 0, "High mA on a small focal spot generates intense heat, risking anode damage and causing 'blooming' (enlargement) of the focal spot."],
        ["The grid ratio commonly used in mammography is:", ["4:1 to 5:1", "8:1 to 10:1", "12:1", "16:1"], 0, "Mammography uses low grid ratios (typically 4:1 or 5:1) to maintain low patient dose while cleaning up scatter."],
        ["For assessing spatial resolution of an imaging system, one typically uses:", ["A lead bar pattern (Line pair test tool)", "A densitometer", "A sensitometer", "An aluminum step wedge"], 0, "Spatial resolution is evaluated using a line pair test pattern, measured in lp/mm."]
    ];
    qaData.forEach((d, i) => questions.push(createQ(21 + i, "Physics & QA", d[0], d[1], d[2], d[3])));

    const posData = [
        ["In a pediatric chest radiograph (AP supine), the central ray should be directed to:", ["Midthorax at the nipple line", "The sternal angle", "T7 inferior angle of scapula", "The xiphoid process"], 0, "For infants and small children in an AP supine position, the CR is centered at the midthorax (nipple line)."],
        ["When positioning a child for a lateral skull, what is often necessary compared to an adult?", ["Placing a radiolucent sponge under the body to align the midsagittal plane", "Using a steep caudal angle", "Taping the chin to the chest", "Using a grid for all ages"], 0, "Children have relatively larger heads compared to their bodies; a sponge under the thorax/body helps keep the midsagittal plane parallel."],
        ["Which view is best to demonstrate a suspected scaphoid fracture?", ["PA axial with ulnar deviation", "AP with radial deviation", "Lateral wrist", "PA wrist without deviation"], 0, "Ulnar deviation elongates the scaphoid and opens the spaces around it."],
        ["To demonstrate the intercondylar fossa (tunnel view) of the knee, which method can be used?", ["Camp-Coventry method", "Settegast method", "Merchant method", "Holmblad method"], 0, "The Camp-Coventry (and Holmblad) methods demonstrate the intercondylar fossa."],
        ["What is the recommended central ray angle for an AP axial projection of the cervical spine?", ["15-20 degrees cephalad", "15-20 degrees caudad", "Perpendicular", "30 degrees cephalad"], 0, "A 15-20 degree cephalad angle opens the intervertebral disk spaces of the cervical spine."],
        ["In the PA Caldwell projection of the skull, the central ray is angled:", ["15 degrees caudad exiting at the nasion", "15 degrees cephalad exiting at nasion", "30 degrees caudad", "Perpendicular to nasion"], 0, "A 15-degree caudad angle to the OML drops the petrous ridges into the lower third of the orbits."],
        ["The 'Swimmer\\'s view' is used primarily to visualize:", ["The cervicothoracic junction (C7-T1)", "The lumbar spine", "The sacrum", "The upper cervical spine (C1-C2)"], 0, "It projects the shoulders away from each other to clear the C7-T1 junction."],
        ["For an AP oblique projection of the ribs to demonstrate the axillary portion of the right ribs, which position is used?", ["RPO (Right Posterior Oblique)", "LPO (Left Posterior Oblique)", "RAO", "LAO"], 0, "In posterior obliques (AP obliques), the side closest to the IR is elongated (the affected side)."],
        ["The Judet method is used to visualize which structure?", ["Acetabulum", "Sacroiliac joints", "Odontoid process", "Scaphoid"], 0, "The Judet method (oblique pelvis) is specifically used for evaluating acetabular fractures."],
        ["For a submentovertex (SMV) projection of the skull, which positioning line is parallel to the IR?", ["Infraorbitomeatal line (IOML)", "Orbitomeatal line (OML)", "Acanthiomeatal line (AML)", "Mentomeatal line (MML)"], 0, "The IOML is placed parallel to the image receptor for the SMV projection."],
        ["The Water\\'s view (parietoacanthial) is best to demonstrate the:", ["Maxillary sinuses", "Frontal sinuses", "Ethmoid sinuses", "Sphenoid sinuses"], 0, "The MML is perpendicular to the IR, projecting the petrous ridges below the maxillary sinuses."],
        ["In pediatric radiography, the 'Pigg-O-Stat' is primarily used for:", ["Erect chest and abdomen radiographs", "Supine skull radiographs", "Extremity immobilization", "Spinal radiography"], 0, "The Pigg-O-Stat is a commercial immobilization device used for erect chest and abdomen views in infants."],
        ["To visualize the sacroiliac joints, the patient is positioned in a posterior oblique (LPO/RPO). How many degrees is the body rotated?", ["25-30 degrees", "45 degrees", "10-15 degrees", "70 degrees"], 0, "A 25-30 degree oblique opens up the SI joint on the side elevated (farthest from IR)."],
        ["The cross-table lateral (Danelius-Miller) method is used for:", ["Patients with suspected hip fracture", "Evaluating the patella", "Shoulder dislocations", "Cervical spine trauma"], 0, "It provides a lateral view of the hip without moving the affected leg, crucial for trauma."],
        ["What is the central ray direction for the axial calcaneus (plantodorsal) projection?", ["40 degrees cephalad to the long axis of the foot", "15 degrees caudad", "Perpendicular", "30 degrees caudad"], 0, "A 40-degree cephalad angle elongates the calcaneus to free it from superimposition."],
        ["The 'Y view' of the shoulder is primarily used to evaluate:", ["Anterior or posterior shoulder dislocations", "Clavicle fractures", "AC joint separation", "Rotator cuff tears"], 0, "The scapular Y view helps determine anterior vs. posterior dislocations of the humeral head."],
        ["The AP axial projection (Towne method) of the skull requires the CR to be angled:", ["30 degrees caudad to the OML", "15 degrees caudad to the IOML", "30 degrees cephalad", "Perpendicular to the OML"], 0, "The standard Towne method uses a 30-degree caudad angle relative to the Orbitomeatal Line (OML)."],
        ["When radiographing a pediatric patient\\'s long bone for a suspected fracture, it is essential to:", ["Include both the joint above and the joint below the injury", "Only include the mid-shaft", "Use the highest kVp possible", "Exclude the growth plates"], 0, "Including both joints is critical to avoid missing secondary fractures or joint dislocations."],
        ["The Gaynor-Hart method is used to radiograph the:", ["Carpal tunnel", "Intercondylar fossa", "Radial head", "Zygomatic arches"], 0, "It is a tangential projection for the carpal canal (tunnel)."],
        ["In the true lateral position of the elbow, the elbow should be flexed at:", ["90 degrees", "45 degrees", "120 degrees", "fully extended"], 0, "90-degree flexion is required for a true lateral elbow to properly evaluate the fat pads and joint space."]
    ];
    posData.forEach((d, i) => questions.push(createQ(36 + i, "Positioning", d[0], d[1], d[2], d[3])));

    const ctMriData = [
        ["Which property of Gadolinium makes it useful as an MRI contrast agent?", ["It is paramagnetic and shortens T1 relaxation time", "It is diamagnetic and lengthens T2 time", "It is radioactive", "It blocks x-rays efficiently"], 0, "Gadolinium is paramagnetic and primarily shortens T1 relaxation, producing bright signal on T1-weighted images."],
        ["Nephrogenic Systemic Fibrosis (NSF) is a severe complication associated with:", ["Gadolinium-based contrast agents in patients with severe renal failure", "Iodinated contrast in pregnant women", "Barium sulfate in the GI tract", "Ultrasound gel allergies"], 0, "NSF is a rare but serious condition linked to certain gadolinium agents in patients with poor kidney function."],
        ["In CT, 'Pitch' is defined as:", ["Table feed per rotation divided by beam collimation width", "The angle of the x-ray tube", "The distance between the tube and detectors", "The number of detectors in the z-axis"], 0, "Pitch = Table travel per rotation / collimation (or detector width)."],
        ["A CT artifact characterized by alternating bright and dark streaks extending from a high-density object is called:", ["Beam hardening / Metal artifact", "Ring artifact", "Motion artifact", "Partial volume artifact"], 0, "High-density objects like metal implants absorb lower-energy photons, causing streak or beam hardening artifacts."],
        ["Which MRI sequence is characterized by a bright signal from fluid (CSF) and a dark signal from fat?", ["T2 weighted image with fat suppression (STIR)", "T1 weighted image", "Proton Density", "Time of Flight MRA"], 0, "Fluid is bright on T2, and fat is suppressed (dark) on STIR or Fat-Sat T2 sequences."],
        ["The Hounsfield Unit (HU) for distilled water is calibrated to:", ["0", "-1000", "+1000", "100"], 0, "By definition, water is 0 HU, and air is -1000 HU."],
        ["Which of the following contrast agents is typically used in CT angiography?", ["Non-ionic iodinated contrast", "Barium sulfate", "Gadolinium", "Microbubbles"], 0, "Iodinated contrast provides the high x-ray attenuation needed for CT angiography."],
        ["In MRI, the 'Larmor equation' is used to determine:", ["The precessional frequency of protons in a given magnetic field", "The specific absorption rate", "The T1 relaxation time", "The gradient slew rate"], 0, "Frequency = Gyromagnetic ratio x Magnetic field strength (B0)."],
        ["What is the primary cause of 'ring artifacts' in a third-generation CT scanner?", ["A faulty or miscalibrated detector element", "Patient motion", "Metal implants", "Beam hardening"], 0, "In a rotate-rotate (3rd gen) geometry, a dead detector traces a continuous ring on the reconstructed image."],
        ["Which MRI sequence is most sensitive for detecting early cerebral ischemia (stroke)?", ["Diffusion-Weighted Imaging (DWI)", "T1 weighted imaging", "T2 FLAIR", "Gradient Echo"], 0, "DWI can detect cytotoxic edema associated with acute stroke within minutes of onset."],
        ["Gadolinium contrast agents are most visible on which MRI sequence?", ["T1-weighted images (appears bright)", "T2-weighted images", "STIR", "DWI"], 0, "Gadolinium shortens T1 time, causing contrast-enhanced tissues to appear bright on T1-weighted images."],
        ["In a CT scan, spatial resolution can be improved by:", ["Decreasing the slice thickness", "Increasing the pitch", "Using a larger focal spot", "Decreasing the matrix size"], 0, "Thinner slices reduce partial volume averaging, thereby improving spatial resolution in the z-axis."],
        ["The specific absorption rate (SAR) in MRI is a measure of:", ["Radiofrequency power absorbed per unit of tissue mass", "The magnetic field strength", "Gradient noise levels", "Contrast injection rate"], 0, "SAR measures tissue heating caused by RF pulses, expressed in Watts per kilogram (W/kg)."],
        ["'Aliasing' or 'Wrap-around' artifact in MRI occurs when:", ["The field of view (FOV) is smaller than the anatomy being imaged", "The patient moves during the scan", "Metal is present in the FOV", "The TR is too short"], 0, "Anatomy outside the FOV gets mapped back into the opposite side of the image due to undersampling."],
        ["Which of the following is an absolute contraindication for an MRI scan?", ["A non-MRI conditional cardiac pacemaker", "A titanium joint replacement", "Dental fillings", "Pregnancy (first trimester is relative, not absolute)"], 0, "Traditional cardiac pacemakers are absolute contraindications due to the risk of device malfunction or lead heating."]
    ];
    ctMriData.forEach((d, i) => questions.push(createQ(56 + i, "CT & MRI", d[0], d[1], d[2], d[3])));

    const usgData = [
        ["In ultrasound, a higher frequency transducer provides:", ["Better spatial resolution but poorer penetration depth", "Poorer spatial resolution but better penetration", "No change in resolution or penetration", "Better resolution and better penetration"], 0, "High frequency (e.g., 10-15 MHz) gives excellent detail for superficial structures but cannot penetrate deeply."],
        ["The piezoelectric effect in an ultrasound transducer involves the conversion of:", ["Electrical energy into mechanical (sound) energy and vice versa", "X-rays into light", "Sound waves into heat", "Magnetic fields into radio waves"], 0, "Piezoelectric crystals vibrate when voltage is applied (transmit) and generate voltage when struck by sound (receive)."],
        ["'Acoustic shadowing' in ultrasound occurs posterior to:", ["Highly reflective or attenuating structures like bone or gallstones", "Fluid-filled cysts", "Normal liver tissue", "Blood vessels"], 0, "Strong reflectors like calcium absorb/reflect all sound, leaving a dark 'shadow' behind them."],
        ["The Doppler shift in ultrasound is used to measure:", ["Velocity and direction of blood flow", "Tissue elasticity", "Organ volume", "Bone density"], 0, "The change in frequency of sound waves reflected off moving red blood cells allows calculation of blood velocity."],
        ["Which artifact in ultrasound appears as multiple parallel equidistant lines deep to a strong reflector?", ["Reverberation artifact", "Mirror image artifact", "Acoustic enhancement", "Edge shadowing"], 0, "Sound bouncing back and forth between the transducer and a strong reflector creates reverberation lines."]
    ];
    usgData.forEach((d, i) => questions.push(createQ(71 + i, "Ultrasound", d[0], d[1], d[2], d[3])));

    const anatData = [
        ["The 'Circle of Willis' is located in the:", ["Base of the brain", "Heart", "Liver", "Kidney"], 0, "It is an arterial polygon at the base of the brain supplying blood to the cerebral hemispheres."],
        ["The most distal portion of the small intestine is the:", ["Ileum", "Duodenum", "Jejunum", "Cecum"], 0, "The small intestine consists of the duodenum, jejunum, and ileum, sequentially."],
        ["The common bile duct is formed by the union of the:", ["Common hepatic duct and cystic duct", "Right and left hepatic ducts", "Pancreatic duct and cystic duct", "Main pancreatic duct and common hepatic duct"], 0, "The cystic duct from the gallbladder joins the common hepatic duct from the liver to form the common bile duct."],
        ["The 'Sella Turcica', which houses the pituitary gland, is a depression in which bone?", ["Sphenoid bone", "Ethmoid bone", "Occipital bone", "Temporal bone"], 0, "The sella turcica ('Turkish saddle') is a distinct depression on the superior surface of the sphenoid body."],
        ["Which of the following carpal bones is located in the proximal row?", ["Scaphoid", "Trapezium", "Trapezoid", "Capitate"], 0, "The proximal row includes the Scaphoid, Lunate, Triquetrum, and Pisiform."],
        ["The tricuspid valve is located between the:", ["Right atrium and right ventricle", "Left atrium and left ventricle", "Right ventricle and pulmonary artery", "Left ventricle and aorta"], 0, "It prevents backflow of blood from the right ventricle into the right atrium."],
        ["The 'Foramen Magnum' is found in the:", ["Occipital bone", "Frontal bone", "Parietal bone", "Temporal bone"], 0, "It is the large opening in the occipital bone through which the spinal cord passes."],
        ["Which anatomical structure separates the thoracic cavity from the abdominal cavity?", ["Diaphragm", "Peritoneum", "Pleura", "Omentum"], 0, "The diaphragm is the primary muscle of respiration and acts as a physical divider between these cavities."],
        ["The medial malleolus is a bony projection of the:", ["Tibia", "Fibula", "Femur", "Calcaneus"], 0, "The distal medial end of the tibia forms the medial malleolus."],
        ["The 'C-loop' of the duodenum surrounds the head of the:", ["Pancreas", "Liver", "Spleen", "Gallbladder"], 0, "The head of the pancreas sits snugly within the C-shaped curve of the duodenum."],
        ["The first cervical vertebra (C1) is also known as the:", ["Atlas", "Axis", "Prominens", "Odontoid"], 0, "C1 is the Atlas, which supports the skull."],
        ["The ureters enter the urinary bladder at the:", ["Posterolateral angles of the trigone", "Anterior apex", "Superior dome", "Neck of the bladder"], 0, "They enter obliquely at the superolateral angles of the bladder base (trigone)."],
        ["The inner lining of the uterus is called the:", ["Endometrium", "Myometrium", "Perimetrium", "Epithelium"], 0, "The endometrium is the inner mucosal layer that thickens and sheds during the menstrual cycle."],
        ["The 'Odontoid process' (dens) is a feature of which vertebra?", ["Axis (C2)", "Atlas (C1)", "C7", "T1"], 0, "The dens projects upward from the body of C2, acting as a pivot for head rotation."],
        ["The largest and most superior of the three bones forming the human pelvis is the:", ["Ilium", "Ischium", "Pubis", "Sacrum"], 0, "The ilium is the large, wing-like superior portion of the innominate (hip) bone."]
    ];
    anatData.forEach((d, i) => questions.push(createQ(76 + i, "Anatomy", d[0], d[1], d[2], d[3])));

    const safetyDrData = [
        ["According to ALARA principles, which shield is most appropriate for a pediatric pelvic exam where gonads are in the primary beam?", ["Contact gonad shield, provided it does not obscure essential diagnostic information", "No shield should ever be used", "A full lead apron over the chest", "A shadow shield placed over the collimator"], 0, "Gonad shielding is recommended if the gonads lie within or near the primary beam, unless it compromises the exam's diagnostic value."],
        ["In digital radiography (DR), the 'Exposure Indicator' (EI) is primarily used to:", ["Evaluate if the appropriate radiation exposure reached the image receptor", "Measure patient entrance skin dose", "Adjust the focal spot size automatically", "Control the monitor brightness"], 0, "The EI provides feedback on whether the IR received the correct amount of radiation, helping to monitor and optimize dose."],
        ["What is the primary active layer material used in a direct conversion flat-panel DR detector?", ["Amorphous Selenium (a-Se)", "Amorphous Silicon (a-Si)", "Cesium Iodide (CsI)", "Barium Fluorohalide"], 0, "Direct conversion detectors use a photoconductor like a-Se to directly convert x-rays into an electrical signal."],
        ["Which of the following is a stochastic effect of radiation?", ["Cancer induction", "Skin erythema", "Cataract formation", "Epilation (hair loss)"], 0, "Stochastic effects occur by chance and have no threshold; probability increases with dose (e.g., cancer, genetic mutations)."],
        ["The annual occupational dose limit for a pregnant radiographer for the duration of the pregnancy is:", ["1 mSv (to the embryo/fetus)", "5 mSv", "20 mSv", "50 mSv"], 0, "The ICRP recommends an equivalent dose limit of 1 mSv to the embryo/fetus during the declared pregnancy."],
        ["'Dose Creep' in digital radiography refers to:", ["The gradual increase in exposure techniques used by technologists because digital systems compensate for overexposure", "The leakage of radiation from the tube housing over time", "The increase in patient dose due to aging grids", "The slow accumulation of background radiation"], 0, "Because digital systems produce good images even when overexposed (without getting 'dark'), technologists may unintentionally drift toward higher doses."],
        ["What is the minimum recommended lead equivalent thickness for a thyroid shield during fluoroscopy?", ["0.5 mm Pb", "0.25 mm Pb", "1.0 mm Pb", "1.5 mm Pb"], 0, "A 0.5 mm lead equivalent thyroid shield is standard for reducing dose to the sensitive thyroid gland during fluoroscopy."],
        ["Which of the following is considered a deterministic (tissue) effect of radiation?", ["Skin erythema", "Leukemia", "Genetic mutations", "Solid tumors"], 0, "Deterministic effects have a threshold dose, below which they do not occur. Severity increases with dose (e.g., skin burns, cataracts)."],
        ["When operating a portable C-arm fluoroscopy unit, where is the scatter radiation intensity generally the highest?", ["On the x-ray tube side of the patient", "On the image intensifier side of the patient", "Directly behind the monitor", "At the foot of the bed"], 0, "Scatter is highest on the entrance (tube) side. Operators should stand on the image intensifier side if possible."],
        ["In computed radiography (CR), the latent image on the photostimulable phosphor plate is read by:", ["A red Helium-Neon (or solid-state) laser beam", "An electron beam", "An array of blue LEDs", "A high-intensity white light"], 0, "The red laser stimulates the trapped electrons in the PSP plate, causing them to emit blue/purple light, which forms the image."]
    ];
    safetyDrData.forEach((d, i) => questions.push(createQ(91 + i, "Safety & DR", d[0], d[1], d[2], d[3])));

    // Shuffle options to ensure the correct answer is spread across all indices
    questions.forEach(q => {
        let mapped = q.opts.map((opt, i) => ({ text: opt, isCorrect: i === q.ans }));
        
        // Fisher-Yates shuffle
        for (let i = mapped.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mapped[i], mapped[j]] = [mapped[j], mapped[i]];
        }
        
        q.opts = mapped.map(m => m.text);
        q.ans = mapped.findIndex(m => m.isCorrect);
    });
}
'''

with open(r'c:\Users\annsh\Documents\kiddoprep-quiz-app\public\mock_papers\CBT10.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace title
content = content.replace('<title>AIIMS CBT - Sectional Timing Mode</title>', '<title>AIIMS CRE Radiographer - Test Paper 24</title>')
# Replace landing page heading
content = content.replace('<h1>AIIMS CRE CBT (Strict Pattern)</h1>', '<h1>AIIMS CRE - Test Paper 24</h1>')

# Replace generateQuestions function
pattern = re.compile(r'function generateQuestions\(\) \{.*?\n    \}', re.DOTALL)
content = pattern.sub(questions_js.strip(), content)

# Inject state saving and loading code
script_part = '''
        const LS_KEY = 'test_paper_24_state';
        const LS_Q_KEY = 'test_paper_24_questions';

        function saveState() {
            localStorage.setItem(LS_KEY, JSON.stringify(state));
        }

        function init() {
            const savedQ = localStorage.getItem(LS_Q_KEY);
            if (savedQ) {
                questions = JSON.parse(savedQ);
            } else {
                generateQuestions();
                localStorage.setItem(LS_Q_KEY, JSON.stringify(questions));
            }

            const savedState = localStorage.getItem(LS_KEY);
            if (savedState) {
                state = JSON.parse(savedState);
            }

            if (state.isFinished) {
                els.landing.classList.add('hidden');
                els.result.classList.remove('hidden');
                calculateResult();
            } else if (state.currentSection > 1 || state.currentQ > 0 || state.sectionTimeLeft < SECTION_TIME_LIMIT) {
                els.landing.classList.add('hidden');
                renderExamInterface();
                startSectionTimer();
            } else {
                els.landing.classList.remove('hidden');
                els.result.classList.add('hidden');
            }
        }
'''

content = content.replace('        function init() {\n            generateQuestions(); // Load data\n            // Persistence check could go here, but for strict timing, fresh start is safer\n            els.landing.classList.remove(\'hidden\');\n            els.result.classList.add(\'hidden\');\n        }', script_part.strip())

# Add saveState to startExam
content = content.replace('        function startExam() {\n            els.landing.classList.add(\'hidden\');\n            renderExamInterface();\n            startSectionTimer();\n        }', '        function startExam() {\n            els.landing.classList.add(\'hidden\');\n            renderExamInterface();\n            startSectionTimer();\n            saveState();\n        }')

# Add saveState to handleSectionTimeout and forceNextSection
content = content.replace('            startSectionTimer();\n        }', '            startSectionTimer();\n            saveState();\n        }')

# selectOption
content = content.replace('        function selectOption(optIndex) {\n            state.answers[state.currentQ] = optIndex;\n        }', '        function selectOption(optIndex) {\n            state.answers[state.currentQ] = optIndex;\n            saveState();\n        }')

# clearResponse
content = content.replace('            renderPalette();\n        }', '            renderPalette();\n            saveState();\n        }')

# finishExam
content = content.replace('            calculateResult();\n        }', '            calculateResult();\n            saveState();\n        }')

# startSectionTimer interval - to save periodically
timer_mod = '''
                if (state.sectionTimeLeft <= 0) {
                    handleSectionTimeout();
                } else if (state.sectionTimeLeft % 5 === 0) {
                    saveState();
                }
'''
content = content.replace('                if (state.sectionTimeLeft <= 0) {\n                    handleSectionTimeout();\n                }', timer_mod.strip())

with open(r'c:\Users\annsh\Documents\kiddoprep-quiz-app\public\mock_papers\TEST_PAPER24.html', 'w', encoding='utf-8') as f:
    f.write(content)
