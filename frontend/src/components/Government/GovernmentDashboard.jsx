import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

const GovernmentDashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');

  const schemes = [
    {
      title: 'PM-KISAN Yojana',
      startDate: '2025-01-10',
      description: 'Direct income support of ₹6,000 per year to farmers.',
    },
    {
      title: 'Soil Health Card Scheme',
      startDate: '2025-02-01',
      description: 'Provides farmers with soil nutrient details.',
    },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col relative"
      style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/10/93/93/88/360_F_1093938818_RawT5s8Hwo0264x9FASP2AdY8xu6JcSa.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark background overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 flex justify-center items-start px-4 py-10 min-h-screen">
        <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10">
          <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
            🏛️ Government Dashboard
          </h1>

          <Tabs>
            <TabsList>
              <TabsTrigger value="upload" activeTab={activeTab} setActiveTab={setActiveTab}>
                Upload Scheme
              </TabsTrigger>
              <TabsTrigger value="show" activeTab={activeTab} setActiveTab={setActiveTab}>
                Show Schemes
              </TabsTrigger>
            </TabsList>

            {/* Upload Form */}
            <TabsContent value="upload" activeTab={activeTab}>
              <Card className="bg-white">
                <CardContent>
                  <h2 className="text-2xl font-semibold mb-4 text-green-700">Upload New Scheme</h2>
                  <form className="flex flex-col gap-5">
                    <input
                      type="text"
                      placeholder="Scheme Title"
                      className="border border-green-400 p-3 rounded-md"
                    />
                    <input
                      type="date"
                      placeholder="Start Date"
                      className="border border-green-400 p-3 rounded-md"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      className="border border-green-400 p-3 rounded-md"
                    />
                    <textarea
                      placeholder="Description"
                      rows={3}
                      className="border border-green-400 p-3 rounded-md"
                    />
                    <input
                      type="file"
                      className="border border-green-400 p-3 rounded-md"
                    />
                    <div className="text-right">
                      <Button type="submit">Publish Scheme</Button>
                    </div>
                  </form>

                </CardContent>
              </Card>
            </TabsContent>

            {/* Show Schemes */}
            <TabsContent value="show" activeTab={activeTab}>
              <Card className="bg-white">
                <CardContent>
                  <h2 className="text-2xl font-semibold mb-4 text-green-700">Published Schemes</h2>
                  <ul className="space-y-4">
                    {schemes.map((scheme, index) => (
                      <li
                        key={index}
                        className="border border-green-300 rounded p-4 bg-white"
                      >
                        <h3 className="text-xl font-semibold text-green-800">{scheme.title}</h3>
                        <p className="text-sm text-gray-600">Start Date: {scheme.startDate}</p>
                        <p className="mt-2 text-gray-700">{scheme.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default GovernmentDashboard;
