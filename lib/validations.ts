import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(20, "Description must be at least 20 characters").max(1000, "Description must be less than 1000 characters"),
  price: z.number().min(1, "Price must be at least $1").max(100000, "Price must be less than $100,000"),
  category: z.string().min(1, "Please select a category"),
  deliveryDays: z.number().min(1, "Delivery must be at least 1 day").max(365, "Delivery must be less than 365 days"),
});

export const jobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(20, "Description must be at least 20 characters").max(1000, "Description must be less than 1000 characters"),
  budget: z.number().optional(),
  category: z.string().min(1, "Please select a category"),
  tags: z.array(z.string()).max(5, "Maximum 5 tags allowed"),
  url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
export type JobFormData = z.infer<typeof jobSchema>;
