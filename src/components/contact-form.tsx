"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { SendIcon, CheckCircle2, AtSign, UserCircle } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Prepare form data for submission
    const formSubmitData = new FormData()
    formSubmitData.append('name', formData.name)
    formSubmitData.append('email', formData.email)
    formSubmitData.append('message', formData.message)

    try {
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xldrkard', {
        method: 'POST',
        body: formSubmitData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.")
        setFormData({ name: "", email: "", message: "" })
        setIsSubmitted(true)

        // Reset form state after showing success state
        setTimeout(() => {
          setIsSubmitted(false)
        }, 3000)
      } else {
        const data = await response.json()
        throw new Error(data.error || 'Form submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error("Failed to send message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="grid md:grid-cols-5">
        {/* Contact Information */}
        <div className="bg-primary p-6 text-primary-foreground md:col-span-2">
          <div className="sticky top-6">
            <h3 className="mb-4 text-xl font-bold">Contact Information</h3>
            <p className="mb-8 text-sm text-primary-foreground/80">
              Have questions or feedback? We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <AtSign className="h-5 w-5 text-primary-foreground/90" />
                <div>
                  <h4 className="text-sm font-medium">Email</h4>
                  <p className="text-primary-foreground/80">leo@cavcount.app</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <UserCircle className="h-5 w-5 text-primary-foreground/90" />
                <div>
                  <h4 className="text-sm font-medium">Developer</h4>
                  <p className="text-primary-foreground/80">Leo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 md:col-span-3">
          <h3 className="mb-4 text-xl font-bold">Get in Touch</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="transition-all focus:ring-2 focus:ring-primary/20"
                required
                disabled={isSubmitting || isSubmitted}
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
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="transition-all focus:ring-2 focus:ring-primary/20"
                required
                disabled={isSubmitting || isSubmitted}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help?"
                className="min-h-32 transition-all focus:ring-2 focus:ring-primary/20"
                required
                disabled={isSubmitting || isSubmitted}
              />
            </div>

            <Button
              type="submit"
              className="mt-4 w-full transition-all duration-300"
              disabled={isSubmitting || isSubmitted}
            >
              {isSubmitted ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Message Sent
                </span>
              ) : isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <SendIcon className="h-4 w-4" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </Card>
  )
}
