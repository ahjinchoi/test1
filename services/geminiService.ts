
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { IRestaurant, IItinerary } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const restaurantResponseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            name: { type: Type.STRING, description: "맛집 이름" },
            category: { type: Type.STRING, description: "음식 종류 (예: 라멘, 스시, 모츠나베)" },
            description: { type: Type.STRING, description: "맛집에 대한 간단한 설명과 특징" }
        },
        required: ["name", "category", "description"]
    }
};

const itineraryResponseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            day: { type: Type.STRING, description: "여행 날짜 (예: 1일차 (8월 10일))" },
            theme: { type: Type.STRING, description: "그 날의 여행 테마" },
            morning: { type: Type.STRING, description: "오전 활동 계획" },
            afternoon: { type: Type.STRING, description: "오후 활동 계획" },
            evening: { type: Type.STRING, description: "저녁 활동 계획" }
        },
        required: ["day", "theme", "morning", "afternoon", "evening"]
    }
};


export const getRestaurantRecommendations = async (): Promise<IRestaurant[]> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "일본 후쿠오카의 꼭 가봐야 할 맛집 5곳을 추천해줘. 현지인과 관광객 모두에게 인기 있는 곳으로 다양하게 골라줘. 각 맛집의 이름, 대표 메뉴, 간단한 특징을 포함해서 목록을 만들어줘. 응답은 한국어로 해줘.",
            config: {
                responseMimeType: "application/json",
                responseSchema: restaurantResponseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as IRestaurant[];
    } catch (error) {
        console.error("Error fetching restaurant recommendations:", error);
        throw new Error("맛집 추천을 받아오는 데 실패했습니다.");
    }
};

export const getItineraryRecommendations = async (): Promise<IItinerary[]> => {
     try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "8월 10일부터 13일까지 3박 4일간의 일본 후쿠오카 여행 코스를 추천해줘. 매일 아침, 점심, 저녁 활동을 포함해서 상세하게 짜줘. 쇼핑, 자연, 역사적인 장소를 균형있게 포함하고, 각 날짜별 테마를 정해줘. 응답은 한국어로 해줘.",
            config: {
                responseMimeType: "application/json",
                responseSchema: itineraryResponseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as IItinerary[];
    } catch (error) {
        console.error("Error fetching itinerary recommendations:", error);
        throw new Error("여행 코스 추천을 받아오는 데 실패했습니다.");
    }
};
