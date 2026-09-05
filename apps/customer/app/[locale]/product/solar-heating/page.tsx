import { productPage } from "@/lib/render-product-page";

const page = productPage("solar-heating");
export const generateMetadata = page.generateMetadata;
export default page.Page;
