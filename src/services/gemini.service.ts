import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenerativeAI, GenerateContentRequest } from "@google/generative-ai";
import { ProductsService } from './product.service';
import { ProductTypeRepository } from '../repositories/productType.repository';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor(
    private readonly productService: ProductsService,
    private readonly productTypeRepository: ProductTypeRepository
  ) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new InternalServerErrorException('GEMINI_API_KEY is missing in environment variables.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async askGemini(prompt: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      // Get all products and product types
      const products = await this.productService.findAll();
      const productTypes = await this.productTypeRepository.findAll();

      // Create product type context
      const productTypeContext = productTypes.map(type => 
        `Category: ${type.name}\nDescription: ${type.description}`
      ).join('\n\n');

      // Create product context with more details
      const productContext = products.map(product => 
       `Product: ${product.name}
        Category: ${product.product_type_id}
        Price: ${product.price}đ
        Rating: ${product.product_rating}/5
        Description: ${product.description || 'Not specified'}
        Stock: ${product.stock}
        Supplier: ${product.Supplier}
        Volume: ${product.volume}ml
        Expiry Date: ${product.expired_date}
        Image URL: ${product.image_url || 'Not available'}`
      ).join('\n\n');

      const systemPrompt = `You are a skincare expert AI assistant for LumièreSkin. Here is our complete product catalog information:

      PRODUCT CATEGORIES:
      ${productTypeContext}

      PRODUCTS:
      ${productContext}

      Please provide recommendations based on our complete product catalog and your skincare expertise. Consider:
      1. Product categories and their purposes
      2. Product descriptions and benefits
      3. Price ranges
      4. Product ratings
      5. Stock availability
      6. Volume and expiry dates
      7. Supplier information

      User question: ${prompt}`;

      const request: GenerateContentRequest = {
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt }]
          }
        ]
      };

      const result = await model.generateContent(request);

      if (!result.response?.candidates?.length) {
        throw new InternalServerErrorException("Invalid response from Gemini API.");
      }

      return result.response.candidates[0].content.parts[0].text || "No response generated.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new InternalServerErrorException("Failed to get response from Gemini AI.");
    }
  }
}
