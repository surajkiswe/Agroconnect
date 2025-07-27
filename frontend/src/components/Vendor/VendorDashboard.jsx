import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div
      className="min-h-screen w-full flex flex-col relative"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/background/20250508/original/pngtree-agricultural-machinery-close-up-picture-image_15510678.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dim background */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 flex justify-center items-start px-4 py-10 min-h-screen">
        <div className="w-full max-w-6xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10">
          <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
            🚜 Vendor Dashboard
          </h1>

          <Tabs>
            <TabsList>
              <TabsTrigger value="products" activeTab={activeTab} setActiveTab={setActiveTab}>
                My Products
              </TabsTrigger>
              <TabsTrigger value="add" activeTab={activeTab} setActiveTab={setActiveTab}>
                Add Product
              </TabsTrigger>
              <TabsTrigger value="orders" activeTab={activeTab} setActiveTab={setActiveTab}>
                Orders
              </TabsTrigger>
            </TabsList>

            {/* My Products Tab */}
            <TabsContent value="products" activeTab={activeTab}>
              <Card className="bg-white">
                <CardContent>
                  <h2 className="text-2xl font-semibold mb-4 text-green-700">Listed Products</h2>
                  <p className="text-gray-700">No products added yet.</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add Product Tab */}
            <TabsContent value="add" activeTab={activeTab}>
              <Card className="bg-white">
                <CardContent>
                  <h2 className="text-2xl font-semibold mb-4 text-green-700">Add New Product</h2>
                  <form className="grid gap-5 md:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Product Name"
                      className="border border-green-400 p-3 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      className="border border-green-400 p-3 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      className="border border-green-400 p-3 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      className="border border-green-400 p-3 rounded-md"
                    />
                    <input
                      type="file"
                      className="border border-green-400 p-3 rounded-md md:col-span-2"
                    />
                    <div className="md:col-span-2 text-right">
                      <Button type="submit">Add Product</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" activeTab={activeTab}>
              <Card className="bg-white">
                <CardContent>
                  <h2 className="text-2xl font-semibold mb-4 text-green-700">Order History</h2>
                  <p className="text-gray-700">No orders yet.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
