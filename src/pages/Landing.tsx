
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { X, Play, Star, Users, Calendar, Shield, Waves, Target, Clock, Phone, Mail, MapPin, ArrowRight, Menu, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/stores/useAppStore';
import AuthModal from '@/components/auth/AuthModal';

const Landing = () => {
  const { isAuthenticated, setShowAuthModal, showAuthModal } = useAppStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Auto-redirect to dashboard if already logged in
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: Waves,
      title: 'حجز السباحة',
      description: 'احجز حصص السباحة الخاصة والمدارس مع أفضل المدربين',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'الملاعب الرياضية',
      description: 'ملاعب كرة القدم والسلة والتنس بأعلى المعايير',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Calendar,
      title: 'حجز سهل وسريع',
      description: 'نظام حجز متطور مع تأكيد فوري وإشعارات تلقائية',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'إدارة العملاء',
      description: 'نظام شامل لإدارة العملاء والحجوزات والمدفوعات',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '500+', label: 'عميل راضي' },
    { number: '50+', label: 'نشاط رياضي' },
    { number: '24/7', label: 'خدمة العملاء' },
    { number: '95%', label: 'معدل الرضا' },
  ];

  return (
    <>
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Sports Hub
                    </h1>
                    <p className="text-sm text-gray-600">منصة الحجز الرياضي الآلية</p>
                  </div>
                </motion.div>
              </div>
              
              <div className="hidden md:flex items-center space-x-8 space-x-reverse">
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">الميزات</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">من نحن</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">تواصل معنا</a>
              </div>
              
              <div className="flex items-center space-x-4 space-x-reverse">
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3"
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                  دخول لوحة التحكم
                </Button>
                
                <button
                  className="md:hidden p-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20"
              >
                <div className="px-4 py-4 space-y-3">
                  <a href="#features" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">الميزات</a>
                  <a href="#about" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">من نحن</a>
                  <a href="#contact" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">تواصل معنا</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section with Cover Image */}
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=2000')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-900/90" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20"
                >
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">منصة الحجز الرياضي الرائدة</span>
                </motion.div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  🏆 منصة الحجز الرياضي
                  <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    الآلية
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                  نظام متطور لإدارة وحجز الأنشطة الرياضية مع إشعارات تلقائية ونظام دفع آمن. 
                  احجز الآن واستمتع بتجربة رياضية لا تُنسى
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  onClick={() => setShowAuthModal(true)}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-lg px-8 py-6 shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <ArrowRight className="ml-2 h-6 w-6" />
                  ابدأ الآن - مجاناً
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-md transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  شاهد العرض التوضيحي
                </Button>
              </div>

              {/* Floating Elements */}
              <div className="hidden lg:block">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-1/4 left-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                >
                  <Waves className="w-8 h-8 text-blue-400 mb-2" />
                  <p className="text-white text-sm font-medium">سباحة</p>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute top-1/3 right-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                >
                  <Target className="w-8 h-8 text-green-400 mb-2" />
                  <p className="text-white text-sm font-medium">ملاعب</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center text-white"
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-blue-100 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  لماذا تختار 
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Sports Hub</span>؟
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  نقدم أفضل الخدمات الرياضية مع تقنيات حديثة لضمان تجربة مميزة لك ولعائلتك
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                      <ChevronRight className="w-5 h-5 text-blue-600 mx-auto mt-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">من نحن</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Sports Hub هي منصة رائدة في مجال الحجز الرياضي، نقدم خدمات متطورة لحجز الملاعب وأحواض السباحة 
                  مع نظام إدارة شامل للعملاء والمدفوعات.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: Shield, text: "أمان وموثوقية في جميع المعاملات" },
                    { icon: Clock, text: "خدمة عملاء على مدار الساعة" },
                    { icon: Star, text: "تقييم 5 نجوم من عملائنا" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-lg text-gray-700 font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800"
                    alt="Sports facilities"
                    className="rounded-3xl shadow-2xl w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-3xl"></div>
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600 font-medium">عميل سعيد</div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                  <div className="text-3xl font-bold text-purple-600">95%</div>
                  <div className="text-gray-600 font-medium">معدل الرضا</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">تواصل معنا</h2>
              <p className="text-xl text-gray-600">نحن هنا لمساعدتك في أي وقت</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Phone, title: "اتصل بنا", info: "+966 50 123 4567", color: "from-green-500 to-emerald-500" },
                { icon: Mail, title: "راسلنا", info: "info@sportshub.com", color: "from-blue-500 to-cyan-500" },
                { icon: MapPin, title: "موقعنا", info: "الرياض، المملكة العربية السعودية", color: "from-purple-500 to-pink-500" }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                        <contact.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-gray-900">{contact.title}</h3>
                      <p className="text-gray-600 font-medium">{contact.info}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Sports Hub</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  منصة الحجز الرياضي الرائدة في المملكة العربية السعودية
                </p>
              </div>
              
              {[
                {
                  title: "الخدمات",
                  items: ["حجز السباحة", "حجز الملاعب", "الدروس الخاصة", "الأنشطة الجماعية"]
                },
                {
                  title: "الشركة", 
                  items: ["من نحن", "فريق العمل", "المدونة", "الوظائف"]
                },
                {
                  title: "الدعم",
                  items: ["مركز المساعدة", "تواصل معنا", "الأسئلة الشائعة", "سياسة الخصوصية"]
                }
              ].map((section, index) => (
                <div key={index}>
                  <h4 className="text-lg font-semibold mb-4 text-white">{section.title}</h4>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-700 pt-8 text-center">
              <p className="text-gray-400">
                &copy; 2024 Sports Hub. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Auth Modal */}
      <AuthModal />
    </>
  );
};

export default Landing;
