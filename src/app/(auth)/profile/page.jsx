"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { 
  Camera, 
  Mail, 
  Phone, 
  User, 
  Settings, 
  LogOut, 
  CheckCircle2, 
  CalendarDays 
} from "lucide-react";

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  // 1. Loading State
  if (!isLoaded) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="animate-pulse flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 bg-gray-200 h-96 rounded-3xl"></div>
          <div className="w-full md:w-2/3 bg-gray-200 h-96 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  // 2. Not Signed In State
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
        <p className="text-xl font-medium text-gray-600">Access Restricted</p>
        <p className="text-gray-400">Please sign in to view your profile.</p>
      </div>
    );
  }

  // 3. Format Date
  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50/50 relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:py-20">
        
        {/* Page Title */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 text-gray-500">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          
          {/* LEFT COLUMN: Identity Card */}
          <div className="md:col-span-4 lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
              {/* Decorative Header */}
              <div className="h-32 bg-linear-to-br from-orange-300 via-amber-300 to-orange-300 relative">
                 <div className="absolute inset-0 bg-white/10 opacity-50 backdrop-blur-[2px]"></div>
              </div>

              <div className="px-6 pb-8 text-center -mt-16 flex-1 flex flex-col items-center">
                {/* Avatar */}
                <div className="relative inline-block">
                  <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden group bg-white">
                    <Image
                      src={user.imageUrl}
                      alt="Profile"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                      <Camera className="w-8 h-8 text-white/90" />
                    </div>
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
                </div>

                {/* Name & Badge */}
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                    {user.fullName || "User"}
                    <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-50" />
                  </h2>
                  <p className="text-sm font-medium text-gray-500 mt-1">
                    Verified
                  </p>
                </div>

                {/* Member Since Badge */}
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 text-xs font-medium text-gray-600">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>Joined {joinDate}</span>
                </div>
                
                <div className="flex-1 w-full flex items-end mt-8">
                   <div className="border-t pt-6 w-full">
                    <button
                        onClick={() => signOut({ redirectUrl: "/" })}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-xl transition-colors duration-200 font-medium group"
                    >
                        <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Sign Out
                    </button>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Details & Actions */}
          <div className="md:col-span-8 lg:col-span-8 space-y-6">
            
            {/* Personal Information Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                <Link 
                  href="/profile"
                  className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Edit
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
                
                {/* Email Field */}
                <div className="group">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-orange-50 rounded-lg text-orange-600">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Email Address</span>
                  </div>
                  <div className="text-gray-900 font-medium pl-9 break-all">
                    {user.primaryEmailAddress?.emailAddress}
                  </div>
                </div>

                {/* Phone Field */}
                <div className="group">
                   <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Phone Number</span>
                  </div>
                  <div className="text-gray-900 font-medium pl-9">
                    {user.primaryPhoneNumber?.phoneNumber || "Not provided"}
                  </div>
                </div>

                {/* User ID Field (Full Width) */}
                <div className="sm:col-span-2 group">
                   <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Unique ID</span>
                  </div>
                  <div className="flex items-center gap-3 pl-9">
                    <code className="text-sm bg-gray-100 px-3 py-1.5 rounded-md text-gray-600 font-mono">
                      {user.id}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Settings / Banner Card */}
            <div className="bg-linear-to-r from-gray-900 to-gray-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg overflow-hidden relative">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold">Ready to update your details?</h3>
                  <p className="text-gray-300 mt-1 text-sm max-w-md">
                    Keep your profile up-to-date to ensure seamless communication and account recovery.
                  </p>
                </div>
                
                <Link 
                  href="/profile"
                  className="px-6 py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-50 transition shadow-lg active:scale-95 transform"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}