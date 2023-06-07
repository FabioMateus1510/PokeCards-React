import normalBackground from '../img/backgrounds/normalBackground.jpg';
import fireBackground from '../img/backgrounds/fireBackground.jpg';
import waterBackground from '../img/backgrounds/waterBackground.jpg';
import grassBackground from '../img/backgrounds/grassBackground.jpg';
import electricBackground from '../img/backgrounds/electricBackground.jpg';
import iceBackground from '../img/backgrounds/iceBackground.jpg';
import fightingBackground from '../img/backgrounds/fightingBackground.jpg';
import poisonBackground from '../img/backgrounds/poisonBackground.jpg';
import groundBackground from '../img/backgrounds/groundBackground.jpg';
import flyingBackground from '../img/backgrounds/flyingBackground.jpg';
import psychicBackground from '../img/backgrounds/psychicBackground.gif';
import bugBackground from '../img/backgrounds/bugBackground.jpg';
import rockBackground from '../img/backgrounds/rockBackground.jpg';
import ghostBackground from '../img/backgrounds/ghostBackground.jpg';
import dragonBackground from '../img/backgrounds/dragonBackground.gif';
import darkBackground from '../img/backgrounds/darkBackground.jpg';
import fairyBackground from '../img/backgrounds/fairyBackground.jpg';
import steelBackground from '../img/backgrounds/steelBackground.gif';

export const typeToImage = {
  bug: bugBackground,
  dark: darkBackground,
  dragon: dragonBackground,
  electric: electricBackground,
  fairy: fairyBackground,
  fighting: fightingBackground,
  fire: fireBackground,
  flying: flyingBackground,
  ghost: ghostBackground,
  grass: grassBackground,
  ground: groundBackground,
  ice: iceBackground,
  normal: normalBackground,
  poison: poisonBackground,
  psychic: psychicBackground,
  rock: rockBackground,
  steel: steelBackground,
  water: waterBackground,
};

const opacity = 0.85;

export const tipoCores = {
  bug: `rgba(0, 255, 0, ${opacity})`,
  dark: `rgba(0, 0, 0, ${opacity})`,
  dragon: `rgba(243, 78, 78, ${opacity})`,
  electric: `rgba(255, 255, 0, ${opacity})`,
  fairy: `rgba(253, 117, 237, ${opacity})`,
  fighting: `rgba(255, 140, 0, ${opacity})`,
  fire: `rgba(255, 0, 0, ${opacity})`,
  flying: `rgba(0, 136, 255, ${opacity})`,
  ghost: `rgba(238, 130, 238, ${opacity})`,
  grass: `rgba(0, 174, 0, ${opacity})`,
  ground: `rgba(149, 95, 62, ${opacity})`,
  ice: `rgba(225, 231, 228, ${opacity})`,
  normal: `rgba(245, 245, 220, ${opacity})`,
  poison: `rgba(198, 84, 255, ${opacity})`,
  psychic: `rgba(255, 192, 203, ${opacity})`,
  rock: `rgba(139, 139, 139, ${opacity})`,
  steel: `rgba(96, 96, 96, ${opacity})`,
  water: `rgba(64, 224, 208, ${opacity})`,
};
