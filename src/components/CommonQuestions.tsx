import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
  {
    q: "Is it normal to feel tired all the time in the first trimester?",
    a: "Yes, fatigue is very common in the first trimester due to rising progesterone levels and increased blood production. Rest when you can and maintain a balanced diet.",
  },
  {
    q: "What foods should I avoid during pregnancy?",
    a: "Avoid raw or undercooked meat, unpasteurized dairy, high-mercury fish, and excessive caffeine. Always wash fruits and vegetables thoroughly.",
  },
  {
    q: "When should I schedule my first prenatal visit?",
    a: "Most healthcare providers recommend scheduling your first prenatal visit around 8 weeks of pregnancy, or as soon as you confirm your pregnancy.",
  },
  {
    q: "How much weight gain is normal during pregnancy?",
    a: "For a normal BMI, 25–35 pounds is typical over the full pregnancy. Your healthcare provider can give personalized guidance based on your starting weight.",
  },
];

export function CommonQuestions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="max-w-2xl mx-auto"
    >
      <h2 className="font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase text-center mb-4">
        Common Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-2">
        {questions.map((item, i) => (
          <AccordionItem
            key={i}
            value={`q-${i}`}
            className="card-soft px-5 py-0 border rounded-2xl"
          >
            <AccordionTrigger className="text-sm text-foreground font-medium hover:no-underline py-4">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-4">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
}
