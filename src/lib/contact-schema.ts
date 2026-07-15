import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters.")
    .max(80, "Please keep your name under 80 characters."),
  email: z.email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(20, "Please share at least 20 characters.")
    .max(2000, "Please keep your message under 2,000 characters."),
  company: z.string().max(0, "Automated submission rejected.").optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
