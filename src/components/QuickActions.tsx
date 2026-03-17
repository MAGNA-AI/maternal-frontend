import { motion } from "framer-motion";
import { Baby, Apple, Moon, Stethoscope, CalendarDays } from "lucide-react";

const actions = [
  { label: "What's happening this week?", icon: Baby },
  { label: "What should I eat today?", icon: Apple },
  { label: "Is my sleep normal?", icon: Moon },
  { label: "Check my symptoms", icon: Stethoscope },
  { label: "Next clinic visit?", icon: CalendarDays },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.35 }}
    >
      <h2 className="font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase text-center mb-3">
        Quick Actions
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground transition-colors font-body"
          >
            <action.icon className="w-4 h-4" />
            {action.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
