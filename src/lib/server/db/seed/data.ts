export const AREAS = [
  {
    key: "el-rodadero",
    name: "El Rodadero",
    province: "Pichincha",
    city: "Quito (Pifo)",
    description: "Escuela de escalada en roca muy cerca de Quito, zona Pifo.",
    latitude: -0.23048,
    longitude: -78.3258
  },
  {
    key: "cojitambo",
    name: "Cojitambo",
    province: "Imbabura",
    city: "Cojitambo",
    description:
      "Zona clásica de escalada en roca volcánica en Imbabura. Ofrece escalada deportiva, tradicional, vías de varios largos y boulder.",
    latitude: 0.3089,
    longitude: -78.2216
  },
  {
    key: "cuyuja",
    name: "Cuyuja",
    province: "Tungurahua",
    city: "Baños de Agua Santa",
    description:
      "Zona icónica de escalada en basalto columnar en la selva andina. Ofrece escalada deportiva, tradicional y vías de varios largos en columnas volcánicas.",
    latitude: -1.3919,
    longitude: -78.1182
  },
  {
    key: "tangan",
    name: "Columnas de Tangán",
    province: "Cotopaxi",
    city: "Sigchos",
    description:
      "Zona clásica de escalada tradicional en columnas de basalto cerca de Sigchos. Destaca por fisuras, diedros y vías de varios largos en ambiente andino.",
    latitude: -0.8045,
    longitude: -78.9012
  },
  {
    key: "cajas",
    name: "Parque Nacional Cajas",
    province: "Azuay",
    city: "Cuenca",
    description:
      "Zona de escalada alpina dentro del Parque Nacional Cajas. Predomina la escalada tradicional y de varios largos en ambiente de alta montaña.",
    latitude: -2.789,
    longitude: -79.235
  },
  {
    key: "san-juan",
    name: "San Juan",
    province: "Chimborazo",
    city: "Riobamba",
    description:
      "Zona de escalada deportiva en roca volcánica cerca de Riobamba. Destaca por rutas exigentes y técnicas en ambiente de cañón andino.",
    latitude: -1.64,
    longitude: -78.67
  }
] as const;
export const SECTORS = [
  // El Rodadero
  {
    key: "rodadero-zona-principal",
    areaKey: "el-rodadero",
    name: "El Rodadero zona principal",
    orientation: "Desconocida",
    description: "Sector principal listado para El Rodadero."
  },

  // Cojitambo
  {
    key: "cojitambo-muro-principal",
    areaKey: "cojitambo",
    name: "Muro Principal",
    orientation: "Desconocida",
    description: "Sector principal de Cojitambo con rutas deportivas clásicas."
  },
  {
    key: "cojitambo-los-diedros",
    areaKey: "cojitambo",
    name: "Los Diedros",
    orientation: "Desconocida",
    description: "Sector característico por sus diedros y fisuras. Predomina la escalada tradicional."
  },
  {
    key: "cojitambo-la-calavera",
    areaKey: "cojitambo",
    name: "La Calavera",
    orientation: "Desconocida",
    description: "Sector con rutas exigentes y problemas de boulder. Muy frecuentado por escaladores avanzados."
  },

  // Cuyuja
  {
    key: "cuyuja-las-columnas",
    areaKey: "cuyuja",
    name: "Las Columnas",
    orientation: "Desconocida",
    description: "Sector principal de Cuyuja con columnas de basalto y rutas clásicas de deportiva y varios largos."
  },
  {
    key: "cuyuja-la-cascada",
    areaKey: "cuyuja",
    name: "La Cascada",
    orientation: "Desconocida",
    description: "Sector con rutas deportivas técnicas en basalto, ubicado cerca de cascadas y vegetación densa."
  },
  {
    key: "cuyuja-el-mirador",
    areaKey: "cuyuja",
    name: "El Mirador",
    orientation: "Desconocida",
    description: "Sector elevado con rutas de varios largos y escalada tradicional, con vistas panorámicas."
  },

  // Tangán
  {
    key: "tangan-columna-norte",
    areaKey: "tangan",
    name: "Columna Norte",
    orientation: "N",
    description: "Sector con rutas largas y clásicas. Predominan fisuras y diedros continuos."
  },
  {
    key: "tangan-columna-sur",
    areaKey: "tangan",
    name: "Columna Sur",
    orientation: "S",
    description: "Sector con rutas tradicionales de menor longitud pero gran calidad de roca volcánica."
  },
  {
    key: "tangan-los-diedros",
    areaKey: "tangan",
    name: "Los Diedros",
    orientation: "Desconocida",
    description: "Sector por diedros y fisuras limpias. Escalada tradicional técnica."
  },

  // Cajas
  {
    key: "cajas-toreadora",
    areaKey: "cajas",
    name: "Laguna Toreadora",
    orientation: "Desconocida",
    description: "Zona cercana al acceso principal del parque. Escalada tradicional en placas y fisuras."
  },
  {
    key: "cajas-san-luis",
    areaKey: "cajas",
    name: "Cerro San Luis",
    orientation: "Desconocida",
    description: "Cerro rocoso con rutas alpinas de varios largos y escalada tradicional técnica."
  },
  {
    key: "cajas-domos-granito",
    areaKey: "cajas",
    name: "Domos de Granito",
    orientation: "Desconocida",
    description: "Formaciones de granito con placas extensas. Escalada tradicional técnica y mental."
  },

  // San Juan
  {
    key: "san-juan-canon-principal",
    areaKey: "san-juan",
    name: "Cañón Principal",
    orientation: "Desconocida",
    description: "Sector principal del área San Juan con rutas deportivas técnicas y sostenidas."
  },
  {
    key: "san-juan-la-cascada",
    areaKey: "san-juan",
    name: "La Cascada",
    orientation: "Desconocida",
    description: "Sector con rutas deportivas técnicas cerca de una cascada. Escalada precisa en roca volcánica."
  },
  {
    key: "san-juan-placas-altas",
    areaKey: "san-juan",
    name: "Placas Altas",
    orientation: "Desconocida",
    description: "Sector de placas técnicas con escalada de precisión y equilibrio."
  }
] as const;
export const CLIMBS = [
  // El Rodadero (estos 3 fueron los “reales” que listamos)
  {
    sectorKey: "rodadero-zona-principal",
    name: "El Alacran",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "Francesa",
    value: "6a+",
    requiredEquipment: "Arnés, casco, cuerda 60m, 8–12 cintas exprés."
  },
  {
    sectorKey: "rodadero-zona-principal",
    name: "Volqueta de Tierra",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "Francesa",
    value: "5+",
    requiredEquipment: "Arnés, casco, cuerda 60m, 8–12 cintas exprés."
  },
  {
    sectorKey: "rodadero-zona-principal",
    name: "El Puto Bolsaso",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "Francesa",
    value: "6a+",
    requiredEquipment: "Arnés, casco, cuerda 60m, 8–12 cintas exprés."
  },

  // Cojitambo – Muro Principal
  {
    sectorKey: "cojitambo-muro-principal",
    name: "Via del Sol",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "Francesa",
    value: "6a",
    requiredEquipment: "Arnés, casco, cuerda 60m, 10–12 cintas exprés."
  },
  {
    sectorKey: "cojitambo-muro-principal",
    name: "Gringo Loco",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "Francesa",
    value: "6b",
    requiredEquipment: "Arnés, casco, cuerda 60m, 12 cintas exprés."
  },
  {
    sectorKey: "cojitambo-muro-principal",
    name: "Inti Ñan",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "Francesa",
    value: "6c",
    requiredEquipment: "Arnés, casco, cuerda 60m, 12 cintas exprés."
  },
  {
    sectorKey: "cojitambo-muro-principal",
    name: "Condor Huasi",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "Francesa",
    value: "7a",
    requiredEquipment: "Arnés, casco, cuerda 70m, 14 cintas exprés."
  },

  // Cojitambo – Los Diedros (Trad)
  {
    sectorKey: "cojitambo-los-diedros",
    name: "Diedro Clásico",
    category: "Escalada Tradicional",
    climbType: "Escala Tradicional",
    gradeSystem: "YDS",
    value: "5.8",
    requiredEquipment: "Juego de friends, fisureros, casco, cuerda doble."
  },
  {
    sectorKey: "cojitambo-los-diedros",
    name: "Fisura Andina",
    category: "Escalada Tradicional",
    climbType: "Escala Tradicional",
    gradeSystem: "YDS",
    value: "5.9",
    requiredEquipment: "Friends medianos, fisureros, casco."
  },
  {
    sectorKey: "cojitambo-los-diedros",
    name: "Camino del Inca",
    category: "Escalada Tradicional",
    climbType: "Vía de Varios Largos",
    gradeSystem: "YDS",
    value: "5.10a",
    requiredEquipment: "Juego completo de friends, fisureros, cuerdas dobles."
  },

  // Cojitambo – La Calavera (Boulder)
  {
    sectorKey: "cojitambo-la-calavera",
    name: "Calavera Directa",
    category: "Escalada Sin Cuerda",
    climbType: "Boulder",
    gradeSystem: "VScale",
    value: "V4",
    requiredEquipment: "Crash pads, spotter."
  },
  {
    sectorKey: "cojitambo-la-calavera",
    name: "Mente Volcánica",
    category: "Escalada Sin Cuerda",
    climbType: "Boulder",
    gradeSystem: "VScale",
    value: "V6",
    requiredEquipment: "Crash pads, spotter."
  },
  {
    sectorKey: "cojitambo-la-calavera",
    name: "Sin Miedo",
    category: "Escalada Sin Cuerda",
    climbType: "Highball",
    gradeSystem: "VScale",
    value: "V5",
    requiredEquipment: "Múltiples crash pads, spotters."
  },

  // Cuyuja – Las Columnas
  {
    sectorKey: "cuyuja-las-columnas",
    name: "Via Clasica",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Vía de Varios Largos",
    gradeSystem: "YDS",
    value: "5.10a",
    requiredEquipment: "Arnés, casco, cuerda doble o 2x60m, 12–14 cintas exprés."
  },
  {
    sectorKey: "cuyuja-las-columnas",
    name: "Columna Central",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "YDS",
    value: "5.10b",
    requiredEquipment: "Arnés, casco, cuerda 70m, 14 cintas exprés."
  },
  {
    sectorKey: "cuyuja-las-columnas",
    name: "Basalto Puro",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "YDS",
    value: "5.11a",
    requiredEquipment: "Arnés, casco, cuerda 70m, 14–16 cintas exprés."
  },

  // Cuyuja – La Cascada
  {
    sectorKey: "cuyuja-la-cascada",
    name: "Lluvia Vertical",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "YDS",
    value: "5.9",
    requiredEquipment: "Arnés, casco, cuerda 60m, 10–12 cintas exprés."
  },
  {
    sectorKey: "cuyuja-la-cascada",
    name: "Selva Mojada",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "YDS",
    value: "5.10c",
    requiredEquipment: "Arnés, casco, cuerda 70m, 12–14 cintas exprés."
  },

  // Cuyuja – El Mirador (Trad/Multi)
  {
    sectorKey: "cuyuja-el-mirador",
    name: "Camino del Jaguar",
    category: "Escalada Tradicional",
    climbType: "Vía de Varios Largos",
    gradeSystem: "YDS",
    value: "5.9",
    requiredEquipment: "Juego completo de friends, fisureros, casco, cuerdas dobles."
  },
  {
    sectorKey: "cuyuja-el-mirador",
    name: "Espolon del Mirador",
    category: "Escalada Tradicional",
    climbType: "Escala Tradicional",
    gradeSystem: "YDS",
    value: "5.10b",
    requiredEquipment: "Friends medianos y grandes, fisureros, casco."
  },

  // Tangán – Columna Norte
  {
    sectorKey: "tangan-columna-norte",
    name: "Fisura Principal",
    category: "Escalada Tradicional",
    climbType: "Vía de Varios Largos",
    gradeSystem: "YDS",
    value: "5.9",
    requiredEquipment: "Juego completo de friends, fisureros, casco, cuerdas dobles."
  },
  {
    sectorKey: "tangan-columna-norte",
    name: "Chimenea Andina",
    category: "Escalada Tradicional",
    climbType: "Vía de Varios Largos",
    gradeSystem: "YDS",
    value: "5.10a",
    requiredEquipment: "Friends grandes, fisureros, casco, cuerdas dobles."
  },

  // Tangán – Columna Sur
  {
    sectorKey: "tangan-columna-sur",
    name: "Ruta del Pastor",
    category: "Escalada Tradicional",
    climbType: "Escala Tradicional",
    gradeSystem: "YDS",
    value: "5.8",
    requiredEquipment: "Friends medianos, fisureros, casco."
  },
  {
    sectorKey: "tangan-columna-sur",
    name: "Basalto Vivo",
    category: "Escalada Tradicional",
    climbType: "Escala Tradicional",
    gradeSystem: "YDS",
    value: "5.9",
    requiredEquipment: "Friends medianos y grandes, fisureros."
  },

  // Tangán – Los Diedros (British)
  {
    sectorKey: "tangan-los-diedros",
    name: "Diedro Central",
    category: "Escalada Tradicional",
    climbType: "Escala Tradicional",
    gradeSystem: "British",
    value: "VS",
    requiredEquipment: "Juego de friends, fisureros, casco."
  },
  {
    sectorKey: "tangan-los-diedros",
    name: "Diedro Oscuro",
    category: "Escalada Tradicional",
    climbType: "Escala Tradicional",
    gradeSystem: "British",
    value: "HVS",
    requiredEquipment: "Friends medianos, fisureros, casco."
  },

  // Cajas – Toreadora
  {
    sectorKey: "cajas-toreadora",
    name: "Fisura de la Laguna",
    category: "Escalada Tradicional",
    climbType: "Escala Tradicional",
    gradeSystem: "YDS",
    value: "5.8",
    requiredEquipment: "Juego de friends, fisureros, casco."
  },
  {
    sectorKey: "cajas-toreadora",
    name: "Placa Fría",
    category: "Escalada Tradicional",
    climbType: "Escala Tradicional",
    gradeSystem: "YDS",
    value: "5.9",
    requiredEquipment: "Friends pequeños, fisureros, casco."
  },

  // Cajas – San Luis
  {
    sectorKey: "cajas-san-luis",
    name: "Espolón Andino",
    category: "Escalada Tradicional",
    climbType: "Vía de Varios Largos",
    gradeSystem: "YDS",
    value: "5.10a",
    requiredEquipment: "Juego completo de friends, fisureros, casco, cuerdas dobles."
  },
  {
    sectorKey: "cajas-san-luis",
    name: "Ruta del Viento",
    category: "Escalada Tradicional",
    climbType: "Vía de Varios Largos",
    gradeSystem: "British",
    value: "VS",
    requiredEquipment: "Friends medianos, fisureros, casco, cuerdas dobles."
  },

  // Cajas – Domos de Granito
  {
    sectorKey: "cajas-domos-granito",
    name: "Placa del Silencio",
    category: "Escalada Tradicional",
    climbType: "Escala Tradicional",
    gradeSystem: "British",
    value: "HVS",
    requiredEquipment: "Friends pequeños, fisureros, casco."
  },
  {
    sectorKey: "cajas-domos-granito",
    name: "Linea Blanca",
    category: "Escalada Tradicional",
    climbType: "Escala Tradicional",
    gradeSystem: "YDS",
    value: "5.10b",
    requiredEquipment: "Friends pequeños y medianos, fisureros."
  },

  // San Juan – Cañón Principal
  {
    sectorKey: "san-juan-canon-principal",
    name: "Flecha Volcánica",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "Francesa",
    value: "7a",
    requiredEquipment: "Arnés, casco, cuerda 70m, 14–16 cintas exprés."
  },
  {
    sectorKey: "san-juan-canon-principal",
    name: "Resistencia Andina",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "Francesa",
    value: "7b",
    requiredEquipment: "Arnés, casco, cuerda 70m, 16 cintas exprés."
  },
  {
    sectorKey: "san-juan-canon-principal",
    name: "Cañón Rojo",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "Francesa",
    value: "7c",
    requiredEquipment: "Arnés, casco, cuerda 80m, 18 cintas exprés."
  },

  // San Juan – La Cascada
  {
    sectorKey: "san-juan-la-cascada",
    name: "Agua Negra",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "Francesa",
    value: "6c",
    requiredEquipment: "Arnés, casco, cuerda 70m, 14 cintas exprés."
  },
  {
    sectorKey: "san-juan-la-cascada",
    name: "Gota Final",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "Francesa",
    value: "7a+",
    requiredEquipment: "Arnés, casco, cuerda 70m, 16 cintas exprés."
  },

  // San Juan – Placas Altas
  {
    sectorKey: "san-juan-placas-altas",
    name: "Equilibrio Puro",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "Francesa",
    value: "6b+",
    requiredEquipment: "Arnés, casco, cuerda 60m, 12–14 cintas exprés."
  },
  {
    sectorKey: "san-juan-placas-altas",
    name: "Línea del Silencio",
    category: "Escalada Deportiva (Cuerda)",
    climbType: "Escala Deportiva",
    gradeSystem: "Francesa",
    value: "6c/c+",
    requiredEquipment: "Arnés, casco, cuerda 70m, 14 cintas exprés."
  }
] as const;
