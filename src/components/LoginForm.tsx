
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Headphones, Phone, Laptop, Cable } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (login(email, password)) {
      console.log('Login successful');
    } else {
      setError('Échec de connexion - Vérifiez vos identifiants');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <img 
                src="/lovable-uploads/2630b39e-9636-44b1-92e2-016af12eb9e9.png" 
                alt="Djabaro Logo" 
                className="w-12 h-12 object-contain filter brightness-0 invert"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary">DJABARO</h1>
          <p className="text-gray-600">Commerce d'Électronique - Côte d'Ivoire</p>
          
          {/* Decorative icons */}
          <div className="flex justify-center space-x-4 text-primary-300">
            <Headphones className="w-6 h-6" />
            <Phone className="w-6 h-6" />
            <Laptop className="w-6 h-6" />
            <Cable className="w-6 h-6" />
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-gray-800">Connexion</CardTitle>
            <CardDescription className="text-center">
              Accédez à votre espace Djabaro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@djabaro.ci"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>

            {/* Test Accounts Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Comptes de test disponibles :</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>Admin:</strong> admin@djabaro.ci / admin123</p>
                <p><strong>Employé:</strong> employe@djabaro.ci / employe123</p>
                <p><strong>Manager:</strong> manager@djabaro.ci / manager123</p>
                <p><strong>Client:</strong> client@djabaro.ci / client123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Info */}
        <div className="text-center text-sm text-gray-500">
          <p><strong>Djabaro</strong> - Commerce d'équipements électroniques</p>
          <p>📞 05 05 05 05 05 | 📧 Djabaro@gmail.com</p>
          <p>Côte d'Ivoire</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
