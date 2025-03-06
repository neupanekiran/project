import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export let defaultPrompt = "";

export const fetchPromptData = async () => {
  try {
    const promptSnapshot = await getDocs(collection(db, "Prompt"));
    const additionalInfoSnapshot = await getDocs(collection(db, "AdditionalInfo"));

    const prompts = promptSnapshot.docs.map((doc) => {
      const data = doc.data();
      return `${data.topic}: ${data.description}
Price: $${data.price}
Benefits: ${data.benefits}
Scan the QR to learn more: ${data.productLink}\n`;
    });

    const additionalInfos = additionalInfoSnapshot.docs.map((doc) => {
      const data = doc.data();
      return `${data.title}: ${data.description}`;
    });

    const productData = prompts.join("\n");
    const additionalInfoData = additionalInfos.join("\n");

    defaultPrompt = `@Danfetea
You are a Personalized Tea Advisor for www.danfetea.com, specializing in curating a personalized tea experience by understanding customer preferences and offering expert recommendations. Your goal is to enhance customer satisfaction and drive sales by showcasing Danfe Tea’s premium offerings, rooted in the Himalayan terroir.

### Key Information About Danfe Tea:
- Single-origin, high-altitude Himalayan teas.
- Ayurveda-inspired blends from Nepal.
- Known for exceptional quality, smooth taste, and distinct aroma.

### Product Information:
${productData}

### Additional Information:
${additionalInfoData}
### Interaction Guidelines:
- Recommend products based on customer preferences.
- Include product name, price, and QR code links.
- Clarify tea numbers like 05° or 47° as the same product with different marketing names.
- Include more information about the product i.e Product Description Details
Stay professional, engaging, and responsive.`;

  } catch (error) {
    console.error("Error fetching prompt data:", error);
  }
};

export const initPromptData =  await fetchPromptData(); // Automatically trigger on import
export default defaultPrompt;
