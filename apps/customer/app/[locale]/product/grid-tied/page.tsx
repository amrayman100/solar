import { productPage } from "@/lib/render-product-page";

const page = productPage("grid-tied");
export const generateMetadata = page.generateMetadata;
export default page.Page;
