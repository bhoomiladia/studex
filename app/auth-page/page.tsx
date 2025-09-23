"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn, getSession } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { UserRole, AdminSubRole } from "@/lib/types"
import { Loader2, GraduationCap, Eye, EyeOff } from "lucide-react"

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)

    // --- Common states ---
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()

    // --- Signup-only states ---
    const [name, setName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // --- Role states ---
    const [selectedRole, setSelectedRole] = useState<UserRole>("student")
    const [selectedAdminSubRole, setSelectedAdminSubRole] = useState<AdminSubRole | "">("")

    useEffect(() => {
        const message = searchParams?.get("message")
        if (message) {
            setSuccessMessage(message)
            setIsLogin(true)
        }
    }, [searchParams])

    const handleRoleChange = (role: UserRole) => {
        setSelectedRole(role)
        if (role !== "admin") {
            setSelectedAdminSubRole("")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccessMessage("")
        setIsLoading(true)

        try {
            if (isLogin) {
                // --- Login flow ---
                if (selectedRole === "admin" && !selectedAdminSubRole) {
                    setError("Please select an admin type")
                    setIsLoading(false)
                    return
                }

                const result = await signIn("credentials", {
                    email,
                    password,
                    role: selectedRole,
                    adminSubRole:
                        selectedRole === "admin" ? selectedAdminSubRole : undefined,
                    redirect: false,
                })

                if (result?.error) {
                    setError("Invalid credentials or role mismatch")
                } else if (result?.ok) {
                    const session = await getSession()
                    if (session?.user) {
                        router.push(`/dashboard/${selectedRole}`)
                    }
                }
            } else {
                // --- Signup flow (Admins only) ---
                if (selectedRole !== "admin") {
                    setError("Only admins can sign up here. Students must apply via application.")
                    setIsLoading(false)
                    return
                }
                if (!name.trim()) {
                    setError("Name is required")
                    setIsLoading(false)
                    return
                }
                if (password.length < 6) {
                    setError("Password must be at least 6 characters long")
                    setIsLoading(false)
                    return
                }
                if (password !== confirmPassword) {
                    setError("Passwords do not match")
                    setIsLoading(false)
                    return
                }
                if (!selectedAdminSubRole) {
                    setError("Admin sub-role is required for admin users")
                    setIsLoading(false)
                    return
                }

                const response = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        role: "admin",
                        adminSubRole: selectedAdminSubRole,
                    }),
                })

                const data = await response.json()
                if (response.ok) {
                    setIsLogin(true)
                    setSuccessMessage("Account created successfully. Please sign in.")
                } else {
                    setError(data.error || "Signup failed. Please try again.")
                }
            }
        } catch {
            setError("Request failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-6">
            {/* Background (Unchanged) */}
            <div
                className={`absolute top-0 left-0 right-0 h-64 transition-all duration-1500 ease-in-out ${isLogin
                        ? "bg-gradient-to-br from-emerald-200/80 via-teal-200/60 via-cyan-200/40 to-transparent"
                        : "bg-gradient-to-br from-blue-200/80 via-purple-200/60 via-pink-200/40 to-transparent"
                    } opacity-90 blur-sm`}
            />
            <div
                className={`absolute top-0 left-0 right-0 h-48 transition-all duration-1500 ease-in-out ${isLogin
                        ? "bg-gradient-to-br from-emerald-300/50 via-teal-300/30 to-transparent"
                        : "bg-gradient-to-br from-blue-300/50 via-purple-300/30 to-transparent"
                    }`}
            />
            <div
                className={`absolute top-0 left-0 right-0 h-32 transition-all duration-1500 ease-in-out ${isLogin
                        ? "bg-gradient-to-br from-emerald-400/30 via-teal-400/20 to-transparent"
                        : "bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-transparent"
                    }`}
            />

            <div className="relative w-full max-w-6xl flex items-center justify-center gap-10">
                {/* Panel 1 */}
                <motion.div
                    layout
                    transition={{ duration: 1.5, type: "spring", bounce: 0.1 }}
                    className={`flex-1 flex flex-col justify-center px-6 ${isLogin ? "order-1" : "order-2"
                        }`}
                >
                    <h1 className="text-4xl font-bold mb-4 text-gray-900">
                        Fast, Efficient and Productive
                    </h1>
                    <p className="text-lg leading-relaxed text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                        ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
                        non massa sem.

                        <div className="text-center pt-2 text-sm text-gray-600">
                            New Student?{" "}
                            <a
                                href="/student-application"
                                className="font-medium text-emerald-600 hover:underline"
                            >
                                Fill your form here
                            </a>{" "}
                            or{" "}
                            <a
                                href="/login"
                                className="font-medium text-emerald-600 hover:underline"
                            >
                                Login if existing
                            </a>
                            .
                        </div>

                    </p>
                </motion.div>

                {/* Panel 2 */}
                <motion.div
                    layout
                    transition={{ duration: 1.5, type: "spring", bounce: 0.1 }}
                    className={`flex-1 max-w-lg ${isLogin ? "order-2" : "order-1"}`}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isLogin ? "login" : "signup"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            <Card className="border-0 shadow-lg rounded-2xl">
                                <CardHeader className="text-center space-y-2">
                                    <div className="flex justify-center mb-0">
                                        <div
                                            className={`p-3 rounded-full transition-colors duration-300 ${isLogin ? "bg-emerald-500" : "bg-blue-500"
                                                }`}
                                        >
                                            <GraduationCap className="h-8 w-8 text-white" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-2xl font-bold">
                                        {isLogin ? "Sign In" : "Create Account"}
                                    </CardTitle>
                                    <CardDescription className="text-sm mt-0">
                                        {isLogin
                                            ? "Sign in to access your dashboard"
                                            : "Sign up to access the College ERP System"}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-2">
                                    <form onSubmit={handleSubmit} className="space-y-2">
                                        {/* Name for Admin Signup */}
                                        {!isLogin && selectedRole === "admin" && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="space-y-2 overflow-hidden"
                                            >
                                                <Label htmlFor="name" className="text-sm font-medium">
                                                    Full Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    className="h-10 border-1 border-gray-300"
                                                />
                                            </motion.div>
                                        )}

                                        {/* Role Selection */}
                                        <div className="space-y-2">
                                            <Label htmlFor="role" className="text-sm font-medium">
                                                Role
                                            </Label>
                                            <Select
                                                value={selectedRole}
                                                onValueChange={(val: UserRole) => handleRoleChange(val)}
                                            >
                                                <SelectTrigger className="h-10">
                                                    <SelectValue placeholder="Select your role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {isLogin ? (
                                                        <>
                                                            <SelectItem value="student">Student</SelectItem>
                                                            <SelectItem value="admin">Admin</SelectItem>
                                                        </>
                                                    ) : (
                                                        <SelectItem value="admin">Admin</SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Admin SubRole */}
                                        {selectedRole === "admin" && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="space-y-2 overflow-hidden"
                                            >
                                                <Label
                                                    htmlFor="adminSubRole"
                                                    className="text-sm font-medium"
                                                >
                                                    Admin Type
                                                </Label>
                                                <Select
                                                    value={selectedAdminSubRole}
                                                    onValueChange={(val: AdminSubRole) =>
                                                        setSelectedAdminSubRole(val)
                                                    }
                                                >
                                                    <SelectTrigger className="h-10">
                                                        <SelectValue placeholder="Select admin type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="financial">Financial</SelectItem>
                                                        <SelectItem value="academic">Academic</SelectItem>
                                                        <SelectItem value="hostel">Hostel</SelectItem>
                                                        <SelectItem value="library">Library</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </motion.div>
                                        )}

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="email"
                                                className="text-sm font-medium"
                                            >
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="h-10"
                                            />
                                        </div>

                                        {/* Password */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="password"
                                                className="text-sm font-medium"
                                            >
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    className="h-10 pr-10"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Confirm Password (only for admin signup) */}
                                        {!isLogin && selectedRole === "admin" && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="space-y-2 overflow-hidden"
                                            >
                                                <Label
                                                    htmlFor="confirmPassword"
                                                    className="text-sm font-medium"
                                                >
                                                    Confirm Password
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="confirmPassword"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        value={confirmPassword}
                                                        onChange={(e) =>
                                                            setConfirmPassword(e.target.value)
                                                        }
                                                        required
                                                        className="h-10 pr-10 border border-gray-300 "
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3"
                                                        onClick={() =>
                                                            setShowConfirmPassword(!showConfirmPassword)
                                                        }
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}



                                        {/* Error & Success */}
                                        {successMessage && (
                                            <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
                                                {successMessage}
                                            </div>
                                        )}
                                        {error && (
                                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                                                {error}
                                            </div>
                                        )}

                                        {/* Submit */}
                                        {(selectedRole === "admin" || isLogin) && (
                                            <Button
                                                type="submit"
                                                className={`w-full h-10 text-white font-medium transition-all ${isLogin
                                                        ? "bg-emerald-600 hover:bg-emerald-700"
                                                        : "bg-blue-600 hover:bg-blue-700"
                                                    }`}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        {isLogin ? "Signing in..." : "Creating Account..."}
                                                    </>
                                                ) : isLogin ? (
                                                    "Sign In"
                                                ) : (
                                                    "Create Account"
                                                )}
                                            </Button>
                                        )}
                                    </form>
                                    {/* Student Signup Redirect */}
                                    {/* Extra for Students */}
                                    {selectedRole === "student" && (<div className="text-center pt-2">
                                        <p className="text-sm text-gray-600">
                                            Have not filled up your form yet?{" "}
                                            <a href="/student-application" className="font-medium text-emerald-600 hover:underline">
                                                Fill your application here
                                            </a>
                                        </p>
                                    </div>
                                    )}
                                    {/* Toggle between Login/Signup */}
                                    {selectedRole === "admin" && (
                                        <div className="text-center pt-2">
                                            <p className="text-sm text-gray-600">
                                                {isLogin
                                                    ? "Don't have an account? "
                                                    : "Already have an account? "}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsLogin(!isLogin)
                                                        setError("")
                                                        setSuccessMessage("")
                                                    }}
                                                    className={`font-medium hover:underline ${isLogin ? "text-emerald-600" : "text-blue-600"
                                                        }`}
                                                >
                                                    {isLogin ? "Sign Up" : "Sign In"}
                                                </button>
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    )
}
