
import { Sidebar } from '@/components/layout/Sidebar';
import AnimatedTransition from '@/components/ui-elements/AnimatedTransition';
import ThemeSettings from '@/components/settings/ThemeSettings';
import { Container, Card, CardHeader, CardBody, Divider } from '@heroui/react';

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-[280px]">
        <Container className="py-6 md:py-8">
          <AnimatedTransition variant="fade" className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
              <p className="text-default-500 mt-1">
                Gerencie suas preferências e configurações da conta
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ThemeSettings />
              
              <Card className="w-full">
                <CardHeader className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold">Conta</h3>
                  <p className="text-default-500">Gerencie as configurações da sua conta</p>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-center text-default-500 py-8">
                    Configurações de conta em desenvolvimento
                  </p>
                </CardBody>
              </Card>
              
              <Card className="w-full">
                <CardHeader className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold">Notificações</h3>
                  <p className="text-default-500">Configure suas preferências de notificação</p>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-center text-default-500 py-8">
                    Configurações de notificações em desenvolvimento
                  </p>
                </CardBody>
              </Card>
              
              <Card className="w-full">
                <CardHeader className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold">API</h3>
                  <p className="text-default-500">Configurações de integração com APIs externas</p>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-center text-default-500 py-8">
                    Configurações de API em desenvolvimento
                  </p>
                </CardBody>
              </Card>
            </div>
          </AnimatedTransition>
        </Container>
      </div>
    </div>
  );
};

export default Settings;
