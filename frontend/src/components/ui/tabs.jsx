export const Tabs = ({ children }) => <div>{children}</div>;

export const TabsList = ({ children, className = '' }) => (
  <div className={`flex justify-center space-x-4 mb-6 ${className}`}>{children}</div>
);

export const TabsTrigger = ({ value, activeTab, setActiveTab, children }) => {
  const isActive = value === activeTab;
  return (
    <button
      className={`px-4 py-2 rounded font-semibold ${
        isActive ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-800'
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, activeTab, children }) => {
  return value === activeTab ? <div>{children}</div> : null;
};
