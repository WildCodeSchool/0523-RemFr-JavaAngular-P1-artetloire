export class HeaderParam {
  constructor(
    public imgSrcMenu: String,
    public imgAltMenu: String,
    public imgSrcLogo: String,
    public imgAltLogo: String,
    public hrefLogo: String,
    public targetLogo: String,
  ) {}
}

const burgerVisible = new HeaderParam(
  "assets/icon/croix.png",
  "Menu burger visible",
  "assets/icon/handicap.png",
  "Lien vers une page Handicap",
  "https://www.parisinfo.com/accessibilite",
  "_blank"
);

const burgerHidden = new HeaderParam(
  "assets/icon/burger.png",
  "Menu burger caché",
  "assets/icon/logo_art-et-loire.png",
  "Logo Art-et-Loire",
  "/",
  "_self"
);

export const LIST_HEADER_VALUES = [burgerHidden, burgerVisible];
