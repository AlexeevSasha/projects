import { ProductListItem } from "./ProductListItem";
import { ProductListItemInCart } from "./ProductListItemInCart";
import { Favorites } from "./Favorites";
import { InstructionsUseProduct } from "./InstructionsUseProduct";
import { ProductDetailsCard } from "./ProductDetailsCard";
import { ProductCardPrice } from "./ProductCardPrice";
import { ProductAttributes } from "./ProductAttributes";
import { ProductAnalogue } from "./ProductAnalogue";
import { ProductCard } from "./ProductCard";
import { ReviewsProduct } from "./ReviewsProduct";
import { CardRecommendationCategory } from "./CardRecommendationCategory";
import { ProductsGrid } from "./ProductsGrid";
import { TagCards } from "./TagCards";
import { DescriptionSections } from "./DescriptionSections";
import { ProductSkeletonLoading } from "./ProductSceletonLoading";
import { ProductListItemModal } from "./ProductListItemModal";
import { ProductMobileBuy } from "./ProductMobileBuy";

const Product = () => <></>;

Product.ListItem = ProductListItem;
Product.ListItemInCart = ProductListItemInCart;
Product.Favorites = Favorites;
Product.InstructionsUseProduct = InstructionsUseProduct;
Product.DetailsCard = ProductDetailsCard;
Product.CardPrice = ProductCardPrice;
Product.Attributes = ProductAttributes;
Product.Analogue = ProductAnalogue;
Product.Reviews = ReviewsProduct;
Product.Card = ProductCard;
Product.CardRecommendationCategory = CardRecommendationCategory;
Product.ProductsGrid = ProductsGrid;
Product.TagCards = TagCards;
Product.DescriptionSections = DescriptionSections;
Product.ProductSkeletonLoading = ProductSkeletonLoading;
Product.ProductListItemModal = ProductListItemModal;
Product.ProductMobileBuy = ProductMobileBuy;

export { Product };
