// Content compiled from: SpaceMinds Website Master Content, School Programs (2026), CoE Proposal, Master Memory File.

export const contact = {
  email: 'launch@spaceminds.in',
  phone: '+91 8122211194',
  phoneHref: 'tel:+919791950835',
  institutionsPhone: '+91 81222 11194',
  address: '106 Chamiers Road, Teynampet, Chennai 600018',
  web: 'www.spaceminds.in'
};

export const nav = [
  { to: '/why', label: 'Why SpaceMinds' },
  { to: '/programs', label: 'Programs' },
  { to: '/learning', label: 'Learning Experience' },
  { to: '/schools', label: 'For Schools' },
  { to: '/parents', label: 'For Parents' },
  { to: '/journey', label: 'Student Journey' },
  { to: '/about', label: 'About' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' }
];

export const nambi = {
  name: 'Shri Nambi Narayanan',
  honorific: 'Padma Bhushan',
  role: 'Brand Ambassador to SpaceMinds',
  guidance:
    'SpaceMinds is guided by Padma Bhushan Shri Nambi Narayanan, former ISRO scientist and one of the architects of India’s cryogenic engine programme, who serves as Brand Ambassador to SpaceMinds.',
  curriculum: 'The SpaceMinds curriculum is developed under his guidance.',
  curated: 'Curriculum curated by Mr. Nambi Narayanan, Padma Bhushan Scientist'
};

export const trust = ['ISRO Space Tutor', 'AASSC', 'Endorsed by Shri Nambi Narayanan', 'Curriculum curated by Padma Bhushan Shri Nambi Narayanan', 'Curriculum designed by Mr. Kiran Koushik'];

export const domains = ['Aeronautics', 'Aerospace', 'Rocketry', 'Drones', 'Satellites', 'Engineering'];

export const learningModel = [
  { k: 'Discover', d: 'Understand the science.' },
  { k: 'Experiment', d: 'See the concept in action.' },
  { k: 'Build', d: 'Create a working model or system.' },
  { k: 'Simulate', d: 'Use engineering and aerospace software.' },
  { k: 'Test', d: 'Measure, observe, troubleshoot and improve.' },
  { k: 'Showcase', d: 'Present what you built and what you learned.' }
];

export const problemCards = [
  { icon: 'book', t: 'Textbook-first learning', d: 'Science is often experienced primarily through theory and worksheets.' },
  { icon: 'telescope', t: 'Limited hands-on exposure', d: 'Many students rarely get opportunities to work with aerospace systems and engineering components.' },
  { icon: 'rocket', t: 'The talent pipeline starts early', d: "India's future aerospace capability depends on developing curiosity, engineering thinking and technical confidence from an early age." }
];
export const memorize = ['What is a rocket?', 'What is a satellite?', 'What is aerodynamics?'];
export const deeper = ['Can I build one?', 'Can I test it?', 'Can I make it fly?', 'Can I collect data from it?', 'Can I understand why it failed?'];

export const programs = [
  {
    slug: 'young-explorer',
    n: '01',
    icon: 'atom',
    name: 'Mission: Young Explorer',
    alt: 'Science with Super Monkey',
    ages: '5–7',
    ageMin: 5,
    ageMax: 7,
    format: 'Story-based hands-on science',
    tagline: 'Where stories become science.',
    summary:
      'A joyful introduction to science and aerospace through stories, imagination and hands-on experiments. Students discover how air, gravity, flight, rockets, magnets, sound, satellites and the Moon work — while building and experimenting along the way.',
    learn: [
      'Aircraft movement and 3-axis control', 'Density, pressure and temperature', "Newton's laws, gravity and orbits", "Bernoulli's principle and lift",
      'Rockets and propulsion concepts', 'Helicopters and aerial screws', 'Magnets and magnetic levitation', 'Friction and atmospheric re-entry', 'Air pressure',
      'Hovercrafts', 'Centre of gravity and balance', 'Contact and non-contact forces', 'Supersonic flight and sonic booms', 'Satellites and telemetry',
      'Aerodynamic shapes and drag', 'Sound and frequencies'
    ],
    handsOn: ['Paper aircraft and gliders', 'Balloon rocket experiments', 'Parachute activity', 'Magnet experiments', 'Air-pressure vehicle', 'Centre-of-gravity toy', 'Cup-phone experiment', 'Earth–Moon tidal-lock experiment', 'Telemetry activity', 'Rainbow and sound experiments'],
    develop: ['Scientific curiosity', 'Observation', 'Experimentation', 'Creative thinking', 'Basic aerospace awareness', 'Problem solving'],
    takeaway: 'A strong first connection between stories, science and the world of aerospace.',
    build: 'Paper gliders, parachutes and balloon rockets',
    compare: { duration: '10 days', build: 'Paper & balloon models', simulation: '—', coding: '—', flight: 'Gliders, parachutes', cert: 'Included' }
  },
  {
    slug: 'flight-and-space',
    n: '02',
    icon: 'plane',
    name: 'Flight & Space: Mission 01',
    alt: 'Foundation: Aero & Space',
    ages: '8–11',
    ageMin: 8,
    ageMax: 11,
    format: 'Foundation-level aerospace',
    tagline: 'Understand how things fly — and why.',
    summary:
      'Students move from aerodynamics to aircraft control, helicopters, drones, rockets and satellites — understanding aircraft, drones, rockets and satellites as one connected aerospace system.',
    modules: [
      ['Aerodynamics', ['Airflow', 'Pressure differences', 'Fundamentals of aerodynamic forces', 'Introduction to aerodynamic simulation']],
      ['Aircraft & 3-axis control', ['Types of aircraft', 'Roll, pitch and yaw', 'Aircraft stability and control']],
      ['Helicopters & VTOL', ['Evolution of helicopters', 'Aerial screw concept', 'Rotor-based flight', 'Helicopter control']],
      ['Multirotor & drone aerodynamics', ['Quadcopter fundamentals', 'Drone components', 'Propeller-generated thrust', 'Multirotor flight']],
      ['UAVs', ['Fixed-wing UAVs', 'Gyrocopters', 'Sailplanes', 'Different UAV configurations']],
      ['Rocketry', ['Rocket history', 'Rocket aerodynamics', 'Thrust', 'Thrust-vector-control concepts', 'Rocket configuration']],
      ['Rocket design', ['Rocket design principles', 'Stability and control', 'Digital rocket design using OpenRocket']],
      ['Satellites', ['Evolution of satellites', 'Satellite systems', 'Spacecraft reference frames', '3-axis attitude control']],
      ['Space communication', ['Introduction to telemetry', 'Satellite communication concepts', 'LoRa-based communication demonstration']]
    ],
    handsOn: ['NASA FoilSim experiments', 'Balloon flight experiments', 'Boomerang / aircraft model', 'Paper helicopter', 'Drone simulation', 'Chuck-glider construction', 'Balloon rocket', 'OpenRocket simulation', 'Satellite communication activity'],
    develop: ['Aerodynamics', 'Flight mechanics', 'Aerospace vocabulary', 'Simulation skills', 'Systems thinking', 'Engineering curiosity'],
    takeaway: 'Students understand the complete aerospace ecosystem — aircraft → drones → rockets → satellites.',
    build: 'Chuck gliders, paper helicopters and a digital rocket',
    compare: { duration: '10 days', build: 'Gliders & models', simulation: 'FoilSim, OpenRocket', coding: '—', flight: 'Gliders, drone sim', cert: 'Included' }
  },
  {
    slug: 'drone-lab',
    n: '03',
    icon: 'drone',
    name: 'Drone Lab: Build & Fly',
    alt: 'Drone Technology',
    ages: '12+',
    ageMin: 12,
    ageMax: 18,
    format: 'Build • Integrate • Simulate • Fly',
    tagline: 'From components to flight.',
    summary: 'Go inside a drone and discover how every component works together to achieve controlled flight — through aerodynamics, electronics, assembly, integration, simulation and supervised flying.',
    modules: [
      ['History & flight control', ['History of flight', 'Introduction to 3-axis control', 'Roll, pitch and yaw']],
      ['Types of aircraft & drones', ['Fixed-wing aircraft', 'Rotary-wing aircraft', 'Multirotors', 'Hybrid VTOL systems']],
      ['Drone aerodynamics', ['How propellers generate thrust', 'Lift and stability', "Bernoulli's principle", 'Aerodynamic effects on drones']],
      ['Drone components', ['Frame', 'Motors', 'Propellers', 'ESCs', 'Battery', 'Flight controller', 'GPS', 'Sensors', 'Camera systems']],
      ['Drone assembly', ['How the mechanical and electrical components of a drone fit together']],
      ['Drone integration', ['Component integration', 'Electronics', 'Flight-control systems', 'Sensor integration']],
      ['Safety & regulations', ['Safe flying practices', 'Line-of-sight principles', 'No-fly zones', 'Responsible drone operation', 'Basic regulatory awareness']],
      ['Servicing & careers', ['Drone maintenance', 'Operator responsibilities', 'Emerging drone applications', 'Drone-related career pathways']],
      ['Drone simulation', ['Virtual flight — how control inputs affect aircraft movement']],
      ['Supervised flying', ['Controlled practical flying activities']]
    ],
    handsOn: ['3-axis paper aircraft', 'DIY drone component study', 'Drone assembly', 'Component integration', 'Drone simulation', 'Supervised drone flying'],
    develop: ['Mechanical skills', 'Electronics awareness', 'Flight-control understanding', 'Assembly skills', 'Systems integration', 'Piloting fundamentals'],
    takeaway: "Students don't just fly a drone — they understand what is inside it, why it flies and how its systems work together.",
    build: 'An assembled, integrated multirotor',
    compare: { duration: '10 days', build: 'Drone assembly', simulation: 'Flight simulator', coding: 'Flight-controller setup', flight: 'Supervised flying', cert: 'Included' }
  },
  {
    slug: 'rocket-lab',
    n: '04',
    icon: 'rocket',
    name: 'Rocket Lab: Design & Launch',
    alt: 'Rocket Technology',
    ages: '12+',
    ageMin: 12,
    ageMax: 18,
    format: 'Design • Simulate • Build • Test',
    tagline: 'Design. Simulate. Build. Launch.',
    summary: 'Discover the engineering behind rockets — from aerodynamic stability to propulsion and launch systems — through practical models, simulation and supervised demonstrations.',
    modules: [
      ['Flight & control', ['History of flight', '3-axis control', 'Aircraft control fundamentals']],
      ['Aircraft & rocket types', ['Aircraft classification', 'Rocket classification', 'Comparative aerospace systems']],
      ['Rocket aerodynamics', ['Airflow around rockets', 'Drag', 'Stability', 'Fin design', 'Basic aerodynamic principles']],
      ['Rocket anatomy', ['Identify major rocket components and their functions']],
      ['Digital rocket design', ['Rocket configuration in OpenRocket', 'Stability', 'Aerodynamic performance', 'Simulation-based design']],
      ['Propulsion & chemical analysis', ['Propulsion concepts', 'Combustion', 'Propellant behaviour', 'Chemical-equilibrium concepts using CEA']],
      ['Rocket structures', ['Rocket body structures', 'Materials', 'Structural considerations', 'Basic engineering design']],
      ['Propellant concepts', ['Classes of propellants, through controlled educational demonstrations']],
      ['Rocket assembly', ['Assemble an educational rocket model and see how systems come together']],
      ['Controlled launch activity', ['A supervised, controlled launch — observe rocket performance']]
    ],
    handsOn: ['Flight-control experiments', 'Straw-rocket activity', 'OpenRocket simulation', 'CEA simulation', 'Rocket design', 'Cardboard rocket construction', 'Controlled launch demonstration'],
    develop: ['Aerodynamics', 'Rocket design', 'Simulation', 'Structural thinking', 'Propulsion fundamentals', 'Experimental observation'],
    takeaway: 'Students experience the engineering cycle: Concept → Design → Simulation → Build → Test.',
    build: 'A cardboard rocket, designed in OpenRocket first',
    compare: { duration: '10 days', build: 'Cardboard rocket', simulation: 'OpenRocket, CEA', coding: '—', flight: 'Controlled launch', cert: 'Included' }
  },
  {
    slug: 'mission-orbit',
    n: '05',
    icon: 'satellite',
    name: 'Mission Orbit: Build a Satellite',
    alt: 'Satellite Technology',
    ages: '12+',
    ageMin: 12,
    ageMax: 18,
    format: 'Build a CubeSat-inspired system',
    tagline: 'Build a satellite. Understand the mission.',
    summary: 'Discover how satellites sense, process and transmit information — through satellite systems, orbital concepts, attitude control, electronics, sensors, programming and telemetry in a hands-on CubeSat-inspired project.',
    modules: [
      ['Satellite fundamentals', ['What satellites are', 'Why satellites are used', 'Satellite applications', '3-axis reference systems']],
      ['Types of spacecraft', ['Communication', 'Navigation', 'Earth-observation', 'Scientific', 'Weather satellites']],
      ['Satellite dynamics', ['Orbital motion', 'Gravity', 'Spacecraft orientation', 'Attitude control', 'Stabilisation concepts']],
      ['CubeSat architecture', ['Structure', 'On-board computer', 'Power system', 'Battery', 'Sensors', 'Communication system', 'Antenna', 'Solar-power concepts']],
      ['Arduino & sensors', ['Arduino-based satellite prototyping']],
      ['Building the CubeSat system', ['Microcontroller', 'Sensors', 'Power', 'Communication components']],
      ['Sensor data', ['Measure environmental data', 'Process sensor readings', 'Record information']],
      ['Telemetry', ['How data is transmitted using LoRa-based communication']],
      ['Integration & testing', ['Test the complete prototype: data collection and transmission']],
      ['CubeSat demonstration', ['A controlled demonstration of the satellite prototype']]
    ],
    handsOn: ['CubeSat architecture study', 'Arduino integration', 'Sensor experiments', 'Basic programming', 'LoRa telemetry', 'Data collection', 'System integration', 'Controlled satellite-prototype demonstration'],
    develop: ['Electronics', 'Programming', 'Sensors', 'Data handling', 'Communication systems', 'Systems engineering'],
    takeaway: 'Students experience how a space system works through the chain: Sense → Process → Record → Communicate.',
    build: 'A CubeSat prototype that collects and transmits data',
    compare: { duration: '10 days', build: 'CubeSat prototype', simulation: '—', coding: 'Arduino', flight: 'Telemetry demo', cert: 'Included' }
  },
  {
    slug: 'engineers-lab',
    n: '06',
    icon: 'cog',
    name: "Engineer's Lab: Reverse the World",
    alt: 'Foundation: Engineering',
    ages: '12+',
    ageMin: 12,
    ageMax: 18,
    format: 'Forward & reverse engineering',
    tagline: "Don't just use technology. Understand how it works.",
    summary: 'Take products apart. Understand how they work. Think like an engineer. Students investigate how products are designed, identify their underlying principles and think about how they could be improved or redesigned.',
    modules: [
      ['What is engineering?', ['What engineers do', 'Identifying problems', 'Defining problem statements', 'Finding possible solutions']],
      ['Forward engineering', ['Problem → Requirements → Design → Prototype → Test → Product']],
      ['Reverse engineering', ['Product → Components → Function → Principle → Design understanding']],
      ['Reverse engineering methods', ['Product observation', 'Component identification', 'Functional analysis', 'System breakdown', 'Documentation']]
    ],
    challenge: ['Observe the product', 'Identify major components', 'Understand the function of each component', 'Determine how components interact', 'Identify the engineering principle involved', 'Document their findings', 'Present their conclusions'],
    questions: ['Why was it designed this way?', 'What problem does this component solve?', 'How do the parts interact?', 'What could be improved?', 'How would I redesign it?'],
    handsOn: ['Reverse-engineering activities', 'Worksheets', 'Product reports', 'Presentations'],
    develop: ['Problem solving', 'Product analysis', 'Engineering thinking', 'Documentation', 'Technical communication', 'Creativity', 'Systems thinking'],
    takeaway: "Students don't just learn how to use technology. They learn to look inside technology and think like the engineer who created it.",
    build: 'A documented teardown and redesign',
    compare: { duration: '10 days', build: 'Teardown & redesign', simulation: '—', coding: '—', flight: '—', cert: 'Included' }
  },
  {
    slug: 'aerospace-lab',
    n: '07',
    icon: 'orbit',
    name: 'Aerospace Lab: Beyond Flight',
    alt: 'Advanced Aerospace',
    ages: '14–18',
    ageMin: 14,
    ageMax: 18,
    format: 'Advanced aerospace',
    tagline: 'Go beyond the fundamentals.',
    summary: 'The advanced SpaceMinds pathway for students who want to move beyond introductory flight concepts and explore deeper aerospace systems, simulation, design and engineering thinking.',
    focus: ['Advanced aerodynamics', 'Aerospace system design', 'Aerospace simulation', 'Propulsion concepts', 'Rocket and spacecraft systems', 'Mission planning', 'Engineering analysis', 'Data analysis', 'Research-oriented problem solving', 'Aerospace innovation', 'Future aerospace careers'],
    develop: ['Advanced engineering thinking', 'Aerospace analysis', 'Simulation', 'System design', 'Research skills', 'Technical communication'],
    takeaway: 'Students move from learning about aerospace toward thinking like an aerospace engineer.',
    note: 'A detailed 10-day syllabus for this pathway will be published with the next curriculum release.',
    build: 'Advanced design and simulation projects',
    compare: { duration: '10 days', build: 'Design projects', simulation: 'Advanced simulation', coding: 'Data analysis', flight: '—', cert: 'Included' }
  }
];

export const ageBands = [
  { label: '5–7', name: 'Explore', age: 6 },
  { label: '8–11', name: 'Discover flight', age: 9 },
  { label: '11–14', name: 'Build & experiment', age: 13 },
  { label: '14–18', name: 'Engineer & innovate', age: 16 }
];
export const programsForAge = age => programs.filter(p => age >= p.ageMin && age <= p.ageMax);

export const missions = [
  ['takeoff', 'Build aircraft models'], ['wind', 'Experiment with air and pressure'], ['drone', 'Assemble drones'], ['rocket', 'Design rockets'],
  ['satellite', 'Build CubeSat prototypes'], ['monitor', 'Run aerospace simulations'], ['dish', 'Explore telemetry'], ['wrench', 'Reverse-engineer products'],
  ['chart', 'Collect and analyse data'], ['flask', 'Conduct experiments'], ['present', 'Present their work'], ['trophy', 'Showcase their mission']
];

export const builds = [
  { id: 'drone', icon: 'drone', label: 'Drone', learn: 'Drone aerodynamics, components and 3-axis control', make: 'Assemble and integrate a multirotor', test: 'Simulator practice, then supervised flying', mission: 'Fly a controlled flight and explain every system on board', program: 'drone-lab' },
  { id: 'rocket', icon: 'rocket', label: 'Rocket', learn: 'Rocket aerodynamics, anatomy, stability and propulsion', make: 'Design in OpenRocket, then build a cardboard rocket', test: 'Check stability in simulation before the build', mission: 'A supervised, controlled launch activity', program: 'rocket-lab' },
  { id: 'satellite', icon: 'satellite', label: 'Satellite', learn: 'Satellite dynamics and CubeSat architecture', make: 'Integrate Arduino, sensors, power and radio', test: 'Collect sensor data and transmit it over LoRa', mission: 'Demonstrate the prototype: sense → process → record → communicate', program: 'mission-orbit' },
  { id: 'aircraft', icon: 'plane', label: 'Aircraft', learn: 'Airflow, lift, drag and roll–pitch–yaw', make: 'Chuck gliders, paper helicopters and aircraft models', test: 'FoilSim experiments and flight trials', mission: 'Tune a glider for a longer, more stable flight', program: 'flight-and-space' },
  { id: 'engineering', icon: 'cog', label: 'Engineering system', learn: 'Forward and reverse engineering methods', make: 'Take a real product apart, component by component', test: 'Identify each function and the principle behind it', mission: 'Document, present and propose a redesign', program: 'engineers-lab' }
];

export const tools = [
  { name: 'NASA FoilSim', d: 'Explore aerodynamic concepts through simulation.' },
  { name: 'OpenRocket', d: 'Explore rocket design and simulation.' },
  { name: 'CEA', d: 'Explore chemical-equilibrium analysis in the rocket curriculum.' },
  { name: 'Arduino', d: 'Build programmable satellite prototypes.' },
  { name: 'Sensors', d: 'Collect real-world measurements.' },
  { name: 'LoRa', d: 'Explore telemetry and long-range data transmission.' }
];

export const journey10 = [
  { days: 'Day 01', k: 'Discover', d: 'Orientation + aerospace introduction', detail: ['Meet the trainers and the kit', 'History of flight', 'What aerospace engineers do', 'Safety briefing'] },
  { days: 'Days 02–03', k: 'Understand', d: 'Aerodynamics + flight fundamentals', detail: ['Airflow and pressure', 'Lift, drag and 3-axis control', 'NASA FoilSim experiments', 'Paper aircraft and gliders'] },
  { days: 'Days 04–05', k: 'Build', d: 'Rocket / aircraft / engineering activities', detail: ['Rocket aerodynamics', 'OpenRocket design activity', 'Stability and fin design', 'Model construction'] },
  { days: 'Days 06–07', k: 'Engineer', d: 'Drone / satellite / system activities', detail: ['Drone components and assembly', 'CubeSat architecture', 'Arduino and sensors', 'System integration'] },
  { days: 'Days 08–09', k: 'Test', d: 'Simulation + integration + testing', detail: ['Flight and rocket simulation', 'Telemetry and data collection', 'Troubleshooting', 'Improving the build'] },
  { days: 'Day 10', k: 'Mission Day', d: 'Showcase + certification', detail: ['Final demonstrations', 'Student presentations', 'Certificate of Achievement', 'Parents and school invited'] }
];

export const takeHome = [
  { t: 'Knowledge', d: 'Concepts they can understand and explain.' },
  { t: 'Skills', d: 'Building, assembling, testing and problem-solving.' },
  { t: 'Study material', d: 'Course-specific learning material.' },
  { t: 'Recognition', d: 'Certificate of Achievement upon successful completion.' }
];

export const impact = [
  { to: 20, suffix: '+', label: 'Schools' },
  { to: 500, suffix: '+', label: 'Students' },
  { to: 7, suffix: '', label: 'Programmes' },
  { to: 10, suffix: '-day', label: 'Experience' }
];

export const parentTraits = ['Curiosity.', 'Confidence.', 'Problem-solving.', 'Building.', 'Failure.', 'Experimentation.', 'Persistence.'];

export const parentFaq = [
  ['Is this suitable for beginners?', 'Yes. Programmes are structured by age and learning level.'],
  ['Is it only theory?', 'No. The programmes are explicitly designed around hands-on and practical learning.'],
  ['What does my child receive?', 'Depending on the programme: study material, hands-on kits/activities and a certificate.'],
  ['Is there supervision?', 'Hands-on activities are conducted under instructor supervision, with safety protocols for activities such as rocket launches and drone work.'],
  ['What should students bring?', 'Comfortable clothing, water and snacks where applicable, stationery — and their curiosity.'],
  ['How many students are in a batch?', 'A maximum of 15 students per batch, so every student gets hands-on time.'],
  ['How long is a programme?', 'Each programme is a 10-day hands-on experience.']
];

export const schoolProvides = ['Classroom / hall', 'Student mobilisation', 'School coordination', 'Required infrastructure', 'Food/accommodation for travelling trainers where applicable'];
export const smProvides = ['Aerospace trainers', 'Course material', 'Hands-on kits', 'Software', 'Programme management', 'Certification', 'Post-programme reporting'];

export const schoolBenefits = [
  { t: 'Zero equipment investment', d: 'SpaceMinds brings programme materials and kits.' },
  { t: 'Revenue opportunity', d: 'A 15% school revenue share on gross enrolment fees.' },
  { t: 'Parent value', d: 'Structured programmes provide an engaging activity during vacation periods.' },
  { t: 'School differentiation', d: 'Offer aerospace and engineering experiences beyond conventional enrichment.' },
  { t: 'Student outcomes', d: 'Students build, experiment, test and present.' },
  { t: 'Reporting', d: 'A post-programme report documents enrolment, attendance, completion, certification, feedback, financial summary and next steps.' }
];

export const schoolProcess = [
  { k: 'Discover', d: 'Schedule a programme discussion or demo.' },
  { k: 'Plan', d: 'Select courses, dates, batches and infrastructure.' },
  { k: 'Partner', d: 'Complete the school agreement.' },
  { k: 'Prepare', d: 'Student enrolment, parent consent and logistics.' },
  { k: 'Deploy', d: 'SpaceMinds trainers and kits arrive.' },
  { k: 'Launch', d: 'The 10-day programme begins.' },
  { k: 'Showcase', d: 'Students present their work.' },
  { k: 'Certify', d: 'Certificates are awarded.' },
  { k: 'Report', d: 'The school receives a programme summary.' }
];

export const ecosystem = [
  { k: 'Discover', d: 'Early-age science experiences' },
  { k: 'Foundation', d: 'Aeronautics + aerospace fundamentals' },
  { k: 'Build', d: 'Drones + rockets + satellites' },
  { k: 'Engineer', d: 'Reverse engineering + systems thinking' },
  { k: 'Advanced', d: 'Higher-level aerospace simulation and engineering' },
  { k: 'Missions', d: 'Projects, competitions, showcases and advanced challenges' }
];

export const questionLadder = ['“What is that?”', '“How does it work?”', '“Can I build it?”', '“Why didn’t it work?”', '“What can I change?”', '“Let’s test it.”', '“It works!”', '“Now let’s make it better.”'];

export const curriculumDesign = [
  { k: 'Story', d: 'Make complex concepts relatable.' },
  { k: 'Science', d: 'Understand the underlying principle.' },
  { k: 'Hands-on', d: 'Turn concepts into physical experiences.' },
  { k: 'Simulation', d: 'Explore systems digitally.' },
  { k: 'Engineering', d: 'Build and modify.' },
  { k: 'Testing', d: 'Observe what happens.' },
  { k: 'Reflection', d: 'Understand why it happened.' },
  { k: 'Communication', d: 'Explain what you built and learned.' }
];

export const trainerTraits = ['Explain difficult concepts simply', 'Encourage questions', 'Manage hands-on activities', 'Maintain safety', 'Help students troubleshoot', 'Keep curiosity alive'];

export const safety = ['Trained instructor supervision', 'Age-appropriate activities', 'Controlled launch environments', 'Safety equipment', 'Emergency procedures', 'School coordination', 'Kit management', 'Clear activity protocols'];

export const gallery = [
  { t: 'Cardboard rocket', age: 'Ages 11–14', learned: 'Exploring stability, structure and aerodynamic design.', icon: 'rocket' },
  { t: 'Assembled quadcopter', age: 'Ages 12+', learned: 'How motors, ESCs and a flight controller work as one system.', icon: 'drone' },
  { t: 'CubeSat prototype', age: 'Ages 12+', learned: 'Sensing, recording and transmitting data over LoRa.', icon: 'satellite' },
  { t: 'Chuck glider', age: 'Ages 8–11', learned: 'Trimming for lift, balance and a longer glide.', icon: 'plane' },
  { t: 'Balloon rocket', age: 'Ages 5–7', learned: "Seeing Newton's third law in action.", icon: 'wind' },
  { t: 'Product teardown report', age: 'Ages 12+', learned: 'Components, functions and the principle behind each.', icon: 'wrench' },
  { t: 'Launch day', age: 'All ages', learned: 'Supervised, controlled launch activity.', icon: 'flame' },
  { t: 'Mission day', age: 'All ages', learned: 'Presenting what they built and what they learned.', icon: 'present' }
];

export const missionWall = [
  { q: 'Design a drone to inspect a damaged bridge.', p: 'drone-lab' },
  { q: 'Build a satellite that can measure temperature.', p: 'mission-orbit' },
  { q: 'Design a rocket that remains stable during flight.', p: 'rocket-lab' },
  { q: 'Reverse-engineer a machine to understand how it works.', p: 'engineers-lab' },
  { q: 'Build an aircraft inspired by nature.', p: 'flight-and-space' }
];

export const resources = {
  Students: ['Aerospace facts', 'Experiments', 'Worksheets', 'Projects', 'Recommended reading'],
  Parents: ['Choosing an aerospace programme', 'Aerospace careers', 'STEM learning guides'],
  Schools: ['Programme brochure', 'School proposal', 'Onboarding checklist', 'Programme information', 'FAQs'],
  'SpaceMinds stories': ['Student projects', 'School partnerships', 'Camp stories', 'Trainer stories']
};

export const faqByAudience = {
  Parents: [
    ['Who is eligible?', 'Programmes run from ages 5 to 18, with each course matched to an age band.'],
    ['How long is a programme?', '10 days of hands-on learning.'],
    ['What is included?', 'Study material, hands-on kits and activities, and a certificate — depending on the programme.'],
    ['How is safety handled?', 'Trained instructor supervision, age-appropriate activities, controlled launch environments and clear activity protocols.'],
    ['Is there a certificate?', 'Yes — a SpaceMinds Certificate of Achievement on successful completion.'],
    ['What should students bring?', 'Comfortable clothing, water and snacks where applicable, stationery and curiosity.'],
    ['Is it suitable for beginners?', 'Yes. No prior aerospace knowledge is needed.']
  ],
  Schools: [
    ['What infrastructure is required?', 'A classroom or hall, school coordination and the required basic infrastructure.'],
    ['What is the batch size?', 'A maximum of 15 students per batch.'],
    ['How long does a programme run?', '10 days.'],
    ['What does the school handle?', 'Classroom/hall, student mobilisation, coordination, infrastructure, and food/accommodation for travelling trainers where applicable.'],
    ['How are trainers arranged?', 'SpaceMinds deploys trained aerospace trainers with kits and software.'],
    ['Is there a revenue share?', 'Yes — 15% of gross enrolment fees.'],
    ['Is there an MOU?', 'Yes, a school agreement is completed during the Partner stage.'],
    ['Do we receive a report?', 'Yes — enrolment, attendance, completion, certification, feedback, financial summary and next steps.']
  ],
  Students: [
    ['Do I need prior aerospace knowledge?', 'No. Every course starts from the fundamentals for its age group.'],
    ['Can I build a drone?', 'Yes — in Drone Lab: Build & Fly (ages 12+).'],
    ['Will I launch a rocket?', 'Rocket Lab includes a supervised, controlled launch activity.'],
    ['Can I work with Arduino?', 'Yes — in Mission Orbit: Build a Satellite.'],
    ['What happens on the final day?', 'Mission Day: you showcase your work and receive your certificate.']
  ]
};

export const labs = [
  { name: 'Foundation Lab', price: '₹6,00,000', size: '600–800 sq ft', seats: 24, comp: 25, min: 150, items: ['Full wall graphics, mission timeline, scale rocket and satellite models', '6 student build stations', '1 3D printer, full hand and power tooling, 4 soldering stations', '6 CanSat build sets and 1 satellite ground station', 'Model rocketry launch and recovery system', 'Drone build and tuning bench with SpaceMinds drone test rig', '2 CAD workstations with licensed software'] },
  { name: 'Advanced Lab', price: '₹11,00,000', size: '1,000–1,200 sq ft', seats: 30, comp: 50, min: 250, items: ['Everything in the Foundation Lab', '4 additional build stations and expanded storage', '2nd 3D printer and expanded fabrication tooling', 'Static rocket test stand with thrust measurement and data logging', 'Full electronics bench — oscilloscopes, function generators', '2 additional CAD workstations'] },
  { name: 'Centre of Excellence Lab', price: '₹17,00,000', size: '1,500+ sq ft', seats: 40, comp: 75, min: 400, items: ['Everything in the Advanced Lab', 'Laser cutter and resin 3D printer', 'Expanded ground station with software-defined radio and antenna', 'Advanced drone test and simulation stations', 'Astronomical telescope and observation equipment', 'Full CoE branding, entrance feature and inauguration'] }
];

export const team = [
  { name: 'Kiran Koushik', role: 'Founder and curriculum designer' },
  { name: 'Niharika Patro', role: 'Co-founder' },
  { name: 'Sameer Bharath Ram', role: 'Mentor' }
];
