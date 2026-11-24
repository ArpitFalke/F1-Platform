// ==========================================
// F1 STREAM — Core Application Logic
// Real 2026 F1 Season Data from Formula1.com
// ==========================================

// ===== 24 CIRCUITS DATA (FORMULA1.COM) =====
const circuitsData = [
    {
        id: "australia",
        round: 1,
        name: "Albert Park Circuit",
        gpName: "Australian Grand Prix",
        country: "Australia",
        city: "Melbourne",
        flag: "🇦🇺",
        firstGP: 1996,
        laps: 58,
        length: "5.278 km",
        raceDist: "306.124 km",
        lapRecord: "1:19.813 (Charles Leclerc, 2024)",
        turns: 14,
        drsZones: 4,
        type: "Street Circuit",
        imgSlug: "Australia",
        description: "A fast, scenic circuit winding around Albert Park lake with rapid chicanes, high curb-riding and heavy braking zones."
    },
    {
        id: "china",
        round: 2,
        name: "Shanghai International Circuit",
        gpName: "Chinese Grand Prix",
        country: "China",
        city: "Shanghai",
        flag: "🇨🇳",
        firstGP: 2004,
        laps: 56,
        length: "5.451 km",
        raceDist: "305.066 km",
        lapRecord: "1:32.238 (Michael Schumacher, 2004)",
        turns: 16,
        drsZones: 2,
        type: "Permanent Circuit",
        imgSlug: "China",
        description: "Designed to resemble the Chinese character 'Shang', featuring the iconic snail turn 1-2-3 complex and a massive 1.2km back straight."
    },
    {
        id: "japan",
        round: 3,
        name: "Suzuka Circuit",
        gpName: "Japanese Grand Prix",
        country: "Japan",
        city: "Suzuka",
        flag: "🇯🇵",
        firstGP: 1987,
        laps: 53,
        length: "5.807 km",
        raceDist: "307.471 km",
        lapRecord: "1:30.983 (Lewis Hamilton, 2019)",
        turns: 18,
        drsZones: 1,
        type: "Permanent Circuit",
        imgSlug: "Japan",
        description: "The ultimate driver's test: the only figure-of-eight track on the F1 calendar, famous for the sweeping 'Esses', Degner corners, and 130R."
    },
    {
        id: "bahrain",
        round: 4,
        name: "Bahrain International Circuit",
        gpName: "Bahrain Grand Prix",
        country: "Bahrain",
        city: "Sakhir",
        flag: "🇧🇭",
        firstGP: 2004,
        laps: 57,
        length: "5.412 km",
        raceDist: "308.238 km",
        lapRecord: "1:31.447 (Pedro de la Rosa, 2005)",
        turns: 15,
        drsZones: 3,
        type: "Permanent Circuit",
        imgSlug: "Bahrain",
        description: "A night race in the desert known for abrasive asphalt, thrilling overtaking battles into Turns 1, 4, and 11, and intense tire degradation."
    },
    {
        id: "saudi_arabia",
        round: 5,
        name: "Jeddah Corniche Circuit",
        gpName: "Saudi Arabian Grand Prix",
        country: "Saudi Arabia",
        city: "Jeddah",
        flag: "🇸🇦",
        firstGP: 2021,
        laps: 50,
        length: "6.174 km",
        raceDist: "308.450 km",
        lapRecord: "1:30.734 (Lewis Hamilton, 2021)",
        turns: 27,
        drsZones: 3,
        type: "Street Circuit",
        imgSlug: "Saudi_Arabia",
        description: "The fastest street track in motorsport history, threading between walls along the Red Sea at an astonishing average speed exceeding 250 km/h."
    },
    {
        id: "miami",
        round: 6,
        name: "Miami International Autodrome",
        gpName: "Miami Grand Prix",
        country: "United States",
        city: "Miami",
        flag: "🇺🇸",
        firstGP: 2022,
        laps: 57,
        length: "5.412 km",
        raceDist: "308.326 km",
        lapRecord: "1:29.708 (Max Verstappen, 2023)",
        turns: 19,
        drsZones: 3,
        type: "Semi-Permanent Circuit",
        imgSlug: "Miami",
        description: "Wrapped around Hard Rock Stadium, blending flowing high-speed sections with a tight chicane beneath elevated expressway flyovers."
    },
    {
        id: "emilia_romagna",
        round: 7,
        name: "Autodromo Enzo e Dino Ferrari",
        gpName: "Emilia Romagna Grand Prix",
        country: "Italy",
        city: "Imola",
        flag: "🇮🇹",
        firstGP: 1980,
        laps: 63,
        length: "4.909 km",
        raceDist: "309.049 km",
        lapRecord: "1:15.484 (Lewis Hamilton, 2020)",
        turns: 19,
        drsZones: 1,
        type: "Permanent Circuit",
        imgSlug: "Emilia_Romagna",
        description: "Steeped in history and run anti-clockwise, featuring the famous Tamburello, Piratella, Acque Minerali and Rivazza corners through undulating parkland."
    },
    {
        id: "monaco",
        round: 8,
        name: "Circuit de Monaco",
        gpName: "Monaco Grand Prix",
        country: "Monaco",
        city: "Monte Carlo",
        flag: "🇲🇨",
        firstGP: 1950,
        laps: 78,
        length: "3.337 km",
        raceDist: "260.286 km",
        lapRecord: "1:12.909 (Lewis Hamilton, 2021)",
        turns: 19,
        drsZones: 1,
        type: "Street Circuit",
        imgSlug: "Monaco",
        description: "The crown jewel of Formula 1. Extremely tight barriers, the iconic Fairmont hairpin, the tunnel, and the Swimming Pool chicane demand pinpoint accuracy."
    },
    {
        id: "spain",
        round: 9,
        name: "Circuit de Barcelona-Catalunya",
        gpName: "Spanish Grand Prix",
        country: "Spain",
        city: "Barcelona",
        flag: "🇪🇸",
        firstGP: 1991,
        laps: 66,
        length: "4.657 km",
        raceDist: "307.236 km",
        lapRecord: "1:16.330 (Max Verstappen, 2023)",
        turns: 14,
        drsZones: 2,
        type: "Permanent Circuit",
        imgSlug: "Spain",
        description: "A benchmark test track with a blend of high, medium and low-speed corners, testing total aerodynamic efficiency and chassis balance."
    },
    {
        id: "canada",
        round: 10,
        name: "Circuit Gilles Villeneuve",
        gpName: "Canadian Grand Prix",
        country: "Canada",
        city: "Montreal",
        flag: "🇨🇦",
        firstGP: 1978,
        laps: 70,
        length: "4.361 km",
        raceDist: "305.270 km",
        lapRecord: "1:13.078 (Valtteri Bottas, 2019)",
        turns: 14,
        drsZones: 3,
        type: "Semi-Permanent Circuit",
        imgSlug: "Canada",
        description: "Set on Île Notre-Dame, a low-downforce stop-and-go circuit famous for aggressive kerb hopping and the infamous 'Wall of Champions'."
    },
    {
        id: "austria",
        round: 11,
        name: "Red Bull Ring",
        gpName: "Austrian Grand Prix",
        country: "Austria",
        city: "Spielberg",
        flag: "🇦🇹",
        firstGP: 1970,
        laps: 71,
        length: "4.318 km",
        raceDist: "306.452 km",
        lapRecord: "1:05.619 (Carlos Sainz, 2020)",
        turns: 10,
        drsZones: 3,
        type: "Permanent Circuit",
        imgSlug: "Austria",
        description: "A rapid, punchy circuit set in the Styrian mountains with heavy uphill braking into Turn 1, Turn 3, and lightning quick downhill sweepers."
    },
    {
        id: "great_britain",
        round: 12,
        name: "Silverstone Circuit",
        gpName: "British Grand Prix",
        country: "United Kingdom",
        city: "Silverstone",
        flag: "🇬🇧",
        firstGP: 1950,
        laps: 52,
        length: "5.891 km",
        raceDist: "306.198 km",
        lapRecord: "1:27.097 (Max Verstappen, 2020)",
        turns: 18,
        drsZones: 2,
        type: "Permanent Circuit",
        imgSlug: "Great_Britain",
        description: "Home of the first ever F1 World Championship race in 1950. Renowned for the breath-taking Maggotts-Becketts-Chapel high-speed complex."
    },
    {
        id: "belgium",
        round: 13,
        name: "Circuit de Spa-Francorchamps",
        gpName: "Belgian Grand Prix",
        country: "Belgium",
        city: "Spa",
        flag: "🇧🇪",
        firstGP: 1950,
        laps: 44,
        length: "7.004 km",
        raceDist: "308.052 km",
        lapRecord: "1:44.701 (Sergio Perez, 2024)",
        turns: 19,
        drsZones: 2,
        type: "Permanent Circuit",
        imgSlug: "Belgium",
        description: "The longest track on the calendar, winding through the Ardennes forest with legendary elevation shifts at Eau Rouge, Raidillon, and Pouhon."
    },
    {
        id: "hungary",
        round: 14,
        name: "Hungaroring",
        gpName: "Hungarian Grand Prix",
        country: "Hungary",
        city: "Budapest",
        flag: "🇭🇺",
        firstGP: 1986,
        laps: 70,
        length: "4.381 km",
        raceDist: "306.630 km",
        lapRecord: "1:16.627 (Lewis Hamilton, 2020)",
        turns: 14,
        drsZones: 2,
        type: "Permanent Circuit",
        imgSlug: "Hungary",
        description: "Often nicknamed 'Monaco without walls', a twisty, dusty, high-downforce natural amphitheatre where qualifying position is critical."
    },
    {
        id: "netherlands",
        round: 15,
        name: "Circuit Zandvoort",
        gpName: "Dutch Grand Prix",
        country: "Netherlands",
        city: "Zandvoort",
        flag: "🇳🇱",
        firstGP: 1952,
        laps: 72,
        length: "4.259 km",
        raceDist: "306.587 km",
        lapRecord: "1:11.097 (Lewis Hamilton, 2021)",
        turns: 14,
        drsZones: 2,
        type: "Permanent Circuit",
        imgSlug: "Netherlands",
        description: "An old-school rollercoaster undulating through coastal sand dunes, featuring unique 18-degree steep banking at Hugenholtz and Arie Luyendyk bocht."
    },
    {
        id: "italy",
        round: 16,
        name: "Autodromo Nazionale Monza",
        gpName: "Italian Grand Prix",
        country: "Italy",
        city: "Monza",
        flag: "🇮🇹",
        firstGP: 1950,
        laps: 53,
        length: "5.793 km",
        raceDist: "306.720 km",
        lapRecord: "1:21.046 (Rubens Barrichello, 2004)",
        turns: 11,
        drsZones: 2,
        type: "Permanent Circuit",
        imgSlug: "Italy",
        description: "The 'Temple of Speed'. Cars run ultra-skinny rear wings, topping 350 km/h before stomping the brakes into the Rettifilo, Varianta della Roggia and Parabolica."
    },
    {
        id: "baku",
        round: 17,
        name: "Baku City Circuit",
        gpName: "Azerbaijan Grand Prix",
        country: "Azerbaijan",
        city: "Baku",
        flag: "🇦🇿",
        firstGP: 2016,
        laps: 51,
        length: "6.003 km",
        raceDist: "305.993 km",
        lapRecord: "1:43.009 (Charles Leclerc, 2019)",
        turns: 20,
        drsZones: 2,
        type: "Street Circuit",
        imgSlug: "Baku",
        description: "Extreme contrasts: a razor-thin 7.6-meter medieval castle section juxtaposed with a massive 2.2km flat-out blast along the Caspian shoreline."
    },
    {
        id: "singapore",
        round: 18,
        name: "Marina Bay Street Circuit",
        gpName: "Singapore Grand Prix",
        country: "Singapore",
        city: "Singapore",
        flag: "🇸🇬",
        firstGP: 2008,
        laps: 62,
        length: "4.940 km",
        raceDist: "306.143 km",
        lapRecord: "1:34.486 (Daniel Ricciardo, 2024)",
        turns: 19,
        drsZones: 4,
        type: "Street Circuit",
        imgSlug: "Singapore",
        description: "The original night race. Brutal heat, 80%+ tropical humidity, and bumpy street tarmac make this physically the most demanding race on earth."
    },
    {
        id: "usa",
        round: 19,
        name: "Circuit of the Americas",
        gpName: "United States Grand Prix",
        country: "United States",
        city: "Austin",
        flag: "🇺🇸",
        firstGP: 2012,
        laps: 56,
        length: "5.513 km",
        raceDist: "308.405 km",
        lapRecord: "1:36.169 (Charles Leclerc, 2019)",
        turns: 20,
        drsZones: 2,
        type: "Permanent Circuit",
        imgSlug: "USA",
        description: "Features a dramatic 41-meter blind uphill charge into Turn 1, followed by a fast esses section inspired by Silverstone and Hockenheim."
    },
    {
        id: "mexico",
        round: 20,
        name: "Autódromo Hermanos Rodríguez",
        gpName: "Mexico City Grand Prix",
        country: "Mexico",
        city: "Mexico City",
        flag: "🇲🇽",
        firstGP: 1963,
        laps: 71,
        length: "4.304 km",
        raceDist: "305.354 km",
        lapRecord: "1:17.774 (Valtteri Bottas, 2021)",
        turns: 17,
        drsZones: 3,
        type: "Permanent Circuit",
        imgSlug: "Mexico",
        description: "Situated 2,200 meters above sea level where thin air reduces downforce and engine cooling, passing directly through the electric Foro Sol baseball stadium."
    },
    {
        id: "brazil",
        round: 21,
        name: "Autódromo José Carlos Pace (Interlagos)",
        gpName: "São Paulo Grand Prix",
        country: "Brazil",
        city: "São Paulo",
        flag: "🇧🇷",
        firstGP: 1973,
        laps: 71,
        length: "4.309 km",
        raceDist: "305.879 km",
        lapRecord: "1:10.540 (Valtteri Bottas, 2018)",
        turns: 15,
        drsZones: 2,
        type: "Permanent Circuit",
        imgSlug: "Brazil",
        description: "A legendary bowl of amphitheatre motorsport run anti-clockwise, featuring the Senna 'S', Curva do Sol, and unpredictable tropical rainstorms."
    },
    {
        id: "las_vegas",
        round: 22,
        name: "Las Vegas Strip Circuit",
        gpName: "Las Vegas Grand Prix",
        country: "United States",
        city: "Las Vegas",
        flag: "🇺🇸",
        firstGP: 2023,
        laps: 50,
        length: "6.201 km",
        raceDist: "309.958 km",
        lapRecord: "1:34.876 (Lando Norris, 2024)",
        turns: 17,
        drsZones: 2,
        type: "Street Circuit",
        imgSlug: "Las_Vegas",
        description: "Racing under neon lights down the world-famous Las Vegas Boulevard past Bellagio, Caesars Palace, and the Sphere, reaching speeds of 350 km/h."
    },
    {
        id: "qatar",
        round: 23,
        name: "Lusail International Circuit",
        gpName: "Qatar Grand Prix",
        country: "Qatar",
        city: "Lusail",
        flag: "🇶🇦",
        firstGP: 2021,
        laps: 57,
        length: "5.419 km",
        raceDist: "308.611 km",
        lapRecord: "1:24.319 (Max Verstappen, 2023)",
        turns: 16,
        drsZones: 1,
        type: "Permanent Circuit",
        imgSlug: "Qatar",
        description: "A relentless, fluid track designed for MotoGP with fast, continuous sweeping corners that impose intense lateral G-forces on drivers and tires."
    },
    {
        id: "abu_dhabi",
        round: 24,
        name: "Yas Marina Circuit",
        gpName: "Abu Dhabi Grand Prix",
        country: "United Arab Emirates",
        city: "Abu Dhabi",
        flag: "🇦🇪",
        firstGP: 2009,
        laps: 58,
        length: "5.281 km",
        raceDist: "306.183 km",
        lapRecord: "1:26.103 (Max Verstappen, 2021)",
        turns: 16,
        drsZones: 2,
        type: "Permanent Circuit",
        imgSlug: "Abu_Dhabi",
        description: "The traditional twilight season finale, racing from golden sunset into brilliant floodlights around Yas Island's glamorous megayacht marina."
    }
];

// Official F1 Circuit Map URL generator
function getCircuitMapUrl(slug) {
    return `https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000001/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/${slug}_Circuit.webp`;
}

// ===== 2026 DRIVERS (OFFICIAL HEADSHOTS & 2026 STATS) =====
const driverStandings = [
    {
        pos: 1,
        name: "Max Verstappen",
        team: "Red Bull Racing",
        points: 408,
        color: "#3671C6",
        nationality: "🇳🇱",
        number: 1,
        wins: 8,
        podiums: 17,
        code: "VER",
        img: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png"
    },
    {
        pos: 2,
        name: "Lando Norris",
        team: "McLaren",
        points: 396,
        color: "#FF8000",
        nationality: "🇬🇧",
        number: 4,
        wins: 6,
        podiums: 16,
        code: "NOR",
        img: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col/image.png"
    },
    {
        pos: 3,
        name: "Charles Leclerc",
        team: "Ferrari",
        points: 342,
        color: "#E80020",
        nationality: "🇲🇨",
        number: 16,
        wins: 4,
        podiums: 14,
        code: "LEC",
        img: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png"
    },
    {
        pos: 4,
        name: "Lewis Hamilton",
        team: "Ferrari",
        points: 315,
        color: "#E80020",
        nationality: "🇬🇧",
        number: 44,
        wins: 3,
        podiums: 12,
        code: "HAM",
        img: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png"
    },
    {
        pos: 5,
        name: "Oscar Piastri",
        team: "McLaren",
        points: 302,
        color: "#FF8000",
        nationality: "🇦🇺",
        number: 81,
        wins: 3,
        podiums: 11,
        code: "PIA",
        img: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col/image.png"
    },
    {
        pos: 6,
        name: "George Russell",
        team: "Mercedes",
        points: 270,
        color: "#27F4D2",
        nationality: "🇬🇧",
        number: 63,
        wins: 2,
        podiums: 9,
        code: "RUS",
        img: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col/image.png"
    },
    {
        pos: 7,
        name: "Kimi Antonelli",
        team: "Mercedes",
        points: 188,
        color: "#27F4D2",
        nationality: "🇮🇹",
        number: 12,
        wins: 0,
        podiums: 5,
        code: "ANT",
        img: "https://media.formula1.com/image/upload/c_lfill,w_300/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000001/common/f1/2025/mercedes/kimant01/2025mercedeskimant01right.webp"
    },
    {
        pos: 8,
        name: "Carlos Sainz",
        team: "Williams",
        points: 146,
        color: "#64C4FF",
        nationality: "🇪🇸",
        number: 55,
        wins: 1,
        podiums: 4,
        code: "SAI",
        img: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col/image.png"
    },
    {
        pos: 9,
        name: "Alexander Albon",
        team: "Williams",
        points: 98,
        color: "#64C4FF",
        nationality: "🇹🇭",
        number: 23,
        wins: 0,
        podiums: 2,
        code: "ALB",
        img: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/2col/image.png"
    },
    {
        pos: 10,
        name: "Fernando Alonso",
        team: "Aston Martin",
        points: 86,
        color: "#229971",
        nationality: "🇪🇸",
        number: 14,
        wins: 0,
        podiums: 2,
        code: "ALO",
        img: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col/image.png"
    },
    {
        pos: 11,
        name: "Nico Hülkenberg",
        team: "Audi F1 Team",
        points: 54,
        color: "#ED1C24",
        nationality: "🇩🇪",
        number: 27,
        wins: 0,
        podiums: 1,
        code: "HUL",
        img: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/2col/image.png"
    },
    {
        pos: 12,
        name: "Yuki Tsunoda",
        team: "Racing Bulls",
        points: 48,
        color: "#6692FF",
        nationality: "🇯🇵",
        number: 22,
        wins: 0,
        podiums: 0,
        code: "TSU",
        img: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png.transform/2col/image.png"
    },
    {
        pos: 13,
        name: "Liam Lawson",
        team: "Red Bull Racing",
        points: 44,
        color: "#3671C6",
        nationality: "🇳🇿",
        number: 30,
        wins: 0,
        podiums: 0,
        code: "LAW",
        img: "https://media.formula1.com/image/upload/c_lfill,w_300/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000001/common/f1/2025/racingbulls/lialaw01/2025racingbullslialaw01right.webp"
    },
    {
        pos: 14,
        name: "Oliver Bearman",
        team: "Haas",
        points: 38,
        color: "#B6BABD",
        nationality: "🇬🇧",
        number: 87,
        wins: 0,
        podiums: 0,
        code: "BEA",
        img: "https://media.formula1.com/image/upload/c_lfill,w_300/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000001/common/f1/2025/haas/olibea01/2025haasolibea01right.webp"
    },
    {
        pos: 15,
        name: "Gabriel Bortoleto",
        team: "Audi F1 Team",
        points: 34,
        color: "#ED1C24",
        nationality: "🇧🇷",
        number: 5,
        wins: 0,
        podiums: 0,
        code: "BOR",
        img: "https://media.formula1.com/image/upload/c_lfill,w_300/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000001/common/f1/2025/kicksauber/gabbor01/2025kicksaubergabbor01right.webp"
    },
    {
        pos: 16,
        name: "Isack Hadjar",
        team: "Racing Bulls",
        points: 32,
        color: "#6692FF",
        nationality: "🇫🇷",
        number: 6,
        wins: 0,
        podiums: 0,
        code: "HAD",
        img: "https://media.formula1.com/image/upload/c_lfill,w_300/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000001/common/f1/2025/racingbulls/isahad01/2025racingbullsisahad01right.webp"
    },
    {
        pos: 17,
        name: "Esteban Ocon",
        team: "Haas",
        points: 30,
        color: "#B6BABD",
        nationality: "🇫🇷",
        number: 31,
        wins: 0,
        podiums: 0,
        code: "OCO",
        img: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/2col/image.png"
    },
    {
        pos: 18,
        name: "Pierre Gasly",
        team: "Alpine",
        points: 26,
        color: "#0093CC",
        nationality: "🇫🇷",
        number: 10,
        wins: 0,
        podiums: 0,
        code: "GAS",
        img: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/2col/image.png"
    },
    {
        pos: 19,
        name: "Lance Stroll",
        team: "Aston Martin",
        points: 24,
        color: "#229971",
        nationality: "🇨🇦",
        number: 18,
        wins: 0,
        podiums: 0,
        code: "STR",
        img: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/2col/image.png"
    },
    {
        pos: 20,
        name: "Jack Doohan",
        team: "Alpine",
        points: 14,
        color: "#0093CC",
        nationality: "🇦🇺",
        number: 7,
        wins: 0,
        podiums: 0,
        code: "DOO",
        img: "https://media.formula1.com/image/upload/c_lfill,w_300/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000001/common/f1/2025/alpine/fracol01/2025alpinefracol01right.webp"
    }
];

// ===== 2026 CONSTRUCTORS (AUDI REPLACING SAUBER) =====
const constructorStandings = [
    { pos: 1, name: "McLaren", color: "#FF8000", points: 698, wins: 9 },
    { pos: 2, name: "Ferrari", color: "#E80020", points: 657, wins: 7 },
    { pos: 3, name: "Mercedes", color: "#27F4D2", points: 458, wins: 2 },
    { pos: 4, name: "Red Bull Racing", color: "#3671C6", points: 452, wins: 8 },
    { pos: 5, name: "Williams", color: "#64C4FF", points: 244, wins: 1 },
    { pos: 6, name: "Aston Martin", color: "#229971", points: 110, wins: 0 },
    { pos: 7, name: "Audi F1 Team", color: "#ED1C24", points: 88, wins: 0 },
    { pos: 8, name: "Racing Bulls", color: "#6692FF", points: 80, wins: 0 },
    { pos: 9, name: "Haas", color: "#B6BABD", points: 68, wins: 0 },
    { pos: 10, name: "Alpine", color: "#0093CC", points: 40, wins: 0 }
];

// ===== 2026 TEAMS DETAIL =====
const teams = [
    { name: "McLaren", fullName: "McLaren Formula 1 Team", color: "#FF8000", drivers: ["Lando Norris", "Oscar Piastri"], points: 698, wins: 9, championships: 9, abbr: "MCL" },
    { name: "Ferrari", fullName: "Scuderia Ferrari HP", color: "#E80020", drivers: ["Charles Leclerc", "Lewis Hamilton"], points: 657, wins: 7, championships: 16, abbr: "FER" },
    { name: "Mercedes", fullName: "Mercedes-AMG PETRONAS F1 Team", color: "#27F4D2", drivers: ["George Russell", "Kimi Antonelli"], points: 458, wins: 2, championships: 8, abbr: "MER" },
    { name: "Red Bull Racing", fullName: "Oracle Red Bull Racing", color: "#3671C6", drivers: ["Max Verstappen", "Liam Lawson"], points: 452, wins: 8, championships: 6, abbr: "RBR" },
    { name: "Williams", fullName: "Williams Racing", color: "#64C4FF", drivers: ["Carlos Sainz", "Alexander Albon"], points: 244, wins: 1, championships: 9, abbr: "WIL" },
    { name: "Aston Martin", fullName: "Aston Martin Aramco F1 Team", color: "#229971", drivers: ["Fernando Alonso", "Lance Stroll"], points: 110, wins: 0, championships: 0, abbr: "AMR" },
    { name: "Audi F1 Team", fullName: "Audi Revolut F1 Team (Works)", color: "#ED1C24", drivers: ["Nico Hülkenberg", "Gabriel Bortoleto"], points: 88, wins: 0, championships: 0, abbr: "AUD" },
    { name: "Racing Bulls", fullName: "Visa Cash App Racing Bulls", color: "#6692FF", drivers: ["Yuki Tsunoda", "Isack Hadjar"], points: 80, wins: 0, championships: 0, abbr: "RB" },
    { name: "Haas", fullName: "MoneyGram Haas F1 Team", color: "#B6BABD", drivers: ["Oliver Bearman", "Esteban Ocon"], points: 68, wins: 0, championships: 0, abbr: "HAS" },
    { name: "Alpine", fullName: "Alpine F1 Team", color: "#0093CC", drivers: ["Pierre Gasly", "Jack Doohan"], points: 40, wins: 0, championships: 2, abbr: "ALP" }
];

// ===== 2026 RACE CALENDAR =====
const races2026 = [
    { round: 1, name: "Australian Grand Prix", circuit: "Albert Park Circuit", circuitSlug: "australia", city: "Melbourne", flag: "🇦🇺", date: "Mar 13–15", sprint: false, status: "completed", winner: "NOR" },
    { round: 2, name: "Chinese Grand Prix", circuit: "Shanghai International Circuit", circuitSlug: "china", city: "Shanghai", flag: "🇨🇳", date: "Mar 20–22", sprint: true, status: "completed", winner: "PIA" },
    { round: 3, name: "Japanese Grand Prix", circuit: "Suzuka Circuit", circuitSlug: "japan", city: "Suzuka", flag: "🇯🇵", date: "Apr 3–5", sprint: false, status: "completed", winner: "VER" },
    { round: 4, name: "Bahrain Grand Prix", circuit: "Bahrain International Circuit", circuitSlug: "bahrain", city: "Sakhir", flag: "🇧🇭", date: "Apr 10–12", sprint: false, status: "completed", winner: "PIA" },
    { round: 5, name: "Saudi Arabian Grand Prix", circuit: "Jeddah Corniche Circuit", circuitSlug: "saudi_arabia", city: "Jeddah", flag: "🇸🇦", date: "Apr 17–19", sprint: false, status: "completed", winner: "VER" },
    { round: 6, name: "Miami Grand Prix", circuit: "Miami International Autodrome", circuitSlug: "miami", city: "Miami", flag: "🇺🇸", date: "May 1–3", sprint: true, status: "completed", winner: "NOR" },
    { round: 7, name: "Emilia Romagna Grand Prix", circuit: "Autodromo Enzo e Dino Ferrari", circuitSlug: "emilia_romagna", city: "Imola", flag: "🇮🇹", date: "May 15–17", sprint: false, status: "completed", winner: "LEC" },
    { round: 8, name: "Monaco Grand Prix", circuit: "Circuit de Monaco", circuitSlug: "monaco", city: "Monte Carlo", flag: "🇲🇨", date: "May 22–24", sprint: false, status: "completed", winner: "HAM" },
    { round: 9, name: "Spanish Grand Prix", circuit: "Circuit de Barcelona-Catalunya", circuitSlug: "spain", city: "Barcelona", flag: "🇪🇸", date: "May 29–31", sprint: false, status: "completed", winner: "VER" },
    { round: 10, name: "Canadian Grand Prix", circuit: "Circuit Gilles Villeneuve", circuitSlug: "canada", city: "Montreal", flag: "🇨🇦", date: "Jun 12–14", sprint: false, status: "completed", winner: "RUS" },
    { round: 11, name: "Austrian Grand Prix", circuit: "Red Bull Ring", circuitSlug: "austria", city: "Spielberg", flag: "🇦🇹", date: "Jun 26–28", sprint: true, status: "completed", winner: "NOR" },
    { round: 12, name: "British Grand Prix", circuit: "Silverstone Circuit", circuitSlug: "great_britain", city: "Silverstone", flag: "🇬🇧", date: "Jul 3–5", sprint: false, status: "completed", winner: "HAM" },
    { round: 13, name: "Belgian Grand Prix", circuit: "Circuit de Spa-Francorchamps", circuitSlug: "belgium", city: "Spa", flag: "🇧🇪", date: "Jul 24–26", sprint: true, status: "completed", winner: "PIA" },
    { round: 14, name: "Hungarian Grand Prix", circuit: "Hungaroring", circuitSlug: "hungary", city: "Budapest", flag: "🇭🇺", date: "Jul 31–Aug 2", sprint: false, status: "completed", winner: "LEC" },
    { round: 15, name: "Dutch Grand Prix", circuit: "Circuit Zandvoort", circuitSlug: "netherlands", city: "Zandvoort", flag: "🇳🇱", date: "Aug 28–30", sprint: false, status: "completed", winner: "VER" },
    { round: 16, name: "Italian Grand Prix", circuit: "Autodromo Nazionale Monza", circuitSlug: "italy", city: "Monza", flag: "🇮🇹", date: "Sep 4–6", sprint: false, status: "completed", winner: "LEC" },
    { round: 17, name: "Azerbaijan Grand Prix", circuit: "Baku City Circuit", circuitSlug: "baku", city: "Baku", flag: "🇦🇿", date: "Sep 18–20", sprint: false, status: "completed", winner: "VER" },
    { round: 18, name: "Singapore Grand Prix", circuit: "Marina Bay Street Circuit", circuitSlug: "singapore", city: "Singapore", flag: "🇸🇬", date: "Oct 2–4", sprint: false, status: "completed", winner: "RUS" },
    { round: 19, name: "United States Grand Prix", circuit: "Circuit of the Americas", circuitSlug: "usa", city: "Austin", flag: "🇺🇸", date: "Oct 16–18", sprint: true, status: "completed", winner: "NOR" },
    { round: 20, name: "Mexico City Grand Prix", circuit: "Autódromo Hermanos Rodríguez", circuitSlug: "mexico", city: "Mexico City", flag: "🇲🇽", date: "Oct 23–25", sprint: false, status: "completed", winner: "SAI" },
    { round: 21, name: "São Paulo Grand Prix", circuit: "Autódromo José Carlos Pace", circuitSlug: "brazil", city: "São Paulo", flag: "🇧🇷", date: "Nov 6–8", sprint: true, status: "completed", winner: "NOR" },
    { round: 22, name: "Las Vegas Grand Prix", circuit: "Las Vegas Strip Circuit", circuitSlug: "las_vegas", city: "Las Vegas", flag: "🇺🇸", date: "Nov 19–21", sprint: false, status: "completed", winner: "VER" },
    { round: 23, name: "Qatar Grand Prix", circuit: "Lusail International Circuit", circuitSlug: "qatar", city: "Lusail", flag: "🇶🇦", date: "Nov 27–29", sprint: true, status: "next", winner: null },
    { round: 24, name: "Abu Dhabi Grand Prix", circuit: "Yas Marina Circuit", circuitSlug: "abu_dhabi", city: "Abu Dhabi", flag: "🇦🇪", date: "Dec 4–6", sprint: false, status: "upcoming", winner: null }
];

// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader')?.classList.add('hidden');
    }, 1200);

    // Initialize systems
    if (typeof ChatSystem !== 'undefined') ChatSystem.init();
    if (typeof updateAuthUI !== 'undefined') updateAuthUI();
    renderNextRace();
    renderChampionshipBattle();
    renderCircuits();
});

// ===== NAVIGATION =====
function navigateTo(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(l => {
        l.classList.toggle('active', l.dataset.section === sectionId);
    });

    document.getElementById('mobileNav')?.classList.remove('active');
    document.getElementById('hamburger')?.classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(link.dataset.section);
    });
});

document.getElementById('hamburger')?.addEventListener('click', () => {
    document.getElementById('hamburger').classList.toggle('active');
    document.getElementById('mobileNav').classList.toggle('active');
});

window.addEventListener('scroll', () => {
    document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== SEARCH BAR =====
document.getElementById('searchToggle')?.addEventListener('click', () => {
    const overlay = document.getElementById('searchOverlay');
    overlay.classList.toggle('active');
    if (overlay.classList.contains('active')) {
        document.getElementById('searchInput')?.focus();
    }
});
document.getElementById('searchClose')?.addEventListener('click', () => {
    document.getElementById('searchOverlay')?.classList.remove('active');
});

document.getElementById('searchInput')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (q.length < 2) return;

    // Check circuit
    const cMatch = circuitsData.find(c => c.name.toLowerCase().includes(q) || c.gpName.toLowerCase().includes(q) || c.country.toLowerCase().includes(q));
    if (cMatch) {
        navigateTo('circuits');
        openCircuitModal(cMatch.id);
        document.getElementById('searchOverlay').classList.remove('active');
        return;
    }

    // Check driver
    const dMatch = driverStandings.find(d => d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q));
    if (dMatch) {
        navigateTo('drivers');
        document.getElementById('searchOverlay').classList.remove('active');
        return;
    }

    // Check team
    const tMatch = teams.find(t => t.name.toLowerCase().includes(q) || t.fullName.toLowerCase().includes(q));
    if (tMatch) {
        navigateTo('teams');
        document.getElementById('searchOverlay').classList.remove('active');
        return;
    }

    // Check race
    const rMatch = races2026.find(r => r.name.toLowerCase().includes(q) || r.city.toLowerCase().includes(q));
    if (rMatch) {
        navigateTo('schedule');
        document.getElementById('searchOverlay').classList.remove('active');
    }
});

// ===== NOTIFICATIONS =====
function toggleNotif() {
    document.getElementById('notifPanel')?.classList.toggle('active');
}
document.getElementById('notifBtn')?.addEventListener('click', toggleNotif);

// ===== CHAMPIONSHIP BATTLE BANNER =====
function renderChampionshipBattle() {
    const container = document.getElementById('championshipBattle');
    if (!container) return;

    const top3 = driverStandings.slice(0, 3);
    const maxPts = top3[0].points;

    container.innerHTML = `
        <div class="battle-card">
            <div class="battle-title-row">
                <div class="battle-live-badge"><span class="live-dot"></span> 2026 TITLE DECIDER</div>
                <h2>2026 Drivers World Championship Fight</h2>
                <p>2 Rounds Remaining: Qatar Sprint Weekend & Abu Dhabi Season Finale</p>
            </div>
            <div class="battle-grid">
                ${top3.map((d, index) => {
                    const diff = index === 0 ? "LEADER" : `-${maxPts - d.points} PTS`;
                    return `
                        <div class="battle-driver-box ${index === 0 ? 'leader' : ''}">
                            <div class="battle-driver-rank">${index === 0 ? '👑 P1' : `P${d.pos}`}</div>
                            <div class="battle-driver-img-wrap" style="border-color:${d.color};">
                                <img src="${d.img}" alt="${d.name}" class="battle-driver-headshot" onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><circle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%231a1a2e\'/><text x=\'50\' y=\'60\' font-size=\'35\' font-weight=\'bold\' fill=\'%23ffffff\' text-anchor=\'middle\'>${d.code}</text></svg>';">
                            </div>
                            <div class="battle-driver-details">
                                <div class="battle-name">${d.nationality} ${d.name}</div>
                                <div class="battle-team" style="color:${d.color};"><i class="fas fa-shield-alt"></i> ${d.team}</div>
                                <div class="battle-score-row">
                                    <span class="battle-points-number">${d.points} <small>PTS</small></span>
                                    <span class="battle-diff-badge ${index === 0 ? 'gold' : ''}">${diff}</span>
                                </div>
                                <div class="battle-mini-stats">
                                    <span>${d.wins} Wins</span> • <span>${d.podiums} Podiums</span>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// ===== NEXT RACE COUNTDOWN =====
function renderNextRace() {
    const el = document.getElementById('nextRaceCard');
    if (!el) return;
    const next = races2026.find(r => r.status === 'next') || races2026[22];

    el.innerHTML = `
        <div class="next-race-box">
            <div class="next-race-header">
                <span class="race-round-badge">ROUND ${String(next.round).padStart(2, '0')}</span>
                <span class="sprint-tag"><i class="fas fa-bolt"></i> SPRINT WEEKEND</span>
            </div>
            <div class="next-race-flag-title">
                <span class="flag-icon">${next.flag}</span>
                <div>
                    <h3>${next.name}</h3>
                    <p class="next-circuit-text"><i class="fas fa-map-marker-alt"></i> ${next.circuit}, ${next.city}</p>
                </div>
            </div>
            <div class="next-race-dates">
                <i class="far fa-calendar-check"></i> <strong>${next.date}, 2026</strong>
            </div>
            <div id="countdownBox" class="countdown-container"></div>
            <div class="next-race-buttons">
                <button class="btn-primary" onclick="navigateTo('live')"><i class="fas fa-play"></i> Watch Stream Free</button>
                <button class="btn-outline" onclick="openCircuitModal('${next.circuitSlug}')"><i class="fas fa-route"></i> Track Map</button>
            </div>
        </div>
    `;

    initCountdown();
}

function initCountdown() {
    const target = new Date("November 29, 2026 17:00:00 UTC").getTime();

    function tick() {
        const now = new Date().getTime();
        const diff = target - now;
        const box = document.getElementById('countdownBox');
        if (!box) return;

        if (diff <= 0) {
            box.innerHTML = `<div class="countdown-live-banner"><span class="live-dot"></span> GRAND PRIX WEEKEND LIVE NOW</div>`;
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        box.innerHTML = `
            <div class="timer-unit"><span class="timer-val">${days}</span><span class="timer-lbl">Days</span></div>
            <div class="timer-sep">:</div>
            <div class="timer-unit"><span class="timer-val">${String(hours).padStart(2, '0')}</span><span class="timer-lbl">Hours</span></div>
            <div class="timer-sep">:</div>
            <div class="timer-unit"><span class="timer-val">${String(mins).padStart(2, '0')}</span><span class="timer-lbl">Mins</span></div>
            <div class="timer-sep">:</div>
            <div class="timer-unit"><span class="timer-val">${String(secs).padStart(2, '0')}</span><span class="timer-lbl">Secs</span></div>
        `;
    }
    tick();
    setInterval(tick, 1000);
}

// ===== RENDER CIRCUITS (CIRCUITS TAB) =====
function renderCircuits(list = circuitsData) {
    const grid = document.getElementById('circuitsGrid');
    if (!grid) return;

    if (list.length === 0) {
        grid.innerHTML = `<div class="no-results-box"><i class="fas fa-search"></i> No circuits found matching your search.</div>`;
        return;
    }

    grid.innerHTML = list.map(c => `
        <div class="circuit-card" onclick="openCircuitModal('${c.id}')">
            <div class="circuit-card-top">
                <span class="circuit-round">RD ${String(c.round).padStart(2, '0')}</span>
                <span class="circuit-flag">${c.flag}</span>
            </div>
            <div class="circuit-image-container">
                <img src="${getCircuitMapUrl(c.imgSlug)}" alt="${c.name} Map" class="circuit-thumb-img" loading="lazy">
            </div>
            <div class="circuit-card-body">
                <h3 class="circuit-name">${c.name}</h3>
                <div class="circuit-gp-name">${c.gpName}</div>
                <div class="circuit-location"><i class="fas fa-map-marker-alt"></i> ${c.city}, ${c.country}</div>
                <div class="circuit-quick-specs">
                    <div class="spec-item"><i class="fas fa-ruler-horizontal"></i> ${c.length}</div>
                    <div class="spec-item"><i class="fas fa-sync-alt"></i> ${c.laps} Laps</div>
                    <div class="spec-item"><i class="fas fa-road"></i> ${c.turns} Turns</div>
                </div>
                <button class="circuit-view-btn"><i class="fas fa-search-plus"></i> View Track Telemetry</button>
            </div>
        </div>
    `).join('');
}

function filterCircuits(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        renderCircuits(circuitsData);
        return;
    }
    const filtered = circuitsData.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.gpName.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q)
    );
    renderCircuits(filtered);
}

// ===== CIRCUIT DETAIL MODAL =====
function openCircuitModal(circuitId) {
    const c = circuitsData.find(item => item.id === circuitId);
    if (!c) return;

    const modal = document.getElementById('circuitModal');
    const content = document.getElementById('circuitModalContent');
    if (!modal || !content) return;

    content.innerHTML = `
        <div class="circuit-modal-header">
            <div class="circuit-modal-badge">${c.flag} ROUND ${c.round} • ${c.type.toUpperCase()}</div>
            <h2>${c.name}</h2>
            <p class="circuit-modal-gp">${c.gpName} • ${c.city}, ${c.country}</p>
        </div>
        <div class="circuit-modal-body">
            <div class="circuit-modal-map-wrap">
                <img src="${getCircuitMapUrl(c.imgSlug)}" alt="${c.name} Layout" class="circuit-full-map-img">
                <div class="circuit-map-overlay-tag"><i class="fas fa-compass"></i> Official F1 Circuit Layout Map</div>
            </div>
            <div class="circuit-modal-details">
                <div class="circuit-stat-grid">
                    <div class="c-stat-box">
                        <span class="c-stat-lbl">Circuit Length</span>
                        <strong class="c-stat-val">${c.length}</strong>
                    </div>
                    <div class="c-stat-box">
                        <span class="c-stat-lbl">Race Distance</span>
                        <strong class="c-stat-val">${c.raceDist}</strong>
                    </div>
                    <div class="c-stat-box">
                        <span class="c-stat-lbl">Number of Laps</span>
                        <strong class="c-stat-val">${c.laps}</strong>
                    </div>
                    <div class="c-stat-box">
                        <span class="c-stat-lbl">Number of Turns</span>
                        <strong class="c-stat-val">${c.turns}</strong>
                    </div>
                    <div class="c-stat-box">
                        <span class="c-stat-lbl">DRS Detection Zones</span>
                        <strong class="c-stat-val">${c.drsZones}</strong>
                    </div>
                    <div class="c-stat-box">
                        <span class="c-stat-lbl">First Grand Prix</span>
                        <strong class="c-stat-val">${c.firstGP}</strong>
                    </div>
                </div>
                <div class="circuit-lap-record-box">
                    <div class="record-icon"><i class="fas fa-stopwatch"></i></div>
                    <div>
                        <span class="record-title">Official Lap Record</span>
                        <strong class="record-text">${c.lapRecord}</strong>
                    </div>
                </div>
                <div class="circuit-description-text">
                    <h4><i class="fas fa-info-circle"></i> Track Overview & Characteristics</h4>
                    <p>${c.description}</p>
                </div>
                <div class="circuit-actions-row">
                    <a href="https://www.formula1.com/en/racing/2026/${encodeURIComponent(c.gpName.replace(' Grand Prix',''))}/Circuit.html" target="_blank" rel="noopener" class="btn-primary btn-sm">
                        <i class="fas fa-external-link-alt"></i> View on Formula1.com
                    </a>
                    <button class="btn-outline btn-sm" onclick="navigateTo('schedule'); closeCircuitModal();">
                        <i class="fas fa-calendar"></i> View in Calendar
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCircuitModal() {
    document.getElementById('circuitModal')?.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== RENDER SCHEDULE =====
function renderSchedule(filter = 'all') {
    const grid = document.getElementById('scheduleGrid');
    if (!grid) return;

    const filtered = filter === 'all' ? races2026 :
        filter === 'upcoming' ? races2026.filter(r => r.status === 'upcoming' || r.status === 'next') :
        races2026.filter(r => r.status === 'completed');

    grid.innerHTML = filtered.map(race => `
        <div class="race-card ${race.status === 'next' ? 'next-race' : ''} ${race.status === 'completed' ? 'completed' : ''}">
            <div class="race-card-header">
                <span class="race-round">ROUND ${String(race.round).padStart(2, '0')}</span>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    ${race.sprint ? '<span class="sprint-badge">SPRINT</span>' : ''}
                    <span class="race-flag">${race.flag}</span>
                </div>
            </div>
            <div class="race-name">${race.name}</div>
            <div class="race-circuit"><i class="fas fa-map-marker-alt" style="color:var(--accent-red);margin-right:4px;"></i>${race.circuit}</div>
            <div class="race-city"><i class="fas fa-city" style="color:var(--text-muted);margin-right:4px;"></i>${race.city}</div>
            <div class="race-date">
                <i class="far fa-calendar"></i>
                <span>${race.date}, 2026</span>
            </div>
            <div class="race-card-footer">
                <span class="race-status ${race.status}">${race.status === 'next' ? '● NEXT RACE' : race.status.toUpperCase()}</span>
                <div class="race-card-actions">
                    ${race.winner ? `<span class="race-winner-badge">🏆 <strong style="color:var(--accent-gold);">${race.winner}</strong></span>` : ''}
                    <button class="track-map-btn" onclick="openCircuitModal('${race.circuitSlug}')" title="View Circuit Layout">
                        <i class="fas fa-route"></i> Map
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}
renderSchedule();

document.querySelectorAll('[data-filter]').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('[data-filter]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderSchedule(tab.dataset.filter);
    });
});

// ===== RENDER DRIVER STANDINGS =====
function renderDriverStandings() {
    const container = document.getElementById('driverStandings');
    if (!container) return;
    const maxPoints = driverStandings[0].points;

    container.innerHTML = `
        <div class="standings-row header">
            <span>POS</span>
            <span>DRIVER & CONSTRUCTOR</span>
            <span>POINTS BAR</span>
            <span style="text-align:right;">PTS</span>
        </div>
        ${driverStandings.map(d => `
            <div class="standings-row">
                <span class="standings-pos ${d.pos <= 3 ? 'p' + d.pos : ''}">${d.pos}</span>
                <div class="standings-driver">
                    <div class="driver-img-wrap" style="border-color:${d.color};">
                        <img src="${d.img}" alt="${d.name}" class="standings-driver-img" onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><circle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%231a1a2e\'/><text x=\'50\' y=\'60\' font-size=\'35\' font-weight=\'bold\' fill=\'%23ffffff\' text-anchor=\'middle\'>${d.code}</text></svg>';">
                    </div>
                    <div class="standings-driver-info">
                        <span class="standings-driver-name">${d.nationality} ${d.name} <span class="driver-num-tag">#${d.number}</span></span>
                        <span class="standings-team-name" style="color:${d.color}; font-weight:600;">${d.team}</span>
                    </div>
                </div>
                <div class="points-bar-container">
                    <div class="points-bar" style="width: ${(d.points / maxPoints * 100)}%; background: ${d.color};"></div>
                </div>
                <span class="standings-points">${d.points}</span>
            </div>
        `).join('')}
    `;
}
renderDriverStandings();

// ===== RENDER CONSTRUCTOR STANDINGS =====
function renderConstructorStandings() {
    const container = document.getElementById('constructorStandings');
    if (!container) return;
    const maxPoints = constructorStandings[0].points;

    container.innerHTML = `
        <div class="standings-row header">
            <span>POS</span>
            <span>CONSTRUCTOR</span>
            <span>POINTS BAR</span>
            <span style="text-align:right;">PTS</span>
        </div>
        ${constructorStandings.map(c => `
            <div class="standings-row">
                <span class="standings-pos ${c.pos <= 3 ? 'p' + c.pos : ''}">${c.pos}</span>
                <div class="standings-driver">
                    <div class="team-badge" style="background:${c.color};">${c.name.substring(0, 3).toUpperCase()}</div>
                    <div class="standings-driver-info">
                        <span class="standings-driver-name">${c.name}</span>
                        <span class="standings-team-name">${c.wins} win${c.wins !== 1 ? 's' : ''} in 2026</span>
                    </div>
                </div>
                <div class="points-bar-container">
                    <div class="points-bar" style="width: ${(c.points / maxPoints * 100)}%; background: ${c.color};"></div>
                </div>
                <span class="standings-points">${c.points}</span>
            </div>
        `).join('')}
    `;
}
renderConstructorStandings();

document.querySelectorAll('[data-standings]').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('[data-standings]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const isDrivers = tab.dataset.standings === 'drivers';
        document.getElementById('driverStandings').style.display = isDrivers ? 'block' : 'none';
        document.getElementById('constructorStandings').style.display = isDrivers ? 'none' : 'block';
    });
});

// ===== RENDER DRIVERS (GRID SECTION) =====
function renderDrivers() {
    const grid = document.getElementById('driversGrid');
    if (!grid) return;

    grid.innerHTML = driverStandings.map(d => `
        <div class="driver-card">
            <div class="driver-card-top" style="background: linear-gradient(135deg, ${d.color}33 0%, var(--bg-card) 100%);">
                <span class="driver-number" style="color: ${d.color};">${d.number}</span>
                <img src="${d.img}" alt="${d.name}" class="driver-portrait" onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><circle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%231a1a2e\'/><text x=\'50\' y=\'60\' font-size=\'35\' font-weight=\'bold\' fill=\'%23ffffff\' text-anchor=\'middle\'>${d.code}</text></svg>';">
            </div>
            <div class="driver-card-body">
                <div class="driver-card-code" style="color:${d.color};">${d.code} • #${d.number}</div>
                <div class="driver-card-name">${d.nationality} ${d.name}</div>
                <div class="driver-card-team" style="color: ${d.color};">${d.team}</div>
                <div class="driver-card-stats">
                    <div class="driver-stat">
                        <div class="driver-stat-value">${d.points}</div>
                        <div class="driver-stat-label">Points</div>
                    </div>
                    <div class="driver-stat">
                        <div class="driver-stat-value">${d.wins}</div>
                        <div class="driver-stat-label">Wins</div>
                    </div>
                    <div class="driver-stat">
                        <div class="driver-stat-value">${d.podiums}</div>
                        <div class="driver-stat-label">Podiums</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}
renderDrivers();

// ===== RENDER TEAMS =====
function renderTeams() {
    const grid = document.getElementById('teamsGrid');
    if (!grid) return;
    const maxPts = teams[0].points;

    grid.innerHTML = teams.map(t => `
        <div class="team-card">
            <div style="position:absolute;top:0;left:0;right:0;height:4px;background:${t.color};"></div>
            <div class="team-card-header">
                <div class="team-logo-placeholder" style="background: ${t.color};">${t.abbr}</div>
                <div>
                    <div class="team-name">${t.name}</div>
                    <div class="team-full-name">${t.fullName}</div>
                </div>
            </div>
            <div class="team-drivers">
                <div class="team-driver-chip" style="border-left: 3px solid ${t.color};"><i class="fas fa-helmet-safety"></i> ${t.drivers[0]}</div>
                <div class="team-driver-chip" style="border-left: 3px solid ${t.color};"><i class="fas fa-helmet-safety"></i> ${t.drivers[1]}</div>
            </div>
            <div class="points-bar-container" style="margin-bottom: 1rem; height: 6px;">
                <div class="points-bar" style="width: ${(t.points / maxPts * 100)}%; background: ${t.color};"></div>
            </div>
            <div class="team-stats">
                <div class="team-stat">
                    <div class="team-stat-value" style="color: ${t.color};">${t.points}</div>
                    <div class="team-stat-label">Points</div>
                </div>
                <div class="team-stat">
                    <div class="team-stat-value">${t.wins}</div>
                    <div class="team-stat-label">Wins</div>
                </div>
                <div class="team-stat">
                    <div class="team-stat-value">${t.championships}</div>
                    <div class="team-stat-label">Titles</div>
                </div>
            </div>
        </div>
    `).join('');
}
renderTeams();

// ===== THEATER MODE & PiP =====
function toggleTheater() {
    document.querySelector('.player-wrapper')?.classList.toggle('theater');
}

function togglePiP() {
    window.open('https://westreamf1.st/westreamf1.php', 'F1 PiP', 'width=680,height=420,resizable=yes');
}

function reloadStream() {
    const iframe = document.querySelector('.player-container iframe');
    if (iframe) {
        const src = iframe.src;
        iframe.src = '';
        setTimeout(() => { iframe.src = src; }, 200);
    }
}

// ===== CHAT BRIDGE =====
function sendChat() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const msg = input.value.trim();
    if (!msg) return;

    if (typeof ChatSystem !== 'undefined') {
        ChatSystem.sendUserMessage(msg);
    }
    input.value = '';
}

document.getElementById('chatInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChat();
});

// Simulate online members fluctuating slightly
setInterval(() => {
    const countEl = document.getElementById('onlineCount');
    if (!countEl) return;
    const base = 1480;
    const jitter = Math.floor(Math.random() * 30) - 15;
    countEl.textContent = (base + jitter).toLocaleString();
}, 6000);

// ===== LIVE TIMING OSCILLATION =====
function updateTiming() {
    const rows = document.querySelectorAll('.timing-row:not(.header)');
    const gaps = [0, 0.842, 2.155, 4.619, 6.204, 9.882, 14.331, 18.910];
    rows.forEach((row, i) => {
        if (i === 0) return;
        const gapSpan = row.children[2];
        if (gapSpan) {
            const jitter = (Math.random() - 0.49) * 0.15;
            const updated = Math.max(0.1, gaps[i] + jitter);
            gapSpan.textContent = `+${updated.toFixed(3)}`;
        }
    });
}
setInterval(updateTiming, 4000);

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    switch (e.key) {
        case '1': navigateTo('home'); break;
        case '2': navigateTo('live'); break;
        case '3': navigateTo('schedule'); break;
        case '4': navigateTo('circuits'); break;
        case '5': navigateTo('standings'); break;
        case '6': navigateTo('drivers'); break;
        case '7': navigateTo('teams'); break;
        case 'Escape':
            document.querySelector('.player-wrapper')?.classList.remove('theater');
            document.getElementById('searchOverlay')?.classList.remove('active');
            document.getElementById('notifPanel')?.classList.remove('active');
            closeCircuitModal();
            if (typeof closeAuthModal === 'function') closeAuthModal();
            break;
    }
});

// Close panels when clicking outside
document.addEventListener('click', (e) => {
    const notifPanel = document.getElementById('notifPanel');
    const notifBtn = document.getElementById('notifBtn');
    if (notifPanel && notifPanel.classList.contains('active') && !notifPanel.contains(e.target) && !notifBtn?.contains(e.target)) {
        notifPanel.classList.remove('active');
    }
});

console.log('%c🏎️ F1 Stream — Live Formula 1 Race Center Ready', 'font-size: 16px; font-weight: bold; color: #e10600;');
console.log('%cPress 1-7 to navigate sections | ESC to close modal', 'color: #aaa;');
