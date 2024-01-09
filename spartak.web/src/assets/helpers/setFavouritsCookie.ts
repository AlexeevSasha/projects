export const setFavouritsCookie = (favourites?: string[]) => {
  document.cookie = `favourites=${favourites ? JSON.stringify(favourites) : "[];max-age=-1"};domain=${
    process.env.NEXT_PUBLIC_DOMAIN
  };path=/`;
};
