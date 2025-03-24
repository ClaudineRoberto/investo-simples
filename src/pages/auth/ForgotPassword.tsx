
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedTransition from '@/components/ui-elements/AnimatedTransition';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

type FormData = z.infer<typeof formSchema>;

const ForgotPassword = () => {
  const { forgotPassword, loading } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await forgotPassword(data.email);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <AnimatedTransition variant="scale" className="w-full max-w-md">
        <div className="glass-card rounded-2xl p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Recuperar senha</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enviaremos um link para redefinir sua senha
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          placeholder="seu@email.com"
                          className="pl-10"
                          {...field}
                          disabled={loading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar link de recuperação'}
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Voltar para o login
            </Link>
          </div>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default ForgotPassword;
