import { Global, css } from "@emotion/react";

export const GlobalStyles = () => (
  <Global
    styles={css`
      /* Styles de la scrollbar */
      ::-webkit-scrollbar {
        width: 10px; /* Largeur de la scrollbar */
      }
      ::-webkit-scrollbar-track {
        background: #f1f1f1; /* Couleur de fond */
        border-radius: 8px;
      }
      ::-webkit-scrollbar-thumb {
        background: #888; /* Couleur de la barre */
        border-radius: 6px; /* Coins arrondis */
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #555; /* Couleur au survol */
      }
      /* Masquer les flèches haut/bas */
      ::-webkit-scrollbar-button {
        display: none; /* Cache complètement les flèches */
        height: 0px; /* S'assure qu'elles ne prennent pas de place verticale */
        width: 0px; /* S'assure qu'elles ne prennent pas de place horizontale */
      }
    `}
  />
);
