import random
import json
import re

questions = []

def add_q(text, opts, ans, exp):
    questions.append({'text': text, 'opts': opts, 'ans': ans, 'exp': exp})

# 1-6 Computer
add_q('Which of the following describes a "Zero-Day Exploit" in cybersecurity?',
      ['An attack that occurs on the first day of the month.', 'An attack exploiting an unknown vulnerability before a patch is available.', 'A network failure caused by zero connectivity.', 'A virus that deletes all data within 24 hours.'], 1, 'A zero-day exploit takes advantage of a security vulnerability on the same day that the vulnerability becomes generally known, before a fix is available.')
add_q('In computer networking, the IPv6 address format is represented in:',
      ['Dotted-decimal format', 'Binary format only', 'Hexadecimal format', 'Octal format'], 2, 'IPv6 addresses are 128-bit identifiers, typically represented as eight groups of four hexadecimal digits.')
add_q('Which protocol is primarily used to secure data transmitted over the internet using encryption?',
      ['HTTP', 'FTP', 'SMTP', 'HTTPS'], 3, 'HTTPS (Hypertext Transfer Protocol Secure) uses TLS/SSL to encrypt data transmitted between the client and server.')
add_q('What does a "Subnet Mask" do in a local area network (LAN)?',
      ['It hides the IP address from external networks.', 'It identifies the network and host portions of an IP address.', 'It encrypts data packets for secure transmission.', 'It assigns dynamic IP addresses to devices.'], 1, 'A subnet mask is used to divide an IP address into two parts: the network address and the host address.')
add_q('Which of the following is an example of a "Phishing" attack?',
      ['Flooding a server with traffic to cause a denial of service.', 'Sending deceptive emails to trick individuals into revealing sensitive information.', 'Exploiting a software bug to gain root access.', 'Intercepting communication between two parties secretly.'], 1, 'Phishing involves tricking users into providing sensitive data, such as passwords or credit card numbers, usually via fraudulent emails.')
add_q('What is the function of a "Firewall" in a computer network?',
      ['To speed up internet connectivity.', 'To monitor and control incoming and outgoing network traffic based on security rules.', 'To store backup copies of important data.', 'To translate domain names into IP addresses.'], 1, 'A firewall acts as a barrier between a trusted internal network and an untrusted external network.')

# 7-11 Reasoning (Spatial & Logical)
add_q('If a cube is unfolded, which of the following nets CANNOT form a valid cube?',
      ['A cross-shaped net with 6 squares.', 'A T-shaped net with 6 squares.', 'A 3x2 rectangle of 6 squares.', 'A zig-zag shape of 6 squares.'], 2, 'A 3x2 rectangular grid of 6 squares will overlap when folded and cannot form a valid 3D cube.')
add_q('A person is facing North. They turn 135 degrees clockwise, then 45 degrees anticlockwise. Which direction are they facing now?',
      ['East', 'South-East', 'South', 'North-East'], 0, '135 deg clockwise from North is South-East. Then 45 deg anticlockwise takes them to East.')
add_q('In a certain code, MIRROR is written as RIMROR. How is REFORM written in that code?',
      ['FERMRO', 'FERMOR', 'ROFMER', 'MROFER'], 1, 'MIRROR -> RIM ROR (first 3 reversed, last 3 reversed). REFORM -> FER MOR.')
add_q('Select the odd one out based on geometric properties:',
      ['Cylinder', 'Cone', 'Sphere', 'Prism'], 3, 'Cylinder, Cone, and Sphere all have curved surfaces, while a Prism has only flat faces.')
add_q('A clock shows 3:15. What is the acute angle between the hour and minute hands?',
      ['0 degrees', '7.5 degrees', '15 degrees', '22.5 degrees'], 1, 'At 3:15, minute hand is exactly at 3. Hour hand has moved 15 minutes past 3, which is 15 * 0.5 = 7.5 degrees. Angle = 7.5 degrees.')

# 12-16 Quant (Time/Work, Geometry)
add_q('A can do a piece of work in 12 days and B can do it in 24 days. If they work together, in how many days will they complete the work?',
      ['6 days', '8 days', '10 days', '12 days'], 1, 'Together they do (1/12 + 1/24) = 3/24 = 1/8 of the work per day. Total time = 8 days.')
add_q('The ratio of the areas of two similar triangles is 16:25. What is the ratio of their corresponding altitudes?',
      ['4:5', '16:25', '256:625', '2:2.5'], 0, 'Ratio of areas = square of ratio of corresponding linear dimensions. sqrt(16:25) = 4:5.')
add_q('A cylindrical tank has a radius of 7m and a height of 10m. What is its approximate volume? (Use pi = 22/7)',
      ['1540 cubic meters', '770 cubic meters', '3080 cubic meters', '440 cubic meters'], 0, 'Volume = pi * r^2 * h = (22/7) * 49 * 10 = 22 * 7 * 10 = 1540.')
add_q('Pipe A can fill a tank in 4 hours and Pipe B can empty it in 6 hours. If both are opened, how long will it take to fill an empty tank?',
      ['10 hours', '12 hours', '24 hours', '2 hours'], 1, 'Net rate = 1/4 - 1/6 = 3/12 - 2/12 = 1/12 per hour. Total time = 12 hours.')
add_q('The perimeter of a rectangle is 40 cm. If its length is 12 cm, what is its area?',
      ['96 sq cm', '144 sq cm', '80 sq cm', '48 sq cm'], 0, 'Perimeter = 2(l+w) = 40. l+w = 20. 12+w = 20 => w=8. Area = 12*8 = 96 sq cm.')

# 17-20 GK (Scientific developments)
add_q('Which space agency recently launched the Psyche mission to explore a metal-rich asteroid?',
      ['ESA (European Space Agency)', 'ISRO (India)', 'JAXA (Japan)', 'NASA (USA)'], 3, 'NASA launched the Psyche mission in October 2023 to explore a unique metal-rich asteroid orbiting the Sun between Mars and Jupiter.')
add_q('What is the primary objective of the Aditya-L1 mission launched by ISRO?',
      ['To study the surface of the Moon', 'To observe the Sun from the Lagrange point L1', 'To map the atmospheric composition of Mars', 'To explore distant exoplanets'], 1, 'Aditya-L1 is the first Indian space-based mission to study the Sun, placed in a halo orbit around the Lagrange point 1 (L1).')
add_q('Which novel technology recently won the Nobel Prize in Medicine for enabling the rapid development of COVID-19 mRNA vaccines?',
      ['CRISPR-Cas9 gene editing', 'Monoclonal antibody synthesis', 'Nucleoside base modifications', 'Recombinant protein expression'], 2, 'Katalin Kariko and Drew Weissman won the 2023 Nobel Prize in Physiology or Medicine for their discoveries concerning nucleoside base modifications that enabled effective mRNA vaccines.')
add_q('What is the name of the AI model developed by Google that is designed to be multimodal from the ground up?',
      ['ChatGPT', 'Claude', 'Gemini', 'LLaMA'], 2, 'Gemini is Google\'s flagship multimodal AI model capable of understanding text, images, audio, and video.')

# 21-44 Techniques/Procedures (24 Qs)
add_q('Which of the following conditions is considered an absolute contraindication to an Intravenous Urogram (IVU)?',
      ['Anuria', 'Asthma', 'Mild iodine allergy', 'Hypertension'], 0, 'Anuria (inability to produce urine) makes IVU useless and potentially dangerous since the kidneys cannot excrete the contrast medium.')
add_q('During Endoscopic Retrograde Cholangiopancreatography (ERCP), the contrast is injected directly into the:',
      ['Common bile duct or pancreatic duct via the ampulla of Vater', 'Hepatic vein', 'Superior mesenteric artery', 'Gallbladder through percutaneous puncture'], 0, 'In ERCP, the endoscope reaches the duodenum, and a catheter is passed into the ampulla of Vater to inject contrast into the biliary or pancreatic ducts.')
add_q('In Hysterosalpingography (HSG), when is the procedure ideally performed to minimize the risk of irradiating an early pregnancy?',
      ['During menstruation', 'Within 10 days following the onset of menstruation', 'On the 14th day of the cycle', 'Immediately before menstruation'], 1, 'HSG is performed during the follicular phase (days 7-10 rule) to avoid the possibility of a fertilized ovum being irradiated or flushed out.')
add_q('All of the following are true regarding Micturating Cystourethrography (MCU) EXCEPT:',
      ['It is primarily used to diagnose vesicoureteral reflux (VUR).', 'Contrast is administered intravenously.', 'It involves fluoroscopic imaging during urination.', 'It requires catheterization of the bladder.'], 1, 'In MCU, contrast is introduced directly into the bladder via a urethral catheter, not intravenously.')
add_q('Which radiological procedure is considered the gold standard for diagnosing a urethral stricture in males?',
      ['Intravenous Urogram (IVU)', 'Retrograde Urethrogram (RGU)', 'Ultrasound of KUB', 'CT Urography'], 1, 'RGU involves injecting contrast directly into the urethra via the meatus to visualize strictures, tears, or diverticula.')
add_q('What is the typical concentration and dose of Barium Sulfate suspension for a Double-Contrast Barium Enema?',
      ['Low density (15-20% w/v), large volume', 'High density (75-95% w/v), smaller volume', 'High density (100-110% w/v), very large volume', 'Low density (5% w/v), small volume'], 1, 'Double-contrast barium enemas use high-density (thick) barium to coat the mucosa, combined with air insufflation.')
add_q('During a Barium Swallow, the patient is placed in the Right Anterior Oblique (RAO) position primarily to:',
      ['Project the esophagus between the heart and the vertebrae', 'Prevent aspiration of barium', 'Increase the transit time of barium', 'Decrease radiation dose to the sternum'], 0, 'The RAO position provides an unobstructed view of the esophagus, projecting it between the cardiac shadow and the spine.')
add_q('Which of the following is a specific preparation instruction for a patient undergoing a Barium Meal examination?',
      ['NPO for 8 hours prior to the exam', 'Full bladder required', 'Bowel cleansing with laxatives for 2 days', 'Discontinue all blood pressure medications'], 0, 'The stomach must be empty for a Barium Meal, requiring fasting (NPO) for at least 8 hours.')
add_q('A Sialography procedure evaluates which of the following structures?',
      ['Spinal canal', 'Salivary glands and ducts', 'Synovial joints', 'Lymph nodes'], 1, 'Sialography is the radiographic examination of the salivary glands (parotid, submandibular, sublingual) after injection of contrast into their ducts.')
add_q('Which contrast medium is preferred for gastrointestinal imaging if a bowel perforation is suspected?',
      ['High-density Barium Sulfate', 'Water-soluble iodinated contrast (e.g., Gastrografin)', 'Oil-based iodinated contrast', 'Gadolinium'], 1, 'Barium is contraindicated in suspected perforation as it can cause severe peritonitis. Water-soluble contrast is absorbed and excreted safely by the kidneys if it leaks into the peritoneum.')
add_q('What is the standard injection route and contrast type used for a Myelogram?',
      ['Intravenous injection of non-ionic contrast', 'Intrathecal injection of ionic contrast', 'Intrathecal injection of non-ionic, water-soluble contrast', 'Epidural injection of barium'], 2, 'Myelography requires the injection of non-ionic, water-soluble contrast into the subarachnoid space (intrathecal). Ionic contrast is strictly contraindicated intrathecally due to severe neurotoxicity.')
add_q('In a percutaneous transhepatic cholangiography (PTC), the needle is typically introduced using which anatomical landmark?',
      ['Left subcostal margin', 'Right mid-axillary line, 8th or 9th intercostal space', 'Epigastric region', 'Umbilicus'], 1, 'A Chiba needle is inserted percutaneously through the right 8th or 9th intercostal space into the liver to access the biliary tree.')
add_q('Which procedure is used to evaluate the patency of the fallopian tubes?',
      ['Hysterosalpingography (HSG)', 'Retrograde Pyelography (RGP)', 'Pelvic Ultrasound', 'Colposcopy'], 0, 'HSG evaluates the uterine cavity and fallopian tube patency by injecting contrast through the cervix.')
add_q('For an intravenous urogram (IVU), what is the purpose of applying abdominal compression?',
      ['To reduce patient motion', 'To retain contrast in the pelvicalyceal system and ureters', 'To decrease radiation scatter', 'To empty the bladder faster'], 1, 'Abdominal compression is applied over the distal ureters to occlude them temporarily, distending the proximal ureters and pelvicalyceal system for better visualization.')
add_q('In cerebral angiography, the catheter is most commonly introduced via which artery?',
      ['Carotid artery', 'Radial artery', 'Femoral artery', 'Brachial artery'], 2, 'The transfemoral approach is the most common route for cerebral angiography, passing the catheter up the aorta to the cerebral vessels.')
add_q('Which of the following describes the Seldinger technique used in angiography?',
      ['Surgical cutdown of the artery', 'Puncture with a needle, insertion of a guidewire, removal of the needle, and threading of a catheter over the wire', 'Direct injection into the vein without a catheter', 'Using a balloon to dilate a stricture'], 1, 'The Seldinger technique is the standard method for safe percutaneous access to blood vessels.')
add_q('In a T-tube cholangiogram, the contrast is injected:',
      ['Intravenously', 'Through a tube left in the common bile duct post-cholecystectomy', 'Directly into the liver parenchyma', 'Orally'], 1, 'A T-tube is often left in the common bile duct after surgery. Contrast is injected through it to check for residual stones or strictures.')
add_q('Dacrocystography is the radiological examination of the:',
      ['Salivary glands', 'Tear ducts (Lacrimal apparatus)', 'Spinal cord', 'Bile ducts'], 1, 'Dacrocystography uses contrast to visualize the lacrimal sac and nasolacrimal ducts to investigate epiphora (excessive tearing).')
add_q('Which drug is commonly administered to relax the bowel (antispasmodic) during a Double-Contrast Barium Enema?',
      ['Adrenaline', 'Buscopan (Hyoscine butylbromide) or Glucagon', 'Furosemide', 'Heparin'], 1, 'Buscopan or Glucagon are used to reduce bowel spasms, making the examination more comfortable and improving image quality.')
add_q('During a modified Barium Swallow (Videofluoroscopic Swallowing Study), what is primarily being evaluated?',
      ['Gastric emptying time', 'Oropharyngeal swallowing mechanism and aspiration risk', 'Duodenal ulcers', 'Gastroesophageal reflux disease (GERD)'], 1, 'A modified barium swallow is performed with a speech therapist to evaluate the phases of swallowing and detect aspiration into the airway.')
add_q('What is the primary purpose of a voiding cystourethrogram (VCUG/MCU) in pediatric patients?',
      ['To check for kidney stones', 'To diagnose Vesicoureteral Reflux (VUR)', 'To evaluate renal artery stenosis', 'To measure bladder volume capacity only'], 1, 'VCUG is the study of choice to detect and grade vesicoureteral reflux, common in children with recurrent UTIs.')
add_q('Which phase of a multiphasic CT liver scan is most critical for detecting hypervascular hepatocellular carcinoma (HCC)?',
      ['Unenhanced phase', 'Late arterial phase (approx. 35 seconds post-injection)', 'Portal venous phase (approx. 70 seconds post-injection)', 'Delayed phase (approx. 5 minutes post-injection)'], 1, 'Hypervascular tumors like HCC receive most of their blood supply from the hepatic artery, making them enhance brightly during the late arterial phase.')
add_q('For an MRI of the abdomen to evaluate the biliary tree without IV contrast, which sequence is primarily used?',
      ['T1-weighted fat-suppressed', 'MRCP (heavily T2-weighted sequence)', 'Diffusion-weighted imaging', 'Gradient echo'], 1, 'MRCP (Magnetic Resonance Cholangiopancreatography) uses heavily T2-weighted sequences to make static fluid (bile/pancreatic juice) appear very bright without needing contrast.')
add_q('What is a major complication of using a non-ionic water-soluble contrast medium intrathecally that must be monitored for?',
      ['Bowel obstruction', 'Seizures', 'Renal failure', 'Pulmonary embolism'], 1, 'While non-ionic contrast is safer than ionic, it can still lower the seizure threshold. Patients must be monitored and often kept with head elevated post-procedure.')

# 45-58 Physics/Equipment (14 Qs)
add_q('In Mammography, why are Molybdenum (Mo) or Rhodium (Rh) targets preferred over Tungsten (W)?',
      ['They have a higher melting point.', 'They produce high-energy characteristic x-rays suitable for dense breast tissue.', 'They produce low-energy characteristic x-rays (17-19 keV) which optimize contrast in soft tissue.', 'They are cheaper and last longer.'], 2, 'Mo and Rh targets yield lower energy characteristic x-rays (around 17-19 keV and 20-23 keV respectively), maximizing photoelectric absorption to provide high subject contrast in breast tissue.')
add_q('The function of Automatic Brightness Control (ABC) in a fluoroscopy system is to:',
      ['Automatically collimate the beam to the detector size.', 'Maintain constant image brightness by adjusting kVp and/or mA as tissue thickness varies.', 'Adjust the monitor contrast settings.', 'Switch between continuous and pulsed fluoroscopy automatically.'], 1, 'ABC automatically alters the exposure factors (kVp/mA) to maintain a consistent brightness on the display monitor as the fluoroscope moves over body parts of differing thickness.')
add_q('In Dual-Energy X-ray Absorptiometry (DEXA), two distinct x-ray photon energies are used primarily to:',
      ['Reduce patient dose by 50%.', 'Separate the attenuation contributions of soft tissue and bone mineral.', 'Create a 3D image of the spine.', 'Speed up the scanning time.'], 1, 'DEXA uses high and low x-ray energies. By measuring the differing attenuation at these two energies, the system mathematically subtracts soft tissue to isolate and measure bone mineral density.')
add_q('What is the main advantage of using Pulsed Fluoroscopy instead of continuous fluoroscopy?',
      ['It increases spatial resolution.', 'It reduces patient radiation dose significantly.', 'It eliminates all motion artifact.', 'It prolongs the life of the image intensifier tube.'], 1, 'Pulsed fluoroscopy delivers x-rays in brief pulses (e.g., 15 frames per second) rather than a continuous beam, drastically reducing total radiation dose.')
add_q('In an Image Intensifier, what is the function of the input phosphor?',
      ['Converts electrons back into visible light.', 'Focuses the electron stream.', 'Converts incident x-ray photons into visible light photons.', 'Converts visible light into electrons.'], 2, 'The input phosphor (usually Cesium Iodide) absorbs x-rays and emits visible light. This light then strikes the photocathode to produce electrons.')
add_q('Which component of the Image Intensifier converts light photons into electrons?',
      ['Input Phosphor', 'Photocathode', 'Electrostatic Lenses', 'Output Phosphor'], 1, 'The photocathode uses the photoelectric effect to emit electrons when struck by light from the input phosphor.')
add_q('The term "Minification Gain" in fluoroscopy refers to:',
      ['The decrease in patient dose.', 'The increase in brightness caused by concentrating electrons from a large input phosphor onto a small output phosphor.', 'The loss of resolution at the edges of the image.', 'The reduction in scatter radiation.'], 1, 'Minification gain is the ratio of the area of the input phosphor to the area of the output phosphor. Compressing the electrons into a smaller area increases image brightness.')
add_q('What target/filter combination is most appropriate in Mammography for imaging a thick, dense breast?',
      ['Mo target / Mo filter', 'Mo target / Rh filter', 'Rh target / Rh filter', 'W target / Al filter'], 2, 'A Rhodium target and Rhodium filter provide a slightly higher characteristic x-ray energy (20-23 keV), which penetrates thicker/denser breast tissue better than Mo/Mo.')
add_q('In computed radiography (CR), the latent image is stored in the photostimulable phosphor plate by:',
      ['Silver halide crystals turning into black metallic silver.', 'Electrons being trapped in high-energy metastable states (F-centers).', 'Immediate emission of blue light upon x-ray exposure.', 'Magnetic alignment of protons.'], 1, 'X-ray energy excites electrons in the europium-doped barium fluorohalide crystals. These electrons become trapped in "F-centers," storing the latent image until scanned by a laser.')
add_q('Which of the following effects is responsible for "Pincushion Distortion" in image intensifiers?',
      ['Curvature of the input phosphor', 'Fluctuations in mA', 'External magnetic fields', 'Scatter radiation'], 0, 'Pincushion distortion occurs because the input screen is convex (curved) while the output screen is flat, causing magnification to increase toward the periphery.')
add_q('In digital radiography (DR), an indirect-conversion flat-panel detector utilizes which of the following as a scintillator?',
      ['Amorphous Selenium (a-Se)', 'Cesium Iodide (CsI)', 'Silver Bromide', 'Tungsten'], 1, 'Indirect detectors use a scintillator (like CsI or Gadolinium Oxysulfide) to convert x-rays to light, which a photodiode array then converts to an electrical charge. Amorphous Selenium is used in DIRECT conversion.')
add_q('What is the role of Amorphous Selenium (a-Se) in Direct Digital Radiography (DR)?',
      ['It acts as a scintillator to produce light.', 'It directly converts x-ray photons into electrical charges (electron-hole pairs).', 'It stores the latent image for later laser readout.', 'It cools the detector panel.'], 1, 'Direct DR detectors use an a-Se photoconductor to absorb x-rays and directly generate an electrical charge, skipping the light-conversion step, which improves spatial resolution.')
add_q('The heel effect is MORE pronounced under which of the following conditions?',
      ['Large focal spot, short SID, large field size', 'Small focal spot, long SID, small field size', 'Small anode angle, short SID, large field size', 'Large anode angle, long SID, small field size'], 2, 'A steeper (smaller) anode angle, shorter SID, and larger field size all make the variation in beam intensity (heel effect) more noticeable across the image.')
add_q('Which interaction is the primary source of image contrast in the diagnostic x-ray range?',
      ['Compton effect', 'Photoelectric effect', 'Pair production', 'Coherent scatter'], 1, 'The Photoelectric effect causes total absorption of the x-ray photon. Because it depends heavily on atomic number (Z^3), it creates the contrast between different tissues (e.g., bone vs. soft tissue).')

# 59-72 Advanced Modalities (14 Qs)
add_q('In PET (Positron Emission Tomography), the scanner actually detects:',
      ['Positrons emitted by the radiopharmaceutical.', '511 keV annihilation photons traveling in exactly opposite directions.', 'Beta particles emitted by the tumor.', 'Gamma rays produced by isomeric transition.'], 1, 'When a positron meets an electron, they annihilate and produce two 511 keV gamma photons that travel exactly 180 degrees apart. The PET scanner detects these coincidence photons.')
add_q('What is the physical half-life of Fluorine-18 (18F), the most commonly used isotope in PET imaging?',
      ['6 hours', '110 minutes', '8 days', '60 days'], 1, 'Fluorine-18 has a half-life of approximately 110 minutes, making it practical for synthesis, transport, and clinical scanning.')
add_q('Which radiopharmaceutical is an analog of glucose and is used in PET to evaluate metabolic activity in oncology?',
      ['Technetium-99m MDP', 'Iodine-131', '18F-FDG (Fluorodeoxyglucose)', 'Gallium-67 citrate'], 2, '18F-FDG mimics glucose and is taken up heavily by metabolically active cells, such as cancer cells or the brain.')
add_q('In Nuclear Medicine, what is the physical half-life of Technetium-99m (Tc-99m)?',
      ['6 hours', '13 hours', '8 days', '110 minutes'], 0, 'Tc-99m has a half-life of 6 hours and emits 140 keV gamma rays, making it ideal for diagnostic imaging.')
add_q('Which component of a Gamma Camera allows it to determine the spatial origin of the incoming gamma photons?',
      ['Photomultiplier tubes', 'Sodium Iodide crystal', 'Collimator', 'Pulse height analyzer'], 2, 'The collimator (usually made of lead with many holes) only allows gamma rays traveling in specific directions to reach the crystal, providing spatial localization.')
add_q('In MRI, the "Larmor Frequency" refers to:',
      ['The speed at which the patient table moves.', 'The precessional frequency of protons in a static magnetic field.', 'The pulse repetition rate of the RF coils.', 'The rotation speed of the gradient coils.'], 1, 'The Larmor equation states that the precessional frequency of nuclear spins is proportional to the strength of the external magnetic field.')
add_q('Which of the following is considered an absolute contraindication for an MRI scan?',
      ['Titanium joint replacement', 'Cardiac pacemaker (non-MRI conditional)', 'Dental fillings', 'Pregnancy in the third trimester'], 1, 'Non-MRI conditional pacemakers, neurostimulators, and certain aneurysm clips are absolute contraindications due to risks of movement, heating, and device malfunction.')
add_q('In MRI, what is the primary purpose of the Gradient Coils?',
      ['To generate the main static magnetic field (B0).', 'To transmit RF pulses to excite protons.', 'To spatially encode the MRI signal by linearly varying the magnetic field.', 'To cool the superconducting magnet.'], 2, 'Gradient coils apply linear variations to the main magnetic field, allowing the system to locate where specific signals are coming from (slice selection, phase encoding, frequency encoding).')
add_q('"Pitch" in Helical/Spiral CT is defined as:',
      ['Table feed per gantry rotation divided by the beam collimation width.', 'Gantry rotation time divided by slice thickness.', 'kVp divided by mAs.', 'Number of detectors divided by rotation speed.'], 0, 'Pitch = (Table movement per 360 degree rotation) / (Collimator width). A pitch of 1 means contiguous spirals; >1 means overlapping, <1 means gaps.')
add_q('Which artifact in CT presents as alternating light and dark bands originating from a high-density object like a dental implant?',
      ['Ring artifact', 'Beam hardening / Streak artifact', 'Motion artifact', 'Partial volume artifact'], 1, 'High-density objects absorb lower-energy photons drastically, causing "photon starvation" and beam hardening, resulting in streak artifacts.')
add_q('In a multislice CT (MDCT) scanner, "Isotropic Resolution" means:',
      ['The resolution is perfect.', 'The voxel dimensions are equal in the x, y, and z axes.', 'The scanner uses a constant kVp.', 'There are no artifacts present.'], 1, 'Isotropic voxels are perfect cubes, allowing for high-quality multiplanar reconstructions (MPR) without loss of resolution in any plane.')
add_q('What does a CT Hounsfield Unit (HU) value of 0 represent?',
      ['Air', 'Dense Bone', 'Distilled Water', 'Fat'], 2, 'The HU scale is calibrated so that distilled water is exactly 0 HU, and air is -1000 HU.')
add_q('Which ultrasound interaction is responsible for the phenomenon of "Acoustic Enhancement" deep to a fluid-filled cyst?',
      ['High reflection at the cyst wall', 'Lack of attenuation of the sound beam as it passes through the fluid', 'Refraction of the beam', 'High absorption of sound by fluid'], 1, 'Fluids attenuate sound much less than solid tissue. As a result, the sound beam has higher amplitude after passing through a cyst, making deep tissues appear artificially bright (enhanced).')
add_q('The Doppler Effect in ultrasound is used to assess:',
      ['Tissue elasticity', 'Bone density', 'Blood flow velocity and direction', 'Fetal brain structures'], 2, 'The Doppler shift in frequency caused by moving red blood cells allows ultrasound to measure blood flow velocity and direction.')

# 73-84 Radiation Protection (12 Qs)
add_q('According to ICRP recommendations, what is the annual effective dose limit for a member of the general public?',
      ['1 mSv', '20 mSv', '50 mSv', '5 mSv'], 0, 'The annual effective dose limit for the public is 1 mSv (compared to 20 mSv averaged over 5 years for occupational workers).')
add_q('What material and thickness are typically required for the protective lead glass in a control booth window for a general radiographic room?',
      ['0.25 mm lead equivalent', '1.5 mm lead equivalent', '0.5 mm lead equivalent', '5.0 mm lead equivalent'], 1, 'The control booth window typically must have a minimum of 1.5 mm lead equivalence.')
add_q('Which of the following is true regarding Optically Stimulated Luminescence (OSL) dosimeters compared to TLDs?',
      ['OSLs use Lithium Fluoride and are read by heating.', 'OSLs use Aluminum Oxide (Al2O3) and are read using a laser.', 'OSLs cannot be reread.', 'OSLs are less sensitive than film badges.'], 1, 'OSL dosimeters use aluminum oxide crystals. They are read by optical stimulation with a laser and can be re-read, unlike TLDs.')
add_q('When performing portable (mobile) radiography, the radiographer should stand at least how far from the patient and x-ray tube?',
      ['1 meter (3 feet)', '2 meters (6 feet)', '0.5 meters', '5 meters'], 1, 'The cardinal rule for mobile radiography is to maximize distance, standing at least 2 meters (6 feet) away and wearing a lead apron.')
add_q('"Half-Value Layer" (HVL) is defined as:',
      ['The time required for half the radioactive atoms to decay.', 'The thickness of material that reduces the intensity of the x-ray beam to half its original value.', 'Half the mAs required to double the density.', 'The distance at which dose is halved.'], 1, 'HVL is a measure of beam quality. It is the thickness of an absorber (usually aluminum) required to reduce beam intensity by 50%.')
add_q('Which interaction is the primary source of occupational radiation exposure to the radiographer during fluoroscopy?',
      ['Photoelectric effect in the patient', 'Compton scatter from the patient', 'Pair production', 'Leakage radiation from the tube housing'], 1, 'Compton scatter from the patient\'s body is the main source of radiation dose to personnel in the room.')
add_q('The cardinal principles of radiation protection are:',
      ['kVp, mA, Time', 'Shielding, Collimation, Filtration', 'Time, Distance, Shielding', 'ALARA, Dose Limits, Monitoring'], 2, 'Minimize Time, Maximize Distance, and use Shielding.')
add_q('What is the function of total filtration in an x-ray tube?',
      ['To restrict the size of the x-ray beam.', 'To remove low-energy x-ray photons that only contribute to patient skin dose.', 'To cool the anode.', 'To increase the quantity of x-rays.'], 1, 'Filtration hardens the beam by removing low-energy "soft" x-rays that would be absorbed by the patient\'s skin without reaching the image receptor.')
add_q('Which principle dictates that all radiation doses should be kept "As Low As Reasonably Achievable"?',
      ['Inverse Square Law', 'ALARA Principle', '10-Day Rule', 'Bergonie-Tribondeau Law'], 1, 'The ALARA principle is the foundation of radiation protection philosophy.')
add_q('The Inverse Square Law states that if you double the distance from the radiation source, the intensity is:',
      ['Doubled', 'Halved', 'Reduced to one-quarter (1/4)', 'Reduced to one-eighth'], 2, 'Intensity is inversely proportional to the square of the distance (1 / 2^2 = 1/4).')
add_q('For a pregnant radiation worker, what is the recommended dose limit to the surface of the abdomen over the remaining duration of the pregnancy?',
      ['1 mSv', '20 mSv', '5 mSv', '50 mSv'], 0, 'Once pregnancy is declared, the equivalent dose limit to the embryo/fetus is 1 mSv for the remainder of the pregnancy.')
add_q('What does the "10-Day Rule" refer to in radiography?',
      ['Film must be processed within 10 days.', 'Non-urgent pelvic/abdominal x-rays in females of childbearing age should be restricted to the first 10 days of the menstrual cycle.', 'Radiation workers can only work 10 days a month.', 'Dosimeters are exchanged every 10 days.'], 1, 'The 10-day rule (though largely replaced by the 28-day rule in many places, historically significant) states that pelvic irradiation should be done in the first 10 days of the cycle when pregnancy is highly unlikely.')

# 85-92 Darkroom/Processing/Digital (8 Qs)
add_q('In manual or automatic film processing, the primary function of the Developer solution is to:',
      ['Remove unexposed silver halide crystals.', 'Convert exposed silver halide crystals into black metallic silver.', 'Harden the emulsion.', 'Wash away residual chemicals.'], 1, 'The developer acts as a reducing agent, donating electrons to convert the latent image (exposed AgBr) into a visible image of black metallic silver.')
add_q('Which chemical is the primary fixing agent (clearing agent) in the Fixer solution?',
      ['Phenidone', 'Hydroquinone', 'Ammonium thiosulfate', 'Potassium bromide'], 2, 'Ammonium or sodium thiosulfate clears the film by dissolving the unexposed, unreduced silver halide crystals.')
add_q('A radiograph emerges from the automatic processor with a brown/yellow stain over time. This is likely due to:',
      ['Over-replenishment of developer', 'Light leak in the darkroom', 'Inadequate washing leading to thiosulfate retention', 'High developer temperature'], 2, 'If fixer (thiosulfate) is not properly washed from the film, it eventually oxidizes and causes brown/yellow silver sulfide stains.')
add_q('In Computed Radiography (CR), what device reads the latent image on the imaging plate?',
      ['An image intensifier', 'A helium-neon or solid-state laser', 'An x-ray beam', 'A photomultiplier tube alone'], 1, 'A laser scans the phosphor plate, causing it to emit blue light (photostimulated luminescence) proportional to the x-ray exposure.')
add_q('If a CR plate is left exposed to room light for an extended period before scanning, what will happen?',
      ['The image contrast will improve.', 'The latent image will fade due to spontaneous fading and light stimulation.', 'The plate will become permanently damaged.', 'Nothing, the image is permanent.'], 1, 'The trapped electrons in the F-centers can return to their ground state if exposed to strong light or over time, causing image fading.')
add_q('"Exposure Indicator" (EI, S-number, or LgM) in digital radiography provides information about:',
      ['The spatial resolution of the image.', 'The patient\'s radiation dose.', 'The amount of radiation reaching the image receptor.', 'The contrast-to-noise ratio.'], 2, 'Exposure indicators guide the technologist on whether the IR received the correct amount of radiation (to avoid noise or overexposure).')
add_q('What happens to a digital image if an extreme overexposure occurs (e.g., 10x the needed dose)?',
      ['The image will be completely white.', 'The image will still look acceptable due to automatic rescaling, but patient dose is excessively high.', 'The image will be completely black.', 'The system will refuse to process it.'], 1, 'Digital systems have a wide dynamic range and "auto-rescale" overexposed images to look normal. This hides overexposure, leading to "dose creep."')
add_q('What is the purpose of the "Erasure" cycle in a CR reader?',
      ['To clean dust off the plate.', 'To flood the plate with bright white light to remove any residual trapped electrons.', 'To re-coat the phosphor layer.', 'To calibrate the laser.'], 1, 'Intense light ensures all electrons return to the ground state, preventing ghost images on the next exposure.')

# 93-100 Anatomy/Patient Care (8 Qs)
add_q('The "Carina" is the anatomical landmark where:',
      ['The esophagus enters the stomach.', 'The trachea bifurcates into the right and left main bronchi.', 'The aorta arches over the pulmonary artery.', 'The spinal cord ends.'], 1, 'The carina is the cartilaginous ridge at the bifurcation of the trachea, usually at the level of T4-T5.')
add_q('In a cross-sectional CT of the thorax, which cardiac chamber is situated most anteriorly, directly behind the sternum?',
      ['Left atrium', 'Left ventricle', 'Right atrium', 'Right ventricle'], 3, 'The right ventricle forms the largest part of the anterior surface of the heart.')
add_q('Which anatomical structure is located in the posterior mediastinum?',
      ['Thymus gland', 'Heart', 'Descending aorta', 'Ascending aorta'], 2, 'The descending aorta, esophagus, and azygos vein run through the posterior mediastinum.')
add_q('When taking a patient\'s blood pressure, the top number represents the:',
      ['Diastolic pressure', 'Systolic pressure', 'Mean arterial pressure', 'Pulse pressure'], 1, 'Systolic pressure is the maximum arterial pressure during contraction of the left ventricle.')
add_q('Which of the following is considered the single most effective method to prevent the spread of healthcare-associated infections (HAIs)?',
      ['Wearing a lead apron', 'Sterilizing all x-ray equipment daily', 'Proper hand hygiene (handwashing/sanitizer)', 'Using N95 masks for all patients'], 2, 'Hand hygiene is the fundamental and most effective way to prevent the transmission of infections.')
add_q('When dealing with a patient on "Airborne Precautions" (e.g., active Tuberculosis), what specific PPE must the radiographer wear?',
      ['Surgical mask', 'N95 respirator or higher', 'Sterile gown and gloves', 'Face shield only'], 1, 'Airborne precautions require an N95 or higher respirator to filter out small droplet nuclei.')
add_q('If a patient in the radiology department suddenly experiences a grand mal seizure, the immediate appropriate action is to:',
      ['Hold the patient down firmly to prevent thrashing.', 'Place a padded tongue blade in their mouth.', 'Help the patient to the floor, clear objects away, and protect their head.', 'Immediately administer CPR.'], 2, 'Never restrain a seizing patient or force objects into their mouth. Protect them from injury and observe.')
add_q('Which of the following describes the correct order for removing (doffing) Personal Protective Equipment (PPE)?',
      ['Mask, Gown, Gloves, Goggles', 'Gloves, Goggles/Face Shield, Gown, Mask/Respirator', 'Gown, Gloves, Mask, Goggles', 'Gloves, Mask, Gown, Goggles'], 1, 'The most contaminated items are removed first. Gloves, then face protection, then gown, and mask last (often outside the room).')

# Total should be exactly 100 questions.
# Let's count them
print(f"Total Questions Generated: {len(questions)}")
if len(questions) != 100:
    print(f"Error! Total questions is {len(questions)}")

# Shuffle options
for q in questions:
    correct_text = q['opts'][q['ans']]
    random.shuffle(q['opts'])
    q['ans'] = q['opts'].index(correct_text)

q_js = json.dumps(questions, indent=4)

with open("c:/Users/annsh/Documents/kiddoprep-quiz-app/public/mock_papers/CBT10.html", "r", encoding="utf-8") as f:
    template = f.read()

template = template.replace("<title>AIIMS CBT - Sectional Timing Mode</title>", "<title>AIIMS CRE Radiographer - Test Paper 13</title>")
template = template.replace("<h1>AIIMS CRE CBT (Strict Pattern)</h1>", "<h1>AIIMS CRE - Test Paper 13 (High Difficulty)</h1>")

js_inject = f"""
        questions = [];
        const rawQs = {q_js};
        rawQs.forEach((q, i) => {{
            questions.push({{ id: i+1, type: "Core", text: q.text, opts: q.opts, ans: q.ans, exp: q.exp }});
        }});
"""

pattern = re.compile(r'function generateQuestions\(\)\s*\{.*?(?=\s*// --- STATE MANAGEMENT ---)', re.DOTALL)
new_func = f"""function generateQuestions() {{
{js_inject}
    }}
"""
template = pattern.sub(new_func, template)

state_logic = """
        // LocalStorage Integration
        function saveState() {
            localStorage.setItem('test_paper_13_state', JSON.stringify(state));
        }
        
        function loadState() {
            const saved = localStorage.getItem('test_paper_13_state');
            if(saved) {
                state = JSON.parse(saved);
                return true;
            }
            return false;
        }
"""

template = template.replace('let state = {', state_logic + '\n        let state = {')

template = template.replace('generateQuestions(); // Load data\n            // Persistence check could go here, but for strict timing, fresh start is safer', 'generateQuestions(); // Load data\n            if(loadState() && !state.isFinished) { /* State loaded */ }')
template = template.replace('generateQuestions(); // Load data', 'generateQuestions(); // Load data\n            if(loadState() && !state.isFinished) { /* State loaded */ }')
template = template.replace('state.answers[state.currentQ] = optIndex;', 'state.answers[state.currentQ] = optIndex;\n            saveState();')
template = template.replace("state.status[index] = (state.answers[index] !== null) ? 'answered' : 'not-answered';", "state.status[index] = (state.answers[index] !== null) ? 'answered' : 'not-answered';\n            saveState();")
template = template.replace('state.isFinished = true;', 'state.isFinished = true;\n            saveState();')
template = template.replace('state.maxSetReached = state.currentSection;', 'state.maxSetReached = state.currentSection;\n            saveState();')
template = template.replace('state.sectionTimeLeft--;', 'state.sectionTimeLeft--;\n                if(state.sectionTimeLeft % 5 === 0) saveState();')
template = template.replace('state.currentSection++', 'state.currentSection++;\n            saveState();')

with open("c:/Users/annsh/Documents/kiddoprep-quiz-app/public/mock_papers/TEST_PAPER13.html", "w", encoding="utf-8") as f:
    f.write(template)

print("Created TEST_PAPER13.html successfully")
