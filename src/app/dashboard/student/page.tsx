"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  Clock,
  Search,
  Star,
  User,
} from "lucide-react";
import { StudentType } from "@/models/student";
import { TeacherType } from "@/models/teacher";
import {
  getSessionsWithTeachers,
  teachers as allTeachers,
  type Session,
  type Teacher,
} from "@/lib/mock-data";
import axios from "axios";
import TeacherCard from "@/components/teacher/card";


export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("sessions");
  const [searchQuery, setSearchQuery] = useState("");
  const [sessions, setSessions] = useState<(Session & { teacher: Teacher })[]>(
    [],
  );
  const [filteredSessions, setFilteredSessions] = useState<
    (Session & { teacher: Teacher })[]
  >([]);
  const [teachers, setTeachers] = useState<TeacherType[]>([]);

  const [filteredTeachers, setFilteredTeachers] = useState<TeacherType[]>([]);

  const [curStd, setStd] = useState<StudentType>();
  useEffect(() => {
    // Load profile data
    const fetchData = async () => {
      const resp = await axios.get("/api/me");
      const std: StudentType = resp.data.profile;
      setStd(std);

      const sessionsWithTeachers = getSessionsWithTeachers();
      setSessions(sessionsWithTeachers);
      setFilteredSessions(sessionsWithTeachers);

      // Get all teachers data
      const tch: TeacherType[] = (await axios.get("/api/teachers/getAll")).data
        .profiles;
      setTeachers(tch);
      setFilteredTeachers(allTeachers);
    };
    fetchData();
  }, []);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSessions(sessions);
      setFilteredTeachers(teachers);
      return;
    }

    const query = searchQuery.toLowerCase();

    if (activeTab === "sessions") {
      const filtered = sessions.filter(
        (session) =>
          session.subject.toLowerCase().includes(query) ||
          session.teacher.name.toLowerCase().includes(query),
      );
      setFilteredSessions(filtered);
    } else {
      const filtered = teachers.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(query) ||
          teacher.subjects.some((subject) =>
            subject.toLowerCase().includes(query),
          ),
      );
      setFilteredTeachers(filtered);
    }
  }, [searchQuery, activeTab, sessions, teachers]);

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Format time
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "accepted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="px-4 container py-8">
      {/* Student Profile */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          {curStd && (
            <>
              <Avatar className="w-24 h-24">
                <AvatarImage src="/icon.svg" alt={curStd.name} />
                <AvatarFallback className="text-2xl">
                  {curStd.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{curStd.name}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>
                      {curStd.educationLevel.charAt(0).toUpperCase() +
                        curStd.educationLevel.slice(1)}{" "}
                      Student
                    </span>
                  </div>
                  <div className="hidden sm:block">•</div>
                  <div>{curStd.institution}</div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {curStd.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`Search ${activeTab === "sessions" ? "sessions" : "teachers"}...`}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="sessions" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
          </TabsList>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Your Sessions</h2>

            {filteredSessions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No sessions found. Try a different search term.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSessions.map((session) => (
                  <Card key={session._id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          className="capitalize"
                          variant={
                            session.status === "rejected"
                              ? "destructive"
                              : session.status === "completed"
                                ? "outline"
                                : session.status === "accepted"
                                  ? "default"
                                  : "secondary"
                          }
                        >
                          {session.status}
                        </Badge>
                        <div className="text-sm font-medium text-muted-foreground">
                          {session.duration} mins
                        </div>
                      </div>

                      <h3 className="font-semibold text-base line-clamp-1">
                        {session.subject}
                      </h3>

                      <div className="flex items-center mt-2 mb-3">
                        <Avatar className="w-6 h-6 mr-2">
                          <AvatarImage
                            src="/placeholder.svg"
                            alt={session.teacher.name}
                          />
                          <AvatarFallback className="text-xs">
                            {session.teacher.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {session.teacher.name}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-3 w-3" />
                          <span>{formatDate(session.dateTime)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-3 w-3" />
                          <span>{formatTime(session.dateTime)}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {session.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-8 text-xs px-2"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs px-2"
                            >
                              Reschedule
                            </Button>
                          </>
                        )}
                        {session.status === "accepted" && (
                          <>
                            <Button size="sm" className="h-8 text-xs px-2">
                              Join
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs px-2"
                            >
                              Message
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-8 text-xs px-2"
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {session.status === "completed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs px-2"
                          >
                            Leave Review
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers" className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Your Teachers</h2>

            {filteredTeachers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No teachers found. Try a different search term.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTeachers.map((teacher) => (
                  <TeacherCard
                    key={teacher._id}
                    teacher={teacher}
                    stdID={curStd?._id}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
