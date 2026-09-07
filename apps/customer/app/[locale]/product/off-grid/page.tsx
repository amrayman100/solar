import { productPage } from "@/lib/render-product-page";

const page = productPage("off-grid");
export const generateMetadata = page.generateMetadata;
export default page.Page;
