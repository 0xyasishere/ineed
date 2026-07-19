"use client";

import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { SpeedLines, HalftoneOverlay } from "@/components/manga/Elements";
import { PlusIcon } from "@/components/icons";
import { FormField } from "@/components/ui/FormField";
import { TagInput } from "@/components/ui/TagInput";
import { serviceSchema, jobSchema, type ServiceFormData, type JobFormData } from "@/lib/validations";

type PostType = "service" | "job";

const categories = [
  { value: "Web Development", label: "Web Development" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Mobile Apps", label: "Mobile Apps" },
  { value: "Branding", label: "Branding" },
  { value: "Copywriting", label: "Copywriting" },
  { value: "Marketing", label: "Marketing" },
  { value: "Content Writing", label: "Content Writing" },
  { value: "Data Engineering", label: "Data Engineering" },
  { value: "DevOps", label: "DevOps" },
  { value: "Other", label: "Other" },
];

export default function PostINeedPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const router = useRouter();
  const [postType, setPostType] = useState<PostType>("service");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const serviceForm = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "Web Development",
      deliveryDays: 7,
    },
  });

  const jobForm = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      budget: undefined,
      category: "Web Development",
      tags: [],
      url: "",
    },
  });

  const handleSubmitService = async (data: ServiceFormData) => {
    if (!user) {
      toast.error("Please login to post a service");
      return;
    }
    setLoading(true);

    const { error } = await supabase.from("services").insert({
      user_id: user.id,
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      delivery_days: data.deliveryDays,
    });

    if (error) {
      toast.error("Failed to post service. Please try again.");
    } else {
      toast.success("Service posted successfully!");
      setSuccess(true);
    }
    setLoading(false);
  };

  const handleSubmitJob = async (data: JobFormData) => {
    if (!user) {
      toast.error("Please login to post a job");
      return;
    }
    setLoading(true);

    const { error } = await supabase.from("jobs").insert({
      user_id: user.id,
      title: data.title,
      description: data.description,
      budget: data.budget || 0,
      category: data.category,
      tags: data.tags,
      url: data.url || null,
    });

    if (error) {
      toast.error("Failed to post job. Please try again.");
    } else {
      toast.success("Job posted successfully!");
      setSuccess(true);
    }
    setLoading(false);
  };

  const handleTypeSwitch = (type: PostType) => {
    setPostType(type);
    serviceForm.reset();
    jobForm.reset();
  };

  if (success) {
    return (
      <div className="space-y-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="manga-panel bg-white p-10 text-center"
        >
          <span className="text-5xl mb-4 block">🎉</span>
          <h2 className="text-xl font-manga tracking-wide text-foreground" style={{ textShadow: "2px 2px 0 rgba(45,138,86,0.1)" }}>
            {postType === "service" ? "Service Posted!" : "Job Posted!"}
          </h2>
          <p className="mt-2 text-sm text-foreground/50">
            Your {postType} is now live and visible to others.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <motion.button
              onClick={() => {
                setSuccess(false);
                serviceForm.reset();
                jobForm.reset();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="manga-outline-sm bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90 cursor-pointer"
            >
              Post Another
            </motion.button>
            <motion.button
              onClick={() => router.push("/dashboard/my-posts")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="manga-outline-sm bg-muted px-6 py-2.5 text-sm font-bold text-foreground/70 hover:bg-muted/80 cursor-pointer"
            >
              View My Posts
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-manga text-foreground">📝 {t.dashboard.postINeed}</h1>
        <p className="mt-1 text-sm text-foreground/50">Share your service or find talent for your project.</p>
      </motion.div>

      {/* Post Type Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex gap-2"
      >
        <button
          onClick={() => handleTypeSwitch("service")}
          className={`manga-outline-sm px-6 py-3 text-sm font-bold transition-all cursor-pointer ${
            postType === "service"
              ? "bg-primary text-white"
              : "bg-muted text-foreground/60 hover:bg-muted/80"
          }`}
        >
          ✨ Offer a Service
        </button>
        <button
          onClick={() => handleTypeSwitch("job")}
          className={`manga-outline-sm px-6 py-3 text-sm font-bold transition-all cursor-pointer ${
            postType === "job"
              ? "bg-primary text-white"
              : "bg-muted text-foreground/60 hover:bg-muted/80"
          }`}
        >
          💼 Post a Job
        </button>
      </motion.div>

      {/* Service Form */}
      {postType === "service" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative overflow-hidden manga-panel bg-white p-6"
        >
          <SpeedLines count={8} className="!opacity-[0.03]" />
          <HalftoneOverlay className="!opacity-[0.02]" />

          <FormProvider {...serviceForm}>
            <form onSubmit={serviceForm.handleSubmit(handleSubmitService)} className="relative z-10 space-y-5">
              <FormField
                name="title"
                label="Title"
                placeholder="I will design a modern landing page"
              />

              <FormField
                name="description"
                label="Description"
                type="textarea"
                placeholder="Describe what you offer..."
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="category"
                  label="Category"
                  type="select"
                  options={categories}
                />
                <FormField
                  name="price"
                  label="Price ($)"
                  type="number"
                  placeholder="0"
                  min={1}
                  max={100000}
                />
              </div>

              <FormField
                name="deliveryDays"
                label="Delivery Days"
                type="number"
                placeholder="7"
                min={1}
                max={365}
              />

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full manga-outline-sm bg-primary py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                <PlusIcon size={16} />
                {loading ? "..." : "Post Service"}
              </motion.button>
            </form>
          </FormProvider>
        </motion.div>
      )}

      {/* Job Form */}
      {postType === "job" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative overflow-hidden manga-panel bg-white p-6"
        >
          <SpeedLines count={8} className="!opacity-[0.03]" />
          <HalftoneOverlay className="!opacity-[0.02]" />

          <FormProvider {...jobForm}>
            <form onSubmit={jobForm.handleSubmit(handleSubmitJob)} className="relative z-10 space-y-5">
              <FormField
                name="title"
                label="Title"
                placeholder="Need a React developer for e-commerce"
              />

              <FormField
                name="description"
                label="Description"
                type="textarea"
                placeholder="Describe what you need..."
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="category"
                  label="Category"
                  type="select"
                  options={categories}
                />
                <FormField
                  name="budget"
                  label="Budget ($)"
                  type="number"
                  placeholder="0 (optional)"
                  min={0}
                  max={100000}
                />
              </div>

              <TagInput
                name="tags"
                label="Tags"
                placeholder="Add a tag..."
                maxTags={5}
              />

              <FormField
                name="url"
                label="URL (optional)"
                type="url"
                placeholder="https://..."
              />

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full manga-outline-sm bg-primary py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                <PlusIcon size={16} />
                {loading ? "..." : "Post Job"}
              </motion.button>
            </form>
          </FormProvider>
        </motion.div>
      )}
    </div>
  );
}
