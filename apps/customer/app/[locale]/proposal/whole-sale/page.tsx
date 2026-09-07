import { productPage } from "@/lib/render-product-page";

const page = productPage("whole-sale");
export const generateMetadata = page.generateMetadata;
export default page.Page;
