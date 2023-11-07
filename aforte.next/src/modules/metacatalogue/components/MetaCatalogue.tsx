import { AlphabetResult } from "./AlphabetResult";
import { AlphabeticalLink } from "./AlphabeticalLink";
import { AlphabeticalSearch } from "./AlphabeticalSearch";
import { MetaCatalogueTags } from "./MetaCatalogueTags";
import { InstructionsUseMedicinalProduct } from "./InstructionsUseMedicinalProduct";
import { AnchorOfMedicinalProduct } from "./AnchorOfMedicinalProduct";
import { DescriptionsProduct } from "./DescriptionsProduct";
import { AnalogsFilter } from "./AnalogsFilter";

const MetaCatalogue = () => <></>;

MetaCatalogue.AlphabeticalSearch = AlphabeticalSearch;
MetaCatalogue.AlphabeticalLink = AlphabeticalLink;
MetaCatalogue.AlphabetResult = AlphabetResult;
MetaCatalogue.MetaCatalogueTags = MetaCatalogueTags;
MetaCatalogue.InstructionsUseMedicinalProduct = InstructionsUseMedicinalProduct;
MetaCatalogue.AnchorOfMedicinalProduct = AnchorOfMedicinalProduct;
MetaCatalogue.DescriptionsProduct = DescriptionsProduct;
MetaCatalogue.AnalogsFilter = AnalogsFilter;

export { MetaCatalogue };
