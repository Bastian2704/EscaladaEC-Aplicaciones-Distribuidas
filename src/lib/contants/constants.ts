export enum Status {
	active = 'active',
	suspended = 'suspended',
	deleted = 'deleted'
}

export const provinces = [
	'Azuay',
	'Bolívar',
	'Cañar',
	'Carchi',
	'Chimborazo',
	'Cotopaxi',
	'El Oro',
	'Esmeraldas',
	'Galápagos',
	'Guayas',
	'Imbabura',
	'Loja',
	'Los Ríos',
	'Manabí',
	'Morona Santiago',
	'Napo',
	'Orellana',
	'Pastaza',
	'Pichincha',
	'Santa Elena',
	'Santo Domingo de los Tsáchilas',
	'Sucumbíos',
	'Tungurahua',
	'Zamora Chinchipe'
];

export const category = {
	'Escalada con Cuerda': [
		'Escalada deportiva',
		'Escalada tradicional (trad)',
		'Vía de varios largos (multi-pitch)',
		'Escalada en gran pared (big wall)'
	],
	'Escalada sin Cuerda': ['Boulder', 'Psicobloc (Deep Water Soloing)', 'Highball']
} as const;

export const categories = [
	'Escalada Deportiva (Cuerda)',
	'Escalada Sin Cuerda',
	'Escalada Tradicional'
];
export type Category =
	| 'Escalada Deportiva (Cuerda)'
	| 'Escalada Sin Cuerda'
	| 'Escalada Tradicional';

export const climbTypes = {
	'Escalada Deportiva (Cuerda)': [
		'Escala Deportiva',
		'Vía de Varios Largos',
		'Escalada en Gran Pared'
	],
	'Escalada Sin Cuerda': ['Boulder', 'Psicobloc', 'Highball'],
	'Escalada Tradicional': ['Escala Tradicional', 'Vía de Varios Largos', 'Escalada en Gran Pared']
};

export const climbGradeSystems = {
	'Escalada Deportiva (Cuerda)': ['Francesa', 'YDS'],
	'Escalada Sin Cuerda': ['VScale', 'Fontainebleau'],
	'Escalada Tradicional': ['British']
};

export type GradeSystems = 'Francesa' | 'YDS' | 'VScale' | 'Fontainebleau' | 'British';

export const gradeSystemsValues = {
	Francesa: [
'1', '2', '3', '4a', '4b', '4c', '5a', '5b', '5c', '6a', '6a+', '6b', '6b+', '6c', '6c/c+', '6c+', '7a', '7a+', '7b', '7b+', '7c', '7c+', '8a', '8a+', '8b', '8b+', '8c', '8c+', '9a', '9a+', '9b', '9b+', '9c'
	],
	YDS: [
		'2nd class', '3rd class', '4th class', '5.0-5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10a', '5.10b', '5.10c', '5.10d', '5.11a', '5.11b', '5.11c', '5.11d', '5.12a', '5.12b', '5.12c', '5.12d', '5.13a', '5.13b', '5.13c', '5.13d', '5.14a', '5.14b', '5.14c', '5.14d', '5.15a', '5.15b', '5.15c', '5.15d'

	],
	// V-Scale (Boulder)
	VScale: [
'V1', 'V2', 'V3', 'V3/4', 'V4', 'V4/5', 'V5', 'V5/6', 'V6', 'V7', 'V8', 'V8/9', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17'
	],
	// Fontainebleau (Boulder)
	Fontainebleau: [
		'5', '5+', '6A', '6A+', '6B', '6B+', '6C', '6C+', '7A', '7A+', '7B', '7B+', '7C', '7C+', '8A', '8A+', '8B', '8B+', '8C', '8C+', '9A'
	],

	British: [
		'Mod',
		'Diff',
		'VDiff',
		'HVD',
		'Sev',
		'HS',
		'VS',
		'HVS',
		'E1 5a',
		'E2 5b',
		'E3 5c',
		'E4 6a',
		'E5 6b',
		'E6 6b',
		'E7 6c',
		'E8 6c',
		'E9 7a',
		'E10 7b',
		'E11 7c'
	]
};

export const isValidCategory = (formCategory: string) => categories.includes(formCategory);

export const isValidType = (formCategory: string, formClimbType: string) => {
	if (!isValidCategory(formCategory)) {
		return false;
	}

	return climbTypes[formCategory as Category].includes(formClimbType);
};

export const isValidGradeSystem = (climbCategory: string, formGradeSystem: string) => {
	if (!isValidCategory(climbCategory)) {
		return false;
	}

	return climbGradeSystems[climbCategory as Category].includes(formGradeSystem);
};
export const isValidGradeSystemValue = (
	climbCategory: string,
	formGradeSystem: string,
	gradeSystemValue: string
) => {
	if (!isValidGradeSystem(climbCategory, formGradeSystem)) {
		return false;
	}

	return gradeSystemsValues[formGradeSystem as GradeSystems].includes(gradeSystemValue);
};
