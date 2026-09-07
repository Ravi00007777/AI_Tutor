"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Star,
  GraduationCap,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  ChevronDown,
  BookOpen,
  ArrowRight,
  Sparkles,
  Video,
  Menu,
  X,
} from "lucide-react";
import { Button, Badge, Card, StarRating } from "@/components/ui";
import { SUBJECTS, BOARDS, GRADES } from "@/lib/utils";

// Mock teachers data — will be replaced by API
const teachers = [
  {
    id: "1",
    name: "Rahul Sharma",
    avatarUrl: null,
    bio: "Passionate mathematics educator with 5+ years of experience teaching CBSE and ICSE students. Specializing in making complex concepts simple and engaging.",
    subjects: ["Mathematics", "Physics"],
    grades: ["8th", "9th", "10th", "11th", "12th"],
    boards: ["CBSE", "ICSE"],
    languages: ["English", "Hindi"],
    experienceYears: 5,
    hourlyRate: 500,
    monthlyRate: 8000,
    rating: 4.8,
    totalReviews: 43,
    currentStudents: 24,
    maxStudents: 30,
    isVerified: true,
    teachingStyle: "Interactive & Visual",
    matchScore: 94,
    matchReasons: ["Teaches Mathematics", "CBSE expert", "Within budget", "Highly rated (4.8/5)"],
  },
  {
    id: "2",
    name: "Priya Mehta",
    avatarUrl: null,
    bio: "IIT Bombay graduate with a passion for teaching physics. I use real-world examples and experiments to make physics intuitive and fun.",
    subjects: ["Physics"],
    grades: ["11th", "12th", "Competitive Exams"],
    boards: ["CBSE", "State Board"],
    languages: ["English", "Hindi", "Gujarati"],
    experienceYears: 7,
    hourlyRate: 700,
    monthlyRate: 12000,
    rating: 4.9,
    totalReviews: 67,
    currentStudents: 18,
    maxStudents: 25,
    isVerified: true,
    teachingStyle: "Conceptual & Problem-Solving",
    matchScore: 89,
    matchReasons: ["Physics specialist", "7 years experience", "IIT graduate", "Top rated"],
  },
  {
    id: "3",
    name: "Aman Kumar",
    avatarUrl: null,
    bio: "Chemistry teacher specializing in organic and inorganic chemistry for JEE and NEET preparation. 95% of my students improve their scores significantly.",
    subjects: ["Chemistry"],
    grades: ["11th", "12th", "Competitive Exams"],
    boards: ["CBSE"],
    languages: ["English", "Hindi"],
    experienceYears: 4,
    hourlyRate: 600,
    monthlyRate: 10000,
    rating: 4.6,
    totalReviews: 28,
    currentStudents: 15,
    maxStudents: 20,
    isVerified: true,
    teachingStyle: "Structured & Exam-Focused",
    matchScore: 84,
    matchReasons: ["Chemistry expert", "JEE/NEET focused", "Available on your preferred days"],
  },
  {
    id: "4",
    name: "Sneha Iyer",
    avatarUrl: null,
    bio: "English literature and language expert with Cambridge CELTA certification. I help students develop strong communication and writing skills.",
    subjects: ["English"],
    grades: ["6th", "7th", "8th", "9th", "10th"],
    boards: ["CBSE", "ICSE", "IB", "IGCSE"],
    languages: ["English", "Tamil"],
    experienceYears: 6,
    hourlyRate: 450,
    monthlyRate: 7000,
    rating: 4.7,
    totalReviews: 52,
    currentStudents: 20,
    maxStudents: 25,
    isVerified: true,
    teachingStyle: "Interactive & Discussion-Based",
    matchScore: 78,
    matchReasons: ["English specialist", "ICSE & IB experienced", "Great communicator"],
  },
  {
    id: "5",
    name: "Vikram Reddy",
    avatarUrl: null,
    bio: "Computer Science teacher with industry experience at top tech companies. I teach programming, data structures, and prepare students for tech careers.",
    subjects: ["Computer Science"],
    grades: ["11th", "12th", "Undergraduate"],
    boards: ["CBSE", "State Board"],
    languages: ["English", "Telugu", "Hindi"],
    experienceYears: 8,
    hourlyRate: 800,
    monthlyRate: 14000,
    rating: 4.9,
    totalReviews: 35,
    currentStudents: 12,
    maxStudents: 15,
    isVerified: true,
    teachingStyle: "Hands-on & Project-Based",
    matchScore: 72,
    matchReasons: ["CS expert", "Industry experience", "Highly rated"],
  },
  {
    id: "6",
    name: "Kavita Nair",
    avatarUrl: null,
    bio: "Experienced biology teacher specializing in NEET preparation. My students consistently score in the top percentile. Visual learning focused approach.",
    subjects: ["Biology"],
    grades: ["11th", "12th", "Competitive Exams"],
    boards: ["CBSE", "State Board"],
    languages: ["English", "Malayalam", "Hindi"],
    experienceYears: 9,
    hourlyRate: 650,
    monthlyRate: 11000,
    rating: 4.8,
    totalReviews: 71,
    currentStudents: 22,
    maxStudents: 25,
    isVerified: true,
    teachingStyle: "Visual & Diagram-Heavy",
    matchScore: 68,
    matchReasons: ["Biology specialist", "NEET focused", "9 years experience"],
  },
];

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
              <span className="text-gradient">Tutor</span>
              <span className="text-gray-900">Connect</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
              Log in
            </Link>
            <Link href="/register" className="px-5 py-2.5 text-sm font-semibold text-white gradient-primary rounded-xl shadow-lg shadow-primary-500/25">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");
  const [sortBy, setSortBy] = useState<"match" | "rating" | "price_low" | "price_high" | "experience">("match");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort teachers
  let filtered = teachers.filter((t) => {
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !t.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    if (selectedSubject && !t.subjects.includes(selectedSubject)) return false;
    if (selectedGrade && !t.grades.includes(selectedGrade)) return false;
    if (selectedBoard && !t.boards.includes(selectedBoard)) return false;
    return true;
  });

  // Sort
  filtered = filtered.sort((a, b) => {
    switch (sortBy) {
      case "rating": return b.rating - a.rating;
      case "price_low": return (a.monthlyRate || 0) - (b.monthlyRate || 0);
      case "price_high": return (b.monthlyRate || 0) - (a.monthlyRate || 0);
      case "experience": return b.experienceYears - a.experienceYears;
      default: return (b.matchScore || 0) - (a.matchScore || 0);
    }
  });

  return (
    <main className="min-h-screen bg-[#f8f9ff]">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Find Your <span className="text-gradient">Perfect Teacher</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              Browse our verified teachers, see compatibility scores, and book a free demo class
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, subject, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 text-base outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-700 hover:border-primary-300 hover:bg-primary-50 transition-all"
          >
            <Filter className="w-4 h-4" />
            Filters
            {(selectedSubject || selectedGrade || selectedBoard) && (
              <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">
                {[selectedSubject, selectedGrade, selectedBoard].filter(Boolean).length}
              </span>
            )}
          </button>

          {/* Quick subject filters */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"].map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(selectedSubject === subject ? "" : subject)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedSubject === subject
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 focus:border-primary-500 outline-none bg-white"
            >
              <option value="match">Best Match</option>
              <option value="rating">Highest Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="mb-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm animate-fade-in">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="input-label">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Subjects</option>
                  {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="input-label">Grade/Class</label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Grades</option>
                  {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="input-label">Board/Curriculum</label>
                <select
                  value={selectedBoard}
                  onChange={(e) => setSelectedBoard(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Boards</option>
                  {BOARDS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>
            {(selectedSubject || selectedGrade || selectedBoard) && (
              <button
                onClick={() => {
                  setSelectedSubject("");
                  setSelectedGrade("");
                  setSelectedBoard("");
                }}
                className="mt-4 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing <strong>{filtered.length}</strong> teachers
          {selectedSubject && ` for ${selectedSubject}`}
        </p>

        {/* Teacher cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((teacher) => (
            <Card key={teacher.id} padding="none" hover className="overflow-hidden">
              {/* Match score ribbon */}
              {teacher.matchScore && teacher.matchScore >= 80 && (
                <div className="px-6 py-2 bg-gradient-to-r from-primary-50 to-purple-50 border-b border-primary-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary-500" />
                    <span className="text-sm font-bold text-primary-700">
                      {teacher.matchScore}% Match
                    </span>
                  </div>
                  <Badge variant="primary">Recommended</Badge>
                </div>
              )}

              <div className="p-6">
                {/* Teacher header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {teacher.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">{teacher.name}</h3>
                      {teacher.isVerified && (
                        <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <StarRating rating={teacher.rating} size="sm" />
                      <span className="text-xs text-gray-500">({teacher.totalReviews} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {teacher.subjects.map((subject) => (
                        <Badge key={subject} variant="primary">{subject}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{teacher.bio}</p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{teacher.experienceYears} yrs experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{teacher.currentStudents} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span>{teacher.boards.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span>{teacher.grades[0]}–{teacher.grades[teacher.grades.length - 1]}</span>
                  </div>
                </div>

                {/* Match reasons */}
                {teacher.matchReasons && teacher.matchReasons.length > 0 && (
                  <div className="mb-4 p-3 rounded-xl bg-accent-50/50 border border-accent-100">
                    <p className="text-xs font-bold text-accent-700 mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Why this teacher
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {teacher.matchReasons.slice(0, 3).map((reason, i) => (
                        <span key={i} className="text-xs text-accent-600 bg-accent-100 px-2 py-0.5 rounded-full">
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-lg font-bold text-gray-900">₹{teacher.monthlyRate?.toLocaleString()}<span className="text-sm font-normal text-gray-500">/month</span></p>
                    <p className="text-xs text-gray-500">₹{teacher.hourlyRate}/hr</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/teachers/${teacher.id}`}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </Link>
                    <Link href={`/student/teachers/${teacher.id}/book-demo`}>
                      <Button variant="primary" size="sm" icon={<Video className="w-4 h-4" />}>
                        Book Demo
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
