import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  const users = [
    { name: 'Utkarsh Patankar', role: 'Farmer', status: 'Active' },
    { name: ' Om Biradar', role: 'Vendor', status: 'Pending' },
    { name: 'Suraj kisve', role: 'Government', status: 'Disabled' },
  ];

  const logs = [
    'User Utkarsh logged in at 10:35 AM',
    'Scheme uploaded by Government Officer',
    'Vendor product listing approved',
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1603145733144-88bca6c76fef?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background dimmer */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 flex justify-center items-start px-4 py-10 min-h-screen">
        <div className="w-full max-w-6xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10">
          <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
            🛠️ Admin Dashboard
          </h1>

          <Tabs>
            <TabsList>
              <TabsTrigger value="users" activeTab={activeTab} setActiveTab={setActiveTab}>
                Manage Users
              </TabsTrigger>
              <TabsTrigger value="logs" activeTab={activeTab} setActiveTab={setActiveTab}>
                System Logs
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" activeTab={activeTab}>
              <Card className="bg-white">
                <CardContent>
                  <h2 className="text-2xl font-semibold mb-4 text-green-700">User Accounts</h2>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-green-800">
                        <th className="border-b border-green-300 pb-2">Name</th>
                        <th className="border-b border-green-300 pb-2">Role</th>
                        <th className="border-b border-green-300 pb-2">Status</th>
                        <th className="border-b border-green-300 pb-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index} className="text-gray-700">
                          <td className="py-2">{user.name}</td>
                          <td className="py-2">{user.role}</td>
                          <td className="py-2">{user.status}</td>
                          <td className="py-2 text-right space-x-2">
                            <Button className="px-3 py-1">Enable</Button>
                            <Button className="bg-red-600 hover:bg-red-700 px-3 py-1">
                              Disable
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Logs Tab */}
            <TabsContent value="logs" activeTab={activeTab}>
              <Card className="bg-white">
                <CardContent>
                  <h2 className="text-2xl font-semibold mb-4 text-green-700">System Activity Logs</h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {logs.map((log, index) => (
                      <li key={index}>{log}</li>
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

export default AdminDashboard;
