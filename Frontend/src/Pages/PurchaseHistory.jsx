import React, { useState } from 'react';
import { Package, Search, Filter, Calendar, Star, Truck, CheckCircle, Clock, RotateCcw } from 'lucide-react';

const PurchaseHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Sample purchase data
  const [purchaseHistory] = useState([
    {
      orderId: 'EC202412001',
      orderDate: '2024-12-15',
      status: 'delivered',
      totalAmount: 94.98,
      items: [
        {
          id: 1,
          name: 'Eco-Friendly Water Bottle',
          price: 24.99,
          quantity: 2,
          image: '/api/placeholder/80/80',
          seller: 'GreenLife Store',
          category: 'Lifestyle',
          rating: 5
        },
        {
          id: 2,
          name: 'Organic Cotton T-Shirt',
          price: 35.00,
          quantity: 1,
          image: '/api/placeholder/80/80',
          seller: 'EcoFashion Co',
          category: 'Clothing',
          rating: 4
        }
      ],
      shippingAddress: '123 Main St, New York, NY 10001',
      deliveryDate: '2024-12-18'
    },
    {
      orderId: 'EC202412002',
      orderDate: '2024-12-10',
      status: 'in-transit',
      totalAmount: 159.97,
      items: [
        {
          id: 3,
          name: 'Solar Phone Charger',
          price: 89.99,
          quantity: 1,
          image: '/api/placeholder/80/80',
          seller: 'TechGreen',
          category: 'Electronics',
          rating: null
        },
        {
          id: 4,
          name: 'Bamboo Toothbrush Set',
          price: 19.99,
          quantity: 2,
          image: '/api/placeholder/80/80',
          seller: 'NatureCare',
          category: 'Personal Care',
          rating: null
        }
      ],
      shippingAddress: '123 Main St, New York, NY 10001',
      estimatedDelivery: '2024-12-20'
    },
    {
      orderId: 'EC202411003',
      orderDate: '2024-11-25',
      status: 'delivered',
      totalAmount: 75.50,
      items: [
        {
          id: 5,
          name: 'Reusable Food Storage Bags',
          price: 29.99,
          quantity: 1,
          image: '/api/placeholder/80/80',
          seller: 'EcoHome',
          category: 'Kitchen',
          rating: 5
        },
        {
          id: 6,
          name: 'Organic Lip Balm',
          price: 8.99,
          quantity: 3,
          image: '/api/placeholder/80/80',
          seller: 'PureBeauty',
          category: 'Personal Care',
          rating: 4
        }
      ],
      shippingAddress: '123 Main St, New York, NY 10001',
      deliveryDate: '2024-11-28'
    },
    {
      orderId: 'EC202411004',
      orderDate: '2024-11-15',
      status: 'cancelled',
      totalAmount: 45.00,
      items: [
        {
          id: 7,
          name: 'Hemp Backpack',
          price: 45.00,
          quantity: 1,
          image: '/api/placeholder/80/80',
          seller: 'NatureBag Co',
          category: 'Accessories',
          rating: null
        }
      ],
      shippingAddress: '123 Main St, New York, NY 10001',
      cancelDate: '2024-11-16'
    },
    {
      orderId: 'EC202410005',
      orderDate: '2024-10-30',
      status: 'delivered',
      totalAmount: 120.97,
      items: [
        {
          id: 8,
          name: 'Organic Cotton Bedsheets',
          price: 89.99,
          quantity: 1,
          image: '/api/placeholder/80/80',
          seller: 'ComfortGreen',
          category: 'Home & Garden',
          rating: 5
        },
        {
          id: 9,
          name: 'Natural Soap Set',
          price: 15.99,
          quantity: 2,
          image: '/api/placeholder/80/80',
          seller: 'PureSoap',
          category: 'Personal Care',
          rating: 4
        }
      ],
      shippingAddress: '123 Main St, New York, NY 10001',
      deliveryDate: '2024-11-02'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-transit':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'cancelled':
        return <RotateCcw className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStarRating = (rating) => {
    if (!rating) return <span className="text-gray-400 text-sm">Not rated</span>;
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  const filteredOrders = purchaseHistory.filter(order => {
    const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.seller.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const orderDate = new Date(order.orderDate);
      const now = new Date();
      const monthsAgo = new Date();
      
      switch (dateFilter) {
        case 'last-month':
          monthsAgo.setMonth(now.getMonth() - 1);
          matchesDate = orderDate >= monthsAgo;
          break;
        case 'last-3-months':
          monthsAgo.setMonth(now.getMonth() - 3);
          matchesDate = orderDate >= monthsAgo;
          break;
        case 'last-year':
          monthsAgo.setFullYear(now.getFullYear() - 1);
          matchesDate = orderDate >= monthsAgo;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalSpent = purchaseHistory
    .filter(order => order.status !== 'cancelled')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const totalOrders = purchaseHistory.length;
  const completedOrders = purchaseHistory.filter(order => order.status === 'delivered').length;

  return (
    <div className="min-h-screen bg-gray-50 py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Purchase History</h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-green-600">${totalSpent.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Orders</p>
                <p className="text-2xl font-bold text-purple-600">{completedOrders}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search orders, products, or sellers..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="delivered">Delivered</option>
                <option value="in-transit">In Transit</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            {/* Date Filter */}
            <div>
              <select
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="last-month">Last Month</option>
                <option value="last-3-months">Last 3 Months</option>
                <option value="last-year">Last Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.orderId} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Order #{order.orderId}</h3>
                        <p className="text-sm text-gray-600">Placed on {formatDate(order.orderDate)}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">${order.totalAmount.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">
                        {order.status === 'delivered' && order.deliveryDate && `Delivered on ${formatDate(order.deliveryDate)}`}
                        {order.status === 'in-transit' && order.estimatedDelivery && `Est. delivery ${formatDate(order.estimatedDelivery)}`}
                        {order.status === 'cancelled' && order.cancelDate && `Cancelled on ${formatDate(order.cancelDate)}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">by {item.seller}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {item.category}
                            </span>
                            {renderStarRating(item.rating)}
                          </div>
                        </div>
                        
                        <div className="text-right flex-shrink-0">
                          <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          <p className="text-sm font-medium text-green-600">
                            Total: ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                    <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                    
                    {order.status === 'delivered' && (
                      <>
                        <button className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Buy Again
                        </button>
                        <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Leave Review
                        </button>
                      </>
                    )}
                    
                    {order.status === 'in-transit' && (
                      <button className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Track Package
                      </button>
                    )}
                    
                    <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;