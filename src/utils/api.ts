
// API utility functions for backend integration

export interface ResearchRequest {
  query: string;
  email: string;
}

export interface ResearchResponse {
  success: boolean;
  message: string;
  reportContent: string;
  email: string;
}

// This function will handle the communication with your Python backend
export const generateResearchReport = async (data: ResearchRequest): Promise<ResearchResponse> => {
  try {
    // Replace this URL with your actual Python backend endpoint
    const response = await fetch('/api/research', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error generating research report:', error);
    throw error;
  }
};

// Mock function for testing - remove this when you integrate with real backend
export const mockGenerateReport = async (data: ResearchRequest): Promise<ResearchResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    success: true,
    message: `Detailed report sent to ${data.email}`,
    reportContent: generateMockReportContent(data.query, data.email),
    email: data.email
  };
};

const generateMockReportContent = (query: string, email: string): string => {
  return `
    <div class="prose max-w-none">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Research Report: ${query}</h2>
      
      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <p class="text-blue-800"><strong>Report sent to:</strong> ${email}</p>
      </div>

      <h3 class="text-xl font-semibold text-gray-800 mb-3">Executive Summary</h3>
      <p class="text-gray-700 mb-4">This comprehensive analysis examines the topic "${query}" through multiple lenses, providing actionable insights and strategic recommendations.</p>

      <h3 class="text-xl font-semibold text-gray-800 mb-3">Key Findings</h3>
      <ul class="list-disc pl-6 text-gray-700 mb-4">
        <li>Market trends show significant growth potential in this area</li>
        <li>Current adoption rates indicate strong consumer interest</li>
        <li>Technology developments are accelerating implementation</li>
        <li>Regulatory environment remains favorable for expansion</li>
      </ul>

      <div class="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
        <h4 class="font-semibold text-green-800 mb-2">Recommendations</h4>
        <p class="text-green-700">Based on our analysis, we recommend focusing on emerging opportunities while maintaining awareness of potential challenges in the market.</p>
      </div>
    </div>
  `;
};
