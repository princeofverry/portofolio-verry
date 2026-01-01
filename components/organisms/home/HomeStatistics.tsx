"use client"
import { Github, Star, GitBranch, GitPullRequest, GitMerge } from "lucide-react"
import { GitHubCalendar } from "react-github-calendar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const HomeStatistics = () => {
  const stats = [
    { label: "Total Stars", value: "124", icon: <Star size={16} className="text-yellow-400" /> },
    { label: "Repositories", value: "48", icon: <GitBranch size={16} className="text-blue-400" /> },
    { label: "Pull Requests", value: "89", icon: <GitPullRequest size={16} className="text-purple-400" /> },
    { label: "Total Merges", value: "72", icon: <GitMerge size={16} className="text-pink-400" /> },
  ]

  return (
    <section className="text-white mt-32 pad-x">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-2 bg-neutral-800/50 rounded-lg cursor-help border border-neutral-700/50">
                    <Github size={20} className="text-green-400" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>GitHub Contributions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                GitHub Activity
              </h2>
              <a
                href="https://github.com/princeofverry"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-neutral-500 hover:text-green-400 transition-colors"
              >
                @princeofverry
              </a>
            </div>
          </div>
          <p className="text-neutral-400 max-w-lg">
            My open-source contributions and development activity over the past year.
          </p>
        </div>

        {/* Stats Grid - added this to solve the "empty" space issue */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-neutral-900/40 border border-neutral-800/50 rounded-xl p-4 flex flex-col gap-1 hover:bg-neutral-800/40 transition-all group"
            >
              <div className="flex items-center gap-2 text-neutral-400 group-hover:text-white transition-colors">
                {stat.icon}
                <span className="text-xs uppercase tracking-wider font-semibold">{stat.label}</span>
              </div>
              <span className="text-2xl font-bold font-mono">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-neutral-800/50 rounded-2xl p-8 shadow-2xl hover:border-neutral-700/50 transition-all relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/5 blur-[100px] pointer-events-none" />

          <div className="relative overflow-x-auto pb-2 scrollbar-hide">
            <TooltipProvider delayDuration={50}>
              <GitHubCalendar
                username="princeofverry"
                blockSize={12}
                blockMargin={4}
                fontSize={12}
                showWeekdayLabels
                theme={{
                  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                }}
                style={{
                  color: "#737373",
                }}
                renderBlock={(block, activity) => (
                  <Tooltip key={activity.date}>
                    <TooltipTrigger asChild>{block}</TooltipTrigger>
                    <TooltipContent className="text-xs rounded-sm px-2 py-1">
                      <p>
                        {activity.count} {activity.count === 1 ? "contribution" : "contributions"} on{" "}
                        {new Date(activity.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )}
              />
            </TooltipProvider>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeStatistics
