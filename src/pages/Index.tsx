import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { ChatInput } from "@/components/ChatInput";
import { QuickActions } from "@/components/QuickActions";
import { PregnancyProgressCard } from "@/components/PregnancyProgressCard";
import { HealthSummaryCard } from "@/components/HealthSummaryCard";
import { DailyRecommendationsCard } from "@/components/DailyRecommendationsCard";
import { AppointmentCard } from "@/components/AppointmentCard";
import { CommonQuestions } from "@/components/CommonQuestions";
import { useAuth } from "@/contexts/AuthContext";
import { Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const { user, profile } = useAuth();
  const firstName = profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "there";

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Week badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium">
            <Baby className="w-4 h-4" />
            Week 12 · First Trimester
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Welcome to MamaCare 👋
          </h1>
          <p className="text-muted-foreground mt-2 text-base">
            {user
              ? `Hi ${firstName}! How can I support your pregnancy journey today?`
              : "How can I support your pregnancy journey today?"}
          </p>
        </motion.div>

        {/* Chat Input */}
        <div className="mb-6 max-w-2xl mx-auto">
          <ChatInput />
        </div>

        {/* Quick Actions */}
        <div className="mb-10 flex justify-center">
          <QuickActions />
        </div>

        {/* Common Questions */}
        <div className="mb-10">
          <CommonQuestions />
        </div>

        {/* Dashboard Cards */}
        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <PregnancyProgressCard />
            <HealthSummaryCard />
            <DailyRecommendationsCard />
            <AppointmentCard />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="card-soft text-center">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Sign in to unlock your dashboard
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Get personalized health summaries, appointment reminders, and recommendations tailored to your pregnancy.
              </p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <Button asChild className="rounded-2xl">
                  <Link to="/auth">Sign in</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-2xl">
                  <Link to="/auth">Create account</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
