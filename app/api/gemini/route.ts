import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { hairType, stylingGoal, currentRoutine } = await req.json();

    if (!hairType || !stylingGoal) {
      return NextResponse.json({ error: "Missing required inputs" }, { status: 400 });
    }

    const systemInstruction = `You are a world-class premium salon creative director and lead engineering trichologist for PEGASUS Hair Tools. 
Analyze the customer's profile and generate a bespoke luxury hair styling ritual and technical product recommendation.
Always recommend Pegasus combs (Hard Rubber, Cellulose Acetate, or Ecowood) and highlight our proprietary technologies: FLEXINITE, GLAMLOCK, or STATICBLOCK.
Keep the tone elevated, sophisticated, reassuring, and highly professional — similar to the voice of Dyson, Aesop, or luxury fashion brands.`;

    const userPrompt = `Generate a customized luxury styling ritual and product recommendation for:
Hair Type: ${hairType}
Styling Goal: ${stylingGoal}
Current Daily Routine Complexity: ${currentRoutine || 'moderate'}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            routineTitle: {
              type: Type.STRING,
              description: "A highly sophisticated name for the custom routine, e.g., 'The Obsidian Sleek Ritual' or 'The Cellulose Volumizing Protocol'."
            },
            hairAnalysis: {
              type: Type.STRING,
              description: "An elegant, expert trichology analysis of their specific hair type and how it reacts to environmental triggers or friction."
            },
            pegasusToolRecommendation: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Specific Pegasus Comb model recommendation, e.g. 'Pegasus Fine-Tooth Styling Comb' or 'Pegasus Styling Rake'." },
                collection: { type: Type.STRING, description: "Which premium collection it belongs to: 'Cellulose Acetate', 'Hard Rubber (Vulcanite)', or 'Ecowood'." },
                whyItWorks: { type: Type.STRING, description: "Exquisite details on why this specific material and material-blend is perfect for their styling goal." },
                techUsed: { type: Type.STRING, description: "The core technology highlighted: either 'FLEXINITE (Responsive Elasticity)', 'GLAMLOCK (Cuticle Polish Rounded Tips)', or 'STATICBLOCK (Antistatic Matrix)'." }
              },
              required: ["name", "collection", "whyItWorks", "techUsed"]
            },
            morningRitualSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 highly curated steps for their luxurious morning styling routine."
            },
            eveningRitualSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 highly curated steps for scalp stimulation and overnight protective combing."
            },
            professionalStylingTip: {
              type: Type.STRING,
              description: "A signature, high-level insider tip used by elite session stylists in London, Paris, and Milan salons."
            }
          },
          required: [
            "routineTitle",
            "hairAnalysis",
            "pegasusToolRecommendation",
            "morningRitualSteps",
            "eveningRitualSteps",
            "professionalStylingTip"
          ]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response content received from Gemini API");
    }

    const data = JSON.parse(resultText);
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({
      error: "An error occurred while generating your bespoke styling routine. Please try again.",
      details: error.message
    }, { status: 500 });
  }
}
