// Weightage-wise topics for AIIMS CRE Radiology Technician exam
// Based on repeated patterns from AIIMS, PGI, RRB, DSSSB, ESIC exams

export interface WeightageTopic {
  id: string
  name: string
  weightage: "VERY HIGH" | "HIGH" | "MEDIUM-HIGH" | "MEDIUM" | "LOW-MEDIUM"
  expectedQuestions: string // e.g., "15-20 questions"
  priority: number // 1 is highest priority
  mustStudy: string[]
  questions: WeightageQuestion[]
}

export interface WeightageQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number // 0-indexed
  explanation: string
}

// Question format for reference:
// {
//   id: 1,
//   question: "Your question here?",
//   options: ["Option A", "Option B", "Option C", "Option D"],
//   correctAnswer: 0, // 0-indexed (0 = Option A, 1 = Option B, etc.)
//   explanation: "Explanation for the correct answer"
// }

export const weightageTopics: WeightageTopic[] = [
  {
    id: "radiation_protection_laws",
    name: "Radiation Protection & QA/QC",
    weightage: "VERY HIGH",
    expectedQuestions: "15-20 questions",
    priority: 1,
    mustStudy: [
      "Dose limits (ICRP)",
      "Controlled vs uncontrolled area",
      "TLD, OSL dosimeters",
      "Workload, occupancy, use factor",
      "Barriers: primary, secondary",
      "Leakage radiation",
      "QC tests for X-ray, CT, Mammography"
    ],
    questions: [
      // Add 100 MCQs here following the format:
      // {
      //   id: 1,
      //   question: "Question text?",
      //   options: ["Option A", "Option B", "Option C", "Option D"],
      //   correctAnswer: 0,
      //   explanation: "Explanation text"
      // },
    ]
  },
  {
    id: "radiology_physics",
    name: "Radiology Physics",
    weightage: "VERY HIGH",
    expectedQuestions: "15-20 questions",
    priority: 2,
    mustStudy: [
      "X-ray production (Bremsstrahlung, Characteristic)",
      "Factors affecting quality (kVp) & quantity (mAs)",
      "Inverse square law, FFD, OFD, magnification",
      "Attenuation, HVL, filtration",
      "Interaction of radiation: PE, Compton, Coherent",
      "Heel effect",
      "Generators: single phase, 3-phase, HF",
      "Line focus principle, focal spot blooming & loading",
      "Grid: ratio, frequency, focal range, density, Bucky factor",
      "Scatter & contrast control"
    ],
    questions: [
     {
    id: 1,
    question: "Which type of X-ray radiation constitutes the majority (approx. 85-90%) of the X-ray beam at 100 kVp?",
    options: ["Characteristic Radiation", "Bremsstrahlung Radiation", "Scatter Radiation", "Annihilation Radiation"],
    correctAnswer: 1,
    explanation: "Bremsstrahlung interactions occur over a continuous spectrum and make up the vast majority of the beam. Characteristic radiation only occurs at specific discrete energies."
  },
  {
    id: 2,
    question: "Characteristic X-rays are produced when:",
    options: ["A projectile electron slows down near the nucleus", "An outer-shell electron fills an inner-shell vacancy", "A neutron is ejected from the nucleus", "An electron changes its spin"],
    correctAnswer: 1,
    explanation: "Characteristic X-rays are emitted when an outer-shell electron drops down to fill a void in an inner shell (usually K-shell) created by a projectile electron."
  },
  {
    id: 3,
    question: "The energy of K-characteristic X-rays from a Tungsten target is approximately:",
    options: ["69 keV", "100 keV", "12 keV", "30 keV"],
    correctAnswer: 0,
    explanation: "The binding energy of the K-shell in Tungsten is 69.5 keV. Therefore, K-characteristic X-rays have an effective energy of approx 69 keV."
  },

  // --- SUBTOPIC: QUALITY (kVp) & QUANTITY (mAs) ---
  {
    id: 4,
    question: "Which factor primarily controls the penetrating power (quality) of the X-ray beam?",
    options: ["mAs", "kVp", "Focal spot size", "SID"],
    correctAnswer: 1,
    explanation: "kVp determines the maximum energy of the photons, directly influencing beam quality and penetrability (contrast)."
  },
  {
    id: 5,
    question: "If you double the mAs (milliampere-seconds), what happens to the number of X-ray photons produced?",
    options: ["It remains the same", "It increases by 50%", "It doubles", "It quadruples"],
    correctAnswer: 2,
    explanation: "There is a direct linear relationship between mAs and X-ray quantity. Doubling mAs doubles the number of electrons and thus the number of photons."
  },

  // --- SUBTOPIC: GEOMETRY (ISL, FFD, OFD, Magnification) ---
  {
    id: 6,
    question: "To calculate the Magnification Factor (MF), the formula is:",
    options: ["SID / SOD", "SOD / SID", "SID × SOD", "OID / SID"],
    correctAnswer: 0,
    explanation: "Magnification Factor = Source-to-Image Distance (SID) divided by Source-to-Object Distance (SOD)."
  },
  {
    id: 7,
    question: "An increase in Object-to-Film Distance (OFD/OID) will result in:",
    options: ["Decreased magnification and increased sharpness", "Increased magnification and decreased sharpness (blur)", "Increased contrast only", "No change in image geometry"],
    correctAnswer: 1,
    explanation: "Increasing the OID moves the object closer to the source relative to the film, increasing magnification and penumbra (blur)."
  },
  {
    id: 8,
    question: "If the radiation intensity at 1 meter is 100 mR, what is the intensity at 2 meters?",
    options: ["200 mR", "50 mR", "25 mR", "10 mR"],
    correctAnswer: 2,
    explanation: "According to the Inverse Square Law, doubling the distance reduces intensity to one-fourth (1/2² = 1/4). 100 / 4 = 25 mR."
  },

  // --- SUBTOPIC: INTERACTION OF RADIATION ---
  {
    id: 9,
    question: "Which interaction occurs at very low energy levels (< 10 keV) and causes the photon to change direction without losing energy?",
    options: ["Photoelectric Effect", "Compton Scatter", "Coherent (Classical) Scatter", "Pair Production"],
    correctAnswer: 2,
    explanation: "Coherent (or Classical/Thompson) scatter excites the atom but does not ionize it; the photon is scattered with no loss of energy."
  },
  {
    id: 10,
    question: "Which interaction results in the total absorption of the incident X-ray photon?",
    options: ["Compton Scatter", "Photoelectric Effect", "Coherent Scatter", "Transmission"],
    correctAnswer: 1,
    explanation: "In the Photoelectric Effect, the incident photon gives up all its energy to eject an inner-shell electron and ceases to exist."
  },

  // --- SUBTOPIC: ATTENUATION, HVL, FILTRATION ---
  {
    id: 11,
    question: "The thickness of an absorber required to reduce the radiation intensity to half its original value is known as:",
    options: ["Tenth Value Layer (TVL)", "Half Value Layer (HVL)", "Attenuation Coefficient", "Effective Dose"],
    correctAnswer: 1,
    explanation: "HVL is the standard measurement for effective beam quality."
  },
  {
    id: 12,
    question: "Inherent filtration in an X-ray tube typically includes:",
    options: ["The aluminum sheets added to the port", "The glass envelope and insulating oil", "The collimator mirror", "The grid"],
    correctAnswer: 1,
    explanation: "Inherent filtration is the filtration provided by the permanent components of the tube housing, primarily the glass envelope and cooling oil."
  },

  // --- SUBTOPIC: HEEL EFFECT ---
  {
    id: 13,
    question: "The Anode Heel Effect is most pronounced (noticeable) when using:",
    options: ["Long SID and small film size", "Short SID and large film size", "High kVp techniques", "Small focal spot only"],
    correctAnswer: 1,
    explanation: "The effect is more obvious at short distances (Short SID) and when covering a large field (Large Film Size) because the beam angle variation is greater."
  },

  // --- SUBTOPIC: GENERATORS & LINE FOCUS PRINCIPLE ---
  {
    id: 14,
    question: "What is the approximate voltage ripple for a Three-Phase, 12-Pulse generator?",
    options: ["100%", "14%", "4%", "< 1%"],
    correctAnswer: 2,
    explanation: "Single phase = 100% ripple; 3-phase 6-pulse = ~14%; 3-phase 12-pulse = ~4%; High Frequency = <1%."
  },
  {
    id: 15,
    question: "Focal Spot Blooming refers to:",
    options: ["The physical expansion of the focal spot due to high mA (electron repulsion)", "The use of a larger filament", "The angling of the anode", "The cracking of the anode"],
    correctAnswer: 0,
    explanation: "At high mA stations, the negative cloud of electrons swells due to electrostatic repulsion before hitting the anode, slightly enlarging the focal spot."
  },

  // --- SUBTOPIC: GRID & SCATTER CONTROL ---
  {
    id: 16,
    question: "The primary function of a radiographic grid is to:",
    options: ["Reduce patient dose", "Remove scatter radiation before it reaches the image receptor", "Cool the X-ray tube", "Filter low energy radiation"],
    correctAnswer: 1,
    explanation: "Grids are placed between the patient and the film to absorb scatter radiation, thereby improving image contrast. They do not reduce patient dose; they actually require a higher dose (mAs)."
  },
  {
    id: 17,
    question: "Grid Cut-off is most commonly caused by:",
    options: ["Using a focused grid upside down", "Using high kVp", "Using a low ratio grid", "Decreasing mAs"],
    correctAnswer: 0,
    explanation: "Grid cut-off (undesirable absorption of primary X-rays) often happens if a focused grid is inverted, off-center, or tilted."
  },
  {
    id: 18,
    question: "Which 'Grid Ratio' would provide the highest contrast improvement (best scatter cleanup)?",
    options: ["5:1", "8:1", "12:1", "16:1"],
    correctAnswer: 3,
    explanation: "Higher grid ratios (e.g., 16:1) are more efficient at cleaning up scatter but require precise positioning and higher patient dose."
  },
  {
    id: 19,
    question: "The 'Air Gap Technique' works as an alternative to a grid because:",
    options: ["The air absorbs the scatter", "Scatter radiation misses the film due to the distance between patient and film", "It increases magnification", "It reduces kVp"],
    correctAnswer: 1,
    explanation: "By increasing the OID (Air Gap), much of the scatter radiation produced in the patient diverges enough to miss the image receptor entirely."
  },
  {
    id: 20,
    question: "Which interaction is the primary source of scatter radiation in diagnostic radiography?",
    options: ["Photoelectric Effect", "Compton Scatter", "Pair Production", "Photodisintegration"],
    correctAnswer: 1,
    explanation: "Compton interactions create a recoil electron and a scattered photon that travels in a different direction, causing fog."
  },

  // --- ADVANCED / MIXED PHYSICS ---
  {
    id: 21,
    question: "X-ray quantity is proportional to the square of:",
    options: ["mAs", "kVp", "Distance", "Filtration"],
    correctAnswer: 1,
    explanation: "Quantity (intensity) increases with the square of the kVp. If you double kVp, intensity increases by a factor of 4."
  },
  {
    id: 22,
    question: "The 'Line Focus Principle' allows for a large area for heating (Actual Focal Spot) while maintaining a:",
    options: ["Small Effective Focal Spot", "Large Effective Focal Spot", "High ripple factor", "Low anode speed"],
    correctAnswer: 0,
    explanation: "This principle helps in handling high heat loads (large actual spot) while keeping the projected source size (effective spot) small for good detail."
  },
  {
    id: 23,
    question: "Which of the following grid errors results in a loss of density along the edges of the image only?",
    options: ["Off-level grid", "Off-center grid", "Upside down focused grid", "Focus-grid distance decentering (Grid Focus Distance)"],
    correctAnswer: 3,
    explanation: "If the SID is outside the specific focal range of the grid (too close or too far), density is lost at the periphery (edges) of the image."
  },
  {
    id: 24,
    question: "The photoelectric effect is most likely to occur in tissues with:",
    options: ["Low atomic number", "High atomic number", "High water content", "Low density"],
    correctAnswer: 1,
    explanation: "PE interaction probability is proportional to Z³ (Atomic Number cubed). Bone (Calcium, Z=20) has a much higher probability than soft tissue (Z=7.4)."
  },
  {
    id: 25,
    question: "Total filtration in the X-ray beam is the sum of:",
    options: ["Inherent filtration + Added filtration", "Inherent filtration + Compensating filter", "Added filtration + Mirror", "Tube shield + Collimator"],
    correctAnswer: 0,
    explanation: "Total filtration = Inherent (tube components) + Added (aluminum sheets)."
  },
  {
    id: 26,
    question: "The process of 'Thermionic Emission' occurs at the:",
    options: ["Anode Target", "Cathode Filament", "Focusing Cup", "Glass Envelope"],
    correctAnswer: 1,
    explanation: "Thermionic emission is the boiling off of electrons from the heated tungsten filament at the cathode."
  },
  {
    id: 27,
    question: "Which component of the X-ray tube is negatively charged to condense the electron stream?",
    options: ["Anode", "Rotor", "Focusing Cup", "Stator"],
    correctAnswer: 2,
    explanation: "The Focusing Cup (usually made of Nickel/Molybdenum) is negatively charged to repel the electrons and focus them into a narrow beam directed at the anode."
  },
  {
    id: 28,
    question: "To calculate Heat Units (HU) for a 3-Phase, 6-Pulse generator, the formula is:",
    options: ["kVp × mA × s", "kVp × mA × s × 1.35", "kVp × mA × s × 1.41", "kVp × mA × s × 0.7"],
    correctAnswer: 1,
    explanation: "3-Phase 6-Pulse generators produce more heat per exposure. The correction factor is 1.35. (For High Frequency, it is 1.40 or 1.41)."
  },
  {
    id: 29,
    question: "The 'Space Charge Effect' limits the:",
    options: ["Maximum kVp", "Maximum mA", "Exposure time", "Anode rotation speed"],
    correctAnswer: 1,
    explanation: "The space charge effect creates a cloud of electrons around the filament that repels subsequent electrons, limiting the tube's ability to produce high mA at low kVp."
  },
  {
    id: 30,
    question: "In a rotating anode tube, the rotation speed (approx 3000-10,000 rpm) helps to:",
    options: ["Focus the electron beam", "Dissipate heat over a larger track", "Increase the energy of the photons", "Reduce the heel effect"],
    correctAnswer: 1,
    explanation: "Rotation spreads the heat over a focal track rather than a single spot, allowing for higher tube currents and heat loading."
  },

  // --- SUBTOPIC: INTERACTIONS WITH MATTER ---
  {
    id: 31,
    question: "Pair Production requires an incident photon energy of at least:",
    options: ["1.02 MeV", "0.51 MeV", "140 keV", "10 MeV"],
    correctAnswer: 0,
    explanation: "Pair production only occurs when the incident photon has enough energy (1.02 MeV) to create a positron and an electron. This is used in PET scans, not general radiography."
  },
  {
    id: 32,
    question: "In Compton scattering, the scattered photon:",
    options: ["Has the same energy as the incident photon", "Has lower energy (longer wavelength) than the incident photon", "Is absorbed completely", "Turns into a positron"],
    correctAnswer: 1,
    explanation: "The incident photon transfers some energy to the recoil electron and continues as a scattered photon with reduced energy and longer wavelength."
  },
  {
    id: 33,
    question: "Which interaction is responsible for the white appearance of bone on an X-ray?",
    options: ["Compton Scatter", "Photoelectric Absorption", "Coherent Scatter", "Transmission"],
    correctAnswer: 1,
    explanation: "Differential absorption occurs because bone absorbs X-rays via the Photoelectric effect, preventing them from reaching the film (appearing white/radiopaque)."
  },

  // --- SUBTOPIC: FILTRATION & BEAM QUALITY ---
  {
    id: 34,
    question: "Adding filtration to the X-ray beam causes the emission spectrum to:",
    options: ["Shift to the left (lower energy) and increase amplitude", "Shift to the right (higher average energy) and decrease amplitude", "Increase in amplitude only", "Shift to the right and increase amplitude"],
    correctAnswer: 1,
    explanation: "Filtration removes low-energy photons (decreasing amplitude/quantity) but increases the average energy of the remaining beam (hardening/shifting right)."
  },
  {
    id: 35,
    question: "A 'Wedge Filter' is a type of compensating filter used for:",
    options: ["Skull radiography", "Chest radiography", "Foot or T-spine radiography", "Knee radiography"],
    correctAnswer: 2,
    explanation: "Wedge filters compensate for unequal body part thickness (e.g., the foot is thin at the toes and thick at the heel) to produce uniform density."
  },

  // --- SUBTOPIC: GEOMETRY & IMAGE QUALITY ---
  {
    id: 36,
    question: "Geometric Unsharpness (Penumbra) can be calculated using the formula:",
    options: ["(Focal Spot Size × OID) / SOD", "(Focal Spot Size × SID) / OID", "OID / SOD", "SID / SOD"],
    correctAnswer: 0,
    explanation: "Penumbra (P) = (Focal Spot × OID) / SOD. To reduce blur, you want a small focal spot, small OID, and large SOD."
  },
  {
    id: 37,
    question: "Shape distortion appearing as 'Elongation' typically occurs when:",
    options: ["The object is parallel to the film", "The tube or image receptor is angled", "The object is angled but the tube is perpendicular", "The central ray is perpendicular to the object"],
    correctAnswer: 1,
    explanation: "Elongation occurs when the tube or IR is angled improperly. Foreshortening occurs when the body part (object) is angled."
  },
  {
    id: 38,
    question: "Using the 'Direct Square Law' (Density Maintenance Formula), if you double the distance (SID) from 100cm to 200cm, what must you do to the mAs to maintain density?",
    options: ["Double the mAs", "Halve the mAs", "Multiply mAs by 4", "Divide mAs by 4"],
    correctAnswer: 2,
    explanation: "Because intensity drops by 4 times (Inverse Square Law), you must increase the technique (mAs) by 4 times to compensate."
  },

  // --- SUBTOPIC: GRIDS & SCATTER ---
  {
    id: 39,
    question: "A 'Focused Grid' is designed so that the lead strips are:",
    options: ["Parallel to each other", "Angled to match the divergence of the X-ray beam", "Criss-crossed", "Moving during exposure"],
    correctAnswer: 1,
    explanation: "Focused grids have canted lead strips that match the beam divergence at a specific distance (focal range) to prevent grid cut-off at the edges."
  },
  {
    id: 40,
    question: "The 'Grid Frequency' refers to:",
    options: ["The height of the lead strips", "The number of lead lines per cm or inch", "The ratio of height to distance", "The speed of the bucky"],
    correctAnswer: 1,
    explanation: "Frequency is the number of grid lines per unit length. High-frequency grids (e.g., 60-70 lines/cm) are used in digital imaging to prevent Moire artifacts."
  },
  {
    id: 41,
    question: "Which grid error results in a uniform loss of density across the entire image?",
    options: ["Off-level", "Off-center (Lateral decentering)", "Off-focus", "Upside down"],
    correctAnswer: 1,
    explanation: "If the grid is off-center (lateral decentering), the beam diverges against the lead strips, causing a uniform reduction in exposure across the whole image."
  },
  {
    id: 42,
    question: "The mechanism that moves the grid during exposure to blur out grid lines is called the:",
    options: ["Stationary Grid", "Potter-Bucky Diaphragm", "Slip Ring", "Collimator"],
    correctAnswer: 1,
    explanation: "The Potter-Bucky diaphragm (or Bucky) moves the grid (reciprocating or oscillating) to blur the grid lines so they are not visible on the image."
  },

  // --- SUBTOPIC: QA & MISCELLANEOUS PHYSICS ---
  {
    id: 43,
    question: "The accuracy of the Collimator (Light field vs X-ray field alignment) must be within:",
    options: ["± 2% of the SID", "± 5% of the SID", "± 10% of the SID", "± 1 cm regardless of SID"],
    correctAnswer: 0,
    explanation: "Quality Control standards require the light field and radiation field to align within +/- 2% of the Source-to-Image Distance (SID)."
  },
  {
    id: 44,
    question: "'Off-Focus Radiation' is produced when electrons hit:",
    options: ["The focal track", "Parts of the anode other than the focal spot", "The glass envelope", "The filter"],
    correctAnswer: 1,
    explanation: "Electrons sometimes bounce off the focal spot and strike other metal parts of the anode, creating 'extra-focal' or 'off-focus' X-rays that degrade the image (ghosting)."
  },
  {
    id: 45,
    question: "The primary purpose of the 'Stator' in the X-ray tube induction motor is to:",
    options: ["Rotate the anode using electromagnets outside the glass envelope", "Heat the filament", "Conduct heat away from the anode", "Support the cathode"],
    correctAnswer: 0,
    explanation: "The stator is the bank of electromagnets outside the glass/metal envelope that induces rotation in the internal copper rotor."
  },
  {
    id: 46,
    question: "In Fluoroscopy, the Image Intensifier input phosphor is usually made of:",
    options: ["Cesium Iodide (CsI)", "Zinc Cadmium Sulfide", "Calcium Tungstate", "Amorphous Silicon"],
    correctAnswer: 0,
    explanation: "Cesium Iodide (CsI) is the standard input phosphor because it grows in needle-like crystals that reduce light spread, improving resolution."
  },
  {
    id: 47,
    question: "Flux Gain in an image intensifier is the ratio of:",
    options: ["Output light photons to input X-ray photons", "Input X-ray photons to output light photons", "Output electron energy to input electron energy", "Diameter of input to diameter of output"],
    correctAnswer: 0,
    explanation: "Flux gain measures the intensification of the light signal: Number of output light photons divided by number of input X-ray photons."
  },
  {
    id: 48,
    question: "When using AEC (Automatic Exposure Control), the exposure is terminated when:",
    options: ["The set time is reached", "A predetermined quantity of radiation reaches the ionization chamber", "The kVp limit is reached", "The patient moves"],
    correctAnswer: 1,
    explanation: "AEC measures the radiation passing through the patient; once the ionization chamber collects enough charge (corresponding to proper density), the timer circuit breaks."
  },
  {
    id: 49,
    question: "A high Signal-to-Noise Ratio (SNR) in digital imaging results in:",
    options: ["A grainy image", "A clear image with high quality", "High patient dose", "Low contrast"],
    correctAnswer: 1,
    explanation: "Signal is the useful information; Noise is the random background interference. High SNR means a clear, high-quality image."
  },
  {
    id: 50,
    question: "The voltage across the X-ray tube is most accurately described as:",
    options: ["Direct Current (DC)", "Alternating Current (AC)", "Pulsating Direct Current", "Static Current"],
    correctAnswer: 2,
    explanation: "Even with rectification, the voltage goes from zero to peak (or ripple to peak). It is unidirectional (DC) but fluctuates (pulsating), unless it is a perfect constant potential (rare)."
  },
  {
    id: 51,
    question: "In Computed Radiography (CR), the 'Latent Image' typically loses about 25% of its energy if not processed within:",
    options: ["1 hour", "8 hours", "24 hours", "10 minutes"],
    correctAnswer: 1,
    explanation: "The latent image on a PSP plate begins to fade (fading effect) immediately. It loses roughly 25% of its stored energy within 8 hours, so timely processing is crucial."
  },
  {
    id: 52,
    question: "Which digital artifact appears as a wavy, grid-like pattern when the grid lines run parallel to the laser scan lines?",
    options: ["Ghosting", "Moire Pattern", "Dropout artifact", "Blooming"],
    correctAnswer: 1,
    explanation: "The Moire effect (aliasing) occurs when two grid patterns (the anti-scatter grid and the digital sampling grid) overlap or are aligned closely in frequency."
  },
  {
    id: 53,
    question: "A 'Histogram' in digital image processing represents:",
    options: ["The physical size of the pixels", "A graphic display of the distribution of pixel values (intensities)", "The speed of the network connection", "The patient dose report"],
    correctAnswer: 1,
    explanation: "A histogram maps the frequency of each gray level (pixel value) in the image, allowing the software to rescale the image (rescaling) for proper brightness."
  },
  {
    id: 54,
    question: "The 'Fill Factor' of a detector element (del) in Direct Radiography (DR) refers to:",
    options: ["The percentage of the pixel face that is sensitive to X-rays", "The amount of contrast medium used", "The storage capacity of the hard drive", "The speed of the scintillator"],
    correctAnswer: 0,
    explanation: "A higher Fill Factor means a larger sensing area per pixel, leading to better spatial resolution and signal-to-noise ratio (SNR)."
  },
  {
    id: 55,
    question: "In digital imaging, 'Window Level' primarily controls:",
    options: ["Image Contrast (Gray scale)", "Image Brightness (Density)", "Image Sharpness", "Image Magnification"],
    correctAnswer: 1,
    explanation: "Window Level determines the center of the visible range, affecting brightness. Window Width controls the contrast."
  },
  {
    id: 56,
    question: "Which component is used in Indirect DR systems to convert X-rays into light?",
    options: ["Photoconductor (Selenium)", "Scintillator (Cesium Iodide)", "Photomultiplier Tube", "TFT Array"],
    correctAnswer: 1,
    explanation: "Indirect systems use a Scintillator (like Cesium Iodide or Gadolinium Oxysulfide) to turn X-rays into light, which is then converted to electrons by photodiodes."
  },
  {
    id: 57,
    question: "The smallest component of a digital image matrix is the:",
    options: ["Voxel", "Pixel", "Bit", "Byte"],
    correctAnswer: 1,
    explanation: "A Pixel (Picture Element) is the 2D building block. A Voxel (Volume Element) is the 3D equivalent used in CT/MRI."
  },
  {
    id: 58,
    question: "Look-Up Table (LUT) is used during processing to:",
    options: ["Store patient data", "Apply a specific contrast characteristic curve to the raw data", "Measure the dose area product", "Reduce scatter"],
    correctAnswer: 1,
    explanation: "The LUT maps the raw pixel values to desired brightness levels to give the image the correct 'look' (contrast) for the specific body part."
  },
  {
    id: 59,
    question: "The process of 'Erasure' in CR plates is done by exposing the plate to:",
    options: ["Intense white light", "Infrared laser", "Ultraviolet light", "Heat"],
    correctAnswer: 0,
    explanation: "After the image is read, the plate is flooded with bright white light to release any remaining trapped electrons and clear the plate for reuse."
  },
  {
    id: 60,
    question: "Spatial Resolution in digital imaging is primarily limited by:",
    options: ["Pixel Size (Pixel Pitch)", "Bit Depth", "Window Width", "Processor Speed"],
    correctAnswer: 0,
    explanation: "You cannot resolve an object smaller than the pixel size. Smaller pixels (finer pitch) yield higher spatial resolution."
  },

  // --- TOPIC 3: RADIOGRAPHIC POSITIONING (Chest & Abdomen) ---
  {
    id: 61,
    question: "For a standard PA Chest X-ray, the X-ray tube should be at a SID of:",
    options: ["100 cm (40 inches)", "180 cm (72 inches)", "30 cm (12 inches)", "200 cm (80 inches)"],
    correctAnswer: 1,
    explanation: "180 cm (72 inches) is standard for chest radiography to minimize magnification of the heart and increase sharpness."
  },
  {
    id: 62,
    question: "Why is the PA projection preferred over AP for chest radiography?",
    options: ["To reduce breast exposure", "To place the heart closer to the film (reducing cardiac magnification)", "It is more comfortable", "To visualize the spine better"],
    correctAnswer: 1,
    explanation: "In PA position, the heart (anterior structure) is closer to the detector, resulting in less magnification and a truer heart size."
  },
  {
    id: 63,
    question: "To demonstrate a small pneumothorax (air in pleural space), which view is often recommended?",
    options: ["Lateral Decubitus (Affected side down)", "Expiration PA Chest", "Lordotic View", "Supine AP"],
    correctAnswer: 1,
    explanation: "An Expiration film reduces lung volume, making the pneumothorax (air) appear relatively larger and denser against the collapsed lung tissue."
  },
  {
    id: 64,
    question: "The 'Lindblom' or 'Lordotic' view is used specifically to visualize:",
    options: ["Fluid in the costophrenic angles", "The lung apices (clavicles thrown above apices)", "The heart shadow", "The diaphragm"],
    correctAnswer: 1,
    explanation: "The Apical Lordotic view projects the clavicles above the lung apices, allowing a clear view of apical lesions (e.g., TB)."
  },
  {
    id: 65,
    question: "For an acute abdomen series (suspected perforation), which view is critical to show free air under the diaphragm?",
    options: ["Supine Abdomen (KUB)", "Erect Abdomen (or Erect Chest PA)", "Lateral Abdomen", "Prone Abdomen"],
    correctAnswer: 1,
    explanation: "An Erect view (Chest or Abdomen) allows free intraperitoneal air to rise under the diaphragm, which is the sign of perforation."
  },

  // --- TOPIC 3: RADIOGRAPHIC POSITIONING (Skeletal / Extremities) ---
  {
    id: 66,
    question: "To best visualize the Scaphoid bone and rule out a fracture, the wrist should be positioned in:",
    options: ["Radial Deviation", "Ulnar Deviation", "Neutral", "Full Extension"],
    correctAnswer: 1,
    explanation: "Ulnar deviation opens up the spaces between the carpals and elongates the scaphoid, preventing overlap."
  },
  {
    id: 67,
    question: "The 'Y-view' (Scapular Y) is primarily used to evaluate:",
    options: ["Fracture of the clavicle", "Shoulder dislocation", "AC joint separation", "Scapular fracture"],
    correctAnswer: 1,
    explanation: "The Scapular Y lateral view clearly shows the humeral head's relationship to the glenoid, making it ideal for diagnosing anterior/posterior dislocations."
  },
  {
    id: 68,
    question: "The 'Frog-leg' lateral position is a common view for the:",
    options: ["Knee", "Ankle", "Hip joints (Non-trauma)", "Shoulder"],
    correctAnswer: 2,
    explanation: "The Modified Cleaves (Frog-leg) method is used for non-traumatic hip exams to visualize the femoral neck and greater trochanter."
  },
  {
    id: 69,
    question: "In a lateral knee projection, the knee is typically flexed 20-30 degrees to:",
    options: ["Prevent patellar fracture", "Relax the muscles and show maximum joint cavity volume", "Tighten the ACL", "Flatten the femoral condyles"],
    correctAnswer: 1,
    explanation: "Flexion of 20-30 degrees relaxes the patella and prevents it from being drawn into the intercondylar sulcus, while showing the joint space well."
  },
  {
    id: 70,
    question: "The 'Skyline' or 'Sunrise' view is used to visualize the:",
    options: ["Calcaneus", "Patellofemoral joint", "Acromioclavicular joint", "Zygomatic arch"],
    correctAnswer: 1,
    explanation: "This axial view (Settegast/Merchant method) looks tangentially at the patella and patellofemoral joint space."
  },

  // --- TOPIC 3: RADIOGRAPHIC POSITIONING (Skull & Spine) ---
  {
    id: 71,
    question: "The 'Waters View' (Occipitomental) is the best projection for visualizing:",
    options: ["Frontal Sinuses", "Maxillary Sinuses", "Sphenoid Sinuses", "Sella Turcica"],
    correctAnswer: 1,
    explanation: "The Waters view projects the petrous ridges below the maxillary sinuses, providing an unobstructed view of fluid levels or polyps in the maxillary antrum."
  },
  {
    id: 72,
    question: "Towne’s View (AP Axial Skull) requires a caudal angulation of:",
    options: ["10 degrees", "15 degrees", "30 degrees", "45 degrees"],
    correctAnswer: 2,
    explanation: "A 30-degree caudal angle is standard (37 degrees if using IOML) to visualize the occipital bone and foramen magnum."
  },
  {
    id: 73,
    question: "The 'Open Mouth' (Odontoid) view is essential for visualizing:",
    options: ["C1 (Atlas) and C2 (Axis)", "C7 and T1 junction", "The mandible", "The nasal bone"],
    correctAnswer: 0,
    explanation: "The AP Open Mouth view projects the Atlas (C1) and Axis (C2) dens (odontoid process) through the open mouth, free of superimposition."
  },
  {
    id: 74,
    question: "The 'Swimmer’s View' is used when:",
    options: ["The patient is wet", "The C7-T1 junction is not visible on the lateral C-spine due to shoulder superimposition", "Looking for swimmers ear", "Visualizing the lumbar spine"],
    correctAnswer: 1,
    explanation: "This view (Twining method) clears the shoulders to visualize the cervicothoracic junction (C7-T1)."
  },
  {
    id: 75,
    question: "Which projection is best for visualizing the Intervertebral Foramina of the Cervical Spine?",
    options: ["AP", "Lateral", "Oblique", "Open Mouth"],
    correctAnswer: 2,
    explanation: "Oblique views (RPO/LPO) are required to open up the intervertebral foramina in the C-spine. (Note: In L-spine, lateral view shows foramina)."
  },

  // --- TOPIC 4: CT SCAN BASICS & PHYSICS (High Yield) ---
  {
    id: 76,
    question: "The CT number (Hounsfield Unit) for pure water is calibrated to:",
    options: ["-1000", "0", "+1000", "+100"],
    correctAnswer: 1,
    explanation: "Water is the reference point for the Hounsfield scale and is always set to 0 HU."
  },
  {
    id: 77,
    question: "The CT number for Air is:",
    options: ["0 HU", "-100 HU", "-1000 HU", "+1000 HU"],
    correctAnswer: 2,
    explanation: "Air is the least dense substance typically measured, set at -1000 HU. Dense bone is +1000 HU or more."
  },
  {
    id: 78,
    question: "Which generation of CT scanners introduced the 'Slip Ring' technology allowing for Helical/Spiral scanning?",
    options: ["First Generation", "Second Generation", "Third Generation", "Fourth Generation (Spiral enabled)"],
    correctAnswer: 2,
    explanation: "Slip ring technology (continuous rotation without cables wrapping) enabled the development of Spiral/Helical CT. This is most associated with modern 3rd gen architectures."
  },
  {
    id: 79,
    question: "In CT, 'Pitch' is defined as:",
    options: ["Table movement per rotation / Beam width", "kVp / mAs", "Gantry tilt angle", "Slice thickness × Time"],
    correctAnswer: 0,
    explanation: "Pitch > 1 means the table moves faster than the beam width (gaps/lower dose). Pitch < 1 means overlap (higher detail/higher dose)."
  },
  {
    id: 80,
    question: "Beam Hardening artifact in CT (e.g., between petrous ridges) appears as:",
    options: ["Bright streaks", "Dark bands or streaks", "Blurring", "Rings"],
    correctAnswer: 1,
    explanation: "As the beam passes through dense bone, lower energy photons are absorbed (hardened). The remaining beam is more penetrating, causing the detector to underestimate attenuation, appearing as dark streaks."
  },
  {
    id: 81,
    question: "Window Width (WW) in CT determines the:",
    options: ["Center of the gray scale", "Number of gray shades displayed (Contrast)", "Spatial resolution", "Pixel size"],
    correctAnswer: 1,
    explanation: "A narrow Window Width results in high contrast (few shades). A wide Window Width (e.g., lung window) results in long gray scale."
  },
  {
    id: 82,
    question: "High Resolution CT (HRCT) of the chest typically uses:",
    options: ["Thick slices (10mm)", "Thin slices (1-2mm) with high spatial frequency algorithm", "Low kVp", "Contrast media"],
    correctAnswer: 1,
    explanation: "HRCT uses very thin slices and a sharp reconstruction kernel (bone algorithm) to visualize lung parenchyma structures like interstitium."
  },

  // --- TOPIC 5 & 6: MRI & ULTRASOUND BASICS ---
  {
    id: 83,
    question: "In MRI, T1-weighted images show fluid (like CSF) as:",
    options: ["Bright (White)", "Dark (Black)", "Grey", "Variable"],
    correctAnswer: 1,
    explanation: "On T1, fluid is dark. On T2, fluid is bright (Remember: 'H2O is bright on T2')."
  },
  {
    id: 84,
    question: "The absolute contraindication for MRI is:",
    options: ["Pregnancy (1st trimester)", "Titanium hip replacement", "Cardiac Pacemaker (Non-MRI conditional)", "Dental fillings"],
    correctAnswer: 2,
    explanation: "Ferromagnetic implants or active electronic devices like traditional pacemakers can malfunction or move, causing fatal injury."
  },
  {
    id: 85,
    question: "In Ultrasound, the frequency of the transducer is inversely proportional to:",
    options: ["Image resolution", "Penetration depth", "Cost", "Gel temperature"],
    correctAnswer: 1,
    explanation: "High frequency = High resolution but Low penetration (for superficial parts). Low frequency = Deep penetration but Lower resolution (for abdomen)."
  },
  {
    id: 86,
    question: "The Piezoelectric effect in Ultrasound refers to:",
    options: ["Conversion of electrical energy into sound waves (and vice versa)", "Heating of tissue", "Doppler shift", "Creation of X-rays"],
    correctAnswer: 0,
    explanation: "Piezoelectric crystals vibrate when electricity is applied (producing sound) and produce electricity when sound hits them (receiving echoes)."
  },

  // --- TOPIC 8: CONTRAST MEDIA (High Yield) ---
  {
    id: 87,
    question: "Which contrast agent is preferred for a patient with suspected bowel perforation?",
    options: ["Barium Sulfate", "Water-soluble iodinated contrast (Gastrografin)", "Air", "Gadolinium"],
    correctAnswer: 1,
    explanation: "Barium can cause severe peritonitis if it leaks into the peritoneum. Water-soluble contrast is absorbed by the body and is safer if leakage occurs."
  },
  {
    id: 88,
    question: "The most serious side effect of iodinated contrast media is:",
    options: ["Nausea", "Metallic taste", "Anaphylactic shock", "Hot flush"],
    correctAnswer: 2,
    explanation: "Anaphylaxis is a severe, life-threatening allergic reaction requiring immediate epinephrine."
  },
  {
    id: 89,
    question: "Non-ionic contrast media are preferred over ionic media because they have:",
    options: ["Higher osmolality", "Lower osmolality and less toxicity", "Lower cost", "Better opacity"],
    correctAnswer: 1,
    explanation: "Low Osmolar Contrast Media (LOCM) are closer to blood osmolality, reducing the risk of adverse reactions and kidney damage."
  },

  // --- TOPIC 7: RADIATION SAFETY (Laws & Limits) ---
  {
    id: 90,
    question: "A 'Radiation Safety Officer' (RSO) is responsible for:",
    options: ["Repairing the machine", "Ensuring radiation safety norms and regulations are followed", "Developing films", "Billing patients"],
    correctAnswer: 1,
    explanation: "The RSO is the designated individual responsible for implementing the radiation protection program."
  },
  {
    id: 91,
    question: "The AERB (Atomic Energy Regulatory Board) requires X-ray equipment to be registered using:",
    options: ["e-LORA", "BIS portal", "NMC website", "Local police station"],
    correctAnswer: 0,
    explanation: "e-LORA (e-Licensing of Radiation Applications) is the online portal in India for licensing and registration of radiology equipment."
  },
  {
    id: 92,
    question: "Lead gloves typically have a lead equivalent thickness of:",
    options: ["0.25 mm Pb", "0.5 mm Pb", "1.0 mm Pb", "0.1 mm Pb"],
    correctAnswer: 0,
    explanation: "Gloves usually safeguard hands which might be close to the beam; 0.25mm is standard for gloves (aprons are usually 0.25 or 0.5)."
  },
  {
    id: 93,
    question: "Which personnel monitoring device provides an immediate reading of exposure?",
    options: ["TLD Badge", "Film Badge", "Pocket Dosimeter", "OSL Badge"],
    correctAnswer: 2,
    explanation: "Pocket dosimeters (ionization chambers) give an immediate real-time reading, unlike TLD/OSL which must be processed later."
  },

  // --- TOPIC 9: ANATOMY & MISCELLANEOUS ---
  {
    id: 94,
    question: "The 'Sella Turcica' houses which gland?",
    options: ["Thyroid", "Pineal", "Pituitary", "Adrenal"],
    correctAnswer: 2,
    explanation: "The Sella Turcica is a saddle-shaped depression in the Sphenoid bone containing the Pituitary gland."
  },
  {
    id: 95,
    question: "The prominent bony landmark on the ilium used for positioning the abdomen is the:",
    options: ["Ischial tuberosity", "Iliac Crest", "Symphysis pubis", "Acetabulum"],
    correctAnswer: 1,
    explanation: "The Iliac Crest is at the level of L4-L5 and is the primary landmark for centering abdominal and lumbar spine X-rays."
  },
  {
    id: 96,
    question: "The 'Carina' is the anatomical point where:",
    options: ["The esophagus joins the stomach", "The trachea bifurcates into right and left main bronchi", "The aorta arches", "The heart sits"],
    correctAnswer: 1,
    explanation: "The Carina is at the level of T4-T5. ETT tubes should be positioned roughly 2-5cm above the carina."
  },
  {
    id: 97,
    question: "In HSG (Hysterosalpingography), the contrast is injected into the:",
    options: ["Ovaries", "Uterus and Fallopian tubes", "Bladder", "Peritoneum"],
    correctAnswer: 1,
    explanation: "HSG is used to evaluate the patency of fallopian tubes and the shape of the uterine cavity, often for infertility workups."
  },
  {
    id: 98,
    question: "IVP (Intravenous Pyelogram) primarily visualizes the:",
    options: ["Liver and Gallbladder", "Kidneys, Ureters, and Bladder", "Stomach and Intestines", "Spinal cord"],
    correctAnswer: 1,
    explanation: "IVP (or IVU) uses iodinated contrast to assess the urinary tract system functionally and structurally."
  },
  {
    id: 99,
    question: "The standard rotation of the anode in a diagnostic X-ray tube is approximately:",
    options: ["500 rpm", "3,400 rpm", "20,000 rpm", "50 rpm"],
    correctAnswer: 1,
    explanation: "Standard rotation is 3,000-3,600 rpm. High-speed rotation (for high loads) can go up to 10,000 rpm."
  },
  {
    id: 100,
    question: "What is the unit of 'Frequency' for Ultrasound?",
    options: ["Hertz (Hz)", "Decibel (dB)", "Watt", "Tesla"],
    correctAnswer: 0,
    explanation: "Frequency is cycles per second, measured in Hertz. Diagnostic US uses MegaHertz (MHz)."
  }
    ]
  },
  {
    id: "digital_imaging",
    name: "Image Receptors & Digital Imaging",
    weightage: "HIGH",
    expectedQuestions: "10-15 questions",
    priority: 3,
    mustStudy: [
      "CR, DR, TFT, CCD, selenium vs cesium iodide",
      "DQE, MTF, SNR, CNR",
      "Bit depth, pixel, matrix, spatial resolution",
      "Artifacts in Digital Radiography",
      "Histogram, LUT, preprocessing errors",
      "Exposure index (EI, DI, S-value)"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  },
  {
    id: "radiographic_positioning",
    name: "Radiographic Techniques & Positioning",
    weightage: "HIGH",
    expectedQuestions: "12-15 questions",
    priority: 4,
    mustStudy: [
      "Chest PA, Lat, Oblique",
      "Abdomen, KUB views",
      "Skull: Towne's, Caldwell, Waters",
      "Spine: L-spine oblique, C-spine AP open mouth",
      "Joints: Knee, shoulder, hip",
      "Contrast studies: Barium swallow, meal, enema",
      "Special studies: HSG, IVP, RGU/MCU"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  },
  {
    id: "ct_physics",
    name: "CT Scan Physics & Parameters",
    weightage: "MEDIUM-HIGH",
    expectedQuestions: "8-12 questions",
    priority: 5,
    mustStudy: [
      "Slip rings, detector types",
      "CT numbers (HU)",
      "Window width / level",
      "Artifacts (beam hardening, streak, motion)",
      "Pitch, collimation, mA modulation",
      "Contrast phases (arterial, venous, delayed)"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  },
  {
    id: "mri_basics_safety",
    name: "MRI Basics & Safety",
    weightage: "MEDIUM",
    expectedQuestions: "8-10 questions",
    priority: 6,
    mustStudy: [
      "T1, T2 relaxation",
      "Spin echo, GRE",
      "MRI safety (SAR, projectiles)",
      "Contraindications: pacemakers, aneurysm clips",
      "Coils: surface, phased-array, volume",
      "Common artifacts"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  },
  {
    id: "contrast_media",
    name: "Contrast Media",
    weightage: "MEDIUM",
    expectedQuestions: "5-8 questions",
    priority: 7,
    mustStudy: [
      "Ionic vs non-ionic",
      "Osmolality",
      "Anaphylaxis management",
      "Barium vs iodine use",
      "Reactions (mild, moderate, severe)"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  },
  {
    id: "ultrasound_physics",
    name: "Ultrasound & Doppler Physics",
    weightage: "MEDIUM",
    expectedQuestions: "6-10 questions",
    priority: 8,
    mustStudy: [
      "Piezoelectric effect",
      "Acoustic impedance, attenuation",
      "Doppler shift",
      "Aliasing",
      "Modes: A, B, M, Doppler, Duplex",
      "Artifacts: reverberation, shadowing, enhancement"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  },
  {
    id: "radiological_anatomy",
    name: "Radiological Anatomy",
    weightage: "MEDIUM",
    expectedQuestions: "8-12 questions",
    priority: 9,
    mustStudy: [
      "Bones: skull, spine, joints",
      "Chest anatomy (hilum, fissures)",
      "Abdomen & pelvis",
      "Vascular anatomy (CT/MRI)",
      "Brain lobes, ventricles"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  },
  {
    id: "mammography",
    name: "Mammography",
    weightage: "LOW-MEDIUM",
    expectedQuestions: "4-6 questions",
    priority: 10,
    mustStudy: [
      "kVp (25–32)",
      "Target-filter: Mo-Mo, Mo-Rh, Rh-Rh",
      "Compression force",
      "AEC / grid use",
      "Breast composition (fat—radiolucent)"
    ],
    questions: [
      // Add 100 MCQs here
    ]
  }
]

// Helper function to get weightage color
export const getWeightageColor = (weightage: WeightageTopic["weightage"]): string => {
  switch (weightage) {
    case "VERY HIGH":
      return "text-red-500 bg-red-500/10 border-red-500/30"
    case "HIGH":
      return "text-orange-500 bg-orange-500/10 border-orange-500/30"
    case "MEDIUM-HIGH":
      return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30"
    case "MEDIUM":
      return "text-blue-500 bg-blue-500/10 border-blue-500/30"
    case "LOW-MEDIUM":
      return "text-green-500 bg-green-500/10 border-green-500/30"
    default:
      return "text-muted-foreground bg-muted/10"
  }
}

// Helper function to get priority badge color
export const getPriorityBadgeColor = (priority: number): string => {
  if (priority <= 2) return "bg-red-500 text-white"
  if (priority <= 4) return "bg-orange-500 text-white"
  if (priority <= 6) return "bg-yellow-500 text-black"
  if (priority <= 8) return "bg-blue-500 text-white"
  return "bg-green-500 text-white"
}
