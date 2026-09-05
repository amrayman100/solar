import { productPage } from "@/lib/render-product-page";

const page = productPage("solar-irrigation");
export const generateMetadata = page.generateMetadata;
export default page.Page;
