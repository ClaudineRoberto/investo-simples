
import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import AnimatedTransition from '@/components/ui-elements/AnimatedTransition';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Settings = () => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [defaultCurrency, setDefaultCurrency] = useState('BRL');
  const [avatarUrl, setAvatarUrl] = useState(user?.photoURL || '');

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Toggle dark mode class on document
    document.documentElement.classList.toggle('dark', newMode);
    
    toast.success(`Modo ${newMode ? 'escuro' : 'claro'} ativado`);
  };

  // Handle form submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Perfil atualizado com sucesso!');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Senha atualizada com sucesso!');
  };

  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Preferências salvas com sucesso!');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-[280px]">
        <div className="container px-4 py-6 md:px-8 md:py-8">
          <AnimatedTransition variant="fade" className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
              <p className="text-muted-foreground">
                Gerencie suas preferências e informações de conta
              </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="security">Segurança</TabsTrigger>
                <TabsTrigger value="preferences">Preferências</TabsTrigger>
                <TabsTrigger value="integrations">Integrações</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Informações pessoais</CardTitle>
                    <CardDescription>
                      Atualize suas informações pessoais
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={avatarUrl} />
                            <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                              {user?.name?.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col space-y-2 text-center sm:text-left">
                            <div className="text-lg font-medium">{user?.name}</div>
                            <div className="text-sm text-muted-foreground">{user?.email}</div>
                            <Button variant="outline" size="sm" className="mt-2">
                              Alterar foto
                            </Button>
                          </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nome completo</Label>
                            <Input id="name" defaultValue={user?.name} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" defaultValue={user?.email} disabled />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input id="phone" placeholder="(11) 98765-4321" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="taxId">CPF</Label>
                            <Input id="taxId" placeholder="123.456.789-00" />
                          </div>
                        </div>
                      </div>

                      <Button type="submit">Salvar alterações</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Alterar senha</CardTitle>
                    <CardDescription>
                      Atualize sua senha para manter sua conta segura
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Senha atual</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Nova senha</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirme a nova senha</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>

                      <Button type="submit">Atualizar senha</Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Atividade da conta</CardTitle>
                    <CardDescription>
                      Gerencie suas sessões e dispositivos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <div className="font-medium">Este dispositivo</div>
                          <div className="text-sm text-muted-foreground">
                            São Paulo, Brasil • Última atividade: Agora
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Sair
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Preferências</CardTitle>
                    <CardDescription>
                      Personalize sua experiência no aplicativo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePreferencesSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">Modo escuro</div>
                            <div className="text-sm text-muted-foreground">
                              Ative o modo escuro para uma experiência noturna
                            </div>
                          </div>
                          <Switch 
                            checked={isDarkMode} 
                            onCheckedChange={handleThemeToggle} 
                            aria-label="Toggle dark mode"
                          />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">Notificações por e-mail</div>
                            <div className="text-sm text-muted-foreground">
                              Receba atualizações e novidades por e-mail
                            </div>
                          </div>
                          <Switch 
                            checked={emailNotifications} 
                            onCheckedChange={setEmailNotifications} 
                            aria-label="Toggle email notifications"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">Notificações push</div>
                            <div className="text-sm text-muted-foreground">
                              Receba alertas sobre sua carteira no navegador
                            </div>
                          </div>
                          <Switch 
                            checked={pushNotifications} 
                            onCheckedChange={setPushNotifications} 
                            aria-label="Toggle push notifications"
                          />
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <Label htmlFor="currency">Moeda padrão</Label>
                          <select
                            id="currency"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={defaultCurrency}
                            onChange={(e) => setDefaultCurrency(e.target.value)}
                          >
                            <option value="BRL">Real Brasileiro (R$)</option>
                            <option value="USD">Dólar Americano ($)</option>
                            <option value="EUR">Euro (€)</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="decimal-places">Casas decimais</Label>
                          <select
                            id="decimal-places"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            defaultValue="2"
                          >
                            <option value="2">2 casas decimais</option>
                            <option value="3">3 casas decimais</option>
                            <option value="4">4 casas decimais</option>
                          </select>
                        </div>
                      </div>

                      <Button type="submit">Salvar preferências</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Integrações</CardTitle>
                    <CardDescription>
                      Conecte com corretoras e serviços financeiros
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-full bg-blue-100 p-2 dark:bg-blue-900/20">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full text-blue-600">
                                <path d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium">XP Investimentos</h4>
                              <p className="text-sm text-muted-foreground">
                                Sincronize seus investimentos automaticamente
                              </p>
                            </div>
                          </div>
                          <Button>Conectar</Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-full bg-purple-100 p-2 dark:bg-purple-900/20">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full text-purple-600">
                                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium">Nubank</h4>
                              <p className="text-sm text-muted-foreground">
                                Importe dados da sua conta e investimentos
                              </p>
                            </div>
                          </div>
                          <Button>Conectar</Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-full bg-yellow-100 p-2 dark:bg-yellow-900/20">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full text-yellow-600">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9.168 14.828c.256.731.453 1.153.727 1.298.352.186.771.223 1.136.095.413-.145.71-.56.856-1.196.096-.414.096-.845.002-1.482-.129-.887-.363-1.326-1.035-1.962-.53-.502-.866-1.236-.9-1.868-.023-.44.059-.75.405-.942.66-.365 1.438-.117 1.762.56.107.225.279.448.448.583.28.223.624.3 1.012.215.5-.11.797-.395.797-.764 0-.476-.425-1.026-.935-1.205-.829-.29-1.38-.374-2.037-.313-.702.066-1.424.35-1.878.736-.57.485-.912 1.083-.954 1.678-.034.48.122.962.438 1.356.3.377.47.546.87.968.483.511.717.863.881 1.32.13.357.17.634.187 1.262.034 1.262-.156 1.752-.655 1.686-.2-.027-.358-.186-.431-.434-.037-.125-.022-.574.026-.778.066-.274.031-.486-.08-.542-.297-.15-.554-.052-.789.296-.237.352-.262 1.004-.05 1.332.4.62 1.44.883 2.23.566.517-.207.861-.684.931-1.296.042-.377-.066-1.145-.19-1.375-.17-.314-.694-1.06-.754-1.07-.029-.005.137.518.255.803Z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium">Binance</h4>
                              <p className="text-sm text-muted-foreground">
                                Sincronize suas criptomoedas
                              </p>
                            </div>
                          </div>
                          <Button>Conectar</Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-full bg-green-100 p-2 dark:bg-green-900/20">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full text-green-600">
                                <path d="M4 17h2.5M4 7h2.5M14 17h9m-9-5h7m-7-5h9M4 12h2.5M7 17v-2.5M7 7v2.5M9.5 12H12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium">Google Sheets</h4>
                              <p className="text-sm text-muted-foreground">
                                Exporte ou importe dados das suas planilhas
                              </p>
                            </div>
                          </div>
                          <Button>Conectar</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </AnimatedTransition>
        </div>
      </div>
    </div>
  );
};

export default Settings;
