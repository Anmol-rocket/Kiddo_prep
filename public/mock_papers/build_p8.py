import json
import re

cbt10_path = r'c:\Users\annsh\Documents\kiddoprep-quiz-app\public\mock_papers\CBT10.html'
output_path = r'c:\Users\annsh\Documents\kiddoprep-quiz-app\public\mock_papers\TEST_PAPER8.html'

with open(cbt10_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replacements
html = html.replace('<title>AIIMS CBT - Sectional Timing Mode</title>', '<title>AIIMS CRE Radiographer - Test Paper 8</title>')
html = html.replace('<h1>AIIMS CRE CBT (Strict Pattern)</h1>', '<h1>AIIMS CRE - Test Paper 8</h1>')

start_idx = html.find('function generateQuestions() {')
end_idx = html.find('        // --- STATE MANAGEMENT ---')

new_func = """function generateQuestions() {
        const createQ = (id, type, text, opts, ans, exp) => ({ id, type, text, opts, ans, exp });
        questions = [];

        const nonCoreData = [
            ["Series: 2, 6, 12, 20, 30, ?", ["40", "48", "42", "44"], 2, "Differences are consecutive even numbers: 4, 6, 8, 10, 12. 30 + 12 = 42."],
            ["A man walks 10 km North, turns left and walks 5 km, turns left and walks 10 km. How far is he from the starting point?", ["5 km", "10 km", "15 km", "20 km"], 0, "He forms a rectangle. He is 5 km west of start."],
            ["Series: 5, 11, 24, 51, 106, ?", ["122", "212", "106", "217"], 3, "Pattern is x2+1, x2+2, x2+3, x2+4, x2+5. 106 * 2 + 5 = 217."],
            ["A person faces East, turns 90 degrees clockwise, then 135 degrees counter-clockwise. Which direction are they facing?", ["North-West", "North-East", "South", "North"], 1, "90 CW - 135 CCW = 45 CCW from East, which is North-East."],
            ["Series: 1, 9, 25, 49, 81, ?", ["169", "144", "100", "121"], 3, "Squares of consecutive odd numbers: 1, 9, 25, 49, 81, 121."],
            ["Which mountain range separates northern India from southern India?", ["Aravalli Range", "Satpura Range", "Himalayas", "Vindhya Range"], 3, "The Vindhya Range acts as a geographic barrier between northern and southern India."],
            ["The Nathu La pass is located in which Indian state?", ["Sikkim", "Uttarakhand", "Himachal Pradesh", "Arunachal Pradesh"], 0, "Nathu La is a mountain pass in the Himalayas in East Sikkim district."],
            ["The highest peak in the Western Ghats is:", ["Doddabetta", "Kalsubai", "Anamudi", "Mahendragiri"], 2, "Anamudi, located in Kerala, is the highest peak in the Western Ghats and South India."],
            ["Rohtang Pass connects the Kullu Valley with:", ["Lahaul and Spiti Valleys", "Kangra Valley", "Nubra Valley", "Kashmir Valley"], 0, "Rohtang Pass is on the eastern Pir Panjal Range connecting Kullu with Lahaul and Spiti."],
            ["Which is the oldest mountain range in India?", ["Himalayas", "Karakoram Range", "Vindhya Range", "Aravalli Range"], 3, "The Aravalli Range in northwestern India is one of the oldest fold mountain systems in the world."],
            ["The idiom 'Bite the bullet' means:", ["To speak the truth bluntly", "To eat something hard", "To endure a painful or difficult situation", "To attack someone aggressively"], 2, "Biting the bullet means to accept something difficult or unpleasant."],
            ["The idiom 'Under the weather' means:", ["Being caught in the rain", "Feeling very happy", "Being ignored", "Feeling ill"], 3, "To feel under the weather means to feel unwell or sick."],
            ["The idiom 'A blessing in disguise' means:", ["A hidden treasure", "A good thing that seemed bad at first", "A very polite person", "A magic trick"], 1, "It refers to something that appears to be a misfortune but actually has good results."],
            ["The idiom 'Break a leg' is used to:", ["Wish someone harm", "Tell someone to hurry up", "Wish someone good luck", "Tell someone to be careful"], 2, "'Break a leg' is a theatrical idiom used to wish a performer 'good luck'."],
            ["The idiom 'Let the cat out of the bag' means:", ["To reveal a secret", "To make a mistake", "To adopt a pet", "To clean a house"], 0, "Letting the cat out of the bag means disclosing a secret carelessly or by mistake."],
            ["In computer networking, what does LAN stand for?", ["Linked Area Network", "Logical Area Network", "Large Area Network", "Local Area Network"], 3, "LAN connects computers within a limited area such as a residence, school, or office building."],
            ["Which network topology features a central node that connects to all other nodes?", ["Ring Topology", "Star Topology", "Bus Topology", "Mesh Topology"], 1, "In a Star topology, all devices are connected to a central hub or switch."],
            ["What does WAN stand for?", ["Wireless Area Network", "Web Area Network", "Wide Area Network", "Wide Array Network"], 2, "A Wide Area Network extends over a large geographic area, such as the Internet."],
            ["A device that forwards data packets between computer networks is called a:", ["Router", "Switch", "Modem", "Hub"], 0, "A router connects multiple networks and routes packets between them."],
            ["Which topology has every node connected to every other node?", ["Bus Topology", "Ring Topology", "Mesh Topology", "Star Topology"], 2, "A full mesh topology has point-to-point connections between every pair of nodes."]
        ];
        nonCoreData.forEach((d, i) => questions.push(createQ(i, "Non-Core", d[0], d[1], d[2], d[3])));

        const physicsData = [
            ["The target material most commonly used in mammography X-ray tubes is:", ["Tungsten", "Copper", "Molybdenum", "Rhodium"], 2, "Molybdenum produces characteristic X-rays in the 17-19 keV range, ideal for imaging soft tissues in breasts."],
            ["What is the typical kVp range used in mammography?", ["50-60 kVp", "80-100 kVp", "40-50 kVp", "25-30 kVp"], 3, "Mammography uses low kVp (25-30) to maximize photoelectric effect and enhance soft tissue contrast."],
            ["Which filter material is typically paired with a Rhodium target in mammography?", ["Rhodium", "Aluminum", "Molybdenum", "Tungsten"], 0, "A Rh/Rh target/filter combination is often used for imaging thicker, denser breasts due to slightly higher k-edge."],
            ["The window of a mammography X-ray tube is typically made of:", ["Lead glass", "Pyrex glass", "Aluminum", "Beryllium"], 3, "Beryllium is used because it has a very low atomic number and minimally attenuates the low-energy X-ray beam."],
            ["Dual-Energy X-ray Absorptiometry (DEXA) primarily measures:", ["Muscle mass", "Fat distribution", "Bone mineral density", "Blood flow"], 2, "DEXA uses two different X-ray energies to estimate bone mineral density."],
            ["In a DEXA scan, the T-score compares the patient's bone density to:", ["A healthy young adult of the same sex", "An age-matched peer", "The patient's baseline scan", "A healthy older adult"], 0, "T-score compares BMD to a young, healthy adult (peak bone mass), while Z-score compares to age-matched peers."],
            ["A T-score of -2.6 on a DEXA scan indicates:", ["Osteopenia", "Normal bone density", "Severe osteoporosis", "Osteoporosis"], 3, "A T-score of -2.5 or lower defines osteoporosis according to WHO criteria."],
            ["The heel effect in mammography is utilized by positioning the cathode side over the:", ["Nipple", "Lateral border", "Chest wall", "Medial border"], 2, "The cathode side has higher intensity, so it is placed over the thicker chest wall base."],
            ["What is the typical focal spot size used for magnification mammography?", ["0.3 mm", "1.0 mm", "0.6 mm", "0.1 mm"], 3, "Magnification views require a micro-focus spot of 0.1 mm to maintain spatial resolution and reduce geometric blur."],
            ["In DEXA scanning, what is the Z-score used for?", ["Comparing BMD to age, sex, and ethnicity-matched peers", "Comparing BMD to young healthy adults", "Estimating fracture risk directly", "Measuring body fat percentage"], 0, "Z-score compares bone mineral density to an age, sex, and ethnicity-matched population."]
        ];
        physicsData.forEach((d, i) => questions.push(createQ(20 + i, "Physics", d[0], d[1], d[2], d[3])));

        const posData = [
            ["The standard routine views for screening mammography are:", ["Mediolateral (ML) and CC", "Exaggerated CC and MLO", "Lateromedial and CC", "Craniocaudal (CC) and Mediolateral Oblique (MLO)"], 3, "CC and MLO are the standard two views for screening mammography."],
            ["In the MLO view of mammography, the pectoralis muscle should be visualized down to the level of the:", ["Posterior nipple line (PNL)", "Axilla only", "Inferior mammary fold", "Clavicle"], 0, "A good MLO view should show the pectoralis major muscle extending down to or below the posterior nipple line."],
            ["Which technique is specifically used for mammography of patients with breast implants?", ["Cleaves technique", "Magnification technique", "Eklund technique", "Spot compression"], 2, "The Eklund (implant-displaced) technique is used to push the implant posteriorly and pull the native breast tissue anteriorly."],
            ["The Orbitomeatal Line (OML) connects the outer canthus of the eye to the:", ["External Occipital Protuberance", "Nasion", "External Auditory Meatus (EAM)", "Acanthion"], 2, "The OML, or radiographic base line, connects the outer canthus to the EAM."],
            ["The angle between the OML and the IOML (Infraorbitomeatal line) is approximately:", ["15 degrees", "7 degrees", "20 degrees", "25 degrees"], 1, "The average angle difference between the OML and IOML is 7 degrees."],
            ["Reid's base line is another name for the:", ["Orbitomeatal Line (OML)", "Acanthiomeatal Line (AML)", "Mentomeatal Line (MML)", "Infraorbitomeatal Line (IOML)"], 3, "Reid's base line corresponds to the IOML."],
            ["For a true lateral projection of the skull, the midsagittal plane must be:", ["Perpendicular to the IR", "At a 45-degree angle to the IR", "Parallel to the IR", "At a 15-degree angle to the IR"], 2, "In a true lateral skull, the midsagittal plane is parallel to the image receptor."],
            ["The Acanthiomeatal line (AML) connects the EAM to the:", ["Mentum", "Acanthion", "Nasion", "Glabella"], 1, "The AML connects the acanthion (base of the anterior nasal spine) to the EAM."],
            ["For the Waters method (Parietoacanthial projection) of the facial bones, the OML forms what angle with the IR?", ["15 degrees", "55 degrees", "37 degrees", "45 degrees"], 2, "In the Waters view, the head is tilted back so the MML is perpendicular and the OML forms a 37-degree angle to the IR."],
            ["For the Modified Waters method, the OML forms what angle with the IR?", ["55 degrees", "37 degrees", "15 degrees", "45 degrees"], 0, "The Modified Waters uses less extension, placing the OML at a 55-degree angle to the IR to better show the orbital floors."],
            ["In an Exaggerated Craniocaudal (XCCL) view for mammography, the breast is positioned to better visualize the:", ["Medial breast tissue", "Axillary tail", "Inferior breast tissue", "Nipple complex"], 1, "XCCL is used to visualize the axillary tail (lateral breast tissue) that might not be fully seen on a standard CC view."],
            ["What is the primary purpose of firm compression in mammography?", ["To reduce breast thickness and separate overlapping structures", "To increase patient comfort", "To decrease X-ray tube heat", "To increase geometric unsharpness"], 0, "Compression reduces thickness, lowers dose, reduces scatter, and spreads out overlapping tissue."],
            ["Which projection uses the Mentomeatal Line (MML) positioned perpendicular to the IR?", ["Caldwell Method", "Towne Method", "Lateral Skull", "Waters Method"], 3, "In the standard Parietoacanthial (Waters) method, the MML is perpendicular to the IR."],
            ["Which radiographic positioning line connects the external auditory meatus to the midpoint of the chin?", ["Acanthiomeatal line", "Mentomeatal line", "Orbitomeatal line", "Glabellomeatal line"], 1, "The Mentomeatal line (MML) connects the mental point (chin) to the EAM."],
            ["The 'Spot Compression' view in mammography is used to:", ["Evaluate breast implants", "View the entire breast at once", "Differentiate between a real lesion and superimposed normal tissue", "Measure breast volume"], 2, "Spot compression displaces overlying normal glandular tissue to clarify whether a mass is real or a summation artifact."],
            ["Which skull positioning line is parallel to the IR in a Submentovertex (SMV) projection?", ["Orbitomeatal Line (OML)", "Acanthiomeatal Line (AML)", "Infraorbitomeatal Line (IOML)", "Mentomeatal Line (MML)"], 2, "Full neck extension is required to place the IOML parallel to the IR for an SMV view."],
            ["The CR angle for a standard AP axial projection (Towne method) of the skull when the OML is perpendicular is:", ["37 degrees caudad", "15 degrees caudad", "30 degrees caudad", "25 degrees cephalad"], 2, "With OML perpendicular, a 30-degree caudad angle is used (if IOML is perpendicular, it's 37 degrees)."],
            ["A Cleavage view (CV) in mammography is used to image:", ["The axillary tail", "The inframammary fold", "The nipple in profile", "Deep medial breast tissue"], 3, "The cleavage view is used to image tissue deep in the medial aspect of the breast between the two breasts."],
            ["Which baseline is also known as the anthropologic baseline?", ["Orbitomeatal line", "Infraorbitomeatal line (IOML)", "Glabellomeatal line", "Acanthiomeatal line"], 1, "The IOML is also known as Reid's base line and the anthropologic baseline."],
            ["In a lateral mammogram (ML or LM), what is the relationship of the X-ray beam to the breast?", ["The beam is angled 45 degrees", "The beam is vertical", "The beam is horizontal", "The beam is angled 30 degrees"], 2, "For a true ML or LM projection, the X-ray tube is rotated 90 degrees, resulting in a horizontal beam."]
        ];
        posData.forEach((d, i) => questions.push(createQ(30 + i, "Positioning", d[0], d[1], d[2], d[3])));

        const ctData = [
            ["Pitch in helical CT is defined as:", ["Table feed per gantry rotation divided by beam collimation", "Table feed per gantry rotation multiplied by beam collimation", "Gantry rotation speed divided by table speed", "Tube current multiplied by rotation time"], 0, "Pitch = Table travel per rotation / total collimated beam width."],
            ["A pitch greater than 1 in CT means:", ["Overlapping of data occurs", "Radiation dose is increased", "The table moves faster than the beam width, leaving gaps in data", "Spatial resolution is maximum"], 2, "Pitch > 1 implies gaps in the acquisition helix, lowering dose but potentially missing small lesions."],
            [" 'Ring artifacts' in third-generation CT scanners are typically caused by:", ["Patient motion", "Faulty detector elements", "Metal implants", "Out-of-field objects"], 1, "A miscalibrated or faulty detector in a 3rd gen (rotate-rotate) scanner traces a ring on the reconstructed image."],
            ["The Hounsfield Unit (HU) for pure water is defined as:", ["0", "-1000", "100", "-100"], 0, "By definition, the HU of water is 0, and air is -1000."],
            ["Partial volume averaging artifact in CT can be reduced by:", ["Increasing mA", "Decreasing kVp", "Increasing pitch", "Using thinner slices"], 3, "Thinner slices reduce the chance that multiple different tissue types will be averaged into a single voxel."],
            ["The 'Window Level' in CT determines the:", ["Total number of gray shades", "Patient dose", "Midpoint of the range of CT numbers displayed", "Pitch of the scan"], 2, "Window Level (Center) controls brightness and should be set near the average HU of the tissue of interest."],
            ["Beam hardening artifacts typically appear as:", ["Rings", "Dark streaks or bands between dense objects", "Bright flashes", "Motion blur"], 1, "As lower energy photons are absorbed by dense bone, the remaining beam becomes 'harder', causing dark streak artifacts."],
            ["Which CT generation uses a stationary detector ring and a rotating X-ray tube?", ["Fourth generation", "First generation", "Second generation", "Third generation"], 0, "4th generation scanners use a rotate-stationary geometry."],
            ["The mathematical process used by most modern CT scanners to reconstruct images from raw data is:", ["Iterative Reconstruction", "Simple Back Projection", "Filtered Back Projection", "Fourier Transform"], 2, "While Iterative Reconstruction is common now for dose reduction, Filtered Back Projection (FBP) has been the fundamental analytic method."],
            [" 'CTDI' stands for:", ["Computed Tissue Density Index", "Computed Tomography Data Input", "Central Tomographic Dose Indicator", "Computed Tomography Dose Index"], 3, "CTDI is a standardized measure of radiation dose output of a CT scanner."],
            ["Isotropic imaging in CT means that:", ["Pixels are square", "Scan time is equal for all slices", "Voxels have equal dimensions in x, y, and z axes", "Contrast enhancement is uniform"], 2, "Isotropic voxels are perfect cubes, allowing high-quality multiplanar reformations without loss of resolution."],
            ["The typical HU for dense bone is approximately:", ["+1000", "0", "+100", "-1000"], 0, "Dense cortical bone is around +1000 HU."],
            ["Which artifact is caused by voluntary or involuntary patient movement during a CT scan?", ["Ring artifact", "Beam hardening", "Motion artifact", "Partial volume artifact"], 2, "Motion causes blurring, ghosting, or streaks."],
            [" 'DLP' in CT dosimetry stands for:", ["Direct Linear Projection", "Dose Length Product", "Dose Limit Parameter", "Density Level Profile"], 1, "DLP represents the total energy absorbed during a scan (CTDIvol x scan length)."],
            ["A narrow window width in CT is used to:", ["View tissues with widely varying densities", "Maximize contrast between tissues with similar densities", "Reduce noise", "Decrease scan time"], 1, "A narrow window width increases image contrast, useful for subtle differences like gray/white matter in the brain."]
        ];
        ctData.forEach((d, i) => questions.push(createQ(50 + i, "CT", d[0], d[1], d[2], d[3])));

        const mriData = [
            ["MRI Safety Zone IV represents:", ["The control room", "The scanner room itself", "General public access area", "Patient screening and preparation area"], 1, "Zone IV is the MR magnet room, requiring strict access control."],
            ["Which MRI safety zone is strictly for screened MRI patients and personnel, typically the control room?", ["Zone II", "Zone I", "Zone IV", "Zone III"], 3, "Zone III is the restricted region (control room) just outside the magnet room."],
            ["A 'Quench' in an MRI system refers to:", ["The patient pressing the panic button", "Applying RF pulses", "The rapid boil-off of cryogenic liquid (helium)", "A power outage"], 2, "Quenching is the sudden loss of superconductivity leading to rapid boiling of liquid helium."],
            ["In the event of an MRI quench, what is a primary safety hazard to the patient in the scanner?", ["Asphyxiation and frostbite", "Electric shock", "Radiation burn", "Hearing loss"], 0, "Helium gas displaces oxygen (risk of asphyxiation) and is extremely cold."],
            ["Which of the following implants is generally considered an absolute contraindication for an MRI?", ["Titanium orthopedic screws", "Dental fillings", "Older cardiac pacemakers", "Copper IUDs"], 2, "While some newer pacemakers are MR-conditional, older models are absolute contraindications due to risk of heating and malfunction."],
            [" 'Specific Absorption Rate' (SAR) in MRI measures:", ["Acoustic noise", "Gradient magnetic field fluctuations", "Cryogen boil-off rate", "Tissue heating caused by RF energy"], 3, "SAR measures the rate at which RF energy is absorbed by the body, causing heating (W/kg)."],
            ["What is the main hazard associated with the static magnetic field of an MRI scanner?", ["Tissue heating", "Nerve stimulation", "Missile/projectile effect", "Radiation dose"], 2, "The strong static magnetic field forcefully attracts ferromagnetic objects, turning them into dangerous projectiles."],
            ["The 'Fringe Field' of an MRI magnet is defined by the:", ["1 Tesla line", "10 Gauss line", "5 Gauss line", "0.5 Tesla line"], 2, "The 5-Gauss line defines the limit beyond which the magnetic field might interfere with pacemakers."],
            ["Acoustic noise in an MRI scanner is primarily caused by:", ["Rapid switching of the gradient coils", "The main superconducting magnet", "The RF pulses", "The cooling fans"], 0, "The rapid turning on and off of gradient magnetic fields causes the coils to vibrate, producing loud noise."],
            ["An MR Conditional label on a device means:", ["It is completely safe in any MRI", "It can be scanned safely only under specific, defined conditions", "It is completely unsafe in any MRI", "It is made of plastic"], 1, "MR Conditional devices require adherence to specific parameters (field strength, SAR limits) to be safe."]
        ];
        mriData.forEach((d, i) => questions.push(createQ(65 + i, "MRI", d[0], d[1], d[2], d[3])));

        const usgData = [
            ["The piezoelectric effect in ultrasound transducers converts:", ["Heat to sound", "Light to sound", "Radiation to electricity", "Electrical energy to mechanical (sound) energy and vice versa"], 3, "Piezoelectric crystals deform when voltage is applied (producing sound) and produce voltage when hit by sound echoes."],
            ["Higher frequency ultrasound probes provide:", ["Better penetration but less resolution", "Better resolution but less penetration", "Better resolution and better penetration", "Lower resolution and lower penetration"], 1, "High frequencies (e.g., 10-15 MHz) offer excellent superficial resolution but cannot penetrate deep tissues."],
            ["Posterior acoustic shadowing is commonly seen behind:", ["Cysts", "The bladder", "Gallstones or bone", "Blood vessels"], 2, "Dense structures highly attenuate the sound beam, casting a dark 'shadow' behind them."],
            ["The Doppler effect in ultrasound is used to measure:", ["Tissue density", "Cyst volume", "Fetal bone length", "Blood flow velocity and direction"], 3, "Doppler detects shifts in frequency from moving reflectors (red blood cells) to evaluate flow."],
            ["A simple cyst on an ultrasound image typically appears:", ["Anechoic with posterior enhancement", "Hyperechoic with shadowing", "Isoechoic to liver", "Echogenic"], 0, "Simple cysts contain fluid which transmits sound easily (anechoic) and causes increased brightness behind them (enhancement)."]
        ];
        usgData.forEach((d, i) => questions.push(createQ(75 + i, "USG", d[0], d[1], d[2], d[3])));

        const anatData = [
            ["Which structure separates the right and left ventricles of the heart?", ["Bicuspid valve", "Interatrial septum", "Tricuspid valve", "Interventricular septum"], 3, "The muscular wall separating the lower chambers of the heart is the interventricular septum."],
            ["The 'Circle of Willis' is located in the:", ["Heart", "Kidney", "Base of the brain", "Liver"], 2, "The Circle of Willis is an arterial ring at the base of the brain providing collateral blood supply."],
            ["The common bile duct is formed by the union of the:", ["Right and left hepatic ducts", "Pancreatic duct and cystic duct", "Common hepatic duct and cystic duct", "Common hepatic duct and pancreatic duct"], 2, "The common hepatic duct joins the cystic duct from the gallbladder to form the common bile duct."],
            ["The first cervical vertebra (C1) is called the:", ["Atlas", "Axis", "Vertebra prominens", "Odontoid"], 0, "C1 is the Atlas, which supports the skull."],
            ["Which carpal bone is most commonly fractured?", ["Lunate", "Scaphoid", "Pisiform", "Hamate"], 1, "The scaphoid is the most frequently fractured carpal bone, often from a fall on an outstretched hand."],
            ["The largest and longest bone in the human body is the:", ["Tibia", "Femur", "Humerus", "Fibula"], 1, "The femur (thigh bone) is the longest, heaviest, and strongest bone."],
            ["Which organ is primarily located in the right upper quadrant (RUQ) of the abdomen?", ["Liver", "Spleen", "Stomach", "Appendix"], 0, "The liver occupies most of the right upper quadrant."],
            ["The functional unit of the kidney is the:", ["Nephron", "Alveolus", "Neuron", "Glomerulus"], 0, "The nephron is the microscopic structural and functional unit of the kidney."],
            ["The trachea bifurcates into the right and left main bronchi at the level of the:", ["Larynx", "Epiglottis", "Hilus", "Carina (T4-T5)"], 3, "The carina is the ridge at the base of the trachea that separates the openings of the right and left main bronchi."],
            ["The inner lining of the uterus is called the:", ["Endometrium", "Myometrium", "Perimetrium", "Cervix"], 0, "The endometrium is the glandular inner mucosal lining of the uterus."]
        ];
        anatData.forEach((d, i) => questions.push(createQ(80 + i, "Anatomy", d[0], d[1], d[2], d[3])));

        const safeData = [
            ["The primary purpose of a radiation dosimeter badge (TLD/OSL) is to:", ["Protect the worker from radiation", "Block secondary radiation", "Measure cumulative occupational radiation dose", "Monitor the room temperature"], 2, "Dosimeters record the accumulated dose received by the wearer; they do not provide shielding."],
            ["The ALARA principle stands for:", ["As Low As Reasonably Achievable", "As Little As Reasonably Allowed", "Always Leave Area Radiation Aware", "As Low As Radiation Allows"], 0, "ALARA is the guiding principle of radiation protection to minimize exposure."],
            ["The occupational annual whole-body dose limit for a radiographer according to AERB is:", ["50 mSv", "1 mSv", "20 mSv", "5 mSv"], 2, "AERB limit is 20 mSv per year, averaged over 5 years."],
            ["Which of the following is a stochastic effect of radiation?", ["Cataracts", "Cancer", "Skin erythema", "Hair loss"], 1, "Stochastic (probabilistic) effects like cancer and genetic mutations do not have a threshold and probability increases with dose."],
            ["In digital radiography (DR), the Exposure Indicator (EI) value tells the technologist:", ["The exact patient dose", "The kVp used", "Whether the detector received an appropriate amount of radiation", "The number of photons scattered"], 2, "EI indicates detector exposure to help technologists avoid overexposure (dose creep) or underexposure (quantum mottle)."],
            ["Quantum mottle (noise) on a digital radiograph is usually caused by:", ["Excessive kVp", "Grid cutoff", "High grid ratio", "Inadequate mAs (underexposure)"], 3, "Too few X-ray photons reaching the detector results in a grainy, noisy image."],
            ["What is 'dose creep' in digital radiography?", ["The gradual tendency to use higher exposure factors than necessary", "The spread of radiation in the room", "The automatic adjustment of kVp", "Leakage from the tube housing"], 0, "Because digital systems can compensate for overexposure to make a good image, technologists might gradually increase dose without realizing it."],
            ["A lead apron of 0.5 mm lead equivalent will attenuate approximately how much of scatter radiation at 75 kVp?", ["50%", "75%", "25%", "99%"], 3, "A 0.5 mm Pb apron absorbs nearly 99% of scatter at typical diagnostic energies."],
            ["The inverse square law states that if you double the distance from the radiation source, the dose is:", ["Reduced to one-fourth (1/4)", "Halved", "Doubled", "Unchanged"], 0, "Intensity is inversely proportional to the square of the distance. 1/(2^2) = 1/4."],
            ["The concept of 'Time, Distance, and Shielding' is fundamental to:", ["Equipment maintenance", "Image contrast", "Radiation protection", "MRI safety"], 2, "The three cardinal principles of radiation protection."]
        ];
        safeData.forEach((d, i) => questions.push(createQ(90 + i, "Safety", d[0], d[1], d[2], d[3])));
    }
"""

html_new = html[:start_idx] + new_func + html[end_idx:]

# Handle state management and localStorage saving
state_block_pattern = re.compile(r'let state = {[^}]+};\n', re.MULTILINE)
replacement = """let state = JSON.parse(localStorage.getItem('test_paper_8_state'));
        if (!state) {
            state = {
                currentQ: 0,
                answers: new Array(TOTAL_QUESTIONS).fill(null),
                status: new Array(TOTAL_QUESTIONS).fill('not-visited'),
                currentSection: 1,
                sectionTimeLeft: SECTION_TIME_LIMIT,
                maxSetReached: 1,
                isFinished: false
            };
        }

        function saveState() {
            localStorage.setItem('test_paper_8_state', JSON.stringify(state));
        }
"""
html_new = state_block_pattern.sub(replacement, html_new)

# Inject saveState()
html_new = html_new.replace('state.answers[state.currentQ] = optIndex;', 'state.answers[state.currentQ] = optIndex; saveState();')
html_new = html_new.replace('moveToNextQuestion();\n        }', 'moveToNextQuestion();\n            saveState();\n        }')
html_new = html_new.replace('renderPalette();\n        }', 'renderPalette();\n            saveState();\n        }')
html_new = html_new.replace('startSectionTimer();\n        }', 'startSectionTimer();\n            saveState();\n        }')

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html_new)
