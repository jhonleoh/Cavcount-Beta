"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Mail, User, SendIcon } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("https://formspree.io/f/xldrkard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Contact Us</h1>
        </div>

        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-5">
            <div className="bg-primary p-6 text-primary-foreground md:col-span-2">
              <div className="sticky top-6">
                <h3 className="mb-4 text-xl font-bold">Contact Information</h3>
                <p className="mb-8 text-sm text-primary-foreground/80">
                  Have questions or feedback? We'd love to hear from you. Fill
                  out the form and we'll get back to you as soon as possible.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5" />
                    <div>
                      <h4 className="text-sm font-medium">Email</h4>
                      <p className="text-primary-foreground/80">
                        leo@cavcount.app
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5" />
                    <div>
                      <h4 className="text-sm font-medium">Developer</h4>
                      <p className="text-primary-foreground/80">Leo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:col-span-3">
              <h3 className="mb-4 text-xl font-bold">Get in Touch</h3>

              {submitSuccess ? (
                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800 mb-4">
                  <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Message Sent Successfully!</h4>
                  <p className="text-green-700 dark:text-green-400 text-sm">Thank you for your message. We'll get back to you as soon as possible.</p>
                  <Button
                    className="mt-4 w-full"
                    onClick={() => setSubmitSuccess(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg border border-red-200 dark:border-red-800 mb-4">
                      <p className="text-red-700 dark:text-red-400 text-sm">{submitError}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help?"
                      required
                      className="min-h-32 transition-all focus:ring-2 focus:ring-primary/20"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="mt-4 w-full transition-all duration-300 gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <SendIcon size={16} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
