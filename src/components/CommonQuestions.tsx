import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const questions = [
  {
    q: "Is it normal to feel tired all the time in the first trimester?",
    a: "Yes, fatigue is very common in the first trimester due to rising progesterone levels and increased blood production. Rest when you can and maintain a balanced diet.",
    tagClassName:
      "border-rose-200/70 bg-gradient-to-r from-rose-500/15 via-fuchsia-500/10 to-indigo-500/15 hover:from-rose-500/20 hover:via-fuchsia-500/15 hover:to-indigo-500/20 dark:border-rose-400/25 dark:from-rose-500/20 dark:via-fuchsia-500/15 dark:to-indigo-500/20",
  },
  {
    q: "What foods should I avoid during pregnancy?",
    a: "Avoid raw or undercooked meat, unpasteurized dairy, high-mercury fish, and excessive caffeine. Always wash fruits and vegetables thoroughly.",
    tagClassName:
      "border-emerald-200/70 bg-gradient-to-r from-emerald-500/15 via-lime-500/10 to-amber-500/15 hover:from-emerald-500/20 hover:via-lime-500/15 hover:to-amber-500/20 dark:border-emerald-400/25 dark:from-emerald-500/20 dark:via-lime-500/15 dark:to-amber-500/20",
  },
  {
    q: "When should I schedule my first prenatal visit?",
    a: "Most healthcare providers recommend scheduling your first prenatal visit around 8 weeks of pregnancy, or as soon as you confirm your pregnancy.",
    tagClassName:
      "border-teal-200/70 bg-gradient-to-r from-teal-500/15 via-sky-500/10 to-indigo-500/15 hover:from-teal-500/20 hover:via-sky-500/15 hover:to-indigo-500/20 dark:border-teal-400/25 dark:from-teal-500/20 dark:via-sky-500/15 dark:to-indigo-500/20",
  },
  {
    q: "How much weight gain is normal during pregnancy?",
    a: "For a normal BMI, 25–35 pounds is typical over the full pregnancy. Your healthcare provider can give personalized guidance based on your starting weight.",
    tagClassName:
      "border-violet-200/70 bg-gradient-to-r from-violet-500/15 via-cyan-500/10 to-sky-500/15 hover:from-violet-500/20 hover:via-cyan-500/15 hover:to-sky-500/20 dark:border-violet-400/25 dark:from-violet-500/20 dark:via-cyan-500/15 dark:to-sky-500/20",
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
            className="px-0 py-0 border-0"
          >
            <AccordionTrigger
              className={cn(
                "text-sm font-medium hover:no-underline",
                "inline-flex w-full items-center justify-between gap-3 rounded-full border px-4 py-2.5 text-left text-foreground",
                "shadow-sm transition-all hover:shadow-md hover:-translate-y-px active:translate-y-0",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                item.tagClassName
              )}
            >
              <span className="pr-2">{item.q}</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-3">
              <div className="card-soft border rounded-2xl px-5 py-4 text-sm text-muted-foreground">
                {item.a}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
}
