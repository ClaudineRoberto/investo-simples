
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  RadioGroup,
  Radio,
  Chip
} from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const colors = [
  { name: "blue", color: "#0070F3" },
  { name: "purple", color: "#7828C8" },
  { name: "green", color: "#17C964" },
  { name: "red", color: "#F31260" },
  { name: "orange", color: "#F5A524" },
  { name: "pink", color: "#FF4ECD" },
];

const ThemeSettings = () => {
  const { theme, primaryColor, toggleTheme, setPrimaryColor } = useTheme();

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Personalização</h3>
        <p className="text-default-500">Personalize a aparência do seu painel</p>
      </CardHeader>
      
      <CardBody className="gap-8">
        <div className="space-y-4">
          <div>
            <h4 className="text-medium font-medium mb-3">Tema</h4>
            <Button
              startContent={theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
              onClick={toggleTheme}
              className="w-full md:w-auto"
            >
              {theme === "light" ? "Tema Claro" : "Tema Escuro"}
            </Button>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-medium font-medium">Cor Primária</h4>
            <RadioGroup
              orientation="horizontal"
              value={primaryColor}
              onValueChange={(value) => setPrimaryColor(value as any)}
              className="flex flex-wrap gap-4"
            >
              {colors.map((c) => (
                <Radio
                  key={c.name}
                  value={c.name}
                  className="hidden"
                >
                  <Chip
                    className="min-w-[80px] h-10 cursor-pointer transition-all"
                    style={{
                      backgroundColor: c.color,
                      border: primaryColor === c.name ? "2px solid white" : "none",
                      transform: primaryColor === c.name ? "scale(1.05)" : "scale(1)",
                      boxShadow: primaryColor === c.name ? "0 0 0 2px rgba(0, 0, 0, 0.2)" : "none"
                    }}
                  >
                    <span className="capitalize text-white">{c.name}</span>
                  </Chip>
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ThemeSettings;
