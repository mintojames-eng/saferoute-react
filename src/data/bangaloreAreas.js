// Comprehensive Master Dataset of 50+ Bangalore Areas Across All Greater Bangalore Zones

export const bangaloreAreasMaster = [
    // ── CENTRAL ZONE ──
    { id: 'blr_c1', name: 'MG Road / Brigade Road', zone: 'Central', coords: [12.9750, 77.6015], risk: 'Medium', type: 'High Pedestrian & Shopper Traffic', road: 'Good', traffic: 'High', accidents: 62 },
    { id: 'blr_c2', name: 'Commercial Street (Shivajinagar)', zone: 'Central', coords: [12.9868, 77.6041], risk: 'High', type: 'Traffic Gridlock & Congested Alleys', road: 'Moderate', traffic: 'High', accidents: 104 },
    { id: 'blr_c3', name: 'Majestic (Kempegowda Bus Station)', zone: 'Central', coords: [12.9768, 77.5714], risk: 'High', type: 'Mass Transit Hub Bottleneck', road: 'Poor', traffic: 'Very High', accidents: 158 },
    { id: 'blr_c4', name: 'Malleshwaram 8th Cross', zone: 'Central', coords: [13.0031, 77.5700], risk: 'Low', type: 'Clear Residential Corridor', road: 'Good', traffic: 'Moderate', accidents: 34 },
    { id: 'blr_c5', name: 'Basavanagudi (Gandhi Bazaar)', zone: 'Central', coords: [12.9421, 77.5706], risk: 'Medium', type: 'High Pedestrian Crossing Risks', road: 'Moderate', traffic: 'High', accidents: 52 },
    { id: 'blr_c6', name: 'Richmond Town / Langford', zone: 'Central', coords: [12.9644, 77.6006], risk: 'Medium', type: 'School Zone Peak Congestion', road: 'Good', traffic: 'Moderate', accidents: 41 },
    { id: 'blr_c7', name: 'Shanthi Nagar Double Road', zone: 'Central', coords: [12.9568, 77.5946], risk: 'Medium', type: 'Bus Depot Congestion', road: 'Moderate', traffic: 'High', accidents: 78 },
    { id: 'blr_c8', name: 'Ulsoor / Halasuru Lake', zone: 'Central', coords: [12.9818, 77.6186], risk: 'High', type: 'Narrow Junction Bottleneck', road: 'Moderate', traffic: 'High', accidents: 91 },
    { id: 'blr_c9', name: 'Frazer Town (Pulikeshi Nagar)', zone: 'Central', coords: [12.9980, 77.6150], risk: 'Medium', type: 'Food Street Density', road: 'Good', traffic: 'Moderate', accidents: 45 },

    // ── SOUTH ZONE ──
    { id: 'blr_s1', name: 'Silk Board Junction', zone: 'South', coords: [12.9172, 77.6227], risk: 'High', type: 'Multi-Vehicle Collision Hotspot', road: 'Poor', traffic: 'High', accidents: 182 },
    { id: 'blr_s2', name: 'Koramangala 100ft Road', zone: 'South', coords: [12.9352, 77.6245], risk: 'Medium', type: 'Nightlife & Tech Commuter Congestion', road: 'Moderate', traffic: 'High', accidents: 89 },
    { id: 'blr_s3', name: 'BTM Layout 2nd Stage', zone: 'South', coords: [12.9165, 77.6101], risk: 'Medium', type: 'Two-Wheeler Cut-in Hazard', road: 'Moderate', traffic: 'High', accidents: 88 },
    { id: 'blr_s4', name: 'Jayanagar 4th Block', zone: 'South', coords: [12.9299, 77.5824], risk: 'Low', type: 'Organized Grid Transit', road: 'Good', traffic: 'Moderate', accidents: 38 },
    { id: 'blr_s5', name: 'JP Nagar 3rd Phase', zone: 'South', coords: [12.9113, 77.5925], risk: 'Medium', type: 'Underpass Waterlogging Warning', road: 'Moderate', traffic: 'Moderate', accidents: 66 },
    { id: 'blr_s6', name: 'Banashankari Temple Circle', zone: 'South', coords: [12.9254, 77.5467], risk: 'Medium', type: 'Ring Road Merge Snarls', road: 'Moderate', traffic: 'High', accidents: 94 },
    { id: 'blr_s7', name: 'HSR Layout Sector 1', zone: 'South', coords: [12.9121, 77.6445], risk: 'Low', type: 'Wide Roads & Signal Compliance', road: 'Good', traffic: 'Moderate', accidents: 31 },
    { id: 'blr_s8', name: 'Electronic City Toll Gate', zone: 'South', coords: [12.8399, 77.6770], risk: 'Medium', type: 'Expressway Exit Merging Snarl', road: 'Good', traffic: 'High', accidents: 61 },
    { id: 'blr_s9', name: 'Bannerghatta Road (Gottigere)', zone: 'South', coords: [12.8980, 77.5990], risk: 'High', type: 'Metro Construction Bottleneck', road: 'Poor', traffic: 'High', accidents: 122 },
    { id: 'blr_s10', name: 'Bommanahalli Junction', zone: 'South', coords: [12.9009, 77.6253], risk: 'High', type: 'Heavy Truck Transit corridor', road: 'Poor', traffic: 'High', accidents: 114 },
    { id: 'blr_s11', name: 'Uttarahalli Main Road', zone: 'South', coords: [12.9060, 77.5350], risk: 'Medium', type: 'Narrow Curve Blindspots', road: 'Moderate', traffic: 'Moderate', accidents: 58 },
    { id: 'blr_s12', name: 'Subramanyapura / KS Layout', zone: 'South', coords: [12.8948, 77.5451], risk: 'Low', type: 'Clear Suburban Transit', road: 'Good', traffic: 'Low', accidents: 22 },
    { id: 'blr_s13', name: 'Kanakapura Road (Metro Station)', zone: 'South', coords: [12.8850, 77.5520], risk: 'Low', type: 'Four Lane Open Highway', road: 'Good', traffic: 'Moderate', accidents: 44 },

    // ── EAST ZONE & TECH CORRIDORS ──
    { id: 'blr_e1', name: 'Indiranagar 100ft Road', zone: 'East', coords: [12.9784, 77.6408], risk: 'Medium', type: 'Commercial Density & Narrow Crosses', road: 'Good', traffic: 'High', accidents: 74 },
    { id: 'blr_e2', name: 'Marathahalli Bridge', zone: 'East', coords: [12.9591, 77.7009], risk: 'High', type: 'Severe Ring Road Choke-point', road: 'Poor', traffic: 'Very High', accidents: 146 },
    { id: 'blr_e3', name: 'Whitefield (ITPL Main Road)', zone: 'East', coords: [12.9698, 77.7499], risk: 'High', type: 'Pothole Clusters & Heavy Snarls', road: 'Poor', traffic: 'High', accidents: 132 },
    { id: 'blr_e4', name: 'Bellandur ORR Flyover', zone: 'East', coords: [12.9304, 77.6784], risk: 'High', type: 'Tech Park Commuter Gridlock', road: 'Moderate', traffic: 'Very High', accidents: 154 },
    { id: 'blr_e5', name: 'KR Puram (Tin Factory)', zone: 'East', coords: [13.0011, 77.6834], risk: 'High', type: 'Railway Overbridge Bottleneck', road: 'Poor', traffic: 'Very High', accidents: 167 },
    { id: 'blr_e6', name: 'Mahadevapura Outer Ring Rd', zone: 'East', coords: [12.9880, 77.6900], risk: 'High', type: 'Heavy Logistics Truck Corridor', road: 'Moderate', traffic: 'High', accidents: 119 },
    { id: 'blr_e7', name: 'Brookefield / Kundalahalli', zone: 'East', coords: [12.9655, 77.7185], risk: 'Medium', type: 'Underpass Waterlogging Zone', road: 'Moderate', traffic: 'High', accidents: 83 },
    { id: 'blr_e8', name: 'Varthur Kodi Junction', zone: 'East', coords: [12.9406, 77.7460], risk: 'High', type: 'Narrow Lake Cause-way Hazards', road: 'Poor', traffic: 'High', accidents: 108 },
    { id: 'blr_e9', name: 'Sarjapur Road (Wipro Gate)', zone: 'East', coords: [12.9100, 77.6850], risk: 'Medium', type: 'School Bus & Tech Congestion', road: 'Moderate', traffic: 'High', accidents: 91 },
    { id: 'blr_e10', name: 'Domlur / EGL Tech Park', zone: 'East', coords: [12.9600, 77.6450], risk: 'Medium', type: 'Flyover Split Confusion', road: 'Good', traffic: 'High', accidents: 69 },
    { id: 'blr_e11', name: 'CV Raman Nagar (DRDO)', zone: 'East', coords: [12.9841, 77.6698], risk: 'Low', type: 'Wide Tree-lined Avenues', road: 'Good', traffic: 'Moderate', accidents: 27 },
    { id: 'blr_e12', name: 'Hoodi Junction', zone: 'East', coords: [12.9920, 77.7160], risk: 'Medium', type: 'Railway Crossing Snarl', road: 'Moderate', traffic: 'High', accidents: 72 },
    { id: 'blr_e13', name: 'Kadugodi / Hope Farm', zone: 'East', coords: [12.9980, 77.7600], risk: 'Medium', type: 'Heavy Mixed Vehicle Traffic', road: 'Moderate', traffic: 'Moderate', accidents: 64 },

    // ── NORTH ZONE ──
    { id: 'blr_n1', name: 'Hebbal Flyover (Airport Rd)', zone: 'North', coords: [13.0358, 77.5970], risk: 'High', type: 'High-speed Multi-tier Merging Zone', road: 'Poor', traffic: 'Very High', accidents: 154 },
    { id: 'blr_n2', name: 'Yelahanka Bypass Highway', zone: 'North', coords: [13.1006, 77.5963], risk: 'High', type: 'High Speed Collision Danger', road: 'Good', traffic: 'Moderate', accidents: 95 },
    { id: 'blr_n3', name: 'Manyata Tech Park (Thanisandra)', zone: 'North', coords: [13.0450, 77.6200], risk: 'High', type: 'Tech Park Shift Rush Snarl', road: 'Moderate', traffic: 'Very High', accidents: 128 },
    { id: 'blr_n4', name: 'RT Nagar Main Road', zone: 'North', coords: [13.0183, 77.5931], risk: 'Medium', type: 'Narrow Market Traffic', road: 'Moderate', traffic: 'High', accidents: 56 },
    { id: 'blr_n5', name: 'Sahakara Nagar', zone: 'North', coords: [13.0645, 77.5902], risk: 'Low', type: 'Well Maintained Residential Zone', road: 'Good', traffic: 'Low', accidents: 24 },
    { id: 'blr_n6', name: 'Vidyaranyapura Circle', zone: 'North', coords: [13.0766, 77.5577], risk: 'Low', type: 'Clear Suburban Transit', road: 'Good', traffic: 'Moderate', accidents: 29 },
    { id: 'blr_n7', name: 'Hennur Ring Road Junction', zone: 'North', coords: [13.0250, 77.6400], risk: 'Medium', type: 'Underpass Blind Curve', road: 'Good', traffic: 'High', accidents: 67 },
    { id: 'blr_n8', name: 'Kammanahalli / Kalyan Nagar', zone: 'North', coords: [13.0120, 77.6450], risk: 'Medium', type: 'Commercial Strip Density', road: 'Good', traffic: 'High', accidents: 58 },
    { id: 'blr_n9', name: 'Ramamurthy Nagar Bridge', zone: 'North', coords: [13.0163, 77.6785], risk: 'Medium', type: 'Signal Jam & Railway Boundary', road: 'Moderate', traffic: 'High', accidents: 73 },
    { id: 'blr_n10', name: 'Devanahalli (Airport Corridor)', zone: 'North', coords: [13.2450, 77.7120], risk: 'Medium', type: 'Expressway Overspeeding Zone', road: 'Good', traffic: 'Moderate', accidents: 82 },

    // ── WEST ZONE ──
    { id: 'blr_w1', name: 'Yeshwanthpur Circle / Market', zone: 'West', coords: [13.0279, 77.5409], risk: 'High', type: 'Heavy Truck & Freight Bottleneck', road: 'Poor', traffic: 'Very High', accidents: 161 },
    { id: 'blr_w2', name: 'Rajajinagar 1st Block', zone: 'West', coords: [13.0040, 77.5555], risk: 'Low', type: 'Broad Arterial Boulevards', road: 'Good', traffic: 'Moderate', accidents: 36 },
    { id: 'blr_w3', name: 'Peenya Industrial Area', zone: 'West', coords: [13.0285, 77.5196], risk: 'High', type: 'Heavy Industrial Machinery Traffic', road: 'Poor', traffic: 'High', accidents: 126 },
    { id: 'blr_w4', name: 'Mathikere / IISc Outer Ring', zone: 'West', coords: [13.0334, 77.5640], risk: 'Medium', type: 'Underpass Drainage Hazard', road: 'Moderate', traffic: 'High', accidents: 77 },
    { id: 'blr_w5', name: 'Vijayanagar Toll Gate', zone: 'West', coords: [12.9696, 77.5366], risk: 'High', type: 'Chord Road Confluence Bottleneck', road: 'Moderate', traffic: 'Very High', accidents: 139 },
    { id: 'blr_w6', name: 'Nagarbhavi Circle (Outer Ring)', zone: 'West', coords: [12.9678, 77.5100], risk: 'Low', type: 'Flyover Grade Separation', road: 'Good', traffic: 'Moderate', accidents: 42 },
    { id: 'blr_w7', name: 'Basaveshwaranagar 80ft Rd', zone: 'West', coords: [12.9961, 77.5385], risk: 'Medium', type: 'Hilly Incline & Curve Hazards', road: 'Good', traffic: 'Moderate', accidents: 48 },
    { id: 'blr_w8', name: 'Kengeri Satellite Town', zone: 'West', coords: [12.9177, 77.4838], risk: 'Low', type: 'Mysore Road Highway Transit', road: 'Good', traffic: 'Moderate', accidents: 39 },
    { id: 'blr_w9', name: 'Rajarajeshwari Nagar (RR Nagar Arch)', zone: 'West', coords: [12.9238, 77.5186], risk: 'Medium', type: 'Arch Junction Choke-point', road: 'Good', traffic: 'High', accidents: 65 },
    { id: 'blr_w10', name: 'Mahalakshmi Layout', zone: 'West', coords: [13.0150, 77.5480], risk: 'Medium', type: 'Metro Pillar Turning Blindspots', road: 'Moderate', traffic: 'Moderate', accidents: 54 }
]

