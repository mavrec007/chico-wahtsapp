
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function Login() {
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: ''
  });
  const [signupCredentials, setSignupCredentials] = useState({
    email: '',
    password: '',
    name: '',
    role: 'user' as 'admin' | 'manager' | 'user'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginCredentials.email || !loginCredentials.password) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await login(loginCredentials.email, loginCredentials.password);
      
      if (result.success) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في لوحة التحكم"
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: result.error || "بيانات غير صحيحة",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الدخول",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupCredentials.email || !signupCredentials.password || !signupCredentials.name) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: signupCredentials.email,
        password: signupCredentials.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: signupCredentials.name,
            role: signupCredentials.role
          }
        }
      });

      if (error) {
        toast({
          title: "خطأ في التسجيل",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: "يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب"
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء الحساب",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            نظام الحجوزات
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            قم بتسجيل الدخول أو إنشاء حساب جديد
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
              <TabsTrigger value="signup">حساب جديد</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-right">البريد الإلكتروني</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginCredentials.email}
                    onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })}
                    placeholder="admin@example.com"
                    disabled={isLoading}
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-right">كلمة المرور</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={loginCredentials.password}
                      onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
                      placeholder="••••••••"
                      disabled={isLoading}
                      className="text-right pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      جاري تسجيل الدخول...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <ArrowRight className="ml-2 h-4 w-4" />
                      تسجيل الدخول
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-right">الاسم الكامل</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={signupCredentials.name}
                    onChange={(e) => setSignupCredentials({ ...signupCredentials, name: e.target.value })}
                    placeholder="أدخل اسمك الكامل"
                    disabled={isLoading}
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-right">البريد الإلكتروني</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupCredentials.email}
                    onChange={(e) => setSignupCredentials({ ...signupCredentials, email: e.target.value })}
                    placeholder="example@domain.com"
                    disabled={isLoading}
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-right">كلمة المرور</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={signupCredentials.password}
                      onChange={(e) => setSignupCredentials({ ...signupCredentials, password: e.target.value })}
                      placeholder="••••••••"
                      disabled={isLoading}
                      className="text-right pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      جاري إنشاء الحساب...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <ArrowRight className="ml-2 h-4 w-4" />
                      إنشاء حساب
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}