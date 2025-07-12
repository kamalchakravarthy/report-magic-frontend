
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search, Mail, FileText, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('Best skills to learn in 2025');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [showReport, setShowReport] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim() || !email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both the search query and email address.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setShowReport(false);

    try {
      // This is where you'll integrate with your Python backend
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          email: email
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const data = await response.json();
      
      // Display the confirmation message
      toast({
        title: "Report Generated!",
        description: `Detailed report sent to ${email}`,
      });

      // Mock report content for now - replace this with actual backend response
      const mockReport = `
        <div class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Research Report: ${searchQuery}</h2>
          
          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <p class="text-blue-800"><strong>Report sent to:</strong> ${email}</p>
          </div>

          <h3 class="text-xl font-semibold text-gray-800 mb-3">Executive Summary</h3>
          <p class="text-gray-700 mb-4">Based on our comprehensive analysis of current market trends and future projections, we've identified the most valuable skills for 2025. This report provides detailed insights into emerging technologies, market demands, and career opportunities.</p>

          <h3 class="text-xl font-semibold text-gray-800 mb-3">Key Findings</h3>
          <ul class="list-disc pl-6 text-gray-700 mb-4">
            <li><strong>Artificial Intelligence & Machine Learning:</strong> Demand projected to grow 40% by 2025</li>
            <li><strong>Cloud Computing:</strong> Essential for 85% of new tech roles</li>
            <li><strong>Data Science & Analytics:</strong> Critical for decision-making across industries</li>
            <li><strong>Cybersecurity:</strong> High demand due to increasing digital threats</li>
            <li><strong>Digital Marketing:</strong> Evolution with AI-driven personalization</li>
          </ul>

          <h3 class="text-xl font-semibold text-gray-800 mb-3">Detailed Analysis</h3>
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 class="font-semibold text-gray-800 mb-2">1. Technical Skills</h4>
            <p class="text-gray-700">Programming languages like Python, JavaScript, and Go continue to dominate. Cloud platforms (AWS, Azure, GCP) are becoming mandatory for most technical roles.</p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 class="font-semibold text-gray-800 mb-2">2. Soft Skills</h4>
            <p class="text-gray-700">Critical thinking, adaptability, and cross-functional collaboration are increasingly valued as teams become more diverse and remote.</p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 class="font-semibold text-gray-800 mb-2">3. Emerging Technologies</h4>
            <p class="text-gray-700">Blockchain, IoT, AR/VR, and quantum computing are creating new opportunities for early adopters.</p>
          </div>

          <h3 class="text-xl font-semibold text-gray-800 mb-3">Recommendations</h3>
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <p class="text-green-800">Focus on developing a combination of technical expertise and soft skills. Consider specialized certifications in high-demand areas like AI/ML or cloud computing.</p>
          </div>
        </div>
      `;

      setReportContent(mockReport);
      setShowReport(true);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive"
      });
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">Research Intelligence</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate comprehensive research reports on any topic with AI-powered analysis
          </p>
        </div>

        {/* Main Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl text-gray-800">Start Your Research</CardTitle>
              <CardDescription className="text-gray-600">
                Enter your research topic and email to receive a detailed analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="query" className="text-sm font-medium text-gray-700 flex items-center">
                    <Search className="h-4 w-4 mr-2" />
                    Research Query
                  </Label>
                  <Input
                    id="query"
                    type="text"
                    placeholder="e.g., Best skills to learn in 2025"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-5 w-5" />
                      Generate Research Report
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Report Display */}
        {showReport && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                <CardTitle className="text-2xl text-gray-800 flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-blue-600" />
                  Research Report Generated
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Your comprehensive analysis is ready
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: reportContent }}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Section */}
        {!showReport && (
          <div className="max-w-6xl mx-auto mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Research Tool?</h2>
              <p className="text-gray-600 text-lg">Powered by advanced AI and comprehensive data analysis</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Comprehensive Analysis</h3>
                  <p className="text-gray-600">Deep dive into any topic with AI-powered research and analysis</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Email Delivery</h3>
                  <p className="text-gray-600">Receive detailed reports directly in your inbox for easy access</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Real-time Results</h3>
                  <p className="text-gray-600">Get instant access to your research findings and insights</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
