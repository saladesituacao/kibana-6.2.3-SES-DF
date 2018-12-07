import { vislibColorMaps } from './colormaps';

export const truncatedColorMaps = {};
//export const numeroDeClasses = 4;

const colormaps = vislibColorMaps;
for (const key in colormaps) {
  if (colormaps.hasOwnProperty(key)) {
    //slice off lightest colors
    truncatedColorMaps[key] = colormaps[key].slice(Math.floor(colormaps[key].length / 4));
  }
}
