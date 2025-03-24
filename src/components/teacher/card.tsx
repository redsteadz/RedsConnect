"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TeacherType } from "@/models/teacher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DatePickerDemo } from "@/components/datepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComboboxDemo } from "@/components/combobox";
import {
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { SessionType } from "@/models/sessions";

export default function TeacherCard({
  teacher,
  stdID,
}: {
  teacher: TeacherType;
  stdID: string | undefined;
}) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  // Let's try making a session
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(date);
      const dateString = date?.toLocaleDateString("en-CA").split("T")[0];
      //console.log(dateString);
      const dateTimeString = `${dateString}T${time}:00.000Z`;
      console.log(dateTimeString);
      //const dateTime = new Date(dateTimeString);
      //console.log(dateTime);
      const session: SessionType = {
        teacherId: teacher._id!,
        studentId: stdID!,
        dateTime: dateTimeString,
        // Will change
        duration: 1,

        // Will change
        status: "pending",
        // Will Change
        subject: "Math",
      };
      const resp = await axios.post("/api/sessions/book", session);
      if (resp.status === 200) {
        console.log("Session booked");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <Card key={teacher._id} className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder.svg" alt={teacher.name} />
            <AvatarFallback>
              {teacher.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{teacher.name}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>
                {teacher.averageRating} • {teacher.yoe} years experience
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {teacher.bio}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {teacher.subjects.slice(0, 3).map((subject) => (
            <Badge key={subject} variant="outline">
              {subject}
            </Badge>
          ))}
          {teacher.subjects.length > 3 && (
            <Badge variant="outline">+{teacher.subjects.length - 3} more</Badge>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm font-medium">Rs. {teacher.hourlyRate}/hr</div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Profile
            </Button>
            <Drawer>
              <DrawerTrigger>Book Session</DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>
                      This action cannot be undone.
                    </DrawerDescription>
                  </DrawerHeader>
                </div>
                <div className="mx-auto max-w-sm">
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                      {/* Date select  */}
                      <div className="space-y-2">
                        <Label>Choose a Date</Label>
                        <DatePickerDemo date={date} setDateAction={setDate} />
                      </div>
                      {/* Time select  */}
                      <Select onValueChange={setTime}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="21:00">09:00 PM</SelectItem>
                          <SelectItem value="16:00">04:00 PM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      {/* Subject select  */}
                      <ComboboxDemo />
                    </div>
                    <DrawerFooter>
                      <Button>Submit</Button>
                      <DrawerClose>Cancel</DrawerClose>
                    </DrawerFooter>
                  </form>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
