import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { X, Play, Star, Users, Calendar, Shield, Waves, Target, Clock, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const Landing = () => {
  const [showLoginCard, setShowLoginCard] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sports Hub
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">الميزات</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">من نحن</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">تواصل معنا</a>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/login">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                  دخول لوحة التحكم
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                منصة الحجز الرياضي
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> الذكية</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                نظام متطور لإدارة وحجز الأنشطة الرياضية مع إشعارات تلقائية ونظام دفع آمن. احجز الآن واستمتع بتجربة رياضية لا تُنسى
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 shadow-xl"
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                    دخول لوحة التحكم
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-2 hover:bg-gray-50"
                >
                  <Play className="w-5 h-5 mr-2" />
                  شاهد العرض التوضيحي
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">لماذا تختار Sports Hub؟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نقدم أفضل الخدمات الرياضية مع تقنيات حديثة لضمان تجربة مميزة لك ولعائلتك
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${feature.color} mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">من نحن</h2>
              <p className="text-lg text-gray-600 mb-6">
                Sports Hub هي منصة رائدة في مجال الحجز الرياضي، نقدم خدمات متطورة لحجز الملاعب وأحواض السباحة 
                مع نظام إدارة شامل للعملاء والمدفوعات.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-3" />
                  <span>أمان وموثوقية في جميع المعاملات</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-3" />
                  <span>خدمة عملاء على مدار الساعة</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-blue-600 mr-3" />
                  <span>تقييم 5 نجوم من عملائنا</span>
                </div>
              </div>
            </div>
            <div className="lg:text-center">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800"
                alt="Sports facilities"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">تواصل معنا</h2>
            <p className="text-xl text-gray-600">نحن هنا لمساعدتك في أي وقت</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">اتصل بنا</h3>
                <p className="text-gray-600">+966 50 123 4567</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">راسلنا</h3>
                <p className="text-gray-600">info@sportshub.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">موقعنا</h3>
                <p className="text-gray-600">الرياض، المملكة العربية السعودية</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Sports Hub</h3>
              <p className="text-gray-400">
                منصة الحجز الرياضي الرائدة في المملكة العربية السعودية
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">الخدمات</h4>
              <ul className="space-y-2 text-gray-400">
                <li>حجز السباحة</li>
                <li>حجز الملاعب</li>
                <li>الدروس الخاصة</li>
                <li>الأنشطة الجماعية</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">الشركة</h4>
              <ul className="space-y-2 text-gray-400">
                <li>من نحن</li>
                <li>فريق العمل</li>
                <li>المدونة</li>
                <li>الوظائف</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">الدعم</h4>
              <ul className="space-y-2 text-gray-400">
                <li>مركز المساعدة</li>
                <li>تواصل معنا</li>
                <li>الأسئلة الشائعة</li>
                <li>سياسة الخصوصية</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sports Hub. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginCard && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowLoginCard(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowLoginCard(false)}
                  className="absolute -top-2 -right-2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg"
                >
                  <X className="w-4 h-4" />
                </Button>
                
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">تسجيل الدخول</h2>
                    <p className="text-gray-600">أدخل بياناتك للوصول للوحة التحكم</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Link to="/login" className="block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        تسجيل الدخول
                      </Button>
                    </Link>
                    
                    <p className="text-center text-sm text-gray-600">
                      ليس لديك حساب؟{' '}
                      <Link to="/register" className="text-blue-600 hover:underline">
                        إنشاء حساب جديد
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;