import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { ChatInput } from "@/components/ChatInput";
import { QuickActions } from "@/components/QuickActions";
import { CommonQuestions } from "@/components/CommonQuestions";
import { useAuth } from "@/contexts/AuthContext";

export default function NewChat() {
  const { profile, user } = useAuth();
  const firstName = profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "there";

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">New chat</h1>
          <p className="text-muted-foreground mt-2 text-base">
            Hi {firstName}! Ask anything about your pregnancy, symptoms, nutrition, sleep, or appointments.
          </p>
        </motion.div>

        <div className="mb-6 max-w-2xl mx-auto">
          <ChatInput />
        </div>

        <div className="mb-10 flex justify-center">
          <QuickActions />
        </div>

        <div className="mb-10">
          <CommonQuestions />
        </div>
      </div>
    </AppLayout>
  );
}

