// Add new types for house configuration
interface HouseConfig {
  floors: number;
  width: number;
  depth: number;
  height: number;
  position: [number, number, number];
}

export interface TreeNode {
  id: string
  label: string
  type: 'house' | 'floor' | 'pillar' | 'pipe' | 'gate' | 'wall' | 'window' | 'stairs'
  children?: TreeNode[]
  visible?: boolean
  position: [number, number, number]
  name: string
  description: string
  color?: string
  materials?: {
    quantity: number
    unit: string
    cost: number
  }[]
  // monitoring?: {
  //   temperature: number
  //   humidity: number
  //   rainfall: number
  //   electricity: number
  //   voltage: number
  //   water: number
  //   commonArea: number | undefined
  //   restrictedArea: number | undefined
  //   total: number | undefined
  // }
  maintenance?: {
    lastMaintenance: string
    nextMaintenance: string
    preventiveMaintenance?: string[]
    status: 'Good' | 'Needs Attention' | 'Critical'
    issues?: string[]
  }
  history?: {
    constructionDate: string
    renovations: {
      date: string
      description: string
      cost: number
    }[]
    incidents: {
      date: string
      description: string
      severity: 'Low' | 'Medium' | 'High'
    }[]
  }
  config?: HouseConfig; // Add configuration for houses
}


// Helper function to create floor nodes
// function createFloorNodes(houseIndex: number, floorIndex: number, position: [number, number, number]): TreeNode {
//   const floorName = ['Ground', 'First', 'Second', 'Third', 'Fourth', 'Fifth'][floorIndex];
//   const floorHeight = (floorIndex + 1) * 3;
  
//   const children: TreeNode[] = [
//     // Walls node
//     {
//       id: `house*${houseIndex}-${floorName.toLowerCase()}-walls`,
//       name: `Walls of ${floorName} Floor ${houseIndex}`,
//       description: `Walls of the ${floorName.toLowerCase()} floor of House ${houseIndex}`,
//       label: 'Walls',
//       type: 'wall',
//       position: [position[0], floorHeight, position[2]],
//       visible: true
//     },
//     // Pillars node
//     {
//       id: `house*${houseIndex}-${floorName.toLowerCase()}-pillars`,
//       name: `Pillars of ${floorName} Floor ${houseIndex}`,
//       description: `Pillars of the ${floorName.toLowerCase()} floor of House ${houseIndex}`,
//       label: 'Pillars',
//       type: 'pillar',
//       position: [position[0], floorHeight, position[2]],
//       visible: true
//     },
//     // Windows node
//     {
//       id: `house*${houseIndex}-${floorName.toLowerCase()}-windows`,
//       name: `Windows of ${floorName} Floor ${houseIndex}`,
//       description: `Windows of the ${floorName.toLowerCase()} floor of House ${houseIndex}`,
//       label: 'Windows',
//       type: 'window',
//       position: [position[0], floorHeight, position[2]],
//       visible: true
//     }
//   ];

//   // Add gates only to the ground floor
//   if (floorIndex === 0) {
//     children.push({
//       id: `house*${houseIndex}-${floorName.toLowerCase()}-gates`,
//       name: `Gates of ${floorName} Floor ${houseIndex}`,
//       description: `Main entrance gates of House ${houseIndex}`,
//       label: 'Gates',
//       type: 'gate',
//       position: [position[0], 1.5, position[2]], // Position gates at appropriate height
//       visible: true,
//       materials: [
//         { quantity: 2, unit: 'steel gates', cost: 1500 },
//         { quantity: 4, unit: 'hinges', cost: 200 },
//         { quantity: 2, unit: 'locks', cost: 300 }
//       ]
//     });
//   }
  
//   return {
//     id: `house*${houseIndex}-${floorName.toLowerCase()}`,
//     name: `${floorName} Floor of House ${houseIndex}`,
//     description: `${floorName} floor of House ${houseIndex}`,
//     label: `${floorName} Floor`,
//     type: 'floor',
//     position: [position[0], floorHeight, position[2]],
//     visible: true,
//     children
//   };
// }

// Helper function to create a house tree structure with random variations
// function createHouseTree(index: number, position: [number, number, number]): TreeNode {
//   const floors = 3 + Math.floor(Math.random() * 3); // 3-5 floors
//   const width = 10 + Math.floor(Math.random() * 4); // 10-13 width
//   const depth = 13 + Math.floor(Math.random() * 4); // 13-16 depth
//   const floorHeight = 3;

//   const config: HouseConfig = {
//     floors,
//     width,
//     depth,
//     height: floors * floorHeight,
//     position,
//   };

//   const houseColors = [
//     '#E6E6FA', // Lavender
//     '#F0FFF0', // Honeydew
//     '#F5F5DC', // Beige
//     '#FFF0F5', // LavenderBlush
//   ];

//   return {
//     id: `house*${index}`,
//     name: `House ${index}`,
//     description: `This is House ${index}`,
//     label: `House ${index}`,
//     type: 'house',
//     position,
//     visible: true,
//     color: houseColors[index % houseColors.length],
//     config,
//     materials: [
//       { quantity: 1000, unit: 'bricks', cost: 5000 },
//       { quantity: 500, unit: 'kg cement', cost: 2500 },
//       { quantity: 200, unit: 'kg steel', cost: 8000 },
//     ],
//     monitoring: {
//       temperature: 23 + Math.random() * 5,
//       humidity: 45 + Math.random() * 15,
//       occupancy: Math.floor(Math.random() * 50),
//     },
//     maintenance: {
//       lastMaintenance: '2024-01-15',
//       nextMaintenance: '2024-07-15',
//       status: 'Good',
//       issues: [],
//     },
//     history: {
//       constructionDate: '2020-01-01',
//       renovations: [
//         {
//           date: '2022-06-15',
//           description: 'Exterior painting',
//           cost: 15000,
//         },
//       ],
//       incidents: [
//         {
//           date: '2023-08-20',
//           description: 'Minor water leakage',
//           severity: 'Low',
//         },
//       ],
//     },
//     children: [
//       // Generate floor nodes
//       ...Array.from({ length: floors }, (_, i) => 
//         createFloorNodes(index, i, position)
//       ),
//       // Add stairs
//       {
//         id: `house*${index}-stairs`,
//         name: `Stairs of House ${index}`,
//         description: `Stairs of House ${index}`,
//         label: 'Stairs',
//         type: 'stairs',
//         position: [position[0] - 4, 4.5, position[2]],
//         visible: true
//       },
//       // Add pipes
//       {
//         id: `house*${index}-pipes`,
//         name: `Pipes of House ${index}`,
//         description: `Pipes of House ${index}`,
//         label: 'Pipes',
//         type: 'pipe',
//         position: [position[0] - 5.8, 6, position[2] - 7.3],
//         visible: true
//       }
//     ]
//   };
// }



const bom1 = [
  { item: "Office Desks", type: "Furniture", quantity: 10, unit: "Each", notes: "Wooden, with drawers", cost: 700 },
  { item: "Office Chairs", type: "Furniture", quantity: 10, unit: "Each", notes: "Ergonomic, Adjustable", cost: 300 },
  { item: "Filing Cabinets", type: "Furniture", quantity: 5, unit: "Each", notes: "Metal, Lockable", cost: 400 },
  { item: "Computers", type: "Technology", quantity: 12, unit: "Each", notes: "i5, 8GB RAM, 512GB SSD", cost: 900 },
  { item: "Printers", type: "Technology", quantity: 3, unit: "Each", notes: "Laser, Multi-functional", cost: 500 },
  { item: "Conference Table", type: "Furniture", quantity: 1, unit: "Each", notes: "12-seater, Wooden", cost: 1500 },
  { item: "Whiteboards", type: "Infrastructure", quantity: 2, unit: "Each", notes: "Magnetic, 4ft x 6ft", cost: 250 },
  { item: "Telephone System", type: "Technology", quantity: 7, unit: "Each", notes: "VoIP Enabled", cost: 200 },
  { item: "Water Dispensers", type: "Appliance", quantity: 3, unit: "Each", notes: "Hot & Cold", cost: 300 },
  { item: "Air Conditioning Units", type: "Infrastructure", quantity: 4, unit: "Each", notes: "Split AC, 1.5-ton", cost: 1200 },
  { item: "Office Sofa", type: "Furniture", quantity: 2, unit: "Each", notes: "Leather, 3-seater", cost: 1400 },
  { item: "Storage Shelves", type: "Furniture", quantity: 5, unit: "Each", notes: "Metal, Adjustable", cost: 350 },
  { item: "Power Backup UPS", type: "Infrastructure", quantity: 2, unit: "Each", notes: "5kVA, Online UPS", cost: 5000 },
  { item: "Stationery Supplies", type: "Stationery", quantity: 50, unit: "Various", notes: "Pens, Notebooks, Files", cost: 200 },
  { item: "Security Cameras", type: "Infrastructure", quantity: 6, unit: "Each", notes: "IP Camera, Night Vision", cost: 400 },
  { item: "Reception Desk", type: "Furniture", quantity: 1, unit: "Each", notes: "Wooden, L-shaped", cost: 1000 },
  { item: "Reception Chairs", type: "Furniture", quantity: 3, unit: "Each", notes: "Cushioned, Modern Design", cost: 250 },
  { item: "Visitor Seating", type: "Furniture", quantity: 10, unit: "Each", notes: "Comfortable, Upholstered", cost: 300 },
  { item: "Information Display Board", type: "Infrastructure", quantity: 1, unit: "Each", notes: "LED, Digital", cost: 2000 },
  { item: "Visitor Log System", type: "Technology", quantity: 1, unit: "Each", notes: "Digital Check-in", cost: 1500 },
  { item: "CCTV Surveillance Monitor", type: "Technology", quantity: 1, unit: "Each", notes: "32-inch, Live Feed", cost: 800 },
  { item: "Brochure Stand", type: "Furniture", quantity: 2, unit: "Each", notes: "Metal, Multi-tier", cost: 150 },
  { item: "Wall Clock", type: "Infrastructure", quantity: 1, unit: "Each", notes: "Analog, Decorative", cost: 50 },
  { item: "Air Freshener Dispenser", type: "Appliance", quantity: 1, unit: "Each", notes: "Automatic, Scented", cost: 100 },
  { item: "Emergency Exit Signage", type: "Safety", quantity: 1, unit: "Each", notes: "Illuminated", cost: 200 },
  { item: "First Aid Kit", type: "Safety", quantity: 1, unit: "Each", notes: "Basic Medical Supplies", cost: 50 }
]

const bom2 = [
  { item: "Lecture Podium", type: "Furniture", quantity: 5, unit: "Each", notes: "Adjustable height, microphone support", cost: 500 },
  { item: "Whiteboard", type: "Infrastructure", quantity: 10, unit: "Each", notes: "Magnetic, 6ft x 4ft", cost: 200 },
  { item: "Library Books", type: "Academic", quantity: 500, unit: "Various", notes: "Literature, History, Sociology", cost: 10000 },
  { item: "Projector", type: "Technology", quantity: 10, unit: "Each", notes: "4K HD, Ceiling Mount", cost: 700 },
  { item: "Conference Table", type: "Furniture", quantity: 3, unit: "Each", notes: "10-seater, Wooden", cost: 1200 },
  { item: "Student Chairs", type: "Furniture", quantity: 200, unit: "Each", notes: "Cushioned, Stackable", cost: 50 },
  { item: "Lecture Hall Speaker System", type: "Technology", quantity: 5, unit: "Each", notes: "Wireless, Surround Sound", cost: 1500 },
  { item: "Desktop Computers", type: "Technology", quantity: 30, unit: "Each", notes: "i5, 8GB RAM, 256GB SSD", cost: 800 },
  { item: "Faculty Desks", type: "Furniture", quantity: 20, unit: "Each", notes: "Wooden, Drawer Storage", cost: 500 },
  { item: "CCTV Security Cameras", type: "Infrastructure", quantity: 10, unit: "Each", notes: "IP Camera, Night Vision", cost: 300 },
  { item: "Language Lab Software", type: "Software", quantity: 1, unit: "System", notes: "Interactive learning", cost: 2000 },
  { item: "Portable PA System", type: "Technology", quantity: 3, unit: "Each", notes: "Wireless microphone", cost: 600 },
  { item: "Library Database Software", type: "Software", quantity: 1, unit: "System", notes: "Cloud-based cataloging", cost: 5000 },
  { item: "Document Scanner", type: "Technology", quantity: 5, unit: "Each", notes: "Flatbed, High-speed", cost: 300 },
  { item: "AC Units", type: "Infrastructure", quantity: 10, unit: "Each", notes: "Split AC, 2-ton", cost: 1500 },
  { item: "Fire Extinguishers", type: "Safety", quantity: 20, unit: "Each", notes: "ABC Type", cost: 50 },
  { item: "Printers", type: "Technology", quantity: 5, unit: "Each", notes: "Laser, Duplex", cost: 400 },
  { item: "Library Tables", type: "Furniture", quantity: 10, unit: "Each", notes: "6-seater", cost: 700 },
  { item: "Canteen Tables", type: "Furniture", quantity: 5, unit: "Each", notes: "8-seater", cost: 900 },
  { item: "Breakroom Microwave", type: "Appliance", quantity: 2, unit: "Each", notes: "Digital, 30L", cost: 150 },
  { item: "Lecture Hall Lights", type: "Infrastructure", quantity: 50, unit: "Each", notes: "LED, Dimmable", cost: 100 },
  { item: "Classroom Air Purifier", type: "Appliance", quantity: 10, unit: "Each", notes: "HEPA Filter", cost: 400 },
  { item: "Faculty Lounge Sofa", type: "Furniture", quantity: 5, unit: "Each", notes: "Leather, 3-seater", cost: 1200 },
  { item: "Smart Boards", type: "Technology", quantity: 10, unit: "Each", notes: "Interactive Touch", cost: 3000 },
  { item: "Water Coolers", type: "Appliance", quantity: 5, unit: "Each", notes: "Hot & Cold", cost: 500 },
  { item: "Electric Kettle", type: "Appliance", quantity: 10, unit: "Each", notes: "1.5L, Stainless Steel", cost: 50 },
  { item: "Waste Bins", type: "Infrastructure", quantity: 50, unit: "Each", notes: "Recycling & Regular", cost: 30 },
  { item: "Storage Cabinets", type: "Furniture", quantity: 20, unit: "Each", notes: "Metal, Lockable", cost: 400 },
  { item: "Classroom Clocks", type: "Infrastructure", quantity: 20, unit: "Each", notes: "Wall-mounted, Digital", cost: 80 },
  { item: "Power Backup Generator", type: "Infrastructure", quantity: 2, unit: "Each", notes: "50kVA, Diesel", cost: 7000 },
  { item: "Study Lamps", type: "Furniture", quantity: 30, unit: "Each", notes: "LED, Adjustable", cost: 60 },
  { item: "Emergency Exit Signage", type: "Safety", quantity: 15, unit: "Each", notes: "Illuminated", cost: 200 },
  { item: "Faculty Laptops", type: "Technology", quantity: 15, unit: "Each", notes: "i7, 16GB RAM, 512GB SSD", cost: 1200 },
  { item: "Curtains for Lecture Halls", type: "Furniture", quantity: 20, unit: "Each", notes: "Blackout, Fireproof", cost: 150 },
  { item: "Lab Stools", type: "Furniture", quantity: 40, unit: "Each", notes: "Adjustable Height", cost: 120 },
  { item: "Wireless Routers", type: "Technology", quantity: 10, unit: "Each", notes: "Dual-band, High-Speed", cost: 150 },
  { item: "Public Address System", type: "Technology", quantity: 2, unit: "Each", notes: "Multi-zone Control", cost: 2500 }
]


const bom3 = [
  { item: "Computer Lab Desks", type: "Furniture", quantity: 30, unit: "Each", notes: "Ergonomic, Cable Management", cost: 300 },
  { item: "LED Tube Lights", type: "Infrastructure", quantity: 50, unit: "Each", notes: "Energy Efficient", cost: 50 },
  { item: "Projector Screens", type: "Technology", quantity: 10, unit: "Each", notes: "Motorized, 120-inch", cost: 400 },
  { item: "Storage Lockers", type: "Furniture", quantity: 50, unit: "Each", notes: "Metal, Lockable", cost: 250 },
  { item: "Digital Notice Boards", type: "Technology", quantity: 5, unit: "Each", notes: "Wi-Fi Enabled", cost: 1500 },
  { item: "Fire Alarm System", type: "Safety", quantity: 10, unit: "Each", notes: "Smoke and Heat Sensors", cost: 800 },
  { item: "Physics Lab Equipment", type: "Academic", quantity: 100, unit: "Various", notes: "Experiment Kits", cost: 5000 },
  { item: "Chemistry Lab Glassware", type: "Academic", quantity: 200, unit: "Various", notes: "Beakers, Test Tubes", cost: 3000 },
  { item: "Mathematics Models", type: "Academic", quantity: 50, unit: "Each", notes: "Geometry, Algebra", cost: 2000 },
  { item: "Faculty Chairs", type: "Furniture", quantity: 20, unit: "Each", notes: "Cushioned, Adjustable", cost: 200 },
  { item: "Whiteboard Markers", type: "Stationery", quantity: 200, unit: "Pack", notes: "Assorted Colors", cost: 20 },
  { item: "Lab Safety Goggles", type: "Safety", quantity: 50, unit: "Each", notes: "Impact Resistant", cost: 30 },
  { item: "Hand Sanitizer Dispensers", type: "Health", quantity: 30, unit: "Each", notes: "Automatic", cost: 100 },
  { item: "Science Lab Stools", type: "Furniture", quantity: 40, unit: "Each", notes: "Adjustable, Non-slip", cost: 100 },
  { item: "Internet Modems", type: "Technology", quantity: 5, unit: "Each", notes: "High-Speed Fiber", cost: 200 },
  { item: "Physics Lab Tables", type: "Furniture", quantity: 15, unit: "Each", notes: "Scratch Resistant", cost: 500 },
  { item: "First Aid Kits", type: "Safety", quantity: 20, unit: "Each", notes: "Basic Medical Supplies", cost: 50 },
  { item: "Smart TVs", type: "Technology", quantity: 10, unit: "Each", notes: "4K UHD, Wall Mounted", cost: 1200 },
  { item: "Lecture Hall Microphones", type: "Technology", quantity: 10, unit: "Each", notes: "Wireless, Noise Cancelling", cost: 300 },
  { item: "Emergency Lights", type: "Safety", quantity: 20, unit: "Each", notes: "Battery Backup", cost: 100 },
  { item: "Refrigerators", type: "Appliance", quantity: 2, unit: "Each", notes: "Double Door, 250L", cost: 800 },
  { item: "Chemistry Lab Chemicals", type: "Academic", quantity: 100, unit: "Various", notes: "Safe Handling Required", cost: 7000 },
  { item: "Wall Clocks", type: "Infrastructure", quantity: 20, unit: "Each", notes: "Silent Movement", cost: 50 },
  { item: "Physics Experiment Sensors", type: "Academic", quantity: 30, unit: "Each", notes: "Digital Readings", cost: 500 },
  { item: "Student Tablets", type: "Technology", quantity: 50, unit: "Each", notes: "Wi-Fi Enabled, 10-inch", cost: 300 },
  { item: "Server Racks", type: "Technology", quantity: 2, unit: "Each", notes: "Secure, Ventilated", cost: 2000 },
  { item: "Digital Library Access", type: "Software", quantity: 1, unit: "System", notes: "Annual Subscription", cost: 5000 },
  { item: "Networking Cables", type: "Infrastructure", quantity: 100, unit: "Meter", notes: "Cat6, High-Speed", cost: 20 },
  { item: "Sports Equipment", type: "Recreational", quantity: 100, unit: "Various", notes: "Basketballs, Footballs", cost: 2000 }

  ];

const bom4 = [
  { item: "3D Printers", type: "Technology", quantity: 5, unit: "Each", notes: "For prototyping and projects", cost: 2500 },
  { item: "Virtual Reality Headsets", type: "Technology", quantity: 10, unit: "Each", notes: "For interactive learning", cost: 500 },
  { item: "Artificial Intelligence Workstations", type: "Technology", quantity: 5, unit: "Each", notes: "High-performance computing", cost: 4000 },
  { item: "Robotics Kits", type: "Academic", quantity: 20, unit: "Each", notes: "For engineering students", cost: 1500 },
  { item: "Data Science Servers", type: "Technology", quantity: 2, unit: "Each", notes: "For machine learning projects", cost: 8000 },
  { item: "Coding Lab Desks", type: "Furniture", quantity: 30, unit: "Each", notes: "Ergonomic, height-adjustable", cost: 300 },
  { item: "Cybersecurity Firewalls", type: "Technology", quantity: 5, unit: "Each", notes: "Network security", cost: 2500 },
  { item: "Biometric Attendance Systems", type: "Technology", quantity: 10, unit: "Each", notes: "Fingerprint and facial recognition", cost: 1200 },
  { item: "Drone Kits", type: "Academic", quantity: 10, unit: "Each", notes: "For aerial surveying projects", cost: 3000 },
  { item: "Electronics Lab Oscilloscopes", type: "Academic", quantity: 10, unit: "Each", notes: "High precision", cost: 2000 },
  { item: "Cloud Computing Subscriptions", type: "Software", quantity: 1, unit: "System", notes: "Annual subscription", cost: 5000 },
  { item: "Graphic Design Workstations", type: "Technology", quantity: 10, unit: "Each", notes: "High-end GPUs", cost: 3500 },
  { item: "High-Speed Internet Routers", type: "Infrastructure", quantity: 10, unit: "Each", notes: "Enterprise-grade", cost: 800 },
  { item: "Video Editing Software", type: "Software", quantity: 1, unit: "System", notes: "Professional suite", cost: 2000 },
  { item: "Cloud Storage Servers", type: "Technology", quantity: 3, unit: "Each", notes: "Large capacity", cost: 7000 },
  { item: "Multimedia Studio Equipment", type: "Technology", quantity: 5, unit: "Each", notes: "Audio and video recording", cost: 6000 },
  { item: "Smart Conference Room Systems", type: "Technology", quantity: 5, unit: "Each", notes: "Wireless presentation tools", cost: 3000 },
  { item: "E-Learning Content Subscriptions", type: "Software", quantity: 1, unit: "System", notes: "Annual access", cost: 4500 },
  { item: "Digital Whiteboards", type: "Technology", quantity: 10, unit: "Each", notes: "Interactive, touch-enabled", cost: 3500 },
  { item: "Innovation Lab Furniture", type: "Furniture", quantity: 15, unit: "Each", notes: "Collaborative workspaces", cost: 1000 },
  { item: "Mechanical Lab Tools", type: "Academic", quantity: 50, unit: "Various", notes: "Drills, wrenches, cutters", cost: 3000 },
  { item: "Cloud-Based Attendance System", type: "Software", quantity: 1, unit: "System", notes: "Automated record keeping", cost: 2500 },
  { item: "Language Translation Devices", type: "Technology", quantity: 10, unit: "Each", notes: "AI-powered", cost: 500 },
  { item: "Advanced Mathematics Software", type: "Software", quantity: 1, unit: "System", notes: "For research and computation", cost: 3500 },
  { item: "Biotechnology Lab Equipment", type: "Academic", quantity: 30, unit: "Each", notes: "Microscopes, centrifuges", cost: 5000 },
  { item: "Quantum Computing Simulator", type: "Software", quantity: 1, unit: "System", notes: "For theoretical research", cost: 7000 },
  { item: "AI-Based Chatbot System", type: "Technology", quantity: 5, unit: "Each", notes: "For campus inquiries", cost: 2000 },
  { item: "Augmented Reality Development Kits", type: "Technology", quantity: 10, unit: "Each", notes: "For AR projects", cost: 2500 },
  { item: "Research Paper Publishing Software", type: "Software", quantity: 1, unit: "System", notes: "Academic writing tool", cost: 4000 },
  { item: "Lab Coats and Safety Gear", type: "Safety", quantity: 50, unit: "Each", notes: "For lab safety", cost: 100 }
]

  

  const treeData: TreeNode[] = [
    {
      id: '1',
      name: 'Office',
      label: 'Office',
      type: 'house',
      position: [130, -10, -190],
      description: 'The college office is the centralized administrative hub that streamlines operations,supports faculty and student services, and facilitates effective campus communication.',
      visible: true,
      color: '#E6E6FA',
      materials: bom1,
      // monitoring: {
      //   temperature: 23 + Math.random() * 5,
      //   humidity: 45 + Math.random() * 15,
      //   rainfall: 0 + Math.random() * 10,
      //   electricity: 1000 + Math.random() * 100,
      //   voltage: 220 + Math.random() * 10,
      //   water: 1000 + Math.random() * 100,
      //   commonArea: Math.floor(Math.random() * 50),
      //   restrictedArea: Math.floor(Math.random() * 50),
      //   total: Math.floor(Math.random() * 50),
      // },
      maintenance: {
        lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-07-15',
    status: 'Good',
    issues: ['No issues'],
    preventiveMaintenance: [
      'Clean the filters',
      'Check the voltage',
      'Check the water level',
      'Check the humidity',
      'Check the temperature'
    ]

      },
      history: {
        constructionDate: '2013',
        renovations: [
          { date: '2016', description: "Renovated office spaces with modern workstations and ergonomic furniture.", cost: 50000 },
          { date: '2021', description: "Updated the reception area with advanced security and visitor management systems.", cost: 30000 },
          { date: '2023', description: "Enhanced lighting, energy-efficient upgrades, and overall modern aesthetics in administrative areas.", cost: 45000 }
        ],
        incidents: [
          { date: '2017', description: "Minor water leakage in the reception area resolved promptly.", severity: 'Low' }
        ]
      }
      
    },
    {
      id: '2',
      name: 'Block 1',
      label: 'Block 1',
      type: 'house',
      position: [500, 20, -800],
      description: 'A modern academic hub dedicated to the arts and humanities, featuring advanced lecture halls and specialized creative studios.',
      visible: true,
      color: '#F0FFF0',
      materials: bom2,
      // monitoring: {
      //   temperature: 23 + Math.random() * 5,
      //   humidity: 45 + Math.random() * 15,
      //   rainfall: 0 + Math.random() * 10,
      //   electricity: 1000 + Math.random() * 100,
      //   voltage: 220 + Math.random() * 10,
      //   water: 1000 + Math.random() * 100,
      //   commonArea: Math.floor(Math.random() * 50),
      //   restrictedArea: Math.floor(Math.random() * 50),
      //   total: Math.floor(Math.random() * 50),
      // },
      maintenance: {
        lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-08-01',
    status: 'Good',
    issues: ['Minor wear on lecture podiums', 'Slight fading of whiteboards'],
    preventiveMaintenance: [
      'Inspect smart boards',
      'Clean HVAC vents',
      'Check projector alignment',
      'Replace burnt-out bulbs'
    ]

      },
      history: {
        constructionDate: '2013',
    renovations: [
      { date: '2015', description: "Initial construction of Block A with foundational academic lecture halls.", cost: 75000 },
      { date: '2018', description: "Renovated classrooms and installed smart boards for enhanced learning.", cost: 40000 },
      { date: '2022', description: "Upgraded facilities to accommodate the new Arts department.", cost: 60000 },
      { date: '2023', description: "Enhanced acoustics, improved seating, and modernized interior finishes.", cost: 50000 }
    ],
    incidents: [
      { date: '2017', description: "Minor electrical malfunction reported and resolved after a safety audit.", severity: 'Low' }
    ]
      },
    },
    {
      id: '3',
      name: 'Block 2',
      label: 'Block 2',
      type: 'house',
      position: [100, 20, -800],
      description: 'A state-of-the-art engineering lab building equipped with cutting-edge facilities for ECE, EEE, and Civil disciplines.',
      visible: true,
      color: '#F5F5DC',
      materials: bom3,
      // monitoring: {
      //   temperature: 23 + Math.random() * 5,
      //   humidity: 45 + Math.random() * 15,
      //   rainfall: 0 + Math.random() * 10,
      //   electricity: 1000 + Math.random() * 100,
      //   voltage: 220 + Math.random() * 10,
      //   water: 1000 + Math.random() * 100,
      //   commonArea: Math.floor(Math.random() * 50),
      //   restrictedArea: Math.floor(Math.random() * 50),
      //   total: Math.floor(Math.random() * 50),
      // },
      maintenance: {
        lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-07-10',
    status: 'Needs Attention',
    issues: ['Overheating in lab areas', 'Minor leaks in ventilation systems'],
    preventiveMaintenance: [
      'Clean lab equipment',
      'Inspect ventilation systems',
      'Test safety alarms',
      'Calibrate instruments'
    ]

      },
      history: {
        constructionDate: '2021',
    renovations: [
      { date: '2022', description: "Initial setup and calibration of advanced engineering lab equipment.", cost: 70000 },
      { date: '2023', description: "Upgraded ventilation and safety systems for the labs.", cost: 35000 }
    ],
    incidents: [
      { date: '2022', description: "Minor flooding in a lab area due to heavy rains; swiftly remediated.", severity: 'Medium' }
    ]
      },
    },
    {
      id: '4',
      name: 'Block 3',
      label: 'Block 3',
      type: 'house',
      position: [-260, 20, -800],
      description: ' A dynamic technology center featuring advanced computing and cybersecurity resources for Computer Science, AI, and related fields.',
      visible: true,
      color: '#FFF0F5',
      materials: bom4,
      // monitoring: {
      //   temperature: 23 + Math.random() * 5,
      //   humidity: 45 + Math.random() * 15,
      //   rainfall: 0 + Math.random() * 10,
      //   electricity: 1000 + Math.random() * 100,
      //   voltage: 220 + Math.random() * 10,
      //   water: 1000 + Math.random() * 100,
      //   commonArea: Math.floor(Math.random() * 50),
      //   restrictedArea: Math.floor(Math.random() * 50),
      //   total: Math.floor(Math.random() * 50),
      // },
      maintenance: {
        lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-07-20',
    status: 'Good',
    issues: ['No issues'],
    preventiveMaintenance: [
      'Check network equipment',
      'Inspect server cooling systems',
      'Test cybersecurity protocols',
      'Clean dust from tech labs'
    ]

      },
      history: {
        constructionDate: '2021',
    renovations: [
      { date: '2022', description: "Installed high-performance computing systems and advanced tech tools.", cost: 80000 },
      { date: '2023', description: "Enhanced network infrastructure and cybersecurity measures in tech labs.", cost: 40000 }
    ],
    incidents: [
      { date: '2023', description: "Temporary system outage in tech labs resolved within hours.", severity: 'Low' }
    ]
      },
    }
  ]
// Create a grid of houses with proper spacing
export const houseTreeData: TreeNode[] = (() => {
  // const houses: TreeNode[] = [];
  // const gridSize = 3; // 3x3 grid of houses
  // const spacing = 30; // Increased spacing between houses
  
  // for (let row = 0; row < gridSize; row++) {
  //   for (let col = 0; col < gridSize; col++) {
  //     const index = row * gridSize + col + 1;
  //     const x = (col - 1) * spacing;
  //     const z = (row - 1) * spacing;
  //     houses.push(createHouseTree(index, [x, 0, z]));
  //   }
  // }
  
  return treeData;
})();