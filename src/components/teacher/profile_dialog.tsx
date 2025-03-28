"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Clock,
  Briefcase,
  GraduationCap,
  Mail,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export interface TeacherType {
  _id?: string;
  name: string;
  email?: string;
  password?: string;
  qualifications: string[];
  bio: string;
  yoe: number;
  subjects: string[];
  hourlyRate: number;
  averageRating?: number;
  availability: ("online" | "in-person" | "both")[];
  avatarUrl?: string;
}

const mockTeacher: TeacherType = {
  _id: "t123456",
  name: "Dr. Sarah Johnson",
  qualifications: [
    "Ph.D. in Mathematics",
    "M.Sc. in Computer Science",
    "B.Sc. in Physics",
  ],
  bio: "Passionate educator with over 10 years of experience teaching mathematics and computer science. I specialize in making complex concepts accessible to students of all levels.",
  yoe: 10,
  subjects: ["Mathematics", "Computer Science", "Data Science", "Statistics"],
  hourlyRate: 65,
  averageRating: 4.8,
  availability: ["online", "in-person"],
  avatarUrl: "/placeholder.svg?height=200&width=200",
};

export function ProfileDialog({ teacher }: { teacher: TeacherType }) {
  const [isOpen, setIsOpen] = useState(false);
  //const teacher = mockTeacher;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("");
  };

  const renderStars = (rating = 0) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : i < rating
                  ? "text-yellow-400 fill-yellow-400 opacity-50"
                  : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const renderAvailabilityBadge = (type: "online" | "in-person" | "both") => {
    const colors = {
      online:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      "in-person":
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
      both: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    };

    const icons = {
      online: <MapPin className="mr-1 h-3 w-3" />,
      "in-person": <MapPin className="mr-1 h-3 w-3" />,
      both: <MapPin className="mr-1 h-3 w-3" />,
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[type]}`}
      >
        {icons[type]}
        {type === "online"
          ? "Online"
          : type === "in-person"
            ? "In-person"
            : "Both"}
      </span>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold">
              Teacher Profile
            </DialogTitle>
            <DialogDescription>
              View detailed information about this teacher
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={teacher.avatarUrl} alt={teacher.name} />
              <AvatarFallback className="text-lg">
                {getInitials(teacher.name)}
              </AvatarFallback>
            </Avatar>

            <h2 className="text-xl font-bold">{teacher.name}</h2>

            <div className="mt-2">{renderStars(teacher.averageRating)}</div>

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {teacher.availability.map((type) => (
                <div key={type} className="mx-1">
                  {renderAvailabilityBadge(type)}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                Experience
              </h3>
              <p className="mt-1">{teacher.yoe} years</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Hourly Rate
              </h3>
              <p className="mt-1">{teacher.hourlyRate} RS/hour</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" />
                Qualifications
              </h3>
              <div className="mt-1 flex flex-wrap gap-2">
                {teacher.qualifications.map((qual) => (
                  <Badge key={qual} variant="outline" className="font-normal">
                    {qual}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Subjects
              </h3>
              <div className="mt-1 flex flex-wrap gap-2">
                {teacher.subjects.map((subject) => (
                  <Badge
                    key={subject}
                    variant="secondary"
                    className="font-normal"
                  >
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
              <p className="mt-1 text-sm">{teacher.bio}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              className="mr-2"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
