import { DoctorProfileForm } from "@/components/doctor/doctor-profile-form";

export default function DoctorProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Keep your profile clean and trustworthy.</p>
      </div>
      <DoctorProfileForm />
    </div>
  );
}

