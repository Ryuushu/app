import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Badge } from "./components/ui/badge";
import { Calendar, MapPin, Phone, Mail, Zap, Wrench, Shield, Clock, Star, ArrowRight, Menu, X } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-2xl font-bold text-gray-900">Teskom.id</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-orange-500 transition-colors">Home</a>
            <a href="#products" className="text-gray-700 hover:text-orange-500 transition-colors">Products</a>
            <a href="#rental" className="text-gray-700 hover:text-orange-500 transition-colors">Rental</a>
            <a href="#services" className="text-gray-700 hover:text-orange-500 transition-colors">Services</a>
            <a href="#articles" className="text-gray-700 hover:text-orange-500 transition-colors">Articles</a>
          </nav>

          <Button 
            variant="ghost" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-orange-500">Home</a>
            <a href="#products" className="block px-3 py-2 text-gray-700 hover:text-orange-500">Products</a>
            <a href="#rental" className="block px-3 py-2 text-gray-700 hover:text-orange-500">Rental</a>
            <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-orange-500">Services</a>
            <a href="#articles" className="block px-3 py-2 text-gray-700 hover:text-orange-500">Articles</a>
          </div>
        </div>
      )}
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-r from-gray-50 to-white">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1610028290816-5d937a395a49" 
          alt="Power Lines"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Solusi Elektrikal
            <span className="text-orange-500 block">Profesional</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Menyediakan produk elektrikal berkualitas tinggi, layanan rental peralatan, 
            dan solusi instalasi untuk kebutuhan industri dan residential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
              Lihat Produk
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3">
              Konsultasi Gratis
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Products Section
const ProductsSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Set dummy data if API fails
      setProducts([
        {
          id: '1',
          name: 'Panel Listrik Industrial',
          description: 'Panel listrik berkualitas tinggi untuk kebutuhan industrial',
          category: 'Panel',
          price: 2500000,
          image_url: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5',
          in_stock: true
        },
        {
          id: '2',
          name: 'Kabel Power Grade A',
          description: 'Kabel power premium dengan sertifikasi internasional',
          category: 'Kabel',
          price: 150000,
          image_url: 'https://images.unsplash.com/photo-1685537711270-a11c23592f8f',
          in_stock: true
        },
        {
          id: '3',
          name: 'Switch Industrial',
          description: 'Switch tahan cuaca untuk aplikasi outdoor',
          category: 'Switch',
          price: 350000,
          image_url: 'https://images.unsplash.com/photo-1552772588-12592fc15a64',
          in_stock: true
        }
      ]);
    }
  };

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Katalog Produk</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan berbagai produk elektrikal berkualitas untuk kebutuhan proyek Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 right-4 bg-orange-500 text-white">
                  {product.category}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">{product.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-500">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Rental Section
const RentalSection = () => {
  const [rentalItems, setRentalItems] = useState([]);
  const [bookingForm, setBookingForm] = useState({
    rental_item_id: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    start_date: '',
    end_date: '',
    total_days: 0,
    total_cost: 0
  });

  useEffect(() => {
    fetchRentalItems();
  }, []);

  const fetchRentalItems = async () => {
    try {
      const response = await axios.get(`${API}/rental-items`);
      setRentalItems(response.data);
    } catch (error) {
      console.error('Error fetching rental items:', error);
      // Set dummy data if API fails
      setRentalItems([
        {
          id: '1',
          name: 'Generator 10KVA',
          description: 'Generator portable untuk kebutuhan darurat',
          daily_rate: 250000,
          image_url: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5',
          available: true
        },
        {
          id: '2',
          name: 'Welding Machine',
          description: 'Mesin las profesional untuk proyek konstruksi',
          daily_rate: 150000,
          image_url: 'https://images.unsplash.com/photo-1685537711270-a11c23592f8f',
          available: true
        }
      ]);
    }
  };

  return (
    <section id="rental" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Rental Peralatan</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sewa peralatan elektrikal profesional dengan tarif kompetitif
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rentalItems.map((item) => (
            <Card key={item.id} className="hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={item.image_url} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                  Available
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">{item.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-500">
                    Rp {item.daily_rate.toLocaleString('id-ID')}/hari
                  </span>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Sewa Sekarang
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      name: 'Instalasi Listrik',
      description: 'Layanan instalasi listrik profesional untuk residential dan komersial',
      icon: <Zap className="h-12 w-12 text-orange-500" />,
      features: ['Instalasi Rumah', 'Instalasi Pabrik', 'Maintenance Berkala', 'Emergency Service']
    },
    {
      name: 'Konsultasi Teknis',
      description: 'Konsultasi ahli untuk perencanaan sistem elektrikal yang optimal',
      icon: <Wrench className="h-12 w-12 text-orange-500" />,
      features: ['Analisis Kebutuhan', 'Desain Sistem', 'Perhitungan Daya', 'Rekomendasi Produk']
    },
    {
      name: 'Maintenance & Repair',
      description: 'Layanan perawatan dan perbaikan sistem elektrikal berkala',
      icon: <Shield className="h-12 w-12 text-orange-500" />,
      features: ['Preventive Maintenance', 'Emergency Repair', 'System Upgrade', '24/7 Support']
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Layanan Kami</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Solusi lengkap untuk semua kebutuhan elektrikal Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl text-gray-900 mb-2">{service.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center text-gray-700">
                      <Star className="h-4 w-4 text-orange-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white w-full">
                  Pelajari Lebih Lanjut
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Articles Section
const ArticlesSection = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${API}/articles`);
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Set dummy data if API fails
      setArticles([
        {
          id: '1',
          title: 'Tips Memilih Panel Listrik yang Tepat',
          excerpt: 'Panduan lengkap memilih panel listrik sesuai kebutuhan rumah dan kantor Anda',
          image_url: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5',
          author: 'Tim Teskom',
          created_at: '2024-01-15'
        },
        {
          id: '2',
          title: 'Maintenance Sistem Elektrikal Preventif',
          excerpt: 'Pentingnya maintenance berkala untuk mencegah kerusakan sistem elektrikal',
          image_url: 'https://images.unsplash.com/photo-1685537711270-a11c23592f8f',
          author: 'Tim Teskom',
          created_at: '2024-01-10'
        },
        {
          id: '3',
          title: 'Tren Teknologi Elektrikal 2024',
          excerpt: 'Perkembangan terbaru dalam teknologi elektrikal dan dampaknya bagi industri',
          image_url: 'https://images.unsplash.com/photo-1552772588-12592fc15a64',
          author: 'Tim Teskom',
          created_at: '2024-01-05'
        }
      ]);
    }
  };

  return (
    <section id="articles" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Artikel & Tips</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Baca artikel terbaru seputar teknologi dan tips elektrikal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={article.image_url} 
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="text-gray-600 line-clamp-3">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>By {article.author}</span>
                  <span>{new Date(article.created_at).toLocaleDateString('id-ID')}</span>
                </div>
                <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-50">
                  Baca Selengkapnya
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Zap className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-2xl font-bold">Teskom.id</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Solusi elektrikal terpercaya untuk kebutuhan residential dan industrial. 
              Melayani dengan profesional dan kualitas terbaik.
            </p>
            <div className="flex space-x-4">
              <Phone className="h-5 w-5 text-orange-500" />
              <span className="text-gray-400">+62 21 1234 5678</span>
            </div>
            <div className="flex space-x-4 mt-2">
              <Mail className="h-5 w-5 text-orange-500" />
              <span className="text-gray-400">info@teskom.id</span>
            </div>
            <div className="flex space-x-4 mt-2">
              <MapPin className="h-5 w-5 text-orange-500" />
              <span className="text-gray-400">Jakarta, Indonesia</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Instalasi Listrik</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Rental Peralatan</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Maintenance</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Konsultasi</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Produk</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Panel Listrik</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Kabel Power</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Switch Industrial</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Generator</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Teskom.id. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <HeroSection />
              <ProductsSection />
              <RentalSection />
              <ServicesSection />
              <ArticlesSection />
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;