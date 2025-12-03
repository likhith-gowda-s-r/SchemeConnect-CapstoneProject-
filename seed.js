require('dotenv').config();
const mongoose = require('mongoose');
const Scheme = require('./models/Scheme');

const realSchemes = [
  {
    translations: {
      en: {
        title: 'Amrutha Grama – Comprehensive Village Development',
        description: 'District Panchayat-led holistic development of identified villages: water, sanitation, roads, health and education.',
        details: 'Upgrades core village infrastructure and services under RDPR, integrating works from multiple grants and flagship programmes with community participation and social audit.',
        documents: ['Aadhaar Card', 'Residence Certificate'],
        eligibility: 'Residents of identified Amrutha Grama villages across Karnataka.'
      },
      kn: {
        title: 'ಅಮೃತ ಗ್ರಾಮ – ಸಮಗ್ರ ಗ್ರಾಮ ಅಭಿವೃದ್ಧಿ',
        description: 'ಗ್ರಾಮಗಳಲ್ಲಿ ನೀರು, ಸ್ವಚ್ಛತೆ, ರಸ್ತೆ, ಆರೋಗ್ಯ ಹಾಗೂ ಶಿಕ್ಷಣ ಅಭಿವೃದ್ಧಿ.',
        details: 'ಆರ್‌ಡಿಪಿಆರ್‌ ಅಡಿ ಅನೇಕ ಅನುದಾನಗಳ ಸಂಯೋಜನೆಯಿಂದ ಮೂಲಸೌಕರ್ಯಗಳ ಸುಧಾರಣೆ; ಸಾರ್ವಜನಿಕ ಭಾಗವಹಿಸುವಿಕೆ ಹಾಗೂ ಸಾಮಾಜಿಕ ತಪಾಸಣೆ.',
        documents: ['ಆಧಾರ್ ಕಾರ್ಡ್', 'ನಿವಾಸ ಪ್ರಮಾಣಪತ್ರ'],
        eligibility: 'ರಾಜ್ಯದಲ್ಲಿ ಗುರುತಿಸಲಾದ ಅಮೃತ ಗ್ರಾ ಮಗಳ ನಿವಾಸಿಗಳು.'
      }
    },
    applyLink: 'https://rdpr.karnataka.gov.in/',
    level: 'District Panchayat',
    district: 'All Districts'
  },
  {
    translations: {
      en: {
        title: 'Gram Panchayat Drinking Water Improvement (DP Grants)',
        description: 'Handpump restoration, borewell augmentation, piped water schemes and O&M support executed by District Panchayats.',
        details: 'Funds from 15th Finance Commission, State Grants and Jal Jeevan Mission convergence to enhance rural water supply with District Labs for water quality testing.',
        documents: ['Residence Certificate'],
        eligibility: 'Rural habitations with inadequate or unsafe drinking water.'
      },
      kn: {
        title: 'ಗ್ರಾಮ ಪಂಚಾಯತ್ ಕುಡಿಯುವ ನೀರಿನ ಸುಧಾರಣೆ',
        description: 'ಹ್ಯಾಂಡ್‌ಪಂಪ್ ದುರಸ್ತಿ, ಬೋರ್‌ವೆಲ್ ವೃದ್ಧಿ, ಪೈಪ್ ನೀರಿನ ಯೋಜನೆಗಳ ನಿರ್ವಹಣೆ.',
        details: '15ನೇ ಹಣಕಾಸು ಆಯೋಗ, ರಾಜ್ಯ ಅನುದಾನ ಹಾಗೂ ಜಲ ಜೀವನ್ ಮಿಷನ್ ಸಂಯೋಜನೆ; ನೀರಿನ ಗುಣಮಟ್ಟಕ್ಕೆ ಜಿಲ್ಲಾ ಪ್ರಯೋಗಾಲಯ.',
        documents: ['ನಿವಾಸ ಪ್ರಮಾಣಪತ್ರ'],
        eligibility: 'ಅಪರ್ಯಾಪ್ತ ಅಥವಾ ಅಸುರಕ್ಷಿತ ಕುಡಿಯುವ ನೀರಿನ ಗ್ರಾಮಗಳು.'
      }
    },
    applyLink: 'https://rdpr.karnataka.gov.in/',
    level: 'District Panchayat',
    district: 'All Districts'
  },
  {
    translations: {
      en: {
        title: 'Rural Sanitation – IHHL and Community Toilets (SBM-G)',
        description: 'Construction and retrofitting of Individual Household Latrines and community toilets by DPs with SBM-G convergence.',
        details: 'District Panchayats plan and execute IHHLs, soak pits, and SLWM projects; IEC and behavior change included.',
        documents: ['Aadhaar Card', 'BPL/Priority household proof'],
        eligibility: 'Eligible rural households without safe sanitation facilities.'
      },
      kn: {
        title: 'ಗ್ರಾಮೀಣ ಸ್ವಚ್ಛತೆ – ವೈಯಕ್ತಿಕ ಶೌಚಾಲಯ/ಸಾಮುದಾಯಿಕ ಶೌಚಾಲಯ',
        description: 'ಜಿಲ್ಲಾ ಪಂಚಾಯತ್ ಮತ್ತು SBM-G ಸಂಯೋಜನೆಯಲ್ಲಿ ಶೌಚಾಲಯ ನಿರ್ಮಾಣ.',
        details: 'IHHL, ಸೋಕ್ ಪಿಟ್ಸ್, SLWM ಯೋಜನೆಗಳು; IEC ಮತ್ತು ವರ್ತನೆ ಬದಲಾವಣೆ.',
        documents: ['ಆಧಾರ್ ಕಾರ್ಡ್', 'ಬಿಪಿಎಲ್/ಪ್ರಾಥಮಿಕ ಮನೆತನ ಪ್ರಮಾಣ'],
        eligibility: 'ಸುರಕ್ಷಿತ ಸ್ವಚ್ಛತಾ ಸೌಲಭ್ಯವಿಲ್ಲದ ಗ್ರಾಮೀಣ ಮನೆತನಗಳು.'
      }
    },
    applyLink: 'https://sbm.gov.in/sbmreport/home.aspx',
    level: 'District Panchayat',
    district: 'All Districts'
  },
  {
    translations: {
      en: {
        title: 'Rural Road Strengthening (DP Works)',
        description: 'Village and inter-village roads, culverts and small bridges under District Panchayat works.',
        details: 'Prioritized via Gram Sabha and DP Work Plan; uses FC grants and state funds for all-weather connectivity.',
        documents: [],
        eligibility: 'Rural settlements requiring access to schools, health centres and markets.'
      },
      kn: {
        title: 'ಗ್ರಾಮೀಣ ರಸ್ತೆ ಬಲಪಡಣೆ',
        description: 'ಗ್ರಾಮ/ಅಂತರಗ್ರಾಮ ರಸ್ತೆ, ಕಲ್ವರ್ಟ್ ಹಾಗೂ ಸಣ್ಣ ಸೇತುವೆಗಳು.',
        details: 'ಗ್ರಾಮ ಸಭೆ ಆದ್ಯತಾ ಆಧಾರದಲ್ಲಿ; ಎಲ್ಲಾ ಕಾಲಮಾನ ಸಂಪರ್ಕಕ್ಕಾಗಿ ಅನುದಾನ.',
        documents: [],
        eligibility: 'ಶಾಲೆ, ಆಸ್ಪತ್ರೆ, ಮಾರುಕಟ್ಟೆಗೆ ಪ್ರವೇಶ ಬೇಕಾದ ಗ್ರಾಮಗಳು.'
      }
    },
    applyLink: 'https://rdpr.karnataka.gov.in/',
    level: 'District Panchayat',
    district: 'All Districts'
  },
  {
    translations: {
      en: {
        title: 'Primary Health Centre Upgradation (DP Health)',
        description: 'Facility repairs, equipment procurement and mother & child care amenities at PHCs and sub-centres.',
        details: 'District Panchayats augment infrastructure and service delivery in coordination with Health Department and NHM.',
        documents: [],
        eligibility: 'Rural population served by PHCs identified for upgrades.'
      },
      kn: {
        title: 'ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರ ಸುಧಾರಣೆ',
        description: 'ಸೌಲಭ್ಯ ದುರಸ್ತಿ, ಸಾಧನ ಖರೀದಿ, ತಾಯಿ/ಮಗು ಆರೈಕೆ.',
        details: 'ಆರೋಗ್ಯ ಇಲಾಖೆ/NHM ಸಂಯೋಜನೆಯಲ್ಲಿ ಜಿಲ್ಲಾ ಪಂಚಾಯತ್ ಕಾರ್ಯಗಳು.',
        documents: [],
        eligibility: 'ಅಪಗ್ರೇಡ್ ಗಾಗಿ ಗುರುತಿಸಲಾದ ಪಿಎಚ್‌ಸಿಗಳ ಸೇವಾ ಪ್ರದೇಶ.'
      }
    },
    applyLink: 'https://karunadu.karnataka.gov.in/hfw/',
    level: 'District Panchayat',
    district: 'All Districts'
  },
  {
    translations: {
      en: {
        title: 'School Infrastructure Improvement (DP Education)',
        description: 'Classroom repairs, toilets, drinking water and ramps for government primary and high schools.',
        details: 'Works executed by DPs with Education Department coordination; focus on safety, sanitation and inclusion.',
        documents: [],
        eligibility: 'Government schools identified in DP annual plans.'
      },
      kn: {
        title: 'ಶಾಲಾ ಮೂಲಸೌಕರ್ಯ ಸುಧಾರಣೆ',
        description: 'ತರಗತಿ ದುರಸ್ತಿ, ಶೌಚಾಲಯ, ಕುಡಿಯುವ ನೀರು, ರ್ಯಾಂಪ್.',
        details: 'ಶಿಕ್ಷಣ ಇಲಾಖೆಯ ಸಂಯೋಜನೆಯಲ್ಲಿ ಸುರಕ್ಷತೆ/ಸ್ವಚ್ಛತೆ/ಅಂತರ್ಪ್ರವೇಶ.',
        documents: [],
        eligibility: 'ಡಿಪಿ ವಾರ್ಷಿಕ ಯೋಜನೆಗಳಲ್ಲಿ ಗುರುತಿಸಲಾದ ಸರ್ಕಾರಿ ಶಾಲೆಗಳು.'
      }
    },
    applyLink: 'https://schooleducation.karnataka.gov.in/',
    level: 'District Panchayat',
    district: 'All Districts'
  },
  {
    translations: {
      en: {
        title: 'Solid & Liquid Waste Management (SLWM)',
        description: 'Community composting, greywater management and waste segregation facilities set up by DPs.',
        details: 'SLWM units, FSTPs and drain improvements under SBM-G Phase II with district technical support.',
        documents: [],
        eligibility: 'Gram Panchayats selected for SLWM rollouts.'
      },
      kn: {
        title: 'ಘನ/ದ್ರವ ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ',
        description: 'ಸಮುದಾಯ ಕಂಪೋಸ್ಟ್, ಗ್ರೇವಾಟರ್, ತ್ಯಾಜ್ಯ ಪ್ರತ್ಯೇಕಣೆ.',
        details: 'SBM-G ಹಂತ II ಅಡಿ SLWM ಘಟಕಗಳು, ಡ್ರೆನ್ ಸುಧಾರಣೆ.',
        documents: [],
        eligibility: 'SLWM ರೋಲೌಟ್‌ಗೆ ಆಯ್ಕೆಯಾದ ಗ್ರಾಮ ಪಂಚಾಯತ್‌ಗಳು.'
      }
    },
    applyLink: 'https://sbm.gov.in/sbmreport/home.aspx',
    level: 'District Panchayat',
    district: 'All Districts'
  },
  {
    translations: {
      en: {
        title: 'Watershed Development & Farm Ponds',
        description: 'Soil and water conservation, farm ponds and bund strengthening through DPs and Watershed Committees.',
        details: 'Convergence with Watershed Development Department and MGNREGA; improves groundwater and farm productivity.',
        documents: ['Land Ownership/RTC'],
        eligibility: 'Small and marginal farmers in identified micro-watersheds.'
      },
      kn: {
        title: 'ವಾಟರ್‌ಶೆಡ್ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಫಾರ್ಮ್ ಪಾಂಡ್‌ಗಳು',
        description: 'ಮಣ್ಣು/ಜಲ ಸಂರಕ್ಷಣೆ, ಫಾರ್ಮ್ ಪಾಂಡ್, ಬಂಡ್ ಬಲಪಡಣೆ.',
        details: 'ವಾಟರ್‌ಶೆಡ್ ಇಲಾಖೆ/MGNREGA ಸಂಯೋಜನೆ; ಭೂಗರ್ಭಜಲ/ಬೆಳೆ ಉತ್ಪಾದಕತೆ ಸುಧಾರಣೆ.',
        documents: ['RTC/ಭೂ ಮಾಲೀಕತ್ವ'],
        eligibility: 'ಗುರುತಿಸಲಾದ ಮೈಕ್ರೋ-ವಾಟರ್‌ಶೆಡ್ ರೈತರು.'
      }
    },
    applyLink: 'https://wdd.karnataka.gov.in/',
    level: 'District Panchayat',
    district: 'All Districts'
  },
  {
    translations: {
      en: {
        title: 'Pashu Bhagya Support (DP Convergence)',
        description: 'Cattle sheds, fodder development and minor veterinary infrastructure via District Panchayat works.',
        details: 'District-level convergence with Animal Husbandry schemes to improve livestock productivity.',
        documents: ['Farmer ID/Aadhaar'],
        eligibility: 'Livestock owners in rural areas per district norms.'
      },
      kn: {
        title: 'ಪಶು ಭಾಗ್ಯ ಬೆಂಬಲ',
        description: 'ಗೋಶಾಲೆ, ಮೇವು ಅಭಿವೃದ್ಧಿ, ಪಶುವೈದ್ಯಕ ಮೂಲಸೌಕರ್ಯ.',
        details: 'ಪಶುಸಂಗೋಪನಾ ಇಲಾಖೆಯ ಸಂಯೋಜನೆಯಲ್ಲಿ ಉತ್ಪಾದಕತೆ ಸುಧಾರಣೆ.',
        documents: ['ರೈತ ಐಡಿ/ಆಧಾರ್'],
        eligibility: 'ಜಿಲ್ಲಾ ಮಾನದಂಡದಂತೆ ಗ್ರಾಮೀಣ ಪಶು ಮಲಿಕರು.'
      }
    },
    applyLink: 'https://ahvs.karnataka.gov.in/',
    level: 'District Panchayat',
    district: 'All Districts'
  },
  {
    translations: {
      en: {
        title: 'Anganwadi Centre Repairs & Amenities (DP WCD)',
        description: 'Repair, water, toilets, kitchen garden and play materials for Anganwadis.',
        details: 'District Panchayats coordinate with Women & Child Development for ICDS facility improvements.',
        documents: [],
        eligibility: 'Anganwadi centres identified in district plans.'
      },
      kn: {
        title: 'ಆಂಗನವಾಡಿ ಕೇಂದ್ರ ದುರಸ್ತಿ ಮತ್ತು ಸೌಲಭ್ಯಗಳು',
        description: 'ದುರಸ್ತಿ, ನೀರು, ಶೌಚಾಲಯ, ಕಿಚನ್ ಗಾರ್ಡನ್, ಆಟದ ವಸ್ತುಗಳು.',
        details: 'ಮಹಿಳಾ/ಮಕ್ಕಳ ಅಭಿವೃದ್ಧಿ ಇಲಾಖೆಯ ಸಂಯೋಜನೆ.',
        documents: [],
        eligibility: 'ಜಿಲ್ಲಾ ಯೋಜನೆಗಳಲ್ಲಿ ಗುರುತಿಸಲಾದ ಕೇಂದ್ರಗಳು.'
      }
    },
    applyLink: 'https://dwcd.karnataka.gov.in/',
    level: 'District Panchayat',
    district: 'All Districts'
  },
  {
    translations: {
      en: {
        title: 'Community Halls & Market Upgrades (DP Works)',
        description: 'Construction/repair of community halls and weekly markets to support SHGs and local commerce.',
        details: 'Planned through Gram Sabha needs; supports rural livelihoods and social functions.',
        documents: [],
        eligibility: 'Villages prioritized in DP annual work plan.'
      },
      kn: {
        title: 'ಸಮುದಾಯ ಭವನ/ಮಾರ್ಕೆಟ್ ಸುಧಾರಣೆ',
        description: 'ಸಮುದಾಯ ಭವನ/ವಾರಾಂತರ ಮಾರುಕಟ್ಟೆ ನಿರ್ಮಾಣ/ದುರಸ್ತಿ.',
        details: 'ಗ್ರಾಮ ಸಭೆ ಅವಶ್ಯಕತೆ ಆಧಾರಿತ; ಗ್ರಾಮೀಣ ಜೀವನೋಪಾಯ ಬೆಂಬಲ.',
        documents: [],
        eligibility: 'ಡಿಪಿ ವಾರ್ಷಿಕ ಕಾರ್ಯಯೋಜನೆ ಆದ್ಯತಾ ಗ್ರಾಮಗಳು.'
      }
    },
    applyLink: 'https://rdpr.karnataka.gov.in/',
    level: 'District Panchayat',
    district: 'All Districts'
  }
];

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Atlas connected');
        return Scheme.deleteMany({}); // Clear existing schemes
    })
    .then(() => {
        const enriched = realSchemes.map(s => ({
          ...s,
          title: s.translations?.en?.title,
          description: s.translations?.en?.description,
          details: s.translations?.en?.details,
          eligibility: s.translations?.en?.eligibility,
          documents: s.translations?.en?.documents || []
        }));
        return Scheme.insertMany(enriched);
    })
    .then(() => {
        console.log('Real government schemes inserted successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB or inserting data:', err);
    });
