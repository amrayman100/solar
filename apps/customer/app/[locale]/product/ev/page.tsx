import { productPage } from "@/lib/render-product-page";

const page = productPage("ev");
export const generateMetadata = page.generateMetadata;
export default page.Page;
