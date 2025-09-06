import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-green-400">EcoMarket</h3>
            <p className="text-gray-300 mb-4">
              Your trusted marketplace for sustainable second-hand goods. 
              Join us in creating a more sustainable future, one purchase at a time.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-green-400 transition-colors cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-green-400 transition-colors cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-green-400 transition-colors cursor-pointer" />
              <Linkedin className="w-5 h-5 hover:text-green-400 transition-colors cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Products</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Sell Items</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Fashion</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Electronics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Furniture</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Footwear</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Home & Garden</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="mr-3 text-green-400" />
                <span className="text-gray-300">123 Green Street, Eco City, EC 12345</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-green-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 text-green-400" />
                <span className="text-gray-300">info@ecomarket.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 EcoMarket. All rights reserved. | 
            <a href="#" className="hover:text-green-400 transition-colors ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-green-400 transition-colors ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
