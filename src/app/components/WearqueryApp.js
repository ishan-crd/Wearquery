"use client";

import React, { useState, createContext, useContext, useEffect } from "react";
import Image from "next/image"

// Mock data for professional demo
const mockOrders = [
  {
    id: "ORD-001",
    title: "Premium Wedding Suit",
    customer: "Rajesh Kumar",
    phone: "+91 9876543210",
    email: "rajesh.kumar@email.com",
    garmentType: "Gent Suit",
    fabric: "Premium Wool",
    status: "stitching",
    priority: "high",
    dueDate: "2025-06-15",
    orderDate: "2025-06-01",
    progress: 65,
    pricing: {
      basePrice: 8500,
      additionalCharges: 1500,
      discount: 500,
      totalAmount: 9500,
      advancePaid: 5000,
      balanceAmount: 4500,
    },
    notes: "Premium fabric, extra attention to details for wedding",
  },
  {
    id: "ORD-002",
    title: "Designer Anarkali Suit",
    customer: "Priya Sharma",
    phone: "+91 9876543211",
    email: "priya.sharma@email.com",
    garmentType: "Ladies Suit",
    fabric: "Silk Georgette",
    status: "cutting",
    priority: "medium",
    dueDate: "2025-06-18",
    orderDate: "2025-06-03",
    progress: 35,
    pricing: {
      basePrice: 6500,
      additionalCharges: 800,
      discount: 300,
      totalAmount: 7000,
      advancePaid: 3000,
      balanceAmount: 4000,
    },
    notes: "Heavy embroidery work on neckline and sleeves",
  },
  {
    id: "ORD-003",
    title: "Corporate Formal Shirts (3pc)",
    customer: "Amit Patel",
    phone: "+91 9876543212",
    email: "amit.patel@email.com",
    garmentType: "Gent Shirt",
    fabric: "Cotton",
    status: "ready",
    priority: "low",
    dueDate: "2025-06-10",
    orderDate: "2025-05-25",
    progress: 100,
    pricing: {
      basePrice: 2400,
      additionalCharges: 0,
      discount: 200,
      totalAmount: 2200,
      advancePaid: 2200,
      balanceAmount: 0,
    },
    notes: "Regular fit, 3 pieces - 2 white, 1 light blue",
  },
  {
    id: "ORD-004",
    title: "Traditional Lehenga",
    customer: "Meera Singh", 
    phone: "+91 9876543213",
    email: "meera.singh@email.com",
    garmentType: "Lehenga",
    fabric: "Silk with Zardozi",
    status: "measuring",
    priority: "high",
    dueDate: "2025-06-20",
    orderDate: "2025-06-05",
    progress: 15,
    pricing: {
      basePrice: 12000,
      additionalCharges: 2000,
      discount: 1000,
      totalAmount: 13000,
      advancePaid: 8000,
      balanceAmount: 5000,
    },
    notes: "Heavy work, festive occasion",
  },
  {
    id: "ORD-005",
    title: "Business Blazer",
    customer: "Vikram Joshi",
    phone: "+91 9876543214", 
    email: "vikram.joshi@email.com",
    garmentType: "Gent Suit",
    fabric: "Linen Blend",
    status: "finishing",
    priority: "medium",
    dueDate: "2025-06-12",
    orderDate: "2025-05-28",
    progress: 85,
    pricing: {
      basePrice: 4500,
      additionalCharges: 500,
      discount: 0,
      totalAmount: 5000,
      advancePaid: 2500,
      balanceAmount: 2500,
    },
    notes: "Slim fit, modern cut",
  },
];

const mockCustomers = [
  {
    id: "CUST-001",
    name: "Rajesh Kumar",
    phone: "+91 9876543210",
    email: "rajesh.kumar@email.com",
    address: "123 MG Road, Bangalore, Karnataka - 560001",
    totalOrders: 5,
    completedOrders: 4,
    totalSpent: 42500,
    rating: 5,
  },
  {
    id: "CUST-002",
    name: "Priya Sharma",
    phone: "+91 9876543211",
    email: "priya.sharma@email.com",
    address: "456 Park Street, Delhi, Delhi - 110001",
    totalOrders: 3,
    completedOrders: 2,
    totalSpent: 18500,
    rating: 4,
  },
  {
    id: "CUST-003",
    name: "Amit Patel",
    phone: "+91 9876543212",
    email: "amit.patel@email.com",
    address: "789 Commercial Street, Mumbai, Maharashtra - 400001",
    totalOrders: 8,
    completedOrders: 8,
    totalSpent: 28000,
    rating: 5,
  },
];

// App Context
const AppContext = createContext();

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

// Simple icons using Unicode symbols
const icons = {
  home: "🏠",
  scissors: "✂️",
  users: "👥",
  calendar: "📅",
  chart: "📊",
  settings: "⚙️",
  plus: "➕",
  search: "🔍",
  bell: "🔔",
  user: "👤",
  logout: "🚪",
  menu: "☰",
  close: "✖️",
  eye: "👁️",
  edit: "✏️",
  trash: "🗑️",
  clock: "🕐",
  check: "✅",
  alert: "⚠️",
  package: "📦",
  phone: "📞",
  mail: "✉️",
  location: "📍",
  dollar: "💰",
  trending: "📈",
  file: "📄",
  download: "⬇️",
  upload: "⬆️",
  arrow: "→",
  star: "⭐",
  message: "💬",
  ruler: "📏",
  cut: "🪡",
  needle: "🪡",
  iron: "🔧",
};

// Professional Wearquery App
const WearqueryApp = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
const [orders, setOrders] = useState(() => {
  if (typeof window !== 'undefined') {
    try {
      const savedOrders = localStorage.getItem('wearql_orders');
      return savedOrders ? JSON.parse(savedOrders) : mockOrders;
    } catch (error) {
      console.error('Failed to load orders:', error);
      return mockOrders;
    }
  }
  return mockOrders;
});
  const [customers, setCustomers] = useState(mockCustomers);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const [user] = useState({
    name: "Tailor Singh",
    email: "owner@singhtailors.com",
    business: "Singh Premium Tailors",
    role: "Owner",
  });

  const [settings, setSettings] = useState({
    businessName: "Singh Premium Tailors",
    email: "info@singhtailors.com",
    phone: "+91 9876543210",
    address: "123 Fashion Street, Delhi - 110001",
    notifications: true,
    emailAlerts: true,
    smsAlerts: true,
  });

    useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('wearql_orders', JSON.stringify(orders));
      } catch (error) {
        console.error('Failed to save orders:', error);
      }
    }
  }, [orders]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              progress: getProgressByStatus(newStatus),
            }
          : order
      )
    );
  };

  const getProgressByStatus = (status) => {
    const progressMap = {
      measuring: 15,
      cutting: 35,
      stitching: 65,
      finishing: 85,
      ready: 100,
    };
    return progressMap[status] || 0;
  };

  const addNewOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      ...orderData,
      status: "measuring",
      progress: 15,
      orderDate: new Date().toISOString().split("T")[0],
      pricing: {
        basePrice: 0,
        additionalCharges: 0,
        discount: 0,
        totalAmount: 0,
        advancePaid: 0,
        balanceAmount: 0,
      },
    };
    setOrders((prev) => [newOrder, ...prev]);
    alert("Order created successfully!");
  };

  const getAnalytics = () => {
    const totalOrders = orders.length;
    const completedOrders = orders.filter((o) => o.status === "ready").length;
    const inProgressOrders = orders.filter((o) => o.status !== "ready").length;
    const urgentOrders = orders.filter((o) => o.priority === "high").length;
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.pricing.totalAmount,
      0
    );
    const pendingPayments = orders.reduce(
      (sum, order) => sum + order.pricing.balanceAmount,
      0
    );

    return {
      totalOrders,
      completedOrders,
      inProgressOrders,
      urgentOrders,
      totalRevenue,
      pendingPayments,
      completionRate:
        totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0,
      avgOrderValue:
        totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0,
    };
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        orders,
        setOrders,
        customers,
        setCustomers,
        showOrderModal,
        setShowOrderModal,
        showCustomerModal,
        setShowCustomerModal,
        updateOrderStatus,
        addNewOrder,
        getAnalytics,
        user,
        settings,
        setSettings,
      }}
    >
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 lg:ml-0">
          <Header setSidebarOpen={setSidebarOpen} />
          <MainContent />   
        </div>

        {showOrderModal && <OrderModal />}
        {showCustomerModal && <CustomerModal />}
      </div>
    </AppContext.Provider>
  );
};

// Sidebar Component
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { currentView, setCurrentView, user, settings } = useApp();

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: icons.home },
    { id: "orders", name: "Orders", icon: icons.scissors, badge: "3" },
    { id: "customers", name: "Customers", icon: icons.users },
    { id: "calendar", name: "Calendar", icon: icons.calendar },
    { id: "analytics", name: "Analytics", icon: icons.chart },
    { id: "settings", name: "Settings", icon: icons.settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/80 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center text-2xl">
                <Image 
  src="/WearQL-logo.png" 
  alt="WearQL Logo" 
  width={40} 
  height={40}
  className="rounded-lg"
/>
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-bold text-white">WearQL</h1>
                <p className="text-xs text-blue-100">Pro Edition</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-white hover:bg-white/20 rounded text-xl"
            >
              {icons.close}
            </button>
          </div>

          {/* Business Info */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">
              {settings.businessName}
            </h3>
            <p className="text-xs text-gray-500">
              {settings.address.split(",")[0]}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 text-left rounded-lg transition-all duration-200
                  ${
                    currentView === item.id
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg">
                {icons.user}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors text-lg">
                {icons.logout}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Header Component
const Header = ({ setSidebarOpen }) => {
  const { user, getAnalytics, setShowOrderModal } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const analytics = getAnalytics();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16">
      <div className="px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 text-xl"
          >
            {icons.menu}
          </button>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {icons.search}
              </span>
              <input
                type="text"
                placeholder="Search orders, customers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-gray-500 relative text-xl"
              >
                <Image 
  src="/notifications.png" 
  alt="notifications" 
  width={30} 
  height={30}
  className="rounded-lg"
/>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="h-2 w-2 bg-red-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Urgent: Wedding suit due soon
                          </p>
                          <p className="text-xs text-gray-500">
                            Rajesh Kumar - Premium Wedding Suit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                {icons.user}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Main Content Component
const MainContent = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "orders":
        return <OrdersView />;
      case "customers":
        return <CustomersView />;
      case "calendar":
        return <CalendarView />;
      case "analytics":
        return <AnalyticsView />;
      case "settings":
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  return <main className="p-4 sm:p-6 pt-2 sm:pt-4">{renderView()}</main>;
};

// Dashboard Component
const Dashboard = () => {
  const { orders, setShowOrderModal, setCurrentView, getAnalytics } = useApp();
  const analytics = getAnalytics();

  const recentOrders = orders.slice(0, 3);
  const urgentOrders = orders
    .filter((o) => o.priority === "high" && o.status !== "ready")
    .slice(0, 3);

  const statsCards = [
    {
      title: "Total Orders",
      value: analytics.totalOrders,
      icon: icons.package,
    },
    {
      title: "Revenue",
      value: `₹${analytics.totalRevenue.toLocaleString()}`,
      icon: icons.dollar,
    },
    {
      title: "In Progress",
      value: analytics.inProgressOrders,
      icon: icons.clock,
    },
    {
      title: "Completion Rate",
      value: `${analytics.completionRate}%`,
      icon: icons.trending,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <button
          onClick={() => setShowOrderModal(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center mt-4 sm:mt-0"
        >
          <span className="mr-2">{icons.plus}</span>
          New Order
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-2 sm:p-3 rounded-lg ${stat.color} text-white text-xl sm:text-2xl`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Orders
              </h3>
              <button
                onClick={() => setCurrentView("orders")}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                View all <span className="ml-1">{icons.arrow}</span>
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-100 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                      {order.title}
                    </h4>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-500 mb-3 space-y-1 sm:space-y-0">
                    <span className="flex items-center">
                      <span className="mr-1">{icons.user}</span>
                      {order.customer}
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">{icons.calendar}</span>
                      Due: {order.dueDate}
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">{icons.dollar}</span>₹
                      {order.pricing.totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${order.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 inline-block">
                    {order.progress}% complete
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Urgent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-red-500 mr-2">{icons.alert}</span>
              Urgent Orders
            </h3>
            <div className="space-y-3">
              {urgentOrders.length > 0 ? (
                urgentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <p className="font-medium text-gray-900 text-sm">
                      {order.customer}
                    </p>
                    <p className="text-xs text-gray-600">{order.garmentType}</p>
                    <p className="text-xs text-red-600 font-medium">
                      Due: {order.dueDate}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No urgent orders</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowOrderModal(true)}
                className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-blue-600 mr-3 text-lg">
                    {icons.plus}
                  </span>
                  <div>
                    <div className="font-medium text-blue-700">
                      Add New Order
                    </div>
                    <div className="text-xs text-blue-600">
                      Create a new tailoring order
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setCurrentView("customers")}
                className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-green-600 mr-3 text-lg">
                    {icons.users}
                  </span>
                  <div>
                    <div className="font-medium text-green-700">
                      Manage Customers
                    </div>
                    <div className="text-xs text-green-600">
                      View customer details
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Business Summary */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 sm:p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Business Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-100 text-sm">Monthly Revenue</span>
                <span className="font-semibold text-sm sm:text-base">
                  ₹{analytics.totalRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100 text-sm">Avg Order Value</span>
                <span className="font-semibold text-sm sm:text-base">
                  ₹{analytics.avgOrderValue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100 text-sm">Pending Payments</span>
                <span className="font-semibold text-sm sm:text-base">
                  ₹{analytics.pendingPayments.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    measuring: { color: "bg-yellow-100 text-yellow-800", text: "Measuring" },
    cutting: { color: "bg-blue-100 text-blue-800", text: "Cutting" },
    stitching: { color: "bg-purple-100 text-purple-800", text: "Stitching" },
    finishing: { color: "bg-orange-100 text-orange-800", text: "Finishing" },
    ready: { color: "bg-green-100 text-green-800", text: "Ready" },
  };

  const config = statusConfig[status] || statusConfig.measuring;

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.text}
    </span>
  );
};

// KANBAN ORDERS VIEW COMPONENT
const OrdersView = () => {
  const { orders, setOrders, setShowOrderModal, updateOrderStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("kanban"); // "kanban" or "table"
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState(null);

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.garmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Kanban columns configuration
  const kanbanColumns = [
    { 
      id: "measuring", 
      title: "Measuring", 
      icon: icons.ruler,
      color: "bg-yellow-50 border-yellow-200",
      headerColor: "bg-yellow-100 text-yellow-800"
    },
    { 
      id: "cutting", 
      title: "Cutting", 
      icon: icons.cut,
      color: "bg-blue-50 border-blue-200", 
      headerColor: "bg-blue-100 text-blue-800"
    },
    { 
      id: "stitching", 
      title: "Stitching", 
      icon: icons.needle,
      color: "bg-purple-50 border-purple-200",
      headerColor: "bg-purple-100 text-purple-800"
    },
    { 
      id: "finishing", 
      title: "Finishing", 
      icon: icons.iron,
      color: "bg-orange-50 border-orange-200",
      headerColor: "bg-orange-100 text-orange-800"
    },
    { 
      id: "ready", 
      title: "Complete", 
      icon: icons.check,
      color: "bg-green-50 border-green-200",
      headerColor: "bg-green-100 text-green-800"
    },
  ];

  // Group orders by status for kanban
  const ordersByStatus = kanbanColumns.reduce((acc, column) => {
    acc[column.id] = filteredOrders.filter(order => order.status === column.id);
    return acc;
  }, {});

  // Drag and drop handlers
  const handleDragStart = (e, order, fromColumn) => {
    setDraggedItem(order);
    setDraggedFromColumn(fromColumn);
    e.dataTransfer.effectAllowed = 'move';
    
    // Add visual feedback to the dragged element
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedItem(null);
    setDraggedFromColumn(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, toColumn) => {
    e.preventDefault();
    
    if (draggedItem && draggedFromColumn && draggedFromColumn !== toColumn) {
      // Update the order status
      updateOrderStatus(draggedItem.id, toColumn);
    }
    
    setDraggedItem(null);
    setDraggedFromColumn(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "border-l-4 border-red-500";
      case "medium": return "border-l-4 border-yellow-500";
      case "low": return "border-l-4 border-green-500";
      default: return "border-l-4 border-gray-300";
    }
  };

  const getPriorityDot = (priority) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all your tailoring orders
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === "kanban" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              📋 Kanban
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === "table" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              📊 Table
            </button>
          </div>
          
          <button
            onClick={() => setShowOrderModal(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center"
          >
            <span className="mr-2">{icons.plus}</span>
            New Order
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icons.search}
          </span>
          <input
            type="text"
            placeholder="Search orders by customer, garment type, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === "kanban" ? (
        // KANBAN VIEW
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              📋 Order Progress Board
            </h2>
            <div className="text-sm text-gray-500">
              Drag orders between columns to update their progress
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 overflow-x-auto min-h-96">
            {kanbanColumns.map(column => {
              const columnOrders = ordersByStatus[column.id] || [];
              
              return (
                <div
                  key={column.id}
                  className={`${column.color} rounded-lg border-2 border-dashed p-4 min-h-96`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column.id)}
                >
                  {/* Column Header */}
                  <div className={`${column.headerColor} rounded-lg p-3 mb-4 flex items-center justify-between`}>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{column.icon}</span>
                      <h3 className="font-semibold">{column.title}</h3>
                    </div>
                    <span className="bg-white px-2 py-1 rounded-full text-xs font-medium">
                      {columnOrders.length}
                    </span>
                  </div>

                  {/* Order Cards */}
                  <div className="space-y-3">
                    {columnOrders.map(order => {
  const daysUntilDue = getDaysUntilDue(order.dueDate);
  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;

  return (
    <div
      key={order.id}
      draggable
      onDragStart={(e) => handleDragStart(e, order, column.id)}
      onDragEnd={handleDragEnd}
      className={`bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-all duration-200 ${getPriorityColor(order.priority)}`}
    >
      {/* Order Header - Clean and minimal */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-gray-500">{order.id}</span>
          <div className={`w-1.5 h-1.5 rounded-full ${getPriorityDot(order.priority)}`} />
        </div>
        <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${
          isOverdue ? 'bg-red-100 text-red-700' :
          isDueSoon ? 'bg-amber-100 text-amber-700' :
          'bg-gray-100 text-gray-600'
        }`}>
          {isOverdue ? `${Math.abs(daysUntilDue)}d late` :
           isDueSoon ? `${daysUntilDue}d left` :
           formatDate(order.dueDate)}
        </span>
      </div>

      {/* Main Content - Focus on essentials */}
      <div className="space-y-2">
        {/* Customer Name - Most important */}
        <h4 className="font-semibold text-gray-900 text-sm leading-tight">
          {order.customer}
        </h4>
        
        {/* Garment Type - Secondary info */}
        <p className="text-sm text-gray-600">
          {order.garmentType}
        </p>

        {/* Price - Financial info */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-medium text-gray-900">
            ₹{order.pricing.totalAmount.toLocaleString()}
          </span>
          {order.pricing.balanceAmount > 0 && (
            <span className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
              ₹{order.pricing.balanceAmount.toLocaleString()} due
            </span>
          )}
        </div>

        {/* Progress Bar - Visual status */}
        <div className="pt-1">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                order.progress === 100 ? 'bg-green-500' : 
                order.progress >= 65 ? 'bg-blue-500' : 
                order.progress >= 35 ? 'bg-yellow-500' : 'bg-orange-500'
              }`}
              style={{ width: `${order.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
})}
                  </div>

                  {/* Empty State */}
                  {columnOrders.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      <span className="text-3xl mb-2 block">{column.icon}</span>
                      <p className="text-sm">No orders in {column.title.toLowerCase()}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Priority Legend</h4>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span>High Priority</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span>Medium Priority</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Low Priority</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // TABLE VIEW (Original)
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">
                    Customer
                  </th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">
                    Garment
                  </th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">
                    Progress
                  </th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">
                    Due Date
                  </th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-500">
                        {order.orderDate}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">
                        {order.customer}
                      </div>
                      <div className="text-sm text-gray-500">{order.phone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">
                        {order.garmentType}
                      </div>
                      <div className="text-sm text-gray-500">{order.fabric}</div>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {order.progress}%
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-gray-900">
                        {order.dueDate}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">
                        ₹{order.pricing.totalAmount.toLocaleString()}
                      </div>
                      {order.pricing.balanceAmount > 0 && (
                        <div className="text-sm text-orange-600">
                          ₹{order.pricing.balanceAmount.toLocaleString()} pending
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Customers View Component
const CustomersView = () => {
  const { customers, setShowCustomerModal } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">
            Manage your customer relationships
          </p>
        </div>
        <button
          onClick={() => setShowCustomerModal(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center"
        >
          <span className="mr-2">{icons.plus}</span>
          Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                  {icons.user}
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">
                    {customer.name}
                  </h3>
                  <p className="text-sm text-gray-500">{customer.id}</p>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < customer.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    {icons.star}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <span className="text-gray-400 mr-2">{icons.phone}</span>
                <span className="text-gray-900">{customer.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-gray-400 mr-2">{icons.mail}</span>
                <span className="text-gray-900">{customer.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-gray-400 mr-2">{icons.location}</span>
                <span className="text-gray-900">
                  {customer.address.split(",")[0]}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {customer.totalOrders}
                </p>
                <p className="text-xs text-gray-500">Total Orders</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-600">
                  ₹{customer.totalSpent.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Total Spent</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-50 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100">
                View Profile
              </button>
              <button className="bg-gray-50 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-100">
                {icons.message}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple placeholder components for other views
const CalendarView = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
    <div className="text-6xl mb-4">{icons.calendar}</div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Calendar View</h2>
    <p className="text-gray-600">
      Track delivery deadlines and schedule appointments
    </p>
    <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
      Coming Soon
    </button>
  </div>
);

const AnalyticsView = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
    <div className="text-6xl mb-4">{icons.chart}</div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">
      Analytics Dashboard
    </h2>
    <p className="text-gray-600">Business insights and performance metrics</p>
    <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
      Coming Soon
    </button>
  </div>
);

const SettingsView = () => {
  const { settings, setSettings } = useApp();
  const [formData, setFormData] = useState(settings);

  const handleSave = () => {
    setSettings(formData);
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Configure your business preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Business Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    businessName: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Notification Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">
                  Receive notifications in the app
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      notifications: e.target.checked,
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Alerts</p>
                <p className="text-sm text-gray-500">Get email notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.emailAlerts}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      emailAlerts: e.target.checked,
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Order Modal
const OrderModal = () => {
  const { setShowOrderModal, addNewOrder } = useApp();
  const [formData, setFormData] = useState({
    title: "",
    customer: "",
    phone: "",
    email: "",
    garmentType: "Gent Suit",
    fabric: "",
    priority: "medium",
    dueDate: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewOrder(formData);
    setShowOrderModal(false);
    setFormData({
      title: "",
      customer: "",
      phone: "",
      email: "",
      garmentType: "Gent Suit",
      fabric: "",
      priority: "medium",
      dueDate: "",
      notes: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">New Order</h3>
          <button
            onClick={() => setShowOrderModal(false)}
            className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100 text-xl"
          >
            {icons.close}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                required
                value={formData.customer}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, customer: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter customer name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="customer@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g., Wedding Suit for John"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Garment Type *
              </label>
              <select
                required
                value={formData.garmentType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    garmentType: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Gent Suit">Gent Suit</option>
                <option value="Ladies Suit">Ladies Suit</option>
                <option value="Gent Shirt">Gent Shirt</option>
                <option value="Ladies Kurta">Ladies Kurta</option>
                <option value="Gent Pants">Gent Pants</option>
                <option value="Lehenga">Lehenga</option>
                <option value="Saree Blouse">Saree Blouse</option>
                <option value="Sherwani">Sherwani</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any special instructions..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowOrderModal(false)}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-lg transition-colors"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Customer Modal
const CustomerModal = () => {
  const { setShowCustomerModal } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Customer added successfully!");
    setShowCustomerModal(false);
    setFormData({ name: "", phone: "", email: "", address: "" });
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Add Customer</h3>
          <button
            onClick={() => setShowCustomerModal(false)}
            className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100 text-xl"
          >
            {icons.close}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter customer name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+91 9876543210"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="customer@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter customer address"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowCustomerModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-lg transition-colors"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WearqueryApp;