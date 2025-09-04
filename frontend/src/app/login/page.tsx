'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Get configuration from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const LOGIN_ENDPOINT = process.env.NEXT_PUBLIC_API_LOGIN_ENDPOINT;
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formBody = new URLSearchParams({
        username: formData.username,
        password: formData.password
      });

      const url = `${API_BASE_URL}${LOGIN_ENDPOINT}`;
      console.log('Attempting login to:', url); // For debugging

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
        mode: 'cors',
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_data', JSON.stringify({
          username: data.username,
          email: data.email
        }));
        router.push('/reminder');
      } else {
        const errorData = await response.json().catch(() => ({ detail: 'Erreur de connexion' }));
        setError(errorData.detail || 'Une erreur est survenue lors de la connexion');
      }
    } catch (error) {
      setError('Impossible de se connecter au serveur');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-2 items-center text-center">
          <div className="w-32 h-32 relative mb-4">
            <Image
              src="/logo.png"
              alt={`${APP_NAME} Logo`}
              fill
              className="object-contain"
              priority
            />
          </div>
          <CardTitle className="text-2xl font-bold">Bienvenue sur {APP_NAME}</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à votre calendrier de rendez-vous
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                type="text"
                placeholder="Votre nom d'utilisateur"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a 
              href="#" 
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                // TODO: Implement forgot password functionality
                alert('Fonctionnalité de récupération de mot de passe à implémenter');
              }}
            >
              Mot de passe oublié ?
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}