// Mock data for Authentication, User Profile, Safety Alerts, and Risk Dashboard

export const defaultUser = {
    id: 'user_101',
    name: 'Minto James',
    email: 'minto@saferoute.ai',
    phone: '+91 98765 43210',
    role: 'Verified Commuter',
    safetyScore: 94,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    vehicleType: 'Four Wheeler (SUV)',
    bloodGroup: 'O+ Positive',
    joinedDate: 'September 2026',
    reportsSubmitted: 8,
    hazardsVerified: 24,
    emergencyContacts: [
        { id: 1, name: 'Family Contact (Sarah)', relation: 'Spouse', phone: '+91 98450 11223' },
        { id: 2, name: 'Dr. Ramesh Kumar', relation: 'Family Physician', phone: '+91 98860 33445' }
    ],
    savedRoutes: [
        {
            id: 1,
            title: 'Daily Commute (Home → Tech Park)',
            start: 'Indiranagar 100ft Rd',
            destination: 'Whitefield ITPL',
            distance: '16.4 km',
            duration: '38 mins',
            safetyRating: 'A-',
            safetyScore: 88,
            currentRisk: 'Moderate'
        },
        {
            id: 2,
            title: 'Weekend Route (Home → Airport)',
            start: 'Koramangala 4th Block',
            destination: 'Kempegowda International Airport',
            distance: '42.1 km',
            duration: '52 mins',
            safetyRating: 'A+',
            safetyScore: 95,
            currentRisk: 'Low'
        },
        {
            id: 3,
            title: 'Frequent Transit (Silk Board → Electronic City)',
            start: 'Silk Board Junction',
            destination: 'Electronic City Toll',
            distance: '11.8 km',
            duration: '29 mins',
            safetyRating: 'B',
            safetyScore: 71,
            currentRisk: 'High'
        }
    ],
    preferences: {
        smsEmergencyAlerts: true,
        highRiskGeofenceWarnings: true,
        weatherHazardAudioVoice: true,
        nightModeAutoPrompt: true,
        communityVerificationPrompts: true
    }
}

export const initialSafetyAlerts = [
    {
        id: 'alt-101',
        title: 'Severe Waterlogging at Hebbal Underpass',
        severity: 'Critical', // Critical | Warning | Advisory
        category: 'Flood & Drainage',
        location: 'Hebbal Flyover / Airport Approach',
        coords: [13.0358, 77.5970],
        timestamp: '8 minutes ago',
        verifiedCount: 34,
        isVerifiedByUser: false,
        status: 'Active',
        description: 'Over 2.5 feet of stagnant rainwater has submerged the middle and left lanes. Small vehicles stalling. Divert via Outer Ring Road.'
    },
    {
        id: 'alt-102',
        title: 'Multi-Vehicle Collision Zone',
        severity: 'Critical',
        category: 'Accident Crash',
        location: 'Silk Board Outer Ring Road Ramp',
        coords: [12.9172, 77.6227],
        timestamp: '15 minutes ago',
        verifiedCount: 42,
        isVerifiedByUser: true,
        status: 'Active',
        description: '3-car pileup before the flyover ascent. Emergency traffic crane dispatched. Traffic backing up to HSR Layout 5th Sector.'
    },
    {
        id: 'alt-103',
        title: 'Open Trench & Pipeline Construction',
        severity: 'Warning',
        category: 'Road Work',
        location: 'Whitefield Main Road near Metro Station',
        coords: [12.9698, 77.7499],
        timestamp: '32 minutes ago',
        verifiedCount: 19,
        isVerifiedByUser: false,
        status: 'Active',
        description: 'Unmarked metal sheets covering excavated gas pipeline trench. High risk for two-wheelers during night hours.'
    },
    {
        id: 'alt-104',
        title: 'Traffic Signal Failure & Blind Intersection',
        severity: 'Warning',
        category: 'Infrastructure',
        location: 'Marathahalli Bridge Intersection',
        coords: [12.9591, 77.7009],
        timestamp: '1 hour ago',
        verifiedCount: 27,
        isVerifiedByUser: false,
        status: 'Active',
        description: 'Traffic signals completely offline. Manual traffic control active but gridlock causing severe blind turning hazards.'
    },
    {
        id: 'alt-105',
        title: 'Diesel Fuel Spill On Curve',
        severity: 'Warning',
        category: 'Slippery Road',
        location: 'Yeshwanthpur Circle Flyover Down-Ramp',
        coords: [13.0279, 77.5409],
        timestamp: '2 hours ago',
        verifiedCount: 15,
        isVerifiedByUser: false,
        status: 'Active',
        description: 'Commercial tanker leak created slippery conditions across 200 meters. Sand dusting underway by municipal authorities.'
    },
    {
        id: 'alt-106',
        title: 'Dense Fog & Low Visibility Advisory',
        severity: 'Advisory',
        category: 'Weather Condition',
        location: 'Yelahanka Bypass Highway',
        coords: [13.1006, 77.5963],
        timestamp: '3 hours ago',
        verifiedCount: 11,
        isVerifiedByUser: false,
        status: 'Active',
        description: 'Morning visibility dropped below 60 meters. Turn on fog lamps and maintain a 4-second following distance.'
    }
]

export const routeComparisonData = [
    {
        id: 'route_opt_1',
        name: 'Route Alpha: Elevated Expressway (Recommended)',
        tag: 'Fastest & Safest',
        distance: '18.2 km',
        estimatedTime: '32 mins',
        safetyScore: 92,
        grade: 'A+',
        riskLevel: 'Low',
        accidentProbability: '3.2%',
        blackspotsCount: 0,
        roadQuality: 'Grade A Pavement',
        highlights: ['Access controlled', 'Active CCTV CV monitoring', 'Clear lane markings']
    },
    {
        id: 'route_opt_2',
        name: 'Route Beta: Outer Ring Road (ORR Arterial)',
        tag: 'Moderate Congestion',
        distance: '21.5 km',
        estimatedTime: '48 mins',
        safetyScore: 68,
        grade: 'B-',
        riskLevel: 'Medium',
        accidentProbability: '14.8%',
        blackspotsCount: 2,
        roadQuality: 'Moderate (Intermittent Potholes)',
        highlights: ['Service lane bottlenecks', 'High pedestrian activity', 'Frequent truck merging']
    },
    {
        id: 'route_opt_3',
        name: 'Route Gamma: Old Madras & City Streets',
        tag: 'High Risk / Severe Snarls',
        distance: '16.9 km',
        estimatedTime: '64 mins',
        safetyScore: 42,
        grade: 'D',
        riskLevel: 'High',
        accidentProbability: '38.5%',
        blackspotsCount: 5,
        roadQuality: 'Poor (Uneven Surface & Flooding)',
        highlights: ['Multiple signal snarls', 'Narrow unlit sections', '5 active accident blackspots']
    }
]

