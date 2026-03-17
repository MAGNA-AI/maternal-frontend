import { motion } from "framer-motion";
import { Baby, Apple, Moon, Stethoscope, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    label: "What's happening this week?",
    icon: Baby,
    className:
      "border-rose-200/60 bg-gradient-to-r from-rose-500/15 via-fuchsia-500/10 to-indigo-500/15 hover:from-rose-500/20 hover:via-fuchsia-500/15 hover:to-indigo-500/20 dark:border-rose-400/25 dark:from-rose-500/20 dark:via-fuchsia-500/15 dark:to-indigo-500/20",
    iconClassName: "text-rose-600 dark:text-rose-300",
  },
  {
    label: "What should I eat today?",
    icon: Apple,
    className:
      "border-emerald-200/60 bg-gradient-to-r from-emerald-500/15 via-lime-500/10 to-amber-500/15 hover:from-emerald-500/20 hover:via-lime-500/15 hover:to-amber-500/20 dark:border-emerald-400/25 dark:from-emerald-500/20 dark:via-lime-500/15 dark:to-amber-500/20",
    iconClassName: "text-emerald-700 dark:text-emerald-300",
  },
  {
    label: "Is my sleep normal?",
    icon: Moon,
    className:
      "border-violet-200/60 bg-gradient-to-r from-violet-500/15 via-sky-500/10 to-cyan-500/15 hover:from-violet-500/20 hover:via-sky-500/15 hover:to-cyan-500/20 dark:border-violet-400/25 dark:from-violet-500/20 dark:via-sky-500/15 dark:to-cyan-500/20",
    iconClassName: "text-violet-700 dark:text-violet-300",
  },
  {
    label: "Check my symptoms",
    icon: Stethoscope,
    className:
      "border-orange-200/60 bg-gradient-to-r from-orange-500/15 via-pink-500/10 to-red-500/15 hover:from-orange-500/20 hover:via-pink-500/15 hover:to-red-500/20 dark:border-orange-400/25 dark:from-orange-500/20 dark:via-pink-500/15 dark:to-red-500/20",
    iconClassName: "text-orange-700 dark:text-orange-300",
  },
  {
    label: "Next clinic visit?",
    icon: CalendarDays,
    className:
      "border-teal-200/60 bg-gradient-to-r from-teal-500/15 via-blue-500/10 to-indigo-500/15 hover:from-teal-500/20 hover:via-blue-500/15 hover:to-indigo-500/20 dark:border-teal-400/25 dark:from-teal-500/20 dark:via-blue-500/15 dark:to-indigo-500/20",
    iconClassName: "text-teal-700 dark:text-teal-300",
  },
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
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full border text-foreground transition-colors font-body",
              "shadow-sm hover:shadow-md",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              action.className
            )}
          >
            <action.icon className={cn("w-4 h-4", action.iconClassName)} />
            {action.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
