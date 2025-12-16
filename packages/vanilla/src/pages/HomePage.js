import { productStore } from "../stores";
import { router, withLifecycle } from "../router";
import { loadProducts, loadProductsAndCategories } from "../services";
import { HomePageComponent } from "./common/HomePageComponent.js";

export const HomePage = withLifecycle(
  {
    onMount: () => {
      loadProductsAndCategories();
    },
    watches: [
      () => {
        const { search, limit, sort, category1, category2 } = router.query;
        return [search, limit, sort, category1, category2];
      },
      () => loadProducts(true),
    ],
  },
  () => {
    const productState = productStore.getState();
    const { search: searchQuery, limit, sort, category1, category2 } = router.query;
    const { products, loading, error, totalCount, categories } = productState;
    const category = { category1, category2 };
    const hasMore = products.length < totalCount;

    return HomePageComponent({
      search: { searchQuery, limit, sort, category, categories },
      productData: {
        products,
        loading,
        error,
        totalCount,
        hasMore,
      },
    });
  },
);
