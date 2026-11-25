// ==========================================
// F1 STREAM — Circuits Database
// Formula 1 2026 Season Circuits & Telemetry
// Cross-referenced with Formula-Timer & Formula1.com
// https://formula-timer.com/circuit
// ==========================================

window.F1_CIRCUITS = [
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
        category: ["all", "street", "high-speed"],
        imgSlug: "Australia",
        // Formula-Timer Telemetry
        fullThrottle: "70%",
        elevationChange: "2.6 m",
        downforce: "Medium-High",
        tireStress: "Medium",
        gearShifts: 56,
        topSpeed: "332 km/h",
        brakingSeverity: "Hard",
        overtakeSpots: "Turn 1, Turn 3, Turn 9-10 chicane, Turn 11",
        description: "A fast, scenic circuit winding around Albert Park lake with rapid chicanes, high curb-riding and heavy braking zones.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–5)",
                desc: "High-speed blast down the pit straight into the tight Turn 1-2 chicane, followed by a DRS run into the heavy-braking Turn 3 right-hander."
            },
            sector2: {
                title: "Sector 2 (Turns 6–10)",
                desc: "The ultra-fast lakeside sweeping section. Turns 9-10 are taken flat out at over 250 km/h with high lateral G-forces."
            },
            sector3: {
                title: "Sector 3 (Turns 11–14)",
                desc: "Heavy braking into Turn 11 right-left complex, leading into the technical slow-speed final corners 13-14 onto the main straight."
            }
        }
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
        category: ["all", "permanent", "high-speed"],
        imgSlug: "China",
        // Formula-Timer Telemetry
        fullThrottle: "56%",
        elevationChange: "7.4 m",
        downforce: "Medium",
        tireStress: "High (Front-Left)",
        gearShifts: 51,
        topSpeed: "340 km/h",
        brakingSeverity: "Hard",
        overtakeSpots: "Turn 6 hairpin, Turn 14 hairpin at end of 1.2km straight",
        description: "Designed to resemble the Chinese character 'Shang', featuring the iconic snail turn 1-2-3 complex and a massive 1.2km back straight.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–4)",
                desc: "The famous 270-degree tightening 'snail curve' (Turns 1-2) which places extreme lateral load on front tyres as speed steadily bleeds off."
            },
            sector2: {
                title: "Sector 2 (Turns 5–10)",
                desc: "High-speed flowing direction changes through Turns 7-8 followed by heavy braking into the tight Turn 6 and Turn 9-10 hairpins."
            },
            sector3: {
                title: "Sector 3 (Turns 11–16)",
                desc: "Features the massive 1.2km back straight where cars hit 340 km/h with DRS before stomping the brakes into the Turn 14 hairpin."
            }
        }
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
        category: ["all", "permanent", "high-downforce"],
        imgSlug: "Japan",
        // Formula-Timer Telemetry
        fullThrottle: "67%",
        elevationChange: "40.4 m",
        downforce: "High",
        tireStress: "Very High",
        gearShifts: 46,
        topSpeed: "330 km/h",
        brakingSeverity: "Light",
        overtakeSpots: "Turn 1, Casio Triangle chicane (Turn 16)",
        description: "The ultimate driver's test: the only figure-of-eight track on the F1 calendar, famous for the sweeping 'Esses', Degner corners, and 130R.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–7)",
                desc: "The world-famous 'S Curves' (Turns 3-6) and Dunlop curve, demanding rhythmic car balance and relentless aerodynamic downforce."
            },
            sector2: {
                title: "Sector 2 (Turns 8–14)",
                desc: "The tricky Degner corners (Turns 8-9), crossing under the crossover bridge into the iconic double-apex hairpin and Spoon curve."
            },
            sector3: {
                title: "Sector 3 (Turns 15–18)",
                desc: "Flat-out 130R corner taken at 300+ km/h followed by brutal braking into the Casio Triangle chicane, the best overtaking spot."
            }
        }
    },
    {
        id: "miami",
        round: 4,
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
        category: ["all", "street"],
        imgSlug: "Miami",
        // Formula-Timer Telemetry
        fullThrottle: "58%",
        elevationChange: "7.0 m",
        downforce: "Medium",
        tireStress: "Medium-High",
        gearShifts: 62,
        topSpeed: "342 km/h",
        brakingSeverity: "Hard",
        overtakeSpots: "Turn 1, Turn 11, Turn 17 hairpin",
        description: "Wrapped around Hard Rock Stadium, blending flowing high-speed sections with a tight chicane beneath elevated expressway flyovers.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–8)",
                desc: "High-speed sweeping esses through Turns 4-7 inspired by Suzuka, testing aero grip in the humid Florida heat."
            },
            sector2: {
                title: "Sector 2 (Turns 9–16)",
                desc: "Long back straight leading into the ultra-tight, undulating Turns 14-15 chicane built beneath motorway overpasses."
            },
            sector3: {
                title: "Sector 3 (Turns 17–19)",
                desc: "A 1.3km DRS straight into the heavy braking Turn 17 hairpin, feeding back past the stadium paddock."
            }
        }
    },
    {
        id: "canada",
        round: 5,
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
        category: ["all", "street", "high-speed"],
        imgSlug: "Canada",
        // Formula-Timer Telemetry
        fullThrottle: "60%",
        elevationChange: "5.2 m",
        downforce: "Low",
        tireStress: "Medium",
        gearShifts: 58,
        topSpeed: "344 km/h",
        brakingSeverity: "Very Hard",
        overtakeSpots: "Turn 10 hairpin, Turn 13-14 chicane",
        description: "Set on Île Notre-Dame, a low-downforce stop-and-go circuit famous for aggressive kerb hopping and the infamous 'Wall of Champions'.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–5)",
                desc: "Heavy stop into Turn 1-2 Senna complex, followed by rapid acceleration through Turn 3-4 chicanes where walls are inches away."
            },
            sector2: {
                title: "Sector 2 (Turns 6–9)",
                desc: "Technical right-left chicane at Turns 6-7, leading down the straight into another rapid curb-jumping chicane at Turns 8-9."
            },
            sector3: {
                title: "Sector 3 (Turns 10–14)",
                desc: "Deep braking into the famous 180-degree hairpin (Turn 10), long Droit du Casino straight, and the Wall of Champions chicane."
            }
        }
    },
    {
        id: "monaco",
        round: 6,
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
        category: ["all", "street", "high-downforce"],
        imgSlug: "Monaco",
        // Formula-Timer Telemetry
        fullThrottle: "34%",
        elevationChange: "42.0 m",
        downforce: "Maximum",
        tireStress: "Very Low",
        gearShifts: 54,
        topSpeed: "292 km/h",
        brakingSeverity: "Medium",
        overtakeSpots: "Turn 1 (Sainte Devote), Nouvelle Chicane (Turn 10-11)",
        description: "The crown jewel of Formula 1. Extremely tight barriers, the iconic Fairmont hairpin, the tunnel, and the Swimming Pool chicane demand pinpoint accuracy.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–4)",
                desc: "Uphill blast from Sainte Devote through the curving Beau Rivage avenue into Massenet and Casino Square."
            },
            sector2: {
                title: "Sector 2 (Turns 5–11)",
                desc: "Downhill descent past Mirabeau, the ultra-slow Fairmont Hairpin (taken at 48 km/h), the Portier corners, and high-speed tunnel."
            },
            sector3: {
                title: "Sector 3 (Turns 12–19)",
                desc: "High-speed commitment through Tabac, the Swimming Pool chicane, and tight Rascasse and Anthony Noghes turns onto the straight."
            }
        }
    },
    {
        id: "barcelona-catalunya",
        round: 7,
        name: "Circuit de Barcelona-Catalunya",
        gpName: "Spanish Grand Prix (Catalunya)",
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
        category: ["all", "permanent", "high-downforce"],
        imgSlug: "Spain",
        // Formula-Timer Telemetry
        fullThrottle: "65%",
        elevationChange: "30.0 m",
        downforce: "High",
        tireStress: "Very High",
        gearShifts: 44,
        topSpeed: "338 km/h",
        brakingSeverity: "Medium-Hard",
        overtakeSpots: "Turn 1 (Elf chicane), Turn 10",
        description: "A benchmark test track with a blend of high, medium and low-speed corners, testing total aerodynamic efficiency and chassis balance.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–4)",
                desc: "Heavy braking at the end of the 1km pit straight into Turns 1-2, followed by the relentless uphill Turn 3 right-hander."
            },
            sector2: {
                title: "Sector 2 (Turns 5–9)",
                desc: "Downhill braking into Turn 5, tight left-right chicane, and the blind high-speed Turn 9 sweeping uphill."
            },
            sector3: {
                title: "Sector 3 (Turns 10–14)",
                desc: "Tight Turn 10 hairpin followed by sweeping high-speed final corners 13-14 with the chicane removed for pure aero speed."
            }
        }
    },
    {
        id: "austria",
        round: 8,
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
        category: ["all", "permanent", "high-speed"],
        imgSlug: "Austria",
        // Formula-Timer Telemetry
        fullThrottle: "77%",
        elevationChange: "65.0 m",
        downforce: "Medium-Low",
        tireStress: "Medium",
        gearShifts: 40,
        topSpeed: "334 km/h",
        brakingSeverity: "Very Hard",
        overtakeSpots: "Turn 1, Turn 3, Turn 4",
        description: "Short, ultra-fast lap in the Styrian mountains with three heavy uphill/downhill braking zones and rapid downhill sweepers.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–2)",
                desc: "Uphill braking into the 90-degree Turn 1 right-hander, accelerating up the steep mountain incline towards Turn 3."
            },
            sector2: {
                title: "Sector 2 (Turns 3–6)",
                desc: "Hard uphill stop at Turn 3 hairpin (prime overtaking zone), diving down to the fast Turn 4 and sweeping left-handers."
            },
            sector3: {
                title: "Sector 3 (Turns 7–10)",
                desc: "High-speed downhill double rights at Turns 9-10 where track limits and sausage kerbs punish the slightest mistake."
            }
        }
    },
    {
        id: "great_britain",
        round: 9,
        name: "Silverstone Circuit",
        gpName: "British Grand Prix",
        country: "Great Britain",
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
        category: ["all", "permanent", "high-downforce"],
        imgSlug: "Great_Britain",
        // Formula-Timer Telemetry
        fullThrottle: "76%",
        elevationChange: "11.3 m",
        downforce: "High",
        tireStress: "Very High",
        gearShifts: 42,
        topSpeed: "336 km/h",
        brakingSeverity: "Medium",
        overtakeSpots: "Brooklands (Turn 6), Stowe (Turn 15)",
        description: "The home of Formula 1. Ultra-high-speed sweeps including Copse, the Maggotts-Becketts-Chapel complex, and Stowe demand ultimate aero load.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–5)",
                desc: "Flat out through Abbey and Farm curves into the tight Village-The Loop arena complex and Wellington straight."
            },
            sector2: {
                title: "Sector 2 (Turns 6–14)",
                desc: "Copse corner (taken flat at 290 km/h) followed immediately by the legendary Maggotts-Becketts-Chapel roller-coaster sequence."
            },
            sector3: {
                title: "Sector 3 (Turns 15–18)",
                desc: "The Hangar Straight at 330+ km/h into Stowe corner, followed by Vale and Club corners overlooking the pit building."
            }
        }
    },
    {
        id: "belgium",
        round: 10,
        name: "Circuit de Spa-Francorchamps",
        gpName: "Belgian Grand Prix",
        country: "Belgium",
        city: "Spa-Francorchamps",
        flag: "🇧🇪",
        firstGP: 1950,
        laps: 44,
        length: "7.004 km",
        raceDist: "308.052 km",
        lapRecord: "1:46.286 (Valtteri Bottas, 2018)",
        turns: 19,
        drsZones: 2,
        type: "Permanent Circuit",
        category: ["all", "permanent", "high-speed"],
        imgSlug: "Belgium",
        // Formula-Timer Telemetry
        fullThrottle: "70%",
        elevationChange: "102.2 m",
        downforce: "Low-Medium",
        tireStress: "Very High",
        gearShifts: 44,
        topSpeed: "348 km/h",
        brakingSeverity: "Hard",
        overtakeSpots: "La Source (Turn 1), Les Combes (Turn 5), Bus Stop chicane",
        description: "The longest track on the calendar, winding through the Ardennes forest with massive 102m elevation changes and the legendary Eau Rouge.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–5)",
                desc: "Tight La Source hairpin leading into the compression of Eau Rouge, the crest of Raidillon, and the long Kemmel Straight."
            },
            sector2: {
                title: "Sector 2 (Turns 6–15)",
                desc: "Technical high-downforce winding section: Les Combes chicane, downhill Bruxelles hairpin, and the flat-out double-left Pouhon."
            },
            sector3: {
                title: "Sector 3 (Turns 16–19)",
                desc: "High-speed Blanchimont curve taken flat at 315 km/h, leading directly to the dramatic Bus Stop chicane before the finish line."
            }
        }
    },
    {
        id: "hungary",
        round: 11,
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
        category: ["all", "permanent", "high-downforce"],
        imgSlug: "Hungary",
        // Formula-Timer Telemetry
        fullThrottle: "55%",
        elevationChange: "35.0 m",
        downforce: "Maximum",
        tireStress: "Medium-High",
        gearShifts: 50,
        topSpeed: "318 km/h",
        brakingSeverity: "Medium-Hard",
        overtakeSpots: "Turn 1 downhill, Turn 2",
        description: "Often nicknamed 'Monaco without walls', a twisty, dusty, high-downforce natural amphitheatre where qualifying position is critical.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–3)",
                desc: "Downhill braking into Turn 1 from the main straight, swinging downhill into Turn 2 and sweeping right at Turn 3."
            },
            sector2: {
                title: "Sector 2 (Turns 4–11)",
                desc: "A relentless sequence of medium-speed corners with zero rest for the driver; includes blind fast Turn 4 and the chicane at Turns 6-7."
            },
            sector3: {
                title: "Sector 3 (Turns 12–14)",
                desc: "Hard stop into Turn 12, followed by two long, continuous 180-degree right and left curves leading back to the pit straight."
            }
        }
    },
    {
        id: "netherlands",
        round: 12,
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
        category: ["all", "permanent", "high-downforce"],
        imgSlug: "Netherlands",
        // Formula-Timer Telemetry
        fullThrottle: "60%",
        elevationChange: "15.0 m",
        downforce: "High",
        tireStress: "High",
        gearShifts: 48,
        topSpeed: "325 km/h",
        brakingSeverity: "Hard",
        overtakeSpots: "Tarzan (Turn 1), Hans Ernst Bocht (Turn 11)",
        description: "An old-school rollercoaster undulating through coastal sand dunes, featuring unique 18-degree steep banking at Hugenholtz and Arie Luyendyk bocht.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–3)",
                desc: "Famous Tarzan hairpin (Turn 1) followed by the dramatic 19-degree bowl-shaped banking of Hugenholtzbocht (Turn 3)."
            },
            sector2: {
                title: "Sector 2 (Turns 4–10)",
                desc: "Fast sweeping blind crest at Scheivlak taken at immense speed through sand dunes with zero run-off margin."
            },
            sector3: {
                title: "Sector 3 (Turns 11–14)",
                desc: "Hans Ernst chicane followed by the final banked corner Arie Luyendykbocht, taken with DRS open onto the straight."
            }
        }
    },
    {
        id: "italy",
        round: 13,
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
        category: ["all", "permanent", "high-speed"],
        imgSlug: "Italy",
        // Formula-Timer Telemetry
        fullThrottle: "80%",
        elevationChange: "12.8 m",
        downforce: "Minimum",
        tireStress: "Medium",
        gearShifts: 36,
        topSpeed: "356 km/h",
        brakingSeverity: "Extreme",
        overtakeSpots: "Variante del Rettifilo (Turn 1), Variante della Roggia (Turn 4)",
        description: "The 'Temple of Speed'. Cars run ultra-skinny rear wings, topping 350 km/h before stomping the brakes into the Rettifilo, Varianta della Roggia and Parabolica.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–3)",
                desc: "355 km/h blast down the Rettifilo Tribuna into the bone-jarring 70 km/h chicane, accelerating through the long Curva Grande."
            },
            sector2: {
                title: "Sector 2 (Turns 4–7)",
                desc: "Variante della Roggia chicane (heavy kerb-hopping) into the sweeping double Lesmo corners testing minimum wing grip."
            },
            sector3: {
                title: "Sector 3 (Turns 8–11)",
                desc: "Under the historic banked oval bridge into the Variante Ascari complex and the sweeping, legendary Curva Parabolica."
            }
        }
    },
    {
        id: "spain_madrid",
        round: 14,
        name: "Circuito de Madrid (IFEMA)",
        gpName: "Madrid Grand Prix",
        country: "Spain",
        city: "Madrid",
        flag: "🇪🇸",
        firstGP: 2026,
        laps: 57,
        length: "5.414 km",
        raceDist: "308.598 km",
        lapRecord: "1:34.237 (Kimi Antonelli, 2026)",
        turns: 22,
        drsZones: 3,
        type: "Hybrid Street Circuit",
        category: ["all", "street", "high-downforce"],
        imgSlug: "Spain",
        // Formula-Timer Telemetry
        fullThrottle: "60%",
        elevationChange: "18.0 m",
        downforce: "Medium-High",
        tireStress: "High",
        gearShifts: 64,
        topSpeed: "340 km/h",
        brakingSeverity: "Hard",
        overtakeSpots: "Turn 1, Turn 10, Turn 14",
        description: "Brand new 2026 hybrid circuit built around IFEMA with an iconic 13.5-degree banked Turn 12 'La Monumental' and pavilion tunnels.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–7)",
                desc: "Main straight blast into heavy braking at Turn 1, winding through the IFEMA pavilion forecourt chicanes."
            },
            sector2: {
                title: "Sector 2 (Turns 8–15)",
                desc: "Crosses over the expressway towards the spectacular 13.5-degree banked curve 'La Monumental' (Turn 12) at Valdebebas."
            },
            sector3: {
                title: "Sector 3 (Turns 16–22)",
                desc: "Sub-surface tunnel complex returning to the exhibition grounds with rapid technical direction changes."
            }
        }
    },
    {
        id: "azerbaijan",
        round: 15,
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
        category: ["all", "street", "high-speed"],
        imgSlug: "Baku",
        // Formula-Timer Telemetry
        fullThrottle: "73%",
        elevationChange: "24.0 m",
        downforce: "Low",
        tireStress: "Low-Medium",
        gearShifts: 70,
        topSpeed: "354 km/h",
        brakingSeverity: "Very Hard",
        overtakeSpots: "Turn 1, Turn 3, Turn 16",
        description: "Extreme contrasts: a razor-thin 7.6-meter medieval castle section juxtaposed with a massive 2.2km flat-out blast along the Caspian shoreline.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–6)",
                desc: "Four 90-degree street corners separated by DRS straightaways, creating chaotic dive-bomb overtaking opportunities."
            },
            sector2: {
                title: "Sector 2 (Turns 7–12)",
                desc: "Uphill squeeze past the 12th-century Old City fortress walls, narrowing down to an astonishing 7.6 meters width."
            },
            sector3: {
                title: "Sector 3 (Turns 13–20)",
                desc: "Downhill descent through Turn 15-16 into the longest full-throttle blast in F1 (2.2km) reaching speeds in excess of 350 km/h."
            }
        }
    },
    {
        id: "bahrain",
        round: 16,
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
        category: ["all", "permanent", "high-speed"],
        imgSlug: "Bahrain",
        // Formula-Timer Telemetry
        fullThrottle: "65%",
        elevationChange: "17.0 m",
        downforce: "Medium",
        tireStress: "Very High",
        gearShifts: 58,
        topSpeed: "336 km/h",
        brakingSeverity: "Very Hard",
        overtakeSpots: "Turn 1, Turn 4, Turn 11",
        description: "A night race in the desert known for abrasive asphalt, thrilling overtaking battles into Turns 1, 4, and 11, and intense tire degradation.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–4)",
                desc: "Heavy 330 km/h stop into Turn 1, immediate flick through Turn 2-3 uphill towards the wide braking zone of Turn 4."
            },
            sector2: {
                title: "Sector 2 (Turns 5–10)",
                desc: "Rapid downhill flick through Turns 5-6-7, leading to the notoriously tricky blind downhill Turn 9-10 braking lockup zone."
            },
            sector3: {
                title: "Sector 3 (Turns 11–15)",
                desc: "Fast sweeping Turn 11 onto the back straight, sharp braking into Turn 14 onto the long desert pit straight."
            }
        }
    },
    {
        id: "singapore",
        round: 17,
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
        category: ["all", "street", "high-downforce"],
        imgSlug: "Singapore",
        // Formula-Timer Telemetry
        fullThrottle: "48%",
        elevationChange: "5.3 m",
        downforce: "Maximum",
        tireStress: "High",
        gearShifts: 80,
        topSpeed: "315 km/h",
        brakingSeverity: "Very Hard",
        overtakeSpots: "Turn 1, Turn 7 (Memorial Corner), Turn 14",
        description: "The original night race. Brutal heat, 80%+ tropical humidity, and bumpy street tarmac make this physically the most demanding race on earth.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–5)",
                desc: "Start-finish straight into the Sheares corner (Turn 1-2-3 chicane) and blast through the Republic Boulevard."
            },
            sector2: {
                title: "Sector 2 (Turns 6–13)",
                desc: "Flat-out kink over Raffles Boulevard into the 90-degree Turn 7, tight Padang corners, and across the historic Anderson Bridge."
            },
            sector3: {
                title: "Sector 3 (Turns 14–19)",
                desc: "Turn 14 right-hander into the revamped fast straightaway bypassing the old grandstand underpasses to the finish."
            }
        }
    },
    {
        id: "usa",
        round: 18,
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
        category: ["all", "permanent", "high-downforce"],
        imgSlug: "USA",
        // Formula-Timer Telemetry
        fullThrottle: "62%",
        elevationChange: "41.0 m",
        downforce: "High",
        tireStress: "High",
        gearShifts: 56,
        topSpeed: "338 km/h",
        brakingSeverity: "Hard",
        overtakeSpots: "Turn 1 uphill, Turn 12",
        description: "Features a dramatic 41-meter blind uphill charge into Turn 1, followed by a fast esses section inspired by Silverstone and Hockenheim.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–6)",
                desc: "11% gradient climb to the blind apex of Turn 1, plunging into the rapid, high-downforce sweeping esses (Turns 3-6)."
            },
            sector2: {
                title: "Sector 2 (Turns 7–12)",
                desc: "Technical tight Turn 9-10 section onto the 1.1km back straight reaching 335 km/h before the hard Turn 12 braking zone."
            },
            sector3: {
                title: "Sector 3 (Turns 13–20)",
                desc: "Slow stadium section followed by the sweeping multi-apex quadruple right-hander (Turns 16-18) around the observation tower."
            }
        }
    },
    {
        id: "mexico",
        round: 19,
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
        category: ["all", "permanent", "high-speed"],
        imgSlug: "Mexico",
        // Formula-Timer Telemetry
        fullThrottle: "50%",
        elevationChange: "2.8 m (2,285m Alt.)",
        downforce: "Maximum Setup (Acts as Low)",
        tireStress: "Low-Medium",
        gearShifts: 46,
        topSpeed: "352 km/h",
        brakingSeverity: "Very Hard",
        overtakeSpots: "Turn 1, Turn 4",
        description: "Situated 2,200 meters above sea level where thin air reduces downforce and engine cooling, passing directly through the electric Foro Sol baseball stadium.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–3)",
                desc: "Massive 800m run from start into Turn 1 chicane; thin air means cars reach 350+ km/h despite maximum wing angles."
            },
            sector2: {
                title: "Sector 2 (Turns 4–11)",
                desc: "Turn 4-5-6 complex followed by the high-speed flowing esses section where lack of air density causes car sliding."
            },
            sector3: {
                title: "Sector 3 (Turns 12–17)",
                desc: "The world-famous Foro Sol stadium section: tight slow corners echoing with the cheers of 40,000 passionate Mexican fans."
            }
        }
    },
    {
        id: "brazil",
        round: 20,
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
        category: ["all", "permanent", "high-downforce"],
        imgSlug: "Brazil",
        // Formula-Timer Telemetry
        fullThrottle: "65%",
        elevationChange: "40.0 m",
        downforce: "Medium-High",
        tireStress: "High (Anti-Clockwise)",
        gearShifts: 42,
        topSpeed: "340 km/h",
        brakingSeverity: "Hard",
        overtakeSpots: "Senna S (Turn 1), Descida do Lago (Turn 4)",
        description: "A legendary bowl of amphitheatre motorsport run anti-clockwise, featuring the Senna 'S', Curva do Sol, and unpredictable tropical rainstorms.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–3)",
                desc: "Downhill plunge into the famous left-right Senna 'S', sweeping through Curva do Sol onto the Reta Oposta straight."
            },
            sector2: {
                title: "Sector 2 (Turns 4–11)",
                desc: "Descida do Lago (Turn 4) followed by the twisting infield section: Ferradura, Pinheirinho, and Bico de Pato."
            },
            sector3: {
                title: "Sector 3 (Turns 12–15)",
                desc: "Junção left-hander leading to the grueling uphill climb Subida dos Boxes, taken full throttle past the grandstands."
            }
        }
    },
    {
        id: "las_vegas",
        round: 21,
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
        category: ["all", "street", "high-speed"],
        imgSlug: "Las_Vegas",
        // Formula-Timer Telemetry
        fullThrottle: "78%",
        elevationChange: "5.0 m",
        downforce: "Low",
        tireStress: "Low-Medium (Cold Track)",
        gearShifts: 44,
        topSpeed: "352 km/h",
        brakingSeverity: "Extreme",
        overtakeSpots: "Turn 1, Turn 14 at end of Strip",
        description: "Racing under neon lights down the world-famous Las Vegas Boulevard past Bellagio, Caesars Palace, and the Sphere, reaching speeds of 350 km/h.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–5)",
                desc: "Pit straight into the tight Turn 1 hairpin, wrapping around the futuristic MSG Sphere through Turns 4-5."
            },
            sector2: {
                title: "Sector 2 (Turns 6–12)",
                desc: "Technical chicane onto the Koval Lane straight, swinging through the left-hander onto the Las Vegas Strip."
            },
            sector3: {
                title: "Sector 3 (Turns 13–17)",
                desc: "Massive 1.9km blast down the heart of the Strip past casino fountains, stomping the brakes into the Turn 14 chicane."
            }
        }
    },
    {
        id: "qatar",
        round: 22,
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
        category: ["all", "permanent", "high-downforce"],
        imgSlug: "Qatar",
        // Formula-Timer Telemetry
        fullThrottle: "68%",
        elevationChange: "6.0 m",
        downforce: "High",
        tireStress: "Extreme (High G)",
        gearShifts: 50,
        topSpeed: "338 km/h",
        brakingSeverity: "Medium",
        overtakeSpots: "Turn 1",
        description: "A relentless, fluid track designed for MotoGP with fast, continuous sweeping corners that impose intense lateral G-forces on drivers and tires.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–5)",
                desc: "1km start straight into heavy braking at Turn 1, launching into continuous, fast medium-speed flowing sweeps."
            },
            sector2: {
                title: "Sector 2 (Turns 6–11)",
                desc: "Slowest corner on the track (Turn 6 hairpin) quickly accelerating into demanding multi-apex high-G bends."
            },
            sector3: {
                title: "Sector 3 (Turns 12–16)",
                desc: "The brutal high-speed triple-apex right-hander (Turns 12-14) subjecting tyres and drivers' necks to 5+ lateral Gs."
            }
        }
    },
    {
        id: "abu_dhabi",
        round: 23,
        name: "Yas Marina Circuit",
        gpName: "Abu Dhabi Grand Prix",
        country: "Abu Dhabi",
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
        category: ["all", "permanent", "high-speed"],
        imgSlug: "Abu_Dhabi",
        // Formula-Timer Telemetry
        fullThrottle: "63%",
        elevationChange: "11.0 m",
        downforce: "Medium",
        tireStress: "Medium",
        gearShifts: 52,
        topSpeed: "338 km/h",
        brakingSeverity: "Hard",
        overtakeSpots: "Turn 5 hairpin, Turn 6 chicane, Turn 9 banked curve",
        description: "The traditional twilight season finale, racing from golden sunset into brilliant floodlights around Yas Island's glamorous megayacht marina.",
        sectors: {
            sector1: {
                title: "Sector 1 (Turns 1–5)",
                desc: "High-speed sweeping Turn 1-2, climbing towards the chicane and wide hairpin at Turn 5 leading to the main straight."
            },
            sector2: {
                title: "Sector 2 (Turns 6–9)",
                desc: "1.2km DRS straight into Turn 6-7 chicane, second back straight, and the sweeping banked Turn 9 hairpin."
            },
            sector3: {
                title: "Sector 3 (Turns 10–16)",
                desc: "Technical hotel and marina complex, threading between yachts and the LED-lit W Hotel with tricky off-camber apexes."
            }
        }
    }
];

// Helper to get official F1 Cloudinary Circuit Map URL
window.getCircuitMapUrl = function(slug) {
    if (!slug) return '';
    return `https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000001/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/${slug}_Circuit.webp`;
};
