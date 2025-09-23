"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function StudentApplicationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", dob: "", gender: "",
    email: "", phone: "", address: "", city: "", state: "", postalCode: "",
    course: "", department: "", year: 1, rollNumber: "",
    hostel: "", hostelName: "", roomNumber: "", messPreference: "", roomPreference: "",
    guardianName: "", guardianPhone: "", emergencyContact: "", previousSchool: "",
    password: "", confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const name = (target as any).name as keyof typeof formData;
    const type = (target as any).type as string | undefined;
    const value = type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setFormData(prev => ({
      ...prev,
      [name]: value as any,
    }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.dob || !formData.gender || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.postalCode)
          return "Please fill all personal details.";
        break;
      case 2:
        if (!formData.course || !formData.department || !formData.year) return "Please fill all academic details.";
        if (formData.year > 1 && !formData.rollNumber) return "Roll number is required for students above 1st year.";
        break;
      case 3:
        if (!formData.hostel) return "Please select hostel requirement.";
        if (formData.hostel === "yes" && formData.year > 1) {
          if (!formData.hostelName || !formData.roomNumber) return "Hostel Name and Room Number are required.";
        }
        if (!formData.messPreference || !formData.roomPreference) return "Please select mess and room preferences.";
        break;
      case 4:
        if (!formData.guardianName || !formData.guardianPhone || !formData.emergencyContact) return "Please fill guardian/emergency details.";
        break;
      case 5:
        if (!formData.previousSchool || !formData.password || !formData.confirmPassword) return "Please fill education & password fields.";
        if (formData.password !== formData.confirmPassword) return "Passwords do not match.";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleNext = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (!submitted) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/student-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error || "Something went wrong. Try again.");
        return;
      }

      setSuccessMessage("Application submitted successfully!");
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-6">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-blue-200/80 via-purple-200/60 via-pink-200/40 to-transparent opacity-90 blur-sm transition-all duration-1500" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-blue-300/50 via-purple-300/30 to-transparent transition-all duration-1500" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-transparent transition-all duration-1500" />

        <div className="relative w-full max-w-3xl">
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">Application Submitted Successfully!</CardTitle>
              <CardDescription className="text-sm mt-0">
                Thank you for submitting your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-green-600 bg-green-50 p-4 rounded-md mb-4">
                Your application has been received and is being processed.
              </div>
              <Link href="/auth-page" className="font-medium text-emerald-600 hover:underline">
                Go to Login
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-6">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-blue-200/80 via-purple-200/60 via-pink-200/40 to-transparent opacity-90 blur-sm transition-all duration-1500" />
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-blue-300/50 via-purple-300/30 to-transparent transition-all duration-1500" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-transparent transition-all duration-1500" />

      <div className="relative w-full max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold">Student Application Form</CardTitle>
                <CardDescription className="text-sm mt-0">
                  {`Step ${step} of 5`}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Step 1: Personal Details */}
                  {step === 1 && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                        <Input name="firstName" value={formData.firstName} onChange={handleChange} required className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                        <Input name="lastName" value={formData.lastName} onChange={handleChange} required className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="dob" className="text-sm font-medium">DOB</Label>
                        <Input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="gender" className="text-sm font-medium">Gender</Label>
                        <Select value={formData.gender} onValueChange={(val) => setFormData({ ...formData, gender: val })}>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input name="email" type="email" value={formData.email} onChange={handleChange} required className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                        <Input name="phone" value={formData.phone} onChange={handleChange} required className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                        <Input name="address" value={formData.address} onChange={handleChange} required className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="city" className="text-sm font-medium">city</Label>
                        <Input name="city" value={formData.city} onChange={handleChange} required className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-sm font-medium">State</Label>
                        <Input name="state" value={formData.state} onChange={handleChange} required className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="postalCode" className="text-sm font-medium">Postal Code</Label>
                        <Input name="postalCode" value={formData.postalCode} onChange={handleChange} required className="h-10" />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Academic Info */}
                  {step === 2 && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="course" className="text-sm font-medium">Course</Label>
                        <Input name="course" value={formData.course} onChange={handleChange} required className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                        <Input name="department" value={formData.department} onChange={handleChange} required className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="year" className="text-sm font-medium">Year</Label>
                        <Input type="number" name="year" value={formData.year} onChange={handleChange} min={1} max={5} required className="h-10" />
                      </div>
                      {formData.year > 1 && (
                        <div>
                          <Label htmlFor="rollNumber" className="text-sm font-medium">Roll Number</Label>
                          <Input name="rollNumber" value={formData.rollNumber} onChange={handleChange} required className="h-10" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 3: Hostel Info */}
                  {step === 3 && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="hostel" className="text-sm font-medium">Hostel Required</Label>
                        <Select value={formData.hostel} onValueChange={(val) => setFormData({ ...formData, hostel: val })}>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select Option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.hostel === "yes" && formData.year > 1 && (
                        <>
                          <div>
                            <Label htmlFor="hostelName" className="text-sm font-medium">Hostel Name</Label>
                            <Input name="hostelName" value={formData.hostelName} onChange={handleChange} className="h-10" />
                          </div>
                          <div>
                            <Label htmlFor="roomNumber" className="text-sm font-medium">Room Number</Label>
                            <Input name="roomNumber" value={formData.roomNumber} onChange={handleChange} className="h-10" />
                          </div>
                        </>
                      )}
                      <div>
                        <Label htmlFor="messPreference" className="text-sm font-medium">Mess Preference</Label>
                        <Select value={formData.messPreference} onValueChange={(val) => setFormData({ ...formData, messPreference: val })}>
                          <SelectTrigger className="h-10"><SelectValue placeholder="Select Mess" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Veg">Veg</SelectItem>
                            <SelectItem value="Non-Veg">Non-Veg</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="roomPreference" className="text-sm font-medium">Room Preference</Label>
                        <Select value={formData.roomPreference} onValueChange={(val) => setFormData({ ...formData, roomPreference: val })}>
                          <SelectTrigger className="h-10"><SelectValue placeholder="Select Room" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AC">AC</SelectItem>
                            <SelectItem value="Non-AC">Non-AC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Guardian & Emergency */}
                  {step === 4 && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="guardianName" className="text-sm font-medium">Guardian Name</Label>
                        <Input name="guardianName" value={formData.guardianName} onChange={handleChange} required className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="guardianPhone" className="text-sm font-medium">Guardian Phone</Label>
                        <Input name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} required className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="emergencyContact" className="text-sm font-medium">Emergency Contact</Label>
                        <Input name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required className="h-10" />
                      </div>
                    </div>
                  )}

                  {/* Step 5: Education & Password */}
                  {step === 5 && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="previousSchool" className="text-sm font-medium">Previous School</Label>
                        <Input name="previousSchool" value={formData.previousSchool} onChange={handleChange} required className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <Input name="password" type="password" value={formData.password} onChange={handleChange} required className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                        <Input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className="h-10" />
                      </div>
                    </div>
                  )}

                  {/* Error & Success */}
                  {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-4">
                    {step > 1 && <Button type="button" onClick={handleBack} className="bg-gray-400 hover:bg-gray-500 text-white">Back</Button>}
                    {step < 5 && <Button type="button" onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white">Next</Button>}
                    {step === 5 && <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
                      {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</> : "Submit"}
                    </Button>}
                  </div>

                  {/* Already registered link */}
                  <div className="text-center pt-4 text-sm text-gray-600">
                    Already registered?{" "}
                    <Link href="/auth-page" className="font-medium text-emerald-600 hover:underline">
                      Go to Login
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}