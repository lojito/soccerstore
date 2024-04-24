import balones from "./data/balones.json";
import camisetas from "./data/camisetas.json";
import chaquetas from "./data/chaquetas.json";
import espinilleras from "./data/espinilleras.json";
import guantes from "./data/guantes.json";
import medias from "./data/medias.json";
import shorts from "./data/shorts.json";
import tacos from "./data/tacos.json";

export default [
  ...balones,
  ...espinilleras,
  ...guantes,
  ...tacos,
  ...camisetas,
  ...medias,
  ...shorts,
  ...chaquetas,
];
