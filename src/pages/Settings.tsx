import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type LocalSettings = {
  dueDate: string; // YYYY-MM-DD
  units: "metric" | "imperial";
  notificationsDailyTips: boolean;
  notificationsAppointmentReminders: boolean;
  notificationsWeeklySummary: boolean;
  shareAnonymizedAnalytics: boolean;
};

const LOCAL_SETTINGS_KEY = "mamacare.settings.v1";

const defaultLocalSettings: LocalSettings = {
  dueDate: "",
  units: "metric",
  notificationsDailyTips: true,
  notificationsAppointmentReminders: true,
  notificationsWeeklySummary: true,
  shareAnonymizedAnalytics: true,
};

function readLocalSettings(): LocalSettings {
  try {
    const raw = localStorage.getItem(LOCAL_SETTINGS_KEY);
    if (!raw) return defaultLocalSettings;
    const parsed = JSON.parse(raw) as Partial<LocalSettings>;
    return { ...defaultLocalSettings, ...parsed };
  } catch {
    return defaultLocalSettings;
  }
}

function writeLocalSettings(next: LocalSettings) {
  localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(next));
}

function formatEmail(email?: string | null) {
  if (!email) return "";
  return email;
}

function tryComputeWeekFromDueDate(dueDate: string) {
  // Rough estimate: pregnancy length ≈ 280 days. Week = 40 - weeks until due.
  const d = new Date(dueDate);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysUntilDue = Math.round((d.getTime() - now.getTime()) / msPerDay);
  const weeksUntilDue = Math.max(0, Math.floor(daysUntilDue / 7));
  const week = Math.max(1, Math.min(40, 40 - weeksUntilDue));
  return week;
}

export default function Settings() {
  const { user, profile, loading } = useAuth();
  const [savingProfile, setSavingProfile] = useState(false);
  const [localSettings, setLocalSettings] = useState<LocalSettings>(() => readLocalSettings());

  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? "");

  useEffect(() => {
    setFullName(profile?.full_name ?? "");
    setAvatarUrl(profile?.avatar_url ?? "");
  }, [profile?.full_name, profile?.avatar_url]);

  useEffect(() => {
    writeLocalSettings(localSettings);
  }, [localSettings]);

  const computedWeek = useMemo(() => {
    if (!localSettings.dueDate) return null;
    return tryComputeWeekFromDueDate(localSettings.dueDate);
  }, [localSettings.dueDate]);

  const handleSaveProfile = async () => {
    if (!user) {
      toast.error("Please sign in to update your profile.");
      return;
    }

    setSavingProfile(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim() || null,
          avatar_url: avatarUrl.trim() || null,
        })
        .eq("user_id", user.id);

      if (error) throw error;
      toast.success("Settings saved");
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to save settings");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleResetLocal = () => {
    localStorage.removeItem(LOCAL_SETTINGS_KEY);
    setLocalSettings(defaultLocalSettings);
    toast.success("Local preferences cleared");
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-6"
        >
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and how MamaCare supports your pregnancy journey.
          </p>
        </motion.div>

        {loading ? (
          <div className="card-soft max-w-2xl">
            <div className="h-4 w-40 bg-muted rounded mb-3" />
            <div className="h-4 w-72 bg-muted rounded" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="font-display text-xl">Account</CardTitle>
                <CardDescription>Update your profile details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className="h-11 rounded-2xl"
                    disabled={!user}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={formatEmail(user?.email)}
                    readOnly
                    className="h-11 rounded-2xl"
                    disabled
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="avatarUrl">Avatar URL (optional)</Label>
                  <Input
                    id="avatarUrl"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://…"
                    className="h-11 rounded-2xl"
                    disabled={!user}
                  />
                </div>

                {!user && (
                  <div className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                    You’re not signed in.{" "}
                    <Link to="/auth" className="text-primary font-medium hover:underline">
                      Sign in
                    </Link>{" "}
                    to update your profile.
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Button
                    className="rounded-2xl"
                    onClick={handleSaveProfile}
                    disabled={!user || savingProfile}
                  >
                    {savingProfile ? "Saving…" : "Save"}
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    Changes apply across devices when signed in.
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="font-display text-xl">Pregnancy preferences</CardTitle>
                <CardDescription>Used to personalize your timeline and reminders.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="dueDate">Estimated due date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={localSettings.dueDate}
                    onChange={(e) => setLocalSettings((s) => ({ ...s, dueDate: e.target.value }))}
                    className={cn("h-11 rounded-2xl", !localSettings.dueDate && "text-muted-foreground")}
                  />
                  {computedWeek ? (
                    <p className="text-xs text-muted-foreground">
                      Estimated current week: <span className="font-medium text-foreground">Week {computedWeek}</span>
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">Add a due date to estimate your current week.</p>
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-medium text-foreground">Units</p>
                    <p className="text-xs text-muted-foreground">Choose metric or imperial measurements.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={localSettings.units === "metric" ? "default" : "outline"}
                      className="rounded-2xl"
                      onClick={() => setLocalSettings((s) => ({ ...s, units: "metric" }))}
                    >
                      Metric
                    </Button>
                    <Button
                      type="button"
                      variant={localSettings.units === "imperial" ? "default" : "outline"}
                      className="rounded-2xl"
                      onClick={() => setLocalSettings((s) => ({ ...s, units: "imperial" }))}
                    >
                      Imperial
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="font-display text-xl">Notifications</CardTitle>
                <CardDescription>Control the reminders and tips you see in-app.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-medium text-foreground">Daily tips</p>
                    <p className="text-xs text-muted-foreground">Short helpful insights tailored to your week.</p>
                  </div>
                  <Switch
                    checked={localSettings.notificationsDailyTips}
                    onCheckedChange={(v) =>
                      setLocalSettings((s) => ({ ...s, notificationsDailyTips: Boolean(v) }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-medium text-foreground">Appointment reminders</p>
                    <p className="text-xs text-muted-foreground">Helpful nudges before upcoming clinic visits.</p>
                  </div>
                  <Switch
                    checked={localSettings.notificationsAppointmentReminders}
                    onCheckedChange={(v) =>
                      setLocalSettings((s) => ({ ...s, notificationsAppointmentReminders: Boolean(v) }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-medium text-foreground">Weekly summary</p>
                    <p className="text-xs text-muted-foreground">A weekly snapshot of your progress and next steps.</p>
                  </div>
                  <Switch
                    checked={localSettings.notificationsWeeklySummary}
                    onCheckedChange={(v) =>
                      setLocalSettings((s) => ({ ...s, notificationsWeeklySummary: Boolean(v) }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="font-display text-xl">Privacy</CardTitle>
                <CardDescription>Choose how your data is used.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-medium text-foreground">Share anonymized analytics</p>
                    <p className="text-xs text-muted-foreground">
                      Helps improve the app by collecting anonymous usage signals.
                    </p>
                  </div>
                  <Switch
                    checked={localSettings.shareAnonymizedAnalytics}
                    onCheckedChange={(v) =>
                      setLocalSettings((s) => ({ ...s, shareAnonymizedAnalytics: Boolean(v) }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-medium text-foreground">Clear local preferences</p>
                    <p className="text-xs text-muted-foreground">Resets unit, notifications, and due date on this device.</p>
                  </div>
                  <Button type="button" variant="outline" className="rounded-2xl" onClick={handleResetLocal}>
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

