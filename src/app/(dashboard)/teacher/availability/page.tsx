"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, Button, Badge } from "@/components/ui";
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  Settings,
} from "lucide-react";
import { DAYS_OF_WEEK, DAY_LABELS } from "@/lib/utils";

interface TimeSlot {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

const initialSlots: TimeSlot[] = [
  { id: "1", dayOfWeek: "MONDAY", startTime: "09:00", endTime: "12:00" },
  { id: "2", dayOfWeek: "MONDAY", startTime: "14:00", endTime: "18:00" },
  { id: "3", dayOfWeek: "TUESDAY", startTime: "09:00", endTime: "12:00" },
  { id: "4", dayOfWeek: "TUESDAY", startTime: "14:00", endTime: "18:00" },
  { id: "5", dayOfWeek: "WEDNESDAY", startTime: "09:00", endTime: "12:00" },
  { id: "6", dayOfWeek: "WEDNESDAY", startTime: "14:00", endTime: "18:00" },
  { id: "7", dayOfWeek: "THURSDAY", startTime: "09:00", endTime: "12:00" },
  { id: "8", dayOfWeek: "THURSDAY", startTime: "14:00", endTime: "18:00" },
  { id: "9", dayOfWeek: "FRIDAY", startTime: "09:00", endTime: "12:00" },
  { id: "10", dayOfWeek: "FRIDAY", startTime: "14:00", endTime: "18:00" },
];

export default function TeacherAvailabilityPage() {
  const [slots, setSlots] = useState<TimeSlot[]>(initialSlots);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [maxClassesPerDay, setMaxClassesPerDay] = useState(6);
  const [bufferMinutes, setBufferMinutes] = useState(15);

  const addSlot = (dayOfWeek: string) => {
    const newSlot: TimeSlot = {
      id: `new-${Date.now()}`,
      dayOfWeek,
      startTime: "09:00",
      endTime: "12:00",
    };
    setSlots([...slots, newSlot]);
  };

  const removeSlot = (id: string) => {
    setSlots(slots.filter((s) => s.id !== id));
  };

  const updateSlot = (id: string, field: "startTime" | "endTime", value: string) => {
    setSlots(slots.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In production, POST to /api/teachers/availability
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const getDaySlots = (day: string) => slots.filter((s) => s.dayOfWeek === day);
  const totalHours = slots.reduce((sum, s) => {
    const start = s.startTime.split(":").map(Number);
    const end = s.endTime.split(":").map(Number);
    return sum + (end[0] * 60 + end[1] - (start[0] * 60 + start[1])) / 60;
  }, 0);

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              Manage Availability
            </h1>
            <p className="text-gray-500 mt-1">
              Set your weekly schedule so students can book classes with you
            </p>
          </div>
          <Button
            variant="primary"
            icon={saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            onClick={handleSave}
            isLoading={isSaving}
            className={saved ? "!bg-accent-500" : ""}
          >
            {saved ? "Saved!" : "Save Schedule"}
          </Button>
        </div>

        {/* Summary card */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-50">
                <Calendar className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Active Days</p>
                <p className="text-lg font-bold text-gray-900">
                  {new Set(slots.map((s) => s.dayOfWeek)).size} / 7
                </p>
              </div>
            </div>
          </Card>
          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent-50">
                <Clock className="w-4 h-4 text-accent-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Hours/Week</p>
                <p className="text-lg font-bold text-gray-900">{totalHours.toFixed(1)}h</p>
              </div>
            </div>
          </Card>
          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warm-50">
                <Settings className="w-4 h-4 text-warm-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Buffer Time</p>
                <p className="text-lg font-bold text-gray-900">{bufferMinutes} min</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Settings */}
        <Card>
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <label className="input-label">Max Classes Per Day</label>
              <input
                type="number"
                value={maxClassesPerDay}
                onChange={(e) => setMaxClassesPerDay(parseInt(e.target.value) || 1)}
                min={1}
                max={12}
                className="input-field w-24"
              />
            </div>
            <div>
              <label className="input-label">Buffer Between Classes</label>
              <select
                value={bufferMinutes}
                onChange={(e) => setBufferMinutes(parseInt(e.target.value))}
                className="input-field w-32"
              >
                <option value={10}>10 min</option>
                <option value={15}>15 min</option>
                <option value={20}>20 min</option>
                <option value={30}>30 min</option>
              </select>
            </div>
            <div className="ml-auto p-3 rounded-xl bg-blue-50 border border-blue-100">
              <p className="text-xs text-blue-700">
                <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                The scheduling engine uses these settings to auto-generate class schedules.
              </p>
            </div>
          </div>
        </Card>

        {/* Weekly Schedule Grid */}
        <div className="space-y-4">
          {DAYS_OF_WEEK.map((day) => {
            const daySlots = getDaySlots(day);
            const isActive = daySlots.length > 0;

            return (
              <Card key={day} padding="none" className={!isActive ? "opacity-60" : ""}>
                <div className="flex items-stretch">
                  {/* Day label */}
                  <div
                    className={`w-36 flex-shrink-0 flex items-center justify-center px-4 py-4 border-r border-gray-100 ${
                      isActive
                        ? "bg-primary-50 text-primary-700"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-sm font-bold">{DAY_LABELS[day]}</p>
                      <p className="text-[10px] mt-0.5 uppercase tracking-wide">
                        {daySlots.length} slot{daySlots.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Slots */}
                  <div className="flex-1 p-4">
                    {daySlots.length === 0 ? (
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span>No availability set</span>
                        <Button variant="ghost" size="sm" onClick={() => addSlot(day)}>
                          <Plus className="w-3.5 h-3.5 mr-1" /> Add Slot
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {daySlots.map((slot) => (
                          <div
                            key={slot.id}
                            className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 border border-gray-100"
                          >
                            <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <input
                              type="time"
                              value={slot.startTime}
                              onChange={(e) => updateSlot(slot.id, "startTime", e.target.value)}
                              className="px-2 py-1 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 w-28"
                            />
                            <span className="text-sm text-gray-400">to</span>
                            <input
                              type="time"
                              value={slot.endTime}
                              onChange={(e) => updateSlot(slot.id, "endTime", e.target.value)}
                              className="px-2 py-1 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 w-28"
                            />
                            <button
                              onClick={() => removeSlot(slot.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-danger-500 hover:bg-danger-50 transition-colors ml-auto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addSlot(day)}
                          className="!text-xs"
                        >
                          <Plus className="w-3 h-3 mr-1" /> Add Another Slot
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
