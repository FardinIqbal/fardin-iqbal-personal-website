"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Eye,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Globe,
  type LucideIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";

// Mock data - in production, fetch from analytics API
const trafficData = [
  { date: "Mon", views: 120, visitors: 80 },
  { date: "Tue", views: 180, visitors: 120 },
  { date: "Wed", views: 240, visitors: 160 },
  { date: "Thu", views: 200, visitors: 140 },
  { date: "Fri", views: 320, visitors: 220 },
  { date: "Sat", views: 280, visitors: 180 },
  { date: "Sun", views: 260, visitors: 170 },
];

const deviceData = [
  { name: "Desktop", value: 55, color: "#6366f1" },
  { name: "Mobile", value: 35, color: "#8b5cf6" },
  { name: "Tablet", value: 10, color: "#a855f7" },
];

const recentActivity = [
  { type: "message", text: "New message from John Doe", time: "2 min ago" },
  { type: "view", text: "Someone viewed your portfolio", time: "5 min ago" },
  { type: "view", text: "Project 'FairShare' was clicked", time: "12 min ago" },
  { type: "message", text: "New message from recruiter", time: "1 hour ago" },
  { type: "view", text: "Blog post viewed", time: "2 hours ago" },
];

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  delay?: number;
}

function StatCard({ title, value, change, icon: Icon, delay = 0 }: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary-500 to-purple-500 opacity-0 blur-xl"
        animate={{ opacity: isHovered ? 0.3 : 0 }}
      />

      <motion.div
        className="relative p-6 rounded-2xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-white/5 overflow-hidden"
        animate={{ y: isHovered ? -4 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-foreground-muted text-sm font-medium mb-1">
              {title}
            </p>
            <motion.p
              className="text-3xl font-bold text-foreground"
              initial={{ scale: 1 }}
              animate={{ scale: isHovered ? 1.05 : 1 }}
            >
              {value}
            </motion.p>
            <div
              className={cn(
                "flex items-center gap-1 mt-2 text-sm font-medium",
                isPositive ? "text-green-400" : "text-red-400"
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(change)}%</span>
              <span className="text-foreground-muted font-normal">vs last week</span>
            </div>
          </div>

          <motion.div
            className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-6 h-6 text-primary-400" />
          </motion.div>
        </div>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-bl-full"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

function TrafficChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="p-6 rounded-2xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-white/5"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Traffic Overview</h3>
          <p className="text-sm text-foreground-muted">Views and visitors this week</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary-500" />
            <span className="text-foreground-muted">Views</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-foreground-muted">Visitors</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={trafficData}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a2e",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            }}
            labelStyle={{ color: "#e5e7eb" }}
          />
          <Area
            type="monotone"
            dataKey="views"
            stroke="#6366f1"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorViews)"
          />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#8b5cf6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorVisitors)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

function DeviceChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="p-6 rounded-2xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-white/5"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Device Breakdown</h3>

      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={deviceData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {deviceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a2e",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-4">
        {deviceData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-foreground-muted">
              {item.name} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="p-6 rounded-2xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-white/5"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>

      <div className="space-y-4">
        {recentActivity.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div
              className={cn(
                "p-2 rounded-lg",
                activity.type === "message"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-blue-500/10 text-blue-400"
              )}
            >
              {activity.type === "message" ? (
                <MessageSquare className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{activity.text}</p>
              <p className="text-xs text-foreground-muted flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                {activity.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const [liveVisitors, setLiveVisitors] = useState(3);

  // Simulate live visitor count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors((prev) => Math.max(1, prev + Math.floor(Math.random() * 3) - 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-foreground-muted">Welcome back! Here's what's happening.</p>
        </div>

        {/* Live indicator */}
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-sm text-green-400 font-medium">
            {liveVisitors} live now
          </span>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Views"
          value="12,847"
          change={12.5}
          icon={Eye}
          delay={0}
        />
        <StatCard
          title="Unique Visitors"
          value="4,392"
          change={8.2}
          icon={Users}
          delay={0.1}
        />
        <StatCard
          title="Messages"
          value="23"
          change={-5.1}
          icon={MessageSquare}
          delay={0.2}
        />
        <StatCard
          title="Engagement"
          value="68%"
          change={15.3}
          icon={TrendingUp}
          delay={0.3}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrafficChart />
        </div>
        <DeviceChart />
      </div>

      {/* Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-white/5"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "New Blog Post", icon: FileText, href: "/dashboard/content" },
              { label: "View Messages", icon: MessageSquare, href: "/dashboard/messages" },
              { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
              { label: "View Site", icon: Globe, href: "/" },
            ].map((action, i) => (
              <motion.a
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary-500/30 hover:bg-primary-500/5 transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <action.icon className="w-6 h-6 text-primary-400" />
                <span className="text-sm text-foreground-muted">{action.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Import for BarChart3 and FileText
import { BarChart3, FileText } from "lucide-react";
